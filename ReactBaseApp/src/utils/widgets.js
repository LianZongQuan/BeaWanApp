import React, { Component } from 'react';
import {
  Text,Center,Box,Button,Image,Stack,Pressable,useToast,VStack, HStack,
  Icon,Input,View, Container,IconButton,CloseIcon,Alert
} from 'native-base';
  export const customAlter =(id,status,title) =>{
    toast.show({
      id:1,
      render: () => {
        return <Alert w={screenWidth*0.6} borderRadius={'lg'} variant={'subtle'} status={status} mt={screenHeight*0.2}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon size={screenWidth*0.05} mt="1" />
                  <Text style={{color:"black",  fontSize:screenWidth*0.045}} >
                     请登录后操作
                  </Text>
                </HStack>
                <IconButton onPress={() => toast.close(1)} variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon   size={screenWidth*0.03}  />} _icon={{
              color: "coolGray.600"
            }} />
              </HStack>
            </VStack>
          </Alert>;
      },
      placement: "top"
    })
  }



// const Widgets = () =>{
  //提示
   const toast = useToast();
   //提示组件（提示error 或者 success）
  export const ToastAlert = ({
    status,
    description,
  }) =>
  <Alert w="100%" status={status}>
    <VStack space={2} flexShrink={1} w="100%">
      <HStack flexShrink={1} space={2} justifyContent="space-between">
        <HStack space={2} flexShrink={1}>
          <Alert.Icon mt="1" />
          <Text fontSize="md" color="coolGray.800">
          {description}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  </Alert>;

  /**
   * 弹出框
   * @param {*} s
   */
  export const showErrorToast = (status,description,position) =>{
    toast.show({
      placement: "bottom",
      render: ({
      }) => {
        return <ToastAlert description={'zhanghao cuowu '} status={'error'}/>;
      }
    })
  }




// }
// export default Widgets;