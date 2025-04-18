"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "saixuan",
  props: {
    ids: {
      type: String,
      default: ""
    },
    filterList: {
      type: Array,
      default: []
    },
    colorItems: {
      type: Array,
      default: []
    }
  },
  emits: ["reLoad", "closePopup"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    common_vendor.ref({});
    const props = __props;
    const startPrice = common_vendor.ref("");
    const lastPrice = common_vendor.ref("");
    common_vendor.ref(null);
    const colorFilter = common_vendor.ref("");
    const selectedText = common_vendor.ref([]);
    const toggleSelection = (category, item) => {
      item.selected = !item.selected;
      if (category.name === "颜色") {
        const originalItem = category.items.find((i) => i.id === item.id);
        if (originalItem) {
          originalItem.selected = item.selected;
        }
      }
      updateSelectedText();
    };
    const updateSelectedText = () => {
      selectedText.value = props.filterList.flatMap((category) => {
        if (category.name === "颜色") {
          return filteredColors.value.filter((color) => color.selected).map((color) => ({ id: color.id, name: color.name }));
        } else {
          return category.items.filter((item) => item.selected).map((item) => ({ id: item.id, name: item.name }));
        }
      });
      console.log("selectedText.value", selectedText.value);
    };
    const confirm = () => {
      if (startPrice.value && !lastPrice.value || !startPrice.value && lastPrice.value) {
        common_vendor.index.showToast({
          title: "请输入完整的价格范围",
          icon: "none",
          duration: 500
        });
        return;
      }
      const selectedItems = {
        brandid: "",
        classid: "",
        colourid: "",
        deliverys: "",
        finenessid: "",
        gd: "",
        memoryid: "",
        newarrivals: "",
        price: "",
        pricesdesc: "",
        sftj: "",
        sfzd: "",
        start: "",
        systemid: "",
        versionid: ""
      };
      props.filterList.forEach((category) => {
        console.log("category", category);
        const selectedIds = category.items.filter((item) => item.selected).map((item) => item.id).join(",");
        const selectedNames = category.items.filter((item) => item.selected).map((item) => item.name).join(",");
        switch (category.name) {
          case "分类":
            selectedItems.classid = selectedIds;
            break;
          case "品牌":
            selectedItems.brandid = selectedIds;
            break;
          case "系统":
            selectedItems.systemid = selectedIds;
            break;
          case "价格":
            selectedItems.price = startPrice.value ? startPrice.value + "-" + lastPrice.value : selectedNames;
            break;
          case "版本":
            selectedItems.versionid = selectedIds;
            break;
          case "成色":
            selectedItems.finenessid = selectedIds;
            break;
          case "内存":
            selectedItems.memoryid = selectedIds;
            break;
          case "颜色":
            selectedItems.colourid = selectedIds;
            break;
          case "资检渠道":
            selectedItems.gd = selectedIds;
            break;
          case "其他":
            if (category.items.some((item) => item.id === "1" && item.selected)) {
              selectedItems.sftj = "1";
            }
            if (category.items.some((item) => item.id === "2" && item.selected)) {
              selectedItems.sfzd = "1";
            }
            break;
        }
      });
      console.log("Selected Items:", selectedItems);
      emit("reLoad", selectedItems);
      emit("closePopup");
    };
    const collapseChange = (isOpen, item) => {
      item.pannelShow = isOpen.length > 0;
    };
    const resetFilters = () => {
      startPrice.value = "";
      lastPrice.value = "";
      props.filterList.forEach((category) => {
        category.items.forEach((item) => {
          item.selected = false;
        });
      });
      props.colorItems.forEach((color) => {
        color.selected = false;
      });
      colorFilter.value = "";
      selectedText.value = [];
      console.log("筛选条件已重置。");
    };
    const filteredColors = common_vendor.computed(() => {
      console.log("filterList", props.filterList);
      if (!colorFilter.value) {
        return props.colorItems;
      }
      return props.colorItems.filter((color) => color.name.includes(props.colorFilter));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("closePopup")),
        b: common_vendor.f(__props.filterList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.name === "颜色" && filteredColors.value.length > 5 || item.name !== "颜色" && item.items.length > 6
          }, item.name === "颜色" && filteredColors.value.length > 5 || item.name !== "颜色" && item.items.length > 6 ? {
            c: item.pannelShow ? 1 : ""
          } : {}, {
            d: item.name === "价格"
          }, item.name === "价格" ? {
            e: startPrice.value,
            f: common_vendor.o(($event) => startPrice.value = $event.detail.value, item.id),
            g: lastPrice.value,
            h: common_vendor.o(($event) => lastPrice.value = $event.detail.value, item.id)
          } : {}, {
            i: item.name === "颜色"
          }, item.name === "颜色" ? {
            j: common_vendor.o(() => {
            }, item.id),
            k: common_vendor.o([($event) => colorFilter.value = $event.detail.value, item.id, () => {
            }, item.id], item.id),
            l: colorFilter.value
          } : {}, {
            m: item.name === "颜色"
          }, item.name === "颜色" ? {
            n: common_vendor.f(filteredColors.value.slice(0, 5), (color, index2, i1) => {
              return {
                a: common_vendor.t(color.name),
                b: color.selected ? 1 : "",
                c: index2,
                d: common_vendor.o(($event) => toggleSelection(item, color), index2)
              };
            })
          } : {
            o: common_vendor.f(item.items.slice(0, 6), (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: item1.selected ? 1 : "",
                c: index2,
                d: common_vendor.o(($event) => toggleSelection(item, item1), index2)
              };
            })
          }, {
            p: "349b2a5a-3-" + i0 + "," + ("349b2a5a-2-" + i0),
            q: "349b2a5a-2-" + i0 + "," + ("349b2a5a-1-" + i0),
            r: item.name === "颜色" && filteredColors.value.length > 6
          }, item.name === "颜色" && filteredColors.value.length > 6 ? {
            s: common_vendor.f(filteredColors.value.slice(5), (color, index2, i1) => {
              return {
                a: common_vendor.t(color.name),
                b: color.selected ? 1 : "",
                c: index2 + 5,
                d: common_vendor.o(($event) => toggleSelection(item, color), index2 + 5)
              };
            })
          } : item.items.length > 6 ? {
            v: common_vendor.f(item.items.slice(6), (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: item1.selected ? 1 : "",
                c: index2 + 6,
                d: common_vendor.o(($event) => toggleSelection(item, item1), index2 + 6)
              };
            })
          } : {}, {
            t: item.items.length > 6,
            w: "349b2a5a-1-" + i0 + "," + ("349b2a5a-0-" + i0),
            x: common_vendor.sr("collapseRef", "349b2a5a-0-" + i0, {
              "f": 1
            }),
            y: common_vendor.o((isOpen) => collapseChange(isOpen, item), item.id),
            z: "349b2a5a-0-" + i0,
            A: item.id
          });
        }),
        c: common_vendor.p({
          border: false
        }),
        d: common_vendor.p({
          ["show-arrow"]: false,
          open: false,
          titleBorder: "none",
          border: false
        }),
        e: common_vendor.o(resetFilters),
        f: common_vendor.o(confirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-349b2a5a"]]);
wx.createComponent(Component);
