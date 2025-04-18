<template>
	<view class="imeiTrack-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#f3f2f6'">
			<template #name>串号追踪</template>
			<template #fill>快速批发</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 90rpx; background: #f3f2f6; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="1"
								:dataList="orgArray"
								phText="请输入串号"
								:searchKey="searchModelKey"
								:showField="showModelField"
								:showBorder="false"
								:disabled="false"
								@input="handleInput"
								@change="selectChange"
								ref="myInputRef"
							></qiaoSelect>
						</view>
					</view>
					<view class="right">
						<view class="inline" />
						<image src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill"  @click="scan"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- product card -->
		<view
			v-if="data"
			style="
				width: 710rpx;
				background: linear-gradient(45deg, #ffffff 0%, #ffffff 84%, #ffe8d8 100%);
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				flex-direction: column;
				padding: 20rpx;
				margin-top: 30rpx;
				margin-left: 20rpx;
			"
		>
			<view style="display: flex; align-items: center">
				<van-tag v-if="infos.zt" class="tag-class" size="mini" color="linear-gradient( 132deg, #FF9954 0%, #FF9954 100%)">{{getStatusName(infos.zt)}}</van-tag>
				<text
					style="
						width: 558rpx;
						height: 46rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 32rpx;
						color: #1f1f1f;
						text-align: left;
						font-style: normal;
						text-transform: none;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					"
				>
					
					{{data.name}}
					<!-- 华为Mate 60 RS 非凡大师 16GB+1TB 雅丹黑 -->
				</text>
			</view>
			<view style="display: flex; align-items: center; margin-top: 16rpx"  @click.stop="instance.proxy.copyText(data.ch)">
				<text style="margin-right: 10rpx; font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; text-align: left">
					IMEI：{{data.ch}}
				</text>
				<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
			</view>
			<view style="display: flex; align-items: flex-end; justify-content: space-between">
				<view>
					<text class="text-1">采购：{{data.cgyname}}</text>
					<text class="text-1">仓库：{{data.ckname}}</text>
				</view>
				<view
					style="
						padding: 10rpx 22rpx;
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						border: 2rpx solid #ff6d0c;
						opacity: 0.5;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #ff6d0c; text-align: center">条码补打</text>
				</view>
			</view>
		</view>

		<view style="background-color: #f3f3f3; height: 1100rpx; width: 100%">
			<z-paging ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
				<!-- content-->
				<view style="display: flex; flex-direction: column">
					<view
						v-for="(item, index) in dataList"
						:key="index"
						style="
							width: 710rpx;
							background: #ffffff;
							border-radius: 20rpx 20rpx 20rpx 20rpx;
							padding: 24rpx;
							margin-top: 20rpx;
							margin-left: 20rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
						"
					>
						<view style="display: flex; align-items: center; gap: 10rpx">
							<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: center">{{item.mk}}</text>
							<!-- <van-tag class="tag-class" size="mini" color="linear-gradient(132deg, #item.color 0%, #item.color 100%)">{{item.mklx}}</van-tag> -->
							<van-tag 
							  class="tag-class"
							  size="mini"
							  :color="{ background: `linear-gradient(132deg, ${item.color} 0%, ${item.color} 100%)` }"
							>{{item.mklx}}</van-tag>
						</view>
						<!-- formatTimestamp(item.add_time) -->
						<!-- 平台 -->
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; text-align: right">
						  {{ item.username }} {{ formatTimestamp(item.add_time) }}
						</text>


					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script setup>
import { formatTimestamp } from '@/utils/common.js'
import { apiFinanceChCheck } from '../api/api.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiImeiTrackList,apiImeiTrackSearch } from '../api/api.js'
import { scanCode } from '@/utils/common.js'
const instance = getCurrentInstance();
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
function getStatusName(zt) {
    const statusMap = {
        '1': '上架',
        '2': '下架',
        '3': '临时下架',
        '4': '退出仓库',
        '5': '平台已售',
        '6': '线下已售',
        '7': '先货后款'
    };

    return statusMap[zt] || '未知状态';
}
const infos = ref()
const searchModelKey = ref('ch');
const showModelField = ref('ch');
const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(true);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	console.log('id:',searchId.value)
	const data  =await apiImeiTrackListData(searchId.value,pageNo-1)
	paging.value.complete(data);
};
const orgArray = ref([]);
const handleInput = (inputText) => {
  console.log('输入框内容:', inputText);
  if (inputText.length>0) {
    apiFinanceChCheckData(inputText);
  }
};
const searchId = ref('');
const data = ref()
const selectChange = (e) => {
	console.log('模糊搜索 e',e);
	data.value = e;
	searchId.value  = e.id;
	dataList.value = []
	queryList()
};
const apiFinanceChCheckData = async (ch) => {
	const data = {
		ch: ch,
		opid: uni.getStorageSync('sessionInfo').opid,
	};
	const res = await apiImeiTrackSearch(data);
	if (res.code === 200) {
		 orgArray.value = res.lists;
	}else{
		orgArray.value = []
	}
	console.log('apiFinanceChCheckData res:', res);
};

const apiImeiTrackListData = async (id,start) => {
	const data = {
		id: id,
		start:start
	}
	const res = await apiImeiTrackList(data);
	if(res.zt===1){
		infos.value = res.infos
		return res.lists
	}
	
	console.log("res:",res);
	return  []
};

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.imeiTrack-layout {
	min-height: 100vh;
	background: #f3f2f6;
}
.search-fill {
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	background: #f3f2f6;
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
		width: 710rpx;
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

.tag-class {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	::v-deep .van-tag {
		border-radius: 8rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 22rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}
}
.text-1 {
	height: 32rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 22rpx;
	color: #828282;
	text-align: left;
	margin-right: 40rpx;
}
</style>
