"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiSaleData(data) {
  return utils_customRequest.customRequest("/Home/Analysis/orderindex", data, "POST");
}
exports.apiSaleData = apiSaleData;
