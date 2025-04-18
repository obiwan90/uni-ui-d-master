<template>
	<view class="account-layout pageBg">
		<z-paging ref="paging" :default-page-size = "10" show-refresher-update-time v-model="dataList" @query="queryList">
		<!-- header -->
			
		<template #top>
			<custom-header>
				<template #name>我的账户</template>
				<template #fill>我的账户</template>
			</custom-header>
			<!-- price-card -->
			<view class="price-card">
				<view class="title">
					<text>125.5</text>
				</view>
				<view class="mid">
					<view class="price-tabs" v-for="(item,index) in priceData" :key="index">
						<text class="text-1">{{item.text}}</text>
						<text v-if="item.text !== '钱包金额(元)'" class="text-2">{{item.price}}</text>
					</view>
				</view>
				<view class="bottom">
					<view class="btn1" @click="withdrawal">
						<text>提现</text>
					</view>
					<view class="btn2">
						<text>充值</text>
					</view>
				</view>
			</view>
			<view class="accout-log">
				<view class="top">
					<view class="left">
						<text>账单明细</text>
					</view>
					<view class="right">
						<image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
						<image src="https://www.xzxskj.com/xcximg/icon_shaixuan@3x.png" mode="aspectFill" @click="openShaiXuan" ></image>
					</view>
				</view>
			
				<!-- tabs: scrollable='false'-->
				<view class="tabs">
					<uv-tabs
						class="cus-tab"
						:list="from=='user'?userClasslist:customerClasslist"
						lineWidth="30" 
						lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)" 
						lineHeight="3"
						:fontSize="32"
						:inactiveStyle="{
							color: '#1F1F1F',
							opacity: 0.6
						}"
						:activeStyle="{ color: '#1F1F1F',opacity: 1,fontWeight: 'bold'}"
						@change="uvTabs1Change"
						:current="activeTab1Index"
					></uv-tabs>
				</view>
			</view>
		</template>
		
		<!-- log-card -->
		<view class="log-card">
			<view class="titile">
				<view class="left">
					<view class="left-top">
						
						<picker
						@change="onTimeChange1" 
						mode="date" 
						fields="month"
						:value="pickerValue">
							<text class="text-1">{{pickerValue.split('-')[0]}}</text>
							<text class="text-2">年</text>
							<text class="text-1">{{pickerValue.split('-')[1]}}</text>
							<text class="text-2">月</text>
							<image src="https://www.xzxskj.com/xcximg/icon_xialamo@3x.png" mode="aspectFill"></image>
							<!-- <text>{{pickerStartValue}}</text> -->
						</picker>
						
					</view>
					<view class="left-bottom" style="display: flex;gap: 20rpx;align-items: center;">
						<text class="text-3">收入：¥{{sr}}</text>
						<text class="text-3">支出：¥{{zc}}</text>
					</view>
				</view>
				<view class="right">
					<view class="btn" @click="openExportLog">
						<image src="https://www.xzxskj.com/xcximg/export.png" mode="aspectFill"></image>
						<text>账单导出</text>
					</view>
				</view>
			</view>
			<view class="content-list">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="left">
						<image src="https://www.xzxskj.com/xcximg/icon_zhichu@3x.png" mode="aspectFill"></image>
						<view class="number">
							<view class="top">
								<text>{{item.lx+"  "+item.ddh}}</text>
							</view>
							<view class="bottom">
								<text>{{item.pay_time}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="top">
							<text>{{item.price}}</text>
						</view>
						<view class="bottom">
							<text>余额：1245</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		</z-paging>
	</view>
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="accountShaiXuanPopup" safe-area:false type="bottom" @close="handleClose" @change="change">
		<view >
			<accountShaiXuanPannel @close="handleClose" ></accountShaiXuanPannel>
		</view>
	</uni-popup>
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="exportLogPopup" safe-area:false type="bottom" @close="handleClose" @change="change">
		<view >
			<exportLogPannel v-if="showExport"  @close="handleClose" ></exportLogPannel>
		</view>
	</uni-popup>
</template>

<script setup>
import { accountShaiXuanPannel } from './components/accountShaiXuan.vue'
import {exportLogPannel } from './components/exportLog.vue'
import { apiGetBillList } from './api/api.js'
const paging = ref(null)
const scroll = ref(true)
const showExport = ref(true)
const accountShaiXuanPopup = ref(null)
const exportLogPopup = ref(null)
const dataList = ref([])
const handleClose = () => {
	console.log('Popup is closed');
	accountShaiXuanPopup.value.close();
	exportLogPopup.value.close();
};
const openShaiXuan = ()=>{
	accountShaiXuanPopup.value.open();
}
const openExportLog = ()=>{
	showExport.value = true
	exportLogPopup.value.open()
}
const change = (e)=>{
	scroll.value = !e.show
	if(!e.show){
		showExport.value = e.show
	
	}
}

const queryList = async (pageNo, pageSize) => {
  const classLists = from.value==='user'?userClasslist.value:customerClasslist.value
  const data = await apiGetBillListAc(classLists[activeTab1Index.value].lx,pageNo - 1)
  paging.value.complete(data);
};

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const defaultYearMonth = `${year}-${month}`;
const pickerValue = ref(defaultYearMonth)
const onTimeChange1 = (e)=>{
	console.log(e);
	pickerValue.value = e.detail.value
	paging.value.reload(true)
}
// 用户：全部 充值 提现 购机 议价 售后退款 议价退款 运费
// 供应商：全部 充值 提现 机款 售后退款 运费
//1全部2充值3提现4购机5议价6售后退款7议价退款8运费9其它
const userClasslist = ref([
	{name:'全部',lx:'1'},
	{name:'充值',lx:'2'},
	{name:'提现',lx:'3'},
	{name:'购机',lx:'4'},
	{name:'议价',lx:'5'},
	{name:'售后退款',lx:'6'},
	{name:'议价退款',lx:'7'},
	{name:'运费',lx:'8'},
	{name:'其他',lx:'9'}
]);
const customerClasslist = ref([
	{name:'全部',lx:'1'},
	{name:'充值',lx:'2'},
	{name:'提现',lx:'3'},
	{name:'机款',lx:'4'},
	{name:'售后退款',lx:'5'},
	{name:'运费',lx:'6'},
	{name:'其他',lx:'7'}
]);
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
const priceData = ref([
	{text:'钱包金额(元)',price:'125.5'},
	{text:'冻结金额(元)',price:'554'},
	{text:'可用金额(元)',price:'554'},
])
const activeTab1Index = ref(0);
const tabsData = computed(() => {
	return classlist.value.map((item) => ({
		name: item.name
	}));
});
const uvTabs1Change = (e) => {
	console.log('标签切换触发:', e.index);
	activeTab1Index.value = e.index;
	paging.value.reload(true)
};
const withdrawal = ()=>{
	uni.navigateTo({
		url:'/pagesWithdrawal/withdrawal/withdrawal'
	})
}
const sr = ref('')
const zc = ref('')

//用户明细列表
const apiGetBillListAc = async(lx,start)=>{
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		lx:lx,
		stattime:'',
		endtime:'',
		rq:pickerValue.value,
		start:start
	}
	const res = await apiGetBillList(param)
	console.log('res',res)
	if(res.code === 200){
		sr.value = res.sr
		zc.value = res.zc
		return res.lists
	} 
	return []
}
//供应商明细列表



const from = ref('')
onLoad((options) => {
    console.log('页面参数:', options);
    if (options.from) {
        console.log('从页面:', options.from);
		from.value = options.from
    }
});



</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.account-layout{
	width: 750rpx;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.price-card{
		margin-left: 20rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		background-image: url('https://www.xzxskj.com/Public/upload/6615004962a2e856.png');
		background-position: center;
		background-size: cover;
		width: 710rpx;
		height: 274rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 18rpx;
		.title{
			width: 100%;
			text{
				height: 68rpx;
				font-family: DIN, DIN;
				font-weight: bold;
				font-size: 56rpx;
				color: #FFFFFF;
				text-align: left;
			}
		}
		.mid{
			// border: 1rpx solid black;
			width: 100%;
			display: grid;
			grid-template-columns: 33.33% 33.33% 33.33%;
			justify-content: space-between;
			align-items: center;
			.price-tabs{
				margin-top: 14rpx;
				display: grid;
				grid-template-columns: auto auto;
				align-items: center;
				.text-1{
					// height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #FFFFFF;
					opacity: 0.6;
				}
				.text-2{
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}
		.bottom{
			
			// border: 1rpx solid red;
			margin-top: 20rpx;
			// margin-bottom: 15rpx;
			width: 100%;
			display: grid;
			grid-template-columns: auto auto;
			justify-content: space-between;
			.btn1{
				margin-left: 42rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 252rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 36rpx 36rpx 36rpx 36rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.btn2{
				margin-right: 42rpx;
				width: 252rpx;
				height: 72rpx;
				background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
				border-radius: 36rpx 36rpx 36rpx 36rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}
	}
	.accout-log{
		margin-left: 20rpx;
		width: 710rpx;
		height: 158rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding-top:18rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.top{
			padding-left: 22rpx;
			padding-right: 24rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				text{
					height: 50rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 36rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
			.right{
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 30rpx;
				image{
					height: 30rpx;
					width: 30rpx;
				}
			}
		}
		.tabs{
			width: 100%;
		}
	}
	.log-card{
		margin-left: 20rpx;
		margin-top: 10rpx;
		width: 710rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		box-sizing: border-box;
		
		.titile{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 150rpx;
			// border-bottom: 1rpx solid #EEEEEE;
			.left{
				margin-left: 20rpx;
				.text-1{
					height: 54rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 44rpx;
					color: #1F1F1F;
					text-align: left;
					margin-right: 10rpx;
				}
				.text-2{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					margin-right: 20rpx;
				}
				image{
					height: 16rpx;
					width: 24rpx;
					// border: 1rpx solid black;
				}
				.left-bottom{
					margin-top: 16rpx;
					.text-3{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
					}
				}
				
			}
			.right{
				margin-right: 24rpx;
				.btn{
					width: 164rpx;
					height: 60rpx;
					background: #FFFFFF;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					border: 2rpx solid #EEEEEE;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						height: 26rpx;
						width: 26rpx;
						border: 1rpx solid red;
						margin-right: 10rpx;
					}
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
			}
		}
	
		.content-list{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-left: 24rpx;
			padding-right: 24rpx;
			width: 100%;
			.list{
				height: 146rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				.left{
					display: flex;
					justify-content: space-between;
					align-items: center;
					image{
						height: 80rpx;
						width: 80rpx;
						// border: 1rpx solid black;
						margin-right: 20rpx;
					}
					.number{
						display: flex;
						flex-direction: column;
						.top{
							text{
								// height: 40rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #1F1F1F;
								text-align: left;
							}
						}
						.bottom{
							width: 100%;
							text{
								// height: 34rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #1F1F1F;
								// line-height: 44rpx;
								opacity: 0.4;
							}
						}
					}
					
				}
				.right{
					// border: 1rpx solid blue;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.top{
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 28rpx;
							color: #1F1F1F;
							text-align: right;
						}
					}
					.bottom{
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1F1F1F;
							text-align: right;
							opacity: 0.4;
						}
					}
				}
			}
		}
	}
}
</style>