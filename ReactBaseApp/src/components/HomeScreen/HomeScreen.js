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
// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import HttpUtil from '../../utils/http';

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  return(
    <View style = {styles.background}>
      <Image  style={{borderWidth:1,width:screenWidth*0.8,height:screenHeight*0.1,marginTop:'35%'}}  source={require('./images/head_icon.png')}></Image>
      <Input placeholder="请输入股票代码或者公司名称"height={screenHeight*0.09} borderWidth={'2'} width={screenWidth*0.95} borderRadius="24"mt={'1/6'} py="3" px="1" fontSize={screenWidth*0.04} 
        InputLeftElement={<Icon m="2" ml="3" size={screenWidth*0.07} color="gray.400" as={<MaterialIcons name="search" />} />}>
      </Input>
      {/* <ScrollView  horizontal={false}>
      <Swiper style={styles.wrapper}
       showsButtons={true}
       width={screenWidth*0.94}
       height={screenHeight*0.4}
       showsButtons={false}>
        <Image  style={{width:screenWidth*0.94,height:screenHeight*0.4}}  source={require('./images/image1.png')}></Image>
        <Image  style={{width:screenWidth*0.94,height:screenHeight*0.4}}  source={require('./images/image1.png')}></Image>
        <Image  style={{width:screenWidth*0.94,height:screenHeight*0.4}}  source={require('./images/image1.png')}></Image>

      </Swiper>

      </ScrollView> */}
            {/* <View style={{width:screenWidth,height:screenHeight*0.4}}>
        <WebView style={{}} source={{ uri: 'http://cxlzpblog.cn/' }} />
      </View> */}
 
    
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
    backgroundColor:"#f5f5f5"

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
    borderColor:"#f5f5f5"
  }
  
})