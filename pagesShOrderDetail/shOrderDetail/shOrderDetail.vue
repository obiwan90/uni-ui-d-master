<template>
	<view class="shOrderDetail-layout" v-if="infos">
		<custom-header>
			<template #name></template>
			<template #fill></template>
		</custom-header>
		<scroll-view scroll-y="true" style="height: 1400rpx;">
		<!-- `zt` varchar(255) NOT NULL COMMENT '1售后中2售后成功3售后失败', -->
		<!-- `shlx` varchar(255) NOT NULL COMMENT '1.申请补差2退货退款3申请换机4售后维修 5 退款', -->
		<text v-if="infos.shlx==='5'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">待发货申请退款</text>
		<text v-if="infos.shlx==='1'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">申请补差</text>
		<text v-if="infos.shlx==='2'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">退货退款</text>
		<text v-if="infos.shlx==='4'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后维修</text>
	
		<text v-if="infos.zt==='2'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后完成</text>
		<text v-if="infos.zt==='3'" class="text" style="font-weight: 800; font-size: 44rpx; color: #1F1F1F;">售后驳回</text>
		
		<view v-if="infos.zt==='3'" style="margin: 30rpx 0;width: 174rpx;height: 60rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;justify-content: center;align-items: center;gap: 4rpx;">
			<image style="height: 32rpx;width: 32rpx;" src="https://www.xzxskj.com/xcximg/icon_kefu@3x.png" mode="aspectFill"></image>
			<text class="text" style="font-weight: 400;font-size: 28rpx;color: #1F1F1F;">平台介入</text>
		</view>
		
		<text v-if="infos.shlx==='2'&&infos.tyzt==='5'" style="margin: 30rpx 0;font-weight: 400;font-size: 24rpx;color: #669CFD;">已同意退货，请尽快将商品寄回</text>
		<text v-if="infos.shlx==='4'&&infos.tyzt==='6'"  style="margin: 30rpx 0;font-weight: 400;font-size: 24rpx;color: #669CFD;">已同意维修，请尽快将商品寄回</text>
		
		<view style="
			width: 710rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 24rpx;
			padding-right: 24rpx;
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;">
			<!-- product-card -->
			<view
				style="display: flex; margin-top: 20rpx; border-bottom: 2rpx solid #eeeeee; justify-content: space-between; padding-bottom: 20rpx; align-items: center"
				v-for="(item, index) in infos.goodslist"
				:key="index">
				<van-image width="190rpx" height="190rpx" fit="fill" radius="18rpx" :src="item.infos.cover">
					<template v-slot:error>加载失败</template>
					<van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
						
				<view style="display: flex; width: 500rpx; margin-left: 20rpx; flex-direction: column; justify-content: space-between; height: 190rpx">
					<view>
						<view style="display: inline-block; align-items: center; flex-wrap: wrap">
							<view v-if="item.infos.finenessname"
								style="
									float: left;
									padding: 0 8rpx;
									background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
									border-radius: 8rpx;
									display: flex;
									align-items: center;
									height: 32rpx;
									margin-right: 10rpx;
								"
							>
								<text class="text" style="font-size: 22rpx; color: #ffffff;">{{item.infos.finenessname}}</text>
							</view>
							<text class="text" style="font-size: 28rpx; color: #1f1f1f;">{{item.infos.name}}</text>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282; margin-right: 10rpx;">IMEI：{{item.infos.ch}}</text>
							<image style="height: 20rpx; width: 20rpx; opacity: 0.5" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						
						<view style="display: flex; align-items: center;margin-top: 4rpx;">
							<text class="text" style="font-size: 22rpx; color: #828282;">采购：{{item.infos.cgyname}}</text>
							<text class="text" style="font-size: 22rpx; color: #828282; margin-left: 40rpx;">仓库：{{item.infos.shopname}}</text>
						</view>
					</view>
						
					<view style="display: flex; align-items: center; justify-content: space-between">
						<view style="display: flex; align-items: center">
							<text class="text" style="font-size: 22rpx; color: #1f1f1f;">批发价：</text>
							<text class="text" style="font-family: DIN, DIN; font-weight: bold; font-size: 32rpx; color: #e6432e;">￥{{item.infos.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款金额 -->
		<view v-if="infos.shlx!=='4'" style="margin-top: 20rpx;width: 710rpx;height: 100rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 24rpx;display: flex;justify-content: space-between;align-items: center;">
			<text class="text" style="font-size: 32rpx; color: #1F1F1F;">退款金额</text>
			<view style="display: flex;justify-content: center;align-items: center;">
				<text class="text" style="font-weight: bold; font-size: 32rpx; color: #1F1F1F;">¥ {{infos.shlx=='5'?infos.price:infos.bcje}}</text>
				<image style="height: 28rpx;width: 28rpx;margin-left: 20rpx;" src="https://www.xzxskj.com/xcximg/icon_xiugai@3x.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 售后原因 -->
		<view style="margin-top: 20rpx;width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 24rpx;">
			<text class="text" style="font-weight: bold; font-size: 28rpx; color: #1F1F1F;">申请原因</text>
			<text class="text" style="margin-top: 24rpx; font-size: 28rpx; color: #1F1F1F;">{{infos.shlx=='5'?infos.remarks:infos.shyy}}</text>
			<view v-if="infos.shtt!==''" v-for="(item1,index) in infos.shtt.split(',')" :key="index" style="margin-top: 24rpx;display: flex;align-items: center;gap: 20rpx;" >
				<image style="height: 144rpx;width: 144rpx;border-radius: 18rpx;" :src="item1" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 售后信息 -->
		<view style="margin-top: 20rpx;width: 710rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;padding: 24rpx;gap: 15rpx;">
			<view v-for="(item,index) in order_info" :key="index"  style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
				<text class="text" style="font-size: 28rpx; color: #1F1F1F;">{{item.name}}</text>
				<view style="display: flex;justify-content: center;align-items: center;gap: 10rpx;">
					<text class="text" style="font-size: 28rpx; color: #1F1F1F;">{{item.value}}</text>
					<image v-if="item.image!==''" :src="item.image" style="height: 20rpx;width: 20rpx;" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view style="height: 200rpx;">
			
		</view>
		<view v-if="(infos.shlx==='2'&&infos.tyzt==='6'&&infos.ddlx!=='4')||(infos.shlx==='4'&&infos.tyzt==='5'&&infos.ddlx!=='4')" style="width: 750rpx;height: 182rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);border-radius: 0rpx 0rpx 0rpx 0rpx;display: flex;justify-content: center;align-items: center;position: fixed;bottom: 0;left: 0;right: 0;">
			
			<view  style="display: flex;justify-content: center;align-items: center;">
				<view  @click="selectSX" style="width: 650rpx;height: 96rpx;background: #F2F3F6;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;">
					<text style="font-weight: 400;font-size: 32rpx;color: #FFFFFF;">商家已同意售后，请立即预约发货</text>
				</view>
			</view>
		</view>
		
		</scroll-view>
	</view>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="saiXuanPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<userServicePannel :infos='infos'  v-if="showSaiXuanPannel" @successAc="successAc" @close="handleClose"></userServicePannel>
	</uni-popup>
</template>

<script setup>
import { onMounted } from 'vue';
import { formatTimestamp } from '@/utils/common.js';
import { apiGetCustomServiceOrderDetail,apiCustomServiceOrderOperation,apiOrderSfLogistics,apiOrderJdLogistics } from '../api/api.js'
import { userServicePannel } from './components/userServicePannel.vue'
const saiXuanPannelPopup = ref(null)
const showSaiXuanPannel = ref(false)
const handleClose = () => {
	saiXuanPannelPopup.value.close();
};
const change = (e) => {
	if(!e){
		showSaiXuanPannel.value = e.show
	}	
}
const selectSX = () => {
	
	showSaiXuanPannel.value = true
	saiXuanPannelPopup.value.open();
};
const infos = ref()
const orderItem  = ref()
const orderInfo = ref()
const order_info = ref([
	{ name: '售后订单', value: '', image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png'},
	{ name: '申请时间', value: '', image: '' },
	{ name: '销售订单', value: '', image: 'https://www.xzxskj.com/xcximg/icon_copy@3x.png' },
	{ name: '下单时间', value: '', image: '' },
	{ name: '付款时间', value: '', image: '' },
	{ name: '收货时间', value: '', image: '' },
	{ name: '下单备注', value: '', image: '' },
]);

const btns = ref([
	{shlx:'2',tyzt:'6',btnLeft:'驳回售后',btnRight:'商家已同意售后，请立即预约发货',btnCenter:''}, //6
	{shlx:'4',tyzt:'6',btnLeft:'驳回售后',btnRight:'商家已同意售后，请立即预约发货',btnCenter:''}, //5
])
//2同意补差3 同意售后4已收到货同意退款5售后完成预约快递6预约快递
const lxs = ref([
	{name:'驳回售后',lx:'7'},
	{name:'同意补差',lx:'2'},
	{name:'同意售后',lx:'3'},
	{name:'已收到货,同意退款',lx:'4'},//shlx 2
	{name:'售后完成,预约快递',lx:'5'},//shlx 4
	{name:'预约快递',lx:'6'},
	{name:'同意退款',lx:'8'}
])

const lx = ref()
const getFilteredOrderInfo = (zt) => {
	return order_info.value.filter((item) => item.zt.includes(zt));
};

const handleBtnClick = () => {
	uni.navigateTo({
		url: 'plugin://kdzs-plugin/logistics-list?num=JD0125961163521&appName=数码购机&title=物流信息'
	});
};
const apiGetCustomServiceOrderDetailAc =async ()=>{
	const param = {
		lx:orderItem.value.lx,
		id:orderItem.value.id
	}
	const res = await apiGetCustomServiceOrderDetail(param)
	if(res.code==='200'){
		infos.value = res.infos
		console.log('infos',infos.value)
		order_info.value[0].value = res.infos.ordernumber
		order_info.value[1].value = formatTimestamp(res.infos.shaddtime)
		order_info.value[2].value = res.infos.ydh
		order_info.value[3].value = formatTimestamp(res.infos.add_time)
		order_info.value[4].value = formatTimestamp(res.infos.pay_time)
		order_info.value[5].value = res.infos.remarks
	}
}

const apiCustomServiceOrderOperationAc = async (lx,data) => {
	const param = {
		id: orderItem.value.id,
		lx: lx // 2同意补差3同意售后4已收到货同意退款5售后完成预约快递6预约快递
	};

	try {
		const res = await apiCustomServiceOrderOperation(param);
		if (res.code === 200) {
			// uni.showToast({
			// 	title: '操作成功',
			// 	icon: 'success',
			// 	duration: 2000
			// });
			
			await subExpress(data.expressid,data.id)
			
		} else {
			uni.showToast({
				title: res.message || '操作失败',
				icon: 'none',
				duration: 2000
			});
		}
	} catch (error) {
		console.error('请求出错:', error); // 记录错误
		uni.showToast({
			title: '请求出错，请稍后再试',
			icon: 'none',
			duration: 2000
		});
	}
};

const getLxValue = (btnName) => {
	const found = lxs.value.find(item => item.name === btnName);
	return found ? found.lx : null;
};

const handleClick = async (flag) => {
	let buttonName = '';

	switch (flag) {
		case 'left':
			buttonName = getButtonLabels(infos.shlx, infos.tyzt)?.btnLeft || '';
			break;
		case 'right':
			buttonName = getButtonLabels(infos.shlx, infos.tyzt)?.btnRight || '';
			break;
		case 'center':
			buttonName = "同意售后";
			break;
		default:
			return; 
	}

	if (buttonName) {
		lx.value = getLxValue(buttonName);
	} else {
		uni.showToast({
			title: '参数错误',
			icon: 'none',
			duration: 2000
		});
		console.error(`未找到对应的按钮名称，flag: ${flag}, infos.shlx: ${infos.shlx}, infos.tyzt: ${infos.tyzt}`);
		return;
	}

	if (lx.value) {
		await apiCustomServiceOrderOperationAc(lx.value);
	}
};

const getButtonLabels = (shlx, tyzt) => {
    const btn = btns.value.find(button => button.shlx === shlx && button.tyzt === tyzt);
    if (btn) {
        return {
            btnLeft: btn.btnLeft,
            btnRight: btn.btnRight
        };
    } else {
        return null; 
    }
};
const successAc = async(data)=>{
	console.log('进来这里了吗')
	// const newLx = btns.value.find(item=>item.shlx === infos.value.shlx).tyzt
	await apiCustomServiceOrderOperationAc(infos.value.shlx==='2'?'4':'5',data);
}

const subExpress = (expressid,id)=>{
	if(expressid==='1'){
		apiOrderJdLogisticsData(id)
	}
	if(expressid==='2'){
		apiOrderSfLogisticsData(id)
	}
}

//jd物流确认发货
const apiOrderJdLogisticsData = async (id) => {
	const data = {
		ddid:id
	}
	const res = await apiOrderJdLogistics(data);
	console.log(res);
	if (res.code === '200') {
	  uni.showToast({
		title: '操作成功',
		icon: 'success',
		duration: 1000
	  });
	  setTimeout(() => {
		 apiGetCustomServiceOrderDetailAc();
		// paging.value.reload(true);
	  }, 500);
	}
};

//顺丰物流确认发货
const apiOrderSfLogisticsData = async (id) => {
	const data = {
		ddid:id
	}
	const res = await apiOrderSfLogistics(data);
	console.log(res);
	if (res.code === '200') {
	  uni.showToast({
		title: '操作成功',
		icon: 'success',
		duration: 1000
	  });
	  setTimeout(() => {
		apiGetCustomServiceOrderDetailAc();
		// paging.value.reload(true);
	  }, 500);
	}
};

onMounted(async () => {
    orderItem.value = JSON.parse(uni.getStorageSync('orderDetailItem'));
    console.log(orderItem.value);
    await apiGetCustomServiceOrderDetailAc();
});
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.shOrderDetail-layout{
	min-height: 100vh;
	background: #f3f2f6;
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.text {
	font-family: PingFang SC, PingFang SC;
	// text-align: left;
	// font-style: normal;
	// text-transform: none;
}
.btn-bottom{
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
	// flex-direction: column;
	padding-left: 20rpx;
	padding-right: 20rpx;
	// padding-top: 20rpx;
	padding-bottom: 62rpx;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}
</style>
