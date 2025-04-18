import  {customRequest}  from '@/utils/customRequest.js';

//查询银行卡
export function apiSearchCard(data){
	return customRequest('https://zhzf.xzxskj.com/index/Zhtx/yhcx', data,'POST');
}

//收款账户添加
export function apiAccountAdd(data){
	return customRequest('/Home/Users/yhkadd', data,'POST');
}

//收款账户列表
export function apiAccountList(data){
	return customRequest('/Home/Users/yhklist', data,'POST');
}

//查询银行
export function apiSearchBank(data){
	return customRequest('/Home/Users/bank', data,'POST');
}
