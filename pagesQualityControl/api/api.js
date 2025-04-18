import  {customRequest}  from '@/utils/customRequest.js';

//修改日志
export const getLog = (data) => {
	return customRequest('/Home/Zjgl/zjbgxgrz', data,'POST');
}