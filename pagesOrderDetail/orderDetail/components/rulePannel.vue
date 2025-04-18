<template>
	<view class="rule-pannel">
		<view class="top">
			<text>运费规则</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<text class="rule-pannel-text">快递默认到付；送货上门3公里内免费配送，超出3公里买家承担运费；自提需提前联系商户</text>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.rule-pannel{
		width: 750rpx;
		height: 368rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		padding-top: 40rpx;
		padding-right: 30rpx;
		.top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
			}
			image{
				height: 32rpx;
				width: 32rpx;
			}
		}
		.rule-pannel-text{
			box-sizing: border-box;
			height: 96rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1F1F1F;
			margin-top: 40rpx;
		}
		
	}
</style>