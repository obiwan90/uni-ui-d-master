<template>
	<view class="container" style="margin-top: 20rpx;"  @click="goDetailPage(good)">
		<view class="product-box button-animation" v-if="good">
			<!-- <view class="box-l" @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+good.id)"> -->
			<view class="box-l">
				<van-image class="box-l-image" radius='18rpx' width="190rpx" height="190rpx" fit="fill" :src="good.cover">
				  <template v-slot:error>加载失败</template>
				  <van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
				
				<view class="image-tap" v-if="good.special === '1'">
					<text>特价商品</text>
				</view>	
			</view>
			<!-- {{good}} -->
			<!-- <view class="box-r" @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+good.id)"> -->
			<view class="box-r">
				<view class="top">
					<view class="title" style="">
						<!-- <custom-channel-tap v-if="good.zjlx==='1'" class="tap" text1="官方质检" :text2="good.finenessname" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" />
						<custom-channel-tap v-if="good.zjlx==='2'" class="tap" text1="授权质检" :text2="good.finenessname" backgroundColor="linear-gradient( 135deg, #246B13 0%, #39D591 100%)" />
						<custom-channel-tap v-if="good.zjlx==='3'" class="tap" text1="自由货源" :text2="good.finenessname" backgroundColor= "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "/> -->
						
						<custom-channel-tap v-if="good.zjlx==='1'" class="tap" text1="官方质检" text1Color="#E6432E" :text2="good.finenessname" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" />
						<custom-channel-tap v-if="good.zjlx==='2'" class="tap" text1="授权质检" text1Color="#246C14" :text2="good.finenessname" backgroundColor="linear-gradient( 135deg, #246B13 0%, #39D591 100%)" />
						<custom-channel-tap v-if="good.zjlx==='3'" class="tap" text1="自由货源" text1Color="#FF6C27" :text2="good.finenessname" backgroundColor= "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "/>
						<view style="{clear:both}"/>
						<text>{{good.name}}</text>
					</view>
					<view class="clearfix"></view>
					<!-- 清除浮动的元素 -->
					<view class="mind">
						<custom-tag v-if="good.gjbbname" :tagText="good.gjbbname" :bgColor="tagBgColor" />
						<custom-tag v-if="good.wlbbname" :tagText="good.wlbbname" :bgColor="tagBgColor" />
						<custom-tag v-if="good.bxzt" :tagText="good.bxzt" :bgColor="tagBgColor" />
						<custom-tag v-if="good.efficiency" :tagText="'电池'+good.efficiency+'%'" :bgColor="tagBgColor" />
						<custom-tag v-if="good.delivery" :tagText="good.delivery+'发货'" :bgColor="tagBgColor" />
					</view>
				</view>
				<view class="bottom" style="">
					<view class="text-info" style="margin-right: 10rpx;">
						<text class="text-1">批发价:</text>
						<text class="text-2">¥{{good.price}}</text>
						<text class="text-3">/台</text>
					</view>
					<van-tag style="margin-right: 6rpx;"  v-if="good.yjzt===2" size="mini" plain text-color="#EB4636">可议价</van-tag>
					<van-tag size="mini" plain text-color="#669CFD" v-if="good.byzt === '1'">包邮</van-tag>
					<!-- <van-tag size="mini" plain text-color="#669CFD" v-if="good.byzt === '2'">到付</van-tag> -->
					<!-- <view class="other-tap" >
					</view> -->
				</view>
			</view>
		</view>
	</view>
	<view v-if="showSetting&&good.mineCompany" class="settings">
		<view class="settings-box">
			<view class="settings-l">
				<text>最近更新：{{ formatTimestamp(good.updatetime) }}</text>
			</view>
			<view class="settings-r">
				<view class="settings-r-l">
					<image src="https://www.xzxskj.com/xcximg/icon_info@3x.png" mode="aspectFill"></image>
					<text>{{good.cgyname}}</text>
					<text>{{good.ckname}}</text>
				</view>
				<view class="divile"></view>
				<view class="settings-r-r"  @click="openEditPrice">
					<image src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
					<text>修改</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js';
const emit = defineEmits(['openProductEditPrice']);
const props = defineProps({
	showSetting: {
		type: Boolean,
		default: false
	},
	good: {
		type: Object,
		default: {}
	}
});
//数据
const good = props.good;	

const tagBgColor = ref('#F2F3F6');
const goPage =(path) =>{
	uni.navigateTo({
		url:path
	});
}
const goDetailPage = (good)=>{
	if(good.zjlx!=='3'){
		goPage('/pagesProductDetail/productDetail/productDetail?id='+good.id)
	}else{
		goPage('/pagesSell/sell/sell?id='+good.freeid)
	}
}
const getTime = (timestamp)=>{
	const date = new Date(timestamp * 1000); 
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); 
	const day = String(date.getDate()).padStart(2, '0'); 
	const formattedDate = `${year}/${month}/${day}`; 
	// console.log("formattedDate:",formattedDate); 
	return formattedDate;
}

const openEditPrice = () => {
  const goodData = props.good;
  emit('openProductEditPrice', goodData);
};
</script>

<style lang="scss" scoped>
.settings {
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}
	margin-bottom: 20rpx;
	width: 710rpx;
	// height: 96rpx;
	height: 76rpx;
	background: #786C68;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin-top: -32rpx;
	margin-left: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	// padding-bottom: 16rpx;
	.settings-box {
		box-sizing: border-box;
		height: 50rpx;
		width: 100%;
		padding-left: 24rpx;
		padding-right: 24rpx;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		.settings-l {
			// border: 2rpx solid blue;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				opacity: 0.6;
			}
		}
		.settings-r {
			box-sizing: border-box;
			// border: 2rpx solid blue;
			display: flex;
			justify-content: center;
			align-items: center;
			.settings-r-l {
				display: flex;
				align-items: center;
				image {
					height: 24rpx;
					width: 24rpx;
					margin-right: 10rpx;
				}
				text {
					// border: 2rpx solid blue;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #FFFFFF;
					opacity: 0.8;
					margin-right: 20rpx;
				}
			}
			.divile {
				width: 2rpx;
				height: 20rpx;
				background: #FFFFFF;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				opacity: 0.2;
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
			.settings-r-r {
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					height: 22rpx;
					width: 22rpx;
					margin-right: 10rpx;
				}
				text {
					width: 48rpx;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #FFFFFF;
					opacity: 0.8;
					
					
				}
			}
		}
	}
}
.container {
	position: relative;
	z-index: 10;
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}
	// height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	// margin-bottom: 30rpx;
	border-radius: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	// border: 2rpx solid red;
	// background: #f3f2f6;
	background: #FFFFFF;
	.product-box {
		// border: 2rpx solid red;
		display: flex;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		width: 710rpx;
		height: 238rpx;
		padding: 24rpx 24rpx;
		justify-content: space-between;
		align-items: center;
		.box-l {
			display: flex;
			// justify-content: flex-start;
			// align-items: center;
			margin-right: 20rpx;
			.box-l-image {
				// height: 190rpx;
				// width: 190rpx;
				// border-radius: 18rpx;
			}
			.image-tap {
				margin-top: 6rpx;
				margin-left: 6rpx;
				position: absolute;
				// left: 0; // 确保 image-tap 在左上角
				// top: 0; // 确保 image-tap 在左上角
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx 0rpx 10rpx 0rpx;
				background: linear-gradient(180deg, #ed784b 0%, #eb4636 100%);
				width: 96rpx;
				height: 28rpx;
				text {
					width: 80rpx;
					height: 28rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 20rpx;
					color: #ffffff;
				}
			}
		}
		.box-r {
			flex: 1;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top{
				width: 100%;
				.title {
					width: 100%;
					// line-height: 100%;
					display: inline-block;
					// height: 80rpx;
					.tap {
						// vertical-align:middle;
						float: left;
						margin-right: 10rpx;
					}
					text {
						// vertical-align:middle;
						vertical-align: top;
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 30rpx;
						color: #1f1f1f;
						// text-align: justify;
						// word-break: break-all;
						// text-justify: auto;
					}
				}
				.mind {
				  margin-top: 5rpx;
				  margin-bottom: 5rpx;
				  white-space: nowrap;
				  overflow: hidden;
				  text-overflow: ellipsis;
				}

				// .mind {
				// 	margin-top: 5rpx;
				// 	margin-bottom: 5rpx;
				// }
			}
			.bottom {
				display: flex;
				// justify-content: space-between;
				align-items: center;
				.text-info{
					.text-1 {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #1f1f1f;
					}
					.text-2 {
						height: 38rpx;
						font-family: DIN, DIN;
						font-weight: bold;
						font-size: 32rpx;
						color: #e6432e;
					}
					.text-3 {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #1f1f1f;
					}
				}
				.other-tap{
					height: 36rpx;
					width: 78rpx;	
					display: flex;
					justify-content: center;
					align-items: center;
					// width: 78rpx;
					height: 36rpx;
					background: linear-gradient( 180deg, #ED784B 0%, #EB4636 100%);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					text{
						width: 66rpx;
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
}
</style>
