"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search_search = require("../../api/search/search.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
const utils_common = require("../../utils/common.js");
const pagesProductInput_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_empty + _easycom_uni_easyinput2 + _easycom_uv_input2 + _easycom_uv_upload2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uni_easyinput + _easycom_uv_input + _easycom_uv_upload + _easycom_uni_collapse_item + _easycom_uni_collapse + inputConfirm + _easycom_uni_popup + common_vendor.unref(jixingPannel))();
}
const inputConfirm = () => "./components/inputConfirm.js";
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const jixingPannel = () => "./components/jixingPannel.js";
const _sfc_main = {
  __name: "productInput",
  setup(__props) {
    common_vendor.ref(false);
    const instance = common_vendor.getCurrentInstance();
    const param = common_vendor.ref({
      xhid: "",
      ppid: "",
      nc: "",
      bb: "",
      wl: "",
      ys: "",
      bx: "",
      start: "",
      delivery: common_vendor.index.getStorageSync("locationForm").fullLocation.split(" ").join(",")
    });
    const qselect = common_vendor.ref(null);
    const nclist = common_vendor.ref([]);
    const yslist = common_vendor.ref([]);
    const showJiXing = common_vendor.ref(false);
    const jixingPannelRef = common_vendor.ref(null);
    const jixingPopup = common_vendor.ref(null);
    const change = (e) => {
      show.value = !e.show;
      if (!e) {
        showJiXing.value = e.show;
      }
    };
    const selectJX = () => {
      showJiXing.value = true;
      jixingPopup.value.open();
    };
    const reload4Jx = async (selected, selectedTabs) => {
      console.log("select data:", selected);
      console.log("selectedTabs:", selectedTabs);
      if (selected.length > 0) {
        qselect.value.clearData();
        orgArray.value = [];
        param.value.xhid = selected[0].xhid;
        param.value.ppid = selected[0].ppid;
        content1.value[0].value = selected[0].xhname;
        await apiRecoveryListData();
      }
    };
    const apiRecoveryListData = async () => {
      nclist.value = [];
      yslist.value = [];
      content1.value[1].value = "";
      content1.value[2].value = "";
      const res = await pagesProductInput_api_api.apiRecoveryList(param.value);
      if (res.code === 200) {
        nclist.value = res.nclist ? res.nclist.filter((item) => item.name) : [];
        yslist.value = res.yslist ? res.yslist.filter((item) => item.name) : [];
        if (nclist.value.length === 0) {
          nclist.value = null;
        }
        if (yslist.value.length === 0) {
          yslist.value = null;
        }
        apiGetProductIdAc();
      }
      console.log("Recovery list:", res);
    };
    const filteredContent1 = common_vendor.computed(() => {
      return content1.value.filter((item, index) => {
        if (item.key === "型号全称") {
          return false;
        }
        if (index === 1 && nclist.value === null) {
          return false;
        }
        if (index === 2 && yslist.value === null) {
          return false;
        }
        return true;
      });
    });
    const onSelectChange1 = async (e) => {
      console.log("选择 e:", e);
      const memoryItem = content1.value.find((item) => item.key === "内存");
      if (memoryItem) {
        console.log("memoryItem", memoryItem);
        console.log("nclist.value", nclist.value);
        const selectedIndex = Number(e.detail.value);
        if (selectedIndex >= 0 && selectedIndex < nclist.value.length) {
          memoryItem.id = nclist.value[selectedIndex].id;
          memoryItem.value = nclist.value[selectedIndex].name;
          await apiGetProductIdAc();
        } else {
          console.error("无效的索引:", selectedIndex);
        }
      } else {
        console.error("未找到内存项");
      }
    };
    const onSelectChange2 = async (e) => {
      console.log("选择 e:", e);
      const memoryItem = content1.value.find((item) => item.key === "颜色");
      if (memoryItem) {
        const selectedIndex = Number(e.detail.value);
        if (selectedIndex >= 0 && selectedIndex < yslist.value.length) {
          memoryItem.id = yslist.value[selectedIndex].id;
          memoryItem.value = yslist.value[selectedIndex].name;
          await apiGetProductIdAc();
        } else {
          console.error("无效的索引:", selectedIndex);
        }
      } else {
        console.error("未找到颜色项");
      }
    };
    const apiGetProductIdAc = async () => {
      const apiParam = {
        xhid: param.value.xhid,
        //
        ncid: content1.value.find((item) => item.key === "内存").id,
        ysid: content1.value.find((item) => item.key === "颜色").id
      };
      const res = await pagesProductInput_api_api.apiGetProductId(apiParam);
      if (res.code === "200" && res.infos) {
        quancid.value = res.infos.id;
        apiQualityCheckItemData(res.infos.id).then(() => {
          clickedItems.value = new Array(dynamicList.value.length).fill(null);
        });
      } else {
        productId.value = "";
      }
      console.log(" 请求  productId.value:", productId.value);
    };
    common_vendor.ref(false);
    const searchModelKey = common_vendor.ref("spname");
    const showModelField = common_vendor.ref("spname");
    const inputConfirmRef = common_vendor.ref(null);
    const showUpdate = (index) => {
      dynamicList.value[index];
      const selected = clickedItems.value[index];
      return selected && selected.tpbs === "1";
    };
    const photoSize = common_vendor.ref("1");
    const formData = common_vendor.reactive({
      batteryEfficiency: "",
      // 电池效率
      imei: "",
      // IMEI/SN
      purchaseEmployee: "",
      // 采购员工
      remark: "",
      warehouse: "",
      // 新增的录入仓库字段
      successId: "",
      //录入成功返回id
      ckid: "",
      cgyid: ""
    });
    const inputPopup = common_vendor.ref(null);
    const show = common_vendor.ref(true);
    const orgArray = common_vendor.ref([]);
    const dynamicList = common_vendor.ref([]);
    const gjbb = common_vendor.ref([]);
    const wlbb = common_vendor.ref([]);
    common_vendor.ref();
    const content1 = common_vendor.ref([
      { key: "型号", placeholder: "请搜索相关型号", value: "" },
      { key: "内存", placeholder: "请搜索相关型号", value: "" },
      { key: "颜色", placeholder: "请搜索相关型号", value: "" },
      { key: "型号全称", placeholder: "", value: "" }
    ]);
    const maintenanceTime = common_vendor.ref({ title: "保修截止", values: ["", "", ""], time: "" });
    const selectedText = common_vendor.ref([]);
    const pickerMemberValue = common_vendor.ref("");
    common_vendor.ref("");
    const fileListRef = common_vendor.reactive({});
    const handleInput = (inputText) => {
      if (inputText.length > 0) {
        common_vendor.index.showLoading({
          title: "加载中....",
          mask: true
        });
        console.log("inputText", inputText);
        apiModelSearchData(inputText);
        common_vendor.index.hideLoading();
      }
    };
    const quancid = common_vendor.ref("");
    const productId = common_vendor.ref("");
    const selectSearchChange = (e) => {
      if (e) {
        console.log("selectSearchChange e:", e);
        const { id, xhname, ncname, ysname, spname } = e;
        quancid.value = id;
        content1.value[0].value = xhname;
        content1.value[1].value = ncname;
        content1.value[2].value = ysname;
        content1.value[3].value = spname;
        nclist.value = [];
        yslist.value = [];
        orgArray.value = [];
        apiQualityCheckItemData(id).then(() => {
          clickedItems.value = new Array(dynamicList.value.length).fill(null);
        });
      }
    };
    const pickerWarehouseValue = common_vendor.ref("");
    const onWarehouseChange = (e) => {
      console.log("仓库 e:", e);
      pickerWarehouseValue.value = cklist.value[e.detail.value].name;
      formData.warehouse = pickerWarehouseValue.value;
      formData.ckid = cklist.value[e.detail.value].id;
    };
    const apiModelSearchData = async (inputText) => {
      const data = {
        word: inputText
      };
      const res = await api_search_search.apiSearchGoods(data);
      console.log("search res:", res);
      if (res.code === "200") {
        orgArray.value = res.lists ? res.lists : [];
      }
    };
    const infos = common_vendor.ref();
    const cgylist = common_vendor.ref([]);
    const cklist = common_vendor.ref([]);
    const showBxjz = common_vendor.ref(false);
    const apiQualityCheckItemData = async (id) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckItem(data);
      if (res.code === 200) {
        showBxjz.value = res.lists.some((item) => item.name.includes("保修截止"));
        dynamicList.value = res.lists.filter((item) => item.name !== "保修截止");
        console.log("dynamicList:", dynamicList.value);
        collapsedStatus.value = dynamicList.value.map(() => false);
        gjbb.value = res.gjbb;
        wlbb.value = res.wlbb;
        infos.value = res.infos;
        cgylist.value = res.cgylist;
        cklist.value = res.cklist;
        if (cklist.value.length > 0) {
          const filteredItems = cklist.value.filter((item) => item.sxck === "1");
          if (filteredItems.length > 0) {
            pickerWarehouseValue.value = filteredItems[0].name;
            formData.ckid = filteredItems[0].id;
            formData.warehouse = pickerWarehouseValue.value;
          }
        }
        content1.value[0].value = infos.value.xhname;
        content1.value[1].value = infos.value.ncname;
        content1.value[2].value = infos.value.ysname;
        content1.value[3].value = infos.value.spname;
      }
    };
    const apiQualityCheckAddData = async () => {
      const allFileUrls = [];
      for (let index in fileListRef) {
        if (fileListRef[index]) {
          fileListRef[index].forEach((file) => {
            allFileUrls.push({ id: file.itemId, url: file.url });
          });
        }
      }
      const data = {
        id: productId.value,
        // opid: uni.getStorageSync('sessionInfo').opid,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        ch: formData.imei,
        gjbbid: selectedGjbb.value.id,
        wlbbid: selectedWlbb.value.id,
        ycbgtplist: JSON.stringify(allFileUrls),
        jbztid: clickedItems.value.map((item) => item.id).join(","),
        jbztcolor: clickedItems.value.map((item) => item.color).join(","),
        jkbz: formData.remark,
        efficiency: formData.batteryEfficiency,
        bxsj: maintenanceTime.value.time,
        lx: "1",
        //1商品录入2功能绿录入3维修录入
        ckid: formData.ckid,
        cgyid: formData.cgyid,
        qcid: quancid.value
      };
      try {
        const res = await api_qualityCheck_qualityCheck.apiQualityCheckAdd1(data);
        console.log("apiQualityCheckAddData:", res);
        if (res.zt === 1) {
          formData.successId = res.ids;
          formData.zjid = res.ids;
          inputConfirmRef.value.getData(formData.imei);
          if (from.value !== "QC") {
            inputPopup.value.open();
          } else {
            common_vendor.index.showToast({
              title: "提交成功",
              icon: "none",
              duration: 2e3
            });
          }
          productId.value = res.ids;
        } else if (res.zt === 201) {
          common_vendor.index.showToast({
            title: "已有串号商品，请重新检测串号",
            icon: "none",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "录入失败，请重试",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (e) {
        console.log("apiQualityCheckAddData :", e);
      }
    };
    const collapsedStatus = common_vendor.ref([]);
    const collapseChange = (isOpen, index) => {
      console.log("面板：", isOpen.length > 0);
      collapsedStatus.value[index] = isOpen.length > 0;
    };
    const clickedItems = common_vendor.ref([]);
    const selectedGjbb = common_vendor.ref(null);
    const selectedWlbb = common_vendor.ref(null);
    const handleCardClick = (collapseIndex, item1) => {
      clickedItems.value[collapseIndex] = item1;
      selectedText.value[collapseIndex] = item1.name;
      console.log("selectedText:", selectedText.value);
      console.log("clickedItems:", clickedItems.value);
      if (showUpdate(collapseIndex)) {
        collapsedStatus.value[collapseIndex] = true;
      } else {
        collapsedStatus.value[collapseIndex] = false;
      }
    };
    const handleGjbbClick = (item1) => {
      selectedGjbb.value = item1;
      console.log("selectedGjbb:", selectedGjbb.value);
    };
    const handleWlbbClick = (item1) => {
      selectedWlbb.value = item1;
      console.log("selectedWlbb:", selectedWlbb.value);
    };
    const isSelected = (index, item1) => {
      return clickedItems.value[index] === item1;
    };
    const isSelectedGjbb = (item1) => {
      return selectedGjbb.value === item1;
    };
    const isSelectedWlbb = (item1) => {
      return selectedWlbb.value === item1;
    };
    const onTimeChange = (e) => {
      const selectedDate = new Date(e.detail.value);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      maintenanceTime.value.time = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      maintenanceTime.value.values[0] = year;
      maintenanceTime.value.values[1] = month;
      maintenanceTime.value.values[2] = day;
    };
    const onSelectWorkChange = (e) => {
      console.log("员工 e.detail.value:", e.detail.value);
      pickerMemberValue.value = cgylist.value[e.detail.value].username;
      formData.purchaseEmployee = pickerMemberValue.value;
      formData.cgyid = cgylist.value[e.detail.value].id;
    };
    const handleClose = () => {
      inputPopup.value.close();
      jixingPopup.value.close();
      show.value = true;
    };
    const scanCode = () => {
      common_vendor.index.scanCode({
        success: function(res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
          switch (res.scanType) {
            case "QR_CODE":
              break;
            case "EAN_13":
              break;
            case "barCode":
              break;
            case "datamatrix":
              break;
            case "pdf417":
              break;
            default:
              res.scanType;
          }
          formData.imei = res.result;
        }
      });
    };
    const comfrm = () => {
      console.log("comfrm check:", fileListRef);
      console.log("formData", formData);
      if (!formData.imei) {
        common_vendor.index.showToast({
          title: "请输入商品串号",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (formData.imei.length !== parseInt(infos.value.cd)) {
        common_vendor.index.showToast({
          title: `IMEI 必须是 ${infos.value.cd} 位`,
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (infos.value.sfjcdcxl === 1 && !formData.batteryEfficiency) {
        common_vendor.index.showToast({
          title: "请输入电池效率",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      console.log("formData.batteryEfficiency:", formData.batteryEfficiency);
      if (formData.batteryEfficiency && parseInt(formData.batteryEfficiency) > 100) {
        common_vendor.index.showToast({
          title: "电池效率不能大于100",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (!selectedGjbb.value) {
        common_vendor.index.showToast({
          title: "请选择国家版本",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (!selectedWlbb.value) {
        common_vendor.index.showToast({
          title: "请选择网络版本",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (clickedItems.value.some((item) => !item)) {
        common_vendor.index.showToast({
          title: "请选择所有检测项",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (!formData.purchaseEmployee) {
        common_vendor.index.showToast({
          title: "请选择采购员工",
          icon: "none",
          duration: 500
        });
        return;
      }
      if (!formData.warehouse) {
        common_vendor.index.showToast({
          title: "请选择录入仓库",
          icon: "none",
          duration: 500
        });
        return;
      }
      for (let index = 0; index < dynamicList.value.length; index++) {
        const item = dynamicList.value[index];
        clickedItems.value[index];
        if (showUpdate(index) && (!fileListRef[index] || fileListRef[index].length === 0)) {
          common_vendor.index.showToast({
            title: `请上传 ${item.name} 的图片`,
            icon: "none",
            duration: 2e3
          });
          return;
        }
      }
      apiQualityCheckAddData();
    };
    const handleUpload = (event, index, itemId) => {
      console.log("itemId:", itemId);
      console.log("上传 event:", event);
      utils_common.uploadFilesByIndex1(event, index, fileListRef, itemId);
    };
    const handleDelete = (event, index) => {
      utils_common.uploadDeleteByIndex(event, index, fileListRef);
    };
    const reset = () => {
      formData.batteryEfficiency = "";
      formData.imei = "";
      formData.remark = "";
      formData.warehouse = "";
      formData.ckid = "";
      formData.cgyid = "";
      formData.purchaseEmployee = "";
      formData.successId = "";
      maintenanceTime.value.time = "";
      clickedItems.value = [];
      selectedGjbb.value = null;
      selectedWlbb.value = null;
      pickerMemberValue.value = "";
      selectedText.value = [];
      maintenanceTime.value.time = "";
      maintenanceTime.value.values = ["", "", ""];
      dynamicList.value = [];
      collapsedStatus.value = [];
      maintenanceTime.value = { title: "保修截止", values: ["", "", ""], time: "" };
      showBxjz.value = false;
      gjbb.value = [];
      wlbb.value = [];
      quancid.value = "";
      productId.value = "";
      content1.value = [
        { key: "型号", placeholder: "请搜索相关型号", value: "" },
        { key: "内存", placeholder: "请搜索相关型号", value: "" },
        { key: "颜色", placeholder: "请搜索相关型号", value: "" },
        { key: "型号全称", placeholder: "", value: "" }
      ];
      orgArray.value = [];
      if (qselect && qselect.value) {
        qselect.value.clearData();
      }
    };
    const apiQualityCheckSerialSearchData = async (ch) => {
      const param2 = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param2);
      if (res.code === 200) {
        return orgArray.value = res.lists ? res.lists : [];
      }
    };
    const setGjbbAndWlbb = (gjbbname, wlbbname) => {
      gjbb.value.forEach((item) => {
        if (item.name === gjbbname) {
          selectedGjbb.value = item;
        }
      });
      wlbb.value.forEach((item) => {
        if (item.name === wlbbname) {
          selectedWlbb.value = item;
        }
      });
    };
    const setBatteryEfficiency = (efficiency) => {
      formData.batteryEfficiency = efficiency;
    };
    const setMaintenanceTime = (bxsj) => {
      maintenanceTime.value.time = bxsj;
      bxsj.split("-").forEach((item, index) => {
        maintenanceTime.value.values[index] = parseInt(item);
      });
    };
    const setPurchaseEmployee = (cgyname) => {
      cgylist.value.forEach((item) => {
        if (item.name === cgyname) {
          pickerMemberValue.value = item.name;
          formData.cgyid = item.id;
        }
      });
    };
    const setWarehouse = (ckid) => {
      cklist.value.forEach((item) => {
        if (item.id === ckid) {
          pickerWarehouseValue.value = item.name;
          formData.ckid = item.id;
        }
      });
    };
    const setRemark = (jkbz) => {
      formData.jkbz = jkbz;
    };
    const setMachineData = (machine) => {
      if (machine) {
        const machineArray = machine.split(",");
        machineArray.forEach((item) => {
          dynamicList.value.forEach((dynamicItem, index) => {
            const erItem = dynamicItem.er.find((er) => er.id == item);
            if (erItem) {
              clickedItems.value[index] = erItem;
              selectedText.value[index] = erItem.name;
              collapsedStatus.value[index] = true;
            }
          });
        });
      }
    };
    const setYcbgData = (jbztycbg) => {
      if (jbztycbg) {
        const jbztycbgArray = JSON.parse(jbztycbg);
        jbztycbgArray.forEach((item) => {
          const index = dynamicList.value.findIndex((dynamicItem) => dynamicItem.id == item.id);
          if (index !== -1) {
            if (!fileListRef[index]) {
              fileListRef[index] = [];
            }
            fileListRef[index].push({ url: item.url, itemId: item.id });
          }
        });
      }
    };
    const selectedItemChange = (e) => {
      console.log("e", e);
      const { jbztycbg, machine, id, ch, gjbbname, wlbbname, efficiency, bxsj, cgyname, ckid, jkbz, qcid } = e;
      productId.value = id;
      quancid.value = qcid;
      apiQualityCheckItemData(qcid).then(() => {
        clickedItems.value = new Array(dynamicList.value.length).fill(null);
        formData.imei = ch;
        setGjbbAndWlbb(gjbbname, wlbbname);
        setBatteryEfficiency(efficiency);
        setMaintenanceTime(bxsj);
        setPurchaseEmployee(cgyname);
        setWarehouse(ckid);
        setRemark(jkbz);
        setMachineData(machine);
        setYcbgData(jbztycbg);
      });
    };
    common_vendor.index.$on("productInputRefresh", () => {
      reset();
    });
    const from = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      if (options.ch) {
        apiQualityCheckSerialSearchData(options.ch).then((res) => {
          console.log("apiQualityCheckSerialSearchData:", res);
          selectedItemChange(res[0]);
        });
      }
      if (options.from) {
        from.value = options.from;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr(qselect, "0eee0f24-1", {
          "k": "qselect"
        }),
        b: common_vendor.o(handleInput),
        c: common_vendor.o(selectSearchChange),
        d: common_vendor.p({
          keyId: 2,
          dataList: common_vendor.unref(orgArray),
          phText: "请搜索并确认型号全称",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        e: common_vendor.f(common_vendor.unref(filteredContent1).slice(0, 3), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: item.placeholder,
            c: item.value,
            d: common_vendor.o(($event) => item.value = $event.detail.value, index),
            e: index === 0
          }, index === 0 ? {
            f: common_vendor.o(($event) => selectJX(), index)
          } : {}, {
            g: index === 1 && common_vendor.unref(nclist) !== null && common_vendor.unref(nclist).length > 0
          }, index === 1 && common_vendor.unref(nclist) !== null && common_vendor.unref(nclist).length > 0 ? {
            h: common_vendor.unref(nclist),
            i: common_vendor.o((event) => onSelectChange1(event), index),
            j: common_vendor.unref(content1)[1].value
          } : {}, {
            k: index === 2 && common_vendor.unref(yslist) !== null && common_vendor.unref(yslist).length > 0
          }, index === 2 && common_vendor.unref(yslist) !== null && common_vendor.unref(yslist).length > 0 ? {
            l: common_vendor.unref(yslist),
            m: common_vendor.o((event) => onSelectChange2(event), index),
            n: common_vendor.unref(content1)[2].value
          } : {}, {
            o: index
          });
        }),
        f: common_vendor.unref(dynamicList).length == 0
      }, common_vendor.unref(dynamicList).length == 0 ? {
        g: common_vendor.p({
          image: "search",
          description: "请搜索相关型号"
        })
      } : {}, {
        h: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        i: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(_ctx.receivedData.imei)),
        j: common_vendor.o(($event) => common_vendor.unref(formData).imei = $event),
        k: common_vendor.p({
          clearable: true,
          inputBorder: false,
          maxlength: common_vendor.unref(infos).cd,
          placeholder: "请输入商品串号",
          modelValue: common_vendor.unref(formData).imei
        }),
        l: common_vendor.o(scanCode)
      } : {}, {
        m: common_vendor.unref(dynamicList).length > 0 && common_vendor.unref(infos).sfjcdcxl === 1
      }, common_vendor.unref(dynamicList).length > 0 && common_vendor.unref(infos).sfjcdcxl === 1 ? {
        n: common_vendor.o(($event) => common_vendor.unref(formData).batteryEfficiency = $event),
        o: common_vendor.p({
          inputAlign: "right",
          maxlength: "3",
          type: "number",
          placeholder: "请输入",
          border: "none",
          modelValue: common_vendor.unref(formData).batteryEfficiency
        })
      } : {}, {
        p: common_vendor.unref(gjbb).length > 0
      }, common_vendor.unref(gjbb).length > 0 ? {
        q: common_vendor.f(common_vendor.unref(gjbb), (item1, cardIndex, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: isSelectedGjbb(item1) ? 1 : "",
            c: isSelectedGjbb(item1) ? 1 : "",
            d: cardIndex,
            e: common_vendor.o(($event) => handleGjbbClick(item1), cardIndex)
          };
        })
      } : {}, {
        r: common_vendor.unref(wlbb).length > 0
      }, common_vendor.unref(wlbb).length > 0 ? {
        s: common_vendor.f(common_vendor.unref(wlbb), (item1, cardIndex, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: isSelectedWlbb(item1) ? 1 : "",
            c: isSelectedWlbb(item1) ? 1 : "",
            d: cardIndex,
            e: common_vendor.o(($event) => handleWlbbClick(item1), cardIndex)
          };
        })
      } : {}, {
        t: common_vendor.unref(showBxjz)
      }, common_vendor.unref(showBxjz) ? {
        v: common_vendor.o(onTimeChange),
        w: common_vendor.f(common_vendor.unref(maintenanceTime).values, (item2, index, i0) => {
          return {
            a: common_vendor.t(index === 0 ? "年" : index === 1 ? "月" : index === 2 ? "日" : ""),
            b: "0eee0f24-5-" + i0,
            c: common_vendor.p({
              inputAlign: "right",
              type: "number",
              border: "none",
              value: item2
            }),
            d: index
          };
        })
      } : {}, {
        x: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        y: common_vendor.f(common_vendor.unref(dynamicList), (item, index, i0) => {
          return common_vendor.e({
            a: item.name !== "保修截止"
          }, item.name !== "保修截止" ? common_vendor.e({
            b: common_vendor.t(item.name),
            c: common_vendor.t(common_vendor.unref(selectedText)[index]),
            d: common_vendor.unref(collapsedStatus)[index] ? 1 : "",
            e: common_vendor.f(item.er.slice(0, 3), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex)
              };
            }),
            f: item.er.length > 3
          }, item.er.length > 3 ? {
            g: common_vendor.f(item.er.slice(3), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex + 3,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex + 3)
              };
            })
          } : {}, {
            h: showUpdate(index)
          }, showUpdate(index) ? {
            i: common_vendor.o((event) => handleUpload(event, index, item.id), index),
            j: common_vendor.o((event) => common_vendor.unref(utils_common.uploadCheack)(event, index), index),
            k: common_vendor.o((event) => handleDelete(event, index), index),
            l: "0eee0f24-8-" + i0 + "," + ("0eee0f24-7-" + i0),
            m: common_vendor.p({
              fileList: common_vendor.unref(fileListRef)[index] || [],
              accept: "image",
              maxCount: common_vendor.unref(photoSize),
              maxSize: "5242880",
              width: "152rpx",
              height: "152rpx",
              sizeType: ["compressed"],
              previewFullImage: true,
              previewFullVideo: false
            })
          } : {}, {
            n: "0eee0f24-7-" + i0 + "," + ("0eee0f24-6-" + i0),
            o: common_vendor.p({
              ["show-arrow"]: false,
              open: common_vendor.unref(collapsedStatus)[index],
              titleBorder: "none",
              border: false
            }),
            p: common_vendor.sr("collapseRef", "0eee0f24-6-" + i0, {
              "f": 1
            }),
            q: common_vendor.o((isOpen) => collapseChange(isOpen, index), index),
            r: "0eee0f24-6-" + i0
          }) : {}, {
            s: index
          });
        })
      } : {}, {
        z: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        A: common_vendor.t(!common_vendor.unref(pickerMemberValue) ? "请选择" : common_vendor.unref(pickerMemberValue)),
        B: common_vendor.unref(cgylist),
        C: common_vendor.o(onSelectWorkChange),
        D: common_vendor.unref(pickerMemberValue)
      } : {}, {
        E: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        F: common_vendor.t(!common_vendor.unref(pickerWarehouseValue) ? "请选择" : common_vendor.unref(pickerWarehouseValue)),
        G: common_vendor.unref(cklist),
        H: common_vendor.o(onWarehouseChange),
        I: common_vendor.unref(pickerWarehouseValue)
      } : {}, {
        J: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        K: common_vendor.unref(formData).remark,
        L: common_vendor.o(($event) => common_vendor.unref(formData).remark = $event.detail.value)
      } : {}, {
        M: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        N: common_vendor.o(reset),
        O: common_vendor.o(comfrm)
      } : {}, {
        P: common_vendor.unref(show),
        Q: common_vendor.sr(inputConfirmRef, "0eee0f24-10,0eee0f24-9", {
          "k": "inputConfirmRef"
        }),
        R: common_vendor.unref(productId),
        S: common_vendor.o(handleClose),
        T: common_vendor.p({
          purchaseEmployee: common_vendor.unref(formData).purchaseEmployee,
          id: common_vendor.unref(productId),
          zjid: common_vendor.unref(formData).zjid,
          imei: common_vendor.unref(formData).imei,
          content: common_vendor.unref(content1)
        }),
        U: common_vendor.sr(inputPopup, "0eee0f24-9", {
          "k": "inputPopup"
        }),
        V: common_vendor.o(handleClose),
        W: common_vendor.o(change),
        X: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        Y: common_vendor.unref(showJiXing)
      }, common_vendor.unref(showJiXing) ? {
        Z: common_vendor.sr(jixingPannelRef, "0eee0f24-12,0eee0f24-11", {
          "k": "jixingPannelRef"
        }),
        aa: common_vendor.o(reload4Jx),
        ab: common_vendor.o(handleClose)
      } : {}, {
        ac: common_vendor.sr(jixingPopup, "0eee0f24-11", {
          "k": "jixingPopup"
        }),
        ad: common_vendor.o(handleClose),
        ae: common_vendor.o(change),
        af: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0eee0f24"]]);
wx.createPage(MiniProgramPage);
