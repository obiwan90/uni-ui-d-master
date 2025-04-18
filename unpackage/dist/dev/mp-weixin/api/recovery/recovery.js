"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiRecoveryList(data) {
  return utils_customRequest.customRequest("/Home/Quotation/index", data, "POST");
}
function apiLabelList(data) {
  return utils_customRequest.customRequest("/Home/Quotation/bqlist", data, "POST");
}
function apiLabelDel(data) {
  return utils_customRequest.customRequest("/Home/Quotation/bqdel", data, "POST");
}
function apiLabelAdd(data) {
  return utils_customRequest.customRequest("/Home/Quotation/bqadd", data, "POST");
}
function apiBatchEdit(data) {
  return utils_customRequest.customRequest("/Home/Quotation/plxglist", data, "POST");
}
function apiBatchEditSubmit(data) {
  return utils_customRequest.customRequest("/Home/Quotation/plxgsave", data, "POST");
}
function apiRecoveryLog(data) {
  return utils_customRequest.customRequest("/Home/Quotation/djrz", data, "POST");
}
function apiSingleEdit(data) {
  return utils_customRequest.customRequest("/Home/Quotation/dggj", data, "POST");
}
function apiSingleEditSubmit(data) {
  return utils_customRequest.customRequest("/Home/Quotation/dggjprice", data, "POST");
}
exports.apiBatchEdit = apiBatchEdit;
exports.apiBatchEditSubmit = apiBatchEditSubmit;
exports.apiLabelAdd = apiLabelAdd;
exports.apiLabelDel = apiLabelDel;
exports.apiLabelList = apiLabelList;
exports.apiRecoveryList = apiRecoveryList;
exports.apiRecoveryLog = apiRecoveryLog;
exports.apiSingleEdit = apiSingleEdit;
exports.apiSingleEditSubmit = apiSingleEditSubmit;
