import * as CryptoJS from "crypto-js";
import * as WeChat from "react-native-wechat-lib";

/**
 * 获取最新列表标题名称
 */
export function getTitle(index) {
  let data = new Date();
  let todayYear = data.getFullYear();
  let todayMonth = data.getMonth()+1;
  let title1 = '';let title2 = '';let title3 = '';let title4 = '';
  if(todayMonth > 10){
    title1 = [ { "time": todayYear+"三季报"}, { "time": todayYear+"中报"}, { "time": todayYear+"一季报"},{"time": (todayYear-1)+"年报"}]
    title2 = [ { "time": (todayYear-1)+"年报"}, { "time": (todayYear-2)+"年报"}, { "time": (todayYear-3)+"年报"},{"time": (todayYear-4)+"年报"}]
    title3 = [ { "time": (todayYear)+"中报"}, { "time": (todayYear-1)+"中报"}, { "time": (todayYear-2)+"中报"},{"time": (todayYear-3)+"中报"}]
    title4 = [ { "time": (todayYear)+"三季报"}, { "time": (todayYear)+"一季报"}, { "time": (todayYear-1)+"三季报"},{"time": (todayYear-1)+"一季报"}]
  }
  if(todayMonth >= 1 &&todayMonth<5){
    title1 = [ { "time": (todayYear-1)+"年报"}, { "time": (todayYear-1)+"三季报"}, { "time": (todayYear-1)+"中报"},{"time": (todayYear-1)+"一季报"}]
    title2 = [ { "time": (todayYear-1)+"年报"}, { "time": (todayYear-2)+"年报"}, { "time": (todayYear-3)+"年报"},{"time": (todayYear-4)+"年报"}]
    title3 = [ { "time": (todayYear-1)+"中报"}, { "time": (todayYear-2)+"中报"}, { "time": (todayYear-3)+"中报"},{"time": (todayYear-4)+"中报"}]
    title4 = [ { "time": (todayYear-1)+"三季报"}, { "time": (todayYear-1)+"一季报"}, { "time": (todayYear-2)+"三季报"},{"time": (todayYear-2)+"一季报"}]
  }
  if(todayMonth > 5 &&todayMonth<10){
    title1 = [ { "time": (todayYear-1)+"年报"}, { "time": (todayYear-1)+"三季报"}, { "time": (todayYear-1)+"中报"},{"time": (todayYear-1)+"一季报"}]
    title2 = [ { "time": (todayYear-1)+"年报"}, { "time": (todayYear-2)+"年报"}, { "time": (todayYear-3)+"年报"},{"time": (todayYear-4)+"年报"}]
    title3 = [ { "time": (todayYear-1)+"中报"}, { "time": (todayYear-2)+"中报"}, { "time": (todayYear-3)+"中报"},{"time": (todayYear-4)+"中报"}]
    title4 = [ { "time": (todayYear-1)+"三季报"}, { "time": (todayYear-1)+"一季报"}, { "time": (todayYear-2)+"三季报"},{"time": (todayYear-2)+"一季报"}]
  }
  if(index===1){
    return title1;
  }else if(index == 2){
    return title2;
  }else if(index == 3){
    return title3;
  }else{
    return title4;
  }
}

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

