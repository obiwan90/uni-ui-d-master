"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiStaffAdd(data) {
  return utils_customRequest.customRequest("/Home/Gly/useradd", data, "POST");
}
function apiStationAdd(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwadd", data, "POST");
}
function apiStationStaffList(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwyglist", data, "POST");
}
function apiStationStaffAction(url, data) {
  return utils_customRequest.customRequest(url, data, "POST");
}
function apiStationDel(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwdel", data, "POST");
}
function apiGetAuthority(data) {
  return utils_customRequest.customRequest("/Home/Gly/qxlist", data, "POST");
}
function apiStationDetail(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwinfos", data, "POST");
}
function apiAdminStationList(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwlist", data, "POST");
}
function apiAdminGetStore(data) {
  return utils_customRequest.customRequest("/Home/Gly/cklist", data, "POST");
}
function apiStaffDetail(data) {
  return utils_customRequest.customRequest("/Home/Gly/yginfos", data, "POST");
}
function apiStaffEdit(data) {
  return utils_customRequest.customRequest("/Home/Gly/ygedit", data, "POST");
}
function apiStationEdit(data) {
  return utils_customRequest.customRequest("/Home/Gly/gwedit", data, "POST");
}
exports.apiAdminGetStore = apiAdminGetStore;
exports.apiAdminStationList = apiAdminStationList;
exports.apiGetAuthority = apiGetAuthority;
exports.apiStaffAdd = apiStaffAdd;
exports.apiStaffDetail = apiStaffDetail;
exports.apiStaffEdit = apiStaffEdit;
exports.apiStationAdd = apiStationAdd;
exports.apiStationDel = apiStationDel;
exports.apiStationDetail = apiStationDetail;
exports.apiStationEdit = apiStationEdit;
exports.apiStationStaffAction = apiStationStaffAction;
exports.apiStationStaffList = apiStationStaffList;
