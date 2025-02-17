import { Button, StyleProp, Text, View, ViewStyle } from "react-native"
import React, { memo } from "react"
import RowComponent from "./RowComponent";
import { appColors } from "../constants/appColors";
import { ArrowLeft, SearchNormal } from "iconsax-react-native";
import InputComponent from "./InputComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";
import { globalStyles } from "../styles/globalStyles";
interface Props {
  value: string,
  onSearch: (val: string) => void,
  onPressArrow?: () => void,
  styles?: StyleProp<ViewStyle>,
  titlePlaceholder?: string,
  isNotShowArrow?: boolean,
  onEnd?:()=>void,
  bgColor?:string,
  textColor?:string,
  onFocus?:()=>void,
  onBlur?:()=>void,
  ref?:any,
  minHeight?:number
}
const SearchComponent = (props: Props) => {
  const { value, onSearch, onPressArrow, styles,onFocus,minHeight, titlePlaceholder, textColor,isNotShowArrow,onEnd,bgColor,onBlur,ref } = props
  return <RowComponent styles={[styles]} justify="flex-end">
    {!isNotShowArrow && (
      <>
        <ArrowLeft color={appColors.gray} onPress={onPressArrow} />
        <SpaceComponent width={8} />
      </>
    )}
    <View style={{
      flex: 1,
    }}>
      <InputComponent
        
        styles={[{
          marginBottom: 0,
          borderRadius:100,
          backgroundColor:bgColor ?? appColors.backgroundSearchInput,
          borderColor:appColors.white,
          minHeight:minHeight ? minHeight : 40
        }]}
        
        affix={<SearchNormal size={20} color={appColors.gray} />}
        value={value}
        onEnd={onEnd}
        
        placeholder={titlePlaceholder ?? "Tìm kiếm..."}
        
        allowClear
        onChange={val => onSearch(val)}
      />

    </View>

  </RowComponent>
}
export default memo(SearchComponent);