import  {customRequest}  from '@/utils/customRequest.js';

//退款
export const apiRefund = (data) => customRequest('/Home/order/orderrefundtkcz', data, 'POST');


//申请售后
export function apiApplyAfterSale(data){
  return customRequest('/Home/Order/aftersales', data,'POST');
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

export function apiOrderAftersales(data){
  return customRequest('/Home/Order/aftersales', data,'POST');
}

//订单申请退款
export function apiOrderRefundPay(data){
  return customRequest('/Home/Order/orderrefund', data,'POST');
}

//订单详情
export function apiGetOrderDetail(data){
  return customRequest('/Home/order/orderinfos', data,'POST');
}

//京东运费查询  https://www.xzxskj.com/Home/Jd/index
export function apiGetJdFreight(data){
	return customRequest('/Home/Jd/index', data,'POST');
}

//顺丰运费
export function apiGetSfFreight(data){
	return customRequest('/Home/Sf/index', data,'POST');
}

//微信支付参数/Home/Wxzf/index
export function apiGetWxPay(data){
  // return customRequest('https://zhzf.xzxskj.com/index/index/index', data,'POST');
  return customRequest('/Home/Wxzf/index', data,'POST');
}

//订单修改
export function apiOrderEdit(data){
  return customRequest('/Home/Order/ddxgdz', data,'POST');
}