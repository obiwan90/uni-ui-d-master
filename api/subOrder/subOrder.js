import  {customRequest}  from '@/utils/customRequest.js';

//商品结算
export function apiSubmitorder(data){
  return customRequest('/Home/Order/submitorder', data,'POST');
}

