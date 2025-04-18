<template>
	<view 
		v-for="(item, index) in props.orderList" :key="index"
	    style="width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;padding:12rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;margin-bottom: 20rpx;">
		<!-- {{props.item}} -->
		<view style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 14rpx;border-bottom: 2rpx solid #EEEEEE;">
			<!-- <view style="display: flex;align-items: center;gap: 20rpx;">
				<text class="text-2">{{item.zt==='1' ? '未收款' : item.zt==='2' ? '已收款' : '已退货'}}</text>
				<text style="margin-right: 10rpx;" class="text-1">下单时间: {{formatTimestamp(item.add_time)}}</text>
			</view>
			<view>
				<image v-if="item.zt==='1' && !selectedItems.includes(item)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="/pagesCustomOrder/static/icon_xuanze_nor@3x.png" @click="selectedProduct(item)" mode="aspectFill"></image>
				<image v-if="item.zt==='1' && selectedItems.includes(item)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="/pagesCustomOrder/static/icon_xuanze_sel@3x.png" @click="selectedProduct(item)" mode="aspectFill"></image>
			</view> -->
			<!-- cztime -->
			<!-- <text style="margin-right: 10rpx;" class="text-1">{{ (item.zt === '3' ? '退货时间: ' + formatTimestamp(item.cztime) : '下单时间: ' + formatTimestamp(item.add_time)) }}</text> -->
			<text style="margin-right: 10rpx;" class="text-1">
			    {{ 
			        (item.zt === '3' 
			            ? '退货时间: ' + formatTimestamp(item.cztime) 
			            : item.zt === '2' 
			                ? '收款时间: ' + formatTimestamp(item.sktime)
			                : '下单时间: ' + formatTimestamp(item.add_time)) 
			    }}
			</text>

			<!-- <text style="margin-right: 10rpx;" class="text-1">下单时间: {{formatTimestamp(item.add_time)}}</text> -->
			<text v-if="item.zt==='1'||item.zt==='2'" class="text-2" >{{item.zt==='1' ? '未收款' : item.zt==='2' ? '已收款' : '已退货'}}</text>
			<text v-else class="text-2" >{{item.czlx==='1' ? '退货上架' : item.czlx==='2' ? '临时下架' : '退出库存'}}</text>
		</view>
		<view v-for="(item1, index1) in item.goodsinfos" :key="index1" style="display: flex;align-items: center;justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
			<van-image width="190rpx" height="190rpx" fit="fill" radius="18rpx" :src="item1.cover" @click="getDetail(item)">
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
					<view style="display: flex; align-items: center; margin-top: 10rpx" @click.stop="instance.proxy.copyText(item1.ch)">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">IMEI：{{item1.ch}}</text>
						<image style="height: 20rpx; width: 20rpx; margin-left: 10rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
				</view>
				<view style="display: flex; justify-content: space-between; align-items: center">
					<view style="display: flex; align-items: center;">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">批发价:</text>
						<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥{{item1.price}}</text>
					</view>
					<!-- <image v-if="item.zt==='1' && !selectedItems.includes(item1)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="/pagesCustomOrder/static/icon_xuanze_nor@3x.png" @click="selectedProduct(item1)" mode="aspectFill"></image>
					<image v-if="item.zt==='1' && selectedItems.includes(item1)" style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="/pagesCustomOrder/static/icon_xuanze_sel@3x.png" @click="selectedProduct(item1)" mode="aspectFill"></image> -->
					<uni-icons v-if="item.zt==='1' && !selectedItems.includes(item1)" color="#D2CFCA" type="circle" size="32" @click="selectedProduct(item1)"></uni-icons>
					<uni-icons v-if="item.zt==='1' && selectedItems.includes(item1)"  color="#E6432E" type="checkbox-filled" size="32" @click="selectedProduct(item1)"></uni-icons>
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
			<text class="text-4">商品数量：{{item.goodsinfos.length}}</text>
			<view style="display: flex; align-items: center;">
				<text class="text-4">合计：</text>
				<text class="text-5">¥{{computeTotalPrice(item)}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js';
import { ref, onMounted, defineProps, defineEmits, nextTick } from 'vue';
const instance = getCurrentInstance();
const props = defineProps({
	orderList: {
		type: Array,
		required: true
	}
});

const emit = defineEmits(['update:selectedItems','goDetail']);

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

const getDetail  = (item) => {
	emit('goDetail',item,'fpak');
};

const cancelAllSelectedProduct = () => {
	selectedItems.value = [];
	emit('update:selectedItems', selectedItems.value);
};

const selectAllProducts = () => {
	console.log('props.orderList：',props.orderList);
	selectedItems.value = []
	props.orderList.forEach(item => {
		item.goodsinfos.forEach(item1 => {
			if (!selectedItems.value.includes(item1)) {
				selectedItems.value.push(item1);
			}
		});
	});
	console.log('selectedItems',selectedItems.value)
	emit('update:selectedItems', selectedItems.value);
};

const computeTotalNum = (item)=>{
	let totalNum = 0;
	item.goodsinfos.forEach(item1=>{
		totalNum +=   parseInt(item1.num);
	})
	return totalNum
}

const computeTotalPrice = (item)=>{
	let totalPrice = 0;
	item.goodsinfos.forEach(item1=>{
		totalPrice += parseInt(item1.price);
	})
	return totalPrice
}

const calculateTotal = () => {
	let totalQuantity = 0;
	let totalAmount = 0;
	console.log('props.orderList:',props.orderList);
	props.orderList.forEach(item => {
		totalQuantity += parseInt(item.num);
		totalAmount += parseInt(item.price);
	});
	console.log('totalQuantity',totalQuantity)
	console.log('totalAmount',totalQuantity)
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
const totalNum = ref()
const totalPrice = ref()
onMounted(() => {
	// console.log('执行全选');
	// selectAllProducts(); // 页面加载时执行全选
	// const {totalNum1,totalPrice1} = calculateTotal()
	// console.log('totalNum1',totalNum1)
	// console.log('totalPrice1',totalPrice1)
	// totalNum.value = totalNum1
	// totalPrice.value = totalPrice1
});
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
