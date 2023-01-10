import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Select,TextArea, Link ,Text 
} from 'native-base';
import { StyleSheet, TextInput, TouchableOpacity,Dimensions, Linking,FlatList,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';
import * as WeChat from 'react-native-wechat-lib';
// import { Text } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import RNEChartsPro from 'react-native-echarts-pro';

const screenHeight = Dimensions.get('window').height;
// import * as WeChat from 'react-native-wechat-lib';
import HttpUtil from '../../utils/http'
import Util, { WeChatLogin } from '../../utils/util'
import { Path } from 'react-native-svg';
import CircleProgressView from '../../utils/CircleProgressView';
import { Table, Row, Rows,TableWrapper,Col } from 'react-native-table-component';
import {  MD5 } from 'crypto-js';
// import data from './TestData.json'

/*
微信支付
appid： wx5a01a8ac8e18289c

mch_id： 1635512528

device_info： APP

body： test

nonce_str： ibuaiVcKdpRxkhJF



*/



const Report = ({route,navigation}) => {
  // const list = data.data
  const {comCode,year,stage,name} = route.params;

  const [list,setList] = React.useState([]);

  React.useEffect(() => {
    // WeChat.registerApp('wx5a01a8ac8e18289c', '').then(res => {
    //   console.log("是否 已经注册微信：" + res)
    // })
    getReport(comCode,year,stage)
    // console.log(screenHeight)
    // 83DA8E78F57EFD28037A7B6031DB1334
    // let stringA = stringA="appid=wx5a01a8ac8e18289c&body=test&device_info=WEB&mch_id=1635512528&nonce_str=ibuaiVcKdpRxkhJA";
    // let stringSignTemp=stringA+"&key=192006250b4c09247ec02edce69f6a2d" //注：key为商户平台设置的密钥key
    // let sign=HmacMD5(stringSignTemp).toUpperCase()="9A0A8659F005D6984697E2CA0A9CF3B7" //注：MD5签名方式
  },[]);
  
  function jumpOptionalInfo(){
    navigation.goBack()
  }

  function getReport(comCode,year,stage){
    let url = HttpUtil.localUrl+'company/company/analysisResult/'+comCode+'/'+year+'/'+stage;
    console.log(url)
    // let user = await AsyncStorage.getItem('user_info');
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      console.log(response.data)
      setList(response.data.data);
    })
  }

  const Item = ({type,data}) =>{
    if(type == 1){
      return(
        <View style={{width:screenWidth*0.92,alignSelf:'center',flex:1}}>
          <Text  style={ data.style == 'T'? styles.t1: data.style == 'H1'?styles.h1:data.style == 'H2'?styles.h2: data.style == 'H0'? styles.h0:styles.h3}>{data.strings}</Text>

        </View>
      )
    }else if(type == 3){
      let option = JSON.parse(data)
      let title = option.title.text;
      option.title.text = '';
      return(
        <View style={{alignItems:'center',width:screenWidth*0.96,}}>
          <RNEChartsPro  option={option} height={screenHeight*0.4} backgroundColor={'#f5f5f5'} ></RNEChartsPro>
          <Text style={{marginBottom:10,fontSize:screenWidth*0.04,color:"#333333",marginTop:10}}>{title}</Text>
        </View>
      )
    }
    else{
      if(data ==null){
      }else{
        let tableHead = data.head;
        let tableData = data.body;
        return(
          <View style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#666666'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={tableData} textStyle={styles.text}/>
          </Table>
        </View>
        )
      }
    }
  }
  const renderItem = ({item}) =>{
    return(
      <Item type={item.type} data={item.data} ></Item>
    )
  }
function wxpay(){ 
  WeChat.isWXAppInstalled()
  .then((isInstalled) => {
      console.log('是否安装微信', isInstalled);
      if (isInstalled) {
        //执行支付
          WeChat.pay({
              partnerId: '1635512528',  // 商家向财付通申请的商家id
              prepayId: 'WX1217752501201407033233368018',   // 预支付订单
              nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',   // 随机串，防重发
              timeStamp: '1412000000',  // 时间戳，防重发.
              package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名, 默认为 ‘Sign=WXPay’
              sign: 'MD5'   // 商家根据微信开放平台文档对数据做的签名，默认为 ‘MD5’
          }).then((requestJson)=>{
              console.log('支付回调', requestJson);
              //支付成功回调
              if (requestJson.errCode === 0){
                  console.log('支付成功');
              }
          }).catch((err)=>{
              console.log('支付失败', err);
          })
          
      } else {
          Toast.fail({
              content: '您还没有安装微信，请安装微信之后再试',
              duration: 1.5
          })
      }
  });
}
  function wx(){
    // WeChat.shareText({
    //   text: 'Text content.',
    //   scene: 0,
    // });
    // WeChat.openWXApp();
    wxpay();
  }
  function download(){
    Linking.openURL('http://192.168.10.186:8080/test.pdf')
  }

  const head = () =>{
    return(
      <HStack style={{ width:screenWidth*0.9,height:screenHeight*0.06,justifyContent:'flex-end'}}>
        <TouchableOpacity onPress={wx} style={{width:screenWidth*0.15,height:screenHeight*0.06,justifyContent:'center',alignItems:'center',alignSelf:'flex-end'}}>
          <Icon  as={<AntDesign name="wechat" />} size={screenWidth*0.07} ml="2" color="#81B337" />
        </TouchableOpacity>
        <TouchableOpacity onPress={download} style={{width:screenWidth*0.15,height:screenHeight*0.06,justifyContent:'center',alignItems:'center'}}>
          <Icon  as={<AntDesign name="download" />} size={screenWidth*0.07} ml="2" color="#215476" />
        </TouchableOpacity>
      </HStack>
    )
  }

  return(

    <View style={{height:screenHeight*1,alignItems:'center',backgroundColor:'#ffffff'}}>
      {/* <HStack style={{width:screenWidth*1,height:screenHeight*0.06,backgroundColor:'#f5f5f5',elevation:1}}>
        <View style={{height:screenHeight*0.06,justifyContent:'center'}}>
        <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.07} ml="2" color="muted.400" />
        </View>
        <View style={{width:screenWidth*0.55,height:screenHeight*0.06,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:screenWidth*0.055}}>报告详情</Text>
        </View>

        <View style={{width:screenWidth*0.14,height:screenHeight*0.06,justifyContent:'center',alignItems:'center'}}>
          <CircleProgressView raduis={36} progressBaseColor={'#BEBEBE'} progressColor = {'#E87777'} baseProgressWidth={4} progressWidth={4} progress={87} >
            <View style={{alignItems:'center',justifyContent:'center'}} >
              <Text style={{fontSize:30,color:'#sd7086'}}>
                87.66
              </Text>
            </View>
            </CircleProgressView>
        </View>

      </HStack> */}
      <HStack width={'full'} h={screenHeight*0.07} alignItems={'center'} backgroundColor={'#5461C9'} >
        <TouchableOpacity onPress={jumpOptionalInfo} style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.046,fontWeight:'600',width:screenWidth*0.4,color:'#ffffff'}}>
            {name+'研报'}
          </Text>
        {/* </View> */}
        <TouchableOpacity  onPress={wx} style={{width:screenWidth*0.2,height:screenHeight*0.08,justifyContent:'center',alignItems:'center'}}>
          <Icon  as={<AntDesign name="wechat" />} size={screenWidth*0.07} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={wx} style={{width:screenWidth*0.2,height:screenHeight*0.08,justifyContent:'center',alignItems:'center'}}>
        <Icon  as={<AntDesign name="download" />} size={screenWidth*0.07} ml="2" color="#ffffff" />
        </TouchableOpacity>
      </HStack>
      <View style={{width:screenWidth*0.96,height:screenHeight*0.9}}>
        <FlatList
          automaticallyAdjustContentInsets={false}
          listKey='100'
          // ListHeaderComponent={head}
          renderItem={renderItem}
          data={list}
          showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  )
  
}
export default Report;
const styles = StyleSheet.create({

  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  t1:{
    // width:screenWidth*0.9,
    fontSize:screenWidth*0.047,
    lineHeight:27,
    letterSpacing:1.5,
    color:'#333333',
    fontFamily:'PingFang-Medium',
    marginBottom:15,
    textAlign:'justify'
  },
  h0:{
    fontSize:screenWidth*0.055,
    marginBottom:15,
    marginTop:15,
    lineHeight:40,
    color:'#215476',
    alignSelf:'center',
    fontWeight:'600'
  },
  h1:{
    fontSize:screenWidth*0.05,
    marginBottom:15,
    marginTop:15,
    lineHeight:40,
    color:'#215476',
    alignSelf:'center',
    fontWeight:'600'
    
  },
  h2:{
    fontSize:screenWidth*0.048,
    lineHeight:40,
    marginBottom:15,
    color:'#333333',
    fontWeight:'600'
  },
  h3:{
    fontSize:screenWidth*0.04,
    lineHeight:30,
    marginBottom:15,
    color:'#333333'
  },
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff',width:'100%' },
  head: { height: 50, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
  
})