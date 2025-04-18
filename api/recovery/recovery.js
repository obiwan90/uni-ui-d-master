import  {customRequest}  from '@/utils/customRequest.js';

//回收报价列表
export function apiRecoveryList(data){
	return customRequest('/Home/Quotation/index', data,'POST');
}

//标签管理
export function apiLabelList(data){
	return customRequest('/Home/Quotation/bqlist', data,'POST');
}

//标签删除
export function apiLabelDel(data){
	return customRequest('/Home/Quotation/bqdel', data,'POST');
}

//标签添加
export function apiLabelAdd(data){
	return customRequest('/Home/Quotation/bqadd', data,'POST');
}

//批量修改查看
export function apiBatchEdit(data){
	return customRequest('/Home/Quotation/plxglist', data,'POST');
}

//批量修改提交
export function apiBatchEditSubmit(data){
	return customRequest('/Home/Quotation/plxgsave', data,'POST');
}

//回收报价日志
export function apiRecoveryLog(data){
	return customRequest('/Home/Quotation/djrz', data,'POST');
}

//单个改价查看
export function apiSingleEdit(data){
	return customRequest('/Home/Quotation/dggj', data,'POST');
}

//单个改价提交
export function apiSingleEditSubmit(data){
	return customRequest('/Home/Quotation/dggjprice', data,'POST');
}