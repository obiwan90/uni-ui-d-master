"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  _easycom_uv_tabs2();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
if (!Math) {
  _easycom_uv_tabs();
}
const _sfc_main = {
  __name: "recoveryLevel",
  setup(__props) {
    const scrollInto = common_vendor.ref();
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const activeTab1Index = common_vendor.ref(0);
    const tabsData = common_vendor.computed(() => {
      return ruleData.value.map((item) => ({
        name: item.type
      }));
    });
    const uvTabs1Change = (e) => {
      console.log("切换了标签:", e.index);
      if (e.index !== void 0) {
        activeTab1Index.value = e.index;
        scrollInto.value = "box-" + e.index;
      } else {
        console.error("标签索引错误");
      }
    };
    const ruleData = common_vendor.ref([
      { type: "全新未激活", values: [
        { title: "机身外观", content: "全套未激活" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "全新全套原封未激活" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "全套已激活", values: [
        { title: "机身外观", content: "全套未激活" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "原封全套激活30天内，包装无破损，配件齐全且原装，机身完美" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "充新", values: [
        { title: "机身外观", content: "完美" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "机身外观无任何瑕疵" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "靓机", values: [
        { title: "机身外观", content: "细微瑕疵" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "外壳细微瑕疵，外屏完美，整体成色99新" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "小花", values: [
        { title: "机身外观", content: "轻微磕碰" },
        { title: "屏幕外观", content: "细微划痕" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "外壳轻微磕碰，外屏细微划痕，整体成色95新" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "花机", values: [
        { title: "机身外观", content: "正常磕碰掉漆" },
        { title: "屏幕外观", content: "正常划痕" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "外壳正常磕碰掉漆，外屏正常划痕或轻微硬划痕，机身无弯曲、破损" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "外爆", values: [
        { title: "机身外观", content: "轻微破裂" },
        { title: "屏幕外观", content: "正常破裂" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "外壳轻微破裂或正常磕碰掉漆，外屏正常破裂或大花，机身无弯曲、缺失" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "内爆", values: [
        { title: "机身外观", content: "轻微破裂" },
        { title: "屏幕外观", content: "正常破裂" },
        { title: "液晶显示", content: "液晶原装且可正常测试功能" },
        { title: "成色描述", content: "外壳轻微破裂或正常磕碰掉漆，外屏正常破裂或大花，机身无弯曲、缺失，液晶原装且可正常测试功能" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "废品", values: [
        { title: "机身外观", content: "无要求" },
        { title: "屏幕外观", content: "无要求" },
        { title: "液晶显示", content: "无要求" },
        { title: "成色描述", content: "零部件及主板无缺失" },
        // {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] }
    ]);
    common_vendor.onLoad((options) => {
      console.log("传递过来的参数:", options.id);
      if (options.id) {
        activeTab1Index.value = parseInt(options.id);
        scrollInto.value = "box-" + activeTab1Index.value;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        d: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        e: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.o(uvTabs1Change),
        g: common_vendor.p({
          list: common_vendor.unref(tabsData),
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          scrollable: true,
          fontSize: 32,
          inactiveStyle: {
            color: "#1F1F1F",
            opacity: 0.6,
            fontWeight: "bold"
          },
          activeStyle: {
            color: "#1F1F1F",
            opacity: 1,
            fontWeight: "bold"
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        h: common_vendor.f(common_vendor.unref(ruleData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.type),
            b: common_vendor.f(item.values, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.title),
                b: common_vendor.t(item1.content),
                c: index2
              };
            }),
            c: "box-" + index,
            d: index
          };
        }),
        i: common_vendor.unref(scrollInto)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9ba42bf"]]);
wx.createPage(MiniProgramPage);
