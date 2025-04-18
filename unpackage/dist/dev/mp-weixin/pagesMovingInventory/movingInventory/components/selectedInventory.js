"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "selectedInventory",
  props: {
    cklist: {
      type: Array,
      default: []
    }
  },
  emits: ["close", "selectedOptions"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const selectedOptions = common_vendor.ref([]);
    const selectCard = (index, id) => {
      const optionIndex = selectedOptions.value.indexOf(id);
      if (optionIndex > -1) {
        selectedOptions.value.splice(optionIndex, 1);
      } else {
        selectedOptions.value.push(id);
      }
    };
    const confirm = () => {
      emit("selectedOptions", selectedOptions.value);
      setTimeout(() => {
        emit("close");
      }, 500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(props.cklist, (item1, index1, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: index1,
            c: common_vendor.o(($event) => selectCard(index1, item1.id), index1),
            d: common_vendor.unref(selectedOptions).includes(item1.id) ? 1 : ""
          };
        }),
        c: common_vendor.o(($event) => _ctx.$emit("close")),
        d: common_vendor.o(confirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd8f7757"]]);
wx.createComponent(Component);
