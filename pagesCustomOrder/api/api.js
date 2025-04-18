import  {customRequest}  from '@/utils/customRequest.js';

//先货后款  收款
export const fpbkSubmit = (data) => {
	return customRequest('/Home/Orderxhhk/xxsk', data,'POST');
}

//先货后款 串号搜索
export const fpbkSearch = (data) => {
	return customRequest('/Home/Orderxhhk/indexselect', data,'POST');
}

//采购订单列表
export function apiGetOrderlist(data){
  return customRequest('/Home/Orderlist/index', data,'POST');
}

//订单详情 
export function apiGetOrderInfos(data){
	return customRequest('/Home/Orderlist/infos',data,'POST')
}

//售后订单列表
export function apiGetShIndex(data){
	return customRequest('/Home/Orderlist/shindex',data,'POST')
}

//议价订单列表 
export function apiGetYjIndex(data){
	return customRequest('/Home/Orderlist/yjindex',data,'POST')
}

//订单申请退款
export function apiOrderRefundPay(data){
  return customRequest('/Home/Order/orderrefund', data,'POST');
}

//订单申请售后
export function apiOrderAftersales(data){
  return customRequest('/Home/Order/aftersales', data,'POST');
}


//供应商订单列表
export function apiCustomOrderList(data){
  return customRequest('/Home/Orderlist/gysindex', data,'POST');
}

//先货后款订单列表
export function apiCustomFpOrderList(data){
  return customRequest('/Home/Orderxhhk/index', data,'POST');
}

//供应商操作议价订单
export function apiCustomYjOrderAction(data){
  return customRequest('/Home/Bargaining/refuse', data,'POST');
}

//京东物流确认发货
export function apiOrderJdLogistics(data){
  return customRequest('/Home/Jd/xd', data,'POST');
}

//顺丰物流确认发货
export function apiOrderSfLogistics(data){
  return customRequest('/Home/Sf/xd', data,'POST');
}

//退货
export function apiOrderReturn(data){
  return customRequest('/Home/Orderxhhk/ddcz', data,'POST');
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

//销售订单搜索
export function apiSearchOrder(data){
  return customRequest('/Home/Orderlist/gysddh', data,'POST');
}

//支付检查
export function apiCheckPay(data) {
	return customRequest('/Home/Order/zfpdsfkyzf', data, 'POST');	
}