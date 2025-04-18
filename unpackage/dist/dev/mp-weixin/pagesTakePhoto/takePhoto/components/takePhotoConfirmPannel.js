"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../../api/qualityCheck/qualityCheck.js");
const _sfc_main = {
  __name: "takePhotoConfirmPannel",
  props: {
    image: {
      type: String,
      required: true
    },
    receivedData: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    const propos = __props;
    const jkuidname = common_vendor.ref();
    const machinetime = common_vendor.ref();
    const gnjcuidname = common_vendor.ref();
    const functionaltime = common_vendor.ref();
    const servicetime = common_vendor.ref();
    const serviceuidname = common_vendor.ref();
    const jkbz = common_vendor.ref();
    const gnjcbz = common_vendor.ref();
    const wxjcbz = common_vendor.ref();
    const pzbz = common_vendor.ref();
    const csbz = common_vendor.ref();
    const cgyname = common_vendor.ref();
    const finenessname = common_vendor.ref();
    const productimage = common_vendor.ref();
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
        servicetime.value = utils_common.formatTimestamp(res.lists[0].servicetime);
        serviceuidname.value = res.lists[0].serviceuidname;
        gnjcbz.value = res.lists[0].gnjcbz;
        wxjcbz.value = res.lists[0].wxjcbz;
        cgyname.value = res.lists[0].cgyname;
        finenessname.value = res.lists[0].finenessname;
        productimage.value = res.lists[0].productimage;
        pzbz.value = res.lists[0].pzbz;
        csbz.value = res.lists[0].csbz;
        console.log("jkuidname", jkuidname.value);
        console.log("machinetime", machinetime.value);
        console.log("jkbz", jkbz.value);
      }
    };
    const confirm = () => {
      const data = common_vendor.reactive({
        spname: propos.receivedData.spname,
        imei: propos.receivedData.imei,
        inputTime: machinetime.value,
        funcInputTime: functionaltime.value,
        maintenanceInputTime: serviceuidname.value,
        inputPerson: jkuidname.value,
        funcInputPerson: gnjcuidname.value,
        maintenanceInputPerson: serviceuidname.value,
        id: propos.receivedData.id,
        zjid: propos.receivedData.zjid,
        jkbz: jkbz.value,
        gnjcbz: gnjcbz.value,
        wxjcbz: wxjcbz.value,
        pzbz: pzbz.value,
        cgyname: cgyname.value,
        csbz: csbz.value,
        finenessname: finenessname.value,
        productimage: productimage.value
      });
      let queryString = encodeURIComponent(JSON.stringify(data));
      common_vendor.index.redirectTo({
        // url: '/pagesFinenessJudge/finenessJudge/finenessJudge?data='+queryString
        url: "/pagesListingProduct/listingProduct/listingProduct?data=" + queryString
      });
    };
    const reLoad = () => {
      common_vendor.index.redirectTo({
        url: "/pagesTakePhoto/takePhoto/takePhoto"
      });
    };
    __expose({
      getData
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: propos.image,
        c: common_vendor.o(confirm),
        d: common_vendor.o(($event) => reLoad())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5db86307"]]);
wx.createComponent(Component);
