"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  _easycom_uv_tabs2();
}
const _easycom_uv_tabs = () => "../../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
if (!Math) {
  _easycom_uv_tabs();
}
const _sfc_main = {
  __name: "saixuanPannel",
  setup(__props) {
    common_vendor.ref(0);
    const cardColors = common_vendor.ref([]);
    const activeCard = common_vendor.ref(0);
    const scrollInto = common_vendor.ref();
    const activeTab1Index = common_vendor.ref(0);
    const activeTab2Index = common_vendor.ref(0);
    const data = common_vendor.ref([
      { title: "类别", value: [
        "求货信息",
        "卖货信息",
        "交流信息"
      ] },
      { title: "范围", value: [
        "同城",
        "同省",
        "全国"
      ] }
    ]);
    const brandsByTab = common_vendor.ref([
      {
        tabName: "手机",
        brands: ["苹果", "华为", "小米", "三星", "苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "平板",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀"]
      },
      {
        tabName: "手表",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "耳机",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "笔记本",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "台式电脑",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "手机",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "平板",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "手表",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "耳机",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "笔记本",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      },
      {
        tabName: "台式电脑",
        brands: ["苹果", "华为", "小米", "三星", "OPPO", "荣耀", "VIVO", "一加", "魅族", "锤子", "荣耀"]
      }
      // 其他标签和品牌
    ]);
    const list = common_vendor.ref([
      {
        name: "苹果15系列"
      },
      {
        name: "苹果14系列"
      },
      {
        name: "苹果13系列"
      },
      {
        name: "苹果12系列"
      },
      {
        name: "苹果11系列"
      },
      {
        name: "苹果10系列"
      },
      {
        name: "苹果9系列"
      }
    ]);
    const tabsData = common_vendor.computed(() => {
      return brandsByTab.value.map((item) => ({
        name: item.tabName
        // 你还可以添加任何其他需要的属性
      }));
    });
    const uvTabs1Change = (e) => {
      console.log("标签切换触发:", e.index);
      if (e.index !== void 0 && brandsByTab.value[e.index]) {
        activeTab1Index.value = e.index;
      } else {
        console.error("标签索引错误或标签数据不存在");
      }
    };
    const brands = common_vendor.computed(() => {
      return brandsByTab.value[activeTab1Index.value].brands.map((name) => ({ name }));
    });
    const changeCardColor = (index) => {
      cardColors.value[index] = "linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)";
      if (activeCard.value !== index) {
        cardColors.value[activeCard.value] = "#ffffff";
      }
      cardColors.value = [...cardColors.value];
      activeCard.value = index;
    };
    const uvTabsChange2 = (e) => {
      console.log("切换了标签:", e.index);
      if (e.index !== void 0) {
        activeTab2Index.value = e.index;
        scrollInto.value = "box-" + e.index;
      } else {
        console.error("标签索引错误");
      }
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.value, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1),
                b: index2
              };
            }),
            c: index
          };
        }),
        b: common_vendor.o(uvTabs1Change),
        c: common_vendor.p({
          list: common_vendor.unref(tabsData),
          lineColor: "#EB4636",
          lineWidth: "30",
          lineHeight: "6",
          fontSize: 32,
          activeStyle: {
            color: "#303133",
            fontWeight: "bold"
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        d: common_vendor.f(common_vendor.unref(brands), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: index === common_vendor.unref(activeCard) ? "linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)" : "#ffffff",
            d: common_vendor.o(($event) => changeCardColor(index), index)
          };
        }),
        e: "800rpx",
        f: common_vendor.o(uvTabsChange2),
        g: common_vendor.p({
          list: common_vendor.unref(list),
          lineWidth: "0",
          lineHeight: "0",
          fontSize: 24,
          activeStyle: {
            backgroundColor: "#FFEEEC",
            color: "#ED5446",
            fontWeight: "bold",
            backGround: "#FFEEEC",
            borderRadius: "4rpx 4rpx 4rpx 4rpx"
          },
          inactiveStyle: {
            backgroundColor: "#F2F3F6",
            borderRadius: "4rpx 4rpx 4rpx 4rpx"
          },
          current: common_vendor.unref(activeTab2Index)
        }),
        h: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(5, (item2, index2, i1) => {
              return {
                a: index2
              };
            }),
            c: index,
            d: "box-" + index
          };
        }),
        i: common_vendor.o((...args) => _ctx.onScroll && _ctx.onScroll(...args)),
        j: common_vendor.unref(scrollInto),
        k: "700rpx",
        l: common_vendor.o((...args) => _ctx.cancel && _ctx.cancel(...args)),
        m: common_vendor.o((...args) => _ctx.comfrm && _ctx.comfrm(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7eefbdc9"]]);
wx.createComponent(Component);
