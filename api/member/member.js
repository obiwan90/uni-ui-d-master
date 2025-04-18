import  {customRequest}  from '@/utils/customRequest.js';

//新增微信用户
export function apiAddWxUser(data){
  return customRequest('/Home/Users/add', data,'POST');
}

//查询用户 openid
export function apiGetUserInfo(data){
	return customRequest('/Home/Users/infos',data,'POST')
}

//用户信息更新 openid name  shopname  shopadd img
export function apiUpdateUserInfo(data){
	return customRequest('/Home/Users/updates',data,'POST')
}