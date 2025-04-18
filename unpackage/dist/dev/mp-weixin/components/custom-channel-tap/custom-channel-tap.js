"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom-channel-tap",
  props: {
    text1: String,
    text2: String,
    backgroundColor: String,
    text1Color: String,
    text2Color: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.text1
      }, __props.text1 ? {
        b: common_vendor.t(__props.text1),
        c: __props.text1Color + "!important"
      } : {}, {
        d: __props.text2
      }, __props.text2 ? {
        e: common_vendor.t(__props.text2),
        f: __props.text2Color + "!important"
      } : {}, {
        g: __props.backgroundColor
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a9bf863a"]]);
wx.createComponent(Component);
