"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesMovingInventory_api_api = require("../api/api.js");
const api_warehouseManagement_warehouseManagement = require("../../api/warehouseManagement/warehouseManagement.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_empty + _component_van_loading + _component_van_image + _component_van_tag + _component_van_swipe_cell + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + common_vendor.unref(selectedInventory) + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const selectedInventory = () => "./components/selectedInventory.js";
const _sfc_main = {
  __name: "movingInventory",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const myInputRef = common_vendor.ref(null);
    const cardData = common_vendor.ref([]);
    const selectedCustomer = common_vendor.ref();
    common_vendor.computed(() => {
      return cardData.value.reduce((total, item) => {
        return total + parseFloat(item.price) || 0;
      }, 0);
    });
    common_vendor.ref("");
    const showSelectCustomerPannel = common_vendor.ref(false);
    const selectCustomerPannelPopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      selectCustomerPannelPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showSelectCustomerPannel.value = e.show;
      }
    };
    common_vendor.ref();
    const positionArray = common_vendor.ref([]);
    common_vendor.ref("");
    const onSelectChange1 = (e) => {
      console.log("选择 e:", e);
      console.log("选择", cklist.value);
      ckname.value = cklist.value[e.detail.value].name;
      ckid.value = cklist.value[e.detail.value].id;
    };
    common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const handleInput = (inputText) => {
      console.log("输入框内容:", inputText);
      if (inputText.length > 0) {
        apiFinanceChCheckData(inputText);
      }
    };
    const selectChange = (e) => {
      console.log("模糊搜索 e", e);
      if (e) {
        const exists = cardData.value.some((item) => item.id === e.id);
        if (!exists) {
          cardData.value.push(e);
        }
      }
      myInputRef.value.clearData();
      orgArray.value = [];
    };
    const yglist = common_vendor.ref([]);
    const apiFinanceChCheckData = async (ch) => {
      const data = {
        ch,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesMovingInventory_api_api.apiFinanceChCheck(data);
      if (res.code === 200) {
        orgArray.value = res.lists;
        yglist.value = res.yglist;
        positionArray.value = res.yglist;
      } else {
        orgArray.value = [];
      }
      console.log("apiFinanceChCheckData res:", res);
    };
    const processSettlementItem = async (item) => {
      const { ch } = item.goodsinfos;
      const res = await pagesMovingInventory_api_api.apiFinanceChCheck({ ch, opid: common_vendor.index.getStorageSync("sessionInfo").opid });
      if (res.code === 200 && res.yglist.length > 0) {
        positionArray.value.push(...res.yglist.filter((item1) => !positionArray.value.some((item2) => item1.id === item2.id)));
      }
      cardData.value.push(item.goodsinfos);
    };
    const ckid = common_vendor.ref("");
    const ckname = common_vendor.ref("请选择");
    const selectedOptions = (data) => {
      console.log("selectedOptions", data);
      ckid.value = data[0];
      cklist.value.forEach((item) => {
        if (item.id === ckid.value) {
          ckname.value = item.name;
        }
      });
    };
    const cklist = common_vendor.ref([]);
    const apiWarehouseListAc = async () => {
      const res = await api_warehouseManagement_warehouseManagement.apiWarehouseList();
      if (res.code === 200) {
        cklist.value = res.lists;
      }
    };
    const apiWarehouseMoveAc = async (zjids) => {
      const data = {
        zjid: zjids,
        ckid: ckid.value
      };
      const res = await api_warehouseManagement_warehouseManagement.apiWarehouseMove(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "移库成功",
          icon: "success",
          duration: 2e3
        });
        cardData.value = [];
      }
      console.log("res:", res);
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
    const comfirm = async () => {
      console.log("cardData", cardData.value);
      const zjids = cardData.value.map((item) => item.zjid).join(",");
      console.log("zjids", zjids);
      await apiWarehouseMoveAc(zjids);
    };
    const deleteCard = async (index) => {
      cardData.value.splice(index, 1);
    };
    common_vendor.onLoad(async (options) => {
      if (options.settlementList && options.lx) {
        const settlementList = JSON.parse(decodeURIComponent(options.settlementList));
        console.log("options.settlementList:", settlementList);
        console.log("options.lx:", options.lx);
        settlementList.forEach(processSettlementItem);
      }
      if (options.data) {
        cardData.value.push(JSON.parse(decodeURIComponent(options.data)));
        console.log("cardData", cardData.value);
        apiFinanceChCheckData(JSON.parse(decodeURIComponent(options.data)).ch);
      }
      await apiWarehouseListAc();
    });
    common_vendor.index.$on("selectedCustomer", (data) => {
      console.log("selectedCustomer", data);
      selectedCustomer.value = data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#f3f2f6"
        }),
        b: common_vendor.sr(myInputRef, "ad48c944-1", {
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
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField)
        }),
        f: common_vendor.o(scan),
        g: common_vendor.unref(cardData).length == 0
      }, common_vendor.unref(cardData).length == 0 ? {
        h: common_vendor.p({
          description: "请搜索相关商品进行批发"
        })
      } : {}, {
        i: common_vendor.unref(cardData).length > 0
      }, common_vendor.unref(cardData).length > 0 ? {
        j: common_vendor.f(common_vendor.unref(cardData), (item, index, i0) => {
          return common_vendor.e({
            a: "ad48c944-5-" + i0 + "," + ("ad48c944-4-" + i0),
            b: "ad48c944-4-" + i0 + "," + ("ad48c944-3-" + i0),
            c: common_vendor.p({
              width: "95",
              height: "95",
              fit: "fill",
              radius: "18rpx",
              src: item.cover
            }),
            d: item.finenessname
          }, item.finenessname ? {
            e: common_vendor.t(item.finenessname),
            f: "ad48c944-6-" + i0 + "," + ("ad48c944-3-" + i0),
            g: common_vendor.p({
              size: "medium",
              color: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
            })
          } : {}, {
            h: common_vendor.t(item.name),
            i: common_vendor.t(item.ch),
            j: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(item.ch), index),
            k: common_vendor.t(item.cgyname),
            l: common_vendor.t(item.ckname),
            m: common_vendor.t(item.price),
            n: common_vendor.o(($event) => deleteCard(index), index),
            o: "ad48c944-3-" + i0,
            p: index
          });
        }),
        k: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        l: common_vendor.p({
          rightWidth: "41"
        })
      } : {}, {
        m: common_vendor.unref(cardData).length > 0
      }, common_vendor.unref(cardData).length > 0 ? {
        n: common_vendor.t(common_vendor.unref(cardData).length),
        o: common_vendor.t(common_vendor.unref(ckname)),
        p: common_vendor.unref(cklist),
        q: common_vendor.o((event) => onSelectChange1(event, _ctx.item)),
        r: common_vendor.unref(ckname),
        s: common_vendor.o(comfirm)
      } : {}, {
        t: common_vendor.unref(showSelectCustomerPannel)
      }, common_vendor.unref(showSelectCustomerPannel) ? {
        v: common_vendor.o(handleClose),
        w: common_vendor.o(selectedOptions),
        x: common_vendor.p({
          cklist: common_vendor.unref(cklist)
        })
      } : {}, {
        y: common_vendor.sr(selectCustomerPannelPopup, "ad48c944-7", {
          "k": "selectCustomerPannelPopup"
        }),
        z: common_vendor.o(handleClose),
        A: common_vendor.o(pannelChange),
        B: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad48c944"]]);
wx.createPage(MiniProgramPage);
