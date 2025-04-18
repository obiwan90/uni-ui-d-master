<template>
	<view v-if="isShow&&receivedData">
		<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
	</view>
	<view class="maintenanceInput-layout">
		<scroll-view enable-flex class="scroll-box" :scroll-y="show" style="height: 100vh; background: linear-gradient(180deg, #f3f2f6 0%, #f8f8f8 100%)">
			<!-- header -->
			<custom-header>
				<template #name>维修检测</template>
				<template #fill>功能检测</template>
			</custom-header>

			<!-- 搜索栏 -->
			<view class="search-fill" style="height: 140rpx; background: #f3f2f6; width: 100%">
				<view class="search">
					<view class="searchBar">
						<view class="search-content">
							<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
							<view class="selectDownUp">
								<qiaoSelect
									:keyId="4"
									:dataList="orgArray"
									phText="请输入串号"
									:searchKey="searchModelKey"
									:showBorder="false"
									:disabled="false"
									:showField="showModelField"
									@input="handleInput"
									@change="selectChange"
									ref="searchInputRef"
								></qiaoSelect>
							</view>
						</view>
						<view class="right">
							<view class="inline" />
							<image src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill" @click="scan"></image>
						</view>
					</view>
				</view>
			</view>

			<!-- prodcuct-card -->
			<view class="product-card" v-if="receivedData">
				<view class="row" :class="{ 'first-row': true }" >
					<text>{{ receivedData.spname }}</text>
				</view>
				<view class="row" @click.stop="instance.proxy.copyText(receivedData.imei)">
					<text>IMEI/SN：{{receivedData.imei}}</text>
					<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<view class="row">
					<text>商品录入：{{receivedData.inputPerson}}  {{receivedData.inputTime}}</text>
				</view>
				<view class="row">
					<text>功能检测：{{receivedData.funcInputPerson}}  {{receivedData.funcInputTime}}</text>
				</view>
			</view>
			<van-empty v-if="!receivedData" image="search" description="请搜索串号" />
			<view class="card-box" v-for="(item, index) in dynamicList" :key="index" v-if="dynamicList.length > 0">
				<uni-collapse ref="collapseRef" class="collapse" @change="(isOpen) => collapseChange(isOpen, index)">
					<uni-collapse-item :show-arrow="false" :open="collapsedStatus[index]" class="collapse" titleBorder="none" :border="false">
					<!-- <uni-collapse-item :show-arrow="false" :open="false" class="collapse" titleBorder="none" :border="false"> -->
						<template v-slot:title>
							<view class="collapse-title" style="padding: 24rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
								<text class="co-header">{{ item.name }}</text>
								<view style="display: flex; align-items: center; justify-content: center; gap: 10rpx">
									<text class="co-foot">{{ selectedText[index] }}</text>
									<!-- <text v-if="item.er.length > 3" class="arrow" :class="{ 'arrow-open': collapsedStatus[index] }">▼</text> -->
									<text class="arrow" :class="{ 'arrow-open': collapsedStatus[index] }">▼</text>
								</view>
							</view>
							<view class="content">
								<view
									:class="{ clicked: isSelected(index, item1) }"
									class="card"
									v-for="(item1, cardIndex) in item.er.slice(0, 3)"
									:key="cardIndex"
									@click.stop="handleCardClick(index, item1)"
								>
									<text :class="{ 'clicked-text': isSelected(index, item1) }" class="card-text">{{ item1.name }}</text>
								</view>
							</view>
						</template>
			
						<view v-if="item.er.length > 3" class="content">
							<view
								:class="{ clicked: isSelected(index, item1) }"
								class="card"
								v-for="(item1, cardIndex) in item.er.slice(3)"
								:key="cardIndex + 3"
								@click.stop="handleCardClick(index, item1)"
							>
								<text :class="{ 'clicked-text': isSelected(index, item1) }" class="card-text">{{ item1.name }}</text>
							</view>
						</view>
						<view  class="image-regin">
							<uv-upload
								v-if="showUpdate(index)"
								:fileList="fileListRef[index] || []"
								accept="image"
								:maxCount="photoSize"
								maxSize="5242880"
								width="152rpx"
								height="152rpx"
								:sizeType="['compressed']"
								:previewFullImage="true"
								:previewFullVideo="false"
								@afterRead="(event) => handleUpload(event,index,item.id)" 
								@oversize="(event) => uploadCheack(event, index)"
								@delete="(event) => handleDelete(event, index)">
								<view class="photos" style="height: 152rpx">
								  <image
									src="https://www.xzxskj.com/xcximg/img_add_img@3x.png"
									mode="aspectFill"
									style="width: 152rpx; height: 152rpx"
								  ></image>
								</view>
							</uv-upload>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>

			<view class="remark" v-if="receivedData">
				<view class="title">
					<text>维修检测备注</text>
				</view>
				<textarea v-model="formData.remark" class="remark-area" placeholder="请输入"></textarea>
			</view>

			<view v-if="receivedData" class="fill" style="height: 202rpx" />
			<view v-if="receivedData" class="select-btn">
				<view @click="comfrm" class="confim-btn button-animation">
					<text>提交报告</text>
				</view>
			</view>
		</scroll-view>
	</view>

	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="inputPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<view>
			<maintenanceInputConfirm ref="maintenanceInputConfirmRef" :receivedData="receivedData" @close="handleClose"></maintenanceInputConfirm>
		</view>
	</uni-popup>
</template>

<script setup>
import { apiModelSearch,apiQualityCheckAdd3,apiQualityCheckList,apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { uploadFiles, uploadCheack, uploadDelete,uploadFilesByIndex,uploadDeleteByIndex,formatTimestamp,uploadFilesByIndex1,navigateToPage } from '../../utils/common.js';
import maintenanceInputConfirm from './components/maintenanceInputConfirm.vue';
import { scanCode } from '@/utils/common.js'
const instance = getCurrentInstance();
const searchInputRef = ref(null)
const scan = async () => {
	showLoading();
	try {
		const result = await scanCode();
		console.log('result', result);
		if (result) {
			handleInput(result).then(()=>{
				if(orgArray.value.length>0){
					searchInputRef.value.inputText = orgArray.value[0].ch
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
const isShow = ref(false);
const maintenanceInputConfirmRef = ref(null)
const searchModelKey = ref('ch')
const showModelField = ref('ch')
const handleInput = (inputText)=>{
	if (inputText.length>0) {
		apiQualityCheckSerialSearchData(inputText)
	}
}
const beforeleave = (e) => {
	console.log('e:', e);
	isShow.value = false;
	uni.showModal({
		content: '退出质检流程再次质检请根据串号搜索',
		showCancel: true,
		success: (res) => {
			if (!res.cancel) {
				// 用户点击了确认
				console.log('用户点击了确认');
				const res = navigateToPage('pagesCustomMine/customMine/customMine');
			}else{
				isShow.value = true;
			}
		}
	});
};
const photoSize = ref('1');
const fileListRef = reactive({});
const dynamicList = ref([]);
const apiQualityCheckListData = async (ch) => {
  const res = await apiQualityCheckList({lx: '3',ch:ch});
  console.log('质检项：',res)
  if (res.code === 200) {
    return dynamicList.value = res.lists;
  } else {
    uni.showToast({
      title: res.msg,
      icon: 'none'
    });
  }
};

const collapsedStatus = ref([]); // 初始化折叠状态数组
const collapseChange = (isOpen, index) => {
	console.log('面板：', isOpen.length > 0);
	collapsedStatus.value[index] = isOpen.length > 0;
};

const clickedItems = ref([]);
const selectedText = ref([]);
const handleCardClick = (collapseIndex, item1) => {
	clickedItems.value[collapseIndex] = item1;
	selectedText.value[collapseIndex] = item1.name;
	console.log('selectedText:', selectedText.value);
	console.log('clickedItems:', clickedItems.value);
	if (showUpdate(collapseIndex)) {
		// 展开当前面板
		collapsedStatus.value[collapseIndex] = true;
	} else {
		collapsedStatus.value[collapseIndex] = false;
	}
};

const showUpdate = (index) => {
	const item = dynamicList.value[index];
	const selected = clickedItems.value[index];
	// return item.tpbs === '2' || (item.tpbs === '1' && selected && selected.color === 'red');
	return selected && selected.tpbs === '1';
};

const isSelected = (index, item1) => {
	return clickedItems.value[index] === item1;
};

const handleUpload = (event, index,itemId) => {
  uploadFilesByIndex1(event, index, fileListRef,itemId);
};


const handleDelete = (event, index) => {
	uploadDeleteByIndex(event, index, fileListRef);
};

const formData = reactive({
  remark: '', // 备注信息
});


const orgArray = ref([]);
const selectChange = (e) => {
	console.log('selectChange:', e);
	receivedData.value =  null;
	Object.keys(fileListRef).forEach(key => {
		fileListRef[key] = [];
	});
	if (e) {
		console.log('selectChange e:', e);
		const { name,ch,machinetime,jkuidname,id,functionaltime,gnjcuidname,service,wxjcycbg,wxjcbz } = e;
		
		receivedData.value = {
			spname: name,
			imei: ch,
			inputTime: formatTimestamp(machinetime),
			inputPerson: jkuidname,
			funcInputTime: formatTimestamp(functionaltime),
			funcInputPerson: gnjcuidname,
			zjid: id,
		};
		formData.remark = wxjcbz;
		apiQualityCheckListData(ch).then(() => {
			clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
			console.log('clickedItems.value：', clickedItems.value);
		
			if (service) {
				const serviceArray = service.split(',').map(Number);
				serviceArray.forEach((item) => {
					dynamicList.value.forEach((dynamicItem, index) => {
						const erItem = dynamicItem.er.find(er => er.id == item);
						if (erItem) {
							clickedItems.value[index] = erItem;
							selectedText.value[index] = erItem.name;
							collapsedStatus.value[index] = true;
						}
					});
				});
			}
		
			if (wxjcycbg) {
				const wxjcycbgArray = JSON.parse(wxjcycbg);
				wxjcycbgArray.forEach((item) => {
					const index = dynamicList.value.findIndex(dynamicItem => dynamicItem.id == item.id);
					if (index !== -1) {
						if (!fileListRef[index]) {
							fileListRef[index] = [];
						}
						fileListRef[index].push({ url: item.url, itemId: item.id });
					}
				});
				console.log('fileListRef:', fileListRef);
			}
		});
	}
};
const inputPopup = ref(null);
const show = ref(true);

const handleClose = () => {
	console.log('Popup is closed');
	inputPopup.value.close();
	show.value = true;
};
const change = (e) => {
	console.log('点击了遮罩e:', e);
	show.value = !e.show;
};
const comfrm = () => {
	console.log('校验所有检测项是否已选择:',clickedItems.value);
	console.log('校验所有检测项是否已选择:',clickedItems.value.some(item => !item));
	// 校验所有检测项是否已选择
	if (clickedItems.value.some(item => !item)) {
		uni.showToast({
			title: '请完成所有检测项',
			icon: 'none',
			duration: 500
		});
		return;
	}
	// 校验所有异常图片是否已上传 
	for (let index = 0; index < dynamicList.value.length; index++) {
		const item = dynamicList.value[index];
		const selected = clickedItems.value[index];
		if (showUpdate(index) && (!fileListRef[index] || fileListRef[index].length === 0)) {
			uni.showToast({
				title: `请上传 ${item.name} 的图片`,
				icon: 'none',
				duration: 500
			});
			return;
		}
	}
	apiQualityCheckAddData()
};

const apiQualityCheckAddData = async () => {
	// 收集所有文件的 URL
	const allFileUrls = [];
	for (let index in fileListRef) {
		if (fileListRef[index]) {
			fileListRef[index].forEach(file => {
				allFileUrls.push({ id: file.itemId, url: file.url }); // 假设 file.url 是文件的 URL
			});
		}
	}
	const data = {
		id: receivedData.value.id,
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		ch: receivedData.value.imei,
		ycbgtplist:JSON.stringify(allFileUrls),
		jbztid:clickedItems.value.map(item => item.id).join(','),
		jbztcolor:clickedItems.value.map(item => item.color).join(','),
		jkbz:formData.remark,
		lx:'3',//1商品录入2功能绿录入3维修录入
		zjid: receivedData.value.zjid
	};
	const res = await apiQualityCheckAdd3(data);
	if (res.zt === 1) {
		
		formData.successId = res.ids;
		maintenanceInputConfirmRef.value.getData(receivedData.value.imei);
		if(from.value!=='QC'){
			inputPopup.value.open();
		}else{
			uni.showToast({
				title: '提交成功',
				icon: 'none',
				duration: 2000
			})
		}
	} else {
		uni.showToast({
			title: '录入失败，请重试',
			icon: 'none',
			duration: 2000
		});
	}
};

const apiQualityCheckSerialSearchData = async (ch) => {
	uni.showLoading({
		
		title: '加载中....'
	})
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		//过滤未功能检测
		res.lists = res.lists.filter(item => item.functional !== '');
		console.log('apiQualityCheckSerialSearchData:', res);
		uni.hideLoading();
		return orgArray.value = res.lists?res.lists:[];
	}
	uni.hideLoading();
};

const from = ref('')
const receivedData = ref(null);
onLoad((options) => {
  if (options.data) {
	try {
	  isShow.value = true;
	  receivedData.value = JSON.parse(decodeURIComponent(options.data));
	  console.log('Received data:', receivedData.value);
	  apiQualityCheckListData(receivedData.value.imei).then(() => {
	    clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
	  });
	} catch (e) {
	  console.error('Failed to parse received data:', e);
	}
  }
 if(options.ch){
	  	console.log('进来了options:',options)
 	apiQualityCheckSerialSearchData(options.ch).then((res)=>{
 		// console.log('apiQualityCheckSerialSearchData:',res)
 		selectChange(res[0])
 	})
 }
 if(options.from){
 	from.value = options.from
 }
});

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.maintenanceInput-layout {
	height: 100vh;
	width: 750rpx;
	background: linear-gradient(180deg, #f3f2f6 0%, #f8f8f8 100%);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.product-card {
	margin-left: 20rpx;
	width: 710rpx;
	// height: 228rpx;
	background: linear-gradient(180deg, #ffeae8 0%, #ffffff 31%, #ffffff 100%);
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 24rpx 20rpx;
	justify-content: space-between;
	.row {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1f1f1f;
			text-align: left;
		}
		&.first-row {
			margin-top:0;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
	}
}
.remark {
	margin-left: 20rpx;
	margin-top: 20rpx;
	width: 710rpx;
	height: 296rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 28rpx;
	.title {
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
	}
	.remark-area {
		box-sizing: border-box;
		margin-top: 20rpx;
		// border: 1rpx solid red;
		padding: 24rpx;
		width: 662rpx;
		height: 180rpx;
		background: #f3f2f6;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}
}
.card-box {
	margin-left: 20rpx;
	margin-top: 30rpx;
	width: 710rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 24rpx;
	.collapse {
		border-radius: 20rpx;
		margin-top: -20rpx;
		.co-header {
			margin-left: -24rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
		.co-foot {
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #1f1f1f;
			opacity: 0.7;
		}
		.content {
			width: 670rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: grid;
			justify-content: space-between;
			grid-template-columns: 33.33% 33.33% 33.33%;
			grid-column-gap: 10rpx;
			.card {
				margin-bottom: 10rpx;
				width: 198rpx;
				height: 80rpx;
				background: #f9f9f9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.card-text.clicked-text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
				}
				.card-text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
				}
				&.clicked {
					background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
					animation: selectedAnimation-1 1s ease;
				}
			}
		}
		.image-regin {
			margin-top: 20rpx;
			border-top: 2rpx solid #eeeeee;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			height: 172rpx;
			width: 100%;
			display: flex;
			align-items: center;
			.photos {
				display: flex;
				align-items: center;
				height: 152rpx;
				width: 152rpx;
				image {
					height: 152rpx;
					width: 152rpx;
				}
			}
		}
	}
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
	padding-top: 24rpx;

	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			// width: 60rpx;
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}
</style>
