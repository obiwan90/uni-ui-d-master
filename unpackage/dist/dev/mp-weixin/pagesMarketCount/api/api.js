"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiDelMine(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/dels", data, "POST");
}
function apigetMarketListAll(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/listsall", data, "POST");
}
exports.apiDelMine = apiDelMine;
exports.apigetMarketListAll = apigetMarketListAll;
