"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiBargainingSubmit(data) {
  return utils_customRequest.customRequest("/Home/Bargaining/submit", data, "POST");
}
function apiGetWxPay(data) {
  return utils_customRequest.customRequest("/Home/Wxzf/index", data, "POST");
}
function apiBargainingWxPay(data) {
  return utils_customRequest.customRequest("/Home/Bargaining/index", data, "POST");
}
function apiGetJdFreight(data) {
  return utils_customRequest.customRequest("/Home/Jd/index", data, "POST");
}
function apiGetSfFreight(data) {
  return utils_customRequest.customRequest("/Home/Sf/index", data, "POST");
}
exports.apiBargainingSubmit = apiBargainingSubmit;
exports.apiBargainingWxPay = apiBargainingWxPay;
exports.apiGetJdFreight = apiGetJdFreight;
exports.apiGetSfFreight = apiGetSfFreight;
exports.apiGetWxPay = apiGetWxPay;
