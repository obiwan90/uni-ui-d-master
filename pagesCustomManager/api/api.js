import  {customRequest}  from '@/utils/customRequest.js';

//客户添加
export function apiCustomerAdd(data){
  return customRequest('/Home/Users/customeradd', data,'POST');
}

//客户列表
export function apiCustomerList(data){
	return customRequest('/Home/Users/customerlists', data,'POST');
}

//客户搜索
export function apiCustomerSearch(data){
	return customRequest('/Home/Customer/select', data,'POST');
}

//客户管理数据
export function apiCustomerData(data){
	return customRequest('/Home/Customer/index', data,'POST');
}
