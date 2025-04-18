"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCustomSellOrderDetail_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
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
  __name: "customSellOrderDetail",
  setup(__props) {
    const orderInfo = common_vendor.ref();
    const addressInfos = common_vendor.ref();
    common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref("1");
    const zyf = common_vendor.ref("0");
    const selectedTap = common_vendor.ref(0);
    const express = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png", value: "顺丰", expressId: "2" },
      { image: "https://www.xzxskj.com/xcximg/icon_jingdong@3x.png", value: "京东", expressId: "1" },
      { image: "https://www.xzxskj.com/xcximg/icon_songhuo@3x.png", value: "送货上门", expressId: "3" },
      { image: "https://www.xzxskj.com/xcximg/icon_ziti@3x.png", value: "自提", expressId: "4" }
    ]);
    const order_info = common_vendor.ref([
      { name: "订单号", value: "NO.202303281234", image: "", zt: ["1", "2", "3", "4", "5", "7"] },
      { name: "下单时间", value: "京东 1234567", image: "", zt: ["1", "2", "3", "4", "5", "7"] },
      { name: "付款时间", value: "2024-03-12 15:00:00", image: "", zt: ["2", "3", "4", "5", "7"] },
      { name: "发货时间", value: "2024-03-12 15:00:00", image: "", zt: ["3", "4", "5", "7"] },
      { name: "发货方式", value: "2024-03-12 15:00:00", image: "", zt: ["3", "4", "5", "7"] },
      { name: "收货时间", value: "2024-03-12 15:00:00", image: "", zt: ["5", "7"] }
    ]);
    const getFilteredOrderInfo = (zt) => {
      return order_info.value.filter((item) => item.zt.includes(zt));
    };
    const handleBtnClick = () => {
      common_vendor.index.navigateTo({
        url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息"
      });
    };
    const apiGetOrderDetailAc = async (id) => {
      var _a;
      const param = {
        lx: "4",
        // 用户详情
        id
      };
      const res = await pagesCustomSellOrderDetail_api_api.apiGetOrderDetail(param);
      console.log("res", res);
      if (res.code === "200") {
        orderInfo.value = res.infos;
        addressInfos.value = res.infos.addinfos;
        selectedTap.value = express.value.findIndex((item) => {
          return item.expressId == res.infos.expressid;
        });
        if (res.infos.zyf) {
          zyf.value = res.infos.zyf;
        }
      }
      order_info.value = [
        {
          name: "订单号",
          value: orderInfo.value.ordernumber || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["1", "3", "4", "5", "7"]
        },
        {
          name: "下单时间",
          value: utils_common.formatTimestamp(res.infos.add_time) || " ",
          // 处理空值
          image: "",
          zt: ["1", "3", "4", "5", "7"]
        },
        {
          name: "付款时间",
          value: utils_common.formatTimestamp(res.infos.pay_time) || " ",
          // 处理空值
          image: "",
          zt: ["3", "4", "5", "7"]
        },
        {
          name: "发货时间",
          value: utils_common.formatTimestamp(res.infos.fhsj) || " ",
          // 处理空值
          image: "",
          zt: ["4", "5", "7"]
        },
        {
          name: "收货方式",
          value: ((_a = express.value.find((item) => item.expressId == res.infos.expressid)) == null ? void 0 : _a.value) || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["4", "5", "7"]
        },
        {
          name: "收货时间",
          value: utils_common.formatTimestamp(res.infos.shsj) || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["5", "7"]
        }
      ];
    };
    common_vendor.onLoad((options) => {
      if (options.orderId) {
        apiGetOrderDetailAc(options.orderId);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        b: common_vendor.unref(orderInfo).zt === "1"
      }, common_vendor.unref(orderInfo).zt === "1" ? {} : {}, {
        c: common_vendor.unref(orderInfo).zt === "3"
      }, common_vendor.unref(orderInfo).zt === "3" ? {} : {}, {
        d: common_vendor.unref(orderInfo).zt === "4"
      }, common_vendor.unref(orderInfo).zt === "4" ? {} : {}, {
        e: common_vendor.unref(orderInfo).zt === "5"
      }, common_vendor.unref(orderInfo).zt === "5" ? {} : {}, {
        f: common_vendor.unref(orderInfo).zt === "7"
      }, common_vendor.unref(orderInfo).zt === "7" ? {} : {}, {
        g: common_vendor.unref(orderInfo).zt === "4" || common_vendor.unref(orderInfo).zt === "5" || common_vendor.unref(orderInfo).zt === "7"
      }, common_vendor.unref(orderInfo).zt === "4" || common_vendor.unref(orderInfo).zt === "5" || common_vendor.unref(orderInfo).zt === "7" ? {
        h: common_vendor.o(handleBtnClick)
      } : {}, {
        i: common_vendor.f(common_vendor.unref(orderInfo).gwclist, (item, index, i0) => {
          return common_vendor.e({
            a: "fa5aa00f-2-" + i0 + "," + ("fa5aa00f-1-" + i0),
            b: "fa5aa00f-1-" + i0,
            c: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              fit: "fill",
              radius: "18rpx",
              src: item.gooinfos.cover
            }),
            d: item.gooinfos.finenessname
          }, item.gooinfos.finenessname ? {
            e: common_vendor.t(item.gooinfos.finenessname)
          } : {}, {
            f: common_vendor.t(item.gooinfos.name),
            g: common_vendor.t(item.gooinfos.ch),
            h: common_vendor.t(item.gooinfos.cgyname),
            i: common_vendor.t(item.gooinfos.shopname),
            j: common_vendor.t(item.gooinfos.price),
            k: index
          });
        }),
        j: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        k: common_vendor.t(common_vendor.unref(orderInfo).price),
        l: common_vendor.t(common_vendor.unref(orderInfo).zyf),
        m: common_vendor.t(common_vendor.unref(orderInfo).num),
        n: common_vendor.t(common_vendor.unref(orderInfo).price),
        o: common_vendor.t(common_vendor.unref(addressInfos).province),
        p: common_vendor.t(common_vendor.unref(addressInfos).city),
        q: common_vendor.t(common_vendor.unref(addressInfos).area),
        r: common_vendor.t(common_vendor.unref(addressInfos).address),
        s: common_vendor.t(common_vendor.unref(addressInfos).name),
        t: common_vendor.t(common_vendor.unref(addressInfos).phone),
        v: common_vendor.t(common_vendor.unref(orderInfo).remarks),
        w: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? {
        x: common_vendor.f(getFilteredOrderInfo(common_vendor.unref(orderInfo).zt), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.image
          }, item.image ? {
            d: item.image
          } : {}, {
            e: index
          });
        })
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa5aa00f"]]);
wx.createPage(MiniProgramPage);
