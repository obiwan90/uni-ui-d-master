"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uv_tabs2 + _component_van_loading + _component_van_image + _component_van_tag + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_tabs + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "dataCenterProductList",
  setup(__props) {
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月", "时间区间"]);
    const selectedIndex = common_vendor.ref(0);
    const selectCard = (index) => {
      selectedIndex.value = index;
    };
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(true);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      paging.value.complete([]);
    };
    const option1 = common_vendor.ref([
      { text: "全部仓库", value: 0 },
      { text: "仓库1", value: 1 },
      { text: "仓库2", value: 2 }
    ]);
    const option2 = common_vendor.ref([
      { text: "全部采购", value: 0 },
      { text: "张三", value: 1 },
      { text: "李四", value: 2 }
    ]);
    const option3 = common_vendor.ref([
      { text: "全部销售", value: 0 },
      { text: "张三", value: 1 },
      { text: "张三", value: 2 }
    ]);
    const option4 = common_vendor.ref([
      { text: "全部质检", value: 0 },
      { text: "张三", value: 1 },
      { text: "张三", value: 2 }
    ]);
    const value1 = common_vendor.ref(0);
    const value2 = common_vendor.ref(0);
    const value3 = common_vendor.ref(0);
    const value4 = common_vendor.ref(0);
    const tabsData = common_vendor.ref([{ name: "全部销售" }, { name: "线下销售" }, { name: "平台销售" }, { name: "售后退款" }]);
    const activeTab1Index = common_vendor.ref(0);
    const uvTabs1Change = (e) => {
      activeTab1Index.value = e.index;
    };
    common_vendor.ref();
    const showInventory = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      const from = option.from;
      if (from && from === "inventory") {
        showInventory.value = true;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: !common_vendor.unref(showInventory)
      }, !common_vendor.unref(showInventory) ? {
        c: common_vendor.f(common_vendor.unref(timeCardData), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectCard(index), index),
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: index
          };
        })
      } : {}, {
        d: common_vendor.o(_ctx.selectParamChange),
        e: common_vendor.p({
          value: common_vendor.unref(value1),
          options: common_vendor.unref(option1),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        f: common_vendor.o(_ctx.selectParamChange),
        g: common_vendor.p({
          value: common_vendor.unref(value2),
          options: common_vendor.unref(option2),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        h: common_vendor.o(_ctx.selectParamChange),
        i: common_vendor.p({
          value: common_vendor.unref(value3),
          options: common_vendor.unref(option3),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        j: common_vendor.o(_ctx.selectParamChange),
        k: common_vendor.p({
          value: common_vendor.unref(value4),
          options: common_vendor.unref(option4),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        l: common_vendor.p({
          zIndex: "20",
          activeColor: "#EB4636"
        }),
        m: !common_vendor.unref(showInventory)
      }, !common_vendor.unref(showInventory) ? {
        n: common_vendor.o(uvTabs1Change),
        o: common_vendor.p({
          list: common_vendor.unref(tabsData),
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          fontSize: 28,
          inactiveStyle: {
            color: "#1F1F1F",
            opacity: 0.6
          },
          activeStyle: {
            color: "#1F1F1F",
            fontWeight: "bold",
            fontSize: 32,
            opacity: 1
          },
          current: common_vendor.unref(activeTab1Index)
        })
      } : {}, {
        p: common_vendor.f(12, (item, index, i0) => {
          return {
            a: "d557d20b-9-" + i0 + "," + ("d557d20b-8-" + i0),
            b: "d557d20b-8-" + i0 + ",d557d20b-7",
            c: "d557d20b-10-" + i0 + ",d557d20b-7",
            d: index
          };
        }),
        q: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        r: common_vendor.p({
          width: "95",
          height: "95",
          fit: "widthFix",
          radius: "18rpx",
          src: "https://www.xzxskj.com",
          mode: "aspectFit"
        }),
        s: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        }),
        t: common_vendor.sr(paging, "d557d20b-7", {
          "k": "paging"
        }),
        v: common_vendor.o(queryList),
        w: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        x: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d557d20b"]]);
wx.createPage(MiniProgramPage);
