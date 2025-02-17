import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Switch, Text, TouchableOpacity, View } from 'react-native';
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
const HomeScreen = ({ navigation }: any) => {
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [events, setEvents] = useState<EventModelNew[]>([])
    const [search, setSearch] = useState('')
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
            const api = apis.event.getAll({ limit: '10' })
            const res = await eventAPI.HandleEvent(api)
            if (res && res.data && res.status === 200) {
                setEvents(res.data)
            }
        } catch (error: any) {
            const errorMessage = JSON.parse(error.message)
            console.log('Lỗi rồi MapSceen', errorMessage)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: appColors.backgroundBluishWhite }}>
            <View style={{ backgroundColor: appColors.primary, paddingTop: 35 }}>
                <RowComponent justify='space-between' styles={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                    <InputComponent
                        placeholder='Tìm kiếm ở đây...'
                        affix={<FontAwesome name='search' size={30} />}
                        styles={{ width: '80%', marginBottom: 0, borderRadius: 100, maxHeight: 56 }} value={search} onChange={(val) => setSearch(val)} />
                    <RowComponent>
                        <FontAwesome name='bell' size={20} color={appColors.white} />
                        <SpaceComponent width={12} />
                        <AvatarItem size={36} />
                    </RowComponent>
                </RowComponent>
            </View>
            <SpaceComponent height={12} />
            <View>
                <SectionComponent >
                    <TextComponent text='Danh sách thể loại' size={24} />
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
                    <TextComponent text='Danh sách các sản phẩm bán chạy' size={24} />
                    <SpaceComponent height={12} />
                    <FlatList
                        data={events}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <CardComponent styles={{ width: appInfo.sizes.WIDTH * 0.65, height: appInfo.sizes.HEIGHT * 0.3 }}>
                                        <Image source={{ uri: item.photoUrl }} style={{ width: appInfo.sizes.WIDTH * 0.45, height: appInfo.sizes.HEIGHT * 0.14, borderRadius: 12, resizeMode: 'stretch' }} />
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
                                </>

                            )
                        }}
                    />
                </SectionComponent>
                <View>
                    <ButtonComponent text='Xem hồ sơ' onPress={() => navigation.navigate('ProfileScreen')} type='primary' />
                </View>
                <View>
                    <ButtonComponent text='Đăng xuất' onPress={() => AsyncStorage.clear()} type='primary' />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;