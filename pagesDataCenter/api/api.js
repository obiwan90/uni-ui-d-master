import  {customRequest}  from '@/utils/customRequest.js';

//数据分析
export function apiDataAnalysis(data){
	return customRequest('/Home/Analysis/index', data,'POST');
}

//库存分析
export function apiStockAnalysis(data){
	return customRequest('/Home/Analysis/kcindex', data,'POST');
}

//商品数据
export function apiGoodsData(data){
	return customRequest('/Home/Analysis/kcfx', data,'POST');
}

//销售数据
export function apiSaleData(data){
	return customRequest('/Home/Analysis/orderindex', data,'POST');
}