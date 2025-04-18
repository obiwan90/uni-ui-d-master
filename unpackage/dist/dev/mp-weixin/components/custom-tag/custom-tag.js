"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom-tag",
  props: ["tagText", "bgColor"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.tagText),
        b: __props.bgColor
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66011888"]]);
wx.createComponent(Component);
