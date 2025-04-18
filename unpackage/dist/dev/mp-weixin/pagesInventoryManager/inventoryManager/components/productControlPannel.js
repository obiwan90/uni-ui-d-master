"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const pagesInventoryManager_api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "productControlPannel",
  props: {
    name: {
      type: String,
      default: ""
    },
    imei: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const btnData = common_vendor.ref([
      // {text:'商品录入',image:'/pagesInventoryManager/static/icon_luru@3x.png',path:'/pagesProductInput/productInput/productInput?ch='+props.imei},
      // {text:'功能检测',image:'/pagesInventoryManager/static/icon_zhijian@3x.png',path:'/pagesFuncCheck/funcCheck/funcCheck?ch='+props.imei},
      // {text:'维修检测',image:'/pagesInventoryManager/static/icon_zhijian@3x.png',path:'/pagesMaintenanceInput/maintenanceInput/maintenanceInput?ch='+props.imei},
      // {text:'拍照',image:'/pagesInventoryManager/static/icon_paizhao@3x.png',path:'/pagesTakePhoto/takePhoto/takePhoto?ch='+props.imei},
      // {text:'成色判断',image:'/pagesInventoryManager/static/icon_chengse@3x.png',path:'/pagesFinenessJudge/finenessJudge/finenessJudge?ch='+props.imei},
      // {text:'修改价格',image:'/pagesInventoryManager/static/icon_shangjia@3x.png',path:'/pagesListingProduct/listingProduct/listingProduct?ch='+props.imei},
      { text: "退出库存", image: "/pagesInventoryManager/static/icon_kucun@3x.png", path: "/Home/Goods/updatezt?zt=2", menuAuthority: "" }
    ]);
    const actionHandle = (item) => {
      if (item.text !== "退出库存") {
        common_vendor.index.navigateTo({
          url: item.path
        });
      } else {
        apiEditInventoryData(item.path, { id: props.id, zt: "2" });
      }
    };
    const apiEditInventoryData = async (url, data) => {
      const res = await pagesInventoryManager_api_api.apiEditInventory(url, data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "none",
          duration: 2e3
        });
        emit("close");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_vendor.o(($event) => _ctx.$emit("close")),
        c: common_vendor.t(__props.name),
        d: common_vendor.t(__props.imei),
        e: common_assets._imports_1$1,
        f: common_vendor.f(common_vendor.unref(btnData), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.o(($event) => actionHandle(item), index),
            c: common_vendor.t(item.text),
            d: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1675c800"]]);
wx.createComponent(Component);
