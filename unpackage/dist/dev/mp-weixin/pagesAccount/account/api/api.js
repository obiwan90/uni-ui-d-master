"use strict";
const utils_customRequest = require("../../../utils/customRequest.js");
function apiGetBillList(data) {
  return utils_customRequest.customRequest("/Home/Users/bill", data, "POST");
}
exports.apiGetBillList = apiGetBillList;
