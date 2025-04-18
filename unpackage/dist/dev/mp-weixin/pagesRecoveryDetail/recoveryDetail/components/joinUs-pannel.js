"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "joinUs-pannel",
  props: {
    qrCodeUrl: {
      type: String,
      required: ""
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.qrCodeUrl
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6cf9f26a"]]);
wx.createComponent(Component);
