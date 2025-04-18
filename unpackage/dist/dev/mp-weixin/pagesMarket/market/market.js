"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesMarket_api_api = require("../api/api.js");
const utils_system = require("../../utils/system.js");
require("../../stores/locationStore.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_z_paging + common_vendor.unref(settingPannel) + _easycom_uni_popup + common_vendor.unref(saixuanPannel))();
}
const settingPannel = () => "./components/settingPannel.js";
const saixuanPannel = () => "./components/saixuanPannel.js";
const _sfc_main = {
  __name: "market",
  setup(__props) {
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      await getMarket();
      paging.value.complete(marketList.value);
    };
    const showSaixuan = common_vendor.ref(false);
    const showSetting = common_vendor.ref(false);
    common_vendor.ref([
      { type: 1, name: "压缩", time: "2小时前", price: "14120", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑", Images: 2 },
      { type: 2, name: "压缩", time: "2小时前", price: "", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为", Images: 3 },
      { type: 3, name: "压缩", time: "2小时前", price: "", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为", Images: 1 },
      { type: 2, name: "压缩", time: "2小时前", price: "", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为", Images: 2 },
      { type: 2, name: "压缩", time: "2小时前", price: "", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为", Images: 1 },
      { type: 2, name: "压缩", time: "2小时前", price: "", title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为", Images: 3 }
    ]);
    const settingPopup = common_vendor.ref(null);
    const saixuanPopup = common_vendor.ref(null);
    const showPannel = common_vendor.ref(false);
    const form = common_vendor.ref({
      fullLocation: "",
      // 省市区(前端展示)
      province: "",
      // 省份编码(后端参数)
      city: "",
      // 城市编码(后端参数)
      region: "",
      // 区/县编码(后端参数)
      address: "",
      // 详细地址
      postCode: "",
      // 邮编
      longitude: "",
      // 经度
      latitude: "",
      // 纬度
      name: ""
      // 地址名称
    });
    const onRegionChange = (ev) => {
      const [province, city, region] = ev.detail.value;
      const postCode = ev.detail.code;
      form.value = { ...form.value, province, city, region, postCode, fullLocation: `${city} ${region}` };
      console.log("form:" + JSON.stringify(form.value));
    };
    const pickerValue = common_vendor.computed(() => {
      return form.value.region !== "不限" ? form.value.region : form.value.city !== "不限" ? form.value.city : form.value.province !== "不限" ? form.value.province : "全国";
    });
    const handleClose = () => {
      console.log("Popup is closed");
      settingPopup.value.close();
      saixuanPopup.value.close();
    };
    const change = (e) => {
      showPannel.value = e.show;
    };
    const openSaixuan = () => {
      showSaixuan.value = true;
      saixuanPopup.value.open();
    };
    const goPage = (type, item) => {
      const itemString = JSON.stringify(item);
      if (type === "1") {
        common_vendor.index.navigateTo({
          url: `/pagesSell/sell/sell?item=${encodeURIComponent(itemString)}`
        });
      }
      if (type === "2") {
        common_vendor.index.navigateTo({
          url: `/pagesSeeking/seeking/seeking?item=${encodeURIComponent(itemString)}`
        });
      }
    };
    const marketList = common_vendor.ref([]);
    const getMarket = async () => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesMarket_api_api.apigetMarket(data);
      if (res.code === "200") {
        marketList.value = res.lists;
      }
      console.log("market res:", res);
    };
    function formatTimestampToHours(timestamp) {
      const currentTime = Math.floor(Date.now() / 1e3);
      const timeDifference = currentTime - timestamp;
      const hours = Math.floor(timeDifference / 3600);
      if (hours < 1) {
        return "刚刚";
      } else {
        return `${hours}小时前`;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        c: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        d: common_vendor.unref(pickerValue)
      }, common_vendor.unref(pickerValue) ? {
        e: common_vendor.t(common_vendor.unref(pickerValue))
      } : {}, {
        f: common_vendor.o(onRegionChange),
        g: common_vendor.unref(pickerValue),
        h: common_vendor.o(openSaixuan),
        i: common_vendor.unref(marketList)
      }, common_vendor.unref(marketList) ? {
        j: common_vendor.f(common_vendor.unref(marketList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.username),
            b: common_vendor.t(formatTimestampToHours(parseInt(item.add_time))),
            c: item.type === 1
          }, item.type === 1 ? {} : {}, {
            d: item.type === 2
          }, item.type === 2 ? {} : {}, {
            e: item.type === 3
          }, item.type === 3 ? {} : {}, {
            f: common_vendor.t(item.fineness),
            g: item.type === 1
          }, item.type === 1 ? {
            h: common_vendor.t(item.price)
          } : {}, {
            i: item.type === 2
          }, item.type === 2 ? {} : {}, {
            j: common_vendor.t(item.fullname),
            k: common_vendor.f(item.img.split(",").slice(0, 3), (item1, index2, i1) => {
              return {
                a: item1,
                b: index2
              };
            }),
            l: common_vendor.o(($event) => goPage(item.type, item), index),
            m: index
          });
        })
      } : {}, {
        k: common_vendor.sr(paging, "cc9b9d8c-0", {
          "k": "paging"
        }),
        l: common_vendor.o(queryList),
        m: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        n: common_vendor.p({
          fixed: false,
          ["loading-more-custom-style"]: {
            "background": "#f3f2f6"
          },
          ["default-page-size"]: 10,
          modelValue: common_vendor.unref(dataList)
        }),
        o: common_vendor.unref(showSetting)
      }, common_vendor.unref(showSetting) ? {
        p: common_vendor.o(handleClose)
      } : {}, {
        q: common_vendor.sr(settingPopup, "cc9b9d8c-1", {
          "k": "settingPopup"
        }),
        r: common_vendor.o(handleClose),
        s: common_vendor.o(change),
        t: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: false,
          ["safe-area:false"]: true,
          type: "center"
        }),
        v: common_vendor.unref(showSaixuan)
      }, common_vendor.unref(showSaixuan) ? {
        w: common_vendor.o(handleClose)
      } : {}, {
        x: common_vendor.sr(saixuanPopup, "cc9b9d8c-3", {
          "k": "saixuanPopup"
        }),
        y: common_vendor.o(handleClose),
        z: common_vendor.o(change),
        A: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc9b9d8c"]]);
wx.createPage(MiniProgramPage);
