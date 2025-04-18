import  {customRequest}  from '@/utils/customRequest.js';

//库存串号搜索
export function apiChSelectSearch(data){
  return customRequest('/Home/Kcgl/kcglchselect', data,'POST');
}
//库存管理串号搜索后选中接口
export function apiGetInventorySelect(data){
  return customRequest('/Home/Kcgl/kcglchxz', data,'POST');
}


export function apiGetInventory(data){
	return customRequest('/Home/Kcgl/kcglindex', data,'POST');
}

//商品修改
// export function apiEditInventory(data){
// 	return customRequest('/Home/Goods/updatezt', data,'POST');
// }
export function apiEditInventory(url,data){
	return customRequest(url, data,'POST');
}

//excel 导出
export function apiExportExcel(data){
	return customRequest('/Home/Kcgl/dclist', data,'POST');
}

//型号搜索
export function apiModelSearch(data){
	return customRequest('/Home/Kcgl/kcglxhselect', data,'POST');
}