import { ActivityIndicator, FlatList, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { RowComponent, InputComponent, SpaceComponent, TextComponent } from "../components"
import AvatarItem from "../components/AvatarItem"
import { appColors } from "../constants/appColors"
import { useEffect, useState } from "react"
import { EventModelNew } from "../models/EventModelNew"
import { apis } from "../constants/apis"
import eventAPI from "../apis/eventAPI"
import { appInfo } from "../constants/appInfos"
import EventItemHorizontal from "../components/EventItemHorizontal"


const LazyLoadingScreen = ()=>{
    const [events,setEvents] = useState<EventModelNew[]>([])
    const [isLoadingEvents,setIsLoadingEvents] = useState(true)
    const [limit,setLimit] = useState(10)
     useEffect(() => {
        if ((events.length - limit >= -10) && (events.length - limit <= 0)) {
            handleCallAPIGetEvents()
          }
            
    }, [limit])

    const handleCallAPIGetEvents = async () => {
        try {
            setIsLoadingEvents(true)
            const api = apis.event.getAll({ limit: limit.toString(),sortType:'view' })
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
                <FlatList 
                    data={events}
                    showsVerticalScrollIndicator={false}
                    // onEndReachedThreshold={0.8}
                    ListFooterComponentStyle={{ paddingBottom: 30 }}
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
            
        </View>
        </>
    )
}

export default LazyLoadingScreen