import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Select,TextArea,Checkbox 
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


// const name = encodeURI('file://E:/VScode/react-base-app/ReactBaseApp/src/components/user/查重报告.pdf')
const PrivacyPolicy = ({navigation}) => {

  function test(){
    console.log(encodeURI("http://192.168.10.125:9528/#/dashboard"));
  }
  return(
    <View style={{height:screenHeight*1,backgroundColor:'#F5F5F5'}}>
      <View style={{width:screenWidth*1,height:screenHeight*0.15,alignItems:'center',justifyContent:'center'}}>
          <HStack>
            <View style={{height:screenHeight*0.15,alignItems:'center',justifyContent:'center'}}>
              <Icon as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} ml="2" color="#d81e06" />
            </View>
            <View style={{height:screenHeight*0.15,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.07,color:'#d81e06'}}>18.</Text>
            </View>
            <View style={{height:screenHeight*0.15,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:screenWidth*0.05,color:'#d81e06'}}>50</Text>
            </View>
          </HStack>
      </View>
      <View style={{marginLeft:screenWidth*0.03,height:screenHeight*0.03}}>
        <Text style={{fontSize:screenWidth*0.03}}>支付方式</Text>
      </View>
      <View style={{backgroundColor:'#ffffff',borderRadius:8,alignItems:'center',marginTop:screenHeight*0.02,width:screenWidth*0.94,alignSelf:'center'}}>
        <View style={{ justifyContent:'center',borderBottomWidth:1,borderColor:"#f5f5f5", height:screenHeight*0.07,width:screenWidth*0.94}}>
          <HStack>
            <View style={{justifyContent:'center',marginLeft:screenWidth*0.05,width:screenWidth*0.1}}>
              <Image width={screenWidth*0.07} height={screenWidth*0.07} alt='weixin' source={require('./images/wechatPay.png')}></Image>
            </View>
            <View style={{justifyContent:'center',width:screenWidth*0.7}}>
              <Text style={{fontSize:screenWidth*0.045,color:'black'}}>微信支付</Text>
            </View>
            <View style={{justifyContent:'center',alignSelf:'stretch',width:screenWidth*0.2}}>
              <Checkbox  size={'lg'} colorScheme="red" style={{borderRadius:50}} value="test" accessibilityLabel="This is a dummy checkbox"></Checkbox>
            </View>
          </HStack>
        </View>
        <View style={{justifyContent:'center',borderBottomWidth:1,borderColor:"#f5f5f5",height:screenHeight*0.07,width:screenWidth*0.94}}>
          <HStack>
            <View style={{justifyContent:'center',marginLeft:screenWidth*0.05,width:screenWidth*0.1}}>
              <Image width={screenWidth*0.07} height={screenWidth*0.07} alt='zhifubao' source={require('./images/zhifubao.png')}></Image>
            </View>
            <View style={{justifyContent:'center',width:screenWidth*0.7}}>
              <Text style={{fontSize:screenWidth*0.045,color:'black'}}>支付宝支付</Text>
            </View>
            <View style={{justifyContent:'center',alignSelf:'stretch',width:screenWidth*0.2}}>
              <Checkbox  size={'lg'} colorScheme="red" style={{borderRadius:50}} value="test" accessibilityLabel="This is a dummy checkbox"></Checkbox>
            </View>
          </HStack>
        </View>
        <View style={{justifyContent:'center',borderBottomWidth:1,borderColor:"#f5f5f5",height:screenHeight*0.07,width:screenWidth*0.94}}>
          <HStack>
            <View style={{justifyContent:'center',marginLeft:screenWidth*0.05,width:screenWidth*0.1}}>
              <Image width={screenWidth*0.07} height={screenWidth*0.07} alt='yinlian' source={require('./images/yinlian.png')}></Image>
            </View>
            <View style={{justifyContent:'center',width:screenWidth*0.7}}>
              <Text style={{fontSize:screenWidth*0.045,color:'black'}}>银行卡支付</Text>
            </View>
            <View style={{justifyContent:'center',alignSelf:'stretch',width:screenWidth*0.2}}>
              <Checkbox  size={'lg'} colorScheme="red" style={{borderRadius:50}} value="test" accessibilityLabel="This is a dummy checkbox"></Checkbox>
            </View>
          </HStack>
        </View>
      </View>
      <View style={{ marginTop:screenHeight*0.33, height:screenHeight*0.15,alignItems:'center', backgroundColor:"#ffffff",}}>
        <TouchableOpacity style={{height:screenHeight*0.06,borderRadius:30,justifyContent:'center',alignItems:'center', marginTop:screenHeight*0.03,backgroundColor:"#FF5252", width:screenWidth*0.9}}>
        <Text style={{fontSize:screenWidth*0.045,color:'#ffffff'}}>确认支付</Text>

        </TouchableOpacity>
      </View>

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