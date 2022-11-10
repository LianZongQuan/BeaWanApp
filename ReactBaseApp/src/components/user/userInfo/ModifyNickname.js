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

const ModifyNickname = ({navigation}) => {


  return(
    <View style = {styles.background}>
      <HStack style={{width:'100%',marginTop:10,height:screenHeight*0.1,backgroundColor:'#ffffff'}}>
        <View style={{width:'70%',height:screenHeight*0.1,justifyContent:'center'}}>
          <Input fontSize={18} height={screenHeight*0.07} placeholder='仟仟陌陌' variant='unstyled'></Input>
        </View>
        <View style={{width:'28%',height:screenHeight*0.1,justifyContent:'center'}}>
          <Button bg={'white'} _text={{color:'#E99D42',fontSize:18}} borderWidth={1} borderColor={'#E99D42'} height={screenHeight*0.07} >修改</Button>
        </View>
      </HStack>
      


    </View>
  ) 
  
}
export default ModifyNickname;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },

  
})