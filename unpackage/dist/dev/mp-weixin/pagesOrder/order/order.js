"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/system.js");
const pagesOrder_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uv_count_down2 = common_vendor.resolveComponent("uv-count-down");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _easycom_uv_tabs2 + _component_van_image + _easycom_uv_count_down2 + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_count_down = () => "../../uni_modules/uv-count-down/components/uv-count-down/uv-count-down.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_tabs + _easycom_uv_count_down + _easycom_z_paging)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const scan = async () => {
      showLoading();
      try {
        const result = await utils_common.scanCode();
        console.log("result", result);
        if (result) {
          handleInput(result);
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
    const searchRef = common_vendor.ref(null);
    const searchCh = common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const handleInput = (inputText) => {
      if (inputText.length > 0 && orderType.value == "custom") {
        apiGetOrderSearchAc(inputText);
      }
    };
    const selectChange = (e) => {
      console.log("selectChange:", e);
      if (e) {
        if (searchRef && searchRef.value) {
          searchRef.value.clearData();
          orgArray.value = [];
        }
        searchCh.value = e.ch;
        paging.value.reload(true);
      }
    };
    const apiGetOrderSearchAc = async (ch) => {
      const param = {
        ch
      };
      const res = await pagesOrder_api_api.apiGetOrderSearch(param);
      if (res.code === 200) {
        orgArray.value = res.lists;
      }
      console.log("res", res);
    };
    const dataList = common_vendor.ref([]);
    const paging = common_vendor.ref(null);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await getOrderList(orderLx.value, orderType.value);
      console.log("data：", data);
      paging.value.complete(data);
    };
    const title = common_vendor.ref();
    common_vendor.ref();
    const isYjCard = common_vendor.ref(false);
    const isShCard = common_vendor.ref(false);
    const classlist = common_vendor.ref([
      // { name: '全部', lx: '1', type: 'custom' },
      { name: "待付款", lx: "3", type: "custom" },
      { name: "待发货", lx: "4", type: "custom" },
      { name: "待收货", lx: "5", type: "custom" },
      { name: "已收货", lx: "6", type: "custom" },
      { name: "交易成功", lx: "7", type: "custom" },
      // { name: '全部', lx: '1', type: 'yj' },
      { name: "议价中", lx: "2", type: "yj" },
      { name: "议价成功", lx: "3", type: "yj" },
      { name: "议价失败", lx: "4", type: "yj" },
      // { name: '全部', lx: '1', type: 'sh' },
      { name: "售后中", lx: "2", zt: "1", type: "sh" },
      { name: "售后成功", lx: "3", zt: "2", type: "sh" },
      { name: "售后失败", lx: "4", zt: "3", type: "sh" }
    ]);
    const activeTab1Index = common_vendor.ref();
    const tabsData = common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name,
        type: item.type,
        // 添加 type 属性
        lx: item.lx
      }));
    });
    const uvTabs1Change = (e) => {
      activeTab1Index.value = e.index;
      console.log("tabsData:", tabsData.value);
      orderType.value = tabsData.value[e.index].type;
      orderLx.value = tabsData.value[e.index].lx;
      paging.value.reload(true);
    };
    const getBtns = (zt, lx) => {
      const btnItem = btnData.value.find((item) => item.zt.includes(zt) && item.lx === lx);
      console.log();
      return btnItem ? btnItem.btns : [];
    };
    const handleBtnClick = (btn, item) => {
      console.log("Button clicked:", btn);
      if (btn === "查看物流") {
        goKd(item);
      }
      if (btn === "立即支付") {
        if (!apiCheckPayAc(item.id)) {
          repay(item);
        }
      }
      if (btn === "取消订单") {
        apiCancelOrderAc(item.id);
      }
      if (btn === "催发货") {
        apiUrgeShipmentAc(item.id);
      }
      if (btn === "确认收货") {
        apiConfirmReceivedAc(item.id);
      }
    };
    const repay = (item) => {
      if (item.payment === "1") {
        wxPay(item.id);
      }
    };
    const wxPay = async (id) => {
      const data = {
        lx: "1",
        id,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res1 = await pagesOrder_api_api.apiGetWxPay(data);
      console.log("wx支付参数:", res1);
      const orderInfo = {
        "nonceStr": res1.nonceStr,
        "package": res1.package,
        "paySign": res1.paySign,
        "timeStamp": res1.timeStamp,
        "signType": res1.signType
      };
      autoPay(orderInfo);
    };
    const autoPay = (orderInfo) => {
      common_vendor.index.requestPayment({
        provider: "wxpay",
        ...orderInfo,
        success(res) {
          console.log("success:" + JSON.stringify(res));
          console.log("支付成功");
          common_vendor.index.showToast({
            title: "支付成功",
            icon: "success",
            duration: 1e3
          });
          setTimeout(() => {
            paging.value.reload(true);
          }, 1e3);
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
    const goKd = (item) => {
      const num = item.kddh;
      common_vendor.index.navigateTo({
        url: `plugin://kdzs-plugin/logistics-list?num=${num}&appName=数码购机&title=物流信息`
      });
    };
    const btnClass = (btn) => {
      if (btn === "确认收货" || btn === "催发货" || btn === "立即支付") {
        return "special-btn";
      } else {
        return "normal-btn";
      }
    };
    const btnData = common_vendor.ref([
      { type: "议价中", zt: ["1"], lx: "1", btns: [] },
      { type: "待付款", zt: ["1"], lx: "2", btns: [
        "取消订单",
        "立即支付"
      ] },
      { type: "待发货", zt: ["2", "3"], lx: "2", btns: [
        "催发货"
      ] },
      // {type:'待付款',zt:['1'],lx:'2',btns:[
      // 	'取消订单','修改信息','立即支付'
      // ]},
      // {type:'待发货',zt:['2','3'],lx:'2',btns:[
      // 	'修改信息','催发货'
      // ]},
      { type: "待收货", zt: ["4"], lx: "2", btns: [
        "查看物流",
        "确认收货"
      ] },
      { type: "已收货", zt: ["5"], lx: "2", btns: [] },
      { type: "售后中", zt: ["6"], lx: "2", btns: [] },
      { type: "交易成功", zt: ["7"], lx: "2", btns: [] }
    ]);
    const titleText = common_vendor.ref([
      { zt: ["1"], lx: ["1"], text: "等待确认议价" },
      { zt: ["1"], lx: ["2"], text: "他人付款后将无法购买请尽快支付!" },
      { zt: ["2", "3"], lx: ["2"], text: "等待发货" },
      { zt: ["2"], lx: ["1"], text: "等待确认议价" },
      { zt: ["3"], lx: ["1"], text: "议价成功等待发货" },
      // {zt:['4'],lx:['1','2'],text:'运输中'},
      { zt: ["5"], lx: ["1", "2"], text: "已收货" },
      { zt: ["6"], lx: ["1", "2"], text: "售后中" },
      { zt: ["7"], lx: ["1", "2"], text: "交易成功" }
    ]);
    const shTitleText = common_vendor.ref([
      { zt: "1", text: "售后中" },
      { zt: "2", text: "售后成功" },
      { zt: "3", text: "售后失败" }
    ]);
    const getTitleText = (zt, lx) => {
      console.log("zt:", zt);
      console.log("lx:", lx);
      if (orderType.value === "sh") {
        return shTitleText.value.find((item) => item.zt === zt).text;
      }
      const titleItem = titleText.value.find((item) => item.zt.includes(zt) && item.lx.includes(lx));
      console.log("titleItem:", titleItem);
      return titleItem ? titleItem.text : "";
    };
    const getRemainingTime = (addTime, bargainingTimeName) => {
      console.log("addTime:", addTime);
      console.log("bargainingTimeName:", bargainingTimeName);
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      const bargainingEndTime = new Date(parseInt(addTime) * 1e3 + parseInt(bargainingTimeName) * 3600 * 1e3);
      const remainingTime = bargainingEndTime.getTime() - currentTime;
      return remainingTime;
    };
    const goDetail = (item, type) => {
      const itemString = JSON.stringify(item);
      common_vendor.index.setStorageSync("orderDetailItem", itemString);
      if (type === "custom") {
        common_vendor.index.navigateTo({
          url: "/pagesOrderDetail/orderDetail/orderDetail?orderId=" + item.orderid
        });
      }
      if (type === "yj") {
        common_vendor.index.navigateTo({
          url: "/pagesYjOrderDetail/yjOrderDetail/yjOrderDetail"
        });
      }
      if (type === "sh") {
        common_vendor.index.navigateTo({
          url: "/pagesShOrderDetail/shOrderDetail/shOrderDetail"
        });
      }
    };
    common_vendor.ref([]);
    const getOrderList = async (lx, type) => {
      let res;
      switch (type) {
        case "custom":
          res = await pagesOrder_api_api.apiGetOrderlist({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx: searchCh.value ? "" : lx,
            ch: searchCh.value
          });
          break;
        case "yj":
          res = await pagesOrder_api_api.apiGetYjIndex({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx
          });
          break;
        case "sh":
          res = await pagesOrder_api_api.apiGetShIndex({
            opid: common_vendor.index.getStorageSync("sessionInfo").opid,
            lx
          });
          break;
        default:
          res = { code: 200, lists: [] };
      }
      if (res.code === 200) {
        if (type === "custom") {
          console.log("custom.lists:", res.lists);
          if (searchCh.value) {
            activeTab1Index.value = parseInt(res.lists[0].zt) - 1;
            searchCh.value = "";
          }
          return res.lists.filter((item) => item.goodsinfos.length > 0);
        }
        if (type === "yj") {
          isYjCard.value = true;
          console.log("yj.lists:", res.lists);
          return Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
        }
        if (type === "sh") {
          isShCard.value = true;
          console.log("sh.lists:", res.lists);
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
            return res.lists;
          }
          return [];
        }
      }
      console.log(res);
    };
    const formatGoodsInfoTabs1 = (item) => {
      console.log(item);
      console.log("进来了吗");
      let result = [];
      if (item.zt === "1") {
        if (item.goodsinfos.gjbbname) {
          result.push(item.goodsinfos.gjbbname);
        }
        if (item.goodsinfos.wlbbname) {
          result.push(item.goodsinfos.wlbbname);
        }
        if (item.goodsinfos.bxzt) {
          result.push(item.goodsinfos.bxzt);
        }
        if (item.goodsinfos.efficiency) {
          result.push(`电池${item.goodsinfos.efficiency}%`);
        }
        if (item.goodsinfos.delivery) {
          result.push(`${item.goodsinfos.delivery}发货`);
        }
      }
      return result.join("丨");
    };
    const formatGoodsInfoTabs2 = (item) => {
      console.log(item);
      console.log("进来了吗");
      let result = [];
      if (item.zt === "2") {
        if (item.goodsinfos.gjbbname) {
          result.push(item.goodsinfos.gjbbname);
        }
        if (item.goodsinfos.wlbbname) {
          result.push(item.goodsinfos.wlbbname);
        }
        if (item.goodsinfos.bxzt) {
          result.push(item.goodsinfos.bxzt);
        }
        if (item.goodsinfos.efficiency) {
          result.push(`电池${item.goodsinfos.efficiency}%`);
        }
        if (item.goodsinfos.delivery) {
          result.push(`${item.goodsinfos.delivery}发货`);
        }
      }
      return result.join("丨");
    };
    const apiCancelOrderAc = async (id) => {
      const data = {
        id,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesOrder_api_api.apiCancelOrder(data);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "none",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    const apiUrgeShipmentAc = (id) => {
      const param = {
        id
      };
      const res = pagesOrder_api_api.apiUrgeShipment(param);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "none",
          duration: 1e3
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    const apiConfirmReceivedAc = async (id) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id
      };
      const res = await pagesOrder_api_api.apiConfirmReceived(param);
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
    const apiCheckPayAc = async (id) => {
      const param = {
        id
      };
      const res = await pagesOrder_api_api.apiCheckPay(param);
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
    const orderLx = common_vendor.ref();
    const orderType = common_vendor.ref();
    common_vendor.onLoad((options) => {
      const order = options.order;
      const yjOrder = options.yj;
      const shOrder = options.sh;
      if (order) {
        orderLx.value = order;
        classlist.value = classlist.value.filter((item) => item.type === "custom" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === order);
        title.value = "采购订单";
        console.log("采购订单");
        orderType.value = "custom";
      } else if (yjOrder) {
        orderLx.value = yjOrder;
        classlist.value = classlist.value.filter((item) => item.type === "yj" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === yjOrder);
        title.value = "议价订单";
        console.log("议价订单");
        orderType.value = "yj";
      } else if (shOrder) {
        orderLx.value = shOrder;
        classlist.value = classlist.value.filter((item) => item.type === "sh" || item.type === "all");
        activeTab1Index.value = classlist.value.findIndex((item) => item.lx === shOrder);
        title.value = "售后订单";
        console.log("售后订单");
        orderType.value = "sh";
      } else {
        activeTab1Index.value = 0;
        classlist.value = classlist.value;
      }
    });
    common_vendor.onShow(() => {
      if (paging && paging.value) {
        paging.value.reload(true);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.sr(searchRef, "a5493cca-1", {
          "k": "searchRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectChange),
        e: common_vendor.p({
          keyId: 22,
          phText: "请输入串号",
          dataList: common_vendor.unref(orgArray),
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        f: common_vendor.o(scan),
        g: common_vendor.o(uvTabs1Change),
        h: common_vendor.p({
          list: common_vendor.unref(tabsData),
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
        i: !common_vendor.unref(isYjCard) && !common_vendor.unref(isShCard)
      }, !common_vendor.unref(isYjCard) && !common_vendor.unref(isShCard) ? {
        j: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.ordernumber),
            b: common_vendor.t(getTitleText(item.zt, item.lx)),
            c: common_vendor.f(item.goodsinfos, (item1, index2, i1) => {
              return common_vendor.e({
                a: "a5493cca-4-" + i0 + "-" + i1 + ",a5493cca-3",
                b: common_vendor.p({
                  width: "190rpx",
                  height: "190rpx",
                  radius: "18rpx",
                  fit: "fill",
                  src: item1.goodsinfos.cover
                }),
                c: item1.goodsinfos.finenessname
              }, item1.goodsinfos.finenessname ? {
                d: common_vendor.t(item1.goodsinfos.finenessname)
              } : {}, {
                e: common_vendor.t(item1.goodsinfos.name),
                f: item1.goodsinfos.zt === "1"
              }, item1.goodsinfos.zt === "1" ? {
                g: common_vendor.t(formatGoodsInfoTabs1(item1))
              } : {
                h: common_vendor.t(item1.goodsinfos.ch)
              }, {
                i: common_vendor.t(item1.price)
              }, !item.isBargaining ? {} : {}, item.isBargaining ? {
                j: common_vendor.t(item1.originalPrice)
              } : {}, {
                k: index2,
                l: common_vendor.o(($event) => goDetail(item, "custom"), index2)
              });
            }),
            d: !item.isBargaining,
            e: item.isBargaining,
            f: common_vendor.t(item.goodsinfos.length),
            g: common_vendor.t(item.price),
            h: item.zt === "1" || item.zt === "2" || item.zt === "3" || item.zt === "4"
          }, item.zt === "1" || item.zt === "2" || item.zt === "3" || item.zt === "4" ? {
            i: common_vendor.f(getBtns(item.zt, item.lx), (btn, btnIndex, i1) => {
              return {
                a: common_vendor.t(btn),
                b: btnIndex,
                c: common_vendor.o(($event) => handleBtnClick(btn, item), btnIndex),
                d: common_vendor.n(btnClass(btn))
              };
            })
          } : {}, {
            j: index
          });
        })
      } : {}, {
        k: common_vendor.unref(isYjCard)
      }, common_vendor.unref(isYjCard) ? {
        l: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.ordernumber),
            b: common_vendor.t(getTitleText(item.zt, item.lx)),
            c: getTitleText(item.zt, item.lx) === "等待确认议价" && getRemainingTime(item.pay_time, item.bargainingtimename) === "已结束"
          }, getTitleText(item.zt, item.lx) === "等待确认议价" && getRemainingTime(item.pay_time, item.bargainingtimename) === "已结束" ? {} : getTitleText(item.zt, item.lx) === "等待确认议价" && item.lx === "1" ? {
            e: "a5493cca-5-" + i0 + ",a5493cca-3",
            f: common_vendor.p({
              time: getRemainingTime(item.pay_time, item.bargainingtimename),
              format: "HH:mm:ss"
            })
          } : {}, {
            d: getTitleText(item.zt, item.lx) === "等待确认议价" && item.lx === "1",
            g: "a5493cca-6-" + i0 + ",a5493cca-3",
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
            l: item.goodsinfos.zt === "1"
          }, item.goodsinfos.zt === "1" ? {
            m: common_vendor.t(formatGoodsInfoTabs2(item))
          } : {
            n: common_vendor.t(item.goodsinfos.ch)
          }, {
            o: common_vendor.t(item.price),
            p: common_vendor.t(item.goodsinfos.price),
            q: index,
            r: common_vendor.o(($event) => goDetail(item, "yj"), index)
          });
        })
      } : {}, {
        m: common_vendor.unref(isShCard)
      }, common_vendor.unref(isShCard) ? {
        n: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.ordernumber),
            b: common_vendor.t(getTitleText(item.zt, item.lx)),
            c: common_vendor.f(item.goodsinfos, (item1, index2, i1) => {
              return common_vendor.e({
                a: "a5493cca-7-" + i0 + "-" + i1 + ",a5493cca-3",
                b: common_vendor.p({
                  width: "190rpx",
                  height: "190rpx",
                  radius: "18rpx",
                  fit: "fill",
                  src: item1.cover
                }),
                c: item1.finenessname
              }, item1.finenessname ? {
                d: common_vendor.t(item1.finenessname)
              } : {}, {
                e: common_vendor.t(item1.name),
                f: common_vendor.t(item1.ch),
                g: common_vendor.t(item1.price),
                h: index2
              });
            }),
            d: common_vendor.t(item.price),
            e: index,
            f: common_vendor.o(($event) => goDetail(item, "sh"), index)
          };
        })
      } : {}, {
        o: common_vendor.sr(paging, "a5493cca-3", {
          "k": "paging"
        }),
        p: common_vendor.o(queryList),
        q: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        r: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a5493cca"]]);
wx.createPage(MiniProgramPage);
