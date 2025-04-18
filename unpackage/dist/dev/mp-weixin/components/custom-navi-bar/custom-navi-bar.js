"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search_search = require("../../api/search/search.js");
const utils_debounce = require("../../utils/debounce.js");
require("../../utils/modelSearch.js");
require("../../utils/wxMapAPI.js");
require("../../stores/tokenStore.js");
const utils_system = require("../../utils/system.js");
require("../../stores/userInfoStore.js");
const stores_locationStore = require("../../stores/locationStore.js");
if (!Math) {
  qiaoSelect();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "custom-navi-bar",
  setup(__props) {
    common_vendor.ref(false);
    const searchInput = common_vendor.ref(null);
    const searchModelKey = common_vendor.ref("xhname");
    const showModelField = common_vendor.ref("xhname");
    stores_locationStore.useLocationStore();
    common_vendor.ref(0);
    common_vendor.ref([{ value: 0, text: "绵阳市" }, { value: 1, text: "四川省" }, { value: 2, text: "全国" }]);
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
      console.log(ev.detail.value);
      const [province, city, region] = ev.detail.value;
      const postCode = ev.detail.code;
      form.value = { ...form.value, province, city, region, postCode, fullLocation: `${province} ${city} ${region}` };
      console.log("form:" + JSON.stringify(form.value));
      common_vendor.index.setStorageSync("locationForm", form.value);
    };
    const pickerValue = common_vendor.computed(() => {
      return form.value.region !== "不限" ? form.value.region : form.value.city !== "不限" ? form.value.city : form.value.province !== "不限" ? form.value.province : "全国";
    });
    const handleInput = async (inputText) => {
      if (!inputText.length) {
        orgArray.value = [];
        return;
      }
      console.log("输入内容:", inputText);
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      try {
        const res = await apiSearchModelData(inputText);
      } catch (error) {
        console.error("搜索请求失败:", error);
        common_vendor.index.showToast({
          title: "搜索失败，请重试",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const debounceHandleInput = utils_debounce.debounce(handleInput, 300, true);
    const apiSearchModelData = async (word) => {
      const data = {
        word
      };
      const res = await api_search_search.apiSearchModel(data);
      if (res.code === "200") {
        orgArray.value = res.lists;
      } else {
        orgArray.value = [];
      }
      console.log("apiSearchModelData res:", res);
    };
    common_vendor.onShow(async () => {
      form.value = await stores_locationStore.useLocationStore().getForm();
    });
    common_vendor.onMounted(async () => {
      form.value = await stores_locationStore.useLocationStore().getForm();
    });
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      console.log(e);
      if (e) {
        common_vendor.index.navigateTo({
          url: "/pagesProduct/product/product?title=" + e.xhname + "&id=" + e.xhid
        });
      }
    };
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
        h: common_vendor.sr(searchInput, "3bae6397-0", {
          "k": "searchInput"
        }),
        i: common_vendor.o(selectChange),
        j: common_vendor.o(common_vendor.unref(debounceHandleInput)),
        k: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField),
          phText: "搜索关键字",
          showBorder: false
        }),
        l: common_vendor.unref(utils_system.getNavBarHeight)() + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3bae6397"]]);
wx.createComponent(Component);
