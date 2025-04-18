"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiFinanceChCheck(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/chselect", data, "POST");
}
exports.apiFinanceChCheck = apiFinanceChCheck;
