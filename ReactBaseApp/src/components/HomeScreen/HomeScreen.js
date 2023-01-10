import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button
  ,Icon,Flex,Input,View, Container, FlatList,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Image,Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Fontisto from 'react-native-vector-icons/Fontisto'

import WebView from 'react-native-webview';
import { Table, Row, Rows,TableWrapper,Col } from 'react-native-table-component';

// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import HttpUtil from '../../utils/http';
import RNEChartsPro from 'react-native-echarts-pro';
import ListData from '../optional/NameData.json'

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const hotItem = ({item}) =>{
    return (
      <HStack style={{width:'90%',height:screenHeight*0.04,alignItems:'center',justifyContent:'space-evenly',marginTop:10}}>
        <Text style={{fontSize:screenWidth*0.043,color:'#000000'}}  >{item.name}</Text>
        <Text style={{fontSize:screenWidth*0.035,color:'#9A9A9A'}}>{item.code}</Text>
      </HStack>
    )
  }


  return(
    <View style = {styles.background}>
      <View style={{height:screenHeight*0.19,width:screenWidth*1,alignItems:'center'}}>
        <Image  style={{borderWidth:1,width:screenWidth*1,height:screenHeight*0.11}}  source={require('./images/beawanHead.png')}></Image>
        <HStack >
          <Input onPressIn={()=>{
            navigation.navigate('搜索');
          }}  placeholderTextColor={'#707070'}  placeholder="请输入股票代码或者公司名称"height={screenHeight*0.058} backgroundColor={'#efefef'} borderWidth={'0'} 
           width={screenWidth*0.95} borderRadius="25" fontSize={screenWidth*0.04} 
            InputRightElement={ <Icon style={{marginRight:screenWidth*0.04,}} size={screenWidth*0.08} color="#BEBEBE" as={<MaterialIcons name="search" />} />} >
          </Input>
        </HStack>
      </View>
      <View style={{flex:1,width:screenWidth*1,alignItems:'center',backgroundColor:'#ffffff',borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <Image style={{width:screenWidth*0.94,height:screenHeight*0.2,borderRadius:20}} source={require('./images/xuanchuan.png')}>
        </Image>

        <HStack style={{width:screenWidth*0.94,height:screenHeight*0.43,marginTop:screenHeight*0.024}}>
          <View style={{elevation:2,width:screenWidth*0.46,backgroundColor:'#ffffff',marginRight:screenWidth*0.02,borderRadius:20,height:screenHeight*0.43}}>
            <HStack style={{width:'100%',marginTop:10}}>
              <View >
                <Icon style={{marginLeft:screenWidth*0.04,}} size={screenWidth*0.06} color='danger.500' as={<Fontisto name="fire" />} />
              </View>
              <View style={{width:'60%',alignItems:'center',marginLeft:10}}>
                <Text style={{color:'#101010',fontSize:screenWidth*0.045,fontWeight:'600'}}>热门搜索</Text>
              </View>
            </HStack>
            <View style={{width:'100%',alignItems:'center',height:screenHeight*0.38}}>
              <FlatList
                listKey='100'
                renderItem={hotItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={ListData.companyList}>
              </FlatList>
            </View>

          </View>
          <View style={{elevation:2,width:screenWidth*0.46,backgroundColor:'#ffffff',borderRadius:20,height:screenHeight*0.43}}>
            <HStack style={{width:'100%',marginTop:10}}>
              <View >
                <Icon style={{marginLeft:screenWidth*0.04,}} size={screenWidth*0.06} color='#0371C7' as={<MaterialIcons name="fiber-new" />} />
              </View>
              <View style={{width:'60%',alignItems:'center',marginLeft:10}}>
                <Text style={{color:'#101010',fontSize:screenWidth*0.045,fontWeight:'600'}}>最新研报</Text>
              </View>
            </HStack>
            <View style={{width:'100%',alignItems:'center',height:screenHeight*0.38}}>
            <FlatList
                listKey='100'
                renderItem={hotItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={ListData.companyList}>
              </FlatList>
            </View>

          </View>

        </HStack>

      </View>
    </View>
  ) 
   

  

}
export default HomeScreen;
const styles = StyleSheet.create({
  wrapper: {marginTop:'5%'},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor:"#68A4CF",
    width:"94%",
    height:"18%",
    marginTop:'5%',
    borderRadius:20,
    justifyContent: 'center',
  },
  background:{
    alignItems:'center',
    flex:1,
    backgroundColor:"#ffffff"

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
    // borderColor:"#f5f5f5"
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',width:'100%' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
  
})