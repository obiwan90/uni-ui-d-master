import {
	customRequest
} from '@/utils/customRequest.js';

//员工添加
export function apiStaffAdd(data) {
	return customRequest('/Home/Gly/useradd', data, 'POST');
}

//岗位添加
export function apiStationAdd(data) {
	return customRequest('/Home/Gly/gwadd', data, 'POST');
}

//岗位员工列表
export function apiStationStaffList(data) {
	return customRequest('/Home/Gly/gwyglist', data, 'POST');
}

//岗位员工启用禁用删除
// export function apiStationStaffAction(data) {
// 	return customRequest('/Home/Gly/ygxg', data, 'POST');
// }
export function apiStationStaffAction(url,data) {
	return customRequest(url, data, 'POST');
}


//岗位删除
export function apiStationDel(data) {
	return customRequest('/Home/Gly/gwdel', data, 'POST');
}

//获取权限
export function apiGetAuthority(data) {
	return customRequest('/Home/Gly/qxlist', data, 'POST');
}

//岗位查看
export function apiStationDetail(data) {
	return customRequest('/Home/Gly/gwinfos', data, 'POST');
}

//管理员查看岗位
export function apiAdminStationList(data) {
	return customRequest('/Home/Gly/gwlist', data, 'POST');
}

//管理员获取仓库
export function apiAdminGetStore(data) {
	return customRequest('/Home/Gly/cklist', data, 'POST');
}

//员工信息查看
export function apiStaffDetail(data) {
	return customRequest('/Home/Gly/yginfos', data, 'POST');
}

//员工信息修改
export function apiStaffEdit(data) {
	return customRequest('/Home/Gly/ygedit', data, 'POST');
}

//岗位编辑保存
export function apiStationEdit(data) {
	return customRequest('/Home/Gly/gwedit', data, 'POST');
}