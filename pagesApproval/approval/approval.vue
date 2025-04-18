<template>
	<view class="Approval-layout">
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
		
		<view style="background-color: #f3f3f3;height: 1400rpx;width: 100%;">
		<z-paging
		  ref="paging"
		  show-refresher-update-time
		  :fixed="false"
		  v-model="dataList"
		  @query="queryList"
		>
		
		<view class="card" v-for="(item,index) in dataList" :key="index">
			<view class="title">
				<view class="left">
					<!-- <image src="/pagesFinance/static/icon_info@3x.png" mode="aspectFill"></image> -->
					<text>订单号：{{item.ordernumber}}</text>
				</view>
				<view class="right">
					<text>{{titleChange[selectedTitileIndex]}}</text>
				</view>
			</view>
			<!--  @click="goPath('/pagesFinanceDetail/financeDetail/financeDetail')" -->
			<view class="content" v-for="(item1,index) in item.gwclist" :key="index">
				<view class="content-title">
					<view v-if="item1.goodsinfos.finenessname" class="tap">
						<text>{{item1.goodsinfos.finenessname}}</text>
					</view>
					<text>{{item1.goodsinfos.name}}</text>
				</view>
				<view class="imei" >
					<text>IMEI：{{item1.goodsinfos.ch}}</text>
					<image style="margin-left: 10rpx;" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<view class="describe" >
					<text>采购：{{item1.goodsinfos.cgyname}}</text>
					<text v-if="item1.ckame">仓库：{{item1.goodsinfos.ckname}}</text>
				</view>
				<view class="price">
					<view class="left">
						<text class="text-1">批发价:</text>
						<text class="text-2">￥</text>
						<text class="text-3">{{item1.goodsinfos.price}}</text>
					</view>
				</view>
			</view>
			<view class="remark">
				<view style="{clear:both}"/>
				<!-- <text class="text-1">{{item.goodsinfos.ygname}}：</text> -->
				<text class="text-2">{{item.remarks}}</text>
			</view>
			
			<view class="product-num">
				<view class="left">
					<text>商品数量：{{item.num}}</text>
				</view>
				<view class="right">
					<text class="text-1">审核金额：</text>
					<text class="text-2">￥{{item.price}}</text>
				</view>
			</view>
			<!-- v-if="titleChange[selectedTitileIndex]==='未审核'" -->
			<view class="btns" style="display: flex;justify-content: space-between;align-items: center;" v-show="lx.value === '1'">
				<text>申请人: {{item.sqrname}}</text>
				<view style="width: 152rpx;" v-if="lx==='1'">
					<button hover-class="is-hover" class="btn button-animation" @click="debounceCheck(item.id)">
						审核
					</button>
				</view>
			</view>
		</view>
		</z-paging>
		</view>
	</view>
</template>

<script setup>
import { debounce } from '@/utils/debounce.js'
import { apiGetApprovalList,apiApproval } from '../api/api.js'
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
const selectedTitileIndex = ref(0)
const titleChange = ref([
	'未审批','已审批'
])
const lx = ref('1')
const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiGetApprovalListAc(pageNo-1)
	paging.value.complete(data);
};

const selectTitle = (index)=>{
	selectedTitileIndex.value = index
	lx.value = index+1
	if(paging&&paging.value){
		paging.value.reload(true)
	}
}

const goBack = () => {
  uni.navigateBack();
};
const goPath = (path) =>{
	uni.navigateTo({
		url:path
	})
}
const debounceCheck = debounce((orderId) => {
	check(orderId)
}, 300,true);
const check = (id)=>{
	uni.showModal({
	  content: '确认退款',
	  showCancel: false,
	  success: (res) => {
	    if (!res.cancel) {
	      // 用户点击了确认
			console.log('用户点击了确认');
			apiApprovalAc(id)
	    }
	  }
	});
}

const lists = ref([])

const apiApprovalAc =async (id)=>{
	const param = {
		id:id
	}
	const res = await apiApproval(param)
	if(res.code === 200){
		uni.showToast({
			title:'操作成功',
			icon:'success',
			duration: 500
		})
		setTimeout(()=>{
			paging.value.reload(true)
		},500)
	}
	if(res.code === 201){
		uni.showToast({
			title: res.msg,
			icon:'error',
			duration: 1000
		})
	}
}

const apiGetApprovalListAc =async (start)=>{
	const param = {
		lx:lx.value,//1未操作 2 已操作
		start:start
	}
	const res = await apiGetApprovalList(param)
	if(res.code==='200'){
		return res.lists
	}
	
	return []
}
onShow(()=>{
	if(paging&&paging.value){
		paging.value.reload(true)
	}
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.Approval-layout {
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
