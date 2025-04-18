<template>
 <!-- 底部空白区域 -->
 <view style="height: 192rpx; background: transparent"></view>
 <view class="custom-tabbar" :class="{ 'show': isVisible }">
 	<view
 		class="tabbar-item"
 		:class="[item.centerItem ? ' center-item' : '']"
 		:style="'width: calc(100% /' + list.length + ')'"
 		@click="onTabClick(i)"
 		v-for="(item, i) in list"
 		:key="i">
 		<view class="item-top">
 			<image v-if="i!==1" :src="currentTabIndex === i ? item.selectedIconPath : item.iconPath" />
			<uni-badge v-else class="badge"  size="small" :text="item.text === '购物车'?shopCarCount:''" absolute="rightTop" type="error">
				<image style="height: 44rpx;width: 44rpx;" :src="currentTabIndex === i ? item.selectedIconPath : item.iconPath"></image>
			</uni-badge>
 		</view>
 		<view class="item-bottom" :class="[currentTabIndex === i ? 'item-active' : '']">{{ item.text }}</view>
		<button v-if="i===3" class="cusService" open-type="contact" @contact="onContact" send-message-title="" show-message-card plain>客服</button>
 	</view>
 </view>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore';
import { apigetShopCard } from '@/api/shopCard/shopCard.js';
import { useUserStore } from '@/stores/userInfoStore.js';
const isVisible = ref(false)
const tabStore = useTabStore();
const currentTabIndex = computed(() => tabStore.currentTabIndex);
const onTabClick = (index) => {
	let mineIndex = uni.getStorageSync('selectedMine')
	let data = uni.getStorageSync('identityData')
	console.log('mineIndex:',mineIndex);
	if(mineIndex){
		list.value[4].pagePath = data[mineIndex].path
	}else{
		list.value[4].pagePath = mineData.value[0].path
	}
	
	console.log('currentTabIndex:',currentTabIndex.value);
	
	if(currentTabIndex.value === 3 && index===3){
		return
	}
	
	if(index===0){
		tabStore.setCurrentTabIndex(index)
		uni.navigateBack({
			 delta: getCurrentPages().length - 1
		})	
	}
	if(index===1||index===2||index === 4){
		tabStore.setCurrentTabIndex(index)
		uni.navigateTo({
			url:list.value[index].pagePath
		})
	}
};
const mineData = ref([
	{index:0,path:'/pagesUserMine/userMine/userMine'},
	{index:1,path:'/pagesCustomMine/customMine/customMine'},
	{index:2,path:'/pagesCustomMine/customMine/customMine'}
])
const list = ref([
	{
		text: '首页',
		pagePath: '/pages/home/home',
		iconPath: 'https://www.xzxskj.com/Public/upload/66c97f9990c9331.png',
		selectedIconPath: 'https://www.xzxskj.com/Public/upload/66c97faaa29401777.png',
	    centerItem: false
	},
	{
		text: '购物车',
		pagePath: '/pagesShopCar/shopCar/shopCar',
		iconPath: 'https://www.xzxskj.com/xcximg/icon_car@3x.png',
		selectedIconPath:'https://www.xzxskj.com/xcximg/icon_car_sel@3x.png',
		centerItem: false
	},
	{
		text: '',
		pagePath: '/pagesNewSell/newSell/newSell',
		iconPath: 'https://www.xzxskj.com/Public/upload/66c97f28f01fd9278.png',
		selectedIconPath: 'https://www.xzxskj.com/Public/upload/66c97f28f01fd9278.png',
		centerItem: true
	},
	{
		text: '客服',
		pagePath: '',
		iconPath: 'https://www.xzxskj.com/Public/upload/66cbac6a5c3d5705.png',
		selectedIconPath: 'https://www.xzxskj.com/Public/upload/66cbac57c8a956655.png',
		centerItem: false
	},
	{
		text: '我的',
		pagePath:'',
		iconPath: 'https://www.xzxskj.com/Public/upload/66c97fbc201701617.png',
		selectedIconPath: 'https://www.xzxskj.com/Public/upload/66c97fcbd0dc17793.png',
		centerItem: false
	}
]);

const onContact = (e)=>{
	console.log(e)
}
const shopCarCount = computed(() => useUserStore().shopCount);
onLoad(()=>{
})
onShow(async()=>{
	isVisible.value = true;
	await useUserStore().refreshShopCarCount()
	console.log('刷新购物车');
})

</script>

<style lang="scss" scoped>
$textDefaultColor: #1F1F1F; 
$bottomBg: #FFFFFF; 
$textSelectedColor: #1F1F1F; 
$centerItemBg: #fff; 
.cusService{
	// border: 1rpx solid red;
	position: absolute;
	border-radius: 20rpx;
	opacity: 0;
}
.custom-tabbar {
	box-sizing: border-box;
	// position: fixed;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// display: flex;
	// justify-content: space-around;
	// align-items: flex-start;
	padding: 10px;
	// background: #ffffff;
	// height: 166rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	animation: slideUpIn 1s ease-out forwards;
	opacity: 0;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 166rpx;
	color: $textDefaultColor;
	// padding: 5rpx 0;
	background-color: $bottomBg;
	// box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.08);
	.bar {
		// border: 1rpx solid red;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20%;
		// .message-tip {
		// 	position: absolute;
		// 	right: 46%;
		// 	top: -1rpx;
		// 	width: 30rpx;
		// 	height: 30rpx;
		// 	background-color: red;
		// 	border-radius: 50%;
		// 	color: white;
		// 	font-size: 22rpx;
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// }
		// .img{
		// 	height: 44rpx;
		// 	width: 44rpx;
		// }
		.selectedImg{
			height: 44rpx;
			width: 44rpx;
		}
		.badge{
			height: 44rpx;
			width: 44rpx;
		}
		.phoneBtn {
			position: absolute;
			opacity: 0;
		}
		text {
			height: 28rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 20rpx;
			color: #1f1f1f;
			margin-top: 4rpx;
		}
	}

	.bar .active {
		color: #d81e06; 
	}
}
// .custom-tabbar.show {
//   transform: translateY(0);
// }
.custom-tabbar.show {
  animation-play-state: running;
}
@keyframes slideUpIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.tabbar-item {
  // border: 1rpx solid red;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
  height: 166rpx;
  .badge{
  	height: 44rpx;
  	width: 44rpx;
  }
  .item-top {
    flex-shrink: 0;
    width: 44rpx;
    height: 44rpx;
    padding: 12rpx;
    image {
      width: 100%;
      height: 100%;
	  // border: 1rpx solid black;
    }
  }
  .item-bottom {
   width: 100%;
   font-family: PingFang SC, PingFang SC;
   font-weight: 400;
   font-size: 20rpx;
   opacity: 0.4;
  }
  .item-active {
    color: $textSelectedColor;
	opacity: 1;
  }
}
.center-item {
  position: relative;
  .item-top {
    position: absolute;
    top: -22rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 94rpx;
    height: 94rpx;
    background-color: $centerItemBg;
    border-radius: 50%;
	// border: 1rpx solid red;
	
	image {
	  width: 100%;
	  height: 100%;
	  // box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(10,65,21,0.16);
	  // border: 1rpx solid black;
	}
  }
  .item-bottom {
    position: absolute;
    bottom: 5rpx;
	
  }
}
.center-item {
  position: relative;
  // border: 1rpx solid rebeccapurple;
  .selectedImg {
    position: absolute;
    top: -22rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 94rpx;
    height: 94rpx;
    background-color: $centerItemBg;
    border-radius: 50%;
	// border: 1rpx solid red;
	image {
	  width:100%;
	  height:100%;
	  // box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(10,65,21,0.16);
	  // border: 1rpx solid black;
	}
  }
  text {
    position: absolute;
    bottom: 5rpx;
  }
}
</style>
