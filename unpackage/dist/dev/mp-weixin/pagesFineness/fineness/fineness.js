"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "fineness",
  setup(__props) {
    const data = common_vendor.ref([
      { title: "二手批发成色说明", values: [
        { id: 0, text: "机身外观成色说明" },
        { id: 1, text: "屏幕外观成色说明" },
        { id: 2, text: "液晶显示成色说明" }
      ] },
      { title: "二手批发等级说明", values: [] },
      { title: "回收报价等级说明", values: [] }
    ]);
    const goTitlePage = utils_debounce.debounce((item) => {
      console.log("goTitlePage触发了");
      if (item.title === "二手批发等级说明") {
        common_vendor.index.navigateTo({
          url: "/pagesFinenessLevel/finenessLevel/pagesFinenessLevel"
        });
      } else if (item.title === "回收报价等级说明") {
        common_vendor.index.navigateTo({
          url: "/pagesRecoveryLevel/recoveryLevel/recoveryLevel"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pagesFinenessDetail/finenessDetail/finenessDetail"
        });
      }
    }, 500);
    const goPage = utils_debounce.debounce((id) => {
      console.log("goPage触发了");
      common_vendor.index.navigateTo({
        url: "/pagesFinenessDetail/finenessDetail/finenessDetail?id=" + id
      });
    }, 500);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.title !== "二手批发成色说明"
          }, item.title !== "二手批发成色说明" ? {} : {}, {
            c: common_vendor.f(item.values, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.text),
                b: index2,
                c: common_vendor.o(($event) => common_vendor.unref(goPage)(item1.id), index2)
              };
            }),
            d: index,
            e: common_vendor.o(($event) => common_vendor.unref(goTitlePage)(item), index)
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-04d62594"]]);
wx.createPage(MiniProgramPage);
