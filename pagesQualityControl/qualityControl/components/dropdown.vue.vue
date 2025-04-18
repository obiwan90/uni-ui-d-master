<!-- dropdown.vue -->
<template>
	<view class="menu-dropdown-wrapper">
		<view class="dropdown-trigger" @click="toggleDropdown">
			<text class="pannel-text1">修改质检</text>
		</view>
		<van-overlay :show="showDropdown" @click="onClickHide">
			<view class="dropdown-content" :style="{ top: `${triggerTop + triggerHeight + 12}px` }">
				<view class="dropdown-bubble" :style="{ left: `${triggerLeft + 24}px` }"></view>
				<view
					style="
						width: 662rpx;
						height: 94rpx;
						background: #ffffff;
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-left: 40rpx;
						padding-right: 40rpx;
					"
				>
					<view v-for="(item, index) in 3" :key="index" style="display: flex; align-items: center; gap: 10rpx">
						<image style="height: 32rpx; width: 32rpx; border: 1rpx solid red" src="" mode="aspectFill"></image>
						<text class="pannel-text">商品录入</text>
					</view>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script setup>
const showDropdown = ref(false);
const triggerHeight = ref(0);
const triggerTop = ref(0);
const triggerLeft = ref(0);

const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	getTriggerPosition();
};

const getTriggerPosition = () => {
  nextTick(() => {
    const query = uni.createSelectorQuery();
    query
      .select('.dropdown-trigger')
      .boundingClientRect()
      .exec((res) => {
        triggerTop.value = res[0].top;
        triggerHeight.value = res[0].height;
        triggerLeft.value = res[0].left;
        console.log('triggerTop:', triggerTop.value);
        console.log('triggerHeight:', triggerHeight.value);
        console.log('triggerLeft:', triggerLeft.value);
      });
  });
};

const onClickHide = () => {
	showDropdown.value = false;
};

</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}

.menu-dropdown-wrapper {
	position: relative;
	display: inline-block;
	.dropdown-trigger {
		width: 146rpx;
		height: 60rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 30rpx 30rpx 30rpx 30rpx;
		border: 2rpx solid #eeeeee;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		width: 710rpx;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		animation: fade-in 0.3s ease-in-out;

		.dropdown-bubble {
			position: absolute;
			top: -20rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 0;
			border-left: 12rpx solid transparent;
			border-right: 12rpx solid transparent;
			border-bottom: 24rpx solid #ffffff;
		}
	}
}

@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translate(-50%, -10px);
	}
	100% {
		opacity: 1;
		transform: translate(-50%, 0);
	}
}
.pannel-text {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.pannel-text1 {
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.8;
}
</style>
