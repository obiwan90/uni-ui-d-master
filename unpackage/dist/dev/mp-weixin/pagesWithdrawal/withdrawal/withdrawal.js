"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_cell2 = common_vendor.resolveComponent("uv-cell");
  const _easycom_uv_cell_group2 = common_vendor.resolveComponent("uv-cell-group");
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uv_cell2 + _easycom_uv_cell_group2 + _easycom_uv_checkbox2 + _easycom_uv_checkbox_group2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_cell = () => "../../uni_modules/uv-cell/components/uv-cell/uv-cell.js";
const _easycom_uv_cell_group = () => "../../uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.js";
const _easycom_uv_checkbox = () => "../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_cell + _easycom_uv_cell_group + _easycom_uv_checkbox + _easycom_uv_checkbox_group + common_vendor.unref(codePannel) + _easycom_uni_popup)();
}
const codePannel = () => "./components/codePannel.js";
const _sfc_main = {
  __name: "withdrawal",
  setup(__props) {
    const data = common_vendor.ref([
      { title: "普通到账 T+2", values: "预计（7月28日）到账", label: "手续费：2元/笔" },
      { title: "快速到账 T+1", values: "预计（7月27日）到账", label: "手续费：10w以下 20元/笔，10w以上 50元/笔" }
    ]);
    const checkboxValue = common_vendor.ref([]);
    const selected = (e) => {
      console.log(e);
    };
    const codePannelPopup = common_vendor.ref(null);
    const handleClose = () => {
      codePannelPopup.value.close();
    };
    const confirm = () => {
      codePannelPopup.value.open();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          border: false,
          isLink: true
        }),
        b: common_vendor.p({
          border: false
        }),
        c: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.values),
            c: "9f65673a-6-" + i0 + "," + ("9f65673a-5-" + i0),
            d: common_vendor.o(selected, index),
            e: "9f65673a-5-" + i0 + "," + ("9f65673a-4-" + i0),
            f: common_vendor.o(($event) => common_vendor.isRef(checkboxValue) ? checkboxValue.value = $event : null, index),
            g: "9f65673a-4-" + i0 + "," + ("9f65673a-3-" + i0),
            h: "9f65673a-3-" + i0,
            i: common_vendor.t(item.label),
            j: index
          };
        }),
        d: common_vendor.p({
          activeColor: "red",
          name: "1",
          labelColor: "grey"
        }),
        e: common_vendor.p({
          shape: "circle",
          modelValue: common_vendor.unref(checkboxValue)
        }),
        f: common_vendor.p({
          border: false,
          center: false
        }),
        g: common_vendor.p({
          border: false
        }),
        h: common_vendor.o(confirm),
        i: common_vendor.o(handleClose),
        j: common_vendor.sr(codePannelPopup, "9f65673a-7", {
          "k": "codePannelPopup"
        }),
        k: common_vendor.o(handleClose),
        l: common_vendor.o(_ctx.change),
        m: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "center"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9f65673a"]]);
wx.createPage(MiniProgramPage);
