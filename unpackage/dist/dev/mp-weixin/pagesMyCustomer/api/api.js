"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiCustomerAdd(data) {
  return utils_customRequest.customRequest("/Home/Users/customeradd", data, "POST");
}
function apiCustomerSearch(data) {
  return utils_customRequest.customRequest("/Home/Customer/select", data, "POST");
}
exports.apiCustomerAdd = apiCustomerAdd;
exports.apiCustomerSearch = apiCustomerSearch;
