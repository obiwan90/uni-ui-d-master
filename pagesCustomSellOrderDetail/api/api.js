import  {customRequest}  from '@/utils/customRequest.js';

//订单详情
export function apiGetOrderDetail(data){
  return customRequest('/Home/order/orderinfos', data,'POST');
}
