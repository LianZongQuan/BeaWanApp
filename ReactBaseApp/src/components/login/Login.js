import React, { Component } from 'react';
import {Pressable,Modal,
  Link,Text,HStack,Center,Heading,Switch,useColorMode,NativeBaseProvider,VStack,Box,Button,AspectRatio,Image,Stagger,Stack,FormControl,isOpen,Select,CheckIcon,
  children,Actionsheet,WarningOutlineIcon,AlertDialog,Icon,ScrollView,Ionicons,Flex,Radio,Spacer,Input,AddIcon,Divider,Checkbox,sidebarItems,View, Container
} from 'native-base';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'


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
import * as WeChat from 'react-native-wechat-lib';
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
  //输入的验证码
  const [inputCode,setinputCode] = React.useState('');
  //验证码
  const [code,setcode] = React.useState(''); 
  //微信唯一id
  const [weChatId,setweChatId] = React.useState('');
  //微信昵称
  const [nickName,setnickName] = React.useState('');
  //发送验证码按钮文本
  const [msgText,setmsgText] = React.useState(MSGINIT); 
  //验证码是否发送
  const [msgKey,setmsgKey] = React.useState(false);
  //验证码时间
  let codetime = MSGTIME;
  let idcode = '';
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    //按压测试
    function onPressTest(){
      setModalVisible(!modalVisible);
    }

  //控制验证码登录组件或是密码登录组件
  function passwordOrCode(){
    if(passwordLogin){
      return(
        <Input 
          type={show ? "text" : "password"}
          // InputLeftElement={
          //   <Icon as={<AntDesign name="lock" />} size={screenWidth*0.07} ml="2" marginRight={'2'} color="muted.400" />
          // }
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
          <Button disabled={msgKey}  onPress={sendCode} w={screenWidth*0.33} size={screenWidth*0.12}>
            { msgText }
          </Button>
        </HStack>
      )
    }
  }
  //发送验证码
  function sendCode(){
    if (msgKey) return;
    let url = HttpUtil.localUrl+'company/user/getCode?phoneNumber='+mobile;
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      if(response.data.code === 0){
        setcode(response.data.data)
        timeCacl();
      }
      console.log(response.data)
    })
  }
  function bindMobile(){
    let url = HttpUtil.localUrl+'company/user/weChatRegister';
    let data = {
      weChatId: weChatId,
      nickName: nickName,
      phoneNumber:mobile
    } 
    let header = {"Content-Type": "application/json;"};
    if(code === inputCode){
      HttpUtil.post(url,data,header,function(response){
        if(response.data.code === 0){
          let user_info = JSON.stringify(response.data.data)
          AsyncStorage.setItem('user_info',user_info)
          navigation.navigate('我的')
      }else{
          console.log(response.data)
      }})

    }else{
      console.log(code);
      console.log(inputCode);
    }
  }

  //验证码计时器
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
    let url = HttpUtil.localUrl+'company/user/loginByCode?phoneNumber='+mobile+'&'+'code='+code;
    let header = {};
    // let url = HttpUtil.localUrl + 'company/user/logout';
    console.log(url)
    HttpUtil.get(url,null,header,function(response){
      if(response.data.code === 0){
          let user_info = JSON.stringify(response.data.data)
          AsyncStorage.setItem('user_info',user_info)
          navigation.navigate('我的')
      }else if(response.data.code === 1){
          setModalVisible(true)
      }else{

      }})
  }
  //使用手机号密码登录
  function loginByPhone(){
    let url = HttpUtil.localUrl+'company/user/loginByPassword?phoneNumber='+mobile+'&'+'password='+password;

    let header = {};
    console.log(url)
    HttpUtil.get(url,null,header,function(response){
      if(response.data.code === 0){
          let user_info = JSON.stringify(response.data.data)
          AsyncStorage.setItem('user_info',user_info)
          // AsyncStorage.setItem('token',response.data.data.token)
          // console.log(response.data.data)
          navigation.navigate('我的')
      }else if(response.data.code === 1){
          setModalVisible(true)
      }else{

      }})
    
  }

  function loginWx(){
    WeChat.registerApp('wx5a01a8ac8e18289c', '').then(res => {
      console.log("是否已经注册微信：" + res)
    })
    // WeChat.isWXAppInstalled().then( (isInstalled)=>{
    //   WeChatLogin('wx5a01a8ac8e18289c','6c4d8f624c96c704d16a4c49edef0977',(userInfo)=>{
    //     setweChatId(userInfo.unionid)
    //     setnickName(userInfo.nickname)
    //     let header = {};
    //     let url = HttpUtil.localUrl+'company/user/getByChat?weChatId='+userInfo.unionid;
    //     console.log(url)
    //     HttpUtil.get(url,null,header,function(response){
    //       if(response.data.code === 0){
    //         let user_info = JSON.stringify(response.data.data)
    //         AsyncStorage.setItem('user_info',user_info)
    //         navigation.navigate('我的')
    //       }else if(response.data.code === 1){
    //         setModalVisible(true)
    //       }else{

    //       }
    //     })
    //   },(err)=>{
    //       console.log('授权失败',err)
    //   })
    // }).catch((err)=>{
    //   console.log(err)
    // })
        setweChatId('123')
        setnickName('lian')
    setModalVisible(true)
    
  }
  function WeChatLogin(APP_ID, APP_SECRET, successCallback, errorCallback) {
    console.log('APP_ID===',APP_ID)
    WeChat.sendAuthRequest('snsapi_userinfo').then((data) => {
        // console.log('用户微信信息===',data) 
      getAccessToken(APP_ID, APP_SECRET, data.code,successCallback,errorCallback);
    }).catch((err) => {
        // console.log('授权失败', err);
        errorCallback(err)
    })
  }
  // 获取 access_token
  function getAccessToken(APP_ID, APP_SECRET,code,successCallback,errorCallback) {
    var AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APP_ID + '&secret=' + APP_SECRET + '&code=' + code + '&grant_type=authorization_code';
    // console.log('AccessTokenUrl=',AccessTokenUrl);
   WeChatGet(AccessTokenUrl,(datas)=>{
        
    getRefreshToken(APP_ID,datas.refresh_token,successCallback,errorCallback);
    },(err)=>{
        errorCallback(err)
    })
  }
  // 获取 refresh_token
  function getRefreshToken(APP_ID,refresh_token,successCallback,errorCallback) {
    let getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + APP_ID + '&grant_type=refresh_token&refresh_token=' + refresh_token;
   WeChatGet(getRefreshTokenUrl,(datas)=>{
        getUserInfo(datas,successCallback,errorCallback);
    },(err)=>{
        errorCallback(err)
    })
  }
  //获取用户信息
  function getUserInfo(responseData,successCallback,errorCallback){
    var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + responseData.access_token + '&openid=' + responseData.openid;
    WeChatGet(getUserInfoUrl,(datas)=>{
        successCallback(datas)
    },(err)=>{
        errorCallback(err)
    })
  }
  function WeChatGet(url,successCallback,errorCallback){
    fetch(url, {
        method: 'GET',
        timeout: 2000,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
        .then((response) => response.json())
        .then((responseData) => {
            successCallback(responseData)
        })
        .catch((error) => {
            if (error) {
                errorCallback(error)
            }
        })
  }
  
  //跳转到注册页面
  function jumpRegister(){
      navigation.navigate('注册')
    }
  return(
    <Box  style = {styles.container}>
      <Modal size={'lg'} style={{alignItems:'center',alignSelf:'center'}} isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Body>
            <View alignItems={'center'} mt={'2'}>
              <Text style={{fontSize:screenWidth*0.035}}>请绑定手机号</Text>
            </View>
            <View  mt={'6'}>
              <Input  
                style={{width:'100%'}}
                fontSize = {screenWidth*0.03}
                onChangeText={(mobile)=>setmobile(mobile)} 
                variant='rounded' placeholder={'手机号'}>
              </Input>
            </View>
            <HStack width={'full'} mt={'6'} >
              <View width={'1/2'}>
                <Input  
                  style={{width:'100%'}}
                  fontSize = {screenWidth*0.03}
                  onChangeText={(inputCode)=>setinputCode(inputCode)} 
                  variant='rounded' placeholder={'验证码'}>
                </Input>
              </View>
              <View width={'1/3'} marginLeft={'4'} >
                <Button disabled={msgKey}  onPress={sendCode}>
                  { msgText }
                </Button>
              </View>
            </HStack>
            <Button mt={'6'} onPress={bindMobile} colorScheme="blueGray">确认 </Button>
            <Button mt={'6'} colorScheme="blueGray" onPress={() => {
              setModalVisible(false)}}>取消 </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <TouchableOpacity  onPress={jumpRegister} style={{marginTop:15,marginRight:15}}>
        <Text style={{alignSelf:'flex-end',fontSize:18}}>注册</Text>
      </TouchableOpacity>
      <Center style={{marginTop:screenHeight*0.05}}>
        {/* <Image  w={'32'} h={'32'} alt='登录图标' source={require('./images/login_icon.png') }>
        </Image> */}
         <Icon as={<FontAwesome5 name="user-circle" />} size={24}  color="muted.400" />
      </Center >

      <Center style = {{marginTop:"10%"}} >
        <Stack space={4} w="90%" maxW="450px" mx="auto">
          <Input  
            // InputLeftElement={
            //   <Icon as={<Feather name="phone" />} size={screenWidth*0.07} ml="2" marginRight={'2'} color="muted.400" />
            // }
            fontSize = {screenWidth*0.055}
            onChangeText={(mobile)=>setmobile(mobile)} 
            variant="underlined" placeholder={'手机号'}>
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
          <Button _text={{fontSize:screenWidth*0.055} }  onPress={loginMode=='验证码登录'? loginByPhone:loginByCode}  style={{ width:"80%", height:screenWidth*0.15 ,alignItems:'center',borderRadius:30}} >
            登录
          </Button>

        <Button  _text={{fontSize:screenWidth*0.055} } onPress={loginWx} leftIcon={<Icon  as={<AntDesign name="wechat" />} size={screenWidth*0.07} ml="2" color="#81B337" />} mt={screenHeight*0.018} variant="outline"   style={{ fontSize:'100', width:"80%", height:screenWidth*0.15 ,borderRadius:30 ,alignItems:'center'}}>
            微信登录
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

//附录
  //使用账号密码登录
  /*function loginByUsername(){
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
  }*/

  /*
    使用验证码登录
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
  */
 /*
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
  */