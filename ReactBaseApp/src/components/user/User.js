import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Alert,VStack,IconButton,CloseIcon,useToast
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
import HttpUtil from '../../utils/http';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const User = ({navigation}) => {

  //用户数据
  const [user, setuser] = React.useState(null);
  const toast = useToast();
  let listener = null
   React.useEffect(() => {
    const focus=navigation.addListener('focus',()=>{
      getUser();
    })
  },[navigation]);
  //未登录提示
  function loginAlter(){
    Alert.alert(
      "请登录后操作",
    );
  }

  // <IconButton onPress={() => toast.close(1)} variant="unstyled" _focus={{
  //   borderWidth: 0
  // }} icon={<CloseIcon   size={screenWidth*0.04}  />} _icon={{
  //   color: "coolGray.600"
  // }} />

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
  
  function jumpLogin(){
    navigation.navigate('登录');
  }
  function jumpUserInfo(){
    let status = "warning";
    let title = "请登录后操作！";
    let id = 1; 
    if(user === null){
      customAlter(id,status,title);
    }else{
      navigation.navigate('个人信息',{name:JSON.parse(user).name,phone:JSON.parse(user).phone});
    }
  }
  function jumpWallet(){
    let status = "warning";
    let title = "请登录后操作！";
    let id = 1; 
    if(user === null){
      customAlter(id,status,title);
    }else{
      navigation.navigate('钱包');
    }
  }
  function jumpOrderInfo(){
    let status = "warning";
    let title = "请登录后操作！";
    let id = 1; 
    if(user === null){
      customAlter(id,status,title);
    }else{
      navigation.navigate('订单信息');
    }
  }
  function jumpFeedBack(){
    navigation.navigate('意见反馈');
  }
  function jumpAboutApp(){
    navigation.navigate('关于');
  }
  function jumpPrivacyPolicy(){
    navigation.navigate('报告');
  }
  async function getUser(){
    try {
      let user_info = await AsyncStorage.getItem('user_info');
      setuser(user_info)
      console.log(user_info)

    } catch (error) {
      console.log(error)
    }
  }

  //控制显示用户信息
  function head(){
    if(user === null){
      return(
        <HStack style={{marginLeft:screenWidth*0.05}}>
            <Avatar  style={{width:screenWidth*0.2,height:screenWidth*0.2,borderColor:"#BEBEBE",borderWidth:1}}  mr="4" >
              <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.2,height:screenWidth*0.2}} source={require('./images/heard.jpg')} ></Image>
            </Avatar>
          <TouchableOpacity onPress={jumpLogin} style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:screenWidth*0.065,color:"#666666"}}>登录/注册</Text>
          </TouchableOpacity>
        </HStack>
      )
    }else{
      return(
        <HStack style={{marginLeft:screenWidth*0.05,height:screenWidth*0.2}}>
            <Avatar  style={{width:screenWidth*0.2,height:screenWidth*0.2,borderColor:"#BEBEBE",borderWidth:1}}  mr="4" >
              <Image alt='TU'style={{borderRadius:50,width:screenWidth*0.2,height:screenWidth*0.2}} source={require('./images/heard.jpg')} ></Image>
            </Avatar>
          <View onPress={jumpLogin} style={{alignItems:'flex-start',height:screenWidth*0.2,justifyContent:'center'}}>
            {/* <Text style={{fontSize:screenWidth*0.065,color:"#6C6C6C"}}>{JSON.parse(user).name == undefined? JSON.parse(user).nickname:JSON.parse(user).name}</Text> */}

            {/* <Text style={{fontSize:screenWidth*0.065,color:"#6C6C6C",marginTop:5}}>{JSON.parse(user).phone}</Text> */}
            <Text style={{fontSize:screenWidth*0.065,color:"#ffffff"}}>{JSON.parse(user).name == undefined? JSON.parse(user).userNickName:''}</Text>
            <Text style={{fontSize:screenWidth*0.035,color:"#ffffff",marginTop:5}}>手机号：{JSON.parse(user).phone}</Text>

            <HStack style={{height:screenHeight*0.03,backgroundColor:'#ffffff',marginTop:10,borderRadius:5,width:screenWidth*0.25}}>
              <View style={{height:screenHeight*0.03,justifyContent:'center'}}>
                <Image alt='会员中心' size={screenWidth*0.04} ml="2" source={require('./images/noMember.png')}></Image>
              </View>
              <View style={{height:screenHeight*0.03,justifyContent:'center'}}>
                <Text style={{fontSize:screenWidth*0.03,color:"#6C6C6C"}}>未开通会员</Text>
              </View>
            </HStack>
          </View>
        </HStack>
      )

    }
  }

  return(
    <View style = {styles.background}>
       
      <View style = {styles.header}>
        <View style={{width:screenWidth*1,alignItems:'flex-end'}}>
          <HStack style={{marginRight:20}}>
            <Icon style={{marginRight:20}} color={'#ffffff'} as={<AntDesign name="search1" />} size={screenWidth*0.07}  />
            <Icon color={'#ffffff'} as={<MaterialCommunityIcons name="message-processing-outline" />} size={screenWidth*0.07}  />
          </HStack>
        </View>
        {head()}
      </View>
      <View style = {styles.content}>
      <TouchableOpacity  style={styles.list1} onPress={jumpWallet} >
          <HStack style = {{marginLeft:"3%"}}>
            <Image alt='会员中心' size={screenWidth*0.07} ml="2" source={require('./images/member.png')}></Image>
            <Text style = {styles.listText}>会员中心</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={jumpUserInfo} >
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="user" />} size={screenWidth*0.07} ml="2" color="#666666" />
            <Text style = {styles.listText}>个人信息</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={jumpOrderInfo}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="profile" />} size={screenWidth*0.07} ml="2" color="#666666" />
            <Text style = {styles.listText}>订单信息</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}onPress={jumpFeedBack}>
          <HStack style = {{marginLeft:"3%"}} >
            <Icon as={<MaterialIcons name="feedback" />} size={screenWidth*0.07} ml="2" color="#666666" />
            <Text style = {styles.listText}>意见反馈</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={jumpPrivacyPolicy}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<MaterialCommunityIcons name="eye-off-outline" />} size={screenWidth*0.07} ml="2" color="#666666" />
            <Text style = {styles.listText}>隐私政策</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>
        <TouchableOpacity onPress={jumpAboutApp} style={styles.list}>
          <HStack style = {{marginLeft:"3%"}}>
            <Icon as={<AntDesign name="exclamationcircleo" />} size={screenWidth*0.07} ml="2" color="#666666" />
            <Text style = {styles.listText}>关于</Text>
            <Icon style ={{marginRight:20}} as={<AntDesign name="right" />} size={screenWidth*0.06} ml="2" color="#666666" />
          </HStack>     
        </TouchableOpacity>

      </View>
    </View>
  ) 
  
}
export default User;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"#0371C7",
    width:"100%",
    height:screenHeight*0.2,
    justifyContent: 'center',
    
  },
  background:{
    alignItems:'center',
    backgroundColor:"#f5f5f5"

  },
  content:{
    // borderWidth:1,
    height:screenHeight*0.8,
    width:"100%",
    backgroundColor:"#f5f5f5"
  },
  list:{
    justifyContent:'center',
    height:screenHeight*0.08,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5",
    backgroundColor:"#ffffff"

  },
  list1:{
    justifyContent:'center',
    height:screenHeight*0.08,
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#f5f5f5",
    marginBottom:10,
    marginTop:10,
    backgroundColor:"#ffffff"

  },
  listText:{
    fontSize:screenWidth*0.055,
    width:screenWidth*0.73,
    marginLeft:10
  }
})