"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const utils_common = require("../../utils/common.js");
const pagesCustomServiceOrderDetail_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_alert2 = common_vendor.resolveComponent("uv-alert");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uv_alert2 + _component_van_loading + _component_van_image + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_alert = () => "../../uni_modules/uv-alert/components/uv-alert/uv-alert.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_alert + common_vendor.unref(userServicePannel) + _easycom_uni_popup)();
}
const userServicePannel = () => "./components/userServicePannel.js";
const _sfc_main = {
  __name: "customServiceOrderDetail",
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
    const btns = common_vendor.ref([
      { shlx: "1", tyzt: "0", btnLeft: "驳回售后", btnRight: "同意补差", btnCenter: "" },
      { shlx: "2", tyzt: "0", btnLeft: "驳回售后", btnRight: "同意售后", btnCenter: "" },
      //6
      { shlx: "2", tyzt: "4", btnLeft: "驳回售后", btnRight: "已收到货,同意退款", btnCenter: "" },
      { shlx: "4", tyzt: "0", btnLeft: "驳回售后", btnRight: "同意售后", btnCenter: "" },
      //5
      { shlx: "4", tyzt: "5", btnLeft: "驳回售后", btnRight: "售后完成,预约快递", btnCenter: "" },
      { shlx: "5", tyzt: "0", btnLeft: "驳回售后", btnRight: "同意退款", btnCenter: "" }
    ]);
    const lxs = common_vendor.ref([
      { name: "驳回售后", lx: "7" },
      { name: "同意补差", lx: "2" },
      { name: "同意售后", lx: "3" },
      { name: "已收到货,同意退款", lx: "4" },
      { name: "售后完成,预约快递", lx: "5" },
      { name: "预约快递", lx: "6" },
      { name: "同意退款", lx: "8" }
    ]);
    const lx = common_vendor.ref();
    const handleBtnClick = () => {
      common_vendor.index.navigateTo({
        url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息"
      });
    };
    const apiGetCustomServiceOrderDetailAc = async () => {
      const param = {
        lx: orderItem.value.lx,
        id: orderItem.value.id
      };
      const res = await pagesCustomServiceOrderDetail_api_api.apiGetCustomServiceOrderDetail(param);
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
    const apiCustomServiceOrderOperationAc = async (lx2) => {
      const param = {
        id: orderItem.value.id,
        lx: lx2
        // 2同意补差3同意售后4已收到货同意退款5售后完成预约快递6预约快递
      };
      try {
        const res = await pagesCustomServiceOrderDetail_api_api.apiCustomServiceOrderOperation(param);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "操作成功",
            icon: "success",
            duration: 2e3
          });
          setTimeout(() => {
            apiGetCustomServiceOrderDetailAc();
          }, 500);
        } else if (res.code === 201) {
          common_vendor.index.showToast({
            title: "请勿重复操作",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: res.msg || "操作失败",
            icon: "none",
            duration: 2e3
          });
        }
        return res;
      } catch (error) {
        console.error("请求出错:", error);
        common_vendor.index.showToast({
          title: "请求出错，请稍后再试",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const getLxValue = (btnName) => {
      const found = lxs.value.find((item) => item.name === btnName);
      return found ? found.lx : null;
    };
    const handleClickDebounce = utils_debounce.debounce((flag) => {
      handleClick(flag);
    }, 300, true);
    const handleClick = async (flag) => {
      var _a, _b;
      let buttonName = "";
      switch (flag) {
        case "left":
          buttonName = ((_a = getButtonLabels(infos.value.shlx, infos.value.tyzt)) == null ? void 0 : _a.btnLeft) || "";
          break;
        case "right":
          buttonName = ((_b = getButtonLabels(infos.value.shlx, infos.value.tyzt)) == null ? void 0 : _b.btnRight) || "";
          break;
        case "center":
          buttonName = "同意售后";
          break;
        default:
          return;
      }
      if (buttonName) {
        lx.value = getLxValue(buttonName);
        console.log("lx.value", lx.value);
      } else {
        common_vendor.index.showToast({
          title: "参数错误",
          icon: "none",
          duration: 2e3
        });
        console.error(`未找到对应的按钮名称，flag: ${flag}, infos.shlx: ${infos.value.shlx}, infos.tyzt: ${infos.value.tyzt}`);
        return;
      }
      if (lx.value) {
        if (lx.value === "5") {
          selectSX();
        } else {
          await apiCustomServiceOrderOperationAc(lx.value);
        }
      }
    };
    const getButtonLabels = (shlx, tyzt) => {
      const btn = btns.value.find((button) => button.shlx === shlx && button.tyzt === tyzt);
      if (btn) {
        return {
          btnLeft: btn.btnLeft,
          btnRight: btn.btnRight
        };
      } else {
        return null;
      }
    };
    const successAc = async (data) => {
      apiCustomServiceOrderOperationAc(lx.value).then((res) => {
        if (res.code === 200)
          subExpress(data.expressid, data.id);
      });
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
      const res = await pagesCustomServiceOrderDetail_api_api.apiOrderJdLogistics(data);
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
      const res = await pagesCustomServiceOrderDetail_api_api.apiOrderSfLogistics(data);
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
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.unref(infos)
      }, common_vendor.unref(infos) ? common_vendor.e({
        b: common_vendor.unref(infos).cwshinfos && common_vendor.unref(infos).cwshinfos.zt == "1"
      }, common_vendor.unref(infos).cwshinfos && common_vendor.unref(infos).cwshinfos.zt == "1" ? {
        c: common_vendor.p({
          type: "warning",
          description: "等待审核",
          closable: true
        })
      } : {}, {
        d: common_vendor.unref(infos).shlx === "5"
      }, common_vendor.unref(infos).shlx === "5" ? {} : {}, {
        e: common_vendor.unref(infos).shlx === "1"
      }, common_vendor.unref(infos).shlx === "1" ? {} : {}, {
        f: common_vendor.unref(infos).shlx === "2"
      }, common_vendor.unref(infos).shlx === "2" ? {} : {}, {
        g: common_vendor.unref(infos).shlx === "4"
      }, common_vendor.unref(infos).shlx === "4" ? {} : {}, {
        h: common_vendor.unref(infos).zt === "2"
      }, common_vendor.unref(infos).zt === "2" ? {} : {}, {
        i: common_vendor.unref(infos).zt === "3"
      }, common_vendor.unref(infos).zt === "3" ? {} : {}, {
        j: common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "3"
      }, common_vendor.unref(infos).shlx === "2" && common_vendor.unref(infos).tyzt === "3" ? {
        k: common_vendor.o(handleBtnClick)
      } : {}, {
        l: common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "3"
      }, common_vendor.unref(infos).shlx === "4" && common_vendor.unref(infos).tyzt === "3" ? {
        m: common_vendor.o(handleBtnClick)
      } : {}, {
        n: common_vendor.f(common_vendor.unref(infos).goodslist, (item, index, i0) => {
          return common_vendor.e({
            a: "ffd46b0a-3-" + i0 + "," + ("ffd46b0a-2-" + i0),
            b: "ffd46b0a-2-" + i0,
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
        o: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        p: common_vendor.unref(infos).shlx !== "4"
      }, common_vendor.unref(infos).shlx !== "4" ? {
        q: common_vendor.t(common_vendor.unref(infos).bcje)
      } : {}, {
        r: common_vendor.t(common_vendor.unref(infos).shyy),
        s: common_vendor.unref(infos).shtt !== ""
      }, common_vendor.unref(infos).shtt !== "" ? {
        t: common_vendor.f(common_vendor.unref(infos).shtt.split(","), (item1, index, i0) => {
          return common_vendor.e({
            a: item1
          }, item1 ? {
            b: item1
          } : {}, {
            c: index
          });
        })
      } : {}, {
        v: common_vendor.f(common_vendor.unref(order_info), (item, index, i0) => {
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
        w: common_vendor.unref(infos).zt !== "2"
      }, common_vendor.unref(infos).zt !== "2" ? common_vendor.e({
        x: common_vendor.unref(infos).zt !== "3"
      }, common_vendor.unref(infos).zt !== "3" ? {
        y: common_vendor.t(((_a = getButtonLabels(common_vendor.unref(infos).shlx, common_vendor.unref(infos).tyzt)) == null ? void 0 : _a.btnLeft) || ""),
        z: common_vendor.o(($event) => common_vendor.unref(handleClickDebounce)("left")),
        A: common_vendor.t(((_b = getButtonLabels(common_vendor.unref(infos).shlx, common_vendor.unref(infos).tyzt)) == null ? void 0 : _b.btnRight) || ""),
        B: common_vendor.o(($event) => common_vendor.unref(handleClickDebounce)("right"))
      } : {
        C: common_vendor.o(($event) => common_vendor.unref(handleClickDebounce)("center"))
      }) : {}) : {}, {
        D: common_vendor.unref(showSaiXuanPannel)
      }, common_vendor.unref(showSaiXuanPannel) ? {
        E: common_vendor.o(successAc),
        F: common_vendor.o(handleClose),
        G: common_vendor.p({
          infos: common_vendor.unref(infos)
        })
      } : {}, {
        H: common_vendor.sr(saiXuanPannelPopup, "ffd46b0a-4", {
          "k": "saiXuanPannelPopup"
        }),
        I: common_vendor.o(handleClose),
        J: common_vendor.o(change),
        K: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ffd46b0a"]]);
wx.createPage(MiniProgramPage);
