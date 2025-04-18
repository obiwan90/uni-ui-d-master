"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_interceptor_js = require("./utils/interceptor.js.js");
const stores_tokenStore = require("./stores/tokenStore.js");
const stores_userInfoStore = require("./stores/userInfoStore.js");
const stores_locationStore = require("./stores/locationStore.js");
const api_station_station = require("./api/station/station.js");
const stores_initFinished = require("./stores/initFinished.js");
const uni_modules_uvUiTools_index = require("./uni_modules/uv-ui-tools/index.js");
const utils_mixin = require("./utils/mixin.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/test/test.js";
  "./pagesClassify/classify/classify.js";
  "./pagesProduct/product/product.js";
  "./pagesShop/index/index.js";
  "./pagesShopCar/shopCar/shopCar.js";
  "./pagesSearch/search/search.js";
  "./pagesMaintenance/maintenance/maintenance.js";
  "./pagesLogin/login/login.js";
  "./pagesProductDetail/productDetail/productDetail.js";
  "./pagesSubOrder/subOrder/subOrder.js";
  "./pagesPaySuccess/paySuccess/paySuccess.js";
  "./pagesRecovery/recovery/recovery.js";
  "./pagesMarket/market/market.js";
  "./pagesSeeking/seeking/seeking.js";
  "./pagesSell/sell/sell.js";
  "./pagesNewSell/newSell/newSell.js";
  "./pagesNewSeeking/newSeeking/newSeeking.js";
  "./pagesNewPosting/newPosting/newPosting.js";
  "./pagesAddress/address/address.js";
  "./pagesAddAddress/addAddress/addAddress.js";
  "./pagesCustomMine/customMine/customMine.js";
  "./pagesUserMine/userMine/userMine.js";
  "./pagesMenber/menber/menber.js";
  "./pagesOrder/order/order.js";
  "./pagesOrderDetail/orderDetail/orderDetail.js";
  "./pagesFirseProduct/fristProduct/fristProduct.js";
  "./pagesAccount/account/account.js";
  "./pagesMarketCount/marketCount/marketCount.js";
  "./pagesFineness/fineness/fineness.js";
  "./pagesFinenessDetail/finenessDetail/finenessDetail.js";
  "./pagesFinenessJudge/finenessJudge/finenessJudge.js";
  "./pagesSuggest/suggest/suggest.js";
  "./pagesProductInput/productInput/productInput.js";
  "./pagesFuncCheck/funcCheck/funcCheck.js";
  "./pagesMaintenanceInput/maintenanceInput/maintenanceInput.js";
  "./pagesYjOrderDetail/yjOrderDetail/yjOrderDetail.js";
  "./pagesShOrderDetail/shOrderDetail/shOrderDetail.js";
  "./pagesCustomFristProductAfterSales/customFristProductAfterSalse/customFristProductAfterSalse.js";
  "./pagesCustomOrder/customOrder/customOrder.js";
  "./pagesCustomSellOrderDetail/customSellOrderDetail/customSellOrderDetail.js";
  "./pagesCustomServiceOrderDetail/customServiceOrderDetail/customServiceOrderDetail.js";
  "./pagesCustomYjOrderDetail/customYjOrderDetail/customYjOrderDetail.js";
  "./pagesServiceOrderDetail/serviceOrderDetail/serviceOrderDetail.js";
  "./pagesQualityControl/qualityControl/qualityControl.js";
  "./pagesFinance/finance/finance.js";
  "./pagesRecoveryDetail/recoveryDetail/recoveryDetail.js";
  "./pagesEditLog/editLog/editLog.js";
  "./pagesTakePhoto/takePhoto/takePhoto.js";
  "./pagesListingProduct/listingProduct/listingProduct.js";
  "./pagesInventoryManager/inventoryManager/inventoryManager.js";
  "./pagesFirstWholesale/firstWholeSale/firstWholeSale.js";
  "./pagesImeiTrack/ImeiTrack/imeiTrack.js";
  "./pagesDataCenter/dataCenter/dataCenter.js";
  "./pagesCustomManager/customManager/customManager.js";
  "./pagesMyCustomer/myCustomer/myCustomer.js";
  "./pagesDataCenterDetail/dataCenterDetail/dataCenterDetail.js";
  "./pagesDataCenterProductData/dataCenterProductData/dataCenterProductData.js";
  "./pagesDataCenterProductList/dataCenterProductList/dataCenterProductList.js";
  "./pagesFinanceDetail/financeDetail/financeDetail.js";
  "./pagesStaffManager/staffManager/staffManager.js";
  "./pagesAuthority/authority/authority.js";
  "./pagesStaffInfos/staffInfos/staffInfos.js";
  "./pagesFinenessLevel/finenessLevel/pagesFinenessLevel.js";
  "./pagesRecoveryLevel/recoveryLevel/recoveryLevel.js";
  "./pagesOneClickUpload/oneClickUpload/oneClickUpload.js";
  "./pagesProcurementDescription/procurementDescription/procurementDescription.js";
  "./pagesAdmin/admin/admin.js";
  "./pagesPayAccount/payAccount/payAccount.js";
  "./pagesAftersalesRules/aftersalesRules/aftersalesRules.js";
  "./pagesWarehouseManagement/warehouseManagement/warehouseManagement.js";
  "./pagesWarehouseManagement/warehouseManagement/new.js";
  "./pagesMovingInventory/movingInventory/movingInventory.js";
  "./pagesShippingAddress/shippingAddress/shippingAddress.js";
  "./pagesShippingAddress/shippingAddress/new.js";
  "./pagesWithdrawal/withdrawal/withdrawal.js";
  "./pagesApproval/approval/approval.js";
  "./pagesQualityReport/qualityReport/qualityReport.js";
}
const _sfc_main = {
  onLaunch: async function() {
    stores_initFinished.useInitFinishedStore().setInitFinished(false);
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    utils_interceptor_js.routingIntercept();
    const session = await stores_tokenStore.useTokenStore().getSession();
    console.log("session 检查:", session);
    await this.initializeApp();
    stores_initFinished.useInitFinishedStore().setInitFinished(true);
    common_vendor.index.hideLoading();
  },
  onShow: async function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    async initializeApp() {
      console.log("App onLaunch");
      const [locationRes, tokenRes, shopCarCountRes, authorityRes] = await Promise.all([
        stores_locationStore.useLocationStore().getForm(),
        stores_tokenStore.useTokenStore().getToken(),
        stores_userInfoStore.useUserStore().refreshShopCarCount(),
        api_station_station.apiGetAuthority()
      ]);
      console.log("定位 检查:", locationRes);
      console.log("token 检查:", tokenRes);
      console.log("刷新购物车:", JSON.parse(shopCarCountRes));
      console.log("authorityList res:", authorityRes);
      if (authorityRes.code === 200) {
        authorityRes.lists.forEach((item) => {
          if (item.url === "xcx") {
            let authorityList = extractUrls(item.lists);
            common_vendor.index.setStorageSync("authorityList", authorityList);
            console.log("权限获取:", authorityList);
            return;
          }
        });
      }
      let qxlists = common_vendor.index.getStorageSync("qxlists");
      if (qxlists) {
        const userAuthorityUrls = extractUrls(qxlists);
        console.log("userAuthorityUrls:", userAuthorityUrls);
        common_vendor.index.setStorageSync("userAuthorityUrls", userAuthorityUrls);
        console.log("用户权限获取:", userAuthorityUrls);
      }
      const updateManager = common_vendor.index.getUpdateManager();
      console.log("updateManager：", updateManager);
      updateManager.onCheckForUpdate((res) => {
        console.log("cheack res:", res);
        if (res && res.hasUpdate) {
          common_vendor.index.showLoading({
            title: "小程序更新中"
          });
        }
      });
      updateManager.onUpdateReady(function(res) {
        console.log("uptateRedy res:", res);
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res2) {
            if (res2.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed((res) => {
        console.log("update failed res:", res);
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "提示",
          content: "更新应用失败",
          showCancel: false,
          success: (res2) => {
            if (res2.confirm) {
              this.checkPcLogin(query);
            }
          }
        });
      });
      function extractUrls(data) {
        const result = {
          route: [],
          menu: [],
          api: []
        };
        function traverse(nodes) {
          for (const node of nodes) {
            const urls = node.url.split(",");
            for (const url of urls) {
              if (url.startsWith("route:")) {
                result.route.push(url.slice(6));
              } else if (url.startsWith("menu:")) {
                result.menu.push(url.slice(5));
              } else if (url.startsWith("api:")) {
                result.api.push(url.slice(4));
              }
            }
            if (node.lists && node.lists.length > 0) {
              traverse(node.lists);
            }
          }
        }
        traverse(data);
        return result;
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  app.use(uni_modules_uvUiTools_index.uvUI);
  app.mixin(utils_mixin.shareMixin);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
