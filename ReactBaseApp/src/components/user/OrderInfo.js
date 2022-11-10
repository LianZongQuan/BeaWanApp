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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
// import HttpUtil from '../../utils/http';
const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//已完成订单
const CompleteOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#ffffff",marginTop:20}}>
      <HStack style={{width:"96%",height:40,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单编号</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单类型</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >金额</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >详情</Text>
        </View>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>

    </View>
  )
}
const PayOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#ffffff",marginTop:20}}>
      <HStack style={{width:"96%",height:40,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单编号</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单类型</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >金额</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >详情</Text>
        </View>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>

    </View>
  )
}
const AllOrder = () =>{
  return(
    <View style={{width:'100%',backgroundColor:"#ffffff",marginTop:20}}>
      <HStack style={{width:"96%",height:40,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单编号</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >订单类型</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >金额</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#6C6C6C"}} >详情</Text>
        </View>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>
      <HStack style={{width:"96%",height:60,borderBottomWidth:0.5,borderColor:"#f5f5f5"}}>
        <View style={{width:"35%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >5001180209</Text>
        </View>
        <View style={{width:"25%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >购买报告</Text>
        </View>
        <View style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:"#101010"}} >12</Text>
        </View>
        <TouchableOpacity style={{width:"20%",alignItems:'center',justifyContent:'center'}}>
          <Icon as={<MaterialIcons name="description" />} size={screenWidth*0.08} ml="2" color="#F4CE98" />
        </TouchableOpacity>
      </HStack>

    </View>
  )
}
const OrderInfo = ({navigation}) => {

  return (
    <Tab.Navigator     
    >
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