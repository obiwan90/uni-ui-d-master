"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function getFinanceDetail(params) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/dzinfos", params, "POST");
}
function apiFinanceCheck(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/dz", data, "POST");
}
exports.apiFinanceCheck = apiFinanceCheck;
exports.getFinanceDetail = getFinanceDetail;
