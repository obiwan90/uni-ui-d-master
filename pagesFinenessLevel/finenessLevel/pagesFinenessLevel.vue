<template>
	<view class="finenessLevel-layout">
		<view class="header">
		  <!-- 状态栏 -->
		  <view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
		  <!-- 标题栏 -->
		  <view class="titleBar" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
		    <view class="bar-icon" @click="goBack">
		      <image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
		    </view>
		    <view class="name">
		      <text>二手批发成色等级说明</text>
		    </view>
		    <view class="fill">
		      
		    </view>
		  </view>
		</view>
		<!-- 填充 -->
		<view class="fillContent" :style="{height:getStatusBarHeight()+getTitleBarHeight()+'px'}"></view>
		
		<view class="content">
			<!-- tabs -->
			<view class="tabs">
				<uv-tabs
					class="cus-tab"
					:list="tabsData"
					lineWidth="30" 
					lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)" 
					lineHeight="3"
					:scrollable='true'
					:fontSize="32"
					:inactiveStyle="{
						color: '#1F1F1F',
						opacity: 0.6,
						fontWeight: 'bold'
					}"
					:activeStyle="{ color: '#1F1F1F',opacity: 1,fontWeight: 'bold'}"
					@change="uvTabs1Change"
					:current="activeTab1Index"
				></uv-tabs>
			</view>
			
			
			<scroll-view scroll-y scroll-with-animation :scroll-into-view="scrollInto" style="height:1330rpx">
			<view class="rule" v-for="(item,index) in ruleData" :id="'box-' + index" :key="index">
				<view class="title">
					<text>{{item.type}}</text>
				</view>
			
				<view class="content-grid">
					<view class="content-row" v-for="(item1,index) in item.values" :key="index">
						<view class="col1">
							<text>{{item1.title}}</text>
						</view>
						<view class="col2">
							<text>{{item1.content}}</text>
						</view>
					</view>
				</view>
			</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from "@/utils/system.js"
const scrollInto = ref();
const goBack = () => {
  uni.navigateBack();
};
const activeTab1Index = ref(0);
const tabsData = computed(() => {
	return ruleData.value.map((item) => ({
		name: item.type
	}));
});
const uvTabs1Change = (e) => {
	console.log('切换了标签:', e.index);
	if (e.index !== undefined) {
		activeTab1Index.value = e.index;
		scrollInto.value = 'box-' + e.index;
	} else {
		console.error('标签索引错误');
	}
};

const ruleData = ref([
	{type:'全新未激活',values:[
		{title:'机身外观',content:'全套未激活'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'未激活，包装可拆封但无破损，全套配件齐全且原装未使用。'},
		{title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'全套已激活',values:[
		{title:'机身外观',content:'全套已激活'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'激活40天内，包装无破损，全套配件齐全且原装，允许使用。'},
		{title:'备注',content:'以包裹签收日期为准'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'全新单机',values:[
		{title:'机身外观',content:'完美'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'肉眼判断或强光下无法拍摄出任何瑕疵'},
		{title:'备注',content:'全新单机'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'99新',values:[
		{title:'机身外观',content:'细微瑕疵'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'机身≤2处且<3mm的细微划痕，或≤1处且<0.5mm的轻微磕碰/掉漆;屏幕外观仅允许强光下≤2处且<3mm的细微划痕'},
		{title:'备注',content:'整体成色接近全新'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	// {type:'98新',values:[
	// 	{title:'机身外观',content:'全套未激活'},
	// 	{title:'屏幕外观',content:'全新未激活'},
	// 	{title:'液晶显示',content:'无透图、无背光、无任何异常'},
	// 	{title:'成色描述',content:'未激活，包装可拆封但无破损，全套配件齐全且原装未使用。'},
	// 	{title:'备注',content:'未拆封需拆封验机，否则不予售后'},
	// 	{title:'功能检测',content:'正常'},
	// 	{title:'主板维修',content:'无维修'},
	// 	{title:'外屏维修',content:'无维修'},
	// 	{title:'屏幕维修',content:'无维修'},
	// 	{title:'机身刻字',content:'无'},
	// ]},
	{type:'97新',values:[
		{title:'机身外观',content:'轻微瑕疵'},
		{title:'屏幕外观',content:'细微划痕'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'机身≤3处且<5mm的细微划痕，或≤1处且<1mm的轻微磕碰/掉漆；屏幕外观仅允许强光下≤3条且<10mm的细微划痕'},
		{title:'备注',content:'靓机标准'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'95新',values:[
		{title:'机身外观',content:'轻微磨损/掉漆/磕碰'},
		{title:'屏幕外观',content:'正常划痕'},
		{title:'液晶显示',content:'仅允许不明显的轻微透图或轻微背光'},
		{title:'成色描述',content:'机身≤3处且<2mm的磕碰/掉漆/氧化或≤1处且<3mm的磕碰/掉漆/氧化，和少量正常细微划痕；屏幕外观≤3条且<5mm的轻微硬划痕和其它正常划痕'},
		{title:'备注',content:'小花机标准'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'93新',values:[
		{title:'机身外观',content:'明显小磕碰'},
		{title:'屏幕外观',content:'轻微硬划痕'},
		{title:'液晶显示',content:'仅允许不明显的轻微透图或轻微背光'},
		{title:'成色描述',content:'机身≤5处且<3mm的磕碰/掉漆/脱层或≤2处且<5mm的磕碰/掉漆，和少量正常细微划痕/氧化；屏幕外观≤5条且<10mm的硬划痕和其它正常划痕'},
		{title:'备注',content:'接近小花机成色'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'9新',values:[
		{title:'机身外观',content:'明显磕碰'},
		{title:'屏幕外观',content:'明显硬划痕'},
		{title:'液晶显示',content:'允许轻微透图、轻微背光、轻微异常，不明显且不影响正常使用'},
		{title:'成色描述',content:'机身≤10处且<3mm的磕碰/掉漆或≤3处且<10mm的磕碰/掉漆，和正常细微划痕及少量氧化；屏幕外观≤10条且<10mm的硬划痕或≤3条且<20mm的硬划痕'},
		{title:'备注',content:'正常磕碰'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'8新',values:[
		{title:'机身外观',content:'大磕碰'},
		{title:'屏幕外观',content:'严重硬划痕'},
		{title:'液晶显示',content:'允许轻微透图、轻微背光、轻微异常，不明显且不影响正常使用'},
		{title:'成色描述',content:'机身无破损缺失，屏幕外观无破裂'},
		{title:'备注',content:'花机'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'8新以下',values:[
		{title:'机身外观',content:'破损/缺失/裂缝/弯曲'},
		{title:'屏幕外观',content:'破裂'},
		{title:'液晶显示',content:'显示可异常，但不影响正常使用。'},
		{title:'成色描述',content:'无成色要求，以实物图片为准'},
		{title:'备注',content:'大花机'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'特价商品',values:[
		{title:'机身外观',content:'无要求'},
		{title:'屏幕外观',content:'无要求'},
		{title:'液晶显示',content:'显示可异常，但不影响正常使用。'},
		{title:'成色描述',content:'以实物图片和质检报告为准 '},
		{title:'备注',content:'特价促销、成色异常、显示异常、维修机型或辅助功能异常且不影响使用'},
		{title:'功能检测',content:'无要求'},
		{title:'主板维修',content:'允许维修'},
		{title:'外屏维修',content:'允许维修'},
		{title:'屏幕维修',content:'允许维修'},
		// {title:'机身刻字',content:'无'},
	]},
])

onLoad((options)=>{
	 console.log('传递过来的参数:', options.id);
	 if(options.id){
		activeTab1Index.value = parseInt(options.id)
		scrollInto.value = 'box-' + activeTab1Index.value;
	 }
})
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.finenessLevel-layout{
	background: #F3F2F6;
	
	.header {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  z-index: 99;
	  background: #F3F2F6;
	  .titleBar {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 0 20rpx;
	    .bar-icon {
	      width: 20%;
	      .img {
	        height: 32rpx;
	        width: 32rpx;
	      }
	    }
	    .name {
	      width: 60%;
	      height: 56rpx;
	      font-family: PingFang SC, PingFang SC;
	      font-weight: 800;
	      font-size: 40rpx;
	      color: #1F1F1F;
	      text-align: center;
	    }
	    .fill {
	      width: 20%;
	      height: 56rpx;
	      font-family: PingFang SC, PingFang SC;
	      font-weight: 800;
	      font-size: 40rpx;
	      color: #1F1F1F;
	      text-align: center;
	      opacity: 0;
	    }
	  }
	}
	.fillContent {}
	.content{
		margin-top: 40rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin-left: 20rpx;
		margin-bottom: 10rpx;
		.tabs{
			border-radius: 20rpx 20rpx 0 0;
			background: #FFFFFF;
			border-bottom: 1rpx solid #EEEEEE;
			margin-bottom: 30rpx;
		}
	}
	
	
	.rule{
		box-sizing: border-box;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title{
			width: 670rpx;
			height: 66rpx;
			background: #FF6D0C;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
		.content-grid{
			width: 670rpx;
			
			.content-row{
				display: grid;
				grid-template-columns: auto auto;
				align-items: center;
				gap: 2rpx;
				margin-top: 2rpx;
				.col1{
					width: 192rpx;
					height: 128rpx;
					background: #FFF6EB;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: center;
					}
				}
				.col2{
					width: 476rpx;
					height: 128rpx;
					background: #F9F9F9;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: center;
					}
				}
			}
		
		}
	}
}
</style>