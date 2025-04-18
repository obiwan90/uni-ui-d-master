"use strict";
const common_vendor = require("../../../common/vendor.js");
const pagesProductDetail_api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "bargaining",
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  setup(__props) {
    const propos = __props;
    common_vendor.ref(false);
    const bargainingPrice = common_vendor.ref();
    const onConfirm = () => {
      if (!bargainingPrice.value) {
        common_vendor.index.showToast({
          title: "请输入议价金额",
          icon: "none"
        });
        return;
      }
      if (selectedTap.value === null) {
        common_vendor.index.showToast({
          title: "请选择议价时长",
          icon: "none"
        });
        return;
      }
      let dataParam = common_vendor.ref({
        lx: "",
        id: "",
        bargainingtimeid: "",
        price: ""
      });
      dataParam.value.lx = "1";
      dataParam.value.id = propos.id;
      dataParam.value.bargainingtimeid = bargainingList.value[selectedTap.value].id;
      dataParam.value.price = bargainingPrice.value;
      let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
      common_vendor.index.navigateTo({
        url: "/pagesSubOrder/subOrder/subOrder?data=" + queryString
      });
    };
    const selectedTap = common_vendor.ref(null);
    common_vendor.ref([]);
    const bargainingList = common_vendor.ref([]);
    const getBargainingtime = async () => {
      const res = await pagesProductDetail_api_api.apiGetBargainingtime();
      if (res.code === 200) {
        bargainingList.value = res.lists;
      }
    };
    const selectTap = (index) => {
      selectedTap.value = index;
    };
    common_vendor.onMounted(() => {
      getBargainingtime();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.unref(bargainingPrice),
        c: common_vendor.o(($event) => common_vendor.isRef(bargainingPrice) ? bargainingPrice.value = $event.detail.value : null),
        d: common_vendor.f(common_vendor.unref(bargainingList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.unref(selectedTap) === index
          }, common_vendor.unref(selectedTap) === index ? {} : {}, {
            c: index,
            d: common_vendor.unref(selectedTap) === index ? 1 : "",
            e: common_vendor.o(($event) => selectTap(index), index)
          });
        }),
        e: common_vendor.o(onConfirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20c1ff23"]]);
wx.createComponent(Component);
