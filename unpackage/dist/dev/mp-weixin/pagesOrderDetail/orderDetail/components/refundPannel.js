"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesOrderDetail_api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "refundPannel",
  props: {
    itemIndex: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const propos = __props;
    const emit = __emit;
    const orderInfo = common_vendor.ref(null);
    const remark = common_vendor.ref("");
    const getPrice = common_vendor.computed(() => {
      if (orderInfo.value) {
        if (propos.itemIndex === -1) {
          return "￥" + orderInfo.value.price;
        } else {
          return "￥" + orderInfo.value.goodsinfos[propos.itemIndex].price;
        }
      }
    });
    const comfirm = async () => {
      console.log(" propos.itemIndex", propos.itemIndex);
      console.log("orderInfo.value", orderInfo.value);
      const param = {
        // id: propos.itemIndex===-1? orderInfo.value.id:orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
        id: orderInfo.value.orderid,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: propos.itemIndex === -1 ? 1 : 2,
        goodsid: propos.itemIndex === -1 ? orderInfo.value.goodsinfos.map((item) => item.goodsid).join(",") : orderInfo.value.goodsinfos[propos.itemIndex].goodsid,
        remarks: remark.value
      };
      console.log("param", param);
      const res = await pagesOrderDetail_api_api.apiRefund(param);
      console.log("res:", res);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "退款申请提交成功",
          icon: "success",
          duration: 500
        });
      } else {
        common_vendor.index.showToast({
          title: "退款申请提交失败",
          icon: "error",
          duration: 500
        });
      }
      setTimeout(() => {
        emit("close");
      }, 500);
    };
    common_vendor.onMounted(() => {
      const itemString = common_vendor.index.getStorageSync("orderDetailItem");
      if (itemString) {
        orderInfo.value = JSON.parse(itemString);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: getPrice.value,
        c: common_vendor.o(($event) => getPrice.value = $event.detail.value),
        d: common_vendor.unref(remark),
        e: common_vendor.o(($event) => common_vendor.isRef(remark) ? remark.value = $event.detail.value : null),
        f: common_vendor.o(comfirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b32d9ec"]]);
wx.createComponent(Component);
