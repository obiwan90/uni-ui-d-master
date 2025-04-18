<template>
	<view class="userServicePannel-layout">
		
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<text class="text" style="font-weight: bold;font-size: 36rpx;color: #1F1F1F;">预约发货</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" style="height: 32rpx;width: 32rpx;" mode="aspectFill"></image>
		</view>
		
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: space-between;align-items: center;padding: 20rpx;">
			<text>邮寄方式</text>
			<view style="display: flex;justify-content: center;align-items: center;gap:10rpx;">
				<view style="width: 180rpx;background: #FFEEEC;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;justify-content: center;align-items: center;padding: 14rpx 26rpx;">
					<text class="text" style="font-weight: 400;color: #EB4636;font-size: 32rpx;">上门取件</text>
				</view>
				<view style="width: 180rpx;background: #F9F9F9;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;justify-content: center;align-items: center;padding: 14rpx 26rpx;">
					<text class="text" style="font-weight: 400;font-size: 32rpx;color: #1F1F1F;">自行寄回</text>
				</view>
			</view>
		</view>
		
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 20rpx;display: flex;justify-content: space-between;">
			<text class="text" style="font-size: 32rpx;font-weight: 400;color: #1F1F1F;">我的地址</text>
			<view style="display: flex;justify-content: center;align-items: center;flex: 1;gap: 10rpx;">
				<view style="display: flex;flex-direction: column;gap: 20rpx;align-items: flex-end;justify-content: space-between;flex: 1;">
					<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;text-align: right;">北京市朝阳区天安车公廟工业区天济大厦ab座5b 506</text>
					<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">金克丝 13502866873</text>
				</view>
				<image style="height: 24rpx;width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 28rpx 24rpx;display: flex;justify-content: space-between;align-items: center;">
			<text class="text" style="font-weight: 400;font-size: 32rpx;color: #1F1F1F;">上门时间</text>
			<view class="example-body" style="display: flex;align-items: center;gap: 10rpx;justify-content: center;">
				<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
				<image style="height: 24rpx;width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		
	</view>
</template>

<script setup>
const datetimesingle = ref()
const changeLog = (e)=>{
	console.log(e)
}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.userServicePannel-layout{
	width: 750rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding: 20rpx;
}
.text{
	font-family: PingFang SC, PingFang SC;
	font-style: normal;
	text-transform: none;
}
</style>