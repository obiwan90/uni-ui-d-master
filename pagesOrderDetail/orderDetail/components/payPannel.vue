<template>
	<view class="pay-pannel">
		<view class="top">
			<text>支付方式</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		
		<view class="card" v-for="(item,index) in pay" :key="index" @click="selectTap(index)">
			<view class="card-left">
				<image :src="item.image" mode="aspectFill"></image>
				<text>{{item.text}}</text>
			</view>
			<view class="card-right">
				<view class="btn">
					<image 
						:src="selectedTap === index ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png'"
						mode="aspectFill"
					></image>
				</view>
			</view>
		</view>
		
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn"  @click="$emit('payType', pay[selectedTap])">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const emit = defineEmits(['payType']);
const pay = ref([
	{image:'https://www.xzxskj.com/xcximg/icon_weixin@3x.png',text:'微信支付',payment:'1'},
	{image:'https://www.xzxskj.com/xcximg/icon_zhifubao@3x.png',text:'支付宝支付',payment:'2'},
	{image:'https://www.xzxskj.com/xcximg/icon_yue@3x.png',text:'余额支付',payment:'3'},
	{image:'https://www.xzxskj.com/xcximg/icon_daikuan@3x.png',text:'先贷后款',payment:'4'},
])
const selectedTap = ref(0);
const selectTap = (index) => {
  selectedTap.value = index;
  emit('payType', pay.value[selectedTap.value])
};
defineExpose({
	selectTap
});
</script>

<style lang="scss" scoped>
	.pay-pannel{
		box-sizing: border-box;
		width: 750rpx;
		height: 840rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		display: flex;
		flex-direction: column;
		padding: 40rpx 20rpx;
		.top{
			// border: 2rpx solid black;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 48rpx;
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
		.card{
			margin-bottom: 20rpx;
			box-sizing: border-box;
			width: 690rpx;
			height: 100rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			.card-left{
				image{
					height: 30rpx;
					width: 30rpx;
					margin-right: 20rpx;
				}
				text{
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #1F1F1F;
				}
			}
			.card-right{
				height: 32rpx;
				width: 32rpx;
				image{
					height: 32rpx;
					width: 32rpx;
				}
			}
			
		}
		
		.pannel-btn{
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
				width: 444rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}
	
	}
</style>
