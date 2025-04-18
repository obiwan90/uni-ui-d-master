import  {customRequest}  from '@/utils/customRequest.js';

//获取先货后款订单详情
export function apiGetFpbkOrderDetail(data){
  return customRequest('/Home/Orderxhhk/orderinfo', data,'POST');
}


//订单详情
export function apiGetOrderDetail(data){
  return customRequest('/Home/order/orderinfos', data,'POST');
}