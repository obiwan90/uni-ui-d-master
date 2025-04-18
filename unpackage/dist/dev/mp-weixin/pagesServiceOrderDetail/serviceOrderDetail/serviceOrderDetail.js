"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  (_easycom_custom_header2 + _component_van_loading + _component_van_image)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "serviceOrderDetail",
  setup(__props) {
    common_vendor.ref([
      { name: "订单号", value: "NO.202303281234", image: "", zt: ["1", "2", "3"] },
      { name: "申请时间", value: "京东 1234567", image: "", zt: ["1", "2", "3"] },
      { name: "售后类型", value: "京东 1234567", image: "", zt: ["2"] },
      { name: "售后完成", value: "京东 1234567", image: "", zt: ["2"] },
      { name: "销售订单", value: "金克斯", image: "", zt: ["1", "2", "3"] },
      { name: "下单时间", value: "2024-03-12 15:00:00", image: "", zt: ["1", "2", "3"] },
      { name: "付款时间", value: "2024-03-12 15:00:00", image: "", zt: ["1", "2", "3"] },
      { name: "收货时间", value: "2024-03-12 15:00:00", image: "", zt: ["1", "2", "3"] },
      { name: "下单备注", value: "该商户已用支付宝收款了，线下收款已到账", image: "", zt: ["1", "2", "3"] }
    ]);
    common_vendor.ref([
      { text: "同意退款", shlx: "5", isDelivery: false },
      { text: "同意补差", shlx: "1", isDelivery: false },
      { text: "同意售后", shlx: "4,5", isDelivery: false },
      { text: "已收到退货，同意退款", shlx: "5", isDelivery: true },
      { text: "已收货，售后完成", shlx: "4", isDelivery: true }
    ]);
    const handleBtnClick = () => {
      common_vendor.index.navigateTo({
        url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息"
      });
    };
    common_vendor.onMounted(() => {
      const itemString = common_vendor.index.getStorageSync("orderDetailItem");
      if (itemString) {
        const item = JSON.parse(itemString);
        orderInfo.value = item;
        orderInfo.value.khid;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.orderInfo
      }, _ctx.orderInfo ? common_vendor.e({
        b: _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "5"
      }, _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "5" ? {} : {}, {
        c: _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "1"
      }, _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "1" ? {} : {}, {
        d: _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "2"
      }, _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "2" ? {} : {}, {
        e: _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "3"
      }, _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "3" ? {} : {}, {
        f: _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "4"
      }, _ctx.orderInfo.zt === "1" && _ctx.orderInfo.shlx === "4" ? {} : {}, {
        g: _ctx.orderInfo.zt === "2"
      }, _ctx.orderInfo.zt === "2" ? {} : {}, {
        h: _ctx.orderInfo.zt === "3"
      }, _ctx.orderInfo.zt === "3" ? {} : {}, {
        i: _ctx.orderInfo.zt === "3"
      }, _ctx.orderInfo.zt === "3" ? {
        j: common_vendor.o(handleBtnClick)
      } : {}, {
        k: common_vendor.f(_ctx.orderInfo.goodsinfos, (item, index, i0) => {
          return common_vendor.e({
            a: "21c88f40-2-" + i0 + "," + ("21c88f40-1-" + i0),
            b: "21c88f40-1-" + i0,
            c: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              fit: "contain",
              radius: "18rpx",
              src: "https://www.xzxskj.com" + item.cover
            }),
            d: item.finenessname
          }, item.finenessname ? {
            e: common_vendor.t(item.finenessname)
          } : {}, {
            f: common_vendor.t(item.name),
            g: common_vendor.t(item.ch),
            h: common_vendor.t(item.cgyname),
            i: common_vendor.t(item.shopname),
            j: common_vendor.t(item.price),
            k: _ctx.selectedItems.includes(item.ch)
          }, _ctx.selectedItems.includes(item.ch) ? {
            l: common_vendor.o(($event) => _ctx.selected(item), index)
          } : {
            m: common_vendor.o(($event) => _ctx.selected(item), index)
          }, {
            n: index
          });
        }),
        l: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        m: common_vendor.t(_ctx.item.shyy),
        n: common_vendor.t(_ctx.item.ordernumber)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21c88f40"]]);
wx.createPage(MiniProgramPage);
