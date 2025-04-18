"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address_address = require("../../api/address/address.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_count_down2 = common_vendor.resolveComponent("uv-count-down");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  (_easycom_custom_header2 + _easycom_uv_count_down2 + _component_van_image)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_count_down = () => "../../uni_modules/uv-count-down/components/uv-count-down/uv-count-down.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_count_down)();
}
const _sfc_main = {
  __name: "customYjOrderDetail",
  setup(__props) {
    const orderInfo = common_vendor.ref();
    const tipData = common_vendor.ref([
      { zt: "2", text: "请在倒计时完成前确认订单,时间结束将默认取消订单" },
      { zt: "3", text: "" },
      { zt: "4", text: "" }
    ]);
    const getTipText = (zt) => {
      console.log("getTipText zt:", zt);
      const item = tipData.value.find((item2) => {
        return item2.zt === zt.toString();
      });
      console.log("item:", item);
      return item ? item.text : "";
    };
    const getRemainingTime = (addTime, bargainingTimeName) => {
      console.log("addTime:", addTime);
      console.log("bargainingTimeName:", bargainingTimeName);
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      const bargainingEndTime = new Date(parseInt(addTime) * 1e3 + parseInt(bargainingTimeName) * 3600 * 1e3);
      const remainingTime = bargainingEndTime.getTime() - currentTime;
      return remainingTime;
    };
    const titleText = common_vendor.ref([
      { zt: "2", text: "等待确认议价" },
      { zt: "3", text: "议价成功等待发货" },
      { zt: "4", text: "议价失败" }
    ]);
    const getTitleText = (zt) => {
      console.log("zt:", zt);
      const item = titleText.value.find((item2) => {
        return item2.zt === zt.toString();
      });
      return item ? item.text : "";
    };
    common_vendor.ref([
      { zt: "2", btns: [] },
      { zt: "3", btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "催发货", image: "https://www.xzxskj.com/xcximg/icon_cuifahuo@3x.png" }
      ] },
      { zt: "4", btns: [] }
    ]);
    const addressInfos = common_vendor.ref();
    const getAddressDetail = async (id) => {
      const param = { id };
      const res = await api_address_address.apigetAddressDetail(param);
      addressInfos.value = res.info;
      console.log(res);
    };
    const order_info = common_vendor.ref([
      { name: "订单号", value: "NO.202303281234", image: "https://www.xzxskj.com/xcximg/icon_copy@3x.png", zt: ["2", "3", "4"] },
      { name: "议价时间", value: "", image: "", zt: ["2", "3", "4"] },
      { name: "议价成功", value: "", image: "", zt: ["3"] },
      { name: "议价失败", value: "2024-03-12 15:00:00", image: "", zt: ["4"] }
    ]);
    const getFilteredOrderInfo = (zt) => {
      return order_info.value.filter((item) => item.zt.includes(zt));
    };
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
    common_vendor.onMounted(() => {
      console.log("onMounted success");
      const itemString = common_vendor.index.getStorageSync("orderDetailItem");
      if (itemString) {
        orderInfo.value = JSON.parse(itemString);
        console.log("orderInfo.value：", orderInfo.value);
        order_info.value[0].value = "NO." + orderInfo.value.ordernumber;
        order_info.value[1].value = formatTimestamp(orderInfo.value.add_time);
        getAddressDetail(orderInfo.value.addressid);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        b: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        c: common_vendor.t(getTitleText(common_vendor.unref(orderInfo).zt)),
        d: common_vendor.unref(orderInfo).zt === "2"
      }, common_vendor.unref(orderInfo).zt === "2" ? {
        e: common_vendor.p({
          time: getRemainingTime(common_vendor.unref(orderInfo).pay_time, common_vendor.unref(orderInfo).bargainingtimename),
          format: "HH:mm:ss"
        })
      } : {}) : {}, {
        f: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? {
        g: common_vendor.t(getTipText(common_vendor.unref(orderInfo).zt))
      } : {}, {
        h: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        i: common_vendor.p({
          width: "190rpx",
          height: "190rpx",
          radius: "18rpx",
          fit: "fill",
          src: common_vendor.unref(orderInfo).goodsinfos.cover
        }),
        j: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.finenessname),
        k: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.name),
        l: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.ch),
        m: common_vendor.unref(orderInfo).goodsinfos.cgyname
      }, common_vendor.unref(orderInfo).goodsinfos.cgyname ? {
        n: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.cgyname)
      } : {}, {
        o: common_vendor.unref(orderInfo).goodsinfos.ckame
      }, common_vendor.unref(orderInfo).goodsinfos.ckame ? {
        p: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.ckame)
      } : {}, {
        q: common_vendor.t(common_vendor.unref(orderInfo).price),
        r: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.price)
      }) : {}, {
        s: common_vendor.t(common_vendor.unref(orderInfo).price),
        t: common_vendor.o((...args) => _ctx.openRule && _ctx.openRule(...args)),
        v: common_vendor.unref(orderInfo).lx !== "1"
      }, common_vendor.unref(orderInfo).lx !== "1" ? {} : {}, {
        w: common_vendor.t(common_vendor.unref(orderInfo).price),
        x: common_vendor.unref(addressInfos)
      }, common_vendor.unref(addressInfos) ? {
        y: common_vendor.t(common_vendor.unref(addressInfos).province),
        z: common_vendor.t(common_vendor.unref(addressInfos).city),
        A: common_vendor.t(common_vendor.unref(addressInfos).area),
        B: common_vendor.t(common_vendor.unref(addressInfos).address),
        C: common_vendor.t(common_vendor.unref(addressInfos).name),
        D: common_vendor.t(common_vendor.unref(addressInfos).phone)
      } : {}, {
        E: common_vendor.t(common_vendor.unref(orderInfo).remarks),
        F: common_vendor.f(getFilteredOrderInfo(common_vendor.unref(orderInfo).zt), (item, index, i0) => {
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
        G: common_vendor.unref(orderInfo).zt === "2"
      }, common_vendor.unref(orderInfo).zt === "2" ? {} : {}, {
        H: common_vendor.unref(orderInfo).zt === "3"
      }, common_vendor.unref(orderInfo).zt === "3" ? {} : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e8a6bbf"]]);
wx.createPage(MiniProgramPage);
