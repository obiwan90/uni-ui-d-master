<template>
	<view class="service-pannel">
		<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #1F1F1F;">温馨提示</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" style="height: 32rpx;width: 32rpx;" @click="$emit('close')"></image>
		</view>
		<view style="display: flex;flex-direction: column;margin-top: 34rpx;align-items: center;gap: 26rpx;">
			<image src="https://www.xzxskj.com/xcximg/imgHuiShou@3x.png" mode="aspectFill" style="width: 212rpx;height: 180rpx;"></image>
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;opacity: 0.7;">此型号暂无报价，请联系回收客服。</text>
		</view>
		<view  @click="$emit('close')" style="margin-top: 62rpx;width: 488rpx;height: 96rpx;background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;opacity: 0.65;display: flex;justify-content: center;align-items: center;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #FFFFFF;">确定</text>
			<!-- <button  class="cusService" open-type="contact" @contact="onContact" send-message-title="" show-message-card plain>客服</button> -->
		</view>
	</view>
</template>

<script setup>
const onContact = (e) => {
	console.log(e)
}
const comfirm =()=>{
	
}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.service-pannel{
	padding: 24rpx;
	width: 590rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.cusService{
	width: 488rpx;
	position: absolute;
	border-radius: 20rpx;
	opacity: 0;
}
</style>