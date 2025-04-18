<template>
	<view class="warehouseManagement-layout">
		<custom-header :backgroundColor="'#FFFFFF'">
			<template #name>仓库管理</template>
			<template #fill>仓库管理</template>
		</custom-header>
		
		<!-- <scroll-view style="height: 1250rpx;width: 100%;" scroll-y> -->
		<view style="height: 1250rpx;width: 100%;">
			<z-paging ref="paging"  :default-page-size = "20" show-refresher-update-time  :fixed="false" v-model="dataList" @query="queryList">
			<view v-for="(item, index) in dataList" class="collapseCard" :key="index">
				<van-swipe-cell right-width="147">
					<view
						style="
							box-sizing: border-box;
							padding-right: 20rpx;
							width: 100%;
							height: 142rpx;
							background: #ffffff;
							border-radius: 20rpx 0rpx 0rpx 20rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;">
						<view style="display: flex; align-items: center; gap: 10rpx">
							<image style="height: 80rpx; width: 80rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/icon_cangku@3x.png" mode="aspectFill"></image>
							<view style="box-sizing: border-box; height: 80rpx; display: flex; flex-direction: column; justify-content: space-between">
								<view style="display: flex; align-items: center; gap: 12rpx">
									<text class="text-1">{{item.name}}</text>
									<view
										v-if="item.sxck==='1'"
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
										<text class="text-4">首选</text>
									</view>
								</view>
								<view style="display: flex;align-items: center;gap: 30rpx;">
									<text class="text-2">仓库数量：{{item.num}}台</text>
									<text class="text-2">上架中：{{item.num1}}台</text>
								</view>
								
							</view>
						</view>

						<view v-if="item.hide === '1'" style="display: flex; align-items: center; gap: 10rpx; justify-content: flex-end">
							<image style="height: 28rpx; width: 28rpx; border-radius: 50%" src="https://www.xzxskj.com/xcximg/icon_jinyong@3x.png" mode="aspectFill"></image>
							<text class="text-3">已禁用</text>
						</view>
					</view>
					<view slot="right">
						<view style="width: 294rpx; height: 142rpx; position: relative">
							<view
								@click="updateWarehouse(item,'3')"
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
							<view
								@click="goPage(item)"
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
							<view
								@click="updateWarehouse(item,'')"
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
									{{item.hide === '0'?'禁用':'启用'}}
								</text>
							</view>
						</view>
					</view>
				</van-swipe-cell>
			</view>
			</z-paging>
		</view>
		
		
		<view  class="select-btn">
			<view class="confim-btn button-animation" @click="confirm">
				<text>新建仓库</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiWarehouseList,apiWarehouseUpdate } from '@/api/warehouseManagement/warehouseManagement.js'
const dataList = ref([])
const paging = ref(null)
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	const data = await apiWarehouseListAc()
	paging.value.complete(data);
};
const warehouseData = ref([])
const confirm = () => {
	uni.navigateTo({
		url:'/pagesWarehouseManagement/warehouseManagement/new'
	})
}

const cklist = ref([])
const apiWarehouseListAc =async ()=>{
	const res = await apiWarehouseList()
	if(res.code === 200){
		cklist.value = [...res.lists]
		console.log("cklist：",cklist.value)
	}
	return cklist.value
}
const goPage = (item)=>{
	const ckItem = JSON.stringify(item) 
	uni.navigateTo({
		url:'/pagesWarehouseManagement/warehouseManagement/new?ckItem='+ckItem
	})
}
const updateWarehouse = async (item,lx)=>{
	if(lx===''){
		lx = item.hide === '0'?'1':'2'
	}
	await apiWarehouseUpdateAc(item.id,lx)
}
const apiWarehouseUpdateAc = async (id,lx)=>{
	const data = {
		id:id,
		lx:lx//1禁用2启用 3删除
	}
	const res = await apiWarehouseUpdate(data)
	if(res.code === 200){
		uni.showToast({
			icon:'none',
			title:'操作成功',
			duration:1000
		})
		paging.value.reload(true)
	}
}
onShow(()=>{
	paging.value.reload(true)
})
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.warehouseManagement-layout{
	min-height: 100vh;
	background: #F3F2F6;
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
	padding-top: 24rpx;
	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}
.collapseCard {
	// border: 1rpx solid red;
	// margin-left: 20rpx;
	margin-top: 20rpx;
	// width: 710rpx;
	background: #ffffff;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
	// padding-left: 20rpx;
	// padding-right: 10rpx;
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
</style>