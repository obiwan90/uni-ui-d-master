<template>
<view class="order-layout pageBg">
	<!-- header -->
	<custom-header>
		<template #name>{{title}}</template>
		<template #fill>订单</template>
	</custom-header>
	
	<!-- 搜索栏 -->
	<view class="search-fill" style="height: 140rpx; background: #f3f2f6; width: 100%">
		<view class="search">
			<view class="searchBar">
				<view class="search-content">
					<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
					<view class="selectDownUp">
						<qiaoSelect
							:keyId="22"
							phText="请输入串号"
							:dataList="orgArray"
							:searchKey="searchModelKey"
							:showBorder="false"
							:disabled="false"
							:showField="showModelField"
							@input="handleInput"
							@change="selectChange"
							ref="searchRef"
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
	
	<!-- 搜索栏 -->
	<!-- <view class="search">
		<view class="searchBar">
			<view class="search-content">
				<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
				<input class="search-content-text" type="text" placeholder="请输入串号/物品编码/订单编号搜索"  />
			</view>
			<view class="right">
				<view class="inline"/>
				<image src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="select-btn" @click="selectSaiXuan">
			<image src="/pagesOrder/static/icon_shaixuan@3x.png" mode="aspectFill"></image>
		</view>
	</view> -->
	<!-- <uv-sticky :offset-top="getStatusBarHeight() + getTitleBarHeight()"> -->
	<!-- tabs -->
	<view class="tabs">
		<uv-tabs
			:list="tabsData"
			lineWidth="30" 
			lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)" 
			lineHeight="3"
			:fontSize="28"
			:inactiveStyle="{
				color: '#1F1F1F'
			}"
			:activeStyle="{ color: '#E6432E', fontWeight: 'bold',fontSize:32 }"
			@change="uvTabs1Change"
			:current="activeTab1Index"
		></uv-tabs>
	</view>
	<!-- </uv-sticky> -->
	<!-- card -->
	<view style="height: 1200rpx;width: 100%;">
		<z-paging ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
			<view v-if="!isYjCard&&!isShCard" class="card" v-for="(item, index) in dataList" :key="index" >
				<view class="title">
					<view class="left">
						<text class="text-1">NO.{{item.ordernumber}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<view class="right">
						<text class="text-1">{{getTitleText(item.zt,item.lx)}}</text>
					</view>
				</view>
				<!-- 产品信息 -->
				<view v-for="(item1, index) in item.goodsinfos" :key="index" class="product-card" @click="goDetail(item,'custom')">
					<view class="product-card-l">
						<van-image width="190rpx" height="190rpx" radius="18rpx" fit="fill" :src="item1.goodsinfos.cover"  >
						  <template v-slot:error>加载失败</template>
						</van-image>
					</view>
					<view class="product-card-r">
						<view class="top">
							<view class="top-tap" v-if="item1.goodsinfos.finenessname">
								<text class="top-tap-text">{{item1.goodsinfos.finenessname}}</text>
							</view>
							<view style="{clear:both}">
								
							</view>
							<text class="top-text">{{item1.goodsinfos.name}}</text>
						</view>
						<view class="mid">
							<view class="version-tap"> 
								<text v-if="item1.goodsinfos.zt==='1'">{{formatGoodsInfoTabs1(item1)}}</text>
								<view v-else class="imei">
									<text>IMEI：{{item1.goodsinfos.ch}}</text>
									<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="bottom-l">
								<text class="bottom1">批发价:</text>
								<text class="bottom2">￥{{item1.price}}</text>
								<text class="bottom3" v-if="!item.isBargaining">/台</text>
								<view class="bottom4" v-if="item.isBargaining">
									<text>原价：¥{{item1.originalPrice}}</text>
									<view class="divil">
									</view>
								</view>
							</view>
							<view class="bottom-r">
								<text></text>
							</view>
						</view>
					</view>
				</view>
				<!-- product-size -->
				<view class="product-size">
					<view class="left">
						<text>商品数量：{{item.goodsinfos.length}}</text>
					</view>
					<view class="right">
						<text class="text-1">合计</text>
						<text class="text-2">￥{{item.price}}</text>
					</view>
				</view>
				<!-- btn -->
				 <view class="btns" v-if="item.zt==='1'||item.zt==='2'||item.zt==='3'||item.zt==='4'">
					 <view class="btn" v-for="(btn, btnIndex) in getBtns(item.zt,item.lx)" :key="btnIndex" @click="handleBtnClick(btn,item)" :class="btnClass(btn)">
						 <text>{{ btn }}</text>
					 </view>
				 </view>
			</view>
			<view v-if="isYjCard" class="card" v-for="(item, index) in dataList" :key="index" @click="goDetail(item,'yj')">
				<view class="title">
					<view class="left">
						<text class="text-1">NO.{{item.ordernumber}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<!-- <view class="right">
						<text class="text-1">{{getTitleText(item.zt,item.lx)}}</text>
						<uv-count-down v-if="item.lx==='1'" :time="getRemainingTime(item.pay_time,item.bargainingtimename)" format="HH:mm:ss"/>
					</view> -->
					
					<view class="right" style="display: flex; align-items: center;">
						<text class="text-1">{{ getTitleText(item.zt,item.lx) }}</text>
						
						
						<template v-if="getTitleText(item.zt,item.lx)==='等待确认议价'&&getRemainingTime(item.pay_time, item.bargainingtimename) === '已结束'">
						  <text>已结束</text>
						</template>
						<uv-count-down v-else-if="getTitleText(item.zt,item.lx)==='等待确认议价'&&item.lx === '1'" 
						   :time="getRemainingTime(item.pay_time, item.bargainingtimename)" 
						   format="HH:mm:ss"/>
					</view>
					
				</view>
				<!-- 产品信息 -->
				<view class="product-card">
					<view class="product-card-l">
						<van-image width="190rpx" height="190rpx" radius="18rpx" fit="fill" :src="item.goodsinfos.cover">
						  <template v-slot:error>加载失败</template>
						</van-image>
					</view>
					<view class="product-card-r">
						<view class="top">
							<view class="top-tap" v-if="item.goodsinfos.finenessname">
								<text class="top-tap-text">{{item.goodsinfos.finenessname}}</text>
							</view>
							<view style="{clear:both}">
								
							</view>
							<text class="top-text">{{item.goodsinfos.name}}</text>
						</view>
						<view class="mid">
							<view class="version-tap"> 
								<text style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-if="item.goodsinfos.zt==='1'">{{formatGoodsInfoTabs2(item)}}</text>
								<view v-else class="imei">
									<text>IMEI：{{item.goodsinfos.ch}}</text>
									<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="bottom-l" style="display: flex;align-items: center;">
								<text class="bottom1">议价:</text>
								<text class="bottom2">￥{{item.price}}</text>
								<!-- <text class="bottom3" v-if="!item.isBargaining">/台</text> -->
								<view class="bottom4" style="display: flex;align-items: center;height: 100%;">
									<text>原价：¥{{item.goodsinfos.price}}</text>
									<view class="divil">
									</view>
								</view>
							</view>
							<view class="bottom-r">
								<text></text>
							</view>
						</view>
					</view>
				</view>
			
			</view>
			<view v-if="isShCard" class="card" v-for="(item, index) in dataList" :key="index" @click="goDetail(item,'sh')">
				<view class="title">
					<view class="left">
						<text class="text-1">NO.{{item.ordernumber}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<view class="right">
						<text class="text-1">{{getTitleText(item.zt,item.lx)}}</text>
					</view>
				</view>
				<!-- 产品信息 -->
				<view class="product-card" v-for="(item1,index) in item.goodsinfos" :key="index">
					<view class="product-card-l">
						<van-image width="190rpx" height="190rpx" radius="18rpx" fit="fill" :src="item1.cover">
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
								<view class="imei">
									<text>IMEI：{{item1.ch}}</text>
									<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="bottom-l">
								<text class="bottom1">批发价:</text>
								<text class="bottom2">￥{{item1.price}}</text>
								<view class="bottom4" >
									<text>申请金额：¥{{item.price}}</text>
									<!-- <view class="divil">
									</view> -->
								</view>
							</view>
							<view class="bottom-r">
								<text></text>
							</view>
						</view>
						
						<!-- <view class="bottom">
							<view class="bottom-l">
								<text class="bottom1">批发价:</text>
								<text class="bottom2">￥{{item1.price}}</text>
							
							</view>
							<view class="bottom-r">
								<text></text>
							</view>
						</view> -->
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { apiCheckPay,apiGetOrderlist,apiGetOrderInfos,apiGetShIndex,apiGetYjIndex,apiCancelOrder,apiGetWxPay,apiBargainingWxPay,apiUrgeShipment,apiConfirmReceived,apiGetOrderSearch } from '../api/api.js';
import { scanCode } from '@/utils/common.js'
const scan = async () => {
	showLoading();
	try {
		const result = await scanCode();
		console.log('result', result);
		if (result) {
			handleInput(result);
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
const searchRef = ref(null)
const searchCh = ref('')
const orgArray = ref([])
const searchModelKey = ref('ch')
const showModelField = ref('ch')
const handleInput = (inputText)=>{
	// 普通订单
	if (inputText.length>0&&orderType.value=='custom') {
		apiGetOrderSearchAc(inputText)
	}
}
const selectChange = (e)=>{
	console.log('selectChange:', e);
	if(e){
		if(searchRef&&searchRef.value){
			searchRef.value.clearData()
			orgArray.value = []
		}
		
		searchCh.value = e.ch
		paging.value.reload(true)
	}
	
}
const apiGetOrderSearchAc =async (ch)=>{
	const param = {
		ch:ch
	}
	const res = await apiGetOrderSearch(param)
	if(res.code===200){
		orgArray.value = res.lists
	}
	console.log('res',res)
}


const dataList = ref([])
const paging = ref(null)
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await getOrderList(orderLx.value, orderType.value);
	console.log("data：",data);
	paging.value.complete(data);
};

const title = ref()
const lx = ref()
const isYjCard = ref(false)
const isShCard = ref(false)
//tabs
const classlist = ref([
  // { name: '全部', lx: '1', type: 'custom' },
  { name: '待付款', lx: '3',  type: 'custom' },
  { name: '待发货', lx: '4',  type: 'custom' },
  { name: '待收货', lx: '5',  type: 'custom' },
  { name: '已收货', lx: '6',  type: 'custom' },
  { name: '交易成功', lx: '7',  type: 'custom' },

  // { name: '全部', lx: '1', type: 'yj' },
  { name: '议价中', lx: '2', type: 'yj' },
  { name: '议价成功', lx: '3', type: 'yj' },
  { name: '议价失败', lx: '4', type: 'yj' },

  // { name: '全部', lx: '1', type: 'sh' },
  { name: '售后中', lx: '2',zt:'1',  type: 'sh' },
  { name: '售后成功', lx: '3',zt:'2',  type: 'sh' },
  { name: '售后失败', lx: '4',zt:'3',  type: 'sh' },
]);

const activeTab1Index = ref();
const tabsData = computed(() => {
  return classlist.value.map((item) => ({
    name: item.name,
    type: item.type, // 添加 type 属性
	lx: item.lx,
  }));
});
const uvTabs1Change = (e) => {
  activeTab1Index.value = e.index;
  // 获取当前选中标签页的 type 属性
  console.log('tabsData:',tabsData.value);
  // const currentType = tabsData.value[e.index].type;
  // const currentLx = tabsData.value[e.index].lx;
   orderType.value = tabsData.value[e.index].type;
   orderLx.value = tabsData.value[e.index].lx;
  // getOrderList(currentLx,currentType);
  paging.value.reload(true);
};

const getBtns = (zt,lx) => {
  const btnItem = btnData.value.find(item => item.zt.includes(zt)&&item.lx===lx);
  console.log();
  return btnItem ? btnItem.btns : [];
};
const handleBtnClick = (btn,item) => {
  console.log('Button clicked:', btn);
  if(btn==='查看物流'){
	  goKd(item);
  }
  if(btn==='立即支付'){
	  if(!apiCheckPayAc(item.id)){
		  repay(item);
	  }
  }
  if(btn==='取消订单'){
	  apiCancelOrderAc(item.id)
  }
  if(btn === '催发货'){
	  apiUrgeShipmentAc(item.id)
  }
  if(btn === '确认收货'){
	  apiConfirmReceivedAc(item.id)
  }
};

const repay = (item) => {
	if(item.payment === '1'){
		wxPay(item.id)
	}
};

const wxPay =async (id) => {
	const data = {
	  lx:'1',
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
			setTimeout(()=>{
				paging.value.reload(true);
			},1000)
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
//查看物流
// const goKd = (item)=>{
// 	uni.navigateTo({
// 		 url: "plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息",
// 	})
// }
const goKd = (item) => {
  const num = item.kddh;
  uni.navigateTo({
    url: `plugin://kdzs-plugin/logistics-list?num=${num}&appName=数码购机&title=物流信息`
  });
};

const btnClass = (btn) => {
    if (btn === '确认收货' || btn === '催发货' || btn === '立即支付') {
        return 'special-btn';
    } else {
        return 'normal-btn';
    }
};
const btnData = ref ([
	{type:'议价中',zt:['1'],lx:'1',btns:[
	]},
	{type:'待付款',zt:['1'],lx:'2',btns:[
		'取消订单','立即支付'
	]},
	{type:'待发货',zt:['2','3'],lx:'2',btns:[
		'催发货'
	]},
	
	// {type:'待付款',zt:['1'],lx:'2',btns:[
	// 	'取消订单','修改信息','立即支付'
	// ]},
	// {type:'待发货',zt:['2','3'],lx:'2',btns:[
	// 	'修改信息','催发货'
	// ]},
	
	{type:'待收货',zt:['4'],lx:'2',btns:[
		'查看物流','确认收货'
	]},
	{type:'已收货',zt:['5'],lx:'2',btns:[
	]},
	{type:'售后中',zt:['6'],lx:'2',btns:[
	]},
	{type:'交易成功',zt:['7'],lx:'2',btns:[
	]},
])
const titleText = ref([
	{zt:['1'],lx:['1'],text:'等待确认议价'},
	{zt:['1'],lx:['2'],text:'他人付款后将无法购买请尽快支付!'},
	{zt:['2','3'],lx:['2'],text:'等待发货'},
	{zt:['2'],lx:['1'],text:'等待确认议价'},
	{zt:['3'],lx:['1'],text:'议价成功等待发货'},
	// {zt:['4'],lx:['1','2'],text:'运输中'},
	{zt:['5'],lx:['1','2'],text:'已收货'},
	{zt:['6'],lx:['1','2'],text:'售后中'},
	{zt:['7'],lx:['1','2'],text:'交易成功'},
])

const shTitleText = ref([
	{zt:'1',text:'售后中'},
	{zt:'2',text:'售后成功'},
	{zt:'3',text:'售后失败'},
])

const getTitleText = (zt, lx) => {
  console.log('zt:',zt);
  console.log('lx:',lx);
  if(orderType.value==='sh'){
	return shTitleText.value.find(item => item.zt===zt).text;
  }
  
  const titleItem = titleText.value.find(item => item.zt.includes(zt) && item.lx.includes(lx));
  console.log('titleItem:',titleItem);
  return titleItem ? titleItem.text : '';
};

const calculateTotalPrice = (order) => {
    let total = 0;
	order.forEach(item => {
		total += Number(item.price);
	});
    return total;
};
const getRemainingTime=(addTime, bargainingTimeName)=>{
	console.log('addTime:',addTime);
	console.log('bargainingTimeName:',bargainingTimeName);
  const currentTime = new Date().getTime();
  const bargainingEndTime = new Date(parseInt(addTime) * 1000 + parseInt(bargainingTimeName) * 3600 * 1000);
  const remainingTime = bargainingEndTime.getTime() - currentTime;
  return remainingTime;
}
const goDetail = (item,type) => {
    const itemString = JSON.stringify(item);
    uni.setStorageSync('orderDetailItem', itemString); // 存储数据
	if(type==='custom'){
		uni.navigateTo({
		    url: '/pagesOrderDetail/orderDetail/orderDetail?orderId='+item.orderid
		});
	}
	if(type==='yj'){
		uni.navigateTo({
		    url: '/pagesYjOrderDetail/yjOrderDetail/yjOrderDetail'
		});
	}
   if(type==='sh'){
   	uni.navigateTo({
   	    url: '/pagesShOrderDetail/shOrderDetail/shOrderDetail'
   	});
   }
};
const orderList = ref([])
//采购订单 售后订单 议价订单
const getOrderList = async (lx, type) => {
  let res;
  switch (type) {
    case 'custom':
      res = await apiGetOrderlist({
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: searchCh.value?'':lx,
		ch: searchCh.value
      });
      break;
    case 'yj':
      res = await apiGetYjIndex({
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: lx,
      });
      break;
    case 'sh':
      res = await apiGetShIndex({
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: lx,
      });
      break;
    default:
      res = { code: 200, lists: [] };
  }

  if (res.code === 200) {
	if(type==='custom'){
		console.log('custom.lists:',res.lists);
		if(searchCh.value){
			activeTab1Index.value = parseInt(res.lists[0].zt)-1
			searchCh.value = ''
		}
		return res.lists.filter((item) => item.goodsinfos.length > 0);
	}
	if(type==='yj'){
	  isYjCard.value = true;
	  console.log('yj.lists:', res.lists);
	  return Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
	}
	if(type==='sh'){
	  isShCard.value = true;
	  console.log('sh.lists:', res.lists);
	  if(res.lists.length >0){
		  res.lists.forEach(item=>{
			  if(!Array.isArray(item.goodsinfos)){
				  const goodsinfos = item.goodsinfos;
				  item.goodsinfos = [];
				  if(goodsinfos){
					  item.goodsinfos.push(goodsinfos);
				  }
			  }
		  })
		  res.lists = res.lists.filter((item) => item.goodsinfos.length > 0);
		  return res.lists;
	  }
	  return  []
	}
  }
  console.log(res);
};

const formatGoodsInfoTabs1 = (item)=>{
	console.log(item);
	console.log('进来了吗');
  let result = [];
  if (item.zt === '1') {
    if (item.goodsinfos.gjbbname) {
      result.push(item.goodsinfos.gjbbname);
    }
    if (item.goodsinfos.wlbbname) {
      result.push(item.goodsinfos.wlbbname);
    }
    if (item.goodsinfos.bxzt) {
      result.push(item.goodsinfos.bxzt);
    }
    if (item.goodsinfos.efficiency) {
      result.push(`电池${item.goodsinfos.efficiency}%`);
    }
    if (item.goodsinfos.delivery) {
      result.push(`${item.goodsinfos.delivery}发货`);
    }
  }
  return result.join('丨');
}

const formatGoodsInfoTabs2 = (item)=>{
	console.log(item);
	console.log('进来了吗');
  let result = [];
  if (item.zt === '2') {
    if (item.goodsinfos.gjbbname) {
      result.push(item.goodsinfos.gjbbname);
    }
    if (item.goodsinfos.wlbbname) {
      result.push(item.goodsinfos.wlbbname);
    }
    if (item.goodsinfos.bxzt) {
      result.push(item.goodsinfos.bxzt);
    }
    if (item.goodsinfos.efficiency) {
      result.push(`电池${item.goodsinfos.efficiency}%`);
    }
    if (item.goodsinfos.delivery) {
      result.push(`${item.goodsinfos.delivery}发货`);
    }
  }
  return result.join('丨');
}

const apiCancelOrderAc =async (id)=>{
	const data = {
		id:id,
		opid:uni.getStorageSync('sessionInfo').opid
	}
	const res = await apiCancelOrder(data)
	if(res.code === '200'){
		uni.showToast({
			title: '操作成功',
			icon: 'none',
			duration: 1000
		});
		setTimeout(()=>{
			paging.value.reload(true)
		},500)
	}
}

//催发货
const apiUrgeShipmentAc = (id)=>{
	const param = {
		id:id
	}
	const res = apiUrgeShipment(param)
	if(res.code === 200){
		uni.showToast({
			title: '操作成功',
			icon: 'none',
			duration: 1000
		});
		setTimeout(()=>{
			paging.value.reload(true)
		},500)
	}
}
const apiConfirmReceivedAc =async (id)=>{
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		id: id
	}
	const res = await apiConfirmReceived(param)
	if(res.code === '200'){
		uni.showToast({
			title: '操作成功',
			icon: 'success',
			duration: 1000
		})
		setTimeout(()=>{
			paging.value.reload(true)
		},500)
	}
}

const apiCheckPayAc = async(id)=>{
	const param = {
		id:id
	}
	const res = await apiCheckPay(param)
	if(res.code === '200'){
		return false
	}
	if(res.code === '201'){
		uni.showToast({
			title: '订单已售',
			icon: 'success',
			duration: 1000
		})
		return true
	}
}

const orderLx = ref()
const orderType = ref()
onLoad((options) => {
  // 页面参数
  const order = options.order;
  const yjOrder = options.yj;
  const shOrder = options.sh;
  // 根据传递过来的参数设置 activeTab1Index 的值和展示对应的标签页
  if (order) {
	orderLx.value = order
    // 展示'custom'和'all'类型的标签页
    classlist.value = classlist.value.filter((item) => item.type === 'custom' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === order);
    title.value = '采购订单';
	console.log('采购订单')
	orderType.value = 'custom'
    // getOrderList(order, 'custom');
  } else if (yjOrder) {
    orderLx.value = yjOrder
	// 展示'yj'和'all'类型的标签页
	classlist.value = classlist.value.filter((item) => item.type === 'yj' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === yjOrder);
    title.value = '议价订单';
	console.log('议价订单')
	orderType.value = 'yj'
    // getOrderList(yjOrder, 'yj');
  } else if (shOrder) {
    orderLx.value = shOrder
	// 展示'sh'和'all'类型的标签页
	classlist.value = classlist.value.filter((item) => item.type === 'sh' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === shOrder);
    title.value = '售后订单';
	console.log('售后订单')
	orderType.value  = 'sh'
    // getOrderList(shOrder, 'sh');
  } else {
    activeTab1Index.value = 0;
    // 展示所有类型的标签页
    classlist.value = classlist.value;
  }
});

onShow(()=>{
		
	if(paging&&paging.value){
		paging.value.reload(true)
	}
})

</script>

<style lang="scss" scoped>
.order-layout{
	box-sizing: border-box;
	background: #f3f2f6;
	min-height: 100vh;
	// .search {
	// 	margin-top: 30rpx;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	height: 72rpx;
	// 	width: 750rpx;
	// 	box-sizing: border-box;
	// 	padding-left: 20rpx;
	// 	padding-right: 20rpx;
	// 	margin-bottom: 20rpx;
	// 	.searchBar {
	// 		width: 618rpx;
	// 		height: 72rpx;
	// 		background: #ffffff;
	// 		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.05);
	// 		border-radius: 20rpx 20rpx 20rpx 20rpx;
	// 		border: 2rpx solid #242424;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;
	// 		.position {
	// 			padding: 0 20rpx;
	// 			display: flex;
	// 			justify-content: center;
	// 			align-items: center;
	// 			.position-text {
	// 				height: 44rpx;
	// 				font-family: PingFang SC, PingFang SC;
	// 				font-weight: 400;
	// 				font-size: 32rpx;
	// 				color: #1f1f1f;
	// 			}
	// 			.position-image {
	// 				margin-left: 10rpx;
	// 				width: 20rpx;
	// 				height: 20rpx;
	// 			}
	// 		}
			
	// 		.right{
	// 			display: flex;
	// 			align-items: center;
	// 			.inline {
	// 				margin-right: 30rpx;
	// 				width: 2rpx;
	// 				height: 28rpx;
	// 				background: #eeeeee;
	// 				border-radius: 10rpx 10rpx 10rpx 10rpx;
	// 			}
	// 			image{
	// 				margin-right: 30rpx;
	// 				// border: 1rpx solid black;
	// 				height: 30rpx;
	// 				width: 30rpx;
	// 			}
	// 		}
	// 		.search-content {
	// 			display: flex;
	// 			justify-content: center;
	// 			align-items: center;
	// 			padding: 0 20rpx;
	// 			.search-image {
	// 				width: 30rpx;
	// 				height: 30rpx;
	// 				margin-right: 15rpx;
	// 			}
	// 			.search-content-text {
	// 				width: 400rpx;
	// 				height: 36rpx;
	// 				font-family: PingFang SC, PingFang SC;
	// 				font-weight: 400;
	// 				font-size: 26rpx;
	// 				color: #1F1F1F;
	// 				text-align: left;
	// 				opacity: 0.6;
					
	// 			}
	// 		}
			
		
	// 	}
	// 	.select-btn {
	// 		width: 72rpx;
	// 		height: 72rpx;
	// 		background: #ffffff;
	// 		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255, 255, 255, 0.16);
	// 		border-radius: 10rpx 10rpx 10rpx 10rpx;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		image {
				
	// 			height: 36rpx;
	// 			width: 32rpx;
	// 		}
	// 	}
	// }
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
	
	.tabs{
		background: #f3f2f6;
		margin-bottom: 18rpx;
	}
	.card{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			// border: 1rpx solid red;
			height: 84rpx;
			margin-left: 24rpx;
			width: 662rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #EEEEEE;
			.left{
				display: flex;
				align-items: center;
				// border: 1rpx solid black;
				
				flex-wrap: nowrap;
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: left;
				}
				image{
					margin-left: 10rpx;
					height: 20rpx;
					width: 20rpx;
				}
			}
			.right{
				display: flex;
				align-items: center;
				// border:1rpx solid red;
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
					margin-right: 20rpx;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #E6432E;
					text-align: right;
					// margin-right: 20rpx;
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
				width: 34%;
				// margin-right: 26rpx;
				border-radius: 18rpx;
				border: 18rpx; 
				height: 190rpx;
				width: 190rpx;
				image {
					// border: 2rpx solid pink;
					height: 100%;
					width: 100%;
				}
			}
			.product-card-r {
				width: 66%;
				height: 190rpx;
				// border: 1rpx solid black;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					display: inline-block;
					.top-tap {
						float: left;
						height: 40rpx;
						// width: 64rpx;
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
							// height: 32rpx;
							position: relative;
							// margin-bottom: 13rpx;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #9B9B9B;
								text-align: left;
								vertical-align: bottom;
							}
							.divil{
								width: 100%;
								height: 2rpx;
								background: #9B9B9B;
								border-radius: 0rpx 0rpx 0rpx 0rpx;
								position: absolute;
								bottom: 10rpx;
								left: 0;
							}
							
						}
						
						
					}
					.bottom-r {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 22rpx;
						color: #1f1f1f;
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

}
</style>