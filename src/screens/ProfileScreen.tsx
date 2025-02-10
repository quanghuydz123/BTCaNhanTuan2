import { TouchableOpacity, View } from "react-native"
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from "../components"
import { Image } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from "react"
import { appColors } from "../constants/appColors"
import Fontisto from 'react-native-vector-icons/Fontisto'
const ProfileScreen = ()=>{
    const [email, setEmail] = useState('abc@gmail.com');
    const [phone, setPhone] = useState('0378392311');
    const [address, setAddress] = useState('Thủ Đức');

    return (
        <ContainerComponent back title="Hồ sơ">
           <SectionComponent>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: 'https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj' }}
                            style={{
                                width:  140,
                                height:  140,
                                borderRadius:  100,
                                borderWidth:  1,
                                borderColor:  'gray',
                            }}
                        />
                        <View style={{position:'absolute',right:20,bottom:0,backgroundColor:'#DEDEDE',padding:4,borderRadius:100}}>
                            <Entypo name="camera" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
           </SectionComponent>
           <SectionComponent>
                <InputComponent 
                    value={email}
                    onChange={(val)=>setEmail(val)}
                    placeholder="Email"
                    affix={<Fontisto name='email' size={22} color={appColors.gray} />}
                    
                />
                <InputComponent 
                    value={phone}
                    onChange={(val)=>setPhone(val)}
                    placeholder="Phone"
                    affix={<Fontisto name='phone' size={22} color={appColors.gray} />}
                    
                />

                <InputComponent 
                    value={address}
                    onChange={(val)=>setAddress(val)}
                    placeholder="Address"
                    affix={<Entypo name='address' size={22} color={appColors.gray} />}
                    
                />
           </SectionComponent>
           <ButtonComponent text="Cập nhập" type="primary" onPress={()=>console.log("Cập nhập")}/>
        </ContainerComponent>
    )
}

export default ProfileScreen