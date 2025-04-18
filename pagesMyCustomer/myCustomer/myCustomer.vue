<template>
	<view class="myCustomer-layout">
		<!-- header -->
		<custom-header>
			<template #name>客户信息</template>
			<template #fill>个人信息</template>
		</custom-header>

		<view style="margin-top: 38rpx;width: 710rpx; height: 100rpx; background: #ffffff; border-radius: 20rpx;display: flex;align-items: center;padding-left: 20rpx;">
			<image style="margin-right: 20rpx;height: 30rpx;width: 30rpx;" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
			<!-- <input style="width: 500rpx;" type="text" class="text-2" placeholder="请搜索客户绑定微信的手机号码"/> -->
			<view style="width: 100%;padding-right: 20rpx;" class="selectDownUp">
				<qiaoSelect
					class="search-select"
					:keyId="2"
					:dataList="orgArray"
					phText="请输入客户完整电话进行搜索"
					:searchKey="searchModelKey"
					:showBorder="false"
					:disabled="false"
					:showField="showModelField"
					@input="handleInput"
					@change="selectSearchChange"
				></qiaoSelect>
			</view>
		</view>

		<view class="content">
			<view class="card" v-for="(item, index) in data" :key="index">
				<text class="text-1">{{ item.name }}</text>
				<view class="right">
					<input
						disabled
						v-if="item.name !== '绑定微信' && item.name !== '商家名称'"
						class="text-2"
						type="text"
						:value="item.value"
						placeholder="请搜索"
					/>
					<input v-if="item.name === '绑定微信'" disabled class="text-2" type="text" :value="item.value" placeholder="请搜索" />
					<input disabled v-if="item.name === '商家名称'" class="text-2" type="nickname" name="nickname" :value="item.value" placeholder="保存后无法修改，请认真仔细填写" />
					<!-- <image src="/pagesMyCustomer/static/icon_next@3x.png" mode="aspectFill" v-if="item.name === '门店地址'" @click="openLocationPicker"></image> -->
				</view>
			</view>
		</view>
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn" @click="comfirm">
				<text>添加为我的客户</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiCustomerAdd,apiCustomerSearch } from '../api/api.js';
import { useLocationStore } from '@/stores/locationStore.js';
import { apiUpdateUserInfo } from '@/api/member/member.js';
const orgArray = ref([]);
const searchModelKey = ref('phone');
const showModelField = ref('phone');
const locationStore = useLocationStore();
const photos = ref([]);
const choosePhoto = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['camera', 'album'],
		success: function (res) {
			console.log(JSON.stringify(res.tempFilePaths));
			res.tempFilePaths.forEach((path) => {
				photos.value.push(path);
			});
		}
	});
};
const avatorUrl = ref();
const chooseAvatar = (e) => {
	avatorUrl.value = e.detail.avatarUrl;
};
const data = ref([
	{ name: '客户名称', value: '' },
	{ name: '联系方式', value: '' },
	{ name: '绑定微信', value: '' },
	{ name: '门店名称', value: '' },
	{ name: '门店地址', value: '' }
]);
const form = ref({
	fullLocation: '', // 省市区(前端展示)
	province: '', // 省份编码(后端参数)
	city: '', // 城市编码(后端参数)
	region: '', // 区/县编码(后端参数)
	address: '', // 详细地址
	postCode: '', // 邮编
	longitude: '', // 经度
	latitude: '', // 纬度
	name: '' // 地址名称
});
const longitude = ref(0);
const latitude = ref(0);
const key = 'KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO'; //使用在腾讯位置服务申请的key
const referer = 'demo2'; //调用插件的app的名称
const category = '生活服务,娱乐休闲';
const chooseLocation = requirePlugin('chooseLocation');
const openLocationPicker = () => {
	console.log('打开地图');

	const location = JSON.stringify({
		latitude: form.value.latitude,
		longitude: form.value.longitude
	});
	uni.navigateTo({
		url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
	});
};

const unpateMenber = async () => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		name: data.value[0].value,
		shopname: data.value[2].value,
		shopadd: data.value[3].value,
		img: avatorUrl.value
	};
	const res = await apiUpdateUserInfo(data);
	if (res.code === '200') {
		const info = await useUserStore().getInfo();
		console.log('用户刷新检查:', info);
		uni.navigateBack();
	}
	console.log(res);
};

const handleInput = (inputText) => {
	if (inputText.length>0) {
		apiCustomerSearchData(inputText);
	}
};
const selectSearchChange = (e) => {
	if (e) {
		
		console.log('selectSearchChange e:', e);
		data.value[0].value = e.nik_name;
		data.value[1].value = e.lxfs;
		data.value[2].value = e.phone;
		data.value[3].value = e.shopname;
		data.value[4].value = e.shopadd;
	}
};

const apiCustomerSearchData = async (phone) => {
	const data = {
		phone: phone,
		opid: uni.getStorageSync('sessionInfo').opid,
		lx:'1'
		
	}
	const res = await apiCustomerSearch(data);
	if (res.zt === 1) {
		console.log('res:', res);
		orgArray.value = res.lists?res.lists:[];
	}
};

const comfirm = () => {
	apiCustomerAddAction()
};
onMounted(async () => {
	form.value = await useLocationStore().getForm();
});
onShow(() => {
	const lo = chooseLocation.getLocation();
	console.log(lo);
	if (lo) {
		form.value.address = lo.address;
		form.value.province = lo.province;
		form.value.city = lo.city;
		form.value.region = lo.district;
		form.value.latitude = lo.latitude.toString();
		form.value.longitude = lo.longitude.toString();
		const fullLo = [];
		fullLo.push(lo.province);
		fullLo.push(lo.city);
		fullLo.push(lo.district);
		form.value.fullLocation = fullLo.join(' ');
		form.value.name = lo.name;
		// data.value[3].value = form.value.name;
		data.value[4].value = form.value.address;
	}
});
const apiCustomerAddAction = async () => {
	const param = {
		phone:data.value[1].value,
		opid:uni.getStorageSync('sessionInfo').opid,
		khname:data.value[0].value,
		shopname:data.value[3].value,
		shopadd:data.value[4].value,
		khphone:data.value[2].value,
	}
	const res = await apiCustomerAdd(param);
	if (res.code === 200) {
		uni.showToast({
			title: '添加成功',
			icon: 'success',
			duration: 2000
		});
		uni.navigateBack();
	}
	if (res.code === 201) {
		uni.showToast({
			title: '已经存在客户',
			icon: 'error',
			duration: 2000
		});
	}
	console.log('res:',res);
};
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.myCustomer-layout {
	width: 750rpx;
	height: 100vh;
	background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.avter {
		margin-top: 52rpx;
		width: 710rpx;
		height: 128rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 24rpx;
		padding-right: 24rpx;
		box-sizing: border-box;
		text {
			text-align: left;
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
		}
		image {
			height: 80rpx;
			width: 80rpx;
			border-radius: 50%;
		}
		.avterBtn {
			position: absolute;
			width: 100%;
			opacity: 0;
		}
	}

	.content {
		width: 710rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		.card {
			margin-top: 20rpx;
			width: 710rpx;
			height: 100rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			.right {
				width: 500rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				// position: relative;
				.text-2 {
					width: 450rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					opacity: 0.4;
				}
				image {
					height: 25rpx;
					width: 25rpx;
					margin-left: 10rpx;
				}
			}
			.text-1 {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
			}
		}
	}

	.pannel-btn {
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
		padding: 24rpx 30rpx 62rpx 30rpx;
		.btn {
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
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
			}
		}
	}
}
</style>
