<template>
	<view class="saixuan_layout">
		<scroll-view scroll-y style="height: 1000rpx; background: #FFFFFF;">
			<view class="title">
				<text class="title-text">筛选</text>
				<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" style="opacity: 0.4;" @click="$emit('closePopup')"></image>
			</view>

			<view class="card-tab" v-for="(item, index) in filterList" :key="item.id">
				<uni-collapse ref="collapseRef"  @change="(isOpen) => collapseChange(isOpen, item)">
					<uni-collapse-item :show-arrow="false" style="border-radius: 20rpx;margin-top: -20rpx;" :open="false"  titleBorder="none" :border="false">
						<template v-slot:title>
							<uni-list :border="false">
								<uni-list-item>
									<template v-slot:header>
										<view class="collapse-title" style="padding: 24rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
											<text class="co-header">{{ item.name }}</text>
											<text class="arrow" 
												v-if="((item.name === '颜色' && filteredColors.length > 5) || (item.name !== '颜色' && item.items.length > 6))" :class="{ 'arrow-open': item.pannelShow}">▼
											</text>
										</view>
										<view v-if="item.name === '价格'" class="price-card">
											<view class="select-price-view">
												<view class="select-price-view-l">
													<input class="put-text" v-model="startPrice" type="number" placeholder="最低价">
												</view>
												<view class="select-price-view-m"></view>
												<view class="select-price-view-r">
													<input class="put-text" v-model="lastPrice" type="number" placeholder="最高价">
												</view>
											</view>
										</view>
										<view class="content" style="width: 700rpx;padding-left: 0rpx;grid-template-columns: 33.33% 33.33% 33.33%;justify-content: space-between;padding-right: 0rpx;">
											<view class="card-search" v-if="item.name === '颜色'">
												<image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
												<input class="put-text" placeholder="输入颜色" type="text" v-model="colorFilter" @click.stop @input.stop />

											</view>
											<view v-if="item.name === '颜色'" class="card" v-for="(color, index) in filteredColors.slice(0,5)" :key="index" @click.stop="toggleSelection(item, color)">
												<text :class="{ 'selected-text': color.selected }">{{ color.name }}</text>
											</view>
											<view v-else class="card" v-for="(item1, index) in item.items.slice(0,6)" :key="index" @click.stop="toggleSelection(item, item1)">
												<text :class="{ 'selected-text': item1.selected }">{{ item1.name }}</text>
											</view>
										</view>
									</template>
								</uni-list-item>
							</uni-list>
						</template>
						<view class="content">
							<view v-if="item.name === '颜色'&&filteredColors.length>6" class="card" v-for="(color, index) in filteredColors.slice(5)" :key="index+5" @click="toggleSelection(item, color)">
								<text :class="{ 'selected-text': color.selected }">{{ color.name }}</text>
							</view>
							<view v-else-if="item.items.length>6" class="card" v-for="(item1, index) in item.items.slice(6)" :key="index+6" @click="toggleSelection(item, item1)">
								<text :class="{ 'selected-text': item1.selected }">{{ item1.name }}</text>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>

		</scroll-view>
		<view style="height: 210rpx;"></view>
		<view class="select-btn">
			<view @click="resetFilters" class="cancel-btn">
				<text>重置</text>
			</view>
			<view @click="confirm" class="confim-btn">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const emit = defineEmits(['reLoad', 'closePopup']);
const selectedStates = ref({});
const props = defineProps({
  ids: {
    type: String,
    default: ''
  },
  filterList:{
	type: Array,
	default: []
  },
  colorItems:{
	type: Array,
	default: []  
  }
  
  
});

const startPrice = ref('')
const lastPrice = ref('')

const collapse = ref(null);
const colorFilter = ref('');
const selectedText = ref([]);

const resetSelection = () => {
  props.filterList.forEach(category => {
    category.items.forEach(item => {
      item.selected = false;
    });
  });
  selectedText.value = [];
};

const toggleSelection = (category, item) => {
  item.selected = !item.selected;
  if (category.name === '颜色') {
    const originalItem = category.items.find(i => i.id === item.id);
    if (originalItem) {
      originalItem.selected = item.selected;
    }
  }
  updateSelectedText();
};


const updateSelectedText = () => {
  selectedText.value = props.filterList.flatMap(category => {
    if (category.name === '颜色') {
      return filteredColors.value
        .filter(color => color.selected)
        .map(color => ({ id: color.id, name: color.name }));
    } else {
      return category.items
        .filter(item => item.selected)
        .map(item => ({ id: item.id, name: item.name }));
    }
  });

  console.log('selectedText.value', selectedText.value);
};


const confirm = () => {
	if ((startPrice.value && !lastPrice.value) || (!startPrice.value && lastPrice.value)) {
      uni.showToast({
        title: '请输入完整的价格范围',
        icon: 'none',
        duration: 500
      });
      return;
   }
	
  const selectedItems = {
    brandid: '',
    classid: '',
    colourid: '',
    deliverys: '',
    finenessid: '',
    gd: '',
    memoryid: '',
    newarrivals: '',
    price: '',
    pricesdesc: '',
    sftj: '',
    sfzd: '',
    start: '',
    systemid: '',
    versionid: ''
  };

  props.filterList.forEach(category => {
	  console.log('category',category)
    const selectedIds = category.items.filter(item => item.selected).map(item => item.id).join(',');
    const selectedNames = category.items.filter(item => item.selected).map(item => item.name).join(',');

    switch (category.name) {
      case '分类':
        selectedItems.classid = selectedIds;
        break;
      case '品牌':
        selectedItems.brandid = selectedIds;
        break;
      case '系统':
        selectedItems.systemid = selectedIds;
        break;
      case '价格':
        selectedItems.price = startPrice.value?(startPrice.value+'-'+lastPrice.value):selectedNames;
        break;
      case '版本':
        selectedItems.versionid = selectedIds;
        break;
      case '成色':
        selectedItems.finenessid = selectedIds;
        break;
      case '内存':
        selectedItems.memoryid = selectedIds;
        break;
      case '颜色':
        selectedItems.colourid = selectedIds;
        break;
      case '资检渠道':
        selectedItems.gd = selectedIds;
        break;
      case '其他':
        if (category.items.some(item => item.id === '1' && item.selected)) {
          selectedItems.sftj = '1';
        }
        if (category.items.some(item => item.id === '2' && item.selected)) {
          selectedItems.sfzd = '1';
        }
        break;
    }
  });

  console.log('Selected Items:', selectedItems);
  emit('reLoad', selectedItems);
  emit('closePopup');
};

const collapseChange = (isOpen, item) => {
  item.pannelShow = isOpen.length > 0;
};

const resetFilters = () => {
  startPrice.value = '';
  lastPrice.value = '';
  
  props.filterList.forEach(category => {
    category.items.forEach(item => {
      item.selected = false; 
    });
  });

  props.colorItems.forEach(color => {
    color.selected = false; 
  });

  colorFilter.value = '';
  selectedText.value = []; 
  console.log('筛选条件已重置。');
};


const filteredColors = computed(() => {
	console.log('filterList',props.filterList)
  if (!colorFilter.value) {
    return props.colorItems;
  }
  return props.colorItems.filter(color => color.name.includes(props.colorFilter));
});

</script>


<style lang="scss" scoped>
	view{
		box-sizing: border-box;
	}
.saixuan_layout {
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	padding-top: 40rpx;
	justify-content: space-between;

	.card-tab {
		display: flex;
		flex-direction: column;
		margin-top: 48rpx;
		.collapse-title {
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #1F1F1F;
			}
		}
		.content {
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: 33.3333% 33.3333% 33.3333%;
			row-gap: 18rpx;
			column-gap: 9rpx;

			.card-search {
				width: 218rpx;
				height: 64rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.1);
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.put-text {
					height: 36rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #1F1F1F;
					// opacity: 0.6;
				}
				image {
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
				cursor: pointer;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1f1f1f;
				}
				// &:hover {
				// 	background: #e0e0e0;
				// }
				.selected-text {
					font-weight: bold;
					color: #FF5221;
				}
			}
		}

		.price-card {
			display: flex;
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
				.select-price-view-l,
				.select-price-view-r {
					width: 300rpx;
					height: 64rpx;
					background: #ffffff;
					border-radius: 10rpx;
					border: 2rpx solid #eeeeee;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: nowrap;
					.put-text {
						height: 28rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						// opacity: 0.4;
						text-align: center;
					}
				}
				.select-price-view-m {
					width: 30rpx;
					height: 2rpx;
					background: #eeeeee;
				}
			}
		}
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		.title-text {
			width: 72rpx;
			height: 50rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 36rpx;
			color: #1f1f1f;
		}
		image {
			height: 32rpx;
			width: 32rpx;
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
			border-radius: 20rpx;
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
			border-radius: 20rpx;
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
.arrow {
	transition: transform 0.5s;
}

.arrow-open {
	transform: rotate(180deg);
}
// .content {
// 	padding: 0 30rpx;
// 	display: grid;
// 	grid-template-columns: 33.3333% 33.3333% 33.3333%;
// 	row-gap: 18rpx;
// 	column-gap: 9rpx;

// 	.card-search {
// 		width: 218rpx;
// 		height: 64rpx;
// 		background: #FFFFFF;
// 		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.1);
// 		border-radius: 10rpx 10rpx 10rpx 10rpx;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		.put-text {
// 			height: 36rpx;
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: 400;
// 			font-size: 26rpx;
// 			color: #1F1F1F;
// 			opacity: 0.6;
// 		}
// 		image {
// 			height: 40rpx;
// 			width: 40rpx;
// 			margin-right: 10rpx;
// 			margin-left: 20rpx;
// 			opacity: 0.3;
// 		}
// 	}
// 	.card {
// 		width: 218rpx;
// 		height: 64rpx;
// 		background: #f9f9f9;
// 		border-radius: 10rpx;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		cursor: pointer;
// 		text {
// 			font-family: PingFang SC, PingFang SC;
// 			font-weight: 400;
// 			font-size: 24rpx;
// 			color: #1f1f1f;
// 		}
// 		&:hover {
// 			background: #e0e0e0;
// 		}
// 		.selected-text {
// 			font-weight: bold;
// 			color: #FF5221;
// 		}
// 	}
// }

</style>
