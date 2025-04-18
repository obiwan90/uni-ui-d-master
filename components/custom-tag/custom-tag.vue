<template>
  <view class="custom-tag" :style="{ backgroundColor: bgColor }">
    {{ tagText }}
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { tagText, bgColor } = defineProps(['tagText', 'bgColor']);
</script>

<style lang="scss" scoped>
.custom-tag {
  display: inline-flex;
  align-items: center;
  padding: 6rpx 8rpx;
  border-radius: 4rpx;
  font-family: 'PingFang SC', 'PingFang SC';
  font-weight: 400;
  font-size: 22rpx;
  color: #2E2E2E;
  height: 32rpx;
  margin-right: 6rpx;
  opacity: 0.7;
  padding-left:8rpx;
  padding-right:8rpx;
}
</style>
