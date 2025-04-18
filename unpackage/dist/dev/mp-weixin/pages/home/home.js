"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_initFinished = require("../../stores/initFinished.js");
require("../../stores/tokenStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const api_product_product = require("../../api/product/product.js");
const api_home_home = require("../../api/home/home.js");
const stores_tabStore = require("../../stores/tabStore.js");
if (!Array) {
  const _easycom_custom_navi_bar2 = common_vendor.resolveComponent("custom-navi-bar");
  const _easycom_custom_product_card2 = common_vendor.resolveComponent("custom-product-card");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_navi_bar2 + _easycom_custom_product_card2 + _easycom_custom_tabbar2 + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_custom_navi_bar = () => "../../components/custom-navi-bar/custom-navi-bar.js";
const _easycom_custom_product_card = () => "../../components/custom-product-card/custom-product-card.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_navi_bar + _easycom_custom_product_card + _easycom_custom_tabbar + _easycom_z_paging + QRCodeModal + _easycom_uni_popup)();
}
const QRCodeModal = () => "../../components/QRCodeModal/QRCodeModal.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    stores_initFinished.useInitFinishedStore().initFinished;
    const dataList = common_vendor.ref([]);
    const dhlist = common_vendor.ref([]);
    const showPannel = common_vendor.ref(false);
    const qrCodeUrl = common_vendor.ref("https://www.xzxskj.com/logo/logo.jpg");
    const officialAccountPopup = common_vendor.ref(null);
    const isClicking = common_vendor.ref(false);
    const paging = common_vendor.ref(null);
    const param = common_vendor.ref({
      brandid: "",
      classid: "",
      colourid: "",
      delivery: "",
      finenessid: "",
      gd: "",
      memoryid: "",
      newarrivals: "1",
      price: "",
      pricesdesc: "",
      sftj: "",
      sfzd: "",
      start: 0,
      systemid: "",
      versionid: "",
      ModelID: "",
      pageSize: 20
    });
    const handleClose = () => {
      console.log("Popup is closed");
      officialAccountPopup.value.close();
    };
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      param.value.start = pageNo - 1;
      param.value.pageSize = pageSize;
      const data = await api_product_product.apiGetProductFilterData(param.value);
      paging.value.complete(data.goodslists || []);
    };
    const goPage = async (path) => {
      console.log("path", path);
      if (isClicking.value)
        return;
      isClicking.value = true;
      let res = null;
      const url = path === "pagesClassify/classify/classify" ? `/${path}?res=${encodeURIComponent(JSON.stringify(res))}` : `/${path}`;
      console.log("url", url);
      common_vendor.index.navigateTo({ url });
      setTimeout(() => {
        isClicking.value = false;
      }, 1e3);
    };
    const getHomeMenus = async () => {
      var _a;
      const sessionInfo = common_vendor.index.getStorageSync("sessionInfo");
      const data = {
        opid: sessionInfo.opid,
        unionid: sessionInfo.unionid
      };
      const res = await api_home_home.apiHomeMenus(data);
      if (res.code === "200") {
        dhlist.value = res.dhlist;
        showPannel.value = !((_a = res.usinfos) == null ? void 0 : _a.gzhopid) && res.zt == 2;
        console.log("关注", showPannel.value);
        if (officialAccountPopup.value) {
          showPannel.value ? officialAccountPopup.value.open() : officialAccountPopup.value.close();
        }
      }
      return res;
    };
    const getApiRouter = async (userInfoRes) => {
      const db = common_vendor.Vs.database();
      const userSetting = await db.collection("user-setting").where({ user_id: userInfoRes.id }).get();
      console.log("userSetting", userSetting);
      if (userSetting.result.data.length > 0) {
        const { adminLx, adminId, identityData, selectedMine } = userSetting.result.data[0];
        common_vendor.index.setStorageSync("adminLx", adminLx);
        common_vendor.index.setStorageSync("adminId", adminId);
        common_vendor.index.setStorageSync("identityData", identityData);
        common_vendor.index.setStorageSync("selectedMine", selectedMine);
      }
      return userSetting.result.data;
    };
    common_vendor.onShow(async () => {
      stores_tabStore.useTabStore().setCurrentTabIndex(0);
      await getHomeMenus();
      if (paging && paging.value) {
        paging.value.refresh(true);
      }
    });
    common_vendor.onReady(() => {
      setTimeout(() => {
        stores_userInfoStore.useUserStore().getInfo().then((userInfoRes) => {
          return Promise.all([getHomeMenus(), getApiRouter(userInfoRes)]);
        });
      }, 1e3);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(stores_initFinished.useInitFinishedStore)().initFinished
      }, !common_vendor.unref(stores_initFinished.useInitFinishedStore)().initFinished ? {} : common_vendor.e({
        b: common_vendor.unref(dhlist)
      }, common_vendor.unref(dhlist) ? {
        c: common_vendor.f(common_vendor.unref(dhlist), (item, index, i0) => {
          return common_vendor.e({
            a: item.hide === "0"
          }, item.hide === "0" ? {
            b: "https://www.xzxskj.com" + item.imgs,
            c: common_vendor.t(item.name),
            d: common_vendor.o(($event) => goPage(item.urls), index)
          } : {}, {
            e: index
          });
        })
      } : {}, {
        d: common_vendor.o(($event) => goPage("pagesClassify/classify/classify")),
        e: common_vendor.o(($event) => goPage("pagesRecovery/recovery/recovery")),
        f: common_vendor.o(($event) => goPage("pagesProduct/product/product?newarrivals=1")),
        g: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: item.id,
            b: "07e72d3c-2-" + i0 + ",07e72d3c-0",
            c: common_vendor.p({
              good: item
            })
          };
        }),
        h: common_vendor.sr(paging, "07e72d3c-0", {
          "k": "paging"
        }),
        i: common_vendor.o(queryList),
        j: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        k: common_vendor.p({
          ["loading-more-enabled"]: true,
          ["loading-more-default-text"]: true,
          ["show-loading-more-when-reload"]: true,
          ["default-page-size"]: 20,
          modelValue: common_vendor.unref(dataList)
        }),
        l: common_vendor.p({
          qrCodeUrl: common_vendor.unref(qrCodeUrl)
        }),
        m: common_vendor.sr(officialAccountPopup, "07e72d3c-4", {
          "k": "officialAccountPopup"
        }),
        n: common_vendor.o(handleClose),
        o: common_vendor.o(_ctx.change),
        p: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area"]: false,
          type: "center"
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
