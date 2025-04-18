"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesAccount_account_api_api = require("./api/api.js");
require("../../utils/system.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uv_tabs2 + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_tabs + _easycom_z_paging + common_vendor.unref(accountShaiXuanPannel) + _easycom_uni_popup + common_vendor.unref(exportLogPannel))();
}
const accountShaiXuanPannel = () => "./components/accountShaiXuan.js";
const exportLogPannel = () => "./components/exportLog.js";
const _sfc_main = {
  __name: "account",
  setup(__props) {
    const paging = common_vendor.ref(null);
    const scroll = common_vendor.ref(true);
    const showExport = common_vendor.ref(true);
    const accountShaiXuanPopup = common_vendor.ref(null);
    const exportLogPopup = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const handleClose = () => {
      console.log("Popup is closed");
      accountShaiXuanPopup.value.close();
      exportLogPopup.value.close();
    };
    const openShaiXuan = () => {
      accountShaiXuanPopup.value.open();
    };
    const openExportLog = () => {
      showExport.value = true;
      exportLogPopup.value.open();
    };
    const change = (e) => {
      scroll.value = !e.show;
      if (!e.show) {
        showExport.value = e.show;
      }
    };
    const queryList = async (pageNo, pageSize) => {
      const classLists = from.value === "user" ? userClasslist.value : customerClasslist.value;
      const data = await apiGetBillListAc(classLists[activeTab1Index.value].lx, pageNo - 1);
      paging.value.complete(data);
    };
    const today = /* @__PURE__ */ new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const defaultYearMonth = `${year}-${month}`;
    const pickerValue = common_vendor.ref(defaultYearMonth);
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerValue.value = e.detail.value;
      paging.value.reload(true);
    };
    const userClasslist = common_vendor.ref([
      { name: "全部", lx: "1" },
      { name: "充值", lx: "2" },
      { name: "提现", lx: "3" },
      { name: "购机", lx: "4" },
      { name: "议价", lx: "5" },
      { name: "售后退款", lx: "6" },
      { name: "议价退款", lx: "7" },
      { name: "运费", lx: "8" },
      { name: "其他", lx: "9" }
    ]);
    const customerClasslist = common_vendor.ref([
      { name: "全部", lx: "1" },
      { name: "充值", lx: "2" },
      { name: "提现", lx: "3" },
      { name: "机款", lx: "4" },
      { name: "售后退款", lx: "5" },
      { name: "运费", lx: "6" },
      { name: "其他", lx: "7" }
    ]);
    const priceData = common_vendor.ref([
      { text: "钱包金额(元)", price: "125.5" },
      { text: "冻结金额(元)", price: "554" },
      { text: "可用金额(元)", price: "554" }
    ]);
    const activeTab1Index = common_vendor.ref(0);
    common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name
      }));
    });
    const uvTabs1Change = (e) => {
      console.log("标签切换触发:", e.index);
      activeTab1Index.value = e.index;
      paging.value.reload(true);
    };
    const withdrawal = () => {
      common_vendor.index.navigateTo({
        url: "/pagesWithdrawal/withdrawal/withdrawal"
      });
    };
    const sr = common_vendor.ref("");
    const zc = common_vendor.ref("");
    const apiGetBillListAc = async (lx, start) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx,
        stattime: "",
        endtime: "",
        rq: pickerValue.value,
        start
      };
      const res = await pagesAccount_account_api_api.apiGetBillList(param);
      console.log("res", res);
      if (res.code === 200) {
        sr.value = res.sr;
        zc.value = res.zc;
        return res.lists;
      }
      return [];
    };
    const from = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      console.log("页面参数:", options);
      if (options.from) {
        console.log("从页面:", options.from);
        from.value = options.from;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(priceData), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.text),
            b: item.text !== "钱包金额(元)"
          }, item.text !== "钱包金额(元)" ? {
            c: common_vendor.t(item.price)
          } : {}, {
            d: index
          });
        }),
        b: common_vendor.o(withdrawal),
        c: common_vendor.o(openShaiXuan),
        d: common_vendor.o(uvTabs1Change),
        e: common_vendor.p({
          list: common_vendor.unref(from) == "user" ? common_vendor.unref(userClasslist) : common_vendor.unref(customerClasslist),
          lineWidth: "30",
          lineColor: "linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)",
          lineHeight: "3",
          fontSize: 32,
          inactiveStyle: {
            color: "#1F1F1F",
            opacity: 0.6
          },
          activeStyle: {
            color: "#1F1F1F",
            opacity: 1,
            fontWeight: "bold"
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        f: common_vendor.t(common_vendor.unref(pickerValue).split("-")[0]),
        g: common_vendor.t(common_vendor.unref(pickerValue).split("-")[1]),
        h: common_vendor.o(onTimeChange1),
        i: common_vendor.unref(pickerValue),
        j: common_vendor.t(common_vendor.unref(sr)),
        k: common_vendor.t(common_vendor.unref(zc)),
        l: common_vendor.o(openExportLog),
        m: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.lx + "  " + item.ddh),
            b: common_vendor.t(item.pay_time),
            c: common_vendor.t(item.price),
            d: index
          };
        }),
        n: common_vendor.sr(paging, "5ba81cc7-0", {
          "k": "paging"
        }),
        o: common_vendor.o(queryList),
        p: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        q: common_vendor.p({
          ["default-page-size"]: 10,
          ["show-refresher-update-time"]: true,
          modelValue: common_vendor.unref(dataList)
        }),
        r: common_vendor.o(handleClose),
        s: common_vendor.sr(accountShaiXuanPopup, "5ba81cc7-3", {
          "k": "accountShaiXuanPopup"
        }),
        t: common_vendor.o(handleClose),
        v: common_vendor.o(change),
        w: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "bottom"
        }),
        x: common_vendor.unref(showExport)
      }, common_vendor.unref(showExport) ? {
        y: common_vendor.o(handleClose)
      } : {}, {
        z: common_vendor.sr(exportLogPopup, "5ba81cc7-5", {
          "k": "exportLogPopup"
        }),
        A: common_vendor.o(handleClose),
        B: common_vendor.o(change),
        C: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area:false"]: true,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ba81cc7"]]);
wx.createPage(MiniProgramPage);
