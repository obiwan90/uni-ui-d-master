<template>
  <view class="staffPannel-layout">
	  
	
    <view style="display: flex; align-items: center; justify-content: space-between">
      <text class="text-1">{{title}}</text>
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
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiStationStaffList } from '@/api/station/station.js'

const props = defineProps({
	title: {
		type: String,
		default: () => ''
	}
})	

const staffs = ref([])

const emit = defineEmits(['close','staffConfirm1','staffConfirm2'])
const selectSearchChange = (e) => {
	console.log('模糊 e:', e);
};
//data.value.push({ text: item.username, ygid: item.id, selected: false })
const data = ref([{text:'全部员工',ygid:'0',selected: false}
])

const toggleSelection = (index) => {
	data.value[index].selected = !data.value[index].selected;
};

const onClick = () => {
	if(props.title==='配置员工'){
		
		emit('staffConfirm1', data.value);
	}
	if(props.title==='消息推送'){
		emit('staffConfirm2', data.value);
	}
    emit('close');
	console.log('确定')
}

const workerData = ref([])
const apiStationStaffListData = async () => {
  const param ={
	  opid: JSON.parse(uni.getStorageSync('userInfo')).opid
  }
  const res = await apiStationStaffList(param)
  if(res.code === 200){
    workerData.value = res.yglist
	console.log('workerData:',workerData.value)
	res.yglist.forEach((item,index) => {
		data.value.push({ text: item.username, ygid: item.id, selected: false })
	})
	nextTick(() => {
	  if (storedYgidString.value) {
	    setSelectedStaffs(storedYgidString.value);
	  }
	});
  }
}

const storedYgidString = ref('')

const setSelectedStaffs = (staffs) => {
  storedYgidString.value = staffs;
  console.log('接收选中员工====================')
  console.log('staffs:',staffs)
  staffs.split(',').forEach((staff) => {
    const index = data.value.findIndex((item) => item.ygid === staff)
    if (index !== -1) {
      data.value[index].selected = true
    }
  })
  console.log('接收选中员工====================',data.value)
  emit('staffConfirm1', data.value);
}

defineExpose({
  setSelectedStaffs
});


onMounted(() => {
  apiStationStaffListData()
})
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.staffPannel-layout {
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
