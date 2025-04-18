"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesCustomManager_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _easycom_uni_data_select2 + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uni_data_select + _easycom_z_paging)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "customManager",
  setup(__props) {
    common_vendor.ref(0);
    const returnProductRange = common_vendor.ref([
      { value: 0, text: "默认" },
      { value: 1, text: "采购台数最多" },
      { value: 2, text: "采购金额最多" },
      { value: 3, text: "欠款台数最多" },
      { value: 4, text: "欠款金额最多" }
    ]);
    common_vendor.ref(false);
    const returnProductChange = (e) => {
      console.log("returnProductSelectValue:", e);
      selectedPxlx.value = e;
      paging.value.reload(true);
    };
    const searchModelKey = common_vendor.ref("mdmc");
    const showModelField = common_vendor.ref("mdmc");
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(true);
    const lx = common_vendor.ref("1");
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiCustomerListData(pageNo - 1);
      console.log("res data:", data);
      paging.value.complete(data);
    };
    const orgArray = common_vendor.ref([]);
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月"]);
    const filteredTimeCardData = common_vendor.computed(() => timeCardData.value.filter((item, index) => index !== 4));
    const timeRange = common_vendor.ref("时间区间");
    const selectedIndex = common_vendor.ref(0);
    const selectCard = (index) => {
      selectedIndex.value = index;
      showDropdown.value = false;
      showTimeRange.value = false;
      lx.value = index + 1;
      paging.value.reload(true);
    };
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("截止时间");
    const onTimeChange1 = (e) => {
      pickerStartValue.value = e.detail.value;
    };
    const onTimeChange2 = (e) => {
      pickerLastValue.value = e.detail.value;
    };
    const showTimeRange = common_vendor.ref(false);
    const showDropdown = common_vendor.ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      showTimeRange.value = true;
      selectedIndex.value = -1;
    };
    const selectTimeRange = () => {
      showDropdown.value = !showDropdown.value;
      showTimeRange.value = true;
      lx.value = "5";
      paging.value.reload(true);
    };
    const resetTimeRange = () => {
      pickerStartValue.value = "开始时间";
      pickerLastValue.value = "截止时间";
    };
    common_vendor.ref([
      { text: "欠款台数", values: "25" },
      { text: "欠款金额", values: "51545" },
      { text: "采购台数", values: "25" },
      { text: "采购金额", values: "515451" }
    ]);
    const goNew = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMyCustomer/myCustomer/myCustomer"
      });
    };
    const handleInput = (inputText) => {
      if (inputText.length > 0) {
        apiCustomerSearchData(inputText);
      } else {
        selectedKhid.value = "";
      }
    };
    const selectSearchChange = (e) => {
      if (e) {
        console.log("selectSearchChange e:", e);
        selectedKhid.value = e.id;
        paging.value.reload(true);
      }
    };
    const apiCustomerSearchData = async (phone) => {
      const data = {
        phone,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: "2"
      };
      const res = await pagesCustomManager_api_api.apiCustomerSearch(data);
      if (res.zt === 1) {
        console.log("res:", res);
        orgArray.value = res.lists ? res.lists : [];
      }
    };
    const selectedKhid = common_vendor.ref("");
    const selectedPxlx = common_vendor.ref("");
    const khlists = common_vendor.ref([]);
    const apiCustomerListData = async (start) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: lx.value,
        startTime: lx.value == "5" ? utils_common.convertDateStringToTimestamp(pickerStartValue.value) : "",
        endTime: lx.value == "5" ? utils_common.convertDateStringToTimestamp(pickerLastValue.value) : "",
        start,
        khid: selectedKhid.value,
        pxlx: selectedPxlx.value === "0" ? "" : selectedPxlx.value
      };
      const res = await pagesCustomManager_api_api.apiCustomerData(data);
      if (res.zt === 1) {
        console.log("res:", res);
        khlists.value = res.lists;
        return khlists.value;
      } else {
        return [];
      }
    };
    common_vendor.onShow(() => {
      paging.value.reload(true);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "#ffffff"
        }),
        b: common_vendor.o(handleInput),
        c: common_vendor.o(selectSearchChange),
        d: common_vendor.p({
          keyId: 2,
          dataList: common_vendor.unref(orgArray),
          phText: "请选择客户名称或手机号码",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        e: common_vendor.o(returnProductChange),
        f: common_vendor.p({
          localdata: common_vendor.unref(returnProductRange),
          placement: "bottom",
          clear: false
        }),
        g: common_vendor.o((...args) => _ctx.selectSaiXuan && _ctx.selectSaiXuan(...args)),
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
        r: common_vendor.o(resetTimeRange),
        s: common_vendor.o(selectTimeRange),
        t: common_vendor.unref(showDropdown),
        v: common_vendor.unref(showDropdown) ? 1 : "",
        w: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.khname),
            b: common_vendor.t(item.num),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.nums),
            e: common_vendor.t(item.prices),
            f: index
          };
        }),
        x: common_vendor.sr(paging, "8a208f8e-3", {
          "k": "paging"
        }),
        y: common_vendor.o(queryList),
        z: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        A: common_vendor.p({
          ["default-page-size"]: 20,
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        B: common_vendor.o(goNew)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8a208f8e"]]);
wx.createPage(MiniProgramPage);
