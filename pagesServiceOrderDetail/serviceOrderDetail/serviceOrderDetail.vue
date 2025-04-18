<template>
	<view class="serviceOrderDetail-layout" v-if="orderInfo">
		<custom-header>
			<template #name></template>
			<template #fill></template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
		<!-- `zt` varchar(255) NOT NULL COMMENT '1售后中2售后成功3售后失败', -->
		<!-- `shlx` varchar(255) NOT NULL COMMENT '1.申请补差2退货退款3申请换机4售后维修 5 退款', -->
		<text v-if="orderInfo.zt==='1'&&orderInfo.shlx==='5'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">申请退款</text>
		<text v-if="orderInfo.zt==='1'&&orderInfo.shlx==='1'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">申请补差</text>
		<text v-if="orderInfo.zt==='1'&&orderInfo.shlx==='2'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">退货退款</text>
		<text v-if="orderInfo.zt==='1'&&orderInfo.shlx==='3'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">申请换机</text>
		<text v-if="orderInfo.zt==='1'&&orderInfo.shlx==='4'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后维修</text>
		
		<text v-if="orderInfo.zt==='2'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后成功</text>
		<text v-if="orderInfo.zt==='3'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后失败</text>
		
		<view @click="handleBtnClick" v-if="orderInfo.zt==='3'" style="margin: 30rpx 0;width: 174rpx;height: 60rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;justify-content: center;align-items: center;gap: 4rpx;">
			<image style="height: 32rpx;width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_wuliu@3x.png" mode="aspectFill"></image>
			<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">平台介入</text>
		</view>
		
		<view style="
			width: 710rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 24rpx;
			padding-right: 24rpx;
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;">
			<!-- product-card -->
			<view
				style="display: flex; margin-top: 20rpx; border-bottom: 2rpx solid #eeeeee; justify-content: space-between; padding-bottom: 20rpx; align-items: center"
				v-for="(item, index) in orderInfo.goodsinfos"
				:key="index">
				<van-image width="190rpx" height="190rpx" fit="contain" radius="18rpx" :src="'https://www.xzxskj.com'+item.cover">
					<template v-slot:error>加载失败</template>
					<van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
						
				<view style="display: flex; width: 500rpx; margin-left: 20rpx; flex-direction: column; justify-content: space-between; height: 190rpx">
					<view>
						<view style="display: inline-block; align-items: center; flex-wrap: wrap">
							<view v-if="item.finenessname"
								style="
									float: left;
									padding: 0 8rpx;
									background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
									border-radius: 8rpx;
									display: flex;
									align-items: center;
									height: 32rpx;
									margin-right: 10rpx;
								"
							>
								<text class="text" style="font-size: 22rpx; color: #ffffff;">{{item.finenessname}}</text>
							</view>
							<text class="text" style="font-size: 28rpx; color: #1f1f1f;">{{item.name}}</text>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282; margin-right: 10rpx;">IMEI：{{item.ch}}</text>
							<image style="height: 20rpx; width: 20rpx; opacity: 0.5" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282;">采购：{{item.cgyname}}</text>
							<text class="text" style="font-size: 22rpx; color: #828282; margin-left: 40rpx;">仓库：{{item.shopname}}</text>
						</view>
					</view>
						
					<view style="display: flex; align-items: center; justify-content: space-between">
						<view style="display: flex; align-items: center">
							<text class="text" style="font-size: 22rpx; color: #1f1f1f;">批发价：</text>
							<text class="text" style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e;">￥{{item.price}}</text>
						</view>
						<view style="display: flex; align-items: center; justify-content: flex-end">
							<image
								v-if="selectedItems.includes(item.ch)"
								style="height: 32rpx; width: 32rpx; border-radius: 50%"
								src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png"
								mode="aspectFill"
								@click="selected(item)"
							></image>
							<image
								v-else
								style="height: 32rpx; width: 32rpx; border-radius: 50%"
								src="https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png"
								mode="aspectFill"
								@click="selected(item)"
							></image>
						</view>
					</view>
				</view>
			</view>
				
			<!-- 退款金额 -->
			<view style="width: 710rpx;height: 100rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 24rpx;display: flex;justify-content: space-between;align-items: center;">
				<text class="text" style="font-size: 32rpx; color: #1F1F1F;">退款金额</text>
				<view style="display: flex;justify-content: center;align-items: center;">
					<text class="text" style="font-weight: bold; font-size: 32rpx; color: #1F1F1F;">¥ 2565.08</text>
					<image style="height: 28rpx;width: 28rpx;margin-left: 20rpx;" src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 售后原因 -->
			<view style="width: 710rpx;height: 376rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 24rpx;">
				<text class="text" style="font-weight: bold; font-size: 28rpx; color: #1F1F1F;">申请原因</text>
				<text class="text" style="margin-top: 24rpx; font-size: 28rpx; color: #1F1F1F;">{{item.shyy}}</text>
				<view style="margin-top: 24rpx;display: flex;align-items: center;gap: 20rpx;">
					<image style="height: 144rpx;width: 144rpx;border-radius: 18rpx;border: 1rpx solid red;" src="" mode="aspectFill"></image>
					<image style="height: 144rpx;width: 144rpx;border-radius: 18rpx;border: 1rpx solid red;" src="" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 售后信息 -->
			<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 24rpx;gap: 15rpx;">
				<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<text class="text" style="font-size: 28rpx; color: #1F1F1F;">售后订单</text>
					<view style="display: flex;justify-content: center;align-items: center;gap: 10rpx;">
						<text class="text" style="font-size: 28rpx; color: #1F1F1F;">NO.{{item.ordernumber}}</text>
						<image src="" style="height: 20rpx;width: 20rpx;border: 1rpx solid red;" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view  v-if="orderInfo.zt==='1'&&orderInfo.shlx==='2'" style="height: 200rpx;"/>
		<view  v-if="orderInfo.zt==='1'&&orderInfo.shlx==='2'" class="btn-bottom">
			<view  v-if="orderInfo.zt!=='3'" style="width: 232rpx;height: 96rpx;background: #F2F3F6;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-size: 32rpx; color: #1F1F1F;">驳回售后</text>
			</view>
			
			<view v-if="orderInfo.zt!=='3'" style="width: 444rpx;height: 96rpx;background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-size: 32rpx; color: #FFFFFF;">{{getTextByShlxAndDelivery('1',false)}}</text>
			</view>
			
			<view v-if="orderInfo.zt==='3'" style="width: 710rpx;height: 96rpx;background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-weight: 400;font-size: 32rpx;color: #FFFFFF;">同意售后</text>
			</view>
		</view> -->
		</scroll-view>
	</view>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js';
const order_info = ref([
	{ name: '订单号', value: 'NO.202303281234', image: '', zt: ['1','2','3'] },
	{ name: '申请时间', value: '京东 1234567', image: '',  zt: ['1','2','3']  },
	
	{ name: '售后类型', value: '京东 1234567', image: '',  zt: ['2']  },
	{ name: '售后完成', value: '京东 1234567', image: '',  zt: ['2']  },
	
	{ name: '销售订单', value: '金克斯', image: '',  zt: ['1','2','3']  },
	{ name: '下单时间', value: '2024-03-12 15:00:00', image: '',  zt: ['1','2','3']  },
	{ name: '付款时间', value: '2024-03-12 15:00:00', image: '',  zt: ['1','2','3']  },
	{ name: '收货时间', value: '2024-03-12 15:00:00', image: '',  zt: ['1','2','3']  },
	{ name: '下单备注', value: '该商户已用支付宝收款了，线下收款已到账', image: '', zt: ['1','2','3']  },
]);
const getFilteredOrderInfo = (zt) => {
	return order_info.value.filter((item) => item.zt.includes(zt));
};
const btn_text =  ref([
	{text:'同意退款',shlx:'5',isDelivery:false},
	{text:'同意补差',shlx:'1',isDelivery:false},
	{text:'同意售后',shlx:'4,5',isDelivery:false},
	{text:'已收到退货，同意退款',shlx:'5',isDelivery:true},
	{text:'已收货，售后完成',shlx:'4',isDelivery:true},
]);
const getTextByShlxAndDelivery = (shlx, isDelivery) => {
	const result = btn_text.value.find(item => {
		const shlxArray = item.shlx.split(',');
		return shlxArray.includes(String(shlx)) && item.isDelivery === isDelivery;
	});
	return result ? result.text : '';
};

const handleBtnClick = () => {
	uni.navigateTo({
		url: 'plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息'
	});
};

onMounted(() => {
	const itemString = uni.getStorageSync('orderDetailItem');
	if (itemString) {
		const item = JSON.parse(itemString);
		orderInfo.value = item;
		// order_info.value[0].value = 'NO.' + orderInfo.value.ordernumber;
		// order_info.value[1].value = '';
		// order_info.value[2].value = orderInfo.value.ygname;
		// order_info.value[3].value = formatTimestamp(orderInfo.value.add_time);
		// order_info.value[4].value = orderInfo.value.remark;
		// order_info.value[5].value = '';
		//todo
		//客户id
		const khid = orderInfo.value.khid;
		//todo 通过khid 获取客户信息
		//getAddressDetail(orderInfo.value.addressid);
	}
});
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.serviceOrderDetail-layout{
	min-height: 100vh;
	background: #f3f2f6;
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.text {
	font-family: PingFang SC, PingFang SC;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.btn-bottom{
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
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
}
</style>
