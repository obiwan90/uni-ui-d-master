"use strict";const e=require("../../../common/vendor.js"),o=require("../../../api/product/product.js");if(!Array){(e.resolveComponent("van-image")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-collapse-item")+e.resolveComponent("uni-collapse"))()}Math||((()=>"../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js")+(()=>"../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js"))();const n={__name:"productEditPrice",props:{selectedGood:{type:Object},combinationname:{type:Array,default:[]}},emits:["close","reLoad"],setup(n,{emit:s}){const i=s,t=n,l=e.ref(),a=e.ref([]),r=e.ref([]),c=e.ref([]),d=(e,o,n)=>{r.value[e].fill(!1),r.value[e][o]=!r.value[e][o],c.value[e]=n};e.watch(c,(e=>{e.every((e=>null!==e))&&m()}),{deep:!0});const u=e.ref(),m=async()=>{const n=c.value.map((e=>e.id)),s={opid:e.index.getStorageSync("sessionInfo").opid,id:t.selectedGood.id,csid:n.join(",")};try{const n=await o.apiSelectedFineness(s);200===n.code?u.value=n.csinfos:(e.index.showToast({title:"未找到匹配成色，请联系客服",icon:"error",duration:2e3}),console.error("API returned an error",n))}catch(i){console.error("API call failed",i)}};function p(e){const{gjbbname:o,wlbbname:n,bxzt:s,efficiency:i,delivery:t}=e,l=[];o&&l.push(o),n&&l.push(n),s&&l.push(s),i&&l.push(`电池${i}%`),t&&l.push(`${t}发货`);return l.join("丨")}const v=async n=>{const s={opid:e.index.getStorageSync("sessionInfo").opid,id:t.selectedGood.id,price:l.value?l.value:"",zhid:u.value?u.value.id:"",csid:n.join(",")};try{const n=await o.apiEditProductInfo(s);200===n.code?(console.log("Edit product info success",n),e.index.showToast({title:"修改成功",icon:"success",duration:2e3}),setTimeout((()=>{i("close"),i("reLoad")}),2e3)):console.error("API returned an error",n)}catch(a){console.error("API call failed",a)}},f=()=>{console.log("props.selectedGood",t.selectedGood),console.log("editePrice.value:",l.value),console.log("csinfos.value:",u.value);const o=!!l.value,n=!!u.value,s=c.value.every((e=>null!==e));if(o&&n){if(!s)return void e.index.showToast({title:"请选择完整的成色信息",icon:"none",duration:500});const o=c.value.map((e=>e.id));v(o)}else if(o){v([])}else if(n){if(!s)return void e.index.showToast({title:"请选择完整的成色信息",icon:"none",duration:500});const o=c.value.map((e=>e.id));v(o)}else e.index.showToast({title:"请输入修改金额或者选择成色信息",icon:"none",duration:500})};return e.onMounted((async()=>{await(async()=>{const n={opid:e.index.getStorageSync("sessionInfo").opid,id:t.selectedGood.id};try{const e=await o.apiFinenessList(n);if(200===e.code){const{cslists:o,yjlist:n}=e;Array.isArray(o)&&n&&Array.isArray(n.yjlists)?(a.value=[...o.map((e=>({name:e.name,items:e.er.map((e=>({name:e.name,id:e.id})))}))),{name:n.name,items:n.yjlists.map((e=>({name:e.name,id:e.id})))}],r.value=a.value.map((e=>Array(e.items.length).fill(!1))),c.value=a.value.map((()=>null))):console.error("Invalid data structure",e)}else console.error("API returned an error",e)}catch(s){console.error("API call failed",s)}})(),t.combinationname.forEach(((e,o)=>{a.value.forEach(((o,n)=>{o.items.forEach(((o,s)=>{o.name===e&&d(n,s,o)}))}))}))})),(o,n)=>{var s,i,m;return e.e({a:e.o((e=>o.$emit("close"))),b:t.selectedGood},t.selectedGood?e.e({c:e.p({lazyLoad:!0,width:"190rpx",height:"190rpx",radius:"18rpx",fit:"fill",src:t.selectedGood.cover}),d:(null==(s=u.value)?void 0:s.name)||t.selectedGood.finenessname},(null==(i=u.value)?void 0:i.name)||t.selectedGood.finenessname?{e:e.t((null==(m=u.value)?void 0:m.name)||t.selectedGood.finenessname)}:{},{f:e.t(t.selectedGood.name),g:e.t(p(t.selectedGood)),h:e.t(t.selectedGood.price)}):{},{i:l.value,j:e.o((e=>l.value=e.detail.value)),k:e.t(u.value?u.value.name:t.selectedGood.finenessname),l:e.f(a.value,((o,n,s)=>{var i;return{a:e.t(o.name),b:e.t(null==(i=c.value[n])?void 0:i.name),c:"8efe8257-4-"+s+",8efe8257-3-"+s,d:"8efe8257-3-"+s+",8efe8257-2-"+s,e:e.f(o.items,((o,s,i)=>({a:e.t(o.name),b:r.value[n][s]?1:"",c:r.value[n][s]?1:"",d:s,e:e.o((e=>d(n,s,o)),s)}))),f:n,g:"8efe8257-2-"+s+",8efe8257-1"}})),m:e.p({border:!1}),n:e.p({open:!1,titleBorder:"none",border:!1}),o:e.sr("collapseRef","8efe8257-1"),p:e.o(((...e)=>o.onCancel&&o.onCancel(...e))),q:e.o(f)})}}},s=e._export_sfc(n,[["__scopeId","data-v-8efe8257"]]);wx.createComponent(s);
