<template>
	<!-- 普通订单 -->
	<view class="card" v-for="(item,index) in props.orderList" :key="index">
		<view class="top"  >
			<view class="left">
				<text class="text-1">订单号:  </text>
				<text class="text-2">{{item.ordernumber}}</text>
				<image class="right-image" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
			</view>
			<view class="right">
				<text>{{tabsData[activeTab1Index].name}}</text>
			</view>
		</view>
		<view class="content" v-for="(item1,index) in item.goodsinfos" :key="index">
			<view class="left">
				<van-image width="95" height="95" fit="fill" radius="18rpx" :src="item1.goodsinfos.cover">
				  <template v-slot:error>加载失败</template>
				  <van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
			</view>
			<view class="right" style="height: 190rpx">
				<view class="top">
					<view class="top-tap" v-if="item1.goodsinfos.finenessname">
						<text class="top-tap-text">{{item1.goodsinfos.finenessname}}</text>
					</view>
					<view style="{clear:both}"/>
					<text class="top-text">{{item1.goodsinfos.name}}</text>
				</view>
				<view class="imei">
					<text>IMEI：{{item1.goodsinfos.ch}}</text>
					<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
				</view>
				<view class="bottom" style="display: flex;justify-content: space-between; align-items: center">
					<view style="display: flex; align-items: center;">
						<text class="text-1">批发价</text>
						<text class="text-2">￥</text>
						<text class="text-3">{{item1.goodsinfos.price}}</text>
						<van-tag style="margin-left: 10rpx;"  size="mini" plain text-color="#EB4636">{{expressText.find(express=>express.id === item.expressid).text}}</van-tag>
					</view>
					<!-- <uni-icons color="#E6432E" type="checkbox-filled" size="32" @click="toggleSelectItem(item1)"></uni-icons> -->
					<uni-icons v-if="!selectedItems.includes(item1)" color="#D2CFCA" type="circle" size="32" @click="toggleSelectItem(item1)"></uni-icons>
					<uni-icons v-if="selectedItems.includes(item1)"  color="#E6432E" type="checkbox-filled" size="32" @click="toggleSelectItem(item1)"></uni-icons>
					
				
				</view>
			</view>
		</view>
		<view class="btns" v-if="true">
			 <view class="btn" v-for="(btn, btnIndex) in getBtns('custom',tabsData[activeTab1Index].lx)" :key="btnIndex" @click="handleBtnClick(btn,item)" :class="btnClass(btn)">
				 <text>{{ btn }}</text>
			 </view>
		</view>
	</view>
	
	
</template>

<script>
const props = defineProps({
	orderList: {
		type: Array,
		required: true
	}
});

const isAllSelected = ref(true)
const selectedItems = ref([])
const toggleSelectAll = ()=>{
	if (isAllSelected.value) {
		selectedItems.value = []; 
	} else {
		selectedItems = orderList.value.flatMap(order => order.goodsinfos);
	}
}
const toggleSelectItem = (item)=>{
	const index = selectedItems.value.indexOf(item);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item);
	}
}

</script>

<style>
</style>