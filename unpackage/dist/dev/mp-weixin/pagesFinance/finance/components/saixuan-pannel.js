"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
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
  __name: "saixuan-pannel",
  props: {
    cgyglist: {
      type: Array,
      default: []
    },
    cklist: {
      type: Array,
      default: []
    },
    xsyglist: {
      type: Array,
      default: []
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("结束时间");
    const pickerStartTimestamp = common_vendor.ref("");
    const pickerLastTimestamp = common_vendor.ref("");
    common_vendor.ref({});
    common_vendor.ref(null);
    common_vendor.ref(["分类", "品牌"]);
    common_vendor.ref(false);
    const colorFilter = common_vendor.ref("");
    const emit = __emit;
    const cancel = () => {
      pickerStartTimestamp.value = "";
      pickerLastTimestamp.value = "";
      pickerStartValue.value = "开始时间";
      pickerLastValue.value = "结束时间";
      selectedOptions.value = {
        "开始时间戳": "",
        "结束时间戳": "",
        "仓库": [],
        "销售员工": [],
        "采购员工": [],
        "收款方式": []
      };
    };
    const comfrm = () => {
      emit("selectedConfirm", selectedOptions.value);
      emit("close");
    };
    const selectedOptions = common_vendor.ref({
      "开始时间戳": "",
      "结束时间戳": "",
      "仓库": [],
      "销售员工": [],
      "采购员工": [],
      "收款方式": []
    });
    const data = common_vendor.ref([
      {
        name: "仓库",
        id: "1",
        // item:[
        // 	'总仓','总仓','总仓'
        // ]
        item: props.cklist
      },
      {
        name: "销售员工",
        id: "2",
        // item:[
        // 	'员工','员工','员工','员工','员工','员工'
        // ]
        item: props.xsyglist
      },
      {
        name: "采购员工",
        id: "3",
        // item:[	
        // 	'员工','员工','员工'
        // ]
        item: props.cgyglist
      },
      {
        name: "收款方式",
        id: "4",
        // item:[
        // 	'支付宝','微信','收款码','银行卡','现金','其他'
        // ]
        item: [{ id: "1", username: "支付宝" }, { id: "2", username: "微信" }, { id: "3", username: "收款码" }]
      }
    ]);
    common_vendor.computed(() => {
      console.log("我在赛选");
      if (!colorFilter.value) {
        return data.value.find((item) => item.name === "颜色").item;
      }
      const filter = colorFilter.value.toLowerCase();
      const dataFilter = data.value.find((item) => item.name === "颜色").item.filter((color) => color.toLowerCase().includes(filter));
      console.log(dataFilter);
      return dataFilter;
    });
    const collapseRef = common_vendor.ref(null);
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
      pickerStartTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
      selectedOptions.value["开始时间戳"] = pickerStartTimestamp.value;
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
      pickerLastTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
      selectedOptions.value["结束时间戳"] = pickerLastTimestamp.value;
    };
    const selectCard = (parentIndex, childIndex, childId) => {
      const parentName = data.value[parentIndex].name;
      const selectedIndex = selectedOptions.value[parentName].indexOf(childId);
      if (selectedIndex === -1) {
        selectedOptions.value[parentName].push(childId);
      } else {
        selectedOptions.value[parentName].splice(selectedIndex, 1);
      }
      console.log("selectedOptions:", selectedOptions.value);
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
        h: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: "26f24e55-3-" + i0 + "," + ("26f24e55-2-" + i0),
            c: "26f24e55-2-" + i0 + "," + ("26f24e55-1-" + i0),
            d: item.name != "仓库"
          }, item.name != "仓库" ? {
            e: common_vendor.f(item.item, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1.username),
                b: index1,
                c: common_vendor.o(($event) => selectCard(index, index1, item1.id), index1),
                d: common_vendor.unref(selectedOptions)[item.name].includes(item1.id) ? 1 : ""
              };
            })
          } : {
            f: common_vendor.f(item.item, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: index1,
                c: common_vendor.o(($event) => selectCard(index, index1, item1.id), index1),
                d: common_vendor.unref(selectedOptions)[item.name].includes(item1.id) ? 1 : ""
              };
            })
          }, {
            g: "26f24e55-1-" + i0 + "," + ("26f24e55-0-" + i0),
            h: common_vendor.sr(collapseRef, "26f24e55-0-" + i0, {
              "k": "collapseRef",
              "f": 1
            }),
            i: "26f24e55-0-" + i0,
            j: index
          });
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26f24e55"]]);
wx.createComponent(Component);
