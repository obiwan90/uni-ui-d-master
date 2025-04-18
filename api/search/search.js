import  {customRequest}  from '@/utils/customRequest.js';

//首页型号搜索
export function apiSearchModel(data){
	return customRequest('/Home/Search/index', data,'POST');
}

//商品录入搜索
export function apiSearchGoods(data){
	return customRequest('/Home/Search/indexs', data,'POST');
}