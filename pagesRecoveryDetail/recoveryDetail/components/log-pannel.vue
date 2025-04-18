<template>
	<view class="log-pannel">
		<view class="title" style="width: 100%;display: flex; align-items: center; justify-content: space-between;margin-bottom: 20rpx;box-sizing: border-box;">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 36rpx; color: #1f1f1f; text-align: left">报价日志</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		
		<view style="background-color: #f3f3f3;height: 700rpx;width: 710rpx;">
			<z-paging
			  ref="paging"
			  show-refresher-update-time
			  :fixed="false"
			  v-model="dataList"
			  @query="queryList"
			>
			
			<view
				class="card"
				v-for="(item, index) in dataList"
				:key="index"
				style="width: 710rpx;background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; flex-direction: column;padding-left:24rpx ;padding-right: 24rpx;padding-top: 20rpx;padding-bottom: 30rpx;"
			>
				<view style="display: flex;box-sizing: border-box; justify-content: space-between; align-items: center">
					<!-- <custom-channel-tap text1="修改类型" text2="售价" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" /> -->
					<custom-channel-tap text1="官方质检" :text2="item.lx==='1'?'售价':'收价'" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" />
					<text style="width: 70%;font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: right">{{item.name+' '+item.add_time}}</text>
				</view>
				
				<!-- 前 -->
				<view
					class="content"
					style="position: relative;width: 662rpx; background: #f3f2f6; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; flex-direction: column; margin-top: 10rpx"
				>
					<view class="card-right-color" style="background: #ff9184">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #ffffff">修改前</text>
					</view>
					<view>
						<text class="text-1">价格：</text>
						<text class="text-2" style="color: #eb4636;margin-top: 20rpx;">{{item.xgqprice.replace(/^,|,$/g, '')}}</text>
					</view>
					<view>
						<text class="text-1">{{item.xqqys}}</text>
					</view>
				</view>
				<!-- 后 -->
				<view
					class="content"
					style="position: relative;width: 662rpx; background: #f3f2f6; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; flex-direction: column; margin-top: 10rpx"
				>
					<view class="card-right-color" style="background:  #8EBBFF">
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #ffffff">修改后</text>
					</view>
					<view>
						<text class="text-1">价格：</text>
						<text class="text-2" style="color: #eb4636;margin-top: 20rpx;">{{item.xqhprice.replace(/^,|,$/g, '')}}</text>
					</view>
					<view>
						<text class="text-1">{{item.xghys}}</text>
					</view>
				</view>
				
			</view>
			
			</z-paging>
		</view>
		<view style="height: 182rpx"></view>
		<view
			style="
				width: 750rpx;
				height: 182rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				margin-top: 40rpx;
				position: fixed;
				box-sizing: border-box;
				bottom: 0;
				right: 0;
				left: 0;
				display: flex;
				align-items: center;
				padding: 24rpx 30rpx 62rpx 30rpx;
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
import { apiRecoveryLog } from '@/api/recovery/recovery.js'
const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  await apiRecoveryLogAction(pageNo-1)
  paging.value.complete(lists.value);
};
const emit = defineEmits(['close']);
const props = defineProps({
  selectData: {
    type: Object,
    default: {} 
  }
})
const lists = ref([])
const apiRecoveryLogAction = async (start) => {
	const data = {
		// id:props.selectData.id
		id:props.selectData.ids,
		start:start
	}
	const res = await apiRecoveryLog(data);
	if (res.code === 200) {
		lists.value = res.lists
	}
	console.log(res);
};
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.log-pannel {
	box-sizing: border-box;
	width: 750rpx;
	// height: 746rpx;
	background: #F3F2F6;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 40rpx;
}
.card {
	padding: 20rpx 24rpx;
	margin-top: 20rpx;
}
.content {
	padding: 16rpx 20rpx;
}
.card-right-color {
	width: 112rpx;
	height: 48rpx;
	background: #ff9184;
	border-radius: 20rpx 20rpx 0rpx 20rpx;
	position: absolute;
	right: 0%;
	top: 0%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 14rpx;
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #eb4636;
}


</style>
