/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./src/navigators/AppRouter";
const App = ()=>{
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  )
}
export default App;
