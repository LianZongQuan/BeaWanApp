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
import HttpUtil from '../../utils/http';
// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';

const OptionalInfo = ({route,navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  //搜索列表数据
  const [list,setList] = React.useState([]);
  // const {list,name} = route.params;
  const {name,comCode} = route.params;


  React.useEffect(() => {
    getList(comCode);
  },[]);

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
  function getList(comCode){
    let url = HttpUtil.localUrl+'company/result/'+comCode;
    console.log(url)
    // let user = await AsyncStorage.getItem('user_info');
    let header = {};
    HttpUtil.get(url,null,header,function(response){
      console.log(response.data.data)
      setList(response.data.data);
    })

  }


  // function jumpReport(){
  //   navigation.navigate('报告');
  // }
  function isyear(reprot,year){
    if(reprot.length == 0){
    }else{
      return(
        <Text style={{fontSize:screenWidth*0.05,marginTop:10,color:'#CBA43F'}}>{year}</Text>
      )
    }
  }
  const MainItem = ({report,year}) =>{   
    let list = report;
    // console.log(report)
    report = dealData(data,report,year)
    
    return(
      <View>
        {isyear(report,year)}
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
              <TouchableOpacity key={index}  onPress={()=>{
                navigation.navigate('报告',{comCode:item.comCode,year:item.year,stage:item.stage,name});
                }} style={{width:screenWidth*0.9,backgroundColor:"#efefef",borderRadius:25,height:screenHeight*0.06,elevation:0.3,marginTop:15}}>
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
                  <Icon style ={{marginRight:15}} as={<AntDesign name="right" />} size={screenWidth*0.06}  color="#999999" />
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
  const year = [{"year": "2022"},{"year": "2021"}, {"year": "2020"}, {"year": "2019"}, {"year": "2018"}]
  return(
    <View style = {styles.background}>
      <HStack width={'full'} backgroundColor={'#5461C9'} h={screenHeight*0.07} alignItems={'center'}  >
        <TouchableOpacity  onPress={()=>{navigation.goBack()}} style={{height:screenHeight*0.07,justifyContent:'center',width:screenWidth*0.2,alignItems:'center'}}>
          <Icon style ={{marginRight:20}} as={<AntDesign name="left" />} size={screenWidth*0.06} ml="2" color="#ffffff" />
        </TouchableOpacity>
        {/* <View  style={{height:screenHeight*0.08,justifyContent:'center',width:screenWidth*0.4,alignItems:'center'}}> */}
          <Text style={{fontSize:screenWidth*0.055,textAlignVertical:'center',height:screenHeight*0.07,fontWeight:'500',width:screenWidth*0.6,textAlign:'center',color:'#ffffff'}}>
            自选详情
          </Text>
        {/* </View> */}
      </HStack>
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
    backgroundColor:"#ffffff"

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