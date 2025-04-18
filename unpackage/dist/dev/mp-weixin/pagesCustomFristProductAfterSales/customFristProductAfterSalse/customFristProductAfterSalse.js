"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesCustomFristProductAfterSales_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
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
  __name: "customFristProductAfterSalse",
  setup(__props) {
    const addressInfos = common_vendor.ref();
    const orderInfo = common_vendor.ref();
    common_vendor.ref([]);
    common_vendor.ref(0);
    const order_info = common_vendor.ref();
    const getFilteredOrderInfo = (zt) => {
      return order_info.value.filter((item) => item.zt.includes(zt));
    };
    const cellPhone = (phone) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: phone
      });
    };
    common_vendor.ref(false);
    const express = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png", value: "顺丰", expressId: "2" },
      { image: "https://www.xzxskj.com/xcximg/icon_jingdong@3x.png", value: "京东", expressId: "1" },
      { image: "https://www.xzxskj.com/xcximg/icon_songhuo@3x.png", value: "送货上门", expressId: "3" },
      { image: "https://www.xzxskj.com/xcximg/icon_ziti@3x.png", value: "自提", expressId: "4" }
    ]);
    const selectedTap = common_vendor.ref(0);
    const apiGetFpbkOrderDetailAc = async (id) => {
      const param = {
        id,
        lx: "6"
      };
      const res = await pagesCustomFristProductAfterSales_api_api.apiGetOrderDetail(param);
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
          zt: ["1", "2", "3"]
        },
        // {
        // 	name: '配送方式',
        // 	value: express.value.find(item => item.expressId == res.infos.expressid)?.value || ' ', // 处理空值
        // 	image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
        // 	zt: ['1','2']
        // },
        {
          name: "销售员工",
          value: res.infos.ygname || " ",
          // 处理空值
          image: "",
          zt: ["1", "2", "3"]
        },
        // {
        // 	name: '退货方式',
        // 	value: formatTimestamp(res.infos.ygname) || ' ', // 处理空值
        // 	image: '',
        // 	zt: ['3']
        // },
        {
          name: "退货时间",
          value: utils_common.formatTimestamp(res.infos.thsj) || " ",
          // 处理空值
          image: "",
          zt: ["3"]
        },
        {
          name: "下单时间",
          value: utils_common.formatTimestamp(res.infos.add_time) || " ",
          // 处理空值
          image: "",
          zt: ["1", "2", "3"]
        },
        {
          name: "下单备注",
          value: res.infos.remarks || " ",
          // 处理空值
          image: "",
          zt: ["1", "2", "3"]
        }
      ];
    };
    common_vendor.ref(0);
    common_vendor.ref([
      { value: 0, text: "退货上架" },
      { value: 1, text: "退货下架" },
      { value: 2, text: "退出仓库" }
    ]);
    common_vendor.onLoad((options) => {
      if (options.orderId) {
        apiGetFpbkOrderDetailAc(options.orderId);
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        b: common_vendor.unref(orderInfo).zt === "1"
      }, common_vendor.unref(orderInfo).zt === "1" ? {} : {}, {
        c: common_vendor.unref(orderInfo).zt === "2"
      }, common_vendor.unref(orderInfo).zt === "2" ? {} : {}, {
        d: common_vendor.unref(orderInfo).zt === "3"
      }, common_vendor.unref(orderInfo).zt === "3" ? {} : {}, {
        e: common_vendor.f(common_vendor.unref(orderInfo).gwclist, (item, index, i0) => {
          return common_vendor.e({
            a: "893c0289-2-" + i0 + "," + ("893c0289-1-" + i0),
            b: "893c0289-1-" + i0,
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
        f: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        g: common_vendor.t(common_vendor.unref(orderInfo).num),
        h: common_vendor.t(common_vendor.unref(orderInfo).price),
        i: common_vendor.unref(orderInfo).khinfos
      }, common_vendor.unref(orderInfo).khinfos ? {
        j: common_vendor.t(common_vendor.unref(orderInfo).khinfos.mdmc),
        k: common_vendor.t(common_vendor.unref(orderInfo).khinfos.mddz),
        l: common_vendor.t(common_vendor.unref(orderInfo).khname),
        m: common_vendor.t(common_vendor.unref(orderInfo).khinfos.phone),
        n: common_vendor.o(($event) => cellPhone(common_vendor.unref(orderInfo).khinfos.phone))
      } : {}, {
        o: common_vendor.unref(orderInfo).zt === "2"
      }, common_vendor.unref(orderInfo).zt === "2" ? common_vendor.e({
        p: common_vendor.t(common_vendor.unref(orderInfo).skyg),
        q: common_vendor.t(common_vendor.unref(utils_common.formatTimestamp)(common_vendor.unref(orderInfo).sktime)),
        r: common_vendor.t(((_a = common_vendor.unref(express).find((item) => item.expressId == common_vendor.unref(orderInfo).expressid)) == null ? void 0 : _a.value) || " "),
        s: common_vendor.t(common_vendor.unref(orderInfo).remarks),
        t: common_vendor.unref(orderInfo).imgs
      }, common_vendor.unref(orderInfo).imgs ? {
        v: common_vendor.f(common_vendor.unref(orderInfo).imgs.split(","), (item3, index3, i0) => {
          return {
            a: item3,
            b: index3
          };
        })
      } : {}) : {}, {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-893c0289"]]);
wx.createPage(MiniProgramPage);
