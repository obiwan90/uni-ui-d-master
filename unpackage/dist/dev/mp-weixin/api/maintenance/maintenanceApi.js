"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetBrand(data) {
  return utils_customRequest.customRequest("/Home/query/Index", data, "POST");
}
function apiGetmaintenanceHis(data) {
  return utils_customRequest.customRequest("/Home/query/indexsss", data, "POST");
}
function apiCheackMaintenance(data) {
  return utils_customRequest.customRequest("/Home/Query/search", data, "POST");
}
exports.apiCheackMaintenance = apiCheackMaintenance;
exports.apiGetBrand = apiGetBrand;
exports.apiGetmaintenanceHis = apiGetmaintenanceHis;
