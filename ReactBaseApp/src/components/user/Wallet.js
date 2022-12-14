import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container, ScrollView,
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

const Wallet = ({navigation}) => {
  const [selectedIndex,setSelectedIndex] = React.useState(1);

  React.useEffect(() => {
    setSelectedIndex(1);
  },[]);
  function select1(){
    setSelectedIndex(1)
  }  
  function select2(){
    setSelectedIndex(2)
  }  
  function select3(){
    setSelectedIndex(3)
  }  
  function select4(){
    setSelectedIndex(4)
  }  
  function select5(){
    setSelectedIndex(5)
  }  
  function select6(){
    setSelectedIndex(6)
  }  


  return(
    <ScrollView>
    <View style = {styles.background}>
       
      <View style = {styles.header}>
        <HStack style={{marginLeft:"3%",height:screenHeight*0.15}}>
          <View style={{height:screenHeight*0.15,justifyContent:'center'}}>
            <Avatar  style={{width:screenWidth*0.2,height:screenWidth*0.2}}  mr="4" >
              <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.2,height:screenWidth*0.2}} source={require('./images/heard.jpg')} ></Image>
            </Avatar>
          </View>
          
          <View style={{height:'100%',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.06,color:"#101010"}}>仟仟陌陌</Text>
            <HStack style={{height:screenHeight*0.03,backgroundColor:'#BEBEBE',marginTop:15,borderRadius:5}}>
              <View style={{height:screenHeight*0.03,justifyContent:'center'}}>
              <Image alt='会员中心' size={screenWidth*0.04} ml="2" source={require('./images/noMember.png')}></Image>

              </View>
              <View style={{height:screenHeight*0.03,justifyContent:'center'}}>
                <Text style={{fontSize:screenWidth*0.03,color:"#6C6C6C"}}>未开通会员</Text>
              </View>

            </HStack>
          </View>
          {/* <View style={{height:'100%',justifyContent:'center',marginLeft:10}}>
            <Text style={{fontSize:screenWidth*0.12,color:"#E99D42"}}>0</Text>
          </View>
          <View style={{height:'100%',justifyContent:'center',marginLeft:10}}>
            <Text style={{fontSize:screenWidth*0.06,color:"#6C6C6C"}}>碧湾币</Text>
          </View> */}
        </HStack>
      </View>

      <Text style={{fontSize:screenWidth*0.045,marginTop:10,marginLeft:20,color:"#101010",alignSelf:'flex-start'}}>充值会员</Text>
      <HStack space={4} style={{justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={select1} style={selectedIndex == 1 ? styles.checkIndex:styles.select}>
          <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 1 ? "#101010":"black"}}>月卡会员</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
              19.9
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={select2} style={selectedIndex == 2 ? styles.checkIndex:styles.select}>
        <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 1 ? "#101010":"black"}}>季卡会员</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
              49.9
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={select3} style={selectedIndex == 3 ? styles.checkIndex:styles.select}>
        <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 1 ? "#101010":"black"}}>年卡会员</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
              69.9
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
      </HStack>
      <Text style={{fontSize:screenWidth*0.045,marginTop:10,marginLeft:20,color:"#101010",alignSelf:'flex-start'}}>充值次卡</Text>
      <HStack space={4} style={{justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={select4} style={selectedIndex == 4 ? styles.checkIndex:styles.select}>
          <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 4 ? "#101010":"black"}}>10次</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
              8.8
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={select5} style={selectedIndex == 5 ? styles.checkIndex:styles.select}>
        <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 5 ? "#101010":"black"}}>20次</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
              18.8
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={select6} style={selectedIndex == 6 ? styles.checkIndex:styles.select}>
        <Text style={{fontSize:screenWidth*0.035,color:selectedIndex == 6 ? "#101010":"black"}}>50次</Text>
          <HStack style={{marginTop:5,height:screenHeight*0.05}}>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Icon marginBottom={1} as={<MaterialCommunityIcons name="currency-cny" />} size={screenWidth*0.05} color="#C5884C" />
            </View>
            <View style={{height:screenHeight*0.05,justifyContent:'flex-end'}}>
              <Text style={{fontSize:screenWidth*0.065,color:"#C5884C"}}>
            45.8
            </Text>
            </View>
          </HStack>
        </TouchableOpacity>
      </HStack>

      {/* <Text style={{fontSize:screenWidth*0.04,marginTop:10,marginLeft:20,color:"#6C6C6C",alignSelf:'flex-start'}}>关于碧湾币：</Text>
      <Text style={{fontSize:screenWidth*0.04,marginTop:10,marginLeft:20,color:"#6C6C6C",alignSelf:'flex-start'}}>1.碧湾币可以直接用户购买报告等虚拟服务</Text> */}
      <TouchableOpacity  style={{ backgroundColor:'#F3BB3A', borderRadius:30,marginTop:"6%", width:"90%", justifyContent:'center', height:screenHeight*0.07,alignItems:'center'}}>
            <Text style={{fontSize:screenWidth*0.045,color:"#724E0B"}}>
            同意协议并立即支付开通会员
            </Text>
      </TouchableOpacity>
      <HStack>
        <Text style={{fontSize:screenWidth*0.03,marginTop:10,color:"#6C6C6C",alignSelf:'flex-start'}}>开通会员前请务必仔细阅读</Text> 
        <Text style={{fontSize:screenWidth*0.03,marginTop:10,color:"#C5884C",alignSelf:'flex-start'}}>《会员服务协议》</Text> 
        <Text style={{fontSize:screenWidth*0.03,marginTop:10,color:"#6C6C6C",alignSelf:'flex-start'}}>规则</Text> 
      </HStack>
      <Text style={{fontSize:screenWidth*0.045,marginTop:10,marginLeft:20,color:"#101010",alignSelf:'flex-start'}}>权益说明</Text>
      <View style = {styles.bottom}>
        <Text style={{marginLeft:20,marginTop:10,fontSize:screenWidth*0.035,color:"#C5884C"}}>会员权益</Text>
        <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>一、自选股票上限增加为50支</Text>
        <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>二、每月可以查看100份报告</Text>
        <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>三、可以下载报告并分享</Text>
        <Text style={{marginLeft:20,marginTop:10,fontSize:screenWidth*0.035,color:"#C5884C"}}>次卡权益</Text>
        {/* <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>一、自选股票上限增加为50支</Text> */}
        <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>一、可以查看一定次数报告</Text>
        <Text style={{marginLeft:30,marginTop:10,fontSize:screenWidth*0.035,color:"#6C6C6C"}}>二、可以下载报告并分享</Text>
      </View>


    </View>
    </ScrollView>
  ) 
  
}
export default Wallet;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#FAF2D1",
    width:"94%",
    height:screenHeight*0.15,
    marginTop:'4%',
    borderRadius:10,
  },
  bottom: {
    backgroundColor:"rgba(250, 242, 209, 0.38)",
    width:"94%",
    height:screenHeight*0.35,
    marginTop:'4%',
    borderRadius:10,
  },
  background:{
    alignItems:'center',
    backgroundColor:"#ffffff"

  },
  checkIndex:{
    width:"28%",
    height:screenHeight*0.1,
    borderWidth:1,
    borderColor:"#C5884C",
     backgroundColor:'#F3DB98',
     borderRadius:10,
     alignItems:'center',
     justifyContent:'center'
  },
  select:{
    width:"28%",
    height:screenHeight*0.1,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderColor:'#BBBBBB',
    
    borderRadius:10,alignItems:'center',
    justifyContent:'center'
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