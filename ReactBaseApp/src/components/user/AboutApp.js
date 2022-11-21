import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Select,TextArea 
} from 'native-base';
import { StyleSheet, TextInput, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';

import { Text } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import HttpUtil from '../../utils/http'
import { Path } from 'react-native-svg';
// const pdf2html = require('pdf2html')


const name = encodeURI('file://E:/VScode/react-base-app/ReactBaseApp/src/components/user/查重报告.pdf')
const AboutApp = ({navigation}) => {

  function test(){
    console.log(encodeURI("http://192.168.10.125:9528/#/dashboard"));
  }
  return(
    <View style={{    alignItems:'center',flex:1,backgroundColor:"#f5f5f5"}}>
      <Image alt='guanyu'  style={{borderWidth:1,width:screenWidth*0.8,height:screenHeight*0.1,marginTop:'10%'}}  source={require('../HomeScreen/images/head_icon.png')}></Image>
      <View style = {styles.content}>
        <TouchableOpacity style={styles.list}  >
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="user" />} size={screenWidth*0.07} ml="2" color="#2DB7F5" />
            <Text style = {styles.listText}>服务条款</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} >
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="wallet" />} size={screenWidth*0.07} ml="2" color="#54BCBD" />
            <Text style = {styles.listText}>使用帮助</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} >
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="profile" />} size={screenWidth*0.07} ml="2" color="#F4CE98" />
            <Text style = {styles.listText}>隐私政策</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.07} ml="2" color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <View style={{marginTop:40,alignItems:'center'}}>
          <Text style={{fontSize:16}}>杭州碧湾信息   版权所有</Text>
          <Text style={{fontSize:16}}>Copyright@2021-2022 BeaWan. All Rights Reserved</Text>
        </View>
      </View>
    </View>

  )
  
}
export default AboutApp;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
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