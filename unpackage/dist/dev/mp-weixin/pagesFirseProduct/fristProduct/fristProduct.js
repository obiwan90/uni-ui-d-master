"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  (_easycom_custom_header2 + _easycom_uv_tabs2 + _easycom_uv_sticky2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_sticky = () => "../../uni_modules/uv-sticky/components/uv-sticky/uv-sticky.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_tabs + _easycom_uv_sticky)();
}
const _sfc_main = {
  __name: "fristProduct",
  setup(__props) {
    const classlist = common_vendor.ref([
      { name: "全部" },
      { name: "议价待确认" },
      { name: "待付款" },
      { name: "待发货" },
      { name: "先货后款" },
      { name: "售后/退款" },
      { name: "交易成功" }
    ]);
    const activeTab1Index = common_vendor.ref(0);
    const tabsData = common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name
      }));
    });
    const uvTabs1Change = (e) => {
      console.log("标签切换触发:", e.index);
      activeTab1Index.value = e.index;
    };
    common_vendor.ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.goPage("/pagesSearch/search/search")),
        b: common_vendor.o(uvTabs1Change),
        c: common_vendor.p({
          list: common_vendor.unref(tabsData),
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          fontSize: 28,
          inactiveStyle: {
            color: "#1F1F1F"
          },
          activeStyle: {
            color: "#E6432E",
            fontWeight: "bold",
            fontSize: 32
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        d: common_vendor.f(3, (item, index, i0) => {
          return {
            a: index
          };
        }),
        e: common_vendor.p({
          ["offset-top"]: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)()
        }),
        f: common_vendor.f(5, (item, index, i0) => {
          return {
            a: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a97f3c3f"]]);
wx.createPage(MiniProgramPage);
