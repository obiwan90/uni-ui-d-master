"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "tips-pannel",
  props: {
    selectData: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(__props.selectData.goodsname),
        c: common_vendor.t(__props.selectData.djname),
        d: common_vendor.t(__props.selectData.price),
        e: common_vendor.t(__props.selectData.djms),
        f: common_vendor.o(($event) => _ctx.$emit("close"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9f628d59"]]);
wx.createComponent(Component);
