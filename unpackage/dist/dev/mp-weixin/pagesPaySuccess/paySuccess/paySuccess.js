"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "paySuccess",
  setup(__props) {
    const isShow = common_vendor.ref(true);
    const beforeleave = (e) => {
      console.log("e:", e);
      isShow.value = false;
      navigateToPage1("pages/home/home");
    };
    const orderNo = common_vendor.ref("");
    const goPath = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const navigateToPage1 = (path) => {
      console.log("path:", path);
      let pages = getCurrentPages();
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].route === path) {
          common_vendor.index.navigateBack({
            delta: pages.length - i - 1
          });
          return;
        }
      }
      common_vendor.index.navigateTo({
        url: path
      });
    };
    common_vendor.onLoad((options) => {
      if (options.orderNo) {
        orderNo.value = options.orderNo;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.o(($event) => navigateToPage1("pagesProduct/product/product")),
        e: common_vendor.p({
          customLeftIcon: true
        }),
        f: common_vendor.t(common_vendor.unref(orderNo)),
        g: common_vendor.o(($event) => navigateToPage1("pagesProduct/product/product")),
        h: common_vendor.o(($event) => goPath("/pagesOrder/order/order?order=4"))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8db6193"]]);
wx.createPage(MiniProgramPage);
