<template>
	<view class="staffInfos-layout">
		<!-- header -->
		<custom-header>
			<template #name>{{title}}</template>
			<template #fill>商品录入</template>
		</custom-header>

		<view
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
			"
		>
			<text class="text-1">员工名称</text>
			<input type="text" v-model="staffName" placeholder="请输入" />
		</view>

		<view
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
			"
		>
			<text class="text-1">联系方式</text>
			<input type="text" v-model="contact" placeholder="请输入" />
		</view>

		<view
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
			"
		>
			<text style="" class="text-1">绑定微信</text>
			<input type="text" :disabled="ygid" v-model="phone" placeholder="请输入" />
		</view>

		<view
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
				justify-content: space-between;
			"
		>
			<view style="display: flex; align-items: center">
				<text style="margin-right: 30rpx" class="text-1">岗位配置</text>
				<picker :range="positionArray" range-key="name" @change="onSelectChange" mode="selector" :value="pickerMemberValue">
					<input type="text" placeholder="请选择" disabled v-model="pickerMemberValue.name" />
				</picker>
			</view>
			<picker :range="positionArray" range-key="name" @change="onSelectChange" mode="selector" :value="pickerMemberValue">
				<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
			</picker>
		</view>

		<view
			@click="openPannel"
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
				justify-content: space-between;
			"
		>
			<view style="display: flex; align-items: center">
				<text style="margin-right: 30rpx" class="text-1">仓库配置</text>
				<input type="text" placeholder="请选择" disabled v-model="warehouse" />
			</view>
			<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
		</view>
		
		<view
			@click="openStaffPannel1"
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
				justify-content: space-between;
			"
		>
			<view style="display: flex; align-items: center">
				<text style="margin-right: 30rpx" class="text-1">配置员工</text>
				<input type="text" placeholder="请选择" disabled v-model="staffs" />
			</view>
			<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
		</view>
		
		<view
			@click="openStaffPannel2"
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
				justify-content: space-between;
			"
		>
			<view style="display: flex; align-items: center">
				<text style="margin-right: 30rpx" class="text-1">消息推送</text>
				<input type="text" placeholder="请选择" disabled v-model="messageStaffs" />
			</view>
			<image style="height: 20rpx; width: 20rpx" src="https://www.xzxskj.com/xcximg/icon_next_xia@3x.png" mode="aspectFill"></image>
		</view>
		
		
		<view
			style="
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-top: 20rpx;
			"
		>
			<view style="display: flex;align-items: center;">
				<text class="text-1">登录密码</text>
				<input type="number" disabled v-model="password" placeholder="123456" />
			</view>
			<text @click="openDialogPopup" class="text-1" style="color: blue;text-align: right;">重置</text>
		</view>
		
		<uni-popup ref="dialogPopup" type="dialog">
			<uni-popup-dialog mode="input" title="重置密码" :before-close="true" @close="handleClose" @confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" :safe-area="false" ref="staffPannelPopup" type="bottom" @close="handleClose" @change="change">
			<staffPannel ref="staffPannelRef" :title="pannelTitle" :workerData="workerData" @close="handleClose" @staffConfirm1="staffConfirm1"></staffPannel>
		</uni-popup>
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" :safe-area="false" ref="messagePannelPopup" type="bottom" @close="handleClose" @change="change">
			<messagePannel ref="messagePannelRef"  @close="handleClose" @messageConfirm="staffConfirm2"></messagePannel>
		</uni-popup>
		
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" :safe-area="false" ref="warehousePannelPopup" type="bottom" @close="handleClose" @change="change">
			<warehousePannel ref="warehousePannelRef" @close="handleClose" @confirm="handleConfirm"></warehousePannel>
		</uni-popup>

		<view style="margin-top: 48rpx; display: flex; align-items: center; padding-left: 92rpx; padding-right: 92rpx; justify-content: space-between; width: 100%">
		<view style="display: flex; align-items: center" @click="toggleSelection('1')">
			<image style="margin-right: 20rpx; height: 36rpx; width: 36rpx; border-radius: 50%" :src="isSelected('1') ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png'" mode="aspectFill"></image>
			<text class="text-3">采购员工</text>
		</view>
		<view style="display: flex; align-items: center" @click="toggleSelection('3')">
		  <image style="margin-right: 20rpx; height: 36rpx; width: 36rpx; border-radius: 50%" :src="isSelected('3') ? 'https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png' : 'https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png'" mode="aspectFill"></image>
		  <text class="text-3">销售员工</text>
		</view>
		<!--  <view style="display: flex; align-items: center" @click="toggleSelection('2')">
		    <image style="margin-right: 20rpx; height: 36rpx; width: 36rpx; border-radius: 50%" :src="isSelected('2') ? '/pagesStaffInfos/static/icon_xuanze_sel@3x.png' : '/pagesStaffInfos/static/icon_moren_nor@3x.png'" mode="aspectFill"></image>
		    <text class="text-3">仅查看操作自己的采购</text>
		  </view> -->
		</view>
		
		<view style="margin-top: 20rpx; display: flex; align-items: center; padding-left: 92rpx; padding-right: 92rpx; justify-content: space-between; width: 100%">
		 <!-- <view style="display: flex; align-items: center" @click="toggleSelection('3')">
		    <image style="margin-right: 20rpx; height: 36rpx; width: 36rpx; border-radius: 50%" :src="isSelected('3') ? '/pagesStaffInfos/static/icon_xuanze_sel@3x.png' : '/pagesStaffInfos/static/icon_moren_nor@3x.png'" mode="aspectFill"></image>
		    <text class="text-3">销售员工</text>
		  </view> -->
		
		 <!-- <view style="display: flex; align-items: center" @click="toggleSelection('4')">
		    <image style="margin-right: 20rpx; height: 36rpx; width: 36rpx; border-radius: 50%" :src="isSelected('4') ? '/pagesStaffInfos/static/icon_xuanze_sel@3x.png' : '/pagesStaffInfos/static/icon_moren_nor@3x.png'" mode="aspectFill"></image>
		    <text class="text-3">仅查看操作自己的销售</text>
		  </view> -->
		</view>

		<view
			style="
				width: 750rpx;
				height: 182rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				position: absolute;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			"
		>
			<view v-if="title==='新建员工'" class="button-animation" @click="confirm"
				style="
					width: 690rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text class="text-2">新建员工</text>
			</view>
			<view v-else class="button-animation" @click="edit"
				style="
					width: 690rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text class="text-2">修改员工</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiStaffAdd, apiAdminStationList, apiStaffDetail,apiStaffEdit } from '@/api/station/station.js';
import { warehousePannel } from './components/staffinfos-warehouse-pannel';
import { staffPannel } from './components/staffPannel.vue'
import { messagePannel } from './components/messagePannel.vue'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
const pannelTitle = ref('')
const warehouse = ref('');
const ckid = ref('-1');
const phone = ref('');
const title = ref('新建员工');
const staffName = ref('');
const gwid = ref('');
const contact = ref('')
const password = ref('')
const dialogPopup = ref(null)
const warehousePannelPopup = ref(null);
const warehousePannelRef = ref(null); // 引用子组件实例
const staffPannelPopup = ref(null);
const messagePannelPopup = ref(null);
const staffPannelRef = ref(null); // 引用子组件实例
const messagePannelRef = ref(null); // 引用子组件实例
const showPannel = ref(false);
const handleClose = () => {
	messagePannelPopup.value.close();
	warehousePannelPopup.value.close();
	staffPannelPopup.value.close();
	dialogPopup.value.close();
};	

// 选中的工作类型
const selectedGzlx = ref([]);
const toggleSelection = (gzlx) => {
	const index = selectedGzlx.value.indexOf(gzlx);
	if (index === -1) {
		selectedGzlx.value.push(gzlx);
	} else {
		selectedGzlx.value.splice(index, 1);
	}
};

const isSelected = (gzlx) => {
	return selectedGzlx.value.includes(gzlx);
};

const pickerMemberValue = ref('');
const positionArray = ref([]);
const onSelectChange = (e) => {
	pickerMemberValue.value = positionArray.value[e.detail.value];
	gwid.value = positionArray.value[e.detail.value].id; // 更新 gwid
};
const openPannel = () => {
	showPannel.value = true;
	warehousePannelPopup.value.open();
};

const openStaffPannel1 = ()=>{
	pannelTitle.value = '配置员工'
	showPannel.value = true;
	staffPannelPopup.value.open();
}
const openStaffPannel2 = ()=>{
	pannelTitle.value = '消息推送'
	showPannel.value = true;
	messagePannelPopup.value.open();
}
const staffs = ref();
const ygids = ref('-1')

const messageStaffs = ref()
const messageYgids = ref('')
const staffConfirm1 = (data)=>{
	console.log('员工数据：', data);
	const selecteStaff = data.filter((item) => item.selected);
	const selecteStaffNames = selecteStaff.map((item) => item.text);
	const selecteStaffIds = selecteStaff.map((item) => item.ygid);
	staffs.value = selecteStaffNames.join(',');
	ygids.value = selecteStaffIds.join(',').replace(/^,/, '')||'-1';
}

const staffConfirm2 = (data)=>{
	console.log('消息数据：', data);
	const selecteStaff = data.filter((item) => item.selected);
	const selecteStaffNames = selecteStaff.map((item) => item.text);
	const selecteStaffIds = selecteStaff.map((item) => item.tsid);
	messageStaffs.value = selecteStaffNames.join(',');
	messageYgids.value = selecteStaffIds.join(',').replace(/^,/, '');
}

const handleConfirm = (data) => {
	console.log('仓库数据：', data);
	const selectedWarehouses = data.filter((item) => item.selected);
	const selectedWarehouseNames = selectedWarehouses.map((item) => item.text);
	const selectedWarehouseIds = selectedWarehouses.map((item) => item.ckid);
	if (selectedWarehouseNames.length === data.length) {
		warehouse.value = '全部仓库';
		ckid.value = '0'
	} else {
		warehouse.value = selectedWarehouseNames.join(',');
		ckid.value = selectedWarehouseIds.join(',').replace(/^,/, '')||'-1';
	}
	
};

const apiStaffAddData = async () => {
	const data = {
		username: staffName.value,
		phone: phone.value,
		gwid: gwid.value, // 使用选中的 gwid
		ckid: ckid.value,
		gzlx: selectedGzlx.value.join(','),
		// opid: uni.getStorageSync('sessionInfo').opid,
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		password: password.value,
		contact: contact.value,
		ygid: ygids.value,
		tsid: messageYgids.value
		
	};
	const res = await apiStaffAdd(data);
	if (res.code === 200) {
		uni.showToast({
			title: '保存成功',
			icon: 'none'
		});
		uni.navigateBack();
	}else{
		uni.showToast({
			title: res.msg||'操作失败',
			icon: 'none'
		});
	}
};

const dialogConfirm = (e)=>{
	password.value = e
	dialogPopup.value.close()
}

const openDialogPopup = ()=>{
	// dialogPopup.value.open()
	uni.showModal({
		title: '重置密码',
		content: '是否重置密码',
		success: function (res) {
			if (res.confirm) {
				password.value = '123456'
			}
		}
	});
}

const stationList = ref([]);
const apiAdminStationListData = async () => {
	const data = {
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid
	};
	const res = await apiAdminStationList(data);
	if (res.code === 200) {
		stationList.value = res.lists;
		res.lists.forEach((item) => {
			if (item.status === '1') {
				positionArray.value.push({ id: item.id, name: item.name });
			}
		});
		// 如果传递了 gwid，设置选中值
		if (gwid.value) {
			console.log('gwid:', gwid.value);
			console.log('positionArray:', positionArray.value);
			const selectedIndex = positionArray.value.findIndex(item => item.id === gwid.value.toString());
			console.log('selectedIndex:', selectedIndex);
			if (selectedIndex !== -1) {
				pickerMemberValue.value = positionArray.value[selectedIndex];
			}
		}
	}
};

const apiStaffDetailData = async (ygid) => {
	const data = {
		ygid: ygid,
	};
	const res = await apiStaffDetail(data);
	if (res.code === 200) {
		staffName.value = res.infos.username;
		phone.value = res.infos.phone;
		contact.value = res.infos.lxfs;
		password.value = res.infos.mm;
		res.infos.gzlx.split(',').forEach((item) => {
			selectedGzlx.value.push(item);
		});
		//设置选中员工
		staffPannelRef.value.setSelectedStaffs(res.infos.ygidlist)
		// 设置选中的仓库
		warehousePannelRef.value.setSelectedWarehouses(res.infos.ckid);
		// warehouse.value = res.infos.gwname
		console.log('res:', res);
		
		messagePannelRef.value.setSelectedStaffs(res.infos.tslists)
	}
};


const apiStaffEditData = async (ygid) => {
	const data = {
		id: ygid,
		username: staffName.value,
		phone: phone.value.replace(/\s+/g, ''),
		gwid: gwid.value,
		ckid: ckid.value,
		gzlx: selectedGzlx.value.join(','),
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		password: password.value,
		contact: contact.value.replace(/\s+/g, ''),
		ygid: ygids.value,
		tsid: messageYgids.value
		// opid: uni.getStorageSync('sessionInfo').opid,
	};
	const res = await apiStaffEdit(data);
	if (res.code === 200) {
		uni.showToast({
			title: '修改成功',
			icon: 'none'
		});
		uni.navigateBack();
	}
};



const edit = () => {
	apiStaffEditData(ygid.value);
};

const confirm = () => {
	apiStaffAddData();
};
const ygid = ref();
onLoad((options) => {
	if (options.forEdit) {
		title.value = '修改员工';
		ygid.value = options.forEdit;
		apiStaffDetailData(options.forEdit);
		gwid.value = options.gwid; // 设置传递过来的 gwid
	}
	apiAdminStationListData();
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.staffInfos-layout {
	min-height: 100vh;
	background: linear-gradient(180deg, #f3f2f6 0%, #ffffff 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.text-1 {
	margin-right: 30rpx;
	width: 150rpx;
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	height: 42rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 30rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-3 {
	height: 40rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
	opacity: 0.4;
}
</style>
