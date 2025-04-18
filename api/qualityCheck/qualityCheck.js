import  {customRequest}  from '@/utils/customRequest.js';

//质检录入型号搜索
export function apiModelSearch(data){
  return customRequest('/Home/Basic/index', data,'POST');
}

//质检录入质检项
export function apiQualityCheckItem(data){
  return customRequest('/Home/Basic/infos', data,'POST');
}

//质检录入
export function apiQualityCheckAdd1(data){
  // return customRequest('/Home/Basic/qualityadd', data,'POST');
  return customRequest('/Home/Basic/qualityadd?lx=1', data,'POST');
}

export function apiQualityCheckAdd2(data){
  // return customRequest('/Home/Basic/qualityadd', data,'POST');
  return customRequest('/Home/Basic/qualityadd?lx=2', data,'POST');
}

export function apiQualityCheckAdd3(data){
  // return customRequest('/Home/Basic/qualityadd', data,'POST');
  return customRequest('/Home/Basic/qualityadd?lx=3', data,'POST');
}

//质检项
export function apiQualityCheckList(data){
  return customRequest('/Home/Basic/lx', data,'POST');
}

//拍照上传
export function apiQualityCheckUploadPhoto(data){
	return customRequest('/Home/Basic/tpsc', data,'POST');
}

//质检串号搜索
export function apiQualityCheckSerialSearch(data){
	return customRequest('/Home/Basic/chselect', data,'POST');
}

//质检信息查询
export function apiQualityCheckInfo(data){
	return customRequest('/Home/Basic/zjinfos', data,'POST');
}