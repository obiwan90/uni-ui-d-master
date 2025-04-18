<template>
	<view class="editPrice">
		<!-- title -->
		<view class="title">
			<text>修改信息</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<!-- 产品信息 product-card-->
		<view class="product-card-list">
			<view v-for="(item, index) in 1" :key="index" class="product-card">
				<view class="product-card-l">
					<image src="https://www.xzxskj.com/xcximg/product@3x.png" mode="aspectFit"></image>
				</view>
				<view class="product-card-r">
					<view class="top">
						<view class="top-tap">
							<text class="top-tap-text">95新</text>
						</view>
						<view style="{clear:both}">
							
						</view>
						<text class="top-text">华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通</text>
					</view>
					<view class="mid">
						<view class="version-tap">
							<text>国行丨全网通丨有保丨电池99%丨深圳发货</text>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom-l">
							<text class="bottom1">批发价:</text>
							<text class="bottom2">￥14120</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- edit card -->
		<view class="edit-price">
			<view class="title">
				<text>修改售价</text>
			</view>
			<view class="content">
				<image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill"></image>
				<text>请输入修改金额</text>
			</view>
			<view class="divile">
				
			</view>
		</view>
		<!-- card -->
		<view class="chengSeCard">
			<view class="left">
				<text >商品成色</text>
			</view>
			<view class="right">
				<text >95新</text>
			</view>
		</view>
		<scroll-view scroll-y style="height: 500rpx; background-color: #FFFFFF;border-radius:20rpx">
		 <view class="collapseCard">
		        <uni-collapse ref="collapseRef" class='collapse'>
		            <uni-collapse-item   :open="true" class="collapse" v-for="(item, collapseIndex) in list" :key="collapseIndex" titleBorder="none" :border="false">
		                <template v-slot:title>
		                    <uni-list :border="false">
		                        <uni-list-item>
		                            <template v-slot:header>
		                                <text class="co-header">{{item.name}}</text>
		                            </template>
		                            <template v-slot:footer>
		                                <text class="co-foot">{{ selectedText[collapseIndex] }}</text> <!-- 绑定点击的文本 -->
		                            </template>
		                        </uni-list-item>
		                    </uni-list>
		                </template>
		                <view class="divile"/>
		                <view class="content">
		                    <view :class="{ 'clicked': clickedIndexArray[collapseIndex][cardIndex] }" class="card" v-for="(item1, cardIndex) in item.items" :key="cardIndex" @click="handleCardClick(collapseIndex, cardIndex)">
		                        <text :class="{ 'clicked-text': clickedIndexArray[collapseIndex][cardIndex] }" class="card-text">{{ item1 }}</text>
		                    </view>
		                </view>
		            </uni-collapse-item>
		        </uni-collapse>
		    </view>
		</scroll-view>
	</view>
	<view class="fill">
		
	</view>
	
	<!--bar -->
	<view class="pannel-btn">
		<view class="btn1" @click="onConfirm">
			<text>商品管理</text>
		</view>
		<view class="btn2" @click="onConfirm">
			<text>确认修改</text>
		</view>
	</view>
</template>

<script setup>
const list = ref([
    {
        name:'机身外观',
        items:[
            '无异常','轻微色差','色斑/压伤','轻微漏液','漏液/生线/错乱/闪屏','无法显示/全花屏'
        ]
    },{
        name:'屏幕外观',
        items:[
            '无异常','轻微色差','色斑/压伤','轻微漏液','漏液/生线/错乱/闪屏','无法显示/全花屏'
        ]
    },{
        name:'液晶显示',
        items:[
            '无异常','轻微色差','色斑/压伤','轻微漏液','漏液/生线/错乱/闪屏','无法显示/全花屏'
        ]
    }
])
const clickedIndexArray = ref(Array.from({ length: 3 }, () => Array.from({ length: 5 }, () => false))); 
const selectedText = ref(Array.from({ length: 3 }, () => '')); 

const handleCardClick = (collapseIndex, cardIndex) => {
    clickedIndexArray.value[collapseIndex].fill(false);
    clickedIndexArray.value[collapseIndex][cardIndex] = !clickedIndexArray.value[collapseIndex][cardIndex];
    selectedText.value[collapseIndex] = list.value[collapseIndex].items[cardIndex]; 
};

// const collapseRef = ref(null);
// const handleDataRendered = () => {
// 	nextTick(() => {
// 		console.log('resize执行了');
// 		collapseRef.value.resize();
	
// 	});
// };
// onMounted(() => {
//     console.log('resize执行了');
//     handleDataRendered();
// });
</script>

<style lang="scss" scoped>
	.editPrice{
		box-sizing: border-box;
		width: 750rpx;
		height: 1150rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding-top: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		.title{
			box-sizing: border-box;
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
			margin-bottom: 20rpx;
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
		.chengSeCard{
			box-sizing: border-box;
			width: 690rpx;
			height: 100rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 24rpx;
			padding-right: 24rpx;
			margin-bottom: 20rpx;
			.left{
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				text{
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #1F1F1F;
				}
			}
			
		}
		.collapseCard{
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			.collapse{
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
			}
			.co-header{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				margin-left: -4rpx;
			}
			.co-foot{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
				opacity: 0.7;
			}
			.divile{
				width: 690rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-bottom: 24rpx;
			}
			.content{
				width: 690rpx;
				background: #FFFFFF;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: grid;
				justify-content: center;
				grid-template-columns: auto auto;
				.card{
					margin-left: 8rpx;
					margin-right: 8rpx;
					margin-bottom: 10rpx;
					width: 314rpx;
					height: 64rpx;
					background: #F9F9F9;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.card-text.clicked-text {
					   height: 34rpx;
					   font-family: PingFang SC, PingFang SC;
					   font-weight: 400;
					   font-size: 24rpx;
					   color: #EB4636;
					  }
					.card-text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
					}
					 &.clicked {
						  background-color: #FFEEEC;
					}
				}
			}
		}
	}
	.fill{
		height: 182rpx;
		background: #FFFFFF;
	}
	.pannel-btn{
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
		.btn1{
			width: 232rpx;
			height: 96rpx;
			background: #F2F3F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
			}
		}
		.btn2{
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
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
	
</style>
