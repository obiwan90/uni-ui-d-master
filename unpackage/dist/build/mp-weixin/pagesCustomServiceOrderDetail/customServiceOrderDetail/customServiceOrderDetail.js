"use strict";const e=require("../../common/vendor.js"),n=require("../../utils/debounce.js"),t=require("../../utils/common.js"),s=require("../api/api.js");if(!Array){(e.resolveComponent("custom-header")+e.resolveComponent("uv-alert")+e.resolveComponent("van-loading")+e.resolveComponent("van-image")+e.resolveComponent("uni-popup"))()}const o=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||((()=>"../../components/custom-header/custom-header.js")+(()=>"../../uni_modules/uv-alert/components/uv-alert/uv-alert.js")+e.unref(a)+o)();const a=()=>"./components/userServicePannel.js",r={__name:"customServiceOrderDetail",setup(o){const a=e.ref(null),r=e.ref(!1),i=()=>{a.value.close()},u=e=>{e||(r.value=e.show)},l=e.ref(),f=e.ref();e.ref();const c=e.ref([{name:"售后订单",value:"",image:"https://www.xzxskj.com/xcximg/icon_copy@3x.png"},{name:"申请时间",value:"",image:""},{name:"销售订单",value:"",image:"https://www.xzxskj.com/xcximg/icon_copy@3x.png"},{name:"下单时间",value:"",image:""},{name:"付款时间",value:"",image:""},{name:"收货时间",value:"",image:""},{name:"下单备注",value:"",image:""}]),d=e.ref([{shlx:"1",tyzt:"0",btnLeft:"驳回售后",btnRight:"同意补差",btnCenter:""},{shlx:"2",tyzt:"0",btnLeft:"驳回售后",btnRight:"同意售后",btnCenter:""},{shlx:"2",tyzt:"4",btnLeft:"驳回售后",btnRight:"已收到货,同意退款",btnCenter:""},{shlx:"4",tyzt:"0",btnLeft:"驳回售后",btnRight:"同意售后",btnCenter:""},{shlx:"4",tyzt:"5",btnLeft:"驳回售后",btnRight:"售后完成,预约快递",btnCenter:""},{shlx:"5",tyzt:"0",btnLeft:"驳回售后",btnRight:"同意退款",btnCenter:""}]),m=e.ref([{name:"驳回售后",lx:"7"},{name:"同意补差",lx:"2"},{name:"同意售后",lx:"3"},{name:"已收到货,同意退款",lx:"4"},{name:"售后完成,预约快递",lx:"5"},{name:"预约快递",lx:"6"},{name:"同意退款",lx:"8"}]),v=e.ref(),h=()=>{e.index.navigateTo({url:"plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息"})},p=async()=>{const e={lx:f.value.lx,id:f.value.id},n=await s.apiGetCustomServiceOrderDetail(e);"200"===n.code&&(l.value=n.infos,console.log("infos",l.value),c.value[0].value=n.infos.ordernumber,c.value[1].value=t.formatTimestamp(n.infos.shaddtime),c.value[2].value=n.infos.ydh,c.value[3].value=t.formatTimestamp(n.infos.add_time),c.value[4].value=t.formatTimestamp(n.infos.pay_time),c.value[5].value=n.infos.remarks)},x=async n=>{const t={id:f.value.id,lx:n};try{const n=await s.apiCustomServiceOrderOperation(t);return 200===n.code?(e.index.showToast({title:"操作成功",icon:"success",duration:2e3}),setTimeout((()=>{p()}),500)):201===n.code?e.index.showToast({title:"请勿重复操作",icon:"error",duration:2e3}):e.index.showToast({title:n.msg||"操作失败",icon:"none",duration:2e3}),n}catch(o){console.error("请求出错:",o),e.index.showToast({title:"请求出错，请稍后再试",icon:"none",duration:2e3})}},g=n.debounce((e=>{b(e)}),300,!0),b=async n=>{var t,s;let o="";switch(n){case"left":o=(null==(t=y(l.value.shlx,l.value.tyzt))?void 0:t.btnLeft)||"";break;case"right":o=(null==(s=y(l.value.shlx,l.value.tyzt))?void 0:s.btnRight)||"";break;case"center":o="同意售后";break;default:return}if(!o)return e.index.showToast({title:"参数错误",icon:"none",duration:2e3}),void console.error(`未找到对应的按钮名称，flag: ${n}, infos.shlx: ${l.value.shlx}, infos.tyzt: ${l.value.tyzt}`);v.value=(e=>{const n=m.value.find((n=>n.name===e));return n?n.lx:null})(o),console.log("lx.value",v.value),v.value&&("5"===v.value?(r.value=!0,a.value.open()):await x(v.value))},y=(e,n)=>{const t=d.value.find((t=>t.shlx===e&&t.tyzt===n));return t?{btnLeft:t.btnLeft,btnRight:t.btnRight}:null},z=async e=>{x(v.value).then((n=>{200===n.code&&w(e.expressid,e.id)}))},w=(e,n)=>{"1"===e&&C(n),"2"===e&&T(n)},C=async n=>{const t={ddid:n},o=await s.apiOrderJdLogistics(t);console.log(o),"200"===o.code&&(e.index.showToast({title:"操作成功",icon:"success",duration:1e3}),setTimeout((()=>{p()}),500))},T=async n=>{const t={ddid:n},o=await s.apiOrderSfLogistics(t);console.log(o),"200"===o.code&&(e.index.showToast({title:"操作成功",icon:"success",duration:1e3}),setTimeout((()=>{p()}),500))};return e.onMounted((async()=>{f.value=JSON.parse(e.index.getStorageSync("orderDetailItem")),console.log(f.value),await p()})),(n,t)=>{var s,o;return e.e({a:e.unref(l)},e.unref(l)?e.e({b:e.unref(l).cwshinfos&&"1"==e.unref(l).cwshinfos.zt},e.unref(l).cwshinfos&&"1"==e.unref(l).cwshinfos.zt?{c:e.p({type:"warning",description:"等待审核",closable:!0})}:{},{d:"5"===e.unref(l).shlx},(e.unref(l).shlx,{}),{e:"1"===e.unref(l).shlx},(e.unref(l).shlx,{}),{f:"2"===e.unref(l).shlx},(e.unref(l).shlx,{}),{g:"4"===e.unref(l).shlx},(e.unref(l).shlx,{}),{h:"2"===e.unref(l).zt},(e.unref(l).zt,{}),{i:"3"===e.unref(l).zt},(e.unref(l).zt,{}),{j:"2"===e.unref(l).shlx&&"3"===e.unref(l).tyzt},"2"===e.unref(l).shlx&&"3"===e.unref(l).tyzt?{k:e.o(h)}:{},{l:"4"===e.unref(l).shlx&&"3"===e.unref(l).tyzt},"4"===e.unref(l).shlx&&"3"===e.unref(l).tyzt?{m:e.o(h)}:{},{n:e.f(e.unref(l).goodslist,((n,t,s)=>e.e({a:"d6363df8-3-"+s+",d6363df8-2-"+s,b:"d6363df8-2-"+s,c:e.p({width:"190rpx",height:"190rpx",fit:"fill",radius:"18rpx",src:n.infos.cover}),d:n.infos.finenessname},n.infos.finenessname?{e:e.t(n.infos.finenessname)}:{},{f:e.t(n.infos.name),g:e.t(n.infos.ch),h:e.t(n.infos.cgyname),i:e.t(n.infos.shopname),j:e.t(n.infos.price),k:t}))),o:e.p({type:"spinner",size:"20",vertical:!0}),p:"4"!==e.unref(l).shlx},"4"!==e.unref(l).shlx?{q:e.t(e.unref(l).bcje)}:{},{r:e.t(e.unref(l).shyy),s:""!==e.unref(l).shtt},""!==e.unref(l).shtt?{t:e.f(e.unref(l).shtt.split(","),((n,t,s)=>e.e({a:n},n?{b:n}:{},{c:t})))}:{},{v:e.f(e.unref(c),((n,t,s)=>e.e({a:e.t(n.name),b:e.t(n.value),c:""!==n.image},""!==n.image?{d:n.image}:{},{e:t}))),w:"2"!==e.unref(l).zt},"2"!==e.unref(l).zt?e.e({x:"3"!==e.unref(l).zt},"3"!==e.unref(l).zt?{y:e.t((null==(s=y(e.unref(l).shlx,e.unref(l).tyzt))?void 0:s.btnLeft)||""),z:e.o((n=>e.unref(g)("left"))),A:e.t((null==(o=y(e.unref(l).shlx,e.unref(l).tyzt))?void 0:o.btnRight)||""),B:e.o((n=>e.unref(g)("right")))}:{C:e.o((n=>e.unref(g)("center")))}):{}):{},{D:e.unref(r)},e.unref(r)?{E:e.o(z),F:e.o(i),G:e.p({infos:e.unref(l)})}:{},{H:e.sr(a,"d6363df8-4",{k:"saiXuanPannelPopup"}),I:e.o(i),J:e.o(u),K:e.p({"background-color":"rgba(0,0,0,0)","is-mask-click":!0,"safe-area":!1,type:"bottom"})})}}},i=e._export_sfc(r,[["__scopeId","data-v-d6363df8"]]);wx.createPage(i);
