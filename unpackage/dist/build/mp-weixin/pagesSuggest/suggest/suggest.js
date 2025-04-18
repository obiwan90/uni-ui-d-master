"use strict";const e=require("../../common/vendor.js"),t=require("../api/api.js");if(!Array){(e.resolveComponent("custom-header")+e.resolveComponent("uv-upload"))()}Math||((()=>"../../components/custom-header/custom-header.js")+(()=>"../../uni_modules/uv-upload/components/uv-upload/uv-upload.js"))();const o={__name:"suggest",setup(o){const i=e.ref([]),a=e.ref(""),n=e.ref(""),s=async t=>{const o=t.size;let i;if(e.index.showLoading({title:"loading...",mask:!0}),o>512e3){let o,a,n=80,s=!1;do{i=await e.index.compressImage({src:t.url,quality:n});const l=await e.index.getFileInfo({filePath:i.tempFilePath});if(o=n,a=l.size,l.size<=512e3){s=!0;break}n-=10}while(n>=20);if(e.index.hideLoading(),!s)return console.log(`最后一次压缩质量: ${o}, 大小: ${(a/1024/1024).toFixed(2)} MB`),e.index.showToast({title:"无法压缩到500KB以内，请尝试其他图片。",icon:"none"}),null}else i={tempFilePath:t.url};return e.index.hideLoading(),{tempFilePath:i.tempFilePath,url:i.tempFilePath}},l=async t=>{let o=[].concat(t.file);for(const n of o)try{const t=await s(n);if(!t)continue;const o=await e.index.uploadFile({url:"https://www.xzxskj.com/Home/Upload/add",filePath:t.tempFilePath,name:"imgs",header:{"Content-Type":"multipart/form-data"}}),a=JSON.parse(o.data);if(200!==a.code)throw new Error("上传失败");a.urls.split(",").forEach((e=>{e.trim()&&i.value.push({url:"https://www.xzxskj.com"+e.trim(),status:"success",message:""})}))}catch(a){e.index.showToast({title:a.message||"上传失败",icon:"error",duration:2e3})}},r=e=>{i.value.splice(e.index,1)},u=()=>{e.index.showToast({title:"超出上传限制",icon:"error",duration:2e3})},d=async()=>{await(async()=>{const o=n.value,a=i.value;if(!o.trim())return void e.index.showToast({title:"内容不能为空",icon:"none",duration:500});if(0===a.length)return void e.index.showToast({title:"请上传至少一张图片",icon:"none",duration:500});const s={opid:e.index.getStorageSync("sessionInfo").opid,content:o,img:a.map((e=>e.url)).join(",")};"200"===(await t.apiGetComplaint(s)).code&&e.index.showToast({title:"操作成功",icon:"success",duration:500})})()};return e.onLoad((e=>{e.title&&(a.value=e.title)})),(t,o)=>({a:e.t(a.value),b:n.value,c:e.o((e=>n.value=e.detail.value)),d:e.o(l),e:e.o(r),f:e.o(u),g:e.p({fileList:i.value,multiple:!0,maxCount:10,width:"162rpx",height:"162rpx",accept:"image",maxSize:"5242880",name:"2",previewFullVideo:!0}),h:e.o(d)})}},i=e._export_sfc(o,[["__scopeId","data-v-984eab92"]]);wx.createPage(i);
