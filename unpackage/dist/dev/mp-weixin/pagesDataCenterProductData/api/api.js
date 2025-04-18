"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGoodsData(data) {
  return utils_customRequest.customRequest("/Home/Analysis/kcfx", data, "POST");
}
exports.apiGoodsData = apiGoodsData;
