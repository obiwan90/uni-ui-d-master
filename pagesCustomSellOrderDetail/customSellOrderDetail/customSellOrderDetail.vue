<template>
	<view class="customSellOrderDetail-layout" v-if="orderInfo">
		<custom-header>
			<template #name></template>
			<template #fill></template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
		<!-- `zt` int(255) NOT NULL COMMENT '状态  1未支付2已支付3待发货4待收货5已收货6售后中7交易成功', -->
		<text v-if="orderInfo.zt==='1'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">等待买家付款</text>
		<text v-if="orderInfo.zt==='3'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">等待发货</text>
		<text v-if="orderInfo.zt==='4'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">已发货</text>
		<text v-if="orderInfo.zt==='5'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">已收货</text>
		<text v-if="orderInfo.zt==='7'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">已完成</text>
		
		<view @click="handleBtnClick" v-if="orderInfo.zt==='4'||orderInfo.zt==='5'||orderInfo.zt==='7'" style="margin: 30rpx 0;width: 174rpx;height: 60rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;justify-content: center;align-items: center;gap: 4rpx;">
			<image style="height: 32rpx;width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_wuliu@3x.png" mode="aspectFill"></image>
			<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">查看物流</text>
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
				v-for="(item, index) in orderInfo.gwclist"
				:key="index">
				<van-image width="190rpx" height="190rpx" fit="fill" radius="18rpx" :src="item.gooinfos.cover">
					<template v-slot:error>加载失败</template>
					<van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
						
				<view style="display: flex; width: 500rpx; margin-left: 20rpx; flex-direction: column; justify-content: space-between; height: 190rpx">
					<view>
						<view style="display: inline-block; align-items: center; flex-wrap: wrap">
							<view v-if="item.gooinfos.finenessname"
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
								<text class="text" style="font-size: 22rpx; color: #ffffff;">{{item.gooinfos.finenessname}}</text>
							</view>
							<text class="text" style="font-size: 28rpx; color: #1f1f1f;">{{item.gooinfos.name}}</text>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282; margin-right: 10rpx;">IMEI：{{item.gooinfos.ch}}</text>
							<image style="height: 20rpx; width: 20rpx; opacity: 0.5" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282;">采购：{{item.gooinfos.cgyname}}</text>
							<text class="text" style="font-size: 22rpx; color: #828282; margin-left: 40rpx;">仓库：{{item.gooinfos.shopname}}</text>
						</view>
					</view>
						
					<view style="display: flex; align-items: center; justify-content: space-between">
						<view style="display: flex; align-items: center">
							<text class="text" style="font-size: 22rpx; color: #1f1f1f;">批发价：</text>
							<text class="text" style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e;">￥{{item.gooinfos.price}}</text>
						</view>
						<!-- <view v-if="orderInfo.zt==='1'" style="display: flex; align-items: center; justify-content: flex-end">
							<image
								v-if="selectedItems.includes(item.gooinfos.ch)"
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
						</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view style="margin-top: 20rpx;width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 24rpx;display: flex;flex-direction: column;gap: 22rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">商品金额</text>
				<text class="text" style="font-family: DIN, DIN;font-weight: 400;font-size: 30rpx;">¥{{orderInfo.price}}</text>
			</view>
			
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;justify-content: center;align-items: center;gap: 16rpx;">
					<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">运费</text>
					<image style="margin-left: 16rpx;height: 24rpx;width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_tishi@3x.png" mode="aspectFill"></image>
				</view>
				<text class="text" style="font-family: DIN, DIN;font-weight: 400;font-size: 30rpx;">¥{{orderInfo.zyf}}</text>
			</view>
			
			<view style="width: 662rpx;height: 2rpx;background: #EEEEEE;border-radius: 0rpx 0rpx 0rpx 0rpx;margin:26rpx 0;"/>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">商品数量：{{orderInfo.num}}</text>
				<view style="display: flex;justify-content: center;align-items: center;gap: 10rpx;">
					<text class="text" style="font-weight: 400;font-size: 32rpx;color: #1F1F1F;">合计：</text>
					<text class="text" style="font-family: DIN, DIN;font-weight: bold;font-size: 32rpx;color: #E6432E;">¥{{orderInfo.price}}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 收货地址 -->
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;;margin-top: 20rpx;display: flex;justify-content: space-between;padding: 24rpx;">
			
			<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;width: 20%;">收货地址</text>
			<view style="display: flex;flex-direction: column;align-items: flex-end;gap: 15rpx;">
				
				<view style="display: flex;flex-direction: column;align-items: flex-end;">
					<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">{{addressInfos.province}} {{addressInfos.city}} {{addressInfos.area}}</text>
					<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">{{addressInfos.address}}</text>
				</view>
				
				<!-- <text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">{{addressInfos.province}} {{addressInfos.city}} {{addressInfos.area}} {{addressInfos.address}}</text> -->
				<text class="text" style="font-weight: 400;font-size: 24rpx;color: #1F1F1F;">{{addressInfos.name}} {{addressInfos.phone}}</text>
			</view>
		</view>
		
		
		
		<!-- 备注信息 -->
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;;margin-top: 20rpx;display: flex;justify-content: space-between;padding: 24rpx;">
			<text class="text" style="width: 30%;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">备注信息</text>
			<view style="flex: 1;display: flex;flex-direction: column;align-items: flex-end;gap: 15rpx;">
				<text class="text" style="font-weight: 400;font-size: 24rpx;color: #1F1F1F;">{{orderInfo.remarks}}</text>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order-info" v-if="orderInfo">
			<view class="list" v-for="(item, index) in getFilteredOrderInfo(orderInfo.zt)" :key="index">
				<view class="left">
					<text>{{ item.name }}</text>
				</view>
				<view class="right">
					<text>{{ item.value }}</text>
					<image v-if="item.image" :src="item.image" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<!-- <view  v-if="orderInfo.zt==='2'||orderInfo.zt==='1'" style="height: 200rpx;"/>
		<view  v-if="orderInfo.zt==='2'||orderInfo.zt==='1'" class="btn-bottom">
			<view v-if="orderInfo.zt==='1'" style="width: 232rpx;height: 96rpx;background: #F2F3F6;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-size: 32rpx; color: #1F1F1F;">先货后款</text>
			</view>
			
			<view v-if="orderInfo.zt==='1'" style="width: 444rpx;height: 96rpx;background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-size: 32rpx; color: #FFFFFF;">线下收款</text>
			</view>
			
			<view v-if="orderInfo.zt==='2'" style="width: 710rpx;height: 96rpx;background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-weight: 400;font-size: 32rpx;color: #FFFFFF;">确认发货</text>
			</view>
		</view> -->
		</scroll-view>
	</view>
</template>

<script setup>
import { apiGetOrderDetail } from '../api/api.js'
import { formatTimestamp } from '@/utils/common.js';
const orderInfo = ref();
const addressInfos = ref()
const selectedItems = ref([]);
const totalPrice = ref(0);
const payment = ref('1')
const zyf = ref('0')
const selectedTap = ref(0);
const updateTotalPrice = () => {
	totalPrice.value = selectedItems.value.reduce((acc, ch) => {
		const selectedItem = orderInfo.value.goodsinfos.find(good => good.ch === ch);
		return acc + parseFloat(selectedItem.price);
	}, 0);
};

const selected = (item) => {
	const index = selectedItems.value.indexOf(item.goodsinfos.ch);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item.goodsinfos.ch);
	}
	updateTotalPrice();
};
const express = ref([
	{image:'https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png',value:'顺丰',expressId:'2'},
	{image:'https://www.xzxskj.com/xcximg/icon_jingdong@3x.png',value:'京东',expressId:'1'},
	{image:'https://www.xzxskj.com/xcximg/icon_songhuo@3x.png',value:'送货上门',expressId:'3'},
	{image:'https://www.xzxskj.com/xcximg/icon_ziti@3x.png',value:'自提',expressId:'4'},
])
// `zt` int(255) NOT NULL COMMENT '状态  1未支付2已支付3待发货4待收货5已收货6售后中7交易成功',
const order_info = ref([
	{ name: '订单号', value: 'NO.202303281234', image: '', zt: ['1','2','3','4','5','7'] },
	{ name: '下单时间', value: '京东 1234567', image: '',  zt: ['1','2','3','4','5','7']  },
	{ name: '付款时间', value: '2024-03-12 15:00:00', image: '',  zt: ['2','3','4','5','7']  },
	{ name: '发货时间', value: '2024-03-12 15:00:00', image: '',  zt: ['3','4','5','7']  },
	{ name: '发货方式', value: '2024-03-12 15:00:00', image: '',  zt: ['3','4','5','7']  },
	{ name: '收货时间', value: '2024-03-12 15:00:00', image: '',  zt: ['5','7']  },
]);
const getFilteredOrderInfo = (zt) => {
	return order_info.value.filter((item) => item.zt.includes(zt));
};

const handleBtnClick = () => {
	uni.navigateTo({
		url: 'plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息'
	});
};


const apiGetOrderDetailAc = async(id)=>{
	const param = {
		lx: '4', // 用户详情
		id: id
	}
	
	const res = await apiGetOrderDetail(param)
	console.log('res',res)
	if (res.code === '200') {
		orderInfo.value = res.infos;
		addressInfos.value = res.infos.addinfos;
		selectedTap.value = express.value.findIndex(item => {
			return item.expressId == res.infos.expressid;
		});
		if (res.infos.zyf) {
			zyf.value = res.infos.zyf;
		}
	}
	
	order_info.value = [
		{
			name: '订单号',
			value: orderInfo.value.ordernumber || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['1', '3', '4', '5', '7']
		},
		{
			name: '下单时间',
			value: formatTimestamp(res.infos.add_time) || ' ', // 处理空值
			image: '',
			zt: ['1', '3', '4', '5', '7']
		},
		{
			name: '付款时间',
			value: formatTimestamp(res.infos.pay_time) || ' ', // 处理空值
			image: '',
			zt: ['3', '4', '5', '7']
		},
		{
			name: '发货时间',
			value: formatTimestamp(res.infos.fhsj) || ' ', // 处理空值
			image: '',
			zt: ['4', '5', '7']
		},
		{
			name: '收货方式',
			value: express.value.find(item => item.expressId == res.infos.expressid)?.value || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['4', '5', '7']
		},
		{
			name: '收货时间',
			value: formatTimestamp(res.infos.shsj) || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['5', '7']
		},
	];
	
}
onLoad((options)=>{
	if(options.orderId){
		apiGetOrderDetailAc(options.orderId)
	}
})
// onMounted(() => {
// 	const itemString = uni.getStorageSync('orderDetailItem');
// 	if (itemString) {
// 		const item = JSON.parse(itemString);
// 		orderInfo.value = item;
// 		order_info.value[0].value = 'NO.' + orderInfo.value.ordernumber;
// 		order_info.value[1].value = '';
// 		order_info.value[2].value = orderInfo.value.ygname;
// 		order_info.value[3].value = formatTimestamp(orderInfo.value.add_time);
// 		order_info.value[4].value = orderInfo.value.remark;
// 		order_info.value[5].value = '';
// 		//todo
// 		//客户id
// 		const khid = orderInfo.value.khid;
// 		//todo 通过khid 获取客户信息
// 		//getAddressDetail(orderInfo.value.addressid);
// 	}
// });
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.customSellOrderDetail-layout{
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
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-bottom: 60rpx;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}
.order-info {
  margin-top: 20rpx;
  width: 710rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  padding: 24rpx;
  box-sizing: border-box;
}

.order-info .list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info .list .left text {
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  line-height: 64rpx;
}

.order-info .list .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.order-info .list .right text {
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: right;
}

.order-info .list .right image {
  margin-left: 10rpx;
  height: 20rpx;
  width: 20rpx;
}
</style>
