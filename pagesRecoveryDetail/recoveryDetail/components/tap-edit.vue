<template>
	<view class="tap-edit">
		<view class="title" style="display: flex; align-items: center;justify-content: space-between;width: 100%;margin-bottom: 40rpx;">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 36rpx; color: #1f1f1f; text-align: left">{{props.name}}</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		
		<view
			class="content"
			style="
				box-sizing: border-box;
				width: 710rpx;
				height: 800rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding: 46rpx 20rpx 62rpx 20rpx;">
			<scroll-view scroll-y="true" :enable-flex="true" style="display: flex;flex-direction: column;height: 100%;width: 100%;">
				<view v-for="(item,index) in lists" :key="index" class="row" style="display: flex; flex-direction: column; width: 100%;padding: 20rpx;box-sizing: border-box;">
					<view style="width: 100%;display: flex; justify-content: space-between; align-items: center;border-bottom: 2rpx solid #EEEEEE;padding-bottom: 20rpx;box-sizing: border-box;border: 1rpx solid ridge;">
						<text class="text-1">{{item.djname}}</text>
						<text style="opacity: 0.6;font-weight: 400;font-size: 28rpx;color: #1F1F1F;" @click="openDialog(item)">请输入标签</text>
					</view>	
					<view style="display: flex;margin-top: 10rpx;gap: 10rpx;row-gap: 10rpx;flex-wrap: wrap;">
						<van-tag
						  v-for="(item1,index) in item.bqlist"
						  :key="index"
						  v-if="showTab"
						  closeable
						  size="large"
						  color="linear-gradient( 131deg, #FFCE7B 0%, rgba(255,153,100,0.98) 55%, #FF9057 100%)" text-color="#FFFFFF"
						  @close="onClose(item,item1.id)">
						  {{item1.name}}
						</van-tag>
					</view>
					
				</view>
			</scroll-view>
		</view>
		
		
		<!-- <view
			style="
				width: 100%;
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
				justify-content: center;
				padding-bottom: 62rpx;
			"
			class="btns">
			<view
				class="btn"
				style="
					box-sizing: border-box;
					width: 690rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text @click="$emit('close')" style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff; text-align: center">提交修改</text>
			</view>
		</view> -->
	</view>
	
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog v-if="show" mode="input" message="成功消息" title="输入标签名"  :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
	</uni-popup>
	
</template>

<script setup>
import { apiLabelList,apiLabelDel,apiLabelAdd } from '@/api/recovery/recovery.js'
const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	flid: {
		type: String,
		default: ''
	},
	ppid: {
		type: String,
		default: ''
	}
});
const show = ref(false);
const popup = ref(null)
const showTab = ref(true);
const onClose =async (item,id)=>{
	console.log('标签关闭：',id);
	await apiLabelDelAc(item.id,id);
	await apiLabelListAc()
}
const selectedItem = ref(null);
const openDialog = (item)=>{
	show.value = true;
	console.log('openDialog',item);
	selectedItem.value = item;
	popup.value.open();
}
const close = ()=>{
	show.value = false;
	console.log('close');
	popup.value.close();
}

const confirm =async (e)=>{
	
	console.log('confirm',e);
	await apiLabelAddAc(selectedItem.value.id,e);
	popup.value.close();
	show.value = false;
}

const lists = ref([]);
const apiLabelListAc = async ()=>{
	const data = {
		flid:props.flid,//分类id
		ppid:props.ppid//品牌id
	}
	
	const res = await apiLabelList(data);
	if(res.code === 200){
		lists.value = res.lists;
	}
};

const apiLabelDelAc = async (djid,id)=>{
	const data = {
		djid:djid,//等级ID
		bqid:id//标签管理返回的标签列表里面的ID
	}
	const res = await apiLabelDel(data);
	if(res.code === 200){
		uni.showToast('删除成功')
	}
	console.log("res:",res);
	
};

const apiLabelAddAc = async (id,name)=>{
	const data = {
		djid:id,//等级ID
		name:name//标签名称
	}
	const res = await apiLabelAdd(data);
	if(res.code === 200){
		uni.showToast('添加成功')
		await apiLabelListAc()
	}
	console.log("res:",res);
};

onMounted(async()=>{
	await apiLabelListAc()
})

</script>

<style lang="scss" scoped>
.tap-edit{
	box-sizing: border-box;
	width: 100%;
	height: 1000rpx;
	background: #F0EFF3;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 40rpx;
	display: flex;
	flex-direction: column;
	

}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: right;
}
</style>
