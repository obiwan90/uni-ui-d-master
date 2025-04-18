<template>
<view v-if="isShow">
	<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
</view>
<view class="userMine-layout">
	<!-- header -->
	<view class="header">
		<!-- 状态栏 -->
		<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
		<!-- 标题栏 -->
		<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
			<text>个人中心</text>
			<!-- <view class="images">
				<image src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill"  @click="scanCode"></image>
				<image src="/pagesUserMine/static/icon_car@3x.png" mode="aspectFill" @click="goPage('/pagesShopCar/shopCar/shopCar')"></image>
			</view> -->
		</view>
	</view>
	<!-- title animation: bounceInRight 1s ease-in-out;-->
	<view v-if="userInfo" class="title" style="height: 120rpx;animation: fadeIn 1s ease-in-out;">
		<view class="left" @click="editeUser">
			<image :src="userInfo.img===''?'https://www.xzxskj.com/xcximg/132.jpg':'https://www.xzxskj.com'+userInfo.img" mode="aspectFill"></image>
			<view class="tab">
				<text class="text-1">{{userInfo.nik_name===''?'微信用户':userInfo.nik_name}}</text>
				<text class="text-2">{{userInfo.phone}}</text>
			</view>
		</view>
		
		<!-- <view class="right"  @click="goPage('/pagesCustomMine/customMine/customMine')"> -->
		<view v-if="showSwitch" class="right"   @click="openIdentity">
			<image src="https://www.xzxskj.com/xcximg/qiehuan.png" mode="aspectFill"></image>
			<text>切换身份</text>
		</view>
	</view>
	
	<view v-else class="title" style="height: 120rpx;">
		
	</view>
	
	<scroll-view 
	    scroll-y 
	    style="height: 1125rpx;" 
	    refresher-enabled="true" 
	    :refresher-triggered="triggered" 
	    @refresherpulling="onPulling" 
	    @refresherrefresh="onRefresh" 
	    @refresherrestore="onRestore"
	>

		<view class="account-card">
			<view class="title">
				<view class="left">
					<text>我的账户</text>
				</view>
				<view class="right" @click="goPage('/pagesAccount/account/account?from=user')">
					<text>账单管理</text>
				</view>
			</view>
			<view class="card-bottom">
				<view class="account-mini-card" v-for="(item,index) in mini_card_data" :key="index">
					<view class="top">
						<text>¥{{item.price}}</text>
					</view>
					<view class="bottom">
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- mine-order -->
		<view class="mine-orders">
			<view class="top">
				<view class="box" v-for="(item,index) in mine_card_datas" :key="index" @click="toggleSelected(index)">
				  <uni-badge class="badge" size="small" :text="item.num" :inverted="item.num==='0'||item.selected" absolute="rightTop" type="error"
					 :custom-style="{ color:'#ffffff' }"
				  >
				    <text :class="{ 'selected-text': item.selected }">{{item.title}}</text>
				  </uni-badge>
				</view>
			</view>
			
			<view class="content" :style="contentPadding">
				  <view class="menu-card" v-for="(item1,index) in currentValues"  :key="index" @click="goPage(item1.path)">
					  
					<uni-badge class="badge" size="small" :text="item1.num" :inverted="item1.num==='0'?true:false" absolute="rightTop" type="error"
					 :custom-style="{ color:'#ffffff' }"
					>
					  <image :src="item1.image" mode="aspectFill"></image>
					</uni-badge>
					  
					<!-- <image :src="item1.image" mode="aspectFill"></image> -->
					<text>{{item1.text}}</text>
				  </view>
			</view>
		</view>
		

		<!-- market-card -->
		<!-- <view class="market-card">
			<view class="top">
				<view class="left">
					<text>自由市场</text>
				</view>
				<view class="right"  @click="selectSetting">
					<text>设置</text>
				</view>
			</view>
			<view class="bottom">
				<view class="market-mini-card" v-for="(item,index) in market_card_data" :key="index" @click="goMarket(index)">
					<view class="left">
						<text>{{item.text}}</text>
					</view>
					<view class="right">
						<text>{{item.value}}</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- setting-card -->
		<view class="setting-card" v-for="(item,index) in settings_data" :key="index">
			<view class="top">
				<text>{{item.title}}</text>
			</view>
			<view class="bottom">
				<view class="setting-menu-card" v-for="(item1,index) in item.value" :key="index"  @click="goPage(item1.path)">
					<image :src="item1.image" mode="aspectFit"></image>
					<text>{{item1.text}}</text>
					<button v-if="item1.text==='平台客服'" class="cusService" open-type="contact" @contact="onContact" send-message-title="" show-message-card plain>客服</button>
				</view>
			</view>
		</view>
		
		<view style="height: 30rpx;">
			
		</view>
	</scroll-view>
	<!-- <uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="settingPopup" safe-area:false type="center" @close="handleClose" @change="change">
		<view >
			<marketUserSetting v-if="showSetting" @close="handleClose" ></marketUserSetting>
		</view>
	</uni-popup> -->
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="identityPopup" safe-area:false type="center" @close="handleClose" @change="change">
		<view >
			<identity-pannel v-if="showIdentity" @close="handleClose"></identity-pannel>
		</view>
	</uni-popup>
</view>
<custom-tabbar></custom-tabbar>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore';
import { useUserStore } from '@/stores/userInfoStore.js';
import { getStatusBarHeight, getTitleBarHeight, getLeftIconLeft } from '@/utils/system.js';

const isShow = ref(false);
const showSetting = ref(false);
const showIdentity = ref(false);
const identityPopup = ref(null);
const userInfo = ref(null);
const showSwitch = ref(false);
const triggered = ref(false);
let _freshing = false;

// Data setup
const mini_card_data = ref([
  { price: '0', text: '账户金额' },
  { price: '0', text: '冻结金额' },
  { price: '0', text: '可用金额' },
]);

const mine_card_datas = ref([
  {
    title: '采购订单',
    num: '0',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_daifukuan@3x.png', text: '待付款', lx: '3', path: '/pagesOrder/order/order?order=3', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_daifahuo@3x.png', text: '待发货', lx: '4', path: '/pagesOrder/order/order?order=4', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_daishouhuo@3x.png', text: '待收货', lx: '5', path: '/pagesOrder/order/order?order=5', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_yishouhou1@3x.png', text: '已收货', lx: '6', path: '/pagesOrder/order/order?order=6', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_jianyiwancheng@3x.png', text: '交易完成', lx: '7', path: '/pagesOrder/order/order?order=7', num: '0' },
    ],
    selected: true
  },
  {
    title: '议价订单',
    num: '0',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiazh@3x.png', text: '议价中', lx: '2', path: '/pagesOrder/order/order?yj=2', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiacg@3x.png', text: '议价成功', lx: '3', path: '/pagesOrder/order/order?yj=3', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiasb@3x.png', text: '议价失败', lx: '4', path: '/pagesOrder/order/order?yj=4', num: '0' },
    ],
    selected: false
  },
  {
    title: '售后订单',
    num: '0',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '售后中', lx: '2', path: '/pagesOrder/order/order?sh=2', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png', text: '售后成功', lx: '3', path: '/pagesOrder/order/order?sh=3', num: '0' },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '售后失败', lx: '4', path: '/pagesOrder/order/order?sh=4', num: '0' },
    ],
    selected: false
  }
]);

const settings_data = ref([
  { title: '更多功能', value: [
      { text: '我的发布', image: 'https://www.xzxskj.com/xcximg/icon__fabu@3x.png', path: '/pagesMarketCount/marketCount/marketCount' },
      { text: '收款账户', image: 'https://www.xzxskj.com/xcximg/icon_zhanghu@3x.png', path: '/pagesPayAccount/payAccount/payAccount' },
      { text: '商户信息', image: 'https://www.xzxskj.com/xcximg/icon_shop@3x.png', path: '/pagesMenber/menber/menber' },
      { text: '地址管理', image: 'https://www.xzxskj.com/xcximg/icon_dizhi@3x.png', path: '/pagesAddress/address/address' },
      { text: '采购须知', image: 'https://www.xzxskj.com/xcximg/icon_caigou@3x.png', path: '/pagesProcurementDescription/procurementDescription/procurementDescription' },
      { text: '成色说明', image: 'https://www.xzxskj.com/xcximg/icon_chengse@3x.png', path: '/pagesFineness/fineness/fineness' },
      { text: '售后规则', image: 'https://www.xzxskj.com/xcximg/icon_shouhou1@3x.png', path: '/pagesAftersalesRules/aftersalesRules/aftersalesRules' },
      { text: '平台客服', image: 'https://www.xzxskj.com/xcximg/icon_kefu@3x.png' },
      { text: '招商加盟', image: 'https://www.xzxskj.com/xcximg/icon_jiameng@3x.png' },
      { text: '投诉建议', image: 'https://www.xzxskj.com/xcximg/icon_tousu@3x.png', path: '/pagesSuggest/suggest/suggest?title=投诉建议' },
      { text: '购物车', image: 'https://www.xzxskj.com/xcximg/icon_car@3x.png', path: '/pagesShopCar/shopCar/shopCar' },
  ]}
]);

const currentValues = computed(() => {
  const selectedItem = mine_card_datas.value.find(item => item.selected);
  return selectedItem ? selectedItem.values : [];
});

const contentPadding = computed(() => {
  const selectedIndex = mine_card_datas.value.findIndex(item => item.selected);
  return (selectedIndex === 1 || selectedIndex === 2) ? { paddingLeft: '76rpx', paddingRight: '62rpx' } : {};
});

// Methods
const toggleSelected = (index) => {
  mine_card_datas.value.forEach((item, i) => item.selected = (i === index));
};

const handleClose = () => {
  console.log('Popup is closed');
  identityPopup.value.close();
};

const openIdentity = () => {
  console.log('Popup is open');
  showIdentity.value = true;
  identityPopup.value.open();
};

const goPage = (path) => {
  uni.navigateTo({ url: path });
};

const editeUser = () => {
  uni.navigateTo({ url: '/pagesMenber/menber/menber' });
};

const beforeleave = () => {
  isShow.value = false;
  uni.navigateBack({ delta: getCurrentPages().length - 1 });
  // uni.showModal({
  //   content: '角色已保存',
  //   showCancel: false,
  //   success: (res) => {
  //     if (!res.cancel) {
  //       console.log('用户点击了确认');
  //     }
  //   }
  // });
};

const onPulling = (e) => {
  console.log("正在下拉...", e);
  if (e.detail.deltaY < 0) return;
  triggered.value = true;
};

const onRefresh = async () => {
  if (_freshing) return;
  _freshing = true;
  if (!triggered.value) triggered.value = true;

  userInfo.value = await useUserStore().getInfo();
  updateOrderData();
  showSwitch.value = userInfo.value.joininfos && userInfo.value.joininfos.length > 0;
  setTimeout(() => {
    triggered.value = false;
    _freshing = false;
  }, 1000);
};

const updateOrderData = () => {
  const infos = uni.getStorageSync('infos');
  if (infos) {
    mine_card_datas.value[0].num = infos.zordernum;
    mine_card_datas.value[1].num = infos.zyjordernum;
    mine_card_datas.value[2].num = infos.zshordernum;
    mine_card_datas.value[0].values[0].num = infos.dfk;
    mine_card_datas.value[0].values[1].num = infos.dfh;
    mine_card_datas.value[0].values[2].num = infos.dsh;
    mine_card_datas.value[1].values[0].num = infos.yjz;
    mine_card_datas.value[2].values[0].num = infos.shz;
  }
};

const onRestore = () => {
  console.log("刷新完成，恢复状态");
  triggered.value = false;
};

onMounted(() => {
  userInfo.value = JSON.parse(uni.getStorageSync('userInfo'));
  updateOrderData();
  showSwitch.value = userInfo.value.joininfos && userInfo.value.joininfos.length > 0;
  useTabStore().setCurrentTabIndex(4);
});

onLoad((option) => {
  if (option.from && option.from === 'identity') {
    isShow.value = true;
  }
});

onShow(() => {
  useTabStore().setCurrentTabIndex(4);
});
</script>


<style lang="scss" scoped>


.userMine-layout{
	height: 100%;
	box-sizing: border-box;
	width: 750rpx;
	// background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	background-image: url('https://www.xzxskj.com/Public/upload/66123aa39807d5904.png');
	background-position: center;
	background-size: cover;
	
	.mine-orders{
		margin-top: 20rpx;
		margin-left: 20rpx;
		box-sizing: border-box;
		width: 710rpx;
		height: 244rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding:30rpx 24rpx;
 		.top{
			width: 100%;
			display: flex;
			align-items: center;
			.box{
				transition: all 0.3s;
				margin-right: 40rpx;
				.selected-text {
				  transition: all 0.3s;
				  font-family: PingFang SC, PingFang SC;
				  font-weight: bold;
				  font-size: 32rpx;
				  color: #1F1F1F;
				  opacity: 1;
				}
				text {
				  transition: all 0.3s;
				  font-family: PingFang SC, PingFang SC;
				  font-weight: bold;
				  font-size: 28rpx;
				  color: #1F1F1F;
				  text-align: left;
				  opacity: 0.6;
				}
			}
		}
		.content{
			// border: 1rpx solid red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			animation: fadeIn 1.5s ease-in-out;
			.menu-card{
				// border: 1rpx solid black;
				animation: fadeIn 1.5s ease-in-out;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 112rpx;
				image{
					height: 48rpx;
					width: 48rpx;
				}
				text{
					margin-top: 14rpx;	
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
		}
		@keyframes fadeIn {
		  from {
		    opacity: 0;
		  }
		  to {
		    opacity: 1;
		  }
		}
		@keyframes slideInRight {
		  from {
		    transform: translateX(100%);
		  }
		  to {
		    transform: translateX(0);
		  }
		}
		@keyframes scaleIn {
		  from {
			transform: scale(0);
		  }
		  to {
			transform: scale(1);
		  }
		}
	}
	.header {
		.titleBar {
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.images{
				margin-right: 160rpx;
				display: flex;
				image{
					height: 64rpx;
					width: 64rpx;
				}
			}
			.title-tip {
				display: flex;
				align-items: center;
				justify-content: center;
				.tip-btn {
					position: absolute;
					opacity: 0;
				}
			}
			.tip-image {
				height: 24rpx;
				width: 24rpx;
			}
	
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
			text {
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
	}
	.title{
		// border: 1rpx solid black;
		
		margin-top: 42rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			align-items: center;
			image{
				height: 108rpx;
				width: 108rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
			.tab{
				height: 108rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;
				.text-1{
					height: 56rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 40rpx;
					color: #1F1F1F;
				}
				.text-2{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 28rpx;
					color: #1F1F1F;
				}
			}
		}
		.right{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				opacity: 0.4;
			}
			image{
				height: 24rpx;
				width: 24rpx;
				// border: 1rpx solid black;
				margin-right: 10rpx;
			}
		}
	}
	.account-card{
		background: #282839;
		height: 238rpx;
		width: 710rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		// margin-top: 28rpx;
		margin-top: 15rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			.left{
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
			.right{
				text{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #FFFFFF;
					opacity: 0.7;
				}
			}
		}
		.card-bottom{
			display: grid;
			grid-template-columns: 33.33% 33.33% 33.33%;
			margin-left: 24rpx;
			.account-mini-card{
				width: 206rpx;
				height: 104rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				
 				.top{
					text{
						height: 44rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 32rpx;
						color: #1F1F1F;
					}
				}
				.bottom{
					text{
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #1F1F1F;
						opacity: 0.6;
					}
				}
			}
		}
	}
	.mine-order{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		height: 244rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		.top{
			
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				margin-left: 24rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				margin-right: 24rpx;
				text{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					opacity: 0.5;
				}
			}
		}
		.bottom{
			width: 100%;
			margin-top: 40rpx;
			display: grid;
			grid-template-columns: 20% 20% 20% 20% 20%;
			.menu_card{
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					height: 48rpx;
					width: 48rpx;
					margin-bottom: 14rpx;
					box-shadow: 6rpx 6rpx 20rpx 2rpx rgba(0,0,0,0.2);
		
				}
				text{
					
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #1F1F1F;
				}
			}
		}
	}
	.market-card{
		margin-top: 20rpx;
		margin-left: 20rpx;
		box-sizing: border-box;
		width: 710rpx;
		height: 218rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top{
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			.left{
				margin-left: 24rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				margin-right: 24rpx;
				text{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					opacity: 0.5;
				}
			}
		}
		.bottom{
			width: 100%;
			display: grid;
			box-sizing: border-box;
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			padding-left: 24rpx;
			padding-right: 24rpx;
			.market-mini-card{
				margin-top: 30rpx;
				width: 206rpx;
				height: 84rpx;
				background: linear-gradient( 180deg, #EEFCEF 0%, #FBFFF8 100%);
				box-shadow: 6rpx 6rpx 20rpx 2rpx rgba(0,0,0,0.08);
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				.left{
					margin-left: 20rpx;
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
				.right{
					margin-right: 20rpx;
					text{
						height: 44rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 32rpx;
						color: #1F1F1F;
					}
				}
			}
			.market-mini-card:nth-child(2) {
			  background: linear-gradient( 180deg, #E6EFFF 0%, #FBFBFD 100%);
			}
		}
	}
	.setting-card{
		width: 710rpx;
		// height: 238rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		margin-top: 20rpx;
		margin-left: 20rpx;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top:30rpx;
		padding-bottom: 30rpx;
		
		.top{
			margin-bottom: 40rpx;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
			}
		}
		.bottom{
			display: grid;
			width: 100%;
			grid-template-columns: auto auto auto auto;
			justify-content: space-between;
			grid-row-gap:44rpx;
			.setting-menu-card{
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					height: 44rpx;
					width: 44rpx;
					margin-bottom: 16rpx;
				}
				text{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					opacity: 0.7;
				}
			}
		}
	}

}
.cusService{
	// border: 1rpx solid red;
	position: absolute;
	border-radius: 20rpx;
	opacity: 0;
}
</style>