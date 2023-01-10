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
import HttpUtil from '../../../utils/http';
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
    let header = {};
    let url = HttpUtil.localUrl + 'company/user/logout'
    HttpUtil.get(url,null,header,function(response){})

    try {
      await AsyncStorage.removeItem('user_info');
    } catch (error) {
      console.log(error)
    }
    navigation.navigate('我的');
  }


  return(
    <View style = {styles.background}>
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            个人信息
          </Text>
        {/* </View> */}
      </HStack>
      <TouchableOpacity style = {styles.header}>
        <Avatar  style={{width:screenWidth*0.23,height:screenWidth*0.23,borderColor:"#BEBEBE",borderWidth:1}}  >
          <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.23,height:screenWidth*0.23}} source={require('../../user/images/heard.jpg')} ></Image>
        </Avatar>
        <Text style={{fontSize:screenWidth*0.052,marginTop:5,color:'#333333'}}>点击更换头像</Text>
      </TouchableOpacity>
      <View style = {styles.content}>
        <TouchableOpacity onPress={jumpModifyNickname} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.05,width:'30%',marginLeft:10,color:'#333333'}}>昵称</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.045,color:'#bebebe'}}>{name}</Text>
                <Icon style ={{marginRight:20}} color={'light.300'}  as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpUserProfile} style={styles.list} >
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.05, width:'30%',marginLeft:10,color:'#333333'}}>个人简介</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.045,color:'#bebebe'}}>无</Text>
                <Icon style ={{marginRight:20}} color={'light.300'}   as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpModifyPhone} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.05, width:'30%',marginLeft:10,color:'#333333'}}>手机号</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                <Text style = {{fontSize:screenWidth*0.045,color:'#bebebe'}}>{phone}</Text>
                <Icon style ={{marginRight:20}}color={'light.300'}    as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpModifyPassword} style={styles.list}>
          <HStack style = {{width:"94%"}}>
            <Text style = {{fontSize:screenWidth*0.05, width:'30%',marginLeft:10,color:'#333333'}}>修改密码</Text>
            <View style={{width:'70%',alignItems:'flex-end'}}>
              <HStack>
                {/* <Text style = {{fontSize:screenWidth*0.055}}>个人信息</Text> */}
                <Icon style ={{marginRight:20}} color={'light.300'} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
              </HStack> 
            </View>
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity  style={styles.list}>
          <Button onPress={signOut}  _text={{fontSize:screenWidth*0.055,color:'#666666'}} backgroundColor={'light.300'} style={{ borderRadius:6,marginTop:30, width:"90%", height:screenHeight*0.07,alignItems:'center'}} >
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
    backgroundColor:"#efefef"

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