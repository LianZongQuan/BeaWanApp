import * as CryptoJS from "crypto-js";
import * as WeChat from "react-native-wechat-lib";


/**
 *加密处理
 */
export const encryption = params => {
  let {data, type, param, key} = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach(ele => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
}


 //微信授权登录
 export function WeChatLogin(APP_ID, APP_SECRET, successCallback, errorCallback) {
  console.log('APP_ID===',APP_ID)
  WeChat.sendAuthRequest('snsapi_userinfo').then((data) => {
      // console.log('用户微信信息===',data)
  
    getAccessToken(APP_ID, APP_SECRET, data.code,successCallback,errorCallback);
  }).catch((err) => {
      // console.log('授权失败', err);
      errorCallback(err)
  })
}


// 获取 access_token
function getAccessToken(APP_ID, APP_SECRET,code,successCallback,errorCallback) {
  var AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APP_ID + '&secret=' + APP_SECRET + '&code=' + code + '&grant_type=authorization_code';
  // console.log('AccessTokenUrl=',AccessTokenUrl);
 WeChatGet(AccessTokenUrl,(datas)=>{
      
  getRefreshToken(APP_ID,datas.refresh_token,successCallback,errorCallback);
  },(err)=>{
      errorCallback(err)
  })
}


// 获取 refresh_token
function getRefreshToken(APP_ID,refresh_token,successCallback,errorCallback) {
  let getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + APP_ID + '&grant_type=refresh_token&refresh_token=' + refresh_token;
 WeChatGet(getRefreshTokenUrl,(datas)=>{
      getUserInfo(datas,successCallback,errorCallback);
  },(err)=>{
      errorCallback(err)
  })
}

//获取用户信息
function getUserInfo(responseData,successCallback,errorCallback){
  var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + responseData.access_token + '&openid=' + responseData.openid;
  WeChatGet(getUserInfoUrl,(datas)=>{
      successCallback(datas)
  },(err)=>{
      errorCallback(err)
  })
}

function WeChatGet(url,successCallback,errorCallback){
  fetch(url, {
      method: 'GET',
      timeout: 2000,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
  })
      .then((response) => response.json())
      .then((responseData) => {
          successCallback(responseData)
      })
      .catch((error) => {
          if (error) {
              errorCallback(error)
          }
      })
}
