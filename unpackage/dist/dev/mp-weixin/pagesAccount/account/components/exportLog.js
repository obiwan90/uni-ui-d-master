"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
if (!Array) {
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  _easycom_uv_transition2();
}
const _easycom_uv_transition = () => "../../../uni_modules/uv-transition/components/uv-transition/uv-transition.js";
if (!Math) {
  _easycom_uv_transition();
}
const _sfc_main = {
  __name: "exportLog",
  setup(__props) {
    const showStep = common_vendor.ref(true);
    const showPannel = common_vendor.ref(false);
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("结束时间");
    const express = common_vendor.ref([
      "交易账单",
      "明细账单"
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(common_vendor.unref(pickerStartValue)),
        c: common_vendor.o(onTimeChange1),
        d: common_vendor.unref(pickerStartValue),
        e: common_vendor.t(common_vendor.unref(pickerLastValue)),
        f: common_vendor.o((...args) => _ctx.onTimeChange2 && _ctx.onTimeChange2(...args)),
        g: common_vendor.unref(pickerLastValue),
        h: common_vendor.f(common_vendor.unref(express), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item),
            b: common_vendor.unref(selectedTap) === index
          }, common_vendor.unref(selectedTap) === index ? {} : {}, {
            c: index,
            d: common_vendor.unref(selectedTap) === index ? 1 : "",
            e: common_vendor.o(($event) => selectTap(index), index)
          });
        }),
        i: common_vendor.o((...args) => _ctx.cancel && _ctx.cancel(...args)),
        j: common_vendor.o(goNext),
        k: common_vendor.p({
          show: common_vendor.unref(showStep),
          mode: "fade"
        }),
        l: common_vendor.o(($event) => _ctx.$emit("close")),
        m: common_vendor.o(($event) => common_vendor.unref(utils_common.copyText)("测试一下")),
        n: common_vendor.p({
          show: common_vendor.unref(showPannel),
          mode: "fade"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef0c31b8"]]);
wx.createComponent(Component);
