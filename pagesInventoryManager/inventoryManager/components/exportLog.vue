<template>
	<uv-transition :show="showStep" mode="fade">
		<view class="export-account-log">
			<view class="title">
				<view class="left">
					<text>筛选</text>
				</view>
				<view class="right">
					<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
				</view>
			</view>
			<!-- 时间 -->
			<view class="time">
				<view class="title">
					<text>时间筛选</text>
				</view>
				<view class="content">
					<view class="frist">
						<view class="card">
							<uni-datetime-picker type="datetime" v-model="pickerStartValue" @change="onTimeChange1" :border="false">
								<text>{{ pickerStartValue?pickerStartValue:'开始时间' }}</text>
							</uni-datetime-picker>

							<!-- <picker
							@change="onTimeChange1" 
							mode="date" 
							:value="pickerStartValue">
								<text>{{pickerStartValue}}</text>
							</picker> -->
						</view>
					</view>
					<view class="mid"></view>
					<view class="last">
						<view class="card">
							<uni-datetime-picker type="datetime" v-model="pickerLastValue" @change="onTimeChange2" :border="false">
								<text>{{ pickerLastValue?pickerLastValue:'结束时间' }}</text>
							</uni-datetime-picker>
							<!-- <picker
							@change="onTimeChange2" 
							mode="date" 
							:value="pickerLastValue">
								<text>{{pickerLastValue}}</text>
							</picker> -->
						</view>
					</view>
				</view>
			</view>

			<!-- 金钱 -->
			<view class="price">
				<view class="title">
					<text>账单类型</text>
				</view>
				<view class="content">
					<view v-for="(item, index) in express" :key="index" class="tap-card" :class="{ selected: selectedTap === index }" @click="selectTap(index)">
						<text>{{ item.name }}</text>
						<image class="selectedImage" v-if="selectedTap === index" src="https://www.xzxskj.com/xcximg/icon_xuanzhong@3x.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view style="height: 182rpx" />
			<view class="select-btn">
				<view @click="cancel" class="cancel-btn">
					<text>重置</text>
				</view>
				<view @click="goNext" class="confim-btn">
					<text>导出</text>
				</view>
			</view>
		</view>
	</uv-transition>

	<uv-transition :show="showPannel" mode="fade">
		<view class="copy-pannel">
			<view class="title">
				<view class="left">
					<text>账单导出</text>
				</view>
				<view class="copy-pannel-right">
					<image class="copy-pannel-right-image" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
				</view>
			</view>

			<image src="https://www.xzxskj.com/xcximg/icon_wendang@3x.png" mode="aspectFill"></image>

			<text class="text-1">【{{ express[selectedTap].name }}账单】{{ pickerStartValue }} - {{ pickerLastValue }}</text>

			<text class="text-1">请复制链接后在浏览器中打开下载</text>

			<view style="height: 182rpx" />
			<view class="select-btn" @click="comfrm">
				<view class="btn">
					<text>复制链接</text>
				</view>
			</view>
		</view>
		
	</uv-transition>
</template>
<script setup>
import { apiExportExcel } from '../../api/api.js';
const emit = defineEmits(['close'])
const instance = getCurrentInstance();
const showStep = ref(true);
const showPannel = ref(false);
const pickerStartValue = ref(''); // 当前时间的字符串格式
const pickerLastValue = ref(''); // 当前时间的字符串格式
const express = ref([
	{ name: '全部', zt: '1' },
	{ name: '上架中', zt: '2' }
	// '交易账单','明细账单'
]);
const selectedTap = ref(0);
const selectTap = (index) => {
	selectedTap.value = index;
};
const onTimeChange1 = (e) => {
	console.log(e);
	pickerStartValue.value = e.detail.value;
};
const goNext = () => {
	showStep.value = false;
	setTimeout(() => {
		showPannel.value = true;
	}, 400);
};
const apiExportExcelAc = async () => {
	const param = {
		zt: express.value[selectedTap.value].zt,
		sjkssj: convertToTimestamp(pickerStartValue.value), //开始时间
		sjjssj: convertToTimestamp(pickerLastValue.value) //结束时间
	};
	const res = await apiExportExcel(param);
	if(res.code === '200' && instance && instance.proxy && res.lj!==''){
		instance.proxy.copyText(res.lj)
		setTimeout(()=>{
			emit('close')
		}, 500);
	}else{
		uni.showToast({
			title: '操作失败',
			icon: 'error'
		});
	}
};

function convertToTimestamp(dateStr) {
	const dateObj = new Date(dateStr.replace(/-/g, '/'));
	const timestamp = Math.floor(dateObj.getTime() / 1000);
	console.log(timestamp);
	return timestamp;
}
const getCurrentFormattedTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const comfrm =async ()=>{
	await apiExportExcelAc()
}

const initTime = ()=>{
	const curentTime = getCurrentFormattedTime()
	pickerStartValue.value = curentTime
	pickerLastValue.value =  curentTime
}
defineExpose({
	initTime
});
</script>
<style lang="scss" scoped>
.export-account-log {
	height: 674rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 40rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	.title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			text {
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.right {
			image {
				height: 32rpx;
				width: 32rpx;
				// border: 1rpx solid red;
			}
		}
	}
	.select {
		margin-top: 40rpx;
		width: 100%;
		.title {
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.content {
			width: 100%;
			margin-top: 24rpx;
			display: grid;
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			align-items: center;
			row-gap: 16rpx;
			.card {
				width: 198rpx;
				height: 72rpx;
				background: #f9f9f9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
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
		}
	}
	.time {
		margin-top: 40rpx;
		width: 100%;
		.title {
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.content {
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.frist {
				width: 300rpx;
				height: 72rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #cbcbcb;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
					opacity: 0.4;
				}
			}
			.mid {
				width: 30rpx;
				height: 2rpx;
				background: #eeeeee;
				// background: blue;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.last {
				width: 300rpx;
				height: 72rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #cbcbcb;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
					opacity: 0.4;
				}
			}
		}
	}
	.price {
		margin-top: 40rpx;
		width: 100%;
		.title {
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.content {
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tap-card {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				width: 300rpx;
				height: 64rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #cbcbcb;

				image {
					height: 24rpx;
					width: 24rpx;
					margin-right: 8rpx;
				}
				text {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
					opacity: 0.4;
				}
			}
			.tap-card.selected {
				border: 2rpx solid #e6432e;
				text {
					opacity: 1;
				}
			}
			.tap-card.selected .selectedImage {
				position: absolute;
				bottom: -1rpx;
				right: -10rpx;
				display: block;
			}

			.frist {
				width: 300rpx;
				height: 72rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #cbcbcb;
				display: flex;
				justify-content: center;
				align-items: center;
				.text-1 {
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
					opacity: 0.4;
				}
			}
			.mid {
				width: 30rpx;
				height: 2rpx;
				background: #eeeeee;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.last {
				width: 300rpx;
				height: 72rpx;
				background: #ffffff;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #cbcbcb;
				display: flex;
				justify-content: center;
				align-items: center;
				.text-2 {
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
					opacity: 0.4;
				}
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
		height: 182rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.cancel-btn {
			width: 232rpx;
			height: 96rpx;
			background: #f2f3f6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 14rpx;
			margin-bottom: 62rpx;
			text {
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
			}
		}
		.confim-btn {
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 62rpx;
			text {
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #ffffff;
			}
		}
	}
}

.copy-pannel {
	height: 674rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 40rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	.title {
		box-sizing: border-box;
		height: 50rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			text {
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
		.copy-pannel-right {
			.copy-pannel-right-image {
				margin-bottom: 55rpx;
				height: 32rpx;
				width: 32rpx;
			}
		}
	}

	image {
		margin-top: 66rpx;
		height: 120rpx;
		width: 120rpx;
	}
	.text-1 {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #1f1f1f;
		text-align: center;
		margin-top: 40rpx;
	}

	.select-btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn {
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
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
		}
	}
}
</style>
