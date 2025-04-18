<template>
	<view class="financeDetail-layout">
		<!-- header -->
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view style="display: flex; align-items: center" class="bar-icon" @click="goBack">
					<image style="margin-right: 20rpx" class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
					<text
						style="
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 40rpx;
							color: #1f1f1f;
							text-align: center;
							font-style: normal;
							text-transform: none;
						"
					>
						{{lists[0].sfdz==='1'?'未对账':'已对账'}}
					</text>
				</view>
			</view>
		</view>
		<view :style="{ height: getStatusBarHeight() + getTitleBarHeight() + 'px' }"></view>

		<scroll-view scroll-y style="height: 1250rpx">
			<view style="margin-top: 38rpx" />

			<view class="card"  v-for="(item, index) in lists" :key="index">
				<view class="title">
					<view class="left">
						<text
							style="
								font-family: PingFang SC, PingFang SC;
								font-weight: bold;
								font-size: 28rpx;
								color: #1f1f1f;
								text-align: left;
								font-style: normal;
								text-transform: none;
							"
						>
							客户信息
						</text>
					</view>
					<!-- <view class="right">
						<image style="margin-right: 10rpx;border: 2rpx solid #D2CFCA;height: 32rpx; width: 32rpx; border-radius: 50%" src="" mode="aspectFit"></image>
						<text
							style="
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #1f1f1f;
								text-align: left;
								font-style: normal;
								text-transform: none;">
							全选
						</text>
					</view> -->
				</view>

				<view class="content" v-for="(item1, index) in item.goodslist" :key="index">
					<view class="content-title" >
						<view class="tap">
							<text>{{item1.finenessname}}</text>
						</view>
						<text>{{item1.name}}</text>
					</view>
					<view class="imei">
						<text>IMEI：{{item1.ch}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<view class="describe">
						<text>采购：{{item1.cgyname}}</text>
						<text>仓库：{{item1.ckname}}</text>
					</view>
					<view class="price">
						<view class="left" style="display: flex;align-items: flex-end;">
							<text class="text-1">批发价:</text>
							<text class="text-2">￥</text>
							<text class="text-3">{{item1.price}}</text>
						</view>
						<!-- <view class="right">
							<view class="right" @click="item.selected = !item.selected">
								<image v-if="item.selected" src="/pagesFinanceDetail/static/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
								<image v-else src="/pagesFinanceDetail/static/icon_xuanze_nor@3x.png" mode="aspectFill"></image>
							</view>
						</view> -->
					</view>
				</view>
				<view class="product-num">
					<view class="left">
						<text>商品数量：{{item.num}}</text>
					</view>
					<view class="right">
						<text class="text-1">收款金额：</text>
						<text class="text-2">￥{{item.price}}</text>
					</view>
				</view>
			</view>

			<view
				style="
					margin-left: 20rpx;
					margin-top: 20rpx;
					width: 710rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					flex-direction: column;
					padding: 24rpx;
				"
			>
				<view>
					<text class="text-2">收款信息</text>
				</view>
				<view v-for="(item2, index) in priceInfoDataFilter(lists[0])" :key="index" style="gap: 10rpx; margin-top: 20rpx; display: flex; justify-content: space-between; align-items: center">
					<text class="text-1">{{ item2.text }}</text>
					<text class="text-1">{{ item2.value }}</text>
				</view>
				<view style="margin-top: 24rpx; margin-bottom: 24rpx; width: 670rpx; height: 2rpx; background: #eeeeee; border-radius: 20rpx 20rpx 20rpx 20rpx"></view>
				<view>
					<text class="text-2">备注和凭证</text>
				</view>
				<text style="margin-top: 24rpx" class="text-1">{{lists[0].remarkss}}</text>
				<view style="display: flex; align-items: center; gap: 20rpx; margin-top: 24rpx">
					<image
						v-if="lists[0].imgs.split(',').length>0"
						v-for="(item, index) in lists[0].imgs.split(',')"
						:key="index"
						style="border-radius: 18rpx;height: 144rpx; width: 144rpx"
						src=""
						mode="aspectFit"
					></image>
				</view>
			</view>

			<view
				style="
					width: 710rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					flex-direction: column;
					padding: 20rpx;
					margin-left: 20rpx;
					margin-top: 20rpx;
				"
			>
				<view>
					<text class="text-2">订单信息</text>
				</view>

				<view
					v-for="(item3, index) in orderInfoDataFliter(lists[0])"
					:key="index"
					style="gap: 10rpx; margin-top: 20rpx; display: flex; justify-content: space-between; align-items: flex-start"
				>
					<text class="text-1">{{ item3.text }}</text>
					<text style="vertical-align: top; box-sizing: border-box; width: 500rpx" class="text-3">{{ item3.value }}</text>
				</view>
			</view>
			<view style="margin-bottom: 20rpx" />
		</scroll-view>

		<view class="fill" style="height: 202rpx" />
		<view class="select-btn">
			<view @click="check(lists[0].id)" class="confim-btn">
				<text>核对无误</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
import { getFinanceDetail } from '../api/api.js'
import { apiFinanceCheck } from '../api/api.js'
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
const goBack = () => {
	uni.navigateBack();
};
const lists = ref([])
const comfrm = () => {};
const priceInfoData = ref([
	{ text: '收款类型', value: '线下收款' },
	{ text: '收款员工', value: '金克斯' },
	{ text: '收款时间', value: '2024-04-27 14:55:12' },
	{ text: '收款方式', value: '支付宝' }
]);
const orderInfoData = ref([
	{ text: '客户名称', value: '张三' },
	{ text: '联系方式', value: '13100000000' },
	{ text: '配送方式', value: '京东 123456789' },
	{ text: '销售员工', value: '金克斯' },
	{ text: '下单时间', value: '2024-04-27 14:55:12' },
	{ text: '收货时间', value: '2024-04-27 14:55:12' },
	{ text: '下单备注', value: '该商户已用支付宝收款了,该商户已用支付宝收款了，线下收款已到账,线下收款已到账,该商户已用支付宝收款了，线下收款已到账' }
]);

const priceInfoDataFilter = (item)=>{
	console.log('item',item)
	priceInfoData.value[0].value = item.sklx
	priceInfoData.value[1].value = item.skyg
	priceInfoData.value[2].value = item.sksj
	priceInfoData.value[3].value = item.zffs
	return priceInfoData.value
}

const orderInfoDataFliter = (item)=>{
	console.log('item',item)
	orderInfoData.value[0].value = item.khname
	orderInfoData.value[1].value = item.khphone
	orderInfoData.value[2].value = item.khphone
	orderInfoData.value[3].value = item.ygname
	orderInfoData.value[4].value = formatTimestamp(item.add_time)
	orderInfoData.value[5].value = item.sksj
	orderInfoData.value[6].value = item.remarks
	return orderInfoData.value
}
const getFinanceDetailAc =async (id)=>{
	const param = {
		id:id
	}
	const res = await getFinanceDetail(param)
	if(res.code === '200'){
		lists.value = res.lists
	}
}
function formatTimestamp(timestamp) {
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const apiFinanceCheckData = async (orderId) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		orderid: orderId,
	}
  const res = await apiFinanceCheck(param);
  console.log('res:', res);
  if (res.code === '200') {
	uni.showToast({
		title: '对账成功',
		icon: 'success',
		duration: 500
	});
	setTimeout(()=>{uni.navigateBack()},500)
  }
};
const check = (orderId)=>{
	apiFinanceCheckData(orderId)
}

onLoad(async (options)=>{
	console.log(options)
	if(options.data){
		const id = options.data
		console.log('id',id)
		await getFinanceDetailAc(id)
	}
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.financeDetail-layout {
	min-height: 100vh;
	background: #f3f2f6;
}
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	background: #f3f2f6;
	.titleBar {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20rpx;
		.bar-icon {
			.img {
				height: 32rpx;
				width: 32rpx;
			}
		}
		.fill {
			height: 56rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 40rpx;
			color: #1f1f1f;
			text-align: center;
			opacity: 0;
		}
	}
}

.card {
	margin-top: 20rpx;
	margin-left: 20rpx;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 14rpx;
	padding-bottom: 20rpx;
	display: flex;
	flex-direction: column;
	.title {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			image {
				height: 24rpx;
				width: 20rpx;
				margin-right: 10rpx;
			}
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
				text-align: center;
			}
		}
		.right {
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #e6432e;
				text-align: right;
			}
		}
	}
	.content {
		margin-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 20rpx;
		width: 670rpx;
		background: #f5f5f5;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		display: flex;
		flex-direction: column;
		.content-title {
			display: flex;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			.tap {
				background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				height: 32rpx;
				margin-right: 10rpx;
				padding-left: 8rpx;
				padding-right: 8rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #ffffff;
					text-align: center;
				}
			}
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.imei {
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 22rpx;
			color: #828282;
			text-align: left;
			margin-right: 10rpx;
			image {
				height: 20rpx;
				width: 20rpx;
			}
		}
		.describe {
			margin-top: 14rpx;
			display: flex;
			align-items: center;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #828282;
				text-align: left;
				margin-right: 40rpx;
			}
		}
		.price {
			margin-top: 14rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				.text-1 {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #1f1f1f;
					text-align: left;
					margin-right: 10rpx;
				}
				.text-2 {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #e6432e;
					text-align: left;
					margin-right: 4rpx;
				}
				.text-3 {
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #e6432e;
					text-align: left;
				}
			}
			.right {
				display: flex;
				align-items: center;
				image {
					height: 32rpx;
					width: 32rpx;
				}
			}
		}
	}
	.product-num {
		margin-top: 20rpx;
		height: 84rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.text-1 {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: right;
			}
			.text-2 {
				font-family: DIN, DIN;
				font-weight: bold;
				font-size: 32rpx;
				color: #e6432e;
				text-align: left;
			}
		}
	}
}

.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	vertical-align: top;
}
.text-3 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: right;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.select-btn {
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
	padding-top: 24rpx;

	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}
</style>
