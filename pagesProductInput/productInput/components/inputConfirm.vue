<template>
	<view class="inputConfirm-layout">
		<view class="top">
			<text class="titile">商品 <text class="titile" style="color: #FF6600;">已录入</text> </text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<view class="card">
			<view class="row-1">
				<text>{{ propos.content[3].value }}</text>
			</view>
			<view class="row-2">
				<text>IMEI/SN：{{ propos.imei }}</text>
			</view>
			<view style="margin-top: 30rpx" class="row-3">
				<text v-if="jkuidname" class="text-1">商品录入：{{jkuidname}}</text>
				<text v-if="machinetime" class="text-1">录入时间：{{ getCurrentDateString()}}</text>
			</view>
		</view>

		<view class="select-btn">
			<view class="taps">
				<view class="col" @click="reLoad()">
					<image src="https://www.xzxskj.com/xcximg/icon_luru@3x.png" mode="aspectFill"></image>
					<text>新增录入</text>
				</view>
				<view class="col">
					<image src="https://www.xzxskj.com/xcximg/icon_tiaoma@3x.png" mode="aspectFill"></image>
					<text>条码打印</text>
				</view>
			</view>
			<view @click="comfrm" class="confim-btn button-animation">
				<text>继续功能检测</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { getCurrentDateString,formatTimestamp } from '@/utils/common.js';
import { apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
const emit = defineEmits(['close'])
const propos = defineProps({
	imei: {
		type: [Number, String],
		required: true
	},
	content: {
		type: Array,
		required: true
	},
	id: {
		type: [Number, String],
		required: true
	},
	purchaseEmployee:{
		type: String,
		required: true
	},
	zjid: {
		type: [Number, String],
		required: true
	}
});
const jkuidname = ref()
const machinetime = ref()
const jkbz = ref()
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
		console.log('jkuidname',jkuidname.value)
		console.log('machinetime',machinetime.value)
		console.log('jkbz',jkbz.value)
	}
};


const comfrm = () => {
	const data = reactive({
		spname: propos.content[3].value,
		imei: propos.imei,
		inputTime: machinetime.value,
		inputPerson: jkuidname.value,
		id: propos.id,
		purchaseEmployee: propos.purchaseEmployee,
		zjid: propos.zjid,
		jkbz: jkbz.value
	});
	let queryString = encodeURIComponent(JSON.stringify(data));
	uni.redirectTo({
		url: '/pagesFuncCheck/funcCheck/funcCheck?data=' + queryString
	});
	setTimeout(()=>{
		emit('close')
	},500)
};

const reLoad = () =>{
	uni.redirectTo({
		url: '/pagesProductInput/productInput/productInput'
	});
}
defineExpose({
	getData
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.inputConfirm-layout {
	width: 750rpx;
	height: 682rpx;
	background: #f8f8f8;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.titile {
			// width: 144rpx;
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1f1f1f;
			text-align: left;
		}
		image {
			border-radius: 50%;
			height: 32rpx;
			width: 32rpx;
		}
	}
	.card {
		margin-top: 46rpx;
		width: 710rpx;
		height: 228rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 20rpx;
		.row-1 {
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.row-2 {
			margin-top: 20rpx;
			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.row-3 {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.text-1 {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				line-height: 0rpx;
				text-align: left;
			}
		}
	}
	.select-btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 246rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.taps {
			margin-top: 32rpx;
			width: 100%;
			display: grid;
			align-items: center;
			grid-template-columns: 50% 50%;
			.col {
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					height: 32rpx;
					width: 32rpx;
					margin-right: 10rpx;
				}
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: left;
				}
			}
		}
		.confim-btn {
			margin-top: 20rpx;
			width: 710rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 62rpx;
			text {
				width: 192rpx;
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
