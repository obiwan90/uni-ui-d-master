"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
  __name: "newPosting",
  setup(__props) {
    const title = common_vendor.ref("交流发布");
    const fileList1 = common_vendor.ref([]);
    const deleteFlie = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const check = (e) => {
      console.log(e);
      common_vendor.index.showToast({
        title: "超出上传限制",
        icon: "error",
        duration: 2e3
      });
    };
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      let fileListLen = fileList1.value.length;
      lists.forEach(async (item) => {
        fileList1.value.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
        let fileItem = fileList1.value[fileListLen];
        fileList1.value.splice(fileListLen, 1, {
          ...fileItem,
          status: "success",
          message: "",
          url: item.url
        });
        fileListLen++;
      });
    };
    common_vendor.onLoad((options) => {
      console.log("传递过来的参数:", options.id);
      if (options.id) {
        title.value = "交流修改";
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_assets._imports_0$2,
        c: common_vendor.o(afterRead),
        d: common_vendor.o(deleteFlie),
        e: common_vendor.o(check),
        f: common_vendor.p({
          fileList: common_vendor.unref(fileList1),
          multiple: true,
          maxCount: 10,
          width: "162rpx",
          height: "162rpx",
          accept: "media",
          maxSize: "5242880",
          name: "2",
          previewFullVideo: true
        }),
        g: common_vendor.o((...args) => _ctx.comfim && _ctx.comfim(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fdcb3ce"]]);
wx.createPage(MiniProgramPage);
