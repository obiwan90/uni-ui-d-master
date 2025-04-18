<template>
	<view class="layout page">
		<!-- header -->
		<custom-header>
			<template #name>地址簿</template>
			<template #fill>地址簿</template>
		</custom-header>
		
		<view class="card" v-for="(item,index) in addressList" :key="item.id" >
			<view class="top">
				<view class="left" @click="selectedAddress(item)">
					<view class="tip" v-if="item.zt==='1'">
						<text>默认</text>
					</view>
					<text class="text-1">{{item.name}}</text>
					<text class="text-2">{{item.phone}}</text>
				</view>
				<view class="right">
					<image src="https://www.xzxskj.com/xcximg/icon_bianji@3x.png" mode="aspectFill" @click="goPage('/pagesAddAddress/addAddress/addAddress?id='+item.id)"></image>
					<image src="https://www.xzxskj.com/xcximg/icon_delete@3x.png" mode="aspectFill" @click="deleteAddress(item.id)"></image>
				</view>
				
			</view>
			<view class="bottom">
				<text>{{item.address}}</text>
			</view>
		</view>
		
		<!--bar -->
		<view class="bar" >
		<!-- <view class="bar" @click="goPage('/pagesAddAddress/addAddress/addAddress')"> -->
			<view class="btn" @click="createAddress">
				<text>添加新地址</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apigetAddress,apiDelAddress,apiAddAddress,apigetAddressDetail } from '@/api/address/address.js';

const deleteAddress = (id)=>{
	uni.showModal({
		title:"是否删除地址簿？",
		success:res=>{
			if(res.confirm){
				delAddress(id)
				//刷新数据
				getAddressList()
			}
		}
	})
}
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}

const createAddress = ()=>{
	uni.chooseAddress({
	  success(res) {
		console.log(res);
	    console.log(res.userName)
	    console.log(res.postalCode)
	    console.log(res.provinceName)
	    console.log(res.cityName)
	    console.log(res.countyName)
	    console.log(res.detailInfo)
	    console.log(res.nationalCode)
	    console.log(res.telNumber)
		addAddress(res)
		
	  }
	})
}

const addressList = ref([])
const getAddressList =async ()=>{
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
	};
	const res =await apigetAddress(data)
	if(res.zt === 1){
		addressList.value = res.lists
		uni.setStorageSync('addressList',res.lists)
	}
	console.log(res);
}

const hasDefaultAddress = (lists)=>{
  return lists.some(item => item.zt === '1');
}
const addAddress =async (res)=>{
	//判断是否有默认地址
	const has = hasDefaultAddress(addressList.value)
	console.log('has:',has);
	const data = {
		opid:uni.getStorageSync('sessionInfo').opid,
		name:res.userName,
		phone:res.telNumber,
		province:res.provinceName,
		city:res.cityName,
		area:res.countyName,
		address:res.detailInfo,
		zt:has?'0':'1',
	}
	const res1 =await apiAddAddress(data)
	if(res1.code === '200'){
		uni.showToast({
			title: '添加成功',
			icon: 'success',
			duration: 2000
		});
		//刷新数据
		getAddressList()
	}
	console.log(res1);
}

const delAddress = async(id)=>{
	const data = {
		opid:uni.getStorageSync('sessionInfo').opid,
		id:id
	}
	const res =await apiDelAddress(data)
	if(res.zt === 1){
		uni.showToast({
			title: '删除成功',
			icon: 'success',
			duration: 2000
		});
		//刷新数据
		getAddressList()
	}
	console.log(res);
}

const selectedAddress = (item) => {
	console.log('from',from.value)
  if (from.value !== '') {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    prevPage.setData({ selectedAddress: item });
    uni.navigateBack();
  }	
};

const from = ref('');

onShow(() => {
	getAddressList();
});
onLoad((options) => {
  if (options.from !== undefined && options.from !== '') {
    console.log('地址选择');
    from.value = options.from;
  }
  getAddressList();
});
</script>

<style lang="scss" scoped>
.layout{
	height: 100vh;
	width: 750rpx;
	background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.card{
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 142rpx;
		// background: #FFFFFF;
		// border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top:34rpx;
		
		// border-radius: 20rpx;
		// background: #FFFFFF;
		// box-shadow:  25rpx 25rpx 49rpx #666666,
		//              -25rpx -25rpx 49rpx #ffffff;
		
		border-radius: 20rpx;
		background: #FFFFFF;
		box-shadow:  20rpx 20rpx 48rpx #e0e0e0,
		             -20rpx -20rpx 48rpx #ffffff;
		
		// border-radius: 20rpx;
		// background: #FFFFFF;
		// box-shadow:  20rpx 20rpx 60rpx #d9d9d9,
		//              -20rpx -20rpx 60rpx #ffffff;
		
		.top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.left{
				box-sizing: border-box;
				display: flex;
				align-items: center;
				width: 80%;
				.tip{
					width: 64rpx;
					height: 36rpx;
					background: #FFFFFF;
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					border: 2rpx solid #E6432E;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 10rpx;
					text{
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #E6432E;
					}
				}
				.text-1{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 28rpx;
					color: #1F1F1F;
				}
				.text-2{
					margin-left: 12rpx;
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					opacity: 0.7;
				}
			}
			.right{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 20%;
				image{
					height: 28rpx;
					width: 28rpx;
					margin-left: 30rpx;
				}
			}
		}
		.bottom{
			text{
				height: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #1F1F1F;
				opacity: 0.7;
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
}
</style>