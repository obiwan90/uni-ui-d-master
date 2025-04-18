<template>
	<view class="qualityReport-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#F3F2F6'">
			<template #name>质检报告</template>
			<template #fill>定价上架</template>
		</custom-header>

		<!-- 搜索栏 -->
		<!-- <view class="search-fill" style="height: 100rpx; background: #f3f2f6; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image class="search-image" src="/pagesListingProduct/static/icon_search@3x.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="11"
								:dataList="orgArray"
								phText="请输入串号"
								:searchKey="searchModelKey"
								:showBorder="false"
								:disabled="false"
								:showField="showModelField"
								@input="handleInput"
								@change="selectChange"
							></qiaoSelect>
						</view>
					</view>
					<view class="right">
						<view class="inline" />
						<image src="/pagesListingProduct/static/saoma.png" mode="aspectFill" @click="scan"></image>
					</view>
				</view>
			</view>
		</view> -->
		<scroll-view scroll-y="true" style="height: 1400rpx; width: 100%;">
			<!-- <van-empty v-if="!receivedData" description="请搜索相关商品进行拍照">
				<template #image>
					<view style="width: 750rpx;height: 50%;display: flex;align-items: center;justify-content: center;">
						<view style="display: flex;flex-direction: column;gap: 28rpx;align-items: center;">
							<image src="/pagesListingProduct/static/icon_dingjia@3x.png" mode="widthFix" style="width: 144rpx; height: 144rpx;"></image>
							<text style="opacity: 0.4;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">请搜索相关商品进行定价上架</text>
						</view>
					</view>
				</template>
			</van-empty> -->
			<view v-if="receivedData"
				style="
					margin-top: 20rpx;
					margin-left: 20rpx;
					width: 710rpx;
					background: linear-gradient(45deg, #ffffff 0%, #ffffff 84%, #ffe8d8 100%);
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 22rpx 20rpx;
					display: flex;
					flex-direction: column;">
				<view>
					<van-tag v-if="receivedData.finenessname" size="mini" color="linear-gradient(132deg, #D94C24 0%, #FF5221 100%)">{{receivedData.finenessname}}</van-tag>
					<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #1f1f1f; text-align: left">{{receivedData.spname}}</text>
				</view>
				<view style="display: flex; align-items: center; margin-top: 16rpx"  @click.stop="instance.proxy.copyText(receivedData.imei)">
					<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; margin-right: 10rpx; text-align: left">
						IMEI：{{receivedData.imei}}
					</text>
					<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<!-- gap:84rpx; -->
				<!-- <view style="position: relative;display: flex; align-items: center; margin-top: 20rpx;">
					<text class="text-1" style="position: absolute;right: 20rpx">采购员工：{{receivedData.cgyname}}</text>
					<text class="text-1" style="position: absolute;right: 296rpx">商品录入：{{receivedData.inputPerson}}</text>
				</view>

				<view style="display: flex; align-items: center; margin-top: 10rpx;">
					<text class="text-1" style="position: absolute;right: 20rpx">功能检测：{{receivedData.funcInputPerson}}</text>
					<text class="text-1" style="position: absolute;right: 296rpx">维修检测：{{receivedData.maintenanceInputPerson}}</text>
				</view> -->
				<view style="display: grid;grid-template-columns: 50% 50%; align-items: center; margin-top: 20rpx;">
					<text class="text-1" >采购员工：{{receivedData.cgyname}}</text>
					<text class="text-1" >商品录入：{{receivedData.inputPerson}}</text>
				</view>
				
				<view style="display: grid;grid-template-columns: 50% 50%; align-items: center; margin-top: 20rpx;">
					<text class="text-1" >功能检测：{{receivedData.funcInputPerson}}</text>
					<text class="text-1" >维修检测：{{receivedData.maintenanceInputPerson}}</text>
				</view>
				<view
					style="width: 670rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 20rpx 20rpx 20rpx; margin-top: 22rpx; margin-bottom: 22rpx"
					class="divile"
				></view>

				<text class="text-1" style="opacity: 0.7;color: #669CFD;">备注：{{titleRemarl}}</text>
			</view>
			
			<!-- 属性 -->
			<view class="suxing">
				<view v-for="(item, index) in modelData" :key="index" class="suxing-card">
					<text class="suxing-card1">{{item.title}}</text>
					<text class="suxing-card2">{{item.value}}</text>
				</view>
			</view>
			
			
			<view v-if="receivedData" class="edit-price">
				<view class="title">
					<text>定价金额</text>
				</view>
				<view class="content">
					<view style="display: flex; align-items: center">
						<image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill"></image>
						<input type="number" disabled placeholder="请输入批发金额" v-model="ListingPrice" />
					</view>
					<view style="display: flex; align-items: center">
						<image style="height: 28rpx; width: 28rpx" :src="specialPrice ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png'" mode="aspectFill"></image>
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #eb4636; text-align: left">特价</text>
					</view>
				</view>
				<view class="divile"></view>
			</view>

			<!-- 外观成色 -->
			<view v-if="receivedData" class="appearance-card" style="margin-left: 20rpx;">
				<view class="top" style="margin-bottom: 20rpx;">
					<text>外观成色</text>
				</view>
				<view class="bottom" style="display: flex;flex-direction: column;gap: 20rpx;width: 100%;">
					<view v-for="(item,index) in infos.combinationid" :key="index" style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
						<view style="display: flex;align-items: center;gap: 20rpx;width: 70%;">
							<text style="height: 34rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1f1f1f;">{{item}}</text>
							<text style="height: 34rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;margin-left: 20rpx;" :style="{color:infos.combinationyslist[index]}">{{infos.combinationname[index]}}</text>
						</view>
						<uv-album :urls="urls[index].imgs" maxCount='2' rowCount='2' multipleSize="48rpx" singleSize="48rpx" space="8rpx"></uv-album>
						<!-- <uv-album :urls="urls" maxCount='2' rowCount='2' multipleSize="48rpx" singleSize="48rpx" space="8rpx"></uv-album> -->
					</view>
				</view>
			</view>

			<!-- 机况 功能 维修 -->
			<!-- open -->
			<view v-if="receivedData" class="basic-container">
				<uni-collapse class="basic-collapse">
					<uni-collapse-item v-for="(item, index) in qualityinspection" :key="index"  titleBorder="none" :border="false" class="basic-collapse-item">
						<template v-slot:title>
							<uni-list :border="false">
								<uni-list-item>
									<template v-slot:header>
										<text class="co-header">{{item.name}}</text>
									</template>
									<template v-slot:footer>
										<text v-if="item.ycnum===0" style="color: #41AF6F;" class="co-foot">全部正常</text>
										<text v-else class="co-foot" style="color: #ED784B;">{{item.ycnum+'项异常'}}</text>
									</template>
								</uni-list-item>
							</uni-list>
						</template>
						<view class="divile" />
						<view class="content">
							<view class="card" v-for="(item1,index) in item.er" :key="index">
								<text class="left">{{item1.name}}</text>
								<!-- <text class="right" :style="{ color: item1.xznrcor === '' ? '#41AF6F' : item1.xznrcor }">{{ item1.value }}</text> -->
								<!-- <text class="right" :style="{ color: item1.xznrcor===''?'#41AF6F':item1.xznrcor }">{{item1.xznr}}</text> -->
								<view style="display: flex;align-items: center;gap: 4rpx;"  @click="preview(item1.id)">
									<image v-if="showImage(item1.id)" src="https://www.xzxskj.com/xcximg/icon_tupian@3x.png" style="height: 24rpx;width: 26rpx;" mode="aspectFill"></image>
									<text class="right" :style="{ color: item1.xznrcor===''?'#41AF6F':item1.xznrcor }">{{item1.xznr}}</text>
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			
			<!-- 拍照 -->
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
					
				
					<view  v-for="(item1, index1) in item.items" :key="index1"   class="custom-uploader" style="">
						<view v-if="item1.fileList.length>0">
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
									<!-- @click.stop="deleteImage(item1,index,index1,index2)" -->
							      <view style="position: absolute; height: 40rpx; width: 40rpx; top: 0; right: 0" >
							      <!--  <image style="height: 26rpx; width: 26rpx; border-radius: 50%" src="/pagesTakePhoto/static/icon_close@3x.png" mode="aspectFit"></image> -->
							      </view>
							    </view>
							  </view>
							</view>
						</view>
						<!-- @afterRead="(event) => takePhoto(event, item1)" 
							@oversize="handleOversize" -->
					  
					
				</view>
			</view>
		</scroll-view>
		<!-- <view v-if="receivedData" class="fill" style="height: 192rpx" />
		<view v-if="receivedData" class="select-btn">
			<view class="confim-btn button-animation" @click="confirm">
				<text>确认上架</text>
			</view>
		</view> -->
		
		<!-- <uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="pannelPopup" :safe-area="false" type="center" @close="handleClose" @change="pannelChange">
			<view >
				<listingProductPannel :receivedData="receivedData"  v-if="showPannel" @close="handleClose" ></listingProductPannel>
			</view>
		</uni-popup> -->
	</view>
</template>

<script setup>
import{ apiListingProductAdd } from '../api/api.js'
import { apiGetProductDetail } from '../api/api.js';
// import { listingProductPannel } from './components/listingProductPannel.vue'
// import { apiEditProductInfo } from '@/api/product/product.js';
import { formatTimestamp,navigateToPage } from '../../utils/common.js';
import { apiQualityCheckSerialSearch,apiQualityCheckInfo } from '@/api/qualityCheck/qualityCheck.js';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { scanCode } from '@/utils/common.js'
const instance = getCurrentInstance();
const modelData = ref([
    { type: 'gjbbname', title: '国家版本', value: '无' },
    { type: 'wlbbname', title: '网络版本', value: '无' },
    { type: 'bxzt', title: '保修状态', value: '无' },
    { type: 'efficiency', title: '电池效率', value: '无' },
]);

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
const scan = () => {
	const result = scanCode()
	if (result) {
		handleInput(result)
	}
};
const isShow = ref(false);
const searchModelKey = ref('ch')
const showModelField = ref('ch')
const handleInput = (inputText)=>{
	if (inputText.length>0) {
		apiQualityCheckSerialSearchData(inputText)
	}
}
// const beforeleave = (e) => {
// 	console.log('e:', e);
// 	isShow.value = false;
// 	uni.showModal({
// 		content: '退出质检流程再次质检根据串号搜索',
// 		showCancel: true,
// 		success: (res) => {
// 			if (!res.cancel) {
// 				// 用户点击了确认
// 				console.log('用户点击了确认');
// 				// uni.navigateBack({
// 				// 	delta: getCurrentPages().length - 1
// 				// });
// 				const res = navigateToPage('pagesCustomMine/customMine/customMine');
// 			}else{
// 				isShow.value = true;
// 			}
// 		}
// 	});
// };
const showPannel = ref(false)
const pannelPopup = ref(null)
const handleClose = () => {
	console.log('Popup is closed');
	pannelPopup.value.close();
};
const pannelChange = (e)=>{
	if(!e.show){
		showPannel.value = e.show
	}
}
const openPannle = ()=>{
	showPannel.value = true
	pannelPopup.value.open();
}
const titleRemarl = ref('')
const orgArray = ref([]);
const selectChange = (e) => {
	console.log('selectChange:', e);
	data.value.forEach((group) => {
		group.items.forEach((item) => {
			item.fileList = [];
		});
	});
	if (e) {
		console.log('selectChange e:', e);
		const { name,ch,machinetime,jkuidname,id,functionaltime,gnjcuidname,servicetime,serviceuidname,price,special,finenessname,csbz,jkbz,gnjcbz,wxjcbz,pzbz,cgyname,productimage} = e;
		receivedData.value = {
			spname: name,
			imei: ch,
			inputTime: formatTimestamp(machinetime),
			inputPerson: jkuidname,
			funcInputTime: formatTimestamp(functionaltime),
			funcInputPerson: gnjcuidname,
			maintenanceInputTime: formatTimestamp(servicetime),
			maintenanceInputPerson: serviceuidname,
			zjid: id,
			finenessname:finenessname,
			cgyname:cgyname
		};
		console.log('Received data:', receivedData.value);
		titleRemarl.value = jkbz + ' ' + gnjcbz + ' ' + wxjcbz + ' ' +pzbz+' '+csbz;
		ListingPrice.value = price
		specialPrice.value = special==1?true:false
		apiQualityCheckInfoData()
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
		console.log('data',data.value)
	}
};
const ListingPrice = ref();
const specialPrice = ref(false); // 是否为特价
const toggleSpecialPrice = () => {
	specialPrice.value = !specialPrice.value;
};
const urls = ref([
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
	// 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png'
]);

const infos = ref()
const yjinfos = ref()
const qualityinspection = ref([])

const confirm = ()=>{
	if(!ListingPrice.value){
		uni.showToast({
			title: '请输入定价金额',
			icon: 'none',
			duration: 2000,
		});
		return
	}
	receivedData.value.price = ListingPrice.value
	receivedData.value.sftj = specialPrice.value?1:0
	console.log('receivedData',receivedData.value)
	openPannle()
}
// const jswgimg = ref()
// const pmwgimg = ref()
// const yjxsimg = ref()
const apiQualityCheckSerialSearchData = async (ch) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		// res.lists = res.lists.filter(item => item.finenessname !== '');
		 // res.lists = res.lists.filter(item => item.productimage !== '');
		return orgArray.value = res.lists?res.lists:[];
	}
};
const jbztycbg = ref()
const gnjcycbg = ref()
const wxjcycbg = ref()
const zjbg = ref([])
const apiQualityCheckInfoData = async () => {
	const param = {
		id: receivedData.value.zjid
	};
	const res = await apiQualityCheckInfo(param);
	if (res.code === '200') {
		console.log('Quality check info:', res);
		infos.value = res.infos;
		let bxsj = new Date(infos.value.bxsj);
		jbztycbg.value = infos.value.jbztycbg ? JSON.parse(infos.value.jbztycbg) : [];
		gnjcycbg.value = infos.value.gnjcycbg ? JSON.parse(infos.value.gnjcycbg) : [];
		wxjcycbg.value = infos.value.wxjcycbg ? JSON.parse(infos.value.wxjcycbg) : [];
		zjbg.value = [
			...jbztycbg.value.map((item) => ({ id: item.id, url: item.url })),
		    ...gnjcycbg.value.map((item) => ({ id: item.id, url: item.url })),
		    ...wxjcycbg.value.map((item) => ({ id: item.id, url: item.url }))
		];
		
		// 获取当前日期的方法
		const getCurrentDate = () => {
			const now = new Date();
			now.setHours(0, 0, 0, 0);
			return now;
		};

		let currentDate = getCurrentDate(); 
		
		qualityinspection.value = res.infos.qualityinspection;
		qualityinspection.value.forEach(item => {
			item.er.forEach(item1 => {
				if (item1.name === '保修截止') {
					item1.xznr = infos.value.bxsj;
					item1.xznrcor = '';
					if (bxsj < currentDate) {
						item1.xznrcor = 'black';
					} else {
						item1.xznrcor = 'black';
					}
				}
			});
		});
		
		console.log('qualityinspection:', qualityinspection.value);
		yjinfos.value = res.yjinfos;
		infos.value.combinationid.push(yjinfos.value.qminfos);
		infos.value.combinationname.push(yjinfos.value.name);
		infos.value.combinationyslist.push(yjinfos.value.color);
		const yjxsimgs =  infos.value.yjxsimg.split(",");
		const jswgimgs =  infos.value.jswgimg.split(",");
		const pmwgimgs =  infos.value.pmwgimg.split(",");
		urls.value = [{
			imgs: jswgimgs
		},
		{
			imgs: pmwgimgs
		},
		{
			imgs: yjxsimgs
		}]
		
		modelData.value = modelData.value.map(item => ({
		    ...item,
		    value: res.infos[item.type] || '无'
		}));
		
		console.log('urls:', urls.value[0].imgs);
	}
};
const showImage = (id) => {
  const foundItem = zjbg.value.find((item) => item.id === id);
  if (foundItem) {
    return true;
  }
  return false;
};
const preview = (id)=>{
	zjbg.value.forEach((item,index)=>{
		if(item.id === id){
			uni.previewImage({
				current: index,
				urls: zjbg.value.map((item) => item.url)
			});
		}
	})
}
const receivedData = ref(null);
uni.$on('listingProductRefresh',()=>{
	receivedData.value = null
	orgArray.value = [];

})
onLoad((options) => {
	if (options.data) {
		try {
			isShow.value = true;
			receivedData.value = JSON.parse(decodeURIComponent(options.data));
			titleRemarl.value = receivedData.value.jkbz + ' ' + receivedData.value.gnjcbz + ' ' + receivedData.value.wxjcbz + ' ' +receivedData.value.pzbz+' '+receivedData.value.csbz;
			console.log('Received data:', receivedData.value);
			apiQualityCheckInfoData()
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
	
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.qualityReport-layout {
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
	.edit-price {
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		height: 202rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		.title {
			margin-bottom: 36rpx;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1f1f1f;
			}
		}
		.content {
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image {
				// border: 1rpx solid red;
				margin-right: 20rpx;
				height: 50rpx;
				width: 22rpx;
			}
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				opacity: 0.6;
			}
		}
		.divile {
			width: 630rpx;
			height: 2rpx;
			background: #eeeeee;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
		}
	}
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	opacity: 0.6;
}
	.appearance-card {
		
		// width: 670rpx;
		width: 710rpx;
		// height: 274rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); 
		margin-top: 20rpx;
		padding: 24rpx 24rpx;
		.top {
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 24rpx;
				color: #1f1f1f;
			}
		}
		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bottom-l {
				// border: 2rpx solid red;
				width: 100%;
				.bottom-l-1 {
					margin-top: 15rpx;
					margin-bottom: 20rpx;
					.text-1 {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
					.text-2 {
						width: 96rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #ed784b;
						margin-left: 20rpx;
					}
				}
				.bottom-l-2 {
					margin-bottom: 20rpx;
					.text-1 {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
					.text-2 {
						width: 96rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #ed784b;
						margin-left: 20rpx;
					}
				}
				.bottom-l-3 {
					.text-1 {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
					.text-2 {
						width: 96rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #ed784b;
						margin-left: 20rpx;
					}
				}
			}

			.bottom-r {
				width: 50%;
				display: flex;
				justify-content: flex-end;
				.bottom-r-images {
					border: 2rpx solid red;
					width: 106rpx;
					height: 106rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					// .top {
					// 	display: flex;
					// 	margin-bottom: 10rpx;
					// 	.images1 {
					// 		height: 48rpx;
					// 		height: 48rpx;
					// 		margin-right: 10rpx;
					// 	}
					// 	.images2 {
					// 		height: 48rpx;
					// 		height: 48rpx;
					// 	}
					// }
					// .bottom {
					// 	display: flex;
					// 	.images1 {
					// 		height: 48rpx;
					// 		height: 48rpx;
					// 		margin-right: 10rpx;
					// 	}
					// 	.images2 {
					// 		height: 48rpx;
					// 		height: 48rpx;
					// 	}
					// }
				}
			}
		}
	}

// .appearance-card {
// 	margin-left: 20rpx;
// 	// width: 670rpx;
// 	width: 710rpx;
// 	// height: 274rpx;
// 	background: #ffffff;
// 	border-radius: 20rpx 20rpx 20rpx 20rpx;
// 	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
// 	margin-top: 20rpx;
// 	padding: 24rpx 24rpx;
// 	.top {
// 		text {
// 			height: 34rpx;
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: bold;
// 			font-size: 24rpx;
// 			color: #1f1f1f;
// 		}
// 	}
// 	.bottom {
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		.bottom-l {
// 			// border: 2rpx solid red;
// 			width: 50%;
// 			.bottom-l-1 {
// 				margin-top: 15rpx;
// 				margin-bottom: 20rpx;
// 				.text-1 {
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #1f1f1f;
// 				}
// 				.text-2 {
// 					width: 96rpx;
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #ed784b;
// 					margin-left: 20rpx;
// 				}
// 			}
// 			.bottom-l-2 {
// 				margin-bottom: 20rpx;
// 				.text-1 {
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #1f1f1f;
// 				}
// 				.text-2 {
// 					width: 96rpx;
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #ed784b;
// 					margin-left: 20rpx;
// 				}
// 			}
// 			.bottom-l-3 {
// 				.text-1 {
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #1f1f1f;
// 				}
// 				.text-2 {
// 					width: 96rpx;
// 					height: 34rpx;
// 					font-family: PingFang SC, PingFang SC;
// 					font-weight: 400;
// 					font-size: 24rpx;
// 					color: #ed784b;
// 					margin-left: 20rpx;
// 				}
// 			}
// 		}

// 		.bottom-r {
// 			width: 50%;
// 			display: flex;
// 			justify-content: flex-end;
// 			.bottom-r-images {
// 				border: 2rpx solid red;
// 				width: 106rpx;
// 				height: 106rpx;
// 				display: flex;
// 				flex-direction: column;
// 				justify-content: center;
// 			}
// 		}
// 	}
// }

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
		width: 690rpx;
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
.basic-container {
	box-sizing: border-box;
	margin-left: 20rpx;
	margin-top: 20rpx;
	width: 710rpx;
	background: transparent;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	.basic-collapse {
		background-color: #ffffff;

		.co-header {
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 24rpx;
			color: #1f1f1f;
		}
		.co-foot {
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 24rpx;
			color: #ed784b;
		}
		.divile {
			width: 710rpx;
			height: 2rpx;
			background: #eeeeee;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
		}
		.content {
			padding: 20rpx 24rpx 3rpx 24rpx;
			.card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 24rpx;
				.left {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
					line-height: 30rpx;
				}
				.right {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					// color: #41AF6F;
				}
			}
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
.suxing {
	margin-left: 20rpx;
	margin-top: 20rpx;
	// width: 690rpx;
	width: 710rpx;
	height: 122rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	border-radius: 20rpx 20rpx 20rpx 20rpx;

	display: flex;
	justify-content: space-between;
	align-items: center;
	.suxing-card {
		width: 142rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-right: 2rpx solid #eeeeee;
		.suxing-card1 {
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #1F1F1F;
			opacity: 0.4;
		}
		.suxing-card2 {
		
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #1F1F1F;
		}
	}
	.suxing-card:last-child{border: none;}
}
</style>
