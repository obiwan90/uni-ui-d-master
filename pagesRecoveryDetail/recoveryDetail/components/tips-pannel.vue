<template>
	<view class="tips-pannel" style="display: flex; flex-direction: column">
		<view class="title" style="display: flex; align-items: center; justify-content: space-between">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 36rpx; color: #1f1f1f; text-align: left">温馨提示</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>

		<view style="margin-top: 48rpx">
			<text
				style="
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 36rpx;
					color: #1f1f1f;

					text-align: left;
				"
			>
				{{selectData.goodsname}}
			</text>
		</view>

		<view style="width: 710rpx; height: 0rpx; background: #eeeeee; border: 2rpx #eeeeee dotted; margin: 30rpx 0" class="divile" />

		<view class="content" style="display: flex; flex-direction: column">
			<view class="title" style="display: flex; align-items: center">
				<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; margin-right: 30rpx; text-align: left">{{selectData.djname}}</text>
				<text style="font-family: DIN, DIN; font-weight: bold; font-size: 56rpx; color: #e6432e; margin-right: 8rpx; text-align: left">￥{{selectData.price}}</text>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #1f1f1f; text-align: left">实时回收</text>
			</view>

			<view style="margin-top: 20rpx">
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: left">
					<!-- 包装可拆封但无破损，全套配件齐全且原装未使用包装可拆封但无破损，全套配件齐全且原装未使用 -->
					{{selectData.djms}}
				</text>
			</view>

			
		</view>
		<view style="height: 182rpx"></view>
		<view
			style="
				width: 750rpx;
				height: 182rpx;
				background: #ffffff;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				margin-top: 40rpx;
				position: fixed;
				box-sizing: border-box;
				bottom: 0;
				right: 0;
				left: 0;
				padding: 24rpx 30rpx 62rpx 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			"
			class="btns"
		>
			<view
				class="btn"
				style="
					width: 710rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text @click="$emit('close')" style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff; text-align: center">确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
  selectData: {
    type: Object,
    default: {} 
  }
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.tips-pannel {
	width: 750rpx;
	// height: 746rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 40rpx;
}

.btn {
	transition: background-color 0.3s, box-shadow 0.3s;

	&:active {
		background-color: #eb4636;
		color: #fff;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	&.is-hover {
		color: rgba(255, 255, 255, 0.6);
		background-color: #179b16;
	}
}
.btn {
	transition: all 0.3s ease;
}
</style>
