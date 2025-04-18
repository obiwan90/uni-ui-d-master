<template>
	<view
		class="custom-order-card-saixuan-pannel"
		style="
			width: 750rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 46rpx;
			padding-bottom: 214rpx;
		"
	>
	<scroll-view scroll-y style="height: 1000rpx; background: #FFFFFF;">
		<view style="margin-bottom: 44rpx;width: 100%;display: flex; align-items: center; justify-content: space-between">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 36rpx; color: #1f1f1f; text-align: left; font-style: normal; text-transform: none">
				筛选
			</text>
			<image style="height: 32rpx; width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFit" @click="$emit('close')"></image>
		</view>

		<view v-for="(item, index) in data" :key="index" style="display: flex; flex-direction: column;margin-bottom: 40rpx;">
			<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left; font-style: normal; text-transform: none">
				{{ item.title }}
			</text>
			<view style="margin-top: 24rpx; display: grid; grid-template-columns: 33.33% 33.33% 33.33%; justify-content: space-between;grid-column-gap: 18rpx;grid-row-gap: 16rpx;">
				<view
					class="custom-order-card-saixuan"
					v-for="(item1, index1) in item.items"
					:key="index1"
					:class="{ 'custom-order-card-saixuan-selected': item1.selected }"
					@click="selectCard(index, index1)"
					style="height: 72rpx; border-radius: 10rpx 10rpx 10rpx 10rpx; display: flex; justify-content: center; align-items: center; width: 198rpx"
				>
					<text
						style="
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							text-align: center;
							font-style: normal;
							text-transform: none;
						"
					>
						{{ item1.name }}
					</text>
					<uv-badge type="error" max="99" :value="item1.num"></uv-badge>
				</view>
			</view>
		</view>

		<text
			style="
				margin-bottom: 24rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1f1f1f;
				text-align: left;
				font-style: normal;
				text-transform: none;">
			时间筛选
		</text>

		<view style="display: flex; justify-content: space-between; align-items: center">
			<view class="time-box">
				<text class="text-1">开始时间</text>
			</view>
			<view style="width: 30rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 0rpx 0rpx 0rpx" />
			<view class="time-box">
				<text class="text-1">结束时间</text>
			</view>
		</view>
		</scroll-view>
		<view
			style="
				width: 750rpx;
				height: 182rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 24rpx 20rpx 62rpx 20rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				gap: 14rpx;
			"
		>
			<view @click="resetSelection" style="width: 232rpx; height: 96rpx; background: #f2f3f6; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; justify-content: center; align-items: center">
				<text
					style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #1f1f1f; text-align: center; font-style: normal; text-transform: none"
				>
					重置
				</text>
			</view>
			<view class="button-animation" @click="onComfirm"
				style="
					width: 444rpx;
					height: 96rpx;
					background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
				"
			>
				<text
					style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #FFFFFF; text-align: center; font-style: normal; text-transform: none"
				>
					确定
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['reload','close'])
const props = defineProps({
  khlist: {
    type: Array,
    default: []
  },
  yglist: {
    type: Array,
    default: []
  }
});

const data = ref([
  {
    title: '销售员工',
    items: []
  },
  {
    title: '客户列表',
    items: []
  },
  {
    title: '排序',
    items: [
      { name: '最新订单', badge: '', selected: false,ddlx:'1' },
      { name: '最早订单', badge: '', selected: false,ddlx:'2'}
    ]
  }
]);

const selectCard = (parentIndex, childIndex) => {
  const group = data.value[parentIndex];

  if (parentIndex === 2) {
    group.items.forEach((item, index) => {
      item.selected = index === childIndex;
    });
  } else {
    group.items[childIndex].selected = !group.items[childIndex].selected;
  }
};
const resetSelection = () => {
    data.value.forEach(group => {
        group.items.forEach(item => {
            item.selected = false;
        });
    });
};

const onComfirm = () => {
  const selectedItems = data.value.map(group =>
    group.items.filter(item => item.selected)
  );
  emit('reload',selectedItems)
  emit('close')
  console.log('Selected items:', selectedItems);
};

onMounted(() => {
  data.value[0].items.push(...props.yglist.map(item => ({ ...item, selected: false })));
  data.value[1].items.push(...props.khlist.map(item => ({ ...item, selected: false })));
});
</script>
<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.custom-order-card-saixuan {
  background: #f9f9f9;
  text {
    color: #1f1f1f;
  }
}

.custom-order-card-saixuan-selected {
  animation: selectedAnimation 0.3s ease;
  background: #ffeeec;
  text {
    color: #eb4636;
  }
}

.time-box {
  width: 300rpx;
  height: 72rpx;
  background: #ffffff;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  border: 2rpx solid #cbcbcb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-1 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #1f1f1f;
  text-align: center;
  font-style: normal;
  text-transform: none;
  opacity: 0.4;
}
</style>

