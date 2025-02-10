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
import { Provider, useSelector } from "react-redux";
import { authSelector } from "./src/reduxs/reducers/authReducers";
import store from "./src/reduxs/store";
const App = ()=>{
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem,setItem} = useAsyncStorage('auth')
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
    <Provider store={store}>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}/>
          {isShowSplash ? <SplashScreen /> :<NavigationContainer>
          {accessToken ? <MainNavigator/> : <AuthNavigator />}
        </NavigationContainer> }
      </Provider>
    </>
  )
}
export default App;
