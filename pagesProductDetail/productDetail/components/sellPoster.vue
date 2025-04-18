<template>
	<view v-show="false" style="background: #ffffff; border-radius: 20rpx">
		<l-painter
			css="width: 690rpx; padding-bottom: 20rpx; background-image: url(https://www.xzxskj.com/Public/upload/664560d28b2697631.png);border-radius:18rpx"
			@fail="fail"
			@done="done"
			pathType="url"
			ref="poster"
			performance
		>
			<l-painter-image
				src="https://m.360buyimg.com/babel/jfs/t1/196317/32/13733/288158/60f4ea39E6fb378ed/d69205b1a8ed3c97.jpg"
				css="background: #ffffff; object-fit: cover; margin-left: 20rpx; margin-top: 40rpx; width: 84rpx; border: 2rpx solid #ffffff; box-sizing: border-box; height: 84rpx; border-radius: 50%;"
			/>
			<l-painter-view css="margin-top: 40rpx; padding-left: 20rpx; display: inline-block">
				<l-painter-text text="博弈优品专员" css="display: block; padding-bottom: 10rpx; color: #ffffff; font-size: 32rpx; fontWeight: bold" />
				<l-painter-text text="13112341234" css="color: rgba(255,255,255,.7); font-size: 24rpx" />
			</l-painter-view>
			<l-painter-view
				css="margin-left: 20rpx; margin-top: 30rpx; padding: 20rpx; box-sizing: border-box; background: #F4FFFF; border-radius: 16rpx; width: 650rpx; box-shadow: 0 20rpx 58rpx rgba(0,0,0,.15)"
			>
				<l-painter-image
					:src="'https://www.xzxskj.com' + props.infos.cover"
					css="object-fit: fill;border-radius: 20rpx; object-position: 50% 50%; width: 610rpx; height: 490rpx;"
				/>
				<l-painter-view css="position:relative;margin-top:30rpx;color: #1F1F1F; font-weight: bold; font-size:32rpx;height: 110rpx;">
					<l-painter-text :text="props.infos.name" css="line-height: 45rpx;" />
					<l-painter-view
						css=" position:absolute;
						  right:0;
						  bottom:0;display:flex; align-items: center;justify-content: flex-end;height:45rpx;"
					>
						<l-painter-view
							v-for="(item, index) in 5"
							:key="index"
							css="
						 	  display: inline-flex;
						 	  align-items: center;
						 	  border-radius: 4rpx;
						 	  font-family: 'PingFang SC', 'PingFang SC';
						 	  font-weight: 400;
						 	  font-size: 22rpx;
						 	  color: #2E2E2E;
						 	  height:45rpx;
						 	  margin-right: 8rpx;
						 	  opacity: 0.7;
						 	  padding-left:8rpx;
						 	  padding-right:8rpx;
						 	  backgroundColor:#F2F3F6;
						 	  "
						>
							<l-painter-text text="国行" css="vertical-align: middle;line-height: 45rpx;" />
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>

				<l-painter-view css="font-family: DIN, DIN;margin-top:30rpx;color: #EB4636; font-weight: bold; font-size:48rpx; line-height: 40rpx;">
					<l-painter-text text="$14120" css="vertical-align: bottom" />
				</l-painter-view>
			</l-painter-view>

			<l-painter-view
				css="display:flex;justify-content: space-between;margin-left: 20rpx; margin-top: 20rpx; padding: 40rpx 20rpx 20rpx 20rpx; box-sizing: border-box; background: #F4FFFF; border-radius: 16rpx; width: 650rpx; box-shadow: 0 20rpx 58rpx rgba(0,0,0,.15)"
			>
				<l-painter-view css="display:flex;flex-direction: column;width:50%; justify-content: space-between;">
					<l-painter-text
						text="95新"
						css="
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 48rpx;
							color: #1F1F1F;
							line-height: 30rpx;"
					/>
					<l-painter-view v-for="(item, index) in 3" :key="index" css="margin-top:20rpx;display:flex;align-items: center">
						<l-painter-image
							src="https://www.xzxskj.com/Public/upload/6645a51f189276871.png"
							css="margin-right:12rpx;background: #ffffff; object-fit: cover; width: 24rpx; border: 2rpx solid #eeeeee; box-sizing: border-box; height: 24rpx; border-radius: 50%;"
						/>
						<l-painter-text
							text="基本机况已全部通过"
							css="
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #1F1F1F;
								line-height: 30rpx;
								"
						/>
					</l-painter-view>
				</l-painter-view>
				<l-painter-view css="display:flex;flex-direction: column;width:50%;align-items: flex-end; justify-content: space-between;">
					<l-painter-qrcode text="limeui.qcoon.cn" css="width: 176rpx; height: 176rpx" />
					<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color:#798181" text="扫码查看商品详情"></l-painter-text>
				</l-painter-view>
			</l-painter-view>
		</l-painter>
		<view
			v-if="showPainter"
			class="button-animation"
			style="
				width: 650rpx;
				height: 100rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;
				padding-right: 20rpx;
				padding-bottom: 40rpx;
				padding-top: 20rpx;
				border-radius: 0 0 20rpx 20rpx;
			"
		>
			<view
				style="
					position: relative;
					align-items: center;
					width: 232rpx;
					height: 96rpx;
					background: #ffe6dc;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					display: flex;
					justify-content: center;
				"
			>
				<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #1f1f1f">转发</text>
				<button style="border: 1rpx solid red; position: absolute; opacity: 0; width: 232rpx" open-type="share" plain>转发</button>
			</view>
			
		</view>
	</view>
	<view
		@click="savePhoto"
		class="button-animation"
		style="
			width: 400rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		"
	>
		<text style="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 32rpx; color: #ffffff">保存到手机</text>
	</view>
	<view
		style="
			background-image: url(https://www.xzxskj.com/Public/upload/664560d28b2697631.png);
			background-position: center;
			border-radius: 18rpx;
			width: 690rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		"
	>
		<view style="display:flex;align-items: center;">
			<image style="margin-right: 10rpx;height: 72rpx;width: 72rpx;border-radius: 50%;border: 1rpx solid red;" src="" mode="aspectFill"></image>
			<view style="display: flex;flex-direction: column;justify-content: space-between;">
				<text class="text-1">博弈优品专员</text>
				<text class="text-1">13112341234</text>
			</view>
		</view>
		
		<view style="margin-top: 30rpx;width: 650rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;">
			<image style="height: 490rpx;width: 610rpx;border-radius: 20rpx;" src="" mode="aspectFill"></image>
			<text style="
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				line-height: 60rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;">华为Mate 60 RS 非凡大师 16G+512T 玄黑磨砂金（全网通）</text>
			
			<text style="
				margin-top:24rpx;
				font-family: DIN, DIN;
				font-weight: bold;
				font-size: 48rpx;
				color: #EB4636;
				line-height: 40rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;">¥14120</text>
		</view>
		
		<view style="
			background: #1E66D6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border: 2rpx solid #FFFFFF;">
			
		</view>
	</view>
</template>
<script setup>
const props = defineProps({
	infos: {
		type: Object,
		required: true
	}
});
const showPainter = ref(false);
const poster = ref(null);
const done = () => {
	showPainter.value = true;
};
const fail = () => {};
const savePhoto = () => {
	poster.value.canvasToTempFilePathSync({
		fileType: 'jpg',
		pathType: 'url',
		quality: 1,
		success: (res) => {
			console.log(res.tempFilePath);
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: function () {
					console.log('save success');
					uni.showToast({ title: '已保存到相册', icon: 'success', duration: 2000 });
				},
				fail: function () {
					uni.showToast({ title: '保存失败,请重试', icon: 'error', duration: 2000 });
				}
			});
		}
	});
};
</script>
<style lang="scss" scoped>

</style>
