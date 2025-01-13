import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ImageBackground, Text, View } from 'react-native';
import { appInfo } from '../constants/appInfos';
import { SpaceComponent } from '../components';
import { appColors } from '../constants/appColors';

const OnboaringScreen = ({navigation}:any) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('LoginScreen')
        }, 1500)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>
                OnboaringScreen
            </Text>
        </View>
    );
};

export default OnboaringScreen;