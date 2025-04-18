"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "payPannel",
  props: {
    settlementList: {
      type: Object,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const filterPay = common_vendor.computed(() => {
      if (!props.show) {
        return pay.value.filter((item, index) => index !== pay.value.length - 1);
      }
      return pay.value;
    });
    const pay = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_weixin@3x.png", text: "微信支付" },
      { image: "https://www.xzxskj.com/xcximg/icon_zhifubao@3x.png", text: "支付宝支付" },
      { image: "https://www.xzxskj.com/xcximg/icon_yue@3x.png", text: "余额支付" },
      { image: "https://www.xzxskj.com/xcximg/icon_daikuan@3x.png", text: "先贷后款" }
    ]);
    const selectedTap = common_vendor.ref(0);
    const selectTap = (index) => {
      console.log("选择 index:", index);
      if (index === 3) {
        console.log("先贷后款");
        console.log("props.settlementList", props.settlementList);
        const invalidItems = props.settlementList.filter((item) => !item.mineCompany);
        if (invalidItems.length > 0) {
          common_vendor.index.showModal({
            title: "提示",
            content: `${invalidItems.map((item) => item.goodsinfos.name).join(", ")} 不是当前公司的产品`,
            confirmText: "确定",
            success: (res) => {
              if (res.confirm) {
                console.log("用户点击确定");
              }
            }
          });
        } else {
          fristGoodsPayLater(props.settlementList, 1);
        }
      }
      selectedTap.value = index;
    };
    const fristGoodsPayLater = (settlementList, lx) => {
      const encodedSettlementList = encodeURIComponent(JSON.stringify(settlementList));
      const path = `/pagesFirstWholesale/firstWholeSale/firstWholeSale?settlementList=${encodedSettlementList}&lx=${lx}`;
      common_vendor.index.navigateTo({
        url: path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(filterPay.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.text),
            c: common_vendor.unref(selectedTap) === index ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png",
            d: index,
            e: common_vendor.o(($event) => selectTap(index), index)
          };
        }),
        c: common_vendor.o(($event) => _ctx.$emit("payType", common_vendor.unref(pay)[common_vendor.unref(selectedTap)]))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6f1ef07"]]);
wx.createComponent(Component);
