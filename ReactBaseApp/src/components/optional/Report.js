import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Select,TextArea, Link 
} from 'native-base';
import { StyleSheet, TextInput, TouchableOpacity,Dimensions, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';
import * as WeChat from 'react-native-wechat-lib';
import { Text } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// import * as WeChat from 'react-native-wechat-lib';
import HttpUtil from '../../utils/http'
import Util, { WeChatLogin } from '../../utils/util'
import { Path } from 'react-native-svg';
import CircleProgressView from '../../utils/CircleProgressView';

const Report = ({navigation}) => {
  React.useEffect(() => {
    WeChat.registerApp('wx5a01a8ac8e18289c', '').then(res => {
      console.log("是否已经注册微信：" + res)
    })
  },[]);



function wxpay(){
  WeChat.isWXAppInstalled()
  .then((isInstalled) => {
      console.log('是否安装微信', isInstalled);
      if (isInstalled) {
        //执行支付
          WeChat.pay({
              partnerId: '1900000109',  // 商家向财付通申请的商家id
              prepayId: 'WX1217752501201407033233368018',   // 预支付订单
              nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',   // 随机串，防重发
              timeStamp: '1412000000',  // 时间戳，防重发.
              package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名, 默认为 ‘Sign=WXPay’
              sign: 'MD5'   // 商家根据微信开放平台文档对数据做的签名，默认为 ‘MD5’
          }).then((requestJson)=>{
              console.log('支付回调', requestJson);
              //支付成功回调
              if (requestJson.errCode === 0){
                  console.log('支付成功');
              }
          }).catch((err)=>{
              console.log('支付失败', err);
          })
          
      } else {
          Toast.fail({
              content: '您还没有安装微信，请安装微信之后再试',
              duration: 1.5
          })
      }
  });
}
 

  function wx(){
    WeChat.shareText({
      text: 'Text content.',
      scene: 0,
    });
    // WeChat.openWXApp();
  }
  function download(){
    Linking.openURL('http://192.168.10.186:8080/test.pdf')
  }







  return(
    <View style={{height:screenHeight*1,alignItems:'center'}}>

      <HStack style={{width:screenWidth,height:screenHeight*0.1}}>
        <View style={{width:screenWidth*0.55,height:screenHeight*0.1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:20}}>东方财富2021年报</Text>
        </View>

        <View style={{width:screenWidth*0.14,height:screenHeight*0.1,justifyContent:'center',alignItems:'center'}}>
          <CircleProgressView raduis={screenHeight*0.035} progressBaseColor={'#BEBEBE'} progressColor = {'#E87777'} baseProgressWidth={4} progressWidth={4} progress={87} >
            <View style={{alignItems:'center',justifyContent:'center'}} >
              <Text style={{fontSize:18}}>
                87
              </Text>
            </View>
            </CircleProgressView>
        </View>
        <TouchableOpacity onPress={wx} style={{width:screenWidth*0.15,height:screenHeight*0.1,justifyContent:'center',alignItems:'center'}}>
          <Icon  as={<AntDesign name="wechat" />} size={screenWidth*0.07} ml="2" color="#81B337" />
        </TouchableOpacity>
        <TouchableOpacity onPress={download} style={{width:screenWidth*0.15,height:screenHeight*0.1,justifyContent:'center',alignItems:'center'}}>
          <Icon  as={<AntDesign name="download" />} size={screenWidth*0.07} ml="2" color="#215476" />
        </TouchableOpacity>
      </HStack>
      <View style={{width:screenWidth,height:screenHeight*0.9}}>
        <WebView style={{}} source={{ uri: 'http://cxlzpblog.cn/' }} />
      </View>
    </View>

  )
  
}
export default Report;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },

  
})