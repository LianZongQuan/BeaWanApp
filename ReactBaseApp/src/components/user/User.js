import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
import HttpUtil from '../../utils/http';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const User = ({navigation}) => {

  //用户数据
  const [user, setuser] = React.useState(null);
  
   React.useEffect(() => {
    const focus=navigation.addListener('focus',()=>{
      getUser();
    })
  });
  //未登录提示
  function loginAlter(){
    Alert.alert(
      "请登录后操作",
    );
  }
  
  function jumpLogin(){
    navigation.navigate('登录');
  }
  function jumpUserInfo(){
    if(user === null){
      loginAlter();
    }else{
      navigation.navigate('个人信息',{name:JSON.parse(user).name,phone:JSON.parse(user).phone});
    }
  }
  function jumpWallet(){
    if(user === null){
      loginAlter();
    }else{
      navigation.navigate('钱包');
    }
  }
  function jumpOrderInfo(){
    if(user === null){
      loginAlter();
    }else{
      navigation.navigate('订单信息');
    }
  }
  function jumpFeedBack(){
    navigation.navigate('意见反馈');
  }
  function jumpAboutApp(){
    navigation.navigate('关于');
  }
  async function getUser(){
    try {
      let user_info = await AsyncStorage.getItem('user_info');
      setuser(user_info)
    } catch (error) {
      console.log(error)
    }
  }

  //控制显示用户信息
  function head(){
    if(user === null){
      return(
        <HStack style={{marginLeft:screenWidth*0.05}}>
            <Avatar  style={{width:screenWidth*0.2,height:screenWidth*0.2,borderColor:"#BEBEBE",borderWidth:1}}  mr="4" >
              <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.2,height:screenWidth*0.2}} source={require('./images/heard.jpg')} ></Image>
            </Avatar>
          <TouchableOpacity onPress={jumpLogin} style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:screenWidth*0.07,color:"#6C6C6C"}}>登录/注册</Text>
          </TouchableOpacity>
        </HStack>
      )
    }else{
      return(
        <HStack style={{marginLeft:screenWidth*0.05}}>
            <Avatar  style={{width:screenWidth*0.2,height:screenWidth*0.2,borderColor:"#BEBEBE",borderWidth:1}}  mr="4" >
              <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.2,height:screenWidth*0.2}} source={require('./images/heard.jpg')} ></Image>
            </Avatar>
          <View onPress={jumpLogin} style={{alignItems:'flex-start'}}>
            <Text style={{fontSize:screenWidth*0.065,color:"#6C6C6C"}}>{JSON.parse(user).name}</Text>
            <Text style={{fontSize:screenWidth*0.065,color:"#6C6C6C",marginTop:5}}>{JSON.parse(user).phone}</Text>
          </View>
        </HStack>
      )

    }
  }

  return(
    <View style = {styles.background}>
       
      <View style = {styles.header}>
        {head()}
      </View>
      <View style = {styles.content}>
        <TouchableOpacity style={styles.list} onPress={jumpUserInfo} >
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="user" />} size={screenWidth*0.07} ml="2" color="#2DB7F5" />
            <Text style = {styles.listText}>个人信息</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={jumpWallet}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="wallet" />} size={screenWidth*0.07} ml="2" color="#54BCBD" />
            <Text style = {styles.listText}>钱包</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={jumpOrderInfo}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="profile" />} size={screenWidth*0.07} ml="2" color="#F4CE98" />
            <Text style = {styles.listText}>订单信息</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}onPress={jumpFeedBack}>
          <HStack style = {{marginLeft:"3%"}} >
            <Icon as={<MaterialIcons name="feedback" />} size={screenWidth*0.07} ml="2" color="#BD3124" />
            <Text style = {styles.listText}>意见反馈</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<MaterialCommunityIcons name="eye-off-outline" />} size={screenWidth*0.07} ml="2" color="#377F7F" />
            <Text style = {styles.listText}>隐私政策</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpAboutApp} style={styles.list}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="exclamationcircleo" />} size={screenWidth*0.07} ml="2" color="#FCCA00" />
            <Text style = {styles.listText}>关于</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
      </View>
    </View>
  ) 
  
}
export default User;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:screenHeight*0.2,
    justifyContent: 'center',
  },
  background:{
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },
  content:{
    // borderWidth:1,
    height:screenHeight*0.8,
    width:"100%",
    marginTop:"3%",
    backgroundColor:"#ffffff"
  },
  list:{
    justifyContent:'center',
    height:screenHeight*0.09,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5"
  },
  listText:{
    fontSize:screenWidth*0.055,
    width:screenWidth*0.73,
    marginLeft:10
  }
})