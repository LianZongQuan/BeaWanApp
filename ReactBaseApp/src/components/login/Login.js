import React, { Component } from 'react';
import {Pressable,
  Link,Text,HStack,Center,Heading,Switch,useColorMode,NativeBaseProvider,VStack,Box,Button,AspectRatio,Image,Stagger,Stack,FormControl,isOpen,Select,CheckIcon,
  children,Actionsheet,WarningOutlineIcon,AlertDialog,Icon,ScrollView,Ionicons,Flex,Radio,Spacer,Input,AddIcon,Divider,Checkbox,sidebarItems,View, Container
} from 'native-base';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { StyleSheet, TouchableOpacity,Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpUtil from '../../utils/http';
import {deepClone, encryption} from '../../utils/util'
import AntDesign from 'react-native-vector-icons/AntDesign'
import buffer, { Buffer } from 'buffer';
import axios from 'axios'
// import { Console } from 'console';
import qs from 'qs'
import { Console } from 'console';
import { set } from 'immer/dist/internal';
const MSGINIT = "发送验证码",
  MSGSCUCCESS = "${time}秒后重发",
  MSGTIME = 60;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Login = ({navigation}) => {
  //控制密码是否显示
  const [show, setShow] = React.useState(false);
  //控制是否采用验证码登录 true：密码登录 false：验证码登录
  const [passwordLogin,setpasswordLogin] = React.useState(true);
  //登录方式
  const [loginMode,setloginMode] = React.useState("验证码登录");
  //账号
  const [username,setusername] = React.useState('');
  //密码
  const [password,setpassword] = React.useState(''); 
  //手机号
  const [mobile,setmobile] = React.useState(''); 
  //验证码
  const [code,setcode] = React.useState(''); 
  //发送验证码按钮文本
  const [msgText,setmsgText] = React.useState(MSGINIT); 
  //验证码是否发送
  const [msgKey,setmsgKey] = React.useState(false);
  //验证码时间
  let codetime = MSGTIME;
  let idcode = '';

  //控制验证码登录组件或是密码登录组件
  function passwordOrCode(){
    if(passwordLogin){
      return(
        <Input 
          type={show ? "text" : "password"}
          InputLeftElement={
            <Icon as={<AntDesign name="lock" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          }
          InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={screenWidth*0.07} mr="2" color="muted.400" /></Pressable>
          }
          fontSize = {screenWidth*0.055} 
          variant="underlined" placeholder=" 密码" 
          onChangeText={(password)=>setpassword(password)}>
        </Input>
      )
    }else{
      return(
        <HStack w={'full'} alignItems={'center'}>
          <Input 
            type={"text"}
            fontSize = {screenWidth*0.055} 
            w={screenWidth*0.6}
            
            variant="underlined" placeholder=" 验证码" >
          </Input>           
          <Button disabled={msgKey}  onPress={handleSend} w={screenWidth*0.33} size={screenWidth*0.12}>
            { msgText }
          </Button>
        </HStack>
      )
    }
  }
  //发送验证码
  function handleSend(){
    if (msgKey) return;
    let url = HttpUtil.localUrl+'admin/app/'+username;
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      if(response.status === 200){
        setcode(response.data.msg)
        timeCacl();
      }
      console.log(response)
      
    })
  }

  function timeCacl() {
    // 计时避免重复发送
    setmsgText(MSGSCUCCESS.replace("${time}", codetime));
    setmsgKey(true);
    const time = setInterval(() => {
      codetime = codetime-1;
      setmsgText(MSGSCUCCESS.replace("${time}", codetime));
      if (codetime === 0) {
        setmsgKey(false);
        setmsgText(MSGINIT);
        codetime = 60;
        clearInterval(time);
      }
    }, 1000);
  }
  //更改登录类型
  function changeLoginType(){
    if(passwordLogin){
      setpasswordLogin(false);
      setloginMode("密码登录")
    }else{
      setpasswordLogin(true);
      setloginMode("验证码登录")
    }
  }
  //使用验证码登录
  function loginByCode(){
    let basicAuth = 'Basic ' + Buffer.from('app:app').toString('Base64');
    let url = HttpUtil.localUrl+'auth/oauth2/token?grant_type=app&scope=server&mobile='+username+'&code='+code;
    let header = {'Authorization':basicAuth};
    data = null;
    console.log('验证码登录')
    // console.log('basic='+basicAuth+'url='+url)
    // console.log(code);
    HttpUtil.post(url,data,header,async function(response){
      console.log(response)
      if(response.status === 200){
        let user_info = JSON.stringify(response.data.user_info)
        await AsyncStorage.setItem('user_info',user_info)
        navigation.navigate('Home')
      }
    })
  }

  //使用账号密码登录
  function loginByUsername(){
    let loginForm = {
      username: username,
      password: password,
    } 
    const user = encryption({
      data: loginForm,
      key: 'thanks,pig4cloud',
      param: ['password']
    })
    var qs = require('qs');
    var data = qs.stringify({
      'username': user.username,
      'password': user.password 
    });
    let url = HttpUtil.localUrl+'auth/oauth2/token?grant_type=password&scope=server';
    let header = {'Authorization':'Basic dGVzdDp0ZXN0'};
    console.log(data);
    HttpUtil.post(url,data,header,async function(response){
      console.log(response)
      if(response.status === 200){
        let user_info = JSON.stringify(response.data.user_info)
        await AsyncStorage.setItem('user_info',user_info)
        navigation.navigate('我的')
      }
      console.log(response.data.user_info);
    })
  }
  //跳转到注册页面
  function jumpRegister(){
      navigation.navigate('注册')
    }
  return(
    <Box  style = {styles.container}>
      <Center mt={"1/6"}>
        {/* <Image  w={'32'} h={'32'} alt='登录图标' source={require('./images/login_icon.png') }>
        </Image> */}
         <Icon as={<FontAwesome5 name="user-circle" />} size={24}  color="muted.400" />
      </Center >

      <Center style = {{marginTop:"10%"}} >
        <Stack space={4} w="90%" maxW="450px" mx="auto">
          <Input  
            InputLeftElement={
              <Icon as={<MaterialIcons name="person" />} size={screenWidth*0.07} ml="2" color="muted.400" />
            }
            fontSize = {screenWidth*0.055}
            onChangeText={(userName)=>setusername(userName)} 
            variant="underlined" placeholder={passwordLogin?'账号':'手机号'}>
          </Input>
          {passwordOrCode()}
          <Box alignSelf="flex-end">
            <Flex direction="row" h="58" p="4">
              <TouchableOpacity onPress={changeLoginType}>
                <Text underline={true} color={'indigo.500'} fontSize={screenWidth*0.045}>{loginMode}</Text>
              </TouchableOpacity>
              <Divider bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
              <TouchableOpacity>
                <Text color={'indigo.500'} underline={true} fontSize={screenWidth*0.045}>忘记密码</Text>
              </TouchableOpacity>
            </Flex>
         </Box> 
        </Stack>
      </Center>
      <Center style = {{marginTop:"3%"}}>
      
      <Stack  alignItems={'center'} w={'full'} >

          <Button _text={{fontSize:screenWidth*0.055} } onPress={loginMode=='验证码登录'? loginByUsername:loginByCode}  style={{ width:"80%", height:screenWidth*0.15 ,alignItems:'center'}} >
            登录
          </Button>
          <Button  _text={{fontSize:screenWidth*0.055} } mt={screenHeight*0.018} variant="outline"  onPress={jumpRegister} style={{ fontSize:'100', width:"80%", height:screenWidth*0.15  ,alignItems:'center'}}>
            注册
          </Button>
        </Stack>
      </Center>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:"100%",
  }
})
export default Login;