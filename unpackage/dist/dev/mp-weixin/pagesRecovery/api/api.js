"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiRecycleClassify(data) {
  return utils_customRequest.customRequest("/Home/Classification/hsbjindex", data, "POST");
}
exports.apiRecycleClassify = apiRecycleClassify;
