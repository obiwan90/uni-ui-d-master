"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiFinancePlaceOrder(url, data) {
  return utils_customRequest.customRequest(url, data, "POST");
}
function apiFinanceChCheck(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/chselect", data, "POST");
}
function apiCustomerSearch(data) {
  return utils_customRequest.customRequest("/Home/Customer/select", data, "POST");
}
exports.apiCustomerSearch = apiCustomerSearch;
exports.apiFinanceChCheck = apiFinanceChCheck;
exports.apiFinancePlaceOrder = apiFinancePlaceOrder;
