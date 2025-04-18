"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "seeking",
  setup(__props) {
    common_vendor.ref([
      { key: "功能检测", value: "全好" },
      { key: "维修检测", value: "声音略小全好声音略小全好声音略" }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.f(5, (item, index, i0) => {
          return {
            a: index
          };
        }),
        c: common_assets._imports_1,
        d: common_assets._imports_2,
        e: common_assets._imports_3,
        f: common_vendor.o((...args) => _ctx.comfim && _ctx.comfim(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36011c2e"]]);
wx.createPage(MiniProgramPage);
