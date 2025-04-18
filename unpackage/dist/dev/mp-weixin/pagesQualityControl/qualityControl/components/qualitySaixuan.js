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
  __name: "qualitySaixuan",
  props: {
    cgyglist: {
      type: Array,
      default: []
    },
    gnjcarrays: {
      type: Array,
      default: []
    },
    splrarrays: {
      type: Array,
      default: []
    },
    wxjcarrays: {
      type: Array,
      default: []
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedIndices = common_vendor.ref({});
    common_vendor.ref(null);
    common_vendor.ref(["分类", "品牌"]);
    common_vendor.ref(false);
    const colorFilter = common_vendor.ref("");
    const cancel = () => {
      selectedIndices.value = {};
    };
    const comfrm = () => {
    };
    const data = common_vendor.ref([
      {
        name: "采购员工",
        item: []
      },
      {
        name: "维修检测",
        item: []
      },
      {
        name: "功能检测",
        item: []
      },
      {
        name: "商品录入",
        item: []
      }
    ]);
    const computeData = common_vendor.computed(() => {
      data.value[0].item = props.cgyglist;
      data.value[1].item = props.wxjcarrays;
      data.value[2].item = props.gnjcarrays;
      data.value[3].item = props.splrarrays;
      console.log("pannel data:", data.value);
      return data.value;
    });
    common_vendor.computed(() => {
      console.log("我在赛选");
      if (!colorFilter.value) {
        return data.value.find((item) => item.name === "颜色").item;
      }
      const filter = colorFilter.value.toLowerCase();
      const dataFilter = data.value.find((item) => item.name === "颜色").item.filter((color) => color.toLowerCase().includes(filter));
      console.log(dataFilter);
      return dataFilter.value;
    });
    const collapseRef = common_vendor.ref(null);
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("结束时间");
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
    };
    const selectCard = (parentIndex, childIndex) => {
      selectedIndices.value[parentIndex] = childIndex;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(common_vendor.unref(pickerStartValue)),
        c: common_vendor.o(onTimeChange1),
        d: common_vendor.unref(pickerStartValue),
        e: common_vendor.t(common_vendor.unref(pickerLastValue)),
        f: common_vendor.o(onTimeChange2),
        g: common_vendor.unref(pickerLastValue),
        h: common_vendor.f(computeData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "8cb02044-3-" + i0 + "," + ("8cb02044-2-" + i0),
            c: "8cb02044-2-" + i0 + "," + ("8cb02044-1-" + i0),
            d: common_vendor.f(item.item, (item1, index1, i1) => {
              return common_vendor.e(item.name === "采购员工" ? {
                a: common_vendor.t(item1.username)
              } : {
                b: common_vendor.t(item1.name)
              }, {
                c: index1,
                d: common_vendor.o(($event) => selectCard(index, index1), index1),
                e: common_vendor.unref(selectedIndices)[index] === index1 ? 1 : ""
              });
            }),
            e: item.name === "采购员工",
            f: "8cb02044-1-" + i0 + "," + ("8cb02044-0-" + i0),
            g: common_vendor.sr(collapseRef, "8cb02044-0-" + i0, {
              "k": "collapseRef",
              "f": 1
            }),
            h: "8cb02044-0-" + i0,
            i: index
          };
        }),
        i: common_vendor.p({
          border: false
        }),
        j: common_vendor.p({
          open: true,
          titleBorder: "none",
          border: false
        }),
        k: common_vendor.o(cancel),
        l: common_vendor.o(comfrm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8cb02044"]]);
wx.createComponent(Component);
