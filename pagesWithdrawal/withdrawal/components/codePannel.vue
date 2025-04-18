<template>
	<view class="codePannel-layout">
		<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 40rpx;color: #1F1F1F;">输入手机验证码</text>
		<view style="margin-top: 26rpx;display: flex;flex-direction: column;gap: 15rpx;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #1F1F1F;">请填写银行预留电话</text>
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #1F1F1F;">131****1234收到的短信验证码</text>
		</view>
		
		<view style="width: 100%;margin-top: 60rpx;">
			<uv-input style="" clearable placeholder="请输入验证码" type="number" maxlength="11" border="bottom" v-model="numberCode" @change="change">
				<template v-slot:suffix>
					<uv-toast ref="toast"></uv-toast>
					<uv-code :seconds="seconds" @end="end" @start="start" ref="codeRef" @change="codeChange"></uv-code>
					<uv-button :custom-style="customStyle" type="primary" plain @tap="getCode">{{tips}}</uv-button>
				</template>
			</uv-input>
		</view>
		
		<view style="margin-top: 64rpx;width: 566rpx;height: 96rpx;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 30rpx;color: #FFFFFF;">确认</text>
		</view>
	</view>
</template>

<script setup>
const customStyle = {
	border: 'none',
	height: '42rpx',
	width:'250rpx',
	textAlign: 'right'
};
const codeRef = ref(null);
const tips = ref('');
const numberCode = ref('');
const seconds = ref(60);
const change = (value) => {
	console.log(value);
};
const codeChange = (text) => {
	tips.value = text;
};
const getCode = () => {
	if (codeRef.value && codeRef.value.canGetCode) {
		uni.showLoading({
			title: '正在获取验证码'
		});
		setTimeout(() => {
			uni.hideLoading();
			uni.$uv.toast('验证码已发送');
			codeRef.value.start();
		}, 2000);
	} else {
		// uni.$uv.toast('倒计时结束后再发送');
	}
};
	
const end = () => {
	// uni.$uv.toast('倒计时结束');
};

const start = () => {
	uni.$uv.toast('验证码已发送');
};
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.codePannel-layout{
	padding: 40rpx;
	background: #ffffff;
	width: 646rpx;
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	border: 2rpx solid #707070;
	display: flex;
	flex-direction: column;
}

</style>