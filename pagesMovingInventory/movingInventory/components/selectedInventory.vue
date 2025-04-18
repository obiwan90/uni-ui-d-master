<template>
	<view class="selectedInventory-layout">
		<view style="display: flex; align-items: center; justify-content: space-between; width: 100%">
			<text class="text-1">选择仓库</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		
		<view class="content">
		  <view class="card" v-for="(item1,index1) in props.cklist" :key="index1" @click="selectCard(index1, item1.id)" :class="{ 'selected': selectedOptions.includes(item1.id) }">
		    <text>{{item1.name}}</text>
		  </view>
		</view>
		
		<view style="height: 200rpx;">
			
		</view>
		<view  class="select-btn">
			<view class="confim-btn button-animation" @click="$emit('close')" style="width: 232rpx;background: #F2F3F6;">
				<text style="color: #1F1F1F;">取消</text>
			</view>
			
			<view class="confim-btn button-animation" @click="confirm" style="width: 444rpx;">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const emit = defineEmits(['close','selectedOptions']);
const props = defineProps({
	cklist: {
		type: Array,
		default: []
	}
});
const selectedOptions = ref([]); 

const selectCard = (index,id) => {
    const optionIndex = selectedOptions.value.indexOf(id);
    if (optionIndex > -1) {
        selectedOptions.value.splice(optionIndex, 1);
    } else {
        selectedOptions.value.push(id);
    }
};
const confirm = () => {
	emit('selectedOptions', selectedOptions.value);
	setTimeout(() => {
		emit('close')
	}, 500);
	
};

</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.selectedInventory-layout{
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 40rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
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
	gap: 14rpx;
	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
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
.content{
	display: grid;
	grid-template-columns: 33.33% 33.33% 33.33%;
	row-gap: 18rpx;
	column-gap: 9rpx;
	margin-top: 52rpx;
	.card {
		width: 218rpx;
		height: 64rpx;
		background: #f9f9f9;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #1f1f1f;
		}
	}
	.selected{
		animation: selectedAnimation 0.3s ease;
		background: #FFEEEC;
		text{
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #E6432E;
			text-align: center;
		}
	}
}
.text-1{
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 28rpx;
	color: #1F1F1F;
}
</style>