import  {customRequest}  from '@/utils/customRequest.js';

//获取分类信息classid   brandid  seriesid
export function apiGetClasstify(data){
  return customRequest('/Home/Classification/index', data,'POST');
}

