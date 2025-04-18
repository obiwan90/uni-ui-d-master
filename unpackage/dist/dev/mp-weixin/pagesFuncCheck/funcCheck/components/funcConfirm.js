"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../../api/qualityCheck/qualityCheck.js");
const _sfc_main = {
  __name: "funcConfirm",
  props: {
    receivedData: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    const propos = __props;
    const jkuidname = common_vendor.ref();
    const machinetime = common_vendor.ref();
    const functionaltime = common_vendor.ref();
    const gnjcuidname = common_vendor.ref();
    const jkbz = common_vendor.ref();
    const gnjcbz = common_vendor.ref();
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
        functionaltime.value = utils_common.formatTimestamp(res.lists[0].functionaltime);
        gnjcuidname.value = res.lists[0].gnjcuidname;
        gnjcbz.value = res.lists[0].gnjcbz;
        console.log("jkuidname", jkuidname.value);
        console.log("machinetime", machinetime.value);
        console.log("jkbz", jkbz.value);
      }
    };
    const comfrm = () => {
      const data = common_vendor.reactive({
        spname: propos.receivedData.spname,
        imei: propos.receivedData.imei,
        inputTime: machinetime.value,
        funcInputTime: functionaltime.value,
        inputPerson: jkuidname.value,
        funcInputPerson: gnjcuidname.value,
        id: propos.receivedData.id,
        zjid: propos.receivedData.zjid,
        jkbz: jkbz.value,
        gnjcbz: gnjcbz.value
      });
      console.log(data);
      let queryString = encodeURIComponent(JSON.stringify(data));
      common_vendor.index.redirectTo({
        url: "/pagesMaintenanceInput/maintenanceInput/maintenanceInput?data=" + queryString
      });
    };
    const reLoad = () => {
      common_vendor.index.redirectTo({
        url: "/pagesFuncCheck/funcCheck/funcCheck"
      });
    };
    __expose({
      getData
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(__props.receivedData.spname),
        c: common_vendor.t(__props.receivedData.imei),
        d: common_vendor.t(common_vendor.unref(jkuidname)),
        e: common_vendor.t(common_vendor.unref(machinetime).split(" ")[0]),
        f: common_vendor.t(common_vendor.unref(gnjcuidname)),
        g: common_vendor.t(common_vendor.unref(functionaltime).split(" ")[0]),
        h: common_vendor.o(($event) => reLoad()),
        i: common_vendor.o(comfrm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-94fd8282"]]);
wx.createComponent(Component);
