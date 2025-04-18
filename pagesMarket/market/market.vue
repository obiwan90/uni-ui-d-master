<template>
	<view class="layout pageBg">
		<!-- header -->
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<text>自由市场</text>
			</view>
		</view>
		<!-- 搜索栏 -->
		<view class="search">
			<view class="searchBar">
				<picker @change="onRegionChange" class="position" mode="region" custom-item="不限" :value="pickerValue">
					<text v-if="pickerValue" class="position-text">{{ pickerValue }}</text>
					<text v-else class="position-text">定位中</text>
					<image class="position-image" src="https://www.xzxskj.com/xcximg/icon_xiala@3x.png" mode="aspectFill"></image>
				</picker>
				<view class="inline"/>
				<view class="search-content">
					<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
					<text class="search-content-text">iphone 5</text>
				</view>
			</view>
			<view class="select-btn" @click="openSaixuan">
				<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		<view style="height: 1300rpx">
		<z-paging ref="paging" :fixed="false" v-model="dataList" @query="queryList" :loading-more-custom-style="{'background':'#f3f2f6'}" :default-page-size = "10">
			<!-- market-card -->
			<view class="market-card" @click="goPage(item.type,item)" v-for="(item,index) in marketList" :key="index" v-if="marketList">
				<view class="top">
					<view class="left">
						<image src="https://www.xzxskj.com/xcximg/img_touxiang@3x.png" mode="aspectFill"></image>
						<text>{{item.username}}</text>
					</view>
					<view class="right">
						<text>{{formatTimestampToHours(parseInt(item.add_time))}}</text>
					</view>
				</view>
				
				<view class="taps">
					<view class="left">
						<image  v-if="item.type===1" src="https://www.xzxskj.com/xcximg/icon_maihuo@3x.png" mode="aspectFill"></image>
						<image  v-if="item.type===2" src="https://www.xzxskj.com/xcximg/icon_qiuhuo@3x.png" mode="aspectFill"></image>
						<image  v-if="item.type===3" src="https://www.xzxskj.com/xcximg/icon_jiaoliu@3x.png" mode="aspectFill"></image>
						<view class="cus-tap">
							<text>{{item.fineness}}</text>
						</view>
					</view>
					<view class="right" v-if="item.type===1">
						<text class="text-1">卖货价:</text>
						<text class="text-2">¥</text>
						<text class="text-3">{{item.price}}</text>
						<text class="text-4">/台</text>
					</view>
					<view class="right"  v-if="item.type===2">
						<text class="text-1">求货价:</text>
						<text class="text-5">电议</text>
					</view>
				</view>
				<view class="title">
					<text>{{item.fullname}}</text>
				</view>
				<view class="photos">
					<!-- {{item}} -->
					<!-- {{item.images}} -->
					<view class="photo" v-for="(item1,index) in item.img.split(',').slice(0, 3)" :key="index">
						<image :src="item1" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</z-paging>
		</view>
		<!-- <custom-tabbar :showShop="true"></custom-tabbar> -->
		<!-- <marketBar></marketBar> -->
		
		<!-- 设置面板 -->
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="settingPopup" safe-area:false type="center" @close="handleClose" @change="change">
			<view >
				<settingPannel v-if="showSetting" @close="handleClose" ></settingPannel>
			</view>
		</uni-popup>
		<!-- 赛选面板 -->
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saixuanPopup" safe-area:false type="bottom" @close="handleClose" @change="change">
			<view >
				<saixuanPannel v-if="showSaixuan" @close="handleClose"></saixuanPannel>
			</view>
		</uni-popup>
		
	</view>
</template>

<script setup>
import { apigetMarket } from '../api/api.js';
import { settingPannel } from './components/settingPannel.vue'
import { saixuanPannel } from './components/saixuanPannel.vue'
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { useLocationStore } from "@/stores/locationStore.js"
import { onMounted } from 'vue';
const paging = ref(null)
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  // param.value.start = pageNo-1
  await	getMarket()
  paging.value.complete(marketList.value);
};

const showSaixuan = ref(false)
const showSetting = ref(false)
const data = ref([
	{type:1,name:'压缩',time:'2小时前',price:'14120',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑',Images:2},
	{type:2,name:'压缩',time:'2小时前',price:'',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为',Images:3},
	{type:3,name:'压缩',time:'2小时前',price:'',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为',Images:1},
	{type:2,name:'压缩',time:'2小时前',price:'',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为',Images:2},
	{type:2,name:'压缩',time:'2小时前',price:'',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为',Images:1},
	{type:2,name:'压缩',time:'2小时前',price:'',title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为',Images:3},
])
const settingPopup = ref(null)
const saixuanPopup = ref(null)
const showPannel = ref(false);
const form = ref({
	fullLocation: '', // 省市区(前端展示)
	province: '', // 省份编码(后端参数)
	city: '', // 城市编码(后端参数)
	region: '', // 区/县编码(后端参数)
	address: '', // 详细地址
	postCode: '', // 邮编
	longitude: '', // 经度
	latitude: '', // 纬度
	name: '' // 地址名称
});
const onRegionChange = (ev) => {
	const [province, city, region] = ev.detail.value;
	const postCode = ev.detail.code;
	form.value = { ...form.value, province, city, region, postCode, fullLocation: `${city} ${region}` };
	console.log('form:' + JSON.stringify(form.value));
};
const pickerValue = computed(() => {
	return form.value.region !== '不限' ? form.value.region : form.value.city !== '不限' ? form.value.city : form.value.province !== '不限' ? form.value.province : '全国';
});
const handleClose = () => {
	console.log('Popup is closed');
	// showSaixuan.value = false
	// showSetting
	settingPopup.value.close();
	saixuanPopup.value.close();
};
const change = (e) => {
	showPannel.value = e.show;
};
const selectSetting = ()=>{
	settingPopup.value.open();
}
const openSaixuan = ()=>{
	showSaixuan.value = true
	saixuanPopup.value.open();
}
const goPage = (type, item) => {
    const itemString = JSON.stringify(item);
    if (type === '1') {
        uni.navigateTo({
            url: `/pagesSell/sell/sell?item=${encodeURIComponent(itemString)}`
        });
    }
    if (type === '2') {
        uni.navigateTo({
            url: `/pagesSeeking/seeking/seeking?item=${encodeURIComponent(itemString)}`
        });
    }
}

const  marketList = ref([])
const getMarket =async ()=>{
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
	}
	const res =await apigetMarket(data)
	if(res.code === '200'){
		marketList.value = res.lists
	}
	console.log('market res:',res);
}
function formatTimestampToHours(timestamp) {
  const currentTime = Math.floor(Date.now() / 1000); 
  const timeDifference = currentTime - timestamp;
  const hours = Math.floor(timeDifference / 3600); 
  if (hours < 1) {
    return '刚刚'; 
  } else {
    return `${hours}小时前`; 
  }
}
// onLoad(async()=>{
// 	form.value = await useLocationStore().getForm()
// 	const messageSetting = uni.getStorageSync('messageSetting')
// 	console.log('messageSetting:',messageSetting.messageType.length>0);
// 	if(messageSetting.messageType.length === 0||messageSetting.phone===""){
// 		showSetting.value = true
// 		settingPopup.value.open()
// 	}
// 	getMarket()
// })
// onMounted(()=>{
// 	getMarket()
// })
</script>

<style lang="scss" scoped>
.layout {
	height: 100vh;
	box-sizing: border-box;
	width: 750rpx;
	background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	.header {
		.titleBar {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
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
				width: 160rpx;
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
				margin-right: 10rpx;
			}
		}
	}
	
	.search {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 72rpx;
		width: 750rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-bottom: 20rpx;
		.searchBar {
			width: 618rpx;
			height: 72rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border: 2rpx solid #242424;
			display: flex;
			align-items: center;

			.position {
				padding: 0 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.position-text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.position-image {
					margin-left: 10rpx;
					width: 20rpx;
					height: 20rpx;
				}
			}
			.inline {
				width: 2rpx;
				height: 28rpx;
				background: #eeeeee;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
			}
			.search-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 20rpx;
				.search-image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 15rpx;
				}
				.search-content-text {
					height: 36rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #1f1f1f;
					opacity: 0.6;
				}
			}
		}
		.select-btn {
			width: 72rpx;
			height: 72rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255, 255, 255, 0.16);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				height: 36rpx;
				width: 32rpx;
			}
		}
	}
	.market-card{
		box-sizing: border-box;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin:24rpx 20rpx;
		display:flex;
		flex-direction: column;
		padding: 24rpx 20rpx;
		.top{
			display: flex;
			
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				image{
					width: 64rpx;
					height: 64rpx;
					border-radius: 40rpx 40rpx 40rpx 40rpx;
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
				text{
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #AAAAAA;
				}
			}
		}
		.taps{
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				image{
					height: 38rpx;
					width: 52rpx;
					margin-right: 10rpx;
				}
				.cus-tap{
					display: flex;
					align-items: center;
					justify-content: center;
					height: 38rpx;
					background: linear-gradient( 132deg, #FFA187 0%, #FFD3B5 100%);
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					opacity: 0.45;
					text{
						height: 32rpx;
						font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
						font-weight: 400;
						font-size: 24rpx;
						color: #EB4636;
					}
				}
			}
			.right{
				display: flex;
				justify-content: center;
				align-items: center;
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
				.text-2{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #E6432E;
				}
				.text-3{
					height: 48rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 40rpx;
					color: #E6432E;
					margin-bottom: 8rpx;
				}
				.text-4{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
				.text-5{
					height: 56rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 40rpx;
					color: #E6432E;
					text-align: left;	
				}
			}
		
		}
		.title{
			margin-top: 20rpx;
			text{
				height: 96rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				line-height: 52rpx;
			}
			
		}
		.photos{
			display: grid;
			grid-template-columns: 33.33% 33.33% 33.33%;
			justify-content: space-between;
			.photo{
				margin-top: 24rpx;
				width: 214rpx;
				height: 214rpx;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				
				image{
					height: 100%;
					width: 100%;
				}
			}
		}
	
		.tab-bar{
			box-sizing: border-box;
			border: 1rpx solid black;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 192rpx;
			width: 100%;
			.top{
				width: 132rpx;
				height: 26rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.08);
			}
			
			.bottom{
				width: 750rpx;
				height: 166rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.08);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
			}
		}
	
	}

}
</style>
