"use strict";const e=require("../../../common/vendor.js"),a=require("../../../utils/common.js"),i=require("../../../api/qualityCheck/qualityCheck.js"),t={__name:"takePhotoConfirmPannel",props:{image:{type:String,required:!0},receivedData:{type:Object,required:!0}},setup(t,{expose:s}){const n=t,l=e.ref(),u=e.ref(),r=e.ref(),o=e.ref(),c=e.ref(),m=e.ref(),v=e.ref(),d=e.ref(),p=e.ref(),f=e.ref(),g=e.ref(),j=e.ref(),z=e.ref(),b=e.ref(),k=()=>{const a=e.reactive({spname:n.receivedData.spname,imei:n.receivedData.imei,inputTime:u.value,funcInputTime:o.value,maintenanceInputTime:m.value,inputPerson:l.value,funcInputPerson:r.value,maintenanceInputPerson:m.value,id:n.receivedData.id,zjid:n.receivedData.zjid,jkbz:v.value,gnjcbz:d.value,wxjcbz:p.value,pzbz:f.value,cgyname:j.value,csbz:g.value,finenessname:z.value,productimage:b.value});let i=encodeURIComponent(JSON.stringify(a));e.index.redirectTo({url:"/pagesListingProduct/listingProduct/listingProduct?data="+i})};return s({getData:async t=>{const s={opid:e.index.getStorageSync("sessionInfo").opid,ch:t},n=await i.apiQualityCheckSerialSearch(s);200===n.code&&(l.value=n.lists[0].jkuidname,u.value=a.formatTimestamp(n.lists[0].machinetime),v.value=n.lists[0].jkbz,o.value=a.formatTimestamp(n.lists[0].functionaltime),r.value=n.lists[0].gnjcuidname,c.value=a.formatTimestamp(n.lists[0].servicetime),m.value=n.lists[0].serviceuidname,d.value=n.lists[0].gnjcbz,p.value=n.lists[0].wxjcbz,j.value=n.lists[0].cgyname,z.value=n.lists[0].finenessname,b.value=n.lists[0].productimage,f.value=n.lists[0].pzbz,g.value=n.lists[0].csbz,console.log("jkuidname",l.value),console.log("machinetime",u.value),console.log("jkbz",v.value))}}),(a,i)=>({a:e.o((e=>a.$emit("close"))),b:n.image,c:e.o(k),d:e.o((a=>{e.index.redirectTo({url:"/pagesTakePhoto/takePhoto/takePhoto"})}))})}},s=e._export_sfc(t,[["__scopeId","data-v-0cfed1d0"]]);wx.createComponent(s);
