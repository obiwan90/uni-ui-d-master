<template>
	<view class="qualitySaixuan-layout">
		<scroll-view scroll-y style="height: 1000rpx;background: #FFFFFF;">
			<view class="title">
				<text class="title-text">筛选</text>
				<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" style="{opacity: 0.4;}"  @click="$emit('close')"></image>
			</view>
			
			<!-- 时间 -->
			<view class="time">
				<view class="title">
					<text>选择时间</text>
				</view>
				<view class="content">
					<view class="frist">
						<view class="card">
							<picker
							@change="onTimeChange1" 
							mode="date" 
							:value="pickerStartValue">
								<text>{{pickerStartValue}}</text>
							</picker>
							
						</view>
					</view>
					<view class="mid">
						
					</view>
					<view class="last">
						<view class="card">
							<picker
							@change="onTimeChange2" 
							mode="date" 
							:value="pickerLastValue">
								<text>{{pickerLastValue}}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			 <view class="card-tab" v-for="(item,index) in computeData" :key="index">
				 <!-- {{computeData}} -->
				 <uni-collapse  ref="collapseRef">
					 <uni-collapse-item :open="true" titleBorder="none" :border="false">
						<template v-slot:title>
							 <uni-list :border="false">
								 <uni-list-item>
									 <template v-slot:header>
										 <text class="collapse-title">{{item.name}}</text>
									 </template>
								 </uni-list-item>
							 </uni-list>
						</template>
						
						<view class="content">
						   <view class="card" v-for="(item1,index1) in item.item" :key="index1" @click="selectCard(index, index1)" :class="{ 'selected': selectedIndices[index] === index1 }" >
							  <text v-if="item.name==='采购员工'">{{item1.username}}</text>
							  <text v-else>{{item1.name}}</text>
						   </view>
						</view>
					 </uni-collapse-item>
				 </uni-collapse>
			</view>
		</scroll-view>
	
		<view class="select-btn">
			<button @click="cancel" class="cancel-btn button-animation">
				<text style="
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: center;
					">重置</text>
			</button>
			<button @click="comfrm" class="confim-btn button-animation">
				<text style="
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
					">确定</text>
			</button>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    cgyglist: {
        type: Array,
		default: []
    },
	gnjcarrays: {
		type: Array,
		default: []
	},
	splrarrays: {
		type: Array,
		default: []
	},
	wxjcarrays: {
		type: Array,
		default: []
	},
});
const selectedIndices = ref({});
const collapse = ref(null)
const value = ref(['分类','品牌'])
const isOpen = ref(false)
const colorFilter = ref('');
const emit = defineEmits(['close']);
const cancel = () => {
	// emit('close');
	selectedIndices.value = {}
};
const comfrm = () => {
	// emit('close');
};
const data = ref([
	{
		name:'采购员工',
		item:[
		]
	},
	{
		name:'维修检测',
		item:[
		]
	},
	{
		name:'功能检测',
		item:[	
		]
	},
	{
		name:'商品录入',
		item:[
		]
	},
]);
const computeData = computed(()=>{
	data.value[0].item = props.cgyglist;
	data.value[1].item = props.wxjcarrays;
	data.value[2].item = props.gnjcarrays;
	data.value[3].item = props.splrarrays;
	console.log('pannel data:',data.value);
	return data.value;
})

const filteredColors = computed(() => {
	console.log('我在赛选');
	if (!colorFilter.value) {
		return data.value.find((item) => item.name === '颜色').item;
	}
	const filter = colorFilter.value.toLowerCase();
	const dataFilter = data.value.find((item) => item.name === '颜色').item.filter((color) => color.toLowerCase().includes(filter));
	console.log(dataFilter);
	return dataFilter.value;
});
const handleColorInput = (event) => {
    colorFilter.value = event.target.value.trim(); 
};
const collapseRef = ref(null);
const handleDataRendered = () => {
	nextTick(() => {
		collapseRef.value.resize();
	});
};
const pickerStartValue = ref('开始时间')
const pickerLastValue = ref('结束时间')
const onTimeChange1 = (e)=>{
	console.log(e);
	pickerStartValue.value = e.detail.value
}
const onTimeChange2 = (e)=>{
	console.log(e);
	pickerLastValue.value = e.detail.value
}

const selectCard = (parentIndex, childIndex) => {
	selectedIndices.value[parentIndex] = childIndex;
};
</script>

<style lang="scss" scoped>

.qualitySaixuan-layout {
	height: 1200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-top: 40rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	.card-tab {
		// border: 1rpx solid red;
		display: flex;
		flex-direction: column;
		margin-top: 48rpx;
		.collapse-title{
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
			}
		}
		.content{
			display: grid;
			grid-template-columns: 33.33% 33.33% 33.33%;
			row-gap: 18rpx;
			column-gap: 9rpx;
			.card {
				width: 218rpx;
				height: 64rpx;
				background: #f9f9f9;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
				}
			}
			.selected{
				animation: selectedAnimation 0.3s ease;
				background: #FFEEEC;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #E6432E;
					text-align: center;
				}
			}
		}
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18rpx;
		
		.title-text{
			width: 72rpx;
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1f1f1f;
		}
		image{
			height: 32rpx;
			width: 32rpx;
			// border: 1rpx solid red;
		}
		
		
	}
	.time{
		margin-top: 40rpx;
		width: 100%;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.frist{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
				}
			}
			.mid{
				width: 30rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}
			.last{
				width: 300rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				border: 2rpx solid #CBCBCB;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					width: 112rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: center;
					opacity: 0.4;
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
		
		}
		/* 定义按钮通用动画效果 */
		.button-animation {
			transition: transform 0.2s ease, box-shadow 0.2s ease !important;
		}
		
		/* 按钮被点击时的动画效果 */
		.button-animation:active {
			transform: translateY(1px) !important; /* 向下移动1像素 */
			box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2) !important; /* 添加阴影 */
		}
	}

}


</style>
