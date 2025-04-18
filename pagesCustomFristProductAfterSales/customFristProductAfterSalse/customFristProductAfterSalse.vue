<template>
	<view class="customSellOrderDetail-layout" v-if="orderInfo">
		<!-- header -->
		<custom-header>
			<template #name></template>
			<template #fill></template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
			<text v-if="orderInfo.zt==='1'" class="text-10">先货后款-待收款</text>
			<text v-if="orderInfo.zt==='2'" class="text-10">先货后款-已收款</text>
			<text v-if="orderInfo.zt==='3'" class="text-10">先货后款-已退货</text>
			
			<!--product card -->
			<view
				style="
					width: 710rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					display: flex;
					flex-direction: column;
					margin-top: 30rpx;">
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
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #ffffff; text-align: center">{{item.gooinfos.finenessname}}</text>
								</view>
								<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: left; vertical-align: top">
									{{item.gooinfos.name}}
								</text>
							</view>
			
							<view style="display: flex; align-items: center;margin-top: 4rpx;">
								<text style="height: 32rpx;;font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-right: 10rpx">
									IMEI：{{item.gooinfos.ch}}
								</text>
								<image style="height: 20rpx; width: 20rpx; opacity: 0.5" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
							</view>
			
							<view style="display: flex; align-items: center;margin-top: 4rpx;">
								<text style="height: 32rpx;;font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">采购：{{item.gooinfos.cgyname}}</text>
								<text style="height: 32rpx;;font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-left: 40rpx">
									仓库：{{item.gooinfos.shopname}}
								</text>
							</view>
						</view>
			
						<view style="display: flex; align-items: center; justify-content: space-between">
							<view style="display: flex; align-items: center">
								<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left">批发价：</text>
								<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left">￥{{item.gooinfos.price}}</text>
							</view>
							<!-- <view style="display: flex; align-items: center; justify-content: flex-end">
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
							</view> -->
						</view>
					</view>
				</view>
			
				<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20rpx;margin-top: 20rpx;">
					<text class="text-11">商品数量：{{orderInfo.num}}</text>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<text class="text-11">合计</text>
						<text class="text-12">￥{{orderInfo.price}}</text>
					</view>
				</view>
			</view>
			
			<!-- 客户信息 -->
			<view v-if="orderInfo.khinfos" style="margin-top: 20rpx;width: 710rpx;
					background: #FFFFFF;
					border-radius: 20rpx 20rpx 20rpx 20rpx;;display: flex;justify-content: space-between;padding: 24rpx;">
				<text class="text-13" style="">客户信息</text>
				<view style="flex: 1;display: flex;flex-direction: column;align-items: flex-end;">
					<text style="" class="text-14">{{orderInfo.khinfos.mdmc}}</text>
					<text style="margin-top: 10rpx;" class="text-14">{{orderInfo.khinfos.mddz}}</text>
					<view style="margin-top: 20rpx;display: flex;justify-content: center;align-items: center;">
						<text class="text-14" style="margin-right: 20rpx;">{{orderInfo.khname}}  {{orderInfo.khinfos.phone}}</text>
						<image style="height: 32rpx;width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_tel@3x.png" mode="aspectFill" @click="cellPhone(orderInfo.khinfos.phone)"></image>
					</view>
				</view>
			</view>
			
			<!-- 收款信息 -->
			<view v-if="orderInfo.zt==='2'" style="margin-top: 20rpx;display: flex;flex-direction: column;padding:24rpx;width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;">
				<text class="text-13">收款信息</text>
				
				<view style="margin-top: 15rpx;width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<text class="text-8">收款类型</text>
					<text class="text-8">下线收款</text>
					<!-- <text class="text-8">下线收款</text> -->
				</view>
				<view style="margin-top: 15rpx;width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<text class="text-8">收款员工</text>
					<text class="text-8">{{orderInfo.skyg}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<text class="text-8">收款时间</text>
					<text class="text-8">{{formatTimestamp(orderInfo.sktime)}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<text class="text-8">收款方式</text>
					<text class="text-8">{{express.find(item => item.expressId == orderInfo.expressid)?.value || ' '}}</text>
				</view>
				
				<view style="margin: 22rpx 0;width: 670rpx;height: 2rpx;background: #EEEEEE;border-radius: 20rpx 20rpx 20rpx 20rpx;"/>
				
				<text class="text-13">备注和凭证</text>
				<text class="text-8">{{orderInfo.remarks}}</text>
				
				<view style="margin-top: 24rpx;display: flex;align-items: center;gap: 20rpx;" v-if="orderInfo.imgs" v-for="(item3,index3) in orderInfo.imgs.split(',')" :key="index3">
					<image style="height: 144rpx;width: 144rpx;border-radius: 18rpx;" :src="item3" mode="aspectFill"></image>
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
		
		</scroll-view>
	</view>
	<!-- 先货后款btn（未收款） -->
	<!-- <view v-if="orderInfo.zt==='1'" style="height: 202rpx" />
	<view v-if="orderInfo.zt==='1'" class="bottom-btn">
		<view class="top" style="width: 100%;">
			<view class="left">
				<view class="text-1">
					<text class="text-class-1">数量:</text>
					<text class="text-class-2">{{selectedItems.length}}</text>
					<text class="text-class-1">台</text>
				</view>
				
				<view class="text-1">
					<text class="text-class-1">合计:</text>
					<text class="text-class-2">￥{{totalPrice}}</text>
				</view>
			</view>
			<view class="right" @click="allSelected">
				<view>
					<image v-if="isFpakAllSelected" style="height: 32rpx; width: 32rpx;border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
					<view v-else class="circular" style="width: 32rpx;
					height: 32rpx;
					border-radius: 18rpx;
					border: 2rpx solid #D2CFCA;"/>
				</view>
				<text>全选</text>
			</view>
		</view>
		
		<view class="content">
			<view class="left-btn">
				<uni-data-select
					class="select"
				    v-model="returnProductSelectValue"
				    :localdata="returnProductRange"
					placement="top"
				    @change="returnProductChange"
					:clear="false"
				>
				</uni-data-select>
			</view>
			<view class="right-btn" @click="openOfflinePayment">
				<text class="text-9">线下收款</text>
			</view>
		</view>
	</view> -->
</template>

<script setup>
import { apiGetFpbkOrderDetail,apiGetOrderDetail } from '../api/api.js'
import { formatTimestamp } from '@/utils/common.js';
import { apigetAddressDetail } from '@/api/address/address.js';
const addressInfos = ref();
const orderInfo = ref();
const selectedItems = ref([]);
const totalPrice = ref(0);
const order_info  = ref()
const getAddressDetail = async (id) => {
	const param = { id: id };
	const res = await apigetAddressDetail(param);
	addressInfos.value = res.info;
	console.log(res);
};

const getFilteredOrderInfo = (zt) => {
	return order_info.value.filter((item) => item.zt.includes(zt));
};

// const order_info = ref([
// 	{ name: '订单号', value: 'NO.202303281234', image: '', zt: ['1','2','3'] },
// 	{ name: '配送方式', value: '京东 1234567', image: '',  zt: ['1','2']  },
// 	{ name: '销售员工', value: '金克斯', image: '',  zt: ['1','2','3']  },
// 	{ name: '退货方式', value: '2024-03-12 15:00:00', image: '', zt: ['3'] },
// 	{ name: '退货时间', value: '2024-03-12 15:00:00', image: '', zt: ['3'] },
// 	{ name: '下单时间', value: '2024-03-12 15:00:00', image: '',  zt: ['1','2','3']  },
// 	{ name: '下单备注', value: '该商户已用支付宝收款了，线下收款已到账', image: '', zt: ['1','2','3'] },
// ]);
// const sk_info = ref([
// 	{ name: '收款类型', value: 'NO.202303281234', image: '' },
// 	{ name: '收款员工', value: 'NO.202303281234', image: '' },
// 	{ name: '收款时间', value: 'NO.202303281234', image: '' },
// 	{ name: '收款方式', value: 'NO.202303281234', image: '' },
// ])
const cellPhone = (phone)=>{
	uni.makePhoneCall({
		phoneNumber: phone
	});
}

const isFpakAllSelected = ref(false);

const updateTotalPrice = () => {
	totalPrice.value = selectedItems.value.reduce((acc, item) => {
		const selectedItem = orderInfo.value.goodsinfos.find(good => good.ch === item);
		return acc + parseFloat(selectedItem.price);
	}, 0);
};

const allSelected = () => {
	if (isFpakAllSelected.value) {
		selectedItems.value = [];
	} else {
		selectedItems.value = orderInfo.value.goodsinfos.map(item => item.ch);
	}
	isFpakAllSelected.value = !isFpakAllSelected.value;
	updateTotalPrice();
};

const selected = (item) => {
	const index = selectedItems.value.indexOf(item.ch);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item.ch);
	}
	isFpakAllSelected.value = selectedItems.value.length === orderInfo.value.goodsinfos.length;
	updateTotalPrice();
};
const express = ref([
	{image:'https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png',value:'顺丰',expressId:'2'},
	{image:'https://www.xzxskj.com/xcximg/icon_jingdong@3x.png',value:'京东',expressId:'1'},
	{image:'https://www.xzxskj.com/xcximg/icon_songhuo@3x.png',value:'送货上门',expressId:'3'},
	{image:'https://www.xzxskj.com/xcximg/icon_ziti@3x.png',value:'自提',expressId:'4'},
])
const selectedTap = ref(0);
const apiGetFpbkOrderDetailAc =async (id)=>{
	const param = {
		id:id,
		lx:'6'
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
			zt: ['1','2','3']
		},
		// {
		// 	name: '配送方式',
		// 	value: express.value.find(item => item.expressId == res.infos.expressid)?.value || ' ', // 处理空值
		// 	image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
		// 	zt: ['1','2']
		// },
	 {
			name: '销售员工',
			value: res.infos.ygname || ' ', // 处理空值
			image: '',
			zt: ['1','2','3']
		},
	 // {
		// 	name: '退货方式',
		// 	value: formatTimestamp(res.infos.ygname) || ' ', // 处理空值
		// 	image: '',
		// 	zt: ['3']
		// },
	 {
			name: '退货时间',
			value: formatTimestamp(res.infos.thsj) || ' ', // 处理空值
			image: '',
			zt: ['3']
		},
		{
			name: '下单时间',
			value: formatTimestamp(res.infos.add_time) || ' ', // 处理空值
			image: '',
			zt: ['1','2','3']
		},
		{
			name: '下单备注',
			value: res.infos.remarks || ' ', // 处理空值
			image: '',
			zt: ['1','2','3']
		},
	];
	
}

// onMounted(async() => {
// 	const itemString = uni.getStorageSync('orderDetailItem');
// 	if (itemString) {
// 		const item = JSON.parse(itemString);
// 		console.log('item',item)
// 		orderInfo.value = item;
// 		order_info.value[0].value = 'NO.' + orderInfo.value.ordernumber;
// 		order_info.value[1].value = '';
// 		order_info.value[2].value = orderInfo.value.ygname;
// 		order_info.value[3].value = formatTimestamp(orderInfo.value.add_time);
// 		order_info.value[4].value = orderInfo.value.remark;
// 		order_info.value[5].value = formatTimestamp(orderInfo.value.add_time);
// 		//客户id
// 		const khid = orderInfo.value.khid;
// 		//todo 通过khid 获取客户信息
// 		//getAddressDetail(orderInfo.value.addressid);
// 		await apiGetFpbkOrderDetailAc(item.id)
// 	}
	
// });

const returnProductSelectValue = ref(0);
const returnProductRange = ref([
	{ value: 0, text: "退货上架" },
	{ value: 1, text: "退货下架" },
	{ value: 2, text: "退出仓库" },
]);

const returnProductChange = (e) => {
	console.log('returnProductSelectValue:', e);
};

const openOfflinePayment = () => {
	// 处理线下收款逻辑
};

onLoad((options)=>{
	if(options.orderId){
		apiGetFpbkOrderDetailAc(options.orderId)
	}
})
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.customSellOrderDetail-layout {
  min-height: 100vh;
  background: #f3f2f6;
  box-sizing: border-box;
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.title text {
  font-family: PingFang SC, PingFang SC;
  font-weight: 800;
  font-size: 44rpx;
  color: #1f1f1f;
  text-align: left;
}

.text-8 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.text-9 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.text-10 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 800;
  font-size: 44rpx;
  color: #1f1f1f;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.text-11 {
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: left;
  font-style: normal;
  text-transform: none;
  vertical-align: bottom;
}

.text-12 {
  height: 38rpx;
  font-family: DIN, DIN;
  font-weight: bold;
  font-size: 32rpx;
  color: #e6432e;
  text-align: left;
  font-style: normal;
  text-transform: none;
  vertical-align: bottom;
}

.text-13 {
  font-family: PingFang SC, PingFang SC;
  font-weight: bold;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.text-14 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #1f1f1f;
  text-align: right;
  font-style: normal;
  text-transform: none;
}

.bottom-btn {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 750rpx;
  height: 238rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  display: flex;
  flex-direction: column;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 20rpx;
  z-index: 10;
}

.bottom-btn .top {
  display: flex;
  align-items: center;
}

.bottom-btn .top .left {
  display: flex;
  align-items: center;
}

.bottom-btn .top .left .text-1 {
  margin-right: 40rpx;
  display: flex;
  align-items: center;
}

.bottom-btn .top .left .text-class-1 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #1f1f1f;
  text-align: left;
}

.bottom-btn .top .left .text-class-2 {
  font-family: PingFang SC, PingFang SC;
  font-weight: bold;
  font-size: 32rpx;
  color: #eb4636;
  text-align: left;
}

.bottom-btn .top .right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.bottom-btn .top .right text {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: left;
  margin-left: 10rpx;
}

.bottom-btn .content {
  margin-top: 18rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-btn .content .center-btn {
  width: 710rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-btn .content .left-btn {
  width: 202rpx;
  height: 96rpx;
  background: #f2f3f6;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16rpx;
}

.bottom-btn .content .right-btn {
  width: 492rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
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

::v-deep .uni-select {
  border: none;
}

::v-deep .uni-select__selector {
  z-index: 20;
}
</style>
