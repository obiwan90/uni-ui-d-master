"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_classitify_classtify = require("../../../api/classitify/classtify.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_uv_tabs2 + _easycom_z_paging2)();
}
const _easycom_uv_tabs = () => "../../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "jixing",
  props: {
    modelId: {
      type: String,
      default: ""
    }
  },
  emits: ["reload4Jx", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const key = common_vendor.ref("xlname");
    common_vendor.ref(false);
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const activeCard = common_vendor.ref(0);
    const activeTab1Index = common_vendor.ref(0);
    const activeTab2Index = common_vendor.ref(-1);
    const selectData = common_vendor.ref([
      "全部机型",
      "折叠机型",
      "特价机型"
    ]);
    const transformedData = common_vendor.ref([]);
    const selectedItems = common_vendor.ref(/* @__PURE__ */ new Set());
    const selectedTabs = common_vendor.ref(/* @__PURE__ */ new Set());
    const toggleSelect = (item) => {
      if (selectedTabs.value.has("全部机型")) {
        common_vendor.index.showToast({
          title: "已选择全部机型，不能选择单个型号",
          icon: "none"
        });
        return;
      }
      if (selectedItems.value.has(item)) {
        selectedItems.value.delete(item);
      } else {
        selectedItems.value.add(item);
      }
    };
    const isSelected = (item) => {
      return selectedItems.value.has(item);
    };
    const resetSelection = () => {
      selectedItems.value.clear();
      selectedTabs.value.clear();
    };
    const handleTabClick = (item) => {
      console.log("item", item);
      if (item === "全部机型") {
        if (selectedTabs.value.has(item)) {
          selectedTabs.value.delete(item);
        } else {
          selectedTabs.value.add(item);
          selectedItems.value.clear();
        }
      } else {
        if (selectedTabs.value.has(item)) {
          selectedTabs.value.delete(item);
        } else {
          selectedTabs.value.add(item);
        }
      }
      console.log("selectedTabs:", selectedTabs.value);
    };
    const isTabSelected = (item) => {
      return selectedTabs.value.has(item);
    };
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      param.value.start = pageNo - 1;
      const data = await getPagingData(param);
      console.log("data:", data);
      let allData = [];
      if (data) {
        if (pageNo === 1) {
          allData = data;
        } else {
          const existingData = transformedData.value.reduce((acc, item) => {
            return [...acc, ...item.products];
          }, []);
          allData = [...existingData, ...data];
        }
      } else {
        allData = [];
      }
      common_vendor.nextTick$1(() => {
        paging.value.complete(data);
      });
      const groupedData = {};
      allData.forEach((item) => {
        if (!groupedData[item.xlname]) {
          groupedData[item.xlname] = [];
        }
        groupedData[item.xlname].push(item);
      });
      transformedData.value = Object.entries(groupedData).map(([key2, value]) => ({ name: key2, products: value }));
      initializeSelectedItems();
      console.log(transformedData.value);
    };
    const uvTabs1Change = (e) => {
      console.log("分类标签切换触发:", e.index);
      if (e.index !== void 0) {
        activeTab1Index.value = e.index;
        param.value.classid = classlist.value[activeTab1Index.value].id;
        param.value.brandid = "";
        param.value.seriesid = "";
        activeCard.value = 0;
        activeTab2Index.value = -1;
        reload();
      } else {
        console.error("标签索引错误或标签数据不存在");
      }
    };
    const changeCardColor = (index) => {
      activeCard.value = index;
      param.value.brandid = brandlist.value[index].id;
      param.value.seriesid = "";
      activeTab2Index.value = -1;
      reload();
    };
    const uvTabsChange2 = (e) => {
      console.log("系列切换了标签:", e.index);
      if (e.index !== void 0) {
        activeTab2Index.value = e.index;
        param.value.seriesid = serieslist.value[activeTab2Index.value].id;
        param.value.brandid = brandlist.value[activeCard.value].id;
        reload();
      } else {
        console.error("标签索引错误");
      }
    };
    const classlist = common_vendor.ref([]);
    const brandlist = common_vendor.ref([]);
    const serieslist = common_vendor.ref([]);
    common_vendor.ref([]);
    const param = common_vendor.ref({
      classid: "1",
      // 默认
      brandid: "1",
      // 默认
      seriesid: "",
      // 默认
      start: "0"
    });
    const getPagingData = async (param2) => {
      const data = {
        classid: param2.value.classid,
        brandid: param2.value.brandid,
        seriesid: param2.value.seriesid,
        start: param2.value.start
      };
      const res = await api_classitify_classtify.apiGetClasstify(data);
      if (res.code === "200") {
        classlist.value = res.classlist;
        brandlist.value = res.brandlist;
        serieslist.value = res.serieslist;
        const sortedMarquelist = res.marquelist.sort((a, b) => {
          return parseInt(a.xlid) - parseInt(b.xlid);
        });
        return sortedMarquelist;
      } else {
        return false;
      }
    };
    const emit = __emit;
    const confirm = () => {
      const selected = Array.from(selectedItems.value);
      console.log("selected", selected);
      console.log("selectedTabs", selectedTabs.value);
      console.log("selectedItems", selectedItems.value);
      emit("reload4Jx", selected, selectedTabs.value);
      emit("close");
    };
    const initializeSelectedItems = () => {
      if (props.modelId) {
        const ids = props.modelId.split(",");
        ids.forEach((id) => {
          const itemToSelect = transformedData.value.flatMap((item) => item.products).find((item) => item.id === id.trim());
          if (itemToSelect) {
            selectedItems.value.add(itemToSelect);
          }
        });
        console.log("Initialized selected items:", Array.from(selectedItems.value));
      }
    };
    const reload = () => {
      common_vendor.nextTick$1(() => {
        paging.value && paging.value.reload(true);
      });
    };
    common_vendor.onShow(() => {
      console.log("show");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(selectData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: isTabSelected(item) ? 1 : "",
            d: common_vendor.o(($event) => handleTabClick(item), index)
          };
        }),
        c: common_vendor.o(uvTabs1Change),
        d: common_vendor.p({
          list: classlist.value,
          lineColor: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAAXNSR0IArs4c6QAABHFJREFUWEfdV19oW2UU/51zb5Kma9euTVL0SZn/KCLDJulwLVTaZPoyEKwUZDKn+DBEmD4Mp4LIFNmLg8FQ2PRFHFLUaVUw6VwRNmnS+ocOdQiiIErbxNm1a5t7c78jX7bUNDa5Sdk68L6EfN853/n9zvl959xL+B89VOQiABEg2YHu7YpVDwR+Ap0PJFMf3Wi+pdjyLL0s0qCIpjoSqVOl2Ipk9K9Mx6NvMvAEAANXyFkCZM1Gq3PLqe/+vkGkKmMTyRiiOttGJ+c0tpXKzMYj7zYaxqOLjlqFmYmglPo2kEyHCVi9uUHsXLBNBJPpyAqZzM5wVITPAGishE8gz4cS6dc3CP9KmOlYeAcTjwJoWCs2AXkRPBZMpk4WKpOJR54R0JHSSpU7imCpyaY7GsfGf98oQtLV5cm0GSeYsLuSJLRyIDjUnhh/qUBmOh7Zx8BRgLgSUC8TckqdDWbV/TQ5aW8EoWy8+2GDMWwrqRiONRfBq4FE6sUrlXkgEhFFWmabqoH0MWtCny5YjYO3jo0tX09CmVj0IYF8QERUmUoBQU4Eu0PJ1PC/DSAW+dhg3uVIdddCa4G8F8iqPderQjPx8F6AjhHI55owwW/BZOqWVd3sTB/Mu73RDBO1KBdCm00D83nnbcehgx2nx6ddA9Zo8EdfV8Bj0uM+0zxsKQWXisBvMBYtZyh0Ov3+KjL6z0z/vb0e0/OVbg9uz1XJ/Qil9gVHJ8bc7N32M7HIHkW038d0j1XljhTP8RDBEnUhlEjfVVxbkZlekMFBY2bu12Mm6Kl6BooIThiX6Nn28fFLbqDL92f7w0Ni0CGTeKubxMt8HQNqW1ti4vyaZPTixb5trXmv9xMvU28tGdI+uko6K0uOOg5SHxqGMdXWND9Dwz9YxUC6zWZbvCExnJvA6BAlvQA92WQa7UtKwU3a/xkVSvaGRtPvlK6vqkxxY3bXjmbk7M8biHuWVe018jDB1ukl+YXAWSGxoJDTDV9EmgFqAxD0MrVoIeeVuN6LMhLS6jFpzsq/EEimXisnuCYZbfTXQFeLQ8Y5InS636B6xbU+ey8RbCUHAsnU4bVOqEim0BBi3bcTyYiP+c5cHRVaH9TKXnqSO5AciXo6mJw8XsmyKhntNN3f3WGwHN1k8uBC2UvotQa91nn6zcNyxCZWPYEvJlLVYrqSWblHscgrRHQAgHcjZFcYzgJbgCQtzg0Fz16Yd0tezWQKshuIPMKM5zzM0byg7g7kBkbv6yaiQVlKvgTkSDCRHqnFT9vURabYGATmgEPqLb9htNfT7aqB8jJDS2rBdj4jyBvtreY5Gv56qVYi6yJTenhmZ/igKN4PKnwH+elqctxkWJJBLaNlQBYgcjKwOP8y1SCndTcAt8zoYXgxYGxXCvcBEhWirSSyRYhaGdjcbBqFWaLHz2VH5QH8KZCfCPheKZnyML4pneJu8a5JA6glyM8P3uYLLDX5l/3kMRWbLGzaINPHLPp7wWORbfuWLTH58s0jk4u1nFmPzT/Acc8nAVrxrAAAAABJRU5ErkJggg==') 100% 100%`,
          lineWidth: "25",
          lineHeight: "8",
          fontSize: 32,
          activeStyle: {
            color: "#303133",
            fontWeight: "bold"
          },
          current: activeTab1Index.value
        }),
        e: common_vendor.f(brandlist.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: index === activeCard.value ? 1 : "",
            d: common_vendor.o(($event) => changeCardColor(index), index)
          };
        }),
        f: "700rpx",
        g: common_vendor.o(uvTabsChange2),
        h: common_vendor.p({
          list: serieslist.value,
          lineWidth: "0",
          lineHeight: "0",
          fontSize: 24,
          keyName: key.value,
          activeStyle: {
            padding: "0 10rpx",
            fontSize: "28rpx",
            backgroundColor: "#FFEEEC",
            color: "#ED5446",
            fontWeight: "bold",
            backGround: "#FFEEEC",
            borderRadius: "4rpx 4rpx 4rpx 4rpx"
          },
          inactiveStyle: {
            padding: "0 10rpx",
            fontSize: "24rpx",
            backgroundColor: "#F2F3F6",
            borderRadius: "4rpx 4rpx 4rpx 4rpx",
            opacity: 0.6
          },
          current: activeTab2Index.value
        }),
        i: common_vendor.f(transformedData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.products, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1.xhname),
                b: index1,
                c: isSelected(item1) ? 1 : "",
                d: common_vendor.o(($event) => toggleSelect(item1), index1)
              };
            }),
            c: index
          };
        }),
        j: common_vendor.sr(paging, "ac5a109c-2", {
          "k": "paging"
        }),
        k: common_vendor.o(queryList),
        l: common_vendor.o(($event) => dataList.value = $event),
        m: common_vendor.p({
          ["show-refresher-update-time"]: true,
          ["default-page-size"]: 20,
          fixed: false,
          modelValue: dataList.value
        }),
        n: common_vendor.o(resetSelection),
        o: common_vendor.o(confirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac5a109c"]]);
wx.createComponent(Component);
