import  {customRequest}  from '@/utils/customRequest.js';

export function apiHomeMenus(data){
  return customRequest('/Home/Homes/index', data,'POST');
}