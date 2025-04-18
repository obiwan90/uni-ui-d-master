<template>

		<view class="batch-pannel">
			<view class="title" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 40rpx">
				<text class="text-1">批量改价</text>
				<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
			</view>

			<view
				class="card-1"
				style="width: 710rpx; background: linear-gradient(354deg, #ffffff 0%, #ffd2b4 80%); border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center"
			>
				<text class="text-1">{{name}}</text>
			</view>

			<!-- <view
				class="card-1"
				style="width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center; justify-content: space-between">
				<text class="text-1">修改类型</text>
				<view style="display: flex; justify-content: center; align-items: center">
					<view style="display: flex; justify-content: center; align-items: center; margin-right: 40rpx">
						<view style="width: 28rpx; height: 28rpx; border: 2rpx solid #eeeeee; border-radius: 50%" />
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; margin-left: 10rpx">售价</text>
					</view>

					<view style="display: flex; justify-content: center; align-items: center">
						<image style="width: 28rpx; height: 28rpx" src="/pagesRecoveryDetail/static/icon_moren_sel@3x.png" mode="aspectFill"></image>
						<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; margin-left: 10rpx">收价</text>
					</view>
				</view>
			</view> -->
			<view class="card-1" style="width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center; justify-content: space-between">
			  <text class="text-1">修改类型</text>
			  <view style="display: flex; justify-content: center; align-items: center">
				<view style="display: flex; justify-content: center; align-items: center; margin-right: 40rpx" @click="changeType('1')">
				  <view v-if="lx==='2'" style="width: 28rpx; height: 28rpx; border: 2rpx solid #eeeeee; border-radius: 50%"  />
				  <image v-else style="width: 28rpx; height: 28rpx" src="https://www.xzxskj.com/xcximg/icon_moren_sel@3x.png" mode="aspectFill"></image>
				  <text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: '#1f1f1f'; margin-left: 10rpx">售价</text>
				</view>
				
				<view style="display: flex; justify-content: center; align-items: center" @click="changeType('2')">
				  <view v-if="lx==='1'" style="width: 28rpx; height: 28rpx; border: 2rpx solid #eeeeee; border-radius: 50%" />
				  <image v-else style="width: 28rpx; height: 28rpx" src="https://www.xzxskj.com/xcximg/icon_moren_sel@3x.png" mode="aspectFill"></image>
				  <text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: '#1f1f1f'; margin-left: 10rpx">收价</text>
				</view>
			  </view>
			</view>
			<scroll-view scroll-y style="height: 710rpx;border-radius: 20rpx 20rpx 0rpx 0rpx;">
			<!-- batch edit -->
			<!-- <view style="display: flex; flex-direction: column; padding-left: 20rpx; padding-right: 20rpx; padding-bottom: 30rpx; padding-top: 24rpx"> -->
			<view
				style="
					margin-top: 20rpx;
					width: 710rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;
					padding-top: 24rpx;
					padding-bottom: 24rpx;
					background: #ffffff;
					border-radius: 20rpx 20rpx 0rpx 0rpx;
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #eeeeee;
				"
			>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: left;margin-bottom: 20rpx;">修改价格</text>
				<uv-scroll-list :indicator="false">
					<view
						class="card"
						@click="selectCard(indexInner)"
						:class="{ 'selected': selectedIndex === indexInner }"
						v-for="(item1, indexInner) in nclist"
						:key="indexInner"
						style="width: 180rpx; height: 80rpx; display: flex; justify-content: center; align-items: center;padding: 18rpx;"
					>
						<text>{{ item1.name }}</text>
					</view>
				</uv-scroll-list>
				<view style="border-bottom: 4rpx solid #f0eff3;">
				</view>
				<!-- height: 1110rpx; -->
				<view
					style="
						margin-left: -20rpx;
						padding-left: 20rpx;
						padding-right: 20rpx;
						padding-top: 20rpx;
						padding-bottom: 30rpx;
						width: 710rpx;
						background: #ffffff;
						border-radius: 0rpx 0rpx 20rpx 20rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
					"
				>
					<view
						v-for="(item, index) in djlist"
						:key="index"
						class="card-1"
						style="width: 670rpx; background: #f3f2f6; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; justify-content: space-between; align-items: center"
					>
						<text class="text-1">{{item.djname}}</text>
						<view style="display: flex; justify-content: center; align-items: center" @click="openDialog(item)">
							<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: right">¥ {{item.price}}</text>
							<image style="height: 28rpx; width: 28rpx; margin-left: 20rpx" src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				
			</view>

			<view class="card-2" style="width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; flex-direction: column">
				<view style="display: flex; align-items: center; margin-bottom: 20rpx">
					<text class="text-1">颜色</text>
					<text class="text-2">可在当前价格的基础上增减每个颜色的报价</text>
				</view>

				<!-- <view style="display: flex; align-items: center; width: 670rpx"> -->
				<view style="width: 670rpx">
					<uv-scroll-list :indicator="false">
						<view
							v-for="(item, index) in yslist"
							:key="index"
							class="card-3"
							style="
								width: 180rpx;
								height: 160rpx;
								background: #f9f9f9;
								border-radius: 10rpx 10rpx 10rpx 10rpx;
								margin-right: 30rpx;
								display: flex;
								flex-direction: column;
								justify-content: center;
							"
						>
							<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 28rpx; color: #1f1f1f; text-align: center">{{item.name}}</text>
							<view style="width: 160rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 0rpx 0rpx 0rpx; margin-top: 20rpx; margin-bottom: 10rpx" />

							<van-stepper class="stepper" :value="item.price===''?'0':item.price===''?'0':item.price" :min="-10000" step="10" input-width="48rpx" button-size="48rpx"  @change="(event) => onChange(event,item)" >
								<view slot="minus">
									<image style="height: 28rpx;width: 28rpx;" src="https://www.xzxskj.com/xcximg/minus.png" mode="aspectFit"></image>
								</view>
								<view slot="plus">
									<image style="height: 28rpx;width: 28rpx;" src="https://www.xzxskj.com/xcximg/plus.png" mode="aspectFit"></image>
								</view>
							</van-stepper>
						</view>
					</uv-scroll-list>
				</view>
			</view>
			</scroll-view>
			<view style="height: 182rpx"></view>
			<view
				style="
					width: 750rpx;
					height: 182rpx;
					background: #ffffff;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					margin-top: 40rpx;
					position: fixed;
					box-sizing: border-box;
					bottom: 0;
					right: 0;
					left: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-bottom: 32rpx;
				"
				class="btns"
			>
				<view
					@click="onsubmit"
					class="btn"
					style="
						width: 690rpx;
						height: 96rpx;
						background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<text @click="$emit('close')" style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff; text-align: center">确定</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog v-if="show" mode="input" message="成功消息" title="输入价格"  :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
</template>

<script setup>
import { apiBatchEdit,apiBatchEditSubmit } from '@/api/recovery/recovery.js'
const popup = ref(null)
const show = ref(false)
const selectItem = ref({})
const openDialog = (item)=>{
	selectItem.value = item;
	show.value = true;
	popup.value.open();
}
const close = ()=>{
	show.value = false;
	console.log('close');
	popup.value.close();
}
const confirm =async (e)=>{
	selectItem.value.price = e;
	djlist.value.forEach((item)=>{
		if(item.djname == selectItem.value.djname){
			item.price = e;
		}
	})
	popup.value.close();
	show.value = false;
}
const onChange = (e,item) => {
	console.log('onChange:',e.detail);
	item.price = e.detail;
};
const lx = ref(''); // 1 为售价, 2 为收价
const changeType = (newType) => {
  lx.value = newType;
};
const emit = defineEmits(['close']);
const props = defineProps({
	param: {
		type: Object,
		default: {}
	},
	selectData: {
	  type: Object,
	  default: {} 
	}
});
const requestParam = props.param;
// const storgeData = ref(['8G+128G', '8G+256G', '8G+256G', '8G+256G', '8G+256G']);
const djlist = ref([])
const nclist = ref([])
const yslist = ref([])
const bblist = ref([])
const name = ref('')
// const selectedIndexes = ref(nclist.value.map(() => -1));
const selectedIndex = ref(-1);
const apiBatchEditAction = async () => {
	console.log(props.param);
	const res = await apiBatchEdit(requestParam);
	if(res.code == 200){
		djlist.value = res.djlist
		nclist.value = res.nclist
		yslist.value = res.yslist
		bblist.value = res.bblist
		name.value = res.name
		if(!res.lx){
			lx.value = '1'
		}else{
			lx.value = res.lx
		}
		selectedIndex.value = nclist.value.findIndex((item) => item.name===props.param.nc);
	}
	console.log(res);
};
const djprice = computed(() => {
	return djlist.value.map(item => item.price).join(',');
});
const djid = computed(() => {
	return djlist.value.map(item => item.djid).join(',');
});
const selectCard = (index) => {
	selectedIndex.value = index;
	requestParam.nc = nclist.value[index].name;
	apiBatchEditAction()
};
const yslistString = computed(() => {
  let result = '';
  for (let i = 0; i < yslist.value.length; i++) {
	let item = yslist.value[i];
	let str = item.name;
	if (item.price) {
	  str += item.price;
	}
	if (i > 0) {
	  result += ',';
	}
	result += str;
  }
  return result;
});
const apiBatchEditSubmitAction = async () => {
	const data = {
		xhid:props.param.xhid,
		ppid:props.param.ppid,
		nc:requestParam.nc,
		bb:props.param.bb||'',
		bx:props.param.bx||'',
		djid:djid.value,//多个逗号分隔
		djprice:djprice.value,//多个逗号分隔 一一对应上面
		ysinfos:yslistString.value,//颜色infos
		lx:lx.value
	}
	const res = await apiBatchEditSubmit(data);
	if(res.code == 200){
		uni.showToast({
			title: '修改成功',
			icon: 'none'
		});
		setTimeout(() => {
			emit('close')
			uni.$emit('recoveryDetailRefresh')
		}, 1000)
	}
	console.log(res);
};
const onsubmit = ()=>{
	apiBatchEditSubmitAction()
}
onMounted(() => {
	apiBatchEditAction()
});
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.batch-pannel {
	width: 750rpx;
	height: 1200rpx;
	background: #f0eff3;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 40rpx;

	.card {
		box-sizing: border-box;
		height: 68rpx;
		background: #f9f9f9;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		margin-right: 20rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
		text {
			width: 140rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1f1f1f;
			text-align: center;
		}
	}
	.selected {
		animation: selectedAnimation-1 1s ease;
		background: linear-gradient(92deg, #ff6d0c 0%, #eb4636 100%);
		text {
			color: #ffffff;
		}
	}
}

.text-1 {
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #1f1f1f;
	text-align: left;
}
.text-2 {
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1f1f1f;
	opacity: 0.4;
	text-align: left;
	margin-left: 10rpx;
}
.card-1 {
	margin-top: 20rpx;
	padding: 0 20rpx;
	height: 100rpx;
}
.card-2 {
	margin-top: 20rpx;
	padding: 24rpx 20rpx;
}
.card-3 {
	padding-left: 10rpx;
	padding-right: 10rpx;
	padding-top: 20rpx;
}
</style>
