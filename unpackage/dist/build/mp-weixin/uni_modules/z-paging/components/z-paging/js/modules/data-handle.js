"use strict";const e=require("../../../../../../common/vendor.js"),t=require("../z-paging-utils.js"),a=require("../z-paging-constant.js"),i=require("../z-paging-enum.js"),s=require("../z-paging-interceptor.js"),h={props:{defaultPageNo:{type:[Number,String],default:t.u.gc("defaultPageNo",1),observer:function(e){this.pageNo=e}},defaultPageSize:{type:[Number,String],default:t.u.gc("defaultPageSize",10),validator:e=>(e<=0&&t.u.consoleErr("default-page-size必须大于0！"),e>0)},dataKey:{type:[Number,String,Object],default:t.u.gc("dataKey",null)},useCache:{type:Boolean,default:t.u.gc("useCache",!1)},cacheKey:{type:String,default:t.u.gc("cacheKey",null)},cacheMode:{type:String,default:t.u.gc("cacheMode",i.Enum.CacheMode.Default)},autowireListName:{type:String,default:t.u.gc("autowireListName","")},autowireQueryName:{type:String,default:t.u.gc("autowireQueryName","")},fetch:{type:Function,default:null},fetchParams:{type:Object,default:t.u.gc("fetchParams",null)},auto:{type:Boolean,default:t.u.gc("auto",!0)},reloadWhenRefresh:{type:Boolean,default:t.u.gc("reloadWhenRefresh",!0)},autoScrollToTopWhenReload:{type:Boolean,default:t.u.gc("autoScrollToTopWhenReload",!0)},autoCleanListWhenReload:{type:Boolean,default:t.u.gc("autoCleanListWhenReload",!0)},showRefresherWhenReload:{type:Boolean,default:t.u.gc("showRefresherWhenReload",!1)},showLoadingMoreWhenReload:{type:Boolean,default:t.u.gc("showLoadingMoreWhenReload",!1)},createdReload:{type:Boolean,default:t.u.gc("createdReload",!1)},localPagingLoadingTime:{type:[Number,String],default:t.u.gc("localPagingLoadingTime",200)},concat:{type:Boolean,default:t.u.gc("concat",!0)},callNetworkReject:{type:Boolean,default:t.u.gc("callNetworkReject",!0)},value:{type:Array,default:function(){return[]}},modelValue:{type:Array,default:function(){return[]}}},data:()=>({currentData:[],totalData:[],realTotalData:[],totalLocalPagingList:[],dataPromiseResultMap:{reload:null,complete:null,localPaging:null},isSettingCacheList:!1,pageNo:1,currentRefreshPageSize:0,isLocalPaging:!1,isAddedData:!1,isTotalChangeFromAddData:!1,privateConcat:!0,myParentQuery:-1,firstPageLoaded:!1,pagingLoaded:!1,loaded:!1,isUserReload:!0,fromEmptyViewReload:!1,queryFrom:"",listRendering:!1,isHandlingRefreshToPage:!1,isFirstPageAndNoMore:!1,totalDataChangeThrow:!0}),computed:{pageSize(){return this.defaultPageSize},finalConcat(){return this.concat&&this.privateConcat},finalUseCache(){return this.useCache&&!this.cacheKey&&t.u.consoleErr("use-cache为true时，必须设置cache-key，否则缓存无效！"),this.useCache&&!!this.cacheKey},finalCacheKey(){return this.cacheKey?`${a.c.cachePrefixKey}-${this.cacheKey}`:null},isFirstPage(){return this.pageNo===this.defaultPageNo}},watch:{totalData(e,t){this._totalDataChange(e,t,this.totalDataChangeThrow),this.totalDataChangeThrow=!0},currentData(e,t){this._currentDataChange(e,t)},useChatRecordMode(e,t){e&&(this.nLoadingMoreFixedHeight=!1)},value:{handler(e){e!==this.totalData&&(this.totalDataChangeThrow=!1,this.totalData=e)},immediate:!0},modelValue:{handler(e){e!==this.totalData&&(this.totalDataChangeThrow=!1,this.totalData=e)},immediate:!0}},methods:{complete(e,t=!0){return this.customNoMore=-1,this.addData(e,t)},completeByKey(e,t=null,a=!0){return null!==t&&null!==this.dataKey&&t!==this.dataKey?(this.isFirstPage&&this.endRefresh(),new Promise((e=>e()))):(this.customNoMore=-1,this.addData(e,a))},completeByTotal(e,t,a=!0){if("undefined"==t)this.customNoMore=-1;else{const i=this._checkDataType(e,a,!1);if(e=i.data,a=i.success,t>=0&&a)return new Promise(((i,s)=>{this.$nextTick((()=>{let h=!1;let o=(this.pageNo==this.defaultPageNo?0:this.realTotalData.length)+(this.privateConcat?e.length:0)-t;o>=0&&(h=!0,o=this.defaultPageSize-o,this.privateConcat&&o>0&&o<e.length&&(e=e.splice(0,o))),this.completeByNoMore(e,h,a).then((e=>i(e))).catch((()=>s()))}))}))}return this.addData(e,a)},completeByNoMore(e,t,a=!0){return"undefined"!=t&&(this.customNoMore=1==t?1:0),this.addData(e,a)},completeByError(e){return this.customerEmptyViewErrorText=e,this.complete(!1)},addData(e,a=!0){this.fromCompleteEmit||(this.disabledCompleteEmit=!0,this.fromCompleteEmit=!1);const i=t.u.getTime()-this.requestTimeStamp;let s=this.minDelay;this.isFirstPage&&this.finalShowRefresherWhenReload&&(s=Math.max(400,s));const h=this.requestTimeStamp>0&&i<s?s-i:0;return this.$nextTick((()=>{t.u.delay((()=>{this._addData(e,a,!1)}),this.delay>0?this.delay:h)})),new Promise(((e,t)=>{this.dataPromiseResultMap.complete={resolve:e,reject:t}}))},addDataFromTop(e,a=!0,i=!0){let s=!this.isChatRecordModeAndNotInversion;e="[object Array]"!==Object.prototype.toString.call(e)?[e]:s?e.reverse():e,this.finalUseVirtualList&&this._setCellIndex(e,"top"),this.totalData=s?[...e,...this.totalData]:[...this.totalData,...e],a&&t.u.delay((()=>this.useChatRecordMode?this.scrollToBottom(i):this.scrollToTop(i)))},resetTotalData(e){this.isTotalChangeFromAddData=!0,e="[object Array]"!==Object.prototype.toString.call(e)?[e]:e,this.totalData=e},setLocalPaging(e,t=!0){return this.isLocalPaging=!0,this.$nextTick((()=>{this._addData(e,t,!0)})),new Promise(((e,t)=>{this.dataPromiseResultMap.localPaging={resolve:e,reject:t}}))},reload(e=this.showRefresherWhenReload){return e&&(this.privateShowRefresherWhenReload=e,this.isUserPullDown=!0),this.showLoadingMoreWhenReload||(this.listRendering=!0),this.$nextTick((()=>{this._preReload(e,!1)})),new Promise(((e,t)=>{this.dataPromiseResultMap.reload={resolve:e,reject:t}}))},refresh(){return this._handleRefreshWithDisPageNo(this.pageNo-this.defaultPageNo+1)},refreshToPage(e){return this.isHandlingRefreshToPage=!0,this._handleRefreshWithDisPageNo(e+this.defaultPageNo-1)},updateCache(){this.finalUseCache&&this.totalData.length&&this._saveLocalCache(this.totalData.slice(0,Math.min(this.totalData.length,this.pageSize)))},clean(){this._reload(!0),this._addData([],!0,!1)},clear(){this.clean()},_preReload(e=this.showRefresherWhenReload,s=!0,h=0){const o=this.finalRefresherEnabled&&this.useCustomRefresher;-1===this.customRefresherHeight&&o?t.u.delay((()=>{++h%10==0&&this._updateCustomRefresherHeight(),this._preReload(e,s,h)}),a.c.delayTime/2):(this.isUserReload=!0,this.loadingType=i.Enum.LoadingType.Refresher,e?(this.privateShowRefresherWhenReload=e,this.useCustomRefresher?this._doRefresherRefreshAnimate():this.refresherTriggered=!0):this._refresherEnd(!1,!1,!1,!1),this._reload(!1,s))},_reload(e=!1,a=!1,s=!1){if(this.isAddedData=!1,this.insideOfPaging=-1,this.cacheScrollNodeHeight=-1,this.pageNo=this.defaultPageNo,this._cleanRefresherEndTimeout(),!this.privateShowRefresherWhenReload&&!e&&this._startLoading(!0),this.firstPageLoaded=!0,this.isTotalChangeFromAddData=!1,this.isSettingCacheList||(this.totalData=[]),!e){this._emitQuery(this.pageNo,this.defaultPageSize,s?i.Enum.QueryFrom.UserPullDown:i.Enum.QueryFrom.Reload);let e=0;t.u.delay(this._callMyParentQuery,e),!a&&this.autoScrollToTopWhenReload&&this._scrollToTop(!1)}},_addData(e,s,h){this.isAddedData=!0,this.fromEmptyViewReload=!1,this.isTotalChangeFromAddData=!0,this.refresherTriggered=!1,this._endSystemLoadingAndRefresh();const o=this.isUserPullDown;this.showRefresherUpdateTime&&this.isFirstPage&&(t.u.setRefesrherTime(t.u.getTime(),this.refresherUpdateTimeKey),this.$refs.refresh&&this.$refs.refresh.updateTime()),!h&&o&&this.isFirstPage&&(this.isUserPullDown=!1),this.isFirstPage?this.listRendering=!1:(this.listRendering=!0,this.$nextTick((()=>{t.u.delay((()=>this.listRendering=!1))})));let r=this._checkDataType(e,s,h);e=r.data,s=r.success;let l=a.c.delayTime;if(this.useChatRecordMode&&(l=0),this.loadingForNow=!1,t.u.delay((()=>{this.pagingLoaded=!0,this.$nextTick((()=>{!h&&this._refresherEnd(l>0,!0,o)}))})),this.isFirstPage&&(this.isLoadFailed=!s,this.$emit("isLoadFailedChange",this.isLoadFailed),this.finalUseCache&&s&&(this.cacheMode===i.Enum.CacheMode.Always||this.isSettingCacheList)&&this._saveLocalCache(e)),this.isSettingCacheList=!1,s){if((!1!==this.privateConcat||this.isHandlingRefreshToPage||this.loadingStatus!==i.Enum.More.NoMore)&&(this.loadingStatus=i.Enum.More.Default),h){this.totalLocalPagingList=e;const t=this.defaultPageNo,a=this.queryFrom!==i.Enum.QueryFrom.Refresh?this.defaultPageSize:this.currentRefreshPageSize;this._localPagingQueryList(t,a,0,(e=>{this.completeByTotal(e,this.totalLocalPagingList.length)}))}else{let a=0;t.u.delay((()=>{this._currentDataChange(e,this.currentData),this._callDataPromise(!0,this.totalData)}),a)}this.isHandlingRefreshToPage&&(this.isHandlingRefreshToPage=!1,this.pageNo=this.defaultPageNo+Math.ceil(e.length/this.pageSize)-1,e.length%this.pageSize!=0&&(this.customNoMore=1))}else this._currentDataChange(e,this.currentData),this._callDataPromise(!1),this.loadingStatus=i.Enum.More.Fail,this.isHandlingRefreshToPage=!1,this.loadingType===i.Enum.LoadingType.LoadingMore&&this.pageNo--},_totalDataChange(e,i,s=!0){(this.isUserReload&&this.autoCleanListWhenReload||!this.firstPageLoaded||e.length||!i.length)&&(this._doCheckScrollViewShouldFullHeight(e),this.realTotalData.length||e.length||(s=!1),this.realTotalData=e,s&&(this.$emit("input",e),this.$emit("update:modelValue",e),this.$emit("update:list",e),this.$emit("listChange",e),this._callMyParentList(e)),this.firstPageLoaded=!1,this.isTotalChangeFromAddData=!1,this.$nextTick((()=>{t.u.delay((()=>{this._getNodeClientRect(".zp-paging-container-content").then((e=>{e&&this.$emit("contentHeightChanged",e[0].height)}))}),a.c.delayTime*(this.isIos?1:3))})))},_currentDataChange(e,a){if(e=[...e],this.finalUseVirtualList&&this._setCellIndex(e,"bottom"),this.isFirstPage&&this.finalConcat&&(this.totalData=[]),-1!==this.customNoMore?(1===this.customNoMore||0!==this.customNoMore&&!e.length)&&(this.loadingStatus=i.Enum.More.NoMore):(!e.length||e.length&&e.length<this.defaultPageSize)&&(this.loadingStatus=i.Enum.More.NoMore),this.totalData.length)if(this.finalConcat){const a=this.oldScrollTop;this.totalData=[...this.totalData,...e],this.isIos||this.refresherOnly||this.usePageScroll||!e.length||(this.loadingMoreTimeStamp=t.u.getTime(),this.$nextTick((()=>{this.scrollToY(a)})))}else this.totalData=e;else this.totalData=e;this.privateConcat=!0},_handleRefreshWithDisPageNo(e){if(!this.isHandlingRefreshToPage&&!this.realTotalData.length)return this.reload();if(e>=1){this.loading=!0,this.privateConcat=!1;const t=e*this.pageSize;this.currentRefreshPageSize=t,this.isLocalPaging&&this.isHandlingRefreshToPage?this._localPagingQueryList(this.defaultPageNo,t,0,(e=>{this.complete(e)})):(this._emitQuery(this.defaultPageNo,t,i.Enum.QueryFrom.Refresh),this._callMyParentQuery(this.defaultPageNo,t))}return new Promise(((e,t)=>{this.dataPromiseResultMap.reload={resolve:e,reject:t}}))},_localPagingQueryList(e,a,i,s){e=Math.max(1,e),a=Math.max(1,a);const h=[...this.totalLocalPagingList],o=(e-1)*a,r=Math.min(h.length,o+a),l=h.splice(o,r-o);t.u.delay((()=>s(l)),i)},_saveLocalCache(t){e.index.setStorageSync(this.finalCacheKey,t)},_setListByLocalCache(){this.totalData=e.index.getStorageSync(this.finalCacheKey)||[],this.isSettingCacheList=!0},_callMyParentList(e){if(this.autowireListName.length){const a=t.u.getParent(this.$parent);a&&a[this.autowireListName]&&(a[this.autowireListName]=e)}},_callMyParentQuery(e=0,a=0){if(this.autowireQueryName){if(-1===this.myParentQuery){const e=t.u.getParent(this.$parent);e&&e[this.autowireQueryName]&&(this.myParentQuery=e[this.autowireQueryName])}-1!==this.myParentQuery&&(a>0?this.myParentQuery(e,a):this.myParentQuery(this.pageNo,this.defaultPageSize))}},_emitQuery(e,a,i){this.queryFrom=i,this.requestTimeStamp=t.u.getTime();const[h]=this.realTotalData.slice(-1);if(this.fetch){const o=s.interceptor._handleFetchParams({pageNo:e,pageSize:a,from:i,lastItem:h||null},this.fetchParams),r=this.fetch(o);s.interceptor._handleFetchResult(r,this,o)||(t.u.isPromise(r)?r.then((e=>{this.complete(e)})).catch((e=>{this.complete(!1)})):this.complete(r))}else this.$emit("query",...s.interceptor._handleQuery(e,a,i,h||null))},_callDataPromise(e,t){for(const a in this.dataPromiseResultMap){const s=this.dataPromiseResultMap[a];s&&(e?s.resolve({totalList:t,noMore:this.loadingStatus===i.Enum.More.NoMore}):this.callNetworkReject&&s.reject(`z-paging-${a}-error`))}},_checkDataType(e,a,i){const s=Object.prototype.toString.call(e);return"[object Boolean]"===s?(a=e,e=[]):"[object Array]"!==s&&(e=[],"[object Undefined]"!==s&&"[object Null]"!==s&&t.u.consoleErr((i?"setLocalPaging":"complete")+"参数类型不正确，第一个参数类型必须为Array!")),{data:e,success:a}}}};exports.dataHandleModule=h;
