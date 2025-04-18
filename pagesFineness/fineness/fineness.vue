<template>
	<view class="fineness-layout">
		<!-- header -->
		<custom-header>
			<template #name>成色说明</template>
			<template #fill>成色说明</template>
		</custom-header>
		<!-- 说明 -->
		<view class="explain" v-for="(item, index) in data" :key="index"  @click.stop="goTitlePage(item)">
			<view class="title">
				<view class="left">
					<view class="divile" />
					<text>{{ item.title }}</text>
				</view>
				<view class="right">
					<image v-if="item.title !== '二手批发成色说明'" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"/>
				</view>
			</view>
			<view class="row" v-for="(item1, index) in item.values" :key="index" @click.stop="goPage(item1.id)">
				<view class="left">
					<text>{{ item1.text }}</text>
				</view>
				<view class="right">
					<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"  />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { debounce } from '../../utils/debounce.js';
const data = ref([
	{ title: '二手批发成色说明', values: [
		{id:0,text:'机身外观成色说明'}, 
		{id:1,text:'屏幕外观成色说明'}, 
		{id:2,text:'液晶显示成色说明'}] },
	{ title: '二手批发等级说明', values: [] },
	{ title: '回收报价等级说明', values: [] }
]);
const goTitlePage = debounce((item)=>{
	console.log('goTitlePage触发了')
	if(item.title==='二手批发等级说明'){
		uni.navigateTo({
			url:'/pagesFinenessLevel/finenessLevel/pagesFinenessLevel'
		})
	}else if(item.title==='回收报价等级说明'){
		uni.navigateTo({
			url:'/pagesRecoveryLevel/recoveryLevel/recoveryLevel'
		})
	}else{
		uni.navigateTo({
			url:'/pagesFinenessDetail/finenessDetail/finenessDetail'
		})
	}
},500)

const goPage = debounce((id) => {
	console.log('goPage触发了')
    uni.navigateTo({
        url: '/pagesFinenessDetail/finenessDetail/finenessDetail?id=' + id
    });
}, 500); // 500ms 防抖时间

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.fineness-layout {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	background: #f3f2f6;
	height: 100vh;
	.explain {
		margin-top: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.title {
			border-bottom: 2rpx solid #eeeeee;
			height: 100rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				.divile {
					width: 8rpx;
					height: 24rpx;
					background: linear-gradient(180deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					margin-right: 10rpx;
				}
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 32rpx;
					color: #1f1f1f;
					text-align: left;
				}
			}
			.right {
				image {
					height: 20rpx;
					width: 20rpx;
				}
			}
		}
		.row {
			border-bottom: 2rpx solid #eeeeee;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				.divile {
					width: 8rpx;
					height: 24rpx;
					background: linear-gradient(180deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					margin-right: 10rpx;
				}
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
			.right {
				image {
					height: 20rpx;
					width: 20rpx;
				}
			}
		}
	}
}
</style>
