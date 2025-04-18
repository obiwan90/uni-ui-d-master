"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiWarehouseList(data) {
  return utils_customRequest.customRequest("/Home/Ck/index", data, "POST");
}
function apiWarehouseSubmit(data) {
  return utils_customRequest.customRequest("/Home/Ck/save", data, "POST");
}
function apiWarehouseUpdate(data) {
  return utils_customRequest.customRequest("/Home/Ck/update", data, "POST");
}
function apiWarehouseMove(data) {
  return utils_customRequest.customRequest("/Home/Ck/ckyk", data, "POST");
}
exports.apiWarehouseList = apiWarehouseList;
exports.apiWarehouseMove = apiWarehouseMove;
exports.apiWarehouseSubmit = apiWarehouseSubmit;
exports.apiWarehouseUpdate = apiWarehouseUpdate;
