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
  __name: "yjOrderDetail",
  setup(__props) {
    const orderInfo = common_vendor.ref();
    const tipData = common_vendor.ref([
      { zt: "2", text: "议价成功后默认购买成功,等待发货" },
      { zt: "3", text: "议价成功等待发货" },
      { zt: "4", text: "" }
    ]);
    const getTipText = (zt) => {
      const item = tipData.value.find((item2) => {
        return item2.zt === zt.toString();
      });
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
    const btnData = common_vendor.ref([
      { zt: "2", btns: [] },
      { zt: "3", btns: [
        { text: "联系客服", image: "https://www.xzxskj.com/xcximg/icon_kefu@3x.png" },
        { text: "催发货", image: "https://www.xzxskj.com/xcximg/icon_cuifahuo@3x.png" }
      ] },
      { zt: "4", btns: [] }
    ]);
    const getBtns = (zt) => {
      const btnItem = btnData.value.find((item) => item.zt === zt);
      return btnItem ? btnItem.btns : [];
    };
    common_vendor.ref([
      { image: "https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png", value: "顺丰" },
      { image: "https://www.xzxskj.com/xcximg/icon_jingdong@3x.png", value: "京东" },
      { image: "https://www.xzxskj.com/xcximg/icon_songhuo@3x.png", value: "送货上门" },
      { image: "https://www.xzxskj.com/xcximg/icon_ziti@3x.png", value: "自提" }
    ]);
    const addressInfos = common_vendor.ref();
    const getAddressDetail = async (id) => {
      const param = { id };
      const res = await api_address_address.apigetAddressDetail(param);
      addressInfos.value = res.info;
      console.log(res);
    };
    const formatGoodsInfoTabs = (item) => {
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
    common_vendor.onMounted(async () => {
      const itemString = common_vendor.index.getStorageSync("orderDetailItem");
      console.log("itemString:", itemString);
      if (itemString) {
        orderInfo.value = JSON.parse(itemString);
        order_info.value[0].value = "NO." + orderInfo.value.ordernumber;
        order_info.value[1].value = formatTimestamp(orderInfo.value.add_time);
        await getAddressDetail(orderInfo.value.addressid);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(getTitleText(common_vendor.unref(orderInfo).zt)),
        b: common_vendor.unref(orderInfo).zt === "2"
      }, common_vendor.unref(orderInfo).zt === "2" ? {
        c: common_vendor.p({
          time: getRemainingTime(common_vendor.unref(orderInfo).pay_time, common_vendor.unref(orderInfo).bargainingtimename),
          format: "HH:mm:ss"
        })
      } : {}, {
        d: getTipText(common_vendor.unref(orderInfo).zt)
      }, getTipText(common_vendor.unref(orderInfo).zt) ? {
        e: common_vendor.t(getTipText(common_vendor.unref(orderInfo).zt))
      } : {}, {
        f: getBtns(common_vendor.unref(orderInfo).zt).length
      }, getBtns(common_vendor.unref(orderInfo).zt).length ? {
        g: common_vendor.f(getBtns(common_vendor.unref(orderInfo).zt), (btn, btnIndex, i0) => {
          return common_vendor.e({
            a: btn.image,
            b: common_vendor.t(btn.text),
            c: btn.text === "联系客服"
          }, btn.text === "联系客服" ? {
            d: common_vendor.o((...args) => _ctx.onContact && _ctx.onContact(...args), btnIndex)
          } : {}, {
            e: btnIndex,
            f: common_vendor.o(($event) => _ctx.handleBtnClick(btn), btnIndex)
          });
        })
      } : {}, {
        h: common_vendor.p({
          width: "190rpx",
          height: "190rpx",
          radius: "18rpx",
          fit: "fill",
          src: common_vendor.unref(orderInfo).goodsinfos.cover
        }),
        i: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.finenessname),
        j: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.name),
        k: common_vendor.unref(orderInfo).goodsinfos.zt === "1"
      }, common_vendor.unref(orderInfo).goodsinfos.zt === "1" ? {
        l: common_vendor.t(formatGoodsInfoTabs(common_vendor.unref(orderInfo)))
      } : {
        m: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.ch)
      }, {
        n: common_vendor.t(common_vendor.unref(orderInfo).price),
        o: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos.price),
        p: common_vendor.t(common_vendor.unref(orderInfo).price),
        q: common_vendor.o((...args) => _ctx.openRule && _ctx.openRule(...args)),
        r: common_vendor.unref(orderInfo).lx !== "1"
      }, common_vendor.unref(orderInfo).lx !== "1" ? {} : {}, {
        s: common_vendor.t(common_vendor.unref(orderInfo).price),
        t: common_vendor.unref(addressInfos)
      }, common_vendor.unref(addressInfos) ? {
        v: common_vendor.t(common_vendor.unref(addressInfos).province),
        w: common_vendor.t(common_vendor.unref(addressInfos).city),
        x: common_vendor.t(common_vendor.unref(addressInfos).area),
        y: common_vendor.t(common_vendor.unref(addressInfos).address),
        z: common_vendor.t(common_vendor.unref(addressInfos).name),
        A: common_vendor.t(common_vendor.unref(addressInfos).phone)
      } : {}, {
        B: common_vendor.t(common_vendor.unref(orderInfo).remarks),
        C: common_vendor.f(getFilteredOrderInfo(common_vendor.unref(orderInfo).zt), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.image
          }, item.image ? {
            d: item.image
          } : {}, {
            e: index
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cbd4a7d3"]]);
wx.createPage(MiniProgramPage);
