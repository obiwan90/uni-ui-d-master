"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "procurementDescription",
  setup(__props) {
    common_vendor.ref([
      {
        title: "质检防撕表擅自撕毁视为放弃保修",
        content: '<view style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">平台所售二手物品均经过专业质检并附质检防撕表，<view style="font-weight: bold;font-family: PingFang SC, PingFang SC;color: #1F1F1F;font-size: 24rpx;border-bottom: 12rpx solid  #FFA468;box-sizing: border-box;">擅自撕毁视为放弃保修</view>，出现任何质量问题，我们将不再对其进行保修。</view>'
      },
      {
        title: "拆机验机请务必全程在监控下进行",
        content: "若买家收货需拆机验机，请务必全程在监控下进行，若对平台质检有疑问，请提供完整收货拆机视频，提交视频中快递单号清晰、包裹四面未拆痕迹、机身外观及干净整洁质检防撕表。"
      },
      {
        title: "与信息和质检一致的售后不予处理	",
        content: "付款前请详细查阅产品信息与质检报告，与信息和质检一致的售后不予处理。"
      },
      {
        title: "拒绝受理质量问题以外的售后和退款",
        content: "平台拒绝受理质量问题以外的售后和退款（例：买错、不想要、重复购买等之类）。"
      },
      {
        title: "请及时保留有效证据提交售后",
        content: "账户ID、机身外观、屏幕外观、液晶、面容、指纹、电池均不在保修范围内，收货时请详细检查以上情况，若收货时出现以上情况请及时保留有效证据提交售后。"
      }
    ]);
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5c07ef2f"]]);
wx.createPage(MiniProgramPage);
