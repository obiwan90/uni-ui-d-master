<template>
	<view
		
		v-for="(item, index) in props.orderList" :key="index"
	    style="width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;padding:12rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;margin-bottom: 20rpx;box-sizing: border-box;">
		<!-- {{props.item}} -->
		<view  style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 14rpx;border-bottom: 2rpx solid #EEEEEE;">
			<!-- <text style="margin-right: 10rpx;" class="text-1">下单时间: {{formatTimestamp(item.add_time)}}</text> -->
			<text style="margin-right: 10rpx;" class="text-1">订单号: {{item.ordernumber}}</text>
			<text class="text-2">{{item.zt==='1' ? '售后中' : item.zt==='2' ? '售后成功' : '售后失败'}}</text>
		</view>
		<view @click="getDetail(item)" v-for="(item1, index1) in item.goodsinfos" :key="index1" style="display: flex;align-items: center;justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
			<van-image width="190rpx" height="190rpx" fit="fill" radius="18rpx" :src="item1.cover" >
			  <template v-slot:error>加载失败</template>
			  <van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
			
			<view style="flex: 1; margin-left: 20rpx; height: 190rpx; display: flex; flex-direction: column; justify-content: space-between;">
				<view style="display: flex; flex-direction: column; width: 100%;">
					<view>
						<van-tag v-if="item1.finenessname" size="mini" color="linear-gradient(132deg, #D94C24 0%, #FF5221 100%)">{{item1.finenessname}}</van-tag>	
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; line-height: 40rpx;">
							{{item1.name}}
						</text>
					</view>
					<view style="display: flex; align-items: center; margin-top: 10rpx">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">IMEI：{{item1.ch}}</text>
						<image style="height: 20rpx; width: 20rpx; margin-left: 10rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
				</view>
				<view style="display: flex; justify-content: space-between; align-items: center">
					<view style="display: flex; align-items: center;">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">批发价:</text>
						<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥{{item1.price}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view style="display: flex; justify-content: space-between; align-items: center; padding-top: 30rpx; padding-bottom: 20rpx;">
			<text class="text-4">商品数量：{{item.num}}</text>
			<view style="display: flex; align-items: center;">
				<text class="text-4">合计：</text>
				<text class="text-5">¥{{item.price}}</text>
			</view>
		</view> -->
	</view>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js';
const props = defineProps({
	orderList: {
		type: Array,
		required: true
	}
});
const emit = defineEmits(['goDetail']);
const getDetail  = (item) => {
	emit('goDetail',item,'sh');
};
</script>

<style lang="scss" scoped>
</style>