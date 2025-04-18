"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
let BaseUrl = "https://www.xzxskj.com";
const whiteList = ["/Home/index/index"];
function customRequest(url, data = {}, method = "POST") {
  return new Promise(async (resolve, reject) => {
    const isExternalUrl = /^https?:\/\//.test(url);
    if (!whiteList.includes(url)) {
      console.log("request url:", url);
      const tokenInfo = common_vendor.index.getStorageSync("tokenInfo");
      data.timeStamp = tokenInfo.timeStamp;
      data.randomStr = tokenInfo.randomStr;
      data.signature = tokenInfo.signature;
      data.adminLx = common_vendor.index.getStorageSync("adminLx") ? common_vendor.index.getStorageSync("adminLx") : "";
      data.adminId = common_vendor.index.getStorageSync("adminId") ? common_vendor.index.getStorageSync("adminId") : "";
    }
    common_vendor.index.request({
      url: isExternalUrl ? url : BaseUrl + url,
      data,
      method,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.customRequest = customRequest;
