"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesFirstWholesale_api_api = require("../../api/api.js");
if (!Array) {
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  _component_van_tag();
}
if (!Math) {
  qiaoSelect();
}
const qiaoSelect = () => "../../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "selectCustomerPannel",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const selectSearchChange = async (e) => {
      console.log("模糊 e:", e);
    };
    const dataList = common_vendor.ref([]);
    const handleInput = async (inputText) => {
      dataList.value = await apiCustomerSearchData(inputText);
    };
    const apiCustomerSearchData = async (input) => {
      console.log("input:", input);
      const data = {
        phone: input
      };
      const res = await pagesFirstWholesale_api_api.apiCustomerSearch(data);
      console.log("res:", res);
      if (res.zt === 1) {
        return res.lists;
      }
      return [];
    };
    const selectedCustomer = (item) => {
      common_vendor.index.$emit("selectedCustomer", item);
      emit("close");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleInput),
        b: common_vendor.o(selectSearchChange),
        c: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入姓名或绑定微信的手机号码",
          searchKey: "name",
          showBorder: false,
          show: false,
          disabled: false,
          showPopup: false
        }),
        d: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name + " " + item.phone),
            b: "a6bc7909-1-" + i0,
            c: common_vendor.t(item.num),
            d: "a6bc7909-2-" + i0,
            e: common_vendor.t(item.price),
            f: "a6bc7909-3-" + i0,
            g: common_vendor.o(($event) => selectedCustomer(item), index),
            h: index
          };
        }),
        e: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #FF6D0C 0%, #FF6D0C 100%)",
          textColor: "#FFFFFF"
        }),
        f: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #FFEDE1 0%, #FFEDE1 100%)",
          textColor: "#FF3400"
        }),
        g: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #FFEDE1 0%, #FFEDE1 100%)",
          textColor: "#FF3400"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6bc7909"]]);
wx.createComponent(Component);
