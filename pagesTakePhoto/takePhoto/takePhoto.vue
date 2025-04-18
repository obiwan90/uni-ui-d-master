<template>
	<view v-if="isShow&&receivedData">
		<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
	</view>
	<view class="takePhoto-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#F3F2F6'">
			<template #name>拍照</template>
			<template #fill>拍照</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 140rpx; background: #f3f2f6; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="7"
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

		<scroll-view scroll-y="true" style="height: 1110rpx; width: 100%">
			<!-- product card -->
			<view
				v-if="receivedData"
				style="
					margin-left: 20rpx;
					width: 710rpx;
					background: linear-gradient(45deg, #ffffff 0%, #ffffff 84%, #ffe8d8 100%);
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 22rpx 20rpx;
					display: flex;
					flex-direction: column;
				"
			>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #1f1f1f; text-align: left">{{ receivedData.spname }}</text>
				<view style="display: flex; align-items: center; margin-top: 16rpx" @click.stop="instance.proxy.copyText(receivedData.imei)">
					<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; margin-right: 10rpx; text-align: left">
						IMEI：{{ receivedData.imei }}
					</text>
					<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>

				<view style="display: flex; align-items: center; margin-top: 20rpx;gap:84rpx">
					<text class="text-1" style="margin-right: 84rpx">采购员工：{{receivedData.cgyname}}</text>
					<text class="text-1">商品录入：{{ receivedData.inputPerson }}</text>
				</view>

				<view style="display: flex; align-items: center; margin-top: 10rpx;gap:84rpx">
					<text class="text-1" style="margin-right: 84rpx">功能检测：{{ receivedData.funcInputPerson }}</text>
					<text class="text-1">维修检测：{{ receivedData.maintenanceInputPerson }}</text>
				</view>

				<view
					style="width: 670rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 20rpx 20rpx 20rpx; margin-top: 22rpx; margin-bottom: 22rpx"
					class="divile"
				></view>

				<text class="text-1" style="opacity: 0.7">备注：{{titleRemarl}}</text>
			</view>
			
			<van-empty v-if="!receivedData" description="请搜索相关商品进行拍照">
				<template #image>
					<view style="width: 750rpx;height: 50%;display: flex;align-items: center;justify-content: center;">
						<view style="display: flex;flex-direction: column;gap: 28rpx;align-items: center;">
							<image src="https://www.xzxskj.com/xcximg/icon_paizhao@3x.png" mode="widthFix" style="width: 150rpx; height: 130rpx;"></image>
							<text style="opacity: 0.4;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">请搜索相关商品进行拍照</text>
						</view>
					</view>
				</template>
			</van-empty>
			<view v-if="receivedData"
				v-for="(item, index) in data"
				:key="index"
				style="
					margin-top: 20rpx;
					width: 710rpx;
					background: #ffffff;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 20rpx;
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
				"
			>
				
				<!-- @click="oneClickUpLoad" -->
				<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 24rpx;" >
					<text
						style="
							height: 42rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 30rpx;
							color: #1f1f1f;
							text-align: left;
							font-style: normal;
							text-transform: none;
							
						"
					>
						{{ item.title }}
						<text v-if="index===0" style="height: 42rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #EB4636;">{{item.tips}}</text>
					</text>
					<!-- <image v-if="index===0" src="/pagesTakePhoto/static/takephoto.png" style="height: 30rpx;width: 30rpx;" mode="aspectFill"></image> -->
				</view>
				

				<view style="display: flex; align-items: center; gap: 20rpx;">
					
				
					<view v-for="(item1, index1) in item.items" :key="index1" class="custom-uploader" style="">
					  <uv-upload
							:fileList="item1.fileList"
							name="1"
							multiple 
							accept="image"
							:maxCount="1"
							maxSize="5242880"
							width="0"
							height="0"
							:sizeType="['compressed']"
							:previewFullImage="false"
							:previewFullVideo="false"
							@afterRead="(event) => takePhoto(event, item1)" 
							@oversize="handleOversize"
							 >
							<view class="uploader-slot">
							  <image class="uploader-icon" :src="item1.image" mode="aspectFill"></image>
							</view>
						</uv-upload>
					  <view class="preview-container" style="margin-left: -20rpx;">
					    <view style="position: relative" class="preview-item" v-for="(item2, index2) in item1.fileList" :key="index2" @click="previewImage(item2.url)">
					      <image class="preview-image" :src="item2.url" mode="aspectFill"></image>
					      <view
					        style="
					          width: 152rpx;
					          height: 38rpx;
					          background: #000000;
					          border-radius: 0rpx 0rpx 10rpx 10rpx;
					          opacity: 0.59;
					          position: absolute;
					          bottom: 0;
					          display: flex;
					          justify-content: center;
					          align-items: center;
					        "
					      >
					        <text
					          style="
					            height: 34rpx;
					            font-family: PingFang SC, PingFang SC;
					            font-weight: 400;
					            font-size: 24rpx;
					            color: #ffffff;
					            text-align: center;
					            font-style: normal;
					            text-transform: none;
					          "
					        >
					          {{ item2.name }}
					        </text>
					      </view>
					
					      <view style="position: absolute; height: 40rpx; width: 40rpx; top: 0; right: 0" @click.stop="deleteImage(item1,index,index1,index2)">
					        <image style="height: 26rpx; width: 26rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFit"></image>
					      </view>
					    </view>
					  </view>
					</view>
					
				</view>
			</view>
			<view v-if="receivedData" class="remark">
				<view class="title">
					<text>拍照备注</text>
				</view>
				<textarea class="remark-area" v-model="remark" placeholder="请输入"></textarea>
			</view>
		</scroll-view>

		<view v-if="receivedData" class="fill" style="height: 192rpx" />
		<view v-if="receivedData" class="select-btn">
			<view @click="resetData" class="cancel-btn button-animation">
				<text>重置</text>
			</view>
			
			<!-- <view class="cancel-btn button-animation" @click="oneClickUpLoad">
				<text>拍照</text>
			</view> -->
			<view class="confim-btn button-animation" @click="confirm">
				<text>提交</text>
			</view>
			<!-- <view class="confim-btn button-animation" @click="confirm">
				<text>提交图片</text>
			</view> -->
		</view>

		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="pannelPopup" :safe-area="false" type="center" @close="handleClose" @change="pannelChange">
			<view>
				<takePhotoConfirmPannel ref="takePhotoConfirmPannelRef" :receivedData="receivedData" :image="image" @close="handleClose"></takePhotoConfirmPannel>
			</view>
		</uni-popup>
		
		<cusfloatButtom v-if="receivedData" @fab-button-click="fabClick"/>
	</view>
</template>

<script setup>
import { cusfloatButtom } from './components/cusfloatButtom.vue'
import { takePhotoUploadFiles,formatTimestamp,navigateToPage } from '../../utils/common.js';
import { takePhotoConfirmPannel } from './components/takePhotoConfirmPannel.vue';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiQualityCheckUploadPhoto,apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
import { scanCode } from '@/utils/common.js'
const opid = uni.getStorageSync('sessionInfo').opid
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
const takePhotoConfirmPannelRef = ref(null);
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
				// uni.navigateBack({
				// 	delta: getCurrentPages().length - 1
				// });
				const res = navigateToPage('pagesCustomMine/customMine/customMine');
			}else{
				isShow.value = true;
			}
		}
	});
};
const showPannel = ref(false);
const pannelPopup = ref(null);
const image = ref();
const remark = ref('');
const handleClose = () => {
	console.log('Popup is closed');
	pannelPopup.value.close();
};
const pannelChange = (e) => {
	if (!e.show) {
		showPannel.value = e.show;
	}
};

const openPannle = () => {
	image.value = data.value[0].items[0].fileList[0].url;
	showPannel.value = true;
	takePhotoConfirmPannelRef.value.getData(receivedData.value.imei);
	pannelPopup.value.open();
};

const data = ref([
	{
		title: '上传图片',
		tips:'* 机身背面为封面图',
		items: [
			{ text: '机身背面', image: 'https://www.xzxskj.com/xcximg/img_add_img@3x.png', fileList: [] },
			{ text: '屏幕息屏', image: 'https://www.xzxskj.com/xcximg/img_add_closewindow@3x.png', fileList: [] },
			{ text: '关于本机', image: 'https://www.xzxskj.com/xcximg/img_add_about@3x.png', fileList: [] }
		]
	},
	{
		title: '中框四面',
		items: [
			{ text: '中框上方', image: 'https://www.xzxskj.com/xcximg/img_add_upward@3x.png', fileList: [] },
			{ text: '中框右侧', image: 'https://www.xzxskj.com/xcximg/img_add_right@3x.png', fileList: [] },
			{ text: '中框下方', image: 'https://www.xzxskj.com/xcximg/img_add_downward@3x.png', fileList: [] },
			{ text: '中框左侧', image: 'https://www.xzxskj.com/xcximg/img_add_left@3x.png', fileList: [] }
		]
	},
	{
		title: '机身四角',
		items: [
			{ text: '左上角', image: 'https://www.xzxskj.com/xcximg/img_add_lefttop@3x.png', fileList: [] },
			{ text: '右上角', image: 'https://www.xzxskj.com/xcximg/img_add_righttop@3x.png', fileList: [] },
			{ text: '右下角', image: 'https://www.xzxskj.com/xcximg/img_add_rightdown@3x.png', fileList: [] },
			{ text: '左下角', image: 'https://www.xzxskj.com/xcximg/img_add_leftdown@3x.png', fileList: [] }
		]
	}
]);

// const deleteImage = (item,index,index1,index2)=>{
// 	data.value[index].items[index1].fileList=[]
// 	console.log('item1:',item);
// 	item.fileList = [];
// 	data.value = [...data.value]
// 	console.log('data.value:',data.value);
// }

const deleteImage = (item, index, index1, index2) => {
    if (item.fileList) {
        item.fileList.splice(index2, 1);
        console.log('删除后的fileList:', item.fileList);
    }
    data.value = [...data.value]; 
    console.log('data.value:', data.value);
	// uni.setStorageSync('photoData', data.value);
};

const previewImage = (url) => {
	const urls = data.value.flatMap((group) => group.items.flatMap((subItem) => subItem.fileList.map((file) => file.url)));
	console.log('data:', data.value);
	console.log('url:', url);
	const current = urls.indexOf(url);
	console.log('current:', current);
	uni.previewImage({
		showmenu: true,
		current: current,
		urls: urls,
		longPressActions: {
			itemList: ['发送给朋友', '保存图片', '收藏'],
			success: function (data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			},
			fail: function (err) {
				console.log(err.errMsg);
			}
		}
	});
};
const titleRemarl = ref('')
const orgArray = ref([]);
const selectChange = (e) => {
	receivedData.value=null
	data.value.forEach((group) => {
		group.items.forEach((item) => {
			item.fileList = [];
		});
	});
	console.log('selectChange:', e);
	if (e) {
		console.log('selectChange e:', e);
		const { name,ch,machinetime,jkuidname,id,functionaltime,gnjcuidname,servicetime,serviceuidname,cgyname,productimage,pzbz,jkbz,gnjcbz,wxjcbz,csbz } = e;
		receivedData.value = {
			spname: name,
			imei: ch,
			inputTime: formatTimestamp(machinetime),
			inputPerson: jkuidname,
			funcInputTime: formatTimestamp(functionaltime),
			funcInputPerson: gnjcuidname,
			maintenanceInputTime: formatTimestamp(servicetime),
			maintenanceInputPerson: serviceuidname,
			cgyname:cgyname,
			zjid: id,
		};
		titleRemarl.value = jkbz + ' ' + gnjcbz + ' ' + wxjcbz+' '+csbz;

		remark.value = pzbz;
		if (productimage) {
			const productImages = productimage.split(',');
			let imageIndex = 0;
			data.value.forEach((group) => {
				group.items.forEach((item) => {
					if (imageIndex < productImages.length) {
						item.fileList.push({
							url: productImages[imageIndex],
							name: item.text
						});
						imageIndex++;
					}
				});
			});
		}
		
		// uni.setStorageSync('photoData', data.value);
	}
};

const apiQualityCheckUploadPhotoData = async () => {
	const param = {
		opid: opid,
		id: receivedData.value.zjid,
		tplist: extractUrls(data.value).join(','),
		bz: remark.value
	};
	const res = await apiQualityCheckUploadPhoto(param);
	if (res.zt === 1) {
		receivedData.value.pzbz = remark.value;
		if(from.value!=='QC'){
			openPannle();
		}else{
			uni.showToast({
				title: '提交成功',
				icon: 'none',
				duration: 2000
			})
		}
	} else {
		uni.showToast({
			title: '上传失败，请重试',
			icon: 'none',
			duration: 500
		});
	}
};

const extractUrls = (data) => {
	return data.flatMap((group) => group.items.flatMap((item) => item.fileList.map((file) => file.url))).filter((url) => url !== undefined);
};

// const gethumbnail =async ()=>{
// 	const res = await generateThumbnail(data.value[0].items[0].fileList[0].url)
// }

const confirm = () => {
	console.log('data:', data.value);
	
	if (!checkAllImagesUploaded()) {
		return;
	}
	apiQualityCheckUploadPhotoData();
};
const checkAllImagesUploaded = () => {
	for (let group of data.value) {
		for (let item of group.items) {
			if (item.fileList.length === 0) {
				uni.showToast({
					title: `${item.text} 还未上传图片`,
					icon: 'none',
					duration: 2000
				});
				return false;
			}
		}
	}
	return true;
};
const resetData = () => {
	
	data.value.forEach((group) => {
		group.items.forEach((item) => {
			item.fileList = [];
		});
	});
	remark.value = '';
	data.value = [...data.value]
	// uni.setStorageSync('photoData', data.value);
	console.log('重置完成');
};

const apiQualityCheckSerialSearchData = async (ch) => {
	const param = {
		opid: opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		// res.lists = res.lists.filter(item => item.service !== '');
		res.lists = res.lists.filter(item => item.finenessname !== '');
		return orgArray.value = res.lists?res.lists:[];
	}
};

// const takePhoto = async (event, item) => {
// 	console.log('上传前 data：', data.value);
// 	console.log('item:',item);
// 	item.fileList = [];
// 	// item.fileList = [...item.fileList]
//     await takePhotoUploadFiles(event, item);
//     uni.setStorageSync('photoData', data.value);
// };

const takePhoto = async (event, item) => {
    console.log('上传前 data：', data.value);
    console.log('item:', item);
	console.log('event',event)
    // 这里确保每次上传前清空当前项的 fileList
    item.fileList = []; 
    await takePhotoUploadFiles(event, item); // 执行上传
    // uni.setStorageSync('photoData', data.value); // 更新数据存储
};

const handleOversize = () => {
  uni.showToast({
    title: '文件大小超出限制',
    icon: 'none',
    duration: 2000
  });
};

const fabClick = ()=>{
	resetData()
	uni.navigateTo({
		url: '/pagesOneClickUpload/oneClickUpload/oneClickUpload'
	});
}

// const oneClickUpLoad = () => {
// 	resetData()
// 	uni.navigateTo({
// 		url: '/pagesOneClickUpload/oneClickUpload/oneClickUpload'
// 	});
// };

const receivedData = ref(null);
const from = ref('')
onShow(() => {
	const photoData = uni.getStorageSync('photoData');
	if (photoData) {
		data.value = photoData;
	}else{
		// uni.setStorageSync('photoData', data.value);
	}
});

onLoad((options) => {
	// uni.setStorageSync('photoData', data.value);
	if (options.data) {
		try {
			isShow.value = true;
			receivedData.value = JSON.parse(decodeURIComponent(options.data));
			// titleRemarl.value = receivedData.value.jkbz + ' ' + receivedData.value.gnjcbz + ' ' + receivedData.value.wxjcbz;
			titleRemarl.value = receivedData.value.jkbz + ' ' + receivedData.value.gnjcbz + ' ' + receivedData.value.wxjcbz+' '+receivedData.value.csbz;
			console.log('Received data:', receivedData.value);
		} catch (e) {
			console.error('Failed to parse received data:', e);
		}
	}
	
	if(options.ch){
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
.takePhoto-layout {
	background: #f3f2f6;
	min-height: 100vh;
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
}

.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	opacity: 0.6;
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
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #1f1f1f;
		}
	}
	.confim-btn {
		width: 444rpx;
		// width: 232rpx;
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

.custom-uploader {
	display: flex;
	align-items: center;
	height: 152rpx;
	width: 152rpx;
	box-sizing: border-box;
	position: relative;
}

.uploader-slot {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 156rpx;
	height: 156rpx;
	background-color: #f7f8fa;
	border-radius: 8rpx;
}

.uploader-icon {
	width: 152rpx;
	height: 152rpx;
}

.uploader-text {
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #7d7e80;
}

.preview-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.preview-image {
	width: 152rpx;
	height: 152rpx;
	border-radius: 8rpx;
}

.preview-text {
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #7d7e80;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 120rpx;
}
</style>
