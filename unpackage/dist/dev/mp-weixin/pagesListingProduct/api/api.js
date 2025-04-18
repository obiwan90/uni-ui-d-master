"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiListingProductAdd(data) {
  return utils_customRequest.customRequest("/Home/Basic/priceadd", data, "POST");
}
exports.apiListingProductAdd = apiListingProductAdd;
