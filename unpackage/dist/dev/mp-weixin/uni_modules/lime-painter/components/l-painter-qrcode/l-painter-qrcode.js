"use strict";
const uni_modules_limePainter_components_common_relation = require("../common/relation.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "lime-painter-qrcode",
  mixins: [uni_modules_limePainter_components_common_relation.children("painter")],
  props: {
    id: String,
    css: [String, Object],
    text: String
  },
  data() {
    return {
      type: "qrcode",
      el: {
        css: {},
        text: null
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
