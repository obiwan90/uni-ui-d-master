<template>
	<view class="sell">
		<!-- header -->
		<custom-header>
			<template #name>自由货源</template>
			<template #fill>卖货详情</template>
		</custom-header>
		<!-- card -->
		<scroll-view scroll-y="true" style="height: 1270rpx;">
			
		<view class="card" style="margin-left: 20rpx;">
			<view class="title">
				<view class="left" v-if="usinfos">
					<image :src="'https://www.xzxskj.com'+usinfos.img" mode="aspectFill" style="border-radius: 50%;"></image>
					<text>{{usinfos.nik_name}}</text>
				</view>
				<view class="right">
					<view class="tip">
						<uv-count-down 
							v-if="CountdownMilliseconds>0"
							:time="CountdownMilliseconds"
							format="DD:HH:mm:ss" 
							autoStart 
							millisecond 
							@change="onChange">
							<view class="time">
								<text class="time__item">距结束</text>
								<text class="time__item" v-if="timeData.days>0">{{ timeData.days }}&nbsp;天</text>
								<text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
								<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
								<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
							</view>
						</uv-count-down>
						<text v-else class="text-1">已结束</text>
					</view>
				</view>
			</view>
			<view class="info">
				<text>{{data.fullname}}</text>
			</view>
			<view class="price">
				<view class="left">
					<text class="text-1">卖货价:</text>
					<text class="text-2">¥{{data.price}}</text>
					<text class="text-3">/台</text>
				</view>
				<view class="right">
					<text>销售数量：{{data.num}}</text>
				</view>
			</view>
			<view class="photot-cell">
				<scroll-view scroll-x>
					<view class="scroll">
						<view class="photo" v-for="(item,index) in data.img.split(',')" :key="index">
							<image :src="item" style="border-radius: 20rpx;" mode="aspectFill"  @click="shareImage(item)"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 定位 -->
		<view class="position"  style="margin-left: 20rpx;">
			<view class="left">
				<image src="https://www.xzxskj.com/Public/upload/66cbb4770c4a0443.png" mode="aspectFill"></image>
				<text>发布地：{{data.fbdz}}</text>
			</view>
			<view class="right" @click="call">
				<image src="https://www.xzxskj.com/Public/upload/66cbb44fd57ea4484.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- product-info -->
		<view class="product-info"  style="margin-left: 20rpx;">
			<view class="title">
				<text>物品描述</text>
				<view class="tip">
					<text>{{data.fineness}}</text>
				</view>
			</view>
			<view class="content">
				<view class="info" v-for="(item,index) in content" :key="index">
					<view class="left">
						<text>{{item.key}}</text>
					</view>
					<view class="right">
						<text>{{item.value}}</text>
					</view>
				</view>
				
				<view class="info1">
					<text>{{data.describes}}</text>
				</view>
			</view>
		</view>
		<view style="margin-left: 20rpx;margin-right: 20rpx;margin-top: 20rpx;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #669CFD">*买家必读：自由货源为个人商品，相关商品平台方不承担任何售后与责任；下单前请联系卖家确认商品相关信息；买家确认收货后平台将不提供退货退款。</text>
		</view>
		
		</scroll-view>
		
		<view class="shop-tabbar">
			<view class="shop-tabbar-b">
				<view class="shop-tabbar-b4" @click="settlement">
					<text>立即购买</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userInfoStore.js';
import { apigetMarketListDetail } from '../api/api.js';
import { apiAddShopCard } from '@/api/shopCard/shopCard.js';
import { useLocationStore } from '@/stores/locationStore.js';
import { previewImages } from '../../utils/common.js';
const shopCarCount = computed(() => useUserStore().shopCount);
const id = ref('')
const usinfos = ref()
const infos = ref()
const city = ref('')
const timeData = ref({})
const onChange = (e)=>{
	timeData.value = e
}
const data = ref()
const content = ref([
	{key:'功能检测',value:'全好'},
	{key:'维修检测',value:'声音略小全好声音略小全好声音略'},
])
const CountdownMilliseconds = ref(0)

function getCountdownMilliseconds(add_time, duration) {
    const startTime = add_time * 1000; 
    const durationMilliseconds = duration * 60 * 60 * 1000;
    const endTime = startTime + durationMilliseconds; // 计算结束时间
    const now = Date.now(); // 当前时间（毫秒）
    const countdownMilliseconds = endTime - now; // 计算倒计时时间
    console.log('countdownMilliseconds：', countdownMilliseconds);
    return countdownMilliseconds > 0 ? countdownMilliseconds : 0; 
}

function formatTimeRemaining(add_time, duration) {
    const endTime = add_time * 1000 + duration * 60 * 60 * 1000; 
    const now = Date.now(); 
    const remainingTime = endTime - now; 
    if (remainingTime <= 0) {
        return "已结束";
    }
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return `距结束 ${days}天 ${hours}:${minutes}:${seconds}`;
}

const call = ()=>{
	uni.makePhoneCall({
	   phoneNumber: data.value.phone
	});
}
const addShop = async () => {
    if (!data.value) {
        console.error('data is undefined');
        return;
    }

    const param = {
        opid: uni.getStorageSync('sessionInfo').opid,
        goodsid: data.value.id
    };

    const res = await apiAddShopCard(param);
    console.log(res);
    if (res.code === '200') {
        uni.showToast({
            title: '成功加入购物车',
            icon: 'success'
        });
        useUserStore().shopCount = ++shopCarCount.value;
    } else {
        uni.showToast({
            title: '加入购物车失败，请重试',
            icon: 'none'
        });
    }
}
const settlement =async ()=>{
	let dataParam =ref({
		lx:'',
		id:''
	})
	//1.加入购物车
	const param = {
	  opid: uni.getStorageSync('sessionInfo').opid,
	  goodsid: infos.value.id
	};
	 const res = await apiAddShopCard(param);
	if (res.code === '200') {
		useUserStore().shopCount = ++shopCarCount.value;
	}
	dataParam.value.lx='2';
	dataParam.value.id=infos.value.id;
	//2.商品id 跳转结算 todo
	let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
	uni.navigateTo({
		url:'/pagesSubOrder/subOrder/subOrder?data='+queryString
	})
}
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const getMarketListAll =async (id)=>{
	const param = {
		id:id,
	}
	const res =await apigetMarketListDetail(param)
	if(res.code === '200'){
		console.log('res',res)
		content.value[0].value = res.freeinfos.functions
		content.value[1].value = res.freeinfos.service
		data.value = res.freeinfos
		CountdownMilliseconds.value = getCountdownMilliseconds(res.freeinfos.add_time,res.freeinfos.duration)
		usinfos.value =  res.usinfos
		infos.value = res.infos
		city.value = uni.getStorageSync('locationForm').city;
	}
	console.log('market res:',res);
}
const shareImage = (url) => {
	const urls = (data.value.img.endsWith(',') ? data.value.img.slice(0, -1) : data.value.img).split(',');
	previewImages(urls, url);
};

onLoad(async(options)=>{
	if(options.item){
		const item = JSON.parse(decodeURIComponent(options.item));
		await getMarketListAll(item.id)
	}
	if(options.id){
		await getMarketListAll(options.id)
	}
})

</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.sell{
	height: 100vh;
	width: 750rpx;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.card{
		margin-top: 45rpx;
		box-sizing: border-box;
		width: 710rpx;
		height: 590rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding-left: 20rpx;
		// padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 30rpx;
		.title{
			margin-bottom: 58rpx;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				image{
					height: 80rpx;
					width: 80rpx;
					margin-right: 20rpx;
				}
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				// padding-left: 26rpx;
				// width: 326rpx;
				padding-left: 10rpx;
				padding-right: 10rpx;
				height: 56rpx;
				background: linear-gradient( 134deg, #ED784B 0%, #EB4636 100%);
				border-radius: 28rpx 0rpx 0rpx 28rpx;
				display: flex;
				.tip{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					margin-right: 20rpx;
					margin-left: 24rpx;
					text{
						height: 42rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #FFFFFF;
					}
				}
				
			}
		}
		.info{
			text{
				height: 110rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
			}
		}
		.price{
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			.left{
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
				.text-2{
					height: 48rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 40rpx;
					color: #E6432E;
				}
				.text-3{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
			}
			.right{
				margin-right: 20rpx;
				text{
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 22rpx;
					color: #1F1F1F;
				}
			}
			
		}
	
		.photot-cell{
			margin-top: 30rpx;
			width: 100%;
			height: 196rpx;
			display: flex;
			scroll-view{
				white-space: nowrap;
				.scroll{
					display: flex;
					.photo{
						margin-right: 12rpx;
						image{
							height: 198rpx;
							width: 198rpx;
						}
					}
				}
			}
		}
	}
	.bar{
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding-left: 20rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.menu-1{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 44rpx;
				height: 40rpx;
				opacity: 0.7;
				margin-bottom: 10rpx;
			}
			text{
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
				opacity: 0.7;
			}
		}
		.menu-2{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				height: 44rpx;
				width: 44rpx;
				opacity: 0.7;
				margin-bottom: 10rpx;
			}
			text{
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
				opacity: 0.7;
			}
		}
		.btn{
			width: 460rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}
	}
	.position{
		
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 708rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		
		.left{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				height: 36rpx;
				width: 36rpx;
				margin-right: 12rpx;
			}
			text{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
			}
		}
		.right{
			image{
				height: 32rpx;
				width: 32rpx;
			}
			
		}
	}
	.product-info{
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.title{
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			height: 80rpx;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
			}
			.tip{
				height: 38rpx;
				background: linear-gradient( 132deg, #FFA187 0%, #FFD3B5 100%);
				border-radius: 4rpx 4rpx 4rpx 4rpx;
				opacity: 0.45;
				margin-left: 20rpx;
				display: flex;
				align-items: center;
				text{
					height: 32rpx;
					font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
					font-weight: 400;
					font-size: 24rpx;
					color: #EB4636;
				}
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 24rpx;
			.info{
				box-sizing: border-box;
				width: 670rpx;
				height: 72rpx;
				background: #F8F8F8;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;
				padding-right: 20rpx;
				margin-bottom: 12rpx;
				.left{
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
				.right{
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
			}
			.info1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 670rpx;
				// height: 200rpx;
				background: #F8F8F8;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				padding-top: 24rpx;
				padding-bottom: 24rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				text{
					min-height: 152rpx; 
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					line-height: 56rpx;
					word-wrap: break-word;
					word-break: break-all; 
				}
			}
		}
	}
}

.shop-tabbar {
	// margin-top: 20rpx;
	z-index: 10;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	width: 750rpx;
	// height: 256rpx;
	height: 172rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	padding-top: 24rpx;
	.shop-tabbar-t {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 46rpx;
		padding: 0rpx 20rpx;
		.shop-tabbar-t-card {
			height: 46rpx;
			width: 210rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #f3f2f6;
			border-radius: 24rpx 24rpx 24rpx 24rpx;
			opacity: 0.8;
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
			}
		}
	}
	.shop-tabbar-m {
		width: 710rpx;
		height: 2rpx;
		background: #f3f2f6;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		margin-top: 18rpx;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	.shop-tabbar-b {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		// border: 1rpx solid black;
		.shop-tabbar-b1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.cusService{
				// border: 1rpx solid red;
				// height: 128rpx;
				// width: 345rpx;
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				border-radius: 20rpx;
				opacity: 0;
			}
			image {
				width: 44rpx;
				height: 44rpx;
			}
			text {
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
			}
		}
		.shop-tabbar-b2 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-left: 40rpx;
			image {
				width: 44rpx;
				height: 44rpx;
			}
			text {
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
			}
		}
		.shop-tabbar-b3 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 192rpx;
			height: 84rpx;
			background: #ffe6dc;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin-left: 40rpx;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #e6432e;
			}
		}
		.shop-tabbar-b4 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 650rpx;
			height: 84rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
}
.time {
	// #ifndef APP-NVUE
	display: flex;
	// #endif
	flex-direction: row;
	align-items: center;
	&__item {
		color: red;
		font-size: 30rpx;
		text-align: center;
	}
}

</style>