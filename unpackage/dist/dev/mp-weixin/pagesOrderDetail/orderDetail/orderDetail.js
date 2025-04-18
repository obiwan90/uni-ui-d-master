"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
const pagesOrderDetail_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_image + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + common_vendor.unref(payPannel) + _easycom_uni_popup + common_vendor.unref(rulePannel) + common_vendor.unref(refundPannel) + common_vendor.unref(afterSalesPannel))();
}
const payPannel = () => "./components/payPannel.js";
const rulePannel = () => "./components/rulePannel.js";
const afterSalesPannel = () => "./components/afterSalesPannel.js";
const refundPannel = () => "./components/refundPannel.js";
const _sfc_main = {
  __name: "orderDetail",
  setup(__props) {
    const payPannelRef = common_vendor.ref(null);
    common_vendor.ref();
    const showAfterSales = common_vendor.ref(false);
    const showRefund = common_vendor.ref(false);
    const showRule = common_vendor.ref(false);
    const showPay = common_vendor.ref(false);
    const orderInfo = common_vendor.ref();
    const payment = common_vendor.ref("1");
    const zyf = common_vendor.ref("0");
    const scrollViewHeight = common_vendor.computed(() => {
      if (orderInfo && (orderInfo.type === "待付款" || orderInfo.type === "待收货")) {
        return "calc(100vh - 180rpx)";
      } else {
        return "100vh";
      }
    });
    const titleText = common_vendor.ref([
      // {zt:['1'],lx:['1'],text:'等待确认议价'},
      { zt: ["1"], text: "待付款!" },
      { zt: ["3"], text: "等待发货" },
      // {zt:['2','3'],lx:['1'],text:'议价成功等待发货'},
      { zt: ["4"], text: "待收货" },
      { zt: ["5"], text: "已收货" },
      // {zt:['6'],lx:['1','2'],text:'售后中'},
      { zt: ["7"], text: "交易成功" }
    ]);
    const getTitleText = (zt) => {
      const item = titleText.value.find((item2) => {
        return item2.zt.includes(zt.toString());
      });
      return item ? item.text : "";
    };
    const tipData = common_vendor.ref([
      // {type:'议价中',text:'议价成功后默认购买成功，等待发货',zt:['1'],lx:'1'},
      { type: "待付款", text: "相关商品他人付款后将无法购买，请尽快完成支付！", zt: ["1"], lx: "2" },
      { type: "待发货", text: "平台发货前可修改收货信息！", isBargaining: false, zt: ["3"], lx: "2" },
      { type: "待收货", text: "物品已签收，请确认收货！", isSign: true, zt: ["4"], lx: "2" }
      // {type:'待收货',text:'平台已发货，请注意查看物流信息！',isSign: false,zt:['4'],lx:'2'},
    ]);
    const getTipText = (zt) => {
      const item = tipData.value.find((item2) => {
        return item2.zt.includes(zt.toString());
      });
      return item ? item.text : "";
    };
    const itemIndex = common_vendor.ref(-1);
    common_vendor.ref([
      { name: "收货地址", value: "北京市朝阳区天安车公廟工业区天济大厦ab座5b 506", contacts: "金克丝 13502866873" },
      { name: "备注信息", value: "华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 ", contacts: "" }
    ]);
    const order_info = common_vendor.ref([
      { name: "订单号", value: "NO.202303281234", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png", zt: ["1", "3", "4", "5", "7"] },
      { name: "下单时间", value: "2024-03-12 15:00:00", image: "", zt: ["1", "3", "4", "5", "7"] },
      { name: "付款时间", value: "2024-03-12 15:00:00", image: "", zt: ["3", "4", "5", "7"] },
      { name: "发货时间", value: "2024-03-12 15:00:00", image: "", zt: ["4", "5", "7"] },
      { name: "收货方式", value: "顺丰 154548785112", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png", zt: ["4", "5", "7"] },
      { name: "收货时间", value: "2024-03-12 15:00:00", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png", zt: ["5", "7"] }
    ]);
    const getFilteredOrderInfo = (zt) => {
      return order_info.value.filter((item) => item.zt.includes(zt));
    };
    const btnData = common_vendor.ref([
      // {type:'议价中',zt:['1'],lx:'1',btns:[
      // ]},
      { type: "待付款", zt: ["1"], btns: [] },
      { type: "待发货", zt: ["3"], btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "修改确认", image: "https://www.xzxskj.com/xcximg/icon_save@3x.png" },
        { text: "催发货", image: "https://www.xzxskj.com/xcximg/icon_cuifahuo@3x.png" },
        { text: "申请退款", image: "https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png" }
        // '联系客服','修改确认','催发货','申请退款'
      ] },
      { type: "待收货", zt: ["4"], btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "查看物流", image: "https://www.xzxskj.com/xcximg/icon_wuliu@3x.png" }
      ] },
      { type: "已收货", zt: ["5"], btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "查看物流", image: "https://www.xzxskj.com/xcximg/icon_wuliu@3x.png" },
        { text: "申请售后", image: "https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png" }
      ] },
      { type: "交易成功", zt: ["7"], btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "查看物流", image: "https://www.xzxskj.com/xcximg/icon_wuliu@3x.png" },
        { text: "申请售后", image: "https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png" }
      ] }
    ]);
    const afterSales = (index) => {
      console.log("单台售后");
      showAfterSales.value = true;
      itemIndex.value = index;
      setTimeout(() => {
        openAfterSales();
      }, 200);
    };
    const refundBtn = (index) => {
      console.log("单台退款");
      showRefund.value = true;
      itemIndex.value = index;
      setTimeout(() => {
        openRefund();
      }, 200);
    };
    const selectedPay = common_vendor.ref();
    const handleConfirm = (selectedPayment) => {
      handleClose();
      console.log("selectedPayment", selectedPayment);
      selectedPay.value = selectedPayment;
      payment.value = selectedPayment.payment;
      console.log("选择的支付类型：", selectedPayment);
    };
    const getBtns = (zt) => {
      const btnItem = btnData.value.find((item) => item.zt.includes(zt));
      return btnItem ? btnItem.btns : [];
    };
    const formatGoodsInfoTabs = (item) => {
      console.log(item);
      console.log("进来了吗");
      let result = [];
      if (item.zt === "1") {
        if (item.gooinfos.gjbbname) {
          result.push(item.gooinfos.gjbbname);
        }
        if (item.gooinfos.wlbbname) {
          result.push(item.gooinfos.wlbbname);
        }
        if (item.gooinfos.bxzt) {
          result.push(item.gooinfos.bxzt);
        }
        if (item.gooinfos.efficiency) {
          result.push(`电池${item.gooinfos.efficiency}%`);
        }
        if (item.gooinfos.delivery) {
          result.push(`${item.gooinfos.delivery}发货`);
        }
      }
      return result.join("丨");
    };
    const handleBtnClick = (btn) => {
      console.log("Button clicked:", btn.text);
      if (btn.text === "查看物流") {
        common_vendor.index.navigateTo({
          url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息"
        });
      }
      if (btn.text === "申请售后") {
        showAfterSales.value = true;
        itemIndex.value = -1;
        setTimeout(() => {
          openAfterSales();
        }, 200);
      }
      if (btn.text === "申请退款") {
        showRefund.value = true;
        itemIndex.value = -1;
        openRefund();
      }
      if (btn.text === "修改确认") {
        apiOrderEditAc();
      }
    };
    const express = common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png", value: "顺丰", expressId: "2" },
      { image: "https://www.xzxskj.com/xcximg/icon_jingdong@3x.png", value: "京东", expressId: "1" },
      { image: "https://www.xzxskj.com/xcximg/icon_songhuo@3x.png", value: "送货上门", expressId: "3" },
      { image: "https://www.xzxskj.com/xcximg/icon_ziti@3x.png", value: "自提", expressId: "4" }
    ]);
    const selectedTap = common_vendor.ref(0);
    const yflist = common_vendor.ref([]);
    const selectTap = async (index) => {
      if (orderInfo.type === "待付款") {
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
      }
    };
    const apiGetJdFreightData = async () => {
      yflist.value = [];
      if (addressInfos && addressInfos.value) {
        const data = {
          opid: common_vendor.index.getStorageSync("sessionInfo").opid,
          addid: addressInfos.value.id,
          goodsid: JSON.stringify(transformSettlementList())
        };
        const res = await pagesOrderDetail_api_api.apiGetJdFreight(data);
        if (res.code === "200") {
          yflist.value = res.yflist;
        }
        console.log("京东运费:", res);
      }
    };
    const apiGetSfFreightAction = async () => {
      yflist.value = [];
      if (addressInfos && addressInfos.value) {
        const data = {
          addid: addressInfos.value.id,
          goodsid: JSON.stringify(transformSettlementList())
        };
        const res = await pagesOrderDetail_api_api.apiGetSfFreight(data);
        if (res.code === "200") {
          yflist.value = res.yflist;
        }
        console.log("顺丰运费:", res);
      }
    };
    const transformSettlementList = () => {
      const groupedData = {};
      console.log("orderInfo", orderInfo.value);
      orderInfo.value.gwclist.forEach((item) => {
        const companyId = item.gooinfos.shopid;
        const goodsid = item.gooinfos.id;
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
    const getTotalYf = () => {
      let total = 0;
      console.log("yflist.value", yflist.value);
      if (yflist.value) {
        yflist.value.forEach((item) => {
          total += parseFloat(item.price);
        });
      }
      if (zyf && zyf.value) {
        zyf.value = total;
      }
      return zyf.value;
    };
    const payPopup = common_vendor.ref(null);
    const rulePopup = common_vendor.ref(null);
    const afterSalesPopup = common_vendor.ref(null);
    const refundPopup = common_vendor.ref(null);
    const show = common_vendor.ref(true);
    const openPay = () => {
      showPay.value = true;
      payPopup.value.open();
    };
    const openRule = () => {
      showRule.value = true;
      rulePopup.value.open();
    };
    const openAfterSales = () => {
      showAfterSales.value = true;
      afterSalesPopup.value.open();
    };
    const openRefund = () => {
      showRefund.value = true;
      refundPopup.value.open();
    };
    const handleClose = () => {
      console.log("Popup is closed");
      refundPopup.value.close();
      payPopup.value.close();
      rulePopup.value.close();
      afterSalesPopup.value.close();
      show.value = true;
    };
    const change = (e) => {
      console.log("点击了遮罩e:", e);
      show.value = !e.show;
      if (!e.show) {
        showAfterSales.value = e.show;
        showRefund.value = e.show;
        showRule.value = e.show;
        showPay.value = e.show;
      }
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const addressInfos = common_vendor.ref();
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp * 1e3);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const apiOrderEditAc = async () => {
      const param = {
        id: orderInfo.value.id,
        addid: addressInfos.value.id,
        remarks: orderInfo.value.remarks
      };
      const res = await pagesOrderDetail_api_api.apiOrderEdit(param);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          apiGetOrderDetailAc(orderInfo.value.id);
        }, 500);
      } else {
        common_vendor.index.showToast({
          title: res.msg || "操作失败",
          icon: "error",
          duration: 1e3
        });
      }
    };
    const repay = () => {
      console.log("立即付款");
      if (payment.value === "1") {
        wxPay(orderInfo.value.id);
      }
    };
    const wxPay = async (id) => {
      const data = {
        id,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res1 = await pagesOrderDetail_api_api.apiGetWxPay(data);
      console.log("wx支付参数:", res1);
      const orderInfo2 = {
        "nonceStr": res1.nonceStr,
        "package": res1.package,
        "paySign": res1.paySign,
        "timeStamp": res1.timeStamp,
        "signType": res1.signType
      };
      autoPay(orderInfo2);
    };
    const autoPay = (orderInfo2) => {
      common_vendor.index.requestPayment({
        provider: "wxpay",
        ...orderInfo2,
        success(res) {
          console.log("success:" + JSON.stringify(res));
          console.log("支付成功");
          common_vendor.index.showToast({
            title: "支付成功",
            icon: "success",
            duration: 1e3
          });
          common_vendor.index.navigateBack();
        },
        fail(err) {
          console.log("pay fail:", JSON.stringify(err));
          console.log("支付失败");
          common_vendor.index.showToast({
            title: "支付失败",
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const apiGetOrderDetailAc = async (id) => {
      var _a;
      const param = {
        lx: "5",
        // 用户详情
        id
      };
      const res = await pagesOrderDetail_api_api.apiGetOrderDetail(param);
      if (res.code === "200") {
        orderInfo.value = res.infos;
        addressInfos.value = res.infos.addinfos;
        selectedTap.value = express.value.findIndex((item) => {
          return item.expressId == res.infos.expressid;
        });
        if (res.infos.zyf) {
          zyf.value = res.infos.zyf;
        }
      }
      order_info.value = [
        {
          name: "订单号",
          value: orderInfo.value.ordernumber || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["1", "3", "4", "5", "7"]
        },
        {
          name: "下单时间",
          value: formatTimestamp(res.infos.add_time) || " ",
          // 处理空值
          image: "",
          zt: ["1", "3", "4", "5", "7"]
        },
        {
          name: "付款时间",
          value: formatTimestamp(res.infos.pay_time) || " ",
          // 处理空值
          image: "",
          zt: ["3", "4", "5", "7"]
        },
        {
          name: "发货时间",
          value: formatTimestamp(res.infos.fhsj) || " ",
          // 处理空值
          image: "",
          zt: ["4", "5", "7"]
        },
        {
          name: "收货方式",
          value: ((_a = express.value.find((item) => item.expressId == res.infos.expressid)) == null ? void 0 : _a.value) || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["4", "5", "7"]
        },
        {
          name: "收货时间",
          value: formatTimestamp(res.infos.shsj) || " ",
          // 处理空值
          image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png",
          zt: ["5", "7"]
        }
      ];
      console.log("res", res);
    };
    const selectedAddress = common_vendor.ref(null);
    common_vendor.onShow(() => {
      console.log("onShow");
      let pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      console.log("onShow:", prevPage.data.selectedAddress);
      if (prevPage.data.selectedAddress) {
        console.log("prevPage.data.selectedAddress:", prevPage.data.selectedAddress);
        addressInfos.value = prevPage.data.selectedAddress;
      }
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad((options) => {
      if (options.orderId) {
        apiGetOrderDetailAc(options.orderId);
      }
    });
    common_vendor.onReady(() => {
      setTimeout(() => {
        if (payPannelRef && payPannelRef.value) {
          console.log("调用了");
          payPannelRef.value.selectTap(2);
        }
      }, 1e3);
    });
    common_vendor.onShow(async () => {
      console.log("onShow");
      let pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      console.log("onShow:", prevPage.data.selectedAddress);
      if (prevPage.data.selectedAddress) {
        selectedAddress.value = prevPage.data.selectedAddress;
      }
      console.log("selectedAddress", selectedAddress.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        b: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        c: common_vendor.t(getTitleText(common_vendor.unref(orderInfo).zt)),
        d: getTipText(common_vendor.unref(orderInfo).zt)
      }, getTipText(common_vendor.unref(orderInfo).zt) ? {
        e: common_vendor.t(getTipText(common_vendor.unref(orderInfo).zt))
      } : {}, {
        f: getBtns(common_vendor.unref(orderInfo).zt).length
      }, getBtns(common_vendor.unref(orderInfo).zt).length ? {
        g: common_vendor.f(getBtns(common_vendor.unref(orderInfo).zt, common_vendor.unref(orderInfo).lx), (btn, btnIndex, i0) => {
          return common_vendor.e({
            a: btn.image,
            b: common_vendor.t(btn.text),
            c: btn.text === "联系客服"
          }, btn.text === "联系客服" ? {
            d: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), btnIndex)
          } : {}, {
            e: btnIndex,
            f: common_vendor.o(($event) => handleBtnClick(btn), btnIndex)
          });
        })
      } : {}, {
        h: (common_vendor.unref(orderInfo).zt == "1" || common_vendor.unref(orderInfo).zt == "3") && common_vendor.unref(addressInfos)
      }, (common_vendor.unref(orderInfo).zt == "1" || common_vendor.unref(orderInfo).zt == "3") && common_vendor.unref(addressInfos) ? common_vendor.e({
        i: common_vendor.unref(addressInfos).zt === "1"
      }, common_vendor.unref(addressInfos).zt === "1" ? {} : {}, {
        j: common_vendor.t(common_vendor.unref(addressInfos).province),
        k: common_vendor.t(common_vendor.unref(addressInfos).city),
        l: common_vendor.t(common_vendor.unref(addressInfos).area),
        m: common_vendor.t(common_vendor.unref(addressInfos).address),
        n: common_vendor.t(common_vendor.unref(addressInfos).name),
        o: common_vendor.t(common_vendor.unref(addressInfos).phone),
        p: common_vendor.o(($event) => goPage("/pagesAddress/address/address?from=subOrder")),
        q: common_vendor.f(common_vendor.unref(express), (item, index, i0) => {
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
      }) : {}, {
        r: common_vendor.f(common_vendor.unref(orderInfo).gwclist, (item, index, i0) => {
          return common_vendor.e({
            a: "3aaf8dfb-1-" + i0,
            b: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              radius: "18rpx",
              src: item.gooinfos.cover,
              fit: "fill"
            }),
            c: item.gooinfos.finenessname
          }, item.gooinfos.finenessname ? {
            d: common_vendor.t(item.gooinfos.finenessname)
          } : {}, {
            e: common_vendor.t(item.gooinfos.name),
            f: item.gooinfos.zt === "1"
          }, item.gooinfos.zt === "1" ? {
            g: common_vendor.t(formatGoodsInfoTabs(item))
          } : {
            h: common_vendor.t(item.gooinfos.ch)
          }, {
            i: common_vendor.t(item.gooinfos.price)
          }, !common_vendor.unref(orderInfo).isBargaining ? {} : {}, common_vendor.unref(orderInfo).isBargaining ? {
            j: common_vendor.t(item.originalPrice)
          } : {}, common_vendor.unref(orderInfo).zt === "3" && common_vendor.unref(orderInfo).lx === "2" ? {
            k: common_vendor.o(($event) => refundBtn(index), index)
          } : {}, common_vendor.unref(orderInfo).zt === "4" || common_vendor.unref(orderInfo).zt === "5" ? {
            l: common_vendor.o(($event) => afterSales(index), index)
          } : {}, {
            m: index
          });
        }),
        s: !common_vendor.unref(orderInfo).isBargaining,
        t: common_vendor.unref(orderInfo).isBargaining,
        v: common_vendor.unref(orderInfo).zt === "3" && common_vendor.unref(orderInfo).lx === "2",
        w: common_vendor.unref(orderInfo).zt === "4" || common_vendor.unref(orderInfo).zt === "5",
        x: common_vendor.t(common_vendor.unref(orderInfo).price),
        y: common_vendor.o(openRule),
        z: common_vendor.t(getTotalYf()),
        A: common_vendor.unref(orderInfo).lx !== "1"
      }, common_vendor.unref(orderInfo).lx !== "1" ? {
        B: common_vendor.t(common_vendor.unref(orderInfo).num)
      } : {}, {
        C: common_vendor.t(common_vendor.unref(orderInfo).price),
        D: common_vendor.unref(orderInfo).zt == "1"
      }, common_vendor.unref(orderInfo).zt == "1" ? {
        E: common_vendor.unref(selectedPay) ? common_vendor.unref(selectedPay).image : "https://www.xzxskj.com/xcximg/icon_weixin@3x.png",
        F: common_vendor.t(common_vendor.unref(selectedPay) ? common_vendor.unref(selectedPay).text : "微信支付"),
        G: common_vendor.o(openPay)
      } : {}, {
        H: common_vendor.unref(orderInfo).zt == "1" || common_vendor.unref(orderInfo).zt == "2"
      }, common_vendor.unref(orderInfo).zt == "1" || common_vendor.unref(orderInfo).zt == "2" ? {
        I: common_vendor.unref(orderInfo).remarks,
        J: common_vendor.o(($event) => common_vendor.unref(orderInfo).remarks = $event.detail.value)
      } : {}, {
        K: common_vendor.sr(payPannelRef, "3aaf8dfb-3,3aaf8dfb-2", {
          "k": "payPannelRef"
        }),
        L: common_vendor.o(handleClose),
        M: common_vendor.o(handleConfirm),
        N: common_vendor.sr(payPopup, "3aaf8dfb-2", {
          "k": "payPopup"
        }),
        O: common_vendor.o(handleClose),
        P: common_vendor.o(change),
        Q: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        R: common_vendor.unref(showRule)
      }, common_vendor.unref(showRule) ? {
        S: common_vendor.o(handleClose)
      } : {}, {
        T: common_vendor.sr(rulePopup, "3aaf8dfb-4", {
          "k": "rulePopup"
        }),
        U: common_vendor.o(handleClose),
        V: common_vendor.o(change),
        W: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        X: common_vendor.unref(showRefund)
      }, common_vendor.unref(showRefund) ? {
        Y: common_vendor.o(handleClose),
        Z: common_vendor.p({
          itemIndex: common_vendor.unref(itemIndex)
        })
      } : {}, {
        aa: common_vendor.sr(refundPopup, "3aaf8dfb-6", {
          "k": "refundPopup"
        }),
        ab: common_vendor.o(handleClose),
        ac: common_vendor.o(change),
        ad: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        ae: common_vendor.unref(showAfterSales)
      }, common_vendor.unref(showAfterSales) ? {
        af: common_vendor.o(handleClose),
        ag: common_vendor.p({
          itemIndex: common_vendor.unref(itemIndex)
        })
      } : {}, {
        ah: common_vendor.sr(afterSalesPopup, "3aaf8dfb-8", {
          "k": "afterSalesPopup"
        }),
        ai: common_vendor.o(handleClose),
        aj: common_vendor.o(change),
        ak: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        al: common_vendor.unref(orderInfo).zt !== "1" && common_vendor.unref(orderInfo).zt !== "2" && common_vendor.unref(orderInfo).zt !== "3" && common_vendor.unref(orderInfo).ddlx !== "4"
      }, common_vendor.unref(orderInfo).zt !== "1" && common_vendor.unref(orderInfo).zt !== "2" && common_vendor.unref(orderInfo).zt !== "3" && common_vendor.unref(orderInfo).ddlx !== "4" ? {
        am: common_vendor.t(common_vendor.unref(addressInfos).province),
        an: common_vendor.t(common_vendor.unref(addressInfos).city),
        ao: common_vendor.t(common_vendor.unref(addressInfos).area),
        ap: common_vendor.t(common_vendor.unref(addressInfos).address),
        aq: common_vendor.t(common_vendor.unref(addressInfos).name),
        ar: common_vendor.t(common_vendor.unref(addressInfos).phone)
      } : {}, {
        as: common_vendor.unref(orderInfo).zt !== "1"
      }, common_vendor.unref(orderInfo).zt !== "1" ? {
        at: common_vendor.t(common_vendor.unref(orderInfo).remarks)
      } : {}, {
        av: common_vendor.f(getFilteredOrderInfo(common_vendor.unref(orderInfo).zt), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.image
          }, item.image ? {
            d: item.image
          } : {}, {
            e: index
          });
        }),
        aw: common_vendor.unref(orderInfo).zt == "1"
      }, common_vendor.unref(orderInfo).zt == "1" ? {} : {}, {
        ax: common_vendor.unref(orderInfo).zt == "4"
      }, common_vendor.unref(orderInfo).zt == "4" ? {} : {}, {
        ay: common_vendor.unref(orderInfo).zt == "1"
      }, common_vendor.unref(orderInfo).zt == "1" ? {
        az: common_vendor.o(repay)
      } : {}) : {}, {
        aA: common_vendor.unref(show) && common_vendor.unref(orderInfo),
        aB: common_vendor.unref(scrollViewHeight)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3aaf8dfb"]]);
wx.createPage(MiniProgramPage);
