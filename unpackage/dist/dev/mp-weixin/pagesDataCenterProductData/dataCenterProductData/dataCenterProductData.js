"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesDataCenterProductData_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _component_van_progress = common_vendor.resolveComponent("van-progress");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uv_tabs2 + _component_van_progress + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_tabs + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "dataCenterProductData",
  setup(__props) {
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月"]);
    const filteredTimeCardData = common_vendor.computed(() => timeCardData.value.filter((item, index) => index !== 4));
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
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiGoodsDataList();
      paging.value.complete(data);
    };
    const option1 = common_vendor.ref([
      { text: "全部仓库", value: -1 }
    ]);
    const option2 = common_vendor.ref([
      { text: "全部采购", value: -1 }
    ]);
    const selectParamChange1 = (e) => {
      console.log(e);
    };
    const selectParamChange2 = (e) => {
      console.log(e);
    };
    const value1 = common_vendor.ref(-1);
    const value2 = common_vendor.ref(-1);
    const tabsData = common_vendor.ref([{ name: "定价上架", splx: "1" }, { name: "成色判断", splx: "2" }, { name: "拍照", splx: "3" }, { name: "维修检测", splx: "4" }, { name: "功能检测", splx: "5" }, { name: "商品录入", splx: "6" }]);
    const activeTab1Index = common_vendor.ref(0);
    const selectSplx = common_vendor.ref("1");
    const uvTabs1Change = (e) => {
      activeTab1Index.value = e.index;
      selectSplx.value = tabsData.value[e.index].splx;
      paging.value.reload(true);
    };
    const cgyglist = common_vendor.ref([]);
    const cklist = common_vendor.ref([]);
    const userlists = common_vendor.ref([]);
    const num = common_vendor.ref(0);
    const apiGoodsDataList = async () => {
      console.log("selectedIndex:", selectedIndex.value);
      const data = {
        lx: selectedIndex.value + 1,
        splx: selectSplx.value,
        //1定价上架2成色判断3拍照4维修检测5功能检测6商品录入
        startTime: selectedIndex.value + 1 === 5 ? pickerStartTimestamp.value : "",
        endTime: selectedIndex.value + 1 === 5 ? pickerLastTimestamp.value : ""
      };
      const res = await pagesDataCenterProductData_api_api.apiGoodsData(data);
      if (res.zt === 1) {
        cgyglist.value = res.cgyglist;
        if (cgyglist.value) {
          cgyglist.value.forEach((item) => {
            const hasItem = option2.value.find((item1) => item1.value === parseInt(item.id));
            if (!hasItem) {
              option2.value.push({ text: item.username, value: parseInt(item.id) });
            }
            option2.value = [...option2.value];
          });
        }
        cklist.value = res.cklist;
        if (cklist.value) {
          cklist.value.forEach((item) => {
            const hasItem = option1.value.find((item1) => item1.value === parseInt(item.id));
            if (!hasItem) {
              option1.value.push({ text: item.name, value: parseInt(item.id) });
            }
            option1.value = [...option1.value];
          });
        }
        userlists.value = res.userlists;
        num.value = res.num;
        console.log("option2", option2.value);
        console.log("option1", option1.value);
        return userlists.value;
      }
      return [];
    };
    const computedPercentage = (item) => {
      if (num.value === 0) {
        return 0;
      }
      return (item.num / num.value * 100).toFixed(0);
    };
    const title = common_vendor.ref();
    common_vendor.onLoad((option) => {
      title.value = option.title;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: common_vendor.f(common_vendor.unref(filteredTimeCardData), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectCard(index), index),
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: index
          };
        }),
        c: common_vendor.t(common_vendor.unref(timeRange)),
        d: common_vendor.o(toggleDropdown),
        e: common_vendor.unref(selectedIndex) === 4 ? 1 : "",
        f: common_vendor.t(common_vendor.unref(pickerStartValue)),
        g: common_vendor.o(onTimeChange1),
        h: common_vendor.unref(pickerStartValue),
        i: common_vendor.t(common_vendor.unref(pickerLastValue)),
        j: common_vendor.o(onTimeChange2),
        k: common_vendor.unref(pickerLastValue),
        l: common_vendor.o(resetTime),
        m: common_vendor.o(tiemComfirm),
        n: common_vendor.unref(showDropdown),
        o: common_vendor.unref(showDropdown) ? 1 : "",
        p: common_vendor.o(selectParamChange1),
        q: common_vendor.p({
          value: common_vendor.unref(value1),
          options: common_vendor.unref(option1),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        r: common_vendor.o(selectParamChange2),
        s: common_vendor.p({
          value: common_vendor.unref(value2),
          options: common_vendor.unref(option2),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        t: common_vendor.p({
          zIndex: "20",
          activeColor: "#EB4636"
        }),
        v: common_vendor.o(uvTabs1Change),
        w: common_vendor.p({
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
        x: common_vendor.t(common_vendor.unref(num)),
        y: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(computedPercentage(item)),
            c: "f698a0e5-6-" + i0 + ",f698a0e5-5",
            d: common_vendor.p({
              trackColor: "#F8F8F8",
              color: "linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)",
              showPivot: false,
              percentage: computedPercentage(item),
              strokeWidth: "12"
            }),
            e: common_vendor.t(item.num),
            f: index
          };
        }),
        z: common_vendor.sr(paging, "f698a0e5-5", {
          "k": "paging"
        }),
        A: common_vendor.o(queryList),
        B: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        C: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f698a0e5"]]);
wx.createPage(MiniProgramPage);
