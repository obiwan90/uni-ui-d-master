<template>
	<view class="card">
	 <view class="card-title">
		<!-- <uni-tag size="mini" text="95新" type="error" /> -->
		<view class="card-title-l">
			<view class="card-title-tag">
				<text>95新</text>
			</view>
			<view class="card-model">
				华为Mate 60 Pro 12GB+512GB 雅丹黑
			</view>
		</view>
		<view class="card-number">
			× 24
		</view>
	 </view>
	 
	 <view class="card-content-tips">
		<!-- <uni-tag class="card-tag" v-for="(item,index) in 5" :key="index" size="mini" text="国行" type="default" /> -->
		<custom-tag class="tag" :tagText="tagText" :bgColor="tagBgColor" />
		<custom-tag class="tag" tagText="全网通" :bgColor="tagBgColor" />
		<custom-tag class="tag" tagText="电量99%" :bgColor="tagBgColor" />
	 </view>
	 
	 <view class="card-bottom">
	 	<view class="left">
	 		<text class="text-1">求购价:</text>
			<text class="text-2">￥5120</text>
			<text class="text-3">/台</text>
	 	</view>
		<view class="right">
			<view class="right-tip">
				<text class="right-tip-text">联系TA</text>
			</view>
			 <!-- <uni-tag class="card-tag" size="default" text="联系TA" type="error" /> -->
		</view>
	 </view>
	</view>
</template>

<script setup>
const tagText = ref('国行');
const tagBgColor = ref('#F2F3F6');
</script>

<style lang="scss" scoped>
	.card{
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 710rpx;
		height: 184rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 20rpx 20rpx;
		.card-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.card-title-l{
				display: flex;
				align-items: center;
				.card-title-tag{
					margin-right: 6rpx;
					width: 52rpx;
					height: 28rpx;
					background: linear-gradient( 132deg, #D94C24 0%, #FF5221 100%);
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						height: 28rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #FFFFFF;
						
					}
				}
				.card-title-tip{
					// width: 44rpx;
					height: 28rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 20rpx;
					color: #FFFFFF;
					line-height: 0rpx;
					// text-align: center;
					font-style: normal;
					text-transform: none;
				}
			}
			
			.card-model{
				// width: 502rpx;
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				line-height: 40rpx;
				// text-align: left;
				font-style: normal;
				text-transform: none;
			}
			.card-number{
				// width: 52rpx;
				height: 34rpx;
				font-family: DIN, DIN;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
				line-height: 40rpx;
				// text-align: right;
				font-style: normal;
				text-transform: none;
			}
			
		}
		.card-content-tips{
			margin-top: 10rpx;
			.tag{
				margin-right: 6rpx;
			}
			// .card-tag{
			// 	margin-right: 6rpx;
			// }
		}
		.card-bottom{
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.left{
				// font-family: PingFang SC, PingFang SC;
				// font-weight: 400;
				// font-size: 22rpx;
				// color: #1F1F1F;
				// line-height: 40rpx;
				// font-style: normal;
				// text-transform: none;
				.text-1{
					// width: 72rpx;
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #1F1F1F;
					line-height: 40rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
					opacity: 0.4;
				}
				.text-2{
					// width: 70rpx;
					height: 38rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #E6432E;
					line-height: 40rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
				.text-3{
					// width: 34rpx;
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #1F1F1F;
					line-height: 40rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
			}
			.right{
				.right-tip{
					width: 94rpx;
					height: 38rpx;
					background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.right-tip-text{
						// width: 78rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #FFFFFF;
						// line-height: 0rpx;
						// text-align: center;
						font-style: normal;
						text-transform: none;
					}
				}
			}
		}
	}
</style>	