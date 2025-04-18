"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetOrderDetail(data) {
  return utils_customRequest.customRequest("/Home/order/orderinfos", data, "POST");
}
exports.apiGetOrderDetail = apiGetOrderDetail;
