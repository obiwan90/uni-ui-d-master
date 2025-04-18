<template>
	<view class="recoveryLevel-layout">
		<view class="header">
		  <!-- 状态栏 -->
		  <view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
		  <!-- 标题栏 -->
		  <view class="titleBar" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
		    <view class="bar-icon" @click="goBack">
		      <image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
		    </view>
		    <view class="name">
		      <text>回收报价等级说明</text>
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
		{title:'成色描述',content:'全新全套原封未激活'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'全套已激活',values:[
		{title:'机身外观',content:'全套未激活'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'原封全套激活30天内，包装无破损，配件齐全且原装，机身完美'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'充新',values:[
		{title:'机身外观',content:'完美'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'机身外观无任何瑕疵'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'靓机',values:[
		{title:'机身外观',content:'细微瑕疵'},
		{title:'屏幕外观',content:'完美'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'外壳细微瑕疵，外屏完美，整体成色99新'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'小花',values:[
		{title:'机身外观',content:'轻微磕碰'},
		{title:'屏幕外观',content:'细微划痕'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'外壳轻微磕碰，外屏细微划痕，整体成色95新'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'花机',values:[
		{title:'机身外观',content:'正常磕碰掉漆'},
		{title:'屏幕外观',content:'正常划痕'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'外壳正常磕碰掉漆，外屏正常划痕或轻微硬划痕，机身无弯曲、破损'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'外爆',values:[
		{title:'机身外观',content:'轻微破裂'},
		{title:'屏幕外观',content:'正常破裂'},
		{title:'液晶显示',content:'无透图、无背光、无任何异常'},
		{title:'成色描述',content:'外壳轻微破裂或正常磕碰掉漆，外屏正常破裂或大花，机身无弯曲、缺失'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'内爆',values:[
		{title:'机身外观',content:'轻微破裂'},
		{title:'屏幕外观',content:'正常破裂'},
		{title:'液晶显示',content:'液晶原装且可正常测试功能'},
		{title:'成色描述',content:'外壳轻微破裂或正常磕碰掉漆，外屏正常破裂或大花，机身无弯曲、缺失，液晶原装且可正常测试功能'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
		// {title:'机身刻字',content:'无'},
	]},
	{type:'废品',values:[
		{title:'机身外观',content:'无要求'},
		{title:'屏幕外观',content:'无要求'},
		{title:'液晶显示',content:'无要求'},
		{title:'成色描述',content:'零部件及主板无缺失'},
		// {title:'备注',content:'未拆封需拆封验机，否则不予售后'},
		{title:'功能检测',content:'正常'},
		{title:'主板维修',content:'无维修'},
		{title:'外屏维修',content:'无维修'},
		{title:'屏幕维修',content:'无维修'},
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
.recoveryLevel-layout{
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