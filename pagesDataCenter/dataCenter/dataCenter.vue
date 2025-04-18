<template>
	<view class="dataCenter-layout">
		<!-- header -->
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view class="bar-icon" @click="customLeftFn">
					<image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
				</view>
				<view class="name" @click="selectTitle(index)" :class="{ selectedTitle: selectedTitileIndex === index }" v-for="(item, index) in titleChange" :key="index">
					<text>{{ item }}</text>
				</view>
				<view class="fill">
					<text>未对账</text>
				</view>
			</view>

			<view class="saixuan" v-if="selectedTitileIndex === 0">
				<!-- <view class="top">
					<view class="card" @click="selectCard(index)" :class="{ selected: selectedIndex === index }" v-for="(item, index) in timeCardData" :key="index">
						<text>{{ item }}</text>
					</view>
				</view> -->
				
				<view class="top">
					<view class="dropdown-container" style="width: 710rpx" :class="{ expanded: showDropdown }">
						<view
							@click="selectCard(index)"
							:class="{ selected: selectedIndex === index }"
							v-for="(item, index) in filteredTimeCardData"
							:key="index"
							style="
								width: 120rpx;
								height: 64rpx;
								background: #ffffff;
								border-radius: 20rpx 20rpx 20rpx 20rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.1);
							"
						>
							<text class="text-4">{{ item }}</text>
						</view>
				
						<view
							class="dropdown-button"
							@click="toggleDropdown"
							:class="{ selected: selectedIndex === 4 }"
							style="
								box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.1);
								width: 148rpx;
								height: 64rpx;
								background: #ffffff;
								border-radius: 20rpx 20rpx 20rpx 20rpx;
								display: flex;
								justify-content: center;
								align-items: center;
							"
						>
							<text
								style="
									height: 40rpx;
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 28rpx;
									color: #1f1f1f;
									text-align: center;
									font-style: normal;
									text-transform: none;
								"
							>
								{{ timeRange }}
							</text>
						</view>
						<view class="dropdown-menu" v-show="showDropdown">
							<view class="dropdown-bubble"></view>
				
							<view style="display: flex; flex-direction: column; gap: 30rpx">
								<view style="display: flex; align-items: center; justify-content: center; gap: 16rpx">
									<view
										style="
											width: 300rpx;
											height: 72rpx;
											background: #ffffff;
											border-radius: 10rpx 10rpx 10rpx 10rpx;
											border: 2rpx solid #cbcbcb;
											display: flex;
											justify-content: center;
											align-items: center;
										"
									>
										<picker @change="onTimeChange1" mode="date" :value="pickerStartValue">
											<text class="text-11">{{ pickerStartValue }}</text>
										</picker>
									</view>
									<view style="width: 30rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 0rpx 0rpx 0rpx"></view>
									<view
										style="
											width: 300rpx;
											height: 72rpx;
											background: #ffffff;
											border-radius: 10rpx 10rpx 10rpx 10rpx;
											border: 2rpx solid #cbcbcb;
											display: flex;
											justify-content: center;
											align-items: center;
										"
									>
										<picker @change="onTimeChange2" mode="date" :value="pickerLastValue">
											<text class="text-11">{{ pickerLastValue }}</text>
										</picker>
									</view>
								</view>
				
								<view style="display: flex; justify-content: space-between; align-items: center">
									<view
										@click="resetTime"
										class="button-animation"
										style="
											width: 300rpx;
											height: 76rpx;
											background: #f2f3f6;
											border-radius: 20rpx 20rpx 20rpx 20rpx;
											display: flex;
											justify-content: center;
											align-items: center;
										"
									>
										<text class="text-12">重置</text>
									</view>
				
									<view
										@click="tiemComfirm"
										class="button-animation"
										style="
											width: 300rpx;
											height: 76rpx;
											background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
											border-radius: 20rpx 20rpx 20rpx 20rpx;
											display: flex;
											justify-content: center;
											align-items: center;
										"
									>
										<text class="text-13">确定</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>

			<view class="saixuan-1" v-if="selectedTitileIndex === 1">
				<van-dropdown-menu z-index="20" class="dropdownMenu" style="background: #ffffff" active-color="#EB4636">
					<van-dropdown-item :value="value1" :options="option1" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange1" />
					<van-dropdown-item :value="value2" :options="option2" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange2" />
				</van-dropdown-menu>
			</view>
		</view>
		<view :style="{ height: getStatusBarHeight() + getTitleBarHeight() + 60 + 'px' }"></view>
		<!-- 数据分析 -->
		<view v-if="selectedTitileIndex === 0" style="background-color: #f3f3f3; height: 1280rpx; width: 100%">
			<z-paging  ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
				<!-- data-center -->
				<view class="data-center" v-for="(item, index) in dataList" :key="index">
					<view class="top">
						<view class="left">
							<text>{{ item.text }}</text>
						</view>
						<view class="right" @click="goPath(item.path)">
							<text>全部</text>
						</view>
					</view>
					<view class="bottom">
						<view class="data-center-card" v-for="(item1, index) in item.values" :key="index">
							<text class="text-1">{{ item1.count }}</text>
							<text class="text-2">{{ item1.text }}</text>
						</view>
					</view>
				</view>
				
				
				
			</z-paging>
		</view>

		<!-- 库存分析 -->

		<view
			v-else
			style="
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 20rpx;
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-bottom: 30rpx;
			"
		>
			<view style="padding: 0 20rpx; width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; margin-top: 26rpx">
				<text
					style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left; font-style: normal; text-transform: none"
				>
					{{cardTitle}}
				</text>

				<view class="switch-container" v-if="ymdj!=='6'" @click="toggleSwitch">
					<view style="border-radius: 10rpx; width: 50%; display: flex; justify-content: center; align-items: center">
						<view class="text">台数</view>
					</view>
					<view class="switch-ball" :class="{ active: isActive }"></view>
					<view style="border-radius: 10rpx; width: 50%; display: flex; justify-content: center; align-items: center">
						<view class="text">金额</view>
					</view>
				</view>
			</view>

			<view class="corner" style="margin-top: 20rpx; display: flex; align-items: center; gap: 10rpx; margin-bottom: 20rpx">
				<view
					style="
						width: 336rpx;
						height: 76rpx;
						background: #ffffff;
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(102, 156, 253, 0.33);
						display: flex;
						align-items: center;
						justify-content: center;
					"
				>
					<text class="text-1">合计台数</text>
					<text class="text-2">{{totalData.totalNum}}</text>
					<text class="text-3">台</text>
				</view>
				<view
					style="
						width: 336rpx;
						height: 76rpx;
						background: #fef8ef;
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(181, 144, 119, 0.3);
						display: flex;
						align-items: center;
						justify-content: center;
					"
				>
					<text class="text-1">合计金额</text>
					<text class="text-2">{{totalData.totalPrice}}</text>
					<text class="text-3">元</text>
				</view>
			</view>

			<view style="height: 1020rpx; width: 100%">
				<z-paging ref="paging1" show-refresher-update-time :fixed="false" v-model="dataList1" @query="queryList1">
					<view
						v-if="ymdj!=='6'"
						v-for="(item, index) in dataList1"
						:key="index"
						style="margin-top: 30rpx; display: flex; flex-direction: column; width: 100%; padding-left: 20rpx; padding-right: 20rpx">
						<view style="display: flex; align-items: center; gap: 12rpx">
							<text
								style="
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 28rpx;
									color: #1f1f1f;
									text-align: left;
									font-style: normal;
									text-transform: none;
								"
							>
								{{item.name}}
							</text>
							<view
								style="
									display: flex;
									justify-content: center;
									align-items: center;
									padding-left: 10rpx;
									padding-right: 10rpx;
									background: #f8ebd9;
									box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.05);
									border-radius: 10rpx 10rpx 10rpx 10rpx;
								"
							>
								<text
									style="
										font-family: PingFang SC, PingFang SC;
										font-weight: 400;
										font-size: 24rpx;
										color: #b59077;
										text-align: center;
										font-style: normal;
										text-transform: none;
									"
								>
									{{calculatePercentage(item)}}%
								</text>
							</view>
						</view>

						<view style="margin-top: 8rpx; display: flex; justify-content: space-between; align-items: center; width: 100%">
							<view style="width: 466rpx">
								<van-progress
									track-color="#F8F8F8"
									color="linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)"
									:show-pivot="false"
									:percentage="calculatePercentage(item)"
									stroke-width="12"
								/>
							</view>
							<view style="display: flex; align-items: center" @click="reloadPage(item)">
								<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 24rpx; color: #1f1f1f; line-height: 52rpx; text-align: right">
									{{!isActive?item.price:item.num}} {{!isActive?'元':'台'}}
								</text>
								<image style="margin-left: 14rpx; height: 18rpx; width: 12rpx" src="https://www.xzxskj.com/xcximg/icon_xiala@3x.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					
					
					<view v-else
						v-for="(item, index) in dataList"
						:key="index"
						style="
							margin-bottom: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							background: #ffffff;
							border-radius: 20rpx;
							width: 710rpx;
							margin-left: 20rpx;">
						<view style="display: flex; justify-content: center; align-items: center; padding: 20rpx">
							<van-image width="95" height="95" fit="widthFix" radius="18rpx" :src="item.cover" mode="aspectFit">
								<template v-slot:error>加载失败</template>
								<van-loading slot="loading" type="spinner" size="20" vertical />
							</van-image>
							<view style="flex: 1; margin-left: 20rpx; height: 190rpx; display: flex; flex-direction: column; justify-content: space-between">
								<view style="display: flex; flex-direction: column">
									<view>
										<van-tag size="mini" color="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)">{{item.finenessname}}</van-tag>
										<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; line-height: 40rpx; text-align: left">
											{{item.name}}
										</text>
									</view>
					
									<view style="display: flex; align-items: center; margin-top: 4rpx">
										<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">
											IMEI：{{item.ch}}
										</text>
										<image
											style="height: 20rpx; width: 20rpx; margin-left: 10rpx"
											src="https://www.xzxskj.com/xcximg/icon_copy@3x.png"
											mode="aspectFill"
										></image>
									</view>
					
									<view style="display: flex; align-items: center; margin-top: 4rpx">
										<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-right: 40rpx">
											采购：{{item.cgyname}}
										</text>
										<view style="display: flex; justify-content: center; align-items: center">
											<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">仓库：{{item.ckame}}</text>
											<view
												style="
													margin-left: 10rpx;
													display: flex;
													justify-content: center;
													align-items: center;
													padding: 0 8rpx;
													background: #ffeeec;
													border-radius: 8rpx;
												"
											>
												<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #eb4636">10天</text>
											</view>
										</view>
									</view>
								</view>
					
								<view style="display: flex; align-items: center">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">
										批发价:
									</text>
									<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥{{item.price}}</text>
								</view>
							</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
	</view>
</template>

<script setup>
import { toBeijingTimestamp } from '@/utils/common.js'
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import {apiDataAnalysis,apiStockAnalysis} from '../api/api.js'
import { apiAdminGetStore } from '@/api/station/station.js';
import { computed, nextTick } from 'vue';
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
const permissionStore = usePermissionStore();
const cardTitle = computed(()=>{
	return ymdj.value==='1'?'库存分析':ymdj.value==='2'?'品牌数据':ymdj.value==='3'?'型号数据':ymdj.value==='4'?'内存数据':ymdj.value==='5'?'全称数据':'商品列表'
})
const paging = ref(null);
const paging1 = ref(null)
const dataList = ref([]);
const dataList1 = ref([]);
const allSelected = ref(true);
const calculatePercentage = (item) => {
    const total = isActive.value ? totalData.value.totalNum : totalData.value.totalPrice;
    const value = isActive.value ? item.num : (item.price?item.price:0);
    return total > 0 ? ((value / total) * 100).toFixed(0) : 0;
};
const queryList =async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	await getDataAnalysis(selectedIndex.value)
	console.log('dataCenterFilter',dataCenterFilter.value)
	paging.value.complete(dataCenterFilter.value);
};

const dataCenterFilter = computed(() => {
  return data_center.value
    .filter(item => !item.menuAuthority || permissionStore.hasMenuAuthority(item.menuAuthority));
});

const start = ref()
const queryList1 =async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	start.value = pageNo-1
	const lists = await getStockAnalysis()
	paging1.value.complete(lists);
};
const selectedTitileIndex = ref(0);
const titleChange = ref(['数据分析', '库存分析']);
const selectTitle = (index) => {
	selectedTitileIndex.value = index;
	if (index === 0) {
		nextTick(()=>{
			// paging.value.reload(true)
		})
	} else {
		nextTick(()=>{
			// paging1.value.reload(true)
		})
	}
};
// const goBack = () => {
// 	uni.navigateBack();
// };

const option1 = ref([
	// { text: '全部仓库', value: 0 },
	// { text: '仓库1', value: 1 },
	// { text: '仓库2', value: 2 }
]);
const option2 = ref([
	{ text: '全部采购', value: -1 },
	
]);


const value1 = ref(-1);
const value2 = ref(-1);

const selectParamChange1= (value) => {
	value1.value = value.detail;
	paging1.value.reload(true)
};
const selectParamChange2= (value) => {
	value2.value = value.detail;
	paging1.value.reload(true)
};
const isActive = ref(false);
const toggleSwitch = () => {
	isActive.value = !isActive.value;
};
const selectedIndex = ref(0);
const timeCardData = ref(['今日', '昨日', '本月', '上月', '时间区间']);
const filteredTimeCardData = computed(() => timeCardData.value.filter((item, index) => index !== 4));
const timeRange = ref('时间区间');
// const selectCard = (index) => {
// 	console.log('进来了？')
// 	selectedIndex.value = index;
// 	paging.value.reload(true)
// };
const selectCard = (index) => {
	selectedIndex.value = index;
	showDropdown.value = false;
	showTimeRange.value = false;
	if (selectedIndex.value !== 5) {
		paging.value.reload(true);
	}
};
const pickerStartValue = ref('开始时间');
const pickerLastValue = ref('截止时间');
const pickerStartTimestamp = ref();
const pickerLastTimestamp = ref();
const onTimeChange1 = (e) => {
	console.log(e);
	pickerStartValue.value = e.detail.value;
	pickerStartTimestamp.value = toBeijingTimestamp(e.detail.value);
};
const onTimeChange2 = (e) => {
	console.log(e);
	pickerLastValue.value = e.detail.value;
	pickerLastTimestamp.value = toBeijingTimestamp(e.detail.value);
};
const showTimeRange = ref(false);
const showDropdown = ref(false);
const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	showTimeRange.value = true;
	selectedIndex.value = 4;
};
const tiemComfirm = () => {
	showDropdown.value = false;
	showTimeRange.value = false;
	paging.value.reload(true);
};
const resetTime = () => {
	pickerStartValue.value = '开始时间';
	pickerLastValue.value = '截止时间';
	pickerStartTimestamp.value = '';
	pickerLastTimestamp.value = '';
};

const data_center = ref([
]);
const goPath = (path) => {
	uni.navigateTo({
		url: path
	});
};
const getDataAnalysis = async (selectTime) => {
	const data = {
		lx: selectTime+1,
		opid: uni.getStorageSync('sessionInfo').opid,
		startTime: selectedIndex.value + 1 === 5 ? pickerStartTimestamp.value : '',
		endTime: selectedIndex.value + 1 === 5 ? pickerLastTimestamp.value : ''
	}
	const res = await apiDataAnalysis(data);
	console.log('res:', res);
	data_center.value = [
		{
			text: '销售数据',
			menuAuthority:'saleData',
			values: [
				{ text: '销售台数(台)', count: res.xsnum },
				{ text: '销售金额(元)', count: res.xsprice },
				{ text: '售后退货(台)', count: res.shnum },
				{ text: '售后退货(元)', count: res.shprice },
				{ text: '线下销售(台)', count: res.xxnum },
				{ text: '线下销售(元)', count: res.xxprice },
				{ text: '平台销售(台)', count: res.ptnum },
				{ text: '平台销售(元)', count: res.ptprice }
			],
			path: '/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=销售数据'
		},
		{
			text: '商品数据',
			menuAuthority:'productData',
			values: [
				{ text: '商品录入', count: res.splrcount },
				{ text: '功能检测', count: res.gnjccount },
				{ text: '维修检测', count: res.wxjccount },
				{ text: '拍照', count: res.pzcount },
				{ text: '成色判断', count: res.cscount },
				{ text: '定价上架', count: res.djcount },
				{ text: '临时下架', count: res.lsxjcount },
				{ text: '退出库存', count: res.tcckcount }
			],
			path: '/pagesDataCenterProductData/dataCenterProductData/dataCenterProductData'
		},
		{
			text: '先货后款',
			menuAuthority:'fpbkData',
			values: [
				{ text: '先货后款(台)', count: res.xhhknum },
				{ text: '先货后款(元)', count: res.xhhkprice },
				{ text: '欠款已收(台)', count: res.xhhkysnum },
				{ text: '欠款已收(元)', count: res.xhhkysprice },
				{ text: '欠款已退(台)', count: res.xhhkytnum },
				{ text: '退货上架(台)', count: res.xhhkythsjnum },
				{ text: '退货下架(台)', count: res.xhhkythxjnum },
				{ text: '退出库存(台)', count: res.xhhkytcknum }
			],
			path: '/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=先货后款'
		},
		{
			text: '议价数据',
			menuAuthority:'yjData',
			values: [
				{ text: '议价商品(台)', count: res.yjzts },
				{ text: '成功议价(台)', count: res.yjcgnum },
				{ text: '驳回议价(台)', count: res.yjsbnum },
				{ text: '议价成功(元)', count: res.yjcgprice }
			],
			path: '/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=议价数据'
		}
	];
};
const totalData = ref({
	totalNum: 0,
	totalPrice: 0
});

const ymdj = ref('1');
const flid = ref('');
const ppid = ref('');
const xhid = ref('');
const ncid = ref('');
const qcid = ref('');
const getStockAnalysis = async () => {
	const data = {
		ckid: value1.value===-1?'':String(value1.value),
		cgid: value2.value===-1?'':String(value2.value),
		start:start.value,
		ymdj:ymdj.value,//1分类 2品牌3型号4内存5 全称6商品列表
		flid:flid.value,
		ppid:ppid.value,
		xhid:xhid.value,
		ncid:ncid.value,
		qcid:qcid.value
	}
	const res = await apiStockAnalysis(data);
	console.log('res:', res);
	if(res.zt===1){
		totalData.value.totalNum = res.num;
		totalData.value.totalPrice = res.price;
		if (res.yglist&&res.yglist.length>0) {
			res.yglist.forEach((item) => {
				const hasItem = option2.value.find((item1) => item1.value === parseInt(item.id));
				if (!hasItem) {
					option2.value.push({ text: item.username, value: parseInt(item.id) });
				}
				option2.value = [...option2.value];
			});
		}
	}
	return res.zt===1?res.lists:[]
};
const apiAdminGetStoreData = async () => {
  const param = {
    opid: uni.getStorageSync('sessionInfo').opid,
  }
  const res = await apiAdminGetStore(param);
  if (res.code === 200) {
	console.log('仓库 res:',res)
	option1.value.push({ text: '全部仓库',value:-1  })
	res.lists.forEach((item) => {
	  const {name,id}  = item;
	  option1.value.push({ text: name, value: parseInt(id) });
	});
  }
}


const reloadPage = (item) => {
	console.log('item:', item);
	start.value = 0;
	ymdj.value = String(parseInt(ymdj.value) + 1);
	flid.value =String(item.id);
	titleChange.value = ymdj.value === '1' ? ['数据分析', '库存分析']:ymdj.value === '2'?[item.name] :ymdj.value === '3'?[item.name]:ymdj.value === '4'?['内存数据']:ymdj.value === '5'?['全称数据']:['商品列表']
	if (ymdj.value === '2') {
		flid.value =String(item.id);
	} else if (ymdj.value === '3') {
		ppid.value =String(item.id);
	} else if (ymdj.value === '4') {
		xhid.value = String(item.id);
	} else if (ymdj.value === '5') {
		ncid.value = String(item.id);
	}else{
		qcid.value = String(item.id);
	}
	
	const selectedDataCenterData = uni.getStorageSync('selectedDataCenterData')
	if(selectedDataCenterData){
		
		selectedDataCenterData.push({
			flid:flid.value,
			ppid:ppid.value,
			xhid:xhid.value,
			ncid:ncid.value,
			qcid:qcid.value
		})
		uni.setStorageSync('selectedDataCenterData',selectedDataCenterData)
	}else{
		console.log('set')
		uni.setStorageSync('selectedDataCenterData',[{
			flid:flid.value,
			ppid:ppid.value,
			xhid:xhid.value,
			ncid:ncid.value,
			qcid:qcid.value
		}]);
	}
	paging1.value.reload(true);
};

const customLeftFn = ()=>{
	console.log('customLeftFn')
	if(ymdj.value !== '1'){
		start.value = '1';
		ymdj.value = String(parseInt(ymdj.value) - 1);
		const selectedDataCenterData = uni.getStorageSync('selectedDataCenterData')
		const {	flid:flid1,
			ppid:ppid1,
			xhid:xhid1,
			ncid:ncid1,
			qcid:qcid1} = selectedDataCenterData.pop()
		flid.value = flid1;
		ppid.value = ppid1;
		xhid.value = xhid1;
		ncid.value = ncid1;
		qcid.value = qcid1;
		uni.setStorageSync('selectedDataCenterData', selectedDataCenterData);
		titleChange.value = ymdj.value === '1' ? ['数据分析', '库存分析']:ymdj.value === '2'?[item.name] :ymdj.value === '3'?[item.name]:ymdj.value === '4'?['内存数据']:ymdj.value === '5'?['全称数据']:['商品列表']
		if(ymdj.value === '1'){
			flid.value ='';
		}else if (ymdj.value === '2') {
			ppid.value ='';
		} else if (ymdj.value === '3') {
			xhid.value = '';
		} else if (ymdj.value === '4') {
			ncid.value = '';
		} else if (ymdj.value === '5') {
			qcid.value ='';
		}
		paging1.value.reload(true);
	}else{
		uni.removeStorageSync('selectedDataCenterData');
		uni.navigateBack();
	}
}


onLoad(()=>{
	apiAdminGetStoreData()
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.dataCenter-layout {
	min-height: 100vh;
	background: #f3f2f6;
}
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	background: #ffffff;
	.titleBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		.bar-icon {
			width: 33.333%;
			.img {
				height: 32rpx;
				width: 32rpx;
			}
		}
		.name {
			width: 33.333%;
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 36rpx;
			color: #1f1f1f;
			text-align: center;
			opacity: 0.5;
			transition: all 0.3s;
			&.selectedTitle {
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
				text-align: center;
				opacity: 1;
			}
		}
		.fill {
			width: 33.333%;
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
.saixuan {
	width: 750rpx;
	background: #ffffff;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.card {
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.1);
			height: 64rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: center;
			}
			&.selected {
				background: #eb4636;
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
				}
			}
		}
	}
}

.data-center {
	margin-top: 20rpx;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin-left: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 30rpx;
	padding-bottom: 20rpx;
	// margin-bottom: 20rpx;
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.left {
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.right {
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #1f1f1f;
			text-align: right;
		}
	}
	.bottom {
		box-sizing: border-box;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		margin-top: 30rpx;
		width: 100%;
		display: grid;
		grid-template-columns: auto auto auto auto;
		justify-content: space-between;
		grid-row-gap: 20rpx;
		.data-center-card {
			width: 158rpx;
			height: 104rpx;
			background: #f8f8f8;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.text-1 {
				margin-bottom: 8rpx;
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #669cfd;
				line-height: 52rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
			.text-2 {
				height: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #1f1f1f;
				line-height: 52rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
				opacity: 0.6;
			}
		}
	}
}
.dropdownMenu {
	::v-deep .van-dropdown-menu {
		background-color: #ffffff;
		box-shadow: none;
	}
}
.switch-container {
	width: 192rpx;
	height: 64rpx;
	background-color: #f3f2f6;
	border-radius: 10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	cursor: pointer;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	.text {
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 24rpx;
		color: #1f1f1f;
		text-align: center;
		font-style: normal;
		text-transform: none;
	}

	.switch-ball {
		width: 96rpx;
		height: 64rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.3s;

		&.active {
			left: 96rpx;
			border-radius: 10rpx;
		}
	}
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	vertical-align: bottom;
	margin-right: 10rpx;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 800;
	font-size: 32rpx;
	color: #6994f3;
	text-align: center;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
	margin-right: 10rpx;
}
.text-3 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
	opacity: 0.6;
}

.dropdown-container {
	position: relative;
	display: flex;
	transition: height 0.5s ease; /* 添加过渡效果 */
	justify-content: space-between;
	align-items: center;
}

.dropdown-menu {
	background: #ffffff;
	box-shadow: 0rpx 0rpx 40rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	position: absolute;
	top: 94rpx;
	left: 0;
	width: 710rpx;
	z-index: 30;
	padding: 30rpx 24rpx;
	display: none; /* 初始状态隐藏 */
	transition: display 0.5s ease; /* 添加过渡效果 */
}
.expanded .dropdown-menu {
	display: block; /* 展开时显示 */
	animation: dropdownAnimation 0.5s ease; /* 添加动画效果 */
}
.dropdown-bubble {
	position: absolute;
	top: -20rpx;
	/* left: 30rpx; */
	right: 30rpx;
	width: 0;
	height: 0;
	border-left: 12rpx solid transparent;
	border-right: 12rpx solid transparent;
	border-bottom: 24rpx solid #ffffff;
}
@keyframes dropdownAnimation {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.dropdown-container:not(.expanded) .dropdown-menu {
	display: none;
	animation: collapseAnimation 0.5s ease;
}

@keyframes collapseAnimation {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(-10px);
	}
}
.selected {
	transition: all 0.3s !important;
	background: #eb4636 !important;
}

.selected text {
	transition: all 0.3s !important;
	font-size: 28rpx !important;
	color: #ffffff !important;
}

.menu-dropdown-wrapper {
	position: relative;
	display: inline-block;
	.dropdown-trigger {
		width: 146rpx;
		height: 60rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 30rpx 30rpx 30rpx 30rpx;
		border: 2rpx solid #eeeeee;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 31;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		animation: fade-in 0.3s ease-in-out;

		.dropdown-bubble {
			position: absolute;
			top: -20rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 0;
			border-left: 12rpx solid transparent;
			border-right: 12rpx solid transparent;
			border-bottom: 24rpx solid #ffffff;
		}
	}
}

@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translate(-50%, -10px);
	}
	100% {
		opacity: 1;
		transform: translate(-50%, 0);
	}
}
.text-11 {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.4;
}

.text-12 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-13 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-14 {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
