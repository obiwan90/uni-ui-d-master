"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "cusfloatButtom",
  emits: "fab-button-click",
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const top = common_vendor.ref(0);
    const right = common_vendor.ref(0);
    const startY = common_vendor.ref(0);
    const startX = common_vendor.ref(0);
    const isMoving = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      common_vendor.index.getSystemInfoSync();
      top.value = 200;
      right.value = 20;
    });
    function handleTouchStart(e) {
      common_vendor.index.getSystemInfoSync();
      startY.value = e.changedTouches[0].clientY - top.value;
      startX.value = e.changedTouches[0].clientX;
      isMoving.value = true;
    }
    function handleTouchMove(e) {
      if (isMoving.value) {
        const { windowHeight, windowWidth } = common_vendor.index.getSystemInfoSync();
        top.value = e.changedTouches[0].clientY - startY.value;
        top.value = Math.max(0, Math.min(top.value, windowHeight - 60));
        right.value = windowWidth - e.changedTouches[0].clientX - 30;
        right.value = Math.max(0, Math.min(right.value, windowWidth));
      }
    }
    function handleTouchEnd() {
      isMoving.value = false;
    }
    function handleClick() {
      emit("fab-button-click");
    }
    return (_ctx, _cache) => {
      return {
        a: right.value + "px",
        b: top.value + "px",
        c: common_vendor.o(handleTouchStart),
        d: common_vendor.o(handleTouchMove),
        e: common_vendor.o(handleTouchEnd),
        f: common_vendor.o(handleClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7756b05d"]]);
wx.createComponent(Component);
