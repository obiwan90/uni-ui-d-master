"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiGetComplaint(data) {
  return utils_customRequest.customRequest("/Home/complaint/add", data, "POST");
}
exports.apiGetComplaint = apiGetComplaint;
