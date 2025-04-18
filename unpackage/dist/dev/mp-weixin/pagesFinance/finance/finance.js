"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const pagesFinance_api_api = require("../api/api.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (qiaoSelect + _easycom_z_paging + common_vendor.unref(saixuanPannel) + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const saixuanPannel = () => "./components/saixuan-pannel.js";
const _sfc_main = {
  __name: "finance",
  setup(__props) {
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const saixuanPannelPopup = common_vendor.ref(null);
    const showSaiXuan = common_vendor.ref(false);
    const handleClose = () => {
      console.log("Popup is closed");
      saixuanPannelPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showSaiXuan.value = e.show;
      }
    };
    const selectSaiXuan = () => {
      showSaiXuan.value = true;
      saixuanPannelPopup.value.open();
    };
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const allSelected = common_vendor.ref(false);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiFinanceListData(pageNo - 1);
      paging.value.complete(data);
      dataList.value = dataList.value.map((item) => ({ ...item, selected: allSelected.value }));
    };
    const selectedTitileIndex = common_vendor.ref(0);
    const titleChange = common_vendor.ref([
      "未对账",
      "已对账"
    ]);
    const selectTitle = (index) => {
      selectedTitileIndex.value = index;
      paging.value.reload(true);
    };
    common_vendor.ref(0);
    common_vendor.ref([
      { value: 0, text: "串号搜索" },
      { value: 1, text: "串号搜索" },
      { value: 2, text: "串号搜索" }
    ]);
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      console.log(e);
      financeReconciliationSelectAc(e.id);
    };
    const toggleAllSelected = () => {
      allSelected.value = !allSelected.value;
      dataList.value.forEach((item) => {
        item.selected = allSelected.value;
      });
    };
    common_vendor.watch(dataList, (newList) => {
      allSelected.value = newList.every((item) => item.selected);
    }, { deep: true });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const goPath = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const selectedQuantity = common_vendor.computed(() => {
      let quantity = 0;
      dataList.value.forEach((item) => {
        if (item.selected) {
          quantity += 1;
        }
      });
      return quantity;
    });
    const selectedTotalPrice = common_vendor.computed(() => {
      let totalPrice = 0;
      dataList.value.forEach((item) => {
        if (item.selected) {
          totalPrice += parseFloat(item.price);
        }
      });
      return totalPrice.toFixed(2);
    });
    const cgyglist = common_vendor.ref([]);
    const cklist = common_vendor.ref([]);
    const xsyglist = common_vendor.ref([]);
    const skkssj = common_vendor.ref("");
    const skjssj = common_vendor.ref("");
    const ckid = common_vendor.ref("");
    const ygid = common_vendor.ref("");
    const cgid = common_vendor.ref("");
    const zffs = common_vendor.ref("");
    const apiFinanceListData = async (start) => {
      const param = {
        lx: selectedTitileIndex.value + 1,
        start: start.toString(),
        skkssj: skkssj.value,
        skjssj: skjssj.value,
        ckid: ckid.value,
        ygid: ygid.value,
        cgid: cgid.value,
        zffs: zffs.value
        //1支付宝2微信 3收款码
      };
      const res = await pagesFinance_api_api.apiFinanceList(param);
      console.log("res:", res);
      if (res.code === "200") {
        cgyglist.value = res.cgyglist;
        cklist.value = res.cklist;
        xsyglist.value = res.xsyglist;
        return res.lists;
      } else {
        return [];
      }
    };
    const apiFinanceCheckData = async (orderId) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        orderid: orderId
      };
      const res = await pagesFinance_api_api.apiFinanceCheck(param);
      console.log("res:", res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "对账成功",
          icon: "success",
          duration: 500
        });
        setTimeout(() => {
          paging.value.refresh(true);
        }, 500);
      }
    };
    const debounceCheck = utils_debounce.debounce((orderId) => {
      check(orderId);
    }, 300, true);
    const check = (orderId) => {
      apiFinanceCheckData(orderId);
    };
    const selectedConfirm = (data) => {
      console.log("selectedConfirm", data);
      skkssj.value = data["开始时间戳"];
      skjssj.value = data["结束时间戳"];
      ckid.value = data["仓库"].join(",");
      ygid.value = data["销售员工"].join(",");
      cgid.value = data["采购员工"].join(",");
      zffs.value = data["收款方式"].join(",");
      paging.value.reload(true);
    };
    const financeReconciliationSearchAc = async (search) => {
      const data = {
        lx: selectedTitileIndex.value + 1,
        //1未对账 2已对账
        start: "0",
        search
      };
      const res = await pagesFinance_api_api.financeReconciliationSearch(data);
      const result = [];
      if (res.code === "200") {
        res.lists.forEach((item) => {
          item.ch.split(",").forEach((item1) => {
            result.push(
              {
                ch: item1,
                id: item.id
              }
            );
          });
        });
      }
      orgArray.value = result;
    };
    const financeReconciliationSelectAc = async (id) => {
      const data = {
        id,
        //搜索出来返回里面的ID
        lx: selectedTitileIndex.value + 1
        //1未对账 2已对账
      };
      const res = await pagesFinance_api_api.financeReconciliationSelect(data);
      console.log("select res:", res);
      if (res.code === "200") {
        dataList.value = res.lists;
      }
    };
    const handleInput = (inputText) => {
      console.log("输入框内容:", inputText);
      if (inputText.length > 0) {
        financeReconciliationSearchAc(inputText);
      }
    };
    const batchComfirm = () => {
      const ids = dataList.value.filter((item) => item.selected).map((item) => item.id).join(", ");
      apiFinanceCheckData(ids);
    };
    common_vendor.onShow(() => {
      paging.value.refresh(false);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.f(common_vendor.unref(titleChange), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectTitle(index), index),
            c: common_vendor.unref(selectedTitileIndex) === index ? 1 : "",
            d: index
          };
        }),
        d: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        g: common_vendor.o(handleInput),
        h: common_vendor.o(selectChange),
        i: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号搜索",
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField),
          showBorder: false,
          disabled: false
        }),
        j: common_vendor.o(selectSaiXuan),
        k: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.khname),
            b: common_vendor.t(item.khphone)
          }, common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账" ? common_vendor.e({
            c: item.selected
          }, item.selected ? {} : {}, {
            d: common_vendor.o(($event) => item.selected = !item.selected, index)
          }) : {}, {
            e: common_vendor.f(item.goodslist, (item1, index2, i1) => {
              return common_vendor.e({
                a: item1.finenessname
              }, item1.finenessname ? {
                b: common_vendor.t(item1.finenessname)
              } : {}, {
                c: common_vendor.t(item1.name),
                d: common_vendor.t(item1.ch),
                e: common_vendor.t(item1.cgyname),
                f: item1.ckame
              }, item1.ckame ? {
                g: common_vendor.t(item1.ckame)
              } : {}, {
                h: common_vendor.t(item1.price),
                i: index2,
                j: common_vendor.o(($event) => goPath("/pagesFinanceDetail/financeDetail/financeDetail?data=" + item.id), index2)
              });
            }),
            f: common_vendor.t(item.ygname ? item.ygname : "线下支付 "),
            g: common_vendor.t(item.remark),
            h: common_vendor.t(item.num),
            i: common_vendor.t(item.price)
          }, common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账" ? {
            j: common_vendor.o(($event) => common_vendor.unref(debounceCheck)(item.id), index)
          } : {}, {
            k: index
          });
        }),
        l: common_vendor.t(common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)]),
        m: common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账",
        n: common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账",
        o: common_vendor.sr(paging, "45bc11b2-1", {
          "k": "paging"
        }),
        p: common_vendor.o(queryList),
        q: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        r: common_vendor.p({
          ["default-page-size"]: 20,
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        }),
        s: common_vendor.t(common_vendor.unref(selectedQuantity)),
        t: common_vendor.t(common_vendor.unref(selectedTotalPrice)),
        v: common_vendor.unref(allSelected)
      }, common_vendor.unref(allSelected) ? {} : {}, {
        w: common_vendor.o(toggleAllSelected),
        x: common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账"
      }, common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)] === "未对账" ? {
        y: common_vendor.o(batchComfirm)
      } : {}, {
        z: common_vendor.unref(showSaiXuan)
      }, common_vendor.unref(showSaiXuan) ? {
        A: common_vendor.o(selectedConfirm),
        B: common_vendor.o(handleClose),
        C: common_vendor.p({
          cgyglist: common_vendor.unref(cgyglist),
          cklist: common_vendor.unref(cklist),
          xsyglist: common_vendor.unref(xsyglist)
        })
      } : {}, {
        D: common_vendor.sr(saixuanPannelPopup, "45bc11b2-2", {
          "k": "saixuanPannelPopup"
        }),
        E: common_vendor.o(handleClose),
        F: common_vendor.o(pannelChange),
        G: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45bc11b2"]]);
wx.createPage(MiniProgramPage);
