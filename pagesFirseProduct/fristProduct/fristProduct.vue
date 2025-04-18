<template>
<scroll-view scroll-y style="height:calc(100vh - 190rpx);background-color: #f3f3f3">
	<view class="fristProduct-layout">
		<custom-header class="cheader">
			<template #name>先货后款</template>
			<template #fill>先货后款</template>
		</custom-header>
		<!-- 搜索栏 -->
		<view class="searchBar">
			<view class="position">
				<text class="position-text">串号搜索</text>
				<image class="position-image" src="https://www.xzxskj.com/xcximg/icon_xiala@3x.png" mode="aspectFill"></image>
			</view>
			<view class="inline">
				
			</view>
			<view class="search-content" @click="goPage('/pagesSearch/search/search')">
				<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
				<input class="search-content-text" type="text" placeholder="请选择相应内容输入" />
			</view>
		</view>
		<uv-sticky :offset-top="getStatusBarHeight() + getTitleBarHeight()">
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
			<view class="saixuan">
				<view class="card" v-for="(item,index) in 3" :key="index">
					<text>未收款</text>
					<image src="https://www.xzxskj.com/xcximg/icon_xiala@3x.png" mode="aspectFill"></image>
				</view>
				<view class="select-all" >
					<image src="https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png" mode="aspectFill"></image>
					<text>全选</text>
				</view>
			</view>
		</uv-sticky>
		
		<view class="order-card" v-for="(item,index) in 5" :key="index">
			<view class="top">
				<view class="left">
					<image class="image-1" src="https://www.xzxskj.com/xcximg/icon_info@3x.png" mode="aspectFill"></image>
					<text>金克斯</text>
					<view class="divil">
						
					</view>
					<text>订单号：202303281234</text>
					<image class="image-2" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<view class="right">
					<text>未收款</text>
				</view>
			</view>
			<view class="divil">
				
			</view>
			
			<view class="product-card" >
				<view class="product-card-l">
					<image src="https://www.xzxskj.com/xcximg/img@3x.png" mode="aspectFit"></image>
				</view>
				<view class="product-card-r">
					<view class="top">
						<view class="top-tap">
							<text class="top-tap-text">95新</text>
						</view>
						<view style="{clear:both}">
							
						</view>
						<text class="top-text">华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）</text>
					</view>
					<view class="mid">
						<view class="version-tap">
							<text>IMEI：FA5445645156451</text>
							<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom-l">
							<text class="bottom1">批发价:</text>
							<text class="bottom2">￥14120</text>
						</view>
						<view class="bottom-r">
							<!-- <image :src="item.imageSrc" mode="aspectFill"></image> -->
							<image src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		<!-- tabbar-bar -->
		<view class="order-tabbar" >
			<view class="left">
				<view class="top">
					<text class="text-1">数量：</text>
					<text class="text-2">78</text>
					<text class="text-1">台</text>
				</view>
				<view class="bottom">
					<text class="text-1">合计：</text>
					<text class="text-2">¥749988</text>
				</view>
			</view>
			<view class="right">
				<view class="right-1">
					<text>退货上架</text>
				</view>
				<view class="right-2">
					<text>确认收款</text>
				</view>
			</view>
		</view>
	</view>
</scroll-view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
const classlist = ref([
	{name:'全部'},
	{name:'议价待确认'},
	{name:'待付款'},
	{name:'待发货'},
	{name:'先货后款'},
	{name:'售后/退款'},
	{name:'交易成功'},
]);

const activeTab1Index = ref(0);
const tabsData = computed(() => {
	return classlist.value.map((item) => ({
		name: item.name
	}));
});
const uvTabs1Change = (e) => {
	console.log('标签切换触发:', e.index);
	activeTab1Index.value = e.index;
};
const isAllSelected = ref(false);
//单选
const toggleImageSelection = (index) => {
    const item = orderList.value[index];
    item.selected = !item.selected;
    item.imageSrc = item.selected ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png';
};
//全选
const selectAll = () => {
    // 点击全选按钮时，切换全选状态
    isAllSelected.value = !isAllSelected.value;
    // 遍历所有卡片，修改图片的src
    orderList.value.forEach((item, index) => {
        item.selected = isAllSelected.value;
        item.imageSrc = isAllSelected.value ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png';
    });
};

// const fp = ref([
// 	{orderId:'',productId:','},
// 	{orderId:'',productId:','},
// 	{orderId:'',productId:','},
// 	{orderId:'',productId:','},
// ])


</script>

<style lang="scss" scoped>
.fristProduct-layout{
	
	
	.cheader{
		
		::v-deep .header{
			background: #FFFFFF;
		}
	}
	box-sizing: border-box;
	background: #F3F2F6;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.searchBar{
		margin-top: 48rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 72rpx;
		width: 710rpx;
		// margin-left: 20rpx;
		// margin-right: 20rpx;
		background: #FFFFFF;
		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59,43,15,0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 2rpx solid #242424;
		.position{
			padding: 0 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.position-text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				// line-height: 0rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}
			.position-image{
				margin-left: 10rpx;
				width: 20rpx;
				height: 20rpx;
			}
		}
		.inline{
			width: 2rpx;
			height: 28rpx;
			background: #EEEEEE;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
		}
		.search-content{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			.search-image{
				width: 30rpx;
				height: 30rpx;
				margin-right: 15rpx;
			}
			.search-content-text{
				height: 36rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				color: #1F1F1F;
				opacity: 0.6;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}
		}
	}
	.tabs{
		background: #FFFFFF;
		width: 100%;
	}
	.saixuan{
		// border: 1rpx solid black;
		width: 710rpx;
		background: #FFFFFF;
		height: 120rpx;
		display: grid;
		grid-template-columns: auto auto auto auto;
		align-items: center;
		justify-content: space-between;
		.card{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 174rpx;
			height: 64rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: center;
				margin-right: 10rpx;
			}
			image{
				width: 16rpx;
				height: 8rpx;
			}
		}
		.select-all{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 128rpx;
			height: 64rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			border: 2rpx solid #F5F5F5;
			image{
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
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
	.order-card{
		
		margin-top: 20rpx;
		// margin-left: 20rpx;
		width: 710rpx;
		// height: 274rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-top:14rpx;
		padding-bottom:20rpx;
		.top{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.image-1{
					height: 24rpx;
					width: 24rpx;
					margin-right: 10rpx;
				}
				.image-2{
					height: 20rpx;
					width: 20rpx;
					margin-left: 10rpx;
					opacity: 0.5;
				}
				text{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: center;
				}
				.divil{
					width: 2rpx;
					height: 20rpx;
					background: #EEEEEE;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					margin-left: 10rpx;
					margin-right: 10rpx;
				}
			}
			.right{
				display: flex;
				justify-content: center;
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
		.divil{
			margin-top: 14rpx;
			margin-bottom: 20rpx;
			width: 670rpx;
			height: 2rpx;
			background: #EEEEEE;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
		}
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
						height: 170rpx;
						width: 170rpx;
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
						margin-top: 10rpx;
						.version-tap {
							display: flex;
							align-items: center;
							text{
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #828282;
							}
							image{
								margin-left: 10rpx;
								height: 20rpx;
								width: 20rpx;
							}
						}
					}
					.bottom {
						// border: 1rpx solid red;
						margin-top: 10rpx;
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
								height: 32rpx;
								position: relative;
								margin-bottom: 13rpx;
								text{
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 22rpx;
									color: #9B9B9B;
									text-align: left;
								}
								.divil{
									width: 100%;
									height: 2rpx;
									background: #9B9B9B;
									border-radius: 0rpx 0rpx 0rpx 0rpx;
									position: absolute;
									bottom: 7rpx;
									left: 0;
								}
								
							}
							
							
						}
						.bottom-r {
							image{
								height: 32rpx;
								width: 32rpx;
							}
						}
					}
								
				}
			}
		
	}
	.order-tabbar {
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
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			display: flex;
			flex-direction: column;
			.top{
				display: flex;
				align-items: center;
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.text-2{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #EB4636;
					margin-right: 10rpx;
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				.text-1{
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.text-2{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #EB4636;
				}
			}
		}
		.right{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.right-1{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 192rpx;
				height: 96rpx;
				background: #F2F3F6;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-right: 20rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
			.right-2{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 264rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}
		}
	}
}

</style>