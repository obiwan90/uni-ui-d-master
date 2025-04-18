"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetToken() {
  return utils_customRequest.customRequest("/Home/index/index", "", "GET");
}
function apiLogin(data) {
  return utils_customRequest.customRequest("/Home/Users/get_session_keys", data, "POST");
}
function apiGetPhone(data) {
  return utils_customRequest.customRequest("/Home/Users/jm?", data, "POST");
}
exports.apiGetPhone = apiGetPhone;
exports.apiGetToken = apiGetToken;
exports.apiLogin = apiLogin;
