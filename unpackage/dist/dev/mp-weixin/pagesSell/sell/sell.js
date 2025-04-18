"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const pagesSell_api_api = require("../api/api.js");
const api_shopCard_shopCard = require("../../api/shopCard/shopCard.js");
require("../../stores/locationStore.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_count_down2 = common_vendor.resolveComponent("uv-count-down");
  (_easycom_custom_header2 + _easycom_uv_count_down2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_count_down = () => "../../uni_modules/uv-count-down/components/uv-count-down/uv-count-down.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_count_down)();
}
const _sfc_main = {
  __name: "sell",
  setup(__props) {
    const shopCarCount = common_vendor.computed(() => stores_userInfoStore.useUserStore().shopCount);
    common_vendor.ref("");
    const usinfos = common_vendor.ref();
    const infos = common_vendor.ref();
    const city = common_vendor.ref("");
    const timeData = common_vendor.ref({});
    const onChange = (e) => {
      timeData.value = e;
    };
    const data = common_vendor.ref();
    const content = common_vendor.ref([
      { key: "功能检测", value: "全好" },
      { key: "维修检测", value: "声音略小全好声音略小全好声音略" }
    ]);
    const CountdownMilliseconds = common_vendor.ref(0);
    function getCountdownMilliseconds(add_time, duration) {
      const startTime = add_time * 1e3;
      const durationMilliseconds = duration * 60 * 60 * 1e3;
      const endTime = startTime + durationMilliseconds;
      const now = Date.now();
      const countdownMilliseconds = endTime - now;
      console.log("countdownMilliseconds：", countdownMilliseconds);
      return countdownMilliseconds > 0 ? countdownMilliseconds : 0;
    }
    const call = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: data.value.phone
      });
    };
    const settlement = async () => {
      let dataParam = common_vendor.ref({
        lx: "",
        id: ""
      });
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        goodsid: infos.value.id
      };
      const res = await api_shopCard_shopCard.apiAddShopCard(param);
      if (res.code === "200") {
        stores_userInfoStore.useUserStore().shopCount = ++shopCarCount.value;
      }
      dataParam.value.lx = "2";
      dataParam.value.id = infos.value.id;
      let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
      common_vendor.index.navigateTo({
        url: "/pagesSubOrder/subOrder/subOrder?data=" + queryString
      });
    };
    const getMarketListAll = async (id) => {
      const param = {
        id
      };
      const res = await pagesSell_api_api.apigetMarketListDetail(param);
      if (res.code === "200") {
        console.log("res", res);
        content.value[0].value = res.freeinfos.functions;
        content.value[1].value = res.freeinfos.service;
        data.value = res.freeinfos;
        CountdownMilliseconds.value = getCountdownMilliseconds(res.freeinfos.add_time, res.freeinfos.duration);
        usinfos.value = res.usinfos;
        infos.value = res.infos;
        city.value = common_vendor.index.getStorageSync("locationForm").city;
      }
      console.log("market res:", res);
    };
    const shareImage = (url) => {
      const urls = (data.value.img.endsWith(",") ? data.value.img.slice(0, -1) : data.value.img).split(",");
      utils_common.previewImages(urls, url);
    };
    common_vendor.onLoad(async (options) => {
      if (options.item) {
        const item = JSON.parse(decodeURIComponent(options.item));
        await getMarketListAll(item.id);
      }
      if (options.id) {
        await getMarketListAll(options.id);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(usinfos)
      }, common_vendor.unref(usinfos) ? {
        b: "https://www.xzxskj.com" + common_vendor.unref(usinfos).img,
        c: common_vendor.t(common_vendor.unref(usinfos).nik_name)
      } : {}, {
        d: common_vendor.unref(CountdownMilliseconds) > 0
      }, common_vendor.unref(CountdownMilliseconds) > 0 ? common_vendor.e({
        e: common_vendor.unref(timeData).days > 0
      }, common_vendor.unref(timeData).days > 0 ? {
        f: common_vendor.t(common_vendor.unref(timeData).days)
      } : {}, {
        g: common_vendor.t(common_vendor.unref(timeData).hours > 10 ? common_vendor.unref(timeData).hours : "0" + common_vendor.unref(timeData).hours),
        h: common_vendor.t(common_vendor.unref(timeData).minutes),
        i: common_vendor.t(common_vendor.unref(timeData).seconds),
        j: common_vendor.o(onChange),
        k: common_vendor.p({
          time: common_vendor.unref(CountdownMilliseconds),
          format: "DD:HH:mm:ss",
          autoStart: true,
          millisecond: true
        })
      }) : {}, {
        l: common_vendor.t(common_vendor.unref(data).fullname),
        m: common_vendor.t(common_vendor.unref(data).price),
        n: common_vendor.t(common_vendor.unref(data).num),
        o: common_vendor.f(common_vendor.unref(data).img.split(","), (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => shareImage(item), index),
            c: index
          };
        }),
        p: common_vendor.t(common_vendor.unref(data).fbdz),
        q: common_vendor.o(call),
        r: common_vendor.t(common_vendor.unref(data).fineness),
        s: common_vendor.f(common_vendor.unref(content), (item, index, i0) => {
          return {
            a: common_vendor.t(item.key),
            b: common_vendor.t(item.value),
            c: index
          };
        }),
        t: common_vendor.t(common_vendor.unref(data).describes),
        v: common_vendor.o(settlement)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed1e0064"]]);
wx.createPage(MiniProgramPage);
