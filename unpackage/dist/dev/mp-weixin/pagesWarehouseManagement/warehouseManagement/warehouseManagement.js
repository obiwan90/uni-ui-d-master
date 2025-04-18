"use strict";
const common_vendor = require("../../common/vendor.js");
const api_warehouseManagement_warehouseManagement = require("../../api/warehouseManagement/warehouseManagement.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _component_van_swipe_cell + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "warehouseManagement",
  setup(__props) {
    const dataList = common_vendor.ref([]);
    const paging = common_vendor.ref(null);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiWarehouseListAc();
      paging.value.complete(data);
    };
    common_vendor.ref([]);
    const confirm = () => {
      common_vendor.index.navigateTo({
        url: "/pagesWarehouseManagement/warehouseManagement/new"
      });
    };
    const cklist = common_vendor.ref([]);
    const apiWarehouseListAc = async () => {
      const res = await api_warehouseManagement_warehouseManagement.apiWarehouseList();
      if (res.code === 200) {
        cklist.value = [...res.lists];
        console.log("cklist：", cklist.value);
      }
      return cklist.value;
    };
    const goPage = (item) => {
      const ckItem = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: "/pagesWarehouseManagement/warehouseManagement/new?ckItem=" + ckItem
      });
    };
    const updateWarehouse = async (item, lx) => {
      if (lx === "") {
        lx = item.hide === "0" ? "1" : "2";
      }
      await apiWarehouseUpdateAc(item.id, lx);
    };
    const apiWarehouseUpdateAc = async (id, lx) => {
      const data = {
        id,
        lx
        //1禁用2启用 3删除
      };
      const res = await api_warehouseManagement_warehouseManagement.apiWarehouseUpdate(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          icon: "none",
          title: "操作成功",
          duration: 1e3
        });
        paging.value.reload(true);
      }
    };
    common_vendor.onShow(() => {
      paging.value.reload(true);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.sxck === "1"
          }, item.sxck === "1" ? {} : {}, {
            c: common_vendor.t(item.num),
            d: common_vendor.t(item.num1),
            e: item.hide === "1"
          }, item.hide === "1" ? {} : {}, {
            f: common_vendor.o(($event) => updateWarehouse(item, "3"), index),
            g: common_vendor.o(($event) => goPage(item), index),
            h: common_vendor.t(item.hide === "0" ? "禁用" : "启用"),
            i: common_vendor.o(($event) => updateWarehouse(item, ""), index),
            j: "4ae61683-2-" + i0 + ",4ae61683-1",
            k: index
          });
        }),
        c: common_vendor.p({
          rightWidth: "147"
        }),
        d: common_vendor.sr(paging, "4ae61683-1", {
          "k": "paging"
        }),
        e: common_vendor.o(queryList),
        f: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        g: common_vendor.p({
          ["default-page-size"]: 20,
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        h: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ae61683"]]);
wx.createPage(MiniProgramPage);
