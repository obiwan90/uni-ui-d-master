"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  (_component_van_loading + _component_van_image + _component_van_tag)();
}
const _sfc_main = {
  __name: "serviceCard",
  props: {
    orderList: {
      type: Array,
      required: true
    }
  },
  emits: ["goDetail"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const getDetail = (item) => {
      emit("goDetail", item, "sh");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.orderList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.ordernumber),
            b: common_vendor.t(item.zt === "1" ? "售后中" : item.zt === "2" ? "售后成功" : "售后失败"),
            c: common_vendor.f(item.goodsinfos, (item1, index1, i1) => {
              return common_vendor.e({
                a: "89485dbc-1-" + i0 + "-" + i1 + "," + ("89485dbc-0-" + i0 + "-" + i1),
                b: "89485dbc-0-" + i0 + "-" + i1,
                c: common_vendor.p({
                  width: "190rpx",
                  height: "190rpx",
                  fit: "fill",
                  radius: "18rpx",
                  src: item1.cover
                }),
                d: item1.finenessname
              }, item1.finenessname ? {
                e: common_vendor.t(item1.finenessname),
                f: "89485dbc-2-" + i0 + "-" + i1,
                g: common_vendor.p({
                  size: "mini",
                  color: "linear-gradient(132deg, #D94C24 0%, #FF5221 100%)"
                })
              } : {}, {
                h: common_vendor.t(item1.name),
                i: common_vendor.t(item1.ch),
                j: common_vendor.t(item1.price),
                k: common_vendor.o(($event) => getDetail(item), index1),
                l: index1
              });
            }),
            d: index
          };
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
wx.createComponent(_sfc_main);
