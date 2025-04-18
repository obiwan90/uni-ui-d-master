<template>
	<view class="box-tab" :style="{ background: backgroundColor }">
		<view class="col1" v-if="text1">
			<text class="text1Class" :style="{color:text1Color + '!important'}">{{ text1 }}</text>
		</view>
		<view class="col2" v-if="text2">
			<text class="text2Class" :style="{color:text2Color + '!important'}">{{ text2 }}</text>
		</view>
	</view>
</template>

<script setup>
    const props = defineProps({
        text1: String,
        text2: String,
        backgroundColor: String,
		text1Color: String,
		text2Color: String
    });
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.box-tab{
	// height: 34rpx;
	height: 40rpx;
	border-radius: 8rpx 8rpx 8rpx 8rpx;
	// border: 1rpx solid #FF5221;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// padding-left: 4rpx;
	// padding-right: 4rpx;
	.col1{
		background: #ffffff;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 4rpx;
		padding-right: 4rpx;
		margin-left: 1rpx;
		margin-right: 1rpx;
		.text1Class{
			height: 30rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 22rpx;
			color: #E6432E;
			text-align: center;
		}
	}
	.col2{
		padding-left: 4rpx;
		padding-right: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.text2Class{
			height: 30rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 22rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
}

</style>
