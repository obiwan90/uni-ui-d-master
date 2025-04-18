import  {customRequest}  from '@/utils/customRequest.js';

//删除
export function apiDelMine(data){
  return customRequest('/Home/Freerelease/dels', data,'POST');
}

//发布自由市场  opid type describes img
export function apiAddMarket(data){
  return customRequest('/Home/Freerelease/add', data,'POST');
}


//自由市场列表  opid
export function apigetMarket(data){
  return customRequest('/Home/Freerelease/lists', data,'POST');
}


//个人中心自由市场列表
export function apigetMarketListAll(data){
  return customRequest('/Home/Freerelease/listsall', data,'POST');
}

//详情
export function apigetMarketListDetail(data){
  return customRequest('/Home/Goods/freeinfos', data,'POST');
}
