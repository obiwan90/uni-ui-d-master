<template>
	<view class="funcConfirm-layout">
		<view class="top">
			<text class="titile">功能检测 <text class="titile" style="color: #FF6600;">已录入</text> </text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill"  @click="$emit('close')"></image>
		</view>
		<view class="card" style="">
			<view class="row-1">
				<text>{{receivedData.spname}}</text>
			</view>
			<view class="row-2">
				<text>IMEI/SN：{{receivedData.imei}}</text>
			</view>
			<view style="margin-top: 40rpx;" class="row-3">
				<text class="text-1">商品录入：{{jkuidname}}</text>
				<text class="text-1">录入时间：{{machinetime.split(' ')[0]}}</text>
			</view>
			<view style="margin-top: 60rpx;" class="row-3">
				<text class="text-1">功能录入：{{gnjcuidname}}</text>
				<text class="text-1">检测时间：{{functionaltime.split(' ')[0]}}</text>
			</view>
		</view>
		
		<text class="text-5" style="margin-top: 20rpx;">* 质检完成后，请将该商品恢复出厂并激活！</text>
		
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
				<text>继续维修检测</text>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import { getCurrentDateString,formatTimestamp,navigateToPage } from '@/utils/common.js';
import { apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
const propos = defineProps({
	receivedData: {
		type: Object,
		required: true
	},
});	


const jkuidname = ref()
const machinetime = ref()
const functionaltime = ref()
const gnjcuidname = ref()

const jkbz = ref()
const gnjcbz = ref()

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
		gnjcbz.value = res.lists[0].gnjcbz
		console.log('jkuidname',jkuidname.value)
		console.log('machinetime',machinetime.value)
		console.log('jkbz',jkbz.value)
	}
};

const comfrm = () => {
	const data = reactive({
		spname: propos.receivedData.spname,
		imei:  propos.receivedData.imei,
		inputTime: machinetime.value,
		funcInputTime: functionaltime.value,
		inputPerson: jkuidname.value,
		funcInputPerson: gnjcuidname.value,
		id: propos.receivedData.id,
		zjid: propos.receivedData.zjid,
		jkbz: jkbz.value,
		gnjcbz: gnjcbz.value
	});
	console.log(data);
	let queryString = encodeURIComponent(JSON.stringify(data));
	uni.redirectTo({
		url: '/pagesMaintenanceInput/maintenanceInput/maintenanceInput?data=' + queryString
	});
};

const reLoad = ()=>{
	uni.redirectTo({
		url:'/pagesFuncCheck/funcCheck/funcCheck'
	})
}

defineExpose({
	getData
});
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.funcConfirm-layout{
	width: 750rpx;
	height: 744rpx;
	background: #F8F8F8;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	.top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.titile{
			// width: 144rpx;
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1f1f1f;
			text-align: left;
		}
		image{
			border-radius: 50%;
			height: 20rpx;
			width: 20rpx;
			border: 1rpx solid pink;
		}
	}
	.card{
		margin-top: 46rpx;
		width: 710rpx;
		// height: 228rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
		padding-bottom: 40rpx;
		.row-1{
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.row-2{
			margin-top: 20rpx;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.row-3{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.text-1{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
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
		.taps{
			margin-top: 32rpx;
			width: 100%;
			display: grid;
			align-items: center;
			grid-template-columns: 50% 50%;
			.col{
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					height: 32rpx;
					width: 32rpx;
					margin-right: 10rpx;
				}
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
				}
			}
		}
		.confim-btn {
			margin-top: 20rpx;
			width: 710rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
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
				color: #FFFFFF;
			}
		}
	}
}

.text-5{
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #EB4636;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
</style>