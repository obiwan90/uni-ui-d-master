"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetApprovalList(data) {
  return utils_customRequest.customRequest("/Home/Order/cwtkczlist", data, "POST");
}
function apiApproval(data) {
  return utils_customRequest.customRequest("/Home/Order/cztk", data, "POST");
}
exports.apiApproval = apiApproval;
exports.apiGetApprovalList = apiGetApprovalList;
