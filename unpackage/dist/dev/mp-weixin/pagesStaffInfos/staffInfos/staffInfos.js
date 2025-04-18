"use strict";
const common_vendor = require("../../common/vendor.js");
const api_station_station = require("../../api/station/station.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uni_popup_dialog + _easycom_uni_popup + common_vendor.unref(staffPannel) + common_vendor.unref(messagePannel) + common_vendor.unref(warehousePannel))();
}
const warehousePannel = () => "./components/staffinfos-warehouse-pannel.js";
const staffPannel = () => "./components/staffPannel.js";
const messagePannel = () => "./components/messagePannel.js";
const _sfc_main = {
  __name: "staffInfos",
  setup(__props) {
    const pannelTitle = common_vendor.ref("");
    const warehouse = common_vendor.ref("");
    const ckid = common_vendor.ref("-1");
    const phone = common_vendor.ref("");
    const title = common_vendor.ref("新建员工");
    const staffName = common_vendor.ref("");
    const gwid = common_vendor.ref("");
    const contact = common_vendor.ref("");
    const password = common_vendor.ref("");
    const dialogPopup = common_vendor.ref(null);
    const warehousePannelPopup = common_vendor.ref(null);
    const warehousePannelRef = common_vendor.ref(null);
    const staffPannelPopup = common_vendor.ref(null);
    const messagePannelPopup = common_vendor.ref(null);
    const staffPannelRef = common_vendor.ref(null);
    const messagePannelRef = common_vendor.ref(null);
    const showPannel = common_vendor.ref(false);
    const handleClose = () => {
      messagePannelPopup.value.close();
      warehousePannelPopup.value.close();
      staffPannelPopup.value.close();
      dialogPopup.value.close();
    };
    const selectedGzlx = common_vendor.ref([]);
    const toggleSelection = (gzlx) => {
      const index = selectedGzlx.value.indexOf(gzlx);
      if (index === -1) {
        selectedGzlx.value.push(gzlx);
      } else {
        selectedGzlx.value.splice(index, 1);
      }
    };
    const isSelected = (gzlx) => {
      return selectedGzlx.value.includes(gzlx);
    };
    const pickerMemberValue = common_vendor.ref("");
    const positionArray = common_vendor.ref([]);
    const onSelectChange = (e) => {
      pickerMemberValue.value = positionArray.value[e.detail.value];
      gwid.value = positionArray.value[e.detail.value].id;
    };
    const openPannel = () => {
      showPannel.value = true;
      warehousePannelPopup.value.open();
    };
    const openStaffPannel1 = () => {
      pannelTitle.value = "配置员工";
      showPannel.value = true;
      staffPannelPopup.value.open();
    };
    const openStaffPannel2 = () => {
      pannelTitle.value = "消息推送";
      showPannel.value = true;
      messagePannelPopup.value.open();
    };
    const staffs = common_vendor.ref();
    const ygids = common_vendor.ref("-1");
    const messageStaffs = common_vendor.ref();
    const messageYgids = common_vendor.ref("");
    const staffConfirm1 = (data) => {
      console.log("员工数据：", data);
      const selecteStaff = data.filter((item) => item.selected);
      const selecteStaffNames = selecteStaff.map((item) => item.text);
      const selecteStaffIds = selecteStaff.map((item) => item.ygid);
      staffs.value = selecteStaffNames.join(",");
      ygids.value = selecteStaffIds.join(",").replace(/^,/, "") || "-1";
    };
    const staffConfirm2 = (data) => {
      console.log("消息数据：", data);
      const selecteStaff = data.filter((item) => item.selected);
      const selecteStaffNames = selecteStaff.map((item) => item.text);
      const selecteStaffIds = selecteStaff.map((item) => item.tsid);
      messageStaffs.value = selecteStaffNames.join(",");
      messageYgids.value = selecteStaffIds.join(",").replace(/^,/, "");
    };
    const handleConfirm = (data) => {
      console.log("仓库数据：", data);
      const selectedWarehouses = data.filter((item) => item.selected);
      const selectedWarehouseNames = selectedWarehouses.map((item) => item.text);
      const selectedWarehouseIds = selectedWarehouses.map((item) => item.ckid);
      if (selectedWarehouseNames.length === data.length) {
        warehouse.value = "全部仓库";
        ckid.value = "0";
      } else {
        warehouse.value = selectedWarehouseNames.join(",");
        ckid.value = selectedWarehouseIds.join(",").replace(/^,/, "") || "-1";
      }
    };
    const apiStaffAddData = async () => {
      const data = {
        username: staffName.value,
        phone: phone.value,
        gwid: gwid.value,
        // 使用选中的 gwid
        ckid: ckid.value,
        gzlx: selectedGzlx.value.join(","),
        // opid: uni.getStorageSync('sessionInfo').opid,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        password: password.value,
        contact: contact.value,
        ygid: ygids.value,
        tsid: messageYgids.value
      };
      const res = await api_station_station.apiStaffAdd(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none"
        });
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.showToast({
          title: res.msg || "操作失败",
          icon: "none"
        });
      }
    };
    const dialogConfirm = (e) => {
      password.value = e;
      dialogPopup.value.close();
    };
    const openDialogPopup = () => {
      common_vendor.index.showModal({
        title: "重置密码",
        content: "是否重置密码",
        success: function(res) {
          if (res.confirm) {
            password.value = "123456";
          }
        }
      });
    };
    const stationList = common_vendor.ref([]);
    const apiAdminStationListData = async () => {
      const data = {
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid
      };
      const res = await api_station_station.apiAdminStationList(data);
      if (res.code === 200) {
        stationList.value = res.lists;
        res.lists.forEach((item) => {
          if (item.status === "1") {
            positionArray.value.push({ id: item.id, name: item.name });
          }
        });
        if (gwid.value) {
          console.log("gwid:", gwid.value);
          console.log("positionArray:", positionArray.value);
          const selectedIndex = positionArray.value.findIndex((item) => item.id === gwid.value.toString());
          console.log("selectedIndex:", selectedIndex);
          if (selectedIndex !== -1) {
            pickerMemberValue.value = positionArray.value[selectedIndex];
          }
        }
      }
    };
    const apiStaffDetailData = async (ygid2) => {
      const data = {
        ygid: ygid2
      };
      const res = await api_station_station.apiStaffDetail(data);
      if (res.code === 200) {
        staffName.value = res.infos.username;
        phone.value = res.infos.phone;
        contact.value = res.infos.lxfs;
        password.value = res.infos.mm;
        res.infos.gzlx.split(",").forEach((item) => {
          selectedGzlx.value.push(item);
        });
        staffPannelRef.value.setSelectedStaffs(res.infos.ygidlist);
        warehousePannelRef.value.setSelectedWarehouses(res.infos.ckid);
        console.log("res:", res);
        messagePannelRef.value.setSelectedStaffs(res.infos.tslists);
      }
    };
    const apiStaffEditData = async (ygid2) => {
      const data = {
        id: ygid2,
        username: staffName.value,
        phone: phone.value.replace(/\s+/g, ""),
        gwid: gwid.value,
        ckid: ckid.value,
        gzlx: selectedGzlx.value.join(","),
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        password: password.value,
        contact: contact.value.replace(/\s+/g, ""),
        ygid: ygids.value,
        tsid: messageYgids.value
        // opid: uni.getStorageSync('sessionInfo').opid,
      };
      const res = await api_station_station.apiStaffEdit(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "none"
        });
        common_vendor.index.navigateBack();
      }
    };
    const edit = () => {
      apiStaffEditData(ygid.value);
    };
    const confirm = () => {
      apiStaffAddData();
    };
    const ygid = common_vendor.ref();
    common_vendor.onLoad((options) => {
      if (options.forEdit) {
        title.value = "修改员工";
        ygid.value = options.forEdit;
        apiStaffDetailData(options.forEdit);
        gwid.value = options.gwid;
      }
      apiAdminStationListData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.unref(staffName),
        c: common_vendor.o(($event) => common_vendor.isRef(staffName) ? staffName.value = $event.detail.value : null),
        d: common_vendor.unref(contact),
        e: common_vendor.o(($event) => common_vendor.isRef(contact) ? contact.value = $event.detail.value : null),
        f: common_vendor.unref(ygid),
        g: common_vendor.unref(phone),
        h: common_vendor.o(($event) => common_vendor.isRef(phone) ? phone.value = $event.detail.value : null),
        i: common_vendor.unref(pickerMemberValue).name,
        j: common_vendor.o(($event) => common_vendor.unref(pickerMemberValue).name = $event.detail.value),
        k: common_vendor.unref(positionArray),
        l: common_vendor.o(onSelectChange),
        m: common_vendor.unref(pickerMemberValue),
        n: common_vendor.unref(positionArray),
        o: common_vendor.o(onSelectChange),
        p: common_vendor.unref(pickerMemberValue),
        q: common_vendor.unref(warehouse),
        r: common_vendor.o(($event) => common_vendor.isRef(warehouse) ? warehouse.value = $event.detail.value : null),
        s: common_vendor.o(openPannel),
        t: common_vendor.unref(staffs),
        v: common_vendor.o(($event) => common_vendor.isRef(staffs) ? staffs.value = $event.detail.value : null),
        w: common_vendor.o(openStaffPannel1),
        x: common_vendor.unref(messageStaffs),
        y: common_vendor.o(($event) => common_vendor.isRef(messageStaffs) ? messageStaffs.value = $event.detail.value : null),
        z: common_vendor.o(openStaffPannel2),
        A: common_vendor.unref(password),
        B: common_vendor.o(($event) => common_vendor.isRef(password) ? password.value = $event.detail.value : null),
        C: common_vendor.o(openDialogPopup),
        D: common_vendor.o(handleClose),
        E: common_vendor.o(dialogConfirm),
        F: common_vendor.p({
          mode: "input",
          title: "重置密码",
          ["before-close"]: true
        }),
        G: common_vendor.sr(dialogPopup, "9745c35a-1", {
          "k": "dialogPopup"
        }),
        H: common_vendor.p({
          type: "dialog"
        }),
        I: common_vendor.sr(staffPannelRef, "9745c35a-4,9745c35a-3", {
          "k": "staffPannelRef"
        }),
        J: common_vendor.o(handleClose),
        K: common_vendor.o(staffConfirm1),
        L: common_vendor.p({
          title: common_vendor.unref(pannelTitle),
          workerData: _ctx.workerData
        }),
        M: common_vendor.sr(staffPannelPopup, "9745c35a-3", {
          "k": "staffPannelPopup"
        }),
        N: common_vendor.o(handleClose),
        O: common_vendor.o(_ctx.change),
        P: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        Q: common_vendor.sr(messagePannelRef, "9745c35a-6,9745c35a-5", {
          "k": "messagePannelRef"
        }),
        R: common_vendor.o(handleClose),
        S: common_vendor.o(staffConfirm2),
        T: common_vendor.sr(messagePannelPopup, "9745c35a-5", {
          "k": "messagePannelPopup"
        }),
        U: common_vendor.o(handleClose),
        V: common_vendor.o(_ctx.change),
        W: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        X: common_vendor.sr(warehousePannelRef, "9745c35a-8,9745c35a-7", {
          "k": "warehousePannelRef"
        }),
        Y: common_vendor.o(handleClose),
        Z: common_vendor.o(handleConfirm),
        aa: common_vendor.sr(warehousePannelPopup, "9745c35a-7", {
          "k": "warehousePannelPopup"
        }),
        ab: common_vendor.o(handleClose),
        ac: common_vendor.o(_ctx.change),
        ad: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        ae: isSelected("1") ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png",
        af: common_vendor.o(($event) => toggleSelection("1")),
        ag: isSelected("3") ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png",
        ah: common_vendor.o(($event) => toggleSelection("3")),
        ai: common_vendor.unref(title) === "新建员工"
      }, common_vendor.unref(title) === "新建员工" ? {
        aj: common_vendor.o(confirm)
      } : {
        ak: common_vendor.o(edit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9745c35a"]]);
wx.createPage(MiniProgramPage);
