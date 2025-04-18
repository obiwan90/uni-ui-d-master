"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesCustomOrder_api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  _easycom_uni_datetime_picker2();
}
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
const _sfc_main = {
  __name: "userServicePannel",
  props: {
    order: {
      type: Object,
      default: {}
    }
  },
  emits: ["close", "subExpress"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const addressList = common_vendor.ref([]);
    const selectedAddress = common_vendor.ref(null);
    const getAddressList = async () => {
      if (selectedAddress.value) {
        addressList.value = [selectedAddress.value];
      } else {
        const data = {
          opid: common_vendor.index.getStorageSync("sessionInfo").opid
        };
        const res = await pagesCustomOrder_api_api.apigetAddress(data);
        if (res.lists && res.lists.length > 0) {
          addressList.value = res.lists.filter((item) => item.zt === "1");
          console.log("addressList1:", addressList.value);
        } else {
          addressList.value = [];
        }
        console.log("addressList2:", addressList.value);
      }
    };
    const date = common_vendor.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const selectedTimeRange = common_vendor.ref("请选择时间");
    const thfs = common_vendor.ref("1");
    const timeRange = common_vendor.ref([
      "08:00:00-09:00:00",
      "09:00:00-10:00:00",
      "10:00:00-11:00:00",
      "11:00:00-12:00:00",
      "12:00:00-13:00:00",
      "13:00:00-14:00:00",
      "14:00:00-15:00:00",
      "15:00:00-16:00:00",
      "16:00:00-17:00:00",
      "17:00:00-18:00:00",
      "18:00:00-19:00:00"
    ]);
    const getCurrentTime = () => {
      const now = /* @__PURE__ */ new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };
    timeRange.value.filter((range) => {
      const currentTime = getCurrentTime();
      const [start, end] = range.split("-");
      console.log(`Comparing: start=${start}, end=${end}, currentTime=${currentTime}`);
      return isToday(date.value) ? currentTime >= start && currentTime <= end : range;
    });
    const isToday = (dateString) => {
      console.log("dateString", dateString);
      const today = /* @__PURE__ */ new Date();
      const date2 = new Date(dateString);
      return today.getFullYear() === date2.getFullYear() && today.getMonth() === date2.getMonth() && today.getDate() === date2.getDate();
    };
    const selectMethod = (method) => {
      thfs.value = method;
      if (method === "2") {
        date.value = "请选择日期";
        selectedTimeRange.value = "请选择时间";
      }
    };
    const onDateChange = (e) => {
      console.log("选择的日期:", e);
      date.value = e;
    };
    const onTimeRangeChange = (e) => {
      console.log("选择的时间范围:", updatedTimeRange.value[e.detail.value]);
      selectedTimeRange.value = updatedTimeRange.value[e.detail.value];
    };
    const confirm = async () => {
      if (thfs.value === "1" && date.value === "请选择日期") {
        common_vendor.index.showToast({
          title: "请选择上门日期",
          icon: "none"
        });
        return;
      }
      if (thfs.value === "1" && selectedTimeRange.value === "请选择时间") {
        common_vendor.index.showToast({
          title: "请选择上门时间范围",
          icon: "none"
        });
        return;
      }
      console.log("提交日期：", date.value);
      console.log("提交时间范围：", selectedTimeRange.value);
      console.log("邮寄方式：", thfs.value);
      await apiBookingExpressAc();
    };
    function getUniqueIdString(data) {
      console.log("orders", data);
      const uniqueIds = new Set(data.orders.map((order) => order.id));
      return Array.from(uniqueIds).join(",");
    }
    const apiBookingExpressAc = async () => {
      const param = {
        lx: "1",
        id: getUniqueIdString(props.order),
        thfs: thfs.value,
        thdz: addressList.value[0].id,
        // 地址id
        qjrq: thfs.value === "1" ? date.value : "",
        //日期
        qjsj: thfs.value === "1" ? selectedTimeRange.value : ""
        // 取货时间
      };
      try {
        const res = await pagesCustomOrder_api_api.apiBookingExpress(param);
        if (res.code === 200) {
          setTimeout(() => {
            emit("close");
            emit("subExpress", props.order);
          }, 500);
        } else {
          common_vendor.index.showToast({
            title: "操作失败，请重试",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("请求失败:", error);
        common_vendor.index.showToast({
          title: "网络错误，请稍后再试",
          icon: "none"
        });
      }
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    common_vendor.onShow(async () => {
      console.log("onShow");
      let pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      console.log("onShow:", prevPage.data.selectedAddress);
      if (prevPage.data.selectedAddress) {
        selectedAddress.value = prevPage.data.selectedAddress;
      }
      await getAddressList();
    });
    common_vendor.onMounted(async () => {
      await getAddressList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.unref(thfs) === "1" ? "#FFEEEC" : "#F9F9F9",
        c: common_vendor.o(($event) => selectMethod("1")),
        d: common_vendor.unref(thfs) === "2" ? "#FFEEEC" : "#F9F9F9",
        e: common_vendor.o(($event) => selectMethod("2")),
        f: common_vendor.t(common_vendor.unref(addressList)[0].province + common_vendor.unref(addressList)[0].city + common_vendor.unref(addressList)[0].area + common_vendor.unref(addressList)[0].address),
        g: common_vendor.t(common_vendor.unref(addressList)[0].name + " " + common_vendor.unref(addressList)[0].phone),
        h: common_vendor.o(($event) => goPage("/pagesAddress/address/address?from=subOrder")),
        i: common_vendor.unref(thfs) === "1"
      }, common_vendor.unref(thfs) === "1" ? {
        j: common_vendor.t(common_vendor.unref(date)),
        k: common_vendor.sr("datePicker", "6d1fcfa4-0"),
        l: common_vendor.o(onDateChange),
        m: common_vendor.o(($event) => common_vendor.isRef(date) ? date.value = $event : null),
        n: common_vendor.p({
          type: "date",
          border: false,
          modelValue: common_vendor.unref(date)
        })
      } : {}, {
        o: common_vendor.unref(thfs) === "1"
      }, common_vendor.unref(thfs) === "1" ? {
        p: common_vendor.t(common_vendor.unref(selectedTimeRange)),
        q: _ctx.updatedTimeRange,
        r: common_vendor.o(onTimeRangeChange)
      } : {}, {
        s: common_vendor.o(confirm)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d1fcfa4"]]);
wx.createComponent(Component);
