import {
	customRequest
} from '@/utils/customRequest.js';

//详情
export function getFinanceDetail(params) {
	return customRequest('/Home/Orderxhhk/dzinfos', params, 'POST');
}

//财务对账列表
export function apiFinanceList(data){
  return customRequest('/Home/Orderxhhk/dzlist', data,'POST');
}

//财务核对
export function apiFinanceCheck(data){
	  return customRequest('/Home/Orderxhhk/dz', data,'POST');
}