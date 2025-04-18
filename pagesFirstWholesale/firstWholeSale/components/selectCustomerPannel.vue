<template>
	<view class="selectCustomerPannel-layout">
		
		<view style="display: flex; align-items: center; justify-content: space-between; width: 100%">
			<text class="text-1">客户名称</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill"></image>
		</view>
			<view
				style="
					margin-top: 46rpx;
					width: 710rpx;
					height: 72rpx;
					background: #ffffff;
					box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					border: 2rpx solid #242424;
					display: flex;
					align-items: center;
					padding-left: 30rpx;
					padding-right: 30rpx;
					padding-top: 20rpx;
					padding-bottom: 20rpx;
				"
			>
				<image style="margin-right: 16rpx;height: 30rpx; width: 30rpx; border-radius: 50%" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
				<qiaoSelect
					style="flex:1;"
					:keyId="1"
					:dataList="orgArray"
					phText="请输入姓名或绑定微信的手机号码"
					searchKey="name"
					:showBorder="false"
					:show="false"
					:disabled="false"
					:showPopup="false"
					@input="handleInput"
					@change="selectSearchChange"
				></qiaoSelect>
			</view>
			<scroll-view scroll-y="true" style="height:1000rpx;">
			<view style="margin-top: 40rpx;width: 750rpx; height: 6rpx; background: #f3f2f6; border-radius: 0rpx 0rpx 0rpx 0rpx"></view>
			<view style="height: 900rpx;width: 100%;">
				<scroll-view scroll-y="true" >
					<view @click="selectedCustomer(item)" v-for="(item,index) in dataList" :key="index" style="width: 100%;border-bottom: 2rpx solid #EEEEEE;display: flex;justify-content: space-between;align-items: center;padding-top: 24rpx;padding-bottom: 24rpx;">
						<!-- {{dataList}} -->
						<text class="text-2">{{item.name+" "+item.phone}}</text>
						<view style="display: flex;align-items: center;gap: 10rpx;">
							<van-tag size="mini" color="linear-gradient( 132deg, #FF6D0C 0%, #FF6D0C 100%)" text-color="#FFFFFF">未结算</van-tag>
							<van-tag size="mini" color="linear-gradient( 132deg, #FFEDE1 0%, #FFEDE1 100%)" text-color="#FF3400">{{item.num}}台</van-tag>
							<van-tag size="mini" color="linear-gradient( 132deg, #FFEDE1 0%, #FFEDE1 100%)" text-color="#FF3400">{{item.price}}元</van-tag>
						</view>
					</view>
				</scroll-view>
			</view>
			</scroll-view>
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiCustomerSearch } from '../../api/api.js';
const emit = defineEmits(['close'])
const input = ref('');
const orgArray = ref([]);
const selectSearchChange =async (e) => {
	console.log('模糊 e:', e);
};
const dataList = ref([])
const handleInput =async (inputText) => {
	// if (inputText.length>0) {
		dataList.value =await apiCustomerSearchData(inputText)
	// }
};
const apiCustomerSearchData = async (input) => {
	console.log('input:', input);
	const data = {
		phone: input
	}
	const res = await apiCustomerSearch(data);
	console.log('res:', res);
	if (res.zt === 1) {
		return res.lists
	}
	return []
};
const selectedCustomer = (item)=>{
	uni.$emit('selectedCustomer',item)
	emit('close')
}
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.selectCustomerPannel-layout {
	width: 750rpx;
	height: 1210rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 46rpx;
	padding-bottom: 20rpx;
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 36rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1F1F1F;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
</style>
