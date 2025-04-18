"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesInventoryManager_api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  (_easycom_uni_datetime_picker2 + _easycom_uv_transition2)();
}
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uv_transition = () => "../../../uni_modules/uv-transition/components/uv-transition/uv-transition.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uv_transition)();
}
const _sfc_main = {
  __name: "exportLog",
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const instance = common_vendor.getCurrentInstance();
    const showStep = common_vendor.ref(true);
    const showPannel = common_vendor.ref(false);
    const pickerStartValue = common_vendor.ref("");
    const pickerLastValue = common_vendor.ref("");
    const express = common_vendor.ref([
      { name: "全部", zt: "1" },
      { name: "上架中", zt: "2" }
      // '交易账单','明细账单'
    ]);
    const selectedTap = common_vendor.ref(0);
    const selectTap = (index) => {
      selectedTap.value = index;
    };
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
    };
    const goNext = () => {
      showStep.value = false;
      setTimeout(() => {
        showPannel.value = true;
      }, 400);
    };
    const apiExportExcelAc = async () => {
      const param = {
        zt: express.value[selectedTap.value].zt,
        sjkssj: convertToTimestamp(pickerStartValue.value),
        //开始时间
        sjjssj: convertToTimestamp(pickerLastValue.value)
        //结束时间
      };
      const res = await pagesInventoryManager_api_api.apiExportExcel(param);
      if (res.code === "200" && instance && instance.proxy && res.lj !== "") {
        instance.proxy.copyText(res.lj);
        setTimeout(() => {
          emit("close");
        }, 500);
      } else {
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "error"
        });
      }
    };
    function convertToTimestamp(dateStr) {
      const dateObj = new Date(dateStr.replace(/-/g, "/"));
      const timestamp = Math.floor(dateObj.getTime() / 1e3);
      console.log(timestamp);
      return timestamp;
    }
    const getCurrentFormattedTime = () => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const comfrm = async () => {
      await apiExportExcelAc();
    };
    const initTime = () => {
      const curentTime = getCurrentFormattedTime();
      pickerStartValue.value = curentTime;
      pickerLastValue.value = curentTime;
    };
    __expose({
      initTime
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(common_vendor.unref(pickerStartValue) ? common_vendor.unref(pickerStartValue) : "开始时间"),
        c: common_vendor.o(onTimeChange1),
        d: common_vendor.o(($event) => common_vendor.isRef(pickerStartValue) ? pickerStartValue.value = $event : null),
        e: common_vendor.p({
          type: "datetime",
          border: false,
          modelValue: common_vendor.unref(pickerStartValue)
        }),
        f: common_vendor.t(common_vendor.unref(pickerLastValue) ? common_vendor.unref(pickerLastValue) : "结束时间"),
        g: common_vendor.o(_ctx.onTimeChange2),
        h: common_vendor.o(($event) => common_vendor.isRef(pickerLastValue) ? pickerLastValue.value = $event : null),
        i: common_vendor.p({
          type: "datetime",
          border: false,
          modelValue: common_vendor.unref(pickerLastValue)
        }),
        j: common_vendor.f(common_vendor.unref(express), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.unref(selectedTap) === index
          }, common_vendor.unref(selectedTap) === index ? {} : {}, {
            c: index,
            d: common_vendor.unref(selectedTap) === index ? 1 : "",
            e: common_vendor.o(($event) => selectTap(index), index)
          });
        }),
        k: common_vendor.o((...args) => _ctx.cancel && _ctx.cancel(...args)),
        l: common_vendor.o(goNext),
        m: common_vendor.p({
          show: common_vendor.unref(showStep),
          mode: "fade"
        }),
        n: common_vendor.o(($event) => _ctx.$emit("close")),
        o: common_vendor.t(common_vendor.unref(express)[common_vendor.unref(selectedTap)].name),
        p: common_vendor.t(common_vendor.unref(pickerStartValue)),
        q: common_vendor.t(common_vendor.unref(pickerLastValue)),
        r: common_vendor.o(comfrm),
        s: common_vendor.p({
          show: common_vendor.unref(showPannel),
          mode: "fade"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0904faf"]]);
wx.createComponent(Component);
