"use strict";const e=require("../../common/vendor.js"),o=require("../../common/assets.js");if(!Array){(e.resolveComponent("custom-header")+e.resolveComponent("uv-upload")+e.resolveComponent("uv-calendars"))()}Math||((()=>"../../components/custom-header/custom-header.js")+a+(()=>"../../uni_modules/uv-upload/components/uv-upload/uv-upload.js")+(()=>"../../uni_modules/uv-calendars/components/uv-calendars/uv-calendars.js"))();const a=()=>"../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js",n={__name:"newSeeking",setup(a){const n=e.ref("求货发布"),l=e.ref(null),r=e=>{console.log("日历回调：",e),c.value[3].placeholder=e.range.before+"~"+e.range.after},s=e.ref([{name:"iphone13"},{name:"iphone14"},{name:"华为mate40"},{name:"vivo"},{name:"iphone15"},{name:"iphone14"},{name:"华为mate40"},{name:"vivo"},{name:"iphone13"},{name:"iphone14"},{name:"华为mate40"},{name:"vivo"},{name:"iphone13"},{name:"iphone14"},{name:"华为mate40"},{name:"vivo"}]),t=e.ref([{key:"型号",placeholder:"请搜索相关型号",value:"华为mate40pro"},{key:"内存",placeholder:"请选择型号",value:"4G"},{key:"颜色",placeholder:"请选择型号",value:"红色"}]),c=e.ref([{key:"成色选择",placeholder:"请选择",value:""},{key:"求购单价",placeholder:"请选择",value:""},{key:"求购数量",placeholder:"请选择",value:""},{key:"求购时长",placeholder:"请选择",value:""}]),u=e=>{"求购时长"===e&&(console.log("打开日历"),l.value.open())};e.ref([]);const m=()=>{const e=new Date,o=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return`${o}-${a<10?"0"+a:a}-${n<10?"0"+n:n}`},d=e.ref([]),i=e=>{d.value.splice(e.index,1)},p=o=>{console.log(o),e.index.showToast({title:"超出上传限制",icon:"error",duration:2e3})},v=async e=>{let o=[].concat(e.file),a=d.value.length;o.forEach((async e=>{d.value.push({...e,status:"uploading",message:"上传中"});let o=d.value[a];d.value.splice(a,1,{...o,status:"success",message:"",url:e.url}),a++}))},h=e=>{console.log(e)};return e.onLoad((e=>{console.log("传递过来的参数:",e.id),e.id&&(n.value="求货修改")})),(a,f)=>({a:e.t(e.unref(n)),b:e.f(e.unref(t),((o,a,n)=>e.e({a:e.t(o.key),b:e.o(h,a),c:"b64cc39a-1-"+n,d:e.p({keyId:1,dataList:e.unref(s),phText:o.placeholder,searchKey:"name",showBorder:!1,disabled:!1}),e:"型号"===o.key},(o.key,{}),{f:a}))),c:e.f(e.unref(c),((o,a,n)=>e.e({a:e.t(o.key),b:"成色选择"===o.key||"求购时长"===o.key},"成色选择"===o.key||"求购时长"===o.key?{c:e.t(o.placeholder),d:e.o((e=>u(o.key)),a)}:{e:e.t(o.placeholder),f:e.o((e=>u(o.key)),a)},{g:a}))),d:o._imports_0$1,e:e.o(v),f:e.o(i),g:e.o(p),h:e.p({fileList:e.unref(d),multiple:!0,maxCount:10,width:"162rpx",height:"162rpx",accept:"media",maxSize:"5242880",name:"2",previewFullVideo:!0}),i:e.sr(l,"b64cc39a-3",{k:"calendars"}),j:e.o(r),k:e.p({mode:"range",color:"#ff0000",date:[m(),""]}),l:e.o(((...e)=>a.comfim&&a.comfim(...e)))})}},l=e._export_sfc(n,[["__scopeId","data-v-b64cc39a"]]);wx.createPage(l);
