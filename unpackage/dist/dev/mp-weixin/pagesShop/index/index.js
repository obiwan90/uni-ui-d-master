"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
if (!Array) {
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  _easycom_custom_tabbar2();
}
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (common_vendor.unref(classify) + common_vendor.unref(mine) + _easycom_custom_tabbar)();
}
const classify = () => "../../pagesClassify/classify/classify2.js";
const mine = () => "../../pages/mine/mine.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabStore = stores_tabStore.useTabStore();
    const currentTabIndex = common_vendor.computed(() => tabStore.currentTabIndex);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(currentTabIndex) === 4
      }, common_vendor.unref(currentTabIndex) === 4 ? {} : {}, {
        b: common_vendor.unref(currentTabIndex) !== 3
      }, common_vendor.unref(currentTabIndex) !== 3 ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
