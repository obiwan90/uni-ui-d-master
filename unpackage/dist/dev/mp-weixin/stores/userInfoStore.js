"use strict";
const common_vendor = require("../common/vendor.js");
const api_member_member = require("../api/member/member.js");
const api_shopCard_shopCard = require("../api/shopCard/shopCard.js");
require("./tokenStore.js");
function extractUrls(data) {
  const result = { route: [], menu: [], api: [] };
  function traverse(nodes) {
    for (const node of nodes) {
      const urls = node.url.split(",");
      urls.forEach((url) => {
        if (url.startsWith("route:"))
          result.route.push(url.slice(6));
        else if (url.startsWith("menu:"))
          result.menu.push(url.slice(5));
        else if (url.startsWith("api:"))
          result.api.push(url.slice(4));
      });
      if (node.lists && node.lists.length > 0)
        traverse(node.lists);
    }
  }
  traverse(data);
  return result;
}
const useUserStore = common_vendor.defineStore({
  id: "userInfo",
  state: () => ({
    info: null,
    fetchingUserInfo: false,
    shopCount: null
  }),
  actions: {
    // 每次都请求最新的用户信息
    async getInfo() {
      try {
        this.fetchingUserInfo = true;
        const session = common_vendor.index.getStorageSync("sessionInfo");
        if (!session || !session.opid)
          throw new Error("Session info missing");
        const param = { openid: session.opid };
        const res = await api_member_member.apiGetUserInfo(param);
        if (res.info) {
          this.setInfo(res.info);
          this.savePermissions(res.qxlists);
          common_vendor.index.setStorageSync("infos", res);
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
      } finally {
        this.fetchingUserInfo = false;
      }
      return this.info;
    },
    // 设置用户信息并缓存
    setInfo(info) {
      this.info = info;
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(info));
      common_vendor.index.setStorageSync("isLogin", true);
    },
    // 保存权限信息
    savePermissions(qxlists) {
      if (qxlists) {
        const userAuthorityUrls = extractUrls(qxlists);
        common_vendor.index.setStorageSync("userAuthorityUrls", userAuthorityUrls);
        common_vendor.index.setStorageSync("qxlists", qxlists);
      }
    },
    // 清空用户信息
    clearInfo() {
      this.info = null;
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.removeStorageSync("isLogin");
      common_vendor.index.removeStorageSync("qxlists");
      common_vendor.index.removeStorageSync("userAuthorityUrls");
    },
    // 刷新购物车商品数量
    async refreshShopCarCount() {
      try {
        const session = common_vendor.index.getStorageSync("sessionInfo");
        if (!session || !session.opid)
          throw new Error("Session info missing");
        const res = await api_shopCard_shopCard.apigetShopCard({ opid: session.opid });
        if (res.code === "200") {
          this.shopCount = res.count;
        }
        return this.shopCount;
      } catch (error) {
        console.error("刷新购物车数量失败:", error);
        return null;
      }
    }
  }
});
exports.useUserStore = useUserStore;
