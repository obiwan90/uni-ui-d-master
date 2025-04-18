"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiDataAnalysis(data) {
  return utils_customRequest.customRequest("/Home/Analysis/index", data, "POST");
}
function apiStockAnalysis(data) {
  return utils_customRequest.customRequest("/Home/Analysis/kcindex", data, "POST");
}
exports.apiDataAnalysis = apiDataAnalysis;
exports.apiStockAnalysis = apiStockAnalysis;
