import  {customRequest}  from '@/utils/customRequest.js';

//仓库列表
export function apiWarehouseList(data){
	return customRequest('/Home/Ck/index', data,'POST');
}

//仓库保存
export function apiWarehouseSubmit(data){
	return customRequest('/Home/Ck/save', data,'POST');
}
//仓库状态更新
export function apiWarehouseUpdate(data){
	return customRequest('/Home/Ck/update', data,'POST');
}
//仓库商品移库
export function apiWarehouseMove(data){
	return customRequest('/Home/Ck/ckyk', data,'POST');
}
