<template>
	<!-- css="padding-bottom:20rpx;width: 710rpx; border-radius: 0rpx; background: linear-gradient(180deg, #313131 0%,#C7CACA 30%, #F5F8F9 100%); background-image: url(https://www.xzxskj.com/Public/upload/66da6753f276c9231.png); background-size: 100% 30%; background-repeat: no-repeat; background-position: center;"
			custom-style="position: fixed;top: 0;left: 0;" -->
	<view  class="posterLayout" v-if="isShow" >
		<l-painter
			hidden
			file-type="jpg"
			ref="poster1"
			css="padding-bottom:20rpx;width: 710rpx; border-radius: 20rpx;background-image: url(https://www.xzxskj.com/Public/upload/66da6753f276c9231.png);"
			custom-style="position: fixed;top: 0;left: 0;"
		>
		
			<l-painter-view css="width: 710rpx;display:flex;flex-direction: column;margin-top:20rpx;box-sizing: border-box;">
				<l-painter-view css="display:flex;justify-content: space-between;align-items: center;width:100%">
					<l-painter-view css="margin-left:20rpx;display:flex;flex-direction: column;width:60%">
						<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 48rpx;color: #FFFFFF;" text="质检报告"></l-painter-text>
						<l-painter-view>
							<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;vertical-align: bottom;" text="物品编码 "></l-painter-text>
							<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;opacity:0.4;vertical-align: bottom;" :text="infos.wpbm"></l-painter-text>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="margin-right:20rpx">
						<l-painter-text css="font-family: EU-H7X, EU-H7X;font-weight: bold;font-size: 56rpx;color: #FF6600;vertical-align: bottom;" :text="infos.finenessname"></l-painter-text>
					</l-painter-view>
				</l-painter-view>
				<l-painter-view css="margin-top:20rpx;margin-left:20rpx;margin-right:20rpx">
					<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #FFFFFF;" text="质检备注 "></l-painter-text>
					<l-painter-text css="margin-right:20rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;opacity:0.4;" :text="titleRemarl"></l-painter-text>
				</l-painter-view>
			</l-painter-view>
			<l-painter-view css=";margin-top:30rpx;margin-left:10rpx;width: 690rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 10rpx 10rpx 10rpx 10rpx;background: #FFFFFF;display: flex;flex-direction: column;">
				<l-painter-text css="margin-left:20rpx;margin-top:14rpx;margin-right:20rpx;font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 28rpx;color: #1F1F1F" :text="infos.name"></l-painter-text>
				<l-painter-view css="margin-left:20rpx;margin-top:14rpx;margin-bottom:14rpx;width: 650rpx;height: 2rpx;background: #EEEEEE;border-radius: 0rpx 0rpx 0rpx 0rpx;"></l-painter-view>
				<l-painter-view css="display: flex;align-items: center;justify-content: center;width:100%">
					<l-painter-view v-for="(item,index) in modelData.slice(0, 4)" :key="index" css="margin-bottom:14rpx;height:80rpx;width:25%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;border-right: 2rpx solid #EEEEEE;">
						<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;opacity:0.4" :text="item.title"></l-painter-text>
						<l-painter-text css="margin-top:6rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;" :text="item.value"></l-painter-text>
					</l-painter-view>
				</l-painter-view>
			</l-painter-view>
			
			<l-painter-view css="margin-top:10rpx">
				<l-painter-view css="margin-left:10rpx;width: 690rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;flex-direction: column;">
					<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;margin-top:12rpx;margin-left:24rpx" text="外观成色"></l-painter-text>
					<l-painter-view v-for="(item,index) in infos.combinationid" :key="index" css="display: flex;justify-content: space-between;align-items: center;width: 650rpx;margin-top:12rpx;margin-left:24rpx;margin-bottom:12rpx;">
						<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;" :text="item"></l-painter-text>
						<l-painter-text 
						    :css="{
						        fontFamily: 'PingFang SC, PingFang SC',
						        fontWeight: '400',
						        fontSize: '24rpx',
						        color: infos.combinationyslist[index]
						    }" 
						    :text="infos.combinationname[index]">
						</l-painter-text>
					</l-painter-view>
				</l-painter-view>
			</l-painter-view>
			
			<l-painter-view v-for="(item,index) in filteredItems" :key="index" css="margin-top:10rpx;margin-left:10rpx;width: 690rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;flex-direction: column;">
				<l-painter-view css="width:100%;display:flex;justify-content: space-between;align-items: center;margin-top:12rpx;margin-left:24rpx;margin-right:24rpx">
					<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;" :text="item.name"></l-painter-text>
					<l-painter-view css="display:flex;justify-content: center;align-items: center;margin-right:24rpx">
						<l-painter-view css="width: 124rpx;height: 46rpx;background: #FFF8EF;border-radius: 24rpx 24rpx 24rpx 24rpx;display:flex;justify-content: center;align-items: center;">
							<l-painter-text 
								v-if = "item.ycnum!=='0'"
							    css="font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #ED784B;" 
							    :text="`${item.ycnum}项异常`">
							</l-painter-text>
						</l-painter-view>
						<l-painter-view css="margin-left:10rpx;width: 124rpx;height: 46rpx;background: #EFFFF3;border-radius: 24rpx 24rpx 24rpx 24rpx;display:flex;justify-content: center;align-items: center;">
							<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #41AF6F;"  :text="`${item.normalCount}项正常`" ></l-painter-text>
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>
				<l-painter-view v-for="(item1,index) in item.er.slice(0,3)" :key="index" css="display: flex;justify-content: space-between;align-items: center;width: 650rpx;margin-top:12rpx;margin-left:24rpx;margin-bottom:12rpx;">
					<l-painter-text css="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;" :text="item1.name"></l-painter-text>
					<l-painter-text
					:css="{
						fontFamily: 'PingFang SC, PingFang SC',
						fontWeight: '400',
						fontSize: '24rpx',
						color: item1.xznrcor
					}"  :text="item1.xznr"></l-painter-text>
				</l-painter-view>
			</l-painter-view>
		</l-painter>
	</view>
	
	<uni-popup ref="qualityPopup" type="center" background-color="rgba(0,0,0,0)" :safe-area="false" :is-mask-click="true" @close="handleClose" @change="pannelChange">
		<view class="shareQuality" v-if="showPannel">
			<image @click="handleClose" class="pic" :src="sharePathUrl"  mode="widthFix"></image>
			<view class="poster-btn">
				<view @click="transmit" class="transmit">
					<text>转发</text>
					<button class="shareB" open-type="share" plain>转发</button>
				</view>
				<view @click="onSaveAlbum" class="save">
					<text>下载质检报告</text>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>

import { computed, nextTick } from 'vue';
import { useUserStore } from '@/stores/userInfoStore.js';
const isShow = ref(false);
const showPannel = ref(false)
const userStore = useUserStore();
const props = defineProps({
    infos: {
        type: Object,
        default: () => ({})
    },
    titleRemarl: {
        type: String,
        default: () => ''
    },
    qualityinspection: {
        type: Array,
        default: () => []
    },
    modelData: {
        type: Array,
        default: () => []
    }
});

const filteredItems = computed(() => {
  if (!props.qualityinspection || props.qualityinspection.length === 0) return [];
  
  return props.qualityinspection.map(item => {
    const normalItems = item.er.filter(item1 => item1 && item1.xznrcor === '#41AF6F');
    const filteredEr = item.er.filter(item1 => item1 && item1.xznrcor !== '#41AF6F');
    return { 
      ...item, 
      er: filteredEr, 
      normalCount: normalItems.length 
    };
  });
});

const poster1 = ref(null);
const qualityPopup = ref(null);
const sharePathUrl = ref('');

const handleClose = () => {
	console.log('quality Popup is closed');
	qualityPopup.value.close();
};
const pannelChange = (e) => {
	if (!e.show) {
		showPannel.value = e.show;
		isShow.value = e.show;
		console.log('quality Popup is closed');
	}
};


const posterShow = async () => {
    uni.showLoading({
        title: '加载中',
        mask: true
    });
    isShow.value = true;
    showPannel.value = true;

    await nextTick(); 

    let totalDelay = 0;
    const maxDelay = 5000; // 最大延迟 3 秒
    const interval = 1000; // 每次延迟 1 秒

    const checkPosterAndShowPopup = async () => {
        if (poster1.value) {
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
            poster1.value.canvasToTempFilePathSync({
                fileType: 'jpg',
                pathType: 'url',
                quality: 0.6,
                success: (res) => {
                    console.log(res.tempFilePath);
                    sharePathUrl.value = res.tempFilePath;
                    qualityPopup.value.open();
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
        });
    });
};

// 点击保存到相册
const onSaveAlbum = async () => {		
	try {	
		uni.showLoading({
			title: "下载中...",
			mask: true
		});				
		const res = await uni.getImageInfo({ src: sharePathUrl.value });
		await uni.saveImageToPhotosAlbum({ filePath: res.path });
		popup.value.close();
		setTimeout(() => {
			uni.showToast({
				title: "保存成功，请到相册查看",
				icon: "none"
			});
		}, 500);
	} catch (err) {
		console.error(err);
		uni.showToast({
			title: '保存失败，请重新点击下载',
			icon: "none"
		});
	} finally {
		uni.hideLoading();
	}
};

defineExpose({
	posterShow
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
	// height: 176rpx;
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
		width: 400rpx;
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
