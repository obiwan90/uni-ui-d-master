<template>
  <view class="box">
    <view class="title">
      <view class="left">
        <text>消息推送设置</text>
      </view>
     <!-- <view class="right" @click="goBack">
        <image src="../../static/images/tabBar/icon_home_nor@3x.png" mode="aspectFill"></image>
        <text>返回首页</text>
      </view> -->
    </view>

   <view class="classify">
	 <view class="title">
	   <text>接收类别(多选)</text>
	 </view>
	 <view class="content">
	   <view
		 class="tab"
		 v-for="(item, index) in messageTypes"
		 :key="index"
		 @click="toggleMessageType(item)"
		 :class="{ 'active': isSelectedMessageType(item) }"
	   >
		 <text>{{ item }}</text>
	   </view>
	 </view>
   </view>
	
    <view class="card" v-for="(item, index) in data" :key="index">
	 <view class="title">
	   <text>{{ item.text }}</text>
	 </view>
	 <view class="content">
	   <view class="left">
		 <text>{{ item.left }}</text>
	   </view>
	   <view class="right">
		 <template v-if="item.title === 'receiveRange' || item.title === 'acceptRogin'">
		   <picker
			 @change="onRegionChange(item.title, $event)"
			 class="position"
			 mode="region"
			 custom-item="不限"
			 :value="messageSettings[item.title].value">
			 <text v-if="messageSettings[item.title].value" class="position-text">{{ messageSettings[item.title].value }}</text>
			 <text v-else class="position-text">{{ item.value }}</text>
		   </picker>
		 </template>
		 <template v-else>
		   <input v-model="messageSettings[item.title]" v-if="item.title === 'phone'" class="contact" type="text" placeholder="请输入联系方式" />
		 </template>
		 <image v-if="item.title !== 'phone'" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
	   </view>
	 </view>
   </view>

   <view class="bar" :class="{ 'active': isReadyToPublish }"  @click="confirm">
	 <text>确定</text>
   </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';
let emit = defineEmits(['close'])
// let selectedMessageTypes = ref([]);
const locationForm = uni.getStorageSync('locationForm');
const messageSettingStore = uni.getStorageSync('messageSetting')
const data = ref([
  { title: 'receiveRange', text:'接收范围', left: '选择地区' },
  { title: 'acceptRogin', text:'发布地点', left: '选择地区' },
  { title: 'phone', text:'联系方式', left: '联系电话', value: '' }
]);

const messageTypes = ref([
  '求货信息', '卖货信息', '交流信息'
]);

const messageSettings = ref();

const goBack = () => {
  uni.navigateBack();
};

const onRegionChange = (title, ev) => {
  const [province, city, region] = ev.detail.value;
  const postCode = ev.detail.code;
  if (messageSettings.value[title]) {
    messageSettings.value[title].value = region !== '不限' ? region : city !== '不限' ? city : province !== '不限' ? province : '全国';
    messageSettings.value[title].postCode = postCode;
    messageSettings.value[title].fullLocation = `${city} ${region}`;
  }
};

const toggleMessageType = (type) => {
  const index = messageSettings.value.messageType.indexOf(type);
  if (index === -1) {
    messageSettings.value.messageType.push(type);
  } else {
    messageSettings.value.messageType.splice(index, 1);
  }
  messageSettings.value.messageType = messageSettings.value.messageType
};

const isSelectedMessageType = (type) => {
  console.log('messageSettings',messageSettings);
  return messageSettings.value.messageType.includes(type);
};	

const isReadyToPublish = ref(true);

const confirm = () => {
    uni.setStorageSync('messageSetting', messageSettings.value);
	emit('close');
};
onMounted(()=>{
	//初始化一次
	messageSettings.value = {
		messageType:messageSettingStore?messageSettingStore.messageType:[],
		receiveRange: messageSettingStore?messageSettingStore.receiveRange:{ value: locationForm.region },
		acceptRogin: messageSettingStore?messageSettingStore.acceptRogin:{ value: locationForm.region },
		phone: messageSettingStore?messageSettingStore.phone:JSON.parse(uni.getStorageSync('userInfo')).phone
	}
	
})

</script>

<style lang="scss" scoped>
.box {
	box-sizing: border-box;
	width: 690rpx;
	height: 968rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 34rpx;
	padding-bottom: 40rpx;
	.title {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		.left {
			text {
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1f1f1f;
			}
		}
		.right {
			display: flex;
			align-items: center;
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
				opacity: 0.6;
			}

			image {
				height: 24rpx;
				width: 24rpx;
				opacity: 0.6;
				margin-right: 10rpx;
			}
		}
	}

	.classify {
		margin-top: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		.title {
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.content {
			margin-top: 20rpx;
			width: 100%;
			display: grid;
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			
			.tab {
				width: 200rpx;
				height: 72rpx;
				background: #f9f9f9;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
				}
			}
			.tab.active {
			  background-color: #EC7148; 
			  transition: background-color 0.3s, color 0.3s; 
			  text{
				  color: #ffffff;
			  }
			}


		}
	}

	.card {
		box-sizing: border-box;
		margin-top: 40rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.content {
			margin-top: 20rpx;
			width: 650rpx;
			height: 72rpx;
			background: #f9f9f9;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				margin-left: 20rpx;
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
				}
			}
			.right {
				margin-right: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.contact{
					text-align: right;
				}
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: right;
					margin-right: 10rpx;
				}
				image {
					height: 22rpx;
					width: 22rpx;
					// border: 1rpx solid black;
				}
			}
		}
	}

	.bar {
		margin-top: 40rpx;
		width: 642rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 0.25;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #ffffff;
			text-align: center;
		}
		&.active {
			background: linear-gradient(135deg, #41b883 0%, #06c37c 100%);
			opacity: 1;
			cursor: pointer;
		}
	}
	
}
</style>
