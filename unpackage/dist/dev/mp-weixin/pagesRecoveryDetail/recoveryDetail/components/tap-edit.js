"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_recovery_recovery = require("../../../api/recovery/recovery.js");
if (!Array) {
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_van_tag + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "tap-edit",
  props: {
    name: {
      type: String,
      default: ""
    },
    flid: {
      type: String,
      default: ""
    },
    ppid: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const show = common_vendor.ref(false);
    const popup = common_vendor.ref(null);
    const showTab = common_vendor.ref(true);
    const onClose = async (item, id) => {
      console.log("标签关闭：", id);
      await apiLabelDelAc(item.id, id);
      await apiLabelListAc();
    };
    const selectedItem = common_vendor.ref(null);
    const openDialog = (item) => {
      show.value = true;
      console.log("openDialog", item);
      selectedItem.value = item;
      popup.value.open();
    };
    const close = () => {
      show.value = false;
      console.log("close");
      popup.value.close();
    };
    const confirm = async (e) => {
      console.log("confirm", e);
      await apiLabelAddAc(selectedItem.value.id, e);
      popup.value.close();
      show.value = false;
    };
    const lists = common_vendor.ref([]);
    const apiLabelListAc = async () => {
      const data = {
        flid: props.flid,
        //分类id
        ppid: props.ppid
        //品牌id
      };
      const res = await api_recovery_recovery.apiLabelList(data);
      if (res.code === 200) {
        lists.value = res.lists;
      }
    };
    const apiLabelDelAc = async (djid, id) => {
      const data = {
        djid,
        //等级ID
        bqid: id
        //标签管理返回的标签列表里面的ID
      };
      const res = await api_recovery_recovery.apiLabelDel(data);
      if (res.code === 200) {
        common_vendor.index.showToast("删除成功");
      }
      console.log("res:", res);
    };
    const apiLabelAddAc = async (id, name) => {
      const data = {
        djid: id,
        //等级ID
        name
        //标签名称
      };
      const res = await api_recovery_recovery.apiLabelAdd(data);
      if (res.code === 200) {
        common_vendor.index.showToast("添加成功");
        await apiLabelListAc();
      }
      console.log("res:", res);
    };
    common_vendor.onMounted(async () => {
      await apiLabelListAc();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.name),
        b: common_vendor.o(($event) => _ctx.$emit("close")),
        c: common_vendor.f(common_vendor.unref(lists), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.djname),
            b: common_vendor.o(($event) => openDialog(item), index)
          }, common_vendor.unref(showTab) ? {
            c: common_vendor.f(item.bqlist, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: index2,
                c: common_vendor.o(($event) => onClose(item, item1.id), index2),
                d: "2833eb77-0-" + i0 + "-" + i1
              };
            }),
            d: common_vendor.p({
              closeable: true,
              size: "large",
              color: "linear-gradient( 131deg, #FFCE7B 0%, rgba(255,153,100,0.98) 55%, #FF9057 100%)",
              textColor: "#FFFFFF"
            })
          } : {}, {
            e: index
          });
        }),
        d: common_vendor.unref(showTab),
        e: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        f: common_vendor.o(close),
        g: common_vendor.o(confirm),
        h: common_vendor.p({
          mode: "input",
          message: "成功消息",
          title: "输入标签名",
          ["before-close"]: true
        })
      } : {}, {
        i: common_vendor.sr(popup, "2833eb77-1", {
          "k": "popup"
        }),
        j: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2833eb77"]]);
wx.createComponent(Component);
