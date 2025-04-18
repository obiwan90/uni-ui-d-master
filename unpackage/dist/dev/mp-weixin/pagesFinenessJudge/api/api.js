"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiFinanceItemList(data) {
  return utils_customRequest.customRequest("/Home/Basic/cspd", data, "POST");
}
function apiFinanceData(data) {
  return utils_customRequest.customRequest("/Home/Basic/cshqxx", data, "POST");
}
function apiFinanceSave(data) {
  return utils_customRequest.customRequest("/Home/Basic/csadd", data, "POST");
}
exports.apiFinanceData = apiFinanceData;
exports.apiFinanceItemList = apiFinanceItemList;
exports.apiFinanceSave = apiFinanceSave;
