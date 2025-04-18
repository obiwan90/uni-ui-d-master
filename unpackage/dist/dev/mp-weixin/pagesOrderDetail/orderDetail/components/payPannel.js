"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "payPannel",
  emits: ["payType"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const pay = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_weixin@3x.png", text: "微信支付", payment: "1" },
      { image: "https://www.xzxskj.com/xcximg/icon_zhifubao@3x.png", text: "支付宝支付", payment: "2" },
      { image: "https://www.xzxskj.com/xcximg/icon_yue@3x.png", text: "余额支付", payment: "3" },
      { image: "https://www.xzxskj.com/xcximg/icon_daikuan@3x.png", text: "先贷后款", payment: "4" }
    ]);
    const selectedTap = common_vendor.ref(0);
    const selectTap = (index) => {
      selectedTap.value = index;
      emit("payType", pay.value[selectedTap.value]);
    };
    __expose({
      selectTap
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(common_vendor.unref(pay), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.text),
            c: common_vendor.unref(selectedTap) === index ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png",
            d: index,
            e: common_vendor.o(($event) => selectTap(index), index)
          };
        }),
        c: common_vendor.o(($event) => _ctx.$emit("payType", common_vendor.unref(pay)[common_vendor.unref(selectedTap)]))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cae79cdf"]]);
wx.createComponent(Component);
