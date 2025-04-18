"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesDataCenterDetail_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _component_van_progress = common_vendor.resolveComponent("van-progress");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uv_tabs2 + _component_van_progress + _component_van_loading + _component_van_image + _component_van_tag + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_tabs + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "dataCenterDetail",
  setup(__props) {
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月"]);
    const filteredTimeCardData = common_vendor.computed(() => timeCardData.value.filter((item2, index) => index !== 4));
    const timeRange = common_vendor.ref("时间区间");
    const selectedIndex = common_vendor.ref(0);
    const selectCard = (index) => {
      selectedIndex.value = index;
      showDropdown.value = false;
      showTimeRange.value = false;
      if (selectedIndex.value !== 5) {
        paging.value.reload(true);
      }
    };
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("截止时间");
    const pickerStartTimestamp = common_vendor.ref();
    const pickerLastTimestamp = common_vendor.ref();
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
      pickerStartTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
      pickerLastTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
    };
    const showTimeRange = common_vendor.ref(false);
    const showDropdown = common_vendor.ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      showTimeRange.value = true;
      selectedIndex.value = 4;
    };
    const tiemComfirm = () => {
      showDropdown.value = false;
      showTimeRange.value = false;
      paging.value.reload(true);
    };
    const resetTime = () => {
      pickerStartValue.value = "开始时间";
      pickerLastValue.value = "截止时间";
      pickerStartTimestamp.value = "";
      pickerLastTimestamp.value = "";
    };
    common_vendor.ref(0);
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(true);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiSaleDataList(pageNo - 1);
      console.log("data", data);
      paging.value.complete(data);
    };
    const option1 = common_vendor.ref([{ text: "全部仓库", value: 0 }]);
    const option2 = common_vendor.ref([{ text: "全部采购", value: 0 }]);
    const option3 = common_vendor.ref([{ text: "全部销售", value: 0 }]);
    const option4 = common_vendor.ref([{ text: "全部成色", value: 0 }]);
    const value1 = common_vendor.ref(0);
    const value2 = common_vendor.ref(0);
    const value3 = common_vendor.ref(0);
    const value4 = common_vendor.ref(0);
    const tabsData = common_vendor.ref([
      { name: "全部销售", xslx: "1" },
      { name: "线下销售", xslx: "2" },
      { name: "平台销售", xslx: "3" },
      { name: "售后退款", xslx: "4" }
    ]);
    const activeTab1Index = common_vendor.ref(0);
    const selectXslx = common_vendor.ref("1");
    const selectCkid = common_vendor.ref("");
    const selectCgid = common_vendor.ref("");
    const selectXsid = common_vendor.ref("");
    const selectCsid = common_vendor.ref("");
    const uvTabs1Change = (e) => {
      activeTab1Index.value = e.index;
      selectXslx.value = tabsData.value[e.index].xslx;
      paging.value.reload(true);
    };
    const selectParamChange1 = (e) => {
      console.log(e);
      selectCkid.value = e.detail === 0 ? "" : e.detail;
      value1.value = e.detail;
      paging.value.reload(true);
    };
    const selectParamChange2 = (e) => {
      console.log(e);
      selectCkid.value = e.detail === 0 ? "" : e.detail;
      value2.value = e.detail;
      paging.value.reload(true);
    };
    const selectParamChange3 = (e) => {
      console.log(e);
      selectCkid.value = e.detail === 0 ? "" : e.detail;
      value3.value = e.detail;
      paging.value.reload(true);
    };
    const selectParamChange4 = (e) => {
      console.log(e);
      selectCkid.value = e.detail === 0 ? "" : e.detail;
      value4.value = e.detail;
      paging.value.reload(true);
    };
    const cklist = common_vendor.ref([]);
    const cgyglist = common_vendor.ref([]);
    const xsyglist = common_vendor.ref([]);
    const cslist = common_vendor.ref([]);
    const lists = common_vendor.ref([]);
    const num = common_vendor.ref(0);
    const totalPrice = common_vendor.ref(0);
    const ymdj = common_vendor.ref("1");
    const flid = common_vendor.ref("");
    const ppid = common_vendor.ref("");
    const xhid = common_vendor.ref("");
    const ncid = common_vendor.ref("");
    const qcid = common_vendor.ref("");
    const start = common_vendor.ref("0");
    const param = common_vendor.computed(() => ({
      lx: selectedIndex.value + 1,
      xslx: selectXslx.value,
      //1全部销售2线下销售3平台销售4售后退款
      ckid: selectCkid.value,
      //仓库ID
      cgid: selectCgid.value,
      //采购ID
      xsid: selectXsid.value,
      //销售ID
      csid: selectCsid.value,
      //成色ID
      ymdj: ymdj.value,
      //1分类 2品牌3型号4内存5 全称6商品列表
      flid: flid.value,
      //
      ppid: ppid.value,
      //品牌ID
      xhid: xhid.value,
      //型号ID
      ncid: ncid.value,
      //内存ID
      qcid: qcid.value,
      //全称ID
      start: start.value,
      //分页
      startTime: selectedIndex.value + 1 === 5 ? pickerStartTimestamp.value : "",
      endTime: selectedIndex.value + 1 === 5 ? pickerLastTimestamp.value : ""
    }));
    const apiSaleDataList = async (data) => {
      start.value = String(data);
      const res = await pagesDataCenterDetail_api_api.apiSaleData(param.value);
      if (res.zt === 1) {
        cklist.value = res.cklist;
        if (cklist.value) {
          cklist.value.forEach((item2) => {
            const hasItem = option1.value.find((item1) => item1.value === parseInt(item2.id));
            if (!hasItem) {
              option1.value.push({ text: item2.name, value: parseInt(item2.id) });
            }
            option1.value = [...option1.value];
          });
        }
        cgyglist.value = res.cgyglist;
        if (cgyglist.value) {
          cgyglist.value.forEach((item2) => {
            const hasItem = option2.value.find((item1) => item1.value === parseInt(item2.id));
            if (!hasItem) {
              option2.value.push({ text: item2.username, value: parseInt(item2.id) });
            }
            option2.value = [...option2.value];
          });
        }
        xsyglist.value = res.xsyglist;
        if (xsyglist.value) {
          xsyglist.value.forEach((item2) => {
            const hasItem = option3.value.find((item1) => item1.value === parseInt(item2.id));
            if (!hasItem) {
              option3.value.push({ text: item2.username, value: parseInt(item2.id) });
            }
            option3.value = [...option3.value];
          });
        }
        cslist.value = res.cslist;
        if (cslist.value) {
          cslist.value.forEach((item2) => {
            const hasItem = option4.value.find((item1) => item1.value === parseInt(item2.id));
            if (!hasItem) {
              option4.value.push({ text: item2.name, value: parseInt(item2.id) });
            }
            option4.value = [...option4.value];
          });
        }
        if (res.lists || res.goodslist) {
          if (ymdj.value !== "6") {
            lists.value = res.lists;
            num.value = 0;
            lists.value.forEach((item2) => {
              num.value += parseInt(item2.num);
            });
            totalPrice.value = res.zprice;
          } else {
            lists.value = res.goodslist;
          }
          return lists.value;
        }
      }
      return [];
    };
    const switchNum = common_vendor.ref(false);
    const toast = () => {
      switchNum.value = !switchNum.value;
    };
    const title = common_vendor.ref();
    const reloadPage = (item2) => {
      start.value = "1";
      ymdj.value = String(parseInt(ymdj.value) + 1);
      flid.value = String(item2.id);
      title.value = ymdj.value === "1" ? "销售数据" : ymdj.value === "2" ? item2.name : ymdj.value === "3" ? item2.name : ymdj.value === "4" ? "内存数据" : ymdj.value === "5" ? "全称数据" : "商品列表";
      if (ymdj.value === "2") {
        flid.value = String(item2.id);
      } else if (ymdj.value === "3") {
        ppid.value = String(item2.id);
      } else if (ymdj.value === "4") {
        xhid.value = String(item2.id);
      } else if (ymdj.value === "5") {
        ncid.value = String(item2.id);
      } else {
        qcid.value = String(item2.id);
      }
      const selectedDataAnalysis = common_vendor.index.getStorageSync("selectedDataAnalysis");
      if (selectedDataAnalysis) {
        console.log("push");
        selectedDataAnalysis.push({
          flid: flid.value,
          ppid: ppid.value,
          xhid: xhid.value,
          ncid: ncid.value,
          qcid: qcid.value
        });
        common_vendor.index.setStorageSync("selectedDataAnalysis", selectedDataAnalysis);
      } else {
        console.log("set");
        common_vendor.index.setStorageSync("selectedDataAnalysis", [{
          flid: flid.value,
          ppid: ppid.value,
          xhid: xhid.value,
          ncid: ncid.value,
          qcid: qcid.value
        }]);
      }
      paging.value.reload(true);
    };
    const computedPercentage1 = (item2) => {
      if (!switchNum) {
        if (totalPrice.value !== 0) {
          return (item2.price / totalPrice.value * 100).toFixed(0);
        } else {
          return 0;
        }
      } else {
        if (num.value !== 0) {
          return (item2.num / num.value * 100).toFixed(0);
        } else {
          return 0;
        }
      }
    };
    const customLeftFn = () => {
      console.log("customLeftFn");
      if (ymdj.value !== "1") {
        start.value = "1";
        ymdj.value = String(parseInt(ymdj.value) - 1);
        const selectedDataAnalysis = common_vendor.index.getStorageSync("selectedDataAnalysis");
        const {
          flid: flid1,
          ppid: ppid1,
          xhid: xhid1,
          ncid: ncid1,
          qcid: qcid1
        } = selectedDataAnalysis.pop();
        flid.value = flid1;
        ppid.value = ppid1;
        xhid.value = xhid1;
        ncid.value = ncid1;
        qcid.value = qcid1;
        common_vendor.index.setStorageSync("selectedDataAnalysis", selectedDataAnalysis);
        title.value = ymdj.value === "1" ? "销售数据" : ymdj.value === "2" ? item.name : ymdj.value === "3" ? item.name : ymdj.value === "4" ? "内存数据" : ymdj.value === "5" ? "全称数据" : "商品列表";
        if (ymdj.value === "1") {
          flid.value = "";
        } else if (ymdj.value === "2") {
          ppid.value = "";
        } else if (ymdj.value === "3") {
          xhid.value = "";
        } else if (ymdj.value === "4") {
          ncid.value = "";
        } else if (ymdj.value === "5") {
          qcid.value = "";
        }
        paging.value.reload(true);
      } else {
        common_vendor.index.removeStorageSync("selectedDataAnalysis");
        common_vendor.index.navigateBack();
      }
    };
    common_vendor.onLoad((options) => {
      if (options.title) {
        title.value = options.title;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.o(customLeftFn),
        c: common_vendor.p({
          backgroundColor: "#FFFFFF",
          customLeftIcon: true
        }),
        d: common_vendor.f(common_vendor.unref(filteredTimeCardData), (item2, index, i0) => {
          return {
            a: common_vendor.t(item2),
            b: common_vendor.o(($event) => selectCard(index), index),
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: index
          };
        }),
        e: common_vendor.t(common_vendor.unref(timeRange)),
        f: common_vendor.o(toggleDropdown),
        g: common_vendor.unref(selectedIndex) === 4 ? 1 : "",
        h: common_vendor.t(common_vendor.unref(pickerStartValue)),
        i: common_vendor.o(onTimeChange1),
        j: common_vendor.unref(pickerStartValue),
        k: common_vendor.t(common_vendor.unref(pickerLastValue)),
        l: common_vendor.o(onTimeChange2),
        m: common_vendor.unref(pickerLastValue),
        n: common_vendor.o(resetTime),
        o: common_vendor.o(tiemComfirm),
        p: common_vendor.unref(showDropdown),
        q: common_vendor.unref(showDropdown) ? 1 : "",
        r: common_vendor.o(selectParamChange1),
        s: common_vendor.p({
          value: common_vendor.unref(value1),
          options: common_vendor.unref(option1),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        t: common_vendor.o(selectParamChange2),
        v: common_vendor.p({
          value: common_vendor.unref(value2),
          options: common_vendor.unref(option2),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        w: common_vendor.o(selectParamChange3),
        x: common_vendor.p({
          value: common_vendor.unref(value3),
          options: common_vendor.unref(option3),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        y: common_vendor.o(selectParamChange4),
        z: common_vendor.p({
          value: common_vendor.unref(value4),
          options: common_vendor.unref(option4),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        A: common_vendor.p({
          zIndex: "20",
          activeColor: "#EB4636"
        }),
        B: common_vendor.unref(ymdj) !== "6"
      }, common_vendor.unref(ymdj) !== "6" ? common_vendor.e({
        C: !common_vendor.unref(switchNum)
      }, !common_vendor.unref(switchNum) ? {} : {}, {
        D: common_vendor.o(($event) => toast())
      }) : {}, {
        E: common_vendor.o(uvTabs1Change),
        F: common_vendor.p({
          list: common_vendor.unref(tabsData),
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          fontSize: 28,
          inactiveStyle: {
            color: "#1F1F1F",
            opacity: 0.6
          },
          activeStyle: {
            color: "#1F1F1F",
            fontWeight: "bold",
            fontSize: 32,
            opacity: 1
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        G: common_vendor.t(common_vendor.unref(num)),
        H: common_vendor.t(common_vendor.unref(totalPrice)),
        I: common_vendor.unref(ymdj) !== "6"
      }, common_vendor.unref(ymdj) !== "6" ? {
        J: common_vendor.f(common_vendor.unref(dataList), (item2, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item2.name),
            b: common_vendor.t(computedPercentage1(item2)),
            c: "8c563a19-8-" + i0 + ",8c563a19-7",
            d: common_vendor.p({
              trackColor: "#F8F8F8",
              color: "linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)",
              showPivot: false,
              percentage: computedPercentage1(item2),
              strokeWidth: "12"
            })
          }, !common_vendor.unref(switchNum) ? {
            e: common_vendor.t(item2.price)
          } : {
            f: common_vendor.t(item2.num)
          }, {
            g: common_vendor.o(($event) => reloadPage(item2), index),
            h: index
          });
        }),
        K: !common_vendor.unref(switchNum)
      } : {
        L: common_vendor.f(common_vendor.unref(dataList), (item2, index, i0) => {
          return {
            a: "8c563a19-10-" + i0 + "," + ("8c563a19-9-" + i0),
            b: "8c563a19-9-" + i0 + ",8c563a19-7",
            c: common_vendor.p({
              width: "95",
              height: "95",
              fit: "widthFix",
              radius: "18rpx",
              src: item2.cover,
              mode: "aspectFit"
            }),
            d: common_vendor.t(item2.finenessname),
            e: "8c563a19-11-" + i0 + ",8c563a19-7",
            f: common_vendor.t(item2.name),
            g: common_vendor.t(item2.ch),
            h: common_vendor.t(item2.cgyname),
            i: common_vendor.t(item2.ckame),
            j: common_vendor.t(item2.price),
            k: index
          };
        }),
        M: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        N: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        })
      }, {
        O: common_vendor.sr(paging, "8c563a19-7", {
          "k": "paging"
        }),
        P: common_vendor.o(queryList),
        Q: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        R: common_vendor.p({
          ["show-refresher-update-time"]: true,
          ["default-page-size"]: 20,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c563a19"]]);
wx.createPage(MiniProgramPage);
