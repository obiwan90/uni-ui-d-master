<template>
	<view class="bargainingPannel">
		<!-- title -->
		<view class="title">
			<text>议价</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		
		<!-- edit card -->
		<view class="edit-price">
			<view class="title">
				<text>议价金额</text>
			</view>
			<view class="content">
				<image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill"></image>
				<input type="number" placeholder="请输入议价金额" v-model="bargainingPrice"/>
				<!-- <text>请输入议价金额</text> -->
			</view>
			<view class="divile">
				
			</view>
		</view>
		<!-- parice-time -->
		<view class="parice-time">
		    <view class="title">
		      <text>议价时长</text>
		    </view>
		    <view class="content">
		      <view
		        class="tap"
		        v-for="(item, index) in bargainingList"
		        :key="index"
		        :class="{ 'selected': selectedTap === index }"
		        @click="selectTap(index)"
		      >
		        <text>{{item.name}}小时</text>
		        <image
		          v-if="selectedTap === index"
		          src="https://www.xzxskj.com/xcximg/icon_xuanzhong@3x.png"
		          mode="aspectFill"
		        ></image>
		      </view>
		    </view>
		  </view>
		<!-- rule -->
		<view class="price-rule">
			<view class="title">
				<text>议价规则</text>
			</view>
			<view class="content">
				<!-- <view class="list" v-for="(item,index) in 5" :key="index">
					<view class="radio"></view>
					<text>请选择对应的议价时长，并提前支付议价金额；</text>
				</view> -->
				<view class="list">
					<view class="radio"></view>
					<text>请选择对应的议价时长，并提前支付议价金额；</text>
				</view>
				<view class="list">
					<view class="radio"></view>
					<text>议价超时或失败将立即原路返还付款金额；</text>
				</view>
				<view class="list">
					<view class="radio"></view>
					<text>付款成功后，平台将在对应时间内确认订单；</text>
				</view>
				<view class="list">
					<view class="radio"></view>
					<text> 议价成功后默认购买成功，等待发货；</text>
				</view>
				<view class="list">
					<view class="radio"></view>
					<text>议价失败后，若该商品并未售出，可继续参与议价。</text>
				</view>
				
			</view>
		</view>
		
		<view style="height: 200rpx;">
			
		</view>
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn" @click="onConfirm">
				<text>继续议价</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
import { apiGetBargainingtime } from '../../api/api.js';
const propos = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
})
const isSelected = ref(false);
const bargainingPrice = ref()
const toggleSelected = () => {
	isSelected.value = !isSelected.value;
}
const onConfirm = ()=>{
	if (!bargainingPrice.value) {
	  uni.showToast({
	    title: '请输入议价金额',
	    icon: 'none'
	  })
	  return
	}
	if (selectedTap.value === null) {
	  uni.showToast({
	    title: '请选择议价时长',
	    icon: 'none'
	  })
	  return
	}
	
	let dataParam =ref({
		lx:'',
		id:'',
		bargainingtimeid:'',
		price:'',
		
	})
	dataParam.value.lx='1';
	dataParam.value.id=propos.id;
	dataParam.value.bargainingtimeid = bargainingList.value[selectedTap.value].id
	dataParam.value.price = bargainingPrice.value
	let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
	uni.navigateTo({
		url:'/pagesSubOrder/subOrder/subOrder?data='+queryString
	})
}
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const selectedTap = ref(null);
const timeList = ref([])
const bargainingList = ref([])
//议价时间
const getBargainingtime =async()=>{
	const res = await apiGetBargainingtime();
	if(res.code === 200){
		bargainingList.value = res.lists;
	}
}


const selectTap = (index) => {
  selectedTap.value = index;
};
onMounted(()=>{
	getBargainingtime()
})
</script>

<style lang="scss" scoped>
.bargainingPannel {
	box-sizing: border-box;
	width: 750rpx;
	height: 1100rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 30rpx;
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 60rpx;
		text{
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1F1F1F;
		}
		image{
			// border: 1rpx solid black;
			height: 32rpx;
			width: 32rpx;
		}
	}
	
	.product-card-list {
		box-sizing: border-box;
		margin-top: 20rpx;
		height: 238rpx;
		width: 690rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.06);
		padding: 24rpx 24rpx;
		margin-bottom: 20rpx;
		.product-card {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;
			.product-card-l {
				margin-right: 26rpx;
				// border: 2rpx solid red;
				border: 18rpx;
				image {
					height: 190rpx;
					width: 190rpx;
				}
			}
			.product-card-r {
				// border: 2rpx solid red;
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
					}
				}
			}
		}
	}
	
	.edit-price{
		width: 690rpx;
		height: 202rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		.title{
			margin-bottom: 36rpx;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
			}
		}
		.content{
			margin-bottom: 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				// border: 1rpx solid red;
				margin-right: 20rpx;
				height: 50rpx;
				width: 22rpx;
			}
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				opacity: 0.6;
			}
		}
		.divile{
			width: 630rpx;
			height: 2rpx;
			background: #EEEEEE;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
		}
	}
	
	.parice-time {
	  margin-top: 20rpx;
	  box-sizing: border-box;
	  width: 690rpx;
	  // height: 256rpx;
	  background: #FFFFFF;
	  box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
	  border-radius: 20rpx;
	  padding-left: 24rpx;
	  padding-right: 24rpx;
	  padding-top: 28rpx;
	  display: flex;
	  flex-direction: column;
	  margin-bottom: 30rpx;
	  .title {
		margin-bottom: 30rpx;
	    text {
	      height: 44rpx;
	      font-family: PingFang SC, PingFang SC;
	      font-weight: 400;
	      font-size: 32rpx;
	      color: #1F1F1F;
	    }
	  }
	  .content {
		   display: grid; 
		   grid-template-columns: auto auto auto auto; 
		   justify-content: space-between;
		   align-items: center; 
			
			.tap {
			    margin-bottom: 14rpx;
			    width: 150rpx; 
			    height: 58rpx;
			    background: #FFFFFF;
			    border-radius: 10rpx;
			    border: 2rpx solid #EEEEEE;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    position: relative;
			    text {
			        height: 36rpx;
			        font-family: PingFang SC, PingFang SC;
			        font-weight: 400;
			        font-size: 26rpx;
			        color: #1F1F1F;
			    }
			    image {
			        position: absolute;
			        height: 24rpx;
			        width: 24rpx;
			        right: -1rpx;
			        bottom: -1rpx;
			    }
			}
			
			// 选中时的样式
			.tap.selected {
			    border: 2rpx solid #E6432E;
			}
			
			// 选中时的图片样式
			.tap.selected image {
			    display: block;
			}
	  
	  }
	}
	
	.price-rule{
		margin-top: 48rpx;
		display: flex;
		flex-direction: column;
		.title{
			margin-bottom: 24rpx;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
				
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			.list{
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
				.radio{
					border-radius: 50%;
					height: 20rpx;
					width: 20rpx;
					background: #1F1F1F;
					opacity: 0.3;
					margin-right: 14rpx;
					
				}
				
			}
			
		}
	}
	
	.pannel-btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		.btn{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
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
</style>
