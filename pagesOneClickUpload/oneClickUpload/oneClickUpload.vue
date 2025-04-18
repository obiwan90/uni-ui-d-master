<template>
  <view class="page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">{{ currentSection.text }}</text>
    </view>

    <!-- 中间相机 -->
    <!-- <view class="camera-container"> -->
      <camera 
		auto-focus="true"
        id="camera" 
        device-position="back" 
        mode="normal" 
        :flash="flash ? 'on' : 'off'" 
        @error="error"
        class="camera"
      >
        <!-- 闪光灯按钮 -->
        <cover-view @click="toggleFlash" class="flash-button">
          <cover-image v-if="flash" src="https://www.xzxskj.com/xcximg/closeflish.png" mode="aspectFill"></cover-image>
          <cover-image v-else src="https://www.xzxskj.com/xcximg/openflish.png" mode="aspectFill"></cover-image>
        </cover-view>
      </camera>
    <!-- </view> -->

    <!-- 底部按钮区域 -->
   <!-- <view class="footer" :class="{ 'justify-center': !currentImageSrc && sectionIndex === 0 }"> -->
    <view class="footer" :class="{ 'justify-center': sectionIndex === 0 }">
      <!-- 照片预览 -->
      <view v-if="currentImageSrc && sectionIndex > 0" @click="previewImage" class="preview-button">
        <image v-if="currentImageSrc" :src="currentImageSrc" style="height: 100%;width: 100%;" mode="aspectFill"></image>
      </view>

      <!-- 拍照按钮 -->
      <view @click="takePhotoDebounce" class="capture-button">
        <view class="inner-circle"></view>
      </view>

      <!-- 重拍按钮 -->
      <view v-if="sectionIndex > 0" @click="retakePhoto" class="retake-button">
        <image src="https://www.xzxskj.com/xcximg/retake.png" style="height: 100%; width: 100%;" mode="aspectFill"></image>
      </view>
    </view>
  </view>
</template>


<script setup>
import { debounce } from '@/utils/debounce.js';
import { customTakePhotoUploadFiles } from '../../utils/common.js'; 

const data = ref([
  {
    title: '上传图片',
    items: [
      { text: '机身背面', image: 'https://www.xzxskj.com/xcximg/img_add_img@3x.png', fileList: [] },
      { text: '关于本机', image: 'https://www.xzxskj.com/xcximg/img_add_about@3x.png', fileList: [] },
      { text: '屏幕息屏', image: 'https://www.xzxskj.com/xcximg/img_add_closewindow@3x.png', fileList: [] }
    ]
  },
  {
    title: '中框四面',
    items: [
      { text: '中框上方', image: 'https://www.xzxskj.com/xcximg/img_add_upward@3x.png', fileList: [] },
      { text: '中框右侧', image: 'https://www.xzxskj.com/xcximg/img_add_right@3x.png', fileList: [] },
      { text: '中框下方', image: 'https://www.xzxskj.com/xcximg/img_add_downward@3x.png', fileList: [] },
      { text: '中框左侧', image: 'https://www.xzxskj.com/xcximg/img_add_left@3x.png', fileList: [] }
    ]
  },
  {
    title: '机身四角',
    items: [
      { text: '左上角', image: 'https://www.xzxskj.com/xcximg/img_add_lefttop@3x.png', fileList: [] },
      { text: '右上角', image: 'https://www.xzxskj.com/xcximg/img_add_righttop@3x.png', fileList: [] },
      { text: '右下角', image: 'https://www.xzxskj.com/xcximg/img_add_rightdown@3x.png', fileList: [] },
      { text: '左下角', image: 'https://www.xzxskj.com/xcximg/img_add_leftdown@3x.png', fileList: [] }
    ]
  }
]);

const sectionIndex = ref(0);
const src = ref('');
const showCamera = ref(true);
const flash = ref(false);

const takePhoto = () => {
  const ctx = uni.createCameraContext();
  if (!showCamera.value) {
    uni.showToast({ title: '所有图片已上传', icon: 'none' });
    return;
  }
  ctx.takePhoto({
    quality: 'high',
    success: async (res) => {
      src.value = res.tempImagePath;
      console.log('Photo taken:', res.tempImagePath);
      const currentItem = data.value.flatMap(section => section.items)[sectionIndex.value];
      // 清空 fileList 中的现有图片
      if (currentItem.fileList.length > 0) {
        currentItem.fileList.splice(0, currentItem.fileList.length);
      }
      await customTakePhotoUploadFiles(res.tempImagePath, currentItem);
      uni.setStorageSync('photoData', data.value);
      console.log('photoData:', data.value);
      nextStep();
    }
  });
};
const takePhotoDebounce = debounce(() => {
  console.log('Debounced take photo called');
  takePhoto();
}, 300);

const error = (e) => {
  console.log('Camera error:', e.detail);
};

const previewImage = () => {
  const fileList  = data.value.flatMap(section => section.items).flatMap(item => item.fileList).map(file => file.url);
  console.log('fileList:', fileList);
  if (fileList.length > 0) {
    uni.previewImage({
      urls: fileList,
      current: sectionIndex.value
    });
  }
};

const nextStep = () => {
  const items = data.value.flatMap(section => section.items);
  if (sectionIndex.value < items.length - 1) {
    sectionIndex.value++;
  } else {
    showCamera.value = false;
    uni.navigateBack()
  }
};

const retakePhoto = () => {
  if (sectionIndex.value > 0) {
    sectionIndex.value--;
  }
};

const toggleFlash = () => {
  flash.value = !flash.value;
};

const currentSection = computed(() => {
  const items = data.value.flatMap(section => section.items);
  return items[sectionIndex.value];
});

const currentImageSrc = computed(() => {
  let item;
  if (sectionIndex.value > 0) {
    item = data.value.flatMap(section => section.items)[sectionIndex.value - 1];
  } else {
    item = data.value.flatMap(section => section.items)[sectionIndex.value];
  }
  return item.fileList.length > 0 ? item.fileList[0].url : '';
});

onLoad(() => {
  const photoData = uni.getStorageSync('photoData');
  if (photoData) {
    data.value = photoData;
  }
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: black;
}

.header {
  flex: 0 0 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.camera-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.camera {
  width: 100%;
  height: 100%;
}

.flash-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1000;
}

.footer {
  padding: 0 30rpx;
  flex: 0 0 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
}

.footer.justify-center {
  justify-content: center;
}

.preview-button {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.capture-button {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.capture-button .inner-circle {
  width: 60px;
  height: 60px;
  background-color: red;
  border-radius: 50%;
}

.retake-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
