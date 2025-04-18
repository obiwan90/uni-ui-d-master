<template>
	<view class="identity-pannel">
		<view class="title">
			<text>切换身份</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>
		<scroll-view scroll-y style="height: 520rpx;width: 100%;">
			<view class="card" v-for="(item, index) in data" :key="index" :class="{ active: selectedIndex === index }" @click="handleCardClick(index,item)">
				<view class="col1">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="content" :class="{ 'justify-content-center': item.text === '我是用户' }">
						<text>{{ item.text }}</text>
						<view class="tap" :class="{ 'tap-admin': item.adminLx === '1' }" v-if="item.company">
							<text>{{ item.company }}</text>
						</view>
					</view>
				</view>
				<view class="col2">
					<image v-if="selectedIndex === index" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
				</view>
			</view>
			<view style="height: 30rpx;">
				
			</view>
		</scroll-view>

		<view class="btn button-animation" @click="confirm()">
			<text>确定</text>
		</view>
	</view>
</template>
<script setup>
import { useUserStore } from '@/stores/userInfoStore.js';
import { onMounted, ref } from 'vue';
import { debounce } from '@/utils/debounce.js';

const emit = defineEmits(['close']);
const closePanel = () => {
  emit('close');
};

const data = ref([]);
const selectedIndex = ref(0);
const adminLx = ref('');
const adminId = ref('');

// 处理身份卡片点击事件
const handleCardClick = (index, item) => {
  selectedIndex.value = index;
  adminLx.value = item.adminLx;
  adminId.value = item.adminId;
};

// 确认按钮的防抖处理
const confirm = debounce(() => handleConfirmClick(), 1000, true);

// 保存用户身份信息
const saveIdentityToStorage = async () => {
  const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
  const db = uniCloud.database();

  // 移除现有设置并保存新的身份信息
  await db.collection('user-setting').where({ user_id: userInfo.id }).remove();
  await db.collection('user-setting').add({
    user_id: userInfo.id,
    adminLx: adminLx.value,
    adminId: adminId.value,
    identityData: data.value,
    selectedMine: String(selectedIndex.value)
  });
};

// 确认身份切换逻辑处理
const handleConfirmClick = async () => {
  uni.setStorageSync('adminLx', adminLx.value);
  uni.setStorageSync('adminId', adminId.value);
  const mineIndex = uni.getStorageSync('selectedMine') || 0;

  if (mineIndex === selectedIndex.value) {
    closePanel();
    return;
  }

  await useUserStore().getInfo();

  uni.setStorageSync('identityData', data.value);
  uni.setStorageSync('selectedMine', selectedIndex.value);

  await saveIdentityToStorage();

  const isSameAdminType = data.value[mineIndex].adminLx === data.value[selectedIndex.value].adminLx;
  if (isSameAdminType) {
    const isAdmin = data.value[mineIndex].adminLx === '1';
    uni.$emit(isAdmin ? 'pagesAdminUpdate' : 'pagesCustomMineUpdate');
    closePanel();
  } else {
    uni.showLoading({
      title: '加载中'
    });
    
    setTimeout(() => {
      uni.redirectTo({
        url: data.value[selectedIndex.value].path + '?from=identity',
        success: () => {
          uni.hideLoading();
        },
        fail: (err) => {
          console.error('Redirect failed:', err);
          uni.hideLoading();
        }
      });
    }, 300);


    closePanel();
  }
};

// 初始化身份数据
const initializeIdentityData = () => {
  const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
  
  if (userInfo.joininfos && userInfo.joininfos.length > 0) {
    // 添加用户身份数据
    data.value.push({
      image: 'https://www.xzxskj.com/Public/upload/66a5cbd5313826194.png',
      username: userInfo.username || '', 
      text: '我是用户',
      adminLx: '',
      adminId: '',
      company: '',
      path: '/pagesUserMine/userMine/userMine'
    });

    // 遍历并添加供应商或管理员身份数据
    userInfo.joininfos.forEach(joininfo => {
      const image = joininfo.adminlx === '1'
        ? 'https://www.xzxskj.com/Public/upload/66a5cbecc3e433030.png'
        : (joininfo.adminlx === '2' || joininfo.adminlx === '4')
        ? 'https://www.xzxskj.com/Public/upload/66a5cbbbd871a873.png'
        : '';

      const path = joininfo.adminlx === '1'
        ? '/pagesAdmin/admin/admin'
        : (joininfo.adminlx === '2' || joininfo.adminlx === '4')
        ? '/pagesCustomMine/customMine/customMine'
        : '';

      data.value.push({
        image,
        username: joininfo.username || '', 
        text: joininfo.gsname,
        adminLx: joininfo.adminlx,
        adminId: joininfo.id,
        company: joininfo.gwname,
        path,
        gsid: joininfo.gsid
      });
    });
  }
};


onMounted(() => {
  const selectedMine = uni.getStorageSync('selectedMine');
  if (selectedMine) {
    selectedIndex.value = selectedMine;
  }
  initializeIdentityData();
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.identity-pannel {
	width: 590rpx;
	height: 792rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 24rpx;
	padding-right: 24rpx;
	padding-top: 30rpx;
	padding-bottom: 66rpx;
	.title {
		width: 100%;
		margin-bottom: 32rpx;
		display: flex;
		justify-content: space-between;
		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1f1f1f;
			text-align: left;
		}
		image {
			height: 32rpx;
			width: 32rpx;
			border-radius: 50%;
		}
	}
	.card {
		width: 530rpx;
		height: 144rpx;
		background: #ffffff;
		box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx;
		margin-bottom: 20rpx;
		&.active {
			.col2 image {
				display: block;
			}
		}
		.col1 {
			width: 80%;
			height: 100%;
			display: flex;
			align-items: center;
			image {
				border-radius: 50%;
				width: 96rpx;
				height: 96rpx;
				// border: 1rpx solid red;
				margin-right: 24rpx;
			}
			.content {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				justify-content: space-between;
				&.justify-content-center {
					justify-content: center;
				}
				text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
					text-align: center;
				}
				.tap {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 8rpx;
					padding-right: 8rpx;
					height: 38rpx;
					background: linear-gradient(272deg, #ff6d0c 0%, #fc553f 50%, #ff6d0c 100%);
					border-radius: 60rpx 60rpx 60rpx 60rpx;
					&.tap-admin {
						background: linear-gradient( 272deg, #EFC99E 0%, #CA9667 50%, #C99566 54%, #EFC99E 100%);;
					}
					text {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #ffffff;
						text-align: center;
					}
				}
			}
		}
		.col2 {
			width: 20%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			image {
				width: 32rpx;
				height: 32rpx;
				// border: 1rpx solid red;
				border-radius: 50%;
			}
		}
	}
	.btn {
		position: absolute;
		bottom: 30rpx;
		margin-top: 46rpx;
		width: 488rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
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
</style>
