import  {customRequest}  from '@/utils/customRequest.js';

//用户账单明细
export function apiGetBillList(data){
  return customRequest('/Home/Users/bill', data,'POST');
}
