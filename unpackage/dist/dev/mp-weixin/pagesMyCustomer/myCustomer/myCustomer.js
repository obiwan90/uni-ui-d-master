"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesMyCustomer_api_api = require("../api/api.js");
const stores_locationStore = require("../../stores/locationStore.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "myCustomer",
  setup(__props) {
    const orgArray = common_vendor.ref([]);
    const searchModelKey = common_vendor.ref("phone");
    const showModelField = common_vendor.ref("phone");
    stores_locationStore.useLocationStore();
    common_vendor.ref([]);
    common_vendor.ref();
    const data = common_vendor.ref([
      { name: "客户名称", value: "" },
      { name: "联系方式", value: "" },
      { name: "绑定微信", value: "" },
      { name: "门店名称", value: "" },
      { name: "门店地址", value: "" }
    ]);
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
    common_vendor.ref(0);
    common_vendor.ref(0);
    const chooseLocation = requirePlugin("chooseLocation");
    const handleInput = (inputText) => {
      if (inputText.length > 0) {
        apiCustomerSearchData(inputText);
      }
    };
    const selectSearchChange = (e) => {
      if (e) {
        console.log("selectSearchChange e:", e);
        data.value[0].value = e.nik_name;
        data.value[1].value = e.lxfs;
        data.value[2].value = e.phone;
        data.value[3].value = e.shopname;
        data.value[4].value = e.shopadd;
      }
    };
    const apiCustomerSearchData = async (phone) => {
      const data2 = {
        phone,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: "1"
      };
      const res = await pagesMyCustomer_api_api.apiCustomerSearch(data2);
      if (res.zt === 1) {
        console.log("res:", res);
        orgArray.value = res.lists ? res.lists : [];
      }
    };
    const comfirm = () => {
      apiCustomerAddAction();
    };
    common_vendor.onMounted(async () => {
      form.value = await stores_locationStore.useLocationStore().getForm();
    });
    common_vendor.onShow(() => {
      const lo = chooseLocation.getLocation();
      console.log(lo);
      if (lo) {
        form.value.address = lo.address;
        form.value.province = lo.province;
        form.value.city = lo.city;
        form.value.region = lo.district;
        form.value.latitude = lo.latitude.toString();
        form.value.longitude = lo.longitude.toString();
        const fullLo = [];
        fullLo.push(lo.province);
        fullLo.push(lo.city);
        fullLo.push(lo.district);
        form.value.fullLocation = fullLo.join(" ");
        form.value.name = lo.name;
        data.value[4].value = form.value.address;
      }
    });
    const apiCustomerAddAction = async () => {
      const param = {
        phone: data.value[1].value,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        khname: data.value[0].value,
        shopname: data.value[3].value,
        shopadd: data.value[4].value,
        khphone: data.value[2].value
      };
      const res = await pagesMyCustomer_api_api.apiCustomerAdd(param);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2e3
        });
        common_vendor.index.navigateBack();
      }
      if (res.code === 201) {
        common_vendor.index.showToast({
          title: "已经存在客户",
          icon: "error",
          duration: 2e3
        });
      }
      console.log("res:", res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleInput),
        b: common_vendor.o(selectSearchChange),
        c: common_vendor.p({
          keyId: 2,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入客户完整电话进行搜索",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        d: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.name !== "绑定微信" && item.name !== "商家名称"
          }, item.name !== "绑定微信" && item.name !== "商家名称" ? {
            c: item.value
          } : {}, {
            d: item.name === "绑定微信"
          }, item.name === "绑定微信" ? {
            e: item.value
          } : {}, {
            f: item.name === "商家名称"
          }, item.name === "商家名称" ? {
            g: item.value
          } : {}, {
            h: index
          });
        }),
        e: common_vendor.o(comfirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8cdff1ce"]]);
wx.createPage(MiniProgramPage);
