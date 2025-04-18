"use strict";
const common_vendor = require("../common/vendor.js");
const utils_qqmapWxJssdk = require("./qqmap-wx-jssdk.js");
const key = "KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO";
new utils_qqmapWxJssdk.QQMapWX({
  key
  // 替换为你的腾讯地图开发者密钥
});
const getAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`;
    common_vendor.index.request({
      url,
      method: "GET",
      success: (res) => {
        if (res.data && res.data.result) {
          console.log(res);
          resolve(res.data.result);
        } else {
          reject("地址获取失败");
        }
      },
      fail: () => {
        reject("请求失败");
      }
    });
  });
};
const getLocationByAddress = (address) => {
  return new Promise((resolve, reject) => {
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?address=${encodeURIComponent(address)}&key=${key}`;
    common_vendor.index.request({
      url,
      method: "GET",
      success: (res) => {
        if (res.data && res.data.result && res.data.result.location) {
          const { lat, lng } = res.data.result.location;
          resolve({
            latitude: lat,
            longitude: lng
          });
        } else {
          reject("地址解析失败");
        }
      },
      fail: () => {
        reject("请求失败");
      }
    });
  });
};
exports.getAddress = getAddress;
exports.getLocationByAddress = getLocationByAddress;
