"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uv_calendars2 = common_vendor.resolveComponent("uv-calendars");
  (_easycom_custom_header2 + _easycom_uv_upload2 + _easycom_uv_calendars2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uv_calendars = () => "../../uni_modules/uv-calendars/components/uv-calendars/uv-calendars.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_upload + _easycom_uv_calendars)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "newSeeking",
  setup(__props) {
    const title = common_vendor.ref("求货发布");
    const calendars = common_vendor.ref(null);
    const confirm = (e) => {
      console.log("日历回调：", e);
      select.value[3].placeholder = e.range.before + "~" + e.range.after;
    };
    const orgArray = common_vendor.ref([
      { name: "iphone13" },
      { name: "iphone14" },
      { name: "华为mate40" },
      { name: "vivo" },
      { name: "iphone15" },
      { name: "iphone14" },
      { name: "华为mate40" },
      { name: "vivo" },
      { name: "iphone13" },
      { name: "iphone14" },
      { name: "华为mate40" },
      { name: "vivo" },
      { name: "iphone13" },
      { name: "iphone14" },
      { name: "华为mate40" },
      { name: "vivo" }
    ]);
    const content1 = common_vendor.ref([
      { key: "型号", placeholder: "请搜索相关型号", value: "华为mate40pro" },
      { key: "内存", placeholder: "请选择型号", value: "4G" },
      { key: "颜色", placeholder: "请选择型号", value: "红色" }
    ]);
    const select = common_vendor.ref([
      { key: "成色选择", placeholder: "请选择", value: "" },
      { key: "求购单价", placeholder: "请选择", value: "" },
      { key: "求购数量", placeholder: "请选择", value: "" },
      { key: "求购时长", placeholder: "请选择", value: "" }
    ]);
    const selectOption = (key) => {
      if (key === "求购时长") {
        console.log("打开日历");
        calendars.value.open();
      }
    };
    common_vendor.ref([]);
    const getCurrentDate = () => {
      const today = /* @__PURE__ */ new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
      return formattedDate;
    };
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
    const selectChange = (e) => {
      console.log(e);
    };
    common_vendor.onLoad((options) => {
      console.log("传递过来的参数:", options.id);
      if (options.id) {
        title.value = "求货修改";
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.f(common_vendor.unref(content1), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: common_vendor.o(selectChange, index),
            c: "edc134d0-1-" + i0,
            d: common_vendor.p({
              keyId: 1,
              dataList: common_vendor.unref(orgArray),
              phText: item.placeholder,
              searchKey: "name",
              showBorder: false,
              disabled: false
            }),
            e: item.key === "型号"
          }, item.key === "型号" ? {} : {}, {
            f: index
          });
        }),
        c: common_vendor.f(common_vendor.unref(select), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: item.key === "成色选择" || item.key === "求购时长"
          }, item.key === "成色选择" || item.key === "求购时长" ? {
            c: common_vendor.t(item.placeholder),
            d: common_vendor.o(($event) => selectOption(item.key), index)
          } : {
            e: common_vendor.t(item.placeholder),
            f: common_vendor.o(($event) => selectOption(item.key), index)
          }, {
            g: index
          });
        }),
        d: common_assets._imports_0$1,
        e: common_vendor.o(afterRead),
        f: common_vendor.o(deleteFlie),
        g: common_vendor.o(check),
        h: common_vendor.p({
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
        i: common_vendor.sr(calendars, "edc134d0-3", {
          "k": "calendars"
        }),
        j: common_vendor.o(confirm),
        k: common_vendor.p({
          mode: "range",
          color: "#ff0000",
          date: [getCurrentDate(), ""]
        }),
        l: common_vendor.o((...args) => _ctx.comfim && _ctx.comfim(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-edc134d0"]]);
wx.createPage(MiniProgramPage);
