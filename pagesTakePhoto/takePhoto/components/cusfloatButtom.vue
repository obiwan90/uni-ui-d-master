<template>
  <view
    class="cus-float-button"
    :style="{ right: right + 'px', top: top + 'px' }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
	@click="handleClick"
  >
	<!-- /pagesTakePhoto/static/icon_fabu_maihuo@3x.png -->
    <view class="button-image-container">
      <image
        class="button-image"
        src="https://www.xzxskj.com/xcximg/icon_fabu_maihuo@3x.png"
        mode="aspectFill"
      ></image>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits('fab-button-click')
const top = ref(0)
const right = ref(0)
const startY = ref(0)
const startX = ref(0)
const isMoving = ref(false)

onMounted(() => {
  const { windowHeight, windowWidth } = uni.getSystemInfoSync()
  top.value = 200;  // 修改为200px
  right.value = 20; // 修改为20px
})

function handleTouchStart(e) {
  const { windowWidth } = uni.getSystemInfoSync()
  startY.value = e.changedTouches[0].clientY - top.value; 
  startX.value = e.changedTouches[0].clientX; 
  isMoving.value = true;
}

function handleTouchMove(e) {
  if (isMoving.value) {
    const { windowHeight, windowWidth } = uni.getSystemInfoSync()
    // 更新 top 值
    top.value = e.changedTouches[0].clientY - startY.value;
    top.value = Math.max(0, Math.min(top.value, windowHeight - 60)); 
    // 更新 right 值
    right.value = windowWidth - e.changedTouches[0].clientX - 30; 
    right.value = Math.max(0, Math.min(right.value, windowWidth)); 
  }
}

function handleTouchEnd() {
  isMoving.value = false
}
function handleClick() {
  emit('fab-button-click');
}
</script>

<style lang="scss" scoped>
.cus-float-button {
  position: fixed;
  right: 0;
  border-radius: 50%; 
  height: 120rpx;
  width: 120rpx; 
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  z-index: 999;
  transition: transform 0.2s; 
}

.button-image-container {
  border-radius: 50%;
  height: 120rpx; 
  width: 120rpx; 
  // overflow: hidden; 
  border: 1rpx solid black;
}

.button-image {
  height: 140rpx; 
  width: 140rpx;   
  margin: -10rpx; 
  border-radius: 50%;
  // margin-bottom: -10rpx;
}
</style>
