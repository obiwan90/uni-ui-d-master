<template>
	<view class="staffManager">
		<!-- header -->
		<custom-header :backgroundColor="'#ffffff'">
			<template #name>员工管理</template>
			<template #fill>客户管理</template>
		</custom-header>
		
		<scroll-view style="height: 1250rpx;width: 100%;" scroll-y>
			<view v-for="(item, index) in workerData" class="collapseCard" :key="index">
				<uni-collapse ref="collapseRef" class="collapse" @change="togglePanel(index)">
					<uni-collapse-item :open="isOpen(index)" :show-arrow="false" class="collapse" titleBorder="none" :border="false">
						<template v-slot:title>
							<uni-list :border="false">
								<uni-list-item>
									<template v-slot:header>
										<view style="display: flex; align-items: center; gap: 20rpx">
											<view class="arrow-icon" :class="{ 'arrow-down': !isOpen(index) }">
												<image style="height: 24rpx; width: 16rpx" src="https://www.xzxskj.com/xcximg/icon_xiala@3x.png" mode="aspectFill"></image>
											</view>
											<text class="text-1">{{item.name}}</text>
											<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1f1f1f;text-align: left;font-style: normal;text-transform: none;opacity: 0.6;">{{item.yglist.length}}人</text>
										</view>
									</template>
			
									<template v-slot:footer>
										<view style="display: flex; align-items: center; gap: 30rpx">
											<image style="height: 28rpx; width: 28rpx" src="https://www.xzxskj.com/xcximg/icon_bianji@3x.png" mode="aspectFill" @click.stop="goPage('/pagesAuthority/authority/authority?forEdit='+item.id)"></image>
											<image style="height: 28rpx; width: 28rpx" src="https://www.xzxskj.com/xcximg/icon_delete@3x.png" mode="aspectFill" @click.stop="deletePosition(item.id)"></image>
										</view>
									</template>
								</uni-list-item>
							</uni-list>
						</template>
			
						<view v-for="(item1, index1) in item.yglist" :key="index1" style="margin-right: 10rpx;">
							<van-swipe-cell right-width="147">
								<view
									style="
										box-sizing: border-box;
										padding-right: 20rpx;
										padding-left: 20rpx;
										margin-bottom: 20rpx;
										width: 100%;
										height: 142rpx;
										background: #f3f2f6;
										border-radius: 20rpx 0rpx 0rpx 20rpx;
										display: flex;
										align-items: center;
										justify-content: space-between;">
									<view style="display: flex; align-items: center; gap: 10rpx">
										<image style="height: 80rpx; width: 80rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/imgStaff@3x.png" mode="aspectFill"></image>
										<view style="box-sizing: border-box; height: 80rpx; display: flex; flex-direction: column; justify-content: space-between">
											<view style="display: flex; align-items: center; gap: 12rpx">
												<text class="text-1">{{item1.name}}</text>
												<view
													style="
														height: 38rpx;
														border-radius: 10rpx 10rpx 10rpx 10rpx;
														border: 2rpx solid #669cfd;
														display: flex;
														justify-content: center;
														align-items: center;
														padding-left: 16rpx;
														padding-right: 16rpx;
													"
												>
													<text class="text-4">{{item.name}}</text>
												</view>
											</view>
											<text v-if="item1.phone" class="text-2">{{item1.phone}}   <text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1f1f1f;text-align: left;font-style: normal;text-transform: none;opacity: 0.6;">入职时间:{{getRegTimeById(item1.ygid)}}</text></text>
										</view>
									</view>
									<view v-if="item1.status==='0'" style="display: flex; align-items: center; gap: 10rpx; justify-content: flex-end">
										<image style="height: 28rpx; width: 28rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/icon_jinyong@3x.png" mode="aspectFill"></image>
										<text class="text-3">已禁用</text>
									</view>
								</view>
								<view slot="right">
									<view style="width: 294rpx; height: 142rpx; position: relative">
										<view @click="handleDelete(item1.ygid)"
											style="
												border-radius: 0 20rpx 20rpx 0;
												width: 294rpx;
												height: 142rpx;
												display: flex;
												justify-content: flex-end;
												align-items: center;
												position: absolute;
												z-index: 1;
												left: 0;
												background: linear-gradient(89deg, #ff6d0c 0%, #eb4636 100%);
											"
										>
											<text
												style="
													height: 34rpx;
													font-family: PingFang SC, PingFang SC;
													font-weight: 400;
													font-size: 24rpx;
													color: #ffffff;
													text-align: center;
													font-style: normal;
													text-transform: none;
													margin-right: 26rpx;
												"
											>
												删除
											</text>
										</view>
										<view @click="goPage('/pagesStaffInfos/staffInfos/staffInfos?forEdit='+item1.ygid+'&gwid='+item.id)"
											style="
												border-radius: 0 20rpx 20rpx 0;
												width: 196rpx;
												height: 142rpx;
												display: flex;
												justify-content: flex-end;
												align-items: center;
												position: absolute;
												z-index: 2;
												left: 0;
												background: linear-gradient(89deg, #ff8a24 0%, #ff960c 100%);
											"
										>
											<text
												style="
													height: 34rpx;
													font-family: PingFang SC, PingFang SC;
													font-weight: 400;
													font-size: 24rpx;
													color: #ffffff;
													text-align: center;
													font-style: normal;
													text-transform: none;
													margin-right: 26rpx;
												"
											>
												修改
											</text>
										</view>
										<view @click="toggleDisabled(item1.ygid,item1.status)"
											style="
												border-radius: 0 20rpx 20rpx 0;
												width: 98rpx;
												height: 142rpx;
												display: flex;
												justify-content: flex-end;
												align-items: center;
												position: absolute;
												z-index: 3;
												left: 0;
												background: linear-gradient(89deg, #e8b471 0%, #ffcf4a 100%);
											"
										>
											<text
												style="
													height: 34rpx;
													font-family: PingFang SC, PingFang SC;
													font-weight: 400;
													font-size: 24rpx;
													color: #ffffff;
													text-align: center;
													font-style: normal;
													text-transform: none;
													margin-right: 26rpx;
												"
											>
												{{item1.status==='1'?'禁用':'启用'}}
											</text>
										</view>
									</view>
								</view>
							</van-swipe-cell>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</scroll-view>
		
		
		<view style="height: 202rpx;width: 100%;">
			
		</view>
		
		<view
			style="
				position: absolute;
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
				padding: 26rpx 20rpx 60rpx 20rpx;
				gap: 30rpx;
			"
		>
			<view class="button-animation" @click="goPage('/pagesAuthority/authority/authority')"
				style="
					height: 96rpx;
					background: linear-gradient(135deg, #fbd55a 0%, #ffae0c 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					width: 340rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>	
				<text class="text-5">新增岗位</text>
			</view>
			<view class="button-animation" @click="goPage('/pagesStaffInfos/staffInfos/staffInfos')"
				style="
					height: 96rpx;
					background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					width: 340rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<text class="text-5">新建员工</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiStationStaffList,apiStationStaffAction,apiStationDel } from '@/api/station/station.js'
import { usePermissionStore } from '@/stores/menuPermissionStore.js';

const permissionStore = usePermissionStore();
const workerData = ref([])

const openPanels = ref(new Set());
const togglePanel = (index) => {
	if (openPanels.value.has(index)) {
		openPanels.value.delete(index);
	} else {
		openPanels.value.add(index);
	}
};
const isOpen = (index) => {
	return openPanels.value.has(index);
};
const goPage = (path)=>{
	permissionStore.loadMenuAuthority();
	if (path.includes('/pagesAuthority/authority/authority?')) {
	   if(!permissionStore.hasMenuAuthority('updateAuthority')){
		   uni.showToast({
			title: '您没有操作权限',
			icon: 'success',
			duration: 2000
		   });
		   return
	   }
	}
	
	if (path.includes('/pagesStaffInfos/staffInfos/staffInfos')) {
	   if(!permissionStore.hasMenuAuthority('employeeUpdate')){
		   uni.showToast({
			title: '您没有操作权限',
			icon: 'success',
			duration: 2000
		   });
		   return
	   }
	}
	
	uni.navigateTo({
		url:path
	})
}
//删除 操作
const handleDelete = (ygid) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该员工吗?',
    success: (res) => {
      if (res.confirm) {
        console.log('确认删除');
		apiStationStaffActionData('/Home/Gly/ygxg?lx=3',ygid,3)
      } else if (res.cancel) {
        console.log('取消删除');
      }
    }
  });
};
//禁用与启用
const toggleDisabled = (ygid,status) => {
	uni.showModal({
	  title: '提示',
	  content: status==='1'?'确定要禁用该员工吗?':'确定启用该员工',
	  success: (res) => {
	    if (res.confirm) {
		   let lx = status==='1'?1:2
		  apiStationStaffActionData(lx===1?'/Home/Gly/ygxg?lx=1':'/Home/Gly/ygxg?lx=2',ygid,lx)
	    } else if (res.cancel) {
	    
	    }
	  }
	});
};
//删除岗位
const deletePosition = (id)=>{
	
	permissionStore.loadMenuAuthority();
	if(!permissionStore.hasMenuAuthority('deletPost')){
		uni.showToast({
			title: '您没有操作权限',
			icon: 'success',
			duration: 2000
		});
		return
	}
	uni.showModal({
	  title: '提示',
	  content: '确定要删除该岗位吗?',
	  success: (res) => {
	    if (res.confirm) {
	      // 在这里进行删除操作
	      console.log('确认删除');
		  apiStationDelData(id)
	    } else if (res.cancel) {
	      console.log('取消删除');
	    }
	  }
	});
}
const workerYgList = ref()
const getRegTimeById = (id) => {
    const user = workerYgList.value.find(item => item.id === id);
    if (user) {
        const regTime = user.regTime;
        const date = new Date(regTime * 1000);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return formattedDate;
    } else {
        return null;
    }
};
const apiStationStaffListData = async () => {
  const data ={
	  // opid:uni.getStorageSync('sessionInfo').opid
	  opid: JSON.parse(uni.getStorageSync('userInfo')).opid
  }
  const res = await apiStationStaffList(data)
  if(res.code === 200){
    workerData.value = res.lists
	workerYgList.value = res.yglist
  }
}

const apiStationStaffActionData = async (url,ygid,lx) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ygid: ygid,
		lx: lx//类型1禁用2启用3删除
	}
  const res = await apiStationStaffAction(url,data)
  console.log('StaffAction:',res);
  if(res.code === 200){
    apiStationStaffListData()
  }
}

const apiStationDelData = async (gwid) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		gwid: gwid
	}
  const res = await apiStationDel(data)
  console.log('apiStationDel:',res);
  if(res.code === 200){
    apiStationStaffListData()
  }
}


onMounted(()=>{
	apiStationStaffListData()
})
onShow(()=>{
	apiStationStaffListData()
})
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.staffManager {
	min-height: 100vh;
	background: #f3f2f6;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.arrow-icon {
	transform: rotate(90deg);
	transition: transform 0.3s;
	&.arrow-down {
		transform: rotate(0);
	}
}
.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: left;
	font-style: normal;
	text-transform: none;
	opacity: 0.6;
}
.text-3 {
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #eb4636;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.text-4 {
	height: 34rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #669cfd;
	text-align: center;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
}
.text-5 {
	height: 44rpx;
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #ffffff;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
.collapseCard {
	margin-left: 20rpx;
	margin-top: 20rpx;
	width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	// box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	padding-left: 20rpx;
	padding-right: 10rpx;
	.collapse {
		border-radius: 20rpx;
	}
	.content {
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: grid;
		justify-content: space-between;
		grid-template-columns: auto auto auto;
		.card {
			margin-bottom: 10rpx;
			width: 198rpx;
			height: 80rpx;
			background: #f9f9f9;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.card-text.clicked-text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #ffffff;
				text-align: center;
			}
			.card-text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
			}
			&.clicked {
				background: linear-gradient(90deg, #ff6d0c 0%, #eb4636 100%);
			}
		}
	}
}
</style>
