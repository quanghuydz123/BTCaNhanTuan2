import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import SplashScreen from "../screens/SplashScreen";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, authReducer, authSelector, AuthState } from "../reduxs/reducers/authReducers";

const AppRouter = ()=>{
    const [isShowSplash, setIsShowSplash] = useState(true);
      const [accessToken, setAccessToken] = useState('');
      const {getItem,setItem} = useAsyncStorage('auth')
      const auth:AuthState = useSelector(authSelector)
      const dispatch = useDispatch()
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
        dispatch(addAuth({accesstoken:token,email:'',id:''}))
      }
    return (
        <NavigationContainer>
            {isShowSplash ? <SplashScreen /> : auth.accesstoken ? <MainNavigator/> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppRouter;
