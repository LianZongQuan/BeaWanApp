import React, { Component } from 'react';
import {Pressable,Modal,
  Text,HStack,Center,VStack,Box,Button,AspectRatio,Image,Stagger,Stack,isOpen,useToast,Alert,IconButton,CloseIcon,
  Icon,ScrollView,Ionicons,Flex,Spacer,Input,Divider,View, Container,Checkbox
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
import { isvalidatemobile ,validatenull} from '../../utils/validate'
const MSGINIT = "发送验证码",
  MSGSCUCCESS = "${time}秒后重发",
  MSGTIME = 60;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Login = ({navigation}) => {
  //控制密码是否显示
  const [show, setShow] = React.useState(false);
  //控制是否采用验证码登录 true：密码登录 false：验证码登录
  const [passwordLogin,setpasswordLogin] = React.useState(false);
  //登录方式
  const [loginMode,setloginMode] = React.useState("密码登录");
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
  const toast = useToast();
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
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={screenWidth*0.06} mr="2" color="muted.400" /></Pressable>
          }
          fontSize = {screenWidth*0.045} 
          borderRadius={25}
          variant='unstyled' borderColor={'blueGray.300'} placeholder="请输入密码" backgroundColor={'#efefef'}
          onChangeText={(password)=>setpassword(password)}>
        </Input>
      )
    }else{
      return(
        <HStack w={'full'} style={{height:screenHeight*0.1}} alignItems={'center'}>
          <View style={{height:screenHeight*0.1,justifyContent:'center'}}>
            <Input 
              type={"text"}
              fontSize = {screenWidth*0.045} 
              w={screenWidth*0.6}
              h={screenHeight*0.06}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              borderTopLeftRadius={25}
              borderBottomLeftRadius={25}
              variant='unstyled' borderColor={'blueGray.300'}  backgroundColor={'#efefef'} placeholder="请输入验证码" >
            </Input>  
          </View>
         
          <View style={{height:screenHeight*0.1,justifyContent:'center'}}>
            <Button disabled={msgKey}
              borderTopRightRadius={25}
              borderBottomRightRadius={25}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              // borderLeftWidth={1}
              _text={{fontSize:screenWidth*0.035,color:'#666666'} }  backgroundColor={'#efefef'} onPress={sendCode} borderRadius={0} w={screenWidth*0.3} height={screenHeight*0.06}>
              { msgText }
            </Button>
          </View>

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
  //自定义提示
  function  customAlter(id,status,title){
    toast.show({
      id:1,
      render: () => {
        return <Alert w={screenWidth*0.6} borderRadius={'lg'}  variant={'subtle'} status={status} mt={screenHeight*0.2}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon size={screenWidth*0.06} mt="1" />
                  <Text style={{color:"black",  fontSize:screenWidth*0.05}} >
                      {title}
                  </Text>
                </HStack>
                <IconButton onPress={() => toast.close(1)} variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon   size={screenWidth*0.04}  />} _icon={{
              color: "coolGray.600"
            }} />
              </HStack>
            </VStack>
          </Alert>;
      },
      placement: "top"
    })
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
    let isnumber = isvalidatemobile(mobile);
    if(isnumber[0] == true){
      customAlter(123,'warning',isnumber[1])
      return;
    }
    console.log('lian')
    let url = HttpUtil.localUrl+'company/user/loginByPassword?phoneNumber='+mobile+'&'+'password='+password;

    let header = {};
    console.log(url)
    HttpUtil.get(url,null,header,function(response){
      if(response.data.code === 0){
          let user_info = JSON.stringify(response.data.data)
          AsyncStorage.setItem('user_info',user_info)
          navigation.navigate('我的')
      }else if(response.data.code === 1){
          
      }else{

      }})
    
  }

  function loginWx(){
    WeChat.registerApp('wx5a01a8ac8e18289c', '').then(res => {
      console.log("是否已经注册微信：" + res)
    })
    WeChat.isWXAppInstalled().then( (isInstalled)=>{
      WeChatLogin('wx5a01a8ac8e18289c','6c4d8f624c96c704d16a4c49edef0977',(userInfo)=>{
        setweChatId(userInfo.unionid)
        setnickName(userInfo.nickname)
        let header = {};
        let url = HttpUtil.localUrl+'company/user/getByChat?weChatId='+userInfo.unionid;
        console.log(url)
        HttpUtil.get(url,null,header,function(response){
          if(response.data.code === 0){
            let user_info = JSON.stringify(response.data.data)
            AsyncStorage.setItem('user_info',user_info)
            navigation.navigate('我的')
          }else if(response.data.code === 1){
            setModalVisible(true)
          }else{

          }
        })
      },(err)=>{
          console.log('授权失败',err)
      })
    }).catch((err)=>{
      console.log(err)
    })    
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
    let number = ''
    console.log(isvalidatemobile(number))


      // navigation.navigate('注册')

      
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
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,marginTop:5,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            登录
          </Text>
        {/* </View> */}
      </HStack>
      <Center style={{marginTop:screenHeight*0.04}}>
        <Image alt='1' style={{width:screenWidth*0.3,height:screenWidth*0.3}} source={require('../HomeScreen/images/logo.png')}></Image>
        {/* <Image alt='2' style={{width:screenWidth*0.5,height:screenHeight*0.06}}  source={require('../HomeScreen/images/beawan.png')}></Image> */}
      </Center >
      <Center style = {{marginTop:"7%"}} >
        <Stack space={4} w="90%" maxW="450px" mx="auto">
          <Input  
            InputLeftElement={
              // <Icon as={<Feather name="phone" />} size={screenWidth*0.07} ml="2" marginRight={'2'} color="muted.400" />
              <Text style={{fontSize:screenWidth*0.05,marginLeft:8,paddingRight:8,borderRightWidth:1}}>+86</Text>
            }
            InputRightElement={
              <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} color="#bebebe" />
            }
            borderRadius={25}
            fontSize = {screenWidth*0.045}
            onChangeText={(mobile)=>setmobile(mobile)} 
            variant='unstyled' borderColor={'blueGray.300'}  backgroundColor={'#efefef'} placeholder={'请输入手机号'}>
          </Input>
          {passwordOrCode()}

        </Stack>
      </Center>
      <Center style = {{marginTop:"3%"}}>
        <Stack  alignItems={'center'} w={'full'} >
          <HStack style={{height:screenHeight*0.06,alignSelf:'flex-start',marginLeft:screenWidth*0.05}}>
            <View style={{height:screenHeight*0.06,justifyContent:'center',marginRight:10}} >
              <Checkbox  colorScheme='blue' boxSize={screenWidth*0.05} borderWidth={1} style={{borderRadius:50}} value="test" accessibilityLabel="This is a dummy checkbox"></Checkbox>
            </View>
            <View style={{height:screenHeight*0.06,justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.035}}>已阅读并同意</Text>
            </View>
            <View style={{height:screenHeight*0.06,justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.035}}>隐私政策</Text>
            </View>
            <View style={{height:screenHeight*0.06,justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.035}}>和</Text>
            </View>
            <View style={{height:screenHeight*0.06,justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.035}}>服务协议</Text>
            </View>
          </HStack>
          <Button _text={{fontSize:screenWidth*0.055,color:'black'} } mt={screenHeight*0.01} bgColor={'#EFEFEF'} onPress={loginMode=='验证码登录'? loginByPhone:loginByCode}  
            style={{ width:"86%", height:screenWidth*0.13 ,alignItems:'center',borderRadius:25}} >
            {passwordLogin==true?'登录':'登录/注册'}
          </Button>

          <Box alignSelf='center'>
            <Flex direction="row">
              <TouchableOpacity onPress={changeLoginType} style={{marginTop:screenHeight*0.02}}>
                <Text color={'#0256C3'} fontSize={screenWidth*0.04}>{loginMode}</Text>
              </TouchableOpacity>
            </Flex>
         </Box> 

            <Text style={{fontSize:screenWidth*0.03,color:'#666666',marginTop:screenHeight*0.2}}>
              ————其它登录方式————
            </Text>
            <HStack style={{ justifyContent:'center',width:'60%', marginTop:screenHeight*0.02}}>
            {/* <Spacer></Spacer> */}
              <TouchableOpacity onPress={loginWx} style={{ borderRadius:50, backgroundColor:'#f5f5f5',alignItems:'center',justifyContent:'center',width:screenHeight*0.05,height:screenHeight*0.05}}>
                <Icon as={<AntDesign name="wechat" />} size={screenWidth*0.06}  color="#81B337"  />

              </TouchableOpacity>
              {/* <Spacer></Spacer>
              <TouchableOpacity style={{ borderRadius:50, backgroundColor:'#f5f5f5',alignItems:'center',justifyContent:'center',width:screenHeight*0.05,height:screenHeight*0.05}}>
                <Icon as={<AntDesign name="wechat" />} size={screenWidth*0.06}  color="#81B337"  />

              </TouchableOpacity>
              <Spacer></Spacer>
              <TouchableOpacity style={{ borderRadius:50, backgroundColor:'#f5f5f5',alignItems:'center',justifyContent:'center',width:screenHeight*0.05,height:screenHeight*0.05}}>
                <Icon as={<AntDesign name="wechat" />} size={screenWidth*0.06}  color="#81B337"  />

              </TouchableOpacity>
              <Spacer></Spacer> */}
            {/* <Icon  as={} size={screenWidth*0.07} ml="2" color="#81B337" />} mt={screenHeight*0.018} variant="outline"   style={{ fontSize:'100', width:"80%", height:screenWidth*0.15 ,borderRadius:30 ,alignItems:'center'}} */}
            </HStack >
        {/* <Button  _text={{fontSize:screenWidth*0.055} } onPress={loginWx} leftIcon={<Icon  as={<AntDesign name="wechat" />} size={screenWidth*0.07} ml="2" color="#81B337" />} mt={screenHeight*0.018} variant="outline"   style={{ fontSize:'100', width:"80%", height:screenWidth*0.15 ,borderRadius:30 ,alignItems:'center'}}>
            微信登录
          </Button> */}
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