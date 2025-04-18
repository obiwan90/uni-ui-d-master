<template>
	<view class="inventoryManager-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#FFFFFF'">
			<template #name>库存管理</template>
			<template #fill>库存管理</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 140rpx; background: #ffffff; width: 100%">
			<view class="search" >
				<!-- <view class="search-content"> -->
				<view class="searchBar">
					<view style="display: flex; align-items: center; justify-content: space-between">
						<uni-data-select class="data-select" v-model="searchSelectValue" :localdata="range" @change="change" :clear="false"></uni-data-select>
					</view>
					<view class="divile" />
					<view class="right">
						<image src="https://www.xzxskj.com/xcximg/icon_search@3x.png" mode="aspectFit"></image>
						<view class="selectDownUp" style="width: 300rpx">
							<qiaoSelect
								:keyId="1"
								:dataList="orgArray"
								phText="请输入串号"
								searchKey="name"
								:showBorder="false"
								:disabled="false"
								:searchKey="searchModelKey"
								:showField="showModelField"
								@input="handleInput"
								@change="selectChange"
								ref="myInputRef"
							></qiaoSelect>
						</view>
					</view>
					<view  class="right" >
						<view class="inline" />
						<image style="width: 30rpx; height: 30rpx" src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFit" @click="scan"></image>
					</view>
					
				</view>
				<view class="image-right" @click="openSaiXuanPannle">
					<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- <view class="search-fill" style="height: 90rpx; background: #ffffff; width: 100%">
			<view class="search" style="{width: '640rpx'}">
				<view class="searchBar">
					<view class="search-content">
						<image style="height: 30rpx; width: 30rpx" class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="1"
								:dataList="orgArray"
								phText="请输入串号"
								searchKey="name"
								:showBorder="false"
								:disabled="false"
								:searchKey="searchModelKey"
								:showField="showModelField"
								@input="handleInput"
								@change="selectChange"
								ref="myInputRef"
							></qiaoSelect>
						</view>
					</view>
					<view  class="right" >
						<view class="inline" />
						<image style="width: 30rpx; height: 30rpx" src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFit" @click="scan"></image>
					</view>
				</view>
			</view>
			
			<view class="image-right" @click="openSaiXuanPannle">
				<image src="https://www.xzxskj.com/Public/upload/66cbadd5e6c0e6908.png" mode="aspectFill"></image>
			</view>
		</view> -->

		<van-dropdown-menu z-index="20" class="dropdownMenu" style="background: #ffffff" active-color="#EB4636">
			<van-dropdown-item  :value="value1" :options="option1" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange1" />
			<van-dropdown-item  :value="value2" :options="option2" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange2" />
			<van-dropdown-item  :value="value3" :options="option3" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange3" />
			<van-dropdown-item  :value="value4" :options="option4" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange4" />
		</van-dropdown-menu>

		<view style="background-color: #f3f3f3; height: 965rpx; width: 100%">
			<z-paging ref="paging"  :default-page-size = "20" show-refresher-update-time  :fixed="false" v-model="dataList" @query="queryList">
				<view v-for="(item, index) in dataList" :key="index" class="card" style="display: flex; flex-direction: column">
					<view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx">
						<view style="display: flex; align-items: center">
							<view v-if="value1=='1'||value1=='3'||value1=='5'"
								style="
									padding: 0 8rpx;
									margin-right: 10rpx;
									background: #ffeeec;
									border-radius: 8rpx 8rpx 8rpx 8rpx;
									display: flex;
									justify-content: center;
									align-items: center;
								"
							>
								<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #eb4636; text-align: center">{{item.kl}}天</text>
							</view>
							<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; text-align: left">
								上架时间：
							</text>
							<uni-dateformat style="font-size: 24rpx;" :date="formatTimestamp(item.add_times)" format="yyyy-MM-dd hh:mm:ss" ></uni-dateformat>
							<!-- <uni-dateformat :date="item.add_times" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat> -->
						</view>
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #e6432e; text-align: right">{{ getType(item.zt) }}</text>
					</view>

					<view style="padding: 20rpx 0; border-top: 2rpx solid #eeeeee; border-bottom: 2rpx solid #eeeeee; display: flex; justify-content: center; align-items: center">
						<view>
							<view
								v-if="item.special&&item.special==='1'"
								style="
									margin-top: 6rpx;
									margin-left: 6rpx;
									position: absolute;
									display: flex;
									align-items: center;
									justify-content: center;
									border-radius: 10rpx 0rpx 10rpx 0rpx;
									background: linear-gradient(180deg, #ed784b 0%, #eb4636 100%);
									width: 96rpx;
									height: 28rpx;
									z-index: 2;
								"
							>
								<text style="width: 80rpx; height: 28rpx; font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 20rpx; color: #ffffff">限时特价</text>
							</view>
							<van-image width="95" height="95" fit="as" radius="18rpx" :src="item.cover" mode="fill">
								<template v-slot:error>加载失败</template>
								<van-loading slot="loading" type="spinner" size="20" vertical />
							</van-image>
						</view>

						<view style="flex: 1; margin-left: 20rpx; height: 190rpx; display: flex; flex-direction: column; justify-content: space-between">
							<view style="display: flex; flex-direction: column">
								<view>
									<van-tag v-if="item.finenessname" class="tag-class" size="medium" color="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)">{{item.finenessname}}</van-tag>
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; line-height: 40rpx; text-align: left">
										<!-- 华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通） -->
										{{item.name}}
									</text>
								</view>

								<view style="display: flex; align-items: center; margin-top: 4rpx">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">
										IMEI：{{item.ch}}
									</text>
									<image style="height: 20rpx; width: 20rpx; margin-left: 10rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>

								<view style="display: flex; align-items: center; margin-top: 4rpx">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-right: 40rpx">
										采购：{{item.cgyname}}
									</text>
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">仓库：{{item.ckname}}</text>
								</view>
							</view>
							
							<view style="display: flex; align-items: center;justify-content: space-between;">
							<!-- <view style="display: flex; align-items: center"> -->
								<view style="display: flex;align-items: center;">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">
										批发价:
									</text>
									<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥{{item.price}}</text>
								</view>
								<uni-icons v-if="value1==='1'&&!selectedItems.includes(item)" color="#D2CFCA" type="circle" size="32" @click="toggleSelectItem(item)"></uni-icons>
								<uni-icons v-if="value1==='1'&&selectedItems.includes(item)"  color="#E6432E" type="checkbox-filled" size="32" @click="toggleSelectItem(item)"></uni-icons>
								<!-- <text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">
									批发价:
								</text>
								<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥{{item.price}}</text> -->
							</view>
						</view>
					</view>
					
					<view style="display: flex;justify-content: space-between;align-items: center;" v-if="item.zt !=='1'">
						<view style="display: flex;align-items: center;gap: 10rpx;justify-content: center;">
							<image src="https://www.xzxskj.com/xcximg/icon_shou@3x.png" style="height: 32rpx;width: 32rpx;" mode="aspectFill"></image>
							<text style="font-weight: bold;font-size: 24rpx;color: #1F1F1F;">{{item.cgname}}</text>
							<uni-dateformat date="2024-04-16 11:45:12" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
							
						</view>
						<view style="display: flex;align-items: center;gap: 6rpx;">
							<text style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">结算价:<text style="font-family: DIN, DIN;font-weight: bold;font-size: 32rpx;color: #E6432E;">￥{{item.price}}</text></text>
						</view>
					</view>
					
					<view v-if="getBtn(item.zt).btns.length>0"
						style="
							display: grid;
							grid-template-columns: auto auto auto auto;
							gap: 14rpx;
							justify-content: flex-end;
							align-items: center;
							margin-top: 16rpx;
							height: 92rpx;
						"
					>
					  <!-- background: index === getBtn(item.zt).btns.length - 1 ? 'linear-gradient(89deg, #FF6D0C 0%, #EB4636 100%)' : '' -->
					   <!--  -->
						<view  @click="selectBtn(item,index)"
							class="button-animation"
							v-for="(bn, index) in getBtn(item.zt).btns"
							:key="index"
							:style="{
							  'width': '156rpx',
							  'height': '60rpx',
							  'border-radius': '10rpx 10rpx 10rpx 10rpx',
							  'border':  index === getBtn(item.zt).btns.length - 1 ?'none':'2rpx solid #1f1f1f',
							  'opacity':  index === getBtn(item.zt).btns.length - 1 ? 1 : 0.5,
							  'display': 'flex',
							  'justify-content': 'center',
							  'align-items': 'center',
							  'background': index === getBtn(item.zt).btns.length - 1 ? 'linear-gradient(89deg, #FF6D0C 0%, #EB4636 100%)' : ''
							}"
						>
							<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: center" :style="{color:index === getBtn(item.zt).btns.length - 1 ? ' #FFFFFF' : '#1F1F1F'}">{{bn}}</text>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<view style="height: 258rpx" />
		<!-- btn -->
		<view class="bottom-btn">
			<view class="top">
				<view class="left">
					<view class="text-1">
						<text class="text-class-1">数量:</text>
						<text class="text-class-2">{{value1==='1'?selectedItemCount:dataList.length}}</text>
						<text class="text-class-1">台</text>
					</view>

					<view class="text-1">
						<text class="text-class-1">金额:</text>
						<text class="text-class-2">￥{{value1==='1'?totalSelectedPrice:totalPrice}}</text>
					</view>
				</view>
				<view v-if="value1==='1'" class="right" @click="toggleSelectAll">
					<view >
						<view v-if="!isAllSelected" class="circular" style="width: 32rpx;
						height: 32rpx;
						border-radius: 18rpx;
						border: 2rpx solid #D2CFCA;"/>
						<image v-else style="height: 32rpx; width: 32rpx;border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
					</view>
					<text>全选</text>
				</view>
			</view>

			<view class="content">
				<view
					v-if="value1!=='1'"
					@click="openExportLog"
					class="button-animation"
					style="width: 710rpx; height: 96rpx; background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%); border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center; justify-content: center"
				>
					<text class="text-10" style="color: #FFFFFF;">库存导出</text>
				</view>
				
				
				<view v-if="value1==='1'" style="display: flex;align-items: center;gap: 35rpx;width: 710rpx;justify-content: center;">
					<view class="content2" >
						<view class="left-btn">
							<uni-data-select
								class="select"
							    v-model="returnProductSelectValue"
							    :localdata="returnProductRange"
								placement="top"
							    @change="returnProductChange"
								:clear="false"
							>
							</uni-data-select>
						</view>
						<view class="right-btn button-animation" @click="openExportLog">
							<text class="text-13">库存导出</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saiXuanPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
			<view>
				<inventoryManagerSaixuan v-if="showSaiXuanPannel" @close="handleClose"></inventoryManagerSaixuan>
			</view>
		</uni-popup>
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="productControlPannelPopup" :safe-area="false" type="center" @close="handleClose" @change="pannelChange">
			<view>
				<productControlPannel :id="productId" :name="productName" :imei="imei" v-if="showProductControlPannel" @close="handleClose"></productControlPannel>
			</view>
		</uni-popup>
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="exportLogPopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
			<view >
				<exportLogPannel ref="exportLogPannelRef" v-if="showExport"  @close="handleClose" ></exportLogPannel>
			</view>
		</uni-popup>
		
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { formatTimestamp } from '@/utils/common.js'
import { inventoryManagerSaixuan } from './components/inventoryManagerSaixuan.vue';
import { productControlPannel } from './components/productControlPannel.vue';
import { exportLogPannel } from './components/exportLog.vue'
import { apiGetInventory,apiEditInventory,apiModelSearch } from '../api/api.js'
import { scanCode } from '@/utils/common.js'
import { apiChSelectSearch,apiGetInventorySelect } from '../api/api.js'
const searchModelKey = computed(()=>{
	return searchSelectValue.value===0?'ch':'name'
})
const showModelField = computed(()=>{
	return searchSelectValue.value===0?'ch':'name'
})
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


const isAllSelected = ref(false)
const selectedItems = ref([])
const returnProductSelectValue =  ref(0)
const returnProductRange = ref([
	{ value: 0, text: "批量快速批发" },
	{ value: 1, text: "批量退出库存" }
])
const returnProductChange = (e) => {
  const selectedItem = returnProductRange.value[e];
  uni.showModal({
    title: '确认操作',
    content: `确定要进行${selectedItem.text}操作吗？`,
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定');
        batchAction(e);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
};

const toggleSelectAll = ()=>{
	isAllSelected.value = !isAllSelected.value
	if (!isAllSelected.value) {
		selectedItems.value = []; 
	} else {
		selectedItems.value = dataList.value
		console.log('selectedItems',selectedItems.value)
	}
}

const toggleSelectItem = (item)=>{
	const index = selectedItems.value.indexOf(item);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item);
	}
}
// 计算选中的商品数量
const selectedItemCount = computed(() => {
    return selectedItems.value.length;
});
// 计算选中商品的总价格
const totalSelectedPrice = computed(() => {
    return selectedItems.value.reduce((total, item) => {
        const price = parseFloat(item.price) || 0; 
        return total + price;
    }, 0);
});


const exportLogPopup = ref(null)
const showExport = ref(true)
const exportLogPannelRef = ref(null)

const showSaiXuanPannel = ref(false);
const saiXuanPannelPopup = ref(null);
const showProductControlPannel = ref(false);
const productControlPannelPopup = ref(null);
const handleClose = () => {
	console.log('Popup is closed');
	saiXuanPannelPopup.value.close();
	productControlPannelPopup.value.close();
	exportLogPopup.value.close();
	paging.value.refresh(true);
};
const pannelChange = (e) => {
	if (!e.show) {
		showSaiXuanPannel.value = e.show;
		showProductControlPannel.value = e.show
	}
};
const openExportLog = ()=>{
	showExport.value = true
	exportLogPannelRef.value.initTime()
	exportLogPopup.value.open()
}
const apiChSelectSearchAc =async (search)=>{
	const param = {
		ch:search
	}
	const res = await apiChSelectSearch(param)
	if(res.code === '200'&&res.goodslist){
		console.log(res)
		orgArray.value = res.goodslist
	}
}

const apiModelSearchAc = async (xh)=>{
	const param = {
		xh:xh
	}
	const res = await apiModelSearch(param)
	console.log('res',res)
	if(res.code === '200'){
		orgArray.value = res.goodslist
	}
}

const apiGetInventorySelectAc = async(id)=>{
	const res = await apiGetInventorySelect({id:id})
	if(res.code==='200'){
		console.log(res)
	}
}

const openProductControlPannel = () => {
	showProductControlPannel.value = true;
	productControlPannelPopup.value.open();
};

const openSaiXuanPannle = () => {
	showSaiXuanPannel.value = true;
	saiXuanPannelPopup.value.open();
};

const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(true);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	param.value.start = String(pageNo-1)
	await apiGetInventoryData();
	//重置分类
	if(param.value.ch){
		const lxText = getType(goodslist.value[0].zt)
		console.log('重置',lxText)
		value1.value = option1.value.find(option => option.text === lxText).value;
		console.log('重置',value1.value)
	}
	//上架中全选
	// if(value1.value === '1'){
	// 	isAllSelected.value = false
	// 	toggleSelectAll()
	// }
	paging.value.complete(goodslist.value);
};
const searchSelectValue = ref(0);
const range = ref([
	{ value: 0, text: '串号搜索' },
	{ value: 1, text: '型号搜索' }
]);
const selectParamChange = () => {
	paging.value.reload(true);
};
const change = (e) => {
	console.log('e:', e);
	orgArray.value = []
	searchSelectValue.value = e
};
const orgArray = ref([]);
const selectChange = (e) => {
	console.log(e);
	param.value.ch = ""
	param.value.id = ""
	
	if(searchSelectValue.value===0){
		param.value.ch = e.ch
		
	}else{
		param.value.id = e.id
	}
	
	if(param.value.zt){
		param.value.zt = ''
	}
	
	myInputRef.value.clearData()
	orgArray.value = []
	paging.value.reload(true)
};
const handleInput =async (inputText)=>{
	console.log('输入框内容:', inputText);
	
	if (inputText.length>0) {
		console.log('inputText',inputText)
		uni.showLoading({
			title: '加载中',
			mask:true
		});
		
		if(searchSelectValue.value===0)await apiChSelectSearchAc(inputText);
		if(searchSelectValue.value===1)await apiModelSearchAc(inputText)
		uni.hideLoading();
	}else{
		orgArray.value = []
		param.value.id = ''
	}
	
}


const option1 = ref([
	{ text: '上架中', value: '1' },
	{ text: '平台已售', value: '2' },
	{ text: '先货后款', value: '3'},
	{ text: '线下已售', value: '4' },
	{ text: '临时下架', value: '5' },
	{ text: '已退库存', value: '6' },
]);


const resultType = ref([
	{ text: '上架中', value: '1' },
	{ text: '平台已售', value: '5' },
	{ text: '先货后款', value: '7'},
	{ text: '线下已售', value: '6' },
	{ text: '临时下架', value: '3' },
	{ text: '已退库存', value: '4' },
])
const getType = (value) => {
  const matchedItem = resultType.value.find((item) => item.value === value);
  return matchedItem ? matchedItem.text : '';
};

const option2 = ref([{ text: '最新上架', value: '1' },{text:'库龄最长',value: '2'}]);
// const option3 = ref([
// 	{ text: '张三', value: 0 },
// 	{ text: '李四', value: 1 },
// 	{ text: '王五', value: 2 }
// ]);
const option3 = ref([
	{text:'全部采购',value:-1}
	// { text: '张三', value: 0 },
	// { text: '李四', value: 1 },
	// { text: '王五', value: 2 }
]);
// const option4 = ref([{ text: '全部库存', value: 0 }]);
const option4 = ref([
	{text:'全部仓库',value:-1}
]);
const value1 = ref('1');
const value2 = ref('1');
const value3 = ref(-1);
const value4 = ref(-1);

const btnData = ref([
	{ type: '上架中',zt:'1', btns: ['临时下架', '退出库存', '快速批发'] },
	{ type: '先货后款',zt:'7', btns: [ '去收款'] },
	{ type: '临时下架',zt:'3', btns: [ '退出库存', '继续上架'] },
	// { type: '已退库存',zt:'4', btns: ['重新录入'] },
	{ type: '已退库存',zt:'4', btns: [] },
	{ type: '平台已售',zt:'5', btns: [] },
	{ type: '线下已售',zt:'6', btns: [] }
]);
const getBtn = (zt) => {
	return btnData.value.find(item => item.zt === zt);
};
const selectParamChange1 = (e)=>{
	value1.value = e.detail
	param.value.zt = e.detail
	if(param.value.ch){
		param.value.ch = ''
	}
	myInputRef.value.clearData()
	orgArray.value = []
	console.log('selectParamChange1:',e)
	paging.value.reload(true)
}
const selectParamChange2 = (e)=>{
	value2.value = e.detail
	param.value.lx = e.detail
	console.log('selectParamChange2:',e)
	paging.value.reload(true)
}
const selectParamChange3 = (e)=>{
	value3.value = e.detail
	console.log('selectParamChange3:',e)
	param.value.cgygid = e.detail===-1?'':e.detail
	paging.value.reload(true)
}
const selectParamChange4 = (e)=>{
	value4.value = e.detail
	console.log('selectParamChange4:',e)
	param.value.ckid = e.detail===-1?'':e.detail
	paging.value.reload(true)
}

const productName =ref()
const imei  = ref()
const productId = ref()
// const selectBtn = (item,index)=>{
// 	//1临时下架2退出库存3退货下架4退货上架
// 	if(getBtn(item.zt).btns[index] === '商品管理'){
// 		productName.value = item.name
// 		imei.value = item.ch
// 		productId.value = item.id
// 		openProductControlPannel()
// 	}
// 	if(getBtn(item.zt).btns[index] === '临时下架'){
// 		apiEditInventoryData('/Home/Goods/updatezt?zt=1',{id:item.id,zt:'1'})
// 	}
// 	if(getBtn(item.zt).btns[index] === '退货下架'){
// 		apiEditInventoryData('/Home/Goods/updatezt?zt=3',{id:item.id,zt:'3'})
// 	}
// 	if(getBtn(item.zt).btns[index] === '退出库存'){
// 		apiEditInventoryData('/Home/Goods/updatezt?zt=2',{id:item.id,zt:'2'})
// 	}
// 	if(getBtn(item.zt).btns[index] === '退货上架'){
// 		apiEditInventoryData('/Home/Goods/updatezt?zt=4',{id:item.id,zt:'4'})
// 	}
// 	if(getBtn(item.zt).btns[index] === '快速批发'){
// 		uni.navigateTo({
// 			url:'/pagesFirstWholesale/firstWholeSale/firstWholeSale?data='+JSON.stringify(item)
// 		})
// 	}
// 	if(getBtn(item.zt).btns[index] === '重新录入'){
// 		uni.navigateTo({
// 			url:'/pagesProductInput/productInput/productInput?ch='+item.ch
// 		})
// 	}
// }

const selectBtn = (item, index) => {
	// 1临时下架2退出库存3退货下架4退货上架
	const action = getBtn(item.zt).btns[index];

	uni.showModal({
		title: '确认',
		content: `您确定要执行 "${action}" 操作吗？`,
		success: (res) => {
			if (res.confirm) {
				// 用户点击确定
				if (action === '商品管理') {
					productName.value = item.name;
					imei.value = item.ch;
					productId.value = item.id;
					openProductControlPannel();
				}
				if(action === '去收款'){
					uni.navigateTo({
						url:'/pagesCustomOrder/customOrder/customOrder?fpak=1&ch='+item.ch
					})
				}
				if (action === '临时下架') {
					apiEditInventoryData('/Home/Goods/updatezt?zt=1', { id: item.id, zt: '1' });
				}
				if (action === '退货下架') {
					apiEditInventoryData('/Home/Goods/updatezt?zt=3', { id: item.id, zt: '3' });
				}
				if (action === '退出库存') {
					apiEditInventoryData('/Home/Goods/updatezt?zt=2', { id: item.id, zt: '2' });
				}
				if (action === '退货上架') {
					apiEditInventoryData('/Home/Goods/updatezt?zt=4', { id: item.id, zt: '4' });
				}
				if (action === '继续上架') {
					apiEditInventoryData('/Home/Goods/updatezt?zt=5', { id: item.id, zt: '5' });
				}
				if (action === '快速批发') {
					uni.navigateTo({
						url: '/pagesFirstWholesale/firstWholeSale/firstWholeSale?data=' + JSON.stringify(item)
					});
				}
				if (action === '重新录入') {
					uni.navigateTo({
						url: '/pagesProductInput/productInput/productInput?ch=' + item.ch+'&qcid='+item.qcid+'&zjid='+item.zjid
					});
				}
			}
			// 用户点击取消，不执行任何操作
		}
	});
};



const getTotalPrice = (data)=>{
	const totalPrice = ref(0)
	data.forEach((item)=>{
		totalPrice.value += parseInt(item.price?item.price:'0')
	})
	return totalPrice.value
}

const goodslist = ref([])
const cgyglist = ref([])
const cklist = ref([])
const totalPrice = ref(0)
const param = ref({
	opid: uni.getStorageSync('sessionInfo').opid,
	zt:'1',//1.上架中
	lx:'1',//1最新上架
	zxsj:'1',
	ckid:'',
	cgygid:'',
	start: '',
	qt: '', //1只看特价2只看折叠
	classid:'',//分类id
	ppid:'',//品牌id
	systemid:'',//系统id
	versionid:'',//版本id
	finenessid:'',//成色id
	memoryid:'',//内存id
	colourid:'',//颜色id
	price:'',//价格区间
	sjkssj:'',//时间戳
	sjjssj:'',//时间戳
	id:'',
	ch:''
})
const apiGetInventoryData = async () => {
	const res = await apiGetInventory(param.value);
	if (res.code === '200') {
		console.log('库存信息 res:', res);
		goodslist.value = res.goodslist
		cgyglist.value = res.cgyglist
		cklist.value = res.cklist
		totalPrice.value = getTotalPrice(goodslist.value)
		
		if (cklist.value) {
		    cklist.value.forEach((item) => {
		        const exists = option4.value.some(option => option.value === item.id);
		        if (!exists) {
		            option4.value.push({ text: item.name, value: item.id });
		            console.log('option4:', option4.value);
		        }
		    });
		    option4.value = [...option4.value];
		    console.log('cklist:', cklist.value);
		}
		
		if (cgyglist.value) {
		    cgyglist.value.forEach((item) => {
		        const exists = option3.value.some(option => option.value === item.id);
		        if (!exists) {
		            option3.value.push({ text: item.username, value: item.id });
		            console.log('option3:', option3.value);
		        }
		    });
		    option3.value = [...option3.value];
		    console.log('cgyglist:', cgyglist.value);
			
			
		}
	}
};

const apiEditInventoryData = async (url,param) => {
	const res = await apiEditInventory(url,param);
	if (res.code === 200) {
		uni.showToast({
			title: '操作成功',
			icon: 'none',
			duration: 2000
		});
		paging.value.refresh(true)
	}
};

const batchAction = (index)=>{
	if(index === 0)batchGoFpbk(selectedItems.value)
	if(index === 1)batchOutbound(selectedItems.value)
}

//批量快速批发
const batchGoFpbk = (selectedItems)=>{
	let chs = '';
	if(selectedItems.length > 0){
		selectedItems.forEach(item=>{
			chs += item.ch + ','; 
		})
		if (chs.endsWith(',')) {
		    chs = chs.slice(0, -1);
		}
		uni.navigateTo({
			url: '/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs=' + chs
		});
	}
}

//批量退出库存
const batchOutbound =(selectedItems)=>{
	let ids = ''
	if(selectedItems.length > 0){
		selectedItems.forEach(item=>{
			ids += item.id + ','; 
		})
		if (ids.endsWith(',')) {
		    ids = ids.slice(0, -1);
		}
		apiEditInventoryData('/Home/Goods/updatezt?zt=2', { id: ids, zt: '2' });
	}
}

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.inventoryManager-layout {
	background: #f3f2f6;
	min-height: 100vh;
}
.search-fill {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.image-right{
		margin-left: 20rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72rpx;
		height: 72rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255,255,255,0.16);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.search {
		background: #ffffff;
		// margin-bottom: 32rpx;
		// margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 72rpx;
		// width: 750rpx;
		width: 750rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		// margin-bottom: 20rpx;
		.searchBar {
			padding-left: 10rpx;
			width: 610rpx;
			height: 72rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border: 2rpx solid #242424;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			// .data-select {
			// 	height: 72rpx;
			// 	width: 70rpx;
			// 	font-family: PingFang SC, PingFang SC;
			// 	font-weight: 400;
			// 	font-size: 32rpx;
			// 	color: #1f1f1f;
			// 	::v-deep .uni-select {
			// 		border: none;
			// 	}
			// }
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
// .search-fill {
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// }
// .search {
// 	margin-top: 30rpx;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	box-sizing: border-box;
// 	padding-left: 20rpx;
// 	padding-right: 20rpx;
// 	margin-bottom: 20rpx;
// 	width: 100%;
// 	height: 72rpx;
// 	.search-content {
// 		width: 618rpx;
// 		height: 72rpx;
// 		background: #ffffff;
// 		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59, 43, 15, 0.2);
// 		border-radius: 20rpx 20rpx 20rpx 20rpx;
// 		border: 2rpx solid #242424;
// 		display: flex;
// 		align-items: center;
// 		::v-deep .uni-select__selector {
// 			z-index: 20;
// 		}
// 		.data-select {
// 			height: 72rpx;
// 			width: 190rpx;
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: 400;
// 			font-size: 32rpx;
// 			color: #1f1f1f;
// 			::v-deep .uni-select {
// 				border: none;
// 			}
// 		}
// 		.divile {
// 			width: 2rpx;
// 			height: 28rpx;
// 			background: #eeeeee;
// 			border-radius: 10rpx 10rpx 10rpx 10rpx;
// 			margin-right: 20rpx;
// 		}
// 		.right {
// 			display: flex;
// 			align-items: center;
// 			image {
// 				height: 30rpx;
// 				width: 30rpx;
// 				margin-right: 16rpx;
// 			}
// 			text {
// 				font-family: PingFang SC, PingFang SC;
// 				font-weight: 400;
// 				font-size: 26rpx;
// 				color: #1f1f1f;
// 				text-align: left;
// 				opacity: 0.6;
// 			}
// 		}
// 	}
// 	.image-right {
// 		margin-left: 20rpx;
// 		display: flex;
// 		align-items: center;
// 		justify-content: center;
// 		width: 72rpx;
// 		height: 72rpx;
// 		background: #ffffff;
// 		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255, 255, 255, 0.16);
// 		border-radius: 10rpx 10rpx 10rpx 10rpx;
// 		image {
// 			width: 36rpx;
// 			height: 36rpx;
// 		}
// 	}
// }

.dropdownMenu {
	::v-deep .van-dropdown-menu {
		background-color: #ffffff;
		box-shadow: none;
	}
}
::v-deep .uni-select {
	border: none;
}
.card {
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 16rpx;
	padding-bottom: 16rpx;
	margin-top: 20rpx;
	margin-left: 20rpx;
}
.tag-class {
	::v-deep .van-tag {
		border-radius: 8rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 22rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}
}

.bottom-btn {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 750rpx;
	height: 238rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
	.top {
		display: flex;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			.text-1 {
				margin-right: 40rpx;
				display: flex;
				align-items: center;
				.text-class-1 {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
					text-align: left;
				}
				.text-class-2 {
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #eb4636;
					text-align: left;
				}
			}
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
				margin-left: 10rpx;
			}
		}
	}

	.content {
		margin-top: 18rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.center-btn {
			width: 710rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #ffffff;
				text-align: center;
			}
		}
		.left-btn {
			width: 202rpx;
			height: 96rpx;
			background: #f2f3f6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 16rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: center;
		}
		.right-btn {
			width: 492rpx;
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
		.center-btn {
			width: 710rpx;
			height: 96rpx;
			background: #f2f3f6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;

			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: center;
		}
	}
}
.text-10 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}


.content2{
	// border-bottom: 2rpx solid #EEEEEE;
	border-top: 2rpx solid #EEEEEE;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	box-sizing: border-box;
	width: 670rpx;
	display: flex;
	align-items: center;
	.left{
		image{
			height: 170rpx;
			width: 170rpx;
		}
	}
	.right{
		margin-left: 20rpx;
		box-sizing: border-box;
		height: 170rpx;
		display: flex;
		flex-direction: column;
		// border: 1rpx solid red;
		width: 100%;
		.top {
			// border: 1rpx solid red;
			display: inline-block;
			.top-tap {
				float: left;
				height: 40rpx;
				background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
				border-radius: 8rpx;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: 8rpx;
				padding-right: 8rpx;
				.top-tap-text {
					color: #ffffff;
					font-size: 22rpx;
				}
				margin-right: 10rpx;
			}
			.top-text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				vertical-align: top;
				text-align: center;
			}
		}
		.imei{
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #828282;
			}
			image{
				margin-left: 10rpx;
				height: 20rpx;
				width: 20rpx;
			}
		}
	}
	.service-menber{
		width: 670rpx;
		height: 66rpx;
		background: #F8F8F8;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: center;
			}
		}
		.dividle{
			width: 2rpx;
			height: 20rpx;
			background: #EEEEEE;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
		}
		.right{
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: center;
			}
		}
	}
	
	.bottom{
		display: flex;
		align-items: flex-end;
		flex-grow: 1;
		.text-1{
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 22rpx;
			color: #1F1F1F;
		}
		.text-2{
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 22rpx;
			color: #E6432E;
		}
		.text-3{
			font-family: DIN, DIN;
			font-weight: bold;
			font-size: 32rpx;
			color: #E6432E;
		}
		.original-price{
			margin-left: 20rpx;
			height: 32rpx;
			position: relative;
			margin-bottom: 13rpx;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #9B9B9B;
				text-align: left;
			}
			.divil{
				width: 100%;
				height: 2rpx;
				background: #9B9B9B;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				position: absolute;
				bottom: 7rpx;
				left: 0;
			}
		}
	}
}

</style>