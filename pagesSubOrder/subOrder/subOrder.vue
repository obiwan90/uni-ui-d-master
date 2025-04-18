<template>
	<scroll-view :scroll-y="!showPannel" style="height: calc(100vh - 180rpx); background-color: #f3f3f3">
		<view class="layout pageBg">
			<!-- header -->
			<custom-header>
				<template #name>提交订单</template>
				<template #fill>提交订单</template>
			</custom-header>
			<!-- 地址卡(默认) -->
			<view class="address-card-box" v-if="addressList.length>0">
				<view class="top" @click="goPage('/pagesAddress/address/address?from='+'subOrder')">
					<view class="top-l">
						<view class="tap1">
							<view class="tap" v-if="addressList[0].zt==='1'">
								<text>默认</text>
							</view>
							<text>{{addressList[0].province}}{{addressList[0].city}}{{addressList[0].area}}</text>
						</view>
						<view class="tap2">
							<text>{{addressList[0].address}}</text>
						</view>
						<view class="tap3">
							<text>{{addressList[0].name}} {{addressList[0].phone}}</text>
						</view>
					</view>
					<view class="top-r" >
						<image src="https://www.xzxskj.com/xcximg/icon_next2@3x.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="bottom">
					<view v-for="(item, index) in express" :key="index" 
					class="tap-card" 
					:class="{ 'selected': selectedTap === index }"
					@click="selectTap(index)">
						<image :src="item.image" mode="aspectFit"></image>
						<text>{{item.value}}</text>
						<image 
						  class="selectedImage"
						  v-if="selectedTap === index"
						  src="https://www.xzxskj.com/xcximg/icon_xuanzhong@3x.png"
						  mode="aspectFill"
						></image>
					</view>
				</view>
			</view>

			<!-- 地址卡（add） -->
			<view v-else class="address-card-box">
				<view class="top1" @click="goPage('/pagesAddress/address/address?from='+'subOrder')">
					<image src="https://www.xzxskj.com/xcximg/icon_add@3x.png" mode="aspectFill"></image>
					<text>添加收货地址</text>
				</view>
				<view class="bottom">
					<view v-for="(item, index) in express" :key="index" 
					class="tap-card" 
					:class="{ 'selected': selectedTap === index }"
					@click="selectTap(index)">
						<image :src="item.image" mode="aspectFit"></image>
						<text>{{item.value}}</text>
						<image 
						  class="selectedImage"
						  v-if="selectedTap === index"
						  src="https://www.xzxskj.com/xcximg/icon_xuanzhong@3x.png"
						  mode="aspectFill"
						></image>
					</view>
				</view>
			</view>

			<!-- 产品信息 -->
			<view v-for="(item, index) in groupByShopId(settlementList)" :key="index" class="product-card-list" v-if="settlementList.length>0">
				<view v-for="(item1,index1) in item.goodinfos" :key="index1" class="product-card">
					<view class="product-card-l">
						<van-image width="190rpx" height="190rpx" radius="18rpx" :src="item1.cover" fit="fill">
						  <template v-slot:error>加载失败</template>
						</van-image>
					</view>
					<view class="product-card-r">
						<view class="top">
							<view class="top-tap" v-if="item1.finenessname">
								<text class="top-tap-text">{{item1.finenessname}}</text>
							</view>
							<view style="{clear:both}">
								
							</view>
							<text class="top-text">{{item1.name}}</text>
						</view>
						<view class="mid">
							<view class="version-tap">
								<text>
								{{item1.gjbbname}}|
								{{item1.wlbbname}}|
								{{item1.gjbbname}}|
								电池{{item1.efficiency}}%|
								{{item1.delivery}}发货</text>
							</view>
							
						</view>
						
						<view class="bottom">
							<view class="bottom-l">
								<text class="bottom1">批发价:</text>
								<text class="bottom2">￥{{item1.price}}</text>
								<text class="bottom3">/台</text>
							</view>
							<!-- <view class="bottom-r">
								<text>运费：￥{{getYf(item1.shopid)}}</text>
							</view> -->
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: flex-end;align-items: center;gap: 20rpx;height: 28rpx;">
					<van-tag size="mini" plain text-color="#669CFD" v-if="item.byzt === 1">京东包邮</van-tag>
					<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 22rpx;color: #1f1f1f;vertical-align: bottom;">运费：￥{{getYf(item.shopid)}}</text>
				</view>
			</view>

			<!-- paice-card -->
			<view class="price-card" v-if="settlementList">
				<view class="top">
					<view class="top1">
						<text class="text-1">商品金额</text>
						<text class="text-2">¥{{totalPrice}}</text>
					</view>
					<view class="top2">
						<view class="left" @click="openRule">
							<text>运费</text>
							<image src="https://www.xzxskj.com/xcximg/icon_tishi@3x.png" mode="aspectFill"></image>
						</view>
						<view class="right">
							<text>¥{{getTotalYf()}}</text>
						</view>
					</view>
				</view>
				<view class="mid"></view>
				<view class="bottom">
					<view class="left">
						<text>商品数量：{{totalNum}}</text>
					</view>
					<view class="right">
						<text class="right1">合计：</text>
						<text class="right2">￥{{selectedItemsTotalPrice()}}</text>
					</view>
				</view>
			</view>

			<view class="pay-card">
				<text class="left">支付方式</text>
				<view class="right" @click="openPay">
					<!-- <image class="image1" src="/pagesSubOrder/static/images/icon/icon_zhifubao@3x.png" mode="aspectFill"></image> -->
					<image class="image1" :src="selectedPay?selectedPay.image:'https://www.xzxskj.com/xcximg/icon_weixin@3x.png'" mode="aspectFill"></image>
					<text>{{selectedPay?selectedPay.text:'微信支付'}}</text>
					<image class="image2" src="https://www.xzxskj.com/xcximg/icon_next2@3x.png" mode="aspectFill"></image>
				</view>
			</view>

			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="payPopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
				<view >
					<payPannel :show="fpbkShow" :settlementList="settlementList" @close="handleClose" @payType="handleConfirm"></payPannel>
				</view>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="rulePopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
				<view >
					<rulePannel @close="handleClose" ></rulePannel>
				</view>
			</uni-popup>

			<!-- 备注 -->
			<view class="remark">
				<text>买家备注</text>
				<textarea v-model="cusRemark" class="bottom" fixed placeholder="请输入备注信息~"></textarea>
				<!-- <input class="cus-input" type="text" placeholder="请输入备注信息~" /> -->
			</view>
		</view>
	</scroll-view>
	<!-- tabbar-bar -->
	<view class="order-tabbar">
		<view class="order-tabbar-l">
			<view class="text-1">
				<text >{{lxType==='1'?'议价:':'合计:'}}</text>
				<!-- <text >合计:</text> -->
			</view>
			<view class="text-2">
				<text >￥{{lxType==='1'?selectedItemsYjTotalPrice():selectedItemsTotalPrice()}}</text>
			</view>
		</view>
		<view v-if="lxType==='2'" class="order-tabbar-r" @click="submitorder">
			<view class="btn">
				<text>确认付款</text>
			</view>
		</view>
		
		<view  v-if="lxType==='1'" class="order-tabbar-r" @click="bargainingSubmit">
			<view class="btn">
				<text>确认付款</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiGetWxPay,apiBargainingWxPay,apiGetJdFreight,apiGetSfFreight } from '../api/api.js';		
import { apiSettleShopCard } from '@/api/shopCard/shopCard.js';		
import { apiSubmitorder } from '@/api/subOrder/subOrder.js';	
import { apigetAddress } from '@/api/address/address.js';
import { payPannel } from './components/payPannel.vue'
import { rulePannel } from './components/rulePannel.vue'
import { computed, onMounted } from 'vue';
import { apiBargainingSubmit } from '../api/api.js';	
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
const permissionStore = usePermissionStore();
const fpbkShow = ref(false)
const bargainingTimeId = ref()
const bargainingPrice = ref()
const settlementList = ref([])
const cusRemark = ref()
const parameter = ref()
const totalNum = ref()
const totalPrice = ref()
const showPannel = ref(false);
const lxType = ref()
const yjGoodsId = ref()
const express = ref([
	{image:'https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png',value:'顺丰',expressId:'2'},
	{image:'https://www.xzxskj.com/xcximg/icon_jingdong@3x.png',value:'京东',expressId:'1'},
	{image:'https://www.xzxskj.com/xcximg/icon_songhuo@3x.png',value:'送货上门',expressId:'3'},
	{image:'https://www.xzxskj.com/xcximg/icon_ziti@3x.png',value:'自提',expressId:'4'},
])
const selectedTap = ref(0);
const selectTap =async (index) => {
  selectedTap.value = index;
  if(express.value[index].value==='顺丰'){
	 await apiGetSfFreightAction()
  }
  if(express.value[index].value==='京东'){
  	 await apiGetJdFreightData()
  }
  if(express.value[index].value==='送货上门'){
  	yflist.value = []
  }
  if(express.value[index].value==='自提'){
  	yflist.value = []
  }
};
const payPopup = ref(null)
const rulePopup = ref(null)

const handleClose = () => {
    console.log('Popup is closed');
	payPopup.value.close();
	rulePopup.value.close();
};
const change = (e)=>{
	showPannel.value = e.show;
}
const openPay = ()=>{
	permissionStore.loadMenuAuthority();
	const adminId = uni.getStorageSync('adminId');
	if(permissionStore.hasMenuAuthority('fastWholesale')&&adminId!==''){
		fpbkShow.value = true
	}
	console.log('fpbkShow',fpbkShow.value)
	console.log('settlementList',settlementList.value)
	payPopup.value.open();
}

const openRule = ()=>{
	rulePopup.value.open();
}
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const getWxPay =async()=>{
	const data = {
	  id:'',
	  opid: uni.getStorageSync('sessionInfo').opid
	}
	  const res = await apiGetWxPay(data);
	console.log(e);
}
const out_trade_no = ref('')
//议价订单提交
const bargainingSubmit = async ()=>{
	const data = {
		 opid: uni.getStorageSync('sessionInfo').opid,
		 goodsid:yjGoodsId.value,
		 price:bargainingPrice.value,
		 payment:'1',
		 bargainingtimeid:bargainingTimeId.value,
		 addressid:addressList.value[0].id,
		 expressid: express.value[selectedTap.value].expressId,
		 remarks:cusRemark.value?cusRemark.value:'',
	}
	//议价订单提交
	const res = await apiBargainingSubmit(data);
	if(res.code===200){
		//获取支付参数
		const data = {
		  // lx:'2',
		  id:res.id,
		  opid: uni.getStorageSync('sessionInfo').opid
		}
		const res1 = await apiBargainingWxPay(data);
		// const res1 = await apiGetWxPay(data);
		console.log("wx支付参数:",res1);
		const orderInfo = {
			"nonceStr":res1.nonceStr,
			"package":res1.package,
			"paySign":res1.paySign,
			"timeStamp":res1.timeStamp,
			"signType":res1.signType,
		}
		out_trade_no.value = res1.out_trade_no
		autoPay(orderInfo)
	}
}


const submitorder = async()=>{
	const data = {
	  shoppingcartid: shoppingcartids.value,
	  addressid:addressList.value[0].id,
	  expressid:express.value[selectedTap.value].expressId,
	  price:totalPrice.value,
	  num:totalNum.value,
	  payment:'1',
	  remarks:cusRemark.value?cusRemark.value:'',
	  parameter:parameter.value,
	  opid: uni.getStorageSync('sessionInfo').opid,
	  zyf:getTotalYf(),
	  gysyf:JSON.stringify(yflist.value.map(item => ({
	      companyId: item.companyId,
	      yf: item.price
	    })))
	  
	}
	//订单提交
	const res = await apiSubmitorder(data);
	if(res.code===200){
		//获取支付参数
		const data = {
		  // lx:'1',
		  id:res.id,
		  opid: uni.getStorageSync('sessionInfo').opid
		}
		const res1 = await apiGetWxPay(data);
		console.log("wx支付参数:",res1);
		const orderInfo = {
			"nonceStr":res1.nonceStr,
			"package":res1.package,
			"paySign":res1.paySign,
			"timeStamp":res1.timeStamp,
			"signType":res1.signType,
		}
		out_trade_no.value = res1.out_trade_no
		autoPay(orderInfo)
	}
}
const autoPay = (orderInfo)=>{
	uni.requestPayment({
	provider:"wxpay",
	...orderInfo,
	success(res){
		console.log('success:'+JSON.stringify(res));
		console.log("支付成功")
		uni.showToast({
			title:'支付成功！',
			icon:'none'
		})
		uni.redirectTo({
			url:'/pagesPaySuccess/paySuccess/paySuccess?orderNo='+out_trade_no.value
		})
	},
	fail(err){
		console.log('pay fail:',JSON.stringify(err));
		console.log("支付失败");
		if(lxType.value==='1'){
			
		}else{
			uni.navigateTo({
				url:'/pagesOrder/order/order?order='+3
			})
		}
		
	}
	});
}
const goodsJson = [
	{companyId:'1',goodsinfos:[{goodsid:'1'},{goodsid:'2'}]},
	{companyId:'1',goodsinfos:[{goodsid:'1'},{goodsid:'2'}]}
]

const transformSettlementList = () => {
  // 用于存储按 companyId 分组后的数据
  const groupedData = {};
  // 遍历 settlementList，将数据按 shopid 进行分组
  settlementList.value.forEach(item => {
    const companyId = item.goodsinfos.shopid;
    const goodsid = item.goodsinfos.id;
    if (!groupedData[companyId]) {
      groupedData[companyId] = [];
    }
    groupedData[companyId].push({ goodsid });
  });
  // 将分组后的数据转换为所需格式
  const result = Object.entries(groupedData).map(([companyId, goodsinfos]) => ({
    companyId,
    goodsinfos
  }));
  return result;
};
const yflist = ref([])
const apiGetJdFreightData = async()=>{
	yflist.value = []
	if(addressList.value.length>0){
		const data = {
			opid: uni.getStorageSync('sessionInfo').opid,
			addid:addressList.value[0].id,
			goodsid:JSON.stringify(transformSettlementList())
		}
		const res = await apiGetJdFreight(data);
		if(res.code==='200'){
			yflist.value = res.yflist
		}
		console.log('京东运费:',res);
	}
}
const apiGetSfFreightAction = async()=>{
	yflist.value = []
	if(addressList.value.length>0){
		const data = {
			addid:addressList.value[0].id,
			goodsid:JSON.stringify(transformSettlementList())
		}
		const res = await apiGetSfFreight(data);
		if(res.code==='200'){
			yflist.value = res.yflist
		}
		console.log('顺丰运费:',res);
	}
}
const getYf = (id) => {
    return (yflist.value && yflist.value.length > 0) 
        ? (yflist.value.find(item => item.companyId === id)?.price || '0') 
        : '0';
}

const getTotalYf = ()=>{
	let total = 0
	console.log('yflist.value',yflist.value);
	if(yflist.value){
		yflist.value.forEach(item=>{
			total += parseFloat(item.price)
		})
	}
	return total
}
//默认地址
const addressList = ref([]);
const selectedAddress = ref(null);
const getAddressList = async () => {
  if (selectedAddress.value) {
    addressList.value = [selectedAddress.value];
  } else {
    const data = {
      opid: uni.getStorageSync('sessionInfo').opid,
    };
    const res = await apigetAddress(data);
    if (res.lists&&res.lists.length>0) {
      addressList.value = res.lists.filter(item => item.zt === '1');
      console.log('addressList1:',addressList.value);
    }else{
		addressList.value = []
	}
	console.log('addressList2:',addressList.value)
  }
};
const settlementListComputed = computed(()=>{
	
})

const selectedItemsTotalPrice = () => {
	const yf = getTotalYf()
    return parseFloat(totalPrice.value)+yf;
};
const selectedItemsYjTotalPrice = () => {
	const yf = getTotalYf()
    return parseFloat(bargainingPrice.value)+yf;
};
const shoppingcartids = computed(() => {
    let nums = '';
    if (settlementList.value) {
        nums = settlementList.value.map(item => item.id).join(',');
    }
    return nums;
});

const settleShopCard =async (goodsid)=>{
	const data  = {
		opid: uni.getStorageSync('sessionInfo').opid,
		goodsid:goodsid,
		lx: lxType.value==='1'?'1':''
	}
	const res = await apiSettleShopCard(data)
	console.log('结算信息:',res);
	if(res.code===200){
		parameter.value = res.parameter
		settlementList.value = res.goodslist
		totalNum.value = res.num
		totalPrice.value = res.pirce
		console.log('settlementList:',settlementList.value)
		
		const adminId = uni.getStorageSync('adminId');
		const selectedMine = uni.getStorageSync('selectedMine');
		const identityData = uni.getStorageSync('identityData');
		if (adminId && selectedMine && identityData) {
		    settlementList.value = settlementList.value.map(good => {
		        if (!good) {
		            console.warn('good is undefined');
		            return {};
		        }
		        const selectedIdentity = identityData[selectedMine];
		        return {
		            ...good,
		            mineCompany: selectedIdentity ? good.gsid === selectedIdentity.gsid : false
		        };
		    });
		}
		console.log('settlementList',settlementList.value)
	}
}


const selectedPay = ref()
const handleConfirm = (selectedPayment)=>{
	handleClose()
	selectedPay.value = selectedPayment
	console.log('选择的支付类型：', selectedPayment);
}

function groupByShopId(data) {
    console.log('data computed', data);
    const groupedData = {};
    data.forEach(item => {
		console.log('item',item)
        const shopId = item.goodsinfos.shopid; 
		const byzt = item.byzt
        if (shopId === undefined) {
            console.warn('shopid is undefined for item:', item);
            return; 
        }
        if (!groupedData[shopId]) {
            groupedData[shopId] = {
                shopid: shopId,
				byzt:byzt,
                goodinfos: []
            };
        }

        if (item.goodsinfos) {
            groupedData[shopId].goodinfos.push(item.goodsinfos);
        } else {
            console.warn('goodinfos is undefined for item:', item);
        }
    });

    console.log('groupedData', groupedData);
    return Object.values(groupedData);
}


onShow(async() => {
  console.log('onShow');
  let pages = getCurrentPages()
  const prevPage = pages[pages.length - 1];
  console.log("onShow:", prevPage.data.selectedAddress);
  if (prevPage.data.selectedAddress) {
    selectedAddress.value = prevPage.data.selectedAddress;
  }
  await getAddressList();
  await apiGetJdFreightData()
});
const formId = ref()
onLoad(async(options) => {
  let goodsIds =ref()
  const data = JSON.parse(decodeURIComponent(options.data));
  console.log('sub接收的参数data:',data);
  formId.value = data.id;
  goodsIds.value = data.id;
  yjGoodsId.value = data.id;
  console.log('sub接收的参数:',goodsIds.value);
  bargainingTimeId.value = data.bargainingtimeid
  bargainingPrice.value = data.price
  lxType.value = data.lx
  console.log('lxType.value:',lxType.value);
  //获取结算信息
  await settleShopCard(goodsIds.value)
  await getAddressList();
  await apiGetSfFreightAction()
});

</script>

<style lang="scss" scoped>
	.order-tabbar {
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
		padding: 24rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order-tabbar-l {
			display: flex;
			align-items: center;
			justify-content: space-between; 
			.text-1 {
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					// height: 48rpx;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					// font-size: 24rpx;
					font-size: 30rpx;
					color: #1f1f1f;
					text-align: center;
				}
				
			}
			.text-2 {
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					height: 48rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 40rpx;
					color: #e6432e;
					text-align: center;
				}
			}
		}
		.order-tabbar-r {
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 444rpx;
				height: 96rpx;
				background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				text {
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #ffffff;
				}
			}
		}
	}
	
.layout {
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}
	height: 100vh;
	background: #f3f2f6;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.address-card-box {
		margin-top: 15rpx;
		height: 312rpx;
		width: 710rpx;
		position: relative;
		border-radius: 20rpx;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.top {
			height: 194rpx;
			border-bottom: 2rpx dashed #eeeeee;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 24rpx;
			padding-right: 24rpx;
			.top-l {
				.tap1 {
					display: flex;
					align-items: center;
					.tap {
						height: 36rpx;
						width: 64rpx;
						background: #ffffff;
						border-radius: 4rpx 4rpx 4rpx 4rpx;
						border: 4rpx solid #e6432e;
						display: flex;
						justify-content: center;
						align-items: center;
						text {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 23rpx;
							color: #e6432e;
						}
						margin-right: 12rpx;
					}
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}

				.tap2 {
					margin-top: 16rpx;
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 28rpx;
						color: #1f1f1f;
					}
				}
				.tap3 {
					margin-top: 16rpx;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
				}
			}
			.top-r {
				// border: 2rpx solid black;
				image {
					height: 24rpx;
					width: 24rpx;
				}
			}
		}

		.top1 {
			height: 194rpx;
			border-bottom: 2rpx dashed #eeeeee;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				height: 40rpx;
				width: 40rpx;
			}
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				margin-left: 20rpx;
			}
		}

		.bottom {
			height: 118rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 24rpx;
			padding-right: 24rpx;
			.tap-card {
				width: 150rpx;
				height: 58rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #EEEEEE;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				image{
					height: 24rpx;
					width: 24rpx;
					margin-right: 8rpx;
				}
				text{
					height: 36rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #1F1F1F;
				}
			}
			// 选中时的样式
			.tap-card.selected {
			    border: 2rpx solid #E6432E;
			}
			
			// 选中时的图片样式
			.tap-card.selected .selectedImage {
				position: absolute;
				bottom: -1rpx;
				right: -10rpx;
			    display: block;
				
			}
			.tap-card:nth-last-child(2){background: #EEEEEE;}
			.tap-card:nth-last-child(1){background: #EEEEEE;}
		}
	}

	.address-card-box::before {
		content: '';
		position: absolute;
		left: -5px;
		top: 194rpx;
		transform: translateY(-50%);
		width: 10px;
		height: 10px;
		background-color: #f3f2f6;
		border-right: 1px solid #ccc;
		border-right: none;
		border-radius: 50%;
		z-index: 1;
	}

	.address-card-box::after {
		content: '';
		position: absolute;
		right: -5px;
		top: 194rpx;
		transform: translateY(-50%);
		width: 10px;
		height: 10px;
		background-color: #f3f2f6;
		border-left: 1px solid #ccc;
		border-left: none;
		border-radius: 50%;
		z-index: 1;
	}

	.product-card-list {
		margin-top: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx 24rpx;
		box-sizing: border-box;
		.product-card {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;
			.product-card-l {
				margin-right: 26rpx;
				border: 2rpx solid red;
				border: 18rpx;
				image {
					border-radius: 18rpx;
					height: 190rpx;
					width: 190rpx;
				}
			}
			.product-card-r {
				// border: 1rpx solid black;
				height: 190rpx;
				width: 100%;
				// border: 2rpx solid red;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					// border: 1rpx solid black;
					display: inline-block;
					.top-tap {
						margin-right: 10rpx;
						padding-left: 8rpx;
						padding-right: 8rpx;
						float: left;
						height: 40rpx;
						// width: 64rpx;
						background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
						border-radius: 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						.top-tap-text {
							color: #ffffff;
							font-size: 22rpx;
						}
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
				.mid {
					// border: 1rpx solid red;
					margin-top: 5rpx;
					.version-tap {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
					}
				}
				.bottom {
					// border: 1rpx solid red;
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.bottom-l {
						.bottom1 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom2 {
							height: 38rpx;
							font-family: DIN, DIN;
							font-weight: bold;
							font-size: 32rpx;
							color: #e6432e;
						}
						.bottom3 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
					}
					.bottom-r {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 22rpx;
						color: #1f1f1f;
						vertical-align: bottom;
					}
				}
			}
		}
	}

	.price-card {
		margin-top: 20rpx;
		width: 710rpx;
		height: 246rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding: 24rpx 24rpx;
		.top {
			display: flex;
			flex-direction: column;
			.top1 {
				display: flex;
				justify-content: space-between;
				.text-1 {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
				}
				.text-2 {
					height: 36rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 30rpx;
					color: #1f1f1f;
				}
			}
			.top2 {
				margin-top: 22rpx;
				display: flex;
				justify-content: space-between;
				.left {
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1f1f1f;
						margin-right: 10rpx;
					}
					image {
						height: 24rpx;
						width: 24rpx;
					}
				}
				.right {
					height: 36rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 30rpx;
					color: #1f1f1f;
				}
			}
		}
		.mid {
			width: 642rpx;
			height: 2rpx;
			background: #fafafa;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			margin-top: 26rpx;
			margin-bottom: 26rpx;
		}
		.bottom {
			display: flex;
			justify-content: space-between;
			.left {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
			}
			.right {
				.right1 {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.right2 {
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #e6432e;
				}
			}
		}
	}

	.pay-card {
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 28rpx 24rpx;
		.left {
			display: flex;
			align-items: center;
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
		}
		.right {
			display: flex;
			align-items: center;
			.image1 {
				width: 30rpx;
				height: 30rpx;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				margin-right: 20rpx;
			}
			.image2 {
				height: 20rpx;
				width: 20rpx;
			}
			text {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
				margin-right: 10rpx;
			}
		}
	}

	.remark {
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		width: 710rpx;
		height: 256rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding: 28rpx 24rpx;
		text {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
		}
		.bottom {
			margin-top: 20rpx;
			width: 100%;
			height: 128rpx;
			background: #f3f2f6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			
		}
	}
}
</style>
