import  {customRequest}  from '@/utils/customRequest.js';

//投诉
export function apiGetComplaint(data){
  return customRequest('/Home/complaint/add', data,'POST');
}
