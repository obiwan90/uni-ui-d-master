"use strict";
const common_vendor = require("../../common/vendor.js");
const api_station_station = require("../../api/station/station.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_custom_header2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_van_swipe_cell + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "staffManager",
  setup(__props) {
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const workerData = common_vendor.ref([]);
    const openPanels = common_vendor.ref(/* @__PURE__ */ new Set());
    const togglePanel = (index) => {
      if (openPanels.value.has(index)) {
        openPanels.value.delete(index);
      } else {
        openPanels.value.add(index);
      }
    };
    const isOpen = (index) => {
      return openPanels.value.has(index);
    };
    const goPage = (path) => {
      permissionStore.loadMenuAuthority();
      if (path.includes("/pagesAuthority/authority/authority?")) {
        if (!permissionStore.hasMenuAuthority("updateAuthority")) {
          common_vendor.index.showToast({
            title: "您没有操作权限",
            icon: "success",
            duration: 2e3
          });
          return;
        }
      }
      if (path.includes("/pagesStaffInfos/staffInfos/staffInfos")) {
        if (!permissionStore.hasMenuAuthority("employeeUpdate")) {
          common_vendor.index.showToast({
            title: "您没有操作权限",
            icon: "success",
            duration: 2e3
          });
          return;
        }
      }
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const handleDelete = (ygid) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该员工吗?",
        success: (res) => {
          if (res.confirm) {
            console.log("确认删除");
            apiStationStaffActionData("/Home/Gly/ygxg?lx=3", ygid, 3);
          } else if (res.cancel) {
            console.log("取消删除");
          }
        }
      });
    };
    const toggleDisabled = (ygid, status) => {
      common_vendor.index.showModal({
        title: "提示",
        content: status === "1" ? "确定要禁用该员工吗?" : "确定启用该员工",
        success: (res) => {
          if (res.confirm) {
            let lx = status === "1" ? 1 : 2;
            apiStationStaffActionData(lx === 1 ? "/Home/Gly/ygxg?lx=1" : "/Home/Gly/ygxg?lx=2", ygid, lx);
          } else if (res.cancel)
            ;
        }
      });
    };
    const deletePosition = (id) => {
      permissionStore.loadMenuAuthority();
      if (!permissionStore.hasMenuAuthority("deletPost")) {
        common_vendor.index.showToast({
          title: "您没有操作权限",
          icon: "success",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该岗位吗?",
        success: (res) => {
          if (res.confirm) {
            console.log("确认删除");
            apiStationDelData(id);
          } else if (res.cancel) {
            console.log("取消删除");
          }
        }
      });
    };
    const workerYgList = common_vendor.ref();
    const getRegTimeById = (id) => {
      const user = workerYgList.value.find((item) => item.id === id);
      if (user) {
        const regTime = user.regTime;
        const date = new Date(regTime * 1e3);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return formattedDate;
      } else {
        return null;
      }
    };
    const apiStationStaffListData = async () => {
      const data = {
        // opid:uni.getStorageSync('sessionInfo').opid
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid
      };
      const res = await api_station_station.apiStationStaffList(data);
      if (res.code === 200) {
        workerData.value = res.lists;
        workerYgList.value = res.yglist;
      }
    };
    const apiStationStaffActionData = async (url, ygid, lx) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ygid,
        lx
        //类型1禁用2启用3删除
      };
      const res = await api_station_station.apiStationStaffAction(url, data);
      console.log("StaffAction:", res);
      if (res.code === 200) {
        apiStationStaffListData();
      }
    };
    const apiStationDelData = async (gwid) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        gwid
      };
      const res = await api_station_station.apiStationDel(data);
      console.log("apiStationDel:", res);
      if (res.code === 200) {
        apiStationStaffListData();
      }
    };
    common_vendor.onMounted(() => {
      apiStationStaffListData();
    });
    common_vendor.onShow(() => {
      apiStationStaffListData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backgroundColor: "#ffffff"
        }),
        b: common_vendor.f(common_vendor.unref(workerData), (item, index, i0) => {
          return {
            a: !isOpen(index) ? 1 : "",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.yglist.length),
            d: common_vendor.o(($event) => goPage("/pagesAuthority/authority/authority?forEdit=" + item.id), index),
            e: common_vendor.o(($event) => deletePosition(item.id), index),
            f: "de064941-4-" + i0 + "," + ("de064941-3-" + i0),
            g: "de064941-3-" + i0 + "," + ("de064941-2-" + i0),
            h: common_vendor.f(item.yglist, (item1, index1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item1.name),
                b: item1.phone
              }, item1.phone ? {
                c: common_vendor.t(item1.phone),
                d: common_vendor.t(getRegTimeById(item1.ygid))
              } : {}, {
                e: item1.status === "0"
              }, item1.status === "0" ? {} : {}, {
                f: common_vendor.o(($event) => handleDelete(item1.ygid), index1),
                g: common_vendor.o(($event) => goPage("/pagesStaffInfos/staffInfos/staffInfos?forEdit=" + item1.ygid + "&gwid=" + item.id), index1),
                h: common_vendor.t(item1.status === "1" ? "禁用" : "启用"),
                i: common_vendor.o(($event) => toggleDisabled(item1.ygid, item1.status), index1),
                j: "de064941-5-" + i0 + "-" + i1 + "," + ("de064941-2-" + i0),
                k: index1
              });
            }),
            i: common_vendor.t(item.name),
            j: "de064941-2-" + i0 + "," + ("de064941-1-" + i0),
            k: common_vendor.p({
              open: isOpen(index),
              ["show-arrow"]: false,
              titleBorder: "none",
              border: false
            }),
            l: common_vendor.sr("collapseRef", "de064941-1-" + i0, {
              "f": 1
            }),
            m: common_vendor.o(($event) => togglePanel(index), index),
            n: "de064941-1-" + i0,
            o: index
          };
        }),
        c: common_vendor.p({
          border: false
        }),
        d: common_vendor.p({
          rightWidth: "147"
        }),
        e: common_vendor.o(($event) => goPage("/pagesAuthority/authority/authority")),
        f: common_vendor.o(($event) => goPage("/pagesStaffInfos/staffInfos/staffInfos"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de064941"]]);
wx.createPage(MiniProgramPage);
