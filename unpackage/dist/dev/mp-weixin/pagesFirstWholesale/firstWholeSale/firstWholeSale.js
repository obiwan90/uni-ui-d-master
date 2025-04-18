"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesFirstWholesale_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
const utils_debounce = require("../../utils/debounce.js");
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
  (_easycom_custom_header + qiaoSelect + common_vendor.unref(selectCustomerPannel) + _easycom_uni_popup + common_vendor.unref(offlinePaymentPannel))();
}
const offlinePaymentPannel = () => "./components/offlinePaymentPannel.js";
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const selectCustomerPannel = () => "./components/selectCustomerPannel.js";
const _sfc_main = {
  __name: "firstWholeSale",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const offlinePaymentPopup = common_vendor.ref(null);
    const showOfflinePaymentPannel = common_vendor.ref(false);
    const ddxx = common_vendor.ref();
    const ddid = common_vendor.ref("");
    const reloadList = async (data) => {
      const paran = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        goodsid: getIdsString(),
        khid: selectedCustomer.value.id,
        //客户id
        remarks: areaValue.value,
        ygid: pickerMemberValue.value.id,
        //员工id
        lx: "2",
        //1先货后款制单未付款2先货后款制单并收款
        // zffs: '6', //支付方式1微信2支付宝3收款码4银行卡5现金6其它
        // imgs: ''
        zffs: data.zffs,
        imgs: data.imgs,
        price: data.price,
        skremarks: data.skremarks,
        ddid: data.ddid
      };
      await debouncedApiFinancePlaceOrder("/Home/Orderxhhk/add?lx=2", paran);
    };
    const openOfflinePayment = () => {
      showOfflinePaymentPannel.value = true;
      getDdxx();
      offlinePaymentPopup.value.open();
    };
    function getDdxx() {
      console.log("cardData", cardData.value);
    }
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
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
    const cardData = common_vendor.ref([]);
    const selectedCustomer = common_vendor.ref();
    const totalPrice = common_vendor.computed(() => {
      return cardData.value.reduce((total, item) => {
        return total + parseFloat(item.price) || 0;
      }, 0);
    });
    const areaValue = common_vendor.ref("");
    const showSelectCustomerPannel = common_vendor.ref(false);
    const selectCustomerPannelPopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      offlinePaymentPopup.value.close();
      selectCustomerPannelPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showOfflinePaymentPannel.value = e.show;
        showSelectCustomerPannel.value = e.show;
      }
    };
    const openSelectCustomerPannel = () => {
      showSelectCustomerPannel.value = true;
      selectCustomerPannelPopup.value.open();
    };
    const pickerMemberValue = common_vendor.ref();
    const positionArray = common_vendor.ref([]);
    const ygUserName = common_vendor.ref("");
    const onSelectChange = (e) => {
      console.log("选择 e:", e);
      pickerMemberValue.value = positionArray.value[e.detail.value];
      ygUserName.value = positionArray.value[e.detail.value].username;
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
        cardData.value.push(e);
        orgArray.value = [];
        ddid.value = "";
      }
    };
    const yglist = common_vendor.ref([]);
    const apiFinanceChCheckData = async (ch) => {
      const data = {
        ch,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesFirstWholesale_api_api.apiFinanceChCheck(data);
      if (res.code === 200) {
        orgArray.value = res.lists;
        yglist.value = res.yglist;
        if (yglist.value) {
          const adminId = common_vendor.index.getStorageSync("adminId");
          pickerMemberValue.value = yglist.value.find((yg) => yg.id === adminId);
          ygUserName.value = yglist.value.find((yg) => yg.id === adminId).username;
        }
        positionArray.value = res.yglist;
      } else {
        orgArray.value = [];
      }
      console.log("apiFinanceChCheckData res:", res);
    };
    const apiFinancePlaceOrderData = async (url, lx) => {
      if (!selectedCustomer.value) {
        common_vendor.index.showToast({
          title: "请选择客户",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (!pickerMemberValue.value) {
        common_vendor.index.showToast({
          title: "请选择销售员工",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.showModal({
        title: lx === "1" ? "先货后款确认下单" : "线下收款",
        content: "您确定要下单吗？",
        success: async (res) => {
          if (res.confirm) {
            if (lx === "1") {
              const data = {
                opid: common_vendor.index.getStorageSync("sessionInfo").opid,
                goodsid: getIdsString(),
                khid: selectedCustomer.value.id,
                //客户id
                remarks: areaValue.value,
                ygid: pickerMemberValue.value.id,
                //员工id
                lx,
                //1先货后款制单未付款2先货后款制单并收款
                zffs: "6",
                //支付方式1微信2支付宝3收款码4银行卡5现金6其它
                imgs: "",
                ddid: ddid.value
              };
              await debouncedApiFinancePlaceOrder(url, data);
            } else {
              openOfflinePayment();
            }
          } else if (res.cancel) {
            common_vendor.index.showToast({
              title: "已取消下单",
              icon: "none",
              duration: 2e3
            });
          }
        }
      });
    };
    const debouncedApiFinancePlaceOrder = utils_debounce.debounce(async (url, paran) => {
      const res = await pagesFirstWholesale_api_api.apiFinancePlaceOrder(url, paran);
      console.log("res", res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "下单成功",
          icon: "success",
          duration: 2e3
        });
        cardData.value = [];
      } else {
        common_vendor.index.showToast({
          title: res.msg ? res.msg : "操作失败",
          icon: "error",
          duration: 2e3
        });
      }
      offlinePaymentPopup.value.close();
    }, 400, true);
    const getIdsString = () => {
      return cardData.value.map((item) => item.id).join(",");
    };
    const processSettlementItem = async (item) => {
      const { ch } = item.goodsinfos;
      const res = await pagesFirstWholesale_api_api.apiFinanceChCheck({ ch, opid: common_vendor.index.getStorageSync("sessionInfo").opid });
      if (res.code === 200 && res.yglist.length > 0) {
        positionArray.value.push(...res.yglist.filter((item1) => !positionArray.value.some((item2) => item1.id === item2.id)));
        yglist.value = res.yglist;
        if (yglist.value) {
          const adminId = common_vendor.index.getStorageSync("adminId");
          pickerMemberValue.value = yglist.value.find((yg) => yg.id === adminId);
          ygUserName.value = yglist.value.find((yg) => yg.id === adminId).username;
        }
      }
      cardData.value.push(item.goodsinfos);
    };
    const deleteCard = (index) => {
      cardData.value.splice(index, 1);
    };
    common_vendor.onLoad(async (options) => {
      const data = {
        id: "",
        name: ""
      };
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
      if (options.chs) {
        const arraysCh = options.chs.split(",");
        for (const ch of arraysCh) {
          if (ch) {
            await apiFinanceChCheckData(ch);
            console.log("orgArray.value", orgArray.value);
            if (orgArray.value.length > 0) {
              cardData.value.push(orgArray.value[0]);
              orgArray.value = [];
            }
          }
        }
      }
      if (options.khid && options.khNames && options.ddid) {
        const khids = options.khid.split(",");
        for (const khid of khids) {
          if (khid) {
            data.id = khid;
          }
        }
        const kuname = options.khNames.split(",")[0];
        data.name = kuname;
        selectedCustomer.value = data;
        ddid.value = options.ddid;
      }
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
        b: common_vendor.sr("myInputRef", "7f64b960-1"),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectChange),
        e: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField),
          showBorder: false,
          disabled: false
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
            a: "7f64b960-5-" + i0 + "," + ("7f64b960-4-" + i0),
            b: "7f64b960-4-" + i0 + "," + ("7f64b960-3-" + i0),
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
            f: "7f64b960-6-" + i0 + "," + ("7f64b960-3-" + i0),
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
            o: "7f64b960-3-" + i0,
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
        n: common_vendor.t(common_vendor.unref(selectedCustomer) ? common_vendor.unref(selectedCustomer).name : "请搜索或选择客户"),
        o: common_vendor.o(openSelectCustomerPannel),
        p: common_vendor.unref(areaValue),
        q: common_vendor.o(($event) => common_vendor.isRef(areaValue) ? areaValue.value = $event.detail.value : null)
      } : {}, {
        r: common_vendor.unref(cardData).length > 0
      }, common_vendor.unref(cardData).length > 0 ? {
        s: common_vendor.unref(ygUserName),
        t: common_vendor.o(($event) => common_vendor.isRef(ygUserName) ? ygUserName.value = $event.detail.value : null),
        v: common_vendor.unref(positionArray),
        w: common_vendor.o(onSelectChange),
        x: common_vendor.unref(pickerMemberValue),
        y: common_vendor.unref(positionArray),
        z: common_vendor.o(onSelectChange),
        A: common_vendor.unref(pickerMemberValue)
      } : {}, {
        B: common_vendor.unref(cardData).length > 0
      }, common_vendor.unref(cardData).length > 0 ? {
        C: common_vendor.t(common_vendor.unref(cardData).length),
        D: common_vendor.t(common_vendor.unref(totalPrice)),
        E: common_vendor.o(($event) => apiFinancePlaceOrderData("/Home/Orderxhhk/add?lx=2", "2")),
        F: common_vendor.o(($event) => apiFinancePlaceOrderData("/Home/Orderxhhk/add?lx=1", "1"))
      } : {}, {
        G: common_vendor.unref(showSelectCustomerPannel)
      }, common_vendor.unref(showSelectCustomerPannel) ? {
        H: common_vendor.o(handleClose)
      } : {}, {
        I: common_vendor.sr(selectCustomerPannelPopup, "7f64b960-7", {
          "k": "selectCustomerPannelPopup"
        }),
        J: common_vendor.o(handleClose),
        K: common_vendor.o(pannelChange),
        L: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        M: common_vendor.unref(showOfflinePaymentPannel)
      }, common_vendor.unref(showOfflinePaymentPannel) ? {
        N: common_vendor.o(handleClose),
        O: common_vendor.o(reloadList),
        P: common_vendor.p({
          ddid: common_vendor.unref(ddid),
          ddxx: common_vendor.unref(ddxx),
          totalPrice: common_vendor.unref(totalPrice)
        })
      } : {}, {
        Q: common_vendor.sr(offlinePaymentPopup, "7f64b960-9", {
          "k": "offlinePaymentPopup"
        }),
        R: common_vendor.o(handleClose),
        S: common_vendor.o(pannelChange),
        T: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f64b960"]]);
wx.createPage(MiniProgramPage);
