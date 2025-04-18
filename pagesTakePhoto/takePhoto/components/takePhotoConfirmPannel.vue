<template>
	<view class="takePhotoConfirmPannel-layout">
		<view style="width: 100%;display: flex; justify-content: space-between; align-items: center">
			<text class="text-1">图片 <text class="text-1" style="color: #FF6600;">已上传</text> </text>
			<image style="height: 32rpx; width: 32rpx; border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>

		<view style="margin-top: 68rpx; display: flex; justify-content: center; align-items: center">
			<image style="height: 152rpx; width: 152rpx; border-radius: 10rpx;" :src="propos.image" mode="aspectFill"></image>
		</view>
 
		<text style="margin-top: 30rpx;margin-bottom: 60rpx;" class="text-2">图片已提交请选择继续下一步</text>
		
		<view
			@click="confirm"
			class="button-animation"
			style="
				width: 488rpx;	
				height: 96rpx;
				background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			"
		>
			<text class="text-3">去定价</text>
		</view>
		
		
		<view @click="reLoad()"
			class="button-animation"
			style="
				margin-top: 16rpx;
				width: 488rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #FFE0CB 0%, #FFC8A2 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			"
		>
			<text class="text-4">继续拍照</text>
		</view>
	</view>
</template>

<script setup>
import { getCurrentDateString,formatTimestamp } from '@/utils/common.js';
import { apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';

const propos = defineProps({
	image: {
		type: String,
		required: true
	},
	receivedData: {
		type: Object,
		required: true
	}
});	


const jkuidname = ref()
const machinetime = ref()
const gnjcuidname = ref()
const functionaltime = ref()
const servicetime = ref()
const serviceuidname = ref()

const jkbz = ref()
const gnjcbz = ref()
const wxjcbz = ref()
const pzbz = ref()
const csbz = ref()
const cgyname = ref()
const finenessname = ref()
const productimage = ref()
const getData = async (ch) => {
	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ch: ch
	}
	const res = await apiQualityCheckSerialSearch(param);
	if (res.code === 200) {
		jkuidname.value = res.lists[0].jkuidname
		machinetime.value = formatTimestamp(res.lists[0].machinetime)
		jkbz.value = res.lists[0].jkbz
		functionaltime.value = formatTimestamp(res.lists[0].functionaltime)
		gnjcuidname.value = res.lists[0].gnjcuidname
		servicetime.value = formatTimestamp(res.lists[0].servicetime)
		serviceuidname.value = res.lists[0].serviceuidname
		gnjcbz.value = res.lists[0].gnjcbz
		wxjcbz.value = res.lists[0].wxjcbz
		cgyname.value = res.lists[0].cgyname
		finenessname.value = res.lists[0].finenessname
		productimage.value = res.lists[0].productimage
		pzbz.value = res.lists[0].pzbz
		csbz.value = res.lists[0].csbz
		console.log('jkuidname',jkuidname.value)
		console.log('machinetime',machinetime.value)
		console.log('jkbz',jkbz.value)
	}
};

const confirm = () => {
	const data = reactive({
		spname: propos.receivedData.spname,
		imei:  propos.receivedData.imei,
		inputTime: machinetime.value,
		funcInputTime: functionaltime.value,
		maintenanceInputTime: serviceuidname.value,
		inputPerson:jkuidname.value,
		funcInputPerson: gnjcuidname.value,
		maintenanceInputPerson: serviceuidname.value,
		id: propos.receivedData.id,
		zjid: propos.receivedData.zjid,
		jkbz: jkbz.value,
		gnjcbz: gnjcbz.value,
		wxjcbz: wxjcbz.value,
		pzbz: pzbz.value,
		cgyname: cgyname.value,
		csbz:csbz.value,
		finenessname: finenessname.value,
		productimage:productimage.value
	});
	let queryString = encodeURIComponent(JSON.stringify(data));
	uni.redirectTo({
		// url: '/pagesFinenessJudge/finenessJudge/finenessJudge?data='+queryString
		url: '/pagesListingProduct/listingProduct/listingProduct?data=' + queryString
	});
};
const reLoad = ()=>{
	uni.redirectTo({
		url:'/pagesTakePhoto/takePhoto/takePhoto'
	})
}
defineExpose({
	getData
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.takePhotoConfirmPannel-layout {
	width: 590rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-top: 30rpx;
	padding-bottom: 68rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
	opacity: 0.7;
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
.text-4{
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1F1F1F;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
