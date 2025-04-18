"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const utils_common = require("../../utils/common.js");
const _sfc_main = {
  __name: "oneClickUpload",
  setup(__props) {
    const data = common_vendor.ref([
      {
        title: "上传图片",
        items: [
          { text: "机身背面", image: "https://www.xzxskj.com/xcximg/img_add_img@3x.png", fileList: [] },
          { text: "关于本机", image: "https://www.xzxskj.com/xcximg/img_add_about@3x.png", fileList: [] },
          { text: "屏幕息屏", image: "https://www.xzxskj.com/xcximg/img_add_closewindow@3x.png", fileList: [] }
        ]
      },
      {
        title: "中框四面",
        items: [
          { text: "中框上方", image: "https://www.xzxskj.com/xcximg/img_add_upward@3x.png", fileList: [] },
          { text: "中框右侧", image: "https://www.xzxskj.com/xcximg/img_add_right@3x.png", fileList: [] },
          { text: "中框下方", image: "https://www.xzxskj.com/xcximg/img_add_downward@3x.png", fileList: [] },
          { text: "中框左侧", image: "https://www.xzxskj.com/xcximg/img_add_left@3x.png", fileList: [] }
        ]
      },
      {
        title: "机身四角",
        items: [
          { text: "左上角", image: "https://www.xzxskj.com/xcximg/img_add_lefttop@3x.png", fileList: [] },
          { text: "右上角", image: "https://www.xzxskj.com/xcximg/img_add_righttop@3x.png", fileList: [] },
          { text: "右下角", image: "https://www.xzxskj.com/xcximg/img_add_rightdown@3x.png", fileList: [] },
          { text: "左下角", image: "https://www.xzxskj.com/xcximg/img_add_leftdown@3x.png", fileList: [] }
        ]
      }
    ]);
    const sectionIndex = common_vendor.ref(0);
    const src = common_vendor.ref("");
    const showCamera = common_vendor.ref(true);
    const flash = common_vendor.ref(false);
    const takePhoto = () => {
      const ctx = common_vendor.index.createCameraContext();
      if (!showCamera.value) {
        common_vendor.index.showToast({ title: "所有图片已上传", icon: "none" });
        return;
      }
      ctx.takePhoto({
        quality: "high",
        success: async (res) => {
          src.value = res.tempImagePath;
          console.log("Photo taken:", res.tempImagePath);
          const currentItem = data.value.flatMap((section) => section.items)[sectionIndex.value];
          if (currentItem.fileList.length > 0) {
            currentItem.fileList.splice(0, currentItem.fileList.length);
          }
          await utils_common.customTakePhotoUploadFiles(res.tempImagePath, currentItem);
          common_vendor.index.setStorageSync("photoData", data.value);
          console.log("photoData:", data.value);
          nextStep();
        }
      });
    };
    const takePhotoDebounce = utils_debounce.debounce(() => {
      console.log("Debounced take photo called");
      takePhoto();
    }, 300);
    const error = (e) => {
      console.log("Camera error:", e.detail);
    };
    const previewImage = () => {
      const fileList = data.value.flatMap((section) => section.items).flatMap((item) => item.fileList).map((file) => file.url);
      console.log("fileList:", fileList);
      if (fileList.length > 0) {
        common_vendor.index.previewImage({
          urls: fileList,
          current: sectionIndex.value
        });
      }
    };
    const nextStep = () => {
      const items = data.value.flatMap((section) => section.items);
      if (sectionIndex.value < items.length - 1) {
        sectionIndex.value++;
      } else {
        showCamera.value = false;
        common_vendor.index.navigateBack();
      }
    };
    const retakePhoto = () => {
      if (sectionIndex.value > 0) {
        sectionIndex.value--;
      }
    };
    const toggleFlash = () => {
      flash.value = !flash.value;
    };
    const currentSection = common_vendor.computed(() => {
      const items = data.value.flatMap((section) => section.items);
      return items[sectionIndex.value];
    });
    const currentImageSrc = common_vendor.computed(() => {
      let item;
      if (sectionIndex.value > 0) {
        item = data.value.flatMap((section) => section.items)[sectionIndex.value - 1];
      } else {
        item = data.value.flatMap((section) => section.items)[sectionIndex.value];
      }
      return item.fileList.length > 0 ? item.fileList[0].url : "";
    });
    common_vendor.onLoad(() => {
      const photoData = common_vendor.index.getStorageSync("photoData");
      if (photoData) {
        data.value = photoData;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(currentSection).text),
        b: common_vendor.unref(flash)
      }, common_vendor.unref(flash) ? {} : {}, {
        c: common_vendor.o(toggleFlash),
        d: common_vendor.unref(flash) ? "on" : "off",
        e: common_vendor.o(error),
        f: common_vendor.unref(currentImageSrc) && common_vendor.unref(sectionIndex) > 0
      }, common_vendor.unref(currentImageSrc) && common_vendor.unref(sectionIndex) > 0 ? common_vendor.e({
        g: common_vendor.unref(currentImageSrc)
      }, common_vendor.unref(currentImageSrc) ? {
        h: common_vendor.unref(currentImageSrc)
      } : {}, {
        i: common_vendor.o(previewImage)
      }) : {}, {
        j: common_vendor.o((...args) => common_vendor.unref(takePhotoDebounce) && common_vendor.unref(takePhotoDebounce)(...args)),
        k: common_vendor.unref(sectionIndex) > 0
      }, common_vendor.unref(sectionIndex) > 0 ? {
        l: common_vendor.o(retakePhoto)
      } : {}, {
        m: common_vendor.unref(sectionIndex) === 0 ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a16beed1"]]);
wx.createPage(MiniProgramPage);
