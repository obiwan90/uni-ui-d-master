"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_badge2 = common_vendor.resolveComponent("uv-badge");
  _easycom_uv_badge2();
}
const _easycom_uv_badge = () => "../../../uni_modules/uv-badge/components/uv-badge/uv-badge.js";
if (!Math) {
  _easycom_uv_badge();
}
const _sfc_main = {
  __name: "custom-order-card-saixuan-pannel",
  props: {
    khlist: {
      type: Array,
      default: []
    },
    yglist: {
      type: Array,
      default: []
    }
  },
  emits: ["reload", "close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const data = common_vendor.ref([
      {
        title: "销售员工",
        items: []
      },
      {
        title: "客户列表",
        items: []
      },
      {
        title: "排序",
        items: [
          { name: "最新订单", badge: "", selected: false, ddlx: "1" },
          { name: "最早订单", badge: "", selected: false, ddlx: "2" }
        ]
      }
    ]);
    const selectCard = (parentIndex, childIndex) => {
      const group = data.value[parentIndex];
      if (parentIndex === 2) {
        group.items.forEach((item, index) => {
          item.selected = index === childIndex;
        });
      } else {
        group.items[childIndex].selected = !group.items[childIndex].selected;
      }
    };
    const resetSelection = () => {
      data.value.forEach((group) => {
        group.items.forEach((item) => {
          item.selected = false;
        });
      });
    };
    const onComfirm = () => {
      const selectedItems = data.value.map(
        (group) => group.items.filter((item) => item.selected)
      );
      emit("reload", selectedItems);
      emit("close");
      console.log("Selected items:", selectedItems);
    };
    common_vendor.onMounted(() => {
      data.value[0].items.push(...props.yglist.map((item) => ({ ...item, selected: false })));
      data.value[1].items.push(...props.khlist.map((item) => ({ ...item, selected: false })));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.items, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: "66993006-0-" + i0 + "-" + i1,
                c: common_vendor.p({
                  type: "error",
                  max: "99",
                  value: item1.num
                }),
                d: index1,
                e: item1.selected ? 1 : "",
                f: common_vendor.o(($event) => selectCard(index, index1), index1)
              };
            }),
            c: index
          };
        }),
        c: common_vendor.o(resetSelection),
        d: common_vendor.o(onComfirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66993006"]]);
wx.createComponent(Component);
