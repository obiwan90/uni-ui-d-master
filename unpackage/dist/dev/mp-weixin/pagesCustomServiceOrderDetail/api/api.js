"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetCustomServiceOrderDetail(data) {
  return utils_customRequest.customRequest("/Home/order/shorderinfos", data, "POST");
}
function apiCustomServiceOrderOperation(data) {
  return utils_customRequest.customRequest("/Home/Order/gysusertk", data, "POST");
}
function apiBookingExpress(data) {
  return utils_customRequest.customRequest("/Home/Order/aftersaleskdh", data, "POST");
}
function apigetAddress(data) {
  return utils_customRequest.customRequest("/Home/Address/index", data, "POST");
}
function apiOrderJdLogistics(data) {
  return utils_customRequest.customRequest("/Home/Jd/xd", data, "POST");
}
function apiOrderSfLogistics(data) {
  return utils_customRequest.customRequest("/Home/Sf/xd", data, "POST");
}
exports.apiBookingExpress = apiBookingExpress;
exports.apiCustomServiceOrderOperation = apiCustomServiceOrderOperation;
exports.apiGetCustomServiceOrderDetail = apiGetCustomServiceOrderDetail;
exports.apiOrderJdLogistics = apiOrderJdLogistics;
exports.apiOrderSfLogistics = apiOrderSfLogistics;
exports.apigetAddress = apigetAddress;
