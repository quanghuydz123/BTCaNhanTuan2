import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HomePage = ({navigation}:any)=>{

    return (
      <View style={{flex:1}}>
                  <View style={{backgroundColor:'#ccc',paddingVertical:20}}>
                     <Text style={{fontSize:20,paddingHorizontal:12}}>
                        HomePage
                     </Text>
                  </View>
                  <TouchableOpacity style={{paddingHorizontal:12}} onPress={()=>navigation.goBack()}>
                    <Text style={{fontSize:16,color:'blue'}}>
                        Quay lại
                    </Text>
                  </TouchableOpacity>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>
                        Đây là home Page
                    </Text>
                </View>
             </View>
    )
}

export default HomePage;
