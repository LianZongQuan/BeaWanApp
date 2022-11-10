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
const PrivacyPolicy = ({navigation}) => {

  function test(){
    console.log(encodeURI("http://192.168.10.125:9528/#/dashboard"));
  }
  return(
    <View style={{height:screenHeight*1}}>
  {/* <Button onPress={test}>CESHI </Button> */}
  <WebView style={{width:screenWidth}} source={{ uri: 'http://192.168.10.125:9528/#/dashboard' }} />

  {/* <WebView style={{width:screenWidth*0.5,height:600}}  source={{uri : 'http://192.168.10.186:8088/xx.PDF'}} /> */}

    </View>

  )
  
}
export default PrivacyPolicy;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },

  
})