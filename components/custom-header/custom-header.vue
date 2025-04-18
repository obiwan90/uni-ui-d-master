<template>
	<view class="layout">
		<view class="header" :style="{ background: backgroundColor }">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view v-if="!customLeftIcon" class="bar-icon" @click="goBack">
					<image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
				</view>
				<view v-else class="bar-icon" @click="customLeftClick">
					<image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
				</view>
				<view class="name">
					<slot name="name"></slot>
				</view>
				<view class="fill">
					<slot name="fill"></slot>
				</view>
			</view>
		</view>
		<!-- 填充 -->
		<view class="fillContent" :style="{ height: getStatusBarHeight() + getTitleBarHeight() + 'px' }"></view>
	</view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
const emit = defineEmits(['clickHandler']);
const props = defineProps({
	backgroundColor: {
		type: String,
		default: '#F3F2F6'
	},
	customLeftIcon: {
		type: Boolean,
		default: false
	}
});

const goBack = () => {
	const pages = getCurrentPages(); 
	if (pages.length <= 1) {
		uni.reLaunch({
			url: '/pages/home/home'
		});
	} else {
		uni.navigateBack();
	}
};

const customLeftClick = ()=>{
	emit('clickHandler')
}
</script>

<style lang="scss" scoped>
.layout {
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		// background: #F3F2F6;
		.titleBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			.bar-icon {
				width: 33.333%;
				.img {
					height: 32rpx;
					width: 32rpx;
				}
			}
			.name {
				width: 33.333%;
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
				text-align: center;
			}
			.fill {
				width: 33.333%;
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
				text-align: center;
				opacity: 0;
			}
		}
	}
	.fillContent {
	}
}
</style>
