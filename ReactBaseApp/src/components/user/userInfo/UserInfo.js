import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
import { err } from 'react-native-svg/lib/typescript/xml';
// import HttpUtil from '../../utils/http';
import User from '../User.json';
import { set } from 'immer/dist/internal';
import { useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UserInfo = ({route, navigation}) => {

  const {name,phone} = route.params;

  function jumpModifyNickname(){
    navigation.navigate('修改昵称');
  }
  function jumpUserProfile(){
    navigation.navigate('个人简介');
  }
  function jumpModifyPhone(){
    navigation.navigate('修改手机号');
  }
  function jumpModifyPassword(){
    navigation.navigate('修改密码');
  }
  async function signOut(){
    try {
      await AsyncStorage.removeItem('user_info');
    } catch (error) {
      console.log(error)
    }
    navigation.navigate('我的');
  }


  return(
    <View style = {styles.background}>
       
      <TouchableOpacity style = {styles.header}>
        <Avatar  style={{width:screenWidth*0.25,height:screenWidth*0.25,borderColor:"#BEBEBE",borderWidth:1}}  mr="4" >
          <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.25,height:screenWidth*0.25}} source={require('../../user/images/heard.jpg')} ></Image>
        </Avatar>
        <Text style={{fontSize:screenWidth*0.06}}>点击更换头像</Text>
      </TouchableOpacity>
      <View style = {styles.content}>
        <TouchableOpacity onPress={jumpModifyNickname} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.055,width:'30%',marginLeft:10}}>昵称</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.055}}>{name}</Text>
                <Icon style ={{marginRight:20}}  as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpUserProfile} style={styles.list} >
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.055, width:'30%',marginLeft:10}}>个人简介</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.055}}>无</Text>
                <Icon style ={{marginRight:20}}  as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpModifyPhone} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.055, width:'30%',marginLeft:10}}>手机号</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.055}}>{phone}</Text>
                <Icon style ={{marginRight:20}}  as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpModifyPassword} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.055, width:'30%',marginLeft:10}}>修改密码</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                {/* <Text style = {{fontSize:screenWidth*0.055}}>个人信息</Text> */}
                <Icon style ={{marginRight:20}}  as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity  style={styles.list}>
          <Button onPress={signOut}  _text={{fontSize:screenWidth*0.055} }  colorScheme={'error'} style={{ borderRadius:4,marginTop:30, width:"90%", height:screenHeight*0.08,alignItems:'center'}} >
            退出登录
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  ) 
  
}
export default UserInfo;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:screenHeight*0.25,
    justifyContent: 'center',
    alignItems:'center'
  },
  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },
  content:{
    // borderWidth:1,
    height:320,
    width:"100%",
    marginTop:"3%",
    backgroundColor:"#ffffff"
  },
  list:{
    justifyContent:'center',
    alignItems:'center',
    height:screenHeight*0.09,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5"
  }
  
})