"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
require("../../../stores/tokenStore.js");
require("../../../stores/userInfoStore.js");
if (!Array) {
  const _component_van_uploader = common_vendor.resolveComponent("van-uploader");
  _component_van_uploader();
}
const _sfc_main = {
  __name: "offlinePaymentPannel",
  props: {
    ddxx: {
      type: Array,
      default: []
    },
    ddid: {
      type: String,
      default: ""
    },
    totalPrice: {
      type: String,
      default: ""
    }
  },
  emits: ["reload"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const data = common_vendor.ref([
      { name: "支付宝", id: "2", selected: true, img: "https://www.xzxskj.com/xcximg/icon_zhifubao@3x.png" },
      { name: "微信", id: "1", selected: false, img: "https://www.xzxskj.com/xcximg/icon_weixin@3x.png" },
      { name: "收款码", id: "3", selected: false, img: "https://www.xzxskj.com/xcximg/icon_qita@3x.png" },
      { name: "银行卡", id: "4", selected: false, img: "https://www.xzxskj.com/xcximg/icon_card@3x.png" },
      { name: "现金", id: "5", selected: false, img: "https://www.xzxskj.com/xcximg/icon_xianjin@3x.png" },
      { name: "其他", id: "6", selected: false, img: "https://www.xzxskj.com/xcximg/icon_qita@3x.png" }
    ]);
    const price = common_vendor.ref(parseFloat(props.totalPrice) || 0);
    const remark = common_vendor.ref("");
    const selectedPayment = common_vendor.ref(data.value.find((item) => item.selected) || data.value[0]);
    const selectChange = (index) => {
      data.value.forEach((item, i) => {
        item.selected = i === index;
      });
      selectedPayment.value = data.value[index];
    };
    const onComfirm = () => {
      console.log("选中的支付方式:", selectedPayment.value);
      fpbkSubmitAc();
    };
    const fileList = common_vendor.ref([]);
    const fileListRef = {
      fileList
    };
    const handleUpload = (event) => {
      afterRead(event, "fileList");
    };
    const afterRead = (event, fileListName) => {
      utils_common.uploadFiles(event, fileListName, fileListRef);
    };
    const check = (e, fileListName) => {
      utils_common.uploadCheack(e);
    };
    const delete1 = (event, fileListName) => {
      utils_common.uploadDelete(event, fileListName, fileListRef);
    };
    const fpbkSubmitAc = async (id) => {
      console.log("props.ddid", props.ddid);
      if (price.value <= 0) {
        common_vendor.index.showToast({
          title: "金额必须大于0",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      const data2 = {
        zffs: selectedPayment.value.id,
        // 支付方式 1微信2支付宝3收款码4银行卡5现金6其它	
        skremarks: remark.value,
        imgs: fileList.value.map((file) => file.url).join(","),
        price: price.value,
        ddid: props.ddid
      };
      emit("reload", data2);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: price.value,
        c: common_vendor.o(($event) => price.value = $event.detail.value),
        d: selectedPayment.value.img,
        e: common_vendor.t(selectedPayment.value.name),
        f: common_vendor.f(data.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.img,
            b: common_vendor.t(item.name),
            c: item.selected
          }, item.selected ? {} : {}, {
            d: common_vendor.o(($event) => selectChange(index), index),
            e: index
          });
        }),
        g: remark.value,
        h: common_vendor.o(($event) => remark.value = $event.detail.value),
        i: common_vendor.o((event) => check(event)),
        j: common_vendor.o((event) => delete1(event, "fileList")),
        k: common_vendor.p({
          fileList: fileList.value,
          accept: "image",
          maxCount: "3",
          maxSize: "5242880",
          previewSize: "162rpx",
          afterRead: (event) => handleUpload(event)
        }),
        l: common_vendor.o(onComfirm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd6d6a4c"]]);
wx.createComponent(Component);
