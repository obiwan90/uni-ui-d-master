import  {customRequest}  from '@/utils/customRequest.js';

//质检管理
export function apiQualityControlList(data){
	return customRequest('/Home/Zjgl/index', data,'POST');
}