import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { appInfo } from '../constants/appInfos';
import { ButtonComponent, CardComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { appColors } from '../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AvatarItem from '../components/AvatarItem';
import { CategoryModel } from '../models/CategoryModel';
import { EventModelNew } from '../models/EventModelNew';
import { apis } from '../constants/apis';
import categoryAPI from '../apis/categoryAPI';
import eventAPI from '../apis/eventAPI';
import { renderPrice } from '../utils/convertMoney';
import { DateTime } from '../utils/DateTime';
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux';
import { removeAuth } from '../reduxs/reducers/authReducers';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EventItemHorizontal from '../components/EventItemHorizontal';
import Swiper from 'react-native-swiper';
const HomeScreen = ({ navigation }: any) => {
    const [isLoadingEvents, setIsLoadingEvents] = useState(true)
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [events, setEvents] = useState<EventModelNew[]>([])
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        handleCallAPIGetCategories()
        handleCallAPIGetEvents()
    }, [])
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
            const api = apis.event.getAll({ limit: '10'})
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
        <View style={{ flex: 1, backgroundColor: appColors.backgroundBluishWhite }}>
            <View style={{ backgroundColor: appColors.primary, paddingTop: 35 }}>
                <RowComponent justify='space-between' styles={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Ionicons name='arrow-back' size={32} color={appColors.white} />
                    <InputComponent
                        placeholder='Tìm kiếm ở đây...'
                        affix={<FontAwesome name='search' size={20} />}
                        styles={{ width: '70%', marginBottom: 0, borderRadius: 100, minHeight: 40 }} value={search} onChange={(val) => setSearch(val)} />
                    <RowComponent>
                        <FontAwesome name='bell' size={20} color={appColors.white} />
                        <SpaceComponent width={12} />
                        <AvatarItem size={36} photoUrl='https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj' />
                    </RowComponent>
                </RowComponent>
            </View>
            <ScrollView>
                <View >
                    <Swiper
                        style={{height:appInfo.sizes.HEIGHT*0.3}}
                        loop={false}
                        onIndexChanged={num => setIndex(num)}
                        index={index}
                        activeDotColor={appColors.primary}>
                        <Image
                            source={{ uri: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F99%2F38%2F15%2F19919dffe776b8990327c2c461750391.jpg&w=640&q=75' }}
                            style={{
                                flex: 1,
                                width: appInfo.sizes.WIDTH,
                                height: appInfo.sizes.HEIGHT * 0.3,
                                resizeMode: 'stretch',
                            }}
                        />
                        <Image
                            source={{ uri: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F51%2Fb4%2F2f%2F753fa09de83c3b675867be409387e713.jpg&w=640&q=75' }}
                            style={{
                                flex: 1,
                                width: appInfo.sizes.WIDTH,
                                height: appInfo.sizes.HEIGHT * 0.3,
                                resizeMode: 'stretch',
                            }}
                        />
                        <Image
                            source={{ uri: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F3b%2F46%2Fbd%2Fed98627eac28dbc62a3246764a0d68a9.jpg&w=640&q=75' }}
                            style={{
                                flex: 1,
                                width: appInfo.sizes.WIDTH,
                                height: appInfo.sizes.HEIGHT * 0.3,
                                resizeMode: 'stretch',
                            }}
                        />
                    </Swiper>
                </View>
                <SpaceComponent height={12}/>
                <SectionComponent >
                    <TextComponent text='Danh sách thể loại' size={20} />
                    <SpaceComponent height={12} />
                    <FlatList
                        data={categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <AvatarItem size={80} photoUrl={item.image} textName={item.name} />
                                    <SpaceComponent width={12} />
                                </>

                            )
                        }}
                    />
                </SectionComponent>

                <SectionComponent >
                    <TextComponent text='Danh sách các sản phẩm bán chạy' size={20} />
                    <SpaceComponent height={12} />
                    <FlatList
                        data={events}
                        horizontal
                        ListEmptyComponent={<View style={{ height: appInfo.sizes.HEIGHT * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator style={{ width: appInfo.sizes.WIDTH * 0.9 }} />
                        </View>}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <CardComponent styles={{ width: appInfo.sizes.WIDTH * 0.65, height: appInfo.sizes.HEIGHT * 0.3, padding: 8, margin: 0 }}>
                                        <Image source={{ uri: item.photoUrl }} style={{ width: 'auto', height: appInfo.sizes.HEIGHT * 0.16, borderRadius: 12, resizeMode: 'stretch' }} />
                                        {item.statusEvent === 'Ended' && <View style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            backgroundColor: appColors.warning,
                                            paddingHorizontal: 8,
                                            paddingVertical: 3,
                                            borderBottomLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                        }}>
                                            <TextComponent text={'Đã diễn ra'} size={12} color="white" />
                                        </View>}
                                        <SpaceComponent width={12} />
                                        <View style={{ height: '100%' }}>

                                            <TextComponent numberOfLine={2} text={item.title} title size={14} color={appColors.text} />
                                            <TextComponent text={renderPrice(item.showTimes[0])} title size={13} color={`${appColors.primary}`} />
                                            <RowComponent justify='flex-start'>
                                                <Feather name="calendar" size={12} color={appColors.text} />
                                                <SpaceComponent width={4} />
                                                <TextComponent text={`${DateTime.ConvertDayOfWeek(new Date(item?.showTimes[0]?.startDate ?? Date.now()).getDay())} - ${DateTime.GetDateNew1(item?.showTimes[0]?.startDate ?? new Date(), item?.showTimes[0]?.endDate || new Date())} `} color={appColors.text} size={12} />
                                            </RowComponent>
                                            <RowComponent justify="space-between" styles={{}}>
                                                <RowComponent>

                                                    <TextComponent text={item?.addressDetails?.province?.name ?? ''} numberOfLine={1} color={appColors.text2} flex={1} size={12} />

                                                    <SpaceComponent width={4} />
                                                    <RowComponent>
                                                        <FontAwesome name="eye" color={appColors.primary} size={16} />
                                                        <SpaceComponent width={2} />
                                                        <TextComponent text={item?.viewCount.toString() ?? '0'} size={12} color={appColors.primary} />
                                                    </RowComponent>
                                                    <SpaceComponent width={4} />
                                                </RowComponent>


                                            </RowComponent>
                                        </View>

                                    </CardComponent>
                                    <SpaceComponent width={12} />
                                </>

                            )
                        }}
                    />
                </SectionComponent>
                <SectionComponent >
                    <RowComponent justify='space-between'>
                        <TextComponent text='Danh sách sản phẩm lazyLoading' size={20} />
                        <TouchableOpacity onPress={() => navigation.navigate('LazyLoadingScreen')}>
                            <Text style={{ color: appColors.primary }}> Xem tất cả</Text>
                        </TouchableOpacity>
                    </RowComponent>
                    <SpaceComponent height={12} />
                    {isLoadingEvents ? <View style={{ height: appInfo.sizes.HEIGHT * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ width: appInfo.sizes.WIDTH * 0.9 }} />
                    </View> : events.slice(0, 5).map((item) => {
                        return (
                            <>
                                <EventItemHorizontal key={item._id} item={item} />
                                <SpaceComponent height={12} />
                            </>
                        )
                    })}
                </SectionComponent>
                <View>
                    <ButtonComponent text='Xem hồ sơ' onPress={() => navigation.navigate('ProfileScreen')} type='primary' />
                </View>
                <View>
                    <ButtonComponent text='Đăng xuất' onPress={() => {
                        dispatch(removeAuth({}))
                        AsyncStorage.clear()
                    }} type='primary' />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;