<template>
	<view class="layout">
		<!-- header -->
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<image src="https://www.xzxskj.com/xcximg/icon_back@3x.png" @click="goBack" mode="aspectFill"></image>
				<text @click="goBack">保修查询</text>
				<view class="title-tip">
					<image class="tip-image" src="https://www.xzxskj.com/xcximg/icon_tishi@3x.png" mode="aspectFill"></image>
					<button class="tip-btn" @click="openDialog">111</button>
				</view>
			</view>
		</view>

		<!-- 搜索栏 -->
		<view class="search-bar">
			<!-- 搜索框 -->
			<view class="search-content">
				<input v-model="searchInput" placeholder="imel或序列号" class="search-input" />
				<image src="https://www.xzxskj.com/xcximg/icon_saoyisao@3x.png" mode="aspectFill" @click="scanCode"></image>
			</view>
			<view class="search-btn">
				<text @click="handleInput2">查询</text>
			</view>
		</view>

		<!-- tab -->
		<view class="tab">
			<view class="tab-l">
				<uv-tabs
					:list="classA"
					lineWidth="30"
					lineColor="#f56c6c"
					:fontSize="32"
					:activeStyle="{ fontWeight: 'bold', color: '#303133' }"
					:inactiveStyle="{ color: '#606266' }"
					@click="onChange"
				></uv-tabs>
			</view>
			<view class="divider"></view>

			<view class="tab-r">
				<text class="coln" v-if="userInfo">余额：{{ userInfo.price }}元</text>
				<view class="tab-btn">
					<text class="btn-text">充值</text>
				</view>
			</view>
		</view>

		<!-- main -->
		<view class="main">
			<view class="main-l">
				<!-- 滚动 -->
				<scroll-view class="scroll-l" scroll-y :style="{ height: mainLScrollHeight + 'rpx' }">
					<!-- <scroll-view class="scroll-l" scroll-y> -->
					<view
						v-for="(item, index) in classB"
						:key="index"
						class="main-l-card"
						:style="{ background: index === activeCard ? 'linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)' : '#ffffff' }"
						@click="changeCardColor(index)"
					>
						<text class="top-text">{{ item.name }}</text>
						<text class="bottom-text">今日免费{{ item.free }}次,{{ item.price }}元/次</text>
					</view>
				</scroll-view>
			</view>
			<view class="main-divil"></view>
			<view class="main-r">
				<!-- <view class="scroll-r-a"> -->
				<!-- 滚动 -->
				<scroll-view v-if="checkResult || queryHisList" class="scroll-r" scroll-y :style="{ height: mainRScrollHeight + 'rpx' }">
					<view v-if="checkResult">
						<view class="margin-bottom">
							<view class="main-r-title">
								<view class="title-l">
									<text  >{{ checkResult.cxmc }}</text>
									<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
								<view class="title-r">
									<text>{{ checkResult.cxsj }}</text>
								</view>
							</view>
							<!-- <scroll-view class="scroll-r" scroll-y > -->
							<view v-for="(item, index) in checkList" :key="item.id" class="info">
								<text class="info-top">{{ item.names }}</text>
								<text class="info-bottom">{{ item.values }}</text>
							</view>
						</view>
					</view>
					<view v-if="queryHisList">
						<view v-for="(item1, index) in queryHisList" :key="index">
							<!-- <view v-for="(item2,index) in item1.fhnrss" :key="index"> -->
							<view class="margin-bottom">
								<view class="main-r-title" style="background: linear-gradient(133deg, #9b9b9b 0%, #fefefe 100%)">
									<view class="title-l" @click="copy(item1.fhnrss)">
										<text>{{ item1.cxmc }}</text>
										<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
									</view>
									<view class="title-r">
										<text>{{ item1.timess }}</text>
									</view>
								</view>
								<!-- <scroll-view class="scroll-r" scroll-y > -->
								<view v-for="(item2, index) in item1.fhnrss" :key="index" class="info">
									<text class="info-top">{{ item2.names }}</text>
									 <!-- <uv-tooltip class="info-bottom" :text="item2.values" :buttons="['扩展']" bgColor="#e3e4e6"></uv-tooltip> -->
									<text class="info-bottom">{{ item2.values }}</text>
								</view>
							</view>
							<!-- </view> -->
						</view>
					</view>
				</scroll-view>
				<!-- </view> -->
			</view>
		</view>

		<!-- bottom -->
		<!-- 底部空白区域 -->
		<view style="height: 160rpx; background: #f3f2f6"></view>
		<view class="bottom-adv">
			<view class="adv-banner">
				<view class="adv-l">
					<image class="adv-l-i" show-menu-by-longpress src="https://www.xzxskj.com/xcximg/erweima@3x.png" mode="aspectFill"></image>
				</view>
				<view class="adv-m">
					<text class="adv-m-t">转发1人送1元</text>
					<text class="adv-m-t">每天最多送10元!</text>
				</view>
				<view class="adv-r">
					<view class="adv-btn">
						<image class="adv-btn-i" src="https://www.xzxskj.com/xcximg/icon_share@3x.png" mode="aspectFill"></image>
						<text class="adv-btn-t" @click="share">转发</text>
					</view>
					<button class="shareB" open-type="share" plain>转发</button>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="center">
			<view class="popup-content">
				<view class="popup-header">温馨提示</view>
				<view class="popup-body">这是一个模态弹出框的内容...</view>
				<!-- <button class="close-btn" @click="closeModal">关闭</button> -->
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { debounce } from '../../utils/debounce.js';
import { onMounted } from 'vue';
import { copyText } from '../../utils/common.js';
const copy =(fhnrss)=>{
	let result = '';
	for (const key in fhnrss) {
	    if (fhnrss.hasOwnProperty(key)) {
	        const item = fhnrss[key];
	        result += `${item.names}：${item.values}，`;
	    }
	}
	// 移除最后一个逗号
	// result = result.slice(0, -1);
	result = result.replace(/，/g, '，\n');
	copyText(result)
}
const isLoading = ref(true);
const searchInput = ref();
const popup = ref(null);
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { useTabStore } from '@/stores/tabStore';
import { apiGetBrand, apiGetmaintenanceHis, apiCheackMaintenance } from '@/api/maintenance/maintenanceApi.js';
import { useTokenStore } from '@/stores/tokenStore.js';
const tabStore = useTabStore();
const cardColors = ref([]); // 添加这一行来定义 cardColors
const activeCard = ref(0); // 初始化为0，表示默认选中第一个
const classBid = ref();

const customIndex = ref('0');

const goBack = () => {
	uni.navigateBack();
};
const mainLScrollHeight = ref(0);
const mainRScrollHeight = ref(0);
const systemInfo = uni.getSystemInfoSync();
const rpx = 750 / systemInfo.windowWidth;
const windowHeightRpx = systemInfo.windowHeight * rpx;
const getScrollHeight = (selector, scrollRef) => {
	const query = uni.createSelectorQuery();
	query
		.select(selector)
		.boundingClientRect((res) => {
			const scrollTop = res.top * rpx;
			scrollRef.value = Math.max(0, windowHeightRpx - scrollTop - 175);
		})
		.exec();
};

onMounted(() => {
	// isLoading.value = true;
	//初始化1
	// getBrand(1);
	// getmaintenanceHis(1);
	getScrollHeight('.main-l', mainLScrollHeight);
	getScrollHeight('.main-r', mainRScrollHeight);
	// isLoading.value = false;
});

onMounted(async () => {
	// isLoading.value = true;
	try {
		// 同时发起两个请求
		await Promise.all([
			getBrand(1),
			getmaintenanceHis(1)
		]);

		// 获取滚动高度
		getScrollHeight('.main-l', mainLScrollHeight);
		getScrollHeight('.main-r', mainRScrollHeight);
	} catch (error) {
		console.error('请求失败:', error);
	} finally {
		// isLoading.value = false;
	}
});

// onLoad((query)=>{
// 	 if (query.nextPageData) {
// 	      const nextPageData = JSON.parse(decodeURIComponent(query.nextPageData));
// 		  userInfo.value = nextPageData.brandListRes.allinfos;
// 		  classA.value = nextPageData.brandListRes.ejlists;
// 		  classB.value = nextPageData.brandListRes.navlist;
// 		  classBid.value = classB.value[0].id;
// 		  const querlists = nextPageData.maintenanceHisRes.querlists;
// 		  if (!querlists) {
// 		  	queryHisList.value = null;
// 		  	return [];
// 		  }
// 		  queryHisList.value = querlists;
// 	      // 在这里可以使用传递过来的数据 res1 和 res2
// 	    }
// 	// getScrollHeight('.main-l', mainLScrollHeight);
// 	// getScrollHeight('.main-r', mainRScrollHeight);
// })
const closeModal = () => {
	popup.value.close();
};
const openDialog = () => {
	uni.showModal({
		title: '温馨提示',
		content: '所有查询结果仅供参考，若查询结果与官网不一致，则以官网为准；查询结果无法作为权威质检证明，且不具备任何法律效力。',
		showCancel: false,
		confirmText: '确定',
		confirmColor: '#FF7744'
	});
	// popup.value.open();
};

// 定义确认操作的方法
const confirm = () => {
	// console.log('点击确认按钮');
	modalRef.close();
};

// 扫码
const scanCode = () => {
	uni.scanCode({
		scanType:['barCode'],
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
			let scanTypeDescription = ''; // 定义变量来存储扫码类型的描述
			// 根据扫码类型设置scanTypeDescription的值
			switch (res.scanType) {
				case 'QR_CODE':
					scanTypeDescription = '二维码';
					break;
				case 'EAN_13':
					scanTypeDescription = '条形码';
					break;
				case 'barCode':
					scanTypeDescription = '一维码';
					break;
				case 'datamatrix':
					scanTypeDescription = 'Data Matrix 码';
					break;
				case 'pdf417':
					scanTypeDescription = '条形码';
					break;
				// 添加其他扫码类型的case
				default:
					scanTypeDescription = res.scanType; // 对于未知类型，直接使用scanType的值
			}

			//回填字段
			searchInput.value = res.result;
		}
	});
};
//用户信息
const userInfo = ref();
//1级分类数组
const classA = ref();
//2级分类数组  1 //苹果  2 //安卓
const classB = ref();
//查询结果
const checkResult = ref();
//结果数组
const checkList = ref([]);
//历史结果
const queryHis = ref();
//历史数组
const queryHisList = ref([]);
//获取分类信息以及用户信息
const getBrand = async (classId) => {
	const data = {
		brand_id: classId, //默认1
		opid: useTokenStore().opid
	};
	const res = await apiGetBrand(data);
	//获取余额
	userInfo.value = res.allinfos;
	// console.log("info:"+userInfo.value.price )
	classA.value = res.ejlists;
	classB.value = res.navlist;
	classBid.value = classB.value[0].id;
	// console.log("分类信息:"+res)
};
//查询保修历史记录
const getmaintenanceHis = async (classId) => {
	const queryMaintenanceHisList = uni.getStorageSync('queryMaintenanceHisList')
	const data = {
		opid: useTokenStore().opid
	};
	queryHis.value = await apiGetmaintenanceHis(data);

	const querlists = queryHis.value && queryHis.value.querlists;
	if (!querlists) {
		queryHisList.value = null;
		return [];
	}
	queryHisList.value = querlists;
};
const handleInput1 = debounce(getmaintenanceHis, 500); // 500ms内多次触发只会执行一次
//保修查询
const cheackMaintenance = async () => {
	uni.showLoading({
		title: 'Loading',
		mask: true
	});
	if (!searchInput.value) {
		uni.showModal({
			content: '请输入序列号或者条形码',
			showCancel: false,
			confirmText: '确定'
		});
		uni.hideLoading();
		return;
	}
	const data = {
		word: searchInput.value,
		lxid: classBid.value,
		opid: useTokenStore().opid
	};
	checkResult.value = await apiCheackMaintenance(data);
	if (checkResult.value.code !== '200') {
		uni.hideLoading();
		uni.showToast({
			title: '未查询到内容',
			icon: 'error',
			duration: 2000
		});
	}
	console.log('checkResult', JSON.stringify(checkResult.value));
	// const infos = checkResult.value && checkResult.value.infos;
	checkList.value = infosArray();
	console.log('checkList', JSON.stringify(checkList.value));
	uni.hideLoading();
};
const handleInput2 = debounce(cheackMaintenance, 500); // 500ms内多次触发只会执行一次
const infosArray = () => {
	const infos = checkResult.value && checkResult.value.infos;
	if (!infos) {
		checkResult.value = null;
		return [];
	}
	// 将infos对象的键值对转换为数组
	return Object.keys(infos).map((key) => ({
		id: key, // 将键存储为id
		...infos[key]
	}));
};
const hisArray = () => {
	const his = queryHis.value && queryHis.value.infos;
	if (!his) return [];
	// 将infos对象的键值对转换为数组
	return Object.keys(his).map((key) => ({
		id: key, // 将键存储为id
		...his[key]
	}));
};
//1级分类
const onChange = (e) => {
	console.log('切换了..' + e.index);
	const { index } = e.index;
	//重新获取数据
	getBrand(classA.value[e.index].id);
	// getmaintenanceHis(classA.value[e.index].id);
};
//2级切换
const changeCardColor = (index) => {
	// 设置新的被点击卡片的颜色
	cardColors.value[index] = 'linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)';
	// 恢复先前被点击卡片的颜色
	if (activeCard.value !== index) {
		cardColors.value[activeCard.value] = '#ffffff';
	}
	// 更新数据属性
	cardColors.value = [...cardColors.value];
	// 更新被点击的卡片索引
	activeCard.value = index;
	//获取选中的classBid
	classBid.value = classB.value[index].id;
	getmaintenanceHis(classBid.value);
};
</script>

<style lang="scss" scoped>
.layout {
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}
	.popup-content {
		background-color: #fff;
		border-radius: 15px;
		padding: 20px;
		width: 80%;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	.popup-header {
		font-size: 18px;
		color: #333;
		margin-bottom: 15px;
		text-align: center;
	}

	.popup-body {
		font-size: 16px;
		color: #666;
		margin-bottom: 20px;
		text-align: center;
	}

	.close-btn {
		display: block;
		height: 80rpx;
		width: 80%;
		margin: 0 auto;
		padding: 10px;
		background-color: #007aff;
		color: #fff;
		border-radius: 20px;
		border: none;
		text-align: center;
		font-size: 16px;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
	height: 100vh;
	background: #f3f2f6;
	.header {
		.titleBar {
			// border: 2rpx solid red;
			padding: 0 20rpx;
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
				margin-left: 20rpx;
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
			}
		}
	}
	.search-bar {
		// display: inline-block;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 35rpx 20rpx 30rpx 20rpx;

		.search-content {
			width: 534rpx;
			height: 72rpx;
			background: #ffffff;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			border: 2rpx solid #242424;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 24rpx;
			image {
				width: 36rpx;
				height: 36rpx;
			}
			text {
				height: 36rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				color: #1F1F1F;
				opacity: 0.6;
			}
		}

		.search-btn {
			margin-left: 20rpx;
			width: 136rpx;
			height: 72rpx;
			background: linear-gradient(133deg, #ed784b 0%, #eb4636 100%);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				width: 56rpx;
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #ffffff;
			}
		}
	}
	
	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		height: 86rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		.tab-l {
			height: 100%;
			width: 224rpx;
			// border: 2rpx solid red;
		}
		.divider {
			position: absolute;
			height: 40rpx;
			width: 5rpx; // 分割线的宽度
			// background-color: #eee; // 分割线的颜色
			// border-right: 4rpx solid #eee;
			border-right: 4rpx solid #eee;
			margin-left: 224rpx;
		}
		.tab-r {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: 30rpx;
			.coln {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #242424;
			}
		}
		.tab-btn {
			width: 88rpx;
			height: 44rpx;
			background: #ffd0be;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 20rpx;
			text {
				width: 48rpx;
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #eb4636;
			}
		}
	}

	.main {
		width: 100%;
		margin-top: 14rpx;
		display: flex;
		justify-content: space-between;
		.main-l {
			scroll-view {
				// height: 100%;
				width: 224rpx;
				display: flex;
				flex-direction: column;
				.main-l-card {
					width: 100%;
					height: 116rpx;
					background: #ffffff;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-bottom: 10rpx;
					.top-text {
						// width: 112rpx;
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #242424;
					}
					.bottom-text {
						// width: 204rpx;
						height: 28rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #1F1F1F;
						opacity: 0.68;
					}
				}
			}
		}
		.main-divil {
			border-right: 2rpx solid #eeeeee;
		}

		.main-r {
			background: #f3f2f6;
			// border: 12rpx solid #black;
			// box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			width: 498rpx;
			margin-right: 10rpx;
			.scroll-r {
				border-radius: 10rpx 10rpx 0rpx 0rpx;
				// border: 4rpx solid #eee;
				.margin-bottom {
					// border: 1rpx solid #ebebeb;
					border-top: 1rpx solid #ebebeb;
					border-left: 1rpx solid #ebebeb;
					border-bottom: 1rpx solid #ebebeb;
					border-radius: 10rpx 10rpx 0rpx 0rpx;
				}
			}
			.main-r-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 64rpx;
				background: linear-gradient(133deg, #ffa582 0%, #fefefe 100%);
				border-radius: 10rpx 10rpx 0rpx 0rpx;
				.title-l {
					// border: 2rpx solid black;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 30rpx;
					image {
						height: 20rpx;
						width: 20rpx;
						opacity: 0.5;
					}
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #ffffff;
						margin-right: 10rpx;
					}
				}
				.title-r {
					margin-right: 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text {
						text-align: center;
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #242424;
					}
				}
			}
			scroll-view {
				// height: 100%;
				// height: 800rpx;
				.info {
					// width: 466rpx;
					background: #ffffff;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					border: 2rpx solid #ffffff;
					margin: 10rpx 16rpx;
					padding: 12rpx 14rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					flex-wrap: wrap;
					.info-top {
						// height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #aeaeae;
					}
					.info-bottom {
						// height: 100rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
				}
			}
		}
	}
	.bottom-adv {
		width: 750rpx;
		height: 160rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		// border: 2rpx solid red;
		padding: 22rpx 30rpx;
		.adv-banner {
			// border: 2rpx solid red;
			width: 690rpx;
			height: 116rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 38rpx;
			padding-right: 30rpx;

			.adv-l {
				// border: 2rpx solid red;
				display: flex;
				justify-content: center;
				align-items: center;
				.adv-l-i {
					height: 74.5rpx;
					width: 74.5rpx;
				}
			}
			.adv-m {
				// border: 2rpx solid red;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.adv-m-t {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1f1f1f;
				}
			}
			.adv-r {
				border: 2rpx solid red;
				width: 116rpx;
				height: 44rpx;
				background: linear-gradient(180deg, #ed784b 0%, #eb4636 100%);
				border-radius: 22rpx 22rpx 22rpx 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.shareB {
					position: absolute;
					opacity: 0;
				}
				.adv-btn {
					width: 100%;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					// border: 2rpx solid black;
					.adv-btn-i {
						height: 24rpx;
						width: 20rpx;
					}
					.adv-btn-t {
						width: 48rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #ffffff;
					}
				}
			}
		}
	}
}
</style>
