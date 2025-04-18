"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../../api/qualityCheck/qualityCheck.js");
const _sfc_main = {
  __name: "inputConfirm",
  props: {
    imei: {
      type: [Number, String],
      required: true
    },
    content: {
      type: Array,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    },
    purchaseEmployee: {
      type: String,
      required: true
    },
    zjid: {
      type: [Number, String],
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const propos = __props;
    const jkuidname = common_vendor.ref();
    const machinetime = common_vendor.ref();
    const jkbz = common_vendor.ref();
    const getData = async (ch) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        jkuidname.value = res.lists[0].jkuidname;
        machinetime.value = utils_common.formatTimestamp(res.lists[0].machinetime);
        jkbz.value = res.lists[0].jkbz;
        console.log("jkuidname", jkuidname.value);
        console.log("machinetime", machinetime.value);
        console.log("jkbz", jkbz.value);
      }
    };
    const comfrm = () => {
      const data = common_vendor.reactive({
        spname: propos.content[3].value,
        imei: propos.imei,
        inputTime: machinetime.value,
        inputPerson: jkuidname.value,
        id: propos.id,
        purchaseEmployee: propos.purchaseEmployee,
        zjid: propos.zjid,
        jkbz: jkbz.value
      });
      let queryString = encodeURIComponent(JSON.stringify(data));
      common_vendor.index.redirectTo({
        url: "/pagesFuncCheck/funcCheck/funcCheck?data=" + queryString
      });
      setTimeout(() => {
        emit("close");
      }, 500);
    };
    const reLoad = () => {
      common_vendor.index.redirectTo({
        url: "/pagesProductInput/productInput/productInput"
      });
    };
    __expose({
      getData
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(propos.content[3].value),
        c: common_vendor.t(propos.imei),
        d: common_vendor.unref(jkuidname)
      }, common_vendor.unref(jkuidname) ? {
        e: common_vendor.t(common_vendor.unref(jkuidname))
      } : {}, {
        f: common_vendor.unref(machinetime)
      }, common_vendor.unref(machinetime) ? {
        g: common_vendor.t(common_vendor.unref(utils_common.getCurrentDateString)())
      } : {}, {
        h: common_vendor.o(($event) => reLoad()),
        i: common_vendor.o(comfrm)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b82d015f"]]);
wx.createComponent(Component);
