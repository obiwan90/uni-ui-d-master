import {
	customRequest
} from '@/utils/customRequest.js';

//采购订单列表
export function apiGetOrderlist(data) {
	return customRequest('/Home/Orderlist/index', data, 'POST');
}

//订单详情 
export function apiGetOrderInfos(data) {
	return customRequest('/Home/Orderlist/infos', data, 'POST')
}

//售后订单列表
export function apiGetShIndex(data) {
	return customRequest('/Home/Orderlist/shindex', data, 'POST')
}

//议价订单列表 
export function apiGetYjIndex(data) {
	return customRequest('/Home/Orderlist/yjindex', data, 'POST')
}

//微信支付参数/Home/Wxzf/index
export function apiGetWxPay(data) {
	// return customRequest('https://zhzf.xzxskj.com/index/index/index', data, 'POST');
	return customRequest('/Home/Wxzf/index', data,'POST');
}

//议价支付
export function apiBargainingWxPay(data) {
	return customRequest('/Home/Bargaining/index', data, 'POST');
}

//取消订单
export function apiCancelOrder(data) {
	return customRequest('/Home/Order/qxdd', data, 'POST');
}

//催发货
export function apiUrgeShipment(data) {
	return customRequest('/Home/Orderlist/chtx', data, 'POST');	
}

//确认收货
export function apiConfirmReceived(data) {
	return customRequest('/Home/Order/shlist', data, 'POST');	
}

//支付检查
export function apiCheckPay(data) {
	return customRequest('/Home/Order/zfpdsfkyzf', data, 'POST');	
}

//销售订单ch搜索
export function apiGetOrderSearch(data) {
	return customRequest('/Home/Orderlist/chlist', data, 'POST');	
}