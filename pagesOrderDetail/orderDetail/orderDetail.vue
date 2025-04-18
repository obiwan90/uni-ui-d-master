<template>
<scroll-view v-if="orderInfo" :scroll-y="show && orderInfo" :style="{ height: scrollViewHeight }" style="background-color: #f3f3f3">
<view class="orderDetail-layout pageBg" v-if="orderInfo">
	<!-- header -->
	<custom-header>
		<template #name></template>
		<template #fill></template>
	</custom-header>
	
	<view class="title">
		<text class="text-1">{{getTitleText(orderInfo.zt)}}</text>
		<!-- <uv-count-down v-if="orderInfo.lx==='1'" :time="orderInfo.countdown" format="HH:mm:ss"/> -->
	</view>
	
	<view class="tips" v-if="getTipText(orderInfo.zt)">
		<text>{{getTipText(orderInfo.zt)}}</text>
	</view>
	
	<!-- <view class="menu"> -->
	<view class="menu-xx" v-if="getBtns(orderInfo.zt).length">
		<view class="card-xx" v-for="(btn, btnIndex) in getBtns(orderInfo.zt, orderInfo.lx)" :key="btnIndex" @click="handleBtnClick(btn)">
			<image :src="btn.image" mode="aspectFill"></image>
			<text>{{btn.text}}</text>
			<button v-if="btn.text==='联系客服'" class="cusService" open-type="contact" @contact="onContact" send-message-title="" show-message-card plain>联系客服</button>
		</view>
	</view>

	<!-- address -->
	<!-- 地址卡(默认) -->
	<view class="address-card-box" v-if="(orderInfo.zt=='1'||orderInfo.zt=='3')&&addressInfos">
		<view class="top" @click="goPage('/pagesAddress/address/address?from='+'subOrder')">
			<view class="top-l">
				<view class="tap1" >
					<view class="tap" v-if="addressInfos.zt==='1'">
						<text>默认</text>
					</view>
					<text>{{addressInfos.province}}{{addressInfos.city}}{{addressInfos.area}}</text>
				</view>
				<view class="tap2">
					<text>{{addressInfos.address}}</text>
				</view>
				<view class="tap3">
					<text>{{addressInfos.name}} {{addressInfos.phone}}</text>
				</view>
			</view>
			<view class="top-r" >
				<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="bottom">
			<view v-for="(item, index) in express" :key="index" 
			class="tap-card" 
			:class="{ 'selected': selectedTap === index }"
			@click="selectTap(index)"
			>
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
	<!-- 产品信息 采购订单-->
	<view class="product-card-list" >
		<view v-for="(item, index) in orderInfo.gwclist" :key="index" class="product-card">
			<view class="product-card-l">
				<!-- class="box-l-image" -->
				<van-image  width="190rpx" height="190rpx" radius="18rpx" :src="item.gooinfos.cover"  fit="fill">
				  <template v-slot:error>加载失败</template>
				</van-image>
				
			</view>
			<view class="product-card-r">
				<view class="top">
					<view class="top-tap" v-if="item.gooinfos.finenessname">
						<text class="top-tap-text">{{item.gooinfos.finenessname}}</text>
					</view>
					<view style="{clear:both}">
						
					</view>
					<text class="top-text">{{item.gooinfos.name}}</text>
				</view>
				<view class="mid">
					<view class="version-tap"> 
						<text v-if="item.gooinfos.zt==='1'">{{formatGoodsInfoTabs(item)}}</text>
						<view v-else class="imei">
							<text>IMEI：{{item.gooinfos.ch}}</text>
							<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="bottom-l">
						<text class="bottom1">批发价:</text>
						<text class="bottom2">￥{{item.gooinfos.price}}</text>
						<text class="bottom3" v-if="!orderInfo.isBargaining">/台</text>
						<view class="bottom4" v-if="orderInfo.isBargaining">
							<text>原价：¥{{item.originalPrice}}</text>
							<view class="divil">
							</view>
						</view>
					</view>
					<view class="bottom-r" @click="refundBtn(index)" v-if="orderInfo.zt==='3'&&orderInfo.lx==='2'">
						<text>退款</text>
					</view>
					<view class="bottom-r" @click="afterSales(index)" v-if="orderInfo.zt==='4'||orderInfo.zt==='5'">
						<text>售后</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	
	<!-- paice-card -->
	<view class="price-card">
		<view class="top">
			<view class="top1">
				<text class="text-1">商品金额</text>
				<text class="text-2">¥{{orderInfo.price}}</text>
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
				<text v-if="orderInfo.lx!=='1'">商品数量：{{orderInfo.num}}</text>
			</view>
			<view class="right">
				<text class="text-1">合计</text>
				<text class="text-2">￥{{orderInfo.price}}</text>
			</view>
		</view>
	</view>
	
	<view class="pay-card" v-if="orderInfo.zt=='1'">
		<text class="left">支付方式</text>
		<view class="right" @click="openPay">
			
			<image class="image1" :src="selectedPay?selectedPay.image:'https://www.xzxskj.com/xcximg/icon_weixin@3x.png'" mode="aspectFill"></image>
			<text>{{selectedPay?selectedPay.text:'微信支付'}}</text>
			<image class="image2" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
			
			<!-- <image class="image1" src="/pagesOrderDetail/static/icon_zhifubao@3x.png" mode="aspectFill"></image>
			<text>支付宝支付</text>
			<image class="image2" src="/pagesOrderDetail/static/icon_next@3x.png" mode="aspectFill"></image> -->
		</view>
	</view>
	<view class="remark" v-if="orderInfo.zt=='1'||orderInfo.zt=='2'">
		<text>买家备注</text>
		<textarea class="bottom" fixed v-model="orderInfo.remarks" placeholder="请输入备注信息~"></textarea>
	</view>
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="payPopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
			<!-- v-if="showPay" -->
		<view >
			<payPannel ref="payPannelRef"  @close="handleClose" @payType="handleConfirm"></payPannel>
		</view>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="rulePopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
		<view >
			<rulePannel v-if="showRule" @close="handleClose" ></rulePannel>
		</view>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="refundPopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
		<view >
			<refundPannel v-if="showRefund" :itemIndex="itemIndex" @close="handleClose" ></refundPannel>
		</view>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="afterSalesPopup" :safe-area='false' type="bottom" @close="handleClose" @change="change">
		<view >
			 <afterSalesPannel v-if="showAfterSales" :itemIndex="itemIndex" @close="handleClose"></afterSalesPannel>
		</view>
	</uni-popup>
	
	<!-- address&&remark -->
	<view v-if="orderInfo.zt!=='1'&&orderInfo.zt!=='2'&&orderInfo.zt!=='3'&&orderInfo.ddlx!=='4'" class="address-remark">
		<view class="left">
			<text>收货地址</text>
		</view>
		<view class="right">
			<text class="text-1">{{addressInfos.province}} {{addressInfos.city}} {{addressInfos.area}} {{addressInfos.address}}</text>
			<text class="text-2">{{addressInfos.name}} {{addressInfos.phone}}</text>
		</view>
	</view>
	<view v-if="orderInfo.zt!=='1'" class="address-remark">
		<view class="left">
			<text>备注信息</text>
		</view>
		<view class="right">
			<text class="text-1">{{orderInfo.remarks}}</text>
			<!-- <text class="text-2">{{addressInfos.name}} {{addressInfos.phone}}</text> -->
		</view>
	</view>
	<!-- order-info -->
	<view class="order-info">
		<view class="list" v-for="(item,index) in getFilteredOrderInfo(orderInfo.zt)" :key="index">
			<view class="left">
				<text>{{item.name}}</text>
			</view>
			<view class="right">
				<text>{{item.value}}</text>
				<image v-if="item.image" :src="item.image" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	<view v-if="orderInfo.zt=='1'" style="height:200rpx;">
		
	</view>
	<!-- tabbar-bar -->
	<!-- <view class="order-tabbar" v-if="orderInfo.zt=='3'||orderInfo.zt=='1'"> -->
	<view class="order-tabbar" v-if="orderInfo.zt=='4'">
		<view class="order-tabbar-r">
			<view class="btn">
				<text>确认收货</text>
			</view>
		</view>
	</view>
	
	
	<view class="order-tabbar" v-if="orderInfo.zt=='1'">
		<view class="order-tabbar-r" style="display: flex;align-items: center;justify-content: space-between;width: 100%;height: 100%;">
			<view style="display: flex;flex-direction: column;gap: 10rpx;align-items: center;">
				<image src="https://www.xzxskj.com/xcximg/icon_kefu@3x.png" style="height: 44rpx;width: 44rpx;" mode="aspectFill"></image>
				<text style="width: 40rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 20rpx;color: #1F1F1F;text-align: center;font-style: normal;text-transform: none;">客服</text>
			</view>
			<view style="display: flex;flex-direction: column;gap: 10rpx;align-items: center;">
				<image src="https://www.xzxskj.com/xcximg/cancel.png" style="height: 44rpx;width: 44rpx;" mode="aspectFill"></image>
				<text style="width: 80rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 20rpx;color: #1F1F1F;text-align: center;font-style: normal;text-transform: none;">取消订单</text>
			</view>
			<view @click.stop="repay" class="button-animation" style="width: 490rpx;height: 96rpx;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text style="width: 128rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #FFFFFF;text-align: center;font-style: normal;text-transform: none;">立即付款</text>
			</view>
		</view>
	</view>
</view>
</scroll-view>
</template>

<script setup>
import { apigetAddressDetail } from '@/api/address/address.js';
import { onMounted } from 'vue';
import { payPannel } from './components/payPannel.vue'
import { rulePannel } from './components/rulePannel.vue'
import { afterSalesPannel } from './components/afterSalesPannel.vue'
import { refundPannel } from './components/refundPannel.vue'
import {apiGetOrderDetail,apiGetJdFreight,apiGetSfFreight,apiGetWxPay,apiOrderEdit } from '../api/api.js'
const payPannelRef = ref(null)
const orderProposData = ref()
const showAfterSales = ref(false)
const showRefund = ref(false)
const showRule = ref(false)
const showPay  = ref(false)
const orderInfo = ref()
const payment = ref('1')
const zyf = ref('0')
const scrollViewHeight = computed(() => {
  if (orderInfo && (orderInfo.type === '待付款' || orderInfo.type === '待收货')) {
    return 'calc(100vh - 180rpx)';
  } else {
    return '100vh';
  }
});
const getCountdown = ()=>{
	
}

//代付款1  待发货 3  待收货 4  已收货 5 交易完成 7
const titleText = ref([
	// {zt:['1'],lx:['1'],text:'等待确认议价'},
	{zt:['1'],text:'待付款!'},
	{zt:['3'],text:'等待发货'},
	// {zt:['2','3'],lx:['1'],text:'议价成功等待发货'},
	{zt:['4'],text:'待收货'},
	{zt:['5'],text:'已收货'},
	// {zt:['6'],lx:['1','2'],text:'售后中'},
	{zt:['7'],text:'交易成功'},
])
const getTitleText = (zt)=>{
  const item = titleText.value.find(item => {
    return item.zt.includes(zt.toString());
  });
  return item ? item.text : '';
}
//代付款1  待发货 3  待收货 4  已收货 5 交易完成 7
const tipData = ref([
	// {type:'议价中',text:'议价成功后默认购买成功，等待发货',zt:['1'],lx:'1'},
	{type:'待付款',text:'相关商品他人付款后将无法购买，请尽快完成支付！',zt:['1'],lx:'2'},
	{type:'待发货',text:'平台发货前可修改收货信息！',isBargaining:false,zt:['3'],lx:'2'},
	{type:'待收货',text:'物品已签收，请确认收货！',isSign: true,zt:['4'],lx:'2'},
	// {type:'待收货',text:'平台已发货，请注意查看物流信息！',isSign: false,zt:['4'],lx:'2'},
])

const getTipText = (zt)=>{
  const item = tipData.value.find(item => {
    return item.zt.includes(zt.toString());
  });
  return item ? item.text : '';
}

const itemIndex = ref(-1)
const address_remark = ref([
	{name:'收货地址',value:'北京市朝阳区天安车公廟工业区天济大厦ab座5b 506',contacts:'金克丝 13502866873'},
	{name:'备注信息',value:'华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 华为Mate 60 RS 非凡大师 ',contacts:''}
])


const order_info = ref([
	{name:'订单号',value:'NO.202303281234',image:'https://www.xzxskj.com/xcximg/icon_copy@3x.png',zt:['1','3','4','5','7']},
	{name:'下单时间',value:'2024-03-12 15:00:00',image:'',zt:['1','3','4','5','7']},
	{name:'付款时间',value:'2024-03-12 15:00:00',image:'',zt:['3','4','5','7']},
	{name:'发货时间',value:'2024-03-12 15:00:00',image:'',zt:['4','5','7']},
	{name:'收货方式',value:'顺丰 154548785112',image:'https://www.xzxskj.com/xcximg/icon_copy@3x.png',zt:['4','5','7']},
	{name:'收货时间',value:'2024-03-12 15:00:00',image:'https://www.xzxskj.com/xcximg/icon_copy@3x.png',zt:['5','7']},
])
const getFilteredOrderInfo = (zt) => {
  return order_info.value.filter((item) => item.zt.includes(zt));
};
//代付款1  待发货 3  待收货 4  已收货 5 交易完成 7
const btnData = ref ([
	// {type:'议价中',zt:['1'],lx:'1',btns:[
	// ]},
	{type:'待付款',zt:['1'],btns:[
	]},
	{type:'待发货',zt:['3'],btns:[
		{text:'联系客服',image:'https://www.xzxskj.com/xcximg/icon_kefu@3x.png'},
		{text:'修改确认',image:'https://www.xzxskj.com/xcximg/icon_save@3x.png'},
		{text:'催发货',image:'https://www.xzxskj.com/xcximg/icon_cuifahuo@3x.png'},
		{text:'申请退款',image:'https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png'}
		
		// '联系客服','修改确认','催发货','申请退款'
	]},
	{type:'待收货',zt:['4'],btns:[
		
		{text:'联系客服',image:'https://www.xzxskj.com/xcximg/icon_kefu@3x.png'},
		{text:'查看物流',image:'https://www.xzxskj.com/xcximg/icon_wuliu@3x.png'},
		
	]},
	{type:'已收货',zt:['5'],btns:[
		{text:'联系客服',image:'https://www.xzxskj.com/xcximg/icon_kefu@3x.png'},
		{text:'查看物流',image:'https://www.xzxskj.com/xcximg/icon_wuliu@3x.png'},
		{text:'申请售后',image:'https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png'}
	]},
	{type:'交易成功',zt:['7'],btns:[
		{text:'联系客服',image:'https://www.xzxskj.com/xcximg/icon_kefu@3x.png'},
		{text:'查看物流',image:'https://www.xzxskj.com/xcximg/icon_wuliu@3x.png'},
		{text:'申请售后',image:'https://www.xzxskj.com/xcximg/icon_tuikuan@3x.png'}
	]},
])
const afterSales = (index)=>{
	console.log('单台售后');
	showAfterSales.value = true
	itemIndex.value = index
	setTimeout(() => {
		openAfterSales()
	}, 200);
}
const refundBtn = (index)=>{
	console.log('单台退款');
	showRefund.value = true
	itemIndex.value = index
	setTimeout(() => {
		openRefund()
	}, 200);
}

const selectedPay = ref()
const handleConfirm = (selectedPayment)=>{
	handleClose()
	console.log('selectedPayment',selectedPayment)
	selectedPay.value = selectedPayment
	payment.value = selectedPayment.payment
	console.log('选择的支付类型：', selectedPayment);
}

const getBtns = (zt) => {
  const btnItem = btnData.value.find(item => item.zt.includes(zt));
  return btnItem ? btnItem.btns : [];
};
const formatGoodsInfoTabs = (item)=>{
	console.log(item);
	console.log('进来了吗');
  let result = [];
  if (item.zt === '1') {
    if (item.gooinfos.gjbbname) {
      result.push(item.gooinfos.gjbbname);
    }
    if (item.gooinfos.wlbbname) {
      result.push(item.gooinfos.wlbbname);
    }
    if (item.gooinfos.bxzt) {
      result.push(item.gooinfos.bxzt);
    }
    if (item.gooinfos.efficiency) {
      result.push(`电池${item.gooinfos.efficiency}%`);
    }
    if (item.gooinfos.delivery) {
      result.push(`${item.gooinfos.delivery}发货`);
    }
  }
  return result.join('丨');
}
const handleBtnClick = (btn) => {
  console.log('Button clicked:', btn.text);
  if(btn.text==='查看物流'){
	uni.navigateTo({
		 url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息",
	})
  }
  if(btn.text==='申请售后'){
    showAfterSales.value = true
	itemIndex.value = -1
	setTimeout(() => {
		openAfterSales()
	}, 200);
  }
  if(btn.text==='申请退款'){
	  showRefund.value = true
	  itemIndex.value = -1
  	  openRefund()
  }
  if(btn.text === '修改确认'){
	 apiOrderEditAc()
  }
};

const express = ref([
	{image:'https://www.xzxskj.com/xcximg/icon_shunfeng@3x.png',value:'顺丰',expressId:'2'},
	{image:'https://www.xzxskj.com/xcximg/icon_jingdong@3x.png',value:'京东',expressId:'1'},
	{image:'https://www.xzxskj.com/xcximg/icon_songhuo@3x.png',value:'送货上门',expressId:'3'},
	{image:'https://www.xzxskj.com/xcximg/icon_ziti@3x.png',value:'自提',expressId:'4'},
])

const selectedTap = ref(0);
const yflist = ref([])

const selectTap =async (index) => {
	if(orderInfo.type === '待付款'){
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
	}
};
const apiGetJdFreightData = async()=>{
	yflist.value = []
	if(addressInfos&&addressInfos.value){
		const data = {
			opid: uni.getStorageSync('sessionInfo').opid,
			addid:addressInfos.value.id,
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
	if(addressInfos&&addressInfos.value){
		const data = {
			addid:addressInfos.value.id,
			goodsid:JSON.stringify(transformSettlementList())
		}
		const res = await apiGetSfFreight(data);
		if(res.code==='200'){
			yflist.value = res.yflist
		}
		console.log('顺丰运费:',res);
	}
}

const transformSettlementList = () => {
  // 用于存储按 companyId 分组后的数据
  const groupedData = {};
  console.log('orderInfo',orderInfo.value)
  // 遍历 settlementList，将数据按 shopid 进行分组
  orderInfo.value.gwclist.forEach(item => {
    const companyId = item.gooinfos.shopid;
    const goodsid = item.gooinfos.id;
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
const getTotalYf = ()=>{
	let total = 0
	console.log('yflist.value',yflist.value);
	if(yflist.value){
		yflist.value.forEach(item=>{
			total += parseFloat(item.price)
		})
	}
	if(zyf&&zyf.value){
		zyf.value = total
	}
	return zyf.value
}


const payPopup = ref(null)
const rulePopup = ref(null)
const afterSalesPopup = ref(null)
const refundPopup = ref(null)
const show =ref(true)
const openPay = ()=>{
	showPay.value = true
	payPopup.value.open();
	// show.value = !show.value
}
const openRule = ()=>{
	showRule.value = true
	rulePopup.value.open();
	// show.value = !show.value
}
const openAfterSales = ()=>{
	showAfterSales.value = true
	afterSalesPopup.value.open()
	// show.value = !show.value
}
const openRefund=()=>{
	showRefund.value = true
	refundPopup.value.open()
	// show.value = !show.value
}
const handleClose = () => {
    console.log('Popup is closed');
	// showAfterSales.value = false
	// showRefund.value = false
	refundPopup.value.close();
	payPopup.value.close();
	rulePopup.value.close();
	afterSalesPopup.value.close();
	show.value = true;
};
const change = (e)=>{
	console.log('点击了遮罩e:',e);
	show.value = !e.show
	if(!e.show){
		showAfterSales.value = e.show
		showRefund.value = e.show
		showRule.value = e.show
		showPay.value = e.show
	
	}
}
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const calculateTotalPrice = (order) => {
    let total = 0;
	order.forEach(item => {
		total += Number(item.price);
	});
    return total;
};

const addressInfos = ref();
const getAddressDetail = async (id) => {
	const param = { id: id };
	const res = await apigetAddressDetail(param);
	addressInfos.value = res.info
	console.log(res);
};

const formatTimestamp=(timestamp)=>{
  const date = new Date(timestamp * 1000); // 将时间戳转换为 Date 对象
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1,并补齐两位数
  const day = String(date.getDate()).padStart(2, '0'); // 日期补齐两位数
  const hours = String(date.getHours()).padStart(2, '0'); // 小时补齐两位数
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补齐两位数
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒数补齐两位数
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const apiOrderEditAc = async()=>{
	const param = {
		id: orderInfo.value.id,
		addid: addressInfos.value.id,
		remarks: orderInfo.value.remarks
	}
	const res = await apiOrderEdit(param)
	if(res.code === '200'){
		uni.showToast({
			title: '修改成功',
			icon: 'success',
			duration: 1000
		});
		setTimeout(()=>{
			apiGetOrderDetailAc(orderInfo.value.id)
		},500)
	}else{
		uni.showToast({
			title: res.msg || '操作失败',
			icon: 'error',
			duration: 1000
		});
	}
}
const repay =()=>{
	console.log('立即付款');
	if(payment.value === '1'){
		// 微信支付
		wxPay(orderInfo.value.id)
	}
}
const wxPay =async (id) => {
	const data = {
	  id:id,
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
	autoPay(orderInfo)
}
const autoPay = (orderInfo)=>{
	uni.requestPayment({
		provider:"wxpay",
		...orderInfo,
		success(res){
			console.log('success:'+JSON.stringify(res));
			console.log("支付成功")
			uni.showToast({
				title: '支付成功',
				icon: 'success',
				duration: 1000
			});
			uni.navigateBack()
		},
		fail(err){
			console.log('pay fail:',JSON.stringify(err));
			console.log("支付失败");
			uni.showToast({
				title: '支付失败',
				icon: 'none',
				duration: 1000
			});
		}
	});
}

const apiGetOrderDetailAc = async (id) => {
	const param = {
		lx: '5', // 用户详情
		id: id
	};
	const res = await apiGetOrderDetail(param);
	if (res.code === '200') {
		orderInfo.value = res.infos;
		addressInfos.value = res.infos.addinfos;
		selectedTap.value = express.value.findIndex(item => {
			return item.expressId == res.infos.expressid;
		});
		if (res.infos.zyf) {
			zyf.value = res.infos.zyf;
		}
		
	}
	// 代付款1  待发货 3  待收货 4  已收货 5 交易完成 7
	// add_time 下单时间  pay_time 付款时间 fhsj 发货时间 expressid 快递方式 shsj 收货时间
	order_info.value = [
		{
			name: '订单号',
			value: orderInfo.value.ordernumber || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['1', '3', '4', '5', '7']
		},
		{
			name: '下单时间',
			value: formatTimestamp(res.infos.add_time) || ' ', // 处理空值
			image: '',
			zt: ['1', '3', '4', '5', '7']
		},
		{
			name: '付款时间',
			value: formatTimestamp(res.infos.pay_time) || ' ', // 处理空值
			image: '',
			zt: ['3', '4', '5', '7']
		},
		{
			name: '发货时间',
			value: formatTimestamp(res.infos.fhsj) || ' ', // 处理空值
			image: '',
			zt: ['4', '5', '7']
		},
		{
			name: '收货方式',
			value: express.value.find(item => item.expressId == res.infos.expressid)?.value || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['4', '5', '7']
		},
		{
			name: '收货时间',
			value: formatTimestamp(res.infos.shsj) || ' ', // 处理空值
			image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png',
			zt: ['5', '7']
		},
	];
	console.log('res', res);
};


const selectedAddress = ref(null);
onShow(() => {
  console.log('onShow');
  let pages = getCurrentPages()
  const prevPage = pages[pages.length - 1];
  console.log("onShow:", prevPage.data.selectedAddress);
  if (prevPage.data.selectedAddress) {
	console.log('prevPage.data.selectedAddress:',prevPage.data.selectedAddress);
	addressInfos.value = prevPage.data.selectedAddress;
  }
});
onMounted(()=>{
	// const itemString = uni.getStorageSync('orderDetailItem'); 
	// if (itemString) {
	//     const item = JSON.parse(itemString);
	//     console.log(item); 
	// 	orderInfo.value = JSON.parse(itemString)
	// 	order_info.value[0].value = 'NO.'+orderInfo.value.ordernumber
	// 	order_info.value[1].value = formatTimestamp(orderInfo.value.add_time) 
	// 	order_info.value[2].value = formatTimestamp(orderInfo.value.pay_time) 
	// 	order_info.value[3].value = ''
	// 	order_info.value[4].value = ''
	// 	if(orderInfo.value.addressid !=='0'){
	// 		getAddressDetail(orderInfo.value.addressid)
	// 	}
	// }
}) 
onLoad((options)=>{
	if(options.orderId){
		apiGetOrderDetailAc(options.orderId)
	}
})

onReady(() => {
  setTimeout(() => {
   if (payPannelRef && payPannelRef.value) {
		console.log('调用了');
		payPannelRef.value.selectTap(2);
   }
  }, 1000);
});

onShow(async() => {
  console.log('onShow');
  let pages = getCurrentPages()
  const prevPage = pages[pages.length - 1];
  console.log("onShow:", prevPage.data.selectedAddress);
  if (prevPage.data.selectedAddress) {
    selectedAddress.value = prevPage.data.selectedAddress;
  }
  console.log('selectedAddress',selectedAddress.value)		
});

</script>

<style lang="scss" scoped>
.orderDetail-layout{
	min-height: 100vh;
	box-sizing: border-box;
	// background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	background: #F3F2F6;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.title{
		margin-top: 38rpx;
		display: flex;
		align-items: center;
		.text-1{
			height: 60rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 44rpx;
			color: #1F1F1F;
			text-align: left;
			margin-right: 20rpx;
		}
		::v-deep .uv-count-down{
			display: flex;
			align-content: center;
			justify-content: center;
			margin-top: 7rpx;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #E6432E;
				text-align: center;
			}
		}
	}
	.tips{
		margin-top: 10rpx;
		height: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		font-size: 24rpx;
		color: #1F1F1F;
		text-align: left;
		opacity: 0.6;
	}
	.menu-xx {
	    margin-top: 20rpx;
	    display: grid;
	    grid-template-columns:25% 25% 25% 25%;
		// display: flex;
	    box-sizing: border-box;
	    justify-content: space-between;
	    align-items: center;
		.card-xx {
		    box-sizing: border-box;
		    width: 170rpx;
		    height: 60rpx;
		    background: #FFFFFF;
		    border-radius: 10rpx 10rpx 10rpx 10rpx;
		    display: flex;
		    align-items: center;
			justify-content: center;
			padding-left: 10rpx;
			padding-right: 10rpx;
			image {
			    height: 32rpx;
			    width: 32rpx;
			    margin-right: 10rpx;
			}
			text {
			    font-family: PingFang SC, PingFang SC;
			    font-weight: 400;
			    font-size: 26rpx;
			    color: #1F1F1F;
			    text-align: center;
			}
			.cusService{
				// border: 1rpx solid red;
				// height: 128rpx;
				// width: 345rpx;
				position: absolute;
				border-radius: 20rpx;
				opacity: 0;
			}
		}
	}
	
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
		// border: 1rpx solid red;
		margin-top: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx 24rpx;
		box-sizing: border-box;
		.product-card {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15rpx;
			.product-card-l {
				width: 30%;
				// margin-right: 10rpx;
				// border: 2rpx solid yellow;
				border: 18rpx;
				height: 190rpx;
				// width: 190rpx;
				// background-color: red;
				image {
					// border: 1rpx solid black;
					height:100%;
					width: 100%;
				}
			}
			.product-card-r {
				// border: 2rpx solid red;
				width: 70%;
				height: 190rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					display: inline-block;
					.top-tap {
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
						margin-right: 10rpx;
						.top-tap-text {
							color: #ffffff;
							font-size: 22rpx;
						}
					}
					.top-text {
						// margin-left: 10rpx;
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
					margin-top: 5rpx;
					.version-tap {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
						.imei{
							display: flex;
							align-items: center;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #828282;
								text-align: left;
								margin-right: 10rpx;
							}
							image{
								height: 20rpx;
								width: 20rpx;
							}
						}
					}
				}
				
				.bottom {
					// border: 1rpx solid red;
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.bottom-l {
						// border: 1rpx solid red;
						width: 100%;
						display: flex;
						align-items: center;
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
							margin-bottom:8rpx;
						}
						.bottom3 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom4{
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
					.bottom-r {
						width: 98rpx;
						height: 52rpx;
						background: #FFFFFF;
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						border: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: center;
						align-items: center;
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: #1F1F1F;
							text-align: center;
						}
					}
				}
			}
		
		}
	}
	.card{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			height: 84rpx;
			margin-left: 24rpx;
			width: 662rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #EEEEEE;
			.left{
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: left;
				}
				image{
					margin-left: 16rpx;
					height: 20rpx;
					width: 20rpx;
				}
			}
			.right{
				display: flex;
				align-items: center;
				::v-deep .uv-count-down{
					display: flex;
					align-content: center;
					justify-content: center;
					padding-bottom: 7rpx;
					text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #E6432E;
						text-align: center;
					}
				}
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #E6432E;
					text-align: right;
					margin-right: 20rpx;
				}
			}
		}
	
		.product-card {
			margin-left: 24rpx;
			margin-right: 24rpx;
			// border: 1rpx solid red;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.product-card-l {
				margin-right: 26rpx;
				border: 18rpx;
				image {
					height: 190rpx;
					width: 190rpx;
				}
			}
			.product-card-r {
				display: flex;
				flex-direction: column;
				.top {
					display: inline-block;
					.top-tap {
						float: left;
						height: 40rpx;
						width: 64rpx;
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
						margin-left: 10rpx;
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
						// border: 1rpx solid red;
						width: 100%;
						display: flex;
						align-items: center;
						flex-wrap: nowrap;
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
							margin-bottom:8rpx;
						}
						.bottom3 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom4{
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
			}
		
		}
		
		.product-size{
			margin-top: 32rpx;
			margin-left: 24rpx;
			margin-right: 24rpx;
			padding-bottom: 30rpx;
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
			.right{
				.text-1{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.text-2{
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #E6432E;
					text-align: left;
				}
			}
		}
		.btns{
			margin-right: 24rpx;
			margin-top: 30rpx;
			padding-bottom: 30rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.btn {
			    width: 156rpx;
			    height: 60rpx;
			    border-radius: 10rpx 10rpx 10rpx 10rpx;
			    border: 2rpx solid #1F1F1F;
			    margin-left: 20rpx;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			  
			}
			
			.special-btn {
				background: linear-gradient( 89deg, #ED784B 0%, #EB4636 100%);
				border: none;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #FFFFFF;
					text-align: center;
					text-transform: none;
				}
			}
			
			.normal-btn {
				opacity: 0.5;
				text {
				    height: 40rpx;
				    font-family: PingFang SC, PingFang SC;
				    font-weight: 400;
				    font-size: 28rpx;
				    color: #1F1F1F;
				    text-align: center;
				    opacity: 0.7;
				}
			}
		}
	}
	.pay-card {
		box-sizing: border-box;
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
		box-sizing: border-box;
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
	.price-card {
		box-sizing: border-box;
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
				.text-1 {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.text-2 {
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #e6432e;
				}
			}
		}
	}
	.address-remark{
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		.left{
			width: 30%;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			width: 70%;
			display: flex;
			flex-direction: column;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: right;
			}
			
		}
	}
	.order-info{
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding:24rpx;
		box-sizing: border-box;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					line-height: 64rpx;
				}
			}
			.right{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: right;
				}
				image{
					margin-left: 10rpx;
					height: 20rpx;
					width: 20rpx;
				}
			}
		}
		
	}
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
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.order-tabbar-r {
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 700rpx;
				height: 96rpx;
				background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
					
				
				}
			}
		}
	}

	
}
</style>