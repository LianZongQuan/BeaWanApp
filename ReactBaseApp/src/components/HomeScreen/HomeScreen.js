import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { StyleSheet, TouchableOpacity,Image,Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview';
import { Table, Row, Rows,TableWrapper,Col } from 'react-native-table-component';

// import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import HttpUtil from '../../utils/http';
import RNEChartsPro from 'react-native-echarts-pro';

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return(
    <View style = {styles.background}>
      <View style={{height:screenHeight*0.22,width:screenWidth*1,alignItems:'center'}}>
        <Image  style={{borderWidth:1,width:screenWidth*0.7,height:screenHeight*0.06,marginTop:'7%'}}  source={require('./images/BeaWanIcon.png')}></Image>
        <HStack style={{}}>
          <Input onPressIn={()=>{
            navigation.navigate('搜索');
          }}  placeholderTextColor={'#707070'} placeholder="请输入股票代码或者公司名称"height={screenHeight*0.068} backgroundColor={'#FFFFFF'} borderWidth={'0'} mt={'6'} width={screenWidth*0.95} borderRadius="25" fontSize={screenWidth*0.04} 
            InputRightElement={ <Icon style={{marginRight:screenWidth*0.04,}} size={screenWidth*0.08} color="#BEBEBE" as={<MaterialIcons name="search" />} />} >
          </Input>
        </HStack>
      </View>
      <View style={{flex:1,width:screenWidth*1,alignItems:'center',backgroundColor:'#efefef',borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <Image style={{width:screenWidth*0.94,height:screenHeight*0.2,borderRadius:20,marginTop:screenHeight*0.02}} source={require('./images/image1.jpg')}>
        </Image>
        <View style={{width:screenWidth*0.94,height:screenHeight*0.41,borderRadius:20,backgroundColor:'#ffffff',marginTop:screenHeight*0.02}}>
          <HStack style={{width:'100%',marginTop:10,marginBottom:10}}>
            <View style={{width:'50%',marginLeft:10}}>
              <Text style={{color:'#101010',fontSize:screenWidth*0.045,fontWeight:'600'}}>热门搜索</Text>
            </View>
          </HStack>
          <HStack>
            <View style={{width:screenWidth*0.47,borderRightWidth:1, borderColor:'#cecece',height:screenHeight*0.24,alignItems:'center'}}>
              <TouchableOpacity>
                <HStack  style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                  
                  <View style={{width:screenWidth*0.25}}>
                    <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                    <Text>600600</Text>
                  </View>
                  <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                    <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
                  </View>
                </HStack>
              </TouchableOpacity>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>
                <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
                </View>
              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>
                <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
                </View>
              </HStack>

            </View>
            <View style={{width:screenWidth*0.47,height:screenHeight*0.24,alignItems:'center'}}>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>
                <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
                </View>
              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>
                <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
                </View>
              </HStack>
              <HStack style={{width:screenWidth*0.35,alignItems:'center',height:screenHeight*0.08}}>
                <View style={{width:screenWidth*0.25}}>
                  <Text style={{color:'#101010',fontSize:screenWidth*0.045}}>东方财富</Text>
                  <Text>600600</Text>
                </View>
                <View style={{width:screenWidth*0.15,alignItems:'flex-end'}}>
                  <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#101010" />
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
    backgroundColor:"#0371C7"

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