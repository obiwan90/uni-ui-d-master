import  {customRequest}  from '@/utils/customRequest.js';

//审核列表
export function apiGetApprovalList(data){
  return customRequest('/Home/Order/cwtkczlist', data,'POST');
}

//审核
export function apiApproval(data){
  return customRequest('/Home/Order/cztk', data,'POST');
}