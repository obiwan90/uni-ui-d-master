"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesShOrderDetail_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_loading + _component_van_image + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + common_vendor.unref(userServicePannel) + _easycom_uni_popup)();
}
const userServicePannel = () => "./components/userServicePannel.js";
const _sfc_main = {
  __name: "shOrderDetail",
  setup(__props) {
    const saiXuanPannelPopup = common_vendor.ref(null);
    const showSaiXuanPannel = common_vendor.ref(false);
    const handleClose = () => {
      saiXuanPannelPopup.value.close();
    };
    const change = (e) => {
      if (!e) {
        showSaiXuanPannel.value = e.show;
      }
    };
    const selectSX = () => {
      showSaiXuanPannel.value = true;
      saiXuanPannelPopup.value.open();
    };
    const infos = common_vendor.ref();
    const orderItem = common_vendor.ref();
    common_vendor.ref();
    const order_info = common_vendor.ref([
      { name: "售后订单", value: "", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png" },
      { name: "申请时间", value: "", image: "" },
      { name: "销售订单", value: "", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png" },
      { name: "下单时间", value: "", image: "" },
      { name: "付款时间", value: "", image: "" },
      { name: "收货时间", value: "", image: "" },
      { name: "下单备注", value: "", image: "" }
    ]);
    common_vendor.ref([
      { shlx: "2", tyzt: "6", btnLeft: "驳回售后", btnRight: "商家已同意售后，请立即预约发货", btnCenter: "" },
      //6
      { shlx: "4", tyzt: "6", btnLeft: "驳回售后", btnRight: "商家已同意售后，请立即预约发货", btnCenter: "" }
      //5
    ]);
    common_vendor.ref([
      { name: "驳回售后", lx: "7" },
      { name: "同意补差", lx: "2" },
      { name: "同意售后", lx: "3" },
      { name: "已收到货,同意退款", lx: "4" },
      //shlx 2
      { name: "售后完成,预约快递", lx: "5" },
      //shlx 4
      { name: "预约快递", lx: "6" },
      { name: "同意退款", lx: "8" }
    ]);
    common_vendor.ref();
    const apiGetCustomServiceOrderDetailAc = async () => {
      const param = {
        lx: orderItem.value.lx,
        id: orderItem.value.id
      };
      const res = await pagesShOrderDetail_api_api.apiGetCustomServiceOrderDetail(param);
      if (res.code === "200") {
        infos.value = res.infos;
        console.log("infos", infos.value);
        order_info.value[0].value = res.infos.ordernumber;
        order_info.value[1].value = utils_common.formatTimestamp(res.infos.shaddtime);
        order_info.value[2].value = res.infos.ydh;
        order_info.value[3].value = utils_common.formatTimestamp(res.infos.add_time);
        order_info.value[4].value = utils_common.formatTimestamp(res.infos.pay_time);
        order_info.value[5].value = res.infos.remarks;
      }
    };
    const apiCustomServiceOrderOperationAc = async (lx, data) => {
      const param = {
        id: orderItem.value.id,
        lx
        // 2同意补差3同意售后4已收到货同意退款5售后完成预约快递6预约快递
      };
      try {
        const res = await pagesShOrderDetail_api_api.apiCustomServiceOrderOperation(param);
        if (res.code === 200) {
          await subExpress(data.expressid, data.id);
        } else {
          common_vendor.index.showToast({
            title: res.message || "操作失败",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (error) {
        console.error("请求出错:", error);
        common_vendor.index.showToast({
          title: "请求出错，请稍后再试",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const successAc = async (data) => {
      console.log("进来这里了吗");
      await apiCustomServiceOrderOperationAc(infos.value.shlx === "2" ? "4" : "5", data);
    };
    const subExpress = (expressid, id) => {
      if (expressid === "1") {
        apiOrderJdLogisticsData(id);
      }
      if (expressid === "2") {
        apiOrderSfLogisticsData(id);
      }
    };
    const apiOrderJdLogisticsData = async (id) => {
      const data = {
        ddid: id
      };
      const res = await pagesShOrderDetail_api_api.apiOrderJdLogistics(data);
      console.log(res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          apiGetCustomServiceOrderDetailAc();
        }, 500);
      }
    };
    const apiOrderSfLogisticsData = async (id) => {
      const data = {
        ddid: id
      };
      const res = await pagesShOrderDetail_api_api.apiOrderSfLogistics(data);
      console.log(res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          apiGetCustomServiceOrderDetailAc();
        }, 500);
      }
    };
    common_vendor.onMounted(async () => {
      orderItem.value = JSON.parse(common_vendor.index.getStorageSync("orderDetailItem"));
      console.log(orderItem.value);
      await apiGetCustomServiceOrderDetailAc();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(infos)
      }, common_vendor.unref(infos) ? common_vendor.e({
        b: common_vendor.unref(infos).shlx === "5"
      }, common_vendor.unref(infos).shlx === "5" ? {} : {}, {
        c: common_vendor.unref(infos).shlx === "1"
      }, common_vendor.unref(infos).shlx === "1" ? {} : {}, {
        d: common_vendor.unref(infos).shlx === "2"
      }, common_vendor.unref(infos).shlx === "2" ? {} : {}, {
        e: common_vendor.unref(infos).shlx === "4"
      }, common_vendor.unref(infos).shlx === "4" ? {} : {}, {
        f: common_vendor.unref(infos).zt === "2"
      }, common_vendor.unref(infos).zt === "2" ? {} : {}, {
        g: common_vendor.unref(infos).zt === "3"
      }, common_vendor.unref(infos).zt === "3" ? {} : {}, {
        h: common_vendor.unref(infos).zt === "3"
      }, common_vendor.unref(infos).zt === "3" ? {} : {}, {
        i: common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "5"
      }, common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "5" ? {} : {}, {
        j: common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "6"
      }, common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "6" ? {} : {}, {
        k: common_vendor.f(common_vendor.unref(infos).goodslist, (item, index, i0) => {
          return common_vendor.e({
            a: "305606ca-2-" + i0 + "," + ("305606ca-1-" + i0),
            b: "305606ca-1-" + i0,
            c: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              fit: "fill",
              radius: "18rpx",
              src: item.infos.cover
            }),
            d: item.infos.finenessname
          }, item.infos.finenessname ? {
            e: common_vendor.t(item.infos.finenessname)
          } : {}, {
            f: common_vendor.t(item.infos.name),
            g: common_vendor.t(item.infos.ch),
            h: common_vendor.t(item.infos.cgyname),
            i: common_vendor.t(item.infos.shopname),
            j: common_vendor.t(item.infos.price),
            k: index
          });
        }),
        l: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        m: common_vendor.unref(infos).shlx !== "4"
      }, common_vendor.unref(infos).shlx !== "4" ? {
        n: common_vendor.t(common_vendor.unref(infos).shlx == "5" ? common_vendor.unref(infos).price : common_vendor.unref(infos).bcje)
      } : {}, {
        o: common_vendor.t(common_vendor.unref(infos).shlx == "5" ? common_vendor.unref(infos).remarks : common_vendor.unref(infos).shyy),
        p: common_vendor.unref(infos).shtt !== ""
      }, common_vendor.unref(infos).shtt !== "" ? {
        q: common_vendor.f(common_vendor.unref(infos).shtt.split(","), (item1, index, i0) => {
          return {
            a: item1,
            b: index
          };
        })
      } : {}, {
        r: common_vendor.f(common_vendor.unref(order_info), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.image !== ""
          }, item.image !== "" ? {
            d: item.image
          } : {}, {
            e: index
          });
        }),
        s: common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "6" && common_vendor.unref(infos).ddlx !== "4" || common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "5" && common_vendor.unref(infos).ddlx !== "4"
      }, common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "6" && common_vendor.unref(infos).ddlx !== "4" || common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "5" && common_vendor.unref(infos).ddlx !== "4" ? {
        t: common_vendor.o(selectSX)
      } : {}) : {}, {
        v: common_vendor.unref(showSaiXuanPannel)
      }, common_vendor.unref(showSaiXuanPannel) ? {
        w: common_vendor.o(successAc),
        x: common_vendor.o(handleClose),
        y: common_vendor.p({
          infos: common_vendor.unref(infos)
        })
      } : {}, {
        z: common_vendor.sr(saiXuanPannelPopup, "305606ca-3", {
          "k": "saiXuanPannelPopup"
        }),
        A: common_vendor.o(handleClose),
        B: common_vendor.o(change),
        C: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305606ca"]]);
wx.createPage(MiniProgramPage);
