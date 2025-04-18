"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetQuality(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/finenesslist", data, "POST");
}
function apiRecoveryList(data) {
  return utils_customRequest.customRequest("/Home/Quotation/index", data, "POST");
}
function apiAddMarket(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/add", data, "POST");
}
function apiGetClasstify(data) {
  return utils_customRequest.customRequest("/Home/Classification/indexs", data, "POST");
}
function apiGetProductId(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/xhinfos", data, "POST");
}
exports.apiAddMarket = apiAddMarket;
exports.apiGetClasstify = apiGetClasstify;
exports.apiGetProductId = apiGetProductId;
exports.apiGetQuality = apiGetQuality;
exports.apiRecoveryList = apiRecoveryList;
