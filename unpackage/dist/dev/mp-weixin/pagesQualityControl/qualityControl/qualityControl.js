"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const api_qualityControl_qualityControl = require("../../api/qualityControl/qualityControl.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_overlay + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_z_paging + common_vendor.unref(qualitySaixuan) + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const qualitySaixuan = () => "./components/qualitySaixuan.js";
const _sfc_main = {
  __name: "qualityControl",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const myInputRef = common_vendor.ref(null);
    const scan = async () => {
      showLoading();
      try {
        const result = await utils_common.scanCode();
        console.log("result", result);
        if (result) {
          handleInput(result).then(() => {
            if (orgArray.value.length > 0) {
              myInputRef.value.inputText = orgArray.value[0].ch;
            }
          });
        }
      } catch (error) {
        console.error("扫码失败：", error);
      } finally {
        hideLoading();
      }
    };
    const showLoading = () => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
    };
    const hideLoading = () => {
      common_vendor.index.hideLoading();
    };
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const saixuanPannelPopup = common_vendor.ref(null);
    const showSaiXuan = common_vendor.ref(false);
    const handleClose = () => {
      console.log("Popup is closed");
      saixuanPannelPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showSaiXuan.value = e.show;
      }
    };
    const selectSaiXuan = () => {
      showSaiXuan.value = true;
      saixuanPannelPopup.value.open();
    };
    common_vendor.ref(null);
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiQualityControlListData(param);
      console.log("data:", data);
      paging.value.complete(data);
    };
    const orgArray = common_vendor.ref([]);
    const handleInput = async (inputText) => {
      if (inputText.length > 0) {
        common_vendor.index.showLoading({
          title: "加载中....",
          mask: true
        });
        console.log("inputText", inputText);
        param.value.ch = inputText;
        const data = await apiQualityControlListData(param);
        console.log("search data", data);
        orgArray.value = data;
        common_vendor.index.hideLoading();
      }
    };
    const selectSearchChange = (e) => {
      if (e) {
        console.log("selectSearchChange e:", e);
        paging.value.complete([e]);
      }
    };
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月"]);
    const filteredTimeCardData = common_vendor.computed(() => timeCardData.value.filter((item, index) => index !== 4));
    const timeRange = common_vendor.ref("时间区间");
    const selectedIndex = common_vendor.ref(0);
    const selectCard = (index) => {
      selectedIndex.value = index;
      showDropdown.value = false;
      showTimeRange.value = false;
      param.value.lx = index + 1;
      paging.value.reload(true);
    };
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("截止时间");
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
    };
    const showTimeRange = common_vendor.ref(false);
    const showDropdown = common_vendor.ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      showTimeRange.value = true;
      selectedIndex.value = -1;
    };
    const btnData = common_vendor.ref(["修改日志", "查看报告"]);
    const handleBtnClick = (btn, item) => {
      console.log("Button clicked:", btn);
      if (btn === "修改日志") {
        common_vendor.index.navigateTo({
          url: "/pagesEditLog/editLog/editLog?id=" + item.id
        });
      }
      if (btn === "查看报告") {
        common_vendor.index.navigateTo({
          url: "/pagesQualityReport/qualityReport/qualityReport?ch=" + item.ch
        });
      }
    };
    common_vendor.ref(false);
    const triggerHeight = common_vendor.ref(0);
    const triggerTop = common_vendor.ref(0);
    const triggerLeft = common_vendor.ref(0);
    const showMenuDropdownArray = common_vendor.ref([]);
    const menuBtn = common_vendor.ref([
      { text: "商品录入", image: "https://www.xzxskj.com/xcximg/icon_luru@3x.png", path: "/pagesProductInput/productInput/productInput?from=QC", menuAuthority: "productInput" },
      { text: "功能检测", image: "https://www.xzxskj.com/xcximg/icon_gnjc@3x.png", path: "/pagesFuncCheck/funcCheck/funcCheck?from=QC", menuAuthority: "funcCheck" },
      { text: "维修检测", image: "https://www.xzxskj.com/xcximg/icon_wxjc@3x.png", path: "/pagesMaintenanceInput/maintenanceInput/maintenanceInput?from=QC", menuAuthority: "maintenanceInput" },
      { text: "图片修改", image: "https://www.xzxskj.com/xcximg/icon_luru@3x.png", path: "/pagesTakePhoto/takePhoto/takePhoto?from=QC", menuAuthority: "takePhoto" },
      { text: "成色判断", image: "https://www.xzxskj.com/xcximg/icon_gnjc@3x.png", path: "/pagesFinenessJudge/finenessJudge/finenessJudge?from=QC", menuAuthority: "finenessJudge" },
      { text: "修改价格", image: "https://www.xzxskj.com/xcximg/icon_wxjc@3x.png", path: "/pagesListingProduct/listingProduct/listingProduct?from=QC", menuAuthority: "listingProduct" }
    ]);
    const toggleMenuDropdown = (index) => {
      showMenuDropdownArray.value[index] = !showMenuDropdownArray.value[index];
      getTriggerPosition(index);
    };
    const getTriggerPosition = (index) => {
      common_vendor.nextTick$1(() => {
        const query = common_vendor.index.createSelectorQuery();
        query.select("#dropdown-trigger" + index).boundingClientRect().exec((res) => {
          triggerTop.value = res[0].top;
          triggerHeight.value = res[0].height;
          triggerLeft.value = res[0].left;
          console.log("triggerTop:", triggerTop.value);
          console.log("triggerHeight:", triggerHeight.value);
          console.log("triggerLeft:", triggerLeft.value);
        });
      });
    };
    const onClickHide = () => {
      showMenuDropdownArray.value.forEach((_, index) => {
        showMenuDropdownArray.value[index] = false;
      });
    };
    const param = common_vendor.ref({
      lx: "1",
      startTime: "",
      endTime: "",
      cgyid: "",
      wxjcid: "",
      gnjcid: "",
      splrid: "",
      start: 0,
      ch: ""
    });
    const cgyglist = common_vendor.ref([]);
    const gnjcarrays = common_vendor.ref([]);
    const splrarrays = common_vendor.ref([]);
    const wxjcarrays = common_vendor.ref([]);
    const gnjccount = common_vendor.ref(0);
    const splrcount = common_vendor.ref(0);
    const wxjccount = common_vendor.ref(0);
    const apiQualityControlListData = async (param2) => {
      const res = await api_qualityControl_qualityControl.apiQualityControlList(param2.value);
      console.log("res:", res);
      if (res.zt === 1) {
        cgyglist.value = res.cgyglist;
        gnjcarrays.value = res.gnjcarrays;
        splrarrays.value = res.splrarrays;
        wxjcarrays.value = res.wxjcarrays;
        gnjccount.value = res.gnjccount;
        splrcount.value = res.splrcount;
        wxjccount.value = res.wxjccount;
        return res.lists;
      } else {
        return [];
      }
    };
    const actionHandle = (item1, ch) => {
      common_vendor.index.navigateTo({
        url: item1.path + "&ch=" + ch
      });
    };
    common_vendor.onMounted(() => {
      showMenuDropdownArray.value = new Array(12).fill(false);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: common_vendor.sr(myInputRef, "ca9af8b1-2,ca9af8b1-0", {
          "k": "myInputRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectSearchChange),
        e: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "搜索串号",
          searchKey: "name",
          showBorder: false,
          disabled: false,
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField)
        }),
        f: common_vendor.o(scan),
        g: common_vendor.o(selectSaiXuan),
        h: common_vendor.f(common_vendor.unref(filteredTimeCardData), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectCard(index), index),
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: index
          };
        }),
        i: common_vendor.t(common_vendor.unref(timeRange)),
        j: common_vendor.o(toggleDropdown),
        k: common_vendor.unref(showTimeRange) ? 1 : "",
        l: common_vendor.t(common_vendor.unref(pickerStartValue)),
        m: common_vendor.o(onTimeChange1),
        n: common_vendor.unref(pickerStartValue),
        o: common_vendor.t(common_vendor.unref(pickerLastValue)),
        p: common_vendor.o(onTimeChange2),
        q: common_vendor.unref(pickerLastValue),
        r: common_vendor.unref(showDropdown),
        s: common_vendor.unref(showDropdown) ? 1 : "",
        t: common_vendor.unref(permissionStore).hasMenuAuthority("qualityData")
      }, common_vendor.unref(permissionStore).hasMenuAuthority("qualityData") ? {
        v: common_vendor.t(common_vendor.unref(splrcount)),
        w: common_vendor.t(common_vendor.unref(gnjccount)),
        x: common_vendor.t(common_vendor.unref(wxjccount))
      } : {}, {
        y: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(common_vendor.unref(utils_common.formatTimestamp)(item.servicetime)),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.ch),
            d: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(item.ch), index),
            e: common_vendor.t(item.cgyname),
            f: common_vendor.t(item.splr),
            g: common_vendor.t(item.gnjcname),
            h: common_vendor.t(item.wxjcname)
          }, common_vendor.unref(permissionStore).hasMenuAuthority("updateQuality") ? {
            i: "dropdown-trigger" + index,
            j: common_vendor.o(($event) => toggleMenuDropdown(index), index)
          } : {}, {
            k: common_vendor.f(common_vendor.unref(menuBtn), (item1, index2, i1) => {
              return {
                a: item1.image,
                b: common_vendor.t(item1.text),
                c: index2,
                d: common_vendor.o(($event) => actionHandle(item1, item.ch), index2)
              };
            }),
            l: common_vendor.o(onClickHide, index),
            m: "ca9af8b1-4-" + i0 + ",ca9af8b1-3",
            n: common_vendor.p({
              show: common_vendor.unref(showMenuDropdownArray)[index]
            }),
            o: common_vendor.f(common_vendor.unref(btnData), (item4, index2, i1) => {
              return {
                a: common_vendor.t(item4),
                b: index2,
                c: common_vendor.o(($event) => handleBtnClick(item4, item), index2)
              };
            }),
            p: index
          });
        }),
        z: common_vendor.unref(permissionStore).hasMenuAuthority("updateQuality"),
        A: `${common_vendor.unref(triggerLeft) + 24}px`,
        B: `${common_vendor.unref(triggerTop) + common_vendor.unref(triggerHeight) + 12}px`,
        C: common_vendor.sr(paging, "ca9af8b1-3,ca9af8b1-0", {
          "k": "paging"
        }),
        D: common_vendor.o(queryList),
        E: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        F: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        G: common_vendor.sr(paging, "ca9af8b1-0", {
          "k": "paging"
        }),
        H: common_vendor.o(queryList),
        I: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        J: common_vendor.p({
          ["show-refresher-update-time"]: true,
          modelValue: common_vendor.unref(dataList)
        }),
        K: common_vendor.unref(showSaiXuan)
      }, common_vendor.unref(showSaiXuan) ? {
        L: common_vendor.o(handleClose),
        M: common_vendor.p({
          cgyglist: common_vendor.unref(cgyglist),
          gnjcarrays: common_vendor.unref(gnjcarrays),
          splrarrays: common_vendor.unref(splrarrays),
          wxjcarrays: common_vendor.unref(wxjcarrays)
        })
      } : {}, {
        N: common_vendor.sr(saixuanPannelPopup, "ca9af8b1-5", {
          "k": "saixuanPannelPopup"
        }),
        O: common_vendor.o(handleClose),
        P: common_vendor.o(pannelChange),
        Q: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca9af8b1"]]);
wx.createPage(MiniProgramPage);
