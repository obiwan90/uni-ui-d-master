"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiQualityControlList(data) {
  return utils_customRequest.customRequest("/Home/Zjgl/index", data, "POST");
}
exports.apiQualityControlList = apiQualityControlList;
