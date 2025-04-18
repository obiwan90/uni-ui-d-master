"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
if (!Array) {
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_van_loading + _component_van_image + _component_van_tag + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "fpakCard",
  props: {
    orderList: {
      type: Array,
      required: true
    }
  },
  emits: ["update:selectedItems", "goDetail"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = common_vendor.getCurrentInstance();
    const props = __props;
    const emit = __emit;
    const selectedItems = common_vendor.ref([]);
    const selectedProduct = (item) => {
      const index = selectedItems.value.indexOf(item);
      if (index > -1) {
        selectedItems.value.splice(index, 1);
      } else {
        selectedItems.value.push(item);
      }
      emit("update:selectedItems", selectedItems.value);
    };
    const getDetail = (item) => {
      emit("goDetail", item, "fpak");
    };
    const cancelAllSelectedProduct = () => {
      selectedItems.value = [];
      emit("update:selectedItems", selectedItems.value);
    };
    const selectAllProducts = () => {
      console.log("props.orderList：", props.orderList);
      selectedItems.value = [];
      props.orderList.forEach((item) => {
        item.goodsinfos.forEach((item1) => {
          if (!selectedItems.value.includes(item1)) {
            selectedItems.value.push(item1);
          }
        });
      });
      console.log("selectedItems", selectedItems.value);
      emit("update:selectedItems", selectedItems.value);
    };
    const computeTotalPrice = (item) => {
      let totalPrice = 0;
      item.goodsinfos.forEach((item1) => {
        totalPrice += parseInt(item1.price);
      });
      return totalPrice;
    };
    const calculateTotal = () => {
      let totalQuantity = 0;
      let totalAmount = 0;
      console.log("props.orderList:", props.orderList);
      props.orderList.forEach((item) => {
        totalQuantity += parseInt(item.num);
        totalAmount += parseInt(item.price);
      });
      console.log("totalQuantity", totalQuantity);
      console.log("totalAmount", totalQuantity);
      return {
        totalQuantity,
        totalAmount
      };
    };
    __expose({
      selectAllProducts,
      cancelAllSelectedProduct,
      calculateTotal
    });
    common_vendor.ref();
    common_vendor.ref();
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.orderList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.zt === "3" ? "退货时间: " + common_vendor.unref(utils_common.formatTimestamp)(item.cztime) : item.zt === "2" ? "收款时间: " + common_vendor.unref(utils_common.formatTimestamp)(item.sktime) : "下单时间: " + common_vendor.unref(utils_common.formatTimestamp)(item.add_time)),
            b: item.zt === "1" || item.zt === "2"
          }, item.zt === "1" || item.zt === "2" ? {
            c: common_vendor.t(item.zt === "1" ? "未收款" : item.zt === "2" ? "已收款" : "已退货")
          } : {
            d: common_vendor.t(item.czlx === "1" ? "退货上架" : item.czlx === "2" ? "临时下架" : "退出库存")
          }, {
            e: common_vendor.f(item.goodsinfos, (item1, index1, i1) => {
              return common_vendor.e({
                a: "8e1eea3f-1-" + i0 + "-" + i1 + "," + ("8e1eea3f-0-" + i0 + "-" + i1),
                b: common_vendor.o(($event) => getDetail(item), index1),
                c: "8e1eea3f-0-" + i0 + "-" + i1,
                d: common_vendor.p({
                  width: "190rpx",
                  height: "190rpx",
                  fit: "fill",
                  radius: "18rpx",
                  src: item1.cover
                }),
                e: item1.finenessname
              }, item1.finenessname ? {
                f: common_vendor.t(item1.finenessname),
                g: "8e1eea3f-2-" + i0 + "-" + i1,
                h: common_vendor.p({
                  size: "mini",
                  color: "linear-gradient(132deg, #D94C24 0%, #FF5221 100%)"
                })
              } : {}, {
                i: common_vendor.t(item1.name),
                j: common_vendor.t(item1.ch),
                k: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(item1.ch), index1),
                l: common_vendor.t(item1.price),
                m: item.zt === "1" && !selectedItems.value.includes(item1)
              }, item.zt === "1" && !selectedItems.value.includes(item1) ? {
                n: common_vendor.o(($event) => selectedProduct(item1), index1),
                o: "8e1eea3f-3-" + i0 + "-" + i1,
                p: common_vendor.p({
                  color: "#D2CFCA",
                  type: "circle",
                  size: "32"
                })
              } : {}, {
                q: item.zt === "1" && selectedItems.value.includes(item1)
              }, item.zt === "1" && selectedItems.value.includes(item1) ? {
                r: common_vendor.o(($event) => selectedProduct(item1), index1),
                s: "8e1eea3f-4-" + i0 + "-" + i1,
                t: common_vendor.p({
                  color: "#E6432E",
                  type: "checkbox-filled",
                  size: "32"
                })
              } : {}, {
                v: index1
              });
            }),
            f: common_vendor.t(item.ygname),
            g: common_vendor.t(item.khname),
            h: common_vendor.t(item.goodsinfos.length),
            i: common_vendor.t(computeTotalPrice(item)),
            j: index
          });
        }),
        b: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8e1eea3f"]]);
wx.createComponent(Component);
