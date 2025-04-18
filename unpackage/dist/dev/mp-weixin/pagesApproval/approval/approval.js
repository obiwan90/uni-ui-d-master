"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const pagesApproval_api_api = require("../api/api.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  _easycom_z_paging();
}
const _sfc_main = {
  __name: "approval",
  setup(__props) {
    const selectedTitileIndex = common_vendor.ref(0);
    const titleChange = common_vendor.ref([
      "未审批",
      "已审批"
    ]);
    const lx = common_vendor.ref("1");
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await apiGetApprovalListAc(pageNo - 1);
      paging.value.complete(data);
    };
    const selectTitle = (index) => {
      selectedTitileIndex.value = index;
      lx.value = index + 1;
      if (paging && paging.value) {
        paging.value.reload(true);
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const debounceCheck = utils_debounce.debounce((orderId) => {
      check(orderId);
    }, 300, true);
    const check = (id) => {
      common_vendor.index.showModal({
        content: "确认退款",
        showCancel: false,
        success: (res) => {
          if (!res.cancel) {
            console.log("用户点击了确认");
            apiApprovalAc(id);
          }
        }
      });
    };
    common_vendor.ref([]);
    const apiApprovalAc = async (id) => {
      const param = {
        id
      };
      const res = await pagesApproval_api_api.apiApproval(param);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 500
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
      if (res.code === 201) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "error",
          duration: 1e3
        });
      }
    };
    const apiGetApprovalListAc = async (start) => {
      const param = {
        lx: lx.value,
        //1未操作 2 已操作
        start
      };
      const res = await pagesApproval_api_api.apiGetApprovalList(param);
      if (res.code === "200") {
        return res.lists;
      }
      return [];
    };
    common_vendor.onShow(() => {
      if (paging && paging.value) {
        paging.value.reload(true);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(goBack),
        c: common_vendor.f(common_vendor.unref(titleChange), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => selectTitle(index), index),
            c: common_vendor.unref(selectedTitileIndex) === index ? 1 : "",
            d: index
          };
        }),
        d: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        g: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.ordernumber),
            b: common_vendor.f(item.gwclist, (item1, index2, i1) => {
              return common_vendor.e({
                a: item1.goodsinfos.finenessname
              }, item1.goodsinfos.finenessname ? {
                b: common_vendor.t(item1.goodsinfos.finenessname)
              } : {}, {
                c: common_vendor.t(item1.goodsinfos.name),
                d: common_vendor.t(item1.goodsinfos.ch),
                e: common_vendor.t(item1.goodsinfos.cgyname),
                f: item1.ckame
              }, item1.ckame ? {
                g: common_vendor.t(item1.goodsinfos.ckname)
              } : {}, {
                h: common_vendor.t(item1.goodsinfos.price),
                i: index2
              });
            }),
            c: common_vendor.t(item.remarks),
            d: common_vendor.t(item.num),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.sqrname)
          }, common_vendor.unref(lx) === "1" ? {
            g: common_vendor.o(($event) => common_vendor.unref(debounceCheck)(item.id), index)
          } : {}, {
            h: index
          });
        }),
        h: common_vendor.t(common_vendor.unref(titleChange)[common_vendor.unref(selectedTitileIndex)]),
        i: common_vendor.unref(lx) === "1",
        j: common_vendor.unref(lx).value === "1",
        k: common_vendor.sr(paging, "ea34a74f-0", {
          "k": "paging"
        }),
        l: common_vendor.o(queryList),
        m: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        n: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ea34a74f"]]);
wx.createPage(MiniProgramPage);
