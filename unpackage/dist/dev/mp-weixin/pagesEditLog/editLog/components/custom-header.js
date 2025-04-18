"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesEditLog_utils_system = require("../../utils/system.js");
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
      common_vendor.index.navigateBack();
    };
    const customLeftClick = () => {
      emit("clickHandler");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(pagesEditLog_utils_system.getStatusBarHeight)() + "px",
        b: !__props.customLeftIcon
      }, !__props.customLeftIcon ? {
        c: common_vendor.o(goBack)
      } : {
        d: common_vendor.o(customLeftClick)
      }, {
        e: common_vendor.unref(pagesEditLog_utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(pagesEditLog_utils_system.getLeftIconLeft)() + "px",
        g: __props.backgroundColor,
        h: common_vendor.unref(pagesEditLog_utils_system.getStatusBarHeight)() + common_vendor.unref(pagesEditLog_utils_system.getTitleBarHeight)() + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ddfc84d8"]]);
wx.createComponent(Component);
