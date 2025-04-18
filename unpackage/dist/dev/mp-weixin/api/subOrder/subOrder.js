"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiSubmitorder(data) {
  return utils_customRequest.customRequest("/Home/Order/submitorder", data, "POST");
}
exports.apiSubmitorder = apiSubmitorder;
