"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiHomeMenus(data) {
  return utils_customRequest.customRequest("/Home/Homes/index", data, "POST");
}
exports.apiHomeMenus = apiHomeMenus;
