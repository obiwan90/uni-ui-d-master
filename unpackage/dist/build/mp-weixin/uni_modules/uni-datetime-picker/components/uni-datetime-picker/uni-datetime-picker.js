"use strict";const e=require("../../../../common/vendor.js"),t=require("./i18n/index.js"),a=require("./util.js"),i={name:"UniDatetimePicker",options:{virtualHost:!0},components:{Calendar:()=>"./calendar.js",TimePicker:()=>"./time-picker.js"},data:()=>({isRange:!1,hasTime:!1,displayValue:"",inputDate:"",calendarDate:"",pickerTime:"",calendarRange:{startDate:"",startTime:"",endDate:"",endTime:""},displayRangeValue:{startDate:"",endDate:""},tempRange:{startDate:"",startTime:"",endDate:"",endTime:""},startMultipleStatus:{before:"",after:"",data:[],fulldate:""},endMultipleStatus:{before:"",after:"",data:[],fulldate:""},pickerVisible:!1,pickerPositionStyle:null,isEmitValue:!1,isPhone:!1,isFirstShow:!0,i18nT:()=>{}}),props:{type:{type:String,default:"datetime"},value:{type:[String,Number,Array,Date],default:""},modelValue:{type:[String,Number,Array,Date],default:""},start:{type:[Number,String],default:""},end:{type:[Number,String],default:""},returnType:{type:String,default:"string"},placeholder:{type:String,default:""},startPlaceholder:{type:String,default:""},endPlaceholder:{type:String,default:""},rangeSeparator:{type:String,default:"-"},border:{type:[Boolean],default:!0},disabled:{type:[Boolean],default:!1},clearIcon:{type:[Boolean],default:!0},hideSecond:{type:[Boolean],default:!1},defaultValue:{type:[String,Object,Array],default:""}},watch:{type:{immediate:!0,handler(e){this.hasTime=-1!==e.indexOf("time"),this.isRange=-1!==e.indexOf("range")}},modelValue:{immediate:!0,handler(e){this.isEmitValue?this.isEmitValue=!1:this.initPicker(e)}},start:{immediate:!0,handler(e){e&&(this.calendarRange.startDate=a.getDate(e),this.hasTime&&(this.calendarRange.startTime=a.getTime(e)))}},end:{immediate:!0,handler(e){e&&(this.calendarRange.endDate=a.getDate(e),this.hasTime&&(this.calendarRange.endTime=a.getTime(e,this.hideSecond)))}}},computed:{timepickerStartTime(){return(this.isRange?this.tempRange.startDate:this.inputDate)===this.calendarRange.startDate?this.calendarRange.startTime:""},timepickerEndTime(){return(this.isRange?this.tempRange.endDate:this.inputDate)===this.calendarRange.endDate?this.calendarRange.endTime:""},mobileCalendarTime(){const e={start:this.tempRange.startTime,end:this.tempRange.endTime};return this.isRange?e:this.pickerTime},mobSelectableTime(){return{start:this.calendarRange.startTime,end:this.calendarRange.endTime}},datePopupWidth(){return this.isRange?653:301},singlePlaceholderText(){return this.placeholder||("date"===this.type?this.selectDateText:this.selectDateTimeText)},startPlaceholderText(){return this.startPlaceholder||this.startDateText},endPlaceholderText(){return this.endPlaceholder||this.endDateText},selectDateText(){return this.i18nT("uni-datetime-picker.selectDate")},selectDateTimeText(){return this.i18nT("uni-datetime-picker.selectDateTime")},selectTimeText(){return this.i18nT("uni-datetime-picker.selectTime")},startDateText(){return this.startPlaceholder||this.i18nT("uni-datetime-picker.startDate")},startTimeText(){return this.i18nT("uni-datetime-picker.startTime")},endDateText(){return this.endPlaceholder||this.i18nT("uni-datetime-picker.endDate")},endTimeText(){return this.i18nT("uni-datetime-picker.endTime")},okText(){return this.i18nT("uni-datetime-picker.ok")},clearText(){return this.i18nT("uni-datetime-picker.clear")},showClearIcon(){return this.clearIcon&&!this.disabled&&(this.displayValue||this.displayRangeValue.startDate&&this.displayRangeValue.endDate)}},created(){this.initI18nT(),this.platform()},methods:{initI18nT(){const a=e.initVueI18n(t.i18nMessages);this.i18nT=a.t},initPicker(e){if(!e&&!this.defaultValue||Array.isArray(e)&&!e.length)this.$nextTick((()=>{this.clear(!1)}));else if(Array.isArray(e)||this.isRange){const[t,i]=e;if(!t&&!i)return;const s=a.getDate(t),n=a.getTime(t,this.hideSecond),r=a.getDate(i),h=a.getTime(i,this.hideSecond),l=s,d=r;this.displayRangeValue.startDate=this.tempRange.startDate=l,this.displayRangeValue.endDate=this.tempRange.endDate=d,this.hasTime&&(this.displayRangeValue.startDate=`${s} ${n}`,this.displayRangeValue.endDate=`${r} ${h}`,this.tempRange.startTime=n,this.tempRange.endTime=h);const m={before:s,after:r};this.startMultipleStatus=Object.assign({},this.startMultipleStatus,m,{which:"right"}),this.endMultipleStatus=Object.assign({},this.endMultipleStatus,m,{which:"left"})}else e?(this.displayValue=this.inputDate=this.calendarDate=a.getDate(e),this.hasTime&&(this.pickerTime=a.getTime(e,this.hideSecond),this.displayValue=`${this.displayValue} ${this.pickerTime}`)):this.defaultValue&&(this.inputDate=this.calendarDate=a.getDate(this.defaultValue),this.hasTime&&(this.pickerTime=a.getTime(this.defaultValue,this.hideSecond)))},updateLeftCale(e){const t=this.$refs.left;t.cale.setHoverMultiple(e.after),t.setDate(this.$refs.left.nowDate.fullDate)},updateRightCale(e){const t=this.$refs.right;t.cale.setHoverMultiple(e.after),t.setDate(this.$refs.right.nowDate.fullDate)},platform(){if("undefined"!=typeof navigator)return void(this.isPhone=-1!==navigator.userAgent.toLowerCase().indexOf("mobile"));const{windowWidth:t}=e.index.getSystemInfoSync();this.isPhone=t<=500,this.windowWidth=t},show(){if(this.$emit("show"),this.disabled)return;if(this.platform(),this.isPhone)return void setTimeout((()=>{this.$refs.mobile.open()}),0);this.pickerPositionStyle={top:"10px"};e.index.createSelectorQuery().in(this).select(".uni-date-editor").boundingClientRect((e=>{this.windowWidth-e.left<this.datePopupWidth&&(this.pickerPositionStyle.right=0)})).exec(),setTimeout((()=>{if(this.pickerVisible=!this.pickerVisible,!this.isPhone&&this.isRange&&this.isFirstShow){this.isFirstShow=!1;const{startDate:e,endDate:t}=this.calendarRange;e&&t?this.diffDate(e,t)<30&&this.$refs.right.changeMonth("pre"):this.isPhone&&(this.$refs.right.cale.lastHover=!1)}}),50)},close(){setTimeout((()=>{this.pickerVisible=!1,this.$emit("maskClick",this.value),this.$refs.mobile&&this.$refs.mobile.close()}),20)},setEmit(e){"timestamp"!==this.returnType&&"date"!==this.returnType||(Array.isArray(e)?(this.hasTime||(e[0]=e[0]+" 00:00:00",e[1]=e[1]+" 00:00:00"),e[0]=this.createTimestamp(e[0]),e[1]=this.createTimestamp(e[1]),"date"===this.returnType&&(e[0]=new Date(e[0]),e[1]=new Date(e[1]))):(this.hasTime||(e+=" 00:00:00"),e=this.createTimestamp(e),"date"===this.returnType&&(e=new Date(e)))),this.$emit("update:modelValue",e),this.$emit("input",e),this.$emit("change",e),this.isEmitValue=!0},createTimestamp:e=>(e=a.fixIosDateFormat(e),Date.parse(new Date(e))),singleChange(e){this.calendarDate=this.inputDate=e.fulldate,this.hasTime||this.confirmSingleChange()},confirmSingleChange(){if(!a.checkDate(this.inputDate)){const e=new Date;this.calendarDate=this.inputDate=a.getDate(e),this.pickerTime=a.getTime(e,this.hideSecond)}let e,t,i=!1;if(this.start){let s=this.start;"number"==typeof this.start&&(s=a.getDateTime(this.start,this.hideSecond)),[e,t]=s.split(" "),this.start&&!a.dateCompare(e,this.inputDate)&&(i=!0,this.inputDate=e)}let s,n,r=!1;if(this.end){let e=this.end;"number"==typeof this.end&&(e=a.getDateTime(this.end,this.hideSecond)),[s,n]=e.split(" "),this.end&&!a.dateCompare(this.inputDate,s)&&(r=!0,this.inputDate=s)}this.hasTime?(i&&(this.pickerTime=t||a.getDefaultSecond(this.hideSecond)),r&&(this.pickerTime=n||a.getDefaultSecond(this.hideSecond)),this.pickerTime||(this.pickerTime=a.getTime(Date.now(),this.hideSecond)),this.displayValue=`${this.inputDate} ${this.pickerTime}`):this.displayValue=this.inputDate,this.setEmit(this.displayValue),this.pickerVisible=!1},leftChange(e){const{before:t,after:a}=e.range;this.rangeChange(t,a);const i={before:e.range.before,after:e.range.after,data:e.range.data,fulldate:e.fulldate};this.startMultipleStatus=Object.assign({},this.startMultipleStatus,i),this.$emit("calendarClick",e)},rightChange(e){const{before:t,after:a}=e.range;this.rangeChange(t,a);const i={before:e.range.before,after:e.range.after,data:e.range.data,fulldate:e.fulldate};this.endMultipleStatus=Object.assign({},this.endMultipleStatus,i),this.$emit("calendarClick",e)},mobileChange(e){if(this.isRange){const{before:t,after:a}=e.range;if(!t)return;if(this.handleStartAndEnd(t,a,!0),this.hasTime){const{startTime:t,endTime:a}=e.timeRange;this.tempRange.startTime=t,this.tempRange.endTime=a}this.confirmRangeChange()}else this.hasTime?this.displayValue=e.fulldate+" "+e.time:this.displayValue=e.fulldate,this.setEmit(this.displayValue);this.$refs.mobile.close()},rangeChange(e,t){e&&t&&(this.handleStartAndEnd(e,t,!0),this.hasTime||this.confirmRangeChange())},confirmRangeChange(){if(!this.tempRange.startDate||!this.tempRange.endDate)return void(this.pickerVisible=!1);let e,t;a.checkDate(this.tempRange.startDate)||(this.tempRange.startDate=a.getDate(Date.now())),a.checkDate(this.tempRange.endDate)||(this.tempRange.endDate=a.getDate(Date.now()));let i,s,n=!1,r=!1;if(this.start){let e=this.start;"number"==typeof this.start&&(e=a.getDateTime(this.start,this.hideSecond)),[i,s]=e.split(" "),this.start&&!a.dateCompare(this.start,this.tempRange.startDate)&&(n=!0,this.tempRange.startDate=i),this.start&&!a.dateCompare(this.start,this.tempRange.endDate)&&(r=!0,this.tempRange.endDate=i)}let h,l,d=!1,m=!1;if(this.end){let e=this.end;"number"==typeof this.end&&(e=a.getDateTime(this.end,this.hideSecond)),[h,l]=e.split(" "),this.end&&!a.dateCompare(this.tempRange.startDate,this.end)&&(d=!0,this.tempRange.startDate=h),this.end&&!a.dateCompare(this.tempRange.endDate,this.end)&&(m=!0,this.tempRange.endDate=h)}this.hasTime?(n?this.tempRange.startTime=s||a.getDefaultSecond(this.hideSecond):d&&(this.tempRange.startTime=l||a.getDefaultSecond(this.hideSecond)),this.tempRange.startTime||(this.tempRange.startTime=a.getTime(Date.now(),this.hideSecond)),r?this.tempRange.endTime=s||a.getDefaultSecond(this.hideSecond):m&&(this.tempRange.endTime=l||a.getDefaultSecond(this.hideSecond)),this.tempRange.endTime||(this.tempRange.endTime=a.getTime(Date.now(),this.hideSecond)),e=this.displayRangeValue.startDate=`${this.tempRange.startDate} ${this.tempRange.startTime}`,t=this.displayRangeValue.endDate=`${this.tempRange.endDate} ${this.tempRange.endTime}`):(e=this.displayRangeValue.startDate=this.tempRange.startDate,t=this.displayRangeValue.endDate=this.tempRange.endDate),a.dateCompare(e,t)||([e,t]=[t,e]),this.displayRangeValue.startDate=e,this.displayRangeValue.endDate=t;const o=[e,t];this.setEmit(o),this.pickerVisible=!1},handleStartAndEnd(e,t,i=!1){if(!e)return;t||(t=e);const s=i?"tempRange":"range",n=a.dateCompare(e,t);this[s].startDate=n?e:t,this[s].endDate=n?t:e},dateCompare:(e,t)=>(e=new Date(e.replace("-","/").replace("-","/")))<=(t=new Date(t.replace("-","/").replace("-","/"))),diffDate(e,t){e=new Date(e.replace("-","/").replace("-","/"));const a=((t=new Date(t.replace("-","/").replace("-","/")))-e)/864e5;return Math.abs(a)},clear(e=!0){this.isRange?(this.displayRangeValue.startDate="",this.displayRangeValue.endDate="",this.tempRange.startDate="",this.tempRange.startTime="",this.tempRange.endDate="",this.tempRange.endTime="",this.isPhone?this.$refs.mobile&&this.$refs.mobile.clearCalender():(this.$refs.left&&this.$refs.left.clearCalender(),this.$refs.right&&this.$refs.right.clearCalender(),this.$refs.right&&this.$refs.right.changeMonth("next")),e&&(this.$emit("change",[]),this.$emit("input",[]),this.$emit("update:modelValue",[]))):(this.displayValue="",this.inputDate="",this.pickerTime="",this.isPhone?this.$refs.mobile&&this.$refs.mobile.clearCalender():this.$refs.pcSingle&&this.$refs.pcSingle.clearCalender(),e&&(this.$emit("change",""),this.$emit("input",""),this.$emit("update:modelValue","")))},calendarClick(e){this.$emit("calendarClick",e)}}};if(!Array){(e.resolveComponent("uni-icons")+e.resolveComponent("time-picker")+e.resolveComponent("Calendar"))()}Math;const s=e._export_sfc(i,[["render",function(t,a,i,s,n,r){return e.e({a:!n.isRange},n.isRange?{d:e.p({type:"calendar",color:"#c0c4cc",size:"22"}),e:e.t(n.displayRangeValue.startDate||r.startPlaceholderText),f:e.t(i.rangeSeparator),g:e.t(n.displayRangeValue.endDate||r.endPlaceholderText)}:{b:e.p({type:"calendar",color:"#c0c4cc",size:"22"}),c:e.t(n.displayValue||r.singlePlaceholderText)},{h:r.showClearIcon},r.showClearIcon?{i:e.p({type:"clear",color:"#c0c4cc",size:"22"}),j:e.o(((...e)=>r.clear&&r.clear(...e)))}:{},{k:i.disabled?1:"",l:i.border?1:"",m:e.o(((...e)=>r.show&&r.show(...e))),n:n.pickerVisible,o:e.o(((...e)=>r.close&&r.close(...e))),p:!n.isPhone},n.isPhone?{}:e.e({q:!n.isRange},n.isRange?e.e({J:n.hasTime},n.hasTime?{K:r.startDateText,L:n.tempRange.startDate,M:e.o((e=>n.tempRange.startDate=e.detail.value)),N:r.startTimeText,O:!n.tempRange.startDate,P:n.tempRange.startTime,Q:e.o((e=>n.tempRange.startTime=e.detail.value)),R:e.o((e=>n.tempRange.startTime=e)),S:e.p({type:"time",start:r.timepickerStartTime,border:!1,disabled:!n.tempRange.startDate,hideSecond:i.hideSecond,modelValue:n.tempRange.startTime}),T:e.p({type:"arrowthinright",color:"#999"}),U:r.endDateText,V:n.tempRange.endDate,W:e.o((e=>n.tempRange.endDate=e.detail.value)),X:r.endTimeText,Y:!n.tempRange.endDate,Z:n.tempRange.endTime,aa:e.o((e=>n.tempRange.endTime=e.detail.value)),ab:e.o((e=>n.tempRange.endTime=e)),ac:e.p({type:"time",end:r.timepickerEndTime,border:!1,disabled:!n.tempRange.endDate,hideSecond:i.hideSecond,modelValue:n.tempRange.endTime})}:{},{ad:e.sr("left","2db8863e-8"),ae:e.o(r.leftChange),af:e.o(r.updateRightCale),ag:e.p({showMonth:!1,"start-date":n.calendarRange.startDate,"end-date":n.calendarRange.endDate,range:!0,pleStatus:n.endMultipleStatus}),ah:e.sr("right","2db8863e-9"),ai:e.o(r.rightChange),aj:e.o(r.updateLeftCale),ak:e.p({showMonth:!1,"start-date":n.calendarRange.startDate,"end-date":n.calendarRange.endDate,range:!0,pleStatus:n.startMultipleStatus}),al:n.hasTime},n.hasTime?{am:e.t(r.clearText),an:e.o(((...e)=>r.clear&&r.clear(...e))),ao:e.t(r.okText),ap:e.o(((...e)=>r.confirmRangeChange&&r.confirmRangeChange(...e)))}:{},{aq:e.s(n.pickerPositionStyle)}):e.e({r:n.hasTime},n.hasTime?{s:r.selectDateText,t:n.inputDate,v:e.o((e=>n.inputDate=e.detail.value)),w:r.selectTimeText,x:!n.inputDate,y:n.pickerTime,z:e.o((e=>n.pickerTime=e.detail.value)),A:e.o((e=>n.pickerTime=e)),B:e.p({type:"time",border:!1,disabled:!n.inputDate,start:r.timepickerStartTime,end:r.timepickerEndTime,hideSecond:i.hideSecond,modelValue:n.pickerTime})}:{},{C:e.sr("pcSingle","2db8863e-4"),D:e.o(r.singleChange),E:e.p({showMonth:!1,"start-date":n.calendarRange.startDate,"end-date":n.calendarRange.endDate,date:n.calendarDate,"default-value":i.defaultValue}),F:n.hasTime},n.hasTime?{G:e.t(r.okText),H:e.o(((...e)=>r.confirmSingleChange&&r.confirmSingleChange(...e)))}:{},{I:e.s(n.pickerPositionStyle)}),{ar:n.pickerVisible}),{as:n.isPhone},n.isPhone?{at:e.sr("mobile","2db8863e-10"),av:e.o(r.mobileChange),aw:e.o(r.close),ax:e.o(r.calendarClick),ay:e.p({clearDate:!1,date:n.calendarDate,defTime:r.mobileCalendarTime,"start-date":n.calendarRange.startDate,"end-date":n.calendarRange.endDate,selectableTimes:r.mobSelectableTime,startPlaceholder:i.startPlaceholder,endPlaceholder:i.endPlaceholder,"default-value":i.defaultValue,pleStatus:n.endMultipleStatus,showMonth:!1,range:n.isRange,hasTime:n.hasTime,insert:!1,hideSecond:i.hideSecond})}:{})}]]);wx.createComponent(s);
