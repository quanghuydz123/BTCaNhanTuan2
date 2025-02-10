import React from 'react';
import {ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {SpaceComponent, TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}:any) => {
  return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text>
                HomeScreen
            </Text>
            <TouchableOpacity onPress={async ()=>{
                await AsyncStorage.clear()
            }}>
               <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')}>
                    <TextComponent text='Xem trang hồ sơ' color='blue'/>
               </TouchableOpacity>
            </TouchableOpacity>
        </View>
  );
};

export default HomeScreen;