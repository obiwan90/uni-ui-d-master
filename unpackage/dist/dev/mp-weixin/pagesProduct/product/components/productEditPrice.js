"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_product_product = require("../../../api/product/product.js");
if (!Array) {
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_component_van_image + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "productEditPrice",
  props: {
    selectedGood: {
      type: Object
    },
    combinationname: {
      type: Array,
      default: []
    }
  },
  emits: ["close", "reLoad"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const editePrice = common_vendor.ref();
    const list = common_vendor.ref([]);
    const clickedIndexArray = common_vendor.ref([]);
    const selectedText = common_vendor.ref([]);
    const handleCardClick = (collapseIndex, cardIndex, item) => {
      clickedIndexArray.value[collapseIndex].fill(false);
      clickedIndexArray.value[collapseIndex][cardIndex] = !clickedIndexArray.value[collapseIndex][cardIndex];
      selectedText.value[collapseIndex] = item;
    };
    const apiFinenessListData = async () => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id: props.selectedGood.id
      };
      try {
        const res = await api_product_product.apiFinenessList(data);
        if (res.code === 200) {
          const { cslists, yjlist } = res;
          if (Array.isArray(cslists) && yjlist && Array.isArray(yjlist.yjlists)) {
            list.value = [
              ...cslists.map((item) => ({
                name: item.name,
                items: item.er.map((erItem) => ({ name: erItem.name, id: erItem.id }))
              })),
              { name: yjlist.name, items: yjlist.yjlists.map((item) => ({ name: item.name, id: item.id })) }
            ];
            clickedIndexArray.value = list.value.map((item) => Array(item.items.length).fill(false));
            selectedText.value = list.value.map(() => null);
          } else {
            console.error("Invalid data structure", res);
          }
        } else {
          console.error("API returned an error", res);
        }
      } catch (error) {
        console.error("API call failed", error);
      }
    };
    common_vendor.watch(selectedText, (newVal) => {
      if (newVal.every((item) => item !== null)) {
        apiSelectedFinenessData();
      }
    }, { deep: true });
    const csinfos = common_vendor.ref();
    const apiSelectedFinenessData = async () => {
      const csidArray = selectedText.value.map((item) => item.id);
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id: props.selectedGood.id,
        csid: csidArray.join(",")
      };
      try {
        const res = await api_product_product.apiSelectedFineness(data);
        if (res.code === 200) {
          csinfos.value = res.csinfos;
        } else {
          common_vendor.index.showToast({
            title: "未找到匹配成色，请联系客服",
            icon: "error",
            duration: 2e3
          });
          console.error("API returned an error", res);
        }
      } catch (error) {
        console.error("API call failed", error);
      }
    };
    function formatGoodData(selectedGood) {
      const {
        gjbbname,
        // 国行
        wlbbname,
        // 全网通
        bxzt,
        // 有保
        efficiency,
        // 电池99%
        delivery
        // 深圳发货
      } = selectedGood;
      const parts = [];
      if (gjbbname)
        parts.push(gjbbname);
      if (wlbbname)
        parts.push(wlbbname);
      if (bxzt)
        parts.push(bxzt);
      if (efficiency)
        parts.push(`电池${efficiency}%`);
      if (delivery)
        parts.push(`${delivery}发货`);
      const formattedString = parts.join("丨");
      return formattedString;
    }
    const apiEditProductInfoData = async (csidArray) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id: props.selectedGood.id,
        price: editePrice.value ? editePrice.value : "",
        zhid: csinfos.value ? csinfos.value.id : "",
        csid: csidArray.join(",")
      };
      try {
        const res = await api_product_product.apiEditProductInfo(data);
        if (res.code === 200) {
          console.log("Edit product info success", res);
          common_vendor.index.showToast({
            title: "修改成功",
            icon: "success",
            duration: 2e3
          });
          setTimeout(() => {
            emit("close");
            emit("reLoad");
          }, 2e3);
        } else {
          console.error("API returned an error", res);
        }
      } catch (error) {
        console.error("API call failed", error);
      }
    };
    const onConfirm = () => {
      console.log("props.selectedGood", props.selectedGood);
      console.log("editePrice.value:", editePrice.value);
      console.log("csinfos.value:", csinfos.value);
      const hasPrice = !!editePrice.value;
      const hasFineness = !!csinfos.value;
      const isSelectedTextValid = selectedText.value.every((item) => item !== null);
      if (hasPrice && hasFineness) {
        if (!isSelectedTextValid) {
          common_vendor.index.showToast({
            title: "请选择完整的成色信息",
            icon: "none",
            duration: 500
          });
          return;
        }
        const csidArray = selectedText.value.map((item) => item.id);
        apiEditProductInfoData(csidArray);
      } else if (hasPrice) {
        const csidArray = [];
        apiEditProductInfoData(csidArray);
      } else if (hasFineness) {
        if (!isSelectedTextValid) {
          common_vendor.index.showToast({
            title: "请选择完整的成色信息",
            icon: "none",
            duration: 500
          });
          return;
        }
        const csidArray = selectedText.value.map((item) => item.id);
        apiEditProductInfoData(csidArray);
      } else {
        common_vendor.index.showToast({
          title: "请输入修改金额或者选择成色信息",
          icon: "none",
          duration: 500
        });
      }
    };
    common_vendor.onMounted(async () => {
      await apiFinenessListData();
      props.combinationname.forEach((name, index) => {
        list.value.forEach((listItem, collapseIndex) => {
          listItem.items.forEach((item, cardIndex) => {
            if (item.name === name) {
              handleCardClick(collapseIndex, cardIndex, item);
            }
          });
        });
      });
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: props.selectedGood
      }, props.selectedGood ? common_vendor.e({
        c: common_vendor.p({
          lazyLoad: true,
          width: "190rpx",
          height: "190rpx",
          radius: "18rpx",
          fit: "fill",
          src: props.selectedGood.cover
        }),
        d: ((_a = csinfos.value) == null ? void 0 : _a.name) || props.selectedGood.finenessname
      }, ((_b = csinfos.value) == null ? void 0 : _b.name) || props.selectedGood.finenessname ? {
        e: common_vendor.t(((_c = csinfos.value) == null ? void 0 : _c.name) || props.selectedGood.finenessname)
      } : {}, {
        f: common_vendor.t(props.selectedGood.name),
        g: common_vendor.t(formatGoodData(props.selectedGood)),
        h: common_vendor.t(props.selectedGood.price)
      }) : {}, {
        i: editePrice.value,
        j: common_vendor.o(($event) => editePrice.value = $event.detail.value),
        k: common_vendor.t(csinfos.value ? csinfos.value.name : props.selectedGood.finenessname),
        l: common_vendor.f(list.value, (item, collapseIndex, i0) => {
          var _a2;
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t((_a2 = selectedText.value[collapseIndex]) == null ? void 0 : _a2.name),
            c: "4ed9dea1-4-" + i0 + "," + ("4ed9dea1-3-" + i0),
            d: "4ed9dea1-3-" + i0 + "," + ("4ed9dea1-2-" + i0),
            e: common_vendor.f(item.items, (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: clickedIndexArray.value[collapseIndex][cardIndex] ? 1 : "",
                c: clickedIndexArray.value[collapseIndex][cardIndex] ? 1 : "",
                d: cardIndex,
                e: common_vendor.o(($event) => handleCardClick(collapseIndex, cardIndex, item1), cardIndex)
              };
            }),
            f: collapseIndex,
            g: "4ed9dea1-2-" + i0 + ",4ed9dea1-1"
          };
        }),
        m: common_vendor.p({
          border: false
        }),
        n: common_vendor.p({
          open: false,
          titleBorder: "none",
          border: false
        }),
        o: common_vendor.sr("collapseRef", "4ed9dea1-1"),
        p: common_vendor.o((...args) => _ctx.onCancel && _ctx.onCancel(...args)),
        q: common_vendor.o(onConfirm)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ed9dea1"]]);
wx.createComponent(Component);
