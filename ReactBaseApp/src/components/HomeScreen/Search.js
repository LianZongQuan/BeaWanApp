import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
import HttpUtil from '../../utils/http';
// import Data from './NameData.json'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Search = ({navigation}) => {
    //搜索内容
  const [inputText,setInputText] = React.useState('');
  //搜索列表数据
  const [listData,setListData] = React.useState(null);

  //添加股票代码
  const[addCode,setaddCode] = React.useState('');
  //全部列表数据
  const [data,setdata] = React.useState(null);
  let input1 = null;
  React.useEffect(() => {
    let url = HttpUtil.localUrl+'company/company/comList'
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      setdata(response.data) 
      // console.log(response.data[10].comName) 
    })
  },[]);

  function jumpOptional(){
    navigation.navigate('自选');
  }
  function jumpHomeScreen(){
    navigation.navigate('首页');
  }
  async function addOption(addCode){
    let url = HttpUtil.localUrl+'company/company/addSelfCom?comCode='+addCode;
    console.log(url)
    let user = await AsyncStorage.getItem('user_info');
    let header = {'token':JSON.parse(user).tokenValue};
    HttpUtil.get(url,null,header,function(response){
      setInputText('');

    })
  }
  function jumpReport(){
    navigation.navigate('报告');
  }
  const NameItem = ({name,code}) =>{
    return(
      <TouchableOpacity onPress={()=>{
        navigation.navigate('自选详情',{name:name,comCode:code});
      }} style={{width:screenWidth*0.9,borderBottomWidth:0.5,borderColor:"#BEBEBE", height:screenHeight*0.07,justifyContent:'center'}}>
        <HStack>
        <View style={{width:'35%', alignItems:'center',justifyContent:'center',height:screenHeight*0.07}}>
          <Text style={{fontSize:16}}>{name}</Text>
        </View>
        <View style={{width:'35%', alignItems:'center',justifyContent:'center',height:screenHeight*0.07}}>
          <Text style={{fontSize:16}}>{code}</Text>
        </View>
        <View style={{width:'30%', alignItems:'flex-end',justifyContent:'center',height:screenHeight*0.07}}>
        <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="muted.400" />

        </View>
        {/* <View style={{width:'20%', alignItems:'center',justifyContent:'center',height:screenHeight*0.07}}>
          <Text style={{fontSize:16}}>{name+code}</Text>
        </View> */}
        </HStack>
      </TouchableOpacity>
    )
  }
  const renderNameItem = ({item}) =>(
    <NameItem name={item.comName} code = {item.comCode} ></NameItem>
  );
  const noSearch =() =>{
    if(inputText == ''){
      return (
        <View style={{alignItems:'center'}}>
          <View style={{marginTop:12,alignSelf:'flex-start',marginLeft:12}}> 
          <Text style={{fontSize:screenWidth*0.045}}>历史记录</Text>
          </View>
        <HStack mt={'3'} style={{width:'100%',justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,backgroundColor:"#efefef",borderColor:"#BBBBBB",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>东方财富</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,borderColor:"#BBBBBB",backgroundColor:"#efefef",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>阿里巴巴</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,borderColor:"#BBBBBB",width:screenWidth*0.25,backgroundColor:"#efefef",height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>比亚迪</Text>
          </TouchableOpacity>
        </HStack>
        <HStack mt={'3'} style={{width:'100%',justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,borderColor:"#BBBBBB",backgroundColor:"#efefef",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>腾讯</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,borderColor:"#BBBBBB",backgroundColor:"#efefef",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>腾讯</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,borderRadius:18,borderColor:"#BBBBBB",backgroundColor:"#efefef",width:screenWidth*0.25,height:screenHeight*0.05,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:screenWidth*0.04}}>腾讯</Text>
          </TouchableOpacity>
        </HStack>
        <View style={{width:screenWidth*0.94,height:screenHeight*0.41,borderRadius:20,backgroundColor:'#ffffff',marginTop:screenHeight*0.02}}>
          <HStack style={{width:'100%',marginTop:30,marginBottom:10}}>
            <View style={{width:'50%',marginLeft:10}}>
              <Text style={{color:'#101010',fontSize:screenWidth*0.045,fontWeight:'600'}}>热门搜索</Text>
            </View>
          </HStack>
          <HStack width={'full'} style={{justifyContent:'center'}}>
            <View style={{width:screenWidth*0.47,borderRightWidth:1, borderColor:'#cecece',height:screenHeight*0.24,alignItems:'center'}}>
              <TouchableOpacity>
                <HStack  style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                  
                  <View style={{width:screenWidth*0.25}}>
                    <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                    <Text>600600</Text>
                  </View>

                </HStack>
              </TouchableOpacity>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>

              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>

              </HStack>

            </View>
            <View style={{width:screenWidth*0.47,height:screenHeight*0.24,alignItems:'center'}}>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>

              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>

              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>

              </HStack>
            </View>
          </HStack>
          <View style={{width:screenWidth*0.94,alignItems:'center'}}>
            <TouchableOpacity>


            <HStack style={{width:screenWidth*0.3,height:screenHeight*0.05,borderRadius:25,marginTop:20,backgroundColor:'#97A1D8'}}>
              <View style={{height:screenHeight*0.05,justifyContent:'center'}}>
                <Icon style ={{marginRight:20}} as={<MaterialIcons name="refresh" />} size={screenWidth*0.06} ml="2" color="#101010" />

              </View>
              <View style={{height:screenHeight*0.05,justifyContent:'center'}}>
                <Text style={{color:'#101010'}}>
                  换一批
                </Text>
              </View>
            </HStack>
            </TouchableOpacity>
          </View>

        </View>
        </View>
      )
    }else{
      return(
        <View >
      <TouchableOpacity  onPress={jumpReport} style={{width:screenWidth*0.9,borderBottomWidth:0.5,borderColor:"#BEBEBE", height:screenHeight*0.07,justifyContent:'center'}}>
        <HStack>
          <View style={{width:'35%', alignItems:'center',justifyContent:'center',height:screenHeight*0.07}}>
            <Text style={{fontSize:18,color:"#333333"}}>股票名称</Text>
          </View>
          <View style={{width:'35%', alignItems:'center',justifyContent:'center',height:screenHeight*0.07}}>
            <Text style={{fontSize:18,color:"#333333"}}>股票代码</Text>
          </View>
        </HStack>
      </TouchableOpacity>

          <FlatList         
            renderItem={renderNameItem}
            data={listData}
            refreshing={true}
            showsVerticalScrollIndicator={false}>      
          </FlatList>
      </View>
      )
    }
  }
  function search(text){
    setInputText(text)
    let list = data;
    if(text===''){
      setListData(list);
    }else{
      let isNumber = !isNaN(parseFloat(text)) && isFinite(text);

      let ret =  isNumber == true ? QueryCode(list,text):QueryName(list,text)
      if(ret != null){
        setListData(ret);
        // console.log(listData)
      }
    }
  }
  function QueryName(list, keyWord) {
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].comName)) {
        arr.push(list[i]);
        if(arr.length > 10){
          break;
        }
      }
    }
    return arr;
  }
  function QueryCode(list, keyWord) {
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].comCode)) {
        arr.push(list[i]);
        if(arr.length > 10){
          break;
        }
      }
    }
    return arr;
  }
  return(
    <View style = {styles.background}>
      <HStack style={{width:'100%',backgroundColor:'#5461C9'}}>
        <TouchableOpacity onPress={jumpHomeScreen} style={{width:'8%',alignItems:'center',height:screenHeight*0.08,justifyContent:'center'}}>
          {/* <Text style={{fontSize:screenWidth*0.05,color:'#707070'}}>取消</Text> */}
        <Icon st as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color='white' />

        </TouchableOpacity>
        <View style={{width:'92%',alignItems:'flex-start',height:screenHeight*0.08,justifyContent:'center'}}>
          <Input ref={'lian'} isFocused={true} borderWidth={'0'} onChangeText={(text)=>search(text)} ml={'3'} placeholderTextColor={'#707070'} placeholder="请输入股票代码或者公司名称" height={screenHeight*0.055} backgroundColor={'#F5F5F5'} width={screenWidth*0.85} borderRadius="24"  fontSize={screenWidth*0.035} 
            InputLeftElement={<Icon m="2" ml="3" size={screenWidth*0.07} color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement = {<Icon m="2" ml="3"  size={screenWidth*0.06} color="gray.400" as={<MaterialIcons name="cancel" />} />}>
          </Input>
        </View>

      </HStack>
      <View style={{width:screenWidth*1,alignItems:'center'}}>
        {noSearch()}
        </View>
    </View>
  )  
}
export default Search;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#ffffff",
    width:"100%",
    height:screenHeight*0.25,
    justifyContent: 'center',
    alignItems:'center'
  },
  background:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    backgroundColor:"#ffffff"

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
    height:screenHeight*0.09,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5"
  }
  
})