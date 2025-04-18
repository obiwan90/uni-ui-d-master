"use strict";
const common_vendor = require("../../common/vendor.js");
const api_warehouseManagement_warehouseManagement = require("../../api/warehouseManagement/warehouseManagement.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  (_easycom_custom_header2 + _easycom_uv_checkbox2 + _easycom_uv_checkbox_group2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_checkbox = () => "../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_checkbox + _easycom_uv_checkbox_group)();
}
const _sfc_main = {
  __name: "new",
  setup(__props) {
    const ckItem = common_vendor.ref(null);
    const checkboxValue = common_vendor.ref([]);
    const name = common_vendor.ref("");
    const selected = (e) => {
      console.log(e);
    };
    const apiWarehouseSubmitAc = async () => {
      const data = {
        id: ckItem.value ? ckItem.value.id : "",
        name: name.value,
        sxck: checkboxValue.value[0] === "1" ? "1" : "2"
        //1首先 2不是
      };
      const res = await api_warehouseManagement_warehouseManagement.apiWarehouseSubmit(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          icon: "none",
          title: "保存成功",
          duration: 1e3
        });
        common_vendor.index.navigateBack();
      }
    };
    const confirm = async () => {
      await apiWarehouseSubmitAc();
    };
    common_vendor.onLoad((options) => {
      if (options.ckItem) {
        ckItem.value = JSON.parse(decodeURIComponent(options.ckItem));
        name.value = ckItem.value.name;
        console.log("ckItem:", ckItem.value);
        if (ckItem.value.sxck === "1") {
          checkboxValue.value = ["1"];
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(name),
        b: common_vendor.o(($event) => common_vendor.isRef(name) ? name.value = $event.detail.value : null),
        c: common_vendor.p({
          activeColor: "red",
          name: "1",
          label: "设为首选仓库",
          labelColor: "grey"
        }),
        d: common_vendor.o(selected),
        e: common_vendor.o(($event) => common_vendor.isRef(checkboxValue) ? checkboxValue.value = $event : null),
        f: common_vendor.p({
          shape: "circle",
          modelValue: common_vendor.unref(checkboxValue)
        }),
        g: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c3412962"]]);
wx.createPage(MiniProgramPage);
