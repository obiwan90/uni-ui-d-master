"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
const utils_system = require("../../utils/system.js");
const api_product_product = require("../../api/product/product.js");
const stores_locationStore = require("../../stores/locationStore.js");
const stores_tabStore = require("../../stores/tabStore.js");
const utils_debounce = require("../../utils/debounce.js");
if (!Array) {
  const _component_transition_group = common_vendor.resolveComponent("transition-group");
  const _easycom_custom_shop_tabbar2 = common_vendor.resolveComponent("custom-shop-tabbar");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_transition_group + _easycom_custom_shop_tabbar2 + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_custom_shop_tabbar = () => "../../components/custom-shop-tabbar/custom-shop-tabbar.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (common_vendor.unref(productCard) + _easycom_custom_shop_tabbar + _easycom_z_paging + common_vendor.unref(saiXuanPannel) + _easycom_uni_popup + common_vendor.unref(jixingPannel) + common_vendor.unref(productEditPrice))();
}
const jixingPannel = () => "./components/jixing.js";
const saiXuanPannel = () => "./components/saixuan.js";
const productCard = () => "./components/productCard.js";
const productEditPrice = () => "./components/productEditPrice.js";
const _sfc_main = {
  __name: "product",
  setup(__props) {
    const goBack = () => common_vendor.index.navigateBack();
    const fetchData = async () => {
      try {
        filterList.value = [];
        colorItems.value = [];
        const res = await api_product_product.apiGetProductFilterList({ ModelID: param.value.ModelID });
        if (res.code === "200") {
          setupFilterData(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const setupFilterData = (res) => {
      const categories = [
        { name: "系统", id: "3", items: [{ id: "1", name: "苹果" }, { id: "2", name: "安卓" }] },
        { name: "分类", id: "1", items: res.classlist },
        { name: "品牌", id: "2", items: res.brandlist },
        { name: "资检渠道", id: "9", items: createZJQDList() },
        { name: "成色", id: "6", items: res.finenesslist },
        { name: "内存", id: "7", items: res.memorylist },
        { name: "颜色", id: "8", items: res.colourlist },
        { name: "版本", id: "5", items: res.versionlist },
        { name: "价格", id: "4", items: createPriceList() },
        { name: "其他", id: "10", items: createOtherList() }
      ];
      if (param.value.ModelID) {
        const filteredCategories = [
          { name: "资检渠道", id: "9", items: createZJQDList() },
          { name: "成色", id: "6", items: res.finenesslist },
          { name: "内存", id: "7", items: res.memorylist },
          { name: "颜色", id: "8", items: res.colourlist },
          { name: "版本", id: "5", items: res.versionlist },
          { name: "价格", id: "4", items: createPriceList() }
        ];
        filterList.value = filteredCategories.map((category) => ({
          ...category,
          items: category.items.map((item) => ({ ...item, selected: false }))
        }));
      } else {
        filterList.value = categories.map((category) => ({
          ...category,
          items: category.items.map((item) => ({ ...item, selected: false }))
        }));
      }
      colorItems.value = res.colourlist.map((item) => ({ ...item, selected: false }));
    };
    const filterList = common_vendor.ref([]);
    const colorItems = common_vendor.ref([]);
    const dataList = common_vendor.ref([]);
    const createPriceList = () => [
      { id: "1", name: "0-1000" },
      { id: "2", name: "1001-2000" },
      { id: "3", name: "2001-3000" },
      { id: "4", name: "3001-4000" },
      { id: "5", name: "4001-5000" },
      { id: "6", name: "5000以上" }
    ];
    const createZJQDList = () => [
      { id: "1", name: "官方质检" },
      { id: "2", name: "授权质检" },
      { id: "3", name: "自由货源" }
    ];
    const createOtherList = () => [
      { id: "1", name: "只看特价" },
      { id: "2", name: "只看折叠" }
    ];
    const showSetting = common_vendor.computed(() => stores_menuPermissionStore.usePermissionStore().hasMenuAuthority("updategoods") && common_vendor.index.getStorageSync("adminId") !== "");
    const showJiXing = common_vendor.ref(false);
    const showProductEditPrice = common_vendor.ref(false);
    const showSaiXuanPannel = common_vendor.ref(true);
    common_vendor.ref("");
    const paging = common_vendor.ref(null);
    const searchInput = common_vendor.ref("");
    const isAscending = common_vendor.ref(true);
    const jixingPopup = common_vendor.ref(null);
    const saiXuanPannelPopup = common_vendor.ref(null);
    const productEditPricePopup = common_vendor.ref(null);
    const selectedGood = common_vendor.ref();
    const pickerMemberValue = common_vendor.ref();
    const positionArray = common_vendor.ref(["最新上架", "距离最优"]);
    const title = common_vendor.ref("");
    const form = common_vendor.ref({
      fullLocation: "",
      province: "",
      city: "",
      region: "",
      postCode: "",
      longitude: "",
      latitude: "",
      name: ""
    });
    const param = common_vendor.ref({
      brandid: "",
      classid: "",
      colourid: "",
      delivery: "",
      finenessid: "",
      gd: "",
      memoryid: "",
      newarrivals: "",
      price: "",
      pricesdesc: "",
      sftj: "",
      sfzd: "",
      start: "",
      systemid: "",
      versionid: "",
      ModelID: ""
    });
    const pickerValue = common_vendor.computed(() => {
      return form.value.region !== "不限" ? form.value.region : form.value.city !== "不限" ? form.value.city : form.value.province !== "不限" ? form.value.province : "全国";
    });
    const queryList = async (pageNo, pageSize) => {
      param.value.start = pageNo - 1;
      const dataPromise = apiGetProductFilterDataAc(param);
      const data = await dataPromise;
      paging.value.complete(data);
    };
    const reload4Jx = (selected, selectedTabs) => {
      console.log("selected", selected);
      console.log("selectedTabs", selectedTabs);
      if (selected.length > 0 || selectedTabs.size) {
        const selectedIds = selected.map((item) => item.id);
        updateFilterParams(selectedTabs, selectedIds, selected);
      } else {
        console.log("重置了？");
        param.value.ModelID = "";
        param.value.sfzd = "";
        param.value.sftj = "";
        title.value = "商品列表";
      }
      paging.value.reload(true);
      fetchData();
    };
    const updateFilterParams = (selectedTabs, selectedIds, selected) => {
      param.value.ModelID = selectedTabs.has("全部机型") ? "" : selectedIds.join(",");
      param.value.sfzd = selectedTabs.has("折叠机型") ? "1" : "";
      param.value.sftj = selectedTabs.has("特价机型") ? "1" : "";
      title.value = selectedTabs.size === 1 || selected.length > 1 ? "商品列表" : selected[0].xhname;
    };
    const reLoad = (data) => {
      if (data) {
        console.log("param.value", param.value);
        console.log("data.value", data);
        param.value = { ...param.value, ...data };
        console.log("param.value", param.value);
      }
      paging.value.reload(true);
    };
    const onRegionChange = (ev) => {
      const [province, city, region] = ev.detail.value;
      form.value = { ...form.value, province, city, region, fullLocation: `${province} ${city} ${region}` };
      param.value.delivery = `${province},${city},${region}`;
      paging.value.reload(true);
    };
    const onSelectChange = (e) => {
      pickerMemberValue.value = positionArray.value[e.detail.value];
      param.value.newarrivals = e.detail.value === 0 ? "1" : "2";
      param.value.pricesdesc = "";
      paging.value.reload(true);
    };
    const selectPricesDesc = () => {
      isAscending.value = !isAscending.value;
      param.value.pricesdesc = isAscending.value ? "1" : "2";
      param.value.newarrivals = "";
      paging.value.reload(true);
    };
    const showLoading = () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
    };
    const hideLoading = () => {
      common_vendor.index.hideLoading();
    };
    const selectJX = utils_debounce.debounce(() => {
      showLoading();
      showJiXing.value = true;
      jixingPopup.value.open();
      setTimeout(() => hideLoading(), 800);
    }, 1e3, true);
    const selectSX = utils_debounce.debounce(() => {
      showLoading();
      showSaiXuanPannel.value = true;
      saiXuanPannelPopup.value.open();
      setTimeout(() => hideLoading(), 800);
    }, 1e3, true);
    const openEditPannel = (goodData) => {
      selectedGood.value = goodData;
      showProductEditPrice.value = true;
      productEditPricePopup.value.open();
    };
    const handleClose = () => {
      saiXuanPannelPopup.value.close();
      jixingPopup.value.close();
      productEditPricePopup.value.close();
    };
    common_vendor.onLoad(async (options) => {
      form.value = await stores_locationStore.useLocationStore().getForm();
      Object.assign(param.value, {
        ModelID: options.id || "",
        sftj: options.sftj || "",
        sfzd: options.sfzd || "",
        classid: options.classid || "",
        newarrivals: options.newarrivals || ""
      });
      title.value = options.title || "商品列表";
      param.value.delivery = `${form.value.province},${form.value.city},${form.value.region}`;
      fetchData();
    });
    common_vendor.onShow(() => {
      stores_menuPermissionStore.usePermissionStore().loadMenuAuthority();
      stores_tabStore.useTabStore().setCurrentTabIndex(0);
    });
    const apiGetProductFilterDataAc = async (param2) => {
      const res = await api_product_product.apiGetProductFilterData(param2.value);
      if (res.code !== "200")
        return [];
      const goodList = res.goodslists;
      const adminId = common_vendor.index.getStorageSync("adminId");
      const selectedMine = common_vendor.index.getStorageSync("selectedMine");
      const identityData = common_vendor.index.getStorageSync("identityData");
      if (adminId && selectedMine && identityData) {
        const selectedIdentity = identityData[selectedMine];
        return goodList.map((good) => ({
          ...good,
          mineCompany: good.gsid === selectedIdentity.gsid
        }));
      }
      return goodList;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.t(common_vendor.unref(title)),
        d: common_vendor.o(goBack),
        e: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        f: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        g: common_vendor.unref(searchInput),
        h: common_vendor.o(($event) => common_vendor.isRef(searchInput) ? searchInput.value = $event.detail.value : null),
        i: common_vendor.unref(pickerValue)
      }, common_vendor.unref(pickerValue) ? {
        j: common_vendor.t(common_vendor.unref(pickerValue))
      } : {}, {
        k: common_vendor.o(onRegionChange),
        l: common_vendor.unref(pickerValue),
        m: common_vendor.unref(positionArray),
        n: common_vendor.o(onSelectChange),
        o: common_vendor.unref(pickerMemberValue),
        p: common_vendor.o((...args) => common_vendor.unref(selectJX) && common_vendor.unref(selectJX)(...args)),
        q: common_vendor.unref(isAscending)
      }, common_vendor.unref(isAscending) ? {
        r: !common_vendor.unref(isAscending) ? 1 : ""
      } : {}, {
        s: !common_vendor.unref(isAscending)
      }, !common_vendor.unref(isAscending) ? {
        t: !common_vendor.unref(isAscending) ? 1 : ""
      } : {}, {
        v: !common_vendor.unref(isAscending)
      }, !common_vendor.unref(isAscending) ? {
        w: !common_vendor.unref(isAscending) ? 1 : ""
      } : {}, {
        x: common_vendor.unref(isAscending)
      }, common_vendor.unref(isAscending) ? {
        y: !common_vendor.unref(isAscending) ? 1 : ""
      } : {}, {
        z: common_vendor.p({
          name: "flip"
        }),
        A: common_vendor.o(selectPricesDesc),
        B: common_vendor.o((...args) => common_vendor.unref(selectSX) && common_vendor.unref(selectSX)(...args)),
        C: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.o(openEditPannel, index),
            b: index,
            c: "2589091e-2-" + i0 + ",2589091e-0",
            d: common_vendor.p({
              showSetting: common_vendor.unref(showSetting),
              good: item
            })
          };
        }),
        D: common_vendor.sr(paging, "2589091e-0", {
          "k": "paging"
        }),
        E: common_vendor.o(queryList),
        F: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        G: common_vendor.p({
          ["default-page-size"]: 20,
          ["show-refresher-update-time"]: true,
          modelValue: common_vendor.unref(dataList)
        }),
        H: common_vendor.unref(showSaiXuanPannel)
      }, common_vendor.unref(showSaiXuanPannel) ? {
        I: common_vendor.o(reLoad),
        J: common_vendor.o(handleClose),
        K: common_vendor.p({
          filterList: common_vendor.unref(filterList),
          colorItems: common_vendor.unref(colorItems)
        })
      } : {}, {
        L: common_vendor.sr(saiXuanPannelPopup, "2589091e-4", {
          "k": "saiXuanPannelPopup"
        }),
        M: common_vendor.o(handleClose),
        N: common_vendor.o(_ctx.change),
        O: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        P: common_vendor.unref(showJiXing)
      }, common_vendor.unref(showJiXing) ? {
        Q: common_vendor.sr("jixingPannelRef", "2589091e-7,2589091e-6"),
        R: common_vendor.o(reload4Jx),
        S: common_vendor.o(handleClose),
        T: common_vendor.p({
          modelId: common_vendor.unref(param).ModelID
        })
      } : {}, {
        U: common_vendor.sr(jixingPopup, "2589091e-6", {
          "k": "jixingPopup"
        }),
        V: common_vendor.o(handleClose),
        W: common_vendor.o(_ctx.change),
        X: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        Y: common_vendor.unref(showProductEditPrice)
      }, common_vendor.unref(showProductEditPrice) ? {
        Z: common_vendor.o(reLoad),
        aa: common_vendor.o(handleClose),
        ab: common_vendor.p({
          selectedGood: common_vendor.unref(selectedGood)
        })
      } : {}, {
        ac: common_vendor.sr(productEditPricePopup, "2589091e-8", {
          "k": "productEditPricePopup"
        }),
        ad: common_vendor.o(handleClose),
        ae: common_vendor.o(_ctx.change),
        af: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2589091e"]]);
wx.createPage(MiniProgramPage);
