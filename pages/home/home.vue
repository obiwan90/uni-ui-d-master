<template>
	<view style="background: rebeccapurple;min-width: 100vh;" v-if="!useInitFinishedStore().initFinished">
	    <!-- 页面内容 -->
	</view>
	<view v-else style="background: #f3f2f6;min-height: 100vh;">
		<!-- <scroll-view scroll-y style="height: 100%"> -->
			<view class="homeLayout pageBg" style="min-height: 100vh">
				<z-paging ref="paging" v-model="dataList" loading-more-enabled loading-more-default-text show-loading-more-when-reload @query="queryList" :default-page-size = "20">
				<!-- <z-paging ref="paging" v-model="dataList" @query="queryList" :loading-more-custom-style="{'background':'#f3f2f6'}" :default-page-size = "20"> -->
				<!-- navi -->
				<template #top>
					<custom-navi-bar></custom-navi-bar>
				</template>
				<!--home menu -->
				<view v-if="dhlist" class="home-menu" style="height: 120rpx; animation: fadeIn 1s ease-in-out">
					<scroll-view scroll-x>
						<view class="box" v-for="(item, index) in dhlist" :key="index">
							<!-- <view class="menu-box" @click="goPage(item.urls)"> -->
							<view class="menu-box" v-if="item.hide === '0'" @click.stop="goPage(item.urls)">
								<image  class="menu-image" :src="'https://www.xzxskj.com' + item.imgs" mode="aspectFill"></image>
								<view class="menu-text">
									{{ item.name }}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-else class="home-menu" style="height: 120rpx"></view>
				<view class="banner">
					<!-- indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" -->
					<swiper circular  autoplay>
						<swiper-item>
							<image  class="banner-image" src="https://www.xzxskj.com/Public/upload/661216dae46d02476.png" mode="scaleToFill"></image>
						</swiper-item>
						<!-- <swiper-item>
							<image  class="banner-image" src="https://www.xzxskj.com/Public/upload/661221bedfe993433.jpeg" mode="scaleToFill"></image>
						</swiper-item> -->
					</swiper>
				</view>
				<!-- menu-card -->
				<view class="menu-card">
					<view class="left button-animation">
						<image  src="https://www.xzxskj.com/Public/upload/66db138702f009072.png" mode="scaleToFill"></image>
					</view>
					<view class="right">
						<image
							
							class="right-top image-menu-item-animation"
							src="https://www.xzxskj.com/Public/upload/66db139cb55934813.png"
							mode="aspectFill"
							@click.stop="goPage('pagesClassify/classify/classify')"
						></image>
						<image
							
							class="right-bottom image-menu-item-animation"
							src="https://www.xzxskj.com/Public/upload/66db13ab388fc6640.png"
							mode="aspectFill"
							@click.stop="goPage('pagesRecovery/recovery/recovery')"
						></image>
					</view>
				</view>
				
				<view style="display: flex;flex-direction: column;margin-top: 30rpx;box-sizing: border-box;">
					<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10rpx;padding:0rpx 20rpx;">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #2E2E2E;">最新货源</text>
						<view style="display: flex;align-items: center;gap: 10rpx;" @click.stop="goPage('pagesProduct/product/product?newarrivals=1')">
							<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 26rpx;color: #2E2E2E;opacity: 0.4;" >查看更多</text>
							<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill" style="height: 20rpx ;width: 20rpx;opacity: 0.4;"></image>
						</view>
					</view>
					<custom-product-card class="product-card" :good ="item"  v-for="(item, index) in dataList" :key="item.id"></custom-product-card>
				</view>
				<template #bottom>
					<custom-tabbar></custom-tabbar>
				</template>
				</z-paging>
				
			</view>
		<!-- </scroll-view> -->
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="officialAccountPopup" :safe-area="false" type="center" @close="handleClose" @change="change">
		    <QRCodeModal :qrCodeUrl="qrCodeUrl"/>
		</uni-popup>
		
	</view>
</template>

<script setup>
import { useInitFinishedStore } from '@/stores/initFinished.js';
import { apiGetClasstify } from '@/api/classitify/classtify.js';
import { apiGetProductFilterData } from '@/api/product/product.js'
import { apiHomeMenus } from '@/api/home/home.js';
import { useUserStore } from '@/stores/userInfoStore.js';
import { useTabStore } from '@/stores/tabStore';
import QRCodeModal from '../../components/QRCodeModal/QRCodeModal.vue';

const instance = getCurrentInstance();

const initFinished = useInitFinishedStore().initFinished;
const dataList = ref([]);
const dhlist = ref([]);
const showPannel = ref(false);
const qrCodeUrl = ref('https://www.xzxskj.com/logo/logo.jpg');
const officialAccountPopup = ref(null);
const isClicking = ref(false);
const paging = ref(null);

const param = ref({
  brandid: '',
  classid: '',
  colourid: '',
  delivery: '',
  finenessid: '',
  gd: '',
  memoryid: '',
  newarrivals: '1',
  price: '',
  pricesdesc: '',
  sftj: '',
  sfzd: '',
  start: 0,
  systemid: '',
  versionid: '',
  ModelID: '',
  pageSize: 20
});

const handleClose = () => {
  console.log('Popup is closed');
  officialAccountPopup.value.close();
};

const openPannel = () => {
  nextTick(() => {
    officialAccountPopup.value.open();
  });
};

const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  param.value.start = pageNo - 1;
  param.value.pageSize = pageSize;
  const data = await apiGetProductFilterData(param.value);
  paging.value.complete(data.goodslists || []);
};

const goPage = async (path) => {
  console.log('path',path)
  if (isClicking.value) return;

  isClicking.value = true;
  let res = null;

  // if (path === 'pagesClassify/classify/classify') {
  //   res = await getClassifyPagingData({
  //     classid: '1',
  //     brandid: '1',
  //     seriesid: '',
  //     start: 0
  //   });
  // }

  const url = path === 'pagesClassify/classify/classify' 
    ? `/${path}?res=${encodeURIComponent(JSON.stringify(res))}` 
    : `/${path}`;
  console.log('url',url)
  uni.navigateTo({ url });

  setTimeout(() => {
    isClicking.value = false;
  }, 1000);
};

const getClassifyPagingData = async (param) => {
  const res = await apiGetClasstify(param);
  return res.code === '200' ? res : false;
};

const getHomeMenus = async () => {
  const sessionInfo = uni.getStorageSync('sessionInfo');
  const data = {
    opid: sessionInfo.opid,
    unionid: sessionInfo.unionid
  };
  const res = await apiHomeMenus(data);
  
  if (res.code === '200') {
    dhlist.value = res.dhlist;
    showPannel.value = !res.usinfos?.gzhopid&&(res.zt==2);
	console.log('关注',showPannel.value)
    if (officialAccountPopup.value) {
      showPannel.value ? officialAccountPopup.value.open() : officialAccountPopup.value.close();
    }
  }
  return res;
};

const getApiRouter = async (userInfoRes) => {
  const db = uniCloud.database();
  const userSetting = await db.collection('user-setting').where({ user_id: userInfoRes.id }).get();
  console.log('userSetting',userSetting)
  if (userSetting.result.data.length > 0) {
    const { adminLx, adminId, identityData, selectedMine } = userSetting.result.data[0];
    uni.setStorageSync('adminLx', adminLx);
    uni.setStorageSync('adminId', adminId);
    uni.setStorageSync('identityData', identityData);
    uni.setStorageSync('selectedMine', selectedMine);
  }
  return userSetting.result.data;
};

onShow(async () => {
  useTabStore().setCurrentTabIndex(0);
  await getHomeMenus();
  if (paging && paging.value) {
    paging.value.refresh(true);
  }
});

onReady(() => {
  setTimeout(() => {
    useUserStore().getInfo().then(userInfoRes => {
      return Promise.all([getHomeMenus(), getApiRouter(userInfoRes)]);
    });
  }, 1000);
});

</script>


<style lang="scss" scoped>
.homeLayout {
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}

	background: #f3f2f6;
	.banner {
		margin-top: 20rpx;
		width: 750rpx;
		padding: 15rpx 0;
		swiper {
			width: 750rpx;
			height: 200rpx;
			&-item {
				width: 100%;
				height: 100%;
				padding: 0 20rpx;
				.banner-image {
					width: 100%;
					height: 100%;
					box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
					border-radius: 20rpx;
					background: #f86e0b;
				}
			}
		}
	}

	.home-menu {
		width: 740rpx;
		margin-top: 35rpx;
		margin-left: 20rpx;
		scroll-view {
			white-space: nowrap;
			.box {
				width: 125rpx;
				height: 130rpx;
				display: inline-block;
				margin-right: 15rpx;
				.menu-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.menu-image {
						// border: 1rpx solid pink;
						width: 60rpx;
						height: 60rpx;
						border-radius: 10rpx;
						margin-bottom: 10rpx;
					}
					.menu-text {
						margin-top: 10rpx;
						height: 34rpx;
						width: 96rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 24rpx;
						color: #1f1f1f;
						text-align: center;
					}
				}
			}
			// .box:last-child{margin-right: 30rpx;}
			.box:first-child {
				margin-left: -10rpx;
			}
		}
	}

	.menu-card {
		margin-top: 30rpx;
		box-sizing: border-box;
		width: 750rpx;
		height: 382rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		.left {
			image {
				height: 382rpx;
				width: 344rpx;
				border-radius: 20rpx;
				background: #e5d1d1;
				// box-shadow:  20rpx 20rpx 59rpx #c3b2b2,
				//              -20rpx -20rpx 59rpx #fff0f0;
				box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
			}
			margin-right: 22rpx;
		}
		.right {
			display: flex;
			flex-direction: column;
			.right-top {
				box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				height: 180rpx;
				width: 346rpx;
			}
			.right-bottom {
				box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				height: 180rpx;
				width: 346rpx;
				margin-top: 22rpx;
			}
		}
	}

	.theme {
		margin-top: 30rpx;
		// border: 2rpx solid red
		// padding: 30rpx 0
		// padding: 15rpx 30rpx;
		padding: 15rpx 20rpx;
		display: flex;
		flex-direction: column;

		.title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			height: 50rpx;
			.left {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #2e2e2e;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}
			.right {
				.right-text {
					height: 36rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #2e2e2e;
					text-align: right;
					font-style: normal;
					text-transform: none;
					margin-right: 10rpx;
					opacity: 0.4;
				}
				.right-image {
					height: 20rpx;
					width: 12rpx;
				}
			}
		}
		.content {
			margin-top: 22rpx;
			.card {
				margin-top: 10rpx;
			}
		}
	}

	.service-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5rpx 20rpx;
		.customer-service {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.cusService {
				height: 128rpx;
				width: 345rpx;
				position: absolute;
				border-radius: 20rpx;
				opacity: 0;
			}
			image {
				width: 345rpx;
				height: 128rpx;
				border-radius: 20rpx;
			}
		}
		.join-us {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			image {
				height: 128rpx;
				width: 345rpx;
				border-radius: 20rpx;
			}
		}
	}
}


$show-lines: 1;
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
.waterfall-item {
	overflow: hidden;
	margin-top: 10px;
	border-radius: 20rpx;
	
}

.waterfall-title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
	height: 50rpx;
	margin-top: 50rpx;
	margin-bottom: 30rpx;
	.left {
		height: 44rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 32rpx;
		color: #2e2e2e;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}
	.right {
		.right-text {
			height: 36rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			color: #2e2e2e;
			text-align: right;
			font-style: normal;
			text-transform: none;
			margin-right: 10rpx;
			opacity: 0.4;
		}
		.right-image {
			height: 20rpx;
			width: 12rpx;
		}
	}
}

.waterfall-item__ft {
	padding: 20rpx;
	background: #fff;
	&__title {
		margin-bottom: 10rpx;
		line-height: 48rpx;
		font-weight: 700;
		.value {
			font-size: 32rpx;
			color: #303133;
		}
	}
	&__desc .value {
		font-size: 28rpx;
		color: #606266;
	}
	&__btn {
		padding: 10px 0;
	}
}
</style>
