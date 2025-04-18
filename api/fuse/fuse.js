import  {customRequest}  from '@/utils/customRequest.js';

export function apiFuseSearch(data){
  return customRequest('/Home/Index/all', data,'POST');
}
