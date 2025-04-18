"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apigetAddress(data) {
  return utils_customRequest.customRequest("/Home/Address/index", data, "POST");
}
function apigetAddressDetail(data) {
  return utils_customRequest.customRequest("/Home/Address/infos", data, "POST");
}
function apiAddAddress(data) {
  return utils_customRequest.customRequest("/Home/Address/add", data, "POST");
}
function apiDelAddress(data) {
  return utils_customRequest.customRequest("/Home/Address/del", data, "POST");
}
exports.apiAddAddress = apiAddAddress;
exports.apiDelAddress = apiDelAddress;
exports.apigetAddress = apigetAddress;
exports.apigetAddressDetail = apigetAddressDetail;
