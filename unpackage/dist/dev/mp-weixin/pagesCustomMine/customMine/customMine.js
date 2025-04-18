"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
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
  __name: "customMine",
  setup(__props) {
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const tabStore = stores_tabStore.useTabStore();
    const userStore = stores_userInfoStore.useUserStore();
    const isShow = common_vendor.ref(false);
    const userInfo = common_vendor.ref(null);
    const showSwitch = common_vendor.ref(false);
    const showIdentity = common_vendor.ref(false);
    const identityPopup = common_vendor.ref(null);
    const gwname = common_vendor.ref("");
    const gsname = common_vendor.ref("");
    const username = common_vendor.ref("");
    const triggered = common_vendor.ref(false);
    let _freshing = false;
    const data_center = common_vendor.ref([
      { text: "实时库存", value: "0" },
      { text: "实时销量", value: "0" },
      { text: "实时售额", value: "0" },
      { text: "今日上架", value: "0" }
    ]);
    const other_data = common_vendor.ref([
      {
        title: "商品管理",
        menuAuthority: "productManager",
        value: [
          { text: "商品录入", image: "https://www.xzxskj.com/xcximg/icon_luru12@3x.png", path: "/pagesProductInput/productInput/productInput", menuAuthority: "productInput" },
          { text: "功能检测", image: "https://www.xzxskj.com/xcximg/icon_zhijian1@3x.png", path: "/pagesFuncCheck/funcCheck/funcCheck", menuAuthority: "funcCheck" },
          { text: "维修检测", image: "https://www.xzxskj.com/xcximg/icon_weixin12@3x.png", path: "/pagesMaintenanceInput/maintenanceInput/maintenanceInput", menuAuthority: "maintenanceInput" },
          { text: "成色判断", image: "https://www.xzxskj.com/xcximg/icon_chengse@3x.png", path: "/pagesFinenessJudge/finenessJudge/finenessJudge", menuAuthority: "finenessJudge" },
          { text: "拍照上传", image: "https://www.xzxskj.com/xcximg/icon_paizhao12@3x.png", path: "/pagesTakePhoto/takePhoto/takePhoto", menuAuthority: "takePhoto" },
          { text: "定价上架", image: "https://www.xzxskj.com/xcximg/icon_shangjia@3x.png", path: "/pagesListingProduct/listingProduct/listingProduct", menuAuthority: "listingProduct" },
          { text: "库存管理", image: "https://www.xzxskj.com/xcximg/icon_kucun@3x.png", path: "/pagesInventoryManager/inventoryManager/inventoryManager", menuAuthority: "inventoryManager" },
          { text: "质检管理", image: "https://www.xzxskj.com/xcximg/icon_zhijian@3x.png", path: "/pagesQualityControl/qualityControl/qualityControl", menuAuthority: "qualityControl" },
          { text: "串号追踪", image: "https://www.xzxskj.com/xcximg/icon_chuanhao12@3x.png", path: "/pagesImeiTrack/ImeiTrack/imeiTrack", menuAuthority: "imeiTrack" },
          { text: "商品移库", image: "https://www.xzxskj.com/xcximg/icon_yiku@3x.png", path: "/pagesMovingInventory/movingInventory/movingInventory", menuAuthority: "productRelocation" },
          { text: "快速批发", image: "https://www.xzxskj.com/xcximg/icon_pifa12@3x.png", path: "/pagesFirstWholesale/firstWholeSale/firstWholeSale", menuAuthority: "firstWholeSale" }
        ]
      },
      {
        title: "后台管理",
        menuAuthority: "back",
        value: [
          { text: "员工岗位", image: "https://www.xzxskj.com/xcximg/icon_yuangong@3x.png", path: "/pagesStaffManager/staffManager/staffManager", menuAuthority: "staffManager" },
          { text: "仓库管理", image: "https://www.xzxskj.com/xcximg/icon_cangku12@3x.png", path: "/pagesWarehouseManagement/warehouseManagement/warehouseManagement", menuAuthority: "warehouseManagement" },
          { text: "客户管理", image: "https://www.xzxskj.com/xcximg/icon_kehuguanli@3x.png", path: "/pagesCustomManager/customManager/customManager", menuAuthority: "customManager" },
          { text: "退款审核", image: "https://www.xzxskj.com/xcximg/approval.png", path: "/pagesApproval/approval/approval", menuAuthority: "refundReview", num: "0" },
          { text: "财务对账", image: "https://www.xzxskj.com/xcximg/icon_duizhang@3x.png", path: "/pagesFinance/finance/finance", menuAuthority: "finance" },
          { text: "收款账户", image: "https://www.xzxskj.com/xcximg/icon_shoukuan12@3x.png", path: "/pagesPayAccount/payAccount/payAccount", menuAuthority: "receivingAccount" },
          { text: "发货地址", image: "https://www.xzxskj.com/xcximg/icon_dizhi@3x.png", path: "/pagesShippingAddress/shippingAddress/shippingAddress", menuAuthority: "shippingAddress" }
        ]
      },
      {
        title: "其他",
        value: [
          { text: "平台客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png", menuAuthority: "" },
          { text: "意见反馈", image: "https://www.xzxskj.com/xcximg/icon_fankui@3x.png", path: "/pagesSuggest/suggest/suggest?title=意见反馈", menuAuthority: "" }
        ]
      }
    ]);
    const mine_card_datas = common_vendor.ref([
      {
        title: "销售订单",
        menuAuthority: "saleOrder",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_daifukuan@3x.png", text: "待付款", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?order=3", menuAuthority: "pendingPayment", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_daifahuo@3x.png", text: "待发货", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?order=4", menuAuthority: "pendingShipment", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_daishouhuo@3x.png", text: "待收货", lx: "5", path: "/pagesCustomOrder/customOrder/customOrder?order=5", menuAuthority: "pendingReceipt", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yishouhou1@3x.png", text: "已收货", lx: "6", path: "/pagesCustomOrder/customOrder/customOrder?order=6", menuAuthority: "receivedGoods", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_jianyiwancheng@3x.png", text: "交易完成", lx: "7", path: "/pagesCustomOrder/customOrder/customOrder?order=7", menuAuthority: "dealDone", num: "0" }
        ],
        selected: true
      },
      {
        title: "议价订单",
        menuAuthority: "yjOrder",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_yijiazh@3x.png", text: "议价待确认", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?yj=2", menuAuthority: "yjToBeConfirmed", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiacg@3x.png", text: "议价成功", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?yj=3", menuAuthority: "yjSuccessfully", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_yijiasb@3x.png", text: "驳回议价", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?yj=4", menuAuthority: "rejectBargaining", num: "0" }
        ],
        selected: false
      },
      {
        title: "售后订单",
        menuAuthority: "serviceOrder",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后中", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?sh=2", menuAuthority: "serviceIng", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png", text: "售后成功", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?sh=3", menuAuthority: "serviceSuccess", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "售后失败", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?sh=4", menuAuthority: "serviceFail", num: "0" }
        ],
        selected: false
      },
      {
        title: "先货后款",
        menuAuthority: "fpbkOrder",
        num: "0",
        values: [
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "未收款", lx: "2", path: "/pagesCustomOrder/customOrder/customOrder?fpak=1", menuAuthority: "unpaidPayments", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png", text: "已收款", lx: "3", path: "/pagesCustomOrder/customOrder/customOrder?fpak=2", menuAuthority: "receivedPayment", num: "0" },
          { image: "https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png", text: "已退货", lx: "4", path: "/pagesCustomOrder/customOrder/customOrder?fpak=3", menuAuthority: "returnedProduct", num: "0" }
        ],
        selected: false
      }
    ]);
    const currentValues = common_vendor.computed(() => {
      const selectedItem = filteredMineCardDatas.value.find((item) => item.selected);
      return selectedItem ? selectedItem.values : [];
    });
    const contentPadding = common_vendor.computed(() => {
      const selectedItem = filteredMineCardDatas.value.find((item) => item.selected);
      console.log("selectedItem.length<4", selectedItem.length < 4);
      return selectedItem.values.length < 4 ? { paddingLeft: "76rpx", paddingRight: "62rpx" } : {};
    });
    const filterFundManagement = common_vendor.computed(() => permissionStore.hasMenuAuthority("supplier"));
    const filterDataCenter = common_vendor.computed(() => permissionStore.hasMenuAuthority("dataCenter"));
    const filteredOtherData = common_vendor.computed(() => {
      return other_data.value.filter((item) => !item.menuAuthority || permissionStore.hasMenuAuthority(item.menuAuthority)).map((item) => ({
        ...item,
        value: item.value.filter((subItem) => !subItem.menuAuthority || permissionStore.hasMenuAuthority(subItem.menuAuthority))
      }));
    });
    const beforeleave = () => {
      isShow.value = false;
      common_vendor.index.navigateBack({
        delta: getCurrentPages().length - 1
      });
    };
    const handleClose = () => {
      identityPopup.value.close();
    };
    const openIdentity = () => {
      showIdentity.value = true;
      identityPopup.value.open();
    };
    const toggleSelected = (selectedItem) => {
      mine_card_datas.value.forEach((item) => {
        item.selected = item.title === selectedItem.title;
      });
      mine_card_datas.value = [...mine_card_datas.value];
      console.log("Updated mine_card_datas", mine_card_datas.value);
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({ url: path });
    };
    const onPulling = (e) => {
      if (e.detail.deltaY < 0)
        return;
      triggered.value = true;
    };
    const onRefresh = async () => {
      if (_freshing)
        return;
      _freshing = true;
      userInfo.value = await userStore.getInfo();
      const infos = common_vendor.index.getStorageSync("infos");
      if (infos) {
        updateMineCardData(infos);
        updateOtherData(infos);
      }
      updateUIElements();
      setTimeout(() => {
        triggered.value = false;
        _freshing = false;
      }, 1e3);
    };
    const onRestore = () => {
      triggered.value = false;
    };
    const updateMineCardData = (infos) => {
      const mineCardUpdates = [
        { title: "销售订单", field: "zordernum", subfields: [{ index: 1, field: "dfh" }] },
        { title: "议价订单", field: "zyjordernum", subfields: [{ index: 0, field: "yjz" }] },
        { title: "售后订单", field: "zshordernum", subfields: [{ index: 0, field: "shz" }] },
        { title: "先货后款", field: "zxhhkordernum", subfields: [{ index: 0, field: "wsk" }] }
      ];
      mineCardUpdates.forEach((update) => {
        const item = mine_card_datas.value.find((i) => i.title === update.title);
        if (item) {
          item.num = infos[update.field];
          update.subfields.forEach((subfield) => {
            item.values[subfield.index].num = infos[subfield.field];
          });
        }
      });
    };
    const updateOtherData = (infos) => {
      const menu1 = other_data.value.find((item) => item.title === "后台管理");
      if (menu1) {
        menu1.value[3].num = infos.cwtknum;
      }
      data_center.value[0].value = infos.goodsnum;
      data_center.value[3].value = infos.jrnum;
      data_center.value[1].value = infos.ssnum;
      data_center.value[2].value = infos.ssprice;
    };
    const updateUIElements = () => {
      const selectedMine = common_vendor.index.getStorageSync("selectedMine");
      common_vendor.index.getStorageSync("identityData");
      if (userInfo.value.joininfos && userInfo.value.joininfos.length > 0) {
        showSwitch.value = true;
      } else {
        showSwitch.value = false;
      }
      if (selectedMine) {
        gwname.value = userInfo.value.joininfos[selectedMine - 1].gwname;
        gsname.value = userInfo.value.joininfos[selectedMine - 1].gsname;
        username.value = userInfo.value.joininfos[selectedMine - 1].username;
      }
      permissionStore.loadMenuAuthority();
      const userAuthorityUrls = common_vendor.index.getStorageSync("userAuthorityUrls");
      if (userAuthorityUrls.route.length === 0) {
        common_vendor.index.showToast({
          title: "您没有权限",
          icon: "error",
          duration: 2e3
        });
        setTimeout(() => {
          const db = common_vendor.Vs.database();
          db.collection("user-setting").where({ user_id: JSON.parse(common_vendor.index.getStorageSync("userInfo")).id }).remove().then(() => {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({
              url: "/pages/home/home"
            });
          });
        }, 500);
      }
    };
    const filteredMineCardDatas = common_vendor.computed(() => {
      console.log("权限：", permissionStore.menuAuthorityData);
      console.log("过滤前mine_card_datas", mine_card_datas.value);
      const filteredData = mine_card_datas.value.filter((item) => !item.menuAuthority || permissionStore.hasMenuAuthority(item.menuAuthority)).map((item) => ({
        ...item,
        values: item.values.filter((subItem) => !subItem.menuAuthority || permissionStore.hasMenuAuthority(subItem.menuAuthority))
      }));
      const hasSelected = filteredData.some((item) => item.selected);
      if (!hasSelected && filteredData.length > 0) {
        filteredData[0].selected = true;
      }
      console.log("过滤后mine_card_datas", filteredData);
      return filteredData;
    });
    let timer = null;
    const startTimer = () => {
      timer = setInterval(async () => {
        userInfo.value = await userStore.getInfo();
        const infos = common_vendor.index.getStorageSync("infos");
        if (infos) {
          updateMineCardData(infos);
          updateOtherData(infos);
        }
        updateUIElements();
      }, 5e3);
    };
    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        console.log("定时器已停止");
      }
    };
    common_vendor.onLoad(async (option) => {
      if (option.from && option.from === "identity") {
        isShow.value = true;
      }
      userInfo.value = await userStore.getInfo();
      const infos = common_vendor.index.getStorageSync("infos");
      if (infos) {
        updateMineCardData(infos);
        updateOtherData(infos);
      }
      updateUIElements();
      tabStore.setCurrentTabIndex(4);
    });
    common_vendor.onShow(() => {
      tabStore.setCurrentTabIndex(4);
      startTimer();
    });
    common_vendor.onUnload(() => {
      stopTimer();
    });
    common_vendor.onHide(() => {
      stopTimer();
    });
    common_vendor.index.$on("pagesCustomMineUpdate", async () => {
      userInfo.value = await userStore.getInfo();
      updateUIElements();
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
        f: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        g: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        h: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? common_vendor.e({
        i: common_vendor.unref(userInfo).img === "" ? "https://www.xzxskj.com/xcximg/132.jpg" : "https://www.xzxskj.com" + common_vendor.unref(userInfo).img,
        j: common_vendor.t(common_vendor.unref(username)),
        k: common_vendor.t(common_vendor.unref(gwname)),
        l: common_vendor.unref(showSwitch)
      }, common_vendor.unref(showSwitch) ? {
        m: common_vendor.o(openIdentity)
      } : {}) : {}, {
        n: filterFundManagement.value
      }, filterFundManagement.value ? {
        o: common_vendor.o(($event) => goPage("/pagesAccount/account/account?from=customer"))
      } : {}, {
        p: filterDataCenter.value
      }, filterDataCenter.value ? {
        q: common_vendor.o(($event) => goPage("/pagesDataCenter/dataCenter/dataCenter")),
        r: common_vendor.f(common_vendor.unref(data_center), (item, index, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: common_vendor.t(item.text),
            c: index
          };
        })
      } : {}, {
        s: filteredMineCardDatas.value && filteredMineCardDatas.value.length > 0
      }, filteredMineCardDatas.value && filteredMineCardDatas.value.length > 0 ? {
        t: common_vendor.f(filteredMineCardDatas.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.selected ? 1 : "",
            c: "10a13d1a-0-" + i0,
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
            f: common_vendor.o(($event) => toggleSelected(item), index)
          };
        }),
        v: common_vendor.f(currentValues.value, (item1, index, i0) => {
          return {
            a: item1.image,
            b: "10a13d1a-1-" + i0,
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
        w: common_vendor.s(contentPadding.value)
      } : {}, {
        x: filteredOtherData.value && filteredOtherData.value.length > 0
      }, filteredOtherData.value && filteredOtherData.value.length > 0 ? {
        y: common_vendor.f(filteredOtherData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.value, (item1, index2, i1) => {
              return common_vendor.e({
                a: item1.image,
                b: "10a13d1a-2-" + i0 + "-" + i1,
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
                e: item1.text === "平台客服"
              }, item1.text === "平台客服" ? {
                f: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), index2)
              } : {}, {
                g: index2,
                h: common_vendor.o(($event) => goPage(item1.path), index2)
              });
            }),
            c: index
          };
        })
      } : {}, {
        z: common_vendor.unref(triggered),
        A: common_vendor.o(onPulling),
        B: common_vendor.o(onRefresh),
        C: common_vendor.o(onRestore),
        D: common_vendor.unref(showIdentity)
      }, common_vendor.unref(showIdentity) ? {
        E: common_vendor.o(handleClose)
      } : {}, {
        F: common_vendor.sr(identityPopup, "10a13d1a-3", {
          "k": "identityPopup"
        }),
        G: common_vendor.o(handleClose),
        H: common_vendor.o(_ctx.change),
        I: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-10a13d1a"]]);
wx.createPage(MiniProgramPage);
