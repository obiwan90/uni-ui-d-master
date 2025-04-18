"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesFinanceDetail_api_api = require("../api/api.js");
const utils_system = require("../../utils/system.js");
const _sfc_main = {
  __name: "financeDetail",
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const lists = common_vendor.ref([]);
    const priceInfoData = common_vendor.ref([
      { text: "收款类型", value: "线下收款" },
      { text: "收款员工", value: "金克斯" },
      { text: "收款时间", value: "2024-04-27 14:55:12" },
      { text: "收款方式", value: "支付宝" }
    ]);
    const orderInfoData = common_vendor.ref([
      { text: "客户名称", value: "张三" },
      { text: "联系方式", value: "13100000000" },
      { text: "配送方式", value: "京东 123456789" },
      { text: "销售员工", value: "金克斯" },
      { text: "下单时间", value: "2024-04-27 14:55:12" },
      { text: "收货时间", value: "2024-04-27 14:55:12" },
      { text: "下单备注", value: "该商户已用支付宝收款了,该商户已用支付宝收款了，线下收款已到账,线下收款已到账,该商户已用支付宝收款了，线下收款已到账" }
    ]);
    const priceInfoDataFilter = (item) => {
      console.log("item", item);
      priceInfoData.value[0].value = item.sklx;
      priceInfoData.value[1].value = item.skyg;
      priceInfoData.value[2].value = item.sksj;
      priceInfoData.value[3].value = item.zffs;
      return priceInfoData.value;
    };
    const orderInfoDataFliter = (item) => {
      console.log("item", item);
      orderInfoData.value[0].value = item.khname;
      orderInfoData.value[1].value = item.khphone;
      orderInfoData.value[2].value = item.khphone;
      orderInfoData.value[3].value = item.ygname;
      orderInfoData.value[4].value = formatTimestamp(item.add_time);
      orderInfoData.value[5].value = item.sksj;
      orderInfoData.value[6].value = item.remarks;
      return orderInfoData.value;
    };
    const getFinanceDetailAc = async (id) => {
      const param = {
        id
      };
      const res = await pagesFinanceDetail_api_api.getFinanceDetail(param);
      if (res.code === "200") {
        lists.value = res.lists;
      }
    };
    function formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1e3);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const apiFinanceCheckData = async (orderId) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        orderid: orderId
      };
      const res = await pagesFinanceDetail_api_api.apiFinanceCheck(param);
      console.log("res:", res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "对账成功",
          icon: "success",
          duration: 500
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 500);
      }
    };
    const check = (orderId) => {
      apiFinanceCheckData(orderId);
    };
    common_vendor.onLoad(async (options) => {
      console.log(options);
      if (options.data) {
        const id = options.data;
        console.log("id", id);
        await getFinanceDetailAc(id);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.t(common_vendor.unref(lists)[0].sfdz === "1" ? "未对账" : "已对账"),
        c: common_vendor.o(goBack),
        d: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        g: common_vendor.f(common_vendor.unref(lists), (item, index, i0) => {
          return {
            a: common_vendor.f(item.goodslist, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.finenessname),
                b: common_vendor.t(item1.name),
                c: common_vendor.t(item1.ch),
                d: common_vendor.t(item1.cgyname),
                e: common_vendor.t(item1.ckname),
                f: common_vendor.t(item1.price),
                g: index2
              };
            }),
            b: common_vendor.t(item.num),
            c: common_vendor.t(item.price),
            d: index
          };
        }),
        h: common_vendor.f(priceInfoDataFilter(common_vendor.unref(lists)[0]), (item2, index, i0) => {
          return {
            a: common_vendor.t(item2.text),
            b: common_vendor.t(item2.value),
            c: index
          };
        }),
        i: common_vendor.t(common_vendor.unref(lists)[0].remarkss),
        j: common_vendor.unref(lists)[0].imgs.split(",").length > 0
      }, common_vendor.unref(lists)[0].imgs.split(",").length > 0 ? {
        k: common_vendor.f(common_vendor.unref(lists)[0].imgs.split(","), (item, index, i0) => {
          return {
            a: index
          };
        })
      } : {}, {
        l: common_vendor.f(orderInfoDataFliter(common_vendor.unref(lists)[0]), (item3, index, i0) => {
          return {
            a: common_vendor.t(item3.text),
            b: common_vendor.t(item3.value),
            c: index
          };
        }),
        m: common_vendor.o(($event) => check(common_vendor.unref(lists)[0].id))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22287b48"]]);
wx.createPage(MiniProgramPage);
