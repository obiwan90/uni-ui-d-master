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
  __name: "pagesFinenessLevel",
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
        { title: "成色描述", content: "未激活，包装可拆封但无破损，全套配件齐全且原装未使用。" },
        { title: "备注", content: "未拆封需拆封验机，否则不予售后" },
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "全套已激活", values: [
        { title: "机身外观", content: "全套已激活" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "激活40天内，包装无破损，全套配件齐全且原装，允许使用。" },
        { title: "备注", content: "以包裹签收日期为准" },
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "全新单机", values: [
        { title: "机身外观", content: "完美" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "肉眼判断或强光下无法拍摄出任何瑕疵" },
        { title: "备注", content: "全新单机" },
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "99新", values: [
        { title: "机身外观", content: "细微瑕疵" },
        { title: "屏幕外观", content: "完美" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "机身≤2处且<3mm的细微划痕，或≤1处且<0.5mm的轻微磕碰/掉漆;屏幕外观仅允许强光下≤2处且<3mm的细微划痕" },
        { title: "备注", content: "整体成色接近全新" },
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      // {type:'98新',values:[
      // 	{title:'机身外观',content:'全套未激活'},
      // 	{title:'屏幕外观',content:'全新未激活'},
      // 	{title:'液晶显示',content:'无透图、无背光、无任何异常'},
      // 	{title:'成色描述',content:'未激活，包装可拆封但无破损，全套配件齐全且原装未使用。'},
      // 	{title:'备注',content:'未拆封需拆封验机，否则不予售后'},
      // 	{title:'功能检测',content:'正常'},
      // 	{title:'主板维修',content:'无维修'},
      // 	{title:'外屏维修',content:'无维修'},
      // 	{title:'屏幕维修',content:'无维修'},
      // 	{title:'机身刻字',content:'无'},
      // ]},
      { type: "97新", values: [
        { title: "机身外观", content: "轻微瑕疵" },
        { title: "屏幕外观", content: "细微划痕" },
        { title: "液晶显示", content: "无透图、无背光、无任何异常" },
        { title: "成色描述", content: "机身≤3处且<5mm的细微划痕，或≤1处且<1mm的轻微磕碰/掉漆；屏幕外观仅允许强光下≤3条且<10mm的细微划痕" },
        { title: "备注", content: "靓机标准" },
        { title: "功能检测", content: "正常" },
        { title: "主板维修", content: "无维修" },
        { title: "外屏维修", content: "无维修" },
        { title: "屏幕维修", content: "无维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "95新", values: [
        { title: "机身外观", content: "轻微磨损/掉漆/磕碰" },
        { title: "屏幕外观", content: "正常划痕" },
        { title: "液晶显示", content: "仅允许不明显的轻微透图或轻微背光" },
        { title: "成色描述", content: "机身≤3处且<2mm的磕碰/掉漆/氧化或≤1处且<3mm的磕碰/掉漆/氧化，和少量正常细微划痕；屏幕外观≤3条且<5mm的轻微硬划痕和其它正常划痕" },
        { title: "备注", content: "小花机标准" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "93新", values: [
        { title: "机身外观", content: "明显小磕碰" },
        { title: "屏幕外观", content: "轻微硬划痕" },
        { title: "液晶显示", content: "仅允许不明显的轻微透图或轻微背光" },
        { title: "成色描述", content: "机身≤5处且<3mm的磕碰/掉漆/脱层或≤2处且<5mm的磕碰/掉漆，和少量正常细微划痕/氧化；屏幕外观≤5条且<10mm的硬划痕和其它正常划痕" },
        { title: "备注", content: "接近小花机成色" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "9新", values: [
        { title: "机身外观", content: "明显磕碰" },
        { title: "屏幕外观", content: "明显硬划痕" },
        { title: "液晶显示", content: "允许轻微透图、轻微背光、轻微异常，不明显且不影响正常使用" },
        { title: "成色描述", content: "机身≤10处且<3mm的磕碰/掉漆或≤3处且<10mm的磕碰/掉漆，和正常细微划痕及少量氧化；屏幕外观≤10条且<10mm的硬划痕或≤3条且<20mm的硬划痕" },
        { title: "备注", content: "正常磕碰" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "8新", values: [
        { title: "机身外观", content: "大磕碰" },
        { title: "屏幕外观", content: "严重硬划痕" },
        { title: "液晶显示", content: "允许轻微透图、轻微背光、轻微异常，不明显且不影响正常使用" },
        { title: "成色描述", content: "机身无破损缺失，屏幕外观无破裂" },
        { title: "备注", content: "花机" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "8新以下", values: [
        { title: "机身外观", content: "破损/缺失/裂缝/弯曲" },
        { title: "屏幕外观", content: "破裂" },
        { title: "液晶显示", content: "显示可异常，但不影响正常使用。" },
        { title: "成色描述", content: "无成色要求，以实物图片为准" },
        { title: "备注", content: "大花机" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
        // {title:'机身刻字',content:'无'},
      ] },
      { type: "特价商品", values: [
        { title: "机身外观", content: "无要求" },
        { title: "屏幕外观", content: "无要求" },
        { title: "液晶显示", content: "显示可异常，但不影响正常使用。" },
        { title: "成色描述", content: "以实物图片和质检报告为准 " },
        { title: "备注", content: "特价促销、成色异常、显示异常、维修机型或辅助功能异常且不影响使用" },
        { title: "功能检测", content: "无要求" },
        { title: "主板维修", content: "允许维修" },
        { title: "外屏维修", content: "允许维修" },
        { title: "屏幕维修", content: "允许维修" }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59843c33"]]);
wx.createPage(MiniProgramPage);
