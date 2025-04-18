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
  __name: "finenessDetail",
  setup(__props) {
    const scrollInto = common_vendor.ref();
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const activeTab1Index = common_vendor.ref(0);
    const classlist = common_vendor.ref([
      { name: "机身外观" },
      { name: "屏幕外观" },
      { name: "液晶显示" }
    ]);
    const tabsData = common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name
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
      { type: "机身外观成色说明", values: [
        { title: "全套未激活", content: "未激活，包装可拆封但无破损，全套配件齐全且原装未使用。" },
        { title: "全套已激活", content: "激活40天内，包装无破损，全套配件齐全且原装，允许使用。" },
        { title: "完美", content: "肉眼判断或强光下无法拍摄出任何瑕疵" },
        { title: "细微瑕疵", content: "机身≤2处且<3mm的细微划痕，或≤1处且<0.5mm的轻微磕碰/掉漆" },
        { title: "轻微瑕疵", content: "机身≤3处且<5mm的细微划痕，或≤1处且<1mm的轻微磕碰/掉漆" },
        { title: "轻微磨损/掉漆/磕碰", content: "机身≤3处且<2mm的磕碰/掉漆/氧化或≤1处且<3mm的磕碰/掉漆/氧化，和少量正常细微划痕；" },
        { title: "明显小磕碰", content: "机身≤5处且<3mm的磕碰/掉漆/脱层或≤2处且<5mm的磕碰/掉漆，和少量正常细微划痕/氧化；" },
        { title: "明显磕碰", content: "机身≤10处且<3mm的磕碰/掉漆或≤3处且<10mm的磕碰/掉漆，和正常细微划痕及少量氧化；" },
        { title: "大磕碰", content: "机身≤10处且<5mm的磕碰/掉漆或≤5处且<10mm的磕碰/掉漆，和正常细微划痕及少量氧化；" },
        { title: "轻微破损/缺失/裂缝/脱层", content: "轻微破损/缺失/裂缝/脱层且不明显，整体外观成色较新" },
        { title: "破损/缺失/裂缝/脱层", content: "正常破损/缺失/裂缝/脱层或严重磕碰" }
      ] },
      { type: "屏幕外观成色说明", values: [
        { title: "完美", content: "屏幕外观仅允许强光下≤2处且<3mm的细微划痕" },
        { title: "细微划痕", content: "屏幕外观仅允许强光下≤3条且<10mm的细微划痕" },
        { title: "正常划痕", content: "屏幕外观≤3条且<5mm的轻微硬划痕和其它轻微划痕" },
        { title: "轻微硬划痕", content: "屏幕外观≤5条且<10mm的硬划痕和其它正常划痕" },
        { title: "明显硬划痕", content: "屏幕外观≤10条且<10mm的硬划痕或≤3条且<20mm的硬划痕" },
        { title: "严重硬划痕", content: "屏幕外观≥10条硬划痕或>20mm的硬划痕" },
        { title: "小缺角/磕碰", content: "屏幕外观四周破裂/磕碰<1.5mm" },
        { title: "缺角/磕碰", content: "屏幕外观四周破裂/磕碰<3.5mm" },
        { title: "溢胶/脱胶/气泡/掉漆", content: "触摸玻璃和支架/中框分离或溢胶;屏幕外观非显示区域气泡/掉漆" },
        { title: "破裂", content: "正常破裂" }
      ] },
      { type: "液晶显示情况说明", values: [
        { title: "正常", content: "显示画面无任何异常	" },
        { title: "轻微色差", content: "仅屏幕四周轻微发黄/发红" },
        { title: "明显色差", content: "显示画面严重发黄/发红 " },
        { title: "轻微灰尘", content: "液晶与外屏之间轻微少量灰尘" },
        { title: "轻微亮点", content: "液晶显示≤3处且最长直径<3mm" },
        { title: "背光异常", content: "明显背光，显示异常但不影响使用" },
        { title: "轻微透图", content: "仅透上方信号栏图标/下方导航键/抖音+号，且不明显" },
        { title: "明显透图", content: "多处明显透图图标，且不影响使用" },
        { title: "轻微坏点/彩点", content: "白色或黑色界面下有≤2处且直径<1mm的颜色点或较多灰尘" },
        { title: "色斑/压伤", content: "屏幕外观破裂处导致的轻微发黄,或黑色界面下有色斑" },
        { title: "轻微漏液", content: "液晶轻微漏液,但不能影响所有功能使用" },
        { title: "轻微生线", content: "线条总厚度不超过0.5mm，不明显且不影响使用" },
        { title: "严重透图/漏液/生线/错乱/闪屏", content: "可直接正常测试功能" }
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
          scrollable: false,
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0078e89a"]]);
wx.createPage(MiniProgramPage);
