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
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            意见反馈
          </Text>
        {/* </View> */}
      </HStack>
      
       <HStack style={{width:'100%',height:screenHeight*0.07, borderBottomWidth:0.5,borderColor:"#BEBEBE" ,backgroundColor:'#ffffff'}}>
        <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:'#333333'}} >联系电话:</Text>
        </View>
        <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
          <Input fontSize={screenWidth*0.05} placeholder={'请输入手机号'} variant="unstyled" ></Input>
        </View>
       </HStack>
       <HStack style={{width:'100%',height:screenHeight*0.07, borderBottomWidth:0.5,borderColor:"#BEBEBE" ,backgroundColor:'#ffffff'}}>
        <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:screenWidth*0.05,color:'#333333'}} >反馈类型:</Text>
        </View>
        <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
          <Select width={'full'} borderWidth={0} placeholder={'请选择:'} fontSize={screenWidth*0.05} >
            <Select.Item label="购买问题" value="ux" />
            <Select.Item label="会员问题" value="web" />
            <Select.Item label="程序崩溃" value="web" />
            <Select.Item label="其它问题" value="web" />
          </Select>
        </View>
       </HStack>
       <TextArea placeholder='请输入反馈内容:'  fontSize={screenWidth*0.05}  mt={'3'} h={'1/3'} borderWidth={0} bg={"#ffffff"}>

       </TextArea>
       {/* <View style={{justifyContent:'center',borderTopWidth:0.5,width:'100%', borderColor:"#BEBEBE",height:screenHeight*0.18,backgroundColor:"#ffffff"}}>
       <Icon style ={{marginRight:20 }} color={'#f5f5f5'}  as={<MaterialIcons name="add-box" />} size={screenWidth*0.24} ml="2" />
       </View> */}
       <Button _text={{fontSize:screenWidth*0.05,color:'white'}} backgroundColor={'#bebebe'} style={{ borderRadius:4,marginTop:"10%", width:"90%",  height:screenHeight*0.07,alignItems:'center'}} >
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