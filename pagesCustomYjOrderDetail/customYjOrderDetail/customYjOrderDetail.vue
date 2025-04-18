<template>
	<view class="yjOrder-layout"  v-if="orderInfo">
		<!-- header -->
		<custom-header>
			<template #name>议价订单</template>
			<template #fill>议价订单</template>
		</custom-header>
		
		<view class="title" v-if="orderInfo">
			<text class="text-1">{{getTitleText(orderInfo.zt)}}</text>
			<uv-count-down v-if="orderInfo.zt==='2'" :time="getRemainingTime(orderInfo.pay_time,orderInfo.bargainingtimename)" format="HH:mm:ss"/>
		</view>
		<view class="tips" v-if="orderInfo">
			<text>{{getTipText(orderInfo.zt)}}</text>
		</view>
		 
		 <!-- 产品信息 采购订单-->
		<view class="product-card-list" v-if="orderInfo">
			<view class="product-card">
				<view class="product-card-l">
					<!-- <image :src="orderInfo.goodsinfos.cover" mode="aspectFit"></image> -->
					<van-image width="190rpx" height="190rpx" radius="18rpx" fit="fill" :src="orderInfo.goodsinfos.cover">
					  <template v-slot:error>加载失败</template>
					</van-image>
					
				</view>
				<view class="product-card-r">
					<view class="top">
						<view class="top-tap">
							<text class="top-tap-text">{{orderInfo.goodsinfos.finenessname}}</text>
						</view>
						<view style="{clear:both}">
							
						</view>
						<text class="top-text">{{orderInfo.goodsinfos.name}}</text>
					</view>
					<view class="mid">
						<view class="version-tap"> 
							<view class="imei">
								<text>IMEI：{{orderInfo.goodsinfos.ch}}</text>
								<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
							</view>
							<view style="display: flex;align-items: center;gap: 40rpx;">
								<text v-if="orderInfo.goodsinfos.cgyname" style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #828282;text-align: left;">采购: {{orderInfo.goodsinfos.cgyname}}</text>
								<text v-if="orderInfo.goodsinfos.ckame" style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #828282;text-align: left;">仓库: {{orderInfo.goodsinfos.ckame}}</text>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom-l">
							<text class="bottom1">议价:</text>
							<text class="bottom2">￥{{orderInfo.price}}</text>
							<!-- <text class="bottom3" v-if="!orderInfo.isBargaining">/台</text> -->
							<view class="bottom4" >
								<text>原价：¥{{orderInfo.goodsinfos.price}}</text>
								<view class="divil">
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		 
		 <!-- paice-card -->
		<view class="price-card">
		 	<view class="top">
		 		<view class="top1">
		 			<text class="text-1">商品金额</text>
		 			<text class="text-2">¥{{orderInfo.price}}</text>
		 		</view>
		 		<view class="top2">
		 			<view class="left" @click="openRule">
		 				<text>运费</text>
		 				<image src="https://www.xzxskj.com/xcximg/icon_tishi@3x.png" mode="aspectFill"></image>
		 			</view>
		 			<view class="right">
		 				<text>¥0.0</text>
		 			</view>
		 		</view>
		 	</view>
		 	<view class="mid"></view>
		 	<view class="bottom">
		 		<view class="left">
		 			<text v-if="orderInfo.lx!=='1'">商品数量：1</text>
		 		</view>
		 		<view class="right">
		 			<text class="text-1">合计</text>
		 			<text class="text-2">￥{{orderInfo.price}}</text>
		 		</view>
		 	</view>
		</view>
		 
		<!-- address&&remark -->
		<view v-if="addressInfos" class="address-remark">
			<view class="left">
				<text>收货地址</text>
			</view>
			<view class="right">
				<text class="text-1">{{addressInfos.province}} {{addressInfos.city}} {{addressInfos.area}} {{addressInfos.address}}</text>
				<text class="text-2">{{addressInfos.name}} {{addressInfos.phone}}</text>
			</view>
		</view>
		<view class="address-remark">
			<view class="left">
				<text>备注信息</text>
			</view>
			<view class="right">
				<text class="text-1">{{orderInfo.remarks}}</text>
				<!-- <text class="text-2">{{addressInfos.name}} {{addressInfos.phone}}</text> -->
			</view>
		</view>
	
	
		<view class="order-info">
			<view class="list" v-for="(item,index) in getFilteredOrderInfo(orderInfo.zt)" :key="index">
				<view class="left">
					<text>{{item.name}}</text>
				</view>
				<view class="right">
					<text>{{item.value}}</text>
					<image v-if="item.image" :src="item.image" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		
		<view class="btn" v-if="orderInfo.zt === '2'" style="gap: 14rpx">
			<view style="width: 232rpx;height: 96rpx;background: #F2F3F6;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;align-items: center;justify-content: center;">
				<text style="height: 44rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #1F1F1F;text-align: center;font-style: normal;text-transform: none;">驳回议价</text>
			</view>
			<view style="width: 444rpx;height: 96rpx;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text style="height: 44rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #FFFFFF;text-align: center;font-style: normal;text-transform: none;">同意议价</text>
			</view>
		</view>
		
		<view class="btn" v-if="orderInfo.zt === '3'">
			<view style="width: 690rpx;height: 96rpx;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text style="height: 44rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #FFFFFF;text-align: center;font-style: normal;text-transform: none;">确认发货</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
import { apigetAddressDetail } from '@/api/address/address.js';
const orderInfo = ref()
const tipData = ref([
	{zt:'2',text:'请在倒计时完成前确认订单,时间结束将默认取消订单'},
	{zt:'3',text:''},
	{zt:'4',text:''},
	
])
const getTipText = (zt)=>{
  console.log("getTipText zt:",zt)
  const item = tipData.value.find(item => {
    return item.zt === zt.toString();
  });
  console .log('item:',item)
  return item ? item.text : '';
}	

const getRemainingTime=(addTime, bargainingTimeName)=>{
	console.log('addTime:',addTime);
	console.log('bargainingTimeName:',bargainingTimeName);
  const currentTime = new Date().getTime();
  const bargainingEndTime = new Date(parseInt(addTime) * 1000 + parseInt(bargainingTimeName) * 3600 * 1000);
  const remainingTime = bargainingEndTime.getTime() - currentTime;
  return remainingTime;
}

const titleText = ref([
	{zt:'2',text:'等待确认议价'},
	{zt:'3',text:'议价成功等待发货'},
	{zt:'4',text:'议价失败'},
	
])
const getTitleText = (zt)=>{
  console.log('zt:',zt);
  const item = titleText.value.find(item => {
	return item.zt === zt.toString();
  });
  return item ? item.text : '';
}
const btnData = ref ([
	{zt:'2',btns:[
	]},
	{zt:'3',btns:[
		{text:'联系客服',image:'https://www.xzxskj.com/xcximg/icon_kefu@3x.png'},
		{text:'催发货',image:'https://www.xzxskj.com/xcximg/icon_cuifahuo@3x.png'},
	]},
	{zt:'4',btns:[
		
	]},
])
const getBtns = (zt) => {
  const btnItem = btnData.value.find(item => item.zt===zt);
  return btnItem ? btnItem.btns : [];
};

const addressInfos = ref()
const getAddressDetail = async (id) => {
	const param = { id: id };
	const res = await apigetAddressDetail(param);
	addressInfos.value = res.info
	console.log(res);
};

const order_info = ref([
	{name:'订单号',value:'NO.202303281234',image:'https://www.xzxskj.com/xcximg/icon_copy@3x.png',zt:['2','3','4']},
	{name:'议价时间',value:'',image:'',zt:['2','3','4']},
	{name:'议价成功',value:'',image:'',zt:['3']},
	{name:'议价失败',value:'2024-03-12 15:00:00',image:'',zt:['4']},
	
])
const getFilteredOrderInfo = (zt) => {
  return order_info.value.filter((item) => item.zt.includes(zt));
};
const formatTimestamp=(timestamp)=>{
  const date = new Date(timestamp * 1000); // 将时间戳转换为 Date 对象
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1,并补齐两位数
  const day = String(date.getDate()).padStart(2, '0'); // 日期补齐两位数
  const hours = String(date.getHours()).padStart(2, '0'); // 小时补齐两位数
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补齐两位数
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒数补齐两位数
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
onMounted(()=>{
	console.log('onMounted success')
	const itemString = uni.getStorageSync('orderDetailItem'); 
	if (itemString) {
		orderInfo.value = JSON.parse(itemString)
		console.log('orderInfo.value：',orderInfo.value)
		order_info.value[0].value = 'NO.'+orderInfo.value.ordernumber
		order_info.value[1].value = formatTimestamp(orderInfo.value.add_time) 
		// order_info.value[2].value = formatTimestamp(orderInfo.value.pay_time) 
		// order_info.value[3].value = ''
		// order_info.value[4].value = ''
		getAddressDetail(orderInfo.value.addressid)
	}
}) 
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.yjOrder-layout{
	height: 100vh;
	min-height: 100vh;
	box-sizing: border-box;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	padding-left: 20rpx;
	padding-right: 20rpx;
	
	.title{
		margin-top: 38rpx;
		display: flex;
		align-items: center;
		.text-1{
			height: 60rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 44rpx;
			color: #1F1F1F;
			text-align: left;
			margin-right: 20rpx;
		}
		::v-deep .uv-count-down{
			display: flex;
			align-content: center;
			justify-content: center;
			margin-top: 7rpx;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #E6432E;
				text-align: center;
			}
		}
	}
	.tips{
		margin-top: 10rpx;
		height: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 24rpx;
		color: #1F1F1F;
		text-align: left;
		opacity: 0.6;
	}
	.menu-xx {
	    margin-top: 20rpx;
	    display: grid;
	    grid-template-columns:25% 25% 25% 25%;
	    box-sizing: border-box;
	    justify-content: space-between;
	    align-items: center;
		.card-xx {
		    box-sizing: border-box;
		    width: 170rpx;
		    height: 60rpx;
		    background: #FFFFFF;
		    border-radius: 10rpx 10rpx 10rpx 10rpx;
		    display: flex;
		    align-items: center;
			justify-content: center;
			padding-left: 10rpx;
			padding-right: 10rpx;
			image {
			    height: 32rpx;
			    width: 32rpx;
			    margin-right: 10rpx;
			}
			text {
			    font-family: PingFang SC, PingFang SC;
			    font-weight: 400;
			    font-size: 26rpx;
			    color: #1F1F1F;
			    text-align: center;
			}
			.cusService{
				position: absolute;
				border-radius: 20rpx;
				opacity: 0;
			}
		}
	}
	.product-card-list {
		// border: 1rpx solid red;
		margin-top: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx 24rpx;
		box-sizing: border-box;
		.product-card {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15rpx;
			.product-card-l {
				width: 30%;
				// margin-right: 10rpx;
				// border: 2rpx solid yellow;
				border: 18rpx;
				height: 190rpx;
				// width: 190rpx;
				// background-color: red;
				image {
					// border: 1rpx solid black;
					height:100%;
					width: 100%;
				}
			}
			.product-card-r {
				// border: 2rpx solid red;
				width: 70%;
				height: 190rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					display: inline-block;
					.top-tap {
						padding-left: 8rpx;
						padding-right: 8rpx;
						float: left;
						height: 40rpx;
						// width: 64rpx;
						background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
						border-radius: 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						.top-tap-text {
							color: #ffffff;
							font-size: 22rpx;
						}
					}
					.top-text {
						margin-left: 10rpx;
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1f1f1f;
						vertical-align: top;
						text-align: center;
					}
				}
				.mid {
					margin-top: 5rpx;
					.version-tap {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
						.imei{
							display: flex;
							align-items: center;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #828282;
								text-align: left;
								margin-right: 10rpx;
							}
							image{
								height: 20rpx;
								width: 20rpx;
							}
						}
					}
				}
				
				.bottom {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.bottom-l {
						width: 100%;
						display: flex;
						align-items: center;
						.bottom1 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom2 {
							height: 38rpx;
							font-family: DIN, DIN;
							font-weight: bold;
							font-size: 32rpx;
							color: #e6432e;
							margin-bottom:8rpx;
						}
						.bottom3 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom4{
							margin-left: 20rpx;
							height: 32rpx;
							position: relative;
							margin-bottom: 13rpx;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #9B9B9B;
								text-align: left;
							}
							.divil{
								width: 100%;
								height: 2rpx;
								background: #9B9B9B;
								border-radius: 0rpx 0rpx 0rpx 0rpx;
								position: absolute;
								bottom: 7rpx;
								left: 0;
							}
							
						}
						
						
					}
					.bottom-r {
						width: 98rpx;
						height: 52rpx;
						background: #FFFFFF;
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						border: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: center;
						align-items: center;
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: #1F1F1F;
							text-align: center;
						}
					}
				}
			}
		
		}
	}
	.price-card {
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 246rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding: 24rpx 24rpx;
		.top {
			display: flex;
			flex-direction: column;
			.top1 {
				display: flex;
				justify-content: space-between;
				.text-1 {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
				}
				.text-2 {
					height: 36rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 30rpx;
					color: #1f1f1f;
				}
			}
			.top2 {
				margin-top: 22rpx;
				display: flex;
				justify-content: space-between;
				.left {
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1f1f1f;
						margin-right: 10rpx;
					}
					image {
						height: 24rpx;
						width: 24rpx;
					}
				}
				.right {
					height: 36rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 30rpx;
					color: #1f1f1f;
				}
			}
		}
		.mid {
			width: 642rpx;
			height: 2rpx;
			background: #fafafa;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			margin-top: 26rpx;
			margin-bottom: 26rpx;
		}
		.bottom {
			display: flex;
			justify-content: space-between;
			.left {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
			}
			.right {
				.text-1 {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.text-2 {
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #e6432e;
				}
			}
		}
	}
	.address-remark{
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		.left{
			width: 30%;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			width: 70%;
			display: flex;
			flex-direction: column;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: right;
			}
			
		}
	}
	.order-info{
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding:24rpx;
		box-sizing: border-box;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					line-height: 64rpx;
				}
			}
			.right{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: right;
				}
				image{
					margin-left: 10rpx;
					height: 20rpx;
					width: 20rpx;
				}
			}
		}
		
	}

	.btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		padding-top: 24rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 62rpx;
		
	}
}
</style>