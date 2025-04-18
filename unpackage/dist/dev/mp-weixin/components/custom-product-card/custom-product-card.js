"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_custom_channel_tap2 = common_vendor.resolveComponent("custom-channel-tap");
  const _easycom_custom_tag2 = common_vendor.resolveComponent("custom-tag");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  (_component_van_loading + _component_van_image + _easycom_custom_channel_tap2 + _easycom_custom_tag2 + _component_van_tag)();
}
const _easycom_custom_channel_tap = () => "../custom-channel-tap/custom-channel-tap.js";
const _easycom_custom_tag = () => "../custom-tag/custom-tag.js";
if (!Math) {
  (_easycom_custom_channel_tap + _easycom_custom_tag)();
}
const _sfc_main = {
  __name: "custom-product-card",
  props: ["good"],
  emits: ["openProductEditPrice"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tagBgColor = common_vendor.ref("#F2F3F6");
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const goDetailPage = (good) => {
      if (good.zjlx !== "3") {
        goPage("/pagesProductDetail/productDetail/productDetail?id=" + good.id);
      } else {
        goPage("/pagesSell/sell/sell?id=" + good.freeid);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.good
      }, __props.good ? common_vendor.e({
        b: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        c: common_vendor.p({
          radius: "18rpx",
          width: "190rpx",
          height: "190rpx",
          fit: "fill",
          src: __props.good.cover
        }),
        d: __props.good.special === "1"
      }, __props.good.special === "1" ? {} : {}, {
        e: __props.good.zjlx === "1"
      }, __props.good.zjlx === "1" ? {
        f: common_vendor.p({
          text1: "官方质检",
          text1Color: "#E6432E",
          text2: __props.good.finenessname,
          backgroundColor: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        })
      } : {}, {
        g: __props.good.zjlx === "2"
      }, __props.good.zjlx === "2" ? {
        h: common_vendor.p({
          text1: "授权质检",
          text1Color: "#246C14",
          text2: __props.good.finenessname,
          backgroundColor: "linear-gradient( 135deg, #246B13 0%, #39D591 100%)"
        })
      } : {}, {
        i: __props.good.zjlx === "3"
      }, __props.good.zjlx === "3" ? {
        j: common_vendor.p({
          text1: "自由货源",
          text1Color: "#FF6C27",
          text2: __props.good.finenessname,
          backgroundColor: "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "
        })
      } : {}, {
        k: common_vendor.t(__props.good.name),
        l: __props.good.gjbbname
      }, __props.good.gjbbname ? {
        m: common_vendor.p({
          tagText: __props.good.gjbbname,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        n: __props.good.wlbbname
      }, __props.good.wlbbname ? {
        o: common_vendor.p({
          tagText: __props.good.wlbbname,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        p: __props.good.bxzt
      }, __props.good.bxzt ? {
        q: common_vendor.p({
          tagText: __props.good.bxzt,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        r: __props.good.efficiency
      }, __props.good.efficiency ? {
        s: common_vendor.p({
          tagText: "电池" + __props.good.efficiency + "%",
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        t: __props.good.delivery
      }, __props.good.delivery ? {
        v: common_vendor.p({
          tagText: __props.good.delivery + "发货",
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        w: common_vendor.t(__props.good.price),
        x: __props.good.yjzt === 2
      }, __props.good.yjzt === 2 ? {
        y: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#EB4636"
        })
      } : {}, {
        z: __props.good.byzt === "1"
      }, __props.good.byzt === "1" ? {
        A: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#669CFD"
        })
      } : {}) : {}, {
        B: common_vendor.o(($event) => goDetailPage(props.good))
      }, {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-871f5818"]]);
wx.createComponent(Component);
