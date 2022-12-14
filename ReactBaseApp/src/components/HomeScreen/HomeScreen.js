import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Image,Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';
import { Table, Row, Rows,TableWrapper,Col } from 'react-native-table-component';

// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import HttpUtil from '../../utils/http';
import RNEChartsPro from 'react-native-echarts-pro';

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return(
    <View style = {styles.background}>
      <Image  style={{borderWidth:1,width:screenWidth*0.7,height:screenHeight*0.07,marginTop:'30%'}}  source={require('./images/BeaWanIcon.png')}></Image>
      
      <Input onPressIn={()=>{
        navigation.navigate('搜索');
      }} placeholderTextColor={'#707070'} placeholder="请输入股票代码或者公司名称"height={screenHeight*0.068} backgroundColor={'#cdcdcd'} borderWidth={'0'} mt={'6'} width={screenWidth*0.95} borderRadius="30" py="3" px="1" fontSize={screenWidth*0.04} 
        InputLeftElement={<Icon m="2" ml="3" size={screenWidth*0.07} color="gray.400" as={<MaterialIcons name="search" />} />}>
      </Input>
  
      <View style={{marginTop:screenHeight*0.02}}>
          <View style={{alignSelf:'flex-start',marginLeft:12}}> 
          <Text style={{fontSize:screenWidth*0.045}}>热门搜索</Text>
        </View>
        <HStack mt={'3'} style={{width:'100%',justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>东方财富</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>阿里巴巴</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>比亚迪</Text>
          </TouchableOpacity>
        </HStack>
        <HStack mt={'6'} style={{width:'100%',justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>腾讯</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>超华科技</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>招商银行</Text>
          </TouchableOpacity>
        </HStack>
        <HStack mt={'6'} style={{width:'100%',justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>山东华鹏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:14,borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>中触媒</Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  ) 
   

  

}
export default HomeScreen;
const styles = StyleSheet.create({
  wrapper: {marginTop:'5%'},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor:"#68A4CF",
    width:"94%",
    height:"18%",
    marginTop:'5%',
    borderRadius:20,
    justifyContent: 'center',
  },
  background:{
    alignItems:'center',
    flex:1,
    // backgroundColor:"#f5f5f5"

  },
  content:{
    // borderWidth:1,
    height:420,
    width:"100%",
    marginTop:"5%",
    backgroundColor:"#ffffff"
  },
  list:{
    justifyContent:'center',
    height:70,
    width:"100%",
    borderBottomWidth:1,
    // borderColor:"#f5f5f5"
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',width:'100%' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
  
})