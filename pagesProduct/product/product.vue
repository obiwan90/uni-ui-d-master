<template>
	<view class="product">
		<z-paging ref="paging" :default-page-size = "20" show-refresher-update-time v-model="dataList" @query="queryList">
		<template #top>
			<view class="header">
				<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
				<view class="titleBar" style="display: flex;align-items: center;width: 100%;" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
					<image src="https://www.xzxskj.com/xcximg/icon_back@3x.png" @click="goBack" mode="aspectFill"></image>
					<text @click="goBack">{{title}}</text>
				</view>
			</view>
		</template>
		<!-- serach -->
		<view class="search">
			<image src="https://www.xzxskj.com/xcximg/icon_search@3x.png" mode="aspectFill"></image>
			<input v-model="searchInput" placeholder="请输入型号" class="search-input" />
		</view>
		<!-- banner -->	
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay>
				<swiper-item>
					<image class="banner-image" src="https://www.xzxskj.com/xcximg/banner1@3x.png" mode="scaleToFill"></image>
				</swiper-item>
				<swiper-item>
					<image class="banner-image" src="https://www.xzxskj.com/xcximg/banner1@3x.png" mode="scaleToFill"></image>
				</swiper-item>
				<swiper-item>
					<image class="banner-image" src="https://www.xzxskj.com/xcximg/banner1@3x.png" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="select">
			<view class="select-box1">
				<picker @change="onRegionChange" class="position" mode="region" custom-item="不限" :value="pickerValue">
					<text class="select-box1" v-if="pickerValue">{{ pickerValue }}</text>
					<text v-else>定位中</text>
					<image class="select-box1-image" src="https://www.xzxskj.com/xcximg/icon_dingwei@3x.png" mode="aspectFit"></image>
				</picker>
			</view>
			<view class="select-box1">
				<picker :range="positionArray" @change="onSelectChange" mode="selector" :value="pickerMemberValue">
					<text>综合</text>
					<image src="https://www.xzxskj.com/xcximg/icon_xiala1@3x.png" mode="aspectFit"></image>
				</picker>
			</view>
			<view class="select-box1" @click="selectJX">
				<text>机型</text>
				<image src="https://www.xzxskj.com/xcximg/icon_jixing@3x.png" mode="aspectFit"></image>
			</view>
			<view class="select-box2" @click="selectPricesDesc">
				<text>价格</text>
				<view class="box-images">
					<transition-group name="flip" class="box-images">
						<image v-if="isAscending" :key="1" src="https://www.xzxskj.com/xcximg/icon_shang@3x.png" mode="aspectFit" :class="{ rotated: !isAscending }"></image>
						<image v-if="!isAscending" :key="2" src="https://www.xzxskj.com/xcximg/icon_xialaProduct@3x.png" mode="aspectFit" :class="{ rotated:!isAscending }"></image>
						<image v-if="!isAscending" :key="3" src="https://www.xzxskj.com/xcximg/icon_shang@3x.png" mode="aspectFit" :class="{ rotated:!isAscending }"></image>
						<image v-if="isAscending" :key="4" src="https://www.xzxskj.com/xcximg/icon_xialaProduct@3x.png" mode="aspectFit" :class="{ rotated: !isAscending }"></image>
					</transition-group>
				</view>
			</view>
			<view class="select-box1" @click="selectSX">
				<text>筛选</text>
				<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- main -->
		<!-- <view class="main" style="height: 870rpx;"> -->
			<!-- <z-paging ref="paging" :default-page-size = "20" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList"> -->
		<productCard :showSetting="showSetting" class="product-card" :good ="item"  @openProductEditPrice="openEditPannel" v-for="(item, index) in dataList" :key="index"></productCard>
			<!-- </z-paging> -->
		<!-- </view> -->
		<template #bottom>
			<custom-shop-tabbar></custom-shop-tabbar>
		</template>
		</z-paging>
	</view>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saiXuanPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<saiXuanPannel :filterList="filterList" :colorItems="colorItems" @reLoad="reLoad" v-if="showSaiXuanPannel" @closePopup="handleClose"></saiXuanPannel>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="jixingPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<jixingPannel ref="jixingPannelRef" :modelId="param.ModelID" v-if="showJiXing" @reload4Jx="reload4Jx" @close="handleClose"></jixingPannel>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="productEditPricePopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<productEditPrice :selectedGood="selectedGood" @reLoad="reLoad" v-if="showProductEditPrice" @close="handleClose"></productEditPrice>
	</uni-popup>

</template>

<script setup>
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
import { useShare } from '../../utils/common.js';
import { getStatusBarHeight, getTitleBarHeight, getLeftIconLeft } from '@/utils/system.js';
import { apiGetProductFilterData, apiGetProductFilterList } from '@/api/product/product.js';
import { useLocationStore } from '@/stores/locationStore.js';
import { useTabStore } from '@/stores/tabStore';
import { debounce } from '@/utils/debounce.js';

import { jixingPannel } from './components/jixing.vue';
import { saiXuanPannel } from './components/saixuan.vue';
import { productCard } from './components/productCard.vue';
import { productEditPrice } from './components/productEditPrice.vue';

const goBack = () => uni.navigateBack();
const fetchData = async () => {
  try {
    filterList.value = [];
    colorItems.value = [];
    const res = await apiGetProductFilterList({ModelID:param.value.ModelID});
    if (res.code === '200') {
      setupFilterData(res);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const setupFilterData = (res) => {
  const categories = [
	{ name: '系统', id: '3', items: [{ id: '1', name: '苹果' }, { id: '2', name: '安卓' }] },
    { name: '分类', id: '1', items: res.classlist },
    { name: '品牌', id: '2', items: res.brandlist },
    { name: '资检渠道', id: '9', items: createZJQDList() },
	{ name: '成色', id: '6', items: res.finenesslist },
	{ name: '内存', id: '7', items: res.memorylist },
	{ name: '颜色', id: '8', items: res.colourlist },
	{ name: '版本', id: '5', items: res.versionlist },
	{ name: '价格', id: '4', items: createPriceList() },
    { name: '其他', id: '10', items: createOtherList() }
  ];
   if (param.value.ModelID) {
        const filteredCategories = [
       { name: '资检渠道', id: '9', items: createZJQDList() },
       { name: '成色', id: '6', items: res.finenesslist },
       { name: '内存', id: '7', items: res.memorylist },
       { name: '颜色', id: '8', items: res.colourlist },
       { name: '版本', id: '5', items: res.versionlist },
	   { name: '价格', id: '4', items: createPriceList() },
     ];
     filterList.value = filteredCategories.map(category => ({
       ...category,
       items: category.items.map(item => ({ ...item, selected: false }))
     }));
   } else {
     filterList.value = categories.map(category => ({
       ...category,
       items: category.items.map(item => ({ ...item, selected: false }))
     }));
   }
  colorItems.value = res.colourlist.map(item => ({ ...item, selected: false }));
};

const filterList = ref([]);
const colorItems = ref([]);
const dataList = ref([]);

const createPriceList = () => ([
  { id: '1', name: '0-1000' },
  { id: '2', name: '1001-2000' },
  { id: '3', name: '2001-3000' },
  { id: '4', name: '3001-4000' },
  { id: '5', name: '4001-5000' },
  { id: '6', name: '5000以上' }
]);

const createZJQDList = () => ([
  { id: '1', name: '官方质检' },
  { id: '2', name: '授权质检' },
  { id: '3', name: '自由货源' }
]);

const createOtherList = () => ([
  { id: '1', name: '只看特价' },
  { id: '2', name: '只看折叠' }
]);

const showSetting = computed(() => usePermissionStore().hasMenuAuthority('updategoods') && uni.getStorageSync('adminId') !== '');
const showJiXing = ref(false);
const showProductEditPrice = ref(false);
const showSaiXuanPannel = ref(true);

const gsid = ref('');
const paging = ref(null);
const searchInput = ref('');
const isAscending = ref(true);
const jixingPopup = ref(null);
const saiXuanPannelPopup = ref(null);
const productEditPricePopup = ref(null);
const selectedGood = ref();
const pickerMemberValue = ref();
const positionArray = ref(['最新上架', '距离最优']);
const title = ref('');
const form = ref({
  fullLocation: '',
  province: '',
  city: '',
  region: '',
  postCode: '',
  longitude: '',
  latitude: '',
  name: ''
});

const param = ref({
  brandid: '',
  classid: '',
  colourid: '',
  delivery: '',
  finenessid: '',
  gd: '',
  memoryid: '',
  newarrivals: '',
  price: '',
  pricesdesc: '',
  sftj: '',
  sfzd: '',
  start: '',
  systemid: '',
  versionid: '',
  ModelID: ''
});

const pickerValue = computed(() => {
  return form.value.region !== '不限' ? form.value.region
    : form.value.city !== '不限' ? form.value.city
    : form.value.province !== '不限' ? form.value.province
    : '全国';
});

const queryList = async (pageNo, pageSize) => {
  param.value.start = pageNo - 1;
  const dataPromise = apiGetProductFilterDataAc(param);
  // if (param.value.ModelID) fetchData();
  // fetchData()
  const data = await dataPromise;
  paging.value.complete(data);
};

const reload4Jx = (selected, selectedTabs) => {
	console.log('selected',selected)
	console.log('selectedTabs',selectedTabs)
	if(selected.length>0||selectedTabs.size){
		const selectedIds = selected.map(item => item.id);
		updateFilterParams(selectedTabs, selectedIds,selected);
	}else{
		console.log('重置了？')
		param.value.ModelID = ''
		param.value.sfzd = ''
		param.value.sftj = ''
		title.value = '商品列表'
	}
	paging.value.reload(true);
	fetchData()
};

const updateFilterParams = (selectedTabs, selectedIds,selected) => {
  param.value.ModelID = selectedTabs.has('全部机型') ? '' : selectedIds.join(',');
  param.value.sfzd = selectedTabs.has('折叠机型') ? '1' : '';
  param.value.sftj = selectedTabs.has('特价机型') ? '1' : '';
  title.value = (selectedTabs.size === 1||selected.length>1) ? '商品列表' : selected[0].xhname;
  
};

const reLoad = (data) => {
  if (data) {
	  console.log('param.value',param.value)
	  console.log('data.value',data)
    param.value = { ...param.value, ...data };
	console.log('param.value',param.value)
	
  }
  paging.value.reload(true);
};

const onRegionChange = (ev) => {
  const [province, city, region] = ev.detail.value;
  form.value = { ...form.value, province, city, region, fullLocation: `${province} ${city} ${region}` };
  param.value.delivery = `${province},${city},${region}`;
  paging.value.reload(true);
};

const onSelectChange = (e) => {
  pickerMemberValue.value = positionArray.value[e.detail.value];
  param.value.newarrivals = e.detail.value === 0 ? '1' : '2';
  param.value.pricesdesc = '';
  paging.value.reload(true);
};

const selectPricesDesc = () => {
  isAscending.value = !isAscending.value;
  param.value.pricesdesc = isAscending.value ? '1' : '2';
  param.value.newarrivals = '';
  paging.value.reload(true);
};

const showLoading = () => {
  uni.showLoading({
    title: '加载中',
    mask: true
  });
};

const hideLoading = () => {
  uni.hideLoading();
};


const selectJX = debounce(() => {
  showLoading();
  showJiXing.value = true;
  jixingPopup.value.open();
  setTimeout(() => hideLoading(), 800);
}, 1000,true);

const selectSX = debounce(() => {
  showLoading();
  showSaiXuanPannel.value = true;
  saiXuanPannelPopup.value.open();
  setTimeout(() => hideLoading(), 800);
}, 1000,true);

const openEditPannel = (goodData) => {
  selectedGood.value = goodData;
  showProductEditPrice.value = true;
  productEditPricePopup.value.open();
};

const handleClose = () => {
  saiXuanPannelPopup.value.close();
  jixingPopup.value.close();
  productEditPricePopup.value.close();
};

onLoad(async (options) => {
  form.value = await useLocationStore().getForm();
  Object.assign(param.value, {
    ModelID: options.id || '',
    sftj: options.sftj || '',
    sfzd: options.sfzd || '',
    classid: options.classid || '',
    newarrivals: options.newarrivals || ''
  });
  title.value = options.title || '商品列表';
  param.value.delivery = `${form.value.province},${form.value.city},${form.value.region}`;
  fetchData();
});

onShow(() => {
  usePermissionStore().loadMenuAuthority();
  useTabStore().setCurrentTabIndex(0);
});

const apiGetProductFilterDataAc = async (param) => {
  const res = await apiGetProductFilterData(param.value);
  if (res.code !== '200') return [];
  
  const goodList = res.goodslists;
  const adminId = uni.getStorageSync('adminId');
  const selectedMine = uni.getStorageSync('selectedMine');
  const identityData = uni.getStorageSync('identityData');

  if (adminId && selectedMine && identityData) {
    const selectedIdentity = identityData[selectedMine];
    return goodList.map(good => ({
      ...good,
      mineCompany: good.gsid === selectedIdentity.gsid
    }));
  }

  return goodList;
};

</script>




<style lang="scss" scoped>
.product {
view,
swiper,
swiper-item {
	box-sizing: border-box;
}
// background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 37%, #FFFFFF 100%);
// height: 100vh;
// background: #f3f2f6;
background: #f3f2f6;
min-height: 100vh;
.popup-content {
	width: 750rpx;
}

.saixuan_layout {

// height: 800rpx;
background: #ffffff;
box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
border-radius: 20rpx 20rpx 0rpx 0rpx;
display: flex;
flex-direction: column;
padding-top: 40rpx;
justify-content: space-between;
.card-tab {
	display: flex;
	flex-direction: column;
	margin-top: 20rpx;
	.collapse-title{
		text{
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #1F1F1F;
		}
	}
	.content{
		padding: 0 30rpx;
		display: grid;
		grid-template-columns: 33.3333% 33.3333% 33.3333%;
		row-gap: 18rpx;
		column-gap: 9rpx;
		
		
		.card-search{
		width: 218rpx;
		height: 64rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.put-text{
			height: 36rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			color: #1F1F1F;
			opacity: 0.6;
			// text-align: center;
		}
		
		image{
			height: 40rpx;
			width: 40rpx;
			margin-right: 10rpx;
			margin-left: 20rpx;
			opacity: 0.3;
		}
	}
		.card {
			width: 218rpx;
			height: 64rpx;
			background: #f9f9f9;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
			}
		}
	}
	
	
	
	.price-card {
		// border: 2rpx solid red;
		display: flex;
		// margin-top: 60rpx;
		flex-direction: column;
		padding: 0 30rpx;
		.price-card-title {
			width: 56rpx;
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #1f1f1f;
			margin-bottom: 20rpx;
		}
		.select-price-view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 18rpx;
			.select-price-view-l {
				width: 300rpx;
				height: 64rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #eeeeee;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;
				
				.put-text {
					// width: 60rpx;
					height: 28rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #a6a6a6;
					opacity: 0.4;
					text-align: center;
				}
			}
			.select-price-view-m {
				width: 30rpx;
				height: 2rpx;
				background: #eeeeee;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.select-price-view-r {
				width: 300rpx;
				height: 64rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #eeeeee;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;
				.put-text {
					// width: 60rpx;
					height: 28rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #a6a6a6;
					opacity: 0.4;
					text-align: center;
				}
			}
		}
	}
	
	
	
	
	.card-tab-title {
		text-align: left;
		height: 40rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 28rpx;
		color: #1f1f1f;
		margin-bottom: 20rpx;
	}

	.card-content {
		// border: 2rpx solid red;
		display: grid;
		grid-template-columns: 33.3333% 33.3333% 33.3333%;
		row-gap: 18rpx;
		column-gap: 9rpx;
	}

	
}
.title {
	display: flex;
	justify-content: space-between;
	// margin-bottom: 18rpx;	
	margin-left: 30rpx;
	margin-right: 30rpx;
	.title-text{
		width: 72rpx;
		height: 50rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 36rpx;
		color: #1f1f1f;
	}
	image{
		height: 32rpx;
		width: 32rpx;
		// border: 1rpx solid red;
	}
	
	
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
	.cancel-btn {
		width: 232rpx;
		height: 96rpx;
		background: #f2f3f6;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 14rpx;
		margin-bottom: 62rpx;
		text {
			width: 60rpx;
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #1f1f1f;
		}
	}
	.confim-btn {
		width: 444rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			width: 60rpx;
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}

}
.search {
	width: 710rpx;
	height: 72rpx;
	margin: 15rpx 20rpx;
	background: #ffffff;
	box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59, 43, 15, 0.2);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	border: 2rpx solid #242424;
	display: flex;
	align-items: center;
	image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 30rpx;
		margin-right: 16rpx;
	}
	text{
	
		opacity: 0.6;
		height: 36rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 26rpx;
		color: #1F1F1F;
	}
}

.choice-panel {
	position: absolute;
	left: 0;
	width: 100%;
	background: #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 100; 
}

.panel-item {
	padding: 10px 15px;
	border-bottom: 1px solid #eee;
}

.banner {
	width: 750rpx;
	padding: 15rpx 0;
	margin-top: 10rpx;
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
				// border-radius: 10rpx;
				box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
			}
			// .banner-image:last-child{margin-top: 22rpx;}
		}
	}
}
.select {
	border-radius: 20rpx 20rpx 0 0;
	padding: 0 20rpx;
	// margin-bottom: -20rpx;
	background: #f3f2f6;
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.select-box1 {
		// box-sizing: border-box;
		// border: 2rpx solid red;
		// display: inline-block;
		text {
			// border: 2rpx solid red;
			// height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1f1f1f;
			margin-right: 10rpx;
			text-align: center;
			// color: #EB4636;
		}
		
		image {
			height: 22rpx;
			width: 22rpx;
		}
		.select-box1:first-child{color: #EB4636;}
	}
	.select-box2 {
		// box-sizing: border-box;
		// border: 2rpx solid red;
		display: flex;
		align-items: center; 
		// justify-content: center;
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1f1f1f;
			margin-right: 10rpx; 
		}
		.box-images {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 100%; 
		}
		image {
			margin-top: 2rpx;
			width: 20rpx; /* 调整图像大小 */
			height: 12rpx; /* 调整图像大小 */
		}
	}
}
.main {
	box-sizing: border-box;
	border-radius: 0 0 20rpx 20rpx;
	background: #FFFFFF;
	width: 100%;
	// height: 870rpx;
}

}
.rotated {
transform: rotate(180deg);
transition: transform 0.5s ease;
}

.flip-enter-active, .flip-leave-active {
transition: all 0.5s ease;
}

.flip-enter, .flip-leave-to {
transform: translateY(20px);
opacity: 0;
}
.header {
	width: 100%;
	background: #f3f2f6;
	.titleBar {
		width: 100%;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

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
			color: #1f1f1f;
		}
	}
}
</style>
