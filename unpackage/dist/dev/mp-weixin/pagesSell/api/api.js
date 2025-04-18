"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apigetMarketListDetail(data) {
  return utils_customRequest.customRequest("/Home/Goods/freeinfos", data, "POST");
}
exports.apigetMarketListDetail = apigetMarketListDetail;
