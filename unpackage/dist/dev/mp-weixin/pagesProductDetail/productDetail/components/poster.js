"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesProductDetail_api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  (_easycom_uv_checkbox2 + _easycom_uv_checkbox_group2)();
}
const _easycom_uv_checkbox = () => "../../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
if (!Math) {
  (_easycom_uv_checkbox + _easycom_uv_checkbox_group)();
}
const _sfc_main = {
  __name: "poster",
  props: {
    infos: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["openSellPoster"],
  setup(__props, { emit: __emit }) {
    const userInfos = common_vendor.index.getStorageSync("infos");
    const phone = common_vendor.ref(userInfos && userInfos.info ? userInfos.info.lxfs : "");
    const props = __props;
    const emit = __emit;
    const price = common_vendor.ref("");
    const checkboxList = common_vendor.ref([
      { name: "电议" }
    ]);
    const checkboxValue = common_vendor.ref([]);
    const selected = (e) => {
      console.log(e);
      price.value = e[0];
    };
    const id = common_vendor.ref();
    const apiPosterSubmitAc = async () => {
      console.log("infos", props.infos);
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: price.value === "电议" ? "1" : "2",
        // 1面议2输入价格
        price: price.value === "电议" ? "" : price.value,
        phone: phone.value,
        goodsid: props.infos.id
      };
      const res = await pagesProductDetail_api_api.apiPosterSubmit(param);
      if (res.code === "200") {
        id.value = res.id;
        console.log("res", res);
        console.log("id", id.value);
      } else {
        common_vendor.index.showToast({
          title: "提交失败，请重试",
          icon: "none"
        });
      }
    };
    const submit = async () => {
      if (!price.value) {
        common_vendor.index.showToast({
          title: "价格不能为空",
          icon: "none"
        });
        return;
      }
      if (!phone.value) {
        common_vendor.index.showToast({
          title: "电话不能为空",
          icon: "none"
        });
        return;
      }
      await apiPosterSubmitAc();
      const result = {
        id: id.value,
        price: price.value,
        phone: phone.value
      };
      console.log("发送的data", result);
      emit("openSellPoster", result);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(__props.infos.price),
        c: common_vendor.unref(price) === "电议",
        d: common_vendor.unref(price),
        e: common_vendor.o(($event) => common_vendor.isRef(price) ? price.value = $event.detail.value : null),
        f: common_vendor.p({
          activeColor: "red",
          name: common_vendor.unref(checkboxList)[0].name,
          labelColor: "red",
          label: common_vendor.unref(checkboxList)[0].name
        }),
        g: common_vendor.o(selected),
        h: common_vendor.o(($event) => common_vendor.isRef(checkboxValue) ? checkboxValue.value = $event : null),
        i: common_vendor.p({
          shape: "circle",
          modelValue: common_vendor.unref(checkboxValue)
        }),
        j: common_vendor.unref(phone),
        k: common_vendor.o(($event) => common_vendor.isRef(phone) ? phone.value = $event.detail.value : null),
        l: common_vendor.o(submit)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d5f9aa42"]]);
wx.createComponent(Component);
