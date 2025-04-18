"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesSuggest_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  (_easycom_custom_header2 + _easycom_uv_upload2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_upload)();
}
const _sfc_main = {
  __name: "suggest",
  setup(__props) {
    const fileList1 = common_vendor.ref([]);
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
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
              fileList1.value.push({
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
    const deleteFlie = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const check = () => {
      common_vendor.index.showToast({
        title: "超出上传限制",
        icon: "error",
        duration: 2e3
      });
    };
    const apiGetComplaintAc = async () => {
      const contentValue = content.value;
      const fileList = fileList1.value;
      if (!contentValue.trim()) {
        common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none",
          duration: 500
        });
        return;
      }
      if (fileList.length === 0) {
        common_vendor.index.showToast({
          title: "请上传至少一张图片",
          icon: "none",
          duration: 500
        });
        return;
      }
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        content: contentValue,
        img: fileList.map((file) => file.url).join(",")
      };
      const res = await pagesSuggest_api_api.apiGetComplaint(param);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 500
        });
      }
    };
    const confirm = async () => {
      await apiGetComplaintAc();
    };
    common_vendor.onLoad((options) => {
      if (options.title) {
        title.value = options.title;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: content.value,
        c: common_vendor.o(($event) => content.value = $event.detail.value),
        d: common_vendor.o(afterRead),
        e: common_vendor.o(deleteFlie),
        f: common_vendor.o(check),
        g: common_vendor.p({
          fileList: fileList1.value,
          multiple: true,
          maxCount: 10,
          width: "162rpx",
          height: "162rpx",
          accept: "image",
          maxSize: "5242880",
          name: "2",
          previewFullVideo: true
        }),
        h: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-81b03011"]]);
wx.createPage(MiniProgramPage);
