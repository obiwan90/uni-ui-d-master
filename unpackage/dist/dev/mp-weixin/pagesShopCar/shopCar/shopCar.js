"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabStore = require("../../stores/tabStore.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const api_shopCard_shopCard = require("../../api/shopCard/shopCard.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _easycom_custom_channel_tap2 = common_vendor.resolveComponent("custom-channel-tap");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_custom_shop_tabbar2 = common_vendor.resolveComponent("custom-shop-tabbar");
  (_easycom_custom_header2 + _component_van_image + _easycom_custom_channel_tap2 + _easycom_uni_icons2 + _component_van_swipe_cell + _easycom_z_paging2 + _easycom_custom_shop_tabbar2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_custom_channel_tap = () => "../../components/custom-channel-tap/custom-channel-tap.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_custom_shop_tabbar = () => "../../components/custom-shop-tabbar/custom-shop-tabbar.js";
if (!Math) {
  (_easycom_custom_header + _easycom_custom_channel_tap + _easycom_uni_icons + _easycom_z_paging + _easycom_custom_shop_tabbar)();
}
const _sfc_main = {
  __name: "shopCar",
  setup(__props) {
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    common_vendor.ref(false);
    common_vendor.ref([
      {
        isImage: true,
        style: {
          backgroundColor: "#F3F2F6"
          // backgroundColor:'#EB4636'
        }
      }
    ]);
    const cartItems = common_vendor.ref([
      { id: 1, name: "华为Mate 60 RS 非凡大师 16GB+1TB", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 2, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 3, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 4, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）4", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 5, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）5", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 6, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）6", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 7, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）7", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" },
      { id: 8, name: "华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）8", selected: false, taps: "国行丨全网通丨有保丨电池99%丨深圳发货", price: "14120" }
    ]);
    const selectIds = common_vendor.ref([]);
    const toggleSelection = (id) => {
      const index = selectIds.value.indexOf(id);
      if (index !== -1) {
        selectIds.value.splice(index, 1);
      } else {
        selectIds.value.push(id);
      }
      console.log("selectIds.push:", selectIds.value);
    };
    const isSelected = (id) => {
      return selectIds.value.includes(id);
    };
    const allSelected = common_vendor.ref(false);
    common_vendor.watchEffect(() => {
      allSelected.value = selectIds.value.length > 0 && selectIds.value.length === shoppingcartlists.value.filter((item) => item.zt == "1").length;
    });
    const toggleAllSelection = () => {
      console.log("Before toggle:", selectIds.value, allSelected.value);
      console.log("shoppingcartlists", shoppingcartlists.value);
      if (allSelected.value) {
        selectIds.value = [];
        allSelected.value = false;
      } else {
        selectIds.value = shoppingcartlists.value.filter((item) => item.zt == "1").map((item) => item.id);
        allSelected.value = true;
      }
      console.log("After toggle:", selectIds.value, allSelected.value);
    };
    const selectedItemsTotalPrice = common_vendor.computed(() => {
      let totalPrice = 0;
      for (const item of shoppingcartlists.value) {
        if (isSelected(item.id)) {
          totalPrice += parseInt(item.goodinfos.price);
        }
      }
      return totalPrice;
    });
    const deleteSelectedItems = () => {
      if (selectIds.value.length === 0) {
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除选中的商品吗？",
        success: (res) => {
          if (res.confirm) {
            const itemId = selectIds.value.join(",");
            shoppingcartlists.value = shoppingcartlists.value.filter((item) => !isSelected(item.id));
            selectIds.value = [];
            deleteCar(itemId);
            paging.value.reload(true);
          }
        }
      });
    };
    const onClick = (itemId) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除商品吗？",
        success: (res) => {
          if (res.confirm) {
            shoppingcartlists.value = shoppingcartlists.value.filter((item) => item.id !== itemId);
            const index = selectIds.value.indexOf(itemId);
            if (index !== -1) {
              selectIds.value.splice(index, 1);
            }
            deleteCar(itemId);
            paging.value.reload(true);
          }
        }
      });
    };
    const deleteCar = async (itemId) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id: itemId
      };
      const res = await api_shopCard_shopCard.apiDeleteShopCard(data);
      if (res.code === 200) {
        const count = await stores_userInfoStore.useUserStore().refreshShopCarCount();
        console.log("刷新购物车:", JSON.parse(count));
      }
    };
    common_vendor.computed(() => {
      return cartItems.value.some((item) => item.selected);
    });
    const shoppingcartlists = common_vendor.ref([]);
    const getShopCar = async () => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await api_shopCard_shopCard.apigetShopCard(data);
      if (res.code === "200") {
        shoppingcartlists.value = res.Shoppingcartlists;
      }
      console.log(res);
      return shoppingcartlists.value;
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const settlement = () => {
      let dataParam = common_vendor.ref({
        lx: "",
        id: ""
      });
      const selectedItems = shoppingcartlists.value.filter((item) => selectIds.value.includes(item.id));
      console.log("selectedItems:", selectedItems);
      let goodsIds = common_vendor.ref();
      goodsIds.value = selectedItems.map((item) => item.goodsid).join(",");
      console.log("goodsIds:", goodsIds);
      dataParam.value.lx = "2";
      dataParam.value.id = goodsIds.value;
      let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
      console.log("dataParam:", dataParam.value);
      if (selectedItems.length > 0) {
        common_vendor.index.navigateTo({
          url: "/pagesSubOrder/subOrder/subOrder?data=" + queryString
        });
      } else {
        common_vendor.index.showToast({
          title: "请先选择商品",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      const data = await getShopCar();
      console.log("data:", data);
      paging.value.complete(data);
    };
    common_vendor.onShow(() => {
      stores_tabStore.useTabStore().setCurrentTabIndex(1);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: item.zt !== "1"
          }, item.zt !== "1" ? {} : {}, {
            b: "470b2b59-3-" + i0 + "," + ("470b2b59-2-" + i0),
            c: common_vendor.p({
              width: "190rpx",
              height: "190rpx",
              radius: "18rpx",
              src: item.goodinfos.cover,
              fit: "fill"
            }),
            d: common_vendor.o(($event) => goPage("/pagesProductDetail/productDetail/productDetail?id=" + item.goodinfos.id), item.id),
            e: item.goodinfos.zjlx === "1"
          }, item.goodinfos.zjlx === "1" ? {
            f: "470b2b59-4-" + i0 + "," + ("470b2b59-2-" + i0),
            g: common_vendor.p({
              text1: "官方质检",
              text1Color: "#E6432E",
              text2: item.goodinfos.finenessname,
              backgroundColor: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
            })
          } : {}, {
            h: item.goodinfos.zjlx === "2"
          }, item.goodinfos.zjlx === "2" ? {
            i: "470b2b59-5-" + i0 + "," + ("470b2b59-2-" + i0),
            j: common_vendor.p({
              text1: "授权质检",
              text1Color: "#246C14",
              text2: item.goodinfos.finenessname,
              backgroundColor: "linear-gradient( 135deg, #246B13 0%, #39D591 100%)"
            })
          } : {}, {
            k: item.goodinfos.zjlx === "3"
          }, item.goodinfos.zjlx === "3" ? {
            l: "470b2b59-6-" + i0 + "," + ("470b2b59-2-" + i0),
            m: common_vendor.p({
              text1: "自由货源",
              text1Color: "#FF6C27",
              text2: item.goodinfos.finenessname,
              backgroundColor: "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "
            })
          } : {}, {
            n: common_vendor.t(item.goodinfos.name),
            o: common_vendor.o(($event) => goPage("/pagesProductDetail/productDetail/productDetail?id=" + item.goodinfos.id), item.id),
            p: common_vendor.t(item.goodinfos.gjbbname),
            q: common_vendor.t(item.goodinfos.wlbbname),
            r: common_vendor.t(item.goodinfos.gjbbname),
            s: common_vendor.t(item.goodinfos.efficiency),
            t: common_vendor.t(item.goodinfos.delivery),
            v: common_vendor.o(($event) => goPage("/pagesProductDetail/productDetail/productDetail?id=" + item.goodinfos.id), item.id),
            w: common_vendor.t(item.goodinfos.price),
            x: common_vendor.o(($event) => goPage("/pagesProductDetail/productDetail/productDetail?id=" + item.goodinfos.id), item.id),
            y: item.zt == "1"
          }, item.zt == "1" ? {
            z: isSelected(item.id) ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png",
            A: common_vendor.o(($event) => toggleSelection(item.id), item.id)
          } : {}, {
            B: common_vendor.o(($event) => onClick(item.id), item.id),
            C: "470b2b59-7-" + i0 + "," + ("470b2b59-2-" + i0),
            D: "470b2b59-2-" + i0 + ",470b2b59-1",
            E: item.id
          });
        }),
        b: common_vendor.p({
          type: "trash",
          size: "50"
        }),
        c: common_vendor.p({
          rightWidth: "59"
        }),
        d: common_vendor.sr(paging, "470b2b59-1", {
          "k": "paging"
        }),
        e: common_vendor.o(queryList),
        f: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        g: common_vendor.p({
          fixed: false,
          ["show-refresher-update-time"]: true,
          modelValue: common_vendor.unref(dataList)
        }),
        h: common_vendor.unref(allSelected) ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png",
        i: common_vendor.o(toggleAllSelection),
        j: common_vendor.o(deleteSelectedItems),
        k: common_vendor.t(common_vendor.unref(selectedItemsTotalPrice)),
        l: common_vendor.o(settlement)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-470b2b59"]]);
wx.createPage(MiniProgramPage);
