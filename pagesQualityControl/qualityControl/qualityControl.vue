<template>
	<view class="qualityControl-layout">
	<z-paging ref="paging" show-refresher-update-time v-model="dataList" @query="queryList">
		<!-- <view class="qualityControl-layout"> -->
			<template #top>
				<!-- header -->
				<custom-header :backgroundColor="'#FFFFFF'">
					<template #name>质检管理</template>
					<template #fill>质检管理</template>
				</custom-header>
			</template>
			<!-- 搜索栏 -->
			<view class="search-fill" style="height: 140rpx; background: #ffffff; width: 100%">
				<view class="search">
					<view class="searchBar">
						<view class="search-content">
							<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
							<view class="selectDownUp">
								<qiaoSelect
									:keyId="1"
									:dataList="orgArray"
									phText="搜索串号"
									searchKey="name"
									:showBorder="false"
									:disabled="false"
									:searchKey="searchModelKey"
									:showField="showModelField"
									@input="handleInput"
									@change="selectSearchChange"
									ref="myInputRef"
								></qiaoSelect>
							</view>
						</view>
						<view class="right">
							<view class="inline" />
							<image src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill"  @click="scan"></image>
						</view>
					</view>
					<view class="select-btn" @click="selectSaiXuan">
						<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFill" ></image>
					</view>
				</view>
			</view>
			
			<view class="saixuan" >
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
											<text class="text-1">{{ pickerStartValue }}</text>
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
											<text class="text-1">{{ pickerLastValue }}</text>
										</picker>
									</view>
								</view>
			
								<view style="display: flex; justify-content: space-between; align-items: center">
									<view
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
										<text class="text-2">重置</text>
									</view>
			
									<view
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
										<text class="text-3">确定</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="bottom" v-if="permissionStore.hasMenuAuthority('qualityData')">
					<view class="num-card" >
						<view class="row-1">
							<text>{{splrcount}}</text>
						</view>
						<view class="row-2">
							<text>商品录入</text>
						</view>
					</view>
					<view class="num-card" >
						<view class="row-1">
							<text>{{gnjccount}}</text>
						</view>
						<view class="row-2">
							<text>功能检测</text>
						</view>
					</view>
					<view class="num-card" >
						<view class="row-1">
							<text>{{wxjccount}}</text>
						</view>
						<view class="row-2">
							<text>维修检测</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="background-color: #f3f3f3; width: 100%;height: 1000rpx;">
				<z-paging ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
				<view class="product-card" v-for="(item, index) in dataList" :key="index">
					<view class="title">
						<image src="https://www.xzxskj.com/xcximg/icon_time@3x.png" mode="aspectFill"></image>
						<text>质检完成时间：{{formatTimestamp(item.servicetime)}}</text>
					</view>
					<view class="divile" />
					<view class="product-name">
						<text>{{item.name}}</text>
					</view>
					<view class="imei" @click.stop="instance.proxy.copyText(item.ch)">
						<text>IMEI：{{item.ch}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<view class="content">
						<view class="row">
							<view class="text-1">
								<text>采购员工：{{item.cgyname}}</text>
							</view>
							<view class="text-1">
								<text>商品录入：{{item.splr}}</text>
							</view>
						</view>
						<view class="row">
							<view class="text-1">
								<text>功能检测：{{item.gnjcname}}</text>
							</view>
							<view class="text-1">
								<text>维修检测：{{item.wxjcname}}</text>
							</view>
						</view>
					</view>
					<view class="divile" />
					<view class="btn-content">
						<view class="menu-dropdown-wrapper">
							<view class="dropdown-trigger button-animation" :id="'dropdown-trigger' + index" @click="toggleMenuDropdown(index)" v-if="permissionStore.hasMenuAuthority('updateQuality')">
								<text class="pannel-text1">修改质检</text>
							</view>
							<van-overlay :show="showMenuDropdownArray[index]" @click="onClickHide">
								<view class="dropdown-content" :style="{ top: `${triggerTop + triggerHeight + 12}px` }">
									<view class="dropdown-bubble" :style="{ left: `${triggerLeft + 24}px` }"></view>
									<!-- display: flex;
											justify-content: space-between;
											align-items: center; -->
									
									<view
										style="
											width: 710rpx;
											height: 200rpx;
											background: #ffffff;
											box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
											border-radius: 20rpx 20rpx 20rpx 20rpx;
											padding-left: 40rpx;
											padding-right: 40rpx;
											display: grid;
											grid-template-columns: 33.33% 33.33% 33.33%;
											justify-content: space-between;
										"
									>
										<view v-for="(item1, index) in menuBtn" :key="index" style="display: flex; align-items: center; gap: 10rpx"  @click="actionHandle(item1,item.ch)">
											<image style="height: 32rpx; width: 32rpx" :src="item1.image" mode="aspectFill"></image>
											<text class="pannel-text">{{ item1.text }}</text>
										</view>
									</view>
								</view>
							</van-overlay>
						</view>

						<view class="btn button-animation" v-for="(item4, index) in btnData" :key="index" @click="handleBtnClick(item4,item)">
							<text class="pannel-text">{{ item4 }}</text>
						</view>
					</view>
				</view>
				</z-paging>
			</view>
	</z-paging>
	</view>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saixuanPannelPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
		<qualitySaixuan :cgyglist="cgyglist" :gnjcarrays="gnjcarrays" :splrarrays="splrarrays" :wxjcarrays="wxjcarrays" v-if="showSaiXuan" @close="handleClose" ></qualitySaixuan>
	</uni-popup>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js'
import { apiQualityControlList } from '@/api/qualityControl/qualityControl.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { qualitySaixuan } from './components/qualitySaixuan.vue'
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
import { scanCode } from '@/utils/common.js'
const instance = getCurrentInstance();
const searchModelKey = ref('ch');
const showModelField = ref('ch');
const myInputRef = ref(null)
const scan = async () => {
	showLoading();
	try {
		const result = await scanCode();
		console.log('result', result);
		if (result) {
			handleInput(result).then(()=>{
				if(orgArray.value.length>0){
					myInputRef.value.inputText = orgArray.value[0].ch
				}
			});
		}
	} catch (error) {
		console.error('扫码失败：', error);
	} finally {
		hideLoading();
	}
};

const showLoading = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true 
	});
};

const hideLoading = () => {
	uni.hideLoading();
};
const permissionStore = usePermissionStore();
const saixuanPannelPopup = ref(null)
const showSaiXuan = ref(false)
const handleClose = () => {
	console.log('Popup is closed');
	saixuanPannelPopup.value.close();
};
const pannelChange = (e)=>{
	if(!e.show){
		showSaiXuan.value = e.show
	}
}
const selectSaiXuan = ()=>{
	showSaiXuan.value = true
	saixuanPannelPopup.value.open()
}

const dropdownRef = ref(null);
const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiQualityControlListData(param);
	console.log('data:', data);
	paging.value.complete(data);
};
const orgArray = ref([]);
const selectChange = (e) => {
	console.log(e);
};
const handleInput =async (inputText) => {
	if (inputText.length>0) {
		uni.showLoading({
			title:'加载中....',
			mask:true
		})
		console.log('inputText',inputText)
		param.value.ch = inputText
		const data = await apiQualityControlListData(param);
		console.log('search data',data)
		orgArray.value = data
		uni.hideLoading()
	}
};
const selectSearchChange = (e) => {
	if (e) {
		console.log('selectSearchChange e:', e);
		paging.value.complete([e])
	}
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
	param.value.lx = index+1
	paging.value.reload(true);
};

const pickerStartValue = ref('开始时间');
const pickerLastValue = ref('截止时间');

const onTimeChange1 = (e) => {
	console.log(e);
	pickerStartValue.value = e.detail.value;
};
const onTimeChange2 = (e) => {
	console.log(e);
	pickerLastValue.value = e.detail.value;
};

const showTimeRange = ref(false);
const showDropdown = ref(false);
const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	showTimeRange.value = true;
	selectedIndex.value = -1;
};

const btnData = ref(['修改日志', '查看报告']);
const handleBtnClick = (btn,item) => {
	console.log('Button clicked:', btn);
	if (btn === '修改日志') {
		uni.navigateTo({
			url: '/pagesEditLog/editLog/editLog?id='+item.id
		});
	}
	if(btn==='查看报告') {
		uni.navigateTo({
			url: '/pagesQualityReport/qualityReport/qualityReport?ch='+item.ch
		});
	}
};

const showMenuDropdown = ref(false);
const triggerHeight = ref(0);
const triggerTop = ref(0);
const triggerLeft = ref(0);
const showMenuDropdownArray = ref([]);
const menuBtn = ref([
	{text:'商品录入',image:'https://www.xzxskj.com/xcximg/icon_luru@3x.png',path:'/pagesProductInput/productInput/productInput?from=QC',menuAuthority:'productInput'},
	{text:'功能检测',image:'https://www.xzxskj.com/xcximg/icon_gnjc@3x.png',path:'/pagesFuncCheck/funcCheck/funcCheck?from=QC',menuAuthority:'funcCheck'},
	{text:'维修检测',image:'https://www.xzxskj.com/xcximg/icon_wxjc@3x.png',path:'/pagesMaintenanceInput/maintenanceInput/maintenanceInput?from=QC',menuAuthority:'maintenanceInput'},
	{text:'图片修改',image:'https://www.xzxskj.com/xcximg/icon_luru@3x.png',path:'/pagesTakePhoto/takePhoto/takePhoto?from=QC',menuAuthority:'takePhoto'},
	{text:'成色判断',image:'https://www.xzxskj.com/xcximg/icon_gnjc@3x.png',path:'/pagesFinenessJudge/finenessJudge/finenessJudge?from=QC',menuAuthority:'finenessJudge'},
	{text:'修改价格',image:'https://www.xzxskj.com/xcximg/icon_wxjc@3x.png',path:'/pagesListingProduct/listingProduct/listingProduct?from=QC',menuAuthority:'listingProduct'}
])
const toggleMenuDropdown = (index) => {
	showMenuDropdownArray.value[index] = !showMenuDropdownArray.value[index];
	getTriggerPosition(index);
};
const getTriggerPosition = (index) => {
	nextTick(() => {
		const query = uni.createSelectorQuery();
		query
			.select('#dropdown-trigger' + index)
			.boundingClientRect()
			.exec((res) => {
				triggerTop.value = res[0].top;
				triggerHeight.value = res[0].height;
				triggerLeft.value = res[0].left;
				console.log('triggerTop:', triggerTop.value);
				console.log('triggerHeight:', triggerHeight.value);
				console.log('triggerLeft:', triggerLeft.value);
			});
	});
};
const onClickHide = () => {
	showMenuDropdownArray.value.forEach((_, index) => {
		showMenuDropdownArray.value[index] = false;
	});
};

const param = ref({
	lx: '1',
	startTime:'',
	endTime:'',
	cgyid:'',
	wxjcid:'',
	gnjcid:'',
	splrid:'',
	start: 0,
	ch:''
});
const cgyglist = ref([])
const gnjcarrays = ref([])
const splrarrays = ref([])
const wxjcarrays = ref([])
const gnjccount = ref(0)
const splrcount = ref(0)
const wxjccount = ref(0)
const apiQualityControlListData = async (param) => {
	const res = await apiQualityControlList(param.value);
	console.log('res:', res);
	if(res.zt === 1){
		cgyglist.value = res.cgyglist
		gnjcarrays.value = res.gnjcarrays
		splrarrays.value = res.splrarrays
		wxjcarrays.value = res.wxjcarrays
		gnjccount.value = res.gnjccount
		splrcount.value = res.splrcount
		wxjccount.value = res.wxjccount
		return res.lists
	}else{
		return []
	}
};

const actionHandle = (item1,ch)=>{
	uni.navigateTo({
		url:item1.path+"&ch="+ch
	})
}

onMounted(() => {
	//初始化  遮罩数组
	showMenuDropdownArray.value = new Array(12).fill(false);
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.qualityControl-layout {
	background: #f3f2f6;
	min-height: 100vh;
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
				height: 36rpx;
				width: 32rpx;
			}
		}
	}
	.saixuan {
		border-top: 1rpx solid #f3f2f6;
		width: 750rpx;
		// height: 270rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
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
	.product-card {
		margin-left: 20rpx;
		margin-top: 20rpx;
		width: 710rpx;
		// height: 416rpx;
		background: linear-gradient(45deg, #ffffff 0%, #ffffff 84%, #ffe8d8 100%);
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		.title {
			display: flex;
			align-items: center;
			image {
				height: 28rpx;
				width: 28rpx;
				margin-right: 10rpx;
			}
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.divile {
			width: 670rpx;
			height: 2rpx;
			background: #eeeeee;
			border-radius: 0rpx 20rpx 20rpx 20rpx;
			margin-top: 14rpx;
			margin-bottom: 20rpx;
		}
		.product-name {
			text {
				height: 46rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.imei {
			margin-top: 16rpx;
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
				text-align: left;
			}
			image {
				height: 20rpx;
				width: 20rpx;
				margin-left: 10rpx;
			}
		}
		.content {
			width: 100%;
			display: flex;
			flex-direction: column;
			.row {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				.text-1 {
					width: 50%;
					display: flex;
					align-items: center;
					text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
						text-align: left;
						opacity: 0.6;
					}
				}
			}
		}
		.btn-content {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.btn {
				width: 146rpx;
				height: 60rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
				border-radius: 30rpx 30rpx 30rpx 30rpx;
				border: 2rpx solid #eeeeee;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
					font-style: normal;
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
.text-2 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-3 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-4 {
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
</style>
