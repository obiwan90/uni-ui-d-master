import  {customRequest}  from '@/utils/customRequest.js';

//申请售后
export function apiApplyAfterSale(data){
  return customRequest('/Home/Order/aftersales', data,'POST');
}

//海报提交
export function apiPosterSubmit(data){
  return customRequest('/Home/Sales/tjadd', data,'POST');
}

//获取议价时间
export function apiGetBargainingtime(data){
  return customRequest('/Home/Bargaining/bargainingtime', data,'POST');
}

//议价支付
export function apiBargainingPay(data){
  return customRequest('/Home/bargaining/index', data,'POST');
}

//议价订单提交
export function apiBargainingSubmit(data){
  return customRequest('/Home/Bargaining/submit', data,'POST');
}

//获取商品详情 id string
export function apiGetProductDetail(data){
  return customRequest('/Home/Goods/infos', data,'POST');
}