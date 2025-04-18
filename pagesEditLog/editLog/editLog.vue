<template>
	<view class="editLog-layout">
		<!-- header -->
		<customHeader :backgroundColor="'#FFFFFF'">
			<template #name>修改日志</template>
			<template #fill>修改日志</template>
		</customHeader>
		
		<view style="height: 1420rpx;width: 100%;">
			<z-paging
			  ref="paging"
			  show-refresher-update-time
			  :fixed="false"
			  v-model="dataList"
			  @query="queryList"
			>
			
			<view v-for="(item,index) in dataList" :key="index"
				style="
					margin-left: 20rpx;
					width: 710rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 24rpx;
					display: flex;
					flex-direction: column;
					margin-top: 20rpx;
				"
				class="log-card"
			>
				<view style="display: flex; justify-content: space-between; align-items: center">
					<text class="text-1">修改时间</text>
					<text class="text-2">{{item.xgtime}}</text>
				</view>
			
				<view style="margin-top: 22rpx; display: flex; justify-content: space-between; align-items: center">
					<text class="text-1">修改员工</text>
					<text class="text-1">{{item.xgname}}</text>
				</view>
			
				<view v-for="(item1,index) in item.lists" :key="index"
					style="
						margin-top: 24rpx;
						width: 662rpx;
						background: #f3f2f6;
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
						padding-right: 20rpx;
						padding-bottom: 20rpx;
					"
				>
					<view style="display: flex; justify-content: space-between; align-items: center; margin-top: 24rpx">
						<text class="text-1">质检项目</text>
						<text class="text-1">{{item1.names}}</text>
					</view>
					<view style="display: flex; justify-content: space-between; align-items: center; margin-top: 24rpx">
						<text class="text-1">原报告</text>
						<text class="text-1">{{item1.xgq}}</text>
					</view>
					<view style="display: flex; justify-content: space-between; align-items: center; margin-top: 24rpx">
						<text class="text-1">修改后</text>
						<text class="text-1">{{item1.xgh}}</text>
					</view>
				</view>
			</view>
			</z-paging>
		</view>
	</view>
</template>

<script setup>
import  customHeader  from './components/custom-header.vue'
import { getLog } from "../api/api.js"
const id = ref()
const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  const data = await getLogAc(pageNo-1)
  paging.value.complete(data);
};
const getLogAc =async (start)=>{
	const param = {
		id:id.value,
		start:start
	}
	const res = await getLog(param)
	if(res.zt === 1){
		return res.xsz
	}
	return []
}
onLoad((options)=>{
	if(options.id){
		id.value = options.id
	}
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.editLog-layout {
	
	background: #f3f2f6;
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #eb4636;
	text-align: right;
}
</style>
