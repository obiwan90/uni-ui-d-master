"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_identity_pannel2 = common_vendor.resolveComponent("identity-pannel");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  (_easycom_uni_badge2 + _easycom_identity_pannel2 + _easycom_uni_popup2 + _easycom_custom_tabbar2)();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_identity_pannel = () => "../../components/identity-pannel/identity-pannel.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_identity_pannel + _easycom_uni_popup + _easycom_custom_tabbar)();
}
const _sfc_main = {
  __name: "userMine",
  setup(__props) {
    const isShow = common_vendor.ref(false);
    common_vendor.ref(false);
    const showIdentity = common_vendor.ref(false);
    const identityPopup = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const showSwitch = common_vendor.ref(false);
    const triggered = common_vendor.ref(false);
    let _freshing = false;
    const mini_card_data = common_vendor.ref([
      { price: "0", text: "账户金额" },
      { price: "0", text: "冻结金额" },
      { price: "0", text: "可用金额" }
    ]);
    const mine_card_datas = common_vendor.ref([
      {
        title: "采购订单",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_daifukuan@3x.png", text: "待付款", lx: "3", path: "/pagesOrder/order/order?order=3", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_daifahuo@3x.png", text: "待发货", lx: "4", path: "/pagesOrder/order/order?order=4", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_daishouhuo@3x.png", text: "待收货", lx: "5", path: "/pagesOrder/order/order?order=5", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yishouhou1@3x.png", text: "已收货", lx: "6", path: "/pagesOrder/order/order?order=6", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_jianyiwancheng@3x.png", text: "交易完成", lx: "7", path: "/pagesOrder/order/order?order=7", num: "0" }
        ],
        selected: true
      },
      {
        title: "议价订单",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_yijiazh@3x.png", text: "议价中", lx: "2", path: "/pagesOrder/order/order?yj=2", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiacg@3x.png", text: "议价成功", lx: "3", path: "/pagesOrder/order/order?yj=3", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiasb@3x.png", text: "议价失败", lx: "4", path: "/pagesOrder/order/order?yj=4", num: "0" }
        ],
        selected: false
      },
      {
        title: "售后订单",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后中", lx: "2", path: "/pagesOrder/order/order?sh=2", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png", text: "售后成功", lx: "3", path: "/pagesOrder/order/order?sh=3", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后失败", lx: "4", path: "/pagesOrder/order/order?sh=4", num: "0" }
        ],
        selected: false
      }
    ]);
    const settings_data = common_vendor.ref([
      { title: "更多功能", value: [
        { text: "我的发布", image: "https://www.xzxskj.com/xcximg/icon__fabu@3x.png", path: "/pagesMarketCount/marketCount/marketCount" },
        { text: "收款账户", image: "https://www.xzxskj.com/xcximg/icon_zhanghu@3x.png", path: "/pagesPayAccount/payAccount/payAccount" },
        { text: "商户信息", image: "https://www.xzxskj.com/xcximg/icon_shop@3x.png", path: "/pagesMenber/menber/menber" },
        { text: "地址管理", image: "https://www.xzxskj.com/xcximg/icon_dizhi@3x.png", path: "/pagesAddress/address/address" },
        { text: "采购须知", image: "https://www.xzxskj.com/xcximg/icon_caigou@3x.png", path: "/pagesProcurementDescription/procurementDescription/procurementDescription" },
        { text: "成色说明", image: "https://www.xzxskj.com/xcximg/icon_chengse@3x.png", path: "/pagesFineness/fineness/fineness" },
        { text: "售后规则", image: "https://www.xzxskj.com/xcximg/icon_shouhou1@3x.png", path: "/pagesAftersalesRules/aftersalesRules/aftersalesRules" },
        { text: "平台客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "招商加盟", image: "https://www.xzxskj.com/xcximg/icon_jiameng@3x.png" },
        { text: "投诉建议", image: "https://www.xzxskj.com/xcximg/icon_tousu@3x.png", path: "/pagesSuggest/suggest/suggest?title=投诉建议" },
        { text: "购物车", image: "https://www.xzxskj.com/xcximg/icon_car@3x.png", path: "/pagesShopCar/shopCar/shopCar" }
      ] }
    ]);
    const currentValues = common_vendor.computed(() => {
      const selectedItem = mine_card_datas.value.find((item) => item.selected);
      return selectedItem ? selectedItem.values : [];
    });
    const contentPadding = common_vendor.computed(() => {
      const selectedIndex = mine_card_datas.value.findIndex((item) => item.selected);
      return selectedIndex === 1 || selectedIndex === 2 ? { paddingLeft: "76rpx", paddingRight: "62rpx" } : {};
    });
    const toggleSelected = (index) => {
      mine_card_datas.value.forEach((item, i) => item.selected = i === index);
    };
    const handleClose = () => {
      console.log("Popup is closed");
      identityPopup.value.close();
    };
    const openIdentity = () => {
      console.log("Popup is open");
      showIdentity.value = true;
      identityPopup.value.open();
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({ url: path });
    };
    const editeUser = () => {
      common_vendor.index.navigateTo({ url: "/pagesMenber/menber/menber" });
    };
    const beforeleave = () => {
      isShow.value = false;
      common_vendor.index.navigateBack({ delta: getCurrentPages().length - 1 });
    };
    const onPulling = (e) => {
      console.log("正在下拉...", e);
      if (e.detail.deltaY < 0)
        return;
      triggered.value = true;
    };
    const onRefresh = async () => {
      if (_freshing)
        return;
      _freshing = true;
      if (!triggered.value)
        triggered.value = true;
      userInfo.value = await stores_userInfoStore.useUserStore().getInfo();
      updateOrderData();
      showSwitch.value = userInfo.value.joininfos && userInfo.value.joininfos.length > 0;
      setTimeout(() => {
        triggered.value = false;
        _freshing = false;
      }, 1e3);
    };
    const updateOrderData = () => {
      const infos = common_vendor.index.getStorageSync("infos");
      if (infos) {
        mine_card_datas.value[0].num = infos.zordernum;
        mine_card_datas.value[1].num = infos.zyjordernum;
        mine_card_datas.value[2].num = infos.zshordernum;
        mine_card_datas.value[0].values[0].num = infos.dfk;
        mine_card_datas.value[0].values[1].num = infos.dfh;
        mine_card_datas.value[0].values[2].num = infos.dsh;
        mine_card_datas.value[1].values[0].num = infos.yjz;
        mine_card_datas.value[2].values[0].num = infos.shz;
      }
    };
    const onRestore = () => {
      console.log("刷新完成，恢复状态");
      triggered.value = false;
    };
    common_vendor.onMounted(() => {
      userInfo.value = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      updateOrderData();
      showSwitch.value = userInfo.value.joininfos && userInfo.value.joininfos.length > 0;
      stores_tabStore.useTabStore().setCurrentTabIndex(4);
    });
    common_vendor.onLoad((option) => {
      if (option.from && option.from === "identity") {
        isShow.value = true;
      }
    });
    common_vendor.onShow(() => {
      stores_tabStore.useTabStore().setCurrentTabIndex(4);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        g: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? common_vendor.e({
        h: common_vendor.unref(userInfo).img === "" ? "https://www.xzxskj.com/xcximg/132.jpg" : "https://www.xzxskj.com" + common_vendor.unref(userInfo).img,
        i: common_vendor.t(common_vendor.unref(userInfo).nik_name === "" ? "微信用户" : common_vendor.unref(userInfo).nik_name),
        j: common_vendor.t(common_vendor.unref(userInfo).phone),
        k: common_vendor.o(editeUser),
        l: common_vendor.unref(showSwitch)
      }, common_vendor.unref(showSwitch) ? {
        m: common_vendor.o(openIdentity)
      } : {}) : {}, {
        n: common_vendor.o(($event) => goPage("/pagesAccount/account/account?from=user")),
        o: common_vendor.f(common_vendor.unref(mini_card_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.price),
            b: common_vendor.t(item.text),
            c: index
          };
        }),
        p: common_vendor.f(common_vendor.unref(mine_card_datas), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.selected ? 1 : "",
            c: "e7db4496-0-" + i0,
            d: common_vendor.p({
              size: "small",
              text: item.num,
              inverted: item.num === "0" || item.selected,
              absolute: "rightTop",
              type: "error",
              ["custom-style"]: {
                color: "#ffffff"
              }
            }),
            e: index,
            f: common_vendor.o(($event) => toggleSelected(index), index)
          };
        }),
        q: common_vendor.f(common_vendor.unref(currentValues), (item1, index, i0) => {
          return {
            a: item1.image,
            b: "e7db4496-1-" + i0,
            c: common_vendor.p({
              size: "small",
              text: item1.num,
              inverted: item1.num === "0" ? true : false,
              absolute: "rightTop",
              type: "error",
              ["custom-style"]: {
                color: "#ffffff"
              }
            }),
            d: common_vendor.t(item1.text),
            e: index,
            f: common_vendor.o(($event) => goPage(item1.path), index)
          };
        }),
        r: common_vendor.s(common_vendor.unref(contentPadding)),
        s: common_vendor.f(common_vendor.unref(settings_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.value, (item1, index2, i1) => {
              return common_vendor.e({
                a: item1.image,
                b: common_vendor.t(item1.text),
                c: item1.text === "平台客服"
              }, item1.text === "平台客服" ? {
                d: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), index2)
              } : {}, {
                e: index2,
                f: common_vendor.o(($event) => goPage(item1.path), index2)
              });
            }),
            c: index
          };
        }),
        t: common_vendor.unref(triggered),
        v: common_vendor.o(onPulling),
        w: common_vendor.o(onRefresh),
        x: common_vendor.o(onRestore),
        y: common_vendor.unref(showIdentity)
      }, common_vendor.unref(showIdentity) ? {
        z: common_vendor.o(handleClose)
      } : {}, {
        A: common_vendor.sr(identityPopup, "e7db4496-2", {
          "k": "identityPopup"
        }),
        B: common_vendor.o(handleClose),
        C: common_vendor.o(_ctx.change),
        D: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7db4496"]]);
wx.createPage(MiniProgramPage);
