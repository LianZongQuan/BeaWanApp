import React, { Component,useEffect, useState } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Divider, Modal,FormControl
} from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity,Dimensions,FlatList ,Alert,Text,useColorScheme,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from "react-native-webview";

import CircleProgressView from '../../utils/CircleProgressView';
import HttpUtil from '../../utils/http';
import TestData from './TestData.json'
import TestData1 from './TestData1.json'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Optional = ({navigation}) => {


  //分段器选择下标
  const [selectedIndex, setSelectedIndex] = useState(0);
  //总数据
  const [listData,setListData] = useState(TestData.testdata.optionData);
  //搜索内容
  const [inputText,setInputText] = useState('');
  //用户数据
  const [user, setuser] = React.useState(null);

  // //自选列表名称
  const [listNameData,setListNameData] = useState(null);
  //报告列表名称
  const [listReportName,setListReportName] = useState(TestData.testdata.optionData[0].report);
  //指向的报告列表组件
  let _titleList = null;


  React.useEffect(() => {
    setSelectedIndex(0);
    setInputText('');
    // user == null ? setListData(TestData1.testdata.optionData) : setListData(TestData.testdata.optionData);
    setListData(TestData.testdata.optionData);
    setListNameData(TestData.testdata.optionData);
    // user == null ? setListReportName(TestData1.testdata.optionData[0].report) : setListReportName(TestData.testdata.optionData[0].report);
    setListReportName(TestData.testdata.optionData[0].report);
  },[]);

  async function getUser(){
    try {

      let user_info = await AsyncStorage.getItem('user_info');
      setuser(user_info)
    } catch (error) {
      console.log(error)
    }
  }
  //按压测试
  function onPressTest(){
    setModalVisible(!modalVisible);
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
  //跳转到添加自选页面
  function jumpAddOptional(){
    navigation.navigate('添加自选');
  }
  function jumpReport(){
    navigation.navigate('报告');
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
        keyExtractor={item => item.id}
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
      <TouchableOpacity onLongPress={onPressTest} style={{marginLeft:10,height:screenHeight*0.09,borderBottomWidth:0.5,borderColor:"#BEBEBE"}}>
        <Text style={{fontSize:screenWidth*0.05,marginTop:10}}>{name}</Text>
        <HStack>
          <Text  style={{fontSize:screenWidth*0.035,backgroundColor:typeColor,color:"#ffffff"}}>{type}</Text>
          <Text style={{marginLeft:10,fontSize:screenWidth*0.035,color:'rgba(149, 29, 29, 0.62)'}}>{code}</Text>
        </HStack>
      </TouchableOpacity>
    )
  }
  const renderNameItem = ({item}) =>(
    <NameItem name={item.name} type={item.type} code={item.code}></NameItem>
  );
  const MainItem = ({report}) =>{
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
      <MainItem report = {item.report} ></MainItem>  
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
            keyExtractor={item => item.id}
            data={listData}>
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
            keyExtractor={item => item.id}
            data={listData}>
          </FlatList>
        </ScrollView>
      </HStack>
    )
  }
  const renderContainer = ({item}) =>(
    <Container ></Container>
  );
  function select0(){
    setInputText('');
    setSelectedIndex(0);
    setListData(TestData.testdata.optionData);
    // setListNameData(TestData.testdata.optionData);
    setListReportName(TestData.testdata.optionData[0].report);
  }
  function select1(){
    setInputText('');
    setSelectedIndex(1);
    setListData(TestData.testdata.optionData1);
    // setListNameData(TestData.testdata.optionData);
    setListReportName(TestData.testdata.optionData1[0].report);
  }
  function select2(){
    setSelectedIndex(2);
  }
  function select3(){
    setSelectedIndex(3);
  }
  function search(text){
    setInputText(text)
    // let list = TestData.testdata.optionData;
    let list = selectedIndex == 0 ? TestData.testdata.optionData : TestData.testdata.optionData1;
    if(text===''){
      setListData(list);
    }else{
      let isNumber = !isNaN(parseFloat(text)) && isFinite(text);


      let ret =  isNumber == true ? QueryCode(list,text):QueryName(list,text)
      if(ret != null){
        setListData(ret);
      }
    }
  }
  function QueryName(list, keyWord) {
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].name)) {
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
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return(
    <View style={{ flex: 1,backgroundColor:"#f5f5f5", alignItems:'center' }}>
      <Modal style={{alignItems:'center', width:screenWidth*0.5,alignSelf:'center'}} isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Body>
            <Button variant='ghost' colorScheme="blueGray">删除 </Button>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false)}}>取消 </Button>

          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* <Text style={{marginLeft:20, marginTop:10, fontSize:screenWidth*0.06,alignSelf:'flex-start'}}>自选</Text> */}
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