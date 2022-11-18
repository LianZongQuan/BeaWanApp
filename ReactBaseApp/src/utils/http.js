import React, { Component } from 'react';
import buffer, { Buffer } from 'buffer';

import axios from 'axios';
import qs from 'qs'



// const remoteUrl = 'http://47.99.144.176:8086/'

class HttpUtil {
  static localUrl = 'http://192.168.10.138:9999/'
    /*
   *  GET请求
   *  url:请求地址
   *  header:请求头
   *  params:参数
   *  callback:回调函数
  */
    
    static get(url,params,header,callback){

      var axios = require('axios');
      if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
      }
      var config = {
        method: 'get',
        url: url,
        headers: header,
      };
      axios(config)
      .then((responseJSON) => {
              callback(responseJSON)
            })
      .catch(function (error) {
        console.log(error);
      });
    }
 
 
  /*
   *  POST请求
   *  url:请求地址
   *  header:请求头
   *  data:参数
   *  callback:回调函数
  */
  static post(url,data,header,callback){

    var axios = require('axios');
    var config = {
      method: 'post',
      url: url,
      headers: header,
      data : data
    };
    axios(config)
    .then((responseJSON) => {
            callback(responseJSON)
          })
    .catch(function (error) {
      console.log(error);
    });
  }

  // function loginByUsername(){
  //   let that = this;
  //   var axios = require('axios');
  //   var qs = require('qs');
  //   var data = qs.stringify({
  //     'username': 'admin',
  //     'password': 'YehdBPev' 
  //   });
  //   var config = {
  //     method: 'post',
  //     url: 'http://192.168.10.174:9999/auth/oauth2/token?grant_type=password&scope=server',
  //     headers: { 
  //         // 'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)', 
  //         'Authorization': 'Basic dGVzdDp0ZXN0'
  //     },
  //     data : data
  //   };

  //   axios(config)
  //   .then(function (response) {
  //     // console.log(JSON.stringify(response.status));
  //     if(response.status == 200){
  //       console.log('tiaozuan ');
  //       navigation.navigate('主页')
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }





  // /*
  //   *  get请求
  //   *  url:请求地址
  //   *  data:参数
  //   *  callback:回调函数
  //   * */
  // static get(url, params, callback) {
  //   if (params) {
  //     let paramsArray = [];
  //     //拼接参数
  //     Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
  //     if (url.search(/\?/) === -1) {
  //       url += '?' + paramsArray.join('&')
  //     } else {
  //       url += '&' + paramsArray.join('&')
  //     }
  //   }
  //   //fetch请求
  //   fetch(url, {
  //     method: 'GET',

  //   })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       callback(responseJSON)
  //     }).catch((error) => {
  //       console.error(error);
  //     }).done();
  // }
  // /*
  //  *  post请求
  //  *  url:请求地址
  //  *  data:参数
  //  *  callback:回调函数
  //  * */
  // static post(url, params, callback) {
  //   //fetch请求
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //     },
  //     body: params
  //   })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       callback(responseJSON)
  //     }).catch((error) => {
  //       console.error(error);
  //     }).done();
  // }
  // static postJson(url, params, callback) {
  //   //fetch请求
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(params)
  //   })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       callback(responseJSON)
  //     }).catch((error) => {
  //       console.error(error);
  //     }).done();
  // }
  // static uploadPdf(url, params, callback) {
  //   //fetch请求
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: params
  //   })
  //     .then((response) => response.json())
  //     .then((responseJSON) => {
  //       callback(responseJSON)
  //     }).catch((error) => {
  //       console.error(error);
  //     }).done();
  // }


}
export default HttpUtil;