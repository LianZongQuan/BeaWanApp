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
  //指向的报告列表组件
  let _titleList = null;
  const toast = useToast();
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  

  React.useEffect(() => {
    const focus=navigation.addListener('focus',()=>{
      setSelectedIndex(0);
      setInputText('');
      setListReportName([{"time": "2021年报"}, { "time": "2021三季报"}, { "time": "2021中报"}, { "time": "2021一季报"}]);
      getData();
    }) 
  },[navigation]);

  async function getData(){
    let url = HttpUtil.localUrl+'company/company/selfCom'
    let user = await AsyncStorage.getItem('user_info');
    if(user === null){
      setdata(null)
    }else{
      console.log(user)
      setuser(user);
      let header = {'token':JSON.parse(user).tokenValue};
      HttpUtil.get(url,null,header,function(response){
        setdata(response.data.data)
      })
    }
  }
  function select0(){
    setInputText('');
    setSelectedIndex(0);
    setListReportName([{"time": "2021年报"}, { "time": "2021三季报"}, { "time": "2021中报"}, { "time": "2021一季报"}]);
  }
  function select1(){
    setInputText('');
    setSelectedIndex(1);
    setListReportName([{"time": "2021年报"}, { "time": "2020年报"}, { "time": "2019年报"}, { "time": "2018年报"}]);
    // getData();
  }
  function select2(){
    setInputText('');
    setSelectedIndex(2);
    setListReportName([{"time": "2021中报"}, { "time": "2020中报"}, { "time": "2019中报"}, { "time": "2018中报"}]);
  }
  function select3(){
    setInputText('');
    setSelectedIndex(3);
    setListReportName([{"time": "2021三季报"}, { "time": "2021一季报"}, { "time": "2020三季报"}, { "time": "2020一季报"}]);
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
        return <Alert w={screenWidth*0.6} borderRadius={'lg'} variant={'subtle'} status={status} mt={screenHeight*0.2}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon size={screenWidth*0.05} mt="1" />
                  <Text style={{color:"black",  fontSize:screenWidth*0.045}} >
                     请登录后操作
                  </Text>
                </HStack>
                <IconButton onPress={() => toast.close(1)} variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon   size={screenWidth*0.03}  />} _icon={{
              color: "coolGray.600"
            }} />
              </HStack>
            </VStack>
          </Alert>;
      },
      placement: "top"
    })
  }
  //跳转到添加自选页面
  function jumpAddOptional(){
    let status = "warning";
    let title = "Selection successfully moved!";
    let id = 1; 
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
            // console.log(reportlist[j])
          }
      }
    }
    return list;
    
  }
  //删除自选
  async function deleteOption(){

    let url = HttpUtil.localUrl+'company/company/deleteSelfCom?comCode='+deleteCode;
    console.log(url)
    let user = await AsyncStorage.getItem('user_info');
    let header = {'token':JSON.parse(user).tokenValue};
    HttpUtil.get(url,null,header,function(response){
        console.log(response.data);
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
        <View style={{width:'25%',borderBottomWidth:0.5,borderColor:"#BEBEBE", backgroundColor:'#ffffff',justifyContent:'center', alignItems:'center',height:36}}>
          <Text style={{color:'#BEBEBE',fontSize:screenWidth*0.04}}>名称</Text>
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
        <Icon  color={'#9A9A9A'}  as={<MaterialIcons name="add" />} size={screenWidth*0.08}  />
        </View>
        <View style={{height:screenHeight*0.1,alignContent:'center'}}>
        <Text  style={{color:'#9A9A9A',fontSize:screenWidth*0.053}}>添加自选</Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
  const NameItem = ({name,type,code}) =>{
    let typeColor = '#347CAF'
    if(type === 'SH')
      typeColor = '#F4CE98'
    return(
      <TouchableOpacity onLongPress={()=>{
    setModalVisible(!modalVisible);
    console.log(code)
    setdeleteCode(code);
      }} style={{marginLeft:10,height:screenHeight*0.09,borderBottomWidth:0.5,borderColor:"#BEBEBE"}}>
        <Text style={{fontSize:screenWidth*0.05,marginTop:10}}>{name}</Text>
        <HStack>
          <Text  style={{fontSize:screenWidth*0.035,backgroundColor:typeColor,color:"#ffffff"}}>{type}</Text>
          <Text style={{marginLeft:10,fontSize:screenWidth*0.035,color:'rgba(149, 29, 29, 0.62)'}}>{code}</Text>
        </HStack>
      </TouchableOpacity>
    )
  }
  const renderNameItem = ({item}) =>(
    <NameItem name={item.comName} type={item.type} code={item.comCode}></NameItem>
  );
  const MainItem = ({report}) =>{   
    report = dealData(listReportName,report)
    return(
      <View  >
        <HStack>
          {report.map((item, index) => {
            let circleColor = '';
            if(item.score<=60){
              circleColor = '#81B337';
            }else if(item.score<=80)
            {
              circleColor = '#E99D42';
            }else{
              circleColor = '#E87777';
            }
            return (
              <Pressable key={index} delayLongPress={90}  onLongPress={jumpReport} style={{width:screenWidth*0.245,height:screenHeight*0.09,borderBottomWidth:0.5,justifyContent:'center',alignItems:'center',borderColor:"#BEBEBE"}}>
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
              </Pressable>
            )})
          }
        </HStack>
      </View>
    )
  }
  const renderMainItem = ({item}) =>{
    return(
      <MainItem report = {item.comReports} ></MainItem>  
    )
  }
  const HeadItem = ({id,time}) =>{
  
    return(
      <View style={{height:36,backgroundColor:'#ffffff',borderBottomWidth:0.5,borderColor:"#BEBEBE", justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'center', fontSize:screenWidth*0.04}}>{time}</Text>
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
    <View style={{ flex: 1,backgroundColor:"#f5f5f5", alignItems:'center' }}>
      <Modal style={{alignItems:'center', width:screenWidth*0.5,alignSelf:'center'}} isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Body>
            <Button onPress={deleteOption} variant='ghost' colorScheme="blueGray">删除 </Button>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false)}}>取消 </Button>

          </Modal.Body>
        </Modal.Content>
      </Modal>            
      <Input value={inputText} onChangeText={(text)=>search(text)} placeholder="检索"height={screenHeight*0.07} bg={"#ffffff"} width={screenWidth*0.9} borderRadius="24" mt={screenHeight*0.03} py="3" px="1" fontSize={screenWidth*0.04} 
        InputLeftElement={<Icon m="2" ml="3" size={screenWidth*0.07} color="gray.400" as={<MaterialIcons name="search" />} />}>
      </Input>
      <View style={styles.segmentContainer}>
        <Flex direction="row"  >
          <TouchableOpacity onPress={select0} style={selectedIndex == 0 ? styles.checkSelect:styles.select} >
            <Text style={{color:selectedIndex == 0 ? "black":"#BEBEBE",  fontSize:screenWidth*0.055}}>最新</Text>
          </TouchableOpacity>
          <Divider h={7} bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
          <TouchableOpacity onPress={select1} style={selectedIndex == 1 ? styles.checkSelect:styles.select}>
            <Text style={{color:selectedIndex == 1 ? "black":"#BEBEBE", fontSize:screenWidth*0.055}}>年报</Text>
          </TouchableOpacity>
          <Divider h={7} bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
          <TouchableOpacity onPress={select2}  style={selectedIndex == 2 ? styles.checkSelect:styles.select}>
            <Text style={{color:selectedIndex == 2 ? "black":"#BEBEBE",fontSize:screenWidth*0.055}}>中报</Text>
          </TouchableOpacity>
          <Divider h={7} bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
          <TouchableOpacity onPress={select3}  style={selectedIndex == 3 ? styles.checkSelect:styles.select}>
            <Text style={{color:selectedIndex == 3 ? "black":"#BEBEBE",fontSize:screenWidth*0.055}}>季报</Text>
          </TouchableOpacity>
        </Flex>

      </View>
      <HStack style={{width:'100%',marginTop:1,height:screenHeight*0.7,alignItems:'center', backgroundColor:'#ffffff'}}>
        <FlatList
          ListHeaderComponent={head}
          ListFooterComponent={footer}
          listKey='1'
          onRefresh={() =>{
            console.log("Lian")
          } }
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
  segmentContainer: {
    marginBottom: 10,
    marginTop:10,
    marginRight:20,
    width:'100%',
    alignItems:'flex-end'
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  checkSelect:{
    elevation:3,
    backgroundColor:'#ffffff',
    width:screenWidth*0.18,
    alignItems:'center',
    borderRadius:6,
  },
  select:{
    width:screenWidth*0.18,
    alignItems:'center',
  }
  
})