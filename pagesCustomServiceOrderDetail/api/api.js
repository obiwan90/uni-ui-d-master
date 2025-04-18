import  {customRequest}  from '@/utils/customRequest.js';

//获取售后订单详情
export function apiGetCustomServiceOrderDetail(data){
  return customRequest('/Home/order/shorderinfos', data,'POST');
}

//售后操作
export function apiCustomServiceOrderOperation(data){
  return customRequest('/Home/Order/gysusertk', data,'POST');
}

//预约快递
export function apiBookingExpress(data){
  return customRequest('/Home/Order/aftersaleskdh', data,'POST');	
}	

//获取地址
export function apigetAddress(data){
  return customRequest('/Home/Address/index', data,'POST');
}

//地址详情
export function apigetAddressDetail(data){
  return customRequest('/Home/Address/infos', data,'POST');
}

//京东物流确认发货
export function apiOrderJdLogistics(data){
  return customRequest('/Home/Jd/xd', data,'POST');
}

//顺丰物流确认发货
export function apiOrderSfLogistics(data){
  return customRequest('/Home/Sf/xd', data,'POST');
}