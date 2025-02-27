import { ActivityIndicator, FlatList, Modal, TouchableOpacity, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { RowComponent, InputComponent, SpaceComponent, TextComponent, ButtonComponent } from "../components"
import AvatarItem from "../components/AvatarItem"
import { appColors } from "../constants/appColors"
import { useEffect, useState } from "react"
import { EventModelNew } from "../models/EventModelNew"
import { apis } from "../constants/apis"
import eventAPI from "../apis/eventAPI"
import { appInfo } from "../constants/appInfos"
import EventItemHorizontal from "../components/EventItemHorizontal"
import { CategoryModel } from "../models/CategoryModel"
import categoryAPI from "../apis/categoryAPI"
import SearchComponent from "../components/SearchComponent"
import { SearchNormal } from "iconsax-react-native"
import TagComponent from "../components/TagComponent"
import { globalStyles } from "../styles/globalStyles"


const LazyLoadingScreen = ()=>{
    const [events,setEvents] = useState<EventModelNew[]>([])
    const [isLoadingEvents,setIsLoadingEvents] = useState(true)
    const [limit,setLimit] = useState(10)
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [search,setSearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories,setSelectedCategories] = useState<string[]>([])
    useEffect(()=>{
        handleCallAPIGetCategories()
    },[])
     useEffect(() => {
        if ((events.length - limit >= -10) && (events.length - limit <= 0)) {
            handleCallAPIGetEvents()
          }
            
    }, [limit])
    useEffect(()=>{
        if(search === ''){
            handleCallAPIGetEvents()
        }
    },[search])
    const handleCallAPIGetCategories = async () => {
        try {
            const api = apis.category.getAll()
            const res = await categoryAPI.HandleCategory(api)
            if (res && res.data && res.status === 200) {
                setCategories(res.data)
            }
        } catch (error: any) {
            const errorMessage = JSON.parse(error.message)
            console.log('Lỗi rồi MapSceen', errorMessage)
        }
    }
    const handleCallAPIGetEvents = async () => {
        try {
            setIsLoadingEvents(true)
            const api = apis.event.getAll({ limit: limit.toString(),categoriesFilter:selectedCategories,searchValue:search})
            const res = await eventAPI.HandleEvent(api)
            if (res && res.data && res.status === 200) {
                setEvents(res.data)
            }
            setIsLoadingEvents(false)
        } catch (error: any) {
            setIsLoadingEvents(false)
            const errorMessage = JSON.parse(error.message)
            console.log('Lỗi rồi MapSceen', errorMessage)
        }
    }
    const handleFollowerCategory = (id: string) => {
        const idsCategory = [...selectedCategories]
        const index = selectedCategories.findIndex(item => item.toString() === id.toString())
        if (index != -1) {
            idsCategory.splice(index, 1)
            setSelectedCategories(idsCategory)
        } else {
            idsCategory.push(id)
            setSelectedCategories(idsCategory)

        }
    }
    return (
        <>
         <View style={{ flex: 1, backgroundColor: appColors.backgroundBluishWhite }}>
            <View style={{ backgroundColor: appColors.primary, paddingTop: 35 }}>
                <RowComponent justify='flex-start' styles={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Ionicons name='arrow-back' size={32} color={appColors.white}/>
                    <SpaceComponent width={12}/>
                    <TextComponent text="Danh sách" color={appColors.white} size={24}/>
                </RowComponent>
            </View>
            <SpaceComponent height={12} />
            <View style={{flex:1,paddingHorizontal:12}}>
                <RowComponent justify="space-between">
                     <InputComponent
                            
                            styles={[{
                              marginBottom: 0,
                              borderRadius:100,
                              backgroundColor:appColors.backgroundSearchInput,
                              borderColor:appColors.white,
                              minHeight:40,
                              width:appInfo.sizes.WIDTH*0.77
                            }]}
                            affix={<FontAwesome name='search' size={20} />}
                            
                            value={search}
                            onEnd={()=>handleCallAPIGetEvents()}
                            
                            placeholder={"Tìm kiếm..."}
                            
                            allowClear
                            onChange={val => setSearch(val)}
                          />
                          <TouchableOpacity 
                          onPress={()=>setModalVisible(true)}
                          style={{backgroundColor:appColors.primary,paddingHorizontal:18,paddingVertical:6,borderRadius:100}}>
                            <TextComponent text="Lọc" color={appColors.white}/>
                          </TouchableOpacity>
                </RowComponent>
                <SpaceComponent height={12}/>
                <FlatList 
                    data={events}
                    showsVerticalScrollIndicator={false}
                    // onEndReachedThreshold={0.8}
                    ListFooterComponentStyle={{ paddingBottom: 30 }}
                    ListEmptyComponent={!isLoadingEvents ? <View style={{justifyContent:'center',alignItems:'center',height:appInfo.sizes.HEIGHT*0.3}}>
                        <TextComponent styles={{textAlign:'center'}} text="Không có sự kiện nào"/>
                    </View> : <></>}
                    ListFooterComponent={() => <View>
                        {isLoadingEvents && <View style={{}}>
                          <ActivityIndicator color={appColors.primary} />
                        </View>}
                      </View>}
                    // ListEmptyComponent={<View style={{height:appInfo.sizes.HEIGHT*0.3,justifyContent:'center',alignItems:'center'}}>
                    //     <ActivityIndicator style={{width:appInfo.sizes.WIDTH*0.9}}/>
                    // </View>}
                    
                     onEndReached={() => {
                        if(!isLoadingEvents && events.length >= 10){
                          setLimit(prev => prev + 10)
                        }
                      }}
                    renderItem={(({item})=>{
                        return (
                            <>
                                <EventItemHorizontal key={item._id} item={item}/>
                                <SpaceComponent height={12}/>
                            </>
                        )
                    })}
                />
            </View>
            <Modal
          transparent={true}
          visible={modalVisible}
          >
            <View style={{backgroundColor:appColors.white,justifyContent:'center',alignItems:'center',paddingVertical:12,paddingHorizontal:12}}>
            <TextComponent text={'Lọc theo thể loại'} size={20} styles={{fontWeight:'bold'}} />
                    <SpaceComponent height={4}/>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            categories && categories.map((item, index) => <View style={{ paddingVertical: 4, paddingHorizontal: 4 }} key={`categoriesModalFilter${index}`}>
                                <TagComponent key={item._id} onPress={() => handleFollowerCategory(item._id)} title={item.name}
                                    bgColor={selectedCategories?.some(idCategory => idCategory === item._id) ? appColors.primary : appColors.white}
                                    textColor={selectedCategories?.some(idCategory => idCategory === item._id) ? appColors.white : appColors.black}
                                    styles={[globalStyles.shadow, { borderWidth: 1, borderColor: selectedCategories?.some(idCategory => idCategory === item._id) ? appColors.primary : appColors.gray }]} />

                            </View>)
                        }
                    </View>
                    <SpaceComponent height={12}/>
                    <RowComponent>
                        <ButtonComponent text="Hủy" type="primary" styles={{minWidth:'40%',marginBottom:0}} onPress={()=>setModalVisible(false)}/>
                        <ButtonComponent onPress={()=>{
                            setModalVisible(false)
                            handleCallAPIGetEvents()
                        }} text="Áp dụng" type="primary" styles={{minWidth:'40%',marginBottom:0}}/>
                    </RowComponent>
            </View>
        </Modal>
        </View>
        </>
    )
}

export default LazyLoadingScreen