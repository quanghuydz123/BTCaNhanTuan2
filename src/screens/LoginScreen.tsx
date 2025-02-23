import React, { useEffect, useState } from 'react';
import { View,  Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContainerComponent, SectionComponent, SpaceComponent, InputComponent, RowComponent, ButtonComponent, TextComponent } from '../components';
import { appColors } from '../constants/appColors';
import { Validate } from '../utils/validate';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useDispatch } from 'react-redux';
import { addAuth } from '../reduxs/reducers/authReducers';
const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        const emailValidation = Validate.email(email);
    
        if (!email || !password || !emailValidation) {
          setIsDisable(true);
        } else {
          setIsDisable(false);
        }
      }, [email, password]);
    const handleLogin = async ()=>{
        dispatch(addAuth({accesstoken:'huy',id:'',email:''}))
        await AsyncStorage.setItem('auth','huy')
    }
    return (
        <ContainerComponent isImageBackground isScroll>
          <SectionComponent
            styles={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 75,
            }}>
            <Image
              source={require('../assets/images/text-logo.png')}
              style={{
                width: 162,
                height: 114,
                marginBottom: 30,
              }}
            />
          </SectionComponent>
          <SectionComponent>
            <TextComponent   size={24} title text="Sign in" />
            <SpaceComponent height={21} />
            <InputComponent
              value={email}
              placeholder="Email"
              onChange={val => setEmail(val)}
              allowClear
              affix={<Fontisto name='email' size={22} color={appColors.gray} />}
            />
            <InputComponent
              value={password}
              placeholder="Password"
              onChange={val => setPassword(val)}
              isPassword
              allowClear
              affix={<AntDesign name='lock1' size={22} color={appColors.gray} />}
            />
            <RowComponent justify="space-between">
              <RowComponent onPress={() => setIsRemember(!isRemember)}>
                <Switch
                  trackColor={{true: appColors.primary}}
                  thumbColor={appColors.white}
                  value={isRemember}
                  onChange={() => setIsRemember(!isRemember)}
                />
                <SpaceComponent width={4} />
                <TextComponent text="Remember me" />
              </RowComponent>
              <ButtonComponent
                text="Forgot Password?"
                onPress={() => console.log("ok")}
                type="text"
              />
            </RowComponent>
          </SectionComponent>
          <SpaceComponent height={16} />
          <SectionComponent>
            <ButtonComponent
              disable={isDisable}
              onPress={handleLogin}
              text="SIGN IN"
              type="primary"
            />
          </SectionComponent>
          {/* <SocialLogin /> */}
          <SectionComponent>
            <RowComponent justify="center">
              <TextComponent text="Don’t have an account? " />
              <ButtonComponent
                type="link"
                text="Sign up"
                onPress={() => navigation.navigate('ProfileScreen')}
              />
            </RowComponent>
          </SectionComponent>
        </ContainerComponent>
      );
    };
    

export default LoginScreen;
