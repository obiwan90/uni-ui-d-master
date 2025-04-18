"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetOrderlist(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/index", data, "POST");
}
function apiGetShIndex(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/shindex", data, "POST");
}
function apiGetYjIndex(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/yjindex", data, "POST");
}
function apiGetWxPay(data) {
  return utils_customRequest.customRequest("/Home/Wxzf/index", data, "POST");
}
function apiCancelOrder(data) {
  return utils_customRequest.customRequest("/Home/Order/qxdd", data, "POST");
}
function apiUrgeShipment(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/chtx", data, "POST");
}
function apiConfirmReceived(data) {
  return utils_customRequest.customRequest("/Home/Order/shlist", data, "POST");
}
function apiCheckPay(data) {
  return utils_customRequest.customRequest("/Home/Order/zfpdsfkyzf", data, "POST");
}
function apiGetOrderSearch(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/chlist", data, "POST");
}
exports.apiCancelOrder = apiCancelOrder;
exports.apiCheckPay = apiCheckPay;
exports.apiConfirmReceived = apiConfirmReceived;
exports.apiGetOrderSearch = apiGetOrderSearch;
exports.apiGetOrderlist = apiGetOrderlist;
exports.apiGetShIndex = apiGetShIndex;
exports.apiGetWxPay = apiGetWxPay;
exports.apiGetYjIndex = apiGetYjIndex;
exports.apiUrgeShipment = apiUrgeShipment;
