"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_recovery_recovery = require("../../../api/recovery/recovery.js");
if (!Array) {
  const _component_van_stepper = common_vendor.resolveComponent("van-stepper");
  const _easycom_uv_scroll_list2 = common_vendor.resolveComponent("uv-scroll-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_van_stepper + _easycom_uv_scroll_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uv_scroll_list = () => "../../../uni_modules/uv-scroll-list/components/uv-scroll-list/uv-scroll-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_scroll_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "edit-pannel",
  props: {
    selectData: {
      type: Object,
      default: {}
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const popup = common_vendor.ref(null);
    const show = common_vendor.ref(false);
    const emit = __emit;
    const lx = common_vendor.ref("");
    const changeType = (newType) => {
      lx.value = newType;
    };
    const props = __props;
    const onChange = (e, item) => {
      console.log("onChange:", e.detail);
      item.price = e.detail;
    };
    const djlist = common_vendor.ref([]);
    const nclist = common_vendor.ref([]);
    const yslist = common_vendor.ref([]);
    const bblist = common_vendor.ref([]);
    const name = common_vendor.ref("");
    const djname = common_vendor.ref("");
    const price = common_vendor.ref("");
    common_vendor.ref("");
    const apiSingleEditAction = () => {
      const data = {
        xhid: props.selectData.xhid,
        djid: props.selectData.djid,
        ids: props.selectData.ids
      };
      api_recovery_recovery.apiSingleEdit(data).then((res) => {
        if (res.code === 200) {
          djlist.value = res.djlist;
          nclist.value = res.nclist;
          yslist.value = res.yslist;
          bblist.value = res.bblist;
          name.value = res.name;
          djname.value = res.djname;
          price.value = res.price;
          if (!res.lx) {
            lx.value = "1";
          } else {
            lx.value = res.lx;
          }
        }
        console.log(res);
      });
    };
    const openDialog = () => {
      show.value = true;
      popup.value.open();
    };
    const close = () => {
      show.value = false;
      console.log("close");
      popup.value.close();
    };
    const confirm = async (e) => {
      price.value = e;
      popup.value.close();
      show.value = false;
    };
    const yslistString = common_vendor.computed(() => {
      let result = "";
      for (let i = 0; i < yslist.value.length; i++) {
        let item = yslist.value[i];
        let str = item.name;
        if (item.price) {
          str += item.price;
        }
        if (i > 0) {
          result += ",";
        }
        result += str;
      }
      return result;
    });
    const apiSingleEditSubmitAction = async () => {
      const data = {
        djid: props.selectData.djid,
        ids: props.selectData.ids,
        lx: lx.value,
        //类型 1售价 2收价
        price: price.value,
        ysinfos: yslistString.value
        //颜色标签价格 传入单个改价查看里面所有颜色信息 逗号分隔
      };
      const res = await api_recovery_recovery.apiSingleEditSubmit(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        setTimeout(() => {
          emit("close");
          common_vendor.index.$emit("recoveryDetailRefresh");
        }, 1e3);
      }
      console.log(res);
    };
    const onsubmit = () => {
      apiSingleEditSubmitAction();
    };
    common_vendor.onMounted(() => {
      apiSingleEditAction();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(djname)),
        b: common_vendor.o(($event) => _ctx.$emit("close")),
        c: common_vendor.t(common_vendor.unref(name)),
        d: common_vendor.unref(lx) === "2"
      }, common_vendor.unref(lx) === "2" ? {} : {}, {
        e: common_vendor.o(($event) => changeType("1")),
        f: common_vendor.unref(lx) === "1"
      }, common_vendor.unref(lx) === "1" ? {} : {}, {
        g: common_vendor.o(($event) => changeType("2")),
        h: common_vendor.t(common_vendor.unref(price)),
        i: common_vendor.o(openDialog),
        j: common_vendor.f(common_vendor.unref(yslist), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o((event) => onChange(event, item), index),
            c: "b5d97053-1-" + i0 + ",b5d97053-0",
            d: common_vendor.p({
              value: item.price === "" ? "0" : item.price === "" ? "0" : item.price,
              min: -1e4,
              step: "10",
              inputWidth: "48rpx",
              buttonSize: "48rpx"
            }),
            e: index
          };
        }),
        k: common_vendor.p({
          indicator: false
        }),
        l: common_vendor.o(onsubmit),
        m: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        n: common_vendor.o(close),
        o: common_vendor.o(confirm),
        p: common_vendor.p({
          mode: "input",
          message: "成功消息",
          title: "输入价格",
          ["before-close"]: true
        })
      } : {}, {
        q: common_vendor.sr(popup, "b5d97053-2", {
          "k": "popup"
        }),
        r: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b5d97053"]]);
wx.createComponent(Component);
