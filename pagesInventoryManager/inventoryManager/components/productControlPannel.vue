<template>
	<view class="productControlPannel-layout">
		<view style="margin-bottom: 60rpx; display: flex; justify-content: space-between; align-items: center; width: 100%">
			<text class="text-1">商品管理</text>
			<image style="height: 32rpx; width: 32rpx; border-radius: 50%" src="/pagesInventoryManager/static/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>

		<view
			style="
				width: 618rpx;
				background: #ffffff;
				box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				flex-direction: column;
				padding: 20rpx;
			"
		>
			<text class="text-2">{{name}}</text>

			<view style="display: flex; align-items: center; margin-top: 12rpx">
				<text class="text-3" style="margin-right: 10rpx">IMEI：{{imei}}</text>
				<image style="height: 20rpx; width: 20rpx; " src="/pagesInventoryManager/static/icon_copy@3x.png" mode="aspectFill"></image>
			</view>
		</view>

		<view style="margin-top: 36rpx;width: 100%;display: grid; grid-template-columns: repeat(4, 1fr); grid-column-gap: 70rpx; grid-row-gap: 20rpx">
			<view v-for="(item,index) in btnData" :key="index" style="display: flex; flex-direction: column; align-items: center">
				<view @click="actionHandle(item)" style="width: 80rpx; height: 80rpx; background: #e9f1ff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center; justify-content: center">
					<image style="height: 44rpx; width: 44rpx;" :src="item.image" mode="aspectFit"></image>
				</view>
				<text style="magin-top:20rpx" class="text-4">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiEditInventory } from '../../api/api.js'
const emit = defineEmits(['close'])
const props = defineProps({
  name: {
    type: String,
    default: '' 
  },
  imei: {
    type: String,
    default: ''
  },
  id:{
	type: String,
    default: ''
  }
})
const btnData = ref([
	// {text:'商品录入',image:'/pagesInventoryManager/static/icon_luru@3x.png',path:'/pagesProductInput/productInput/productInput?ch='+props.imei},
	// {text:'功能检测',image:'/pagesInventoryManager/static/icon_zhijian@3x.png',path:'/pagesFuncCheck/funcCheck/funcCheck?ch='+props.imei},
	// {text:'维修检测',image:'/pagesInventoryManager/static/icon_zhijian@3x.png',path:'/pagesMaintenanceInput/maintenanceInput/maintenanceInput?ch='+props.imei},
	// {text:'拍照',image:'/pagesInventoryManager/static/icon_paizhao@3x.png',path:'/pagesTakePhoto/takePhoto/takePhoto?ch='+props.imei},
	// {text:'成色判断',image:'/pagesInventoryManager/static/icon_chengse@3x.png',path:'/pagesFinenessJudge/finenessJudge/finenessJudge?ch='+props.imei},
	// {text:'修改价格',image:'/pagesInventoryManager/static/icon_shangjia@3x.png',path:'/pagesListingProduct/listingProduct/listingProduct?ch='+props.imei},
	{text:'退出库存',image:'/pagesInventoryManager/static/icon_kucun@3x.png',path:'/Home/Goods/updatezt?zt=2',menuAuthority:''},
])
const actionHandle = (item)=>{
	if(item.text !== '退出库存'){
		uni.navigateTo({
			url:item.path
		})
	}else{
		// apiEditInventoryData({id:props.id, zt:'2'})
		apiEditInventoryData(item.path,{id:props.id, zt:'2'})
	}
}

const apiEditInventoryData = async (url,data) => {

	const res = await apiEditInventory(url,data);
	if (res.code === 200) {
		uni.showToast({
			title: '操作成功',
			icon: 'none',
			duration: 2000
		});
		emit('close')
	}
};

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.productControlPannel-layout {
	width: 666rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 34rpx;
	padding-bottom: 46rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.text-1 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 30rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-3{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 22rpx;
	color: #828282;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-4{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1F1F1F;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.5;
}
</style>
