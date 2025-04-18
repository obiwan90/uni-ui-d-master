<template>
	<view class="withdrawal-layout">
		<custom-header>
			<template #name>提现</template>
			<template #fill>提现</template>
		</custom-header>
		
		<view style="width: 100%;background: #F3F2F6;margin-top: 50rpx;">
			<uv-cell-group :border="false">
				<uv-cell :border="false" isLink>
					<template v-slot:title>
						<text style="opacity: 0.6;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;;">到账银行卡</text>
					</template>
					<template v-slot:label>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 500;font-size: 32rpx;color: #1F1F1F;">中国工商银行储蓄卡（3479）</text>
					</template>
				</uv-cell>
			</uv-cell-group>
		</view>
		
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 24rpx;display: flex;flex-direction: column;margin-top: 40rpx;margin-left: 20rpx;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #1F1F1F;">提现金额(元)</text>
			<view style="border-bottom: 2rpx solid #EEEEEE;display: flex;justify-content: space-between;align-items: center;margin-top: 80rpx;">
				<view style="display: flex;align-items: center;gap: 16rpx;">
					<image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill" style="height: 66rpx;width: 28rpx;"></image>
					<input type="number" placeholder="请输入您的提现金额"  style="text-align: left;"/>
				</view>
				<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #669CFD;">全部提现</text>
			</view>
			<text style="opacity: 0.6;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;margin-top: 30rpx;">可用金额 ¥ 34789.23</text>
		</view>
		
		<view style="width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 24rpx;display: flex;flex-direction: column;margin-top: 20rpx;margin-left: 20rpx;">
			<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #1F1F1F;">提现方式</text>
			<view v-for="(item,index) in data" :key="index" style="width: 100%;background: #FFFFFF;margin-top: 30rpx;">
				<uv-cell-group :border="false">
					<uv-cell :border="false" :center='false'>
						<template v-slot:title>
							<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #1F1F1F;">{{item.title}}</text>
						</template>
						<template v-slot:value>
							<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #669CFD;height: 40rpx;">{{item.values}}</text>
						</template>
						<template v-slot:icon>
							<view>
								<uv-checkbox-group v-model="checkboxValue" shape="circle" @change="selected">
									<uv-checkbox activeColor="red"  name="1" labelColor="grey"></uv-checkbox>
								</uv-checkbox-group>
							</view>
						</template>
					</uv-cell>
				</uv-cell-group>
				<view style="margin-left: 80rpx;">
					<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;opacity: 0.4;width: 100%;">{{item.label}}</text>
				</view>
			</view>
		</view>
		
		<view  class="select-btn">
			<view class="confim-btn button-animation" @click="confirm">
				<text>立即提现</text>
			</view>
		</view>
		
		<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="codePannelPopup" :safe-area="false" type="center" @close="handleClose" @change="change">
			<codePannel  @closePopup="handleClose"></codePannel>
		</uni-popup>
		
	</view>
</template>

<script setup>
import { codePannel } from './components/codePannel.vue'
const data = ref([
	{title:'普通到账 T+2',values:'预计（7月28日）到账',label:'手续费：2元/笔'},
	{title:'快速到账 T+1',values:'预计（7月27日）到账',label:'手续费：10w以下 20元/笔，10w以上 50元/笔'},
])
const checkboxValue = ref([])
const selected = (e)=>{
	console.log(e)
}

const codePannelPopup = ref(null)
const handleClose = ()=>{
	codePannelPopup.value.close()
}

const confirm = ()=>{
	codePannelPopup.value.open()
}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.withdrawal-layout{
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
</style>