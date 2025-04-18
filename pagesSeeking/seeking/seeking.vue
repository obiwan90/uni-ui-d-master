<template>
	<view class="seeking">
		<!-- header -->
		<custom-header>
			<template #name>求货详情</template>
			<template #fill>求货详情</template>
		</custom-header>
		<!-- card -->
		<view class="card">
			<view class="title">
				<view class="left">
					<image src="/pagesSeeking/static/img_touxiang@3x.png" mode="aspectFill"></image>
					<text>压缩</text>
				</view>
				<view class="right">
					<view class="tip">
						<text class="text-1">距结束</text>
						<text class="text-2">2天</text>
						<text class="text-3">18:45:12</text>
					</view>
				</view>
			</view>
			<view class="info">
				<text>华为Mate 60 Pro 12GB+512GB 雅丹黑12GB+512GB 雅丹黑</text>
			</view>
			<view class="price">
				<view class="left">
					<text class="text-1">卖货价:</text>
					<text class="text-2">¥14120</text>
					<text class="text-3">/台</text>
				</view>
				<view class="right">
					<text>销售数量：5</text>
				</view>
			</view>
			<view class="photot-cell">
				<scroll-view scroll-x>
					<view class="scroll">
						<view class="photo" v-for="(item,index) in 5" :key="index">
							<image src="/pagesSeeking/static/product@3x.png" mode="aspectFill"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 定位 -->
		<view class="position">
			<view class="left">
				<image src="/pagesSeeking/static/icon_dizhi@3x.png" mode="aspectFill"></image>
				<text>求货地点：深圳</text>
			</view>
			<view class="right">
				<image src="/pagesSeeking/static/icon_dianhua@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- product-info -->
		<view class="product-info">
			<view class="title">
				<text>需求描述</text>
				<view class="tip">
					<text>全新未激活</text>
				</view>
			</view>
			<view class="content">
				<view class="info1">
					<text>手机外形的细节处理非常出色，如圆润的边角、精致的机身线条等，都让手机握持手感更加舒适。此外，手机还支持IP68级防水防尘功能</text>
				</view>
			</view>
		</view>
		
		<!--bar -->
		<view class="bar" @click="comfim">
			<view class="btn">
				<text>在线联系</text>
			</view>
		</view>
		
	</view>
</template>

<script setup>
const content = ref([
	{key:'功能检测',value:'全好'},
	{key:'维修检测',value:'声音略小全好声音略小全好声音略'},
	])
</script>

<style lang="scss" scoped>
.seeking{
	height: 100vh;
	width: 750rpx;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.card{
		margin-top: 45rpx;
		box-sizing: border-box;
		width: 710rpx;
		height: 590rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 20rpx;
		// padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 30rpx;
		.title{
			margin-bottom: 58rpx;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				image{
					height: 80rpx;
					width: 80rpx;
					margin-right: 20rpx;
				}
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				// padding-left: 26rpx;
				width: 326rpx;
				height: 56rpx;
				background: linear-gradient( 134deg, #ED784B 0%, #EB4636 100%);
				border-radius: 28rpx 0rpx 0rpx 28rpx;
				display: flex;
				.tip{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					margin-right: 20rpx;
					margin-left: 24rpx;
					text{
						height: 42rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #FFFFFF;
					}
				}
				
			}
		}
		.info{
			text{
				height: 110rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
			}
		}
		.price{
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			.left{
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
				.text-2{
					height: 48rpx;
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 40rpx;
					color: #E6432E;
				}
				.text-3{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
				}
			}
			.right{
				margin-right: 20rpx;
				text{
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 22rpx;
					color: #1F1F1F;
				}
			}
			
		}
	
		.photot-cell{
			margin-top: 30rpx;
			width: 100%;
			height: 196rpx;
			display: flex;
			scroll-view{
				white-space: nowrap;
				.scroll{
					display: flex;
					.photo{
						margin-right: 12rpx;
						image{
							height: 198rpx;
							width: 198rpx;
						}
					}
				}
			}
		}
	}
	.bar{
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
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}
	}
	.position{
		
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 708rpx;
		height: 96rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		
		.left{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				height: 36rpx;
				width: 36rpx;
				margin-right: 12rpx;
			}
			text{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
			}
		}
		.right{
			image{
				height: 32rpx;
				width: 32rpx;
			}
			
		}
	}
	.product-info{
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.title{
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			height: 80rpx;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
			}
			.tip{
				width: 118rpx;
				height: 38rpx;
				background: linear-gradient( 132deg, #FFA187 0%, #FFD3B5 100%);
				border-radius: 4rpx 4rpx 4rpx 4rpx;
				opacity: 0.45;
				margin-left: 20rpx;
				display: flex;
				align-items: center;
				text{
					height: 32rpx;
					font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
					font-weight: 400;
					font-size: 24rpx;
					color: #EB4636;
				}
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 24rpx;
			.info{
				box-sizing: border-box;
				width: 670rpx;
				height: 72rpx;
				background: #F8F8F8;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;
				padding-right: 20rpx;
				margin-bottom: 12rpx;
				.left{
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
				.right{
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
					}
				}
			}
			.info1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 670rpx;
				// height: 200rpx;
				background: #F8F8F8;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				padding-top: 24rpx;
				padding-bottom: 24rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				text{
					height: 152rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					line-height: 56rpx;
				}
			}
		}
	}
}
</style>