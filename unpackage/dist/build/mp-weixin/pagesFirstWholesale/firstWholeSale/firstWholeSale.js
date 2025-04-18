"use strict";const e=require("../../common/vendor.js"),o=require("../api/api.js"),n=require("../../utils/common.js"),a=require("../../utils/debounce.js");if(!Array){(e.resolveComponent("custom-header")+e.resolveComponent("van-empty")+e.resolveComponent("van-loading")+e.resolveComponent("van-image")+e.resolveComponent("van-tag")+e.resolveComponent("van-swipe-cell")+e.resolveComponent("uni-popup"))()}const s=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||((()=>"../../components/custom-header/custom-header.js")+t+e.unref(i)+s+e.unref(l))();const l=()=>"./components/offlinePaymentPannel.js",t=()=>"../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js",i=()=>"./components/selectCustomerPannel.js",r={__name:"firstWholeSale",setup(s){const l=e.getCurrentInstance(),t=e.ref(null),i=e.ref(!1),r=e.ref(),d=e.ref(""),u=async o=>{const n={opid:e.index.getStorageSync("sessionInfo").opid,goodsid:D(),khid:y.value.id,remarks:b.value,ygid:j.value.id,lx:"2",zffs:o.zffs,imgs:o.imgs,price:o.price,skremarks:o.skremarks,ddid:o.ddid};await N("/Home/Orderxhhk/add?lx=2",n)},c=()=>{i.value=!0,console.log("cardData",g.value),t.value.open()};const f=e.ref("ch"),p=e.ref("ch"),v=async()=>{h();try{const e=await n.scanCode();console.log("result",e),e&&L(e).then((()=>{q.value.length>0&&(myInputRef.value.inputText=q.value[0].ch)}))}catch(e){console.error("扫码失败：",e)}finally{m()}},h=()=>{e.index.showLoading({title:"加载中...",mask:!0})},m=()=>{e.index.hideLoading()},g=e.ref([]),y=e.ref(),x=e.computed((()=>g.value.reduce(((e,o)=>e+parseFloat(o.price)||0),0))),b=e.ref(""),k=e.ref(!1),C=e.ref(null),w=()=>{console.log("Popup is closed"),t.value.close(),C.value.close()},S=e=>{e.show||(i.value=e.show,k.value=e.show)},I=()=>{k.value=!0,C.value.open()},j=e.ref(),P=e.ref([]),F=e.ref(""),T=e=>{console.log("选择 e:",e),j.value=P.value[e.detail.value],F.value=P.value[e.detail.value].username};e.ref("");const q=e.ref([]),L=e=>{console.log("输入框内容:",e),e.length>0&&_(e)},O=e=>{console.log("模糊搜索 e",e),e&&(g.value.push(e),q.value=[],d.value="")},R=e.ref([]),_=async n=>{const a={ch:n,opid:e.index.getStorageSync("sessionInfo").opid},s=await o.apiFinanceChCheck(a);if(200===s.code){if(q.value=s.lists,R.value=s.yglist,R.value){const o=e.index.getStorageSync("adminId");j.value=R.value.find((e=>e.id===o)),F.value=R.value.find((e=>e.id===o)).username}P.value=s.yglist}else q.value=[];console.log("apiFinanceChCheckData res:",s)},z=async(o,n)=>{y.value?j.value?e.index.showModal({title:"1"===n?"先货后款确认下单":"线下收款",content:"您确定要下单吗？",success:async a=>{if(a.confirm)if("1"===n){const a={opid:e.index.getStorageSync("sessionInfo").opid,goodsid:D(),khid:y.value.id,remarks:b.value,ygid:j.value.id,lx:n,zffs:"6",imgs:"",ddid:d.value};await N(o,a)}else c();else a.cancel&&e.index.showToast({title:"已取消下单",icon:"none",duration:2e3})}}):e.index.showToast({title:"请选择销售员工",icon:"none",duration:2e3}):e.index.showToast({title:"请选择客户",icon:"none",duration:2e3})},N=a.debounce((async(n,a)=>{const s=await o.apiFinancePlaceOrder(n,a);console.log("res",s),"200"===s.code?(e.index.showToast({title:"下单成功",icon:"success",duration:2e3}),g.value=[]):e.index.showToast({title:s.msg?s.msg:"操作失败",icon:"error",duration:2e3}),t.value.close()}),400,!0),D=()=>g.value.map((e=>e.id)).join(","),H=async n=>{const{ch:a}=n.goodsinfos,s=await o.apiFinanceChCheck({ch:a,opid:e.index.getStorageSync("sessionInfo").opid});if(200===s.code&&s.yglist.length>0&&(P.value.push(...s.yglist.filter((e=>!P.value.some((o=>e.id===o.id))))),R.value=s.yglist,R.value)){const o=e.index.getStorageSync("adminId");j.value=R.value.find((e=>e.id===o)),F.value=R.value.find((e=>e.id===o)).username}g.value.push(n.goodsinfos)};return e.onLoad((async e=>{const o={id:"",name:""};if(e.settlementList&&e.lx){const o=JSON.parse(decodeURIComponent(e.settlementList));console.log("options.settlementList:",o),console.log("options.lx:",e.lx),o.forEach(H)}if(e.data&&(g.value.push(JSON.parse(decodeURIComponent(e.data))),console.log("cardData",g.value),_(JSON.parse(decodeURIComponent(e.data)).ch)),e.chs){const o=e.chs.split(",");for(const e of o)e&&(await _(e),console.log("orgArray.value",q.value),q.value.length>0&&(g.value.push(q.value[0]),q.value=[]))}if(e.khid&&e.khNames&&e.ddid){const n=e.khid.split(",");for(const e of n)e&&(o.id=e);const a=e.khNames.split(",")[0];o.name=a,y.value=o,d.value=e.ddid}})),e.index.$on("selectedCustomer",(e=>{console.log("selectedCustomer",e),y.value=e})),(o,n)=>e.e({a:e.p({backgroundColor:"#f3f2f6"}),b:e.sr("myInputRef","5c49bdbd-1"),c:e.o(L),d:e.o(O),e:e.p({keyId:1,dataList:e.unref(q),phText:"请输入串号",searchKey:e.unref(f),showField:e.unref(p),showBorder:!1,disabled:!1}),f:e.o(v),g:0==e.unref(g).length},0==e.unref(g).length?{h:e.p({description:"请搜索相关商品进行批发"})}:{},{i:e.unref(g).length>0},e.unref(g).length>0?{j:e.f(e.unref(g),((o,n,a)=>e.e({a:"5c49bdbd-5-"+a+",5c49bdbd-4-"+a,b:"5c49bdbd-4-"+a+",5c49bdbd-3-"+a,c:e.p({width:"95",height:"95",fit:"fill",radius:"18rpx",src:o.cover}),d:o.finenessname},o.finenessname?{e:e.t(o.finenessname),f:"5c49bdbd-6-"+a+",5c49bdbd-3-"+a,g:e.p({size:"medium",color:"linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"})}:{},{h:e.t(o.name),i:e.t(o.ch),j:e.o((n=>e.unref(l).proxy.copyText(o.ch)),n),k:e.t(o.cgyname),l:e.t(o.ckname),m:e.t(o.price),n:e.o((e=>(e=>{g.value.splice(e,1)})(n)),n),o:"5c49bdbd-3-"+a,p:n}))),k:e.p({type:"spinner",size:"20",vertical:!0}),l:e.p({rightWidth:"41"})}:{},{m:e.unref(g).length>0},e.unref(g).length>0?{n:e.t(e.unref(y)?e.unref(y).name:"请搜索或选择客户"),o:e.o(I),p:e.unref(b),q:e.o((o=>e.isRef(b)?b.value=o.detail.value:null))}:{},{r:e.unref(g).length>0},e.unref(g).length>0?{s:e.unref(F),t:e.o((o=>e.isRef(F)?F.value=o.detail.value:null)),v:e.unref(P),w:e.o(T),x:e.unref(j),y:e.unref(P),z:e.o(T),A:e.unref(j)}:{},{B:e.unref(g).length>0},e.unref(g).length>0?{C:e.t(e.unref(g).length),D:e.t(e.unref(x)),E:e.o((e=>z("/Home/Orderxhhk/add?lx=2","2"))),F:e.o((e=>z("/Home/Orderxhhk/add?lx=1","1")))}:{},{G:e.unref(k)},e.unref(k)?{H:e.o(w)}:{},{I:e.sr(C,"5c49bdbd-7",{k:"selectCustomerPannelPopup"}),J:e.o(w),K:e.o(S),L:e.p({"background-color":"rgba(0,0,0,0)","is-mask-click":!0,"safe-area":!1,type:"bottom"}),M:e.unref(i)},e.unref(i)?{N:e.o(w),O:e.o(u),P:e.p({ddid:e.unref(d),ddxx:e.unref(r),totalPrice:e.unref(x)})}:{},{Q:e.sr(t,"5c49bdbd-9",{k:"offlinePaymentPopup"}),R:e.o(w),S:e.o(S),T:e.p({"background-color":"rgba(0,0,0,0)","is-mask-click":!0,"safe-area":!1,type:"bottom"})})}},d=e._export_sfc(r,[["__scopeId","data-v-5c49bdbd"]]);wx.createPage(d);
