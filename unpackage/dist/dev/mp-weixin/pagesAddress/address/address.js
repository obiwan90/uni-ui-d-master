"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address_address = require("../../api/address/address.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const deleteAddress = (id) => {
      common_vendor.index.showModal({
        title: "是否删除地址簿？",
        success: (res) => {
          if (res.confirm) {
            delAddress(id);
            getAddressList();
          }
        }
      });
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const createAddress = () => {
      common_vendor.index.chooseAddress({
        success(res) {
          console.log(res);
          console.log(res.userName);
          console.log(res.postalCode);
          console.log(res.provinceName);
          console.log(res.cityName);
          console.log(res.countyName);
          console.log(res.detailInfo);
          console.log(res.nationalCode);
          console.log(res.telNumber);
          addAddress(res);
        }
      });
    };
    const addressList = common_vendor.ref([]);
    const getAddressList = async () => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await api_address_address.apigetAddress(data);
      if (res.zt === 1) {
        addressList.value = res.lists;
        common_vendor.index.setStorageSync("addressList", res.lists);
      }
      console.log(res);
    };
    const hasDefaultAddress = (lists) => {
      return lists.some((item) => item.zt === "1");
    };
    const addAddress = async (res) => {
      const has = hasDefaultAddress(addressList.value);
      console.log("has:", has);
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        name: res.userName,
        phone: res.telNumber,
        province: res.provinceName,
        city: res.cityName,
        area: res.countyName,
        address: res.detailInfo,
        zt: has ? "0" : "1"
      };
      const res1 = await api_address_address.apiAddAddress(data);
      if (res1.code === "200") {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2e3
        });
        getAddressList();
      }
      console.log(res1);
    };
    const delAddress = async (id) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id
      };
      const res = await api_address_address.apiDelAddress(data);
      if (res.zt === 1) {
        common_vendor.index.showToast({
          title: "删除成功",
          icon: "success",
          duration: 2e3
        });
        getAddressList();
      }
      console.log(res);
    };
    const selectedAddress = (item) => {
      console.log("from", from.value);
      if (from.value !== "") {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        prevPage.setData({ selectedAddress: item });
        common_vendor.index.navigateBack();
      }
    };
    const from = common_vendor.ref("");
    common_vendor.onShow(() => {
      getAddressList();
    });
    common_vendor.onLoad((options) => {
      if (options.from !== void 0 && options.from !== "") {
        console.log("地址选择");
        from.value = options.from;
      }
      getAddressList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addressList), (item, index, i0) => {
          return common_vendor.e({
            a: item.zt === "1"
          }, item.zt === "1" ? {} : {}, {
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.phone),
            d: common_vendor.o(($event) => selectedAddress(item), item.id),
            e: common_vendor.o(($event) => goPage("/pagesAddAddress/addAddress/addAddress?id=" + item.id), item.id),
            f: common_vendor.o(($event) => deleteAddress(item.id), item.id),
            g: common_vendor.t(item.address),
            h: item.id
          });
        }),
        b: common_vendor.o(createAddress)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7adc3243"]]);
wx.createPage(MiniProgramPage);
