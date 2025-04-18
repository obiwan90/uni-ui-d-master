"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetClasstify(data) {
  return utils_customRequest.customRequest("/Home/Classification/index", data, "POST");
}
exports.apiGetClasstify = apiGetClasstify;
