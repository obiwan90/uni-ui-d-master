<template>
	<view class="account-select">
		<view class="title">
			<view class="left">
				<text>筛选</text>
			</view>
			<view class="right">
				<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill"  @click="$emit('close')"></image>
			</view>
		</view>
		
		<view class="select" v-for="(item,index) in selectData" :key="index">
			<view class="title">
				<text>{{item.type}}</text>
			</view>
			<view class="content">
				<view class="card" v-for="(item1,index) in item.values" :key="index">
					<text>{{item1}}</text>
				</view>
			</view>
		</view>
		
		<!-- 时间 -->
		<view class="time">
			<view class="title">
				<text>时间筛选</text>
			</view>
			<view class="content">
				<view class="frist">
					<view class="card">
						<picker
						@change="onTimeChange1" 
						mode="date" 
						:value="pickerStartValue">
							<text>{{pickerStartValue}}</text>
						</picker>
						
					</view>
				</view>
				<view class="mid">
					
				</view>
				<view class="last">
					<view class="card">
						<picker
						@change="onTimeChange2" 
						mode="date" 
						:value="pickerLastValue">
							<text>{{pickerLastValue}}</text>
						</picker>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 金钱 -->
		<view class="price">
			<view class="title">
				<text>金额区间</text>
			</view>
			<view class="content">
				<view class="frist">
					<view class="card">
						<!-- <text>最低金额</text> -->
						<input class="text-1" type="text" placeholder="最低金额"/>
					</view>
				</view>
				<view class="mid">
					
				</view>
				<view class="last">
					<view class="card">
						<!-- <text>最高金额</text> -->
						<input class="text-2" type="text" placeholder="最高金额"/>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 182rpx;">
			
		</view>
		<!-- btn -->
		<view class="select-btn">
			<view @click="cancel" class="cancel-btn">
				<text>重置</text>
			</view>
			<view @click="comfrm" class="confim-btn">
				<text>确定</text>
			</view>
		</view>
		
	</view>
</template>
<script setup>
const pickerStartValue = ref('开始时间')
const pickerLastValue = ref('结束时间')
const onTimeChange1 = (e)=>{
	console.log(e);
	pickerStartValue.value = e.detail.value
}
const onTimeChange2 = (e)=>{
	console.log(e);
	pickerLastValue.value = e.detail.value
}
const selectData = ref([
	{type:'收支类型',values:[
		'全部','收入','支出'
	]},
	{type:'交易类型',values:[
		'全部','充值','采购','售后','卖货','退货','其他'
	]},
])
	
</script>
<style lang="scss" scoped>

.account-select{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 40rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	.title{
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
			image{
				height: 32rpx;
				width: 32rpx;
				// border: 1rpx solid red;
			}
		}
	}
	.select{
		margin-top: 40rpx;
		width: 100%;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			width: 100%;
			margin-top: 24rpx;
			display: grid;
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			align-items: center;
			row-gap: 16rpx;
			.card{
				width: 198rpx;
				height: 72rpx;
				background: #F9F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
		}
	}
	.time{
		margin-top: 40rpx;
		width: 100%;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.frist{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
				}
			}
			.mid{
				width: 30rpx;
				height: 2rpx;
				background: #EEEEEE;
				// background: blue;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.last{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
				}
			}
		}
	}
	.price{
		margin-top: 40rpx;
		width: 100%;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.frist{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				.text-1{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
				}
			}
			.mid{
				width: 30rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.last{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				.text-2{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
				}
			}
		}
	}
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
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
			}
		}
		.confim-btn {
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 62rpx;
			text {
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #ffffff;
			}
		}
	}
	
}
</style>