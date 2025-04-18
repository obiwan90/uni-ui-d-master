"use strict";
const common_vendor = require("../common/vendor.js");
const stores_userInfoStore = require("../stores/userInfoStore.js");
let urlRoot = "https://www.xzxskj.com";
let config = {
  // 页面白名单
  whitePathList: [
    "/pagesLogin/login/login",
    "/pages/home/home"
  ],
  whiteApiList: [
    "/Home/Goods/shoppingcart",
    "/Home/index/index",
    "/Home/Homes/index",
    "/Home/Users/get_session_keys",
    "/Home/Users/infos",
    "/Home/Gly/qxlist",
    "/Home/Users/add",
    "/Home/Upload/add"
  ]
};
function routingIntercept() {
  stores_userInfoStore.useUserStore();
  const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    common_vendor.index.addInterceptor(item, {
      invoke(e) {
        const path = e.url.split("?")[0];
        if (!checkLogin(path)) {
          return false;
        }
        const info = stores_userInfoStore.useUserStore().getInfo();
        const needAuthorityData = common_vendor.index.getStorageSync("authorityList") || { route: [], menu: [], api: [] };
        const userAuthorityData = common_vendor.index.getStorageSync("userAuthorityUrls") || { route: [], menu: [], api: [] };
        console.log("path拦截 path:", path);
        console.log("path拦截 info:", info);
        if (!checkPathPermission(path, needAuthorityData, userAuthorityData)) {
          return false;
        }
      },
      fail(err) {
        console.log("拦截失败:", err);
      }
    });
  });
  common_vendor.index.addInterceptor("request", {
    invoke(e) {
      const needAuthorityData = common_vendor.index.getStorageSync("authorityList") || { route: [], menu: [], api: [] };
      const userAuthorityData = common_vendor.index.getStorageSync("userAuthorityUrls") || { route: [], menu: [], api: [] };
      const api = e.url;
      console.log("拦截器API检查:", api);
      console.log("请求参数:", e.data);
      if (!checkApiPermission(api, needAuthorityData, userAuthorityData)) {
        common_vendor.index.showToast({
          title: "您没有操作权限!",
          icon: "none"
        });
        return false;
      }
      return e;
    },
    fail(err) {
      console.log("API拦截失败:", err);
    }
  });
}
const checkPathPermission = (path, needAuthorityData, userAuthorityData) => {
  if (path.startsWith(urlRoot)) {
    path = path.replace(urlRoot, "");
  }
  if (needAuthorityData && userAuthorityData && needAuthorityData.route.includes(path) && !userAuthorityData.route.includes(path)) {
    common_vendor.index.showToast({
      title: "您没有权限!",
      icon: "none"
    });
    return false;
  }
  return true;
};
const checkApiPermission = (api, needAuthorityData, userAuthorityData) => {
  if (api.startsWith(urlRoot)) {
    api = api.replace(urlRoot, "");
  }
  if (config.whiteApiList.includes(api)) {
    return true;
  }
  console.log("api:", api);
  if (needAuthorityData && userAuthorityData && needAuthorityData.api.includes(api) && !userAuthorityData.api.includes(api)) {
    return false;
  }
  return true;
};
const checkLogin = (path, info) => {
  if (config.whitePathList.includes(path)) {
    return true;
  } else {
    let info2 = common_vendor.index.getStorageSync("userInfo");
    if (!info2) {
      common_vendor.index.navigateTo({
        url: "/pagesLogin/login/login"
      });
      return false;
    }
    return true;
  }
};
exports.routingIntercept = routingIntercept;
