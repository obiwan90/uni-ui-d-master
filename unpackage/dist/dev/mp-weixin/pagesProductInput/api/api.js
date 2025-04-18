"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiRecoveryList(data) {
  return utils_customRequest.customRequest("/Home/Quotation/index", data, "POST");
}
function apiGetProductId(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/xhinfos", data, "POST");
}
function apiRecycleClassify(data) {
  return utils_customRequest.customRequest("/Home/Classification/hsbjindex", data, "POST");
}
exports.apiGetProductId = apiGetProductId;
exports.apiRecoveryList = apiRecoveryList;
exports.apiRecycleClassify = apiRecycleClassify;
