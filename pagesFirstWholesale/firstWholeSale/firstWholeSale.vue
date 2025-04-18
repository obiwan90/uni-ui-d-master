<template>
	<view class="firstWholeSale">
		<!-- header -->
		<custom-header :backgroundColor="'#f3f2f6'">
			<template #name>快速批发</template>
			<template #fill>快速批发</template>
		</custom-header>

		<!-- 搜索栏 -->
		<view class="search-fill" style="height: 90rpx; background: #f3f2f6; width: 100%">
			<view class="search">
				<view class="searchBar">
					<view class="search-content">
						<image style="height: 30rpx; width: 30rpx" class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
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
						<image style="width: 30rpx; height: 30rpx" src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFit"  @click="scan"></image>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y style="height: 1100rpx;width: 100%;">
			<van-empty v-if="cardData.length == 0" description="请搜索相关商品进行批发">
				<template #image>
					<view style="width: 750rpx; height: 500rpx; display: flex; align-items: center; justify-content: center">
						<view style="display: flex; flex-direction: column; gap: 28rpx; align-items: center">
							<image src="https://www.xzxskj.com/xcximg/icon_pifa@3x.png" mode="widthFix" style="width: 120rpx; height: 146rpx"></image>
							<text style="opacity: 0.4; font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f">请搜索相关商品进行批发</text>
						</view>
					</view>
				</template>
			</van-empty>
			<!-- card -->
			<view
				v-if="cardData.length > 0"
				v-for="(item, index) in cardData"
				:key="index"
				style="margin-top: 20rpx; display: flex; align-items: center; background: #ffffff; border-radius: 20rpx; width: 710rpx; margin-left: 20rpx">
				<van-swipe-cell right-width="41">
					<view style="display: flex; width: 710rpx; justify-content: space-between; align-items: center; padding: 20rpx">
						<van-image width="95" height="95" fit="fill" radius="18rpx" :src="item.cover">
							<template v-slot:error>加载失败</template>
							<van-loading slot="loading" type="spinner" size="20" vertical />
						</van-image>
						<view style="flex: 1; margin-left: 20rpx; height: 190rpx; display: flex; flex-direction: column; justify-content: space-between">
							<view style="display: flex; flex-direction: column">
								<view>
									<van-tag class="tag-class" v-if="item.finenessname" size="medium" color="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)">
										{{ item.finenessname }}
									</van-tag>
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; line-height: 40rpx; text-align: left">
										<!-- 华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通） -->
										{{ item.name }}
									</text>
								</view>
			
								<view style="display: flex; align-items: center; margin-top: 4rpx" @click.stop="instance.proxy.copyText(item.ch)">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">
										<!-- IMEI：FA5445645156451 -->
										IMEI：{{ item.ch }}
									</text>
									<image style="height: 20rpx; width: 20rpx; margin-left: 10rpx" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
			
								<view style="display: flex; align-items: center; margin-top: 4rpx">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-right: 40rpx">
										采购：{{ item.cgyname }}
										<!-- 采购：{{item.}} -->
									</text>
									<view style="display: flex; justify-content: center; align-items: center">
										<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">
											仓库：{{ item.ckname }}
										</text>
										<view
											style="
												margin-left: 10rpx;
												display: flex;
												justify-content: center;
												align-items: center;
												padding: 0 8rpx;
												background: #ffeeec;
												border-radius: 8rpx;
											"
										>
											<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #eb4636">10天</text>
										</view>
									</view>
								</view>
							</view>
			
							<view style="display: flex; align-items: center">
								<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">
									批发价:
								</text>
								<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">
									￥{{ item.price }}
								</text>
							</view>
						</view>
					</view>
					<view class="van-swipe-cell__right" slot="right">
						<view class="left" @click="deleteCard(index)">
							<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #ffffff; text-align: center">删除</text>
						</view>
					</view>
				</van-swipe-cell>
			</view>
			<view
				v-if="cardData.length > 0"
				style="
					width: 710rpx;
					background: #ffffff;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					flex-direction: column;
					padding: 20rpx;
					margin-left: 20rpx;
					margin-top: 20rpx;">
				<view style="display: flex; align-items: center; justify-content: space-between">
					<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left">客户</text>
					<view style="display: flex; align-items: center; justify-content: center" @click="openSelectCustomerPannel">
						<text style="opacity: 0.7; font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 30rpx; color: #1f1f1f; text-align: right">
							{{ selectedCustomer ? selectedCustomer.name : '请搜索或选择客户' }}
						</text>
						<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
					</view>
				</view>
			
				<textarea
					v-model="areaValue"
					placeholder="请输入备注...."
					style="box-sizing: border-box; padding: 20rpx; margin-top: 22rpx; width: 670rpx; height: 170rpx; background: #f3f2f6; border-radius: 20rpx 20rpx 20rpx 20rpx"
				></textarea>
			</view>
			
			<view
				v-if="cardData.length > 0"
				style="
					width: 710rpx;
					height: 100rpx;
					background: #ffffff;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;
					margin-left: 20rpx;
					margin-top: 20rpx;">
				<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left">销售员工</text>
				<view style="display: flex; align-items: center">
					<picker :range="positionArray" range-key="username" @change="onSelectChange" mode="selector" :value="pickerMemberValue">
						<input class="workerInput" type="text" placeholder="请选择" disabled v-model="ygUserName" />
					</picker>
					<picker :range="positionArray" range-key="username" @change="onSelectChange" mode="selector" :value="pickerMemberValue">
						<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
					</picker>
				</view>
			</view>
			
			<!-- <view v-if="cardData.length > 0" style="height: 258rpx" /> -->
			
			
		</scroll-view>
		
		
		<!-- btn -->
		<view v-if="cardData.length > 0" class="bottom-btn">
			<view class="top">
				<view class="left">
					<view class="text-1">
						<text class="text-class-1">数量:</text>
						<text class="text-class-2">{{ cardData.length }}</text>
						<text class="text-class-1">台</text>
					</view>

					<view class="text-1">
						<text class="text-class-1">合计:</text>
						<text class="text-class-2">￥{{ totalPrice }}</text>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="left-btn button-animation" @click="apiFinancePlaceOrderData('/Home/Orderxhhk/add?lx=2','2')">
					<text>线下收款</text>
				</view>
				<view class="right-btn button-animation" @click="apiFinancePlaceOrderData('/Home/Orderxhhk/add?lx=1','1')">
					<text>先货后款</text>
				</view>
			</view>
		</view>

		<uni-popup
			background-color="rgba(0,0,0,0)"
			:is-mask-click="true"
			ref="selectCustomerPannelPopup"
			:safe-area="false"
			type="bottom"
			@close="handleClose"
			@change="pannelChange">
			<view>
				<selectCustomerPannel v-if="showSelectCustomerPannel" @close="handleClose"></selectCustomerPannel>
			</view>
		</uni-popup>
	</view>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="offlinePaymentPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
		<offlinePaymentPannel :ddid='ddid' :ddxx="ddxx" :totalPrice="totalPrice" v-if="showOfflinePaymentPannel" @close="handleClose" @reload="reloadList"></offlinePaymentPannel>
	</uni-popup>
</template>

<script setup>
import { offlinePaymentPannel } from './components/offlinePaymentPannel.vue';
import { apiFinanceChCheck, apiFinancePlaceOrder } from '../api/api.js';
import { apiGetProductDetail } from '../api/api.js';
import { apiFinanceOrderList } from '../api/api.js';
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { selectCustomerPannel } from './components/selectCustomerPannel.vue';
import { scanCode } from '@/utils/common.js'
import { debounce } from '@/utils/debounce.js';
const instance = getCurrentInstance();
const offlinePaymentPopup = ref(null)
const showOfflinePaymentPannel = ref(false)
const ddxx = ref()
const ddid = ref('')
const reloadList =async (data)=>{
	const paran = {
		opid: uni.getStorageSync('sessionInfo').opid,
		goodsid: getIdsString(),
		khid: selectedCustomer.value.id, //客户id
		remarks: areaValue.value,
		ygid: pickerMemberValue.value.id, //员工id
		lx: '2', //1先货后款制单未付款2先货后款制单并收款
		// zffs: '6', //支付方式1微信2支付宝3收款码4银行卡5现金6其它
		// imgs: ''
		zffs:data.zffs,
		imgs:data.imgs,
		price:data.price,
		skremarks:data.skremarks,
		ddid:data.ddid
	};
	// const res = await apiFinancePlaceOrder('/Home/Orderxhhk/add?lx=2',paran);
	await debouncedApiFinancePlaceOrder('/Home/Orderxhhk/add?lx=2',paran)
	// console.log('apiFinancePlaceOrderData res:', res);
	// if (res.code === '200') {
	// 	uni.showToast({
	// 		title: '下单成功',
	// 		icon: 'success',
	// 		duration: 2000
	// 	});
	// 	cardData.value = [];
	// }
	// offlinePaymentPopup.value.close()
}
const openOfflinePayment = ()=>{
	showOfflinePaymentPannel.value = true
	getDdxx()
	offlinePaymentPopup.value.open()
}

function getDdxx() {
  console.log('cardData',cardData.value)
  // console.log('selectedItems',selectedItems)
  // const result = [];
  // const selectedGsids = selectedItems.map(item => item.id);
  // for (const order of orderList.value) {
  //   const { id, goodsinfos } = order;
  //   const goodsids = goodsinfos.filter(info => selectedGsids.includes(info.id)).map(info => info.id);
  //   if (goodsids.length > 0) {
  //     result.push({
  //       orderid: id,
  //       goodsid: goodsids.join(',')
  //     });
  //   }
  // }
  // return result;
}
const searchModelKey = ref('ch')
const showModelField = ref('ch')
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
const cardData = ref([]);
const selectedCustomer = ref();
const totalPrice = computed(() => {
	return cardData.value.reduce((total, item) => {
		return total + parseFloat(item.price) || 0; // 防止price为null
	}, 0);
});

const areaValue = ref('');
const showSelectCustomerPannel = ref(false);
const selectCustomerPannelPopup = ref(null);
const handleClose = () => {
	console.log('Popup is closed');
	offlinePaymentPopup.value.close();
	selectCustomerPannelPopup.value.close();
};
const pannelChange = (e) => {
	if (!e.show) {
		showOfflinePaymentPannel.value = e.show
		showSelectCustomerPannel.value = e.show;
	}
};
const openSelectCustomerPannel = () => {
	showSelectCustomerPannel.value = true;
	selectCustomerPannelPopup.value.open();
};

const pickerMemberValue = ref();
const positionArray = ref([]);
const ygUserName = ref('');
const onSelectChange = (e) => {
	console.log('选择 e:', e);
	pickerMemberValue.value = positionArray.value[e.detail.value];
	ygUserName.value = positionArray.value[e.detail.value].username;
};
const inputText = ref('');
const orgArray = ref([]);
const handleInput = (inputText) => {
	console.log('输入框内容:', inputText);
	if (inputText.length > 0) {
		apiFinanceChCheckData(inputText);
	}
};
const selectChange = (e) => {
	console.log('模糊搜索 e', e);
	if (e) {
		// cardData.value = [];
		cardData.value.push(e);
		orgArray.value = []
		ddid.value = ''
	}
};
const apiGetProductDetailData = async (id) => {
	const data = {
		id: id
	};
	const res = await apiGetProductDetail(data);
	console.log('apiGetProductDetailData res:', res);
	if (res.code === '200') {
		cardData.value.push(res.infos);
	}
};

const getFinanceOrderList = async (goodsId, lx) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		orderid: goodsId,
		lx: lx
	};
	const res = await apiFinanceOrderList(data);
	console.log('getFinanceOrderList res:', res);
};
const yglist = ref([]);
const apiFinanceChCheckData = async (ch) => {
	const data = {
		ch: ch,
		opid: uni.getStorageSync('sessionInfo').opid
	};
	const res = await apiFinanceChCheck(data);
	if (res.code === 200) {
		orgArray.value = res.lists;
		yglist.value = res.yglist;
		if(yglist.value){
			const adminId = uni.getStorageSync('adminId');
			pickerMemberValue.value = yglist.value.find(yg=>yg.id === adminId)
			ygUserName.value = yglist.value.find(yg=>yg.id === adminId).username
		}
		positionArray.value = res.yglist;
	} else {
		orgArray.value = [];
	}
	console.log('apiFinanceChCheckData res:', res);
};

const apiFinancePlaceOrderData = async (url,lx) => {
	if (!selectedCustomer.value) {
		uni.showToast({
			title: '请选择客户',
			icon: 'none',
			duration: 2000
		});
		return;
	}
	if (!pickerMemberValue.value) {
		uni.showToast({
			title: '请选择销售员工',
			icon: 'none',
			duration: 2000
		});
		return;
	}

	// 显示确认对话框
	uni.showModal({
		title: lx==='1'?'先货后款确认下单':'线下收款',
		content: '您确定要下单吗？',
		success: async (res) => {
			if (res.confirm) {
				if(lx==='1'){
					const data = {
						opid: uni.getStorageSync('sessionInfo').opid,
						goodsid: getIdsString(),
						khid: selectedCustomer.value.id, //客户id
						remarks: areaValue.value,
						ygid: pickerMemberValue.value.id, //员工id
						lx: lx, //1先货后款制单未付款2先货后款制单并收款
						zffs: '6', //支付方式1微信2支付宝3收款码4银行卡5现金6其它
						imgs: '',
						ddid:ddid.value
					};
					
					// const res =await debouncedApiFinancePlaceOrder(url,data)
					await debouncedApiFinancePlaceOrder(url,data)
					// const res = await apiFinancePlaceOrder(url,data);
					// console.log('apiFinancePlaceOrderData res:', res);
					// if (res.code === '200') {
					// 	uni.showToast({
					// 		title: '下单成功',
					// 		icon: 'success',
					// 		duration: 2000
					// 	});
					// 	cardData.value = [];
					// }
				}else{
					openOfflinePayment()
					
					
					
				}
				
			} else if (res.cancel) {
				uni.showToast({
					title: '已取消下单',
					icon: 'none',
					duration: 2000
				});
			}
		}
	});
};

// const debouncedApiFinancePlaceOrder = debounce(apiFinancePlaceOrderAc, 400,false); 

const debouncedApiFinancePlaceOrder = debounce(async(url,paran) => {
	const res = await apiFinancePlaceOrder(url,paran)
	console.log('res',res)
	if (res.code === '200') {
		uni.showToast({
			title: '下单成功',
			icon: 'success',
			duration: 2000
		});
		cardData.value = [];
	}else{
		uni.showToast({
			title: res.msg?res.msg:'操作失败',
			icon: 'error',
			duration: 2000
		});
	}
	offlinePaymentPopup.value.close()
}, 400,true);

const apiFinancePlaceOrderAc = async(url,paran)=>{
	const res = await apiFinancePlaceOrder(url,paran)
	console.log('res',res)
	if (res.code === '200') {
		uni.showToast({
			title: '下单成功',
			icon: 'success',
			duration: 2000
		});
		cardData.value = [];
	}
	offlinePaymentPopup.value.close()
}
const getIdsString = () => {
	return cardData.value.map((item) => item.id).join(',');
};
const processSettlementItem = async (item) => {
  const { ch } = item.goodsinfos;
  const res = await apiFinanceChCheck({ ch:ch, opid: uni.getStorageSync('sessionInfo').opid });
  if (res.code === 200 && res.yglist.length > 0) {
    positionArray.value.push(...res.yglist.filter((item1) => !positionArray.value.some((item2) => item1.id === item2.id)));
	yglist.value = res.yglist;
	if(yglist.value){
		const adminId = uni.getStorageSync('adminId');
		pickerMemberValue.value = yglist.value.find(yg=>yg.id === adminId)
		ygUserName.value = yglist.value.find(yg=>yg.id === adminId).username
	}
  }
  cardData.value.push(item.goodsinfos);
};

const deleteCard = (index)=>{
	cardData.value.splice(index, 1);
}

onLoad(async(options) => {
	const data = {
		id:'',
		name:''
	}
	if (options.settlementList && options.lx) {
		const settlementList = JSON.parse(decodeURIComponent(options.settlementList));
		console.log('options.settlementList:', settlementList);
		console.log('options.lx:', options.lx);
		// settlementList.forEach((item) => {
		// 	await processSettlementItem(item);
		// });
		settlementList.forEach(processSettlementItem);
	}
	if(options.data){
		cardData.value.push( JSON.parse(decodeURIComponent(options.data)))
		console.log('cardData', cardData.value)
		apiFinanceChCheckData(JSON.parse(decodeURIComponent(options.data)).ch)
	}
	if (options.chs) {
		const arraysCh = options.chs.split(',');
		for (const ch of arraysCh) { 
			if(ch){
				await apiFinanceChCheckData(ch);
				console.log('orgArray.value', orgArray.value);
				if (orgArray.value.length > 0) {
					cardData.value.push(orgArray.value[0]);
					orgArray.value = [];
				}
			}
		}
	}
	if(options.khid&&options.khNames&&options.ddid){
		const khids = options.khid.split(',');
		for (const khid of khids) {
			if(khid){
				data.id = khid
			}
		}
		const kuname = options.khNames.split(',')[0]
		data.name = kuname
		selectedCustomer.value = data
		ddid.value = options.ddid
	}
});



uni.$on('selectedCustomer', (data) => {
	console.log('selectedCustomer', data);
	selectedCustomer.value = data;
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.firstWholeSale {
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
.van-swipe-cell__right {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 41px;
	.left {
		height: 100%;
		width: 41px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 0 20rpx 20rpx 0;
		text {
			width: 56rpx;
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #ffffff;
			text-align: center;
		}
	}
}
.workerInput {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 30rpx;
	color: #1f1f1f;
	text-align: right;
	margin-right: 10rpx;
}
</style>
