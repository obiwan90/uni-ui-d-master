"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesInventoryManager_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uni_data_select2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uni_dateformat2 + _component_van_loading + _component_van_image + _component_van_tag + _easycom_uni_icons2 + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uni_data_select + qiaoSelect + _easycom_uni_dateformat + _easycom_uni_icons + _easycom_z_paging + common_vendor.unref(inventoryManagerSaixuan) + _easycom_uni_popup + common_vendor.unref(productControlPannel) + common_vendor.unref(exportLogPannel))();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const inventoryManagerSaixuan = () => "./components/inventoryManagerSaixuan.js";
const productControlPannel = () => "./components/productControlPannel.js";
const exportLogPannel = () => "./components/exportLog.js";
const _sfc_main = {
  __name: "inventoryManager",
  setup(__props) {
    const searchModelKey = common_vendor.computed(() => {
      return searchSelectValue.value === 0 ? "ch" : "name";
    });
    const showModelField = common_vendor.computed(() => {
      return searchSelectValue.value === 0 ? "ch" : "name";
    });
    const myInputRef = common_vendor.ref(null);
    const scan = async () => {
      showLoading();
      try {
        const result = await utils_common.scanCode();
        console.log("result", result);
        if (result) {
          handleInput(result).then(() => {
            if (orgArray.value.length > 0) {
              myInputRef.value.inputText = orgArray.value[0].ch;
            }
          });
        }
      } catch (error) {
        console.error("扫码失败：", error);
      } finally {
        hideLoading();
      }
    };
    const showLoading = () => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
    };
    const hideLoading = () => {
      common_vendor.index.hideLoading();
    };
    const isAllSelected = common_vendor.ref(false);
    const selectedItems = common_vendor.ref([]);
    const returnProductSelectValue = common_vendor.ref(0);
    const returnProductRange = common_vendor.ref([
      { value: 0, text: "批量快速批发" },
      { value: 1, text: "批量退出库存" }
    ]);
    const returnProductChange = (e) => {
      const selectedItem = returnProductRange.value[e];
      common_vendor.index.showModal({
        title: "确认操作",
        content: `确定要进行${selectedItem.text}操作吗？`,
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            batchAction(e);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    const toggleSelectAll = () => {
      isAllSelected.value = !isAllSelected.value;
      if (!isAllSelected.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = dataList.value;
        console.log("selectedItems", selectedItems.value);
      }
    };
    const toggleSelectItem = (item) => {
      const index = selectedItems.value.indexOf(item);
      if (index > -1) {
        selectedItems.value.splice(index, 1);
      } else {
        selectedItems.value.push(item);
      }
    };
    const selectedItemCount = common_vendor.computed(() => {
      return selectedItems.value.length;
    });
    const totalSelectedPrice = common_vendor.computed(() => {
      return selectedItems.value.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        return total + price;
      }, 0);
    });
    const exportLogPopup = common_vendor.ref(null);
    const showExport = common_vendor.ref(true);
    const exportLogPannelRef = common_vendor.ref(null);
    const showSaiXuanPannel = common_vendor.ref(false);
    const saiXuanPannelPopup = common_vendor.ref(null);
    const showProductControlPannel = common_vendor.ref(false);
    const productControlPannelPopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      saiXuanPannelPopup.value.close();
      productControlPannelPopup.value.close();
      exportLogPopup.value.close();
      paging.value.refresh(true);
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showSaiXuanPannel.value = e.show;
        showProductControlPannel.value = e.show;
      }
    };
    const openExportLog = () => {
      showExport.value = true;
      exportLogPannelRef.value.initTime();
      exportLogPopup.value.open();
    };
    const apiChSelectSearchAc = async (search) => {
      const param2 = {
        ch: search
      };
      const res = await pagesInventoryManager_api_api.apiChSelectSearch(param2);
      if (res.code === "200" && res.goodslist) {
        console.log(res);
        orgArray.value = res.goodslist;
      }
    };
    const apiModelSearchAc = async (xh) => {
      const param2 = {
        xh
      };
      const res = await pagesInventoryManager_api_api.apiModelSearch(param2);
      console.log("res", res);
      if (res.code === "200") {
        orgArray.value = res.goodslist;
      }
    };
    const openProductControlPannel = () => {
      showProductControlPannel.value = true;
      productControlPannelPopup.value.open();
    };
    const openSaiXuanPannle = () => {
      showSaiXuanPannel.value = true;
      saiXuanPannelPopup.value.open();
    };
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(true);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      param.value.start = String(pageNo - 1);
      await apiGetInventoryData();
      if (param.value.ch) {
        const lxText = getType(goodslist.value[0].zt);
        console.log("重置", lxText);
        value1.value = option1.value.find((option) => option.text === lxText).value;
        console.log("重置", value1.value);
      }
      paging.value.complete(goodslist.value);
    };
    const searchSelectValue = common_vendor.ref(0);
    const range = common_vendor.ref([
      { value: 0, text: "串号搜索" },
      { value: 1, text: "型号搜索" }
    ]);
    const change = (e) => {
      console.log("e:", e);
      orgArray.value = [];
      searchSelectValue.value = e;
    };
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      console.log(e);
      param.value.ch = "";
      param.value.id = "";
      if (searchSelectValue.value === 0) {
        param.value.ch = e.ch;
      } else {
        param.value.id = e.id;
      }
      if (param.value.zt) {
        param.value.zt = "";
      }
      myInputRef.value.clearData();
      orgArray.value = [];
      paging.value.reload(true);
    };
    const handleInput = async (inputText) => {
      console.log("输入框内容:", inputText);
      if (inputText.length > 0) {
        console.log("inputText", inputText);
        common_vendor.index.showLoading({
          title: "加载中",
          mask: true
        });
        if (searchSelectValue.value === 0)
          await apiChSelectSearchAc(inputText);
        if (searchSelectValue.value === 1)
          await apiModelSearchAc(inputText);
        common_vendor.index.hideLoading();
      } else {
        orgArray.value = [];
        param.value.id = "";
      }
    };
    const option1 = common_vendor.ref([
      { text: "上架中", value: "1" },
      { text: "平台已售", value: "2" },
      { text: "先货后款", value: "3" },
      { text: "线下已售", value: "4" },
      { text: "临时下架", value: "5" },
      { text: "已退库存", value: "6" }
    ]);
    const resultType = common_vendor.ref([
      { text: "上架中", value: "1" },
      { text: "平台已售", value: "5" },
      { text: "先货后款", value: "7" },
      { text: "线下已售", value: "6" },
      { text: "临时下架", value: "3" },
      { text: "已退库存", value: "4" }
    ]);
    const getType = (value) => {
      const matchedItem = resultType.value.find((item) => item.value === value);
      return matchedItem ? matchedItem.text : "";
    };
    const option2 = common_vendor.ref([{ text: "最新上架", value: "1" }, { text: "库龄最长", value: "2" }]);
    const option3 = common_vendor.ref([
      { text: "全部采购", value: -1 }
      // { text: '张三', value: 0 },
      // { text: '李四', value: 1 },
      // { text: '王五', value: 2 }
    ]);
    const option4 = common_vendor.ref([
      { text: "全部仓库", value: -1 }
    ]);
    const value1 = common_vendor.ref("1");
    const value2 = common_vendor.ref("1");
    const value3 = common_vendor.ref(-1);
    const value4 = common_vendor.ref(-1);
    const btnData = common_vendor.ref([
      { type: "上架中", zt: "1", btns: ["临时下架", "退出库存", "快速批发"] },
      { type: "先货后款", zt: "7", btns: ["去收款"] },
      { type: "临时下架", zt: "3", btns: ["退出库存", "继续上架"] },
      // { type: '已退库存',zt:'4', btns: ['重新录入'] },
      { type: "已退库存", zt: "4", btns: [] },
      { type: "平台已售", zt: "5", btns: [] },
      { type: "线下已售", zt: "6", btns: [] }
    ]);
    const getBtn = (zt) => {
      return btnData.value.find((item) => item.zt === zt);
    };
    const selectParamChange1 = (e) => {
      value1.value = e.detail;
      param.value.zt = e.detail;
      if (param.value.ch) {
        param.value.ch = "";
      }
      myInputRef.value.clearData();
      orgArray.value = [];
      console.log("selectParamChange1:", e);
      paging.value.reload(true);
    };
    const selectParamChange2 = (e) => {
      value2.value = e.detail;
      param.value.lx = e.detail;
      console.log("selectParamChange2:", e);
      paging.value.reload(true);
    };
    const selectParamChange3 = (e) => {
      value3.value = e.detail;
      console.log("selectParamChange3:", e);
      param.value.cgygid = e.detail === -1 ? "" : e.detail;
      paging.value.reload(true);
    };
    const selectParamChange4 = (e) => {
      value4.value = e.detail;
      console.log("selectParamChange4:", e);
      param.value.ckid = e.detail === -1 ? "" : e.detail;
      paging.value.reload(true);
    };
    const productName = common_vendor.ref();
    const imei = common_vendor.ref();
    const productId = common_vendor.ref();
    const selectBtn = (item, index) => {
      const action = getBtn(item.zt).btns[index];
      common_vendor.index.showModal({
        title: "确认",
        content: `您确定要执行 "${action}" 操作吗？`,
        success: (res) => {
          if (res.confirm) {
            if (action === "商品管理") {
              productName.value = item.name;
              imei.value = item.ch;
              productId.value = item.id;
              openProductControlPannel();
            }
            if (action === "去收款") {
              common_vendor.index.navigateTo({
                url: "/pagesCustomOrder/customOrder/customOrder?fpak=1&ch=" + item.ch
              });
            }
            if (action === "临时下架") {
              apiEditInventoryData("/Home/Goods/updatezt?zt=1", { id: item.id, zt: "1" });
            }
            if (action === "退货下架") {
              apiEditInventoryData("/Home/Goods/updatezt?zt=3", { id: item.id, zt: "3" });
            }
            if (action === "退出库存") {
              apiEditInventoryData("/Home/Goods/updatezt?zt=2", { id: item.id, zt: "2" });
            }
            if (action === "退货上架") {
              apiEditInventoryData("/Home/Goods/updatezt?zt=4", { id: item.id, zt: "4" });
            }
            if (action === "继续上架") {
              apiEditInventoryData("/Home/Goods/updatezt?zt=5", { id: item.id, zt: "5" });
            }
            if (action === "快速批发") {
              common_vendor.index.navigateTo({
                url: "/pagesFirstWholesale/firstWholeSale/firstWholeSale?data=" + JSON.stringify(item)
              });
            }
            if (action === "重新录入") {
              common_vendor.index.navigateTo({
                url: "/pagesProductInput/productInput/productInput?ch=" + item.ch + "&qcid=" + item.qcid + "&zjid=" + item.zjid
              });
            }
          }
        }
      });
    };
    const getTotalPrice = (data) => {
      const totalPrice2 = common_vendor.ref(0);
      data.forEach((item) => {
        totalPrice2.value += parseInt(item.price ? item.price : "0");
      });
      return totalPrice2.value;
    };
    const goodslist = common_vendor.ref([]);
    const cgyglist = common_vendor.ref([]);
    const cklist = common_vendor.ref([]);
    const totalPrice = common_vendor.ref(0);
    const param = common_vendor.ref({
      opid: common_vendor.index.getStorageSync("sessionInfo").opid,
      zt: "1",
      //1.上架中
      lx: "1",
      //1最新上架
      zxsj: "1",
      ckid: "",
      cgygid: "",
      start: "",
      qt: "",
      //1只看特价2只看折叠
      classid: "",
      //分类id
      ppid: "",
      //品牌id
      systemid: "",
      //系统id
      versionid: "",
      //版本id
      finenessid: "",
      //成色id
      memoryid: "",
      //内存id
      colourid: "",
      //颜色id
      price: "",
      //价格区间
      sjkssj: "",
      //时间戳
      sjjssj: "",
      //时间戳
      id: "",
      ch: ""
    });
    const apiGetInventoryData = async () => {
      const res = await pagesInventoryManager_api_api.apiGetInventory(param.value);
      if (res.code === "200") {
        console.log("库存信息 res:", res);
        goodslist.value = res.goodslist;
        cgyglist.value = res.cgyglist;
        cklist.value = res.cklist;
        totalPrice.value = getTotalPrice(goodslist.value);
        if (cklist.value) {
          cklist.value.forEach((item) => {
            const exists = option4.value.some((option) => option.value === item.id);
            if (!exists) {
              option4.value.push({ text: item.name, value: item.id });
              console.log("option4:", option4.value);
            }
          });
          option4.value = [...option4.value];
          console.log("cklist:", cklist.value);
        }
        if (cgyglist.value) {
          cgyglist.value.forEach((item) => {
            const exists = option3.value.some((option) => option.value === item.id);
            if (!exists) {
              option3.value.push({ text: item.username, value: item.id });
              console.log("option3:", option3.value);
            }
          });
          option3.value = [...option3.value];
          console.log("cgyglist:", cgyglist.value);
        }
      }
    };
    const apiEditInventoryData = async (url, param2) => {
      const res = await pagesInventoryManager_api_api.apiEditInventory(url, param2);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "none",
          duration: 2e3
        });
        paging.value.refresh(true);
      }
    };
    const batchAction = (index) => {
      if (index === 0)
        batchGoFpbk(selectedItems.value);
      if (index === 1)
        batchOutbound(selectedItems.value);
    };
    const batchGoFpbk = (selectedItems2) => {
      let chs = "";
      if (selectedItems2.length > 0) {
        selectedItems2.forEach((item) => {
          chs += item.ch + ",";
        });
        if (chs.endsWith(",")) {
          chs = chs.slice(0, -1);
        }
        common_vendor.index.navigateTo({
          url: "/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs=" + chs
        });
      }
    };
    const batchOutbound = (selectedItems2) => {
      let ids = "";
      if (selectedItems2.length > 0) {
        selectedItems2.forEach((item) => {
          ids += item.id + ",";
        });
        if (ids.endsWith(",")) {
          ids = ids.slice(0, -1);
        }
        apiEditInventoryData("/Home/Goods/updatezt?zt=2", { id: ids, zt: "2" });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        b: common_vendor.o(change),
        c: common_vendor.o(($event) => common_vendor.isRef(searchSelectValue) ? searchSelectValue.value = $event : null),
        d: common_vendor.p({
          localdata: common_vendor.unref(range),
          clear: false,
          modelValue: common_vendor.unref(searchSelectValue)
        }),
        e: common_vendor.sr(myInputRef, "7aa2f95e-2", {
          "k": "myInputRef"
        }),
        f: common_vendor.o(handleInput),
        g: common_vendor.o(selectChange),
        h: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: "name",
          showBorder: false,
          disabled: false,
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField)
        }),
        i: common_vendor.o(scan),
        j: common_vendor.o(openSaiXuanPannle),
        k: common_vendor.o(selectParamChange1),
        l: common_vendor.p({
          value: common_vendor.unref(value1),
          options: common_vendor.unref(option1),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        m: common_vendor.o(selectParamChange2),
        n: common_vendor.p({
          value: common_vendor.unref(value2),
          options: common_vendor.unref(option2),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        o: common_vendor.o(selectParamChange3),
        p: common_vendor.p({
          value: common_vendor.unref(value3),
          options: common_vendor.unref(option3),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        q: common_vendor.o(selectParamChange4),
        r: common_vendor.p({
          value: common_vendor.unref(value4),
          options: common_vendor.unref(option4),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        s: common_vendor.p({
          zIndex: "20",
          activeColor: "#EB4636"
        }),
        t: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e(common_vendor.unref(value1) == "1" || common_vendor.unref(value1) == "3" || common_vendor.unref(value1) == "5" ? {
            a: common_vendor.t(item.kl)
          } : {}, {
            b: "7aa2f95e-9-" + i0 + ",7aa2f95e-8",
            c: common_vendor.p({
              date: common_vendor.unref(utils_common.formatTimestamp)(item.add_times),
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            d: common_vendor.t(getType(item.zt)),
            e: item.special && item.special === "1"
          }, item.special && item.special === "1" ? {} : {}, {
            f: "7aa2f95e-11-" + i0 + "," + ("7aa2f95e-10-" + i0),
            g: "7aa2f95e-10-" + i0 + ",7aa2f95e-8",
            h: common_vendor.p({
              width: "95",
              height: "95",
              fit: "as",
              radius: "18rpx",
              src: item.cover,
              mode: "fill"
            }),
            i: item.finenessname
          }, item.finenessname ? {
            j: common_vendor.t(item.finenessname),
            k: "7aa2f95e-12-" + i0 + ",7aa2f95e-8",
            l: common_vendor.p({
              size: "medium",
              color: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
            })
          } : {}, {
            m: common_vendor.t(item.name),
            n: common_vendor.t(item.ch),
            o: common_vendor.t(item.cgyname),
            p: common_vendor.t(item.ckname),
            q: common_vendor.t(item.price),
            r: common_vendor.unref(value1) === "1" && !common_vendor.unref(selectedItems).includes(item)
          }, common_vendor.unref(value1) === "1" && !common_vendor.unref(selectedItems).includes(item) ? {
            s: common_vendor.o(($event) => toggleSelectItem(item), index),
            t: "7aa2f95e-13-" + i0 + ",7aa2f95e-8",
            v: common_vendor.p({
              color: "#D2CFCA",
              type: "circle",
              size: "32"
            })
          } : {}, {
            w: common_vendor.unref(value1) === "1" && common_vendor.unref(selectedItems).includes(item)
          }, common_vendor.unref(value1) === "1" && common_vendor.unref(selectedItems).includes(item) ? {
            x: common_vendor.o(($event) => toggleSelectItem(item), index),
            y: "7aa2f95e-14-" + i0 + ",7aa2f95e-8",
            z: common_vendor.p({
              color: "#E6432E",
              type: "checkbox-filled",
              size: "32"
            })
          } : {}, {
            A: item.zt !== "1"
          }, item.zt !== "1" ? {
            B: common_vendor.t(item.cgname),
            C: "7aa2f95e-15-" + i0 + ",7aa2f95e-8",
            D: common_vendor.p({
              date: "2024-04-16 11:45:12",
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            E: common_vendor.t(item.price)
          } : {}, {
            F: getBtn(item.zt).btns.length > 0
          }, getBtn(item.zt).btns.length > 0 ? {
            G: common_vendor.f(getBtn(item.zt).btns, (bn, index2, i1) => {
              return {
                a: common_vendor.t(bn),
                b: index2 === getBtn(item.zt).btns.length - 1 ? " #FFFFFF" : "#1F1F1F",
                c: common_vendor.o(($event) => selectBtn(item, index2), index2),
                d: index2,
                e: index2 === getBtn(item.zt).btns.length - 1 ? "none" : "2rpx solid #1f1f1f",
                f: index2 === getBtn(item.zt).btns.length - 1 ? 1 : 0.5,
                g: index2 === getBtn(item.zt).btns.length - 1 ? "linear-gradient(89deg, #FF6D0C 0%, #EB4636 100%)" : ""
              };
            })
          } : {}, {
            H: index
          });
        }),
        v: common_vendor.unref(value1) == "1" || common_vendor.unref(value1) == "3" || common_vendor.unref(value1) == "5",
        w: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        x: common_vendor.sr(paging, "7aa2f95e-8", {
          "k": "paging"
        }),
        y: common_vendor.o(queryList),
        z: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        A: common_vendor.p({
          ["default-page-size"]: 20,
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        B: common_vendor.t(common_vendor.unref(value1) === "1" ? common_vendor.unref(selectedItemCount) : common_vendor.unref(dataList).length),
        C: common_vendor.t(common_vendor.unref(value1) === "1" ? common_vendor.unref(totalSelectedPrice) : common_vendor.unref(totalPrice)),
        D: common_vendor.unref(value1) === "1"
      }, common_vendor.unref(value1) === "1" ? common_vendor.e({
        E: !common_vendor.unref(isAllSelected)
      }, !common_vendor.unref(isAllSelected) ? {} : {}, {
        F: common_vendor.o(toggleSelectAll)
      }) : {}, {
        G: common_vendor.unref(value1) !== "1"
      }, common_vendor.unref(value1) !== "1" ? {
        H: common_vendor.o(openExportLog)
      } : {}, {
        I: common_vendor.unref(value1) === "1"
      }, common_vendor.unref(value1) === "1" ? {
        J: common_vendor.o(returnProductChange),
        K: common_vendor.o(($event) => common_vendor.isRef(returnProductSelectValue) ? returnProductSelectValue.value = $event : null),
        L: common_vendor.p({
          localdata: common_vendor.unref(returnProductRange),
          placement: "top",
          clear: false,
          modelValue: common_vendor.unref(returnProductSelectValue)
        }),
        M: common_vendor.o(openExportLog)
      } : {}, {
        N: common_vendor.unref(showSaiXuanPannel)
      }, common_vendor.unref(showSaiXuanPannel) ? {
        O: common_vendor.o(handleClose)
      } : {}, {
        P: common_vendor.sr(saiXuanPannelPopup, "7aa2f95e-17", {
          "k": "saiXuanPannelPopup"
        }),
        Q: common_vendor.o(handleClose),
        R: common_vendor.o(pannelChange),
        S: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        T: common_vendor.unref(showProductControlPannel)
      }, common_vendor.unref(showProductControlPannel) ? {
        U: common_vendor.unref(productId),
        V: common_vendor.o(handleClose),
        W: common_vendor.p({
          id: common_vendor.unref(productId),
          name: common_vendor.unref(productName),
          imei: common_vendor.unref(imei)
        })
      } : {}, {
        X: common_vendor.sr(productControlPannelPopup, "7aa2f95e-19", {
          "k": "productControlPannelPopup"
        }),
        Y: common_vendor.o(handleClose),
        Z: common_vendor.o(pannelChange),
        aa: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "center"
        }),
        ab: common_vendor.unref(showExport)
      }, common_vendor.unref(showExport) ? {
        ac: common_vendor.sr(exportLogPannelRef, "7aa2f95e-22,7aa2f95e-21", {
          "k": "exportLogPannelRef"
        }),
        ad: common_vendor.o(handleClose)
      } : {}, {
        ae: common_vendor.sr(exportLogPopup, "7aa2f95e-21", {
          "k": "exportLogPopup"
        }),
        af: common_vendor.o(handleClose),
        ag: common_vendor.o(change),
        ah: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7aa2f95e"]]);
wx.createPage(MiniProgramPage);
