<template>
	<view class="inventoryManagerSaixuan-layout">
		<scroll-view scroll-y style="height: 1000rpx;background: #FFFFFF;">
		<view class="title">
			<text class="title-text">筛选</text>
			<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" style="{opacity: 0.4;}" @click="$emit('close')"></image>
		</view>
		
		 <view class="card-tab" v-for="(item,index) in data" :key="index">
			 <uni-collapse  ref="collapseRef">
				 <uni-collapse-item :open="(item.name==='内存'||item.name==='颜色')?false:true" titleBorder="none" :border="false">
					<template v-slot:title>
						 <uni-list :border="false">
							 <uni-list-item>
								 <template v-slot:header>
									 <text class="collapse-title">{{item.name}}</text>
								 </template>
							  
							 </uni-list-item>
						 </uni-list>
					 </template>
					 <view v-if="item.name==='价格'" class="price-card">
						<view class="select-price-view">
							<view class="select-price-view-l">
								<input class="put-text" type="number" placeholder="最低价">
							</view>
							<view class="select-price-view-m"></view>
							<view class="select-price-view-r">
								<input class="put-text" type="number" placeholder="最高价">
							</view>
						</view>
					 </view>
					<view class="content">
						<view style="width: 690rpx;display: flex;justify-content: space-between;align-items: center;" v-if="item.name==='上架时间'||item.name === '售出时间'">
							<view style="width: 300rpx;
									height: 64rpx;
									background: #FFFFFF;
									border-radius: 10rpx 10rpx 10rpx 10rpx;
									border: 2rpx solid #CBCBCB;display: flex;justify-content: center;align-items: center;">
								
								<picker
								@change="(e)=>onTimeChange1(e,item.name)" 
								mode="date" 
								:value="item.name === '售出时间'?sellStartValue:listingStartValue">
									<text class="text-10">{{item.name === '售出时间'?sellStartValue:listingStartValue}}</text>
								</picker>
								
							</view>
							<view style="width: 30rpx;
								height: 2rpx;
								background: #EEEEEE;
								border-radius: 0rpx 0rpx 0rpx 0rpx;"/>
							<view style="width: 300rpx;
									height: 64rpx;
									background: #FFFFFF;
									border-radius: 10rpx 10rpx 10rpx 10rpx;
									border: 2rpx solid #CBCBCB;display: flex;justify-content: center;align-items: center;">
								
								<picker
								@change="(e)=>onTimeChange2(e,item.name)" 
								mode="date" 
								:value="item.name === '售出时间'?sellLastValue:listingLastValue">
									<text class="text-10">{{item.name === '售出时间'?sellLastValue:listingLastValue}}</text>
								</picker>
								
							</view>
						</view>
						
						<view class="card-search" v-if="item.name === '颜色'">
							<image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
							<input class="put-text" placeholder="输入颜色" type="text" v-model="colorFilter"/>
						</view>
						
						<view v-if="item.name === '颜色'" class="card" v-for="(color, index1) in filteredColors" :key="index1" @click="selectCard(index, index1)" :class="{ 'selected': selectedIndices[index] === index1 }">
							<text>{{ color }}</text>
						</view>
						<view v-if="item.name==='型号'" style="background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);" class="card">
							<text class="text-11">选择型号</text>
						</view>
					   <view v-if="item.name !== '颜色'&&item.name !== '售出时间'&&item.name!=='上架时间'&&item.name!=='型号'" class="card" v-for="(item1,index1) in item.item" :key="index1"  @click="selectCard(index, index1)" :class="{ 'selected': selectedIndices[index] === index1 }">
						  <text>{{item1}}</text>
					   </view>
					</view>
				 </uni-collapse-item>
			 </uni-collapse>
		</view>
		</scroll-view>
		<view style="height: 202rpx;">
			
		</view>
		<view class="select-btn">
			<view @click="cancel" class="cancel-btn button-animation">
				<text>重置</text>
			</view>
			<view @click="comfrm" class="confim-btn button-animation">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const selectedIndices = ref({});
const collapse = ref(null)
const value = ref(['分类','品牌'])
const isOpen = ref(false)
const colorFilter = ref('');
const emit = defineEmits(['close']);
const cancel = () => {
	emit('close');
};
const comfrm = () => {
	emit('close');
};
const data = ref([{
	name:'其他',
	id:'1',
	item:[
		'只看特价','只看折叠'
	]
},
{
	name:'分类',
	id:'2',
	item:[
		'手机','平板','手表','耳机','笔记本','台式电脑'
	]
},
{
	name:'品牌',
	id:'3',
	item:[
		'苹果','华为','小米','OPPO','VIVO','荣耀'
	]
},
{
	name:'系统',
	id:'4',
	item:[
		'苹果','安卓'
	]
},
{
	name:'型号',
	id:'5',
	item:[
		'选择型号',
	]
},
{
	name:'网络版本',
	id:'6',
	item:[	
		'WIFI版','5G','4G'
	]
},
{
	name:'成色',
	id:'7',
	item:[
		'全新','99新','95新','9成新','8成新','7成新'
	]
},
{
	name:'内存',
	id:'8',
	item:[
		'16G','32G','64G','128G','256G','512G'
	]
},
{
	name:'颜色',
	id:'9',
	item:[
		'紫色','蓝色','黄色','粉色','金色','紫色','蓝色','黄色','粉色',
		'金色','紫色','蓝色','黄色','粉色','金色','紫色','蓝色','黄色','粉色','金色','紫色','蓝色','黄色','粉色','金色',
		'金色','紫色','蓝色','黄色','粉色','金色','紫色','蓝色','黄色','粉色','金色','紫色','蓝色','黄色','粉色','金色'
	]
},
{
	name:'价格',
	id:'10',
	item:[
		'0-1000','1001-2000','2001-3000','4001-4000','4001-5000','5000以上'
	]
},
{
	name:'上架时间',
	id:'11',
	item:[
		'开始时间','结束时间'
	]
},
// {
// 	name:'资检员工',
// 	id:'12',
// 	item:[
// 		'员工','员工','员工']
// },
{
	name:'售出时间',
	id:'13',
	item:[
		'开始时间','结束时间']
}]);
const filteredColors = computed(() => {
	console.log('我在赛选');
	if (!colorFilter.value) {
		return data.value.find((item) => item.name === '颜色').item;
	}
	const filter = colorFilter.value.toLowerCase();
	const dataFilter = data.value.find((item) => item.name === '颜色').item.filter((color) => color.toLowerCase().includes(filter));
	console.log(dataFilter);
	return dataFilter;
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

const listingStartValue = ref('开始时间')
const listingLastValue = ref('结束时间')
const sellStartValue = ref('开始时间')
const sellLastValue = ref('结束时间')

const onTimeChange1 = (e,text)=>{
	console.log(e);
	if(text==='上架时间'){
		listingStartValue.value = e.detail.value
	}else{
		sellStartValue.value = e.detail.value
	}
}

const onTimeChange2 = (e,text)=>{
	console.log(e);
	if(text==='上架时间'){
		listingLastValue.value = e.detail.value
	}else{
		sellLastValue.value = e.detail.value
	}
}
const selectCard = (parentIndex, childIndex) => {
	selectedIndices.value[parentIndex] = childIndex;
};

</script>

<style lang="scss" scoped>
.inventoryManagerSaixuan-layout {
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-top: 40rpx;
	justify-content: space-between;
	height: 1200rpx;
	.card-tab {
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
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: 33.3333% 33.3333% 33.3333%;
			row-gap: 18rpx;
			column-gap: 9rpx;
			.card-search{
			width: 218rpx;
			height: 64rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0,0,0,0.1);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.put-text{
				height: 36rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 26rpx;
				color: #1F1F1F;
				opacity: 0.6;
				// text-align: center;
			}
			
			image{
				height: 40rpx;
				width: 40rpx;
				margin-right: 10rpx;
				margin-left: 20rpx;
				opacity: 0.3;
			}
		}
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
		
		
		
		.price-card {
			// border: 2rpx solid red;
			display: flex;
			// margin-top: 60rpx;
			flex-direction: column;
			padding: 0 30rpx;
			.price-card-title {
				width: 56rpx;
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1f1f1f;
				margin-bottom: 20rpx;
			}
			.select-price-view {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 18rpx;
				.select-price-view-l {
					width: 300rpx;
					height: 64rpx;
					background: #ffffff;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					border: 2rpx solid #eeeeee;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: nowrap;
					
					.put-text {
						// width: 60rpx;
						height: 28rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #a6a6a6;
						opacity: 0.4;
						text-align: center;
					}
				}
				.select-price-view-m {
					width: 30rpx;
					height: 2rpx;
					background: #eeeeee;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}
				.select-price-view-r {
					width: 300rpx;
					height: 64rpx;
					background: #ffffff;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					border: 2rpx solid #eeeeee;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: nowrap;
					.put-text {
						// width: 60rpx;
						height: 28rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #a6a6a6;
						opacity: 0.4;
						text-align: center;
					}
				}
			}
		}
		
		
		
		
		.card-tab-title {
			text-align: left;
			height: 40rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #1f1f1f;
			margin-bottom: 20rpx;
		}
	
		.card-content {
			// border: 2rpx solid red;
			display: grid;
			grid-template-columns: 33.3333% 33.3333% 33.3333%;
			row-gap: 18rpx;
			column-gap: 9rpx;
		}
	
		
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
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
.text-10{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1F1F1F;
	text-align: center;
	font-style: normal;
	text-transform: none;
	opacity: 0.4;
}
.text-11{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #669CFD !important;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
