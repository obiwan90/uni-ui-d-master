"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_uv_toast = common_vendor.resolveComponent("uv-toast");
  const _easycom_uv_code2 = common_vendor.resolveComponent("uv-code");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  (_component_uv_toast + _easycom_uv_code2 + _easycom_uv_button2 + _easycom_uv_input2)();
}
const _easycom_uv_code = () => "../../../uni_modules/uv-code/components/uv-code/uv-code.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
if (!Math) {
  (_easycom_uv_code + _easycom_uv_button + _easycom_uv_input)();
}
const _sfc_main = {
  __name: "codePannel",
  setup(__props) {
    const customStyle = {
      border: "none",
      height: "42rpx",
      width: "250rpx",
      textAlign: "right"
    };
    const codeRef = common_vendor.ref(null);
    const tips = common_vendor.ref("");
    const numberCode = common_vendor.ref("");
    const seconds = common_vendor.ref(60);
    const change = (value) => {
      console.log(value);
    };
    const codeChange = (text) => {
      tips.value = text;
    };
    const getCode = () => {
      if (codeRef.value && codeRef.value.canGetCode) {
        common_vendor.index.showLoading({
          title: "正在获取验证码"
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.$uv.toast("验证码已发送");
          codeRef.value.start();
        }, 2e3);
      }
    };
    const end = () => {
    };
    const start = () => {
      common_vendor.index.$uv.toast("验证码已发送");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("toast", "ded8c3de-1,ded8c3de-0"),
        b: common_vendor.sr(codeRef, "ded8c3de-2,ded8c3de-0", {
          "k": "codeRef"
        }),
        c: common_vendor.o(end),
        d: common_vendor.o(start),
        e: common_vendor.o(codeChange),
        f: common_vendor.p({
          seconds: common_vendor.unref(seconds)
        }),
        g: common_vendor.t(common_vendor.unref(tips)),
        h: common_vendor.o(getCode),
        i: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "primary",
          plain: true
        }),
        j: common_vendor.o(change),
        k: common_vendor.o(($event) => common_vendor.isRef(numberCode) ? numberCode.value = $event : null),
        l: common_vendor.p({
          clearable: true,
          placeholder: "请输入验证码",
          type: "number",
          maxlength: "11",
          border: "bottom",
          modelValue: common_vendor.unref(numberCode)
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ded8c3de"]]);
wx.createComponent(Component);
