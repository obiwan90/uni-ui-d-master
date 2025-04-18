"use strict";
const common_vendor = require("../common/vendor.js");
const api_login_loginApi = require("../api/login/loginApi.js");
const useTokenStore = common_vendor.defineStore("token", {
  state: () => ({
    timeStamp: 0,
    randomStr: "",
    signature: "",
    opid: "",
    session_key: "",
    phone: ""
  }),
  actions: {
    updateToken(tokenInfo) {
      Object.assign(this, tokenInfo);
      common_vendor.index.setStorageSync("tokenInfo", tokenInfo);
    },
    async getToken() {
      try {
        const res = await api_login_loginApi.apiGetToken();
        console.log("token res:", res);
        this.updateToken(res);
        return res;
      } catch (error) {
        console.error("获取 token 失败:", error);
        throw new Error("Token acquisition failed");
      }
    },
    isTokenSet() {
      return this.timeStamp && this.randomStr && this.signature;
    },
    async getSession() {
      try {
        const loginRes = await new Promise((resolve, reject) => {
          common_vendor.index.login({
            provider: "weixin",
            success: resolve,
            fail: reject
          });
        });
        const token = await this.getToken();
        const res = await api_login_loginApi.apiLogin({
          code: loginRes.code
          // ...token
        });
        this.setLoginSession(res);
        return res;
      } catch (error) {
        console.error("获取 session 失败:", error);
        throw new Error("Session acquisition failed");
      }
    },
    setLoginSession(sessionInfo) {
      Object.assign(this, sessionInfo);
      common_vendor.index.setStorageSync("sessionInfo", sessionInfo);
    },
    getPhone() {
      this.phone = this.phone || common_vendor.index.getStorageSync("phone");
      return this.phone;
    },
    setPhone(phone) {
      this.phone = phone;
      common_vendor.index.setStorageSync("phone", phone);
    }
  }
});
exports.useTokenStore = useTokenStore;
