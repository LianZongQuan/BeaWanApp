import React, { Component,useEffect, useState } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,
} from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity,Dimensions,FlatList ,Text,useColorScheme,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Swiper from 'react-native-swiper';

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import RNEChartsPro from "react-native-echarts-pro";
import WebView from "react-native-webview";
import CircleProgressView from './CircleProgressView'
// import CircleProgressView from '../../utils/CircleProgressView';
// import HttpUtil from '../../utils/http';
import TestData from '../components/optional/TestData.json'

const Optional = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  //分段器值
  const [value, setValue] = useState('');
  //分段器选择下标
  const [selectedIndex, setSelectedIndex] = useState(0);
  //滚动框(跟随滚动)
  const [scrollItem,setScrollItem] = useState(null);
  //自选列表名称
  const [listNameData,setListNameData] = useState(null);

  let _titleList = null;


  // React.useEffect(() => {
  //   setListNameData(TestData.testdata.optionData);
  //   console.log("Hello");
  // });
  const NameItem = ({name,type,code}) =>{
    let typeColor = '#347CAF'
    if(type === 'SH')
      typeColor = '#F4CE98'
    return(
      <View style={{marginLeft:10,height:screenHeight*0.09,borderBottomWidth:0.5,borderColor:"#BEBEBE"}}>
        <Text style={{fontSize:screenWidth*0.05,marginTop:10}}>{name}</Text>
        <HStack>
          <Text  style={{fontSize:screenWidth*0.035,backgroundColor:typeColor,color:"#ffffff"}}>{type}</Text>
          <Text style={{marginLeft:10,fontSize:screenWidth*0.035,color:'rgba(149, 29, 29, 0.62)'}}>{code}</Text>
        </HStack>
      </View>
    )
  }
  const renderNameItem = ({item}) =>(
    <NameItem name={item.name} type={item.type} code={item.code}></NameItem>
  );

  const MainItem = ({id}) =>{
    return(
      <View  style={{width:screenWidth*0.245}}>
      <FlatList  
        listKey={id}
        renderItem={renderCircleItem}
        keyExtractor={item => item.id}
        data={ DATA}>
      </FlatList>
    </View>
    )
  }
  const renderMainItem = ({item}) =>(
    <MainItem name={item.id} ></MainItem>
  );
  const HeadItem = ({id}) =>{
    return(
      <View style={{height:36,flexDirection:'row',backgroundColor:'#ffffff',borderBottomWidth:0.5,borderColor:"#BEBEBE", justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'left', fontSize:screenWidth*0.04}}>2023一季报</Text>
    </View>
    )
  }
  const renderHeadItem = ({item}) =>(
    <HeadItem name={item.id} ></HeadItem>
  );




  //环形图分数组件
  const renderCircleItem = ({ item }) => (
    <CircleItem score={item.score}></CircleItem>
  );
  const CircleItem = ({score}) => {
    let circleColor = '';
    if(score<=60){
      circleColor = '#81B337';
    }else if(score<=80)
    {
      circleColor = '#E99D42';
    }else{
      circleColor = '#E87777';
    }
    return (
      <Pressable delayLongPress={90}  onLongPress={onPressTest} style={{width:screenWidth*0.245,height:screenHeight*0.09,borderBottomWidth:0.5,justifyContent:'center',alignItems:'center',borderColor:"#BEBEBE"}}>
        <CircleProgressView raduis={screenHeight*0.035} progressBaseColor={'#BEBEBE'} progressColor = {circleColor} baseProgressWidth={4} progressWidth={4} progress={score} >
          <View style={{alignItems:'center',justifyContent:'center'}} >
            <Text style={{fontSize:18}}>
              {score}
            </Text>
          </View>
        </CircleProgressView>
                    {/* <Text style={{fontSize:22,color:circleColor }}>
              {score}
            </Text> */}
      </Pressable>
    );
  }

  function onPressTest(){
    console.log("按压");
  }
  const DATA = [
    {
      id: "1",
      score: 45,
    },
    {
      id: "2",
      score: 23,
    },
    {
      id: "3",
      score: 54,
    },
    {
      id: "4",
      score: 64,
    },
    {
      id: "5",
      score: 84,
    },
    {
      id: "6",
      score: 85,
    },
    {
      id: "7",
      score: 25,
    },
  ];
  const _onChange = (event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const _onValueChange = (val) => 
  {
    setListNameData(TestData.testdata.optionData1);
    // setValue(val);
    console.log(val)
  };

  const ListScroll = (e) => {
    // console.log(_titleList)
    const x1 = e.nativeEvent.contentOffset.x;
    if (Platform.OS === 'ios') {
      _titleList.setNativeProps({
        contentOffset: { x: x1, y: 0, animated: false },
      });
    } else {
      // _titleList.scrollToOffset({  x: x1, y: 0, animated: false });
      _titleList.scrollToOffset({  offset:x1, animated: false });
    
    }
  };
  const TestDATA = [
    {
      id: "1",
      score: 45,
    },
  ];
  const TestDATA1 = [
    {
      id: "1",
      score: 45,
    },
    {
      id: "2",
      score: 45,
    },
    {
      id: "3",
      score: 45,
    },
    {
      id: "4",
      score: 45,
    }
  ];

  const heard = () =>{
    return(
      <HStack>
      <View style={{width:'25%',borderBottomWidth:0.5,borderColor:"#BEBEBE", backgroundColor:'#ffffff',justifyContent:'center', alignItems:'center',height:36}}>
        <Text style={{color:'#BEBEBE',fontSize:20}}>名称</Text>
      </View>
      <FlatList 
        style={{width:'75%'}}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
 
        ref={(ref) => {
          _titleList = ref;
          
          // setScrollItem(ref)
        }}
        renderItem={renderHeadItem}
        keyExtractor={item => item.id}
        data={TestDATA1}
        horizontal={true}>
      </FlatList>
    </HStack>
    )
  }

  const TestItem = () =>{

      return(
        <HStack>

        <View style={{width:'25%',height:'100%'}}>
        <FlatList  
              listKey='100'
              renderItem={renderNameItem}
              keyExtractor={item => item.id}
              data={listNameData}>
            </FlatList>
        </View>


        <FlatList style={{width:'75%',height:'100%'}}
          scrollEventThrottle={120}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          // decelerationRate={'normal'}
          onScroll={ListScroll}
          horizontal={true}
          renderItem={renderMainItem}
          keyExtractor={item => item.id}
          data={TestDATA1}>
          
          >

        </FlatList>

        </HStack>


      )

  }
  const renderTestItem = ({item}) =>(
    <TestItem ></TestItem>
  );



  return(
    
    <View style={{ flex: 1,backgroundColor:"#f5f5f5", alignItems:'center' }}>

      <Text style={{marginLeft:20, marginTop:10, fontSize:screenWidth*0.06,alignSelf:'flex-start'}}>自选</Text>

      <Input placeholder="请输入股票代码或者公司名称"height={screenHeight*0.07} bg={"#ffffff"} width={screenWidth*0.9} borderRadius="24" mt={'3'} py="3" px="1" fontSize={screenWidth*0.04} 
        InputLeftElement={<Icon m="2" ml="3" size={screenWidth*0.07} color="gray.400" as={<MaterialIcons name="search" />} />}>
      </Input>

      <View style={styles.segmentContainer}>
        <SegmentedControl
        style={{backgroundColor:'#ffffff',height:screenHeight*0.05,width:screenWidth*0.8,borderRadius:4}}
        // tintColor="rgba(189, 49, 36, 0.56)"
        
        values={['最新', '年报', '中报', '季报']}
        selectedIndex={1}
        selectedIndex={selectedIndex}
        onChange={_onChange}
        onValueChange={_onValueChange}
        fontStyle={{color: '#BEBEBE',fontSize:18}}
        activeFontStyle={{color: 'black',fontSize:18}}
        />
      </View>
      <HStack style={{width:'98%',height:screenHeight*0.5,alignItems:'center',backgroundColor:'#ffffff'}}>
        <FlatList
        ListHeaderComponent={
          heard
        }
        listKey='1'
        renderItem={renderTestItem}
        data = {TestDATA}
        stickyHeaderIndices={[0]}>
        

        </FlatList>
      </HStack>
      {/* <HStack style={{width:'98%',height:screenHeight*0.5,alignItems:'center',backgroundColor:'#ffffff'}}>
        <ScrollView stickyHeaderIndices={[0]} >
          <HStack>
            <View style={{width:'25%',borderBottomWidth:0.5,borderColor:"#BEBEBE", backgroundColor:'#ffffff',justifyContent:'center', alignItems:'center',height:36}}>
              <Text style={{color:'#BEBEBE',fontSize:screenWidth*0.045}}>名称</Text>
            </View>
            <ScrollView 
              style={{width:'75%'}}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
              ref={(ref) => {
                setScrollItem(ref)
              }}
              horizontal={true}>
            <View style={{height:36,flexDirection:'row',backgroundColor:'#ffffff',borderBottomWidth:0.5,borderColor:"#BEBEBE", justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'left', fontSize:screenWidth*0.04}}>2023一季报</Text>
                <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'left', fontSize:screenWidth*0.04}}>2022三季报</Text>
                <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'left', fontSize:screenWidth*0.04}}>2022一季报</Text>
                <Text style={{color:'#BEBEBE',width:screenWidth*0.245,textAlign:'left', fontSize:screenWidth*0.04}}>2022年报</Text>
              </View>
            </ScrollView>
          </HStack>
          <HStack>



          <View style={{width:'25%',height:'100%'}}>
          <FlatList  
                
                renderItem={renderNameItem}
                keyExtractor={item => item.id}
                data={listNameData}>
              </FlatList>


          </View>
          <ScrollView  style={{width:'75%',height:'100%'}}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            onScroll={ListScroll}
            horizontal={true}>
            <View  style={{width:screenWidth*0.245}}>
              <FlatList  
                renderItem={renderCircleItem}
                keyExtractor={item => item.id}
                data={ DATA}>
              </FlatList>
            </View>
            <View  style={{width:screenWidth*0.245}}>
              <FlatList  
                renderItem={renderCircleItem}
                keyExtractor={item => item.id}
                data={ DATA}>
              </FlatList>
            </View>
            <View  style={{width:screenWidth*0.245}}>
              <FlatList  
                renderItem={renderCircleItem}
                keyExtractor={item => item.id}
                data={ DATA}>
              </FlatList>
            </View>
            <View  style={{width:screenWidth*0.245}}>
              <FlatList  
                renderItem={renderCircleItem}
                keyExtractor={item => item.id}
                data={ DATA}>
              </FlatList>
            </View>
          </ScrollView>
          </HStack>

        </ScrollView>
      </HStack> */}


        <TouchableOpacity>
          <HStack>
          <Text>sds</Text>
          <Text>sds</Text>
          </HStack>
        </TouchableOpacity>


    </View>


  
  ) 
}
export default Optional;
const styles = StyleSheet.create({
  wrapper: {},
  segmentContainer: {
    marginBottom: 10,

    marginTop:10,marginRight:20,width:'100%', alignItems:'flex-end'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB'
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
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },

  
})