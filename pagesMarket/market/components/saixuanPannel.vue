<template>
<view class="saixuan_layout">
	<scroll-view scroll-y style="height: 1200rpx;background: background: #F3F2F6;">
	<view class="title">
		<text class="title-text">筛选</text>
		<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" style="{opacity: 0.4;}"></image>
	</view>
	<view class="tabs" v-for="(item,index) in data" :key="index">
		<view class="top">
			<text>{{item.title}}</text>
		</view>
		<view class="bottom">
			<view class="card" v-for="(item1,index) in item.value" :key="index">
				<text>{{item1}}</text>
			</view>
		</view>
	</view>
	<view class="xinghao-title">
		<text>型号选择</text>
	</view>
	<!-- tabs -->
	<view class="saixuan-tabs">
		<uv-tabs
			:list="tabsData"
			lineColor="#EB4636" 
			lineWidth="30"
			lineHeight="6"
			:fontSize="32"
			:activeStyle="{ color: '#303133', fontWeight: 'bold' }"
			@change="uvTabs1Change"
			:current="activeTab1Index"
			class="myTabs"
		></uv-tabs>
	</view>
	<!-- main -->
	<view class="main">
		<view class="main-l">
			<scroll-view class="scroll-l" scroll-y :style="{ height: 800 + 'rpx' }">
				<view
					v-for="(item, index) in brands"
					:key="index"
					class="main-l-card"
					:style="{ background: index === activeCard ? 'linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)' : '#ffffff' }"
					@click="changeCardColor(index)"
				>
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
		<view class="main-r">
			<view class="main-r-tabs">
				<uv-tabs
					:list="list"
					lineWidth="0"
					lineHeight="0"
					:fontSize="24"
					:activeStyle="{ backgroundColor: '#FFEEEC', color: '#ED5446', fontWeight: 'bold', backGround: '#FFEEEC', borderRadius: '4rpx 4rpx 4rpx 4rpx' }"
					:inactiveStyle="{ backgroundColor: '#F2F3F6', borderRadius: '4rpx 4rpx 4rpx 4rpx' }"
					@change="uvTabsChange2"
					:current="activeTab2Index"
				></uv-tabs>
			</view>
	
			<view class="scroll-content">
				<scroll-view @scroll="onScroll" scroll-y scroll-with-animation :scroll-into-view="scrollInto" class="scroll-main-r" :style="{ height: 700 + 'rpx' }">
					<view class="main-box" v-for="(item, index) in list" :key="index" :id="'box-' + index">
						<view class="box-header">
							<text>{{ item.name }}</text>
						</view>
						<view class="box-content">
							<view class="box-card" v-for="(item, index) in 5" :key="index">
								<text>iphone 15 Pro Max</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
	</scroll-view>
	<view class="select-btn">
		<view @click="cancel" class="cancel-btn">
			<text>重置</text>
		</view>
		<view @click="comfrm" class="confim-btn">
			<text>确定</text>
		</view>
	</view>
</view>
</template>
<script setup>
import { onMounted } from 'vue';
const mainRScrollHeight = ref(0);
const cardColors = ref([]);
const activeCard = ref(0);
const scrollInto = ref();
const activeTab1Index = ref(0);
const activeTab2Index = ref(0);
const data = ref([
	{title:'类别',value:[
		'求货信息','卖货信息','交流信息'
	]},
	{title:'范围',value:[
		'同城','同省','全国'
	]},
])
const brandsByTab = ref([
	{
		tabName: '手机',
		brands: ['苹果', '华为', '小米', '三星', '苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '平板',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀']
	},
	{
		tabName: '手表',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '耳机',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '笔记本',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '台式电脑',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '手机',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '平板',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '手表',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '耳机',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '笔记本',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	},
	{
		tabName: '台式电脑',
		brands: ['苹果', '华为', '小米', '三星', 'OPPO', '荣耀', 'VIVO', '一加', '魅族', '锤子', '荣耀']
	}
	// 其他标签和品牌
]);
const list = ref([
	{
		name: '苹果15系列'
	},
	{
		name: '苹果14系列'
	},
	{
		name: '苹果13系列'
	},
	{
		name: '苹果12系列'
	},
	{
		name: '苹果11系列'
	},
	{
		name: '苹果10系列'
	},
	{
		name: '苹果9系列'
	}
]);
const tabsData = computed(() => {
	return brandsByTab.value.map((item) => ({
		name: item.tabName
		// 你还可以添加任何其他需要的属性
	}));
});
const uvTabs1Change = (e) => {
	console.log('标签切换触发:', e.index);
	if (e.index !== undefined && brandsByTab.value[e.index]) {
		activeTab1Index.value = e.index;
	} else {
		console.error('标签索引错误或标签数据不存在');
	}
};
const brands = computed(() => {
	return brandsByTab.value[activeTab1Index.value].brands.map((name) => ({ name }));
});
const changeCardColor = (index) => {
	// 设置新的被点击卡片的颜色
	cardColors.value[index] = 'linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)';
	// 恢复先前被点击卡片的颜色
	if (activeCard.value !== index) {
		cardColors.value[activeCard.value] = '#ffffff';
	}
	// 更新数据属性
	cardColors.value = [...cardColors.value];
	// 更新被点击的卡片索引
	activeCard.value = index;
};
const uvTabsChange2 = (e) => {
	console.log('切换了标签:', e.index);
	if (e.index !== undefined) {
		activeTab2Index.value = e.index;
		// 更新要滚动到的元素的id
		scrollInto.value = 'box-' + e.index;
	} else {
		console.error('标签索引错误');
	}
};
const onSwiperChange = (e) => {
	console.log('Swiper 变化:', e.detail.current);
	if (e.detail.current !== undefined) {
		activeTab2Index.value = e.detail.current;
	} else {
		console.error('Swiper 索引错误');
	}
};
onMounted(() => {
  // 页面组件挂载后，模拟触发点击事件
  // simulateTabClick();

});

</script>
<style lang="scss" scoped>
.saixuan_layout{
	background: #F3F2F6;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	// border: 1rpx solid black;
	height: 1200rpx;
	padding-top: 40rpx;
	width: 750rpx;
	.xinghao-title{
		margin-top: 40rpx;
		margin-bottom: 30rpx;
		margin-left: 20rpx;
		text{
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #1F1F1F;
			text-align: left;
		}
	}
	.title{
		display: flex;
		justify-content: space-between;
		padding-left: 20rpx;
		padding-right: 20rpx;
		text{
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1F1F1F;
			text-align: left;
		}
		image{
			height: 32rpx;
			width: 32rpx;
			// border: 1rpx solid black;
		}
	}
	.tabs{
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.top{
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.bottom{
			display: grid;
			grid-template-columns: auto auto auto;
			justify-content: space-between;
			.card{
				margin-top: 20rpx;
				width: 218rpx;
				height: 72rpx;
				background: #F9F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
		}
	}
	.saixuan-tabs {
		// border: 1rpx solid black;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		.myTabs{
			// box-sizing: border-box;
			// ::v-deep .uv-tabs__wrapper__nav__line.data-v-fd5fcf14{
			// 	background: blue;
			// 	// transform: translate(20px);
			// }
		}
	}
	.main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.main-l {
			height: 980rpx;
			width: 144rpx;
			// border: 2rpx solid red;
			background: #ffffff;
			border-radius: 0rpx 20rpx 20rpx 0rpx;
			display: flex;
			flex-direction: column;
			justify-items: center;
			align-items: center;
			.main-l-card {
				width: 144rpx;
				height: 96rpx;
				display: flex;
				align-items: center;
				border-radius: 0rpx 20rpx 20rpx 0rpx;
				justify-content: center;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
				}
			}
		}
	
		.main-r {
			box-sizing: border-box;
			width: 592rpx;
			height: 980rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: column;
			.main-r-tabs {
				// margin-left: 30rpx;
				// border: 1rpx solid red;
			}
			.scroll-content {
				// border: 1rpx solid blue;
				height: 100%;
				display: flex;
				flex-direction: column;
				.main-box {
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					margin-right: 30rpx;
					margin-top: 20rpx;
					margin-bottom: 20rpx;
					.box-header {
						text {
							height: 36rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 550;
							font-size: 26rpx;
							color: #1f1f1f;
						}
					}
					.box-content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						.box-card {
							margin-top: 16rpx;
							width: 258rpx;
							height: 64rpx;
							background: #f9f9f9;
							border-radius: 10rpx 10rpx 10rpx 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							text {
								height: 34rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #1f1f1f;
							}
						}
					}
				}
			}
		}
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
		.cancel-btn {
			width: 232rpx;
			height: 96rpx;
			background: #f2f3f6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 14rpx;
			margin-bottom: 62rpx;
			text {
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
			}
		}
		.confim-btn {
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 62rpx;
			text {
				width: 60rpx;
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #ffffff;
			}
		}
	}

}
</style>