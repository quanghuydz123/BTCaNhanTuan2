import React from 'react';
import {ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {SpaceComponent} from '../components';
import {appColors} from '../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text>
                HomeScreen
            </Text>
            <TouchableOpacity onPress={async ()=>{
                await AsyncStorage.clear()
            }}>
               <Text style={{color:'blue'}}>
                    Logout
               </Text>
            </TouchableOpacity>
        </View>
  );
};

export default HomeScreen;