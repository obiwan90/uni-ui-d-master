"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_station_station = require("../../../api/station/station.js");
const _sfc_main = {
  __name: "staffPannel",
  props: {
    title: {
      type: String,
      default: () => ""
    }
  },
  emits: ["close", "staffConfirm1", "staffConfirm2"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    common_vendor.ref([]);
    const emit = __emit;
    const data = common_vendor.ref([
      { text: "全部员工", ygid: "0", selected: false }
    ]);
    const toggleSelection = (index) => {
      data.value[index].selected = !data.value[index].selected;
    };
    const onClick = () => {
      if (props.title === "配置员工") {
        emit("staffConfirm1", data.value);
      }
      if (props.title === "消息推送") {
        emit("staffConfirm2", data.value);
      }
      emit("close");
      console.log("确定");
    };
    const workerData = common_vendor.ref([]);
    const apiStationStaffListData = async () => {
      const param = {
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid
      };
      const res = await api_station_station.apiStationStaffList(param);
      if (res.code === 200) {
        workerData.value = res.yglist;
        console.log("workerData:", workerData.value);
        res.yglist.forEach((item, index) => {
          data.value.push({ text: item.username, ygid: item.id, selected: false });
        });
        common_vendor.nextTick$1(() => {
          if (storedYgidString.value) {
            setSelectedStaffs(storedYgidString.value);
          }
        });
      }
    };
    const storedYgidString = common_vendor.ref("");
    const setSelectedStaffs = (staffs) => {
      storedYgidString.value = staffs;
      console.log("接收选中员工====================");
      console.log("staffs:", staffs);
      staffs.split(",").forEach((staff) => {
        const index = data.value.findIndex((item) => item.ygid === staff);
        if (index !== -1) {
          data.value[index].selected = true;
        }
      });
      console.log("接收选中员工====================", data.value);
      emit("staffConfirm1", data.value);
    };
    __expose({
      setSelectedStaffs
    });
    common_vendor.onMounted(() => {
      apiStationStaffListData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.o(($event) => _ctx.$emit("close")),
        c: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.selected ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png",
            c: index,
            d: common_vendor.o(($event) => toggleSelection(index), index)
          };
        }),
        d: common_vendor.o(($event) => _ctx.$emit("close")),
        e: common_vendor.o(onClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f0f85d81"]]);
wx.createComponent(Component);
