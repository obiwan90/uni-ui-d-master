"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "settingPannel",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    let emit = __emit;
    const locationForm = common_vendor.index.getStorageSync("locationForm");
    const messageSettingStore = common_vendor.index.getStorageSync("messageSetting");
    const data = common_vendor.ref([
      { title: "receiveRange", text: "接收范围", left: "选择地区" },
      { title: "acceptRogin", text: "发布地点", left: "选择地区" },
      { title: "phone", text: "联系方式", left: "联系电话", value: "" }
    ]);
    const messageTypes = common_vendor.ref([
      "求货信息",
      "卖货信息",
      "交流信息"
    ]);
    const messageSettings = common_vendor.ref({
      messageType: messageSettingStore ? messageSettingStore.messageType : [],
      receiveRange: messageSettingStore ? messageSettingStore.receiveRange : { value: locationForm.region },
      acceptRogin: messageSettingStore ? messageSettingStore.acceptRogin : { value: locationForm.region },
      phone: messageSettingStore ? messageSettingStore.phone : JSON.parse(common_vendor.index.getStorageSync("userInfo")).phone
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const onRegionChange = (title, ev) => {
      const [province, city, region] = ev.detail.value;
      const postCode = ev.detail.code;
      if (messageSettings.value[title]) {
        messageSettings.value[title].value = region !== "不限" ? region : city !== "不限" ? city : province !== "不限" ? province : "全国";
        messageSettings.value[title].postCode = postCode;
        messageSettings.value[title].fullLocation = `${city} ${region}`;
      }
    };
    const isReadyToPublish = common_vendor.ref(false);
    const toggleMessageType = (type) => {
      const index = messageSettings.value.messageType.indexOf(type);
      if (index === -1) {
        messageSettings.value.messageType.push(type);
      } else {
        messageSettings.value.messageType.splice(index, 1);
      }
      isReadyToPublish.value = messageSettings.value.messageType.length > 0 && messageSettings.value.phone !== "";
    };
    const isSelectedMessageType = (type) => {
      return messageSettings.value.messageType.includes(type);
    };
    common_vendor.watch([() => messageSettings.value.messageType, () => messageSettings.value.phone], () => {
      console.log("触发了");
      isReadyToPublish.value = messageSettings.value.messageType.length > 0 && messageSettings.value.phone !== "";
    });
    const confirm = () => {
      if (isReadyToPublish.value) {
        common_vendor.index.setStorageSync("messageSetting", messageSettings.value);
        emit("close");
      } else {
        common_vendor.index.showToast({
          title: "请完整填写所有必填项",
          icon: "none",
          duration: 2e3
        });
      }
    };
    common_vendor.onMounted(() => {
      console.log("messageSettings:", messageSettings.value);
      isReadyToPublish.value = messageSettings.value.messageType.length > 0 && messageSettings.value.phone !== "";
      console.log(isReadyToPublish.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.f(common_vendor.unref(messageTypes), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => toggleMessageType(item), index),
            d: isSelectedMessageType(item) ? 1 : ""
          };
        }),
        c: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.text),
            b: common_vendor.t(item.left),
            c: item.title === "receiveRange" || item.title === "acceptRogin"
          }, item.title === "receiveRange" || item.title === "acceptRogin" ? common_vendor.e({
            d: common_vendor.unref(messageSettings)[item.title].value
          }, common_vendor.unref(messageSettings)[item.title].value ? {
            e: common_vendor.t(common_vendor.unref(messageSettings)[item.title].value)
          } : {
            f: common_vendor.t(item.value)
          }, {
            g: common_vendor.o(($event) => onRegionChange(item.title, $event), index),
            h: common_vendor.unref(messageSettings)[item.title].value
          }) : common_vendor.e({
            i: item.title === "phone"
          }, item.title === "phone" ? {
            j: common_vendor.unref(messageSettings).phone,
            k: common_vendor.o(($event) => common_vendor.unref(messageSettings).phone = $event.detail.value, index)
          } : {}), {
            l: item.title !== "phone"
          }, item.title !== "phone" ? {} : {}, {
            m: index
          });
        }),
        d: common_vendor.unref(isReadyToPublish) ? 1 : "",
        e: common_vendor.o(confirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c899a2a0"]]);
wx.createComponent(Component);
