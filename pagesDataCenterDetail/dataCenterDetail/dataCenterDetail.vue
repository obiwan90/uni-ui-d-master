<template>
	<view class="dataCenterDetail-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#FFFFFF'"  :customLeftIcon = 'true' @clickHandler="customLeftFn">
			<template #name>{{ title }}</template>
			<template #fill>快速批发</template>
		</custom-header>

		<view class="saixuan">
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

		<van-dropdown-menu z-index="20" class="dropdownMenu" style="background: #ffffff" active-color="#EB4636">
			<van-dropdown-item :value="value1" :options="option1" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange1" />
			<van-dropdown-item :value="value2" :options="option2" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange2" />
			<van-dropdown-item :value="value3" :options="option3" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange3" />
			<van-dropdown-item :value="value4" :options="option4" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange4" />
		</van-dropdown-menu>
		<!-- 销售数据  分类数据  品牌数据  内存数据 全称数据-->
		<view
			style="
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 20rpx;
				margin-top: 20rpx;
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-bottom: 30rpx;
			"
		>
			<view style="height: 100rpx; box-sizing: border-box; border-bottom: 4rpx solid #f3f2f6; padding-right: 20rpx">
				<uv-tabs
					:list="tabsData"
					lineWidth="30"
					lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)"
					lineHeight="3"
					:fontSize="28"
					:inactiveStyle="{
						color: '#1F1F1F',
						opacity: 0.6
					}"
					:activeStyle="{ color: '#1F1F1F', fontWeight: 'bold', fontSize: 32, opacity: 1 }"
					@change="uvTabs1Change"
					:current="activeTab1Index"
				>
					<template v-slot:right  v-if="ymdj!=='6'">
						<view style="padding-left: 4px" @tap="toast()">
							<view
								style="
									height: 48rpx;
									width: 96rpx;
									background: #eef4ff;
									border-radius: 10rpx 10rpx 10rpx 10rpx;
									display: flex;
									justify-content: center;
									align-items: center;
									padding-left: 8rpx;
									padding-right: 8rpx;
								"
							>
								<image style="margin-right: 6rpx; height: 24rpx; width: 24rpx" src="https://www.xzxskj.com/xcximg/icon_qiehuan@3x.png" mode="aspectFill"></image>
								<text v-if="!switchNum" style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #669cfd; text-align: right">
									金额
								</text>
								<text v-else style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #669cfd; text-align: right">台数</text>
							</view>
						</view>
					</template>
				</uv-tabs>
			</view>

			<view class="corner" style="margin-top: 30rpx; display: flex; align-items: center; gap: 10rpx; margin-bottom: 20rpx">
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
					<text class="text-2">{{ num }}</text>
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
					<text class="text-2">{{ totalPrice }}</text>
					<text class="text-3">元</text>
				</view>
			</view>

			<view style="height: 900rpx; width: 100%">
				<z-paging ref="paging" show-refresher-update-time :default-page-size = "20" :fixed="false" v-model="dataList" @query="queryList">
					<view v-if="ymdj!=='6'"
						v-for="(item, index) in dataList"
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
								{{ item.name }}
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
									{{ computedPercentage1(item) }}%
								</text>
							</view>
						</view>

						<view style="margin-top: 8rpx; display: flex; justify-content: space-between; align-items: center; width: 100%">
							<view style="width: 466rpx">
								<van-progress
									track-color="#F8F8F8"
									color="linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)"
									:show-pivot="false"
									:percentage="computedPercentage1(item)"
									stroke-width="12"
								/>
							</view>
							<view style="display: flex; align-items: center" @click="reloadPage(item)">
								<text
									v-if="!switchNum"
									style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 24rpx; color: #1f1f1f; line-height: 52rpx; text-align: right"
								>
									{{ item.price }}元
								</text>

								<text
									v-else
									style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 24rpx; color: #1f1f1f; line-height: 52rpx; text-align: right"
								>
									{{ item.num }}台
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
		<!-- <floatButtom/> -->
	</view>
</template>

<script setup>
import { toBeijingTimestamp } from '@/utils/common.js'
import { apiSaleData } from '../api/api.js';
// import { floatButtom } from './components/float-buttom.vue';

//时间区间
const timeCardData = ref(['今日', '昨日', '本月', '上月']);
const filteredTimeCardData = computed(() => timeCardData.value.filter((item, index) => index !== 4));
const timeRange = ref('时间区间');
const selectedIndex = ref(0);
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

const progressValue = ref(0);
// const maxValue = 90;

const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(true);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiSaleDataList(pageNo-1);
	console.log('data', data);
	paging.value.complete(data);
};
const option1 = ref([{ text: '全部仓库', value: 0 }]);
const option2 = ref([{ text: '全部采购', value: 0 }]);
const option3 = ref([{ text: '全部销售', value: 0 }]);
const option4 = ref([{ text: '全部成色', value: 0 }]);
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const tabsData = ref([
	{ name: '全部销售', xslx: '1' },
	{ name: '线下销售', xslx: '2' },
	{ name: '平台销售', xslx: '3' },
	{ name: '售后退款', xslx: '4' }
]);

const activeTab1Index = ref(0);
const selectXslx = ref('1');
const selectCkid = ref('');
const selectCgid = ref('');
const selectXsid = ref('');
const selectCsid = ref('');
const uvTabs1Change = (e) => {
	activeTab1Index.value = e.index;
	selectXslx.value = tabsData.value[e.index].xslx;
	paging.value.reload(true);
};
const selectParamChange1 = (e) => {
	console.log(e);
	selectCkid.value = e.detail === 0 ? '' : e.detail;
	value1.value = e.detail;
	paging.value.reload(true);
};
const selectParamChange2 = (e) => {
	console.log(e);
	selectCkid.value = e.detail === 0 ? '' : e.detail;
	value2.value = e.detail;
	paging.value.reload(true);
};
const selectParamChange3 = (e) => {
	console.log(e);
	selectCkid.value = e.detail === 0 ? '' : e.detail;
	value3.value = e.detail;
	paging.value.reload(true);
};
const selectParamChange4 = (e) => {
	console.log(e);
	selectCkid.value = e.detail === 0 ? '' : e.detail;
	value4.value = e.detail;
	paging.value.reload(true);
};

const cklist = ref([]);
const cgyglist = ref([]);
const xsyglist = ref([]);
const cslist = ref([]);
const lists = ref([]);
const num = ref(0);
const totalPrice = ref(0);
const ymdj = ref('1');
const flid = ref('');
const ppid = ref('');
const xhid = ref('');
const ncid = ref('');
const qcid = ref('');
const start = ref('0');
const param = computed(() => ({
	lx: selectedIndex.value + 1,
	xslx: selectXslx.value, //1全部销售2线下销售3平台销售4售后退款
	ckid: selectCkid.value, //仓库ID
	cgid: selectCgid.value, //采购ID
	xsid: selectXsid.value, //销售ID
	csid: selectCsid.value, //成色ID
	ymdj: ymdj.value, //1分类 2品牌3型号4内存5 全称6商品列表
	flid: flid.value, //
	ppid: ppid.value, //品牌ID
	xhid: xhid.value, //型号ID
	ncid: ncid.value, //内存ID
	qcid: qcid.value, //全称ID
	start: start.value, //分页
	startTime: selectedIndex.value + 1 === 5 ? pickerStartTimestamp.value : '',
	endTime: selectedIndex.value + 1 === 5 ? pickerLastTimestamp.value : ''
}));

const apiSaleDataList = async (data) => {
	start.value = String(data);

	const res = await apiSaleData(param.value);
	if (res.zt === 1) {
		cklist.value = res.cklist;
		if (cklist.value) {
			cklist.value.forEach((item) => {
				const hasItem = option1.value.find((item1) => item1.value === parseInt(item.id));
				if (!hasItem) {
					option1.value.push({ text: item.name, value: parseInt(item.id) });
				}
				option1.value = [...option1.value];
			});
		}
		cgyglist.value = res.cgyglist;
		if (cgyglist.value) {
			cgyglist.value.forEach((item) => {
				const hasItem = option2.value.find((item1) => item1.value === parseInt(item.id));
				if (!hasItem) {
					option2.value.push({ text: item.username, value: parseInt(item.id) });
				}
				option2.value = [...option2.value];
			});
		}
		xsyglist.value = res.xsyglist;
		if (xsyglist.value) {
			xsyglist.value.forEach((item) => {
				const hasItem = option3.value.find((item1) => item1.value === parseInt(item.id));
				if (!hasItem) {
					option3.value.push({ text: item.username, value: parseInt(item.id) });
				}
				option3.value = [...option3.value];
			});
		}
		cslist.value = res.cslist;
		if (cslist.value) {
			cslist.value.forEach((item) => {
				const hasItem = option4.value.find((item1) => item1.value === parseInt(item.id));
				if (!hasItem) {
					option4.value.push({ text: item.name, value: parseInt(item.id) });
				}
				option4.value = [...option4.value];
			});
		}
		if (res.lists||res.goodslist) {
			if(ymdj.value!=='6'){
				lists.value = res.lists;
				num.value = 0;
				lists.value.forEach((item) => {
					num.value += parseInt(item.num);
				});
				totalPrice.value = res.zprice;
			}else{
				lists.value = res.goodslist
			}
			return lists.value;
		}
	}
	return [];
};
const switchNum = ref(false);
const toast = () => {
	switchNum.value = !switchNum.value;
};
//1分类 2品牌3型号4内存5 全称6商品列表
const title = ref();
const reloadPage = (item) => {
	start.value = '1';
	ymdj.value = String(parseInt(ymdj.value) + 1);
	flid.value =String(item.id);
	title.value = ymdj.value === '1' ? '销售数据':ymdj.value === '2'?item.name :ymdj.value === '3'?item.name:ymdj.value === '4'?'内存数据':ymdj.value === '5'?'全称数据':'商品列表'
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
	
	const selectedDataAnalysis = uni.getStorageSync('selectedDataAnalysis')
	if(selectedDataAnalysis){
		console.log('push')
		selectedDataAnalysis.push({
			flid:flid.value,
			ppid:ppid.value,
			xhid:xhid.value,
			ncid:ncid.value,
			qcid:qcid.value
		})
		uni.setStorageSync('selectedDataAnalysis',selectedDataAnalysis)
	}else{
		console.log('set')
		uni.setStorageSync('selectedDataAnalysis',[{
			flid:flid.value,
			ppid:ppid.value,
			xhid:xhid.value,
			ncid:ncid.value,
			qcid:qcid.value
		}]);
	}
	
	paging.value.reload(true);

};

const computedPercentage1 = (item) => {
	if (!switchNum) {
		if (totalPrice.value !== 0) {
			return ((item.price / totalPrice.value) * 100).toFixed(0)
		} else {
			return 0;
		}
	} else {
		if (num.value !== 0) {
			return ((item.num / num.value) * 100).toFixed(0);
		} else {
			return 0;
		}
	}
};

const increaseProgress = (targetValue) => {
	const timer = setInterval(() => {
		if (progressValue.value < targetValue) {
			progressValue.value += 1;
		} else {
			clearInterval(timer); // 达到目标值后停止定时器
		}
	}, 10); // 每10毫秒增加一次进度值
};

const computedPercentage = (item) => {
	if (!switchNum) {
		if (totalPrice.value !== 0) {
			increaseProgress((item.price / totalPrice.value) * 100);
		} else {
			progressValue.value = 0;
		}
	} else {
		if (num.value !== 0) {
			increaseProgress((item.num / num.value) * 100);
		} else {
			progressValue.value = 0;
		}
	}
};

const customLeftFn = ()=>{
	console.log('customLeftFn')
	if(ymdj.value !== '1'){
		start.value = '1';
		ymdj.value = String(parseInt(ymdj.value) - 1);
		const selectedDataAnalysis = uni.getStorageSync('selectedDataAnalysis')
		const {	flid:flid1,
			ppid:ppid1,
			xhid:xhid1,
			ncid:ncid1,
			qcid:qcid1} = selectedDataAnalysis.pop()
		flid.value = flid1;
		ppid.value = ppid1;
		xhid.value = xhid1;
		ncid.value = ncid1;
		qcid.value = qcid1;
		uni.setStorageSync('selectedDataAnalysis', selectedDataAnalysis);
		title.value = ymdj.value === '1' ? '销售数据':ymdj.value === '2'?item.name :ymdj.value === '3'?item.name:ymdj.value === '4'?'内存数据':ymdj.value === '5'?'全称数据':'商品列表'
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
		
		paging.value.reload(true);
	}else{
		uni.removeStorageSync('selectedDataAnalysis');
		uni.navigateBack();
	}
}

onLoad((options) => {
	if (options.title) {
		title.value = options.title;
	}
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.dataCenterDetail-layout {
	min-height: 100vh;
	background: #f3f2f6;
}
.saixuan {
	// border-top: 1rpx solid #f3f2f6;
	width: 750rpx;
	height: 120rpx;
	background: #ffffff;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 30rpx;
	.top {
		display: flex;
		justify-content: space-between;
	}
	.bottom {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.num-card {
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.1);
			display: flex;
			flex-direction: column;
			width: 210rpx;
			height: 100rpx;
			background: #ffefee;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			justify-content: space-between;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
			.row-1 {
				display: flex;
				flex-direction: column;
				text {
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #1f1f1f;
					text-align: center;
				}
			}
			.row-2 {
				display: flex;
				flex-direction: column;

				text {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
					text-align: center;
				}
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
.corner {
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
.pannel-text {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.pannel-text1 {
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.8;
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
