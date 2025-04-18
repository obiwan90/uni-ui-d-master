"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
require("../../stores/tokenStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  _easycom_uni_badge2();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  _easycom_uni_badge();
}
const _sfc_main = {
  __name: "custom-shop-tabbar",
  setup(__props) {
    const isVisible = common_vendor.ref(false);
    const tabStore = stores_tabStore.useTabStore();
    const currentTabIndex = common_vendor.computed(() => tabStore.currentTabIndex);
    const onTabClick = (index) => {
      let mineIndex = common_vendor.index.getStorageSync("selectedMine");
      let data = common_vendor.index.getStorageSync("identityData");
      console.log("mineIndex:", mineIndex);
      if (mineIndex) {
        list.value[4].pagePath = data[mineIndex].path;
      } else {
        list.value[4].pagePath = mineData.value[0].path;
      }
      console.log("currentTabIndex:", currentTabIndex.value);
      if (currentTabIndex.value === 3 && index === 3) {
        return;
      }
      if (index === 0) {
        tabStore.setCurrentTabIndex(index);
        common_vendor.index.navigateBack({
          delta: getCurrentPages().length - 1
        });
      }
      if (index === 1 || index === 2 || index === 4) {
        tabStore.setCurrentTabIndex(index);
        common_vendor.index.navigateTo({
          url: list.value[index].pagePath
        });
      }
    };
    const mineData = common_vendor.ref([
      { index: 0, path: "/pagesUserMine/userMine/userMine" },
      { index: 1, path: "/pagesCustomMine/customMine/customMine" },
      { index: 2, path: "/pagesCustomMine/customMine/customMine" }
    ]);
    const list = common_vendor.ref([
      {
        text: "首页",
        pagePath: "/pages/home/home",
        iconPath: "https://www.xzxskj.com/Public/upload/66c97f9990c9331.png",
        selectedIconPath: "https://www.xzxskj.com/Public/upload/66c97faaa29401777.png",
        centerItem: false
      },
      {
        text: "购物车",
        pagePath: "/pagesShopCar/shopCar/shopCar",
        iconPath: "https://www.xzxskj.com/xcximg/icon_car@3x.png",
        selectedIconPath: "https://www.xzxskj.com/xcximg/icon_car_sel@3x.png",
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
    const onContact = (e) => {
      console.log(e);
    };
    const shopCarCount = common_vendor.computed(() => stores_userInfoStore.useUserStore().shopCount);
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(async () => {
      isVisible.value = true;
      await stores_userInfoStore.useUserStore().refreshShopCarCount();
      console.log("刷新购物车");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, i, i0) => {
          return common_vendor.e({
            a: i !== 1
          }, i !== 1 ? {
            b: common_vendor.unref(currentTabIndex) === i ? item.selectedIconPath : item.iconPath
          } : {
            c: common_vendor.unref(currentTabIndex) === i ? item.selectedIconPath : item.iconPath,
            d: "8edc2b14-0-" + i0,
            e: common_vendor.p({
              size: "small",
              text: item.text === "购物车" ? common_vendor.unref(shopCarCount) : "",
              absolute: "rightTop",
              type: "error"
            })
          }, {
            f: common_vendor.t(item.text),
            g: common_vendor.n(common_vendor.unref(currentTabIndex) === i ? "item-active" : ""),
            h: i === 3
          }, i === 3 ? {
            i: common_vendor.o(onContact, i)
          } : {}, {
            j: common_vendor.n(item.centerItem ? " center-item" : ""),
            k: common_vendor.o(($event) => onTabClick(i), i),
            l: i
          });
        }),
        b: common_vendor.s("width: calc(100% /" + common_vendor.unref(list).length + ")"),
        c: common_vendor.unref(isVisible) ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8edc2b14"]]);
wx.createComponent(Component);
