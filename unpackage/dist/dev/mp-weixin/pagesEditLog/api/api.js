"use strict";
const pagesEditLog_utils_customRequest = require("../utils/customRequest.js");
const getLog = (data) => {
  return pagesEditLog_utils_customRequest.customRequest("/Home/Zjgl/zjbgxgrz", data, "POST");
};
exports.getLog = getLog;
