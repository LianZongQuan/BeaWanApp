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
import CircleProgressView from '../../utils/CircleProgressView';
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
  function jumpReport(){
    navigation.navigate('报告');
  }
  const MainItem = ({report,year}) =>{   
    let list = report;
    report = dealData(data,report,year)
    return(
      <View>
        <View>
          <Text style={{fontSize:screenWidth*0.05,marginTop:10,color:'#CBA43F'}}>{year}</Text>
        </View>
        <View>
          {report.map((item, index) => {
            let circleColor = '';
            // console.log(item)
            if(item.score<=60){
              circleColor = '#81B337';
            }else if(item.score<=80)
            {
              circleColor = '#E99D42';
            }else{
              circleColor = '#E87777';
            }
            return (
              <TouchableOpacity key={index}  onPress={jumpReport} style={{width:screenWidth*0.9,backgroundColor:"#ffffff",borderRadius:10,height:screenHeight*0.06,elevation:0.3,marginTop:15}}>
                <HStack style={{width:screenWidth*0.9,height:screenHeight*0.06,}}>
                  <View style={{width:screenWidth*0.4,height:screenHeight*0.06,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:22,color:"#333333"}}>
                    {item.year+'年'+item.stage}
                    </Text>
                  </View>
                  <View style={{width:screenWidth*0.3,height:screenHeight*0.06,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:22,color:circleColor}}>
                    {item.score}
                    </Text>
                  </View>
                  <View style={{width:screenWidth*0.2,height:screenHeight*0.06,justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#999999" />
                  </View>
                </HStack>

              </TouchableOpacity>
            )})
          }
        </View>
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
        <Text style={{fontSize:screenWidth*0.065,marginTop:10,color:"#215476"}}>{name}</Text>
      </View>
      <FlatList
        listKey='100'
        renderItem={renderMainItem}
        showsVerticalScrollIndicator={false}
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
    backgroundColor:"#f5f5f5"

  },
})


              {/* 环形图分数组件 */}
              {/* <CircleProgressView raduis={screenHeight*0.035} progressBaseColor={'#BEBEBE'} progressColor = {circleColor} baseProgressWidth={4} progressWidth={4} progress={item.score} >
                <View style={{alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:18}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    {item.score}
                  </Text>
                </View>
                </CircleProgressView> */}