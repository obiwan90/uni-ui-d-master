<template>
	<view v-if="isShow&&receivedData">
		<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
	</view>
	<view class="finenessJudge-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#F3F2F6'">
			<template #name>成色判断</template>
			<template #fill>成色判断</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 140rpx; background: #f3f2f6; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="10"
								phText="请输入串号"
								:dataList="orgArray"
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
			<van-empty v-if="!receivedData" description="请搜索相关商品进行拍照">
				<template #image>
					<view style="width: 750rpx;height: 50%;display: flex;align-items: center;justify-content: center;">
						<view style="display: flex;flex-direction: column;gap: 28rpx;align-items: center;">
							<image src="https://www.xzxskj.com/xcximg/icon_chengse@3x.png" mode="widthFix" style="width: 120rpx; height: 176rpx;"></image>
							<text style="opacity: 0.4;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">请搜索相关商品进行成色判断</text>
						</view>
					</view>
				</template>
			</van-empty>
			<view v-if="receivedData"
				style="
					margin-left: 20rpx;
					width: 710rpx;
					background: linear-gradient(45deg, #ffffff 0%, #ffffff 84%, #ffe8d8 100%);
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 22rpx 20rpx;
					display: flex;
					flex-direction: column;">
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #1f1f1f; text-align: left">{{receivedData.spname}}</text>
				<view style="display: flex; align-items: center; margin-top: 16rpx"  @click.stop="instance.proxy.copyText(receivedData.imei)">
					<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; margin-right: 10rpx; text-align: left">
						IMEI：{{receivedData.imei}}
					</text>
					<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>

				<view style="display: flex; align-items: center; margin-top: 20rpx;gap:84rpx;">
					<text class="text-1" style="margin-right: 84rpx">采购员工：{{receivedData.cgyname}}</text>
					<text class="text-1">商品录入：{{receivedData.inputPerson}}</text>
				</view>

				<view style="display: flex; align-items: center; margin-top: 10rpx;gap:84rpx;">
					<text class="text-1" style="margin-right: 84rpx">功能检测：{{receivedData.funcInputPerson}}</text>
					<text class="text-1">维修检测：{{receivedData.maintenanceInputPerson}}</text>
				</view>

				<view
					style="width: 670rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 20rpx 20rpx 20rpx; margin-top: 22rpx; margin-bottom: 22rpx"
					class="divile"
				></view>

				<text class="text-1" style="opacity: 0.7">备注：{{titleRemarl}}</text>
			</view>

			<view v-if="receivedData"
				style="
					margin-left: 20rpx;
					margin-top: 20rpx;
					width: 710rpx;
					height: 100rpx;
					background: #ffffff;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 20rpx;
					padding-right: 20rpx;
				"
			>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 30rpx; color: #1f1f1f; text-align: left">成色判断</text>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 30rpx; color: #1f1f1f; text-align: right">{{ csinfos ? csinfos.name : receivedData.finenessname?receivedData.finenessname:'请判断成色' }}</text>
			</view>

			<view class="card-box" v-for="(item, index) in csList" :key="index" v-if="receivedData&&csList.length > 0">
				<uni-collapse ref="collapseRef" class="collapse" @change="(isOpen) => collapseChange(isOpen, index)">
					<uni-collapse-item :show-arrow="false" :open="collapsedStatus[index]" class="collapse" titleBorder="none" :border="false">
						<template v-slot:title>
							<view class="collapse-title" style="padding: 24rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
								<text class="co-header">{{ item.name }}</text>
								<view style="display: flex; align-items: center; justify-content: center; gap: 10rpx">
									<text class="co-foot">{{ selectedText[index] }}</text>
									<text v-if="item.erlist.length > 2" class="arrow" :class="{ 'arrow-open': collapsedStatus[index] }">▼</text>
								</view>
							</view>
							<view class="content">
								<view
									:class="{ clicked: isSelected(index, item1) }"
									class="card"
									v-for="(item1, cardIndex) in item.erlist.slice(0, 2)"
									:key="cardIndex"
									@click.stop="handleCardClick(index, item1)"
								>
									<text :class="{ 'clicked-text': isSelected(index, item1) }" class="card-text">{{ item1.name }}</text>
								</view>
							</view>
						</template>

						<view v-if="item.erlist.length > 2" class="content">
							<view
								:class="{ clicked: isSelected(index, item1) }"
								class="card"
								v-for="(item1, cardIndex) in item.erlist.slice(2)"
								:key="cardIndex + 2"
								@click.stop="handleCardClick(index, item1)"
							>
								<text :class="{ 'clicked-text': isSelected(index, item1) }" class="card-text">{{ item1.name }}</text>
							</view>
						</view>
						<view  class="image-regin"  >
							<uv-upload  
								v-if="showUpdateMap[index]"
								:fileList="fileListRef[index] || []"
								accept="image"
								:maxCount="photoSize"
								maxSize="5242880"
								width="152rpx"
								height="152rpx"
								:sizeType="['compressed']"
								:previewFullImage="true"
								:previewFullVideo="false"
								:after-read="(event) => handleUpload(event, index)"
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
			
			<view class="card-box" v-if="receivedData && yjlist.length > 0">
			    <uni-collapse ref="collapseRef" class="collapse" @change="(isOpen) => collapseChange(isOpen, 2)">
			        <uni-collapse-item :show-arrow="false" :open="collapsedStatus[2]" class="collapse" titleBorder="none" :border="false">
			            <template v-slot:title>
			                <view class="collapse-title" style="padding: 24rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
			                    <text class="co-header">液晶显示</text>
			                    <view style="display: flex; align-items: center; justify-content: center; gap: 10rpx">
			                        <text class="co-foot">{{ selectedText[2] }}</text>
			                        <text v-if="yjlist.length > 2" class="arrow" :class="{ 'arrow-open': collapsedStatus[2] }">▼</text>
			                    </view>
			                </view>
			                <view class="content">
			                    <view
			                        :class="{ clicked: isSelected(2, item1) }"
			                        class="card"
			                        v-for="(item1, cardIndex) in yjlist.slice(0, 2)"
			                        :key="cardIndex"
			                        @click.stop="handleCardClick(2, item1)"
			                    >
			                        <text :class="{ 'clicked-text': isSelected(2, item1) }" class="card-text">{{ item1.name }}</text>
			                    </view>
			                </view>
			            </template>
			
			            <view v-if="yjlist.length > 2" class="content">
			                <view
			                    :class="{ clicked: isSelected(2, item1) }"
			                    class="card"
			                    v-for="(item1, cardIndex) in yjlist.slice(2)"
			                    :key="cardIndex + 2"
			                    @click.stop="handleCardClick(2, item1)"
			                >
			                    <text :class="{ 'clicked-text': isSelected(2, item1) }" class="card-text">{{ item1.name }}</text>
			                </view>
			            </view>
			            <view class="image-regin" >
			                <uv-upload   
							v-if="showUpdateMap[2]"
							:file-list="fileListRef[2] || []"
							accept="image"
							:maxCount="photoSize"
							maxSize="5242880"
							width="152rpx"
							height="152rpx"
							:sizeType="['compressed']"
							:previewFullImage="true"
							:previewFullVideo="false"
							:after-read="(event) => handleUpload(event, 2)"
							@oversize="(event) => uploadCheack(event, 2)"
							@delete="(event) => handleDelete(event, 2)">
							
			                    <view class="photos" style="height: 152rpx">
			                        <image
			                            src="https://www.xzxskj.com/xcximg/img_add_img@3x.png"
			                            mode="aspectFit"
			                            style="width: 152rpx; height: 152rpx"
			                        ></image>
			                    </view>
			                </uv-upload>
			            </view>
			        </uni-collapse-item>
			    </uni-collapse>
			</view>

			<view v-if="receivedData" class="remark">
				<view class="title">
					<text>成色判断备注</text>
				</view>
				<textarea v-model="formData.remark" class="remark-area" placeholder="请输入"></textarea>
			</view>
		</scroll-view>

		<view v-if="receivedData" class="fill" style="height: 192rpx" />
		<view v-if="receivedData" class="select-btn">
			<view @click="concel" class="cancel-btn button-animation">
				<text>重置</text>
			</view>
			<view class="confim-btn button-animation" @click="confirm">
				<text>提交</text>
			</view>
		</view>
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="pannelPopup" :safe-area="false" type="center" @close="handleClose" @change="pannelChange">
			<view >
				<finenessJudgePannel ref="finenessJudgePannelRef" :receivedData="receivedData" :csinfos="csinfos" @close="handleClose" ></finenessJudgePannel>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { finenessJudgePannel } from './components/finenessJudgePannel.vue'
import { apiFinanceItemList, apiFinanceData, apiFinanceSave } from '../api/api.js';
import { uploadFilesByIndex, uploadCheack, uploadDeleteByIndex,formatTimestamp,uploadFilesByIndex1,navigateToPage } from '../../utils/common.js';
import { apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
import { ref, reactive, nextTick } from 'vue';
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
const finenessJudgePannelRef = ref(null)
const collapseRef = ref(null);
const isShow = ref(false);
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
const photoSize = ref(3);
const fileListRef = reactive({});

const collapsedStatus = ref([]); // 初始化折叠状态数组
const collapseChange = (isOpen, index) => {
	console.log('isOpen:', isOpen);
	collapsedStatus.value[index] = isOpen.length > 0;
	console.log('collapsedStatus:', collapsedStatus.value);
};

const clickedItems = ref([]);
const selectedText = ref([]);
const handleCardClick = (collapseIndex, item1) => {
	clickedItems.value[collapseIndex] = item1;
	selectedText.value[collapseIndex] = item1.name;
	console.log('clickedItems:',clickedItems.value);
	console.log('selectedText:',selectedText.value);
	updateSelectedIds(collapseIndex, item1.id);
	if (item1.tpbs === '1') {
		showUpdateMap.value[collapseIndex] = true;
	} else {
		showUpdateMap.value[collapseIndex] = false;
	}
	console.log('showUpdateMap',showUpdateMap.value)
	// nextTick(()=>{
	// 	setTimeout(()=>{collapseRef.value.resize()},500)
		
	// })
};
const showUpdateMap = ref([false, false, false]);

const showUpdate = (index) => {
	// const item = dynamicList.value[index];
	// const selected = clickedItems.value[index];
	// // return item.tpbs === '2' || (item.tpbs === '1' && selected && selected.color === 'red');
	// return selected && selected.tpbs === '1';
  return showUpdateMap[index] || false;
};
const isSelected = (index, item1) => {
	return clickedItems.value[index] === item1;
};

const handleUpload = (event, index) => {
	uploadFilesByIndex(event, index, fileListRef);
};

const handleDelete = (event, index) => {
	uploadDeleteByIndex(event, index, fileListRef);
};

const showPannel = ref(false);
const pannelPopup = ref(null);
const csinfos = ref(null);

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
	showPannel.value = true;
	finenessJudgePannelRef.value.getData(receivedData.value.imei);
	pannelPopup.value.open();
};

const formData = reactive({
	remark: ''
});
const titleRemarl = ref('')
const orgArray = ref([]);
const selectChange =async (e) => {
	console.log('selectChange:', e);
	
	Object.keys(fileListRef).forEach(key => {
		fileListRef[key] = [];
	});
	if (e) {
		console.log('selectChange e:', e);
		const { name,ch,machinetime,jkuidname,id,functionaltime,gnjcuidname,servicetime,serviceuidname,cgyname,finenessname,csbz,jswg,pmwg,yjid,jkbz,gnjcbz,wxjcbz,yjxsimg,pmwgimg,jswgimg} = e;
		receivedData.value = {
			spname: name,
			imei: ch,
			inputTime: formatTimestamp(machinetime),
			inputPerson: jkuidname,
			funcInputTime: formatTimestamp(functionaltime),
			funcInputPerson: gnjcuidname,
			maintenanceInputTime: formatTimestamp(servicetime),
			maintenanceInputPerson: serviceuidname,
			cgyname,cgyname,
			zjid: id,
			finenessname:finenessname,
		};
		selectedIds.jswg = jswg;
		selectedIds.pmwg = pmwg;
		selectedIds.yjig = yjid;
		// titleRemarl.value = jkbz + ' ' + gnjcbz + ' ' + wxjcbz+' '+pzbz;
		titleRemarl.value = jkbz + ' ' + gnjcbz + ' ' + wxjcbz;
		formData.remark = csbz;
		
		fileListRef[0] = jswgimg ? jswgimg.split(',').map(item => ({ url:item })) : [];
		fileListRef[1] = pmwgimg ? pmwgimg.split(',').map(item => ({ url:item })) : [];
		fileListRef[2] = yjxsimg ? yjxsimg.split(',').map(item => ({ url:item })) : [];
		
		await apiFinanceItemListData(id);
		
		updateSelection(csList.value, selectedIds.jswg, 0);
		updateSelection(csList.value, selectedIds.pmwg, 1);
	    updateYjSelection(yjlist.value, selectedIds.yjig);
		
		await apiFinanceDataData(id)
	}
};

const updateSelection = (list, selectedId, baseIndex) => {
	console.log('updateSelection:', list, selectedId, baseIndex);
	list.forEach((item) => {
		item.erlist.forEach((item1, index) => {
			if (item1.id === selectedId) {
				clickedItems.value[baseIndex] = item1;
				selectedText.value[baseIndex] = item1.name;
				if (index >= 2) {
					collapsedStatus.value[baseIndex] = true;
				}
				if (item1.tpbs === '1') {
					showUpdateMap.value[baseIndex] = true;
				} else {
					showUpdateMap.value[baseIndex] = false;
				}
			}
		});
	});
};

const updateYjSelection = (list, selectedId) => {
    console.log('updateYjSelection:', list, selectedId);
    list.forEach((item, index) => {
        if (item.id === selectedId) {
            const baseIndex = csList.value.length; // 液晶显示项的起始索引
            clickedItems.value[baseIndex] = item;
            selectedText.value[baseIndex] = item.name;
            selectedIds.yjig = item.id; // 更新selectedIds
            if (index >= 2) {
                collapsedStatus.value[baseIndex] = true;
            }
			if (item.tpbs === '1') {
				showUpdateMap.value[baseIndex] = true;
			} else {
				showUpdateMap.value[baseIndex] = false;
			}
            console.log('selectedText:', selectedText.value);
        }
    });
};


const csList = ref([]);
const yjlist = ref([]);
const selectedIds = reactive({
	jswg: '',
	pmwg: '',
	yjig: ''
});

const updateSelectedIds = (index, id) => {
	if (index === 0) {
		selectedIds.jswg = id;
	} else if (index === 1) {
		selectedIds.pmwg = id;
	} else {
		selectedIds.yjig = id;
	}
	if (selectedIds.jswg && selectedIds.pmwg && selectedIds.yjig) {
		apiFinanceDataData();
	}
};

const concel = () => {
	resetFormData();
};

const apiFinanceItemListData = async (id) => {
	const res = await apiFinanceItemList({id:id});
	if (res.zt === 1) {
		csList.value = res.lists;
		yjlist.value = res.yjlist;
		collapsedStatus.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => false);
		selectedText.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => '');
		clickedItems.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => null);
		console.log('csList:', csList.value);
		console.log('clickedItems:', clickedItems.value);
		console.log('collapsedStatus:', collapsedStatus.value);
		console.log('yjlist:', yjlist.value);
		//todo 选中液晶
		 updateYjSelection(yjlist.value, res.fcyjid);
		
	}
};

const apiFinanceDataData = async () => {
	const param = {
		id: receivedData.value.zjid,
		jswg: selectedIds.jswg,
		pmwg: selectedIds.pmwg,
		yjid: selectedIds.yjig,
	};
	const res = await apiFinanceData(param);
	if (res.zt === 1&&res.csinfos) {
		csinfos.value = res.csinfos;
	} else {
		uni.showToast({
			title: '请联系客服',
			icon: 'none',
			duration: 2000
		});
	}
};

const apiFinanceSaveData = async () => {
	console.log('fileListRef:',fileListRef)
	console.log('fileListRef[0]:',fileListRef[0])
	const jswgimgs =fileListRef[0] && fileListRef[0].map(item => item.url).join(',') ||"";
	const pmwgimgs =fileListRef[1] && fileListRef[1].map(item => item.url).join(',') ||"";
	const yjimgs =fileListRef[2] && fileListRef[2].map(item => item.url).join(',') ||"";
	const param = {
		// opid: uni.getStorageSync('sessionInfo').opid,
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		id: receivedData.value.zjid,
		csname: csinfos.value.name,
		csid: csinfos.value.id,
		bz: formData.remark,
		jswg: selectedIds.jswg,
		pmwg: selectedIds.pmwg,
		yjid: selectedIds.yjig,
		jswgimg: jswgimgs,
		pmwgimg: pmwgimgs,
		yjxsimg: yjimgs
		
		// jswgimg: fileListRef[0][0].url,
		// pmwgimg: fileListRef[1][0].url,
		// yjimg: fileListRef[2][0].url
	};
	const res = await apiFinanceSave(param);
	if (res.zt === 1) {
		
		receivedData.value.finenessName = csinfos.value.name;
		receivedData.value.csbz = formData.remark;
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

const confirm = () => {
	console.log('clickedItems:',clickedItems.value);
	console.log('fileListRef:',fileListRef);
  if (!csinfos.value || !csinfos.value.name) {
    uni.showToast({
      title: '请先判断成色',
      icon: 'none',
      duration: 2000
    });
    return;
  }
	
	let hasError = false;
	clickedItems.value.some((item, index) => {
		if (item && item.tpbs === '1') {
			if (!fileListRef || !Array.isArray(fileListRef[index]) || fileListRef[index].length === 0) {
				uni.showToast({
					title: `请为"${item.name}"上传图片`, 
					icon: 'none',
					duration: 2000
				});
				hasError = true;
				return true; 
			}
		}
		return false;
	});

  if (!hasError) {
    apiFinanceSaveData();
  }
};


const apiQualityCheckSerialSearchData = async (ch) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		res.lists = res.lists.filter(item => item.service !== '');
		// res.lists = res.lists.filter(item => item.productimage !== '');
		return orgArray.value = res.lists?res.lists:[];
	}
};
const from = ref('')
const receivedData = ref(null);
onLoad((options) => {
	if (options.data) {
		try {
			isShow.value = true;
			receivedData.value = JSON.parse(decodeURIComponent(options.data));
			// titleRemarl.value = receivedData.value.jkbz + ' ' + receivedData.value.gnjcbz + ' ' + receivedData.value.wxjcbz+' '+receivedData.value.pzbz;
			titleRemarl.value = receivedData.value.jkbz + ' ' + receivedData.value.gnjcbz + ' ' + receivedData.value.wxjcbz;
			console.log('Received data:', receivedData.value);
			apiFinanceItemListData(receivedData.value.zjid);
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
.finenessJudge-layout {
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
// .card-box {
// 	margin-left: 20rpx;
// 	margin-top: 30rpx;
// 	width: 710rpx;
// 	background: #ffffff;
// 	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
// 	border-radius: 20rpx 20rpx 20rpx 20rpx;
// 	padding-left: 24rpx;
// 	padding-right: 24rpx;
// 	padding-top: 24rpx;
// 	.custom-card {
// 		width: 100%;
// 		height: 100%;
// 		background: #ffffff;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: space-between;
// 		.title {
// 			text {
// 				font-family: PingFang SC, PingFang SC;
// 				font-weight: bold;
// 				font-size: 32rpx;
// 				color: #1f1f1f;
// 				text-align: left;
// 			}
// 		}
// 		.content {
// 			margin-top: 24rpx;
// 			width: 100%;
// 			background: #ffffff;
// 			border-radius: 20rpx 20rpx 20rpx 20rpx;
// 			display: grid;
// 			justify-content: space-between;
// 			grid-template-columns: 50% 50%;
// 			grid-column-gap: 22rpx;
// 			.card {
// 				margin-bottom: 10rpx;
// 				width: 324rpx;
// 				height: 72rpx;
// 				background: #f9f9f9;
// 				border-radius: 10rpx 10rpx 10rpx 10rpx;
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				.card-text {
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 28rpx;
// 					color: #1f1f1f;
// 					margin-right: 22rpx;
// 				}
// 				.card-text.clicked-text {
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 28rpx;
// 					color: #ffffff;
// 					text-align: center;
// 				}
// 				&.clicked {
// 					background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
// 				}
// 			}
// 		}
// 	}
// 	.collapse {
// 		border-radius: 20rpx;
// 		margin-top: -20rpx;
// 		.co-header {
// 			margin-left: -24rpx;
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: bold;
// 			font-size: 32rpx;
// 			color: #1f1f1f;
// 			text-align: left;
// 		}
// 		.co-foot {
// 			height: 42rpx;
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: 400;
// 			font-size: 30rpx;
// 			color: #1f1f1f;
// 			opacity: 0.7;
// 		}
// 		.content {
// 			width: 670rpx;
// 			background: #ffffff;
// 			border-radius: 20rpx 20rpx 20rpx 20rpx;
// 			display: grid;
// 			justify-content: space-between;
// 			grid-template-columns: 50% 50%;
// 			grid-column-gap: 22rpx;
// 			.card {
// 				margin-bottom: 16rpx;
// 				width: 324rpx;
// 				height: 72rpx;
// 				background: #f9f9f9;
// 				border-radius: 10rpx 10rpx 10rpx 10rpx;
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				.card-text.clicked-text {
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 28rpx;
// 					color: #ffffff;
// 					text-align: center;
// 				}
// 				.card-text {
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 28rpx;
// 					color: #1f1f1f;
// 				}
// 				&.clicked {
// 					background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
// 				}
// 			}
// 		}
// 		.image-regin {
// 			margin-top: 20rpx;
// 			border-top: 2rpx solid #eeeeee;
// 			padding-top: 20rpx;
// 			width: 100%;
// 			display: flex;
// 			align-items: center;
// 			.photos {
// 				display: flex;
// 				align-items: center;
// 				height: 152rpx;
// 				width: 152rpx;
// 				image {
// 					height: 152rpx;
// 					width: 152rpx;
// 				}
// 			}
// 		}
// 	}
// }

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
			grid-template-columns: 50% 50%;
			grid-column-gap: 22rpx;
			.card {
				margin-bottom: 16rpx;
				width: 324rpx;
				height: 72rpx;
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
			width: 100%;
			height: 172rpx;
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
.arrow {
	transition: transform 0.5s;
}

.arrow-open {
	transform: rotate(180deg);
}
</style>
