<template>
	<view class="authority-layout">
		<custom-header :backgroundColor="'#FFFFFF'">
			<template #name>{{title}}</template>
			<template #fill>回收报价</template>
		</custom-header>
		<scroll-view scroll-y style="height: 1200rpx;" >
			<view
				style="
					width: 710rpx;
					height: 100rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					display: flex;
					align-items: center;
					gap: 40rpx;
					margin-top: 30rpx;
					margin-left: 20rpx;
				"
			>
				<text class="text-1">岗位名称</text>
				<input type="text" placeholder="请输入" v-model="inputValue" />
			</view>
			<view style="margin-left: 20rpx;width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; margin-top: 20rpx; display: flex; flex-direction: column; padding: 20rpx">
				<text style="margin-bottom: 20rpx" class="text-1">权限配置</text>
				<!-- defaultExpandedKeys -->
				<mosowe-tree ref="mosoweTreeRef" height="10000rpx" accordion v-model="checkValues" :data="treeList" label="name" value="id" show-checkbox @nodeClick="nodeClick"></mosowe-tree>
			</view>
			
		</scroll-view>
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
				padding-bottom: 60rpx;
			"
		>
			<view v-if="title==='新建岗位'" class="button-animation" @click="save"
				style="
					width: 710rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text class="text-2">保存</text>
			</view>
			<view v-else class="button-animation" @click="edit"
				style="
					width: 710rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text class="text-2">修改保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { apiGetAuthority, apiStationAdd, apiStationDetail, apiStationEdit } from '@/api/station/station.js';

const inputValue = ref();
const title = ref('新建岗位');
const mosoweTreeRef = ref(null);
const treeList = ref([]);
const checkValues = ref([]);
const selectedValuesString = ref('');

const processTreeData = (data) => {
	return data.map(item => {
		let children = item.lists ? processTreeData(item.lists) : [];
		return {
			id: item.id,
			name: item.name,
			url: item.url,
			permission: item.permission,
			children: children,
			hide: item.hide === '1' // 处理 hide 属性为 true 或 false
		};
	}).filter(item => !item.hide); // 过滤掉 hide 为 true 的项
};

// 节点点击
const nodeClick = (item) => {
	console.log('节点点击:', item);
	console.log('数据',treeList.value)
};

// filter筛选
const searchKey = ref('');
const search = () => {
	mosoweTreeRef.value.filter(searchKey.value);
};

const authorityList = ref([]);

const apiGetAuthorityData = async () => {
	const res = await apiGetAuthority();
	if (res.code === 200) {
		authorityList.value = res.lists;
		treeList.value = processTreeData(res.lists);
	}
};

const apiStationAddData = async () => {
	const data = {
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		name: inputValue.value,
		qxid: selectedValuesString.value,
	};
	const res = await apiStationAdd(data);
	if (res.code === 200) {
		uni.showToast({
			title: '保存成功',
			icon: 'none',
		});
		uni.navigateBack();
	}
};

const apiStationDetailData = async (gwid) => {
	const res = await apiStationDetail({ gwid });
	if (res.code === 200) {
		inputValue.value = res.infos.name;
		res.lists.forEach((item) => {
			if (item.checked) {
				checkValues.value.push(item.id);
			}
		});
	}
};

const apiStationEditData = async () => {
	const data = {
		opid: JSON.parse(uni.getStorageSync('userInfo')).opid,
		name: inputValue.value,
		qxid: selectedValuesString.value,
		gwid: gwid4Edit.value,
	};
	const res = await apiStationEdit(data);
	if (res.code === 200) {
		uni.showToast({
			title: '保存成功',
			icon: 'none',
		});
		uni.navigateBack();
	}
};

const edit = () => {
	apiStationEditData();
};

const save = () => {
	apiStationAddData();
};

const gwid4Edit = ref();

onMounted(() => {
	apiGetAuthorityData();

	if (gwid4Edit.value) {
		apiStationDetailData(gwid4Edit.value);
	}

	watch(
	  () => checkValues.value,
	  (newValues) => {
	    let finalCheckedValues = [...newValues];
	    if (mosoweTreeRef.value) {
	      let halfCheckedNodes = mosoweTreeRef.value.getHalfCheck();
	      console.log('halfCheckedNodes:', halfCheckedNodes);
	      if (halfCheckedNodes && halfCheckedNodes.halfNodeKeys.length !== 0) {
	        halfCheckedNodes.halfNodeKeys.forEach((item) => {
	          if (!finalCheckedValues.includes(item)) {
	            finalCheckedValues.push(item);
	          }
	        });
	      }
	    }
	    console.log('finalCheckedValues:', finalCheckedValues);
	    selectedValuesString.value = finalCheckedValues.join(',');
	    console.log('选中的值:', selectedValuesString.value);
	  },
	  {
	    deep: true
	  }
	);
});

onLoad((options) => {
	if (options.forEdit) {
		gwid4Edit.value = options.forEdit;
		title.value = '修改岗位';
	}
});
</script>


<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.authority-layout {
	min-height: 100vh;
	background: #f3f2f6;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.text-1 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
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
