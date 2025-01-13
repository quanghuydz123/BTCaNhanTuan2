import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboaringScreen from "../screens/OnboaringScreen";
import HomeScreen from "../screens/HomeScreen";

const AuthNavigator = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboaringScreen" component={OnboaringScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />

        </Stack.Navigator>
    )
}

export default AuthNavigator;
