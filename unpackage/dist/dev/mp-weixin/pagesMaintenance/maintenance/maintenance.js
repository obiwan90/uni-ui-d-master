"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const utils_common = require("../../utils/common.js");
const utils_system = require("../../utils/system.js");
const stores_tabStore = require("../../stores/tabStore.js");
const api_maintenance_maintenanceApi = require("../../api/maintenance/maintenanceApi.js");
const stores_tokenStore = require("../../stores/tokenStore.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uv_tabs2 + _easycom_uni_popup2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "maintenance",
  setup(__props) {
    const copy = (fhnrss) => {
      let result = "";
      for (const key in fhnrss) {
        if (fhnrss.hasOwnProperty(key)) {
          const item = fhnrss[key];
          result += `${item.names}：${item.values}，`;
        }
      }
      result = result.replace(/，/g, "，\n");
      utils_common.copyText(result);
    };
    common_vendor.ref(true);
    const searchInput = common_vendor.ref();
    const popup = common_vendor.ref(null);
    stores_tabStore.useTabStore();
    const cardColors = common_vendor.ref([]);
    const activeCard = common_vendor.ref(0);
    const classBid = common_vendor.ref();
    common_vendor.ref("0");
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const mainLScrollHeight = common_vendor.ref(0);
    const mainRScrollHeight = common_vendor.ref(0);
    const systemInfo = common_vendor.index.getSystemInfoSync();
    const rpx = 750 / systemInfo.windowWidth;
    const windowHeightRpx = systemInfo.windowHeight * rpx;
    const getScrollHeight = (selector, scrollRef) => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(selector).boundingClientRect((res) => {
        const scrollTop = res.top * rpx;
        scrollRef.value = Math.max(0, windowHeightRpx - scrollTop - 175);
      }).exec();
    };
    common_vendor.onMounted(() => {
      getScrollHeight(".main-l", mainLScrollHeight);
      getScrollHeight(".main-r", mainRScrollHeight);
    });
    common_vendor.onMounted(async () => {
      try {
        await Promise.all([
          getBrand(1),
          getmaintenanceHis(1)
        ]);
        getScrollHeight(".main-l", mainLScrollHeight);
        getScrollHeight(".main-r", mainRScrollHeight);
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
      }
    });
    const openDialog = () => {
      common_vendor.index.showModal({
        title: "温馨提示",
        content: "所有查询结果仅供参考，若查询结果与官网不一致，则以官网为准；查询结果无法作为权威质检证明，且不具备任何法律效力。",
        showCancel: false,
        confirmText: "确定",
        confirmColor: "#FF7744"
      });
    };
    const scanCode = () => {
      common_vendor.index.scanCode({
        scanType: ["barCode"],
        success: function(res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
          switch (res.scanType) {
            case "QR_CODE":
              break;
            case "EAN_13":
              break;
            case "barCode":
              break;
            case "datamatrix":
              break;
            case "pdf417":
              break;
            default:
              res.scanType;
          }
          searchInput.value = res.result;
        }
      });
    };
    const userInfo = common_vendor.ref();
    const classA = common_vendor.ref();
    const classB = common_vendor.ref();
    const checkResult = common_vendor.ref();
    const checkList = common_vendor.ref([]);
    const queryHis = common_vendor.ref();
    const queryHisList = common_vendor.ref([]);
    const getBrand = async (classId) => {
      const data = {
        brand_id: classId,
        //默认1
        opid: stores_tokenStore.useTokenStore().opid
      };
      const res = await api_maintenance_maintenanceApi.apiGetBrand(data);
      userInfo.value = res.allinfos;
      classA.value = res.ejlists;
      classB.value = res.navlist;
      classBid.value = classB.value[0].id;
    };
    const getmaintenanceHis = async (classId) => {
      common_vendor.index.getStorageSync("queryMaintenanceHisList");
      const data = {
        opid: stores_tokenStore.useTokenStore().opid
      };
      queryHis.value = await api_maintenance_maintenanceApi.apiGetmaintenanceHis(data);
      const querlists = queryHis.value && queryHis.value.querlists;
      if (!querlists) {
        queryHisList.value = null;
        return [];
      }
      queryHisList.value = querlists;
    };
    const cheackMaintenance = async () => {
      common_vendor.index.showLoading({
        title: "Loading",
        mask: true
      });
      if (!searchInput.value) {
        common_vendor.index.showModal({
          content: "请输入序列号或者条形码",
          showCancel: false,
          confirmText: "确定"
        });
        common_vendor.index.hideLoading();
        return;
      }
      const data = {
        word: searchInput.value,
        lxid: classBid.value,
        opid: stores_tokenStore.useTokenStore().opid
      };
      checkResult.value = await api_maintenance_maintenanceApi.apiCheackMaintenance(data);
      if (checkResult.value.code !== "200") {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "未查询到内容",
          icon: "error",
          duration: 2e3
        });
      }
      console.log("checkResult", JSON.stringify(checkResult.value));
      checkList.value = infosArray();
      console.log("checkList", JSON.stringify(checkList.value));
      common_vendor.index.hideLoading();
    };
    const handleInput2 = utils_debounce.debounce(cheackMaintenance, 500);
    const infosArray = () => {
      const infos = checkResult.value && checkResult.value.infos;
      if (!infos) {
        checkResult.value = null;
        return [];
      }
      return Object.keys(infos).map((key) => ({
        id: key,
        // 将键存储为id
        ...infos[key]
      }));
    };
    const onChange = (e) => {
      console.log("切换了.." + e.index);
      e.index;
      getBrand(classA.value[e.index].id);
    };
    const changeCardColor = (index) => {
      cardColors.value[index] = "linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)";
      if (activeCard.value !== index) {
        cardColors.value[activeCard.value] = "#ffffff";
      }
      cardColors.value = [...cardColors.value];
      activeCard.value = index;
      classBid.value = classB.value[index].id;
      getmaintenanceHis(classBid.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.o(goBack),
        d: common_vendor.o(openDialog),
        e: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        g: common_vendor.unref(searchInput),
        h: common_vendor.o(($event) => common_vendor.isRef(searchInput) ? searchInput.value = $event.detail.value : null),
        i: common_vendor.o(scanCode),
        j: common_vendor.o((...args) => common_vendor.unref(handleInput2) && common_vendor.unref(handleInput2)(...args)),
        k: common_vendor.o(onChange),
        l: common_vendor.p({
          list: common_vendor.unref(classA),
          lineWidth: "30",
          lineColor: "#f56c6c",
          fontSize: 32,
          activeStyle: {
            fontWeight: "bold",
            color: "#303133"
          },
          inactiveStyle: {
            color: "#606266"
          }
        }),
        m: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        n: common_vendor.t(common_vendor.unref(userInfo).price)
      } : {}, {
        o: common_vendor.f(common_vendor.unref(classB), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.free),
            c: common_vendor.t(item.price),
            d: index,
            e: index === common_vendor.unref(activeCard) ? "linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)" : "#ffffff",
            f: common_vendor.o(($event) => changeCardColor(index), index)
          };
        }),
        p: common_vendor.unref(mainLScrollHeight) + "rpx",
        q: common_vendor.unref(checkResult) || common_vendor.unref(queryHisList)
      }, common_vendor.unref(checkResult) || common_vendor.unref(queryHisList) ? common_vendor.e({
        r: common_vendor.unref(checkResult)
      }, common_vendor.unref(checkResult) ? {
        s: common_vendor.t(common_vendor.unref(checkResult).cxmc),
        t: common_vendor.t(common_vendor.unref(checkResult).cxsj),
        v: common_vendor.f(common_vendor.unref(checkList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.names),
            b: common_vendor.t(item.values),
            c: item.id
          };
        })
      } : {}, {
        w: common_vendor.unref(queryHisList)
      }, common_vendor.unref(queryHisList) ? {
        x: common_vendor.f(common_vendor.unref(queryHisList), (item1, index, i0) => {
          return {
            a: common_vendor.t(item1.cxmc),
            b: common_vendor.o(($event) => copy(item1.fhnrss), index),
            c: common_vendor.t(item1.timess),
            d: common_vendor.f(item1.fhnrss, (item2, index2, i1) => {
              return {
                a: common_vendor.t(item2.names),
                b: common_vendor.t(item2.values),
                c: index2
              };
            }),
            e: index
          };
        })
      } : {}, {
        y: common_vendor.unref(mainRScrollHeight) + "rpx"
      }) : {}, {
        z: common_vendor.o((...args) => _ctx.share && _ctx.share(...args)),
        A: common_vendor.sr(popup, "481b50bf-1", {
          "k": "popup"
        }),
        B: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-481b50bf"]]);
wx.createPage(MiniProgramPage);
