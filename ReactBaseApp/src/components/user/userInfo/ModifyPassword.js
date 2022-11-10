import React, { Component } from 'react';
import {
   Avatar,HStack,Center,Box,Button,Image
  ,Icon,Flex,Input,View, Container,Pressable
} from 'native-base';
import { StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Text } from 'react-native';
// import HttpUtil from '../../utils/http';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ModifyPassword = ({navigation}) => {
  //控制密码是否显示
  const [show, setShow] = React.useState(false);

  return(
    <View style = {styles.background}>
      <Input 
        type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={6} mr="2" color="muted.400" /></Pressable>
        }
        fontSize = {'xl'} w={"94%"} mt={4}
        variant="underlined" placeholder=" 旧密码" >
      </Input>
      <Input 
        type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={6} mr="2" color="muted.400" /></Pressable>
        }
        fontSize = {'xl'} w={"94%"} mt={4}
        variant="underlined" placeholder=" 新密码" >
      </Input>
      <Input 
        type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={6} mr="2" color="muted.400" /></Pressable>
        }
        fontSize = {'xl'} w={"94%"} mt={4}
        variant="underlined" placeholder=" 确认密码" >
      </Input>
      <Button _text={{fontSize:screenWidth*0.055} } backgroundColor={'#E99D42'} style={{ borderRadius:4,marginTop:30, width:"90%", height:screenHeight*0.08,alignItems:'center'}} >
        提交
      </Button>
      <Text style={{marginTop:20, width:"90%",color:'rgba(0, 0, 0, 0.4)'}}>
      温馨提示：密码长度至少6个字符，最长18个字符，为了您
      的密码安全，建议使用数字字母混合排列，区分大小写。
      </Text>

    </View>
  ) 
  
}
export default ModifyPassword;
const styles = StyleSheet.create({
  header: {
    backgroundColor:"rgba(244, 206, 152, 0.47)",
    width:"94%",
    height:screenHeight*0.15,
    marginTop:'4%',
    borderRadius:20,
  },
  background:{
    alignItems:'center',
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
    borderColor:"#f5f5f5"
  }
  
})