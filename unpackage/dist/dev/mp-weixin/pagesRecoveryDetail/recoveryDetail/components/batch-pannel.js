"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_recovery_recovery = require("../../../api/recovery/recovery.js");
if (!Array) {
  const _easycom_uv_scroll_list2 = common_vendor.resolveComponent("uv-scroll-list");
  const _component_van_stepper = common_vendor.resolveComponent("van-stepper");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uv_scroll_list2 + _component_van_stepper + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uv_scroll_list = () => "../../../uni_modules/uv-scroll-list/components/uv-scroll-list/uv-scroll-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uv_scroll_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "batch-pannel",
  props: {
    param: {
      type: Object,
      default: {}
    },
    selectData: {
      type: Object,
      default: {}
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const popup = common_vendor.ref(null);
    const show = common_vendor.ref(false);
    const selectItem = common_vendor.ref({});
    const openDialog = (item) => {
      selectItem.value = item;
      show.value = true;
      popup.value.open();
    };
    const close = () => {
      show.value = false;
      console.log("close");
      popup.value.close();
    };
    const confirm = async (e) => {
      selectItem.value.price = e;
      djlist.value.forEach((item) => {
        if (item.djname == selectItem.value.djname) {
          item.price = e;
        }
      });
      popup.value.close();
      show.value = false;
    };
    const onChange = (e, item) => {
      console.log("onChange:", e.detail);
      item.price = e.detail;
    };
    const lx = common_vendor.ref("");
    const changeType = (newType) => {
      lx.value = newType;
    };
    const emit = __emit;
    const props = __props;
    const requestParam = props.param;
    const djlist = common_vendor.ref([]);
    const nclist = common_vendor.ref([]);
    const yslist = common_vendor.ref([]);
    const bblist = common_vendor.ref([]);
    const name = common_vendor.ref("");
    const selectedIndex = common_vendor.ref(-1);
    const apiBatchEditAction = async () => {
      console.log(props.param);
      const res = await api_recovery_recovery.apiBatchEdit(requestParam);
      if (res.code == 200) {
        djlist.value = res.djlist;
        nclist.value = res.nclist;
        yslist.value = res.yslist;
        bblist.value = res.bblist;
        name.value = res.name;
        if (!res.lx) {
          lx.value = "1";
        } else {
          lx.value = res.lx;
        }
        selectedIndex.value = nclist.value.findIndex((item) => item.name === props.param.nc);
      }
      console.log(res);
    };
    const djprice = common_vendor.computed(() => {
      return djlist.value.map((item) => item.price).join(",");
    });
    const djid = common_vendor.computed(() => {
      return djlist.value.map((item) => item.djid).join(",");
    });
    const selectCard = (index) => {
      selectedIndex.value = index;
      requestParam.nc = nclist.value[index].name;
      apiBatchEditAction();
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
    const apiBatchEditSubmitAction = async () => {
      const data = {
        xhid: props.param.xhid,
        ppid: props.param.ppid,
        nc: requestParam.nc,
        bb: props.param.bb || "",
        bx: props.param.bx || "",
        djid: djid.value,
        //多个逗号分隔
        djprice: djprice.value,
        //多个逗号分隔 一一对应上面
        ysinfos: yslistString.value,
        //颜色infos
        lx: lx.value
      };
      const res = await api_recovery_recovery.apiBatchEditSubmit(data);
      if (res.code == 200) {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "none"
        });
        setTimeout(() => {
          emit("close");
          common_vendor.index.$emit("recoveryDetailRefresh");
        }, 1e3);
      }
      console.log(res);
    };
    const onsubmit = () => {
      apiBatchEditSubmitAction();
    };
    common_vendor.onMounted(() => {
      apiBatchEditAction();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.t(common_vendor.unref(name)),
        c: common_vendor.unref(lx) === "2"
      }, common_vendor.unref(lx) === "2" ? {} : {}, {
        d: common_vendor.o(($event) => changeType("1")),
        e: common_vendor.unref(lx) === "1"
      }, common_vendor.unref(lx) === "1" ? {} : {}, {
        f: common_vendor.o(($event) => changeType("2")),
        g: common_vendor.f(common_vendor.unref(nclist), (item1, indexInner, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: common_vendor.o(($event) => selectCard(indexInner), indexInner),
            c: common_vendor.unref(selectedIndex) === indexInner ? 1 : "",
            d: indexInner
          };
        }),
        h: common_vendor.p({
          indicator: false
        }),
        i: common_vendor.f(common_vendor.unref(djlist), (item, index, i0) => {
          return {
            a: common_vendor.t(item.djname),
            b: common_vendor.t(item.price),
            c: common_vendor.o(($event) => openDialog(item), index),
            d: index
          };
        }),
        j: common_vendor.f(common_vendor.unref(yslist), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o((event) => onChange(event, item), index),
            c: "209325eb-2-" + i0 + ",209325eb-1",
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
        l: common_vendor.o(($event) => _ctx.$emit("close")),
        m: common_vendor.o(onsubmit),
        n: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        o: common_vendor.o(close),
        p: common_vendor.o(confirm),
        q: common_vendor.p({
          mode: "input",
          message: "成功消息",
          title: "输入价格",
          ["before-close"]: true
        })
      } : {}, {
        r: common_vendor.sr(popup, "209325eb-3", {
          "k": "popup"
        }),
        s: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-209325eb"]]);
wx.createComponent(Component);
