"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login_loginApi = require("../../api/login/loginApi.js");
const api_member_member = require("../../api/member/member.js");
const stores_tokenStore = require("../../stores/tokenStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const getPhone = async (e) => {
      const session = await stores_tokenStore.useTokenStore().getSession();
      await stores_tokenStore.useTokenStore().getToken();
      const data = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: session.session_key,
        opid: session.opid
      };
      const res = await api_login_loginApi.apiGetPhone(data);
      console.log("login res:", res);
      if (res.phone !== null) {
        stores_tokenStore.useTokenStore().setPhone(res.phone);
        const locationForm = common_vendor.index.getStorageSync("locationForm");
        const phone = res.phone;
        const addUserParam = {
          opid: session.opid,
          phone,
          yqopid: "",
          laiyuan: 1,
          city: locationForm ? locationForm.city : "",
          unionid: common_vendor.index.getStorageSync("sessionInfo").unionid
        };
        const userInfoParam = {
          openid: session.opid
        };
        await api_member_member.apiAddWxUser(addUserParam);
        const userInfo = await api_member_member.apiGetUserInfo(userInfoParam);
        if (userInfo) {
          stores_userInfoStore.useUserStore().setInfo(userInfo);
        }
        common_vendor.index.reLaunch({
          url: "/pages/home/home"
        });
      } else {
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "error",
          duration: 2e3
        });
        common_vendor.index.navigateTo({
          url: "/pages/home/home"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getPhone)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb93a705"]]);
wx.createPage(MiniProgramPage);
