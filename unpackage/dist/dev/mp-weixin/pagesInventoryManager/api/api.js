"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiChSelectSearch(data) {
  return utils_customRequest.customRequest("/Home/Kcgl/kcglchselect", data, "POST");
}
function apiGetInventory(data) {
  return utils_customRequest.customRequest("/Home/Kcgl/kcglindex", data, "POST");
}
function apiEditInventory(url, data) {
  return utils_customRequest.customRequest(url, data, "POST");
}
function apiExportExcel(data) {
  return utils_customRequest.customRequest("/Home/Kcgl/dclist", data, "POST");
}
function apiModelSearch(data) {
  return utils_customRequest.customRequest("/Home/Kcgl/kcglxhselect", data, "POST");
}
exports.apiChSelectSearch = apiChSelectSearch;
exports.apiEditInventory = apiEditInventory;
exports.apiExportExcel = apiExportExcel;
exports.apiGetInventory = apiGetInventory;
exports.apiModelSearch = apiModelSearch;
