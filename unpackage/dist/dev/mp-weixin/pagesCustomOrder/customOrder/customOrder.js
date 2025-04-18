"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/system.js");
const pagesCustomOrder_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_count_down2 = common_vendor.resolveComponent("uv-count-down");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uv_tabs2 + _easycom_uv_count_down2 + _component_van_loading + _component_van_image + _component_van_tag + _easycom_uni_icons2 + _easycom_z_paging2 + _easycom_uni_data_select2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_count_down = () => "../../uni_modules/uv-count-down/components/uv-count-down/uv-count-down.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_tabs + _easycom_uv_count_down + _easycom_uni_icons + common_vendor.unref(fpakCard) + common_vendor.unref(serviceCard) + _easycom_z_paging + _easycom_uni_data_select + common_vendor.unref(offlinePaymentPannel) + _easycom_uni_popup + common_vendor.unref(customOrderCardSaixuanPannel) + common_vendor.unref(userServicePannel))();
}
const offlinePaymentPannel = () => "./components/offline-payment-pannel.js";
const customOrderCardSaixuanPannel = () => "./components/custom-order-card-saixuan-pannel.js";
const fpakCard = () => "./components/fpakCard.js";
const serviceCard = () => "./components/serviceCard.js";
const userServicePannel = () => "./components/userServicePannel.js";
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "customOrder",
  setup(__props) {
    const myInputRef = common_vendor.ref(null);
    const isAllSelected = common_vendor.ref(false);
    const selectedItems = common_vendor.ref([]);
    const toggleSelectAll = () => {
      isAllSelected.value = !isAllSelected.value;
      console.log("进来了");
      if (!isAllSelected.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = orderList.value.flatMap((order) => order.goodsinfos);
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
        const price = parseFloat(item.goodsinfos.price) || 0;
        return total + price;
      }, 0);
    });
    const patchGoFpak = async () => {
      const flag = validateSelectedItems();
      console.log("flag", flag);
      if (flag) {
        let chs = "";
        let ddid = "";
        let skipProcessing = false;
        console.log("selectedItems", selectedItems.value);
        for (const item of selectedItems.value) {
          const flag2 = await apiCheckPayAc(item.ddid);
          if (flag2) {
            skipProcessing = true;
            break;
          }
          chs += item.goodsinfos.ch + ",";
          ddid += item.ddid + ",";
        }
        if (skipProcessing) {
          console.log("跳过后续处理");
          return;
        }
        if (chs.endsWith(",")) {
          chs = chs.slice(0, -1);
        }
        console.log("拼接后的 chs:", chs);
        ddid = Array.from(new Set(ddid.trim().split(",").filter(Boolean))).join(",");
        common_vendor.index.navigateTo({
          url: "/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs=" + chs + "&khid=" + khidArray.value + "&khNames=" + khNameArray.value + "&ddid=" + ddid
        });
      }
    };
    const khidArray = common_vendor.ref("");
    const khNameArray = common_vendor.ref("");
    const validateSelectedItems = () => {
      console.log("selectedItems", selectedItems.value);
      console.log("orderList", orderList.value);
      if (selectedItems.value.length > 0) {
        let hasNullKhxx = false;
        const khidSet = /* @__PURE__ */ new Set();
        const khidNameSet = /* @__PURE__ */ new Set();
        let khids = "";
        let khidnames = "";
        for (const selectedItem of selectedItems.value) {
          const orderItem2 = orderList.value.find(
            (order) => order.goodsinfos.some((goods) => goods.id === selectedItem.id)
          );
          if (orderItem2) {
            if (!orderItem2.khxx) {
              hasNullKhxx = true;
            } else {
              khidNameSet.add(orderItem2.khxx.name);
            }
          }
          khidSet.add(orderItem2.khid);
        }
        khids = Array.from(khidSet).join(",");
        khidnames = Array.from(khidNameSet).join(",");
        if (hasNullKhxx) {
          common_vendor.index.showToast({
            title: "有未知商户订单",
            icon: "error",
            duration: 1e3
          });
          return false;
        }
        if (khidSet.size > 1) {
          common_vendor.index.showToast({
            title: "只能唯一客户",
            icon: "error",
            duration: 1e3
          });
          return false;
        }
        console.log("拼接后的 khids:", khids);
        khidArray.value = khids;
        khNameArray.value = khidnames;
      }
      return true;
    };
    const expressText = common_vendor.ref([
      { text: "京东", id: "1" },
      { text: "顺丰", id: "2" },
      { text: "自提", id: "3" },
      { text: "送货上门", id: "4" }
    ]);
    const searchModelKey = common_vendor.computed(() => {
      return title.value === "销售订单" ? "ddh" : "ch";
    });
    const showModelField = common_vendor.computed(() => {
      return title.value === "销售订单" ? "ddh" : "ch";
    });
    const reloadFpbk = (data) => {
      var _a, _b, _c;
      console.log("data...........", data);
      fpbkYgid.value = ((_a = data[0]) == null ? void 0 : _a.length) ? data[0].map((item) => item.id).join(",") : "";
      fpbkKhid.value = ((_b = data[1]) == null ? void 0 : _b.length) ? data[1].map((item) => item.id).join(",") : "";
      fpbkDdlx.value = ((_c = data[2]) == null ? void 0 : _c.length) ? data[2].map((item) => item.ddlx)[0] : "";
      paging.value.reload(true);
    };
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
    const orgArray = common_vendor.ref([]);
    const handleInput = (inputText) => {
      console.log("输入框内容:", inputText);
      if (inputText.length > 0) {
        if (title.value === "先货后款") {
          fpbkSearchAc(inputText);
        }
        if (title.value === "销售订单") {
          apiSearchOrderAc(inputText);
        }
      }
    };
    const searchCh = common_vendor.ref("");
    const ddh = common_vendor.ref("");
    const selectChange = async (e) => {
      console.log("模糊搜索 e", e);
      if (title.value === "先货后款") {
        console.log("jinlai le ");
        searchCh.value = e.ch;
        activeTab1Index.value = tabsData.value.findIndex((item) => item.lx == e.zt);
        paging.value.reload(true);
      }
      if (title.value === "销售订单") {
        ddh.value = e.ddh;
        paging.value.reload(true);
      }
      if (myInputRef && myInputRef.value) {
        myInputRef.value.clearData();
      }
      orgArray.value = [];
    };
    const fpbkSearchAc = async (search) => {
      const param = {
        lx: "",
        //1未收款2已收款3退货
        lxs: "1",
        //1 串号 
        search
      };
      const res = await pagesCustomOrder_api_api.fpbkSearch(param);
      if (res.code == 200) {
        orgArray.value = res.lists;
      } else {
        orgArray.value == [];
      }
      console.log("orgArray", orgArray.value);
    };
    const apiSearchOrderAc = async (search) => {
      const param = {
        ddh: search
      };
      const res = await pagesCustomOrder_api_api.apiSearchOrder(param);
      if (res.code === 200) {
        orgArray.value = res.lists;
      } else {
        orgArray.value == [];
      }
      console.log("orgArray", orgArray.value);
    };
    const userServicePannelPopup = common_vendor.ref(null);
    const fpakCardRef = common_vendor.ref(null);
    const offlinePaymentPopup = common_vendor.ref(null);
    const customOrderCardSaixuanPopup = common_vendor.ref(null);
    const showOfflinePaymentPannel = common_vendor.ref(false);
    const showCustomOrderCardSaixuan = common_vendor.ref(false);
    const showUserServicePannel = common_vendor.ref(false);
    const handleClose = () => {
      console.log("Popup is closed");
      offlinePaymentPopup.value.close();
      customOrderCardSaixuanPopup.value.close();
      userServicePannelPopup.value.close();
    };
    const pannelChange = (e) => {
      console.log("点击了遮罩e:", e);
      if (!e) {
        showOfflinePaymentPannel.value = e.show;
        showCustomOrderCardSaixuan.value = e.show;
        showUserServicePannel.value = e.show;
      }
    };
    const openSaiXuan = () => {
      showCustomOrderCardSaixuan.value = true;
      customOrderCardSaixuanPopup.value.open();
    };
    const openOfflinePayment = () => {
      showOfflinePaymentPannel.value = true;
      offlinePaymentPopup.value.open();
    };
    const orderItem = common_vendor.ref();
    const openUseServicePannel = (item) => {
      orderItem.value = item;
      showUserServicePannel.value = true;
      userServicePannelPopup.value.open();
    };
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      currentType.value = tabsData.value[activeTab1Index.value].type;
      currentLx.value = tabsData.value[activeTab1Index.value].lx;
      await getOrderList(currentLx.value, currentType.value, pageNo - 1);
      paging.value.complete(orderList.value);
      if (currentType.value === "fpak" && currentLx.value === "1") {
        fpakCardRef.value.cancelAllSelectedProduct();
        if (isFpakAllSelected.value) {
          isFpakAllSelected.value = false;
        }
      }
    };
    const orderType = common_vendor.ref();
    const btnData = common_vendor.ref([
      { type: "yj", lx: "2", btns: [
        "驳回议价",
        "同意议价"
      ] },
      { type: "custom", lx: "3", btns: [
        // '去先货后款','线下收款'
        "先货后款"
      ] },
      { type: "custom", lx: "4", btns: [
        "确认发货"
      ] }
    ]);
    const getBtns = (type, lx) => {
      const btnItem = btnData.value.find((item) => item.type === type && item.lx === lx);
      console.log();
      return btnItem ? btnItem.btns : [];
    };
    const handleBtnClick = async (btn, item) => {
      console.log("Button clicked:", btn);
      console.log("item:", item);
      if (btn === "驳回议价") {
        apiCustomYjOrderActionData("1", item.id);
      }
      if (btn === "同意议价") {
        apiCustomYjOrderActionData("2", item.id);
      }
      if (btn === "确认发货") {
        openUseServicePannel(item);
      }
      if (btn === "先货后款") {
        const flag = await apiCheckPayAc(item.id);
        if (flag) {
          console.log("jinlai le ");
          return;
        }
        if (item.khxx) {
          console.log("进来了？");
          common_vendor.index.navigateTo({
            url: "/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs=" + item.ch + "&khid=" + item.khxx.id + "&khNames=" + item.khxx.name + "&ddid=" + item.ddid
          });
        } else {
          common_vendor.index.showToast({
            title: "有未知商户订单",
            icon: "error",
            duration: 1e3
          });
        }
      }
    };
    const btnClass = (btn) => {
      if (btn === "同意议价" || btn === "线下收款" || btn === "确认发货" || btn === "先货后款") {
        return "special-btn";
      } else {
        return "normal-btn";
      }
    };
    const apiCheckPayAc = async (id) => {
      const param = {
        id
      };
      const res = await pagesCustomOrder_api_api.apiCheckPay(param);
      if (res.code === "200") {
        return false;
      }
      if (res.code === "201") {
        common_vendor.index.showToast({
          title: "订单已售",
          icon: "success",
          duration: 1e3
        });
        return true;
      }
    };
    const getRemainingTime = (addTime, bargainingTimeName) => {
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      const bargainingEndTime = new Date(parseInt(addTime) * 1e3 + parseInt(bargainingTimeName) * 3600 * 1e3);
      const remainingTime = bargainingEndTime.getTime() - currentTime;
      if (remainingTime <= 0) {
        return "已结束";
      }
      return remainingTime;
    };
    const totalNum = common_vendor.ref(0);
    const totalPrice = common_vendor.ref(0);
    const countNumAndPrice = () => {
      totalNum.value = 0;
      totalPrice.value = 0;
      if (orderType.value === "custom") {
        orderList.value.forEach((order) => {
          totalNum.value += parseInt(order.num);
          totalPrice.value += parseFloat(order.price);
        });
      }
      if (orderType.value === "yj") {
        orderList.value.forEach((order) => {
          totalPrice.value += parseFloat(order.price);
        });
        totalNum.value += parseInt(orderList.value.length);
      }
      console.log(`总 num 为 ${totalNum.value}, 总 price 为 ${totalPrice.value}`);
    };
    common_vendor.ref(0);
    common_vendor.ref([
      { value: 0, text: "串号搜索" },
      { value: 1, text: "型号搜索" }
    ]);
    const returnProductSelectValue = common_vendor.ref(0);
    const returnProductRange = common_vendor.ref([
      { value: 0, text: "退货上架" },
      { value: 1, text: "临时下架" },
      { value: 2, text: "退出仓库" }
    ]);
    const returnProductChange = (e) => {
      const selectedItem = returnProductRange.value[e];
      common_vendor.index.showModal({
        title: "确认操作",
        content: `确定要进行${selectedItem.text}操作吗？`,
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            apiOrderReturnData(e + 1);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    const title = common_vendor.ref();
    const activeTab1Index = common_vendor.ref();
    const orderList = common_vendor.ref([]);
    const classlist = common_vendor.ref([
      // { name: '全部', lx: '1', type: 'custom' },
      { name: "待付款", lx: "3", type: "custom" },
      {
        name: "待发货",
        lx: "4",
        type: "custom",
        badge: { value: 99 }
      },
      { name: "待收货", lx: "5", type: "custom" },
      { name: "已收货", lx: "6", type: "custom" },
      { name: "交易成功", lx: "7", type: "custom" },
      // { name: '全部', lx: '1', type: 'yj' },
      {
        name: "议价待确认",
        lx: "2",
        type: "yj",
        badge: { value: 99 }
      },
      {
        name: "议价成功",
        lx: "3",
        type: "yj",
        badge: { value: 99 }
      },
      {
        name: "议价失败",
        lx: "4",
        type: "yj",
        badge: { value: 99 }
      },
      // { name: '全部', lx: '1', type: 'sh' },
      { name: "售后中", lx: "2", type: "sh" },
      { name: "售后成功", lx: "3", type: "sh" },
      { name: "售后失败", lx: "4", type: "sh" },
      {
        name: "未收款",
        lx: "1",
        type: "fpak",
        badge: { value: 99 }
      },
      {
        name: "已收款",
        lx: "2",
        type: "fpak",
        badge: { value: 99 }
      },
      {
        name: "已退货",
        lx: "3",
        type: "fpak",
        badge: { value: 99 }
      }
    ]);
    const tabsData = common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name,
        type: item.type,
        // 添加 type 属性
        lx: item.lx
      }));
    });
    const currentLx = common_vendor.ref();
    const currentType = common_vendor.ref();
    const uvTabs1Change = async (e) => {
      activeTab1Index.value = e.index;
      console.log("tabsData:", tabsData.value);
      currentType.value = tabsData.value[e.index].type;
      currentLx.value = tabsData.value[e.index].lx;
      await paging.value.reload(true);
      console.log("currentType:", currentType.value);
      console.log("currentLx:", currentLx.value);
      console.log("currentLx type:", typeof currentLx.value);
      if (currentType.value === "fpak") {
        console.log("进来了？");
        let totalNum1 = 0;
        let totalPrice1 = 0;
        dataList.value.forEach((item) => {
          totalNum1 += item.goodsinfos.length;
          item.goodsinfos.forEach((item1) => {
            totalPrice1 += parseFloat(item1.price);
          });
        });
        totalNum.value = totalNum1;
        totalPrice.value = totalPrice1;
        console.log("dataList", dataList.value);
      }
    };
    const yglist = common_vendor.ref([]);
    const khlist = common_vendor.ref([]);
    const fpbkDdlx = common_vendor.ref("");
    const fpbkYgid = common_vendor.ref("");
    const fpbkKhid = common_vendor.ref("");
    const getOrderList = async (lx, type, start) => {
      let res;
      switch (type) {
        case "custom":
          res = await pagesCustomOrder_api_api.apiCustomOrderList({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            // opid: 'oT4uj69MFuuVV4q_e6rq8RKCTCvo',
            lx: ddh.value ? "" : lx,
            gysid: common_vendor.index.getStorageSync("adminId"),
            ddh: ddh.value,
            start
          });
          break;
        case "yj":
          res = await pagesCustomOrder_api_api.apiGetYjIndex({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx,
            gysid: common_vendor.index.getStorageSync("adminId"),
            start
          });
          break;
        case "sh":
          res = await pagesCustomOrder_api_api.apiGetShIndex({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx,
            gysid: common_vendor.index.getStorageSync("adminId"),
            start
          });
          break;
        case "fpak":
          res = await pagesCustomOrder_api_api.apiCustomFpOrderList({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx,
            orderid: "",
            times: "",
            //开始时间戳结束时间戳  逗号分隔
            ddlx: fpbkDdlx.value,
            //1最新订单 2 最早订单
            ygid: fpbkYgid.value,
            //员工ID 返回得yglist 里面得ID 多个 逗号分隔
            khid: fpbkKhid.value,
            search: searchCh.value,
            start
          });
          break;
        default:
          res = { code: 200, lists: [] };
      }
      if (res.code === 200) {
        if (type === "custom") {
          console.log("res.lists:", res.lists);
          if (ddh.value) {
            activeTab1Index.value = parseInt(res.lists[0].zt) - 1;
            ddh.value = "";
          }
          orderList.value = res.lists.filter((item) => item.goodsinfos.length > 0);
          console.log("orderList.value:", orderList.value);
          countNumAndPrice();
          if (currentLx.value === "4" && orderList.value.length > 0) {
            orderList.value = groupByKhid(orderList.value);
            console.log("groupByKhid", orderList.value);
          }
        }
        if (type === "yj") {
          console.log("res.lists:", res.lists);
          orderList.value = Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
          countNumAndPrice();
        }
        if (type === "sh") {
          if (res.lists.length > 0) {
            res.lists.forEach((item) => {
              if (!Array.isArray(item.goodsinfos)) {
                const goodsinfos = item.goodsinfos;
                item.goodsinfos = [];
                if (goodsinfos) {
                  item.goodsinfos.push(goodsinfos);
                }
              }
            });
            res.lists = res.lists.filter((item) => item.goodsinfos.length > 0);
            orderList.value = res.lists;
          } else {
            orderList.value = [];
          }
          console.log("orderList.value:", orderList.value);
        }
        if (type === "fpak") {
          console.log("res.lists:", res.lists);
          orderList.value = res.lists;
          console.log("orderList.value:", orderList.value);
          yglist.value = res.yglist;
          khlist.value = res.khlist;
        }
      }
      console.log(res);
    };
    function groupByKhid(data) {
      return Object.values(data.reduce((acc, item) => {
        const khid = item.khid;
        if (!acc[khid]) {
          acc[khid] = { khid, khxx: item.khxx, orders: [] };
        }
        acc[khid].orders.push(item);
        return acc;
      }, {}));
    }
    const goDetail = (item, type) => {
      const itemString = JSON.stringify(item);
      console.log("item", item);
      common_vendor.index.setStorageSync("orderDetailItem", itemString);
      if (type === "custom") {
        common_vendor.index.navigateTo({
          url: "/pagesCustomSellOrderDetail/customSellOrderDetail/customSellOrderDetail?orderId=" + item.id
        });
      }
      if (type === "yj") {
        common_vendor.index.navigateTo({
          url: "/pagesCustomYjOrderDetail/customYjOrderDetail/customYjOrderDetail"
        });
      }
      if (type === "sh") {
        common_vendor.index.navigateTo({
          url: "/pagesCustomServiceOrderDetail/customServiceOrderDetail/customServiceOrderDetail"
        });
      }
      if (type === "fpak") {
        common_vendor.index.navigateTo({
          url: "/pagesCustomFristProductAfterSales/customFristProductAfterSalse/customFristProductAfterSalse?orderId=" + item.id
        });
      }
    };
    const isFpakAllSelected = common_vendor.ref(false);
    const allSelected = () => {
      if (isFpakAllSelected.value) {
        console.log("取消全选");
        common_vendor.nextTick$1(() => {
          console.log("取消全选");
          fpakCardRef.value.cancelAllSelectedProduct();
        });
      } else {
        common_vendor.nextTick$1(() => {
          console.log("全选");
          fpakCardRef.value.selectAllProducts();
        });
      }
      isFpakAllSelected.value = !isFpakAllSelected.value;
    };
    const ddxx = common_vendor.ref();
    const updateSelectedItems = (selectedItems2) => {
      console.log("Selected Items:", selectedItems2);
      computedFpakTotal1(selectedItems2);
      ddxx.value = formatSelectedItems(selectedItems2);
      console.log("ddxx:", ddxx.value);
    };
    function formatSelectedItems(selectedItems2) {
      console.log("selectedItems", selectedItems2);
      const result = [];
      const selectedGsids = selectedItems2.map((item) => item.id);
      for (const order of orderList.value) {
        const { id, goodsinfos } = order;
        const goodsids = goodsinfos.filter((info) => selectedGsids.includes(info.id)).map((info) => info.id);
        if (goodsids.length > 0) {
          result.push({
            orderid: id,
            goodsid: goodsids.join(",")
          });
        }
      }
      return result;
    }
    const computedHeight = common_vendor.computed(() => {
      if (orderList.value.length > 0) {
        if (orderType.value === "sh") {
          return "1300rpx";
        } else if (orderType.value === "custom") {
          return activeTab1Index.value === 0 ? "1100rpx" : "1300rpx";
        }
      }
      return "1100rpx";
    });
    const reloadList = () => {
      offlinePaymentPopup.value.close();
      paging.value.reload(true);
    };
    const computedFpakTotal1 = (selectedItems2) => {
      totalNum.value = 0;
      totalPrice.value = 0;
      totalNum.value = selectedItems2.length;
      totalPrice.value = selectedItems2.reduce((total, item) => total + parseInt(item.price), 0);
      console.log("totalNum", totalNum.value);
      console.log("totalPrice", totalPrice.value);
    };
    common_vendor.ref();
    common_vendor.ref();
    const apiCustomYjOrderActionData = async (zt, id) => {
      const res = await pagesCustomOrder_api_api.apiCustomYjOrderAction({
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        zt,
        //1拒绝  2同意
        id
        //议价id
      });
      console.log(res);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    const apiOrderJdLogisticsData = async (id) => {
      const data = {
        ddid: id
      };
      const res = await pagesCustomOrder_api_api.apiOrderJdLogistics(data);
      console.log(res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    const apiOrderSfLogisticsData = async (id) => {
      const data = {
        ddid: id
      };
      const res = await pagesCustomOrder_api_api.apiOrderSfLogistics(data);
      console.log(res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    const apiOrderReturnData = async (lx) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ddxx: JSON.stringify(ddxx.value),
        lx
        //1 退货上架2 退货下架3退出仓库
      };
      const res = await pagesCustomOrder_api_api.apiOrderReturn(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      } else {
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "none",
          duration: 1e3
        });
      }
    };
    const subExpress = (data) => {
      console.log("data", data);
      console.log("data.orders[0].expressid", data.orders[0].expressid);
      if (data.orders[0].expressid === "1") {
        apiOrderJdLogisticsData(getUniqueIdString(data));
      }
      if (data.orders[0].expressid === "2") {
        apiOrderSfLogisticsData(getUniqueIdString(data));
      }
    };
    function getUniqueIdString(data) {
      const uniqueIds = new Set(data.orders.map((order) => order.id));
      return Array.from(uniqueIds).join(",");
    }
    common_vendor.onLoad((options) => {
      const order = options.order;
      const yjOrder = options.yj;
      const shOrder = options.sh;
      const fpakOrder = options.fpak;
      const ch = options.ch;
      if (order) {
        orderType.value = "custom";
        classlist.value = classlist.value.filter((item) => item.type === "custom" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === order);
        title.value = "销售订单";
        currentType.value = tabsData.value[activeTab1Index.value].type;
        currentLx.value = tabsData.value[activeTab1Index.value].lx;
      } else if (yjOrder) {
        orderType.value = "yj";
        classlist.value = classlist.value.filter((item) => item.type === "yj" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === yjOrder);
        title.value = "议价订单";
      } else if (shOrder) {
        orderType.value = "sh";
        classlist.value = classlist.value.filter((item) => item.type === "sh" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === shOrder);
        title.value = "售后订单";
      } else if (fpakOrder) {
        orderType.value = "fpak";
        classlist.value = classlist.value.filter((item) => item.type === "fpak" || item.type === "fpak");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === fpakOrder);
        title.value = "先货后款";
        if (ch) {
          handleInput(ch);
        }
      } else {
        activeTab1Index.value = 0;
        classlist.value = classlist.value;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.sr(myInputRef, "435777c0-1", {
          "k": "myInputRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectChange),
        e: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: "name",
          showBorder: false,
          disabled: false,
          searchKey: searchModelKey.value,
          showField: showModelField.value
        }),
        f: common_vendor.o(scan),
        g: common_vendor.unref(title) !== "先货后款" ? "750rpx" : "640rpx",
        h: common_vendor.unref(title) === "先货后款"
      }, common_vendor.unref(title) === "先货后款" ? {
        i: common_vendor.o(openSaiXuan)
      } : {}, {
        j: common_vendor.o(uvTabs1Change),
        k: common_vendor.p({
          list: tabsData.value,
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          fontSize: 28,
          inactiveStyle: {
            color: "#1F1F1F"
          },
          activeStyle: {
            color: "#E6432E",
            fontWeight: "bold",
            fontSize: 32
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        l: common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "custom" && tabsData.value[common_vendor.unref(activeTab1Index)].name !== "待发货"
      }, common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "custom" && tabsData.value[common_vendor.unref(activeTab1Index)].name !== "待发货" ? {
        m: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.ordernumber)
          }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "议价待确认" ? {
            b: "435777c0-4-" + i0 + ",435777c0-3",
            c: common_vendor.p({
              time: 30 * 1e3 * 1e3,
              format: "HH:mm:ss"
            })
          } : {}, {
            d: common_vendor.o(($event) => goDetail(item, "custom"), index),
            e: common_vendor.f(item.goodsinfos, (item1, index2, i1) => {
              return common_vendor.e({
                a: "435777c0-6-" + i0 + "-" + i1 + "," + ("435777c0-5-" + i0 + "-" + i1),
                b: "435777c0-5-" + i0 + "-" + i1 + ",435777c0-3",
                c: common_vendor.p({
                  width: "95",
                  height: "95",
                  fit: "fill",
                  radius: "18rpx",
                  src: item1.goodsinfos.cover
                }),
                d: common_vendor.o(($event) => goDetail(item, "custom"), index2),
                e: item1.goodsinfos.finenessname
              }, item1.goodsinfos.finenessname ? {
                f: common_vendor.t(item1.goodsinfos.finenessname)
              } : {}, {
                g: common_vendor.t(item1.goodsinfos.name),
                h: common_vendor.t(item1.goodsinfos.ch),
                i: common_vendor.t(item1.goodsinfos.price),
                j: "435777c0-7-" + i0 + "-" + i1 + ",435777c0-3",
                k: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && !common_vendor.unref(selectedItems).includes(item1)
              }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && !common_vendor.unref(selectedItems).includes(item1) ? {
                l: common_vendor.o(($event) => toggleSelectItem(item1), index2),
                m: "435777c0-8-" + i0 + "-" + i1 + ",435777c0-3",
                n: common_vendor.p({
                  color: "#D2CFCA",
                  type: "circle",
                  size: "32"
                })
              } : {}, {
                o: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && common_vendor.unref(selectedItems).includes(item1)
              }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && common_vendor.unref(selectedItems).includes(item1) ? {
                p: common_vendor.o(($event) => toggleSelectItem(item1), index2),
                q: "435777c0-9-" + i0 + "-" + i1 + ",435777c0-3",
                r: common_vendor.p({
                  color: "#E6432E",
                  type: "checkbox-filled",
                  size: "32"
                })
              } : {}, {
                s: index2
              });
            }),
            f: common_vendor.t(common_vendor.unref(orderType) === "yj" || item.ddlx === "2" ? "议价:" : "批发价:"),
            g: common_vendor.t(common_vendor.unref(expressText).find((express) => express.id === item.expressid).text)
          }, getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx).length > 0 ? common_vendor.e({
            h: item.khxx
          }, item.khxx ? {
            i: common_vendor.t(item.khxx.name + " " + item.khxx.phone)
          } : {}, {
            j: common_vendor.f(getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx), (btn, btnIndex, i1) => {
              return {
                a: common_vendor.t(btn),
                b: btnIndex,
                c: common_vendor.o(($event) => handleBtnClick(btn, item), btnIndex),
                d: common_vendor.n(btnClass(btn))
              };
            })
          }) : {}, {
            k: index
          });
        }),
        n: common_vendor.t(tabsData.value[common_vendor.unref(activeTab1Index)].name),
        o: tabsData.value[common_vendor.unref(activeTab1Index)].name === "议价待确认",
        p: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        q: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#EB4636"
        }),
        r: getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx).length > 0
      } : {}, {
        s: common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "custom" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "待发货"
      }, common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "custom" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "待发货" ? {
        t: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.f(item.orders, (item3, index3, i1) => {
              return {
                a: common_vendor.t(item3.ordernumber),
                b: common_vendor.o(($event) => goDetail(item3, "custom"), index3),
                c: common_vendor.f(item3.goodsinfos, (item1, index2, i2) => {
                  return common_vendor.e({
                    a: "435777c0-11-" + i0 + "-" + i1 + "-" + i2 + "," + ("435777c0-10-" + i0 + "-" + i1 + "-" + i2),
                    b: "435777c0-10-" + i0 + "-" + i1 + "-" + i2 + ",435777c0-3",
                    c: common_vendor.p({
                      width: "95",
                      height: "95",
                      fit: "fill",
                      radius: "18rpx",
                      src: item1.goodsinfos.cover
                    }),
                    d: common_vendor.o(($event) => goDetail(item3, "custom"), index2),
                    e: item1.goodsinfos.finenessname
                  }, item1.goodsinfos.finenessname ? {
                    f: common_vendor.t(item1.goodsinfos.finenessname)
                  } : {}, {
                    g: common_vendor.t(item1.goodsinfos.name),
                    h: common_vendor.t(item1.goodsinfos.ch),
                    i: common_vendor.t(item1.goodsinfos.price)
                  }, item3.ddlx === "2" ? {
                    j: common_vendor.t(item3.price)
                  } : {}, {
                    k: "435777c0-12-" + i0 + "-" + i1 + "-" + i2 + ",435777c0-3",
                    l: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && !common_vendor.unref(selectedItems).includes(item1)
                  }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && !common_vendor.unref(selectedItems).includes(item1) ? {
                    m: common_vendor.o(($event) => toggleSelectItem(item1), index2),
                    n: "435777c0-13-" + i0 + "-" + i1 + "-" + i2 + ",435777c0-3",
                    o: common_vendor.p({
                      color: "#D2CFCA",
                      type: "circle",
                      size: "32"
                    })
                  } : {}, {
                    p: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && common_vendor.unref(selectedItems).includes(item1)
                  }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" && common_vendor.unref(selectedItems).includes(item1) ? {
                    q: common_vendor.o(($event) => toggleSelectItem(item1), index2),
                    r: "435777c0-14-" + i0 + "-" + i1 + "-" + i2 + ",435777c0-3",
                    s: common_vendor.p({
                      color: "#E6432E",
                      type: "checkbox-filled",
                      size: "32"
                    })
                  } : {}, {
                    t: index2
                  });
                }),
                d: item3.ddlx === "2",
                e: common_vendor.t(common_vendor.unref(expressText).find((express) => express.id === item3.expressid).text),
                f: index3
              };
            })
          }, getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx).length > 0 ? common_vendor.e({
            b: item.khxx
          }, item.khxx ? {
            c: common_vendor.t(item.khxx.name + " " + item.khxx.phone)
          } : {}, {
            d: common_vendor.f(getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx), (btn, btnIndex, i1) => {
              return {
                a: common_vendor.t(btn),
                b: btnIndex,
                c: common_vendor.o(($event) => handleBtnClick(btn, item), btnIndex),
                d: common_vendor.n(btnClass(btn))
              };
            })
          }) : {}, {
            e: index
          });
        }),
        v: common_vendor.t(tabsData.value[common_vendor.unref(activeTab1Index)].name),
        w: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        x: common_vendor.t(common_vendor.unref(orderType) === "yj" ? "议价:" : "批发价:"),
        y: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#EB4636"
        }),
        z: getBtns("custom", tabsData.value[common_vendor.unref(activeTab1Index)].lx).length > 0
      } : {}, {
        A: common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "yj"
      }, common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "yj" ? {
        B: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.ordernumber)
          }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "议价待确认" ? common_vendor.e({
            b: getRemainingTime(item.pay_time, item.bargainingtimename) === "已结束"
          }, getRemainingTime(item.pay_time, item.bargainingtimename) === "已结束" ? {} : item.lx === "1" ? {
            d: "435777c0-15-" + i0 + ",435777c0-3",
            e: common_vendor.p({
              time: getRemainingTime(item.pay_time, item.bargainingtimename),
              format: "HH:mm:ss"
            })
          } : {}, {
            c: item.lx === "1"
          }) : {}, {
            f: common_vendor.o(($event) => goDetail(item, "yj"), index),
            g: "435777c0-16-" + i0 + ",435777c0-3",
            h: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              radius: "18rpx",
              fit: "fill",
              src: item.goodsinfos.cover
            }),
            i: item.goodsinfos.finenessname
          }, item.goodsinfos.finenessname ? {
            j: common_vendor.t(item.goodsinfos.finenessname)
          } : {}, {
            k: common_vendor.t(item.goodsinfos.name),
            l: common_vendor.t(item.goodsinfos.ch),
            m: common_vendor.t(item.price)
          }, common_vendor.unref(orderType) === "yj" ? {
            n: common_vendor.t(item.goodsinfos.price)
          } : {}, {
            o: common_vendor.o(($event) => goDetail(item, "yj"), index),
            p: item.zt === "2"
          }, item.zt === "2" ? {
            q: common_vendor.f(getBtns("yj", tabsData.value[common_vendor.unref(activeTab1Index)].lx), (btn, btnIndex, i1) => {
              return {
                a: common_vendor.t(btn),
                b: btnIndex,
                c: common_vendor.o(($event) => handleBtnClick(btn, item), btnIndex),
                d: common_vendor.n(btnClass(btn))
              };
            })
          } : {}, {
            r: index
          });
        }),
        C: common_vendor.t(tabsData.value[common_vendor.unref(activeTab1Index)].name),
        D: tabsData.value[common_vendor.unref(activeTab1Index)].name === "议价待确认",
        E: common_vendor.t(common_vendor.unref(orderType) === "yj" ? "议价:" : "批发价:"),
        F: common_vendor.unref(orderType) === "yj"
      } : {}, {
        G: common_vendor.unref(orderType) === "fpak"
      }, common_vendor.unref(orderType) === "fpak" ? {
        H: common_vendor.sr(fpakCardRef, "435777c0-17,435777c0-3", {
          "k": "fpakCardRef"
        }),
        I: common_vendor.o(goDetail),
        J: common_vendor.o(updateSelectedItems),
        K: common_vendor.p({
          orderList: common_vendor.unref(dataList)
        })
      } : {}, {
        L: common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "sh"
      }, common_vendor.unref(orderList).length > 0 && common_vendor.unref(orderType) === "sh" ? {
        M: common_vendor.o(goDetail),
        N: common_vendor.p({
          orderList: common_vendor.unref(dataList)
        })
      } : {}, {
        O: common_vendor.sr(paging, "435777c0-3", {
          "k": "paging"
        }),
        P: common_vendor.o(queryList),
        Q: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        R: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          ["default-page-size"]: 20,
          modelValue: common_vendor.unref(dataList)
        }),
        S: computedHeight.value,
        T: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款" ? {} : {}, {
        U: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价" ? common_vendor.e({
        V: common_vendor.t(selectedItemCount.value),
        W: common_vendor.t(totalSelectedPrice.value),
        X: !common_vendor.unref(isAllSelected)
      }, !common_vendor.unref(isAllSelected) ? {} : {}, {
        Y: common_vendor.o(toggleSelectAll),
        Z: tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "待付款" ? {
        aa: common_vendor.o(patchGoFpak)
      } : {}, {
        ab: tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "等待确认议价" ? {} : {}) : {}, {
        ac: common_vendor.unref(orderType) === "fpak" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款"
      }, common_vendor.unref(orderType) === "fpak" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款" ? common_vendor.e({
        ad: tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款" ? common_vendor.e({
        ae: common_vendor.t(common_vendor.unref(totalNum)),
        af: common_vendor.t(common_vendor.unref(totalPrice)),
        ag: common_vendor.unref(isFpakAllSelected)
      }, common_vendor.unref(isFpakAllSelected) ? {} : {}, {
        ah: common_vendor.o(allSelected)
      }) : {}, {
        ai: tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款"
      }, tabsData.value[common_vendor.unref(activeTab1Index)].name === "未收款" ? {
        aj: common_vendor.o(returnProductChange),
        ak: common_vendor.o(($event) => common_vendor.isRef(returnProductSelectValue) ? returnProductSelectValue.value = $event : null),
        al: common_vendor.p({
          localdata: common_vendor.unref(returnProductRange),
          placement: "top",
          clear: false,
          modelValue: common_vendor.unref(returnProductSelectValue)
        }),
        am: common_vendor.o(($event) => openOfflinePayment())
      } : {}) : {}, {
        an: common_vendor.unref(orderType) === "fpak" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "已收款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "已退货"
      }, common_vendor.unref(orderType) === "fpak" && tabsData.value[common_vendor.unref(activeTab1Index)].name === "已收款" || tabsData.value[common_vendor.unref(activeTab1Index)].name === "已退货" ? {
        ao: common_vendor.t(common_vendor.unref(totalNum)),
        ap: common_vendor.t(common_vendor.unref(totalPrice))
      } : {}, {
        aq: common_vendor.unref(showOfflinePaymentPannel)
      }, common_vendor.unref(showOfflinePaymentPannel) ? {
        ar: common_vendor.o(handleClose),
        as: common_vendor.o(reloadList),
        at: common_vendor.p({
          ddxx: common_vendor.unref(ddxx),
          totalPrice: common_vendor.unref(totalPrice)
        })
      } : {}, {
        av: common_vendor.sr(offlinePaymentPopup, "435777c0-20", {
          "k": "offlinePaymentPopup"
        }),
        aw: common_vendor.o(handleClose),
        ax: common_vendor.o(pannelChange),
        ay: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        az: common_vendor.unref(showCustomOrderCardSaixuan)
      }, common_vendor.unref(showCustomOrderCardSaixuan) ? {
        aA: common_vendor.o(reloadFpbk),
        aB: common_vendor.o(handleClose),
        aC: common_vendor.p({
          yglist: common_vendor.unref(yglist),
          khlist: common_vendor.unref(khlist)
        })
      } : {}, {
        aD: common_vendor.sr(customOrderCardSaixuanPopup, "435777c0-22", {
          "k": "customOrderCardSaixuanPopup"
        }),
        aE: common_vendor.o(handleClose),
        aF: common_vendor.o(pannelChange),
        aG: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        aH: common_vendor.unref(showUserServicePannel)
      }, common_vendor.unref(showUserServicePannel) ? {
        aI: common_vendor.o(subExpress),
        aJ: common_vendor.o(handleClose),
        aK: common_vendor.p({
          order: common_vendor.unref(orderItem)
        })
      } : {}, {
        aL: common_vendor.sr(userServicePannelPopup, "435777c0-24", {
          "k": "userServicePannelPopup"
        }),
        aM: common_vendor.o(handleClose),
        aN: common_vendor.o(pannelChange),
        aO: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-435777c0"]]);
wx.createPage(MiniProgramPage);
