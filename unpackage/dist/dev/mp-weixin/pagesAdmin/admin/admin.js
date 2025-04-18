"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_identity_pannel2 = common_vendor.resolveComponent("identity-pannel");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  (_easycom_identity_pannel2 + _easycom_uni_popup2 + _easycom_custom_tabbar2)();
}
const _easycom_identity_pannel = () => "../../components/identity-pannel/identity-pannel.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (_easycom_identity_pannel + _easycom_uni_popup + _easycom_custom_tabbar)();
}
const _sfc_main = {
  __name: "admin",
  setup(__props) {
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    common_vendor.ref([]);
    const isShow = common_vendor.ref(false);
    const beforeleave = (e) => {
      console.log("e:", e);
      isShow.value = false;
      common_vendor.index.showModal({
        content: "角色已保存",
        showCancel: false,
        success: (res) => {
          if (!res.cancel) {
            console.log("用户点击了确认");
            common_vendor.index.navigateBack({
              delta: getCurrentPages().length - 1
            });
          }
        }
      });
    };
    const userInfo = common_vendor.ref(null);
    const showSwitch = common_vendor.ref(false);
    const showIdentity = common_vendor.ref(false);
    const identityPopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      identityPopup.value.close();
    };
    const change = (e) => {
      showIdentity.value = e.show;
    };
    const openIdentity = () => {
      console.log("Popup is open");
      showIdentity.value = true;
      identityPopup.value.open();
    };
    const data_center = common_vendor.ref([
      { text: "实时库存", value: "2585" },
      { text: "实时销量", value: "545" },
      { text: "实时售额", value: "120654" },
      { text: "今日上架", value: "255" }
    ]);
    const other_data = common_vendor.ref([
      {
        title: "商品管理",
        menuAuthority: "productManager",
        value: [
          { text: "商品录入", image: "https://www.xzxskj.com/xcximg/icon_luru@3x.png", path: "/pagesProductInput/productInput/productInput", menuAuthority: "productInput" },
          { text: "功能检测", image: "https://www.xzxskj.com/xcximg/icon_luru@3x.png", path: "/pagesFuncCheck/funcCheck/funcCheck", menuAuthority: "funcCheck" },
          { text: "维修检测", image: "https://www.xzxskj.com/xcximg/icon_luru@3x.png", path: "/pagesMaintenanceInput/maintenanceInput/maintenanceInput", menuAuthority: "maintenanceInput" },
          { text: "拍照", image: "https://www.xzxskj.com/xcximg/icon_paizhao@3x.png", path: "/pagesTakePhoto/takePhoto/takePhoto", menuAuthority: "takePhoto" },
          { text: "成色判断", image: "https://www.xzxskj.com/xcximg/icon_chengse@3x.png", path: "/pagesFinenessJudge/finenessJudge/finenessJudge", menuAuthority: "finenessJudge" },
          { text: "定价上架", image: "https://www.xzxskj.com/xcximg/icon_shangjia@3x.png", path: "/pagesListingProduct/listingProduct/listingProduct", menuAuthority: "listingProduct" },
          { text: "库存管理", image: "https://www.xzxskj.com/xcximg/icon_kucun@3x.png", path: "/pagesInventoryManager/inventoryManager/inventoryManager", menuAuthority: "inventoryManager" },
          { text: "快速批发", image: "https://www.xzxskj.com/xcximg/icon_pifa@3x.png", path: "/pagesFirstWholesale/firstWholeSale/firstWholeSale", menuAuthority: "firstWholeSale" },
          { text: "串号追踪", image: "https://www.xzxskj.com/xcximg/icon_chuanhao@3x.png", path: "/pagesImeiTrack/ImeiTrack/imeiTrack", menuAuthority: "imeiTrack" },
          { text: "质检管理", image: "https://www.xzxskj.com/xcximg/icon_zhijian@3x.png", path: "/pagesQualityControl/qualityControl/qualityControl", menuAuthority: "qualityControl" }
        ]
      },
      {
        title: "后台管理",
        menuAuthority: "back",
        value: [
          { text: "员工岗位", image: "https://www.xzxskj.com/xcximg/icon_yuangong@3x.png", path: "/pagesStaffManager/staffManager/staffManager", menuAuthority: "staffManager" },
          { text: "收款账户", image: "https://www.xzxskj.com/xcximg/icon_shoukuan@3x.png", path: "", menuAuthority: "" },
          { text: "发货地址", image: "https://www.xzxskj.com/xcximg/icon_dizhi@3x.png", path: "", menuAuthority: "" },
          { text: "客服消息", image: "https://www.xzxskj.com/xcximg/icon_xiaoxi@3x.png", path: "", menuAuthority: "" },
          { text: "财务对账", image: "https://www.xzxskj.com/xcximg/icon_kehuguanli@3x.png", path: "/pagesFinance/finance/finance", menuAuthority: "finance" },
          { text: "客户管理", image: "https://www.xzxskj.com/xcximg/icon_kehuguanli@3x.png", path: "/pagesCustomManager/customManager/customManager", menuAuthority: "customManager" }
        ]
      },
      {
        title: "其他",
        menuAuthority: "",
        value: [
          { text: "平台客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png", menuAuthority: "" },
          { text: "意见反馈", image: "https://www.xzxskj.com/xcximg/icon_fankui@3x.png", menuAuthority: "" }
        ]
      }
    ]);
    const mine_card_datas = common_vendor.ref([
      {
        title: "销售订单",
        menuAuthority: "",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_daifukuan@3x.png", text: "待付款", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?order=3" },
          { image: "https://www.xzxskj.com/xcximg/icon_daifahuo@3x.png", text: "待发货", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?order=4" },
          { image: "https://www.xzxskj.com/xcximg/icon_daishouhuo@3x.png", text: "待收货", lx: "5", path: "/pagesCustomOrder/customOrder/customOrder?order=5" },
          { image: "https://www.xzxskj.com/xcximg/icon_yishouhou1@3x.png", text: "已收货", lx: "6", path: "/pagesCustomOrder/customOrder/customOrder?order=6" },
          { image: "https://www.xzxskj.com/xcximg/icon_jianyiwancheng@3x.png", text: "交易完成", lx: "7", path: "/pagesCustomOrder/customOrder/customOrder?order=7" }
        ],
        selected: false
      },
      {
        title: "议价订单",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_yijiazh@3x.png", text: "议价待确认", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?yj=2" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiacg@3x.png", text: "议价成功", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?yj=3" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiasb@3x.png", text: "驳回议价", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?yj=4" }
        ],
        selected: true
      },
      {
        title: "售后订单",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后中", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?sh=2" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png", text: "售后成功", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?sh=3" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后失败", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?sh=4" }
        ],
        selected: false
      },
      {
        title: "先货后款",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "未收款", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?fpak=1" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png", text: "以收款", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?fpak=2" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "以退货", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?fpak=3" }
        ],
        selected: false
      }
    ]);
    common_vendor.computed(() => {
      const selectedItem = mine_card_datas.value.find((item) => item.selected);
      return selectedItem ? selectedItem.values : [];
    });
    common_vendor.computed(() => {
      const selectedIndex = mine_card_datas.value.findIndex((item) => item.selected);
      if (selectedIndex === 1 || selectedIndex === 2 || selectedIndex === 3) {
        return {
          paddingLeft: "76rpx",
          paddingRight: "62rpx"
        };
      } else {
        return {};
      }
    });
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const gwname = common_vendor.ref();
    const gsname = common_vendor.ref();
    const username = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
      const from = option.from;
      if (from && from === "identity") {
        isShow.value = true;
      }
      console.log("customMine onLoad");
      userInfo.value = await stores_userInfoStore.useUserStore().getInfo();
      console.log("userInfo:", userInfo.value);
      let selectedMine = common_vendor.index.getStorageSync("selectedMine");
      let data = common_vendor.index.getStorageSync("identityData");
      userInfo.value.joininfos && userInfo.value.joininfos.length > 0 ? showSwitch.value = true : showSwitch.value = false;
      if (selectedMine) {
        gwname.value = data[selectedMine].company;
        gsname.value = data[selectedMine].text;
        username.value = data[selectedMine].username;
      }
      stores_tabStore.useTabStore().setCurrentTabIndex(4);
      permissionStore.loadMenuAuthority();
      console.log("menuAuthorityData:", permissionStore.menuAuthorityData);
    });
    const filteredOtherData = common_vendor.computed(() => {
      console.log("menuAuthorityData.value:", permissionStore.menuAuthorityData);
      return other_data.value.filter((item) => !item.menuAuthority || permissionStore.hasMenuAuthority(item.menuAuthority)).map((item) => ({
        ...item,
        value: item.value.filter((subItem) => !subItem.menuAuthority || permissionStore.hasMenuAuthority(subItem.menuAuthority))
        // 过滤子菜单项
      }));
    });
    common_vendor.index.$on("pagesAdminUpdate", async (e) => {
      console.log("admin onLoad");
      userInfo.value = await stores_userInfoStore.useUserStore().getInfo();
      console.log("userInfo:", userInfo.value);
      let selectedMine = common_vendor.index.getStorageSync("selectedMine");
      let data = common_vendor.index.getStorageSync("identityData");
      userInfo.value.joininfos && userInfo.value.joininfos.length > 0 ? showSwitch.value = true : showSwitch.value = false;
      if (selectedMine) {
        gwname.value = data[selectedMine].company;
        gsname.value = data[selectedMine].text;
      }
      stores_tabStore.useTabStore().setCurrentTabIndex(4);
      permissionStore.loadMenuAuthority();
      console.log("menuAuthorityData:", permissionStore.menuAuthorityData);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        e: common_vendor.t(common_vendor.unref(gsname)),
        f: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {} : {}, {
        g: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        h: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        i: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? common_vendor.e({
        j: common_vendor.unref(userInfo).img === "" ? "https://www.xzxskj.com/xcximg/132.jpg" : "https://www.xzxskj.com" + common_vendor.unref(userInfo).img,
        k: common_vendor.t(common_vendor.unref(username)),
        l: common_vendor.t(common_vendor.unref(gwname)),
        m: common_vendor.unref(showSwitch)
      }, common_vendor.unref(showSwitch) ? {
        n: common_vendor.o(openIdentity)
      } : {}) : {}, {
        o: common_vendor.unref(filteredOtherData)
      }, common_vendor.unref(filteredOtherData) ? {} : {}, {
        p: common_vendor.unref(filteredOtherData)
      }, common_vendor.unref(filteredOtherData) ? {
        q: common_vendor.o(($event) => goPage("/pagesDataCenter/dataCenter/dataCenter")),
        r: common_vendor.f(common_vendor.unref(data_center), (item, index, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: common_vendor.t(item.text),
            c: index
          };
        })
      } : {}, {
        s: common_vendor.unref(showIdentity)
      }, common_vendor.unref(showIdentity) ? {
        t: common_vendor.o(handleClose)
      } : {}, {
        v: common_vendor.sr(identityPopup, "cf6376e2-0", {
          "k": "identityPopup"
        }),
        w: common_vendor.o(handleClose),
        x: common_vendor.o(change),
        y: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cf6376e2"]]);
wx.createPage(MiniProgramPage);
