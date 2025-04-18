"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiImeiTrackList(data) {
  return utils_customRequest.customRequest("/Home/Chgz/index", data, "POST");
}
function apiImeiTrackSearch(data) {
  return utils_customRequest.customRequest("/Home/Orderxhhk/chselects", data, "POST");
}
exports.apiImeiTrackList = apiImeiTrackList;
exports.apiImeiTrackSearch = apiImeiTrackSearch;
