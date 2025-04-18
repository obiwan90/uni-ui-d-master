"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "service-pannel",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.o(($event) => _ctx.$emit("close"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85fcc6d2"]]);
wx.createComponent(Component);
