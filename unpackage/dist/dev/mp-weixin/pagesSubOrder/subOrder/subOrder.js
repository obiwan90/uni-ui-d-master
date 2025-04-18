"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesSubOrder_api_api = require("../api/api.js");
const api_shopCard_shopCard = require("../../api/shopCard/shopCard.js");
const api_subOrder_subOrder = require("../../api/subOrder/subOrder.js");
const api_address_address = require("../../api/address/address.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_image + _component_van_tag + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + common_vendor.unref(payPannel) + _easycom_uni_popup + common_vendor.unref(rulePannel))();
}
const payPannel = () => "./components/payPannel.js";
const rulePannel = () => "./components/rulePannel.js";
const _sfc_main = {
  __name: "subOrder",
  setup(__props) {
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const fpbkShow = common_vendor.ref(false);
    const bargainingTimeId = common_vendor.ref();
    const bargainingPrice = common_vendor.ref();
    const settlementList = common_vendor.ref([]);
    const cusRemark = common_vendor.ref();
    const parameter = common_vendor.ref();
    const totalNum = common_vendor.ref();
    const totalPrice = common_vendor.ref();
    const showPannel = common_vendor.ref(false);
    const lxType = common_vendor.ref();
    const yjGoodsId = common_vendor.ref();
    const express = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png", value: "顺丰", expressId: "2" },
      { image: "https://www.xzxskj.com/xcximg/icon_jingdong@3x.png", value: "京东", expressId: "1" },
      { image: "https://www.xzxskj.com/xcximg/icon_songhuo@3x.png", value: "送货上门", expressId: "3" },
      { image: "https://www.xzxskj.com/xcximg/icon_ziti@3x.png", value: "自提", expressId: "4" }
    ]);
    const selectedTap = common_vendor.ref(0);
    const selectTap = async (index) => {
      selectedTap.value = index;
      if (express.value[index].value === "顺丰") {
        await apiGetSfFreightAction();
      }
      if (express.value[index].value === "京东") {
        await apiGetJdFreightData();
      }
      if (express.value[index].value === "送货上门") {
        yflist.value = [];
      }
      if (express.value[index].value === "自提") {
        yflist.value = [];
      }
    };
    const payPopup = common_vendor.ref(null);
    const rulePopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      payPopup.value.close();
      rulePopup.value.close();
    };
    const change = (e) => {
      showPannel.value = e.show;
    };
    const openPay = () => {
      permissionStore.loadMenuAuthority();
      const adminId = common_vendor.index.getStorageSync("adminId");
      if (permissionStore.hasMenuAuthority("fastWholesale") && adminId !== "") {
        fpbkShow.value = true;
      }
      console.log("fpbkShow", fpbkShow.value);
      console.log("settlementList", settlementList.value);
      payPopup.value.open();
    };
    const openRule = () => {
      rulePopup.value.open();
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const out_trade_no = common_vendor.ref("");
    const bargainingSubmit = async () => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        goodsid: yjGoodsId.value,
        price: bargainingPrice.value,
        payment: "1",
        bargainingtimeid: bargainingTimeId.value,
        addressid: addressList.value[0].id,
        expressid: express.value[selectedTap.value].expressId,
        remarks: cusRemark.value ? cusRemark.value : ""
      };
      const res = await pagesSubOrder_api_api.apiBargainingSubmit(data);
      if (res.code === 200) {
        const data2 = {
          // lx:'2',
          id: res.id,
          opid: common_vendor.index.getStorageSync("sessionInfo").opid
        };
        const res1 = await pagesSubOrder_api_api.apiBargainingWxPay(data2);
        console.log("wx支付参数:", res1);
        const orderInfo = {
          "nonceStr": res1.nonceStr,
          "package": res1.package,
          "paySign": res1.paySign,
          "timeStamp": res1.timeStamp,
          "signType": res1.signType
        };
        out_trade_no.value = res1.out_trade_no;
        autoPay(orderInfo);
      }
    };
    const submitorder = async () => {
      const data = {
        shoppingcartid: shoppingcartids.value,
        addressid: addressList.value[0].id,
        expressid: express.value[selectedTap.value].expressId,
        price: totalPrice.value,
        num: totalNum.value,
        payment: "1",
        remarks: cusRemark.value ? cusRemark.value : "",
        parameter: parameter.value,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        zyf: getTotalYf(),
        gysyf: JSON.stringify(yflist.value.map((item) => ({
          companyId: item.companyId,
          yf: item.price
        })))
      };
      const res = await api_subOrder_subOrder.apiSubmitorder(data);
      if (res.code === 200) {
        const data2 = {
          // lx:'1',
          id: res.id,
          opid: common_vendor.index.getStorageSync("sessionInfo").opid
        };
        const res1 = await pagesSubOrder_api_api.apiGetWxPay(data2);
        console.log("wx支付参数:", res1);
        const orderInfo = {
          "nonceStr": res1.nonceStr,
          "package": res1.package,
          "paySign": res1.paySign,
          "timeStamp": res1.timeStamp,
          "signType": res1.signType
        };
        out_trade_no.value = res1.out_trade_no;
        autoPay(orderInfo);
      }
    };
    const autoPay = (orderInfo) => {
      common_vendor.index.requestPayment({
        provider: "wxpay",
        ...orderInfo,
        success(res) {
          console.log("success:" + JSON.stringify(res));
          console.log("支付成功");
          common_vendor.index.showToast({
            title: "支付成功！",
            icon: "none"
          });
          common_vendor.index.redirectTo({
            url: "/pagesPaySuccess/paySuccess/paySuccess?orderNo=" + out_trade_no.value
          });
        },
        fail(err) {
          console.log("pay fail:", JSON.stringify(err));
          console.log("支付失败");
          if (lxType.value === "1")
            ;
          else {
            common_vendor.index.navigateTo({
              url: "/pagesOrder/order/order?order=3"
            });
          }
        }
      });
    };
    const transformSettlementList = () => {
      const groupedData = {};
      settlementList.value.forEach((item) => {
        const companyId = item.goodsinfos.shopid;
        const goodsid = item.goodsinfos.id;
        if (!groupedData[companyId]) {
          groupedData[companyId] = [];
        }
        groupedData[companyId].push({ goodsid });
      });
      const result = Object.entries(groupedData).map(([companyId, goodsinfos]) => ({
        companyId,
        goodsinfos
      }));
      return result;
    };
    const yflist = common_vendor.ref([]);
    const apiGetJdFreightData = async () => {
      yflist.value = [];
      if (addressList.value.length > 0) {
        const data = {
          opid: common_vendor.index.getStorageSync("sessionInfo").opid,
          addid: addressList.value[0].id,
          goodsid: JSON.stringify(transformSettlementList())
        };
        const res = await pagesSubOrder_api_api.apiGetJdFreight(data);
        if (res.code === "200") {
          yflist.value = res.yflist;
        }
        console.log("京东运费:", res);
      }
    };
    const apiGetSfFreightAction = async () => {
      yflist.value = [];
      if (addressList.value.length > 0) {
        const data = {
          addid: addressList.value[0].id,
          goodsid: JSON.stringify(transformSettlementList())
        };
        const res = await pagesSubOrder_api_api.apiGetSfFreight(data);
        if (res.code === "200") {
          yflist.value = res.yflist;
        }
        console.log("顺丰运费:", res);
      }
    };
    const getYf = (id) => {
      var _a;
      return yflist.value && yflist.value.length > 0 ? ((_a = yflist.value.find((item) => item.companyId === id)) == null ? void 0 : _a.price) || "0" : "0";
    };
    const getTotalYf = () => {
      let total = 0;
      console.log("yflist.value", yflist.value);
      if (yflist.value) {
        yflist.value.forEach((item) => {
          total += parseFloat(item.price);
        });
      }
      return total;
    };
    const addressList = common_vendor.ref([]);
    const selectedAddress = common_vendor.ref(null);
    const getAddressList = async () => {
      if (selectedAddress.value) {
        addressList.value = [selectedAddress.value];
      } else {
        const data = {
          opid: common_vendor.index.getStorageSync("sessionInfo").opid
        };
        const res = await api_address_address.apigetAddress(data);
        if (res.lists && res.lists.length > 0) {
          addressList.value = res.lists.filter((item) => item.zt === "1");
          console.log("addressList1:", addressList.value);
        } else {
          addressList.value = [];
        }
        console.log("addressList2:", addressList.value);
      }
    };
    common_vendor.computed(() => {
    });
    const selectedItemsTotalPrice = () => {
      const yf = getTotalYf();
      return parseFloat(totalPrice.value) + yf;
    };
    const selectedItemsYjTotalPrice = () => {
      const yf = getTotalYf();
      return parseFloat(bargainingPrice.value) + yf;
    };
    const shoppingcartids = common_vendor.computed(() => {
      let nums = "";
      if (settlementList.value) {
        nums = settlementList.value.map((item) => item.id).join(",");
      }
      return nums;
    });
    const settleShopCard = async (goodsid) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        goodsid,
        lx: lxType.value === "1" ? "1" : ""
      };
      const res = await api_shopCard_shopCard.apiSettleShopCard(data);
      console.log("结算信息:", res);
      if (res.code === 200) {
        parameter.value = res.parameter;
        settlementList.value = res.goodslist;
        totalNum.value = res.num;
        totalPrice.value = res.pirce;
        console.log("settlementList:", settlementList.value);
        const adminId = common_vendor.index.getStorageSync("adminId");
        const selectedMine = common_vendor.index.getStorageSync("selectedMine");
        const identityData = common_vendor.index.getStorageSync("identityData");
        if (adminId && selectedMine && identityData) {
          settlementList.value = settlementList.value.map((good) => {
            if (!good) {
              console.warn("good is undefined");
              return {};
            }
            const selectedIdentity = identityData[selectedMine];
            return {
              ...good,
              mineCompany: selectedIdentity ? good.gsid === selectedIdentity.gsid : false
            };
          });
        }
        console.log("settlementList", settlementList.value);
      }
    };
    const selectedPay = common_vendor.ref();
    const handleConfirm = (selectedPayment) => {
      handleClose();
      selectedPay.value = selectedPayment;
      console.log("选择的支付类型：", selectedPayment);
    };
    function groupByShopId(data) {
      console.log("data computed", data);
      const groupedData = {};
      data.forEach((item) => {
        console.log("item", item);
        const shopId = item.goodsinfos.shopid;
        const byzt = item.byzt;
        if (shopId === void 0) {
          console.warn("shopid is undefined for item:", item);
          return;
        }
        if (!groupedData[shopId]) {
          groupedData[shopId] = {
            shopid: shopId,
            byzt,
            goodinfos: []
          };
        }
        if (item.goodsinfos) {
          groupedData[shopId].goodinfos.push(item.goodsinfos);
        } else {
          console.warn("goodinfos is undefined for item:", item);
        }
      });
      console.log("groupedData", groupedData);
      return Object.values(groupedData);
    }
    common_vendor.onShow(async () => {
      console.log("onShow");
      let pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      console.log("onShow:", prevPage.data.selectedAddress);
      if (prevPage.data.selectedAddress) {
        selectedAddress.value = prevPage.data.selectedAddress;
      }
      await getAddressList();
      await apiGetJdFreightData();
    });
    const formId = common_vendor.ref();
    common_vendor.onLoad(async (options) => {
      let goodsIds = common_vendor.ref();
      const data = JSON.parse(decodeURIComponent(options.data));
      console.log("sub接收的参数data:", data);
      formId.value = data.id;
      goodsIds.value = data.id;
      yjGoodsId.value = data.id;
      console.log("sub接收的参数:", goodsIds.value);
      bargainingTimeId.value = data.bargainingtimeid;
      bargainingPrice.value = data.price;
      lxType.value = data.lx;
      console.log("lxType.value:", lxType.value);
      await settleShopCard(goodsIds.value);
      await getAddressList();
      await apiGetSfFreightAction();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(addressList).length > 0
      }, common_vendor.unref(addressList).length > 0 ? common_vendor.e({
        b: common_vendor.unref(addressList)[0].zt === "1"
      }, common_vendor.unref(addressList)[0].zt === "1" ? {} : {}, {
        c: common_vendor.t(common_vendor.unref(addressList)[0].province),
        d: common_vendor.t(common_vendor.unref(addressList)[0].city),
        e: common_vendor.t(common_vendor.unref(addressList)[0].area),
        f: common_vendor.t(common_vendor.unref(addressList)[0].address),
        g: common_vendor.t(common_vendor.unref(addressList)[0].name),
        h: common_vendor.t(common_vendor.unref(addressList)[0].phone),
        i: common_vendor.o(($event) => goPage("/pagesAddress/address/address?from=subOrder")),
        j: common_vendor.f(common_vendor.unref(express), (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.value),
            c: common_vendor.unref(selectedTap) === index
          }, common_vendor.unref(selectedTap) === index ? {} : {}, {
            d: index,
            e: common_vendor.unref(selectedTap) === index ? 1 : "",
            f: common_vendor.o(($event) => selectTap(index), index)
          });
        })
      }) : {
        k: common_vendor.o(($event) => goPage("/pagesAddress/address/address?from=subOrder")),
        l: common_vendor.f(common_vendor.unref(express), (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.value),
            c: common_vendor.unref(selectedTap) === index
          }, common_vendor.unref(selectedTap) === index ? {} : {}, {
            d: index,
            e: common_vendor.unref(selectedTap) === index ? 1 : "",
            f: common_vendor.o(($event) => selectTap(index), index)
          });
        })
      }, {
        m: common_vendor.unref(settlementList).length > 0
      }, common_vendor.unref(settlementList).length > 0 ? {
        n: common_vendor.f(groupByShopId(common_vendor.unref(settlementList)), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.f(item.goodinfos, (item1, index1, i1) => {
              return common_vendor.e({
                a: "066eebde-1-" + i0 + "-" + i1,
                b: common_vendor.p({
                  width: "190rpx",
                  height: "190rpx",
                  radius: "18rpx",
                  src: item1.cover,
                  fit: "fill"
                }),
                c: item1.finenessname
              }, item1.finenessname ? {
                d: common_vendor.t(item1.finenessname)
              } : {}, {
                e: common_vendor.t(item1.name),
                f: common_vendor.t(item1.gjbbname),
                g: common_vendor.t(item1.wlbbname),
                h: common_vendor.t(item1.gjbbname),
                i: common_vendor.t(item1.efficiency),
                j: common_vendor.t(item1.delivery),
                k: common_vendor.t(item1.price),
                l: index1
              });
            }),
            b: item.byzt === 1
          }, item.byzt === 1 ? {
            c: "066eebde-2-" + i0,
            d: common_vendor.p({
              size: "mini",
              plain: true,
              textColor: "#669CFD"
            })
          } : {}, {
            e: common_vendor.t(getYf(item.shopid)),
            f: index
          });
        })
      } : {}, {
        o: common_vendor.unref(settlementList)
      }, common_vendor.unref(settlementList) ? {
        p: common_vendor.t(common_vendor.unref(totalPrice)),
        q: common_vendor.o(openRule),
        r: common_vendor.t(getTotalYf()),
        s: common_vendor.t(common_vendor.unref(totalNum)),
        t: common_vendor.t(selectedItemsTotalPrice())
      } : {}, {
        v: common_vendor.unref(selectedPay) ? common_vendor.unref(selectedPay).image : "https://www.xzxskj.com/xcximg/icon_weixin@3x.png",
        w: common_vendor.t(common_vendor.unref(selectedPay) ? common_vendor.unref(selectedPay).text : "微信支付"),
        x: common_vendor.o(openPay),
        y: common_vendor.o(handleClose),
        z: common_vendor.o(handleConfirm),
        A: common_vendor.p({
          show: common_vendor.unref(fpbkShow),
          settlementList: common_vendor.unref(settlementList)
        }),
        B: common_vendor.sr(payPopup, "066eebde-3", {
          "k": "payPopup"
        }),
        C: common_vendor.o(handleClose),
        D: common_vendor.o(change),
        E: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        F: common_vendor.o(handleClose),
        G: common_vendor.sr(rulePopup, "066eebde-5", {
          "k": "rulePopup"
        }),
        H: common_vendor.o(handleClose),
        I: common_vendor.o(change),
        J: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        K: common_vendor.unref(cusRemark),
        L: common_vendor.o(($event) => common_vendor.isRef(cusRemark) ? cusRemark.value = $event.detail.value : null),
        M: !common_vendor.unref(showPannel),
        N: common_vendor.t(common_vendor.unref(lxType) === "1" ? "议价:" : "合计:"),
        O: common_vendor.t(common_vendor.unref(lxType) === "1" ? selectedItemsYjTotalPrice() : selectedItemsTotalPrice()),
        P: common_vendor.unref(lxType) === "2"
      }, common_vendor.unref(lxType) === "2" ? {
        Q: common_vendor.o(submitorder)
      } : {}, {
        R: common_vendor.unref(lxType) === "1"
      }, common_vendor.unref(lxType) === "1" ? {
        S: common_vendor.o(bargainingSubmit)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-066eebde"]]);
wx.createPage(MiniProgramPage);
