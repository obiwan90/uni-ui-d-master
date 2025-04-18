<template>
	<view class="aftersakesRules-layout">
		<custom-header>
			<template #name>售后规则</template>
			<template #fill>售后规则</template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
		
			<view class="chamfer" style="margin-left: 20rpx;display: flex;align-items: center;margin-bottom: -34rpx;margin-top: 60rpx;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #FFFFFF;margin-left: 76rpx;margin-bottom: 40rpx;">售后规则</text>
			</view>
			
			<view style="width: 710rpx;background: #FFFCFB;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 30rpx 20rpx; margin-left: 20rpx;">
				<view style="margin-top: 30rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">01</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">以下5项仅24小时包退包修</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">账户ID、机身外观、屏幕外观、液晶显示、面容指纹，24小时内包退或保修，超出24小时后平台将不再受理相关售后。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">02</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">7天质量问题包退</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">收货7天内出现非上列5项质检问题，可申请退货。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">03</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">包修30天</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">收货30天内出现非上列5项质检问题，可申请售后维修。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">04</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">保修时间</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">保修时间以物品签收时间为准。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">05</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">特价机型保修72小时</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">特价机型，24小时内出现质检报告以外的质量问题包退，保修72小时。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">06</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">售后流程</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">确认收货-申请售后-后台审核-退货完成-完成售后</text>
					</view>
				</view>

			</view>
			
		</scroll-view>
		
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.aftersakesRules-layout{
	min-height: 100vh;
	background: linear-gradient( 180deg, #FE9854 0%, #FFEADC 34%, #FFF0E3 100%);
}
.chamfer{
	width: 406rpx;
	height: 112rpx;
	background: #FC7737;
	background: linear-gradient(-135deg, transparent 80rpx, #FC7737 0) top right;
    background-repeat: no-repeat;
	border-radius: 20rpx 0 0 0;
	// border: 2rpx solid #FFFFFF;
}
</style>