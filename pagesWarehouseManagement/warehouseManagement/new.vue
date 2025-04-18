<template>
	<view class="newWarehouseManagement-layout">
		<custom-header>
			<template #name>新建仓库</template>
			<template #fill>新建仓库</template>
		</custom-header>
		
		<view style="margin-top: 52rpx;width: 710rpx;height: 100rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 24rpx;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">仓库名称</text>
			<input type="text"  style="text-align: right;" placeholder="请输入" v-model="name">
		</view>
		
		<view style="margin-top: 60rpx;">
			<uv-checkbox-group v-model="checkboxValue" shape="circle" @change="selected">
				<uv-checkbox activeColor="red"  name="1" label="设为首选仓库" labelColor="grey"></uv-checkbox>
			</uv-checkbox-group>
		</view>
	</view>
	<view  class="select-btn">
		<view class="confim-btn button-animation" @click="confirm">
			<text>确认修改</text>
		</view>
	</view>
</template>

<script setup>
import { apiWarehouseSubmit } from '@/api/warehouseManagement/warehouseManagement.js'
const ckItem = ref(null)
const checkboxValue= ref([]) 
const name = ref('')
const selected = (e)=>{
	console.log(e)
}
const apiWarehouseSubmitAc = async ()=>{
	const data = {
		id:ckItem.value?ckItem.value.id:'',
		name:name.value,
		sxck:checkboxValue.value[0]==='1'?'1':'2' //1首先 2不是
	}
	const res = await apiWarehouseSubmit(data)
	if(res.code === 200){
		uni.showToast({
			icon:'none',
			title:'保存成功',
			duration:1000
		})
		uni.navigateBack()
	}
}
const confirm =async ()=>{
	await apiWarehouseSubmitAc()
}
onLoad((options)=>{
	if(options.ckItem){
		ckItem.value = JSON.parse(decodeURIComponent(options.ckItem));
		name.value = ckItem.value.name
		console.log('ckItem:',ckItem.value)
		if(ckItem.value.sxck==="1"){
			checkboxValue.value = ['1']
		}
	}
})
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.newWarehouseManagement-layout{
	min-height: 100vh;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.select-btn {
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
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 24rpx;
	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}

</style>