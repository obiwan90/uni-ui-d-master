"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_address_address = require("../../../api/address/address.js");
const pagesOrderDetail_api_api = require("../../api/api.js");
const utils_debounce = require("../../../utils/debounce.js");
if (!Array) {
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_van_image + _easycom_uv_upload2 + _easycom_uv_transition2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uv_upload = () => "../../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uv_transition = () => "../../../uni_modules/uv-transition/components/uv-transition/uv-transition.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_upload + _easycom_uv_transition + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "afterSalesPannel",
  props: {
    itemIndex: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const popup = common_vendor.ref(null);
    const showPopup = common_vendor.ref(false);
    const price = common_vendor.ref();
    const openDialog = () => {
      showPopup.value = true;
      popup.value.open();
    };
    const popupClose = () => {
      showPopup.value = false;
      console.log("close");
      popup.value.close();
    };
    const popupConfirm = async (e) => {
      price.value = e;
      popup.value.close();
      showPopup.value = false;
    };
    const orderInfo = common_vendor.ref(null);
    const showStep = common_vendor.ref(true);
    common_vendor.ref(false);
    common_vendor.ref(false);
    common_vendor.ref(false);
    common_vendor.ref(false);
    common_vendor.ref();
    const remark = common_vendor.ref();
    const propos = __props;
    const emit = __emit;
    const afterSalesType = common_vendor.ref([
      { type: "1", title: "申请退款" },
      { type: "2", title: "申请补差" },
      { type: "3", title: "退货退款" },
      { type: "4", title: "售后维修" }
    ]);
    common_vendor.ref([
      { type: "1", text: "上门取件" },
      { type: "2", text: "自行寄回" }
    ]);
    const selectedIndex = common_vendor.ref(0);
    const selectCard = (index) => {
      selectedIndex.value = index;
    };
    common_vendor.ref(0);
    const formatGoodsInfoTabs = (item) => {
      console.log(item);
      console.log("进来了吗");
      let result = [];
      if (item.zt === "1") {
        if (item.goodsinfos.gjbbname) {
          result.push(item.goodsinfos.gjbbname);
        }
        if (item.goodsinfos.wlbbname) {
          result.push(item.goodsinfos.wlbbname);
        }
        if (item.goodsinfos.bxzt) {
          result.push(item.goodsinfos.bxzt);
        }
        if (item.goodsinfos.efficiency) {
          result.push(`电池${item.goodsinfos.efficiency}%`);
        }
        if (item.goodsinfos.delivery) {
          result.push(`${item.goodsinfos.delivery}发货`);
        }
      }
      return result.join("丨");
    };
    const fileList = common_vendor.ref([]);
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      for (const item of lists) {
        try {
          const compressedResult = await compressImage(item);
          if (!compressedResult) {
            continue;
          }
          const uploadResult = await common_vendor.index.uploadFile({
            url: "https://www.xzxskj.com/Home/Upload/add",
            filePath: compressedResult.tempFilePath,
            name: "imgs",
            header: { "Content-Type": "multipart/form-data" }
          });
          const data = JSON.parse(uploadResult.data);
          if (data.code !== 200) {
            throw new Error("上传失败");
          }
          const imageUrls = data.urls.split(",");
          imageUrls.forEach((url) => {
            if (url.trim()) {
              fileList.value.push({
                url: "https://www.xzxskj.com" + url.trim(),
                status: "success",
                message: ""
              });
            }
          });
        } catch (error) {
          common_vendor.index.showToast({
            title: error.message || "上传失败",
            icon: "error",
            duration: 2e3
          });
        }
      }
    };
    const compressImage = async (imageUrl) => {
      const originalSize = imageUrl.size;
      let compressedResult;
      common_vendor.index.showLoading({
        title: "loading...",
        mask: true
      });
      if (originalSize > 500 * 1024) {
        let quality = 80;
        let compressionSuccess = false;
        let lastQuality, lastSize;
        do {
          compressedResult = await common_vendor.index.compressImage({
            src: imageUrl.url,
            quality
          });
          const fileInfo = await common_vendor.index.getFileInfo({
            filePath: compressedResult.tempFilePath
          });
          lastQuality = quality;
          lastSize = fileInfo.size;
          if (fileInfo.size <= 500 * 1024) {
            compressionSuccess = true;
            break;
          }
          quality -= 10;
        } while (quality >= 20);
        common_vendor.index.hideLoading();
        if (!compressionSuccess) {
          console.log(`最后一次压缩质量: ${lastQuality}, 大小: ${(lastSize / 1024 / 1024).toFixed(2)} MB`);
          common_vendor.index.showToast({
            title: "无法压缩到500KB以内，请尝试其他图片。",
            icon: "none"
          });
          return null;
        }
      } else {
        compressedResult = { tempFilePath: imageUrl.url };
      }
      common_vendor.index.hideLoading();
      return { tempFilePath: compressedResult.tempFilePath, url: compressedResult.tempFilePath };
    };
    const deleteFlie = (event) => {
      fileList.value.splice(event.index, 1);
    };
    const check = () => {
      common_vendor.index.showToast({
        title: "超出上传限制",
        icon: "error",
        duration: 2e3
      });
    };
    const debounceComfirm = utils_debounce.debounce(() => {
      comfirm();
    }, 300, true);
    const comfirm = async () => {
      const data = {
        id: propos.itemIndex === -1 ? orderInfo.value.orderid : orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: propos.itemIndex === -1 ? 1 : 2,
        shlx: afterSalesType.value[selectedIndex.value].type,
        shyy: remark.value,
        shtp: fileList.value.map((file) => file.url).join(","),
        bcje: price.value,
        goodsid: propos.itemIndex === -1 ? "" : orderInfo.value.goodsinfos[propos.itemIndex].goodsid
      };
      if (!data.id) {
        common_vendor.index.showToast({
          title: "订单ID不能为空",
          icon: "error",
          duration: 3e3
        });
        return;
      }
      if (!data.shlx) {
        common_vendor.index.showToast({
          title: "申请类型不能为空",
          icon: "error",
          duration: 3e3
        });
        return;
      }
      if (!data.shyy) {
        common_vendor.index.showToast({
          title: "申请理由不能为空",
          icon: "error",
          duration: 3e3
        });
        return;
      }
      if (!data.shtp) {
        common_vendor.index.showToast({
          title: "请上传相关图片",
          icon: "error",
          duration: 3e3
        });
        return;
      }
      if (selectedIndex.value !== 3) {
        if (!data.bcje || data.bcje <= 0) {
          common_vendor.index.showToast({
            title: "补偿金额必须大于0",
            icon: "error",
            duration: 3e3
          });
          return;
        }
      }
      let totalAmount = 0;
      if (propos.itemIndex === -1) {
        totalAmount = orderInfo.value.goodsinfos.reduce((sum, item) => sum + item.goodsinfos.price, 0);
      } else {
        totalAmount = orderInfo.value.goodsinfos[propos.itemIndex].goodsinfos.price;
      }
      if (parseFloat(data.bcje) > totalAmount) {
        common_vendor.index.showToast({
          title: `超过总金额: ￥${totalAmount}`,
          icon: "error",
          duration: 3e3
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中...",
        mask: true
        // 遮罩
      });
      try {
        const res = await pagesOrderDetail_api_api.apiOrderAftersales(data);
        console.log("res:", res);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "申请提交成功",
            icon: "success",
            duration: 3e3
          });
        } else if (res.code === 201) {
          common_vendor.index.showToast({
            title: "请勿重复操作",
            icon: "error",
            duration: 3e3
          });
        } else {
          common_vendor.index.showToast({
            title: "申请提交失败",
            icon: "error",
            duration: 3e3
          });
        }
      } catch (error) {
        console.error("请求出错:", error);
        common_vendor.index.showToast({
          title: "提交请求失败",
          icon: "error",
          duration: 3e3
        });
      } finally {
        common_vendor.index.hideLoading();
      }
      setTimeout(() => {
        emit("close");
      }, 1e3);
    };
    const addressInfos = common_vendor.ref();
    const getAddressDetail = async (id) => {
      const param = { id };
      const res = await api_address_address.apigetAddressDetail(param);
      addressInfos.value = res.info;
      console.log(res);
    };
    common_vendor.ref(null);
    common_vendor.onShow(() => {
      console.log("onShow");
      let pages = getCurrentPages();
      const prevPage = pages[pages.length - 1];
      console.log("onShow:", prevPage.data.selectedAddress);
      if (prevPage.data.selectedAddress) {
        console.log("prevPage.data.selectedAddress:", prevPage.data.selectedAddress);
        addressInfos.value = prevPage.data.selectedAddress;
      }
    });
    common_vendor.onMounted(() => {
      const itemString = common_vendor.index.getStorageSync("orderDetailItem");
      console.log("itemString:", itemString);
      if (itemString) {
        orderInfo.value = JSON.parse(itemString);
      }
      getAddressDetail(orderInfo.value.addressid);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderInfo)
      }, common_vendor.unref(orderInfo) ? common_vendor.e({
        b: common_vendor.o(($event) => _ctx.$emit("close")),
        c: propos.itemIndex === -1
      }, propos.itemIndex === -1 ? {
        d: common_vendor.f(common_vendor.unref(orderInfo).goodsinfos, (item, index, i0) => {
          return common_vendor.e({
            a: "13e108cc-1-" + i0 + ",13e108cc-0",
            b: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              radius: "18rpx",
              src: item.goodsinfos.cover,
              fit: "fill"
            }),
            c: common_vendor.t(item.goodsinfos.finenessname),
            d: common_vendor.t(item.goodsinfos.name),
            e: item.goodsinfos.zt === "1"
          }, item.goodsinfos.zt === "1" ? {
            f: common_vendor.t(formatGoodsInfoTabs(item))
          } : {
            g: common_vendor.t(item.goodsinfos.ch)
          }, {
            h: common_vendor.t(item.goodsinfos.price)
          }, !common_vendor.unref(orderInfo).isBargaining ? {} : {}, common_vendor.unref(orderInfo).isBargaining ? {
            i: common_vendor.t(item.goodsinfos.originalPrice)
          } : {}, {
            j: index
          });
        }),
        e: !common_vendor.unref(orderInfo).isBargaining,
        f: common_vendor.unref(orderInfo).isBargaining
      } : common_vendor.e({
        g: common_vendor.p({
          width: "190rpx",
          height: "190rpx",
          radius: "18rpx",
          src: common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.cover,
          fit: "fill"
        }),
        h: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.finenessname),
        i: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.name),
        j: common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.zt === "1"
      }, common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.zt === "1" ? {
        k: common_vendor.t(formatGoodsInfoTabs(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex]))
      } : {
        l: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.ch)
      }, {
        m: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.price),
        n: !common_vendor.unref(orderInfo).isBargaining
      }, !common_vendor.unref(orderInfo).isBargaining ? {} : {}, {
        o: common_vendor.unref(orderInfo).isBargaining
      }, common_vendor.unref(orderInfo).isBargaining ? {
        p: common_vendor.t(common_vendor.unref(orderInfo).goodsinfos[propos.itemIndex].goodsinfos.originalPrice)
      } : {}), {
        q: common_vendor.f(common_vendor.unref(afterSalesType), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: common_vendor.o(($event) => selectCard(index), index)
          };
        }),
        r: common_vendor.unref(selectedIndex) !== 3
      }, common_vendor.unref(selectedIndex) !== 3 ? {
        s: common_vendor.t(common_vendor.unref(price)),
        t: common_vendor.o(openDialog)
      } : {}, {
        v: common_vendor.unref(remark),
        w: common_vendor.o(($event) => common_vendor.isRef(remark) ? remark.value = $event.detail.value : null),
        x: common_vendor.o(afterRead),
        y: common_vendor.o(deleteFlie),
        z: common_vendor.o(check),
        A: common_vendor.p({
          fileList: common_vendor.unref(fileList),
          multiple: true,
          maxCount: 10,
          width: "162rpx",
          height: "162rpx",
          accept: "image",
          maxSize: "5242880",
          name: "2",
          previewFullVideo: true
        }),
        B: common_vendor.o((...args) => common_vendor.unref(debounceComfirm) && common_vendor.unref(debounceComfirm)(...args))
      }) : {}, {
        C: common_vendor.p({
          show: common_vendor.unref(showStep),
          mode: "slide-bottom"
        }),
        D: common_vendor.unref(showPopup)
      }, common_vendor.unref(showPopup) ? {
        E: common_vendor.o(popupClose),
        F: common_vendor.o(popupConfirm),
        G: common_vendor.p({
          mode: "input",
          message: "成功消息",
          title: "输入价格",
          ["before-close"]: true
        })
      } : {}, {
        H: common_vendor.sr(popup, "13e108cc-4", {
          "k": "popup"
        }),
        I: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13e108cc"]]);
wx.createComponent(Component);
