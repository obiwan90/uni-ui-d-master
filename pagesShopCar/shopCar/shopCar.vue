<template>
	<view class="shopCar-layout">
		
		<custom-header>
			<template #name>购物车</template>
			<template #fill>购物车</template>
		</custom-header>
		
		<view style="height: 1120rpx;">
			<z-paging ref="paging"  :fixed="false" show-refresher-update-time v-model="dataList" @query="queryList">
				<view class="card" v-for="(item, index) in dataList" :key="item.id">
					<van-swipe-cell right-width="59">
						<view class="good-card">
							<image v-if="item.zt!=='1'" style="position: absolute;height: 238rpx;width:238rpx;  top: 50%;left: 70%;transform: translate(-50%, -50%);" src="https://www.xzxskj.com/Public/upload/66cfb493129921858.png" mode="aspectFill"></image>
							<view class="good-card-left" @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+item.goodinfos.id)">
								<van-image width="190rpx" height="190rpx" radius="18rpx" class="image-1" :src="item.goodinfos.cover" fit="fill">
								  <template v-slot:error>加载失败</template>
								</van-image>
							</view>
							<view class="good-card-right" style="">
								<view class="top" style=""  @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+item.goodinfos.id)">
									<custom-channel-tap v-if="item.goodinfos.zjlx==='1'" class="tap" text1="官方质检" text1Color="#E6432E" :text2="item.goodinfos.finenessname" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" />
									<custom-channel-tap v-if="item.goodinfos.zjlx==='2'" class="tap" text1="授权质检" text1Color="#246C14" :text2="item.goodinfos.finenessname" backgroundColor="linear-gradient( 135deg, #246B13 0%, #39D591 100%)" />
									<custom-channel-tap v-if="item.goodinfos.zjlx==='3'" class="tap" text1="自由货源" text1Color="#FF6C27" :text2="item.goodinfos.finenessname" backgroundColor= "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "/>
									<view style="{clear:both}">
									</view>
									<text>{{ item.goodinfos.name }}</text>
								</view>
								<view class="mid"  @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+item.goodinfos.id)">
									<text class="mid-text">
									{{item.goodinfos.gjbbname}}|
									{{item.goodinfos.wlbbname}}|
									{{item.goodinfos.gjbbname}}|
									电池{{item.goodinfos.efficiency}}%|
									{{item.goodinfos.delivery}}发货</text>
								</view>
								<view class="bottom" >
									<view class="left"  @click="goPage('/pagesProductDetail/productDetail/productDetail?id='+item.goodinfos.id)">
										<view class="bottom1">
											<text>批发价:</text>
										</view>
										<view class="bottom2">
											<text>￥{{ item.goodinfos.price }}</text>
										</view>
										<view class="bottom3">
											<text>/台</text>
										</view>
									</view>
									<view v-if="item.zt=='1'" class="rightImage" @tap="toggleSelection(item.id)">
										<image  
										  :src="isSelected(item.id) ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png'"
										  mode="aspectFill"
										></image>
									</view>
								</view>
							</view>
						</view>
						<view slot="right" class="van-swipe-cell__right" style="height: 100%;width: 118rpx;display: flex;justify-content: center;align-items: center;">
							<view style="display: flex;justify-content: center;align-items: center;">
								<uni-icons type="trash" size="50" @click="onClick(item.id)"></uni-icons>
							</view>
						</view>
					</van-swipe-cell>
				</view>
			</z-paging>
		</view>
		
		<view class="car-tabbar">
			<view class="left">
				<view class="selectAll" @tap="toggleAllSelection">
					<image
						:src="allSelected ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png'"
						mode="aspectFill"
					></image>	
					<text >全选</text>
				</view>
				<view class="delete" @click="deleteSelectedItems">
					<text>删除</text>
				</view>
			</view>
			<view class="btn2" @click="settlement">
				<text class="btn2-text1">去结算</text>
				<text class="btn2-text2">￥{{selectedItemsTotalPrice}}</text>
			</view>
		</view>
		
		<custom-shop-tabbar></custom-shop-tabbar>
	</view>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore';
import { useUserStore } from '@/stores/userInfoStore.js';
import { apigetShopCard, apiDeleteShopCard } from '@/api/shopCard/shopCard.js';
const paging = ref(null);
const dataList = ref([]);
const change = (e) => {
	// console.log(e)
}

let startX;
let startY;
const isSwiping = ref(false)
const handleTouchStart = (event) => {
	const touch = event.touches[0];
	startX = touch.clientX;
	startY = touch.clientY;
	const deltaX = touch.clientX - startX;
	const deltaY = touch.clientY - startY;
	startX = touch.clientX;
	startY = touch.clientY;
};
const handleTouchMove = (event) => {
	const touch = event.touches[0];
	const deltaX = touch.clientX - startX;
	const deltaY = touch.clientY - startY;
	if (Math.abs(deltaX) > Math.abs(deltaY)) {
		isSwiping.value = true;
	}
};
const handleTouchEnd = () => {
	isSwiping.value = false;
};

const options = ref([
	{
		isImage: true,
		style: {
			backgroundColor: '#F3F2F6'
			// backgroundColor:'#EB4636'
		}
	}
]);
const cartItems = ref([
	{ id: 1, name: '华为Mate 60 RS 非凡大师 16GB+1TB', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 2, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 3, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 4, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）4', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 5, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）5', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 6, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）6', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 7, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）7', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' },
	{ id: 8, name: '华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）8', selected: false, taps: '国行丨全网通丨有保丨电池99%丨深圳发货', price: '14120' }
]);

const selectIds = ref([]);
const toggleSelection = (id) => {
	const index = selectIds.value.indexOf(id);
	if (index !== -1) {
		selectIds.value.splice(index, 1);
	} else {
		selectIds.value.push(id);
	}
	console.log('selectIds.push:', selectIds.value);
};
const isSelected = (id) => {
	return selectIds.value.includes(id);
};

// 全选标记
const allSelected = ref(false);
watchEffect(() => {
    allSelected.value = selectIds.value.length > 0 && selectIds.value.length === shoppingcartlists.value.filter(item => item.zt == "1").length;
});


const toggleAllSelection = () => {
    console.log('Before toggle:', selectIds.value, allSelected.value);
	console.log('shoppingcartlists',shoppingcartlists.value)
    if (allSelected.value) {
        selectIds.value = [];
        allSelected.value = false;
    } else {
        selectIds.value = shoppingcartlists.value
            .filter(item => item.zt == "1")
            .map(item => item.id);
        allSelected.value = true;
    }
    console.log('After toggle:', selectIds.value, allSelected.value);
};




const selectedItemsTotalPrice = computed(() => {
	let totalPrice = 0;
	for (const item of shoppingcartlists.value) {
		if (isSelected(item.id)) {
			totalPrice += parseInt(item.goodinfos.price);
		}
	}
	return totalPrice;
});

const deleteSelectedItems = () => {
	if (selectIds.value.length === 0) {
		return;
	}
	uni.showModal({
		title: '提示',
		content: '确定要删除选中的商品吗？',
		success: (res) => {
			if (res.confirm) {
				const itemId = selectIds.value.join(',');
				shoppingcartlists.value = shoppingcartlists.value.filter(item => !isSelected(item.id));
				selectIds.value = [];
				//删除api todo
				deleteCar(itemId)
				paging.value.reload(true)
			}
		}
	});
};

const onClick = (itemId) => {
	uni.showModal({
		title: '提示',
		content: '确定要删除商品吗？',
		success: (res) => {
			if (res.confirm) {
				shoppingcartlists.value = shoppingcartlists.value.filter(item => item.id !== itemId);
				const index = selectIds.value.indexOf(itemId);
				if (index !== -1) {
					selectIds.value.splice(index, 1);
				}
				// 删除API请求
				deleteCar(itemId)
				paging.value.reload(true)
			}
		}
	});
};

const deleteCar = async (itemId) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		id: itemId
	};
	const res = await apiDeleteShopCard(data)
	if (res.code === 200) {
		const count = await useUserStore().refreshShopCarCount()
		console.log('刷新购物车:', JSON.parse(count));
	}
}

const hasSelectedItems = computed(() => {
	return cartItems.value.some((item) => item.selected);
});

const shoppingcartlists = ref([])
const getShopCar = async () => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
	};
	const res = await apigetShopCard(data)
	if (res.code === '200') {
		shoppingcartlists.value = res.Shoppingcartlists
	}
	console.log(res);
	return shoppingcartlists.value;
}

const goPage = (path) => {
	uni.navigateTo({
		url: path
	});
};

const settlement = () => {
	let dataParam = ref({
		lx: '',
		id: ''
	})
	// 筛选出 selectIds 中选中的 id 的 item
	const selectedItems = shoppingcartlists.value.filter(item => selectIds.value.includes(item.id));
	console.log('selectedItems:', selectedItems);
	let goodsIds = ref()
	goodsIds.value = selectedItems.map(item => item.goodsid).join(',');
	console.log('goodsIds:', goodsIds);
	dataParam.value.lx = '2';
	dataParam.value.id = goodsIds.value;
	let queryString = encodeURIComponent(JSON.stringify(dataParam.value));
	console.log('dataParam:', dataParam.value);
	if (selectedItems.length > 0) {
		uni.navigateTo({
			url: '/pagesSubOrder/subOrder/subOrder?data=' + queryString
		})
	} else {
		uni.showToast({
			title: '请先选择商品',
			icon: 'none',
			duration: 2000
		});
	}
}

const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	// param.value.pageNo = pageNo;
	// param.value.pageSize = pageSize;
	const data = await getShopCar();
	console.log('data:', data);
	paging.value.complete(data);
};
onShow(() => {
	useTabStore().setCurrentTabIndex(1);
});
// onLoad(()=>{
// 	console.log('购物车');
// 	getShopCar()

// })
</script>


<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.shopCar-layout{
	background: #f3f2f6;
	// min-height: 100vh;
}

.card {
		// border: 2rpx solid black;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;

		image {
			height: 32rpx;
			width: 32rpx;
		}

		.good-card {
			position: relative;
			box-sizing: border-box;
			width: 710rpx;
			height: 238rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 24rpx 24rpx;
			display: flex;
			.good-card-left {
				image {
					height: 190rpx;
					width: 190rpx;
					border-radius: 18rpx;
				}
			}
			.good-card-right {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				width: 100%;
				justify-content: space-between;
				.top {
					height: 90rpx; /* 设置最大高度 */
					// overflow: hidden; /* 超出部分隐藏 */
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
					display: inline-block;
					.tap {
						float: left;
						margin-right: 10rpx;
					}
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						vertical-align: top;
					}
				}
				.mid {
					// max-width: 100%;
					// max-height: 64rpx; /* 设置最大高度为两行文字 */
					// border: 1rpx solid red;
					// max-width: 100%;
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
					.mid-text {
						// border: 2rpx solid black;
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
					}
				}
				.bottom {
					display: flex;
					align-items: center;
					// margin-top: 20rpx;
					// margin-top: 65rpx;
					justify-content: space-between;
					.left{
						display: flex;
						
						.bottom1 {
							text {
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #1f1f1f;
								margin-right: 10rpx;
							}
						}
						.bottom2 {
							text {
								height: 38rpx;
								font-family: DIN, DIN;
								font-weight: bold;
								font-size: 32rpx;
								color: #e6432e;
							}
						}
						.bottom3 {
							text {
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #1f1f1f;
							}
						}
					}
					.rightImage{
						width: 150rpx;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						image {
							height: 32rpx;
							width: 32rpx;
						}
					}
				}
			}
		}
	}

.car-tabbar {
	margin-bottom:20rpx;
	width: 710rpx;
	height: 120rpx;
	background: #7E7E7E;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	margin-left: 20rpx;
	box-sizing: border-box;
	position: fixed;
	bottom: 186rpx;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 20rpx;
	.left{
		height: 100%;
		display: flex;
		align-items: center;
		.selectAll{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
			image {
				// margin-left: 20rpx;
				height: 32rpx;
				width: 32rpx;
				margin-right: 16rpx;
				
			}
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				margin-right: 20rpx;
				
			}
		}
		.delete{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				margin-right: 20rpx;
				
			}
		}
		
	}
	
	.btn1 {
		height: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 24rpx;
		color: #1f1f1f;
		margin-left: 32rpx;
	}
	// .selected {
	// 	// background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
	// 	text {
	// 		height: 34rpx;
	// 		font-family: PingFang SC, PingFang SC;
	// 		font-weight: 400;
	// 		font-size: 24rpx;
	// 		color: #1f1f1f;
	// 		margin-left: 32rpx;
	// 	}
	// }
	.btn2 {
		width: 416rpx;
		height: 96rpx;
		background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		
		box-sizing: border-box;
		// margin-left: 62rpx;
		// width: 458rpx;
		// height: 96rpx;
		// background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
		// border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn2-text1 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
			margin-right: 10rpx;
		}
		.btn2-text2 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 48rpx;
			font-family: DIN, DIN;
			font-weight: bold;
			font-size: 40rpx;
			color: #ffffff;
		}
	}
}
</style>
