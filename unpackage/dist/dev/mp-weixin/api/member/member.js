"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiAddWxUser(data) {
  return utils_customRequest.customRequest("/Home/Users/add", data, "POST");
}
function apiGetUserInfo(data) {
  return utils_customRequest.customRequest("/Home/Users/infos", data, "POST");
}
function apiUpdateUserInfo(data) {
  return utils_customRequest.customRequest("/Home/Users/updates", data, "POST");
}
exports.apiAddWxUser = apiAddWxUser;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiUpdateUserInfo = apiUpdateUserInfo;
