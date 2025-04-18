"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiQualityCheckItem(data) {
  return utils_customRequest.customRequest("/Home/Basic/infos", data, "POST");
}
function apiQualityCheckAdd1(data) {
  return utils_customRequest.customRequest("/Home/Basic/qualityadd?lx=1", data, "POST");
}
function apiQualityCheckAdd2(data) {
  return utils_customRequest.customRequest("/Home/Basic/qualityadd?lx=2", data, "POST");
}
function apiQualityCheckAdd3(data) {
  return utils_customRequest.customRequest("/Home/Basic/qualityadd?lx=3", data, "POST");
}
function apiQualityCheckList(data) {
  return utils_customRequest.customRequest("/Home/Basic/lx", data, "POST");
}
function apiQualityCheckUploadPhoto(data) {
  return utils_customRequest.customRequest("/Home/Basic/tpsc", data, "POST");
}
function apiQualityCheckSerialSearch(data) {
  return utils_customRequest.customRequest("/Home/Basic/chselect", data, "POST");
}
function apiQualityCheckInfo(data) {
  return utils_customRequest.customRequest("/Home/Basic/zjinfos", data, "POST");
}
exports.apiQualityCheckAdd1 = apiQualityCheckAdd1;
exports.apiQualityCheckAdd2 = apiQualityCheckAdd2;
exports.apiQualityCheckAdd3 = apiQualityCheckAdd3;
exports.apiQualityCheckInfo = apiQualityCheckInfo;
exports.apiQualityCheckItem = apiQualityCheckItem;
exports.apiQualityCheckList = apiQualityCheckList;
exports.apiQualityCheckSerialSearch = apiQualityCheckSerialSearch;
exports.apiQualityCheckUploadPhoto = apiQualityCheckUploadPhoto;
