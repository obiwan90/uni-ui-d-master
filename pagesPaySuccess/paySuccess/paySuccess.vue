<template>
	<view v-if="isShow">
		<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
	</view>
	<view class="layout pageBg">
		<custom-header  :customLeftIcon = 'true' @clickHandler="navigateToPage1('pagesProduct/product/product')"/>
		<view class="logo">
			<image src="https://www.xzxskj.com/xcximg/icon_cg@3x.png" mode="aspectFill"></image>
		</view>
		<text class="text-1">支付成功</text>
		<text class="text-2">订单号：{{orderNo}}</text>
		<view class="btn" @click="navigateToPage1('pagesProduct/product/product')">
			<text>继续采购</text>
		</view>
		<view class="btn-1" @click="goPath('/pagesOrder/order/order?order=4')">
			<text>查看订单</text>
		</view>
	</view>
</template>

<script setup>
const isShow = ref(true)
const beforeleave = (e) => {
	console.log('e:', e);
	isShow.value = false;
	navigateToPage1('pages/home/home');
};
const orderNo = ref('')
const goPath = (path) => {
	uni.navigateTo({
		url: path
	})
}

const navigateToPage1 = (path) => {
    console.log('path:', path);
    // 获取当前页面栈
    let pages = getCurrentPages();

    // 遍历页面栈, 查找是否存在指定path的页面
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].route === path) {
            // 找到目标页面, 返回到该页面
            uni.navigateBack({
                delta: pages.length - i - 1
            });
            return;
        }
    }
    uni.navigateTo({
        url: path
    });
}

onLoad((options)=>{
	if(options.orderNo){
		orderNo.value = options.orderNo
	}
})
</script>

<style lang="scss" scoped>
	.layout{
		height: 100vh;
		view,
		swiper,
		swiper-item {
			box-sizing: border-box;
		}
		display: flex;
		box-sizing: border-box;
		flex-direction:column;
		align-items: center;
		.logo{
			margin-top: 100rpx;
			width: 240rpx;
			height: 240rpx;
			// background: #ED784B;
			// opacity: 0.15;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				height: 240rpx;
				width: 240rpx;
			}
		}
		.text-1{
			margin-top: 48rpx;
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1F1F1F;
		}
		.text-2{
			margin-top: 16rpx;
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #7A7A7C;
		}
		.btn{
			margin-top: 80rpx;
			width: 688rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
		.btn-1{
			width: 688rpx;
			height: 96rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #0F1F1F;
			}
		}
	}
</style>