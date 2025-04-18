"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const utils_common = require("../../utils/common.js");
const api_recovery_recovery = require("../../api/recovery/recovery.js");
const utils_wxMapAPI = require("../../utils/wxMapAPI.js");
if (!Array) {
  const _easycom_uv_alert2 = common_vendor.resolveComponent("uv-alert");
  const _easycom_uv_scroll_list2 = common_vendor.resolveComponent("uv-scroll-list");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uv_alert2 + _easycom_uv_scroll_list2 + _component_van_swipe_cell + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_uv_alert = () => "../../uni_modules/uv-alert/components/uv-alert/uv-alert.js";
const _easycom_uv_scroll_list = () => "../../uni_modules/uv-scroll-list/components/uv-scroll-list/uv-scroll-list.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_alert + _easycom_uv_scroll_list + _easycom_z_paging + common_vendor.unref(editPannel) + _easycom_uni_popup + common_vendor.unref(tipsPannel) + common_vendor.unref(logPannel) + common_vendor.unref(batchPannel) + common_vendor.unref(tapEditPannel) + common_vendor.unref(servicePannel) + common_vendor.unref(joinUsPannel))();
}
const editPannel = () => "./components/edit-pannel.js";
const tipsPannel = () => "./components/tips-pannel.js";
const logPannel = () => "./components/log-pannel.js";
const batchPannel = () => "./components/batch-pannel.js";
const tapEditPannel = () => "./components/tap-edit.js";
const servicePannel = () => "./components/service-pannel.js";
const joinUsPannel = () => "./components/joinUs-pannel.js";
const _sfc_main = {
  __name: "recoveryDetail",
  setup(__props) {
    const qrCodeUrl = common_vendor.ref("https://www.xzxskj.com/logo/logo.jpg");
    const officialAccountPopup = common_vendor.ref(null);
    const isAdmin = common_vendor.ref(true);
    const selectData = common_vendor.ref();
    const title = common_vendor.ref("回收报价");
    const flid = common_vendor.ref("");
    const servicePannelPopup = common_vendor.ref(null);
    const editPannelPopup = common_vendor.ref(null);
    const showEditPannel = common_vendor.ref(false);
    const tipsPannelPopup = common_vendor.ref(null);
    const showTipsPannel = common_vendor.ref(false);
    const logPannelPopup = common_vendor.ref(null);
    const showLogPannel = common_vendor.ref(false);
    const batchPannelPopup = common_vendor.ref(null);
    const showBatchPannel = common_vendor.ref(false);
    const tapEditPannelPopup = common_vendor.ref(null);
    const showTapEditPannel = common_vendor.ref(false);
    common_vendor.ref({});
    utils_common.useShare({
      title: "自定义分享标题",
      path: getCurrentPages().pop().route,
      desc: "自定义分享描述"
    });
    const handleClose = () => {
      console.log("Popup is closed");
      editPannelPopup.value.close();
      tipsPannelPopup.value.close();
      logPannelPopup.value.close();
      batchPannelPopup.value.close();
      tapEditPannelPopup.value.close();
      servicePannelPopup.value.close();
      officialAccountPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showEditPannel.value = e.show;
        showTipsPannel.value = e.show;
        showLogPannel.value = e.show;
        showBatchPannel.value = e.show;
        showTapEditPannel.value = e.show;
      }
    };
    const openEditPannel = (item) => {
      selectData.value = item;
      showEditPannel.value = true;
      editPannelPopup.value.open();
    };
    const openTipsPannel = (item) => {
      selectData.value = item;
      showTipsPannel.value = true;
      tipsPannelPopup.value.open();
    };
    const openLogPannel = (item) => {
      selectData.value = item;
      showLogPannel.value = true;
      logPannelPopup.value.open();
    };
    const openBatchPannel = () => {
      showBatchPannel.value = true;
      batchPannelPopup.value.open();
    };
    const openTapEditPannel = () => {
      showTapEditPannel.value = true;
      tapEditPannelPopup.value.open();
    };
    const data = common_vendor.ref([
      // { name: '内存', values: ['8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G','8G+128G', '8G+128G', '8G+128G', '8G+128G'] },
      // { name: '版本', values: ['麒麟版', '骁龙版'] },
      // { name: '保修', values: ['过保', '有保'] },
      // { name: '网络', values: ['全网通'] },
      // { name: '颜色', values: ['可可茶金色', '普罗旺斯', '普罗旺斯', '普罗旺斯', '普罗旺斯', '梦幻罗兰', '梦幻罗兰'] }
    ]);
    const heightValue = common_vendor.computed(() => {
      return isAdmin.value ? "900rpx" : "1200rpx";
    });
    const showTips = common_vendor.computed(() => {
      const show1 = data.value.some((item) => item.name === "保修");
      console.log("show1", show1.value);
      return data.value.some((item) => item.name === "保修");
    });
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      await apiRecoveryListData();
      paging.value.complete(djlist.value);
      if (djlist.value.length === 0) {
        servicePannelPopup.value.open();
      }
    };
    const tipData = common_vendor.ref([
      { text: "导航", img: "https://www.xzxskj.com/xcximg/icon_daohang@3x.png" },
      { text: "微信", img: "https://www.xzxskj.com/xcximg/icon_weixin@3x.png" },
      { text: "拨打", img: "https://www.xzxskj.com/xcximg/icon_tel@3x.png" }
    ]);
    const selectedIndexes = common_vendor.ref();
    const selectCard = (index, indexInner) => {
      selectedIndexes.value[index] = indexInner;
      if (data.value[index].name === "内存") {
        param.value.nc = data.value[index].values[indexInner];
      }
      if (data.value[index].name === "版本") {
        param.value.bb = data.value[index].values[indexInner];
      }
      if (data.value[index].name === "保修") {
        param.value.bx = data.value[index].values[indexInner];
      }
      if (data.value[index].name === "网络") {
        param.value.wl = data.value[index].values[indexInner];
      }
      if (data.value[index].name === "颜色") {
        param.value.ys = data.value[index].values[indexInner];
      }
      paging.value.reload();
    };
    const clickBtn = (text) => {
      if (text === "微信") {
        officialAccountPopup.value.open();
      }
      if (text === "拨打") {
        common_vendor.index.makePhoneCall({
          phoneNumber: hssinfos.value.hskfdh
        });
      }
      if (text === "导航") {
        common_vendor.index.getLocation({
          type: "gcj02",
          success: async function(res) {
            res.latitude;
            res.longitude;
            const res1 = await utils_wxMapAPI.getLocationByAddress(hssinfos.value.adders);
            console.log("address res:", res1);
            common_vendor.index.openLocation({
              latitude: res1.latitude,
              longitude: res1.longitude,
              name: hssinfos.value.shopname,
              address: hssinfos.value.adders,
              success: function() {
                console.log("success");
              }
            });
          }
        });
      }
    };
    const bblist = common_vendor.ref([]);
    const djlist = common_vendor.ref([]);
    const nclist = common_vendor.ref([]);
    const yslist = common_vendor.ref([]);
    const hssinfos = common_vendor.ref(null);
    const param = common_vendor.ref({
      xhid: "",
      ppid: "",
      nc: "",
      bb: "",
      wl: "",
      ys: "",
      bx: "",
      start: "",
      delivery: common_vendor.index.getStorageSync("locationForm").fullLocation.split(" ").join(",")
    });
    const apiRecoveryListData = async () => {
      const res = await api_recovery_recovery.apiRecoveryList(param.value);
      if (res.code === 200) {
        bblist.value = res.bblist;
        djlist.value = res.djlist;
        nclist.value = res.nclist;
        yslist.value = res.yslist;
        hssinfos.value = res.hssinfos;
        if (hssinfos.value) {
          qrCodeUrl.value = "https://www.xzxskj.com" + hssinfos.value.imgs;
        }
        if (data.value.length === 0) {
          if (param.value.ppid === "1") {
            data.value = [
              { name: "内存", values: nclist.value.map((item) => item.name) },
              { name: "版本", values: bblist.value.map((item) => item.name) },
              { name: "保修", values: ["过保", "有保"] },
              { name: "网络", values: ["全网通"] },
              { name: "颜色", values: yslist.value.map((item) => item.name) }
            ];
          } else {
            data.value = [
              { name: "内存", values: nclist.value.map((item) => item.name) },
              { name: "版本", values: bblist.value.map((item) => item.name) },
              { name: "网络", values: ["全网通"] },
              { name: "颜色", values: yslist.value.map((item) => item.name) }
            ];
          }
          if (bblist.value[0].name === "") {
            data.value.splice(1, 1);
          }
          if (!selectedIndexes.value) {
            selectedIndexes.value = data.value.map(() => 0);
            data.value.forEach((item, index) => {
              if (item.name === "内存") {
                param.value.nc = item.values[0];
              }
              if (item.name === "版本") {
                param.value.bb = item.values[0];
              }
              if (item.name === "网络") {
                param.value.wl = item.values[0];
              }
              if (item.name === "颜色") {
                param.value.ys = item.values[0];
              }
              if (item.name === "保修") {
                param.value.bx = item.values[0];
              }
            });
          }
        }
      }
      console.log("Recovery list:", res);
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.index.$on("recoveryDetailRefresh", () => {
      paging.value.reload();
    });
    common_vendor.onLoad((options) => {
      console.log("options:", options);
      if (options.id) {
        param.value.xhid = options.id;
        param.value.ppid = options.ppid;
        flid.value = options.flid;
        title.value = options.name;
      }
      let selectedMine = common_vendor.index.getStorageSync("selectedMine");
      let data2 = common_vendor.index.getStorageSync("identityData");
      if (!selectedMine || !data2 || data2[selectedMine].gsid !== "0") {
        isAdmin.value = false;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.t(common_vendor.unref(title)),
        d: common_vendor.o(goBack),
        e: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        g: common_vendor.unref(data).length > 0
      }, common_vendor.unref(data).length > 0 ? common_vendor.e({
        h: showTips.value
      }, showTips.value ? {
        i: common_vendor.p({
          type: "warning",
          description: "提示:保修-有保大于40天",
          closable: true
        })
      } : {}, {
        j: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.values, (item1, indexInner, i1) => {
              return {
                a: common_vendor.t(item1),
                b: common_vendor.o(($event) => selectCard(index, indexInner), indexInner),
                c: common_vendor.unref(selectedIndexes)[index] === indexInner ? 1 : "",
                d: indexInner
              };
            }),
            c: "9b8080a0-1-" + i0,
            d: index
          };
        }),
        k: common_vendor.p({
          indicator: false
        })
      }) : {}, {
        l: common_vendor.unref(dataList).length > 0
      }, common_vendor.unref(dataList).length > 0 ? {} : {}, {
        m: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.djname),
            b: common_vendor.f(item.djbq.split(",").slice(1, -1), (item1, k1, i1) => {
              return {
                a: common_vendor.t(item1)
              };
            }),
            c: index,
            d: common_vendor.t(item.price),
            e: common_vendor.o(($event) => openTipsPannel(item), index),
            f: common_vendor.t(item.djms),
            g: common_vendor.o(($event) => openLogPannel(item), index),
            h: common_vendor.o(($event) => openEditPannel(item), index),
            i: "9b8080a0-3-" + i0 + ",9b8080a0-2",
            j: index
          };
        }),
        n: common_vendor.p({
          rightWidth: "118",
          disabled: !common_vendor.unref(isAdmin)
        }),
        o: common_vendor.unref(hssinfos)
      }, common_vendor.unref(hssinfos) ? {
        p: common_vendor.t(common_vendor.unref(hssinfos).adders),
        q: common_assets._imports_0$4,
        r: common_vendor.f(common_vendor.unref(tipData), (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.o(($event) => clickBtn(item.text), index),
            c: common_vendor.t(item.text),
            d: index
          };
        })
      } : {}, {
        s: common_vendor.sr(paging, "9b8080a0-2", {
          "k": "paging"
        }),
        t: common_vendor.o(queryList),
        v: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        w: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        x: common_vendor.unref(showEditPannel)
      }, common_vendor.unref(showEditPannel) ? {
        y: common_vendor.o(handleClose),
        z: common_vendor.p({
          selectData: common_vendor.unref(selectData)
        })
      } : {}, {
        A: common_vendor.sr(editPannelPopup, "9b8080a0-4", {
          "k": "editPannelPopup"
        }),
        B: common_vendor.o(handleClose),
        C: common_vendor.o(pannelChange),
        D: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        E: common_vendor.unref(showTipsPannel)
      }, common_vendor.unref(showTipsPannel) ? {
        F: common_vendor.o(handleClose),
        G: common_vendor.p({
          selectData: common_vendor.unref(selectData)
        })
      } : {}, {
        H: common_vendor.sr(tipsPannelPopup, "9b8080a0-6", {
          "k": "tipsPannelPopup"
        }),
        I: common_vendor.o(handleClose),
        J: common_vendor.o(pannelChange),
        K: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        L: common_vendor.unref(showLogPannel)
      }, common_vendor.unref(showLogPannel) ? {
        M: common_vendor.o(handleClose),
        N: common_vendor.p({
          selectData: common_vendor.unref(selectData)
        })
      } : {}, {
        O: common_vendor.sr(logPannelPopup, "9b8080a0-8", {
          "k": "logPannelPopup"
        }),
        P: common_vendor.o(handleClose),
        Q: common_vendor.o(pannelChange),
        R: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        S: common_vendor.unref(showBatchPannel)
      }, common_vendor.unref(showBatchPannel) ? {
        T: common_vendor.o(handleClose),
        U: common_vendor.p({
          param: common_vendor.unref(param),
          selectData: common_vendor.unref(selectData)
        })
      } : {}, {
        V: common_vendor.sr(batchPannelPopup, "9b8080a0-10", {
          "k": "batchPannelPopup"
        }),
        W: common_vendor.o(handleClose),
        X: common_vendor.o(pannelChange),
        Y: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        Z: common_vendor.unref(showTapEditPannel)
      }, common_vendor.unref(showTapEditPannel) ? {
        aa: common_vendor.o(handleClose),
        ab: common_vendor.p({
          name: common_vendor.unref(title),
          flid: common_vendor.unref(flid),
          ppid: common_vendor.unref(param).ppid
        })
      } : {}, {
        ac: common_vendor.sr(tapEditPannelPopup, "9b8080a0-12", {
          "k": "tapEditPannelPopup"
        }),
        ad: common_vendor.o(handleClose),
        ae: common_vendor.o(pannelChange),
        af: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area"]: false,
          type: "bottom"
        }),
        ag: common_vendor.o(handleClose),
        ah: common_vendor.sr(servicePannelPopup, "9b8080a0-14", {
          "k": "servicePannelPopup"
        }),
        ai: common_vendor.o(handleClose),
        aj: common_vendor.o(pannelChange),
        ak: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area"]: false,
          type: "center"
        }),
        al: common_vendor.p({
          qrCodeUrl: common_vendor.unref(qrCodeUrl)
        }),
        am: common_vendor.sr(officialAccountPopup, "9b8080a0-16", {
          "k": "officialAccountPopup"
        }),
        an: common_vendor.o(handleClose),
        ao: common_vendor.o(_ctx.change),
        ap: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "center"
        }),
        aq: heightValue.value,
        ar: common_vendor.unref(isAdmin)
      }, common_vendor.unref(isAdmin) ? {
        as: common_vendor.o(openTapEditPannel),
        at: common_vendor.o(openBatchPannel)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b8080a0"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
