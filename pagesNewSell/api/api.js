import  {customRequest}  from '@/utils/customRequest.js';
//发布
export function apiPublish(data){
  return customRequest('/Home/Freerelease/add', data,'POST');
}
//成色获取
export function apiGetQuality(data){
  return customRequest('/Home/Freerelease/finenesslist', data,'POST');
}

//回收报价列表
export function apiRecoveryList(data){
	return customRequest('/Home/Quotation/index', data,'POST');
}

export function apiAddMarket(data){
  return customRequest('/Home/Freerelease/add', data,'POST');
}
//获取分类信息classid   brandid  seriesid
export function apiGetClasstify(data){
  return customRequest('/Home/Classification/indexs', data,'POST');
}

//获取型号id
export function apiGetProductId(data){
  return customRequest('/Home/Freerelease/xhinfos', data,'POST');
}