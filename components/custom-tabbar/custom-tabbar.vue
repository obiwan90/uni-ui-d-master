<template>
	<!-- 底部空白区域 -->
	<view style="height: 192rpx; background: transparent"></view>
	<view class="custom-tabbar" :class="{ 'show': isVisible }">
		<!-- <view class="bar" v-for="(item, index) in list" :key="index" @click="onTabClick(index)" :class="[item.centerItem ? ' center-item' : '']">
			<image class='selectedImg' :src="currentTabIndex === index ? item.selectedIconPath : item.iconPath" mode="scaleToFill"></image>
			<uni-badge class="badge" v-else size="small" :text="messageCount" absolute="rightTop" type="error">
				<image class="img" :src="currentTabIndex === index ? item.selectedIconPath : item.iconPath" mode="scaleToFill"></image>
			</uni-badge>
			<text :class="{ active: currentTabIndex === index }">{{ item.text }}</text>
		</view> -->
		
		<view
			class="tabbar-item"
			:class="[item.centerItem ? ' center-item' : '']"
			:style="'width: calc(100% /' + list.length + ')'"
			@click="onTabClick(i)"
			v-for="(item, i) in list"
			:key="i">
			<view class="item-top">
				<image :src="currentTabIndex === i ? item.selectedIconPath : item.iconPath" />
				<!-- <uni-badge v-else class="badge"  size="small" :text="shopCarCount" absolute="rightTop" type="error">
					<image :src="currentTabIndex === i ? item.selectedIconPath : item.iconPath" mode="scaleToFill"></image>
				</uni-badge> -->
			</view>
			<view class="item-bottom" :class="[currentTabIndex === i ? 'item-active' : '']">{{ item.text }}</view>
			<button v-if="i===3" class="cusService" open-type="contact" @contact="onContact" send-message-title="客服消息标题" show-message-card plain>客服</button>
		</view>
		<!-- </view> -->
		
	</view>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore';
import { useTokenStore } from '@/stores/tokenStore';
import { useUserStore } from '@/stores/userInfoStore.js';
import { onMounted } from 'vue';
import { apiGetBrand, apiGetmaintenanceHis, apiCheackMaintenance } from '@/api/maintenance/maintenanceApi.js';
const shopCarCount = computed(() => useUserStore().shopCount);
const props = defineProps({
	showShop: {
		type: Boolean,
		default: () => false
	}
});

const isVisible = ref(false)
const messageCount = ref(100);
const tabStore = useTabStore();
const currentTabIndex = computed(() => tabStore.currentTabIndex);
//当前是否正在处理点击事件
const isClicking = ref(false);
const getmaintenanceHis = async () => {
	const data = {
		opid: useTokenStore().opid
	};
	return await apiGetmaintenanceHis(data);
};
const getBrand = async () => {
	const data = {
		brand_id: 1, //默认1
		opid: useTokenStore().opid
	};
	return  await apiGetBrand(data);
};
const brandListRes= ref()
const maintenanceHisRes = ref()
// const loadPreData =async (index)=>{
// 	if(currentTabIndex.value!==index&&index===1){
// 		tabStore.setCurrentTabIndex(index);
// 		brandListRes.value =  await getBrand();
// 		maintenanceHisRes.value = await getmaintenanceHis();
// 	}
// }


const loadPreData = async (index) => {
	if (currentTabIndex.value !== index && index === 1) {
		tabStore.setCurrentTabIndex(index);
		try {
			const [brandResponse, maintenanceResponse] = await Promise.all([
				getBrand(),
				getmaintenanceHis()
			]);
			brandListRes.value = brandResponse;
			maintenanceHisRes.value = maintenanceResponse;
		} catch (error) {
			console.error('请求失败:', error);
		}
	}
};


const onTabClick =async (index) => {
	console.log('onTabClick:',index)
	if (isClicking.value) {
		return;
	}
	// 锁定点击状态
	isClicking.value = true;
	let mineIndex = uni.getStorageSync('selectedMine')
	let data = uni.getStorageSync('identityData')
	if(mineIndex){
		list.value[4].pagePath = data[mineIndex].path
	}else{
		list.value[4].pagePath = mineData.value[0].path
	}
	
	let pages = getCurrentPages()
	if(currentTabIndex.value === index){
		isClicking.value = false;
		return
	}
	
	//从4跳0
	if(currentTabIndex.value===4&&index===0){
		console.log('从4跳0');
		tabStore.setCurrentTabIndex(index);
		if(getCurrentPages().length>1){
			uni.navigateBack({
				 delta: getCurrentPages().length - 1
			})	
			
		}else{
			tabStore.setCurrentTabIndex(index);
			uni.reLaunch({
				url: list.value[index].pagePath
			})
		}
		isClicking.value = false;
		return
	}
	let nextPageData = null
	//预处理
	if(index===1){
		// await loadPreData(index)
		// nextPageData = {
		//   brandListRes: brandListRes.value,
		//   maintenanceHisRes: maintenanceHisRes.value
		// };
	}
	if(index!==3){
		tabStore.setCurrentTabIndex(index);
		uni.navigateTo({
		    url: `${list.value[index].pagePath}?nextPageData=${encodeURIComponent(JSON.stringify(nextPageData))}`
		});
	}
	isClicking.value = false;
};

const list = ref([
	{
		text: '首页',
		pagePath: '/pages/home/home',
		iconPath: 'https://www.xzxskj.com/Public/upload/66c97f9990c9331.png',
		selectedIconPath: 'https://www.xzxskj.com/Public/upload/66c97faaa29401777.png',
	    centerItem: false
	},
	{
		text: props.showShop?'购物车':'保修查询',
		pagePath: props.showShop?'/pagesShopCar/shopCar/shopCar':'/pagesMaintenance/maintenance/maintenance',
		iconPath: props.showShop?'https://www.xzxskj.com/xcximg/icon_car@3x.png':'https://www.xzxskj.com/Public/upload/66c97f69bc3108295.png',
		selectedIconPath: props.showShop?'https://www.xzxskj.com/xcximg/icon_car_sel@3x.png':'https://www.xzxskj.com/Public/upload/66c97f7f3db9e4149.png',
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
const mineData = ref([
	{index:0,path:'/pagesUserMine/userMine/userMine'},
	{index:1,path:'/pagesCustomMine/customMine/customMine'},
	{index:2,path:'/pagesCustomMine/customMine/customMine'}
])
// const getPhone = async (e) => {
// 	const session = await useTokenStore().getSession();
// 	const token = await useTokenStore().getToken();
// 	// console.log("session:"+session);
// 	const data = {
// 		encryptedData: e.detail.encryptedData,
// 		iv: e.detail.iv,
// 		session_key: session.session_key,
// 		opid: session.opid
// 	};
// 	//获取手机号
// 	const res = await apiGetPhone(data);
// 	//保存仓库
// 	useTokenStore().setPhone(res.phone);
// 	const phone = res.phone;
// 	const addUserParam = {
// 		opid: session.opid,
// 		phone: phone,
// 		yqopid: '' //邀请人opid
// 	};
// 	const userInfoParam = {
// 		openid: session.opid
// 	};
// 	//查询用户 判断
// 	const userInfo = await apiGetUserInfo(userInfoParam);
// 	console.log('userInfo：' + JSON.stringify(userInfo));
// 	if (userInfo.info == null) {
// 		//新增用户
// 		const res1 = await apiAddWxUser(addUserParam);
// 		// console.log(JSON.stringify(res1))
// 	}
// };
onShow(() => {
  isVisible.value = true;
});
onHide(() => {
  isVisible.value = false;
});
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
