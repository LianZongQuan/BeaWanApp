import React, { Component } from 'react';
import {
  Text,Center,Box,Button,Image,Stack,Pressable,useToast,VStack, HStack,
  Icon,Input,View, Container,IconButton,CloseIcon,Alert
} from 'native-base';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Validate, { isvalidatemobile ,validatenull} from '../../utils/validate'
import HttpUtil from '../../utils/http';
// import Widgets from '../../utils/widgets';

const Register = ({navigation}) => {
  //控制密码是否显示
  const [show, setShow] = React.useState(false);
  //账号
  const [username,setusername] = React.useState('');
  //密码
  const [password,setpassword] = React.useState(''); 
  //电话
  const [phone,setphone] = React.useState('');
  //提示
  const toast = useToast();

  //提示组件（提示error 或者 success）
  const ToastAlert = ({
    status,
    description,
  }) =>
  <Alert w="100%" status={status}>
    <VStack space={2} flexShrink={1} w="100%">
      <HStack flexShrink={1} space={2} justifyContent="space-between">
        <HStack space={2} flexShrink={1}>
          <Alert.Icon mt="1" />
          <Text fontSize="md" color="coolGray.800">
          {description}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  </Alert>;

  /**
   * 弹出框
   * @param {*} s
   */
  function showToast(status,description,position){
    
    // showErrorToast('error','sss','top')

    // toast.show({
    //   placement: "bottom",
    //   render: ({
    //   }) => {
    //     return <ToastAlert description={'zhanghao cuowu '} status={'error'}/>;
    //   }
    // })
  }


  //注册
  function registerUser(){
    let that = this;
    var axios = require('axios');
    var qs = require('qs');
    var data = {
      'username': username,
      'password': password,
      'phone' :  phone
    };
    console.log(data);
    let url = HttpUtil.localUrl+'admin/register/user'
    let header = {};
    let list = isvalidatemobile(phone);
    console.log(list[1]);



    HttpUtil.post(url,data,header,function(response){
      if(response.status === 200){
        navigation.navigate('登录')
      }
      console.log(response);
    })
  }



  return(
    <Box  style = {styles.container}>
      <Center style = {{marginTop:"30%"}} >
        <Stack space={4} w="90%" maxW="450px" mx="auto">
          <Input  
            InputLeftElement={
              <Icon as={<MaterialIcons name="person" />} size={8} ml="2" color="muted.400" />
            }
            fontSize = {'2xl'} 
            onChangeText={(userName)=>setusername(userName)} 
            variant="underlined" placeholder=" 账号">
          </Input>
          <Input 
            type={show ? "text" : "password"}
            InputLeftElement={
              <Icon as={<AntDesign name="lock" />} size={8} ml="2" color="muted.400" />
            }
            InputRightElement={<Pressable onPress={() => setShow(!show)}>
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={8} mr="2" color="muted.400" /></Pressable>
            }
            fontSize = {'2xl'} 
            onChangeText={(password)=>setpassword(password)} 
            variant="underlined" placeholder=" 密码" >
          </Input>
          <Input  
            InputLeftElement={
              <Icon as={<AntDesign name="phone" />} size={8} ml="2" color="muted.400" />
            }
            fontSize = {'2xl'}
            onChangeText={(phone)=>setphone(phone)}  
            variant="underlined" placeholder=" 电话">
          </Input>
        </Stack>
      </Center>
      <Center style = {{marginTop:"3%"}}>
        <Stack  alignItems={'center'} w={'full'} >
          <Button onPress={registerUser}  _text={{fontSize:24} } mt={'10'} variant="outline" style={{ fontSize:'100', width:"80%", height:60 ,alignItems:'center'}}>
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
export default Register;