<template>
	<view class="poster-pannel">
		<view class="top">
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<view class="mid">
			<text class="text-1">批发价</text>
			<text class="text-2">￥14120</text>
		</view>
		<view class="bottom">
			<view class="bottom1">
				<view class="bottom1-left">
					<image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill"></image>
					<input placeholder="请输入您的零售价" class="b-input" type="text" />
				</view>

				<view class="bt">
					<image src="https://www.xzxskj.com/xcximg/icon_dianyi@3x.png" mode="aspectFill"></image>
					<text>电议</text>
				</view>
			</view>
			<view class="bottom2">
				<image src="https://www.xzxskj.com/xcximg/icon_dianhua@3x.png" mode="aspectFill"></image>
				<text>13112341234</text>
			</view>
		</view>
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn">
				<text>立即生成海报</text>
			</view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
.poster-pannel {
	box-sizing: border-box;
	width: 750rpx;
	height: 730rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding: 30rpx 30rpx;
	.top {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 40rpx;
		image {
			height: 32rpx;
			width: 32rpx;
		}
	}
	.pannel-btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 24rpx 30rpx 62rpx 30rpx;
		.btn {
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}

	.mid {
		display: flex;
		align-items: center;
		.text-1 {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #e6432e;
			margin-right: 20rpx;
		}
		.text-2 {
			height: 58rpx;
			font-family: DIN, DIN;
			font-weight: bold;
			font-size: 48rpx;
			color: #e6432e;
		}
	}

	.bottom {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		.bottom1 {
			width: 690rpx;
			height: 108rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bottom1-left {
				display: flex;
				align-items: center;
				image {
					height: 50rpx;
					width: 22rpx;
					margin-right: 20rpx;
					margin-left: 30rpx;
				}
				.b-input {
					// border: 2rpx solid black;
				}
			}

			.bt {
				width: 136rpx;
				height: 48rpx;
				background: #ffd0be;
				border-radius: 24rpx 24rpx 24rpx 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 30rpx;
				image {
					height: 28rpx;
					width: 28rpx;
				}
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #ffffff;
				}
			}
		}
		.bottom2 {
			width: 690rpx;
			height: 108rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 20rpx;
				margin-left: 30rpx;
			}
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #8d8d8d;
			}
		}
	}
}
</style>
