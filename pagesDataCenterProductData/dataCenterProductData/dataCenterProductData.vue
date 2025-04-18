<template>
	<view class="dataCenterProductData-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#FFFFFF'">
			<template #name>商品数据</template>
			<template #fill>快速批发</template>
		</custom-header>

		<view class="saixuan">
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

		<van-dropdown-menu z-index="20" class="dropdownMenu" style="background: #ffffff" active-color="#EB4636">
			<van-dropdown-item :value="value1" :options="option1" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange1" />
			<van-dropdown-item :value="value2" :options="option2" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange2" />
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
				></uv-tabs>
			</view>

			<view class="corner" style="margin-top: 30rpx; display: flex; align-items: center; gap: 10rpx; margin-bottom: 20rpx">
				<view
					style="
						width: 670rpx;
						height: 76rpx;
						background: #fef8ef;
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(181, 144, 119, 0.3);
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 16rpx;
					"
				>
					<text class="text-4">总计台数</text>
					<text class="text-5">{{num}}</text>
					<text class="text-6">台</text>
				</view>
			</view>

			<view style="height: 900rpx; width: 100%">
				<z-paging ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
					<view
						v-for="(item, index) in dataList"
						:key="index"
						style="margin-top: 30rpx; display: flex; flex-direction: column; width: 100%; padding-left: 20rpx; padding-right: 20rpx">
						<view style="display: flex;align-items: center;gap: 12rpx;">
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
									border-radius: 10rpx 10rpx 10rpx 10rpx;">
								<text
									style="
										font-family: PingFang SC, PingFang SC;
										font-weight: 400;
										font-size: 24rpx;
										color: #b59077;
										text-align: center;
										font-style: normal;
										text-transform: none;">
									{{computedPercentage(item)}}%
								</text>
							</view>
						</view>
						
						
						<view style="margin-top: 8rpx; display: flex; justify-content: space-between; align-items: center; width: 100%">
							<view style="width: 466rpx">
								<van-progress
									track-color="#F8F8F8"
									color="linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)"
									:show-pivot="false"
									:percentage="computedPercentage(item)"
									stroke-width="12"
								/>
							</view>
							<view style="display: flex; align-items: center">
								<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 24rpx; color: #1f1f1f; line-height: 52rpx; text-align: right">
									{{item.num}}台
								</text>
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
import { apiGoodsData } from '../api/api.js'
// import { floatButtom } from './components/float-buttom.vue'
//时间区间
const timeCardData = ref(['今日', '昨日', '本月', '上月']);
const filteredTimeCardData = computed(() => timeCardData.value.filter((item, index) => index !== 4));
const timeRange = ref('时间区间');
const selectedIndex = ref(0);
const selectCard = (index) => {
	selectedIndex.value = index;
	showDropdown.value = false;
	showTimeRange.value = false;
	if(selectedIndex.value!==5){
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
	pickerStartTimestamp.value = toBeijingTimestamp(e.detail.value)
};
const onTimeChange2 = (e) => {
	console.log(e);
	pickerLastValue.value = e.detail.value;
	pickerLastTimestamp.value = toBeijingTimestamp(e.detail.value)
};
const showTimeRange = ref(false);
const showDropdown = ref(false);
const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	showTimeRange.value = true;
	selectedIndex.value = 4;
};
const tiemComfirm = ()=>{
	showDropdown.value = false;
	showTimeRange.value = false;
	paging.value.reload(true);
}
const resetTime = ()=>{
	pickerStartValue.value = '开始时间'
	pickerLastValue.value = '截止时间'
	pickerStartTimestamp.value = ''
	pickerLastTimestamp.value = ''
}
const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiGoodsDataList()
	paging.value.complete(data);
};
const option1 = ref([
	{ text: '全部仓库', value: -1 }
]);
const option2 = ref([
	{ text: '全部采购', value: -1 }
]);
const selectParamChange1 = (e)=>{
	console.log(e)
}
const selectParamChange2 = (e)=>{
	console.log(e)
}
const value1 = ref(-1);
const value2 = ref(-1);
const tabsData = ref([{ name: '定价上架',splx:'1' }, { name: '成色判断',splx:'2' }, { name: '拍照',splx:'3' }, { name: '维修检测',splx:'4' },{ name: '功能检测',splx:'5' }, { name: '商品录入',splx:'6' }]);
const activeTab1Index = ref(0);
const selectSplx = ref('1')
const uvTabs1Change = (e) => {
	activeTab1Index.value = e.index;
	selectSplx.value = tabsData.value[e.index].splx
	paging.value.reload(true);
};

const cgyglist = ref([])
const cklist = ref([])
const userlists = ref([])
const num = ref(0)
const apiGoodsDataList = async () => {
	console.log('selectedIndex:',selectedIndex.value)
	const data = {
	  lx: selectedIndex.value + 1,
	  splx: selectSplx.value,//1定价上架2成色判断3拍照4维修检测5功能检测6商品录入
	  startTime: (selectedIndex.value + 1) === 5 ? pickerStartTimestamp.value : '',
	  endTime: (selectedIndex.value + 1) === 5 ? pickerLastTimestamp.value : ''
	}

	const res = await apiGoodsData(data);
	if(res.zt === 1){
		cgyglist.value = res.cgyglist
		if(cgyglist.value){
			cgyglist.value.forEach(item => {
				const hasItem = option2.value.find(item1 => item1.value === parseInt(item.id))
				if(!hasItem){
					option2.value.push({ text: item.username, value:parseInt(item.id)})
				}
				option2.value = [...option2.value]
			})
		}
		cklist.value = res.cklist
		if(cklist.value){
			cklist.value.forEach(item => {
				const hasItem = option1.value.find(item1 => item1.value === parseInt(item.id))
				if(!hasItem){
					option1.value.push({ text: item.name, value:parseInt(item.id)})
				}
				option1.value = [...option1.value]
			})
		}
		userlists.value = res.userlists
		num.value = res.num
		console.log("option2",option2.value)
		console.log("option1",option1.value)
		return userlists.value
	}
	return []
};
const computedPercentage = (item) => {
  if (num.value === 0) {
    return 0;
  }
  return ((item.num / num.value) * 100).toFixed(0);
}
const title = ref();
onLoad((option) => {
	title.value = option.title;
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.dataCenterProductData-layout {
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
.text-4 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-5 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 800;
	font-size: 32rpx;
	color: #b59077;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-6 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.6;
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
