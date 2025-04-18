<template>
	<view class="refund-layout">
		<view class="title">
			<view class="left">
				<text>申请退款</text>
			</view>
			<view class="right">
				<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
			</view>
		</view>
		<view class="price">
			<view class="left">
				<text>退款金额</text>
			</view>
			<view class="right">
			<!-- 	<text>¥ 2565.08</text> -->
				<input class="price-input" type="number" v-model="getPrice" disabled>
				<image src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="remark">
			<view class="top">
				<text>申请理由</text>
			</view>
			<textarea class="texta" placeholder="请输入..." v-model="remark"></textarea>
		</view>
		
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn" @click="comfirm">
				<text>提交申请</text>
			</view>
		</view>
	</view>
</template>


<script setup>
import { apiRefund } from '../../api/api.js'
import { apiOrderRefundPay } from '../../api/api.js';
import { computed } from 'vue';
const propos = defineProps({
  itemIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['close'])
const orderInfo = ref(null)
const remark = ref('')
const getPrice = computed(()=>{
	if(orderInfo.value){
		if(propos.itemIndex === -1){
			return "￥"+ orderInfo.value.price
		}else{
			return "￥"+ orderInfo.value.goodsinfos[propos.itemIndex].price
		}
	}
})
// const comfirm =async ()=>{
// 	console.log(' propos.itemIndex', propos.itemIndex);
	
// 	const param = { 
// 		id: propos.itemIndex===-1? orderInfo.value.id:orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
// 		opid: uni.getStorageSync('sessionInfo').opid,
// 		lx: propos.itemIndex===-1?1:2,
// 		remarks: remark.value,
// 	};
// 	const res =await apiOrderRefundPay(param)
// 	console.log('res:',res);
// 	if(res.code===200){
// 		uni.showToast({
// 			title: '退款申请提交成功',
// 			icon: 'success',
// 			duration: 3000,
// 		  });
		  
// 	}else {
//       // 退款申请失败
//       uni.showToast({
//         title: '退款申请提交失败',
//         icon: 'error',
//         duration: 3000,
//       });
//     }
// 	emit('close');
// }

const comfirm =async ()=>{
	console.log(' propos.itemIndex', propos.itemIndex);
	console.log('orderInfo.value',orderInfo.value)
	const param = { 
		// id: propos.itemIndex===-1? orderInfo.value.id:orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
		id: orderInfo.value.orderid,
		opid: uni.getStorageSync('sessionInfo').opid,
		lx: propos.itemIndex===-1?1:2,
		goodsid:propos.itemIndex===-1?orderInfo.value.goodsinfos.map(item=>item.goodsid).join(','):orderInfo.value.goodsinfos[propos.itemIndex].goodsid,
		remarks: remark.value,
	};
	console.log('param',param)
	const res =await apiRefund(param)
	console.log('res:',res);
	if(res.code===200){
		uni.showToast({
			title: '退款申请提交成功',
			icon: 'success',
			duration: 500,
		  });
	}else {
      // 退款申请失败
      uni.showToast({
        title: '退款申请提交失败',
        icon: 'error',
        duration: 500,
      });
    }
	setTimeout(()=>{emit('close');},500)
}

onMounted(()=>{
	const itemString = uni.getStorageSync('orderDetailItem'); 
	// console.log('itemString:',itemString);
	if (itemString) {
		orderInfo.value = JSON.parse(itemString)
	}
}) 
</script>

<style lang="scss" scoped>
.refund-layout{
	width: 750rpx;
	height: 738rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	box-sizing: border-box;
	display: flex;
    flex-direction: column;
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	
	.title{
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
			image{
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	
	.price{
		box-sizing: border-box;
		margin-top: 40rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:28rpx 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			// border: 1rpx solid red;
			display: flex;
			align-items: center;
			.price-input{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				margin-right: 20rpx;
			}
			image{
				// border: 1rpx solid red;
				height: 28rpx;
				width: 28rpx;
			}
		}
	}
	.remark{
		margin-top: 16rpx;
		width: 710rpx;
		height: 278rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top:28rpx;
		.top{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.texta{
			margin-top: 20rpx;
			width: 662rpx;
			height: 156rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
		}
	}

	.pannel-btn{
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
		padding: 24rpx 30rpx 62rpx 30rpx;
		.btn {
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
	}
		
}
</style>

