"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function financeReconciliationSearch(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/cwdzselect", data, "POST");
}
function financeReconciliationSelect(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/cwdzselectxz", data, "POST");
}
function apiFinanceList(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/dzlist", data, "POST");
}
function apiFinanceCheck(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/dz", data, "POST");
}
exports.apiFinanceCheck = apiFinanceCheck;
exports.apiFinanceList = apiFinanceList;
exports.financeReconciliationSearch = financeReconciliationSearch;
exports.financeReconciliationSelect = financeReconciliationSelect;
