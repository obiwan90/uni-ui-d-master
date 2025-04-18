<template>
  <view class="userServicePannel12-layout1">
	  <!-- 预约发货 -->
    <view style="display: flex; justify-content: space-between; align-items: center;">
      <text class="text" style="font-weight: bold; font-size: 36rpx; color: #1F1F1F;">预约发货</text>
      <image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" style="height: 32rpx; width: 32rpx;" mode="aspectFill" @click="$emit('close')"></image>
    </view>

    <view style="margin-top: 56rpx; width: 710rpx; background: #FFFFFF; border-radius: 20rpx; display: flex; justify-content: space-between; align-items: center; padding: 20rpx;">
      <text>邮寄方式</text>
      <view style="display: flex; justify-content: center; align-items: center; gap: 10rpx;">
       <view 
          :style="{'background': thfs === '1' ? '#FFEEEC' : '#F9F9F9'}" 
          style="width: 180rpx; border-radius: 10rpx; display: flex; justify-content: center; align-items: center; padding: 14rpx 26rpx;"
          @click="selectMethod('1')">
          <text class="text" style="font-weight: 400; color: thfs.value === '1' ? '#EB46336' : '#1F1F1F'; font-size: 32rpx;">预约取件</text>
        </view>
        <view 
          :style="{'background': thfs === '2' ? '#FFEEEC' : '#F9F9F9'}" 
          style="width: 180rpx; border-radius: 10rpx; display: flex; justify-content: center; align-items: center; padding: 14rpx 26rpx;"
          @click="selectMethod('2')">
          <text class="text" style="font-weight: 400; color: thfs.value === '2' ? '#EB4636' : '#1F1F1F'; font-size: 32rpx;">自行寄出</text>
        </view>
      </view>
    </view>
	
	<view style="margin-top: 20rpx; width: 710rpx; background: #FFFFFF; border-radius: 20rpx; padding: 20rpx; display: flex; justify-content: space-between;">
	  <text class="text" style="font-size: 32rpx; font-weight: 400; color: #1F1F1F;">我的地址</text>
	  <view style="display: flex; justify-content: center; align-items: center; flex: 1; gap: 10rpx;" @click="goPage('/pagesAddress/address/address?from='+'subOrder')">
	    <view style="display: flex; flex-direction: column; gap: 20rpx; align-items: flex-end; justify-content: space-between; flex: 1;">
	      <text class="text" style="font-weight: 400; font-size: 28rpx; color: #1F1F1F; text-align: right;">{{addressList[0].province+addressList[0].city+addressList[0].area+addressList[0].address}}</text>
	      <text class="text" style="font-weight: 400; font-size: 28rpx; color: #1F1F1F;">{{addressList[0].name+' '+addressList[0].phone}}</text>
	    </view>
	    <image style="height: 24rpx; width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill" ></image>
	  </view>
	</view>
	
    <view v-if="thfs === '1'" style="margin-top: 20rpx; width: 710rpx; background: #FFFFFF; border-radius: 20rpx; padding: 28rpx 24rpx; display: flex; justify-content: space-between; align-items: center;">
      <text class="text" style="font-weight: 400; font-size: 32rpx; color: #1F1F1F;">上门日期</text>
      <view class="example-body" style="display: flex; align-items: center; gap: 10rpx; justify-content: center;">
        <uni-datetime-picker ref="datePicker" type="date" v-model="date" @change="onDateChange" :border="false">
          <text>{{ date }}</text>
          <image style="height: 24rpx; width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
        </uni-datetime-picker>
      </view>
    </view>

    <view v-if="thfs === '1'" style="margin-top: 20rpx; width: 710rpx; background: #FFFFFF; border-radius: 20rpx; padding: 28rpx 24rpx; display: flex; justify-content: space-between; align-items: center;">
      <text class="text" style="font-weight: 400; font-size: 32rpx; color: #1F1F1F;">上门时间</text>
      <view class="example-body" style="display: flex; align-items: center; gap: 10rpx; justify-content: center;">
        <picker mode="selector" :range="getUpdatedTimeRange()" @change="onTimeRangeChange">
          <view style="display: flex; align-items: center;">
            <text>{{ selectedTimeRange }}</text>
            <image style="height: 24rpx; width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
          </view>
        </picker>
      </view>
    </view>

    <view class="bottom-btn" @click="confirm">
      <button class="center-btn">提交</button>
    </view>
  </view>
</template>

<script setup>
import { apigetAddressDetail,apiBookingExpress,apigetAddress } from '../../api/api.js';
const props = defineProps({
	infos:{
		type: Object,
		default:{}
	}
});
const emit = defineEmits(['close','subExpress'])
//默认地址
const addressList = ref([]);
const selectedAddress = ref(null);
const getAddressList = async () => {
  if (selectedAddress.value) {
    addressList.value = [selectedAddress.value];
  } else {
    const data = {
      opid: uni.getStorageSync('sessionInfo').opid,
    };
    const res = await apigetAddress(data);
    if (res.lists&&res.lists.length>0) {
      addressList.value = res.lists.filter(item => item.zt === '1');
      console.log('addressList1:',addressList.value);
    }else{
		addressList.value = []
	}
	console.log('addressList2:',addressList.value)
  }
};


// const date = ref('请选择日期'); // 保存选择的日期
const date = ref(new Date().toISOString().split('T')[0]); // 设置为当前日期
const selectedTimeRange = ref('请选择时间'); // 用于显示选择的时间范围
const thfs = ref('1'); // 默认选择预约取件

// 原始时间范围数组
const timeRange = ref([
  '08:00:00-09:00:00',
  '09:00:00-10:00:00',
  '10:00:00-11:00:00',
  '11:00:00-12:00:00',
  '12:00:00-13:00:00',
  '13:00:00-14:00:00',
  '14:00:00-15:00:00',
  '15:00:00-16:00:00',
  '16:00:00-17:00:00',
  '17:00:00-18:00:00',
  '18:00:00-19:00:00'
]);

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const getUpdatedTimeRange = () => {
  const currentTime = getCurrentTime();
  const newTimeRange = timeRange.value.filter(range => {
    const [start, end] = range.split('-');
    return currentTime >= start && currentTime <= end;
  });

  if (newTimeRange.length === 0) {
    return timeRange.value; 
  }
  const startIndex = timeRange.value.indexOf(newTimeRange[0]);
  return timeRange.value.slice(startIndex);
};

const selectMethod = (method) => {
  thfs.value = method;
  // 如果选择了自行寄回，重置日期和时间选择
  // if (method === '2') {
  //   date.value = '请选择日期';
  //   selectedTimeRange.value = '请选择时间';
  // }
};

const onDateChange = (e) => {
    console.log('选择的日期:', e);
    date.value = e;
};

const onTimeRangeChange = (e) => {
	const range = getUpdatedTimeRange()
    console.log('选择的时间范围:', range[e.detail.value]);
    selectedTimeRange.value = range[e.detail.value];
};

const confirm =async () => {
  if (thfs.value === '1' && date.value === '请选择日期') {
    uni.showToast({
      title: '请选择上门日期',
      icon: 'none'
    });
    return;
  }

  if (thfs.value === '1' && selectedTimeRange.value === '请选择时间') {
    uni.showToast({
      title: '请选择上门时间范围',
      icon: 'none'
    });
    return;
  }

  console.log('提交日期：', date.value);
  console.log('提交时间范围：', selectedTimeRange.value);
  console.log('邮寄方式：', thfs.value);
  await apiBookingExpressAc()
};
function getUniqueIdString(data) {
	console.log('orders',data)
    const uniqueIds = new Set(data.orders.map(order => order.id));
    return Array.from(uniqueIds).join(',');
}
const apiBookingExpressAc = async () => {
  const param = {
	lx:'2',
    id: props.infos.id,
    thfs: thfs.value,
    thdz: addressList.value[0].id, // 地址id
	qjrq: thfs.value==='1'?date.value:'',//日期
    qjsj: thfs.value==='1'?selectedTimeRange.value:'' // 取货时间
  };

  try {
    const res = await apiBookingExpress(param);
    if (res.code === 200) {
      uni.showToast({
        title: '操作成功',
        icon: 'success',
		duration: 500
      });
	  setTimeout(()=>{
		  emit('close')
		  emit('subExpress',props.infos)
	  },500)
      // 可以在这里做其他操作，比如关闭弹窗或重置表单等
    } else {
      uni.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('请求失败:', error);
    uni.showToast({
      title: '网络错误，请稍后再试',
      icon: 'none'
    });
  }
};
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
onShow(async() => {
  console.log('onShow');
  let pages = getCurrentPages()
  const prevPage = pages[pages.length - 1];
  console.log("onShow:", prevPage.data.selectedAddress);
  if (prevPage.data.selectedAddress) {
    selectedAddress.value = prevPage.data.selectedAddress;
  }
  await getAddressList();
});
onMounted(async() => {
  await getAddressList();
});
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.userServicePannel12-layout1 {
  width: 750rpx;
  height: 900rpx;
  background: #F8F8F7;
  box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}
.text {
  font-family: PingFang SC, PingFang SC;
  font-style: normal;
  text-transform: none;
}
.bottom-btn {
  width: 750rpx;
  height: 182rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 20rpx;
  padding-bottom: 62rpx;
}
.center-btn {
  width: 690rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #ff6d0c 0%, #ffb94d 100%);
  border: none;
  border-radius: 48rpx;
  color: white;
  font-size: 32rpx;
}
</style>
