<template>
	<view class="finance-layout">
		<!-- header -->
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view class="bar-icon" @click="goBack">
					<image class="img" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill"></image>
				</view>
				<view class="name"  @click="selectTitle(index)" :class="{ 'selected': selectedTitileIndex === index }" v-for="(item,index) in titleChange" :key="index">
					<text>{{item}}</text>
				</view>
				<view class="fill">
					<text>未对账</text>
				</view>
			</view>
		</view>
		<view :style="{height:getStatusBarHeight()+getTitleBarHeight()+'px'}"></view>
		
		 <view class="search-fill" style="height: 140rpx; background: #ffffff; width: 100%">
			<view class="search">
				<view class="search-content" style="padding-left: 20rpx;">
					<!-- <view style="display: flex;align-items: center;justify-content: space-between;">
						<uni-data-select class="data-select" v-model="searchSelectValue" :localdata="range" @change="change" :clear="false"></uni-data-select>
					</view>
					<view class="divile" /> -->
					<view class="right" style="width: 580rpx;">
						<image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp" style="width: 100%;">
							<qiaoSelect
								:keyId="1"
								:dataList="orgArray"
								phText="请输入串号搜索"
								:searchKey="searchModelKey"
								:showField="showModelField"
								:showBorder="false"
								:disabled="false"
								@input="handleInput"
								@change="selectChange"
							></qiaoSelect>
						</view>
					</view>
				</view>
				<view class="image-right" @click="selectSaiXuan">
					<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFill"></image>
				</view>
			</view>
		 </view>
		 
		
		<view style="background-color: #f3f3f3;height: 1070rpx;width: 100%;">
		<z-paging
		  ref="paging"
		  :default-page-size = "20"
		  show-refresher-update-time
		  :fixed="false"
		  v-model="dataList"
		  @query="queryList"
		>
		
		<view class="card" v-for="(item,index) in dataList" :key="index">
			<view class="title">
				<view class="left">
					<image src="https://www.xzxskj.com/xcximg/icon_info@3x.png" mode="aspectFill"></image>
					<text>客户：{{item.khname}} {{item.khphone}}</text>
				</view>
				<view class="right">
					<text>{{titleChange[selectedTitileIndex]}}</text>
					<view class="right" style="margin-left:20rpx" @click="item.selected = !item.selected"  v-if="titleChange[selectedTitileIndex]==='未对账'" >
						<image style="height: 32rpx;width: 32rpx;" v-if="item.selected" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel_new@3x.png" mode="aspectFill"></image>
						<image style="height: 32rpx;width: 32rpx;" v-else src="https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			
			<view class="content" v-for="(item1,index) in item.goodslist" :key="index"  @click="goPath('/pagesFinanceDetail/financeDetail/financeDetail?data='+item.id)">
				<view class="content-title">
					<view v-if="item1.finenessname" class="tap">
						<text>{{item1.finenessname}}</text>
					</view>
					<text>{{item1.name}}</text>
				</view>
				<view class="imei">
					<text>IMEI：{{item1.ch}}</text>										
					<image style="margin-left: 10rpx;" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<view class="describe">
					<text>采购：{{item1.cgyname}}</text>
					<text v-if="item1.ckame">仓库：{{item1.ckame}}</text>
				</view>
				<view class="price">
					<view class="left">
						<text class="text-1">批发价:</text>
						<text class="text-2">￥</text>
						<text class="text-3">{{item1.price}}</text>
					</view>
				<!-- 	<view class="right">
						<view class="right" @click="item1.selected = !item1.selected">
							<image v-if="item1.selected" src="/pagesFinance/static/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
							<image v-else src="/pagesFinance/static/icon_xuanze_nor@3x.png" mode="aspectFill"></image>
						</view>
					</view> -->
				</view>
			</view>
			<view class="remark">
				<image src="https://www.xzxskj.com/xcximg/icon_shou@3x.png" mode="aspectFill"></image>
				<view style="{clear:both}"/>
				<text class="text-1">{{item.ygname?item.ygname:'线下支付'+' '}}</text>
				<text class="text-2">{{item.remark}}</text>
			</view>
			
			<view class="product-num">
				<view class="left">
					<text>商品数量：{{item.num}}</text>
				</view>
				<view class="right">
					<text class="text-1">收款金额：</text>
					<text class="text-2">￥{{item.price}}</text>
				</view>
			</view>
			
			<view class="btns"  v-if="titleChange[selectedTitileIndex]==='未对账'" >
				<view style="width: 152rpx;">
					<button hover-class="is-hover" class="btn button-animation" @click="debounceCheck(item.id)">
					    核对无误
					</button>

				</view>
			</view>
		</view>
		</z-paging>
		</view>
		
		<view style="height: 258rpx;"/>
		<!-- btn -->
		<view class="bottom-btn">
			<view class="top">
				<view class="left">
					<view class="text-1">
						<text class="text-class-1">数量:</text>
						<text class="text-class-2">{{selectedQuantity}}</text>
						<text class="text-class-1">台</text>
					</view>
					
					<view class="text-1">
						<text class="text-class-1">合计:</text>
						<text class="text-class-2">￥{{ selectedTotalPrice }}</text>
					</view>
				</view>
				<view class="right">
					<view class="right" @click="toggleAllSelected">
						<view v-if="allSelected" class="circular" style="width: 32rpx; height: 32rpx; border-radius: 18rpx; border: 2rpx solid #D2CFCA;">
							<image style="height: 32rpx; width: 32rpx;border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel_new@3x.png" mode="aspectFill"></image>
						</view>
						<view v-else class="circular" style="width: 32rpx; height: 32rpx; border-radius: 18rpx; border: 2rpx solid #D2CFCA;"></view>
						<text>全选</text>
					</view>
				</view>
			</view>
			<view class="content" v-if="titleChange[selectedTitileIndex]==='未对账'" >
				<button class="left-btn" hover-class="is-hover">
					账单导出
				</button>
				<button class="right-btn" hover-class="is-hover" @click="batchComfirm">
					批量对账
				</button>
			</view>
			
			<view class="content" v-else>
				<button class="center-btn" hover-class="is-hover">账单导出</button>
			</view>
		</view>
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saixuanPannelPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
			<view >
				<saixuanPannel :cgyglist="cgyglist" :cklist="cklist" @selectedConfirm="selectedConfirm" :xsyglist="xsyglist" v-if="showSaiXuan" @close="handleClose" ></saixuanPannel>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { debounce } from '@/utils/debounce.js'
import { apiFinanceList,apiFinanceCheck } from '../api/api.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
import { saixuanPannel } from './components/saixuan-pannel.vue'
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { financeReconciliationSearch,financeReconciliationSelect } from '../api/api.js'
const searchModelKey = ref('ch')
const showModelField = ref('ch')
const saixuanPannelPopup = ref(null)
const showSaiXuan = ref(false)
const handleClose = () => {
	console.log('Popup is closed');
	saixuanPannelPopup.value.close();
	
};
const pannelChange = (e)=>{
	if(!e.show){
		showSaiXuan.value = e.show
	}
}
const selectSaiXuan = () => {
	showSaiXuan.value = true
	saixuanPannelPopup.value.open();
};
const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(false);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiFinanceListData(pageNo - 1);
	paging.value.complete(data);
	dataList.value = dataList.value.map(item=>({...item,selected: allSelected.value}))
	// dataList.value.forEach(item => {
	// 	if (item.goodslist && Array.isArray(item.goodslist)) {
	// 	item.goodslist = item.goodslist.map(goods => ({ ...goods, selected: allSelected.value }));
	//   }
	// });
};
const selectedTitileIndex = ref(0)
const titleChange = ref([
	'未对账','已对账'
])
const selectTitle = (index)=>{
	selectedTitileIndex.value = index
	paging.value.reload(true)
}
const searchSelectValue =  ref(0)
const range = ref([
	{ value: 0, text: "串号搜索" },
	{ value: 1, text: "串号搜索" },
	{ value: 2, text: "串号搜索" },
])
const change=(e)=>{
  console.log("e:", e);
}
const orgArray = ref([
])
const selectChange = (e)=>{
	console.log(e);
	financeReconciliationSelectAc(e.id)
}

const toggleAllSelected = () => {
  allSelected.value = !allSelected.value;
  dataList.value.forEach(item => {
	item.selected = allSelected.value;
    // if (item.goodslist && Array.isArray(item.goodslist)) {
    //   item.goodslist.forEach(goods => {
    //     goods.selected = allSelected.value;
    //   });
    // }
  });
};

watch(dataList, (newList) => {
  // 检查是否所有商品都被选中
  // allSelected.value = newList.every(item => item.goodslist.every(goods => goods.selected));
  allSelected.value = newList.every(item => item.selected);
}, { deep: true });
const goBack = () => {
  uni.navigateBack();
};
const goPath = (path) =>{
	uni.navigateTo({
		url:path
	})
}

// 计算选中商品的数量和合计金额
const selectedQuantity = computed(() => {
  let quantity = 0;
  dataList.value.forEach(item => {
	if (item.selected) {
	  quantity += 1;
	}
    // if (item.goodslist && Array.isArray(item.goodslist)) {
    //   item.goodslist.forEach(goods => {
    //     if (goods.selected) {
    //       quantity += 1;
    //     }
    //   });
    // }
  });
  return quantity;
});

const selectedTotalPrice = computed(() => {
  let totalPrice = 0;
  dataList.value.forEach(item => {
	if (item.selected) {
	  totalPrice += parseFloat(item.price);
	}
    // if (item.goodslist && Array.isArray(item.goodslist)) {
    //   item.goodslist.forEach(goods => {
    //     if (goods.selected) {
    //       totalPrice += parseFloat(goods.price);
    //     }
    //   });
    // }
  });
  return totalPrice.toFixed(2); // 保留两位小数
});
const cgyglist = ref([])
const cklist = ref([])
const xsyglist = ref([])
const skkssj = ref('')
const skjssj = ref('')
const ckid = ref('')
const ygid = ref('')
const cgid = ref('')
const zffs = ref('')
const apiFinanceListData = async (start) => {
	const param = {
		lx: selectedTitileIndex.value+1,
		start: start.toString(),
		skkssj: skkssj.value,
		skjssj: skjssj.value,
		ckid:ckid.value,
		ygid:ygid.value,
		cgid:cgid.value,
		zffs:zffs.value//1支付宝2微信 3收款码
	}
  const res = await apiFinanceList(param);
  console.log('res:', res);
  if (res.code === '200') {
	cgyglist.value = res.cgyglist
	cklist.value = res.cklist
	xsyglist.value = res.xsyglist
    return res.lists;
  }else{
	  return []
  }
};

const apiFinanceCheckData = async (orderId) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		orderid: orderId,
	}
  const res = await apiFinanceCheck(param);
  console.log('res:', res);
  if (res.code === '200') {
	uni.showToast({
		title: '对账成功',
		icon: 'success',
		duration: 500
	});
	setTimeout(()=>{
		paging.value.refresh(true)
	},500)
  }
};
const debounceCheck = debounce((orderId) => {
	check(orderId)
}, 300,true);
// const debounceCheck = debounce(check, 300,true);
const check = (orderId)=>{
	apiFinanceCheckData(orderId)
}
const selectedConfirm = (data)=>{
	console.log('selectedConfirm',data)
	skkssj.value = data['开始时间戳']
	skjssj.value = data['结束时间戳']
	ckid.value = data['仓库'].join(',')
	ygid.value = data['销售员工'].join(',')
	cgid.value = data['采购员工'].join(',')
	zffs.value = data['收款方式'].join(',')
	paging.value.reload(true)
}

const financeReconciliationSearchAc =async (search)=>{
	const data = {
		lx:selectedTitileIndex.value+1,//1未对账 2已对账
		start:'0',
		search:search
	}
	const res = await financeReconciliationSearch(data)
	const result = []
	if(res.code === '200'){
		res.lists.forEach(item=>{
			item.ch.split(',').forEach(item1=>{
				result.push(
					{
						ch:item1,
						id:item.id
					}
				)
			})
		})
	}
	orgArray.value = result
}

const financeReconciliationSelectAc = async (id)=>{
	const data = {
		id:id,//搜索出来返回里面的ID
		lx:selectedTitileIndex.value+1//1未对账 2已对账
	}
	const res = await financeReconciliationSelect(data)
	console.log('select res:',res)
	if(res.code === '200'){
		dataList.value = res.lists
	}
}
const handleInput = (inputText) => {
	console.log('输入框内容:', inputText);
	if (inputText.length > 0) {
		financeReconciliationSearchAc(inputText);
	}
};
const batchComfirm = ()=>{
	const ids = dataList.value.filter(item => item.selected).map(item => item.id).join(', ');    
	apiFinanceCheckData(ids)
}
onShow(()=>{
	paging.value.refresh(false);
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.finance-layout {
	min-height: 100vh;
	background: #F3F2F6;
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		background: #FFFFFF;
		.titleBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			.bar-icon {
				width: 33.333%;
				.img {
					height: 32rpx;
					width: 32rpx;
				}
			}
			.name {
				width: 33.333%;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: center;
				opacity: 0.5;
				transition: all 0.3s;
				&.selected{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 40rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 1;
				}
			}
			.fill {
				width: 33.333%;
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
				text-align: center;
				opacity: 0;
			}
		}
	}

	
	.card{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 14rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		.title{
			display: flex;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				image{
					height: 24rpx;
					width: 20rpx;
					margin-right: 10rpx;
				}
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
			.right{
				display: flex;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #E6432E;
					text-align: right;
				}
			}
		}
		.content{
			margin-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 24rpx;
			padding-bottom: 20rpx;
			width: 670rpx;
			background: #F5F5F5;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			flex-direction: column;
			.content-title{
				display: flex;
				align-items: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.tap{
					background: linear-gradient( 132deg, #D94C24 0%, #FF5221 100%);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					height: 32rpx;
					margin-right: 10rpx;
					padding-left: 8rpx;
					padding-right: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #FFFFFF;
						text-align: center;
					}
				}
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
			.imei{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #828282;
				text-align: left;
				margin-right: 10rpx;
				image{
					height: 20rpx;
					width: 20rpx;
				}
			}
			.describe{
				margin-top: 14rpx;
				display: flex;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #828282;
					text-align: left;
					margin-right: 40rpx;
				}
			}
			.price{
				margin-top: 14rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left{
					.text-1{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #1F1F1F;
						text-align: left;
						margin-right: 10rpx;
					}
					.text-2{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #E6432E;
						text-align: left;
						margin-right: 4rpx;
					}
					.text-3{
						font-family: DIN, DIN;
						font-weight: bold;
						font-size: 32rpx;
						color: #E6432E;
						text-align: left;
					}
				}
				.right{
					display: flex;
					align-items: center;
					image{
						height: 32rpx;
						width: 32rpx;
					}
				}
			}
			
		}
		.remark{
			display: inline-block;
			margin-top: 20rpx;
			image{
				float: left;
				width: 28rpx;
				height: 32rpx;
				margin-right: 6rpx;
			}
			.text-1{
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: left;
				vertical-align: top;
			}
			.text-2{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: left;
				opacity: 0.7;
				vertical-align: top;
			}
		}
		.product-num{
			margin-top: 20rpx;
			height: 84rpx;
			border-top: 2rpx solid #EEEEEE;
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
			.right{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.text-1{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: right;
				}
				.text-2{
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #E6432E;
					text-align: left;
				}
			}
		}	
		.btns{
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.btn{
				height: 60rpx;
				background: linear-gradient( 89deg, #ED784B 0%, #EB4636 100%);
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				
			}
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
		.top{
			display: flex;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				.text-1{
					margin-right: 40rpx;
					display: flex;
					align-items: center;
					.text-class-1{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: left;
					}
					.text-class-2{
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 32rpx;
						color: #EB4636;
						text-align: left;
					}
				}
			}
		
			.right{
				flex: 1;
				display: flex;
				justify-content: flex-end;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
					margin-left: 10rpx;
				}
			}
		}
	
		.content{
			margin-top: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.center-btn{
				width: 710rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}
			.left-btn{
				width: 202rpx;
				height: 96rpx;
				background: #F2F3F6;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 16rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: center;
			}
			.right-btn{
				width: 492rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				
			}
			.center-btn{
				width: 710rpx;
				height: 96rpx;
				background: #F2F3F6;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: center;
			}
		}
	}
	
	
	.btn,
	.left-btn,
	.center-btn,
	.right-btn {
	  transition: background-color 0.3s, box-shadow 0.3s;
	
	  &:active { 
	    background-color: #EB4636; 
	    color: #FFF;
	    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	  }
	
	  &.is-hover {
	    color: rgba(255, 255, 255, 0.6);
	    background-color: #179b16;
	  }
	}
	.btn,
	.left-btn,
	.center-btn,
	.right-btn {
	  transition: all 0.3s ease; 
	}

}

.search-fill {
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	margin-top: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-right: 20rpx;
	margin-bottom: 20rpx;
	width: 100%;
	height: 72rpx;
	.search-content {
		width: 618rpx;
		height: 72rpx;
		background: #ffffff;
		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59, 43, 15, 0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 2rpx solid #242424;
		display: flex;
		align-items: center;
		::v-deep .uni-select__selector {
			z-index: 20;
		}
		.data-select {
			height: 72rpx;
			width: 190rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
			::v-deep .uni-select {
				border: none;
			}
		}
		.divile {
			width: 2rpx;
			height: 28rpx;
			background: #eeeeee;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			margin-right: 20rpx;
		}
		.right {
			display: flex;
			align-items: center;
			image {
				height: 30rpx;
				width: 30rpx;
				margin-right: 16rpx;
			}
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				color: #1f1f1f;
				text-align: left;
				opacity: 0.6;
			}
		}
	}
	.image-right {
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72rpx;
		height: 72rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255, 255, 255, 0.16);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
}

</style>
