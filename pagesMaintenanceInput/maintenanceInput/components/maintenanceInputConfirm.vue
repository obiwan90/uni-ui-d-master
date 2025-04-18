<template>
	<view class="maintenanceInputConfirm-layout">
		<view class="top">
			<text class="titile">维修检测 <text class="titile" style="color: #FF6600;">已录入</text> </text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<view class="card">
			<view class="row-1">
				<text>{{receivedData.spname}}</text>
			</view>
			<view class="row-2">
				<text>IMEI/SN：{{receivedData.imei}}</text>
			</view>

			<text class="text-5">商品录入：{{jkuidname}} {{machinetime.split(' ')[0]}}</text>
			<text class="text-5">功能检测：{{gnjcuidname}} {{functionaltime.split(' ')[0]}}</text>
			<text class="text-5">维修检测：{{serviceuidname}} {{servicetime.split(' ')[0]}}</text>
		</view>

		<view class="select-btn">
			<view class="taps">
				<view class="col" @click="reLoad()">
					<image src="https://www.xzxskj.com/xcximg/icon_luru@3x.png" mode="aspectFill"></image>
					<text>新增录入</text>
				</view>
				<view class="col">
					<image src="https://www.xzxskj.com/xcximg/icon_zhilian@3x.png" mode="aspectFill"></image>
					<text>质检报告</text>
				</view>
				<view class="col">
					<image src="https://www.xzxskj.com/xcximg/icon_tiaoma@3x.png" mode="aspectFill"></image>
					<text>条码打印</text>
				</view>
			</view>
			<view
				style="
					gap: 14rpx;
					padding-top: 18rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					padding-left: 30rpx;
					padding-right: 30rpx;
					padding-bottom: 62rpx;
				"
			>
				<navigator open-type="navigateBack" :delta="page" url="/pages/home/home">
					<view
						class="button-animation"
						style="
							width: 232rpx;
							height: 96rpx;
							background: #f2f3f6;
							border-radius: 20rpx 20rpx 20rpx 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						"
					>
						<text class="text-6">返回首页</text>
					</view>
				</navigator>

				<view
					class="button-animation"
					@click="comfrm"
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
					<!-- <text class="text-7">去拍照</text> -->
					<text class="text-7">去成色判断</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { getCurrentDateString,formatTimestamp } from '@/utils/common.js';
import { apiQualityCheckSerialSearch } from '@/api/qualityCheck/qualityCheck.js';
const page = getCurrentPages().length - 1;
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
const servicetime = ref()
const serviceuidname = ref()

const jkbz = ref()
const gnjcbz = ref()
const wxjcbz = ref()

const cgyname = ref()
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
		maintenanceInputTime: serviceuidname.value,
		inputPerson:jkuidname.value,
		funcInputPerson: gnjcuidname.value,
		maintenanceInputPerson: serviceuidname.value,
		id: propos.receivedData.id,
		zjid: propos.receivedData.zjid,
		jkbz: jkbz.value,
		gnjcbz: gnjcbz.value,
		wxjcbz: wxjcbz.value,
		cgyname: cgyname.value
	});
	console.log('data:',data);
	let queryString = encodeURIComponent(JSON.stringify(data));
	uni.redirectTo({
		// url: '/pagesTakePhoto/takePhoto/takePhoto?data=' + queryString
		url: '/pagesFinenessJudge/finenessJudge/finenessJudge?data=' + queryString
	});
};
const reLoad = ()=>{
	uni.redirectTo({
		url:'/pagesMaintenanceInput/maintenanceInput/maintenanceInput'
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
.maintenanceInputConfirm-layout {
	width: 750rpx;
	height: 760rpx;
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
			height: 20rpx;
			width: 20rpx;
			border: 1rpx solid pink;
		}
	}
	.card {
		margin-top: 46rpx;
		padding-bottom: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 24rpx;
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
			justify-content: flex-start;
			align-items: center;
			.text-1 {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
				line-height: 0rpx;
				text-align: left;
				margin-right: 40rpx;
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
			grid-template-columns: 33.33% 33.33% 33.33%;
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
.text-5 {
	margin-top: 24rpx;
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-6 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-7 {
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
