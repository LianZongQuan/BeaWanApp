/**
 * 邮箱
 * @param {*} s
 */
 export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/**
 * 手机号码
 * @param {*} s
 */
 export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}
/**
 * 判断手机号码是否正确
 */
 export function isvalidatemobile (phone) {
  let list = []
  let result = true
  let msg = ''
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}
/**
 * 判断是否为空
 */
 export function validatenull (val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}
/**
* 校验是否为数字
**/
export function isIntNum(val){
  var regPos = / ^\d+$/; // 非负整数 
  var regNeg = /^\-[1-9][0-9]*$/; // 负整数
  if(regPos.test(val) && regNeg.test(val)){
      return true;
  }else{
      return false;
  } 
}
// !isNaN(parseFloat(value)) && isFinite(value);
