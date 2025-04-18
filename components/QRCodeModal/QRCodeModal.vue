<template>
	<view class="QRCodeModal-layout">
		<view style="display: flex;flex-direction: column;align-items: center;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 30rpx;color: #1F1F1F;margin-top: 26rpx;">为避免个人数据丢失</text>
			<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 30rpx;color: #1F1F1F;margin-top: 26rpx;">请先关注【闲置科技】公众号</text>
		</view>
		<image 
			:src="qrCodeUrl" 
			mode="aspectFill" 
			style="height: 200px;width: 200px;margin-top: 20rpx;" 
			:show-menu-by-longpress="true"
		></image>
		<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;opacity: 0.7;margin-top: 26rpx;">长按图片识别二维码关注</text>
	</view>
</template>

<script setup>
const props = defineProps({
	qrCodeUrl: {
		type: String,
		required: ''
	}
});
// const handleLongPress = () => {
// 	// 这里可以使用二维码识别库，例如 uni.scanCode
// 	uni.scanCode({
// 		success: (res) => {
// 			uni.showToast({
// 				title: '识别成功: ' + res.result,
// 				icon: 'none'
// 			});
// 			// 假设识别到的内容是公众号的原始ID
// 			const officialAccountId = '你的公众号原始ID'; // 替换为实际的公众号ID
// 			uni.openBusinessView({
// 				__biz: officialAccountId,
// 				success: () => {
// 					uni.showToast({
// 						title: '跳转成功',
// 						icon: 'success'
// 					});
// 				},
// 				fail: (err) => {
// 					uni.showToast({
// 						title: '跳转失败',
// 						icon: 'none'
// 					});
// 				}
// 			});
// 		},
// 		fail: (err) => {
// 			uni.showToast({
// 				title: '识别失败',
// 				icon: 'none'
// 			});
// 		}
// 	});
// };
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.QRCodeModal-layout {
	width: 500rpx;
	border-radius: 20rpx;
	background: #FFFFFF;
	padding: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
