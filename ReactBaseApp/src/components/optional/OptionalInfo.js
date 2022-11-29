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
import WebView from 'react-native-webview';
// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';

const OptionalInfo = ({route,navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const {list,name} = route.params;
  function dealData(namelist,reportlist,year){
    let list = [];
    let ret = '';
    let reportName = '';
    let i=0;let j=0;
    for (i = 0; i < namelist.length; i++) {
      for(j = 0;j<reportlist.length;j++){
          ret = reportlist[j].year + reportlist[j].stage
          reportName = year+namelist[i].time
          if(reportName === ret){
            list.push(reportlist[j])
          }
      }
    }
    return list;
    
  }
  const MainItem = ({report,year}) =>{   
    let list = report;
    report = dealData(data,report,year)
    return(
      <View>
        <View>
          <Text>{year}</Text>
        </View>
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
              <View key={index}  style={{width:screenWidth*0.245,height:screenHeight*0.09,borderBottomWidth:0.5,justifyContent:'center',alignItems:'center',borderColor:"#BEBEBE"}}>
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
                <Text>查看</Text>
              </View>
            )})
          }
        </HStack>
      </View>
    )
  }
  const renderMainItem = ({item}) =>{
    return(
      <MainItem report = {list} year = {item.year} ></MainItem>  
    )
  }
  const data = [{"time": "年报"}, { "time": "三季报"}, { "time": "中报"}, { "time": "一季报"}]
  const year = [{"year": "2021"}, {"year": "2020"}, {"year": "2019"}, {"year": "2018"}]
  return(
    <View style = {styles.background}>
      <View>
        <Text>{name}</Text>
      </View>
      <HStack style = {{alignSelf:'flex-end',width:screenWidth*0.8,justifyContent:'space-between'}}>
        <View>
          <Text>lian</Text>
        </View>
        <View>
          <Text>lian</Text>
        </View>
        <View>
          <Text>lian</Text>
        </View>
        <View>
          <Text>lian</Text>
        </View>
      </HStack>
      <FlatList
        listKey='100'
        renderItem={renderMainItem}
        data={year}>
      </FlatList>
    
    </View>
  ) 
   

  

}
export default OptionalInfo;
const styles = StyleSheet.create({
  background:{
    alignItems:'center',
    flex:1,
    // backgroundColor:"#f5f5f5"

  },
})