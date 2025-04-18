import  {customRequest}  from '@/utils/customRequest.js';

//获取token
export function apiGetToken() {
  return customRequest('/Home/index/index','','GET');
}

//获取sessionKey
export function apiLogin(data) {
  return customRequest('/Home/Users/get_session_keys', data,'POST');
}

//获取手机号
export function apiGetPhone(data){
  return customRequest('/Home/Users/jm?', data,'POST');
}