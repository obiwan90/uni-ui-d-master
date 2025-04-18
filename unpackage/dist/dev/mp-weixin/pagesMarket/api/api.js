"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apigetMarket(data) {
  return utils_customRequest.customRequest("/Home/Freerelease/lists", data, "POST");
}
exports.apigetMarket = apigetMarket;
