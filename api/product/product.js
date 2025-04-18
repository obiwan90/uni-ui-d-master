import {
	customRequest
} from '@/utils/customRequest.js';

//获取商品列表  ModelID string
export function apiGetProduct(data) {
	return customRequest('/Home/Goods/lists', data, 'POST');
}

//商品修改成色列表 ID
export function apiFinenessList(data) {
	return customRequest('/Home/Goods/finenesslist', data, 'POST');
}

//商品成色选择
export function apiSelectedFineness(data) {
	return customRequest('/Home/Goods/xzcs', data, 'POST');
}

//商品修改信息
export function apiEditProductInfo(data) {
	return customRequest('/Home/Goods/updategoods', data, 'POST');
}

//商品列表筛选默认数据
export function apiGetProductFilterList(data) {
	return customRequest('/Home/Classification/datalist', data, 'POST');
}

//商品列表筛选数据
export function apiGetProductFilterData(data) {
	return customRequest('/Home/Classification/lists', data, 'POST');
}