<template>
	<view class="suggest-layout">
		<!-- header -->
		<custom-header>
			<template #name>{{ title }}</template>
			<template #fill>投诉建议</template>
		</custom-header>

		<view class="content">
			<textarea v-model="content" class="texta" maxlength="-1" placeholder="在这输入想说的话~"></textarea>
		</view>
		<view class="photos">
			<!--  -->
			<view class="upPhoto">
				<uv-upload
					:fileList="fileList1"
					multiple 
					:maxCount="10"
					width="162rpx" 
					height="162rpx"
					accept="image"
					maxSize="5242880"
					name='2'
					previewFullVideo
					@afterRead="afterRead" 
					@delete="deleteFlie" 
					@oversize="check">
					<image src="https://www.xzxskj.com/Public/upload/66cbb1b9cba619636.png" mode="widthFix" style="width: 162rpx; height: 162rpx"></image>
				</uv-upload>
			</view>
		</view>
		<view style="height: 202rpx" />
		<view class="bottom-btn" @click="confirm">
			<button class="center-btn">确认发送</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetComplaint } from '../api/api.js';

const fileList1 = ref([]);
const title = ref('');
const content = ref('');

const compressImage = async (imageUrl) => {
	const originalSize = imageUrl.size; 
	let compressedResult;

	uni.showLoading({
		title: 'loading...',
		mask:true
	});

	if (originalSize > 500 * 1024) {
		let quality = 80;
		let compressionSuccess = false;
		let lastQuality, lastSize;

		do {
			compressedResult = await uni.compressImage({
				src: imageUrl.url,
				quality: quality,
			});
			const fileInfo = await uni.getFileInfo({
				filePath: compressedResult.tempFilePath,
			});
			lastQuality = quality; // 记录最后一次的质量
			lastSize = fileInfo.size; // 记录最后一次的大小

			if (fileInfo.size <= 500 * 1024) {
				compressionSuccess = true;
				break;
			}
			quality -= 10;
		} while (quality >= 20);

		// 隐藏 loading
		uni.hideLoading();

		if (!compressionSuccess) {
			console.log(`最后一次压缩质量: ${lastQuality}, 大小: ${(lastSize / 1024 / 1024).toFixed(2)} MB`);
			uni.showToast({
				title: '无法压缩到500KB以内，请尝试其他图片。',
				icon: 'none',
			});
			return null;
		}
	} else {
		compressedResult = { tempFilePath: imageUrl.url };
	}

	// 隐藏 loading
	uni.hideLoading();

	return { tempFilePath: compressedResult.tempFilePath, url: compressedResult.tempFilePath };
};



const afterRead = async (event) => {
	let lists = [].concat(event.file);
	for (const item of lists) {
		try {
			const compressedResult = await compressImage(item);
			if (!compressedResult) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedResult.tempFilePath,
				name: 'imgs',
				header: { 'Content-Type': 'multipart/form-data' }
			});
			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				throw new Error('上传失败');
			}
			const imageUrls = data.urls.split(',');
			imageUrls.forEach((url) => {
				if (url.trim()) {
					fileList1.value.push({
						url: 'https://www.xzxskj.com' + url.trim(),
						status: 'success',
						message: ''
					});
				}
			});
		} catch (error) {
			uni.showToast({
				title: error.message || '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
};


const deleteFlie = (event) => {
	fileList1.value.splice(event.index, 1);
};

const check = () => {
	uni.showToast({
		title: '超出上传限制',
		icon: 'error',
		duration: 2000
	});
};

const apiGetComplaintAc = async () => {
	const contentValue = content.value;
	const fileList = fileList1.value;

	if (!contentValue.trim()) {
		uni.showToast({
			title: '内容不能为空',
			icon: 'none',
			duration: 500
		});
		return;
	}

	if (fileList.length === 0) {
		uni.showToast({
			title: '请上传至少一张图片',
			icon: 'none',
			duration: 500
		});
		return;
	}

	const param = {
		opid: uni.getStorageSync('sessionInfo').opid,
		content: contentValue,
		img: fileList.map(file => file.url).join(',')
	};

	const res = await apiGetComplaint(param);
	if (res.code === '200') {
		uni.showToast({
			title: '操作成功',
			icon: 'success',
			duration: 500
		});
	}
};

const confirm = async () => {
	await apiGetComplaintAc();
};

onLoad((options) => {
	if (options.title) {
		title.value = options.title;
	}
});
</script>

<style lang="scss" scoped>
.suggest-layout {
	background: linear-gradient(180deg, #f3f2f6 0%, #ffffff 100%);
	display: flex;
	flex-direction: column;
	align-items: center;

	.content {
		margin-top: 40rpx;
		width: 710rpx;
		height: 464rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx 24rpx;
		.texta {
			width: 100%;
			height: 100%;
		}
	}

	.photos {
		width: 710rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
		.upPhoto {
			::v-deep .van-uploader__wrapper {
				display: grid;
				flex-wrap: wrap;
				grid-template-columns: repeat(4, 1fr);
				width: 710rpx;
			}
		}
	}
}

.bottom-btn {
	width: 750rpx;
	height: 182rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 0rpx 0rpx 0rpx 0rpx;

	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 62rpx;

	.center-btn {
		width: 690rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
	}
	.left-btn {
		width: 232rpx;
		height: 96rpx;
		background: #ffeeec;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #eb4636;
		text-align: center;
	}
	.right-btn {
		width: 444rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
	}
}

</style>
