"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
if (!Array) {
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_custom_channel_tap2 = common_vendor.resolveComponent("custom-channel-tap");
  const _easycom_custom_tag2 = common_vendor.resolveComponent("custom-tag");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  (_component_van_loading + _component_van_image + _easycom_custom_channel_tap2 + _easycom_custom_tag2 + _component_van_tag)();
}
const _easycom_custom_channel_tap = () => "../../../components/custom-channel-tap/custom-channel-tap.js";
const _easycom_custom_tag = () => "../../../components/custom-tag/custom-tag.js";
if (!Math) {
  (_easycom_custom_channel_tap + _easycom_custom_tag)();
}
const _sfc_main = {
  __name: "productCard",
  props: {
    showSetting: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object,
      default: {}
    }
  },
  emits: ["openProductEditPrice"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const good = props.good;
    const tagBgColor = common_vendor.ref("#F2F3F6");
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const goDetailPage = (good2) => {
      if (good2.zjlx !== "3") {
        goPage("/pagesProductDetail/productDetail/productDetail?id=" + good2.id);
      } else {
        goPage("/pagesSell/sell/sell?id=" + good2.freeid);
      }
    };
    const openEditPrice = () => {
      const goodData = props.good;
      emit("openProductEditPrice", goodData);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(good)
      }, common_vendor.unref(good) ? common_vendor.e({
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
          src: common_vendor.unref(good).cover
        }),
        d: common_vendor.unref(good).special === "1"
      }, common_vendor.unref(good).special === "1" ? {} : {}, {
        e: common_vendor.unref(good).zjlx === "1"
      }, common_vendor.unref(good).zjlx === "1" ? {
        f: common_vendor.p({
          text1: "官方质检",
          text1Color: "#E6432E",
          text2: common_vendor.unref(good).finenessname,
          backgroundColor: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        })
      } : {}, {
        g: common_vendor.unref(good).zjlx === "2"
      }, common_vendor.unref(good).zjlx === "2" ? {
        h: common_vendor.p({
          text1: "授权质检",
          text1Color: "#246C14",
          text2: common_vendor.unref(good).finenessname,
          backgroundColor: "linear-gradient( 135deg, #246B13 0%, #39D591 100%)"
        })
      } : {}, {
        i: common_vendor.unref(good).zjlx === "3"
      }, common_vendor.unref(good).zjlx === "3" ? {
        j: common_vendor.p({
          text1: "自由货源",
          text1Color: "#FF6C27",
          text2: common_vendor.unref(good).finenessname,
          backgroundColor: "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "
        })
      } : {}, {
        k: common_vendor.t(common_vendor.unref(good).name),
        l: common_vendor.unref(good).gjbbname
      }, common_vendor.unref(good).gjbbname ? {
        m: common_vendor.p({
          tagText: common_vendor.unref(good).gjbbname,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        n: common_vendor.unref(good).wlbbname
      }, common_vendor.unref(good).wlbbname ? {
        o: common_vendor.p({
          tagText: common_vendor.unref(good).wlbbname,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        p: common_vendor.unref(good).bxzt
      }, common_vendor.unref(good).bxzt ? {
        q: common_vendor.p({
          tagText: common_vendor.unref(good).bxzt,
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        r: common_vendor.unref(good).efficiency
      }, common_vendor.unref(good).efficiency ? {
        s: common_vendor.p({
          tagText: "电池" + common_vendor.unref(good).efficiency + "%",
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        t: common_vendor.unref(good).delivery
      }, common_vendor.unref(good).delivery ? {
        v: common_vendor.p({
          tagText: common_vendor.unref(good).delivery + "发货",
          bgColor: common_vendor.unref(tagBgColor)
        })
      } : {}, {
        w: common_vendor.t(common_vendor.unref(good).price),
        x: common_vendor.unref(good).yjzt === 2
      }, common_vendor.unref(good).yjzt === 2 ? {
        y: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#EB4636"
        })
      } : {}, {
        z: common_vendor.unref(good).byzt === "1"
      }, common_vendor.unref(good).byzt === "1" ? {
        A: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#669CFD"
        })
      } : {}) : {}, {
        B: common_vendor.o(($event) => goDetailPage(common_vendor.unref(good))),
        C: __props.showSetting && common_vendor.unref(good).mineCompany
      }, __props.showSetting && common_vendor.unref(good).mineCompany ? {
        D: common_vendor.t(common_vendor.unref(utils_common.formatTimestamp)(common_vendor.unref(good).updatetime)),
        E: common_vendor.t(common_vendor.unref(good).cgyname),
        F: common_vendor.t(common_vendor.unref(good).ckname),
        G: common_vendor.o(openEditPrice)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff21cd10"]]);
wx.createComponent(Component);
