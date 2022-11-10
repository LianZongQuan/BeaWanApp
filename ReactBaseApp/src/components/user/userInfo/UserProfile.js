import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,TextArea
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
// import HttpUtil from '../../utils/http';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UserProfile = ({navigation}) => {


  return(
    <View style = {styles.background}>
       
       <TextArea placeholder='请输入:'  fontSize={screenWidth*0.055}  mt={'3'} height={screenHeight*0.3}  borderWidth={0} bg={"#ffffff"}>

       </TextArea>


    </View>
  ) 
  
}
export default UserProfile;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"rgba(244, 206, 152, 0.47)",
    width:"94%",
    height:screenHeight*0.15,
    marginTop:'4%',
    borderRadius:20,
  },
  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
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