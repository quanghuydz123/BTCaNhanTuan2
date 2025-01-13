/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./src/navigators/AppRouter";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import SplashScreen from "./src/screens/SplashScreen";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
const App = ()=>{
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem,setItem} = useAsyncStorage('assetToken')
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setIsShowSplash(false)
    },1500)
    return ()=>clearTimeout(timeout)
  },[])
  useEffect(()=>{
    checkLogin()
  },[])
  const checkLogin = async ()=>{
    const token = await getItem()
    token && setAccessToken(token)
  }
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}/>
        {isShowSplash ? <SplashScreen /> :<NavigationContainer>
        {accessToken ? <MainNavigator/> : <AuthNavigator />}
      </NavigationContainer> }
    </>
  )
}
export default App;
