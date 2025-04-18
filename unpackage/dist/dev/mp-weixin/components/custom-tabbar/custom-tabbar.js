"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
require("../../stores/tokenStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const _sfc_main = {
  __name: "custom-tabbar",
  props: {
    showShop: {
      type: Boolean,
      default: () => false
    }
  },
  setup(__props) {
    common_vendor.computed(() => stores_userInfoStore.useUserStore().shopCount);
    const props = __props;
    const isVisible = common_vendor.ref(false);
    common_vendor.ref(100);
    const tabStore = stores_tabStore.useTabStore();
    const currentTabIndex = common_vendor.computed(() => tabStore.currentTabIndex);
    const isClicking = common_vendor.ref(false);
    common_vendor.ref();
    common_vendor.ref();
    const onTabClick = async (index) => {
      console.log("onTabClick:", index);
      if (isClicking.value) {
        return;
      }
      isClicking.value = true;
      let mineIndex = common_vendor.index.getStorageSync("selectedMine");
      let data = common_vendor.index.getStorageSync("identityData");
      if (mineIndex) {
        list.value[4].pagePath = data[mineIndex].path;
      } else {
        list.value[4].pagePath = mineData.value[0].path;
      }
      getCurrentPages();
      if (currentTabIndex.value === index) {
        isClicking.value = false;
        return;
      }
      if (currentTabIndex.value === 4 && index === 0) {
        console.log("从4跳0");
        tabStore.setCurrentTabIndex(index);
        if (getCurrentPages().length > 1) {
          common_vendor.index.navigateBack({
            delta: getCurrentPages().length - 1
          });
        } else {
          tabStore.setCurrentTabIndex(index);
          common_vendor.index.reLaunch({
            url: list.value[index].pagePath
          });
        }
        isClicking.value = false;
        return;
      }
      let nextPageData = null;
      if (index !== 3) {
        tabStore.setCurrentTabIndex(index);
        common_vendor.index.navigateTo({
          url: `${list.value[index].pagePath}?nextPageData=${encodeURIComponent(JSON.stringify(nextPageData))}`
        });
      }
      isClicking.value = false;
    };
    const list = common_vendor.ref([
      {
        text: "首页",
        pagePath: "/pages/home/home",
        iconPath: "https://www.xzxskj.com/Public/upload/66c97f9990c9331.png",
        selectedIconPath: "https://www.xzxskj.com/Public/upload/66c97faaa29401777.png",
        centerItem: false
      },
      {
        text: props.showShop ? "购物车" : "保修查询",
        pagePath: props.showShop ? "/pagesShopCar/shopCar/shopCar" : "/pagesMaintenance/maintenance/maintenance",
        iconPath: props.showShop ? "https://www.xzxskj.com/xcximg/icon_car@3x.png" : "https://www.xzxskj.com/Public/upload/66c97f69bc3108295.png",
        selectedIconPath: props.showShop ? "https://www.xzxskj.com/xcximg/icon_car_sel@3x.png" : "https://www.xzxskj.com/Public/upload/66c97f7f3db9e4149.png",
        centerItem: false
      },
      {
        text: "",
        pagePath: "/pagesNewSell/newSell/newSell",
        iconPath: "https://www.xzxskj.com/Public/upload/66c97f28f01fd9278.png",
        selectedIconPath: "https://www.xzxskj.com/Public/upload/66c97f28f01fd9278.png",
        centerItem: true
      },
      {
        text: "客服",
        pagePath: "",
        iconPath: "https://www.xzxskj.com/Public/upload/66cbac6a5c3d5705.png",
        selectedIconPath: "https://www.xzxskj.com/Public/upload/66cbac57c8a956655.png",
        centerItem: false
      },
      {
        text: "我的",
        pagePath: "",
        iconPath: "https://www.xzxskj.com/Public/upload/66c97fbc201701617.png",
        selectedIconPath: "https://www.xzxskj.com/Public/upload/66c97fcbd0dc17793.png",
        centerItem: false
      }
    ]);
    const mineData = common_vendor.ref([
      { index: 0, path: "/pagesUserMine/userMine/userMine" },
      { index: 1, path: "/pagesCustomMine/customMine/customMine" },
      { index: 2, path: "/pagesCustomMine/customMine/customMine" }
    ]);
    common_vendor.onShow(() => {
      isVisible.value = true;
    });
    common_vendor.onHide(() => {
      isVisible.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(currentTabIndex) === i ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: common_vendor.n(common_vendor.unref(currentTabIndex) === i ? "item-active" : ""),
            d: i === 3
          }, i === 3 ? {
            e: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), i)
          } : {}, {
            f: common_vendor.n(item.centerItem ? " center-item" : ""),
            g: common_vendor.o(($event) => onTabClick(i), i),
            h: i
          });
        }),
        b: common_vendor.s("width: calc(100% /" + common_vendor.unref(list).length + ")"),
        c: common_vendor.unref(isVisible) ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51c48e3c"]]);
wx.createComponent(Component);
