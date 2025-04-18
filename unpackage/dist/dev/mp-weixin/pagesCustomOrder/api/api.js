"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
const fpbkSubmit = (data) => {
  return utils_customRequest.customRequest("/Home/Orderxhhk/xxsk", data, "POST");
};
const fpbkSearch = (data) => {
  return utils_customRequest.customRequest("/Home/Orderxhhk/indexselect", data, "POST");
};
function apiGetShIndex(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/shindex", data, "POST");
}
function apiGetYjIndex(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/yjindex", data, "POST");
}
function apiCustomOrderList(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/gysindex", data, "POST");
}
function apiCustomFpOrderList(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/index", data, "POST");
}
function apiCustomYjOrderAction(data) {
  return utils_customRequest.customRequest("/Home/Bargaining/refuse", data, "POST");
}
function apiOrderJdLogistics(data) {
  return utils_customRequest.customRequest("/Home/Jd/xd", data, "POST");
}
function apiOrderSfLogistics(data) {
  return utils_customRequest.customRequest("/Home/Sf/xd", data, "POST");
}
function apiOrderReturn(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/ddcz", data, "POST");
}
function apiBookingExpress(data) {
  return utils_customRequest.customRequest("/Home/Order/aftersaleskdh", data, "POST");
}
function apigetAddress(data) {
  return utils_customRequest.customRequest("/Home/Address/index", data, "POST");
}
function apiSearchOrder(data) {
  return utils_customRequest.customRequest("/Home/Orderlist/gysddh", data, "POST");
}
function apiCheckPay(data) {
  return utils_customRequest.customRequest("/Home/Order/zfpdsfkyzf", data, "POST");
}
exports.apiBookingExpress = apiBookingExpress;
exports.apiCheckPay = apiCheckPay;
exports.apiCustomFpOrderList = apiCustomFpOrderList;
exports.apiCustomOrderList = apiCustomOrderList;
exports.apiCustomYjOrderAction = apiCustomYjOrderAction;
exports.apiGetShIndex = apiGetShIndex;
exports.apiGetYjIndex = apiGetYjIndex;
exports.apiOrderJdLogistics = apiOrderJdLogistics;
exports.apiOrderReturn = apiOrderReturn;
exports.apiOrderSfLogistics = apiOrderSfLogistics;
exports.apiSearchOrder = apiSearchOrder;
exports.apigetAddress = apigetAddress;
exports.fpbkSearch = fpbkSearch;
exports.fpbkSubmit = fpbkSubmit;
