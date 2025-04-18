<template>
	<view class="layout pageBg">
		<image class="login" src="https://www.xzxskj.com/xcximg/logo.png" mode="aspectFit"></image>
		<view class="btn">
			<text>手机号快捷登录</text>
			<button class="phoneBtn" open-type="getPhoneNumber" @getphonenumber="getPhone" plain>获取手机号</button>
		</view>
	</view>
</template>

<script setup>
import { apiGetPhone } from '@/api/login/loginApi.js'
import { apiAddWxUser,apiGetUserInfo } from '@/api/member/member.js'
import { useTokenStore } from '@/stores/tokenStore';
import { useUserStore } from '@/stores/userInfoStore.js'
const getPhone =async (e)=>{
	const session =await useTokenStore().getSession();
	const token =await useTokenStore().getToken();
	const data = {
		  encryptedData: e.detail.encryptedData, 
		  iv: e.detail.iv,
		  session_key: session.session_key, 
		  opid:session.opid,
	}
	const res = await apiGetPhone(data)
	console.log('login res:',res);
	if(res.phone!==null){
		useTokenStore().setPhone(res.phone)
		const locationForm = uni.getStorageSync('locationForm')
		const phone = res.phone
		const addUserParam = {
		  opid:session.opid,
		  phone: phone,
		  yqopid : '', 
		  laiyuan:1,
		  city:locationForm?locationForm.city:'',
		  unionid:uni.getStorageSync('sessionInfo').unionid
		};
		const userInfoParam = {
			openid:session.opid,
		}
		//新增用户
		const res1 =await apiAddWxUser(addUserParam);
		const userInfo =await apiGetUserInfo(userInfoParam)
		if(userInfo){
			useUserStore().setInfo(userInfo)
		}
		uni.reLaunch({
			url:'/pages/home/home'
		})
	}else{
		uni.showToast({
			title: '登录失败',
			icon: 'error',
			duration: 2000
		});
		uni.navigateTo({
			url:'/pages/home/home'
		})
	}
	
}
</script>

<style lang="scss" scoped>
	.layout{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: #FEF9F8;
		view,swiper,swiper-item{
			box-sizing: border-box;
		}
		.login{
			height: 400rpx;
			width: 550rpx;
			margin-bottom: 110rpx;
		}
		.btn{
			width: 688rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;
			
			text{
				// width: 60rpx;
				// height: 42rpx;
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
			}
			.phoneBtn{
				position: absolute;
				width: 100%;
				opacity: 0;
			}
		}
	}
</style>