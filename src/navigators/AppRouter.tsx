import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "../screens/HomePage";
import YourSelfPage from "../screens/YourSelfPage";

const AppRouter = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="YourSelfPage" component={YourSelfPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
    )
}

export default AppRouter;
