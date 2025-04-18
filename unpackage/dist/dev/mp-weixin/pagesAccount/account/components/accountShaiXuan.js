"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "accountShaiXuan",
  setup(__props) {
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("结束时间");
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
    };
    const selectData = common_vendor.ref([
      { type: "收支类型", values: [
        "全部",
        "收入",
        "支出"
      ] },
      { type: "交易类型", values: [
        "全部",
        "充值",
        "采购",
        "售后",
        "卖货",
        "退货",
        "其他"
      ] }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(common_vendor.unref(selectData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.type),
            b: common_vendor.f(item.values, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1),
                b: index2
              };
            }),
            c: index
          };
        }),
        c: common_vendor.t(common_vendor.unref(pickerStartValue)),
        d: common_vendor.o(onTimeChange1),
        e: common_vendor.unref(pickerStartValue),
        f: common_vendor.t(common_vendor.unref(pickerLastValue)),
        g: common_vendor.o(onTimeChange2),
        h: common_vendor.unref(pickerLastValue),
        i: common_vendor.o((...args) => _ctx.cancel && _ctx.cancel(...args)),
        j: common_vendor.o((...args) => _ctx.comfrm && _ctx.comfrm(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6c08f74"]]);
wx.createComponent(Component);
