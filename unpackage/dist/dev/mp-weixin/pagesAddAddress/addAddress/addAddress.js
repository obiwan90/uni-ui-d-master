"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address_address = require("../../api/address/address.js");
const stores_locationStore = require("../../stores/locationStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  _easycom_custom_header2();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
if (!Math) {
  _easycom_custom_header();
}
const key = "KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO";
const referer = "demo2";
const category = "生活服务,娱乐休闲";
const _sfc_main = {
  __name: "addAddress",
  setup(__props) {
    stores_locationStore.useLocationStore();
    const addressId = common_vendor.ref();
    const title = common_vendor.ref("新建地址");
    const data = common_vendor.ref([
      { id: "1", key: "收件人姓名", value: "" },
      { id: "2", key: "联系人电话", value: "" },
      { id: "3", key: "所在地区", value: "请选择" }
    ]);
    const form = common_vendor.ref({
      fullLocation: "",
      province: "",
      city: "",
      region: "",
      address: "",
      postCode: "",
      longitude: "",
      latitude: "",
      name: ""
    });
    const chooseLocation = requirePlugin("chooseLocation");
    const openLocationPicker = () => {
      const location = JSON.stringify({
        latitude: form.value.latitude,
        longitude: form.value.longitude
      });
      common_vendor.index.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
      });
    };
    const switch2Change = (e) => {
      addressInfos.value.zt = e.detail.value ? "1" : "0";
    };
    const save = () => {
      common_vendor.index.showModal({
        title: "确认修改地址簿？",
        success: (res) => {
          if (res.confirm) {
            addAddress();
          }
        }
      });
    };
    const addAddress = async () => {
      const list = common_vendor.index.getStorageSync("addressList");
      if (addressInfos.value.zt === "1") {
        const hasDefaultAddress = list.some((item) => item.zt === "1");
        if (hasDefaultAddress) {
          common_vendor.index.showModal({
            title: "提示",
            content: "已经拥有默认地址了",
            showCancel: false
          });
          return;
        }
      }
      const addressData = {
        id: addressInfos.value.id,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        name: data.value[0].value,
        phone: data.value[1].value,
        province: form.value.province,
        city: form.value.city,
        area: form.value.region,
        address: form.value.address,
        zt: addressInfos.value.zt
      };
      const res = await api_address_address.apiAddAddress(addressData);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success",
          duration: 2e3
        });
        common_vendor.index.navigateBack();
      }
    };
    const addressInfos = common_vendor.ref();
    const getAddressDetail = async (id) => {
      const param = { id };
      const res = await api_address_address.apigetAddressDetail(param);
      addressInfos.value = res.info;
      form.value.address = res.info.address;
      form.value.province = res.info.province;
      form.value.city = res.info.city;
      form.value.region = res.info.area;
      data.value[0].value = res.info.name;
      data.value[1].value = res.info.phone;
      data.value[2].value = res.info.province + " " + res.info.city + " " + res.info.area;
    };
    common_vendor.onMounted(async () => {
      form.value = await stores_locationStore.useLocationStore().getForm();
    });
    common_vendor.onLoad((options) => {
      if (options.id) {
        addressId.value = options.id;
        title.value = "修改地址";
        getAddressDetail(options.id);
      }
    });
    common_vendor.onShow(() => {
      const lo = chooseLocation.getLocation();
      if (lo) {
        form.value.address = lo.address;
        form.value.province = lo.province;
        form.value.city = lo.city;
        form.value.region = lo.district;
        form.value.latitude = lo.latitude.toString();
        form.value.longitude = lo.longitude.toString();
        const fullLo = [lo.province, lo.city, lo.district];
        form.value.fullLocation = fullLo.join(" ");
        form.value.name = lo.name;
        data.value[2].value = form.value.fullLocation;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(addressInfos)
      }, common_vendor.unref(addressInfos) ? {
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: item.key !== "所在地区"
          }, item.key !== "所在地区" ? {
            c: item.value,
            d: common_vendor.o(($event) => item.value = $event.detail.value, index)
          } : {
            e: common_vendor.t(item.value),
            f: common_vendor.o(openLocationPicker, index)
          }, {
            g: item.key === "所在地区"
          }, item.key === "所在地区" ? {
            h: common_vendor.o(openLocationPicker, index)
          } : {}, {
            i: index
          });
        }),
        d: common_vendor.unref(form).address,
        e: common_vendor.o(($event) => common_vendor.unref(form).address = $event.detail.value),
        f: common_vendor.unref(addressInfos).zt === "1",
        g: common_vendor.o(switch2Change),
        h: common_vendor.o(save)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b55fe42d"]]);
wx.createPage(MiniProgramPage);
