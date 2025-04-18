<template>
	<view class="listingProductPannel-layout">
		<view style="margin-bottom: 60rpx;display: flex; align-items: center; justify-content: space-between;width: 100%;">
			<text class="text-1">商品暂未上架 <text class="text-1" style="color: #FF6600;">请确认</text> </text>
			<image style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>

		<view
			style="
				width: 530rpx;
				background: #ffffff;
				box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 30rpx;
				padding-left: 26rpx;
				padding-right: 26rpx;
				padding-bottom: 30rpx;
			"
		>
			<text class="text-2">{{receivedData.spname}}</text>
			<view style="margin-top: 16rpx; display: flex; justify-content: center; align-items: center;width: 100%;">
				<view
					style="
						margin-right: 10rpx;
						background: linear-gradient(132deg, #D94C24 0%, #FF5221 100%);
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						padding-left: 4rpx;
						padding-right: 4rpx;
					"
				>
					<text class="text-3">{{receivedData.finenessname}}</text>
				</view>

				<text class="text-4">批发价:</text>

				<text class="text-5">￥{{receivedData.price}}</text>
			</view>
		</view>

		<text style="margin-top: 60rpx;margin-bottom: 80rpx;" class="text-6">定价已完成请选择是否上架</text>

		<view @click="confirm"
			class="button-animation"
			style="
				width: 488rpx;
				height: 96rpx;
				background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			"
		>
			<text class="text-7">确认并继续定价</text>
		</view>

		<view @click="$emit('close')"
			class="button-animation"
			style="
				margin-top: 16rpx;
				width: 488rpx;
				height: 96rpx;
				background: linear-gradient(135deg, #ffe0cb 0%, #ffc8a2 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			"
		>
			<text class="text-8">暂不上架</text>
		</view>
		<view @click="continueInput"
			class="button-animation"
			style="
				margin-top: 16rpx;
				width: 488rpx;
				height: 96rpx;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0rpx 0rpx 30rpx 2rpx rgba(0,0,0,0.09);
				border: 2rpx solid #EEEEEE;
			"
		>
			<text class="text-8" style="color: #1F1F1F;opacity: 0.7;font-size: 32rpx;">确认并继续录入</text>
		</view>
	</view>
</template>

<script setup>
import { apiListingProductAdd } from '../../api/api.js';

const props = defineProps({
	receivedData: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['close']);

const confirm = async () => {
	try {
		await apiListingProductAddData();
		
	} catch (error) {
		console.error('Error during confirmation', error);
	}
};

const apiListingProductAddData = async () => {
	const data = {
		// opid: uni.getStorageSync('sessionInfo').opid,
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		id: props.receivedData.zjid,
		price: props.receivedData.price,
		sftj: props.receivedData.sftj,
	};
	const res = await apiListingProductAdd(data);
	if (res.zt === 1) {
		console.log('Listing product success', res);
		uni.showToast({
			title: '上架成功',
			icon: 'success',
			duration: 500,
		});
		uni.$emit('listingProductRefresh')
		emit('close');
	} else {
		console.error('API returned an error', res);
	}
};
const continueInput =async () => {
	const data = {
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		id: props.receivedData.zjid,
		price: props.receivedData.price,
		sftj: props.receivedData.sftj,
	};
	const res = await apiListingProductAdd(data);
	if (res.zt === 1) {
		console.log('Listing product success', res);
		uni.showToast({
			title: '上架成功',
			icon: 'success',
			duration: 500,
		});
		uni.$emit('naviInit')
		uni.$emit('productInputRefresh')
		setTimeout(()=>{
			// uni.navigateTo({
			//   url:'/'+path
			// });
			const path = 'pagesProductInput/productInput/productInput';
			let pages = getCurrentPages();
			let found = false;
			for (let i = 0; i < pages.length; i++) {
			  if (pages[i].route === path) {
			    uni.navigateBack({
			      delta: pages.length - i - 1
			    });
			    found = true;
			    break;
			  }
			}
			if (!found) {
			  uni.navigateTo({
			    url:'/'+path
			  });
			}
			
		},500)
		// uni.$emit('listingProductRefresh')
		// emit('close');
	} else {
		console.error('API returned an error', res);
	}
	
  // let pages = getCurrentPages();
  // let found = false;
  // for (let i = 0; i < pages.length; i++) {
  //   if (pages[i].route === path) {
  //     uni.navigateBack({
  //       delta: pages.length - i - 1
  //     });
  //     found = true;
  //     break;
  //   }
  // }
  // if (!found) {
  //   uni.navigateTo({
  //     url:'/'+path
  //   });
  // }
}

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.listingProductPannel-layout {
	background: #FFFFFF;
	width: 590rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-bottom: 44rpx;
}
.text-1 {
	height: 50rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 36rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-3 {
	height: 32rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 22rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-4 {
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
}
.text-5 {
	height: 48rpx;
	font-family: DIN, DIN;
	font-weight: bold;
	font-size: 40rpx;
	color: #e6432e;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-6 {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.6;
}
.text-7 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-8 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1F1F1F;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
