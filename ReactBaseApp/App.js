import React from 'react';
import {
  Link,  HStack, Center, Heading, Switch, useColorMode, NativeBaseProvider, VStack, Box,
   AspectRatio, Image,  FormControl, Select, CheckIcon, WarningOutlineIcon, ScrollView,
  Flex, Spacer
} from 'native-base';
import { Button, Text, View ,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/components/HomeScreen/HomeScreen';
import Search from './src/components/HomeScreen/Search';
import Login from './src/components/login/Login';
import Register from './src/components/register/Register'
import User from './src/components/user/User';
import UserInfo from './src/components/user/userInfo/UserInfo'
//   import UserInfo from './src/components/user/userInfo/UserInfo'
    import UserProfile from './src/components/user/userInfo/UserProfile'
    import ModifyNickname from './src/components/user/userInfo/ModifyNickname';
    import ModifyPassword from './src/components/user/userInfo/ModifyPassword';
    import ModifyPhone from './src/components/user/userInfo/ModifyPhone';
import Optional from './src/components/optional/Optional'
import OptionalInfo  from './src/components/optional/OptionalInfo';
import AddOptional from './src/components/optional/AddOptional';
import Report from './src/components/optional/Report';
import Message from './src/components/optional/Message';

import AboutApp from './src/components/user/AboutApp';
import Wallet from './src/components/user/Wallet'
import OrderInfo from './src/components/user/OrderInfo'
import FeedBack from './src/components/user/FeedBack'
import PrivacyPolicy from './src/components/user/PrivacyPolicy';
  const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {createRef} from 'react';




function App() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;



  return (
    // <Provider store={store} >
      <NativeBaseProvider  >
      <NavigationContainer ref={createRef()}> 
      <Stack.Navigator initialRouteName="Home"   screenOptions={{}} >
        <Stack.Screen name="Home" 
        
          options={{
            header: ({ navigation }) => { },
            title: '',
            
            
        }}>
          {() => (
            <Tab.Navigator
              initialRouteName="??????"
              
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  size = screenWidth*0.055;
                  if (route.name === '??????') {
                    // iconName = focused
                    //   ? 'home'
                    //   : 'home-outline';
                    return <Ionicons name={'home'} size={size} color={color} />;
                  } else if (route.name === '??????') {
                    // iconName = focused ? 'pluscircle' : 'pluscircleo';
                    return <AntDesign name={'pluscircle'} size={size} color={color} />;
                  }else if (route.name === '??????') {
                    // iconName = focused ? 'user-circle-o' : 'user-circle';
                    return <FontAwesome name={'user-circle-o'} size={size} color={color} />;
                  }
                },
                //????????????
                tabBarLabelStyle: {
                  fontSize: screenWidth*0.04,
                },
                //???????????????
                tabBarStyle:{
                  paddingTop:5,
                  height:screenWidth*0.14,
                  shadowOpacity:1,
                  backgroundColor:'#0371C7'
                },
                //????????????
                tabBarActiveTintColor: '#E99D42',
                //???????????????
                tabBarInactiveTintColor: '#ffffff',
                headerShown: false
            })}>
              <Tab.Screen name="??????" component={HomeScreen}/>
              <Tab.Screen name="??????" component={Optional} />
              <Tab.Screen name="??????" component={User} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        {/* 


        
        
        <Stack.Screen name="??????" component={Test} /> */}
                <Stack.Screen name="????????????" component={UserInfo} options={{headerShown:false}}/>
        <Stack.Screen name="????????????" component={ModifyNickname} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="????????????" component={UserProfile} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="???????????????" component={ModifyPhone} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="????????????" component={ModifyPassword} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="??????" component={Wallet} options={{headerShown:false}}/>
        <Stack.Screen name="????????????" component={OrderInfo} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="????????????" component={FeedBack} options={{headerShown:false}}/>
        <Stack.Screen name="?????????" component={PrivacyPolicy} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="??????" component={Search} options={{headerShown:false}}/>

        <Stack.Screen name="??????" component={Message} options={{headerShown:false}} />

        <Stack.Screen name="??????" component={AboutApp} options={{headerShown:false}}/>
        <Stack.Screen name="????????????" component={AddOptional} options={{headerTitleAlign:'center'}}/>

        <Stack.Screen name="????????????" component={OptionalInfo} options={{headerShown:false}}/>
        <Stack.Screen name="??????" component={Report} options={{headerShown:false}}/>
        <Stack.Screen name="??????" component={Login}  options={{headerShown:false}}/>
        <Stack.Screen name="??????" component={Register} options={{headerTitleAlign:'center'}} />
      </Stack.Navigator>
    </NavigationContainer>
      </NativeBaseProvider>
    // </Provider>
  );
};
export default App;
