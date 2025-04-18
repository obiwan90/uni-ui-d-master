<template>
	<view class="edit-pannel">
		<view class="title" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 40rpx">
			<text class="text-1">{{djname}}</text>
			<image style="height: 32rpx; width: 32rpx" src="https://www.xzxskj.com/xcximg/icon_close1@3x.png" mode="aspectFill" @click="$emit('close')"></image>
		</view>

		<view
			class="card-1"
			style="width: 710rpx; background: linear-gradient( 354deg, #FFFFFF 0%, #FFD2B4 80%); border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; align-items: center"
		>
			<text class="text-1">{{name}}</text>
		</view>

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


		<view class="card-1" style="width: 710rpx; background: #ffffff; border-radius: 20rpx 20rpx 20rpx 20rpx; display: flex; justify-content: space-between; align-items: center">
			<text class="text-1">价格</text>
			<view style="display: flex; justify-content: center; align-items: center"  @click="openDialog"> 
				<text style="font-family: PingFang SC, PingFang SC; font-weight: bold; font-size: 32rpx; color: #1f1f1f; text-align: right">¥ {{price}}</text>
				<image style="height: 28rpx; width: 28rpx; margin-left: 20rpx" src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
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
						<view style="width: 160rpx; height: 2rpx; background: #eeeeee; border-radius: 0rpx 0rpx 0rpx 0rpx;margin-top: 20rpx;margin-bottom: 10rpx;" />

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
		<view style="height: 182rpx;">
			
		</view>
		<!-- padding: 24rpx 30rpx 30rpx 62rpx; -->
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
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff; text-align: center">确定</text>
			</view>
		</view>
	</view>
	
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog v-if="show" mode="input" message="成功消息" title="输入价格"  :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
import { apiSingleEdit,apiSingleEditSubmit } from '@/api/recovery/recovery.js'
const popup = ref(null)
const show = ref(false)
const emit = defineEmits(['close'])
const lx = ref(''); // 1 为售价, 2 为收价
const changeType = (newType) => {
  lx.value = newType;
};
const props = defineProps({
  selectData: {
    type: Object,
    default: {} 
  }
})
const onChange = (e,item) => {
	console.log('onChange:',e.detail);
	item.price = e.detail;
};
const djlist = ref([])
const nclist = ref([])
const yslist = ref([])
const bblist = ref([])
const name = ref('')
const djname = ref('')
const price = ref('')
const ysinfos = ref('')
//查看
const apiSingleEditAction = () => {
	const data = {
		xhid:props.selectData.xhid,
		djid:props.selectData.djid,
		ids:props.selectData.ids
	}
	apiSingleEdit(data).then(res => {
		if (res.code === 200) {
			djlist.value = res.djlist
			nclist.value = res.nclist
			yslist.value = res.yslist
			bblist.value = res.bblist
			name.value = res.name
			djname.value = res.djname
			price.value = res.price
			if(!res.lx){
				lx.value = '1';
			}else{
				lx.value = res.lx;
			}
		}
		console.log(res);
	})
}
const openDialog = ()=>{
	show.value = true;
	popup.value.open();
}
const close = ()=>{
	show.value = false;
	console.log('close');
	popup.value.close();
}

const confirm =async (e)=>{
	price.value = e;
	popup.value.close();
	show.value = false;
}

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

//提交
const apiSingleEditSubmitAction =async () => {
	const data = {
		djid:props.selectData.djid,
		ids:props.selectData.ids,
		lx:lx.value,//类型 1售价 2收价
		price:price.value,
		ysinfos:yslistString.value,//颜色标签价格 传入单个改价查看里面所有颜色信息 逗号分隔
	}
	const res = await apiSingleEditSubmit(data)
	if (res.code === 200) {
		uni.showToast({
			title: '提交成功',
			icon: 'success'
		})
		setTimeout(() => {
			emit('close')
			uni.$emit('recoveryDetailRefresh')
		}, 1000)
	}
	console.log(res);
}
const onsubmit = ()=>{
	apiSingleEditSubmitAction()
}
onMounted(() => {
	apiSingleEditAction()
})
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}
.edit-pannel {
	width: 750rpx;
	// height: 994rpx;
	background: #f0eff3;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 40rpx;
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
.stepper{
	::v-deep .van-stepper__input{
		text{
			color: red;
		}
	}
}
</style>
