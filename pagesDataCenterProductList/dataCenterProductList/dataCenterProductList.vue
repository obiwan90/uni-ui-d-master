<template>
	<view class="dataCenterProductList-layout">
		<!-- header -->
		<custom-header :backgroundColor="'#FFFFFF'">
			<template #name>商品列表</template>
			<template #fill>快速批发</template>
		</custom-header>

		<view class="saixuan" v-if="!showInventory">
			<view class="top">
				<view class="card" @click="selectCard(index)" :class="{ selected: selectedIndex === index }" v-for="(item, index) in timeCardData" :key="index">
					<text>{{ item }}</text>
				</view>
			</view>
		</view>

		<van-dropdown-menu z-index="20" class="dropdownMenu" style="background: #ffffff" active-color="#EB4636">
			<van-dropdown-item :value="value1" :options="option1" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange" />
			<van-dropdown-item :value="value2" :options="option2" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange" />
			<van-dropdown-item :value="value3" :options="option3" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange" />
			<van-dropdown-item :value="value4" :options="option4" popup-style="border-radius: 0 0 20rpx 20rpx;" @change="selectParamChange" />
		</van-dropdown-menu>
		<!-- 销售数据  分类数据  品牌数据  内存数据 全称数据-->
		<view  
			style=" 
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 20rpx;
				margin-top: 20rpx;
				width: 710rpx;
				background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-bottom: {{!showInventory?'20rpx':''}};
			"
		>
			<view style="box-sizing: border-box" v-if="!showInventory">
				<uv-tabs
					:list="tabsData"
					lineWidth="30"
					lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)"
					lineHeight="3"
					:fontSize="28"
					:inactiveStyle="{
						color: '#1F1F1F',
						opacity: 0.6
					}"
					:activeStyle="{ color: '#1F1F1F', fontWeight: 'bold', fontSize: 32, opacity: 1 }"
					@change="uvTabs1Change"
					:current="activeTab1Index"
				></uv-tabs>
			</view>
		</view>

		<view style="height: {{showInventory?'1070rpx':'1070rpx'}}; width: 100%">
			<z-paging ref="paging" show-refresher-update-time :fixed="false" v-model="dataList" @query="queryList">
				<!-- card -->
				<view
					v-for="(item, index) in 12"
					:key="index"
					style="
						margin-bottom: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #ffffff;
						border-radius: 20rpx;
						width: 710rpx;
						margin-left: 20rpx;
					"
				>
					<view style="display: flex; justify-content: center; align-items: center; padding: 20rpx">
						<van-image width="95" height="95" fit="widthFix" radius="18rpx" :src="'https://www.xzxskj.com'" mode="aspectFit">
							<template v-slot:error>加载失败</template>
							<van-loading slot="loading" type="spinner" size="20" vertical />
						</van-image>
						<view style="flex: 1; margin-left: 20rpx; height: 190rpx; display: flex; flex-direction: column; justify-content: space-between">
							<view style="display: flex; flex-direction: column">
								<view>
									<van-tag size="mini" color="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)">95新</van-tag>
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; line-height: 40rpx; text-align: left">
										华为Mate 60 RS 非凡大师 16GB+1TB 玄黑（全网通）
									</text>
								</view>

								<view style="display: flex; align-items: center; margin-top: 4rpx">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">
										IMEI：FA5445645156451
									</text>
									<image
										style="height: 20rpx; width: 20rpx; margin-left: 10rpx"
										src="https://www.xzxskj.com/xcximg/icon_copy@3x.png"
										mode="aspectFill"
									></image>
								</view>

								<view style="display: flex; align-items: center; margin-top: 4rpx">
									<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left; margin-right: 40rpx">
										采购：金克斯
									</text>
									<view style="display: flex; justify-content: center; align-items: center">
										<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #828282; text-align: left">仓库：总仓</text>
										<view
											style="
												margin-left: 10rpx;
												display: flex;
												justify-content: center;
												align-items: center;
												padding: 0 8rpx;
												background: #ffeeec;
												border-radius: 8rpx;
											"
										>
											<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #eb4636">10天</text>
										</view>
									</view>
								</view>
							</view>

							<view style="display: flex; align-items: center">
								<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 22rpx; color: #1f1f1f; text-align: left; vertical-align: bottom">
									批发价:
								</text>
								<text style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e; text-align: left; vertical-align: bottom">￥14120</text>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

		<!-- <floatButtom/> -->
	</view>
</template>

<script setup>
// import { floatButtom } from './components/float-buttom.vue'
const timeCardData = ref(['今日', '昨日', '本月', '上月', '时间区间']);
const selectedIndex = ref(0);
const selectCard = (index) => {
	selectedIndex.value = index;
};
const paging = ref(null);
const dataList = ref([]);
const allSelected = ref(true);
const queryList = async (pageNo, pageSize) => {
	console.log('pageNo:', pageNo);
	console.log('pageSize:', pageSize);
	paging.value.complete([]);
};
const option1 = ref([
	{ text: '全部仓库', value: 0 },
	{ text: '仓库1', value: 1 },
	{ text: '仓库2', value: 2 }
]);
const option2 = ref([
	{ text: '全部采购', value: 0 },
	{ text: '张三', value: 1 },
	{ text: '李四', value: 2 }
]);
const option3 = ref([
	{ text: '全部销售', value: 0 },
	{ text: '张三', value: 1 },
	{ text: '张三', value: 2 }
]);
const option4 = ref([
	{ text: '全部质检', value: 0 },
	{ text: '张三', value: 1 },
	{ text: '张三', value: 2 }
]);
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const tabsData = ref([{ name: '全部销售' }, { name: '线下销售' }, { name: '平台销售' }, { name: '售后退款' }]);
const activeTab1Index = ref(0);
const uvTabs1Change = (e) => {
	activeTab1Index.value = e.index;
};
const title = ref();
const showInventory = ref(false)
onLoad((option) => {
	const from = option.from
	if(from&&from==='inventory'){
		showInventory.value = true
	}
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.dataCenterProductList-layout {
	min-height: 100vh;
	background: #f3f2f6;
}
.saixuan {
	width: 750rpx;
	background: #ffffff;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.card {
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.1);
			height: 64rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
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
			&.selected {
				background: #eb4636;
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
				}
			}
		}
	}
}
.dropdownMenu {
	::v-deep .van-dropdown-menu {
		background-color: #ffffff;
		box-shadow: none;
	}
}

.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	vertical-align: bottom;
	margin-right: 10rpx;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 800;
	font-size: 32rpx;
	color: #6994f3;
	text-align: center;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
	margin-right: 10rpx;
}
.text-3 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	text-align: center;
	font-style: normal;
	text-transform: none;
	vertical-align: bottom;
	opacity: 0.6;
}
.corner {
}
</style>
