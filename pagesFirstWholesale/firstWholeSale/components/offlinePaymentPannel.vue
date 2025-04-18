<template>
	<view
		class="offline-payment-pannel-layouy"
		style="
			width: 750rpx;
			background: #f8f8f7;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 46rpx;
			padding-bottom: 214rpx;
		"
	>
	<scroll-view scroll-y style="height: 1000rpx;">
		<view style="margin-bottom: 44rpx; width: 100%; display: flex; align-items: center; justify-content: space-between">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 36rpx; color: #1f1f1f; text-align: left; font-style: normal; text-transform: none">
				线下收款
			</text>
			<image style="height: 32rpx; width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFit" @click="$emit('close')"></image>
		</view>

		<view
			style="
				width: 710rpx;
				height: 100rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 24rpx;
				padding-right: 24rpx;">
			<text class="text-1">实收金额</text>
			<view style="display: flex; justify-content: center; align-items: center; gap: 20rpx">
				<!-- <text class="text-2">¥ 2565.08</text> -->
				<input  class="text-2" style="text-align: right;" type="number" v-model="price" />
				<image style="height: 28rpx; width: 28rpx" src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFit"></image>
			</view>
		</view>

		<view style="margin-top: 20rpx; width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; padding: 24rpx; display: flex; flex-direction: column">
			<view style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2rpx solid #eeeeee; padding-bottom: 28rpx">
				<text class="text-1">收款方式</text>
				<view style="display: flex; justify-content: center; align-items: center; gap: 20rpx">
					<image style="height: 30rpx; width: 30rpx;" :src="selectedPayment.img" mode="aspectFit"></image>
					<text class="text-1">{{selectedPayment.name}}</text>
				</view>
			</view>

			<view
				style="
					width: 662rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					margin-top: 20rpx;
					display: grid;
					grid-template-columns: auto auto;
					grid-row-gap: 16rpx;
					justify-content: space-between;
				"
			>
				<view @click="selectChange(index)"
					v-for="(item, index) in data"
					:key="index"
					style="
						width: 326rpx;
						height: 100rpx;
						background: #ffffff;
						box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-left: 20rpx;
						padding-right: 20rpx;
					"
				>
					<view style="display: flex; align-items: center; gap: 10rpx">
						<image style="height: 30rpx; width: 30rpx" :src="item.img" mode="aspectFit"></image>
						<text class="text-3">{{item.name}}</text>
					</view>
					<image v-if="item.selected" style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFit" ></image>
					<image v-else style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_xuanze_nor@3x.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<view style="margin-top:20rpx;width: 710rpx; height: 428rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; padding: 24rpx; display: flex; flex-direction: column">
			<text class="text-4">备注和上传凭证</text>
			<view style="margin-top: 20rpx;position: relative;width: 662rpx; height: 312rpx;background: #f3f2f6;border-radius: 20rpx">
				<textarea placeholder="请输入...." v-model="remark" style="height: 100rpx;box-sizing: border-box;padding: 24rpx; width:100%; border-radius: 20rpx"/>
			
				<view style="position: absolute;left: 20rpx;bottom: 20rpx;width: 100%;display: flex;align-items: center;">
					<van-uploader 
						:file-list="fileList"
						accept="image"
						max-count="3"
						max-size="5242880"
						preview-size="162rpx"
						:after-read="(event) => handleUpload(event)"
						@oversize="(event) => check(event, 'fileList')"
						@delete="(event) => delete1(event, 'fileList')"
						>
						<view class="uploader-slot">
							<image class="uploader-icon" style="height: 162rpx;width: 162rpx;" src="https://www.xzxskj.com/xcximg/img_add_img1@3x.png" mode="aspectFill"></image>
						</view>
					</van-uploader>
				</view>
			
			</view>
		</view>
	</scroll-view>

		<view
			style="
				width: 750rpx;
				height: 182rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 24rpx 20rpx 62rpx 20rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				gap: 14rpx;
			"
		>
			<view
				class="button-animation"
				@click="onComfirm"
				style="
					display: flex;
					justify-content: center;
					align-items: center;
					width: 690rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
				"
			>
				<text
					style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff; text-align: center; font-style: normal; text-transform: none"
				>
					确定收款
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { uploadFiles,uploadCheack,uploadDelete } from '@/utils/common.js';
import { fpbkSubmit } from '../../api/api.js'
const emit = defineEmits(['reload']);
const props = defineProps({
	ddxx: {
		type: Array,
		default: []
	},
	ddid:{
		type: String,
		default: ''
	},
	totalPrice:{
		type: String,
		default: ''
	}
	
});
const data = ref([
	{name:'支付宝',id:'2',selected:true,img:'https://www.xzxskj.com/xcximg/icon_zhifubao@3x.png'},
	{name:'微信',id:'1',selected:false,img:'https://www.xzxskj.com/xcximg/icon_weixin@3x.png'},
	{name:'收款码',id:'3',selected:false,img:'https://www.xzxskj.com/xcximg/icon_qita@3x.png'},
	{name:'银行卡',id:'4',selected:false,img:'https://www.xzxskj.com/xcximg/icon_card@3x.png'},
	{name:'现金',id:'5',selected:false,img:'https://www.xzxskj.com/xcximg/icon_xianjin@3x.png'},
	{name:'其他',id:'6',selected:false,img:'https://www.xzxskj.com/xcximg/icon_qita@3x.png'},
]);
const price = ref(parseFloat(props.totalPrice) || 0);
const remark = ref('')
const selectedPayment = ref(data.value.find(item => item.selected) || data.value[0]);

const selectChange = (index) => {
	data.value.forEach((item, i) => {
		item.selected = i === index;
	});
	selectedPayment.value = data.value[index];
}

const onComfirm = () => {
	console.log('选中的支付方式:', selectedPayment.value);
	fpbkSubmitAc()
};

const fileList = ref([]);
const fileListRef = {
  fileList
};
const handleUpload = (event) => {
  afterRead(event, 'fileList');
};
const afterRead = (event, fileListName) => {
  uploadFiles(event, fileListName, fileListRef);
};
const check = (e, fileListName) => {
  uploadCheack(e, fileListName);
};
const delete1 = (event, fileListName) => {
  uploadDelete(event, fileListName, fileListRef);
};
const fpbkSubmitAc = async (id) => {
    console.log('props.ddid', props.ddid);
    // 校验金额是否大于0
    if (price.value <= 0) {
        uni.showToast({
            title: '金额必须大于0',
            icon: 'none',
            duration: 2000
        });
        return;
    }

    const data = {
        zffs: selectedPayment.value.id, // 支付方式 1微信2支付宝3收款码4银行卡5现金6其它	
        skremarks: remark.value,
        imgs: fileList.value.map(file => file.url).join(','),
        price: price.value,	
        ddid: props.ddid
    };

    emit('reload', data);

    // const res = await fpbkSubmit(data);
    // console.log('sub res', res);
    // if (res.code === '200') {
    //     uni.showToast({
    //         title: '操作成功',
    //         icon: 'success',
    //         duration: 500
    //     });
    //     setTimeout(() => {
    //         emit('reload');
    //     }, 500);
    // }
};


</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.custom-order-card-saixuan {
	background: #f9f9f9;
	text {
		color: #1f1f1f;
	}
}
.custom-order-card-saixuan-selected {
	animation: selectedAnimation 0.3s ease;
	background: #ffeeec;
	text {
		color: #eb4636;
	}
}
.time-box {
	width: 300rpx;
	height: 72rpx;
	background: #ffffff;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
	border: 2rpx solid #cbcbcb;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #1f1f1f;
	font-style: normal;
	text-transform: none;
}
.text-3 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 30rpx;
	color: #1f1f1f;
	font-style: normal;
	text-transform: none;
}
.text-4 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
</style>
