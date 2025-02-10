import React from 'react';
import {RowComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons'
interface Props {
  title: string;
  onPress: () => void;
}

const TagBarComponent = (props: Props) => {
  const {title, onPress} = props;

  return (
    <RowComponent
      onPress={onPress}
      styles={{marginBottom: 12, paddingHorizontal: 16}}>
      <TextComponent numberOfLine={1} size={18} title text={title} flex={1} />
      <RowComponent>
        <TextComponent text="See All " color={appColors.gray} />
        <Ionicons name='arrow-back' size={14} color={appColors.gray} />
      </RowComponent>
    </RowComponent>
  );
};

export default TagBarComponent;