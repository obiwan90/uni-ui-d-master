<template>
  <view class="staffinfos-warehouse-pannel">
    <view style="display: flex; align-items: center; justify-content: space-between">
      <text class="text-1">仓库配置</text>
      <image style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
    </view>
	<scroll-view scroll-y style="height: 520rpx;">
		<view
		  v-for="(item, index) in data"
		  :key="index"
		  style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2rpx solid #eeeeee; padding-top: 30rpx; padding-bottom: 30rpx"
		  @click="toggleSelection(index)"
		>
		  <text>{{ item.text }}</text>
		  <image :src="item.selected ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png'" style="height: 36rpx; width: 36rpx; border-radius: 4rpx;" mode="aspectFill"></image>
		</view>
	</scroll-view>
    <view 
      style="
        width: 750rpx;
        height: 182rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 14rpx;
        padding-bottom: 62rpx;
        padding-top: 22rpx;
      "
    >
      <view class="button-animation" @click="$emit('close')" style="width: 232rpx; height: 96rpx; background: #f2f3f6; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; justify-content: center; align-items: center">
        <text class="text-2">取消</text>
      </view>

      <view @click="onClick" class="button-animation"
        style="
          width: 444rpx;
          height: 96rpx;
          background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
          border-radius: 20rpx 20rpx 20rpx 20rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <text class="text-3">确定</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { apiAdminGetStore } from '@/api/station/station.js';
import { onMounted, ref, watch, defineExpose, nextTick } from 'vue';
const emit = defineEmits(['close','confirm'])
const data = ref([{ text: '全部仓库', ckid: '0', selected: false }])

const toggleSelection = (index) => {
  // if (index === 0) {
  //   data.value.forEach((item, i) => {
  //     if (i !== 0) {
  //       item.selected = data.value[0].selected;
  //     } else {
  //       item.selected = !item.selected;
  //     }
  //   });
  // } else {
  //   data.value[0].selected = false;
  //   data.value[index].selected = !data.value[index].selected;
  // }
  
  data.value[0].selected = false;
  data.value[index].selected = !data.value[index].selected;
  
};

// watch(
//   () => data.value.slice(1).every((item) => item.selected),
//   (allSelected) => {
//     data.value[0].selected = allSelected;
//   }
// );

const onClick = () => {
  emit('confirm', data.value);
  emit('close');
}

const apiAdminGetStoreData = async () => {
  const param = {
    opid: uni.getStorageSync('sessionInfo').opid,
  }
  const res = await apiAdminGetStore(param);
  if (res.code === 200) {
    res.lists.forEach((item) => {
      data.value.push({ text: item.name, ckid: item.id, selected: false });
    });
    nextTick(() => {
      if (storedCkidString.value) {
        setSelectedWarehouses(storedCkidString.value);
      }
    });
  }
}

// 存储传入的 ckidString 以便在数据加载后设置选中
const storedCkidString = ref('');

const setSelectedWarehouses = (ckidString) => {
  storedCkidString.value = ckidString;
  console.log('ckidString:', ckidString);
  const ckidArray = ckidString.split(',').map(id => id.trim());
  console.log('ckidArray:', ckidArray);

  data.value.forEach((item) => {
    const itemCkidStr = item.ckid.toString(); // 确保 item.ckid 是字符串
    console.log('Comparing:', itemCkidStr, typeof itemCkidStr, ckidArray.includes(itemCkidStr));
    item.selected = ckidArray.includes(itemCkidStr);
  });
  emit('confirm', data.value);
  console.log('选中的仓库：', data.value);
};

// 公开方法供父组件调用
defineExpose({
  setSelectedWarehouses
});

onMounted(() => {
  apiAdminGetStoreData()
})
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.staffinfos-warehouse-pannel {
  width: 752rpx;
  height: 804rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 40rpx;
}
.text-1 {
  height: 50rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: bold;
  font-size: 36rpx;
  color: #1f1f1f;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.text-2 {
  height: 44rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #1f1f1f;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.text-3 {
  height: 44rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
