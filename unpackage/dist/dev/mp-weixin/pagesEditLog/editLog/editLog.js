"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesEditLog_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (customHeader + _easycom_z_paging)();
}
const customHeader = () => "./components/custom-header.js";
const _sfc_main = {
  __name: "editLog",
  setup(__props) {
    const id = common_vendor.ref();
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await getLogAc(pageNo - 1);
      paging.value.complete(data);
    };
    const getLogAc = async (start) => {
      const param = {
        id: id.value,
        start
      };
      const res = await pagesEditLog_api_api.getLog(param);
      if (res.zt === 1) {
        return res.xsz;
      }
      return [];
    };
    common_vendor.onLoad((options) => {
      if (options.id) {
        id.value = options.id;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.xgtime),
            b: common_vendor.t(item.xgname),
            c: common_vendor.f(item.lists, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.names),
                b: common_vendor.t(item1.xgq),
                c: common_vendor.t(item1.xgh),
                d: index2
              };
            }),
            d: index
          };
        }),
        c: common_vendor.sr(paging, "9b5d5ff3-1", {
          "k": "paging"
        }),
        d: common_vendor.o(queryList),
        e: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        f: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b5d5ff3"]]);
wx.createPage(MiniProgramPage);
