import  {customRequest}  from '@/utils/customRequest.js';

//获取分类信息以及用户信息 /Home/query/Index  brand_id  opid
export function apiGetBrand(data){
  return customRequest('/Home/query/Index', data,'POST');
}

//查询保修历史记录  /Home/query/indexsss opid
export function apiGetmaintenanceHis(data){
	return customRequest('/Home/query/indexsss',data,'POST')
}

//保修查询  /Home/Query/search  word   lxid
export function apiCheackMaintenance(data){
	return customRequest('/Home/Query/search',data,'POST')
}
