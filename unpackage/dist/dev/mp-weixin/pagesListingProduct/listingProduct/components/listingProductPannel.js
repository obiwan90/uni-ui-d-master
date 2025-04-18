"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesListingProduct_api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "listingProductPannel",
  props: {
    receivedData: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const confirm = async () => {
      try {
        await apiListingProductAddData();
      } catch (error) {
        console.error("Error during confirmation", error);
      }
    };
    const apiListingProductAddData = async () => {
      const data = {
        // opid: uni.getStorageSync('sessionInfo').opid,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        id: props.receivedData.zjid,
        price: props.receivedData.price,
        sftj: props.receivedData.sftj
      };
      const res = await pagesListingProduct_api_api.apiListingProductAdd(data);
      if (res.zt === 1) {
        console.log("Listing product success", res);
        common_vendor.index.showToast({
          title: "上架成功",
          icon: "success",
          duration: 500
        });
        common_vendor.index.$emit("listingProductRefresh");
        emit("close");
      } else {
        console.error("API returned an error", res);
      }
    };
    const continueInput = async () => {
      const data = {
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        id: props.receivedData.zjid,
        price: props.receivedData.price,
        sftj: props.receivedData.sftj
      };
      const res = await pagesListingProduct_api_api.apiListingProductAdd(data);
      if (res.zt === 1) {
        console.log("Listing product success", res);
        common_vendor.index.showToast({
          title: "上架成功",
          icon: "success",
          duration: 500
        });
        common_vendor.index.$emit("naviInit");
        common_vendor.index.$emit("productInputRefresh");
        setTimeout(() => {
          const path = "pagesProductInput/productInput/productInput";
          let pages = getCurrentPages();
          let found = false;
          for (let i = 0; i < pages.length; i++) {
            if (pages[i].route === path) {
              common_vendor.index.navigateBack({
                delta: pages.length - i - 1
              });
              found = true;
              break;
            }
          }
          if (!found) {
            common_vendor.index.navigateTo({
              url: "/" + path
            });
          }
        }, 500);
      } else {
        console.error("API returned an error", res);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(__props.receivedData.spname),
        c: common_vendor.t(__props.receivedData.finenessname),
        d: common_vendor.t(__props.receivedData.price),
        e: common_vendor.o(confirm),
        f: common_vendor.o(($event) => _ctx.$emit("close")),
        g: common_vendor.o(continueInput)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a17196"]]);
wx.createComponent(Component);
