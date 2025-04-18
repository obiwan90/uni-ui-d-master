<template>
	<view 
		v-for="(item, index) in props.orderList" :key="index"
	    style="width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;padding:12rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;margin-bottom: 20rpx;">
		<!-- {{props.item}} -->
		<view style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 14rpx;border-bottom: 2rpx solid #EEEEEE;">
			<text style="margin-right: 10rpx;" class="text-1">下单时间: {{formatTimestamp(item.add_time)}}</text>
			<text class="text-2">{{item.lx==='2' ? '未收款' : item.lx==='3' ? '已收款' : '已退货'}}</text>
		</view>
		<view v-for="(item1, index1) in item.goodsinfos" :key="index1" style="display: flex;align-items: center;justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
			<van-image width="190rpx" height="190rpx" fit="contain" :src="'https://www.xzxskj.com'+item1.cover">
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
					<image v-if="item.zt==='1' && !selectedItems.includes(item1)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png" @click="selectedProduct(item1)" mode="aspectFill"></image>
					<image v-if="item.zt==='1' && selectedItems.includes(item1)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" @click="selectedProduct(item1)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view style="width: 670rpx; background: #F8F8F8; border-radius: 10rpx 10rpx 10rpx 10rpx; padding:16rpx 0; display: flex; justify-content: space-evenly;">
			<view style="display: flex; align-items: center;">
				<image style="margin-right: 10rpx; height: 24rpx; width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_info@3x.png" mode="aspectFill"></image>
				<text class="text-4">销售：{{item.ygname}}</text>
			</view>
			<view style="width: 2rpx; height: 20rpx; background: #EEEEEE; border-radius: 0rpx 0rpx 0rpx 0rpx;"></view>
			<view style="display: flex; align-items: center;">
				<image style="margin-right: 10rpx; height: 24rpx; width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_info@3x.png" mode="aspectFill"></image>
				<text class="text-4">客户：{{item.khname}}</text>
			</view>
		</view>
		<view style="display: flex; justify-content: space-between; align-items: center; padding-top: 30rpx; padding-bottom: 20rpx;">
			<text class="text-4">商品数量：{{item.num}}</text>
			<view style="display: flex; align-items: center;">
				<text class="text-4">合计：</text>
				<text class="text-5">¥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, nextTick } from 'vue';

const props = defineProps({
	orderList: {
		type: Array,
		required: true
	}
});

const emit = defineEmits(['update:selectedItems']);

const selectedItems = ref([]);

const selectedProduct = (item) => {
	const index = selectedItems.value.indexOf(item);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item);
	}
	emit('update:selectedItems', selectedItems.value);
};

const cancelAllSelectedProduct = () => {
	selectedItems.value = [];
	emit('update:selectedItems', selectedItems.value);
};

const selectAllProducts = () => {
	console.log('props.orderList：',props.orderList);
	props.orderList.forEach(item => {
		item.goodsinfos.forEach(item1 => {
			if (!selectedItems.value.includes(item1)) {
				selectedItems.value.push(item1);
			}
		});
	});
	emit('update:selectedItems', selectedItems.value);
};

const calculateTotal = () => {
	let totalQuantity = 0;
	let totalAmount = 0;
	props.orderList.forEach(item => {
		totalQuantity += parseInt(item.num);
		totalAmount += parseInt(item.price);
	});
	return {
		totalQuantity,
		totalAmount
	};
};


defineExpose({
	selectAllProducts,
	cancelAllSelectedProduct,
	calculateTotal
});

onMounted(() => {
	console.log('执行全选');
	selectAllProducts(); // 页面加载时执行全选
});

function formatTimestamp(timestamp) {
	const date = new Date(timestamp * 1000);
	// 获取各个时间部分
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);
	// 组装成指定格式
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 26rpx;
	color: #1F1F1F;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 26rpx;
	color: #E6432E;
	text-align: right;
	font-style: normal;
	text-transform: none;
}
.text-3 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 22rpx;
	color: #828282;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-4 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1F1F1F;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-5 {
	font-family: DIN, DIN;
	font-weight: bold;
	font-size: 32rpx;
	color: #E6432E;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
</style>
