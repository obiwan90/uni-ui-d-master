<template>
	<view class="productInput-layout">
		<scroll-view enable-flex class="scroll-box" :scroll-y="show" style="height: 100vh; background: linear-gradient(180deg, #f3f2f6 0%, #f8f8f8 100%)">
			<!-- header -->
			<custom-header>
				<template #name>商品录入</template>
				<template #fill>商品录入</template>
			</custom-header>
			<!-- search -->
			<view class="search">
				<image class="search-img" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
				<qiaoSelect
					class="search-select"
					:keyId="2"
					:dataList="orgArray"
					phText="请搜索并确认型号全称"
					:searchKey="searchModelKey"
					:showBorder="false"
					:disabled="false"
					:showField="showModelField"
					@input="handleInput"
					@change="selectSearchChange"
					ref="qselect"
				></qiaoSelect>
			</view>
			<!-- content-1 -->
			<!-- <view class="content-1">
				<view class="top" v-for="(item, index) in content1.slice(0,3)" :key="index">
					<view class="left">
						<text style="text-align: justify-all; text-align-last: justify">{{ item.key }}</text>
					</view>
					<view class="right">
						<view class="selectDownUp">
							<input type="text" style="margin-top: 3rpx;font-size: 32rpx;font-weight: 400;font-family: PingFang SC, PingFang SC;" disabled v-model="item.value" :placeholder="item.placeholder" />
						</view>
					</view>
				</view>
			</view> -->
			
			<!-- <view class="content-1">
				<view class="top" v-for="(item, index) in content1.slice(0,3)" :key="index">
					<view class="left">
						<text style="text-align: justify-all; text-align-last: justify">{{ item.key }}</text>
					</view>
					<view class="right">
						<view class="selectDownUp">
							<input type="text" style="margin-top: 3rpx;font-size: 32rpx;font-weight: 400;font-family: PingFang SC, PingFang SC;" disabled v-model="item.value" :placeholder="item.placeholder" />
							<view v-if="index === 0" style="padding-left: 20rpx;border-left: 2rpx solid #EEEEEE;" @click="selectJX()">
								<text style="color: #669CFD;font-size: 28rpx;font-weight: 400;">选择</text>
							</view>
							<view v-if="index === 1" style="padding-left: 20rpx;border-left: 2rpx solid #EEEEEE;" >
								<picker :range="nclist" range-key='name' @change="(event)=>onSelectChange1(event)" mode="selector" :value="content1[1].value">
									<text style="color: #669CFD;font-size: 28rpx;font-weight: 400;" >选择</text>
								</picker>
								
							</view>
							<view v-if="index === 2" style="padding-left: 20rpx;border-left: 2rpx solid #EEEEEE;">
								<picker :range="yslist" range-key='name' @change="(event)=>onSelectChange2(event)" mode="selector" :value="content1[2].value">
									<text style="color: #669CFD;font-size: 28rpx;font-weight: 400;" >选择</text>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			
			<view class="content-1">
				<view class="top" v-for="(item, index) in filteredContent1.slice(0, 3)" :key="index">
					<view class="left">
						<text style="text-align: justify-all; text-align-last: justify">{{ item.key }}</text>
					</view>
					<view class="right">
						<view class="selectDownUp">
							<input
								type="text"
								style="margin-top: 3rpx; font-size: 32rpx; font-weight: 400; font-family: PingFang SC, PingFang SC"
								disabled
								v-model="item.value"
								:placeholder="item.placeholder"
							/>
							<view v-if="index === 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee" @click="selectJX()">
								<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
							</view>
							<view v-if="index === 1 && nclist !== null && nclist.length > 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee">
								<picker :range="nclist" range-key="name" @change="(event) => onSelectChange1(event)" mode="selector" :value="content1[1].value">
									<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
								</picker>
							</view>
							<view v-if="index === 2 && yslist !== null && yslist.length > 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee">
								<picker :range="yslist" range-key="name" @change="(event) => onSelectChange2(event)" mode="selector" :value="content1[2].value">
									<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<van-empty v-if="dynamicList.length==0" image="search" description="请搜索相关型号" />
			<view class="imei-card"  v-if="dynamicList.length > 0">
				<view class="left"  @click.stop="instance.proxy.copyText(receivedData.imei)">
					<text>IMEI/SN</text>
				</view>
				<view class="mid"></view>
				<view class="right" style="height: 100%;display: flex;align-items: center;justify-content: space-around;padding-right: 20rpx;">
					<!--  @input="validateIMEI($event, infos.dd)" -->
					
					<uni-easyinput  clearable :inputBorder="false" :maxlength="infos.cd" v-model="formData.imei" placeholder="请输入商品串号"></uni-easyinput>
					<!-- <input type="text" style="" :maxlength="infos.cd" v-model="formData.imei" placeholder="请输入商品串号" /> -->
					<view style="width: 2rpx;height: 28rpx;background: #EEEEEE;margin-left: 10rpx;margin-right: 30rpx;"/>
					<image src="https://www.xzxskj.com/xcximg/icon_saoyisao@3x.png" style="height: 36rpx;width: 36rpx;" mode="aspectFill" @click="scanCode"></image>
				</view>
			</view>

			<!-- 电池效率 -->
			<view class="power" v-if="dynamicList.length > 0&&infos.sfjcdcxl===1">
				<view class="title">
					<text>电池效率</text>
				</view>
				<view class="content">
					<uv-input inputAlign="right" maxlength="3" type="number" placeholder="请输入" border="none" v-model="formData.batteryEfficiency">
						<template v-slot:suffix>
							<text style="font-weight: bold;font-size: 32rpx;color: #1F1F1F;text-align: right;">%</text>
						</template>
					</uv-input>
				</view>
				<view class="divile" />
			</view>
			
			<!-- 国家版本 -->
			<view v-if="gjbb.length>0" class="custom-card" >
				<view class="title">
					<text>国家版本</text>
				</view>
				<view class="content">
					<view
						:class="{ clicked: isSelectedGjbb(item1) }"
						class="card"
						v-for="(item1, cardIndex) in gjbb"
						:key="cardIndex"
						@click="handleGjbbClick(item1)"
					>
						<text :class="{ 'clicked-text': isSelectedGjbb(item1) }" class="card-text">{{ item1.name }}</text>
					</view>
				</view>
			</view>

			<!-- 网络版本 -->
			<view v-if="wlbb.length>0" class="custom-card">
				<view class="title">
					<text>网络版本</text>
				</view>
				<view class="content">
					<view
						:class="{ clicked: isSelectedWlbb(item1) }"
						class="card"
						v-for="(item1, cardIndex) in wlbb"
						:key="cardIndex"
						@click="handleWlbbClick(item1)"
					>
						<text :class="{ 'clicked-text': isSelectedWlbb(item1) }" class="card-text">{{ item1.name }}</text>
					</view>
				</view>
			</view>

			<view class="maintenance" v-if="showBxjz">
				<view class="title" style="display: flex;align-items: center;">
					<text>保修截止</text>
					<picker @change="onTimeChange" mode="date"> 
						<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
							<image src="https://www.xzxskj.com/xcximg/calendar.png" style="height: 35rpx;width: 35rpx;margin-left: 20rpx;" mode="aspectFill"></image>
						</view>
					</picker>
				</view>
				<view class="content">
					<view class="card" style="text-align: right;justify-content: flex-end;" v-for="(item2, index) in maintenanceTime.values" :key="index">
						<!-- <input type="number" class="card-text" :placeholder="index === 0 ? '年' : index === 1 ? '月' : index === 2 ? '日' : ''" :value="item2"/> -->
						<uv-input inputAlign="right" type="number" border="none" :value="item2">
							<template v-slot:suffix>
								<text style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;text-align: right;margin-right: 10rpx;">{{index === 0 ? '年' : index === 1 ? '月' : index === 2 ? '日' : ''}}</text>
							</template>
						</uv-input>
					</view>
				</view>
			</view>
			<view class="card-box" v-for="(item, index) in dynamicList" :key="index" v-if="dynamicList.length > 0">
				<uni-collapse v-if="item.name !== '保修截止'" ref="collapseRef" class="collapse" @change="(isOpen) => collapseChange(isOpen, index)">
					<uni-collapse-item :show-arrow="false" :open="collapsedStatus[index]" class="collapse" titleBorder="none" :border="false">
					<!-- <uni-collapse-item :show-arrow="false" :open="false" class="collapse" titleBorder="none" :border="false"> -->
						<template v-slot:title>
							<view class="collapse-title" style="padding: 24rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
								<text class="co-header">{{ item.name }}</text>
								<view style="display: flex; align-items: center; justify-content: center; gap: 10rpx">
										<text class="co-foot">{{ selectedText[index] }}</text>
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
							<!-- maxSize="1048576" -->
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
			<!-- 采购员工  -->
			<view class="member" v-if="dynamicList.length > 0">
				<view class="left">
					<text>采购员工</text>
				</view>
				<picker :range="cgylist" range-key="username" @change="onSelectWorkChange" mode="selector" :value="pickerMemberValue">
					<view class="right">
						<text>{{ !pickerMemberValue ? '请选择' : pickerMemberValue }}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
					</view>
				</picker>
			</view>
			<!-- 录入仓库 -->
			<view class="member" v-if="dynamicList.length > 0">
				<view class="left">
					<text>录入仓库</text>
				</view>
				<picker :range="cklist" range-key="name" @change="onWarehouseChange" mode="selector" :value="pickerWarehouseValue">
					<view class="right">
						<text>{{ !pickerWarehouseValue ? '请选择' : pickerWarehouseValue }}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
					</view>
				</picker>
			</view>

			<view class="remark" v-if="dynamicList.length > 0">
				<view class="title">
					<text>商品录入备注</text>
				</view>
				<textarea v-model="formData.remark" class="remark-area" placeholder="请输入"></textarea>
				</view>
			<view class="fill" style="height: 202rpx" />
			<view class="select-btn" v-if="dynamicList.length > 0">
				<view @click="reset" class="cancel-btn button-animation">
					<text>重置</text>
				</view>
				<view @click="comfrm" class="confim-btn button-animation">
					<text>确认录入</text>
				</view>
			</view>
		</scroll-view>
	</view>

	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="inputPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<view>
			<inputConfirm ref='inputConfirmRef' :purchaseEmployee="formData.purchaseEmployee" :id="productId" :zjid="formData.zjid" :imei="formData.imei" :content="content1" @close="handleClose"></inputConfirm>
		</view>
	</uni-popup>
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="jixingPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<jixingPannel ref="jixingPannelRef" v-if="showJiXing" @reload4Jx="reload4Jx" @close="handleClose"></jixingPannel>
	</uni-popup>
	
</template>

<script setup>
import { apiSearchGoods } from '@/api/search/search.js';
import { apiModelSearch, apiQualityCheckItem,apiQualityCheckAdd1,apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
import inputConfirm from './components/inputConfirm.vue';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { uploadFiles, uploadCheack, uploadDelete,uploadFilesByIndex,uploadDeleteByIndex,uploadFilesByIndex1 } from '../../utils/common.js';
import { apiPublish,apiGetQuality,apiRecoveryList,apiGetProductId } from '../api/api.js'
import { jixingPannel } from './components/jixingPannel.vue';
const disabled = ref(false)
const instance = getCurrentInstance();
const param = ref({
	xhid: "",
	ppid: "",
	nc: "",
	bb: "",
	wl: "",
	ys: "",
	bx: "",
	start:'',
	delivery:uni.getStorageSync('locationForm').fullLocation.split(" ").join(",")
})
const qselect = ref(null)
const nclist = ref([])
const yslist = ref([])

const showJiXing = ref(false)
const jixingPannelRef = ref(null);
const jixingPopup = ref(null);

const change = (e) => {
	show.value = !e.show;
	if(!e){
		showJiXing.value = e.show
	}
};
const selectJX = () => {
	showJiXing.value = true
	jixingPopup.value.open();
};
const reload4Jx =async (selected, selectedTabs) => {
  console.log('select data:', selected);
  console.log('selectedTabs:', selectedTabs);
  if(selected.length>0){
	  qselect.value.clearData()
	  orgArray.value = []
	  param.value.xhid = selected[0].xhid
	  param.value.ppid = selected[0].ppid
	  content1.value[0].value = selected[0].xhname
	  // productId.value = selected[0].id;
	  await apiRecoveryListData()
	  // await apiModelSearchData(content1.value[0].value);
	  // apiQualityCheckItemData(productId.value).then(()=>{
	  // 	clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
	  // });
  }
};

const apiRecoveryListData = async () => {
	nclist.value =[]
	yslist.value =[]
	content1.value[1].value = ''
	content1.value[2].value = ''
	const res = await apiRecoveryList(param.value);	
	if (res.code === 200) {
		nclist.value = res.nclist ? res.nclist.filter((item) => item.name) : [];
		yslist.value = res.yslist ? res.yslist.filter((item) => item.name) : [];
	
		if (nclist.value.length === 0) {
			nclist.value = null;
		}
		if (yslist.value.length === 0) {
			yslist.value = null;
		}
		apiGetProductIdAc()
	}
	console.log('Recovery list:', res);
};

// const onSelectChange1 = (e) => {
// 	console.log('选择 e:',e);
// 	content1.value[1].value = nclist.value[e.detail.value].name
// };

// const onSelectChange2 = (e) => {
// 	console.log('选择 e:',e);
// 	content1.value[2].value = yslist.value[e.detail.value].name
// };
const filteredContent1 = computed(() => {
	return content1.value.filter((item, index) => {
		// 过滤掉型号全称
		if (item.key === '型号全称') {
			return false; // 不显示型号全称项
		}
		// 过滤掉内存项如果 nclist 为 null
		if (index === 1 && nclist.value === null) {
			return false; // 不显示内存项
		}
		// 过滤掉颜色项如果 yslist 为 null
		if (index === 2 && yslist.value === null) {
			return false; // 不显示颜色项
		}
		return true; // 显示其他项
	});
});
const onSelectChange1 = async (e) => {
	console.log('选择 e:', e);
	const memoryItem = content1.value.find((item) => item.key === '内存');
	if (memoryItem) {
		console.log('memoryItem', memoryItem);
		console.log('nclist.value', nclist.value);
		// 将 e.detail.value 转换为数字
		const selectedIndex = Number(e.detail.value);
		// 确保索引有效
		if (selectedIndex >= 0 && selectedIndex < nclist.value.length) {
			memoryItem.id = nclist.value[selectedIndex].id;
			memoryItem.value = nclist.value[selectedIndex].name;
			await apiGetProductIdAc();
		} else {
			console.error('无效的索引:', selectedIndex);
		}
	} else {
		console.error('未找到内存项');
	}
};

const onSelectChange2 = async (e) => {
	console.log('选择 e:', e);

	const memoryItem = content1.value.find((item) => item.key === '颜色');

	if (memoryItem) {
		// 确保 e.detail.value 是有效的索引
		const selectedIndex = Number(e.detail.value);

		if (selectedIndex >= 0 && selectedIndex < yslist.value.length) {
			memoryItem.id = yslist.value[selectedIndex].id;
			memoryItem.value = yslist.value[selectedIndex].name;
			await apiGetProductIdAc();
		} else {
			console.error('无效的索引:', selectedIndex);
		}
	} else {
		console.error('未找到颜色项');
	}
};

const apiGetProductIdAc = async () => {
	const apiParam = {
		xhid: param.value.xhid, //
		ncid: content1.value.find((item) => item.key === '内存').id,
		ysid: content1.value.find((item) => item.key === '颜色').id
	};
	const res = await apiGetProductId(apiParam);
	if (res.code === '200' && res.infos) {
		// productId.value = res.infos.id;
		quancid.value = res.infos.id
		apiQualityCheckItemData(res.infos.id).then(()=>{
			clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
		});
	} else {
		productId.value = '';
	}
	console.log(' 请求  productId.value:', productId.value);
};

const collapseOpen = ref(false)
const searchModelKey = ref('spname');
const showModelField = ref('spname');
const inputConfirmRef = ref(null)
const showUpdate = (index) => {
	// console.log('index:', index);
	const item = dynamicList.value[index];
	// console.log('item:', item);
	const selected = clickedItems.value[index];
	// console.log('selected:', selected);
	// return item.tpbs === '2' || (item.tpbs === '1' && selected && selected.color === 'red');
	return selected && selected.tpbs === '1';
};
const photoSize = ref('1');
const formData = reactive({
	batteryEfficiency: '', // 电池效率
	imei: '', // IMEI/SN
	purchaseEmployee: '', // 采购员工
	remark: '',
	warehouse: '', // 新增的录入仓库字段
	successId:'',//录入成功返回id
	ckid:'',
	cgyid:''
});

const inputPopup = ref(null);
const show = ref(true);

const orgArray = ref([]);
const dynamicList = ref([]);
const gjbb = ref([]);
const wlbb = ref([]);
const power = ref();
const content1 = ref([
	{ key: '型号', placeholder: '请搜索相关型号', value: '' },
	{ key: '内存', placeholder: '请搜索相关型号', value: '' },
	{ key: '颜色', placeholder: '请搜索相关型号', value: '' },
	{ key:'型号全称',placeholder: '', value:''}
]);
const maintenanceTime = ref({ title: '保修截止', values: ['', '', ''], time: '' });
const selectedText = ref([]);
const pickerMemberValue = ref('');
const pickerStartValue = ref('');
const fileListRef = reactive({});

const handleInput = (inputText) => {
	if (inputText.length>0) {
		uni.showLoading({
			title:'加载中....',
			mask:true
		})
		console.log('inputText',inputText)
		apiModelSearchData(inputText);
		uni.hideLoading()
	}
};
const quancid = ref('')
const productId = ref('');
const selectSearchChange = (e) => {
	if (e) {
		console.log('selectSearchChange e:', e);
		const { id, xhname, ncname, ysname,spname } = e;
		// productId.value = id;
		quancid.value = id;
		content1.value[0].value = xhname;
		content1.value[1].value = ncname;
		content1.value[2].value = ysname;
		content1.value[3].value = spname;
		nclist.value =[]
		yslist.value =[]
		orgArray.value = []
		apiQualityCheckItemData(id).then(()=>{
			clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
		});
	}
};

const pickerWarehouseValue = ref('');
const onWarehouseChange = (e) => {
	console.log('仓库 e:',e);
	pickerWarehouseValue.value = cklist.value[e.detail.value].name;
	formData.warehouse = pickerWarehouseValue.value;
	formData.ckid = cklist.value[e.detail.value].id;
};


const apiModelSearchData = async (inputText) => {
	const data = {
		word:inputText
	}
	const res = await apiSearchGoods(data)
	console.log('search res:',res)
	if (res.code ==='200') {
		orgArray.value = res.lists?res.lists:[];
	}
};
const infos = ref()
const cgylist = ref([])
const cklist = ref([])
const showBxjz = ref(false)
const apiQualityCheckItemData = async (id) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		id: id
	};
	const res = await apiQualityCheckItem(data);
	if (res.code === 200) {
		showBxjz.value = res.lists.some(item => item.name.includes("保修截止"));
		// 过滤掉保修截止项
		dynamicList.value = res.lists.filter(item => item.name !== '保修截止');
		console.log('dynamicList:', dynamicList.value);
		collapsedStatus.value = dynamicList.value.map(() => false);
		gjbb.value = res.gjbb;
		wlbb.value = res.wlbb;
		infos.value = res.infos;
		cgylist.value = res.cgylist;
		cklist.value = res.cklist;
		if (cklist.value.length > 0) {
		    const filteredItems = cklist.value.filter(item => item.sxck === '1');
		    if (filteredItems.length > 0) {
		        pickerWarehouseValue.value = filteredItems[0].name;
		        formData.ckid = filteredItems[0].id;
				formData.warehouse = pickerWarehouseValue.value
		    }
		}

		content1.value[0].value = infos.value.xhname;
		content1.value[1].value = infos.value.ncname;
		content1.value[2].value = infos.value.ysname;
		content1.value[3].value = infos.value.spname;
	}
};
const apiQualityCheckAddData = async () => {
	
	// 收集所有文件的 URL
	const allFileUrls = [];
	for (let index in fileListRef) {
		if (fileListRef[index]) {
			fileListRef[index].forEach(file => {
				allFileUrls.push({ id: file.itemId, url: file.url });
			});
		}
	}
	
	const data = {
		id: productId.value,
		// opid: uni.getStorageSync('sessionInfo').opid,
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		ch: formData.imei,
		gjbbid: selectedGjbb.value.id,
		wlbbid: selectedWlbb.value.id,
		ycbgtplist:JSON.stringify(allFileUrls),
		jbztid:clickedItems.value.map(item => item.id).join(','),
		jbztcolor:clickedItems.value.map(item => item.color).join(','),
		jkbz:formData.remark,
		efficiency:formData.batteryEfficiency,
		bxsj:maintenanceTime.value.time,
		lx:'1',//1商品录入2功能绿录入3维修录入
		ckid: formData.ckid,
		cgyid: formData.cgyid,
		qcid: quancid.value
	};
	try {
		const res = await apiQualityCheckAdd1(data);
		console.log('apiQualityCheckAddData:', res);
		if (res.zt === 1) {
			formData.successId = res.ids;
			formData.zjid = res.ids
			inputConfirmRef.value.getData(formData.imei);
			if(from.value!=='QC'){
				inputPopup.value.open();
			}else{
				uni.showToast({
					title: '提交成功',
					icon: 'none',
					duration: 2000
				})
			}
			productId.value = res.ids
		}else if(res.zt===201){
			uni.showToast({
				title: '已有串号商品，请重新检测串号',
				icon: 'none',
				duration: 2000
			});
		}else {
			uni.showToast({
				title: '录入失败，请重试',
				icon: 'none',
				duration: 2000
			});
		}
	} catch (e) {
		console.log('apiQualityCheckAddData :', e);
	}
};
const collapsedStatus = ref([]); // 初始化折叠状态数组
const collapseChange = (isOpen, index) => {
	console.log('面板：', isOpen.length > 0);
	collapsedStatus.value[index] = isOpen.length > 0;
};

const clickedItems = ref([]);
const selectedGjbb = ref(null);
const selectedWlbb = ref(null);

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


const handleGjbbClick = (item1) => {
	selectedGjbb.value = item1;
	console.log('selectedGjbb:', selectedGjbb.value);
};

const handleWlbbClick = (item1) => {
	selectedWlbb.value = item1;
	console.log('selectedWlbb:', selectedWlbb.value);
};

const isSelected = (index, item1) => {
	return clickedItems.value[index] === item1;
};

const isSelectedGjbb = (item1) => {
	return selectedGjbb.value === item1;
};

const isSelectedWlbb = (item1) => {
	return selectedWlbb.value === item1;
};

const onTimeChange = (e) => {
	const selectedDate = new Date(e.detail.value);
	const year = selectedDate.getFullYear();
	const month = selectedDate.getMonth() + 1;
	const day = selectedDate.getDate();
	maintenanceTime.value.time = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	maintenanceTime.value.values[0] = year;
	maintenanceTime.value.values[1] = month;
	maintenanceTime.value.values[2] = day;
};

const onSelectWorkChange = (e) => {
	console.log('员工 e.detail.value:',e.detail.value);
	pickerMemberValue.value = cgylist.value[e.detail.value].username;
	formData.purchaseEmployee = pickerMemberValue.value;
	formData.cgyid = cgylist.value[e.detail.value].id;
};

const handleClose = () => {
	inputPopup.value.close();
	jixingPopup.value.close();
	show.value = true;
};


const scanCode = () => {
	uni.scanCode({
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
			formData.imei = res.result;
		}
	});
};

const comfrm = () => {
	console.log('comfrm check:',fileListRef);
	console.log('formData',formData)
	if (!formData.imei) {
		uni.showToast({
			title: '请输入商品串号',
			icon: 'none',
			duration: 2000
		});
		
		return;
	}
	
	if(formData.imei.length!==parseInt(infos.value.cd) ){
		uni.showToast({
		  title: `IMEI 必须是 ${infos.value.cd} 位`,
		  icon: 'none',
		  duration: 2000
		});
		return;
	}
	if (infos.value.sfjcdcxl===1&&!formData.batteryEfficiency) {
		uni.showToast({
			title: '请输入电池效率',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	console.log('formData.batteryEfficiency:',formData.batteryEfficiency)
	if(formData.batteryEfficiency&&parseInt(formData.batteryEfficiency)>100){
		uni.showToast({
		  title: '电池效率不能大于100',
		  icon: 'none',
		  duration: 2000
		});
		return;
	}
	if (!selectedGjbb.value) {
		uni.showToast({
			title: '请选择国家版本',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	if (!selectedWlbb.value) {
		uni.showToast({
			title: '请选择网络版本',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	if (clickedItems.value.some(item => !item)) {
		uni.showToast({
			title: '请选择所有检测项',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	// 验证采购员工是否选择
	if (!formData.purchaseEmployee) {
		uni.showToast({
			title: '请选择采购员工',
			icon: 'none',
			duration: 500
		});
		return;
	}
	// 验证录入仓库是否选择
	if (!formData.warehouse) {
		uni.showToast({
			title: '请选择录入仓库',
			icon: 'none',
			duration: 500
		});
		return;
	}
	
	// 验证所有异常图片是否已上传
	for (let index = 0; index < dynamicList.value.length; index++) {
		const item = dynamicList.value[index];
		const selected = clickedItems.value[index];
		if (showUpdate(index) && (!fileListRef[index] || fileListRef[index].length === 0)) {
			uni.showToast({
				title: `请上传 ${item.name} 的图片`,
				icon: 'none',
				duration: 2000
			});
			return;
		}
	}
	
	apiQualityCheckAddData()
};


const handleUpload = (event, index, itemId) => {
	console.log('itemId:',itemId);
	console.log('上传 event:',event)
	uploadFilesByIndex1(event, index, fileListRef, itemId); // 传递 itemId
};

const handleDelete = (event, index) => {
	uploadDeleteByIndex(event, index, fileListRef);
};
const reset = () => {
	
	// formData = {
	// 	batteryEfficiency: '', // 电池效率
	// 	imei: '', // IMEI/SN
	// 	purchaseEmployee: '', // 采购员工
	// 	remark: '',
	// 	warehouse: '', // 新增的录入仓库字段
	// 	successId:'',//录入成功返回id
	// 	ckid:'',
	// 	cgyid:''
	// };
	
	formData.batteryEfficiency = '';
	formData.imei = '';
	formData.remark = '';
	formData.warehouse = '';
	formData.ckid='';
	formData.cgyid='';
	formData.purchaseEmployee = '';
	formData.successId = ''
	
	
	maintenanceTime.value.time = '';
	clickedItems.value = [];
	selectedGjbb.value = null;
	selectedWlbb.value = null;
	pickerMemberValue.value = '';
	selectedText.value = [];
	maintenanceTime.value.time = ''; 
	maintenanceTime.value.values = ['','','']
	// collapsedStatus.value = dynamicList.value.map(() => false);
	dynamicList.value = []
	collapsedStatus.value = []
	
	maintenanceTime.value = { title: '保修截止', values: ['', '', ''], time: '' }
	showBxjz.value = false
	gjbb.value = []
	wlbb.value = []
	
	
	quancid.value = ''
	productId.value = ''
	content1.value = [
		{ key: '型号', placeholder: '请搜索相关型号', value: '' },
		{ key: '内存', placeholder: '请搜索相关型号', value: '' },
		{ key: '颜色', placeholder: '请搜索相关型号', value: '' },
		{ key:'型号全称',placeholder: '', value:''}
	];
	orgArray.value = []
	if(qselect&& qselect.value){
		qselect.value.clearData()
	}
};
const apiQualityCheckSerialSearchData = async (ch) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		return orgArray.value = res.lists?res.lists:[];
	}
};

const setGjbbAndWlbb = (gjbbname, wlbbname) => {
  gjbb.value.forEach((item) => {
    if (item.name === gjbbname) {
      selectedGjbb.value = item;
    }
  });
  wlbb.value.forEach((item) => {
    if (item.name === wlbbname) {
      selectedWlbb.value = item;
    }
  });
};

const setBatteryEfficiency = (efficiency) => {
  formData.batteryEfficiency = efficiency;
};

const setMaintenanceTime = (bxsj) => {
  maintenanceTime.value.time = bxsj;
  bxsj.split('-').forEach((item, index) => {
    maintenanceTime.value.values[index] = parseInt(item);
  });
};

const setPurchaseEmployee = (cgyname) => {
  cgylist.value.forEach((item) => {
    if (item.name === cgyname) {
      pickerMemberValue.value = item.name;
      formData.cgyid = item.id;
    }
  });
};

const setWarehouse = (ckid) => {
  cklist.value.forEach((item) => {
    if (item.id === ckid) {
      pickerWarehouseValue.value = item.name;
      formData.ckid = item.id;
    }
  });
};

const setRemark = (jkbz) => {
  formData.jkbz = jkbz;
};

const setMachineData = (machine) => {
  if (machine) {
    const machineArray = machine.split(',');
    machineArray.forEach((item) => {
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
};

const setYcbgData = (jbztycbg) => {
  if (jbztycbg) {
    const jbztycbgArray = JSON.parse(jbztycbg);
    jbztycbgArray.forEach((item) => {
      const index = dynamicList.value.findIndex(dynamicItem => dynamicItem.id == item.id);
      if (index !== -1) {
        if (!fileListRef[index]) {
          fileListRef[index] = [];
        }
        fileListRef[index].push({ url: item.url, itemId: item.id });
      }
    });
  }
};

const selectedItemChange = (e) => {
  console.log('e',e)
  const { jbztycbg, machine, id, ch, gjbbname, wlbbname, efficiency, bxsj, cgyname, ckid, jkbz,qcid } = e;
  productId.value = id
  quancid.value = qcid 
  apiQualityCheckItemData(qcid).then(() => {
    clickedItems.value = new Array(dynamicList.value.length).fill(null); // 初始化 clickedItems 数组
    formData.imei = ch;
    setGjbbAndWlbb(gjbbname, wlbbname);
    setBatteryEfficiency(efficiency);
    setMaintenanceTime(bxsj);
    setPurchaseEmployee(cgyname);
    setWarehouse(ckid);
    setRemark(jkbz);
    setMachineData(machine);
    setYcbgData(jbztycbg);
   
  });
};
uni.$on('productInputRefresh', () => {
    // inputPopup?.value?.close();
    reset();
});


const from = ref('')
onLoad((options)=>{
	if(options.ch){
		apiQualityCheckSerialSearchData(options.ch).then((res)=>{
			console.log('apiQualityCheckSerialSearchData:',res)
			selectedItemChange(res[0])
		})
	}
	if(options.from){
		from.value = options.from
	}
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.productInput-layout {
	min-height: 100vh;
	background: linear-gradient(180deg, #f3f2f6 0%, #f8f8f8 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.search {
	margin-left: 20rpx;
	margin-top: 36rpx;
	width: 710rpx;
	height: 96rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	align-items: center;
	padding-left: 24rpx;
	padding-right: 24rpx;
}
.search-img {
	height: 32rpx;
	width: 32rpx;
	margin-right: 20rpx;
}
.search-select {
	width: 100%;
}
.content-1 {
	margin-left: 20rpx;
	box-sizing: border-box;
	margin-top: 8rpx;
	// height: 300rpx;
	width: 710rpx;
	background: #ffffff;
	border-radius: 0rpx 0rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	padding-right: 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	.top {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			width: 166rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			text {
				width: 118rpx;
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				font-style: normal;
				text-transform: none;
			}
		}
		.right {
			width: 77%;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #eeeeee;
			height: 100%;
			align-items: center;
			.selectDownUp {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			text {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1f1f1f;
				opacity: 0.4;
			}
			.selelct {
				width: 96rpx;
				border-left: 2rpx solid #eeeeee;
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #669cfd;
					margin-left: 20rpx;
				}
			}
		}
	}
}
	.imei-card {
	margin-left: 20rpx;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	width: 710rpx;
	height: 96rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	.left {
		width: 166rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			width: 126rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: center;
			font-style: normal;
		}
	}
	.mid {
		width: 2rpx;
		height: 24rpx;
		background: #eeeeee;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		margin-right: 30rpx;
	}
	.right {
		flex: 1;
	}
}
.member {
	margin-left: 20rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	margin-top: 20rpx;
	width: 710rpx;
	height: 96rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	align-items: center;
	justify-content: space-between;
	.left {
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
	}
	.right {
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: right;
			margin-right: 10rpx;
		}
		image {
			height: 20rpx;
			width: 20rpx;
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
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
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
			width: 60rpx;
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
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}
.power {
	margin-left: 20rpx;
	margin-top: 20rpx;
	box-sizing: border-box;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
	padding: 24rpx;
	display: flex;
	flex-direction: column;
	.title {
		margin-bottom: 32rpx;
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
	}
	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.power-input {
			width: 600rpx;
		}
	}
	.divile {
		width: 670rpx;
		height: 2rpx;
		background: #eeeeee;
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
			height: 200rpx;
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
.maintenance {
	padding: 24rpx;
	margin-top: 20rpx;
	margin-left: 20rpx;
	width: 710rpx;
	height: 196rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
	.title {
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
	}
	.content {
		margin-top: 24rpx;
		width: 670rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: grid;
		justify-content: space-between;
		grid-template-columns: auto auto auto;
		.card {
			margin-bottom: 10rpx;
			width: 198rpx;
			height: 80rpx;
			background: #f9f9f9;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: flex-end;
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
				margin-right: 22rpx;
				text-align: right;
			}
			&.clicked {
				background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
			}
		}
	}
}
.custom-card {
	margin-left: 20rpx;
	margin-top: 20rpx;
	padding: 24rpx;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title {
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: left;
		}
	}
	.content {
		margin-top: 24rpx;
		width: 100%;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: grid;
		justify-content: space-between;
		grid-template-columns: 33.33% 33.33% 33.33%;
		grid-column-gap: 10rpx;
		.card {
			transition: all 0.3s;
			margin-bottom: 10rpx;
			width: 198rpx;
			height: 80rpx;
			background: #f9f9f9;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.card-text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				margin-right: 22rpx;
			}
			.card-text.clicked-text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #ffffff;
				text-align: center;
			}
			&.clicked {
				animation: selectedAnimation-1 1s ease;
				background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
			}
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
