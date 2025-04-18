"use strict";const e=require("../../common/vendor.js"),o=require("../../stores/userInfoStore.js"),a=require("../../stores/locationStore.js"),t=require("../../api/member/member.js");if(!Array){e.resolveComponent("custom-header")()}Math;const n={__name:"menber",setup(n){a.useLocationStore(),e.ref([]),e.ref([]);const r=e.ref(),i=async o=>{console.log("chooseAvatar:",o);const a=await e.index.uploadFile({url:"https://www.xzxskj.com/Home/Upload/add",filePath:o.detail.avatarUrl,name:"imgs",header:{"Content-Type":"multipart/form-data"}}),t=JSON.parse(a.data);if(200===t.code){const e=t.urls.split(",");r.value=e[0]}},l=e.ref([{name:"商家名称",value:""},{name:"联系方式",value:""},{name:"绑定微信",value:JSON.parse(e.index.getStorageSync("userInfo")).phone},{name:"门店名称",value:""},{name:"门店地址",value:""}]),u=e.ref({fullLocation:"",province:"",city:"",region:"",address:"",postCode:"",longitude:"",latitude:"",name:""});e.ref(0),e.ref(0);const s=requirePlugin("chooseLocation"),c=()=>{console.log("打开地图");const o=JSON.stringify({latitude:u.value.latitude,longitude:u.value.longitude});e.index.navigateTo({url:`plugin://chooseLocation/index?key=KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO&referer=demo2&location=${o}&category=生活服务,娱乐休闲`})},d=e.ref(!1);return e.onMounted((async()=>{u.value=await a.useLocationStore().getForm();const o=JSON.parse(e.index.getStorageSync("userInfo"));console.log("userInfo:",o),l.value[0].value=o.nik_name,o.nik_name&&(d.value=!0),l.value[1].value=o.lxfs,l.value[3].value=o.shopname,l.value[4].value=o.shopadd,r.value=o.img})),e.onShow((()=>{const e=s.getLocation();if(console.log(e),e){u.value.address=e.address,u.value.province=e.province,u.value.city=e.city,u.value.region=e.district,u.value.latitude=e.latitude.toString(),u.value.longitude=e.longitude.toString();const o=[];o.push(e.province),o.push(e.city),o.push(e.district),u.value.fullLocation=o.join(" "),u.value.name=e.name,l.value[4].value=u.value.address}})),(a,n)=>({a:e.unref(r)?"https://www.xzxskj.com"+e.unref(r):"https://www.xzxskj.com/xcximg/132.jpg",b:e.o(i),c:e.f(e.unref(l),((o,a,t)=>e.e({a:e.t(o.name),b:"绑定微信"!==o.name&&"商家名称"!==o.name},"绑定微信"!==o.name&&"商家名称"!==o.name?{c:o.value,d:e.o((e=>o.value=e.detail.value),a)}:{},{e:"绑定微信"===o.name},"绑定微信"===o.name?{f:o.value,g:e.o((e=>o.value=e.detail.value),a)}:{},{h:"商家名称"===o.name},"商家名称"===o.name?{i:e.unref(d),j:o.value,k:e.o((e=>o.value=e.detail.value),a)}:{},{l:"门店地址"===o.name},"门店地址"===o.name?{m:e.o(c,a)}:{},{n:a}))),d:e.o((a=>(async()=>{if(!l.value[0].value)return void e.index.showToast({title:"请输入商家名称",icon:"error",duration:2e3});if(!l.value[1].value)return void e.index.showToast({title:"请输入联系方式",icon:"error",duration:2e3});if(!l.value[3].value)return void e.index.showToast({title:"请输入门店名称",icon:"error",duration:2e3});if(!l.value[4].value)return void e.index.showToast({title:"请输入门店地址",icon:"error",duration:2e3});const a={opid:e.index.getStorageSync("sessionInfo").opid,lxfs:l.value[1].value,name:l.value[0].value,shopname:l.value[3].value,shopadd:l.value[4].value,img:r.value};try{const n=await t.apiUpdateUserInfo(a);if(200===n.code){const a=await o.useUserStore().getInfo();console.log("用户刷新检查:",a),e.index.showToast({title:"更新成功",icon:"success",duration:2e3}),e.index.navigateBack()}else 201===n.code?e.index.showToast({title:"已经存在商户名称",icon:"error",duration:2e3}):e.index.showToast({title:"更新失败",icon:"error",duration:2e3});console.log(n)}catch(n){console.error("更新失败:",n),e.index.showToast({title:"更新失败",icon:"error",duration:2e3})}})()))})}},r=e._export_sfc(n,[["__scopeId","data-v-0c1c46b3"]]);wx.createPage(r);
