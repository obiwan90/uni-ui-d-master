"use strict";const e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("van-loading")+e.resolveComponent("van-image")+e.resolveComponent("van-tag"))()}const r={__name:"serviceCard",props:{orderList:{type:Array,required:!0}},emits:["goDetail"],setup(r,{emit:n}){const t=r,i=n;return(r,n)=>({a:e.f(t.orderList,((r,n,t)=>({a:e.t(r.ordernumber),b:e.t("1"===r.zt?"售后中":"2"===r.zt?"售后成功":"售后失败"),c:e.f(r.goodsinfos,((n,o,s)=>e.e({a:"1329c504-1-"+t+"-"+s+",1329c504-0-"+t+"-"+s,b:"1329c504-0-"+t+"-"+s,c:e.p({width:"190rpx",height:"190rpx",fit:"fill",radius:"18rpx",src:n.cover}),d:n.finenessname},n.finenessname?{e:e.t(n.finenessname),f:"1329c504-2-"+t+"-"+s,g:e.p({size:"mini",color:"linear-gradient(132deg, #D94C24 0%, #FF5221 100%)"})}:{},{h:e.t(n.name),i:e.t(n.ch),j:e.t(n.price),k:e.o((e=>(e=>{i("goDetail",e,"sh")})(r)),o),l:o}))),d:n}))),b:e.p({type:"spinner",size:"20",vertical:!0})})}};wx.createComponent(r);
