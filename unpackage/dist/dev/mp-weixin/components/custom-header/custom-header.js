"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const _sfc_main = {
  __name: "custom-header",
  props: {
    backgroundColor: {
      type: String,
      default: "#F3F2F6"
    },
    customLeftIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ["clickHandler"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length <= 1) {
        common_vendor.index.reLaunch({
          url: "/pages/home/home"
        });
      } else {
        common_vendor.index.navigateBack();
      }
    };
    const customLeftClick = () => {
      emit("clickHandler");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: !__props.customLeftIcon
      }, !__props.customLeftIcon ? {
        c: common_vendor.o(goBack)
      } : {
        d: common_vendor.o(customLeftClick)
      }, {
        e: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        g: __props.backgroundColor,
        h: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-48cf5ad1"]]);
wx.createComponent(Component);
