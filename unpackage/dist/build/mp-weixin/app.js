"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./common/vendor.js"),o=require("./utils/interceptor.js.js"),t=require("./stores/tokenStore.js"),s=require("./stores/userInfoStore.js"),i=require("./stores/locationStore.js"),n=require("./api/station/station.js"),r=require("./stores/initFinished.js"),a=require("./uni_modules/uv-ui-tools/index.js"),c=require("./utils/mixin.js");Math;const l={onLaunch:async function(){r.useInitFinishedStore().setInitFinished(!1),e.index.showLoading({title:"加载中..."}),o.routingIntercept();const s=await t.useTokenStore().getSession();console.log("session 检查:",s),await this.initializeApp(),r.useInitFinishedStore().setInitFinished(!0),e.index.hideLoading()},onShow:async function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{async initializeApp(){console.log("App onLaunch");const[o,r,a,c]=await Promise.all([i.useLocationStore().getForm(),t.useTokenStore().getToken(),s.useUserStore().refreshShopCarCount(),n.apiGetAuthority()]);console.log("定位 检查:",o),console.log("token 检查:",r),console.log("刷新购物车:",JSON.parse(a)),console.log("authorityList res:",c),200===c.code&&c.lists.forEach((o=>{if("xcx"===o.url){let t=d(o.lists);return e.index.setStorageSync("authorityList",t),void console.log("权限获取:",t)}}));let l=e.index.getStorageSync("qxlists");if(l){const o=d(l);console.log("userAuthorityUrls:",o),e.index.setStorageSync("userAuthorityUrls",o),console.log("用户权限获取:",o)}const u=e.index.getUpdateManager();function d(e){const o={route:[],menu:[],api:[]};return function e(t){for(const s of t){const t=s.url.split(",");for(const e of t)e.startsWith("route:")?o.route.push(e.slice(6)):e.startsWith("menu:")?o.menu.push(e.slice(5)):e.startsWith("api:")&&o.api.push(e.slice(4));s.lists&&s.lists.length>0&&e(s.lists)}}(e),o}console.log("updateManager：",u),u.onCheckForUpdate((o=>{console.log("cheack res:",o),o&&o.hasUpdate&&e.index.showLoading({title:"小程序更新中"})})),u.onUpdateReady((function(o){console.log("uptateRedy res:",o),e.index.hideLoading(),e.index.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success(e){e.confirm&&u.applyUpdate()}})})),u.onUpdateFailed((o=>{console.log("update failed res:",o),e.index.hideLoading(),e.index.showModal({title:"提示",content:"更新应用失败",showCancel:!1,success:e=>{e.confirm&&this.checkPcLogin(query)}})}))}}};function u(){const o=e.createSSRApp(l);return o.use(e.createPinia()),o.use(a.uvUI),o.mixin(c.shareMixin),{app:o,Pinia:e.Pinia}}u().app.mount("#app"),exports.createApp=u;
