<template>
	<view class="shoppingNew-layout page" v-if="addressInfos">
		<!-- header -->
		<custom-header>
			<template #name>{{title}}</template>
			<template #fill>新建地址</template>
		</custom-header>
		
		<view class="card" v-for="(item,index) in data" :key="index">
			<view class="left">
				<text>{{item.key}}</text>
			</view>
			<view class="right">
				<div class="input-container">
					<input v-if="item.key !== '所在地区'" placeholder="请输入" class="inp real-input" type="text" v-model="item.value" />
					<text v-else @click="openLocationPicker">{{item.value}}</text>
					<image v-if="item.key==='所在地区'" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill" @click="openLocationPicker"></image>
				</div>
			</view>
		</view>
		
		<view class="addressDetail">
			<!-- <view class="top">
				<text>详细地址</text>
			</view> -->
			<view class="bottom">
				<textarea placeholder="请输入详细地址（例如**街**号**)" v-model="form.address" />
			</view>
		</view>
		
		<view class="defalt">
			<view class="left">
				<text>默认地址</text>
			</view>
			<view class="right">
				<switch :checked="addressInfos.zt==='1'" @change="switch2Change" />
			</view>
		</view>
		
		<!--bar -->
		<view class="bar" @click="save">
			<view class="btn">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apigetAddress, apiDelAddress, apiAddAddress, apigetAddressDetail } from '@/api/address/address.js';
import { useLocationStore } from "@/stores/locationStore.js"

const locationStore = useLocationStore();
const addressId = ref();
const title = ref('新建地址');
const data = ref([
	{id:'1',key:'收件人姓名',value:''},
	{id:'2',key:'联系人电话',value:''},
	{id:'3',key:'所在地区',value:'请选择'}
]);
const form = ref({
	fullLocation: '',
	province: '',
	city: '',
	region: '',
	address: '',
	postCode: '',
	longitude: '',
	latitude: '',
	name: ''
});
const key = 'KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO';
const referer = 'demo2';
const category = '生活服务,娱乐休闲';

const chooseLocation = requirePlugin('chooseLocation');
const openLocationPicker = () => {
	const location = JSON.stringify({
		latitude: form.value.latitude,
		longitude: form.value.longitude
	});
	uni.navigateTo({
		url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
	});
};

const switch2Change = (e) => {
	addressInfos.value.zt = e.detail.value ? '1' : '0';
};

const save = () => {
	uni.showModal({
		title: "确认修改地址簿？",
		success: res => {
			if (res.confirm) {
				addAddress();
			}
		}
	});
};

const addAddress = async () => {
	const list = uni.getStorageSync('addressList');
	if (addressInfos.value.zt === '1') {
		const hasDefaultAddress = list.some(item => item.zt === '1');
		if (hasDefaultAddress) {
			uni.showModal({
				title: '提示',
				content: '已经拥有默认地址了',
				showCancel: false
			});
			return; 
		}
	}
	
	const addressData = {
		id:addressInfos.value.id,
		opid: uni.getStorageSync('sessionInfo').opid,
		name: data.value[0].value,
		phone: data.value[1].value,
		province: form.value.province,
		city: form.value.city,
		area: form.value.region,
		address: data.value[2].value,
		zt: addressInfos.value.zt
	};
	const res = await apiAddAddress(addressData);
	if (res.code === '200') {
		uni.showToast({
			title: '修改成功',
			icon: 'success',
			duration: 2000
		});
		uni.navigateBack();
	}
};

const addressInfos = ref();
const getAddressDetail = async (id) => {
	const param = { id: id };
	const res = await apigetAddressDetail(param);
	addressInfos.value = res.info;
	form.value.address = res.info.address;
	form.value.province = res.info.province;
	form.value.city = res.info.city;
	form.value.region = res.info.area;
	data.value[0].value = res.info.name;
	data.value[1].value = res.info.phone;
	data.value[2].value = res.info.province + ' ' + res.info.city + ' ' + res.info.area;
};

onMounted(async () => {
	form.value = await useLocationStore().getForm();
});

onLoad((options) => {
	if (options.id) {
		addressId.value = options.id;
		title.value = '修改地址';
		getAddressDetail(options.id);
	}
});

onShow(() => {
	const lo = chooseLocation.getLocation();
	if (lo) {
		form.value.address = lo.address;
		form.value.province = lo.province;
		form.value.city = lo.city;
		form.value.region = lo.district;
		form.value.latitude = lo.latitude.toString();
		form.value.longitude = lo.longitude.toString();
		const fullLo = [lo.province, lo.city, lo.district];
		form.value.fullLocation = fullLo.join(' ');
		form.value.name = lo.name;
		data.value[2].value = form.value.fullLocation;
	}
});
</script>

<style lang="scss" scoped>
.shoppingNew-layout {
	height: 100vh;
	width: 750rpx;
	background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.card {
	margin-top: 20rpx;
	box-sizing: border-box;
	width: 710rpx;
	height: 104rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
}

.left text,
.right text {
	height: 40rpx;
	font-family: PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1F1F1F;
}

.right .input-container {
	display: flex;
	align-items: center;
}

.right input,
.right text {
	text-align: right;
	height: 34rpx;
	font-size: 24rpx;
	color: #1F1F1F;
	opacity: 0.4;
}

.right image {
	width: 20rpx;
	height: 20rpx;
	margin-left: 10rpx;
}

.addressDetail {
	box-sizing: border-box;
	margin-top: 20rpx;
	width: 710rpx;
	height: 200rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 32rpx 20rpx;
}

.addressDetail .top text {
	margin-bottom: 30rpx;
}
.defalt {
	box-sizing: border-box;
	margin-top: 20rpx;
	width: 710rpx;
	height: 104rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;

	.left text {
		height: 40rpx;
		font-family: PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #1F1F1F;
	}
}

.bar {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 750rpx;
	height: 182rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	padding: 24rpx 30rpx 62rpx 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bar .btn {
	width: 690rpx;
	height: 96rpx;
	background: linear-gradient(135deg, #ED784B 0%, #EB4636 100%);
	border-radius: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bar .btn text {
	height: 42rpx;
	font-family: PingFang SC;
	font-weight: 400;
	font-size: 30rpx;
	color: #FFFFFF;
}
</style>
