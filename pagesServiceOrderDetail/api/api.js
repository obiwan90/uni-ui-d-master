import  {customRequest}  from '@/utils/customRequest.js';

//获取列表  opdi
export function apigetAddress(data){
  return customRequest('/Home/Address/index', data,'POST');
}