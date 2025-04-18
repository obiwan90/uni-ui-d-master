<template>
	<view class="shareLayout" v-if="isShow" >
		<l-painter
			hidden
			file-type="jpg"
			ref="poster"
			css="width: 690rpx;height: 1240rpx;background-color: pink;background-image: url(https://www.xzxskj.com/Public/upload/664560d28b2697631.png);"
			custom-style="position: fixed;top: 0;left: 0;"
		>

			<!-- <l-painter-image css="position: absolute;top:32rpx;left:30rpx;height: 72rpx;width: 72rpx;border-radius: 50%;" src="https://www.xzxskj.com/Public/upload/66697e97b8c363900.png"></l-painter-image> -->
			<l-painter-image object-fit="fill" css="position: absolute;top:32rpx;left:30rpx;height: 72rpx;width: 72rpx;border-radius: 50%;" :src="user.img ? 'https://www.xzxskj.com' + user.img : 'https://www.xzxskj.com/Public/upload/66697e97b8c363900.png'"></l-painter-image>
			<!-- <l-painter-text :text="user.img ? 'https://www.example.com' + user.img : 'https://www.xzxskj.com/Public/upload/66697e97b8c363900.png'"></l-painter-text> -->
			
			<l-painter-text v-if="user.nik_name !== ''"
				css="position: absolute;top:32rpx;left:112rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #FFFFFF;text-shadow: 0px 0px 20px rgba(0,0,0,0.25);"
				:text="user.nik_name"
			></l-painter-text>
			<l-painter-text
				css="position: absolute;top:70rpx;left:112rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #FFFFFF;text-shadow: 0px 0px 20px rgba(0,0,0,0.25);"
				:text="data.phone"
			></l-painter-text>

			<l-painter-view
				css="position: absolute;top:134rpx;left:20rpx;height: 764rpx;width: 650rpx;border: 2rpx solid #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;background: #FFFFFF;"
			></l-painter-view>
		
			<l-painter-image css="object-fit:contain;position: absolute;top:154rpx;left:40rpx;height: 490rpx;width: 610rpx;border: 2rpx solid #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;background: #FFFFFF;" :src="infos.cover"></l-painter-image>
			
			<l-painter-view css="width:610rpx;position: absolute;top:674rpx;left:40rpx;height:100rpx;">
				<l-painter-text
					css="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #1F1F1F;"
					:text="infos.name"
				>
				</l-painter-text>
				<l-painter-view css="position: absolute;bottom:0;left:0;">
					<l-painter-text  v-for="(item,index) in filteredModelData" :key="index"
						css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #8A8A8C;background: #F2F3F6;padding-left:4rpx;padding-right:4rpx;margin-right:10rpx"
						:text="item.value"
					>
					</l-painter-text>
				</l-painter-view>
			</l-painter-view>
			
			<l-painter-text css="position: absolute;top:798rpx;left:40rpx; font-family: DIN, DIN;font-weight: bold;font-size: 48rpx;color: #EB4636;" :text="`￥${data.price}`"></l-painter-text>

			<l-painter-view
				css="background-image: url(https://www.xzxskj.com/Public/upload/66697cbf259ac1810.png);position: absolute;top:876rpx;left:100rpx;height: 64rpx;width: 12rpx;"
			></l-painter-view>
			<l-painter-view
				css="background-image: url(https://www.xzxskj.com/Public/upload/66697cbf259ac1810.png);position: absolute;top:876rpx;right:100rpx;height: 64rpx;width: 12rpx;"
			></l-painter-view>
			<l-painter-view
				css="position: absolute;top:918rpx;left:20rpx;width: 650rpx;height: 300rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;border: 2rpx solid #FFFFFF;"
			></l-painter-view>

			<l-painter-text
				css="position: absolute;top:960rpx;left:45rpx; font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 48rpx;color: #1F1F1F;"
				:text="infos.finenessname"
			></l-painter-text>

			<l-painter-view
				css="background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;top:1052rpx;left:50rpx;height: 24rpx;width: 24rpx;"
			></l-painter-view>
			<l-painter-view
				css="background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;z-index:99;top:1106rpx;left:50rpx;height: 24rpx;width: 24rpx;"
			></l-painter-view>
			<l-painter-view
				css="background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;z-index:99;top:1160rpx;left:50rpx;height: 24rpx;width: 24rpx;"
			></l-painter-view>
			<!-- text="基本机况已全部通过" -->
			<l-painter-text
				css="position: absolute;top:1046rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"
				:text="qualityText1"
			></l-painter-text>
			<!-- text="功能测试已全部通过" -->
			<l-painter-text
				css="position: absolute;top:1100rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"
				:text="qualityText2"
			></l-painter-text>
			<!-- text="维修检测已全部通过" -->
			<l-painter-text
				css="position: absolute;top:1154rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;"
				:text="qualityText3"
			></l-painter-text>
			
			  <l-painter-qrcode
				:text="'https://www.xzxskj.com/Home/Hbindex/index?id='+data.id"
				css="position: absolute;top:960rpx;right:50rpx;width: 176rpx; height: 176rpx"
			  />
			<l-painter-text
				css="opacity:0.6;position: absolute;top:1162rpx;right:50rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #1F1F1F;"
				text="扫码查看商品详情"
			></l-painter-text>
		</l-painter>
	</view>
	<!-- ../../static/images/loadingPic.jpg -->
	<uni-popup ref="popup" type="center" background-color="rgba(0,0,0,0)" :safe-area="false" :is-mask-click="true" @close="handleClose" @change="pannelChange">
		<view class="shareQuality" v-if="showPannel">
			<image @click="handleClose" class="pic" :src="sharePathUrl" mode="widthFix"></image>
			<view class="poster-btn">
				<!-- <view @click="transmit" class="transmit">
					<text>转发</text>
					<button class="shareB" open-type="share" plain>转发</button>
				</view> -->
				<view @click="onSaveAlbum" class="save">
					<text>保存到手机</text>
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script setup>
import { nextTick } from 'vue';
import { useUserStore } from '@/stores/userInfoStore.js';
const emit = defineEmits(['closeSharePannel']);

const isShow = ref(false);
const showPannel = ref(false)
const user = ref()
const props = defineProps({
	infos: {
		type: Object,
		default: () => {}
	},
	qualityinspection: {
		type: Array,
		default: () => []
	},
	modelData: {
		type: Array,
		default: () => []
	},
	data:{
		type: Object,
		default: () => {}
	}
})	

const handleClose = () => {
	console.log('share Popup is closed');
	popup.value.close();
};
const pannelChange = (e) => {
	if (!e.show) {
		showPannel.value = e.show;
		isShow.value = e.show;
		// emit('closeSharePannel')
		console.log('share Popup is closed');
	}
};

const filteredModelData = computed(() => {
  console.log('props.modelData', props.modelData);
  return props.modelData.filter(item => item.value !== '无' && item.type !== 'delivery');
});


const qualityText1 = computed(() => {
  const item = props.qualityinspection[0];
  return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
});
const qualityText2 = computed(() => {
  const item = props.qualityinspection[1];
  return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
});
const qualityText3 = computed(() => {
  const item = props.qualityinspection[2];
  return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
});
const shopname = computed(() => {
	return props.infos.shopname+'专员';
});
const poster = ref(null);
const popup = ref(null);
const sharePathUrl = ref('');

const handleShow = async () => {
    uni.showLoading({
        title: '加载中',
        mask: true
    });
	
	user.value = await useUserStore().getInfo()
    isShow.value = true;
    showPannel.value = true;

    await nextTick(); 

    let totalDelay = 0;
    const maxDelay = 5000; // 最大延迟 3 秒
    const interval = 1000; // 每次延迟 1 秒

    const checkPosterAndShowPopup = async () => {
        if (poster.value) {
            try {
                await showPopup();
                uni.hideLoading(); // 在成功后隐藏加载框
            } catch (error) {
                console.error(error);
                uni.hideLoading(); // 如果出错也隐藏加载框
            }
        } else {
            console.error('poster is null');
            totalDelay += interval;
            if (totalDelay < maxDelay) {
                setTimeout(checkPosterAndShowPopup, interval);
            } else {
                console.error('最大延迟已达到，停止检查');
                uni.hideLoading(); // 在最大延迟后隐藏加载框
            }
        }
    };

    setTimeout(checkPosterAndShowPopup, interval); // 初始延迟 1 秒
};



const showPopup = () => {
    return new Promise((resolve, reject) => {
        nextTick(() => {
            if (poster.value) {
                poster.value.canvasToTempFilePathSync({
                    fileType: 'jpg',
                    pathType: 'url',
                    quality: 0.6,
                    success: (res) => {
                        console.log(res.tempFilePath);
                        sharePathUrl.value = res.tempFilePath;
                        popup.value.open();
                        resolve(); 
                    },
                    fail: (err) => {
                        console.log(err);
                        uni.showToast({
                            title: '生成分享图片失败',
                            icon: 'none'
                        });
                        reject(err); 
                    }
                });
            } else {
                console.error('poster is null in showPopup');
                reject(new Error('poster is null'));
            }
        });
    });
};



//点击保存到相册
const onSaveAlbum = ()=>{		
	try {	
		uni.showLoading({
			title: "下载中...",
			mask: true
		})				
		uni.getImageInfo({
			src: sharePathUrl.value,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: (res) => {
						popup.value.close();
						setTimeout(()=>{
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},500)												
					},
					fail: err => {
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: '保存失败，请重新点击下载',
								icon: "none"
							})
							return;
						}
						uni.showModal({
							title: "授权提示",
							content: "需要授权保存相册",
							success: res => {
								if (res.confirm) {
									uni.openSetting({
										success: (setting) => {
											console.log(
												setting);
											if (setting
												.authSetting[
													'scope.writePhotosAlbum'
													]) {
												uni.showToast({
													title: "获取授权成功",
													icon: "none"
												})
											} else {
												uni.showToast({
													title: "获取权限失败",
													icon: "none"
												})
											}
										}
									})
								}
							}
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
	
			}
		})
	
	} catch (err) {
		console.log(err);
		uni.hideLoading();
	}	
}

defineExpose({
	handleShow
});
</script>
<style lang="scss" scoped>
.shareQuality {
	width: 690rpx;
	z-index: 99;
}
.pic {
	width: 100%;
	display: block;
	border: 30rpx;
	border-radius: 30rpx;
}
.poster-btn {
	// margin-top: 20rpx;
	box-sizing: border-box;
	height: 176rpx;
	width: 100%;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20rpx 20rpx;
	gap: 18rpx;
	.transmit {
		width: 232rpx;
		height: 96rpx;
		background: #ffe6dc;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.shareB {
			position: absolute;
			opacity: 0;
		}
		
		text {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1f1f1f;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}
	.save {
		width: 690rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #ffffff;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}
}
</style>
