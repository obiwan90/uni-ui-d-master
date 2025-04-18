"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiAccountAdd(data) {
  return utils_customRequest.customRequest("/Home/Users/yhkadd", data, "POST");
}
function apiAccountList(data) {
  return utils_customRequest.customRequest("/Home/Users/yhklist", data, "POST");
}
function apiSearchBank(data) {
  return utils_customRequest.customRequest("/Home/Users/bank", data, "POST");
}
exports.apiAccountAdd = apiAccountAdd;
exports.apiAccountList = apiAccountList;
exports.apiSearchBank = apiSearchBank;
