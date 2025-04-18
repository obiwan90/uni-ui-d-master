"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const pagesImeiTrack_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _component_van_tag + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_z_paging)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "imeiTrack",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const myInputRef = common_vendor.ref(null);
    const scan = async () => {
      showLoading();
      try {
        const result = await utils_common.scanCode();
        console.log("result", result);
        if (result) {
          handleInput(result).then(() => {
            if (orgArray.value.length > 0) {
              myInputRef.value.inputText = orgArray.value[0].ch;
            }
          });
        }
      } catch (error) {
        console.error("扫码失败：", error);
      } finally {
        hideLoading();
      }
    };
    const showLoading = () => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
    };
    const hideLoading = () => {
      common_vendor.index.hideLoading();
    };
    function getStatusName(zt) {
      const statusMap = {
        "1": "上架",
        "2": "下架",
        "3": "临时下架",
        "4": "退出仓库",
        "5": "平台已售",
        "6": "线下已售",
        "7": "先货后款"
      };
      return statusMap[zt] || "未知状态";
    }
    const infos = common_vendor.ref();
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(true);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      console.log("id:", searchId.value);
      const data2 = await apiImeiTrackListData(searchId.value, pageNo - 1);
      paging.value.complete(data2);
    };
    const orgArray = common_vendor.ref([]);
    const handleInput = (inputText) => {
      console.log("输入框内容:", inputText);
      if (inputText.length > 0) {
        apiFinanceChCheckData(inputText);
      }
    };
    const searchId = common_vendor.ref("");
    const data = common_vendor.ref();
    const selectChange = (e) => {
      console.log("模糊搜索 e", e);
      data.value = e;
      searchId.value = e.id;
      dataList.value = [];
      queryList();
    };
    const apiFinanceChCheckData = async (ch) => {
      const data2 = {
        ch,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesImeiTrack_api_api.apiImeiTrackSearch(data2);
      if (res.code === 200) {
        orgArray.value = res.lists;
      } else {
        orgArray.value = [];
      }
      console.log("apiFinanceChCheckData res:", res);
    };
    const apiImeiTrackListData = async (id, start) => {
      const data2 = {
        id,
        start
      };
      const res = await pagesImeiTrack_api_api.apiImeiTrackList(data2);
      if (res.zt === 1) {
        infos.value = res.infos;
        return res.lists;
      }
      console.log("res:", res);
      return [];
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#f3f2f6"
        }),
        b: common_vendor.sr(myInputRef, "3958b119-1", {
          "k": "myInputRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectChange),
        e: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField),
          showBorder: false,
          disabled: false
        }),
        f: common_vendor.o(scan),
        g: common_vendor.unref(data)
      }, common_vendor.unref(data) ? common_vendor.e({
        h: common_vendor.unref(infos).zt
      }, common_vendor.unref(infos).zt ? {
        i: common_vendor.t(getStatusName(common_vendor.unref(infos).zt)),
        j: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #FF9954 0%, #FF9954 100%)"
        })
      } : {}, {
        k: common_vendor.t(common_vendor.unref(data).name),
        l: common_vendor.t(common_vendor.unref(data).ch),
        m: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(common_vendor.unref(data).ch)),
        n: common_vendor.t(common_vendor.unref(data).cgyname),
        o: common_vendor.t(common_vendor.unref(data).ckname)
      }) : {}, {
        p: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.mk),
            b: common_vendor.t(item.mklx),
            c: "3958b119-4-" + i0 + ",3958b119-3",
            d: common_vendor.p({
              size: "mini",
              color: {
                background: `linear-gradient(132deg, ${item.color} 0%, ${item.color} 100%)`
              }
            }),
            e: common_vendor.t(item.username),
            f: common_vendor.t(common_vendor.unref(utils_common.formatTimestamp)(item.add_time)),
            g: index
          };
        }),
        q: common_vendor.sr(paging, "3958b119-3", {
          "k": "paging"
        }),
        r: common_vendor.o(queryList),
        s: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        t: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3958b119"]]);
wx.createPage(MiniProgramPage);
