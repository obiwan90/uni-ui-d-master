"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uv_search2 + _easycom_uni_transition2 + _easycom_uni_icons2 + _easycom_uv_empty2 + _easycom_uni_load_more2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uni_transition + _easycom_uni_icons + _easycom_uv_empty + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const duration1 = common_vendor.ref(1500);
    const duration2 = common_vendor.ref(1500);
    const showSearchList = common_vendor.ref(false);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const fuzzySearch = common_vendor.ref([
      { key: 1, value: "iphone1" },
      { key: 2, value: "mate40" },
      { key: 3, value: "iphone13" },
      { key: 4, value: "uphone14" },
      { key: 5, value: "vivo" },
      { key: 6, value: "苹果" },
      { key: 7, value: "华为" },
      { key: 8, value: "小米" },
      { key: 9, value: "荣耀" }
    ]);
    const executeFadeAnimation = () => {
      showSearchList.value = true;
    };
    const executeSlideAnimation = () => {
      showSearchList.value = false;
    };
    const onFocus = () => {
      executeFadeAnimation();
    };
    const select = (value) => {
      executeSlideAnimation();
      queryParams.value.keyword = value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const historySearch = common_vendor.ref(common_vendor.index.getStorageSync("historySearch") || []);
    const recommendList = common_vendor.ref(["iphone13", "iphone14", "iphone15", "华为"]);
    const noData = common_vendor.ref(false);
    const noSearch = common_vendor.ref(false);
    const classList = common_vendor.ref([]);
    const onSearch = () => {
      executeSlideAnimation();
      common_vendor.index.showLoading();
      if (!queryParams.value.keyword.trim()) {
        common_vendor.index.hideLoading();
        return;
      }
      historySearch.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
      console.log("historySearch.value：", historySearch.value);
      if (historySearch.value) {
        common_vendor.index.setStorageSync("historySearch", historySearch.value);
      }
      initParams(queryParams.value.keyword);
      searchData();
      console.log(queryParams.value.keyword);
    };
    const clickTab = (value) => {
      initParams(value);
      onSearch();
    };
    const removeHistory = () => {
      common_vendor.index.showModal({
        title: "是否清空历史搜索？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("historySearch");
            historySearch.value = [];
          }
        }
      });
    };
    const searchData = async () => {
      try {
        if (classList.value.length > 0) {
          common_vendor.index.setStorageSync("storgClassList", classList.value);
        }
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const initParams = (value = "") => {
      classList.value = [];
      noData.value = false;
      noSearch.value = false;
      queryParams.value = {
        pageNum: 1,
        pageSize: 12,
        keyword: value || ""
      };
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.value.pageNum++;
      searchData();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList", classList.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.o(onSearch),
        d: common_vendor.o(onFocus),
        e: common_vendor.o(($event) => common_vendor.unref(queryParams).keyword = $event),
        f: common_vendor.p({
          showAction: true,
          actionText: "搜索",
          animation: true,
          bgColor: "transparent",
          clearabled: true,
          ["height:"]: true,
          ["72rpx"]: true,
          modelValue: common_vendor.unref(queryParams).keyword
        }),
        g: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        h: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        i: common_vendor.f(common_vendor.unref(fuzzySearch), (item, index, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: index,
            c: common_vendor.o(($event) => select(item.value), index)
          };
        }),
        j: common_vendor.p({
          ["mode-class"]: "fade",
          duration: common_vendor.unref(duration1),
          show: common_vendor.unref(showSearchList)
        }),
        k: !common_vendor.unref(classList).length || common_vendor.unref(noSearch)
      }, !common_vendor.unref(classList).length || common_vendor.unref(noSearch) ? common_vendor.e({
        l: common_vendor.unref(historySearch).length
      }, common_vendor.unref(historySearch).length ? {
        m: common_vendor.p({
          type: "trash",
          size: "25"
        }),
        n: common_vendor.o(removeHistory),
        o: common_vendor.f(common_vendor.unref(historySearch), (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.o(($event) => clickTab(tab), tab)
          };
        })
      } : {}, {
        p: common_vendor.f(common_vendor.unref(recommendList), (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.o(($event) => clickTab(tab), tab)
          };
        })
      }) : {}, {
        q: common_vendor.unref(noSearch)
      }, common_vendor.unref(noSearch) ? {
        r: common_vendor.p({
          mode: "search",
          icon: "http://cdn.uviewui.com/uview/empty/search.png"
        })
      } : common_vendor.e({
        s: common_vendor.f(common_vendor.unref(classList), (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        }),
        t: common_vendor.unref(noData) || common_vendor.unref(classList).length
      }, common_vendor.unref(noData) || common_vendor.unref(classList).length ? {
        v: common_vendor.p({
          status: common_vendor.unref(noData) ? "noMore" : "loading"
        })
      } : {}), {
        w: common_vendor.p({
          ["mode-class"]: "slide-bottom",
          duration: common_vendor.unref(duration2),
          show: !common_vendor.unref(showSearchList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-810bd1f2"]]);
wx.createPage(MiniProgramPage);
