"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiSearchModel(data) {
  return utils_customRequest.customRequest("/Home/Search/index", data, "POST");
}
function apiSearchGoods(data) {
  return utils_customRequest.customRequest("/Home/Search/indexs", data, "POST");
}
exports.apiSearchGoods = apiSearchGoods;
exports.apiSearchModel = apiSearchModel;
