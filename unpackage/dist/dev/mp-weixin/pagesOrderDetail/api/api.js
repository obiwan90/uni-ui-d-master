"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
const apiRefund = (data) => utils_customRequest.customRequest("/Home/order/orderrefundtkcz", data, "POST");
function apiOrderAftersales(data) {
  return utils_customRequest.customRequest("/Home/Order/aftersales", data, "POST");
}
function apiGetOrderDetail(data) {
  return utils_customRequest.customRequest("/Home/order/orderinfos", data, "POST");
}
function apiGetJdFreight(data) {
  return utils_customRequest.customRequest("/Home/Jd/index", data, "POST");
}
function apiGetSfFreight(data) {
  return utils_customRequest.customRequest("/Home/Sf/index", data, "POST");
}
function apiGetWxPay(data) {
  return utils_customRequest.customRequest("/Home/Wxzf/index", data, "POST");
}
function apiOrderEdit(data) {
  return utils_customRequest.customRequest("/Home/Order/ddxgdz", data, "POST");
}
exports.apiGetJdFreight = apiGetJdFreight;
exports.apiGetOrderDetail = apiGetOrderDetail;
exports.apiGetSfFreight = apiGetSfFreight;
exports.apiGetWxPay = apiGetWxPay;
exports.apiOrderAftersales = apiOrderAftersales;
exports.apiOrderEdit = apiOrderEdit;
exports.apiRefund = apiRefund;
