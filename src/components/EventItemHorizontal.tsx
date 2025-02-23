import { Image, View } from "react-native"
import { EventModelNew } from "../models/EventModelNew"
import CardComponent from "./CardComponent"
import RowComponent from "./RowComponent"
import { appColors } from "../constants/appColors"
import TextComponent from "./TextComponent"
import SpaceComponent from "./SpaceComponent"
import { convertMoney, renderPrice } from "../utils/convertMoney"
import TagComponent from "./TagComponent"
import { DateTime } from "../utils/DateTime"
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { appInfo } from "../constants/appInfos"
import { useNavigation } from "@react-navigation/native"
import { memo } from "react"
interface Props {
    item: EventModelNew,
    bgColor?: string,
    titleColor?:string,
    textCalendarColor?:string,
    width?:number,
    paddingVertical?:number,
    paddingHorizontal?:number,
    onPress?:()=>void

}
const EventItemHorizontal = (props: Props) => {
    const { item, bgColor,titleColor ,paddingVertical,paddingHorizontal,textCalendarColor,width,onPress} = props
    const navigation: any = useNavigation()
    
    return (
        <CardComponent styles={{ paddingVertical: paddingVertical ? paddingVertical : 0, paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0, backgroundColor: bgColor ?? appColors.white, width: width ? width : 'auto' }}>
            <RowComponent styles={{alignItems:'flex-start'}}>
                <View>
                    <Image source={{ uri: item?.photoUrl }} style={{ width: appInfo.sizes.WIDTH * 0.35, height: appInfo.sizes.HEIGHT*0.12, borderRadius: 12, resizeMode: 'stretch' }} />
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
                        <TextComponent text={'Đã diễn ra'} size={8}  color="white" />
                    </View>}
                </View>
                <SpaceComponent width={8} />
                <View style={{ flex: 1 }}>

                    <TextComponent numberOfLine={1} text={item?.title} title size={14} color={titleColor ??appColors.background} />
                    <TextComponent text={renderPrice(item.showTimes[0])} title size={13} color={`${appColors.primary}`} />
                    <RowComponent styles={{ flexWrap: 'wrap' }}>
                        {

                            <View style={{ paddingVertical: 2 }} key={item.category?._id}>
                                <TagComponent
                                    title={item.category.name}
                                    
                                />
                            </View>
                        }
                    </RowComponent>

                    {/* {
                      (item.usersInterested && item.usersInterested.length > 0) && <AvatarGroup users={item.usersInterested} />
                    } */}
                    <RowComponent justify="flex-start">
                        <Feather name="calendar" size={12} color={textCalendarColor ?? appColors.background} />
                        <SpaceComponent width={4} />
                        <TextComponent text={`${DateTime.ConvertDayOfWeek(new Date(item?.showTimes[0]?.startDate ?? Date.now()).getDay())} - ${DateTime.GetDateNew1(item?.showTimes[0]?.startDate ?? new Date(), item?.showTimes[0]?.endDate || new Date())} `} color={textCalendarColor ?? appColors.background} size={12} />
                    </RowComponent>
                    <RowComponent justify="space-between" styles={{flex:1}}>
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
            </RowComponent>
        </CardComponent>
    )
}

export default memo(EventItemHorizontal)