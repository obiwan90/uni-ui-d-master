"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_station_station = require("../../../api/station/station.js");
const _sfc_main = {
  __name: "staffinfos-warehouse-pannel",
  emits: ["close", "confirm"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const data = common_vendor.ref([{ text: "全部仓库", ckid: "0", selected: false }]);
    const toggleSelection = (index) => {
      data.value[0].selected = false;
      data.value[index].selected = !data.value[index].selected;
    };
    const onClick = () => {
      emit("confirm", data.value);
      emit("close");
    };
    const apiAdminGetStoreData = async () => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await api_station_station.apiAdminGetStore(param);
      if (res.code === 200) {
        res.lists.forEach((item) => {
          data.value.push({ text: item.name, ckid: item.id, selected: false });
        });
        common_vendor.nextTick$1(() => {
          if (storedCkidString.value) {
            setSelectedWarehouses(storedCkidString.value);
          }
        });
      }
    };
    const storedCkidString = common_vendor.ref("");
    const setSelectedWarehouses = (ckidString) => {
      storedCkidString.value = ckidString;
      console.log("ckidString:", ckidString);
      const ckidArray = ckidString.split(",").map((id) => id.trim());
      console.log("ckidArray:", ckidArray);
      data.value.forEach((item) => {
        const itemCkidStr = item.ckid.toString();
        console.log("Comparing:", itemCkidStr, typeof itemCkidStr, ckidArray.includes(itemCkidStr));
        item.selected = ckidArray.includes(itemCkidStr);
      });
      emit("confirm", data.value);
      console.log("选中的仓库：", data.value);
    };
    __expose({
      setSelectedWarehouses
    });
    common_vendor.onMounted(() => {
      apiAdminGetStoreData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.selected ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png",
            c: index,
            d: common_vendor.o(($event) => toggleSelection(index), index)
          };
        }),
        c: common_vendor.o(($event) => _ctx.$emit("close")),
        d: common_vendor.o(onClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b9769b9"]]);
wx.createComponent(Component);
