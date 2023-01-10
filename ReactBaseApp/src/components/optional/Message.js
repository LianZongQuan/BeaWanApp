import React, { Component,useEffect, useState } from 'react';

import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Select,TextArea 
} from 'native-base';
import { StyleSheet, TextInput, TouchableOpacity,Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';

import { Text } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import HttpUtil from '../../utils/http'
import { Path } from 'react-native-svg';

const Message = ({navigation}) => {
  
  //分段器选择下标
  const [selectedIndex, setSelectedIndex] = useState(0);
  //全部消息列表
  const [allList,setAllList] = useState([]);
  //已读消息列表
  const [readList,setReadList] = useState([]);
  //未读消息列表
  const [unReadList,setUnReadList] = useState([]);
  
  React.useEffect(() => {
    getMessage();


  },[]);
  function select0(){
    setSelectedIndex(0);

  }
  function select1(){
    setSelectedIndex(1);

  }
  function select2(){
    setSelectedIndex(2);

  }
  //将未读消息变成已读消息
  function changeMessageStatus(id,status){
    let url = HttpUtil.localUrl+'company/message/deleteOne/'+id;
    console.log(id+status)
    // let header = {};
    // HttpUtil.get(url,null,header,function(response){
    //   console.log(response.data)
    // })

  }
  function getMessage(){
    let url = HttpUtil.localUrl+'company/message/allList';
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      setAllList(response.data.data)
    })
    url = HttpUtil.localUrl+'company/message/readList';
    HttpUtil.get(url,null,header,function(response){
      setReadList(response.data.data)
    })
    url = HttpUtil.localUrl+'company/message/unreadList';
    HttpUtil.get(url,null,header,function(response){
      setUnReadList(response.data.data)
    })
  }
  
  const allMessageItem = (item)=>{
    return(
      <TouchableOpacity onPress={ () =>{
        let url = HttpUtil.localUrl+'company/message/deleteOne/'+item.item.id;
        // console.log(item.item.id+'000'+item.item.status)
        let header = {};
        HttpUtil.get(url,null,header,function(response){
          // console.log(response.data)
          getMessage()
        })
      } }  
      
        style={{width:screenWidth*0.9,backgroundColor:"#ffffff",borderRadius:10,height:screenHeight*0.08,marginTop:15}}>
        <HStack style={{width:screenWidth*0.9,height:screenHeight*0.08,}}>
        <View style={{width:screenWidth*0.2,height:screenHeight*0.08,justifyContent:'center',alignItems:'center'}}>
          <Text style={{marginLeft:1}}>
            {item.item.status == '0'?'未读':'已读'}
          </Text>
            {/* <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#999999" /> */}
          </View>
          <View style={{width:screenWidth*0.5,height:screenHeight*0.08,justifyContent:'center',alignItems:'center'}}>
            
            <Text style={{fontSize:screenWidth*0.045,color:"#333333"}}>
            {item.item.message}
            </Text>
          </View>
          <View style={{width:screenWidth*0.2,height:screenHeight*0.08,justifyContent:'center',alignItems:'flex-end'}}>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#999999" />
          </View>
        </HStack>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{alignItems:'center',backgroundColor:"#f5f5f5"}}>
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            消息
          </Text>
        {/* </View> */}
      </HStack>
      <HStack w={screenWidth*1} height={screenHeight*0.06} style={{backgroundColor:'#ffffff'}}>
        <TouchableOpacity onPress={select0} style={selectedIndex == 0 ? styles.checkSelect:styles.select} >
          <Text style={{color:selectedIndex == 0 ? "#0256c3":"#6c6c6c", borderBottomWidth:selectedIndex == 0 ? 1:0, fontSize:selectedIndex == 0 ? screenWidth*0.05:screenWidth*0.05}}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={select1} style={selectedIndex == 1 ? styles.checkSelect:styles.select}>
          <Text style={{color:selectedIndex == 1 ? "#0256c3":"#6c6c6c", borderBottomWidth:selectedIndex == 1 ? 1:0, fontSize:selectedIndex == 1 ? screenWidth*0.05:screenWidth*0.05}}>未读</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={select2}  style={selectedIndex == 2 ? styles.checkSelect:styles.select}>
          <Text style={{color:selectedIndex == 2 ? "#0256c3":"#6c6c6c", borderBottomWidth:selectedIndex == 2 ? 1:0,fontSize:selectedIndex == 2 ? screenWidth*0.05:screenWidth*0.05}}>已读</Text>
        </TouchableOpacity>
        </HStack>
        <FlatList
          listKey='100'
          renderItem={allMessageItem}
          showsVerticalScrollIndicator={false}
          data={selectedIndex == 0?allList:selectedIndex == 1?unReadList:readList}>
        </FlatList>
    </View>
  )
}
export default Message;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },
  content:{
    // borderWidth:1,
    height:screenHeight*0.8,
    width:"100%",
    marginTop:"3%",
    backgroundColor:"#ffffff"
  },
  list:{
    justifyContent:'center',
    height:screenHeight*0.09,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5"
  },
  listText:{
    fontSize:screenWidth*0.055,
    width:screenWidth*0.73,
    marginLeft:10
  },
  checkSelect:{
    // backgroundColor:'#E4463B',
    width:screenWidth*0.33,
    alignItems:'center',
    borderRadius:25,
    height:screenHeight*0.06,
    justifyContent:'center',
    
  },
  select:{
    width:screenWidth*0.33,
    alignItems:'center',
    justifyContent:'center',
    height:screenHeight*0.06
  }  
})