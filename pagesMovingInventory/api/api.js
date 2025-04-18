import  {customRequest}  from '@/utils/customRequest.js';

//财务核对
export function apiFinanceCheck(data){
  return customRequest('/Home/Orderxhhk/dz', data,'POST');
}

//先货后款下单
// export function apiFinancePlaceOrder(data){
//   return customRequest('/Home/Orderxhhk/add', data,'POST');
// }
export function apiFinancePlaceOrder(url,data){
  return customRequest(url, data,'POST');
}

//先货后款串号搜索
export function apiFinanceChCheck(data){
  return customRequest('/Home/Orderxhhk/chselect', data,'POST');
}

//先货后款订单列表
export function apiFinanceOrderList(data){
  return customRequest('/Home/Orderxhhk/index', data,'POST');
}

//获取商品详情 id string
export function apiGetProductDetail(data){
  return customRequest('/Home/Goods/infos', data,'POST');
}