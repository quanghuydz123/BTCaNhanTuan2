import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";

const MainNavigator = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator;
