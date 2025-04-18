import  {customRequest}  from '@/utils/customRequest.js';
//回收分类查询
export function apiRecycleClassify(data){
  return customRequest('/Home/Classification/hsbjindex', data,'POST');
}
