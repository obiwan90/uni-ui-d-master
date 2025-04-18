"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiCustomerSearch(data) {
  return utils_customRequest.customRequest("/Home/Customer/select", data, "POST");
}
function apiCustomerData(data) {
  return utils_customRequest.customRequest("/Home/Customer/index", data, "POST");
}
exports.apiCustomerData = apiCustomerData;
exports.apiCustomerSearch = apiCustomerSearch;
