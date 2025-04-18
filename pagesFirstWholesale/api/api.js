import  {customRequest}  from '@/utils/customRequest.js';

//先货后款  收款
export const fpbkSubmit = (data) => {
	return customRequest('/Home/Orderxhhk/xxsk', data,'POST');
}


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

//快速批发页面获取客户和员工
export function apiGetCustomerAndStaff(data){
	return customRequest('/Home/Orderxhhk/kspf', data,'POST');
}

//客户搜索
export function apiCustomerSearch(data){
	return customRequest('/Home/Customer/select', data,'POST');
}

//获取商品详情 id string
export function apiGetProductDetail(data){
  return customRequest('/Home/Goods/infos', data,'POST');
}