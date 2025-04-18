"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiFinenessList(data) {
  return utils_customRequest.customRequest("/Home/Goods/finenesslist", data, "POST");
}
function apiSelectedFineness(data) {
  return utils_customRequest.customRequest("/Home/Goods/xzcs", data, "POST");
}
function apiEditProductInfo(data) {
  return utils_customRequest.customRequest("/Home/Goods/updategoods", data, "POST");
}
function apiGetProductFilterList(data) {
  return utils_customRequest.customRequest("/Home/Classification/datalist", data, "POST");
}
function apiGetProductFilterData(data) {
  return utils_customRequest.customRequest("/Home/Classification/lists", data, "POST");
}
exports.apiEditProductInfo = apiEditProductInfo;
exports.apiFinenessList = apiFinenessList;
exports.apiGetProductFilterData = apiGetProductFilterData;
exports.apiGetProductFilterList = apiGetProductFilterList;
exports.apiSelectedFineness = apiSelectedFineness;
