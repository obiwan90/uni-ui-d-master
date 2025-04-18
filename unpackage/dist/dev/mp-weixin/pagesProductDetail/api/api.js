"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiPosterSubmit(data) {
  return utils_customRequest.customRequest("/Home/Sales/tjadd", data, "POST");
}
function apiGetBargainingtime(data) {
  return utils_customRequest.customRequest("/Home/Bargaining/bargainingtime", data, "POST");
}
function apiGetProductDetail(data) {
  return utils_customRequest.customRequest("/Home/Goods/infos", data, "POST");
}
exports.apiGetBargainingtime = apiGetBargainingtime;
exports.apiGetProductDetail = apiGetProductDetail;
exports.apiPosterSubmit = apiPosterSubmit;
