import React from 'react';
import {ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {SpaceComponent} from '../components';
import {appColors} from '../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>
                LoginScreen
            </Text>
            <TouchableOpacity onPress={async ()=>{
                await AsyncStorage.setItem('assetToken','huy')
            }}>
               <Text style={{color:'blue'}}>
                    Login
               </Text>
            </TouchableOpacity>
        </View>
  );
};

export default LoginScreen;