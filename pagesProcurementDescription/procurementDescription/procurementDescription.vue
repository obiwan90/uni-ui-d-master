<template>
	<view class="ProcurementDescription-layout">
		<custom-header>
			<template #name>采购须知</template>
			<template #fill>采购须知</template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
		<!-- 	<view style="margin-left: 20rpx;width: 406rpx;height: 112rpx;background: #FC7737;border: 2rpx solid #FFFFFF;margin-bottom: -34rpx;margin-top: 60rpx;display: flex;align-items: center;border-radius: 20rpx 0 0 0;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #FFFFFF;margin-left: 76rpx;margin-bottom: 40rpx;">采购须知</text>
			</view>
			 -->
			<view class="chamfer" style="margin-left: 20rpx;display: flex;align-items: center;margin-bottom: -34rpx;margin-top: 60rpx;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #FFFFFF;margin-left: 76rpx;margin-bottom: 40rpx;">采购须知</text>
			</view>
			
			<view style="width: 710rpx;background: #FFFCFB;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 30rpx 20rpx; margin-left: 20rpx;">
				<view style="margin-top: 30rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">01</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">质检防撕表擅自撕毁视为放弃保修</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">平台所售二手物品均经过专业质检并附质检防撕表，<text style="font-weight: bold;font-family: PingFang SC, PingFang SC;color: #1F1F1F;font-size: 24rpx;border-bottom: 12rpx solid  #FFA468;box-sizing: border-box;">擅自撕毁视为放弃保修</text>，出现任何质量问题，我们将不再对其进行保修。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">02</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">拆机验机请务必全程在监控下进行</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">若买家收货需拆机验机，<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">请务必全程在监控下进行</text>，若对平台质检有疑问，请提供完整收货拆机视频，提交视频中快递单号清晰、包裹四面未拆痕迹、机身外观及干净整洁质检防撕表。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">03</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">与信息和质检一致的售后不予处理</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">付款前请详细查阅产品信息与质检报告，<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">与信息和质检一致的售后不予处理</text>。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">04</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">拒绝受理质量问题以外的售后和退款</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">平台<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">拒绝受理质量问题以外的售后和退款</text >（例：买错、不想要、重复购买等之类）。</text>
					</view>
				</view>
				
				<view style="margin-top: 70rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">05</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">请及时保留有效证据提交售后</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"> 账户ID、机身外观、屏幕外观、液晶、面容、指纹、电池均不在保修范围内，收货时请详细检查以上情况，若收货时出现以上情况<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">请及时保留有效证据提交售后</text>。</text>
					</view>
				</view>
			</view>
			
			
			<!-- <view style="margin-left: 20rpx;width: 406rpx;height: 112rpx;background: #FC7737;border: 2rpx solid #FFFFFF;margin-bottom: -34rpx;margin-top: 48rpx;display: flex;align-items: center;border-radius: 20rpx 0 0 0;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #FFFFFF;margin-left: 76rpx;margin-bottom: 40rpx;">运费规则</text>
			</view> -->
			
			<view class="chamfer" style="margin-left: 20rpx;display: flex;align-items: center;margin-bottom: -34rpx;margin-top: 60rpx;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 36rpx;color: #FFFFFF;margin-left: 76rpx;margin-bottom: 40rpx;">运费规则</text>
			</view>
			<view style="width: 710rpx;background: #FFFCFB;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 30rpx 20rpx; margin-left: 20rpx;">
				<view style="margin-top: 30rpx;">
					<view style="display: flex;gap: 20rpx;height: 100rpx;align-items: center;margin-bottom: -10rpx;">
						<text style="height: 100rpx;font-family: DIN, DIN;font-weight: 900;font-size: 100rpx;color: rgba(255,109,12,0.3);vertical-align: top;">06</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 32rpx;color: #1F1F1F;vertical-align: top;">运费规则明细</text>
					</view>
					<view style="width: 670rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 30rpx 20rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);display: flex;flex-direction: column;">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"><text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">自提</text>：客户自行上门提货，24小时内系统默认完成收货。</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"><text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">送货上门</text>：仅限距离发货地点3公里内免费送货上门，避免送货时间较长，请下单付款后，提醒客服尽快配送。</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"><text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;border-bottom: 12rpx solid #FFA468;">邮寄</text>：买家承担买货邮寄费用，若出现质量问题邮寄费用由平台承担。当日17点之前完成付款当日发货，17点之后完成付款次日上午发货。</text>
					</view>
				</view>
			</view>
			
		</scroll-view>
		
	</view>
</template>

<script setup>
const data = ref([
	{
		
		title: '质检防撕表擅自撕毁视为放弃保修',
		content: '<view style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;">平台所售二手物品均经过专业质检并附质检防撕表，<view style="font-weight: bold;font-family: PingFang SC, PingFang SC;color: #1F1F1F;font-size: 24rpx;border-bottom: 12rpx solid  #FFA468;box-sizing: border-box;">擅自撕毁视为放弃保修</view>，出现任何质量问题，我们将不再对其进行保修。</view>'
	},
	{
		title: '拆机验机请务必全程在监控下进行',
		content: '若买家收货需拆机验机，请务必全程在监控下进行，若对平台质检有疑问，请提供完整收货拆机视频，提交视频中快递单号清晰、包裹四面未拆痕迹、机身外观及干净整洁质检防撕表。'
	},
	{
		title: '与信息和质检一致的售后不予处理	',
		content: '付款前请详细查阅产品信息与质检报告，与信息和质检一致的售后不予处理。'
	},
	{
		title: '拒绝受理质量问题以外的售后和退款',
		content: '平台拒绝受理质量问题以外的售后和退款（例：买错、不想要、重复购买等之类）。'
	},
	
	{
		title: '请及时保留有效证据提交售后',
		content: '账户ID、机身外观、屏幕外观、液晶、面容、指纹、电池均不在保修范围内，收货时请详细检查以上情况，若收货时出现以上情况请及时保留有效证据提交售后。'
	},
])
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.ProcurementDescription-layout{
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