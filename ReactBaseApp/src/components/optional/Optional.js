import React, { Component,useEffect, useState } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Divider, Modal,FormControl,useToast,Alert,VStack,IconButton,CloseIcon
} from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity,Dimensions,FlatList ,Text,useColorScheme,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {DeviceEventEmitter} from 'react-native';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from "react-native-webview";

import CircleProgressView from '../../utils/CircleProgressView';
import HttpUtil from '../../utils/http';
import {getTitle} from '../../utils/util'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Optional = ({navigation}) => {

  //分段器选择下标
  const [selectedIndex, setSelectedIndex] = useState(0);
  //搜索内容
  const [inputText,setInputText] = useState('');
  //删除自选的股票代码
  const [deleteCode,setdeleteCode] = useState('');
  //自选数据
  const [data,setdata] = useState(null);
  //用户数据
  const [user,setuser] = useState(null);
  //报告名称数据
  const [listReportName,setListReportName] = useState(null);
  //是否有新消息   true：有新消息       false：无新消息
  const [hasMessage,setHasMessage] = useState(null);
  //指向的报告列表组件
  let _titleList = null;
  //最新
  const title1 = getTitle(1);
  //年报
  const title2 = getTitle(2);
  //中报
  const title3 = getTitle(3);
  //季报
  const title4 = getTitle(4);

  const toast = useToast();
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  
  React.useEffect(() => {
    const focus=navigation.addListener('focus',()=>{
     
      getHasMessag();
      setSelectedIndex(1);
      setInputText('');
      setListReportName(title2)
      // console.log(listReportName)
      getData();
    }) 

  },[navigation]);
  
  async function getData(){
    let url = HttpUtil.localUrl+'company/company/selfCom'
    let user = await AsyncStorage.getItem('user_info');
    // console.log(user)
    setuser(user)
    if(user === null){
      let header = {};
      HttpUtil.get(url,null,header,function(response){
        setdata(response.data.data)
      })
    }else{
      
      let header = {'token':JSON.parse(user).tokenValue};
      // console.log(header)
      HttpUtil.get(url,null,header,function(response){
        setdata(response.data.data)
        // console.log(response.data)

      })
    }
  }

  //是否有新消息
  function getHasMessag(){
    let url = HttpUtil.localUrl+'company/message/unreadList';
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      console.log(response.data.data)
      if(response.data.data.length===0 ||response.data.data.length===null){
        setHasMessage(false);
      }else{
        setHasMessage(true)    
      }
    })
  }
  const messageItem =() =>{
    if(hasMessage == true){
      return(
        // <Image alt='newmessage'  ml={'2'} w={screenWidth*0.08} h={screenWidth*0.08}  source={require('../HomeScreen/images/newMessage.png')}></Image> 
        <Icon color={'#ffffff'} as={<AntDesign name="search1" />} size={screenWidth*0.06}  />

      )
    }else if(hasMessage == false){
      return(
        // <Image alt='message'  ml={'2'} w={screenWidth*0.08} h={screenWidth*0.08}  source={require('../HomeScreen/images/message.png')}></Image>  
        <Icon color={'#ffffff'} as={<MaterialCommunityIcons name="message-processing-outline" />} size={screenWidth*0.06}  />

      )

    }
  }

  function select0(){
    setInputText('');
    setSelectedIndex(0);
    setListReportName(title1)
  }
  function select1(){
    setInputText('');
    setSelectedIndex(1);
    setListReportName(title2)
  }
  function select2(){
    setInputText('');
    setSelectedIndex(2);
    setListReportName(title3)
  }
  function select3(){
    setInputText('');
    setSelectedIndex(3);
    setListReportName(title4)
  }
    //同步滚动方法
  const ListScroll = (e) => {
    const x1 = e.nativeEvent.contentOffset.x;
    if (Platform.OS === 'ios') {
      _titleList.setNativeProps({
        contentOffset: { x: x1, y: 0, animated: false },
      });
    } else {
      _titleList.scrollToOffset({  offset:x1, animated: false });
    
    }
  };

  //自定义提示
  function  customAlter(id,status,title){
    toast.show({
      id:1,
      render: () => {
        return <Alert  w={screenWidth*0.6} borderRadius={10} variant={'outline'} borderColor={'info.50'}  backgroundColor={'white'} status={status} >
            <HStack  w={screenWidth*0.6} h={'full'}>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Alert.Icon ml={'2'} mr={'2'} size={screenWidth*0.06}/>
              </View>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:screenWidth*0.045}}>{title}</Text>
              </View>
            </HStack>
          </Alert>;
      },
      placement: "top"
    })
  }
  //跳转到添加自选页面
  async function jumpAddOptional(){
    // let user = await AsyncStorage.getItem('user_info');
    let status = "warning";
    let title = "请登录后操作！";
    let id = 1; 
    // console.log(user)
    if(user === null){
      customAlter(id,status,title);
    }else{
      navigation.navigate('添加自选');
    }
  }
  function jumpReport(){
    navigation.navigate('报告');
  }
  //处理数据，使获得的自选数据与表头相互对应
  function dealData(namelist,reportlist){
    let list = [];
    let ret = '';
    let i=0;let j=0;
    for (i = 0; i < namelist.length; i++) {
      for(j = 0;j<reportlist.length;j++){
          ret = reportlist[j].year + reportlist[j].stage
          if(namelist[i].time === ret){
            list.push(reportlist[j])
            break;
          }
      }
      if(j == reportlist.length){
        list.push({"comCode": "0", "id": 0, "score": "0", "stage": "0", "year": "0"})
      }
    }
    return list;  
  }
  //删除自选
  async function deleteOption(){
    let url = HttpUtil.localUrl+'company/company/deleteSelfCom?comCode='+deleteCode;
    // console.log(url)
    let user = await AsyncStorage.getItem('user_info');
    let header = {'token':JSON.parse(user).tokenValue};
    HttpUtil.get(url,null,header,function(response){
        // console.log(response.data);
        setModalVisible(false)
        getData();
    })
  }
  //搜索自选
  function search(text){
    setInputText(text)
    let list = data;
    if(text===''){
      getData();
    }else{
      let isNumber = !isNaN(parseFloat(text)) && isFinite(text);
      let ret =  isNumber == true ? QueryCode(list,text):QueryName(list,text)
      if(ret != null){
        setdata(ret);
      }
    }
  }
  function QueryName(list, keyWord) {
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].comName)) {
        arr.push(list[i]);
      }
    }
    return arr;
  }
  function QueryCode(list, keyWord) {
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].code)) {
        arr.push(list[i]);
      }
    }
    return arr;
  }
  const head = () =>{
    return(
      <HStack>
        <View style={{width:'25%', backgroundColor:'#efefef',justifyContent:'center', alignItems:'center',height:36}}>
          <Text style={{color:'#6C6C6C',fontSize:screenWidth*0.035}}>名称</Text>
        </View>
      <FlatList 
        style={{width:'75%'}}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ref={(ref) => {
          _titleList = ref;
        }}
        renderItem={renderHeadItem}
        // keyExtractor={item => item.id}
        data={listReportName}
        horizontal={true}>
      </FlatList>
    </HStack>
    )
  }
  const footer = () =>(
    <TouchableOpacity style={{alignItems:'center'}} onPress={jumpAddOptional}>
      <HStack style={{marginTop:10,height:screenHeight*0.1}}>
        <View style={{height:screenHeight*0.1,alignContent:'center'}}>
        <Icon  color={'#666666'}  as={<MaterialIcons name="add" />} size={screenWidth*0.06}  />
        </View>
        <View style={{height:screenHeight*0.1,alignContent:'center'}}>
        <Text  style={{color:'#666666',fontSize:screenWidth*0.045}}>添加自选</Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
  const NameItem = ({name,type,code}) =>{
    let typeColor = '#347CAF'
    if(type === 'SH')
      typeColor = '#F4CE98'
    return(
      <TouchableOpacity  disabled={user == null? true : false} onLongPress={()=>{
    setModalVisible(!modalVisible);
    setdeleteCode(code);
      }} style={{marginLeft:10,height:screenHeight*0.09,borderBottomWidth:0.7,borderColor:"#f5f5f5"}}>
        <Text style={{fontSize:screenWidth*0.04,marginTop:10,color:'black'}}>{name}</Text>
        <HStack>
          <Text  style={{fontSize:screenWidth*0.03,width:screenWidth*0.06,textAlign:'center',backgroundColor:typeColor,color:"#ffffff"}}>{type}</Text>
          <Text style={{marginLeft:5,fontSize:screenWidth*0.03,color:'#BEBEBE'}}>{code}</Text>
        </HStack>
      </TouchableOpacity>
    )
  }
  const renderNameItem = ({item}) =>(
    <NameItem name={item.comName} type={item.type} code={item.comCode}></NameItem>
  );
  const MainItem = ({report,name,comCode}) =>{   
    let list = report;
    report = dealData(listReportName,report)
    // console.log(report)
    return(
      <TouchableOpacity onPress={()=>{
        navigation.navigate('自选详情',{name:name,comCode:comCode});
      }} >
        <HStack>
          {report.map((item, index) => {
            let circleColor = '';
            if(item.score<=60){
              circleColor = '#81B337';
            }else if(item.score<=80)
            {
              circleColor = '#E99D42';
            }else{
              circleColor = '#5ac4ad';
            }
            return (
              <View key={index}  style={{width:screenWidth*0.245,height:screenHeight*0.09,borderBottomWidth:0.7,justifyContent:'center',alignItems:'center',borderColor:"#f5f5f5"}}>
              {/* 环形图分数组件 */}
              {/* <CircleProgressView raduis={screenHeight*0.035} progressBaseColor={'#BEBEBE'} progressColor = {circleColor} baseProgressWidth={4} progressWidth={4} progress={item.score} >
                <View style={{alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:18}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    {item.score}
                  </Text>
                </View>
                </CircleProgressView> */}
                <Text style={{fontSize:22,color:circleColor}}>
                  {item.score}
                </Text>
              </View>
            )})
          }
        </HStack>
      </TouchableOpacity>
    )
  }
  const renderMainItem = ({item}) =>{
    return(
      <MainItem report = {item.comReports} name={item.comName} comCode={item.comCode} ></MainItem>  
    )
  }
  const HeadItem = ({id,time}) =>{
  
    return(
      <View style={{height:36,backgroundColor:'#efefef', justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#6c6c6c',width:screenWidth*0.245,textAlign:'center', fontSize:screenWidth*0.035}}>{time}</Text>
      </View>
    )
  }
  const renderHeadItem = ({item}) =>(
      <HeadItem id={item.id} time={item.time} ></HeadItem>
  );
  const Container = () =>{
    return(
      <HStack>
        <View style={{width:'25%',height:'100%'}}>
          <FlatList
            listKey='100'
            renderItem={renderNameItem}
            keyExtractor={item => item.comId}
            data={data}>
          </FlatList>
        </View>
        <ScrollView 
          style={{width:'75%',height:'100%'}}
          horizontal={true}
          scrollEventThrottle={120}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={ListScroll}>
          <FlatList style={{width:'100%',height:'100%'}}
            renderItem={renderMainItem}
            // keyExtractor={item => item.id}
            data={data}>
          </FlatList>
        </ScrollView>
      </HStack>
    )
  }
  const renderContainer = ({item}) =>(
    <Container ></Container>
  );

  return(
    <View style={{ flex: 1,backgroundColor:"#efefef", alignItems:'center' }}>
      <Modal style={{alignItems:'center', width:screenWidth*0.5,alignSelf:'center'}} isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Body>
            <Button onPress={deleteOption} variant='ghost' colorScheme="blueGray">删除 </Button>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false)}}>取消 </Button>

          </Modal.Body>
        </Modal.Content>
      </Modal>

      <HStack w={'full'} height={screenHeight*0.07} style={{backgroundColor:'#0371C7'}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('消息');
          }}  style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          {messageItem()}
        </TouchableOpacity>
        <View style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.6,alignItems:'center'}}>
          <Text style={{fontSize:screenWidth*0.055,color:'#ffffff'}}>
            自选
          </Text>
        </View>
        <View style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          {/* <Image alt='search'  ml={'2'} w={screenWidth*0.09} h={screenWidth*0.09} source={ require('../HomeScreen/images/search.png')}></Image>   */}
          <Icon color={'#ffffff'} as={<AntDesign name="search1" />} size={screenWidth*0.06}  />

        </View>

      </HStack>
      <HStack w={'full'} height={screenHeight*0.05} style={{marginBottom:5}}>
        <TouchableOpacity onPress={select0} style={selectedIndex == 0 ? styles.checkSelect:styles.select} >
          <Text style={{color:selectedIndex == 0 ? "#566CBE":"#666666",borderColor:'#2C49B4', borderBottomWidth:selectedIndex == 0? 1:0, fontSize:screenWidth*0.05}}>最新</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={select1} style={selectedIndex == 1 ? styles.checkSelect:styles.select}>
          <Text style={{color:selectedIndex == 1 ? "#566CBE":"#666666",borderColor:'#2C49B4', borderBottomWidth:selectedIndex == 1 ? 1:0, fontSize:screenWidth*0.05}}>年报</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={select2}  style={selectedIndex == 2 ? styles.checkSelect:styles.select}>
          <Text style={{color:selectedIndex == 2 ? "#566CBE":"#666666",borderColor:'#2C49B4', borderBottomWidth:selectedIndex == 2 ? 1:0,fontSize:screenWidth*0.05}}>中报</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={select3}  style={selectedIndex == 3 ? styles.checkSelect:styles.select}>
          <Text style={{color:selectedIndex == 3 ? "#566CBE":"#666666",borderColor:'#2C49B4', borderBottomWidth:selectedIndex == 3 ? 1:0,fontSize:screenWidth*0.05}}>季报</Text>
        </TouchableOpacity>
      </HStack>
      <View w={'full'} height={screenHeight*0.02} style={{backgroundColor:'#697DC7'}}></View>            
      <HStack style={{width:'100%',marginTop:1,flex:1,alignItems:'center', backgroundColor:'#efefef'}}>
        <FlatList
          ListHeaderComponent={head}
          ListFooterComponent={footer}
          listKey='1'
          onRefresh={() =>{
            getData()          } }
          refreshing={false}
          renderItem={renderContainer}
          data = {[{id:'1'}]}
          style={{alignSelf:'stretch'}}
          stickyHeaderIndices={[0]}>
        </FlatList>
      </HStack>
    </View>
  ) 
}
export default Optional;
const styles = StyleSheet.create({

  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  checkSelect:{
    // elevation:1, 
    // backgroundColor:'#ffffff',
    width:screenWidth*0.25,
    alignItems:'center',
    height:screenHeight*0.06,
    justifyContent:'center',
  },
  select:{
    width:screenWidth*0.25,
    alignItems:'center',
    justifyContent:'center',

    height:screenHeight*0.06
  }
  
})