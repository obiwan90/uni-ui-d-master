<template>
	<uv-transition 
		:show="showStep" 
		mode="slide-bottom"
		>
		<view class="afterSales-layput" v-if="orderInfo">
			<view class="title">
				<view class="left">
					<text>申请售后</text>
				</view>
				<view class="right">
					<image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
				</view>
			</view>
			<scroll-view scroll-y style="height: 100%;">
				<!-- propos.itemIndex===-1 -->
				<view class="product-card-list" v-if="propos.itemIndex===-1">
					<view  v-for="(item, index) in orderInfo.goodsinfos" :key="index" class="product-card">
						<view class="product-card-l">
							<!-- <image :src="item.goodsinfos.cover" mode="aspectFit"  @click="$emit('close')"></image> -->
							<van-image  width="190rpx" height="190rpx" radius="18rpx" :src="item.goodsinfos.cover"  fit="fill">
							  <template v-slot:error>加载失败</template>
							</van-image>
						</view>
						
						<view class="product-card-r">
							<view class="top">
								<view class="top-tap">
									<text class="top-tap-text">{{item.goodsinfos.finenessname}}</text>
								</view>
								<view style="{clear:both}">
									
								</view>
								<text class="top-text">{{item.goodsinfos.name}}</text>
							</view>
							<view class="mid">
								<view class="version-tap">
									<text v-if="item.goodsinfos.zt==='1'">{{formatGoodsInfoTabs(item)}}</text>
									<view v-else class="imei">
										<text>IMEI：{{item.goodsinfos.ch}}</text>
										<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
									</view>
								</view>
							</view>
							<view class="bottom">
								<view class="bottom-l">
									<text class="bottom1">批发价:</text>
									<text class="bottom2">￥{{item.goodsinfos.price}}</text>
									<text class="bottom3" v-if="!orderInfo.isBargaining">/台</text>
									<view class="bottom4" v-if="orderInfo.isBargaining">
										<text>原价：¥{{item.goodsinfos.originalPrice}}</text>
										<view class="divil">
										</view>
									</view>
									
								</view>
								<!-- <view class="bottom-r">
									<text></text>
								</view> -->
							</view>
						</view>
					</view>
				</view>
				<view class="product-card-list" v-else>
				<!-- 	{{propos.itemIndex}}
					{{orderInfo.goodsinfos[propos.itemIndex]}} -->
					<view  class="product-card">
						<view class="product-card-l">
							<van-image  width="190rpx" height="190rpx" radius="18rpx" :src="orderInfo.goodsinfos[propos.itemIndex].goodsinfos.cover"  fit="fill">
							  <template v-slot:error>加载失败</template>
							</van-image>
							<!-- <image :src="'https://www.xzxskj.com'+orderInfo.goodsinfos[propos.itemIndex].goodsinfos.cover" mode="aspectFit"  @click="$emit('close')"></image> -->
						</view>
						<view class="product-card-r">
							<view class="top">
								<view class="top-tap">
									<text class="top-tap-text">{{orderInfo.goodsinfos[propos.itemIndex].goodsinfos.finenessname}}</text>
								</view>
								<view style="{clear:both}">
									
								</view>
								<text class="top-text">{{orderInfo.goodsinfos[propos.itemIndex].goodsinfos.name}}</text>
							</view>
							<view class="mid">
								<view class="version-tap">
									<text v-if="orderInfo.goodsinfos[propos.itemIndex].goodsinfos.zt==='1'">{{formatGoodsInfoTabs(orderInfo.goodsinfos[propos.itemIndex])}}</text>
									<view v-else class="imei">
										<text>IMEI：{{orderInfo.goodsinfos[propos.itemIndex].goodsinfos.ch}}</text>
										<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
									</view>
								</view>
							</view>
							<view class="bottom">
								<view class="bottom-l">
									<text class="bottom1">批发价:</text>
									<text class="bottom2">￥{{orderInfo.goodsinfos[propos.itemIndex].goodsinfos.price}}</text>
									<text class="bottom3" v-if="!orderInfo.isBargaining">/台</text>
									<view class="bottom4" v-if="orderInfo.isBargaining">
										<text>原价：¥{{orderInfo.goodsinfos[propos.itemIndex].goodsinfos.originalPrice}}</text>
										<view class="divil">
										</view>
									</view>
									
								</view>
								<!-- <view class="bottom-r">
									<text></text>
								</view> -->
							</view>
						</view>
					</view>
				</view>
				
				<view class="refundType">
					<view class="title">
						<text>售后类型</text>
					</view>
					<view class="content">
						 <view class="card"
							  v-for="(item, index) in afterSalesType"
							  :key="index"
							  :class="{ selected: selectedIndex === index }"
							  @click="selectCard(index)">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</view>
				
				<!-- 退款金额 -->
				<view v-if="selectedIndex!==3" style="margin-top: 20rpx;width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding-top: 28rpx;padding-bottom: 28rpx;padding-left: 24rpx;padding-right: 24rpx;display: flex;justify-content: space-between;align-items: center;">
					<text style="font-weight: 400;font-size: 32rpx;color: #1F1F1F;">退款金额</text>
					<view style="display: flex;justify-content: center;align-items: center;gap: 20rpx;" @click="openDialog" >
						<text style="font-weight: bold;font-size: 32rpx;color: #1F1F1F;">¥ {{price}}</text>
						<image src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill" style="height: 28rpx;width: 28rpx;"></image>
					</view>
				</view>
				
				<!-- tip -->
				<view style="display: flex;justify-content: center;align-items: center;margin-top: 20rpx;">
					<text style="opacity: 0.6;font-weight: bold;font-size: 24rpx;color: #1F1F1F;">* 请提前与商家协商，确认达成一致后提交申请</text>
				</view>
				
				<!-- remark -->
				<view class="reason">
					<view class="title">
						<text>申请原因</text>
					</view>
					
					<view class="content">
						<view class="top">
							<view class="textarea-1">
								<textarea class="texta" v-model="remark" placeholder="请输入..."></textarea>
							</view>
						</view>
						<view class="photos">
							<!-- class="loader" -->
							<view class="upPhoto">
								<uv-upload
									:fileList="fileList"
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
									<image 
										src="https://www.xzxskj.com/xcximg/img_add_img33@3x.png" 
										mode="widthFix" 
										style="width: 162rpx;height: 162rpx;"
									></image>
								</uv-upload>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 230rpx;">
					
				</view>
				<view class="pannel-btn">
					<view class="btn button-animation" >
						<text class=""  @click="debounceComfirm">提交申请</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</uv-transition>
	
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog v-if="showPopup" mode="input" message="成功消息" title="输入价格"  :before-close="true" @close="popupClose" @confirm="popupConfirm"></uni-popup-dialog>
	</uni-popup>
</template>
<script setup>
import { apigetAddressDetail } from '@/api/address/address.js';
import { apiOrderAftersales } from '../../api/api.js';
import { apiApplyAfterSale } from '../../api/api.js'
import { debounce } from '@/utils/debounce.js'
const popup = ref(null)
const showPopup = ref(false)
const price = ref()
const confirm =async (e)=>{
	price.value = e;
	popup.value.close();
	showPopup.value = false;
}
const openDialog = ()=>{
	showPopup.value = true;
	popup.value.open();
}
const popupClose = ()=>{
	showPopup.value = false;
	console.log('close');
	popup.value.close();
}
const popupConfirm =async (e)=>{
	price.value = e;
	popup.value.close();
	showPopup.value = false;
}


const orderInfo = ref(null)
const showStep = ref(true)
const showCompensation= ref(false)
const showReturnsProduct = ref(false)
const showReplacePhone = ref(false)
const showMaintenance = ref(false)
const priceInput = ref()
const remark = ref()
const propos = defineProps({
  itemIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['close'])
const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
//售后类型
const afterSalesType = ref([
	{type:'1',title:'申请退款'},
	{type:'2',title:'申请补差'},
	{type:'3',title:'退货退款'},
	{type:'4',title:'售后维修'},
])
const refundType = ref([
	{type:'1',text:'上门取件'},
	{type:'2',text:'自行寄回'},
])
const selectedIndex = ref(0);
const selectCard = (index) => {
    selectedIndex.value = index;
};
const selectedReturnIndex = ref(0)
const selectReturnCard = (index)=>{
	console.log('进来了index:',index);
	selectedReturnIndex.value = index;
}
const goNext = () => {
    showStep.value = false;
    setTimeout(() => {
        switch (selectedIndex.value) {
            case 0:
                showCompensation.value = true;
                break;
            case 1:
                showReturnsProduct.value = true;
                break;
            case 2:
                showReplacePhone.value = true;
                break;
            case 3:
                showMaintenance.value = true;
                break;
            default:
                break;
        }
    }, 400);
};
const formatGoodsInfoTabs = (item)=>{
	console.log(item);
	console.log('进来了吗');
  let result = [];
  if (item.zt === '1') {
    if (item.goodsinfos.gjbbname) {
      result.push(item.goodsinfos.gjbbname);
    }
    if (item.goodsinfos.wlbbname) {
      result.push(item.goodsinfos.wlbbname);
    }
    if (item.goodsinfos.bxzt) {
      result.push(item.goodsinfos.bxzt);
    }
    if (item.goodsinfos.efficiency) {
      result.push(`电池${item.goodsinfos.efficiency}%`);
    }
    if (item.goodsinfos.delivery) {
      result.push(`${item.goodsinfos.delivery}发货`);
    }
  }
  return result.join('丨');
}
const fileList = ref([]);
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
					fileList.value.push({
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
const deleteFlie = (event) => {
	fileList.value.splice(event.index, 1);
};

const check = () => {
	uni.showToast({
		title: '超出上传限制',
		icon: 'error',
		duration: 2000
	});
};
const debounceComfirm = debounce(() => {
	comfirm()
}, 300,true);
// const comfirm = async () => {
// 	const data = {
// 		id: propos.itemIndex === -1 ? orderInfo.value.orderid : orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
// 		opid: uni.getStorageSync('sessionInfo').opid,
// 		lx: propos.itemIndex === -1 ? 1 : 2,
// 		shlx: afterSalesType.value[selectedIndex.value].type,
// 		shyy: remark.value,
// 		shtp: fileList.value.map(file => file.url).join(','),
// 		bcje: price.value,
// 		goodsid: propos.itemIndex === -1? '' : orderInfo.value.goodsinfos[propos.itemIndex].goodsid
// 	}

// 	if (!data.id) {
// 		uni.showToast({
// 			title: '订单ID不能为空',
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 		return;
// 	}
	
// 	if (!data.shlx) {
// 		uni.showToast({
// 			title: '申请类型不能为空',
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 		return;
// 	}
// 	if (!data.shyy) {
// 		uni.showToast({
// 			title: '申请理由不能为空',
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 		return;
// 	}
// 	if (!data.shtp) {
// 		uni.showToast({
// 			title: '请上传相关图片',
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 		return;
// 	}
// 	if(selectedIndex.value !== 3 ){
// 		if (!data.bcje || data.bcje <= 0) {
// 			uni.showToast({
// 				title: '补偿金额必须大于0',
// 				icon: 'error',
// 				duration: 3000,
// 			});
// 			return;
// 		}
// 	}

// 	// 计算当前订单的总金额
// 	let totalAmount = 0;
// 	if (propos.itemIndex === -1) {
// 		// 整单情况
// 		totalAmount = orderInfo.value.goodsinfos.reduce((sum, item) => sum + item.goodsinfos.price, 0);
// 	} else {
// 		// 单个订单情况
// 		totalAmount = orderInfo.value.goodsinfos[propos.itemIndex].goodsinfos.price;
// 	}
// 	if (parseFloat(data.bcje) > totalAmount) {
// 		uni.showToast({
// 			title: `超过总金额: ￥${totalAmount}`,
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 		return;
// 	}

// 	const res = await apiOrderAftersales(data);
// 	console.log('res:', res);
	
// 	if (res.code === 200) {
// 		uni.showToast({
// 			title: '申请提交成功',
// 			icon: 'success',
// 			duration: 3000,
// 		});
// 	} else {
// 		// 退款申请失败
// 		uni.showToast({
// 			title: '申请提交失败',
// 			icon: 'error',
// 			duration: 3000,
// 		});
// 	}
// 	emit('close');
// }

const comfirm = async () => {
	const data = {
		id: propos.itemIndex === -1 ? orderInfo.value.orderid : orderInfo.value.goodsinfos[propos.itemIndex].gysddh,
		opid: uni.getStorageSync('sessionInfo').opid,
		lx: propos.itemIndex === -1 ? 1 : 2,
		shlx: afterSalesType.value[selectedIndex.value].type,
		shyy: remark.value,
		shtp: fileList.value.map(file => file.url).join(','),
		bcje: price.value,
		goodsid: propos.itemIndex === -1 ? '' : orderInfo.value.goodsinfos[propos.itemIndex].goodsid
	}

	if (!data.id) {
		uni.showToast({
			title: '订单ID不能为空',
			icon: 'error',
			duration: 3000,
		});
		return;
	}
	
	if (!data.shlx) {
		uni.showToast({
			title: '申请类型不能为空',
			icon: 'error',
			duration: 3000,
		});
		return;
	}
	if (!data.shyy) {
		uni.showToast({
			title: '申请理由不能为空',
			icon: 'error',
			duration: 3000,
		});
		return;
	}
	if (!data.shtp) {
		uni.showToast({
			title: '请上传相关图片',
			icon: 'error',
			duration: 3000,
		});
		return;
	}
	if (selectedIndex.value !== 3) {
		if (!data.bcje || data.bcje <= 0) {
			uni.showToast({
				title: '补偿金额必须大于0',
				icon: 'error',
				duration: 3000,
			});
			return;
		}
	}

	// 计算当前订单的总金额
	let totalAmount = 0;
	if (propos.itemIndex === -1) {
		// 整单情况
		totalAmount = orderInfo.value.goodsinfos.reduce((sum, item) => sum + item.goodsinfos.price, 0);
	} else {
		// 单个订单情况
		totalAmount = orderInfo.value.goodsinfos[propos.itemIndex].goodsinfos.price;
	}
	if (parseFloat(data.bcje) > totalAmount) {
		uni.showToast({
			title: `超过总金额: ￥${totalAmount}`,
			icon: 'error',
			duration: 3000,
		});
		return;
	}

	// 显示遮罩
	uni.showLoading({
		title: '提交中...',
		mask: true // 遮罩
	});

	try {
		const res = await apiOrderAftersales(data);
		console.log('res:', res);
		
		if (res.code === 200) {
			uni.showToast({
				title: '申请提交成功',
				icon: 'success',
				duration: 3000,
			});
		}else if(res.code === 201){
			uni.showToast({
				title: '请勿重复操作',
				icon: 'error',
				duration: 3000,
			});
		}else {
			// 退款申请失败
			uni.showToast({
				title: '申请提交失败',
				icon: 'error',
				duration: 3000,
			});
		}
		 
	} catch (error) {
		console.error('请求出错:', error);
		uni.showToast({
			title: '提交请求失败',
			icon: 'error',
			duration: 3000,
		});
	} finally {
		// 隐藏遮罩
		uni.hideLoading();
	}
	setTimeout(()=>{
		emit('close');
	},1000)
}


const getPrice = ()=>{
	if(afterSalesType.value[selectedIndex.value].type=='1'){
		return priceInput.value
	}
	if(propos.itemIndex===-1){
		return orderInfo.value.price
	}else{
		return orderInfo.value.goodsinfos[propos.itemIndex].price
	}
}

const addressInfos = ref();
const getAddressDetail = async (id) => {
	const param = { id: id };
	const res = await apigetAddressDetail(param);
	addressInfos.value = res.info
	console.log(res);
};
const selectedAddress = ref(null);
onShow(() => {
  console.log('onShow');
  let pages = getCurrentPages()
  const prevPage = pages[pages.length - 1];
  console.log("onShow:", prevPage.data.selectedAddress);
  if (prevPage.data.selectedAddress) {
    // selectedAddress.value = prevPage.data.selectedAddress;
	console.log('prevPage.data.selectedAddress:',prevPage.data.selectedAddress);
	addressInfos.value = prevPage.data.selectedAddress;
  }
});

onMounted(()=>{
	const itemString = uni.getStorageSync('orderDetailItem'); 
	console.log('itemString:',itemString);
	if (itemString) {
		orderInfo.value = JSON.parse(itemString)
	}
	getAddressDetail(orderInfo.value.addressid)
}) 


</script>
<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.afterSales-layput{
	width: 750rpx;
	height: 1200rpx;
	// min-height: 800rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	box-sizing: border-box;
	.title{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				// border: 1rpx solid red;
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
			.text-1{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
			}
		}
	}
	
	.product-card-list {
		// border: 1rpx solid red;
		margin-top: 28rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		// padding: 24rpx 24rpx;
		box-sizing: border-box;
		.product-card {
			// border: 1rpx solid red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 15rpx;
			// border: 1rpx solid black;
			box-sizing: border-box;
			padding:24rpx;
			border-bottom: 1rpx solid #EEEEEE;
			.product-card-l {
				width: 30%;
				// margin-right: 10rpx;
				// border: 2rpx solid yellow;
				border: 18rpx;
				height: 190rpx;
				// width: 190rpx;
				// background-color: red;
				image {
					// border: 1rpx solid black;
					height:100%;
					width: 100%;
				}
			}
			.product-card-r {
				// border: 2rpx solid red;
				width: 70%;
				height: 190rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					display: inline-block;
					.top-tap {
						padding-left: 8rpx;
						padding-right: 8rpx;
						float: left;
						height: 40rpx;
						// width: 64rpx;
						background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
						border-radius: 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						.top-tap-text {
							color: #ffffff;
							font-size: 22rpx;
						}
					}
					.top-text {
						margin-left: 10rpx;
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1f1f1f;
						vertical-align: top;
						text-align: center;
					}
				}
				.mid {
					margin-top: 5rpx;
					.version-tap {
						height: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
						.imei{
							display: flex;
							align-items: center;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #828282;
								text-align: left;
								margin-right: 10rpx;
							}
							image{
								height: 20rpx;
								width: 20rpx;
							}
						}
					}
				}
				
				.bottom {
					// border: 1rpx solid red;
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.bottom-l {
						// border: 1rpx solid red;
						width: 100%;
						display: flex;
						align-items: center;
						.bottom1 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom2 {
							height: 38rpx;
							font-family: DIN, DIN;
							font-weight: bold;
							font-size: 32rpx;
							color: #e6432e;
							margin-bottom:8rpx;
						}
						.bottom3 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
						}
						.bottom4{
							margin-left: 20rpx;
							height: 32rpx;
							position: relative;
							margin-bottom: 13rpx;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #9B9B9B;
								text-align: left;
							}
							.divil{
								width: 100%;
								height: 2rpx;
								background: #9B9B9B;
								border-radius: 0rpx 0rpx 0rpx 0rpx;
								position: absolute;
								bottom: 7rpx;
								left: 0;
							}
						}
					}
					.bottom-r {
						width: 98rpx;
						height: 52rpx;
						background: #FFFFFF;
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						border: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: center;
						align-items: center;
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: #1F1F1F;
							text-align: center;
						}
					}
				}
			}
		}
	}

	.refundType{
		margin-top: 20rpx;
		width: 710rpx;
		height: 310rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		align-items: center;
		.title{
			display: flex;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			margin-top: 32rpx;
			display: grid;
			grid-template-columns: auto auto;
			// justify-content: space-between;
			align-items: center;
			// border: 1rpx solid black;
			box-sizing: border-box;
			width: 100%;
			grid-gap: 22rpx;
			.card {
			    width: 320rpx;
			    height: 80rpx;
			    background: #F9F9F9;
			    border-radius: 10rpx;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    box-sizing: border-box;
			    text {
			        font-family: PingFang SC, PingFang SC;
			        font-weight: 400;
			        font-size: 28rpx;
			        color: #1F1F1F;
			        text-align: center;
			    }
			}
			.selected {
			    background: #FFEEEC;
			}
			.selected text {
			    color: #EB4636;
			}
		}
	}
	
}
.compensation-layout{
	width: 750rpx;
	height: 1000rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	box-sizing: border-box;
	.title{
		box-sizing: border-box;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				// border: 1rpx solid red;
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	.price{
		margin-top: 36rpx;
		box-sizing: border-box;
		width: 710rpx;
		height: 110rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-left: 24rpx;
		padding-right: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			display: flex;
			align-items: center;
			.price-input{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				opacity: 0.6;
				margin-right: 10rpx;
			}
			.text-1{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				// border: 1rpx solid black;
			}
			
		}
	}
	.tips{
		display: flex;
		align-items: center;
		width: 100%;
		text{
			height: 34rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 24rpx;
			color: #1F1F1F;
			text-align: left;
			opacity: 0.6;
			margin-top: 16rpx;
		}
	}
	.reason{
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 42rpx;
		width: 710rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			box-sizing: border-box;
			margin-top: 20rpx;
			width: 662rpx;
			height: 312rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.top{
				width: 100%;
				height: 118rpx;
				box-sizing: border-box;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.textarea-1{
					box-sizing: border-box;
					height: 118rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					padding-top: 24rpx;
					.texta{
						height: 100%;
						width: 100%;
					}
				}
			}
			
			.photos {
				padding-bottom: 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				// border: 1rpx solid red;
				position: absolute;
				bottom: 0;
				left: 0;
				width:  662rpx;
				margin-top: 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.upPhoto {
					::v-deep .van-uploader__wrapper {
						display: grid;
						flex-wrap: wrap;
						grid-template-columns: 25% 25% 25% 25%;
						width: 662rpx;
					}
				}
			}
		}
	}
	
}
.returnsProduct{
	width: 750rpx;
	height: 1200rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	.title{
		box-sizing: border-box;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				// border: 1rpx solid red;
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	.price{
		margin-top: 42rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
			}
		}
	}
	.return-mode{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			display: flex;
			align-items: center;
			.card{
				margin-left: 10rpx;
				width: 180rpx;
				height: 72rpx;
				background: #F9F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: center;
				}
				
			}
			.card.selected {
			    background: #FFEEEC;
			}
			.card.selected text {
			    color: #EB4636;
			}
		}
	}
	.address{
		margin-top: 20rpx;
		width: 710rpx;
		height: 188rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 30%;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			width: 70%;
			display: flex;
			justify-content: space-between;
			.left{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				// border: 1rpx solid rebeccapurple;
				.top{
					width: 100%;
					// border: 1rpx solid red;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					text{
						height: 86rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						line-height: 44rpx;
						text-align: right;
					}
				}
				.bottom{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						text-align: right;
					}
				}
			}
			.right{
				// border: 1rpx solid black;
				width: 34rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					height: 24rpx;
					width: 24rpx;
				}
			}
		}
	}
	.pickup-time{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				margin-right: 10rpx;
			}
			image{
				height: 24rpx;
				width: 24rpx;
			}
		}
	}
	.reason{
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			// border: 1rpx solid black;
			box-sizing: border-box;
			margin-top: 20rpx;
			width: 662rpx;
			height: 312rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top{
				width: 100%;
				height: 118rpx;
				box-sizing: border-box;
				// border: 1rpx solid black;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.textarea-1{
					box-sizing: border-box;
					// border: 1rpx solid red;
					height: 118rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					padding-top: 24rpx;
					.texta{
						height: 100%;
						width: 100%;
						// border: 1rpx solid blue;
					}
				}
			}
			
			.photos {
				padding-bottom: 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				width:  662rpx;
				margin-top: 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.upPhoto {
					::v-deep .van-uploader__wrapper {
						display: grid;
						flex-wrap: wrap;
						grid-template-columns: 25% 25% 25% 25%;
						width: 662rpx;
					}
				}
			}
		}
	}
}
.replacePhone{
	width: 750rpx;
	height: 1200rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	.title{
		box-sizing: border-box;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				// border: 1rpx solid red;
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	.return-mode{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			display: flex;
			align-items: center;
			.card{
				margin-left: 10rpx;
				width: 180rpx;
				height: 72rpx;
				background: #F9F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: center;
				}
				
			}
			.selected {
			    background: #FFEEEC;
			}
			.selected text {
			    color: #EB4636;
			}
		}
	}
	.address{
		margin-top: 20rpx;
		width: 710rpx;
		height: 188rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 30%;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			width: 70%;
			display: flex;
			justify-content: space-between;
			.left{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				// border: 1rpx solid rebeccapurple;
				.top{
					width: 100%;
					// border: 1rpx solid red;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					text{
						height: 86rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						line-height: 44rpx;
						text-align: right;
					}
				}
				.bottom{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						text-align: right;
					}
				}
			}
			.right{
				// border: 1rpx solid black;
				width: 34rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					height: 24rpx;
					width: 24rpx;
				}
			}
		}
	}
	.pickup-time{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				margin-right: 10rpx;
			}
			image{
				height: 24rpx;
				width: 24rpx;
			}
		}
	}
	.reason{
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			// border: 1rpx solid black;
			box-sizing: border-box;
			margin-top: 20rpx;
			width: 662rpx;
			height: 312rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top{
				width: 100%;
				height: 118rpx;
				box-sizing: border-box;
				// border: 1rpx solid black;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.textarea-1{
					box-sizing: border-box;
					// border: 1rpx solid red;
					height: 118rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					padding-top: 24rpx;
					.texta{
						height: 100%;
						width: 100%;
						// border: 1rpx solid blue;
					}
				}
			}
			
			.photos {
				padding-bottom: 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				width: 662rpx;
				margin-top: 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.upPhoto {
					::v-deep .van-uploader__wrapper {
						display: grid;
						flex-wrap: wrap;
						grid-template-columns: 25% 25% 25% 25%;
						width:  662rpx;
					}
				}
			}
		}
	}
}
.maintenance{
	width: 750rpx;
	height: 1200rpx;
	background: #F8F8F7;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 32rpx;
	.title{
		box-sizing: border-box;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				// border: 1rpx solid red;
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	.return-mode{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			display: flex;
			align-items: center;
			.card{
				margin-left: 10rpx;
				width: 180rpx;
				height: 72rpx;
				background: #F9F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: center;
				}
			}
			.selected {
			    background: #FFEEEC;
			}
			.selected text {
			    color: #EB4636;
			}
		}
	}
	.address{
		margin-top: 20rpx;
		width: 710rpx;
		height: 188rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		.left{
			width: 30%;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			width: 70%;
			display: flex;
			justify-content: space-between;
			.left{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				// border: 1rpx solid rebeccapurple;
				.top{
					width: 100%;
					// border: 1rpx solid red;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					text{
						height: 86rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						line-height: 44rpx;
						text-align: right;
					}
				}
				.bottom{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1F1F1F;
						text-align: right;
					}
				}
			}
			.right{
				// border: 1rpx solid black;
				width: 34rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					height: 24rpx;
					width: 24rpx;
				}
			}
		}
	}
	.pickup-time{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		.left{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: right;
				margin-right: 10rpx;
			}
			image{
				height: 24rpx;
				width: 24rpx;
			}
		}
	}
	.reason{
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			// border: 1rpx solid black;
			box-sizing: border-box;
			margin-top: 20rpx;
			width: 662rpx;
			height: 312rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top{
				width: 100%;
				height: 118rpx;
				box-sizing: border-box;
				// border: 1rpx solid black;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.textarea-1{
					box-sizing: border-box;
					// border: 1rpx solid red;
					height: 118rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					padding-top: 24rpx;
					.texta{
						height: 100%;
						width: 100%;
						// border: 1rpx solid blue;
					}
				}
			}
			
			.photos {
				padding-bottom: 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				width: 662rpx;
				margin-top: 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.upPhoto {
					::v-deep .van-uploader__wrapper {
						display: grid;
						flex-wrap: wrap;
						grid-template-columns: 25% 25% 25% 25%;
						width:  662rpx;
					}
				}
			}
		}
	}
}
.pannel-btn{
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
	padding: 24rpx 30rpx 62rpx 30rpx;
	.btn {
		width: 690rpx;
		height: 96rpx;
		background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}
}
	.reason{
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 28rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		.title{
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.content{
			// border: 1rpx solid black;
			box-sizing: border-box;
			margin-top: 20rpx;
			width: 662rpx;
			height: 312rpx;
			background: #F3F2F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top{
				width: 100%;
				height: 118rpx;
				box-sizing: border-box;
				// border: 1rpx solid black;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.textarea-1{
					box-sizing: border-box;
					// border: 1rpx solid red;
					height: 118rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					padding-top: 24rpx;
					.texta{
						height: 100%;
						width: 100%;
						// border: 1rpx solid blue;
					}
				}
			}
			
			.photos {
				padding-bottom: 10rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				width:  662rpx;
				margin-top: 16rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				.upPhoto {
					::v-deep .van-uploader__wrapper {
						display: grid;
						flex-wrap: wrap;
						grid-template-columns: 25% 25% 25% 25%;
						width: 662rpx;
					}
				}
			}
		}
	}

</style>