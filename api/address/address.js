import  {customRequest}  from '@/utils/customRequest.js';

//获取列表  opdi
export function apigetAddress(data){
  return customRequest('/Home/Address/index', data,'POST');
}

//获取详情  id
export function apigetAddressDetail(data){
  return customRequest('/Home/Address/infos', data,'POST');
}


//获取详情  id
export function apiAddAddress(data){
  return customRequest('/Home/Address/add', data,'POST');
}


//删除地址  opid  id
export function apiDelAddress(data){
  return customRequest('/Home/Address/del', data,'POST');
}
