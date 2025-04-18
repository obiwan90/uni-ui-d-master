import  {customRequest}  from '@/utils/customRequest.js';
//财务对账搜索
export function financeReconciliationSearch(data){
	return customRequest('/Home/Orderxhhk/cwdzselect', data,'POST');
}

//财务对账搜索选中后数据
export function financeReconciliationSelect(data){
	return customRequest('/Home/Orderxhhk/cwdzselectxz', data,'POST');
}

//财务对账列表
export function apiFinanceList(data){
  return customRequest('/Home/Orderxhhk/dzlist', data,'POST');
}

//财务核对
export function apiFinanceCheck(data){
	  return customRequest('/Home/Orderxhhk/dz', data,'POST');
}