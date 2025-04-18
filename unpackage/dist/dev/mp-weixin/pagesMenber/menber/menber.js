"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const stores_locationStore = require("../../stores/locationStore.js");
const api_member_member = require("../../api/member/member.js");
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
  __name: "menber",
  setup(__props) {
    stores_locationStore.useLocationStore();
    common_vendor.ref([]);
    common_vendor.ref([]);
    const avatorUrl = common_vendor.ref();
    const chooseAvatar = async (e) => {
      console.log("chooseAvatar:", e);
      const uploadResult = await common_vendor.index.uploadFile({
        url: "https://www.xzxskj.com/Home/Upload/add",
        filePath: e.detail.avatarUrl,
        name: "imgs",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data2 = JSON.parse(uploadResult.data);
      if (data2.code === 200) {
        const imageUrls = data2.urls.split(",");
        avatorUrl.value = imageUrls[0];
      }
    };
    const data = common_vendor.ref([
      { name: "商家名称", value: "" },
      { name: "联系方式", value: "" },
      { name: "绑定微信", value: JSON.parse(common_vendor.index.getStorageSync("userInfo")).phone },
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
    const openLocationPicker = () => {
      console.log("打开地图");
      const location = JSON.stringify({
        latitude: form.value.latitude,
        longitude: form.value.longitude
      });
      common_vendor.index.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
      });
    };
    const updateMember = async () => {
      if (!data.value[0].value) {
        common_vendor.index.showToast({
          title: "请输入商家名称",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!data.value[1].value) {
        common_vendor.index.showToast({
          title: "请输入联系方式",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!data.value[3].value) {
        common_vendor.index.showToast({
          title: "请输入门店名称",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!data.value[4].value) {
        common_vendor.index.showToast({
          title: "请输入门店地址",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lxfs: data.value[1].value,
        name: data.value[0].value,
        shopname: data.value[3].value,
        shopadd: data.value[4].value,
        img: avatorUrl.value
      };
      try {
        const res = await api_member_member.apiUpdateUserInfo(param);
        if (res.code === 200) {
          const info = await stores_userInfoStore.useUserStore().getInfo();
          console.log("用户刷新检查:", info);
          common_vendor.index.showToast({
            title: "更新成功",
            icon: "success",
            duration: 2e3
          });
          common_vendor.index.navigateBack();
        } else if (res.code === 201) {
          common_vendor.index.showToast({
            title: "已经存在商户名称",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.index.showToast({
            title: "更新失败",
            icon: "error",
            duration: 2e3
          });
        }
        console.log(res);
      } catch (error) {
        console.error("更新失败:", error);
        common_vendor.index.showToast({
          title: "更新失败",
          icon: "error",
          duration: 2e3
        });
      }
    };
    const inputDisable = common_vendor.ref(false);
    common_vendor.onMounted(async () => {
      form.value = await stores_locationStore.useLocationStore().getForm();
      const userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      console.log("userInfo:", userInfo);
      data.value[0].value = userInfo.nik_name;
      if (userInfo.nik_name) {
        inputDisable.value = true;
      }
      data.value[1].value = userInfo.lxfs;
      data.value[3].value = userInfo.shopname;
      data.value[4].value = userInfo.shopadd;
      avatorUrl.value = userInfo.img;
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatorUrl) ? "https://www.xzxskj.com" + common_vendor.unref(avatorUrl) : "https://www.xzxskj.com/xcximg/132.jpg",
        b: common_vendor.o(chooseAvatar),
        c: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.name !== "绑定微信" && item.name !== "商家名称"
          }, item.name !== "绑定微信" && item.name !== "商家名称" ? {
            c: item.value,
            d: common_vendor.o(($event) => item.value = $event.detail.value, index)
          } : {}, {
            e: item.name === "绑定微信"
          }, item.name === "绑定微信" ? {
            f: item.value,
            g: common_vendor.o(($event) => item.value = $event.detail.value, index)
          } : {}, {
            h: item.name === "商家名称"
          }, item.name === "商家名称" ? {
            i: common_vendor.unref(inputDisable),
            j: item.value,
            k: common_vendor.o(($event) => item.value = $event.detail.value, index)
          } : {}, {
            l: item.name === "门店地址"
          }, item.name === "门店地址" ? {
            m: common_vendor.o(openLocationPicker, index)
          } : {}, {
            n: index
          });
        }),
        d: common_vendor.o(($event) => updateMember())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46252835"]]);
wx.createPage(MiniProgramPage);
