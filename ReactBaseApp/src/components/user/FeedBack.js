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

import { Text } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import HttpUtil from '../../utils/http'

const FeedBack = ({navigation}) => {
  return(
    <View style = {styles.background}>
      
       <HStack style={{width:'100%',height:screenHeight*0.07, borderBottomWidth:0.5,borderColor:"#BEBEBE" ,marginTop:10,backgroundColor:'#ffffff'}}>
        <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.055}} >联系电话:</Text>
        </View>
        <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
          <Input fontSize={screenWidth*0.055} placeholder={'请输入手机号'} variant="unstyled" ></Input>
        </View>
       </HStack>
       <HStack style={{width:'100%',height:screenHeight*0.07, borderBottomWidth:0.5,borderColor:"#BEBEBE" ,backgroundColor:'#ffffff'}}>
        <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.055}} >反馈类型:</Text>
        </View>
        <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
          <Select width={'full'} borderWidth={0} placeholder={'请选择:'} fontSize={screenWidth*0.055} >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </View>
       </HStack>
       <TextArea placeholder='请输入反馈内容:'  fontSize={screenWidth*0.055}  mt={'3'} height={'1/3'}  borderWidth={0} bg={"#ffffff"}>

       </TextArea>
       <View style={{justifyContent:'center',borderTopWidth:0.5,width:'100%', borderColor:"#BEBEBE",height:screenHeight*0.18,backgroundColor:"#ffffff"}}>
       <Icon style ={{marginRight:20 }} color={'#f5f5f5'}  as={<MaterialIcons name="add-box" />} size={screenWidth*0.24} ml="2" />
       </View>
       <Button _text={{fontSize:screenWidth*0.055} } colorScheme='rgba(244, 206, 152, 1)' style={{ borderRadius:4,marginTop:"18%", width:"90%", height:screenHeight*0.08,alignItems:'center'}} >
        提交
      </Button>
    </View>
  ) 
  
}
export default FeedBack;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:"30%",
    marginTop:20,
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