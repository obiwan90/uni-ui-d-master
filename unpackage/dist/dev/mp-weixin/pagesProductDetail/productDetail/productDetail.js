"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
const pagesProductDetail_api_api = require("../api/api.js");
const api_shopCard_shopCard = require("../../api/shopCard/shopCard.js");
const utils_common = require("../../utils/common.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
if (!Array) {
  const _easycom_custom_channel_tap2 = common_vendor.resolveComponent("custom-channel-tap");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_custom_channel_tap2 + _component_van_tag + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup2 + _easycom_uni_badge2)();
}
const _easycom_custom_channel_tap = () => "../../components/custom-channel-tap/custom-channel-tap.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_custom_channel_tap + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse + common_vendor.unref(poster) + _easycom_uni_popup + common_vendor.unref(bargainingPannel) + common_vendor.unref(detailProductEditPrice) + _easycom_uni_badge + common_vendor.unref(share) + common_vendor.unref(posterPannel))();
}
const share = () => "./components/share.js";
const poster = () => "./components/poster.js";
const posterPannel = () => "./components/posterPannel.js";
const bargainingPannel = () => "./components/bargaining.js";
const detailProductEditPrice = () => "./components/detailProductEditPrice.js";
const _sfc_main = {
  __name: "productDetail",
  setup(__props) {
    const goPath = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const isShow = common_vendor.ref(false);
    const beforeleave = () => {
      isShow.value = false;
      common_vendor.index.reLaunch({
        url: "/pages/home/home"
      });
    };
    const instance = common_vendor.getCurrentInstance();
    const selectedMine = common_vendor.index.getStorageSync("selectedMine");
    const identityData = common_vendor.index.getStorageSync("identityData");
    const adminId = common_vendor.index.getStorageSync("adminId");
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const qualityPosterPopup = common_vendor.ref(null);
    const posterPrice = common_vendor.ref("");
    const shareInfo = common_vendor.ref(null);
    const sharePopup = common_vendor.ref(null);
    const showSellPoster = common_vendor.ref(false);
    const showQualityPosterPannel = common_vendor.ref(false);
    const showPannel = common_vendor.ref(false);
    const productEditPricePopup = common_vendor.ref(null);
    const showProductEditPrice = common_vendor.ref(false);
    const posterPopup = common_vendor.ref(null);
    const bargainingPopup = common_vendor.ref(null);
    const editPricePopup = common_vendor.ref(null);
    const selectedGood = common_vendor.ref();
    common_vendor.ref(null);
    const posterData = common_vendor.ref();
    const shareShow = common_vendor.ref(false);
    const param = common_vendor.ref({ id: "" });
    const jbztycbg = common_vendor.ref([]);
    const gnjcycbg = common_vendor.ref([]);
    const wxjcycbg = common_vendor.ref([]);
    const zjbg = common_vendor.ref([]);
    const infos = common_vendor.ref(null);
    const qualityinspection = common_vendor.ref([]);
    const urls = common_vendor.ref([]);
    const titleRemarl = common_vendor.ref("");
    const shopCarCount = common_vendor.computed(() => stores_userInfoStore.useUserStore().shopCount);
    const modelData = common_vendor.ref([
      { type: "gjbbname", title: "国家版本", value: "无" },
      { type: "wlbbname", title: "网络版本", value: "无" },
      { type: "bxzt", title: "保修状态", value: "无" },
      { type: "efficiency", title: "电池效率", value: "无" },
      { type: "delivery", title: "发货地", value: "无" }
    ]);
    const showSetting = common_vendor.computed(() => stores_menuPermissionStore.usePermissionStore().hasMenuAuthority("updategoods") && adminId !== "");
    const mineCompany = common_vendor.computed(() => {
      if (adminId && selectedMine && identityData) {
        const selectedIdentity = identityData[selectedMine];
        return selectedIdentity ? infos.value.gsid === selectedIdentity.gsid : false;
      }
      return false;
    });
    const handleClose = () => {
      var _a, _b, _c, _d;
      (_a = posterPopup.value) == null ? void 0 : _a.close();
      (_b = bargainingPopup.value) == null ? void 0 : _b.close();
      (_c = editPricePopup.value) == null ? void 0 : _c.close();
      (_d = productEditPricePopup.value) == null ? void 0 : _d.close();
    };
    const change = (e) => {
      showPannel.value = e.show;
      if (!e.show) {
        showSellPoster.value = false;
        showQualityPosterPannel.value = false;
        showProductEditPrice.value = false;
      }
    };
    const showPosterPannel = () => {
      var _a;
      return (_a = posterPopup.value) == null ? void 0 : _a.open();
    };
    const showbBargaining = () => {
      var _a;
      return (_a = bargainingPopup.value) == null ? void 0 : _a.open();
    };
    const openSellPosterPannel = async (data) => {
      var _a;
      posterData.value = data;
      shareInfo.value = infos.value;
      shareShow.value = true;
      await common_vendor.nextTick$1();
      setTimeout(() => {
        var _a2;
        (_a2 = sharePopup.value) == null ? void 0 : _a2.handleShow();
      }, 1e3);
      (_a = posterPopup.value) == null ? void 0 : _a.close();
    };
    const closeSharePannel = () => shareShow.value = false;
    const openPosterPannel = () => {
      var _a;
      shareInfo.value = infos.value;
      (_a = qualityPosterPopup.value) == null ? void 0 : _a.posterShow();
    };
    const openEditPannel = (goodData) => {
      var _a;
      selectedGood.value = goodData;
      showProductEditPrice.value = true;
      (_a = productEditPricePopup.value) == null ? void 0 : _a.open();
    };
    const getTime = (timestamp) => {
      const date = new Date(timestamp * 1e3);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    const showImage = (id) => zjbg.value.some((item) => item.id === id);
    const preview = (id) => {
      const images = zjbg.value.map((item) => item.url);
      const index = zjbg.value.findIndex((item) => item.id === id);
      common_vendor.index.previewImage({ current: index, urls: images });
    };
    const getProductDetail = async (param2) => {
      try {
        common_vendor.index.showLoading({
          title: "加载中..."
        });
        const res = await pagesProductDetail_api_api.apiGetProductDetail({ id: param2.value.id });
        if (res.code === "200") {
          infos.value = res.infos;
          jbztycbg.value = infos.value.jbztycbg ? JSON.parse(infos.value.jbztycbg) : [];
          gnjcycbg.value = infos.value.gnjcycbg ? JSON.parse(infos.value.gnjcycbg) : [];
          wxjcycbg.value = infos.value.wxjcycbg ? JSON.parse(infos.value.wxjcycbg) : [];
          zjbg.value = [...jbztycbg.value, ...gnjcycbg.value, ...wxjcycbg.value].map((item) => ({ id: item.id, url: item.url }));
          const currentDate = /* @__PURE__ */ new Date();
          currentDate.setHours(0, 0, 0, 0);
          qualityinspection.value = res.infos.qualityinspection.map((item) => {
            item.er = item.er.filter((item1) => item1.name !== "液晶显示");
            item.er.forEach((item1) => {
              if (item1.name === "保修截止") {
                item1.xznr = new Date(infos.value.bxsj) < currentDate ? infos.value.bxzt : infos.value.bxsj;
                item1.xznrcor = "";
              }
            });
            return item;
          });
          const { yjxsimg, jswgimg, pmwgimg } = infos.value;
          urls.value = [
            { imgs: jswgimg.split(",") },
            { imgs: pmwgimg.split(",") },
            { imgs: yjxsimg.split(",") }
          ];
          if (res.yjinfos) {
            infos.value.combinationid.push(res.yjinfos.qminfos);
            infos.value.combinationname.push(res.yjinfos.name);
            infos.value.combinationyslist.push(res.yjinfos.color);
          }
          modelData.value = modelData.value.map((item) => ({
            ...item,
            value: res.infos[item.type] || "无"
          }));
          titleRemarl.value = [infos.value.jkbz, infos.value.gnjcbz, infos.value.wxjcbz, infos.value.pzbz, infos.value.csbz].join(" ");
        }
      } catch (error) {
        console.error("获取数据失败", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const onContact = (e) => {
      console.log(e);
    };
    const addShop = async () => {
      const res = await api_shopCard_shopCard.apiAddShopCard({
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        goodsid: infos.value.id
      });
      if (res.code === "200") {
        common_vendor.index.showToast({ title: "成功加入购物车", icon: "success" });
        stores_userInfoStore.useUserStore().shopCount++;
      } else {
        common_vendor.index.showToast({ title: "购物车已存在相同商品", icon: "none" });
      }
    };
    const settlement = async () => {
      await addShop();
      const queryString = encodeURIComponent(JSON.stringify({ lx: "2", id: param.value.id }));
      common_vendor.index.navigateTo({ url: `/pagesSubOrder/subOrder/subOrder?data=${queryString}` });
    };
    const goPage = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const previewQualityInspection = (urls2, url) => utils_common.previewImages(urls2, url);
    const shareImage = (url) => utils_common.previewImages((infos.value.productimage.endsWith(",") ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(","), url);
    const saveImages = () => utils_common.saveImagesToAlbum((infos.value.productimage.endsWith(",") ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(","));
    const reLoad = () => getProductDetail(param);
    common_vendor.onLoad(async (options) => {
      if (options.id)
        param.value.id = options.id;
      await getProductDetail(param);
      if (options.share)
        isShow.value = true;
      instance.proxy.setShareOptions({
        title: infos.value ? infos.value.name : "",
        imageUrl: (infos.value.productimage.endsWith(",") ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(",")[0],
        sharePath: "/pagesProductDetail/productDetail/productDetail?share=true&id=" + param.value.id
      });
    });
    common_vendor.onShow(async () => {
      await stores_userInfoStore.useUserStore().refreshShopCarCount();
      permissionStore.loadMenuAuthority();
      await getProductDetail(param);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShow.value
      }, isShow.value ? {
        b: isShow.value,
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: infos.value
      }, infos.value ? common_vendor.e({
        e: common_vendor.f((infos.value.productimage.endsWith(",") ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(","), (item, index, i0) => {
          return common_vendor.e({
            a: item !== ""
          }, item !== "" ? {
            b: item,
            c: common_vendor.o(($event) => shareImage(item), index)
          } : {}, {
            d: index
          });
        }),
        f: infos.value.zjlx === "1"
      }, infos.value.zjlx === "1" ? {
        g: common_vendor.p({
          text1: "官方质检",
          text1Color: "#E6432E",
          text2: infos.value.finenessname,
          backgroundColor: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        })
      } : {}, {
        h: infos.value.zjlx === "2"
      }, infos.value.zjlx === "2" ? {
        i: common_vendor.p({
          text1: "授权质检",
          text1Color: "#246C14",
          text2: infos.value.finenessname,
          backgroundColor: "linear-gradient( 135deg, #246B13 0%, #39D591 100%)"
        })
      } : {}, {
        j: infos.value.zjlx === "3"
      }, infos.value.zjlx === "3" ? {
        k: common_vendor.p({
          text1: "自由货源",
          text1Color: "#FF6C27",
          text2: infos.value.finenessname,
          backgroundColor: "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "
        })
      } : {}, {
        l: common_vendor.t(infos.value.name),
        m: common_vendor.t(infos.value.price),
        n: infos.value.special === "1"
      }, infos.value.special === "1" ? {} : {}, {
        o: infos.value.yjzt === 2
      }, infos.value.yjzt === 2 ? {
        p: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#EB4636"
        })
      } : {}, {
        q: infos.value.byzt === "1"
      }, infos.value.byzt === "1" ? {
        r: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#669CFD"
        })
      } : {}, {
        s: infos.value.byzt === "2"
      }, infos.value.byzt === "2" ? {
        t: common_vendor.p({
          size: "mini",
          plain: true,
          textColor: "#669CFD"
        })
      } : {}, {
        v: infos.value.yjzt === 2
      }, infos.value.yjzt === 2 ? {
        w: common_vendor.o(showbBargaining)
      } : {}, {
        x: common_vendor.f(modelData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.value),
            c: index
          };
        }),
        y: showSetting.value && mineCompany.value
      }, showSetting.value && mineCompany.value ? {
        z: common_vendor.t(infos.value.cgyname),
        A: common_vendor.t(infos.value.ckname),
        B: common_vendor.t(getTime(infos.value.updatetime)),
        C: common_vendor.o(($event) => openEditPannel(infos.value))
      } : {}, {
        D: common_vendor.o(($event) => goPath("/pagesAftersalesRules/aftersalesRules/aftersalesRules")),
        E: common_vendor.t(infos.value.zjr),
        F: common_vendor.t(infos.value.wpbm),
        G: common_vendor.o(($event) => common_vendor.unref(utils_common.copyText)(infos.value.wpbm.replace(/^XZXS/i, ""))),
        H: common_vendor.t(titleRemarl.value),
        I: common_vendor.f(infos.value.combinationid, (item, index, i0) => {
          var _a;
          return {
            a: common_vendor.t(item),
            b: common_vendor.t(infos.value.combinationname[index]),
            c: infos.value.combinationyslist[index],
            d: common_vendor.f((_a = urls.value[index]) == null ? void 0 : _a.imgs, (item2, index1, i1) => {
              return {
                a: index1,
                b: item2,
                c: common_vendor.o(($event) => {
                  var _a2;
                  return previewQualityInspection((_a2 = urls.value[index]) == null ? void 0 : _a2.imgs, item2);
                }, index1)
              };
            }),
            e: index
          };
        }),
        J: common_vendor.f(qualityinspection.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.ycnum === 0 ? "全部正常" : item.ycnum + "项异常"),
            c: item.ycnum === 0 ? "#41AF6F" : "#ED784B",
            d: "7061f7d6-9-" + i0 + "," + ("7061f7d6-8-" + i0),
            e: "7061f7d6-8-" + i0 + "," + ("7061f7d6-7-" + i0),
            f: common_vendor.f(item.er, (item1, index2, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item1.name),
                b: showImage(item1.id)
              }, showImage(item1.id) ? {} : {}, {
                c: common_vendor.t(item1.xznr),
                d: item1.xznrcor === "" ? "" : item1.xznrcor,
                e: common_vendor.o(($event) => preview(item1.id), index2),
                f: index2
              });
            }),
            g: index,
            h: "7061f7d6-7-" + i0 + ",7061f7d6-6"
          };
        }),
        K: common_vendor.p({
          border: false
        }),
        L: common_vendor.p({
          titleBorder: "none",
          border: false
        }),
        M: common_vendor.o(openSellPosterPannel),
        N: common_vendor.o(handleClose),
        O: common_vendor.p({
          infos: infos.value,
          modelData: modelData.value
        }),
        P: common_vendor.sr(posterPopup, "7061f7d6-10", {
          "k": "posterPopup"
        }),
        Q: common_vendor.o(handleClose),
        R: common_vendor.o(change),
        S: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        T: common_vendor.o(handleClose),
        U: param.value.id,
        V: common_vendor.p({
          id: param.value.id
        }),
        W: common_vendor.sr(bargainingPopup, "7061f7d6-12", {
          "k": "bargainingPopup"
        }),
        X: common_vendor.o(handleClose),
        Y: common_vendor.o(change),
        Z: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        }),
        aa: showProductEditPrice.value
      }, showProductEditPrice.value ? {
        ab: common_vendor.o(reLoad),
        ac: common_vendor.o(handleClose),
        ad: common_vendor.p({
          selectedGood: selectedGood.value,
          combinationname: infos.value.combinationname
        })
      } : {}, {
        ae: common_vendor.sr(productEditPricePopup, "7061f7d6-14", {
          "k": "productEditPricePopup"
        }),
        af: common_vendor.o(handleClose),
        ag: common_vendor.o(change),
        ah: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      }) : {}, {
        ai: !showPannel.value,
        aj: common_vendor.o(openPosterPannel),
        ak: common_vendor.o(saveImages),
        al: common_vendor.o(showPosterPannel),
        am: common_vendor.o(showPosterPannel),
        an: common_vendor.p({
          size: "small",
          text: "",
          absolute: "rightTop",
          type: "error"
        }),
        ao: common_vendor.o(onContact),
        ap: "/pagesProductDetail/productDetail/productDetail?share=true&id=" + param.value.id,
        aq: common_vendor.p({
          size: "small",
          text: shopCarCount.value,
          absolute: "rightTop",
          type: "error"
        }),
        ar: common_vendor.o(($event) => goPage("/pagesShopCar/shopCar/shopCar")),
        as: common_vendor.o(($event) => addShop()),
        at: common_vendor.o(settlement),
        av: shareShow.value
      }, shareShow.value ? {
        aw: common_vendor.sr(sharePopup, "7061f7d6-18", {
          "k": "sharePopup"
        }),
        ax: common_vendor.o(closeSharePannel),
        ay: common_vendor.p({
          posterPrice: posterPrice.value,
          infos: shareInfo.value,
          data: posterData.value,
          qualityinspection: qualityinspection.value,
          modelData: modelData.value
        })
      } : {}, {
        az: common_vendor.sr(qualityPosterPopup, "7061f7d6-19", {
          "k": "qualityPosterPopup"
        }),
        aA: common_vendor.p({
          infos: shareInfo.value,
          titleRemarl: titleRemarl.value,
          modelData: modelData.value,
          qualityinspection: qualityinspection.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7061f7d6"]]);
wx.createPage(MiniProgramPage);
