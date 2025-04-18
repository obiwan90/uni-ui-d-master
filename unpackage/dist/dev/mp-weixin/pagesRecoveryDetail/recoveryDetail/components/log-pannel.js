"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_recovery_recovery = require("../../../api/recovery/recovery.js");
if (!Array) {
  const _easycom_custom_channel_tap2 = common_vendor.resolveComponent("custom-channel-tap");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_channel_tap2 + _easycom_z_paging2)();
}
const _easycom_custom_channel_tap = () => "../../../components/custom-channel-tap/custom-channel-tap.js";
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_channel_tap + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "log-pannel",
  props: {
    selectData: {
      type: Object,
      default: {}
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      await apiRecoveryLogAction(pageNo - 1);
      paging.value.complete(lists.value);
    };
    const props = __props;
    const lists = common_vendor.ref([]);
    const apiRecoveryLogAction = async (start) => {
      const data = {
        // id:props.selectData.id
        id: props.selectData.ids,
        start
      };
      const res = await api_recovery_recovery.apiRecoveryLog(data);
      if (res.code === 200) {
        lists.value = res.lists;
      }
      console.log(res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: "896b2a16-1-" + i0 + ",896b2a16-0",
            b: common_vendor.p({
              text1: "官方质检",
              text2: item.lx === "1" ? "售价" : "收价",
              backgroundColor: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
            }),
            c: common_vendor.t(item.name + " " + item.add_time),
            d: common_vendor.t(item.xgqprice.replace(/^,|,$/g, "")),
            e: common_vendor.t(item.xqqys),
            f: common_vendor.t(item.xqhprice.replace(/^,|,$/g, "")),
            g: common_vendor.t(item.xghys),
            h: index
          };
        }),
        c: common_vendor.sr(paging, "896b2a16-0", {
          "k": "paging"
        }),
        d: common_vendor.o(queryList),
        e: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        f: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        g: common_vendor.o(($event) => _ctx.$emit("close"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-896b2a16"]]);
wx.createComponent(Component);
