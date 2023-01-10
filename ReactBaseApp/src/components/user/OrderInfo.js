import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity ,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
// import HttpUtil from '../../utils/http';
const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Item = () =>{
  return(
    <TouchableOpacity style={{marginTop:20,width:screenWidth*0.96,backgroundColor:'#ffffff',alignItems:'center',borderRadius:10}}>
      <HStack style={{width:screenWidth*0.96,backgroundColor:'#ffffff',height:screenHeight*0.04,alignItems:'center',justifyContent:'center'}}>
        <Text style={{width:screenWidth*0.6,fontSize:screenWidth*0.037,color:'#333333'}}>
          订单编号：548255865
        </Text>
        <Text style={{width:screenWidth*0.3,textAlign:'right',fontSize:screenWidth*0.037,color:'rgba(154, 154, 154, 1)'}}>
          已完成
        </Text>
      </HStack>
      <HStack style={{width:screenWidth*0.96,backgroundColor:'#ffffff',height:screenHeight*0.04,alignItems:'center',justifyContent:'center'}}>
        <Text style={{width:screenWidth*0.6,fontSize:screenWidth*0.045,height:screenHeight*0.04,color:'#333333'}}>
          青岛啤酒2021年第一季度报告
        </Text>
        <HStack style={{width:screenWidth*0.3,justifyContent:'flex-end',height:screenHeight*0.04,alignItems:'center'}}>
          <Icon   as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#333333" />
          <Text style={{fontSize:screenWidth*0.045,color:'#333333'}}>
            12
          </Text>
        </HStack>
      </HStack>
      <HStack style={{width:screenWidth*0.96,backgroundColor:'#ffffff',height:screenHeight*0.04,alignItems:'center',justifyContent:'center'}}>
        <Text style={{width:screenWidth*0.6,color:'rgba(154, 154, 154, 1)',fontSize:screenWidth*0.04}}>
        订单类型：购买报告
        </Text>
        <Text style={{width:screenWidth*0.3,textAlign:'right',color:'rgba(154, 154, 154, 1)',fontSize:screenWidth*0.04}}>
          X1
        </Text>
      </HStack>
      <HStack style={{borderTopWidth:1,borderColor:'#efefef',width:screenWidth*0.9,justifyContent:'center',height:screenHeight*0.055,alignItems:'center',}}>
        <Icon   as={<FontAwesome5 name="file-pdf" />} size={screenWidth*0.05} color="#C5884C" />
        <Text >
          详情报告原文
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}

//已完成订单
const CompleteOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#efefef",alignItems:'center'}}>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </View>
  )
}
const PayOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#efefef",alignItems:'center'}}>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </View>
  )
}
const AllOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#efefef",alignItems:'center'}}>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </View>
  )
}
const OrderInfo = ({navigation}) => {

  return (
    <Tab.Navigator     >
      <Tab.Screen name="已完成" component={CompleteOrder} />
      <Tab.Screen name="待付款" component={PayOrder} />
      <Tab.Screen name="全部" component={AllOrder} />
    </Tab.Navigator>
);
  
}
export default OrderInfo;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:"30%",
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
    height:70,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5"
  }
  
})