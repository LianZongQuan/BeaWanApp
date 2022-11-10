import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
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

const ModifyPhone = ({navigation}) => {


  return(
    <View style = {styles.background}>
      <Icon as={<AntDesign name={"mobile1"} />} size={200} mt={'10'} color="#9A9A9A" />
      <Text style={{marginTop:10}}>
        绑定的手机号：15082976220
      </Text>
      <Button _text={{fontSize:screenWidth*0.055} } backgroundColor={'rgba(189, 49, 36, 0.66)'} style={{ borderRadius:4,marginTop:30, width:"90%", height:screenHeight*0.08,alignItems:'center'}} >
        更换手机号
      </Button>


    </View>
  ) 
  
}
export default ModifyPhone;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"rgba(244, 206, 152, 0.47)",
    width:"94%",
    height:screenHeight*0.15,
    marginTop:'4%',
    borderRadius:20,
  },
  background:{
    alignItems:'center',
    backgroundColor:"#ffffff"

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