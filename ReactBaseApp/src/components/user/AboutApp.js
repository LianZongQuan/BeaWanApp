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
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            关于
          </Text>
        {/* </View> */}
      </HStack>
      <Image alt='logo'  style={{width:screenWidth*0.23,height:screenWidth*0.23,marginTop:'10%'}}  source={require('../HomeScreen/images/logo.png')}></Image>
      <Image alt='logo'  style={{width:screenWidth*0.4,marginTop:10,height:screenHeight*0.05}}  source={require('../HomeScreen/images/beawan.png')}></Image>
      
      <View style = {styles.content}>
        <TouchableOpacity style={styles.list}  >
          <HStack>
            {/* <Icon as={<AntDesign name="user" />} size={screenWidth*0.07} ml="2" color="#2DB7F5" /> */}
            <Text style = {styles.listText}>服务条款</Text>
            <Icon  as={<AntDesign name="right" />} size={screenWidth*0.06} />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} >
          <HStack >
            {/* <Icon as={<AntDesign name="wallet" />} size={screenWidth*0.07} ml="2" color="#54BCBD" /> */}
            <Text style = {styles.listText}>使用帮助</Text>
            <Icon  as={<AntDesign name="right" />} size={screenWidth*0.06}  color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} >
          <HStack >
            {/* <Icon as={<AntDesign name="profile" />} size={screenWidth*0.07} ml="2" color="#F4CE98" /> */}
            <Text style = {styles.listText}>隐私政策</Text>
            <Icon  as={<AntDesign name="right" />} size={screenWidth*0.06}  color="muted.400" />
          </HStack>     
        </TouchableOpacity>
        <View style={{marginTop:screenHeight*0.2,alignItems:'center'}}>
          <Text style={{fontSize:screenWidth*0.04}}>杭州碧湾信息技术有限公司</Text>
          <Text style={{fontSize:screenWidth*0.04}}>版权所有</Text>

          <Text style={{fontSize:screenWidth*0.03}}>Copyright@2016-2022 BeaWan. All Rights Reserved</Text>
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
    backgroundColor:"#fdfdfd"

  },
  content:{
    // borderWidth:1,
    height:screenHeight*0.8,
    width:"100%",
    marginTop:"3%",
    alignItems:'center'
  },
  list:{
    // backgroundColor:"#ffffff",
    borderTopWidth:1,
    
    justifyContent:'center',
    height:screenHeight*0.08,
    width:"75%",
    borderBottomWidth:1,
    borderColor:"#efefef"
  },
  listText:{
    fontSize:screenWidth*0.05,
    width:screenWidth*0.73,
    color:'#333333'
    // marginLeft:10
  }

  
})