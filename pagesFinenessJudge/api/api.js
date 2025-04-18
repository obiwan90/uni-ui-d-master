import  {customRequest}  from '@/utils/customRequest.js';

//成色数据获取
export function apiFinanceItemList(data){
  return customRequest('/Home/Basic/cspd', data,'POST');
}

//成色获取信息
export function apiFinanceData(data){
	return customRequest('/Home/Basic/cshqxx', data,'POST');
}

//成色保存
export function apiFinanceSave(data){
	return customRequest('/Home/Basic/csadd', data,'POST');
}