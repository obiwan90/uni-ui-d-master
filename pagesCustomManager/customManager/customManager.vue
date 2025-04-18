<template>
	<view class="customManager-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#ffffff'">
			<template #name>客户管理</template>
			<template #fill>客户管理</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 140rpx; background: #ffffff; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								class="search-select"
								:keyId="2"
								:dataList="orgArray"
								phText="请选择客户名称或手机号码"
								:searchKey="searchModelKey"
								:showBorder="false"
								:disabled="false"
								:showField="showModelField"
								@input="handleInput"
								@change="selectSearchChange"
							></qiaoSelect>
							
						</view>
					</view>
				</view>
				<view class="select-btn" @click="selectSaiXuan">
					<uni-data-select
						style="position: absolute;"
						class="data-select"
					    :localdata="returnProductRange"
						placement="bottom"
					    @change="returnProductChange"
						:clear="false"
					>
					</uni-data-select>
					
					<image src="https://www.xzxskj.com/xcximg/icon_paixu@3x.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	
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
						<text class="text-14">{{ item }}</text>
					</view>
		
					<view
						class="dropdown-button"
						@click="toggleDropdown"
						:class="{ selected: showTimeRange }"
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
								<view @click="resetTimeRange"
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
		
								<view @click="selectTimeRange"
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
		
		
		<view style="background-color: #f3f3f3; height: 1100rpx; width: 100%">
			<z-paging ref="paging" :default-page-size = "20" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
				<view
					v-for="(item, index) in dataList"
					:key="index"
					style="
						width: 710rpx;
						background: linear-gradient(41deg, #ffffff 0%, #ffffff 82%, #ffe8d8 100%);
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						padding: 24rpx;
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						margin-top: 20rpx;
					"
				>
					<view style="display: flex; align-items: center; gap: 14rpx">
						<image style="height: 56rpx; width: 56rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/img@3x.png" mode="aspectFill;"></image>
						<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left">{{item.khname}}</text>
					</view>

					<view class="bottom">
						<view class="data-center-card">
							<text class="text-1">{{ item.num }}</text>
							<text class="text-2">欠款台数</text>
						</view>
						<view class="data-center-card">
							<text class="text-1">{{ item.price }}</text>
							<text class="text-2">欠款金额</text>
						</view>
						<view class="data-center-card">
							<text class="text-1">{{ item.nums }}</text>
							<text class="text-2">采购台数</text>
						</view>
						<view class="data-center-card">
							<text class="text-1">{{ item.prices }}</text>
							<text class="text-2">采购金额</text>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

		<view style="height: 202rpx" />
		<view class="bottom-btn" @click="goNew">
			<button class="center-btn">新建客户</button>
		</view>
	</view>
</template>

<script setup>
import { convertDateStringToTimestamp } from '@/utils/common.js';
import { apiCustomerSearch,apiCustomerList,apiCustomerData } from '../api/api.js';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';

const returnProductSelectValue =  ref(0)
const returnProductRange = ref([
	{ value: 0, text: "默认" },
	{ value: 1, text: "采购台数最多" },
	{ value: 2, text: "采购金额最多" },
	{ value: 3, text: "欠款台数最多" },
	{ value: 4, text: "欠款金额最多" },
])
const filterFlag = ref(false)
const returnProductChange = (e) => {
  console.log('returnProductSelectValue:',e);
  selectedPxlx.value = e
  paging.value.reload(true)
}

const searchModelKey = ref('mdmc');
const showModelField = ref('mdmc');
const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(true);
const lx = ref('1');
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data =await apiCustomerListData(pageNo-1)
	console.log('res data:',data)
	paging.value.complete(data);
};
const orgArray = ref([]);
const selectChange = (e) => {
	console.log(e);
};
//时间区间
const timeCardData = ref(['今日', '昨日', '本月', '上月']);
const filteredTimeCardData = computed(() => timeCardData.value.filter((item, index) => index !== 4));
const timeRange = ref('时间区间');
const selectedIndex = ref(0);
const selectCard = (index) => {
	selectedIndex.value = index;
	showDropdown.value = false;
	showTimeRange.value = false;
	lx.value = index+1;
	paging.value.reload(true);
};

const pickerStartValue = ref('开始时间');
const pickerLastValue = ref('截止时间');
const onTimeChange1 = (e) => {
	pickerStartValue.value = e.detail.value;
};
const onTimeChange2 = (e) => {
	pickerLastValue.value = e.detail.value;
};
const showTimeRange = ref(false);
const showDropdown = ref(false);
const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	showTimeRange.value = true;
	selectedIndex.value = -1;
};

const selectTimeRange = ()=>{
	showDropdown.value = !showDropdown.value;
	showTimeRange.value = true;
	lx.value = '5'
	paging.value.reload(true)
}

const resetTimeRange = ()=>{
	pickerStartValue.value = '开始时间';
	pickerLastValue.value = '截止时间';
}

const data = ref([
	{ text: '欠款台数', values: '25' },
	{ text: '欠款金额', values: '51545' },
	{ text: '采购台数', values: '25' },
	{ text: '采购金额', values: '515451' }
]);
const goNew = () => {
	uni.navigateTo({
		url: '/pagesMyCustomer/myCustomer/myCustomer'
	});
};

const handleInput = (inputText) => {
	if (inputText.length>0) {
		apiCustomerSearchData(inputText);
	}else{
		selectedKhid.value = ''
	}
};
const selectSearchChange = (e) => {
	if (e) {
		console.log('selectSearchChange e:', e);
		selectedKhid.value = e.id
		paging.value.reload(true)
	}
};


const apiCustomerSearchData = async (phone) => {
	const data = {
		phone: phone,
		opid: uni.getStorageSync('sessionInfo').opid,
		lx:'2'
		
	}
	const res = await apiCustomerSearch(data);
	if (res.zt === 1) {
		console.log('res:', res);
		orgArray.value = res.lists?res.lists:[];
	}
};
const selectedKhid = ref('')
const selectedPxlx = ref('')
const khlists = ref([])
const apiCustomerListData = async (start) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		lx:lx.value,
		startTime:lx.value=='5'?convertDateStringToTimestamp(pickerStartValue.value):'',
		endTime:lx.value=='5'?convertDateStringToTimestamp(pickerLastValue.value):'',
		start:start,
		khid:selectedKhid.value,
		pxlx:selectedPxlx.value==='0'?'':selectedPxlx.value
	}
	const res = await apiCustomerData(data);
	if (res.zt === 1) {
		console.log('res:', res);
		khlists.value = res.lists;
		return khlists.value;
	}else{
		return [];
	}
};
onShow(()=>{
	paging.value.reload(true);
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.customManager-layout {
	min-height: 100vh;
	background: #f3f2f6;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.search-fill {
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	background: #ffffff;
	margin-bottom: 32rpx;
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
		padding-left: 10rpx;
		width: 618rpx;
		height: 72rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 2rpx solid #242424;
		display: flex;
		align-items: center;
		justify-content: space-between;
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

		.right {
			display: flex;
			align-items: center;
			.inline {
				margin-right: 30rpx;
				width: 2rpx;
				height: 28rpx;
				background: #eeeeee;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
			}
			image {
				margin-right: 30rpx;
				// border: 1rpx solid black;
				height: 30rpx;
				width: 30rpx;
			}
		}
		.search-content {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			flex: 1;
			.search-image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 15rpx;
			}
			.selectDownUp {
				width: 100%;
				// border: 1rpx solid red;
			}
			.search-content-text {
				width: 400rpx;
				height: 36rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				color: #1f1f1f;
				text-align: left;
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
			height: 28rpx;
			width: 36rpx;
		}
	}
}
.bottom {
	box-sizing: border-box;
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
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		.text-1 {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
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
.bottom-btn {
	width: 750rpx;
	height: 182rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 0rpx 0rpx 0rpx 0rpx;

	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 62rpx;

	.center-btn {
		width: 690rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
	}
	.left-btn {
		width: 232rpx;
		height: 96rpx;
		background: #ffeeec;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #eb4636;
		text-align: center;
	}
	.right-btn {
		width: 444rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
	}
}
.saixuan {
	border-top: 1rpx solid #f3f2f6;
	width: 750rpx;
	padding-bottom: 30rpx;
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
.data-select{
	width: 180rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1F1F1F;
	::v-deep .uni-select__selector {
		width: 220rpx;
		left:-70rpx;
		
	}
	::v-deep .uni-select__input-text{
		opacity: 0;
	}
	::v-deep .uni-popper__arrow_bottom{
		left:70%;
	}
	::v-deep .uni-select {
		border: none;
	}
}
</style>
