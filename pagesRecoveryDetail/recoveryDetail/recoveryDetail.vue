<template>
    <view class="recoveryDetail-layout">
		<view class="header">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<!-- 标题栏 -->
			<view class="titleBar" style="display: flex;align-items: center;width: 100%;" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<image src="https://www.xzxskj.com/xcximg/icon_back@3x.png" @click="goBack" mode="aspectFill"></image>
				<text @click="goBack">{{title}}</text>
			</view>
		</view>
		<view v-if="data.length>0" style="background: #FFFFFF;padding-bottom: 10rpx;padding-top: 30rpx;">
			<uv-alert v-if="showTips" type="warning" description="提示:保修-有保大于40天" closable></uv-alert>
			<view class="select-content" v-for="(item, index) in data" style="display: flex;flex-direction: column;" :key="index">
				<view style="width: 100%;display: flex;justify-content: space-between;margin-top: 10rpx;">
					<view style="width: 15%;height: 70rpx;display: flex;justify-content: center;align-items: center;">
						<text style="
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 30rpx;
							color: #1F1F1F;
							text-align: left;
							">{{item.name}}</text>
					</view>
					
					<view style="width: 85%;height: 70rpx;">
						<uv-scroll-list :indicator="false">
							<view class="card" @click="selectCard(index, indexInner)" :class="{ 'selected': selectedIndexes[index] === indexInner }"
                                v-for="(item1, indexInner) in item.values" :key="indexInner" style="width: 156rpx;height: 68rpx;display: flex;justify-content:center;align-items: center;">
							    <text>{{ item1 }}</text>
							</view>
						</uv-scroll-list>
					</view>
				</view>
			</view>
		</view>
		
        <!-- content -->
	    <view :style="{ backgroundColor: '#f3f3f3', height: heightValue, width: '100%' }">
		<!-- <view style="background-color: #f3f3f3;height: 900rpx;width: 100%;"> -->
			<z-paging
			  ref="paging"
			  show-refresher-update-time
			  :fixed="false"
			  v-model="dataList"
			  @query="queryList"
			>
			<view class="content">
				<view class="tip" v-if="dataList.length>0">
					<text>此价格为平台参考售价，实际回收交易以</text>
					<image style="height: 24rpx;width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_wenhao@3x.png" mode="aspectFill"></image>
					<text>提示为准！</text>
				</view>
					
				<view style="padding-left: 20rpx;padding-right: 20rpx;" v-for="(item,index) in dataList" :key="index">
					<van-swipe-cell right-width="118" :disabled="!isAdmin">
					<view class="remark-card">
						<view class="title">
							<view class="left">
								<text>{{item.djname}}</text>
								<view class="tap" style="gap:20rpx" v-for="item1 in item.djbq.split(',').slice(1, -1)" :key="index">
									<text>{{item1}}</text>
								</view>
							</view>
							<view class="right">
								<text>￥{{item.price}}</text>
								<image style="height: 24rpx;width: 24rpx;" src="https://www.xzxskj.com/xcximg/icon_wenhao@3x.png" mode="aspectFill" @click="openTipsPannel(item)"/>
							</view>
						</view>
						<view class="card-content">
							<text>{{item.djms}}</text>
						</view>
					</view>
					<view slot="right" class="van-swipe-cell__right">
						<!-- <text>报价日志</text> -->
						<view class="left" @click="openLogPannel(item)">
							<text>报价日志</text>
						</view>
						<view class="right" @click="openEditPannel(item)">
							<text>修改报价</text>
						</view>
					</view>
					</van-swipe-cell>
				</view>
				
				<view v-if="hssinfos" style="margin-top: 20rpx;margin-left: 20rpx;align-items: center;display: flex;justify-content: space-between;al;width: 710rpx;background: #FFFFFF;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 20rpx 20rpx 20rpx 20rpx;padding: 20rpx 20rpx 20rpx 36rpx;background: linear-gradient( 149deg, #D6EDFF 0%, #FCFCFC 47%, #FFFFFF 100%);">
					<view style="display: flex;flex-direction: column;gap: 20rpx;width: 70%;">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #1F1F1F;">平台官方回收</text>
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #1F1F1F;">{{hssinfos.adders}}<image style="box-sizing: border-box;vertical-align: center;height: 25rpx;width: 25rpx;margin-left: 10rpx;" src="/pagesRecoveryDetail/static/icon_copy@3x.png" mode="aspectFill"></image></text>
						
					</view>
					
					<view class="right" style="display: flex;align-items: center;justify-content: flex-end;">
						<view v-for="(item,index) in tipData" :key="index" style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-left: 30rpx;">
							<image style="height: 56rpx;width: 56rpx;" :src="item.img" mode="aspectFit" @click="clickBtn(item.text)"></image>
							<text style="
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #1F1F1F;
								text-align: center;
								margin-top: 4rpx;
								">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
			
			</z-paging>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="editPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
				<view >
					<editPannel :selectData="selectData" v-if="showEditPannel" @close="handleClose" ></editPannel>
				</view>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="tipsPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
				<view >
					<tipsPannel :selectData="selectData" v-if="showTipsPannel" @close="handleClose" ></tipsPannel>
				</view>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="logPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
				<view >
					<logPannel :selectData="selectData" v-if="showLogPannel" @close="handleClose" ></logPannel>
				</view>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="batchPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
				<view >
					<batchPannel v-if="showBatchPannel" :param="param" :selectData="selectData"  @close="handleClose" ></batchPannel>
				</view>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="tapEditPannelPopup" :safe-area="false" type="bottom" @close="handleClose" @change="pannelChange">
				<tapEditPannel :name="title" :flid="flid" :ppid="param.ppid" v-if="showTapEditPannel" @close="handleClose" ></tapEditPannel>
			</uni-popup>
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="servicePannelPopup" :safe-area="false" type="center" @close="handleClose" @change="pannelChange">
				<servicePannel  @close="handleClose" ></servicePannel>
			</uni-popup>
			
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="officialAccountPopup" :safe-area="false" type="center" @close="handleClose" @change="change">
			    <joinUsPannel :qrCodeUrl="qrCodeUrl"/>
			</uni-popup>
			
		</view>
    
		<view style="height: 182rpx;"/>
		<!-- btn -->
		<view class="bottom-btn" v-if="isAdmin">
			<button class="left-btn" hover-class="is-hover"  @click.stop="openTapEditPannel">
				标签管理
			</button>
			<button class="right-btn" hover-class="is-hover" @click.stop="openBatchPannel">
				批量改价
			</button>
		</view>
	</view>
	
	
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { useShare  } from '../../utils/common.js';
import { apiRecoveryList } from '@/api/recovery/recovery.js';
import { getLocationByAddress } from '@/utils/wxMapAPI.js'
import { editPannel } from './components/edit-pannel.vue'
import { tipsPannel } from './components/tips-pannel.vue'
import { logPannel } from './components/log-pannel.vue'
import { batchPannel } from './components/batch-pannel.vue'
import { tapEditPannel } from './components/tap-edit.vue'
import { servicePannel } from './components/service-pannel.vue'
import { joinUsPannel } from './components/joinUs-pannel.vue'
import { computed } from 'vue';

const qrCodeUrl = ref('https://www.xzxskj.com/logo/logo.jpg');
const officialAccountPopup = ref(null);

const isAdmin = ref(true)

const selectData = ref()
const title = ref('回收报价')
const flid = ref('')

const servicePannelPopup = ref(null)

const editPannelPopup = ref(null)
const showEditPannel = ref(false)

const tipsPannelPopup = ref(null)
const showTipsPannel = ref(false)

const logPannelPopup = ref(null)
const showLogPannel = ref(false)

const batchPannelPopup = ref(null)
const showBatchPannel = ref(false)

const tapEditPannelPopup = ref(null)
const showTapEditPannel = ref(false)

const addressInfo = ref({
	
})
const { sharePath, onShareAppMessage, onShareTimeline } = useShare({
    title: '自定义分享标题',
    path: getCurrentPages().pop().route,
    desc: '自定义分享描述'
});
const handleClose = () => {
	console.log('Popup is closed');
	editPannelPopup.value.close();
	tipsPannelPopup.value.close();
	logPannelPopup.value.close();
	batchPannelPopup.value.close();
	tapEditPannelPopup.value.close();
	servicePannelPopup.value.close();
	officialAccountPopup.value.close()
};
const pannelChange = (e)=>{
	if(!e.show){
		showEditPannel.value = e.show
		showTipsPannel.value = e.show
		showLogPannel.value = e.show
		showBatchPannel.value = e.show
		showTapEditPannel.value = e.show
	}
}
const openEditPannel = (item) => {
	selectData.value = item
	showEditPannel.value = true
	editPannelPopup.value.open();
};
const openTipsPannel = (item) => {
	selectData.value = item
	showTipsPannel.value = true
	tipsPannelPopup.value.open();
};
const openLogPannel = (item) => {
	selectData.value = item
	showLogPannel.value = true
	logPannelPopup.value.open();
};
const openBatchPannel = () => {
	showBatchPannel.value = true
	batchPannelPopup.value.open();
};
const openTapEditPannel = ()=>{
	showTapEditPannel.value = true
	tapEditPannelPopup.value.open();
}

const data = ref([
    // { name: '内存', values: ['8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G', '8G+128G','8G+128G', '8G+128G', '8G+128G', '8G+128G'] },
    // { name: '版本', values: ['麒麟版', '骁龙版'] },
    // { name: '保修', values: ['过保', '有保'] },
    // { name: '网络', values: ['全网通'] },
    // { name: '颜色', values: ['可可茶金色', '普罗旺斯', '普罗旺斯', '普罗旺斯', '普罗旺斯', '梦幻罗兰', '梦幻罗兰'] }
]);

const heightValue = computed(()=>{
	 return isAdmin.value ? '900rpx' : '1200rpx';
})

const showTips = computed(()=>{
	const show1 = data.value.some(item => item.name === '保修')
	console.log('show1',show1.value)
	return data.value.some(item => item.name === '保修')
})
const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  await apiRecoveryListData(pageNo-1)
  paging.value.complete(djlist.value);
  if(djlist.value.length===0){
	  servicePannelPopup.value.open();
  }
};

// const queryList = (pageNo, pageSize) => {
//   console.log('pageNo:', pageNo);
//   console.log('pageSize:', pageSize);
//   // 第一次请求
//   apiRecoveryListData(pageNo - 1).then(() => {apiRecoveryListData(pageNo-1).then(()=>{
// 	  paging.value.complete(djlist.value);
// 	  if(djlist.value.length===0){
// 	  	servicePannelPopup.value.open();
// 	  }
//   })})
// };


const tipData = ref([
	{text:'导航',img:'https://www.xzxskj.com/xcximg/icon_daohang@3x.png'},
	{text:'微信',img:'https://www.xzxskj.com/xcximg/icon_weixin@3x.png'},
	{text:'拨打',img:'https://www.xzxskj.com/xcximg/icon_tel@3x.png'}
])
const selectedIndexes = ref();
const selectCard = (index, indexInner) => {
    selectedIndexes.value[index] = indexInner;
	if(data.value[index].name==='内存'){
		param.value.nc = data.value[index].values[indexInner]
	}
	if(data.value[index].name==='版本'){
		param.value.bb = data.value[index].values[indexInner]
	}
	if(data.value[index].name==='保修'){
		param.value.bx = data.value[index].values[indexInner]
	}
	if(data.value[index].name==='网络'){
		param.value.wl = data.value[index].values[indexInner]
	}
	if(data.value[index].name==='颜色'){
		param.value.ys = data.value[index].values[indexInner]
	}
	paging.value.reload()
};
async function testGetLocationByAddress() {
  try {
    const res = await getLocationByAddress('四川省绵阳市涪城区科委立交福星楼凯南酒店2楼营销部');
    console.log('Address res:', res);
  } catch (error) {
    console.error('Error getting location:', error);
  }
}
const clickBtn = (text) => {
  if (text === "微信") {
	  officialAccountPopup.value.open()
	  
    // uni.showModal({
    //   title: "微信号码",
    //   content: hssinfos.value.phone, 
    //   confirmText: "复制",
    //   showCancel: false,
    //   customStyle: {
    //     width: '80%',
    //     borderRadius: '12px',
    //     padding: '30rpx',
    //     backgroundColor: '#fff',
    //     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    //   },
    //   titleStyle: {
    //     fontSize: '36rpx',
    //     fontWeight: 'bold',
    //     color: '#333'
    //   },
    //   contentStyle: {
    //     fontSize: '32rpx',
    //     color: '#666',
    //     marginTop: '20rpx'
    //   },
    //   confirmStyle: {
    //     fontSize: '32rpx',
    //     color: '#0077b6',
    //     marginTop: '30rpx'
    //   },
    //   success: (res) => {
    //     if (res.confirm) {
    //       uni.setClipboardData({
    //         data: hssinfos.value.phone,
    //         success: () => {
    //           uni.showToast({
    //             title: "微信号码已复制",
    //             icon: "none"
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
  }
  if (text === "拨打") {
    uni.makePhoneCall({
	   phoneNumber: hssinfos.value.hskfdh
    });
  }
  if(text === "导航"){
	uni.getLocation({
		type: 'gcj02',
		success:async function(res) {
			const latitude = res.latitude;
			const longitude = res.longitude;
			const res1 =await getLocationByAddress(hssinfos.value.adders)
			console.log('address res:',res1);
			uni.openLocation({
				latitude: res1.latitude,
				longitude: res1.longitude,
				name:hssinfos.value.shopname,
				address:hssinfos.value.adders,
				success: function () {
					console.log('success');
				}
			});
		}
	});
  }
};
const bblist = ref([])
const djlist = ref([])
const nclist = ref([])
const yslist = ref([])
const hssinfos = ref(null)
const param = ref({
	xhid: "",
	ppid: "",
	nc: "",
	bb: "",
	wl: "",
	ys: "",
	bx: "",
	start:'',
	delivery:uni.getStorageSync('locationForm').fullLocation.split(" ").join(",")
})
const apiRecoveryListData = async () => {
	const res = await apiRecoveryList(param.value);	
	if(res.code===200){
		bblist.value = res.bblist
		djlist.value = res.djlist
		nclist.value = res.nclist
		yslist.value = res.yslist
		hssinfos.value = res.hssinfos
		if(hssinfos.value){
			qrCodeUrl.value = "https://www.xzxskj.com"+hssinfos.value.imgs	
		}
		if(data.value.length===0){
			if(param.value.ppid==='1'){
				data.value = [
				    { name: '内存', values: nclist.value.map(item => item.name) },
				    { name: '版本', values: bblist.value.map(item => item.name) }, 
				    { name: '保修', values: ['过保', '有保'] }, 
				    { name: '网络', values: ['全网通'] },
				    { name: '颜色', values: yslist.value.map(item => item.name) }
				];
			}else{
				data.value = [
				    { name: '内存', values: nclist.value.map(item => item.name) },
				    { name: '版本', values: bblist.value.map(item => item.name) }, 
				    { name: '网络', values: ['全网通'] },
				    { name: '颜色', values: yslist.value.map(item => item.name) }
				];
			}
			if(bblist.value[0].name===''){
				data.value.splice(1,1)
			}
			if(!selectedIndexes.value){
				selectedIndexes.value = data.value.map(() => 0);
				data.value.forEach((item, index) => {
					if(item.name==='内存'){
						param.value.nc = item.values[0]
					}
					if(item.name==='版本'){
						param.value.bb = item.values[0]
					}
					if(item.name==='网络'){
						param.value.wl = item.values[0]
					}
					if(item.name==='颜色'){
						param.value.ys = item.values[0]
					}
					if(item.name==='保修'){
						param.value.bx = item.values[0]
					}
				});
			}
		}
	}
	console.log('Recovery list:', res);
};
const goBack = ()=>{
	uni.navigateBack()
}
uni.$on('recoveryDetailRefresh',()=>{
	paging.value.reload()
})
onLoad((options)=>{
	console.log("options:",options)
	if(options.id){
		param.value.xhid = options.id
		param.value.ppid = options.ppid
		flid.value = options.flid
		title.value = options.name
	}
	let selectedMine = uni.getStorageSync('selectedMine');
	let data = uni.getStorageSync('identityData');
	if(!selectedMine||!data||data[selectedMine].gsid!=='0'){
		isAdmin.value = false
	}
})
</script>

<style lang="scss" scoped>
view {
    box-sizing: border-box;
}
.recoveryDetail-layout {
    min-height: 100vh;
    background: #f3f2f6;
	
	.header {
		width: 100%;
		background: #FFFFFF;
		.titleBar {
			width: 100%;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
	
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
			text {
				height: 56rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 40rpx;
				color: #1f1f1f;
			}
		}
	}
    .card{
		animation: selectedAnimation 0.3s ease;
		box-sizing: border-box;
		width: 156rpx;
		height: 68rpx;
		background: #F9F9F9;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		margin-right: 20rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
		text{
			width: 140rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #1F1F1F;
			text-align: center;
		}
		
	}
	.selected{
		animation: selectedAnimation-1 1s ease;
		background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
		text{
			color: #FFFFFF;
		}
	}
	.tip{
		padding-top: 30rpx;
		padding-left: 20rpx;
		text{
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			color: #1F1F1F;
			text-align: center;
			opacity: 0.65;
		}
	}
	.remark-card{
		// margin-left: 20rpx;
		margin-top: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		border-radius: 20rpx 0 0 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 22rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1F1F1F;
					text-align: left;
					margin-right: 16rpx;
				}
				.tap{
					height: 44rpx;
					background: linear-gradient( 131deg, #FFCE7B 0%, rgba(255,153,100,0.98) 55%, #FF9057 100%);
					box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(255,109,12,0.1);
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					padding-left: 16rpx;
					padding-right: 16rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #FFFFFF;
						text-align: center;
					}
				}
			}
			.right{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				text{
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 36rpx;
					color: #E6432E;
					text-align: left;
					margin-right: 10rpx;
				}
				
			}
			
		}
		.card-content{
			margin-top: 18rpx;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: left;
				opacity: 0.4;
			}
		}
	}

	.van-swipe-cell__right{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 118px;
		.left{
			height: 100%;
			width: 118rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0 20rpx 20rpx 0;
			background: linear-gradient( 89deg, #FF8A24 0%, #FF960C 100%);
			flex-wrap: wrap;
			position: absolute;
			z-index: 2;
			left: 0;
			text{
				width: 48rpx;
				height: 68rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
		}
		.right{
			// border: 1rpx solid black;
			height: 100%;
			width: 138rpx;
			// margin-left: -30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0 20rpx 20rpx 0;
			background: linear-gradient( 89deg, #FF6D0C 0%, #EB4636 100%);
			flex-wrap: wrap;
			position: absolute;
			z-index: 1;
			right: 0;
			text{
				width: 48rpx;
				height: 68rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
		}
	}
	.customer-service{
		box-sizing: border-box;
		margin-left: 20rpx;
		margin-top: 20rpx;
		background: linear-gradient( 149deg, #D6EDFF 0%, #FCFCFC 47%, #FFFFFF 100%);
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
		padding-left:20rpx;
		padding-right: 20rpx;
		padding-top: 20rpx;
		border-radius: 20rpx;
		padding-bottom: 36rpx;
		.title{
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		
	}
	.service-card{
		margin-top: 30rpx;
		width: 710rpx;
		display: flex;
		align-items: center;
		.left{
			display: flex;
			flex-direction: column;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
		.right{
			image{
				border-radius: 50%;
				// border: 1rpx solid red;
			}
		}
	}

	.bottom-btn {
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
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
		
		.center-btn{
			width: 710rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
		.left-btn{
			width: 344rpx;
			height: 96rpx;
			background: #FFEEEC;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #EB4636;
			text-align: center;
		}
		.right-btn{
			width: 344rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;	
		}
		.center-btn{
			width: 710rpx;
			height: 96rpx;
			background: #F2F3F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #1F1F1F;
			text-align: center;
		}
	}
	
	.btn,
	.left-btn,
	.center-btn,
	.right-btn {
	  transition: background-color 0.3s, box-shadow 0.3s;
	
	  &:active { 
	    background-color: #EB4636; 
	    color: #FFF;
	    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	  }
	
	  &.is-hover {
	    color: rgba(255, 255, 255, 0.6);
	    background-color: #179b16;
	  }
	}
	.btn,
	.left-btn,
	.center-btn,
	.right-btn {
	  transition: all 0.3s ease; 
	}
}
</style>
