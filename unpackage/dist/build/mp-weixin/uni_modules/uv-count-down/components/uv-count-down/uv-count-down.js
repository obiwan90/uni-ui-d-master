"use strict";const i=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),t=require("../../../uv-ui-tools/libs/mixin/mixin.js"),e=require("./props.js"),s=require("./utils.js"),m=require("../../../../common/vendor.js"),r={name:"uv-count-down",mixins:[i.mpMixin,t.mixin,e.props],data:()=>({timer:null,timeData:s.parseTimeData(0),formattedTime:"0",runing:!1,endTime:0,remainTime:0}),watch:{time(i){this.reset()}},mounted(){this.init()},methods:{init(){this.reset()},start(){this.runing||(this.runing=!0,this.endTime=Date.now()+this.remainTime,this.toTick())},toTick(){this.millisecond?this.microTick():this.macroTick()},macroTick(){this.clearTimeout(),this.timer=setTimeout((()=>{const i=this.getRemainTime();s.isSameSecond(i,this.remainTime)&&0!==i||this.setRemainTime(i),0!==this.remainTime&&this.macroTick()}),30)},microTick(){this.clearTimeout(),this.timer=setTimeout((()=>{this.setRemainTime(this.getRemainTime()),0!==this.remainTime&&this.microTick()}),50)},getRemainTime(){return Math.max(this.endTime-Date.now(),0)},setRemainTime(i){this.remainTime=i;const t=s.parseTimeData(i);this.$emit("change",t),this.formattedTime=s.parseFormat(this.format,t),i<=0&&(this.pause(),this.$emit("finish"))},reset(){this.pause(),this.remainTime=this.time,this.setRemainTime(this.remainTime),this.autoStart&&this.start()},pause(){this.runing=!1,this.clearTimeout()},clearTimeout(){clearTimeout(this.timer),this.timer=null}},unmounted(){this.clearTimeout()}};const n=m._export_sfc(r,[["render",function(i,t,e,s,r,n){return{a:m.t(r.formattedTime),b:m.s(i.$uv.addStyle(i.customStyle))}}],["__scopeId","data-v-5f5e474a"]]);wx.createComponent(n);
