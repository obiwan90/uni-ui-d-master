<template>
	<view v-if="isShow">
		<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
	</view>
	<scroll-view :scroll-y="!showPannel" style="height: calc(100vh - 256rpx); background-color: #f3f3f3">
		<!-- <scroll-view scroll-y style="height: (100vh - 256rpx);background-color: #f3f3f3;"> -->
		<view class="layout pageBg" v-if="infos">
			<!-- banner -->
			<view class="banner" style="">
				<swiper style="" circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay>
					<swiper-item  v-for="(item,index) in (infos.productimage.endsWith(',') ? infos.productimage.slice(0, -1) : infos.productimage).split(',')" :key="index">
						<image v-if="item !== ''" class="banner-image" :src="item" style="height: 100%;width: 100%;"  mode="scaleToFill" @click="shareImage(item)"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="layout-m">
				<view class="box-r" >
					<view class="top">
						<view class="title" style="">
							<custom-channel-tap v-if="infos.zjlx==='1'" class="tap" text1="官方质检" text1Color="#E6432E" :text2="infos.finenessname" backgroundColor="linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)" />
							<custom-channel-tap v-if="infos.zjlx==='2'" class="tap" text1="授权质检" text1Color="#246C14" :text2="infos.finenessname" backgroundColor="linear-gradient( 135deg, #246B13 0%, #39D591 100%)" />
							<custom-channel-tap v-if="infos.zjlx==='3'" class="tap" text1="自由货源" text1Color="#FF6C27" :text2="infos.finenessname" backgroundColor= "linear-gradient( 135deg, #FF6A27 0%, #FEB82E 100%) "/>
							<view style="{clear:both}"/>
							<text>{{infos.name}}</text>
						</view>
						<view class="clearfix"></view>
					</view>
					<view class="bottom" style="margin-top: 20rpx;">
						<view style="display: flex;align-items: center;gap: 16rpx;">
							<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #E6432E;">批发价:<text style="font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 28rpx;color: #E6432E;">￥<text style="font-family: DIN, DIN;font-weight: bold;font-size: 48rpx;color: #EB4636;">{{infos.price}}</text></text></text>
							<view class="image-tap" v-if="infos.special === '1'">
								<text>特价商品</text>
							</view>	
							<van-tag style="margin-right: 6rpx;"  v-if="infos.yjzt===2" size="mini" plain text-color="#EB4636">可议价</van-tag>
							<van-tag size="mini" plain text-color="#669CFD" v-if="infos.byzt === '1'">包邮</van-tag>
							<van-tag size="mini" plain text-color="#669CFD" v-if="infos.byzt === '2'">到付</van-tag>
						</view>
						
						<view style="" @click="showbBargaining" v-if="infos.yjzt === 2">
							<text style="height: 40rpx;font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 28rpx;color: #eb4636;margin-right: 10rpx;">去议价</text>
							<image style="width: 20rpx;height: 20rpx;" src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				
				<!-- 属性 -->
				<view class="suxing">
					<view v-for="(item, index) in modelData" :key="index" class="suxing-card">
						<text class="suxing-card1">{{item.title}}</text>
						<text class="suxing-card2">{{item.value}}</text>
					</view>
				</view>
				<!-- 人员 -->
				<view v-if="showSetting&&mineCompany" class="new-person">
					<view class="col1">
						<view class="img">
							<image src="https://www.xzxskj.com/xcximg/icon_info1@3x.png" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="row1">
								<text>{{infos.cgyname}}</text>
								<text>{{infos.ckname}}</text>
							</view>
							<view class="row2">
								<text>最近更新：{{ getTime(infos.updatetime)}}</text>
							</view>
						</view>
					</view>
					<view class="col2" @click="openEditPannel(infos)">
						<text>去修改</text>
						<image src="https://www.xzxskj.com/xcximg/icon_next1@3x.png" mode="aspectFill"></image>
					</view>
				</view>
				<!-- taps -->
				<view class="taps">
					<!-- <view v-for="(item,index) in 3" :key="index" class="tap-card"> -->
					<view class="tap-card">
						<image src="https://www.xzxskj.com/xcximg/icon_zhilian@3x.png" mode="aspectFit"></image>
						<text>7天质量问题包退</text>
					</view>
					<view class="tap-card">
						<image src="https://www.xzxskj.com/Public/upload/66c97f69bc3108295.png" mode="aspectFit"></image>
						<text>30天售后保修</text>
					</view>
					<view class="tap-card" @click="goPath('/pagesAftersalesRules/aftersalesRules/aftersalesRules')" >
						<image src="https://www.xzxskj.com/xcximg/icon_shouhou33@3x.png" mode="aspectFit"></image>
						<text style="color: #3976BB;">售后规则</text>
					</view>
				</view>
				<!-- 资检 -->
				<view class="maintenance">
					<view class="maintenance-title">
						<view class="maintenance-title-l">
							<view class="title-l-top">
								<text>质检报告</text>
							</view>
							<view class="title-l-bottom">
								<image src="https://www.xzxskj.com/xcximg/img@3x.png" mode="aspectFit"></image>
								<view class="person-info">
									<text class="person-info1">质检师</text>
									<text class="person-info2">{{infos.zjr}}</text>
								</view>
							</view>
						</view>
						<view class="maintenance-title-r">
							<image src="https://www.xzxskj.com/xcximg/img_zijian@3x.png" mode="aspectFill"></image>
						</view>
					</view>

					<!-- 编码 -->
					<view class="maintenance-card1">
						<view class="maintenance-card1-info1">
							<view class="info-title" >
								<text>物品编码</text>
							</view>

							<view class="info-content1" @click.stop="copyText(infos.wpbm.replace(/^XZXS/i, ''))">
								 <!-- <uv-tooltip class="info-bottom" :text="infos.wpbm" :buttons="['扩展']" bgColor="#e3e4e6"></uv-tooltip> -->
								 <text class="info-bottom">{{infos.wpbm}}</text>
								<!-- <text>FFASF45454TE</text> -->
								<view class="info-content1-image"  >
									<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="info-divile"></view>
						<view class="maintenance-card1-info2">
							<view class="info-title">
								<text>质检备注</text>
							</view>

							<view class="info-content2">
								<text style="color:#ED784B">经检测：{{titleRemarl}}</text>
							</view>
						</view>
					</view>

					<!-- 外观成色 -->
					<view class="appearance-card">
						<view class="top" style="margin-bottom: 20rpx;">
							<text>外观成色</text>
						</view>
						<view class="bottom" style="display: flex;flex-direction: column;gap: 20rpx;width: 100%;">
							<view v-for="(item,index) in infos.combinationid" :key="index" style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
								<view style="display: flex;align-items: center;gap: 20rpx;width: 80%;">
									<text style="height: 34rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1f1f1f;">{{item}}</text>
									<text style="height: 34rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;margin-left: 20rpx;" :style="{color:infos.combinationyslist[index]}">{{infos.combinationname[index]}}</text>
								</view>
								<!-- <uv-album :urls="urls[index]?.imgs" maxCount='2' rowCount='2' multipleSize="48rpx" singleSize="48rpx" singleMode="aspectFill" space="8rpx"></uv-album> -->
								<view style="display: flex;justify-content: flex-end;align-items: center;gap: 10rpx;height: 48rpx;" >
									<image v-for="(item,index1) in urls[index]?.imgs" :key="index1" :src="item" style="border-radius: 10rpx;height: 48rpx;width: 48rpx;" mode="aspectFill" @click.stop="previewQualityInspection(urls[index]?.imgs,item)"></image>
								</view>
							</view>
						</view>
					</view>
					<!-- 机况 功能 维修 -->
					<view class="basic-container" >
					    <uni-collapse class="basic-collapse">
					        <uni-collapse-item v-for="(item,index) in qualityinspection" :key="index" titleBorder="none" :border="false" class="basic-collapse-item">
					           <template v-slot:title>
					                <uni-list :border="false">
					                    <uni-list-item>
					                        <template v-slot:header>
					                            <text class="co-header">{{item.name}}</text>
					                        </template>
					                        <template v-slot:footer>
					                            <text class="co-foot" :style="{color:item.ycnum===0?'#41AF6F':'#ED784B'}" >{{item.ycnum===0?'全部正常':(item.ycnum+'项异常')}}</text>
					                        </template>
					                    </uni-list-item>
					                </uni-list>
					            </template>
								<view class="divile"/>
								<view class="content">
								  <view  class="card" v-for="(item1,index) in item.er" :key="index">
										<text class="left">{{item1.name}}</text>
										<!-- <text class="right" style="color: item1.xznrcor===''?'#41AF6F':'item1.xznrcor'">{{item1.xznr}}</text> -->
										<view style="display: flex;align-items: center;gap: 4rpx;" @click="preview(item1.id)">
											<image  v-if="showImage(item1.id)" src="https://www.xzxskj.com/xcximg/icon_tupian@3x.png" style="height: 24rpx;width: 26rpx;" mode="aspectFill"></image>
											<!-- <text class="right" :style="{ color: item1.xznrcor===''?'#41AF6F':item1.xznrcor }">{{item1.xznr}}</text> -->
											<text class="right" :style="{ color: item1.xznrcor===''?'':item1.xznrcor }">{{item1.xznr}}</text>
										</view>
										<!-- item1.xznrcor -->
								   </view>
								</view>
					        </uni-collapse-item>
					    </uni-collapse>
					</view>
				</view>
			</view>
			
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="posterPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
				<view >
					<poster :infos="infos" :modelData="modelData" @openSellPoster="openSellPosterPannel" @close="handleClose" ></poster>
				</view>
			</uni-popup>
			
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="bargainingPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
				<bargainingPannel @close="handleClose" :id="param.id"></bargainingPannel>
			</uni-popup>
			
			<!-- <uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="posterPannelPopup" :safe-area="false" type="center" @close="handleClose" @change="change">
				<posterPannel v-if="showQualityPosterPannel" @close="handleClose" :infos="infos" :titleRemarl="titleRemarl" :modelData="modelData" :qualityinspection="qualityinspection"></posterPannel>
			</uni-popup> -->
			
			<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="productEditPricePopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
				<detailProductEditPrice :selectedGood="selectedGood" :combinationname="infos.combinationname" @reLoad="reLoad" v-if="showProductEditPrice" @close="handleClose"></detailProductEditPrice>
			</uni-popup>
			
		</view>
	</scroll-view>

	<!-- tabbar-bar -->
	<view class="shop-tabbar">
		<view class="shop-tabbar-t">
			<view class="shop-tabbar-t-card" @click="openPosterPannel">
				<image src="https://www.xzxskj.com/xcximg/icon_zhilian@3x.png" mode="aspectFit"></image>
				<text>下载质检报告</text>
			</view>
			<view class="shop-tabbar-t-card" @click="saveImages">
				<image src="https://www.xzxskj.com/xcximg/icon_xiazai@3x.png" mode="aspectFit"></image>
				<text>保存所有图片</text>
			</view>
			<view class="shop-tabbar-t-card">
				<image @click="showPosterPannel" src="https://www.xzxskj.com/xcximg/icon_haibao@3x.png" mode="aspectFit"></image>
				<text @click="showPosterPannel">生成销售海报</text>
			</view>
		</view>
		<view class="shop-tabbar-m"></view>
		<view class="shop-tabbar-b">
			<view class="shop-tabbar-b1">
				<uni-badge class="badge" size="small" text="" absolute="rightTop" type="error">
					<image src="https://www.xzxskj.com/xcximg/icon_kefu@3x.png" mode="aspectFit"></image>
				</uni-badge>
				<text>客服</text>
				<!-- <button class="cusService" open-type="contact" @contact="onContact" send-message-title="" send-message-path="'/pagesProductDetail/productDetail/productDetail?share=true&id='+param.value.id" show-message-card plain>联系客服</button> -->
				<button class="cusService" open-type="contact" @contact="onContact" send-message-title="" :send-message-path="'/pagesProductDetail/productDetail/productDetail?share=true&id=' + param.id" show-message-card plain>联系客服</button>

			</view>
			<view class="shop-tabbar-b2" @click="goPage('/pagesShopCar/shopCar/shopCar')">
				<uni-badge class="badge" size="small" :text="shopCarCount" absolute="rightTop" type="error">
					<image src="https://www.xzxskj.com/xcximg/icon_car@3x.png" mode="aspectFit"></image>
				</uni-badge>
				<text>购物车</text>
			</view>
			<view class="shop-tabbar-b3"  @click="addShop()">
				<text>加入购物车</text>
			</view>
			<!-- <view class="shop-tabbar-b4" @click="goPage('/pagesSubOrder/subOrder/subOrder')"> -->
			<view class="shop-tabbar-b4" @click="settlement">
				<text>立即购买</text>
			</view>
		</view>
	</view>
	<share v-if="shareShow" :posterPrice="posterPrice" :infos="shareInfo" :data="posterData" :qualityinspection="qualityinspection" :modelData="modelData" ref="sharePopup"  @closeSharePannel="closeSharePannel"></share>
	<posterPannel  ref="qualityPosterPopup" :infos="shareInfo" :titleRemarl="titleRemarl" :modelData="modelData" :qualityinspection="qualityinspection" ></posterPannel>
</template>

<script setup>
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
import { apiGetProductDetail } from '../api/api.js';
import { apigetShopCard } from '@/api/shopCard/shopCard.js';
import { copyText, previewImages, saveImagesToAlbum } from '../../utils/common.js';
import { computed, nextTick, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userInfoStore.js';
import { share } from './components/share.vue';
import { poster } from './components/poster.vue';
import { posterPannel } from './components/posterPannel.vue';
import { bargainingPannel } from './components/bargaining.vue';
import { detailProductEditPrice } from './components/detailProductEditPrice.vue';
import { apiAddShopCard } from '@/api/shopCard/shopCard.js';
const goPath = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const isShow = ref(false)
const beforeleave = () => {
  isShow.value = false;
  uni.reLaunch({
	url:'/pages/home/home'
  })
  // uni.showModal({
  //   content: '返回闲置新生首页',
  //   showCancel: true,
  //   success: (res) => {
  //     if (!res.cancel) {
		//   uni.reLaunch({
		//   	url:'/pages/home/home'
		//   })
  //     }
  //   }
  // });
};
const instance = getCurrentInstance();

const selectedMine = uni.getStorageSync('selectedMine');
const identityData = uni.getStorageSync('identityData');
const adminId = uni.getStorageSync('adminId');

const permissionStore = usePermissionStore();
const qualityPosterPopup = ref(null);
const posterPrice = ref('');
const shareInfo = ref(null);
const sharePopup = ref(null);
const showSellPoster = ref(false);
const showQualityPosterPannel = ref(false);
const showPannel = ref(false);
const productEditPricePopup = ref(null);
const showProductEditPrice = ref(false);
const posterPopup = ref(null);
const bargainingPopup = ref(null);
const editPricePopup = ref(null);
const selectedGood = ref();
const popup = ref(null);
const posterData = ref();
const shareShow = ref(false);
const param = ref({ id: "" });
const jbztycbg = ref([]);
const gnjcycbg = ref([]);
const wxjcycbg = ref([]);
const zjbg = ref([]);
const infos = ref(null);
const qualityinspection = ref([]);
const urls = ref([]);
const titleRemarl = ref('');
const shopCarCount = computed(() => useUserStore().shopCount);

const modelData = ref([
    { type: 'gjbbname', title: '国家版本', value: '无' },
    { type: 'wlbbname', title: '网络版本', value: '无' },
    { type: 'bxzt', title: '保修状态', value: '无' },
    { type: 'efficiency', title: '电池效率', value: '无' },
    { type: 'delivery', title: '发货地', value: '无' }
]);

const showSetting = computed(() => usePermissionStore().hasMenuAuthority('updategoods') && adminId !== '');
const mineCompany = computed(() => {
    if (adminId && selectedMine && identityData) {
        const selectedIdentity = identityData[selectedMine];
        return selectedIdentity ? infos.value.gsid === selectedIdentity.gsid : false;
    }
    return false;
});

const handleClose = () => {
    posterPopup.value?.close();
    bargainingPopup.value?.close();
    editPricePopup.value?.close();
    productEditPricePopup.value?.close();
};

const change = (e) => {
    showPannel.value = e.show;
    if (!e.show) {
        showSellPoster.value = false;
        showQualityPosterPannel.value = false;
        showProductEditPrice.value = false;
    }
};

const showPosterPannel = () => posterPopup.value?.open();
const showbBargaining = () => bargainingPopup.value?.open();
const showEditPrice = () => {
    editPricePopup.value?.open();
    handleDataRendered();
};

const openSellPosterPannel = async (data) => {
    posterData.value = data;
    shareInfo.value = infos.value;
    shareShow.value = true;
    await nextTick();
    setTimeout(() => {
        sharePopup.value?.handleShow();
    }, 1000);
    posterPopup.value?.close();
};

const closeSharePannel = () => shareShow.value = false;

const openPosterPannel = () => {
    shareInfo.value = infos.value;
    qualityPosterPopup.value?.posterShow();
};

const openEditPannel = (goodData) => {
    selectedGood.value = goodData;
    showProductEditPrice.value = true;
    productEditPricePopup.value?.open();
};

const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

const handleDataRendered = () => nextTick(() => editPricePopup.value?.resize());

const showImage = (id) => zjbg.value.some(item => item.id === id);

const preview = (id) => {
    const images = zjbg.value.map(item => item.url);
    const index = zjbg.value.findIndex(item => item.id === id);
    uni.previewImage({ current: index, urls: images });
};

const getProductDetail = async (param) => {
	
	try{
		uni.showLoading({
		  title: '加载中...', 
		});
		
		const res = await apiGetProductDetail({ id: param.value.id });
		if (res.code === '200') {
			
			// instance.proxy.shareData({
			// 	imageUrl: (res.infos.productimage.endsWith(',') ? res.infos.productimage.slice(0, -1) : res.infos.productimage).split(',')[0]
			// });
		    infos.value = res.infos;
		    jbztycbg.value = infos.value.jbztycbg ? JSON.parse(infos.value.jbztycbg) : [];
		    gnjcycbg.value = infos.value.gnjcycbg ? JSON.parse(infos.value.gnjcycbg) : [];
		    wxjcycbg.value = infos.value.wxjcycbg ? JSON.parse(infos.value.wxjcycbg) : [];
		    zjbg.value = [...jbztycbg.value, ...gnjcycbg.value, ...wxjcycbg.value].map(item => ({ id: item.id, url: item.url }));
		
		    const currentDate = new Date();
		    currentDate.setHours(0, 0, 0, 0);
		    // qualityinspection.value = res.infos.qualityinspection.map(item => {
		    //     item.er.forEach(item1 => {
		    //         if (item1.name === '保修截止') {
		    //             item1.xznr = new Date(infos.value.bxsj) < currentDate ? infos.value.bxzt : infos.value.bxsj;
		    //             item1.xznrcor = '';
		    //         }
		    //     });
		    //     return item;
		    // });
		
			qualityinspection.value = res.infos.qualityinspection
			    .map(item => {
			        item.er = item.er.filter(item1 => item1.name !== '液晶显示');
			        item.er.forEach(item1 => {
			            if (item1.name === '保修截止') {
			                item1.xznr = new Date(infos.value.bxsj) < currentDate ? infos.value.bxzt : infos.value.bxsj;	
			                item1.xznrcor = '';  // 修改 xznrcor 逻辑
			            }
			        });
			        return item;
			    });


		
		    const { yjxsimg, jswgimg, pmwgimg } = infos.value;
		    urls.value = [
		        { imgs: jswgimg.split(',') },
		        { imgs: pmwgimg.split(',') },
		        { imgs: yjxsimg.split(',') }
		    ];
		    if (res.yjinfos) {
		        infos.value.combinationid.push(res.yjinfos.qminfos);
		        infos.value.combinationname.push(res.yjinfos.name);
		        infos.value.combinationyslist.push(res.yjinfos.color);
		    }
		
		    modelData.value = modelData.value.map(item => ({
		        ...item,
		        value: res.infos[item.type] || '无'
		    }));
		
		    titleRemarl.value = [infos.value.jkbz, infos.value.gnjcbz, infos.value.wxjcbz, infos.value.pzbz, infos.value.csbz].join(' ');
		}
		
	}catch (error){
		console.error('获取数据失败', error);
		uni.showToast({
		  title: '加载失败',
		  icon: 'none'
		});
	}finally{
		uni.hideLoading();
	}
};

const onContact = (e) => {
	console.log(e)
	// uni.navigateBack()
	// uni.navigateTo({
	// 	url:'/pagesProductDetail/productDetail/productDetail?share=true&id='+param.value.id
	// })
};

const addShop = async () => {
    const res = await apiAddShopCard({
        opid: uni.getStorageSync('sessionInfo').opid,
        goodsid: infos.value.id
    });

    if (res.code === '200') {
        uni.showToast({ title: '成功加入购物车', icon: 'success' });
        useUserStore().shopCount++;
    } else {
        uni.showToast({ title: '购物车已存在相同商品', icon: 'none' });
    }
};

const settlement = async () => {
    await addShop();
    const queryString = encodeURIComponent(JSON.stringify({ lx: '2', id: param.value.id }));
    uni.navigateTo({ url: `/pagesSubOrder/subOrder/subOrder?data=${queryString}` });
};

const goPage = (path)=>{
	uni.navigateTo({
		url:path
	})
}
const previewQualityInspection = (urls,url)=>previewImages( urls , url )

const shareImage = (url) => previewImages((infos.value.productimage.endsWith(',') ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(','), url);

const saveImages = () => saveImagesToAlbum((infos.value.productimage.endsWith(',') ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(','));

const reLoad = () => getProductDetail(param);

onLoad(async(options) => {
    if (options.id) param.value.id = options.id;
    await getProductDetail(param);
	if(options.share) isShow.value = true
	
	instance.proxy.setShareOptions({
	  title: infos.value?infos.value.name:'',
	  imageUrl: (infos.value.productimage.endsWith(',') ? infos.value.productimage.slice(0, -1) : infos.value.productimage).split(',')[0],
	  sharePath: '/pagesProductDetail/productDetail/productDetail?share=true&id='+param.value.id
	});
	
});

onShow(async () => {
    await useUserStore().refreshShopCarCount();
    permissionStore.loadMenuAuthority();
	await getProductDetail(param);
});

</script>


<style lang="scss" scoped>
.shop-tabbar {
	// margin-top: 20rpx;
	z-index: 10;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	width: 750rpx;
	height: 256rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	padding-top: 24rpx;
	.shop-tabbar-t {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 46rpx;
		padding: 0rpx 20rpx;
		.shop-tabbar-t-card {
			height: 46rpx;
			width: 210rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #f3f2f6;
			border-radius: 24rpx 24rpx 24rpx 24rpx;
			opacity: 0.8;
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
			}
		}
	}
	.shop-tabbar-m {
		width: 710rpx;
		height: 2rpx;
		background: #f3f2f6;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		margin-top: 18rpx;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	.shop-tabbar-b {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		// border: 1rpx solid black;
		.shop-tabbar-b1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.cusService{
				// border: 1rpx solid red;
				// height: 128rpx;
				// width: 345rpx;
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				border-radius: 20rpx;
				opacity: 0;
			}
			image {
				width: 44rpx;
				height: 44rpx;
			}
			text {
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
			}
		}
		.shop-tabbar-b2 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-left: 40rpx;
			image {
				width: 44rpx;
				height: 44rpx;
			}
			text {
				height: 28rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 20rpx;
				color: #1F1F1F;
			}
		}
		.shop-tabbar-b3 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 192rpx;
			height: 84rpx;
			background: #ffe6dc;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			margin-left: 40rpx;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #e6432e;
			}
		}
		.shop-tabbar-b4 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 304rpx;
			height: 84rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			text {
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
}

.layout {
	view,
	swiper,
	swiper-item {
		box-sizing: border-box;
	}
	height: 100vh;
	background: #f3f2f6;

	.basic-container {
	    margin-top: 20rpx;
	   // width: 670rpx;
	    width: 690rpx;
	    background: transparent; 
	    border-radius: 20rpx;
	    overflow: hidden;
	    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); 
		.basic-collapse {
		    background-color: #FFFFFF; 
			
			.co-header{
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 24rpx;
				color: #1F1F1F;
			}
			.co-foot{
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 24rpx;
				color: #ED784B;
				
			}
			.divile{
				width: 710rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
			}
			.content{
				padding:20rpx 24rpx 3rpx  24rpx;
				.card{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.left{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						line-height: 30rpx;
					}
					.right{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						// color: #41AF6F;
					}
				}
			}
		}
	}
	.editPrice{
		box-sizing: border-box;
		width: 750rpx;
		height: 1150rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding-top: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		.title{
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 60rpx;
			
			text{
				height: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 36rpx;
				color: #1F1F1F;
			}
			image{
				height: 32rpx;
				width: 32rpx;
			}
		}
		.product-card-list {
			box-sizing: border-box;
			margin-top: 20rpx;
			height: 238rpx;
			width: 690rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.06);
			padding: 24rpx 24rpx;
			margin-bottom: 20rpx;
			.product-card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				.product-card-l {
					margin-right: 26rpx;
					// border: 2rpx solid red;
					border: 18rpx;
					image {
						height: 190rpx;
						width: 190rpx;
					}
				}
				.product-card-r {
					// border: 2rpx solid red;
					display: flex;
					flex-direction: column;
					.top {
						display: inline-block;
						.top-tap {
							float: left;
							height: 40rpx;
							width: 64rpx;
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
						}
					}
					.bottom {
						margin-top: 30rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.bottom-l {
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
							}
							.bottom3 {
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #1f1f1f;
							}
						}
						.bottom-r {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 22rpx;
							color: #1f1f1f;
						}
					}
				}
			}
		}
		.edit-price{
			width: 690rpx;
			height: 202rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-top: 24rpx;
			margin-bottom: 20rpx;
			.title{
				margin-bottom: 36rpx;
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.content{
				margin-bottom: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					// border: 1rpx solid red;
					margin-right: 20rpx;
					height: 50rpx;
					width: 22rpx;
				}
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					opacity: 0.6;
				}
			}
			.divile{
				width: 630rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
			}
		}
		.chengSeCard{
			box-sizing: border-box;
			width: 690rpx;
			height: 100rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 24rpx;
			padding-right: 24rpx;
			margin-bottom: 20rpx;
			.left{
				text{
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.right{
				text{
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #1F1F1F;
				}
			}
			
		}
		.collapseCard{
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			.collapse{
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
			}
			.co-header{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				margin-left: -4rpx;
			}
			.co-foot{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
				opacity: 0.7;
			}
			.divile{
				width: 690rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-bottom: 24rpx;
			}
			.content{
				width: 690rpx;
				background: #FFFFFF;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: grid;
				justify-content: center;
				grid-template-columns: auto auto;
				.card{
					margin-left: 8rpx;
					margin-right: 8rpx;
					margin-bottom: 10rpx;
					width: 314rpx;
					height: 64rpx;
					background: #F9F9F9;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.card-text.clicked-text {
					   height: 34rpx;
					   font-family: PingFang SC, PingFang SC;
					   font-weight: 400;
					   font-size: 24rpx;
					   color: #EB4636;
					  }
					.card-text{
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
					}
					 &.clicked {
						  background-color: #FFEEEC;
					}
				}
			}
		}
	
	}
	.fill{
		height: 182rpx;
		background: #FFFFFF;
	}
	.pannel-btn{
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 24rpx;
		padding-bottom: 62rpx;
		.btn1{
			width: 232rpx;
			height: 96rpx;
			background: #F2F3F6;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
			}
		}
		.btn2{
			width: 444rpx;
			height: 96rpx;
			background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
	}
	


	.banner {
		height: 60%;
		width: 750rpx;
		swiper {
			width: 750rpx;
			height: 100%;
			&-item {
				width: 100%;
				height: 100%;
				.banner-image {
					width: 100%;
					height: 100%;
					// border-radius: 10rpx;
					box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.2);
					// border-radius: 20rpx;
				}
				// .banner-image:last-child{margin-top: 22rpx;}
			}
		}
	}
	.layout-m {
		position: relative;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		background: #f3f2f6;
		margin-top: -20rpx;
		padding: 15rpx 20rpx;
		.layout-m-1 {
			// width: 690rpx;
			width: 710rpx;
			height: 240rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			padding: 24rpx 24rpx;
			.m-1-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.top-l {
					display: flex;
					justify-content: center;
					align-items: center;
					.top-t1 {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 24rpx;
						color: #e6432e;
					}
					.top-t2 {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 58rpx;
						font-family: DIN, DIN;
						font-weight: bold;
						font-size: 48rpx;
						color: #eb4636;
						margin-right: 16rpx;
					}
					.top-tap {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 96rpx;
						height: 36rpx;
						background: linear-gradient(180deg, #ed784b 0%, #eb4636 100%);
						border-radius: 8rpx 8rpx 8rpx 8rpx;
						text {
							height: 28rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 20rpx;
							color: #ffffff;
						}
					}
				}
				.top-r {
				}
			}
			.m-1-bottom {
				// border: 1rpx solid red;
				height: 100rpx;
				margin-top: 30rpx;
				position: relative;
				text {
					// border: 1rpx solid yellow;
					// height: 104rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.m-1-bottom-btn {
					// float: right;
					position: absolute;
					right: 0;
					bottom: 0;
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 28rpx;
						color: #eb4636;
						margin-right: 10rpx;
					}
					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
	}
	.suxing {
		margin-top: 20rpx;
		// width: 690rpx;
		width: 710rpx;
		height: 122rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.suxing-card {
			width: 142rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-right: 2rpx solid #eeeeee;
			.suxing-card1 {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
				opacity: 0.4;
			}
			.suxing-card2 {
			
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1F1F1F;
			}
		}
		.suxing-card:last-child{border: none;}
	}
	
	.new-person{
		margin-top: 20rpx;
		// width: 690rpx;
		width: 710rpx;
		height: 96rpx;
		// background: linear-gradient(314deg, #3d3d3d 0%, #5b5b5b 100%);
		background-image: url('https://www.xzxskj.com/Public/upload/662f34185a8de8776.png');
		background-position: center;
		// background-size: cover;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		padding-left: 8rpx;
		padding-right: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.col1{
			display: flex;
			align-items: center;
			.img{
				width: 80rpx;
				height: 80rpx;
				background: #000000;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				opacity: 0.57;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 16rpx;
				image{
					height: 36rpx;
					width: 36rpx;
				}
			}
			.content{
				display: flex;
				flex-direction: column;
				justify-content: center;
				.row1{
					text{
						height: 44rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 32rpx;
						color: #FFFFFF;
						text-align: left;
						margin-right: 16rpx;
					}
				}
				.row2{
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #FFFFFF;
						text-align: left;
						opacity: 0.6;
					}
				}
			}
			
		}
		.col2{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text {
				
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #ffffff;
				margin-right: 10rpx;
			}
			image {
				height: 20rpx;
				width: 20rpx;
			}
		}
	}
	.taps {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// width: 690rpx;
		width: 710rpx;
		margin-top: 30rpx;
		.tap-card {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 46rpx;
			background: #ffffff;
			border-radius: 24rpx 24rpx 24rpx 24rpx;
			opacity: 0.8;
			padding: 0 12rpx;
			text {
				height: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #1f1f1f;
			}
			image {
				height: 32rpx;
				width: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
	.maintenance {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30rpx;
		padding: 20rpx 10rpx;
		width: 710rpx;
		background-image: url('https://www.xzxskj.com/Public/upload/661232e0059462123.png');
		background-position: center;
		background-size: cover;
		border-radius: 20rpx;
		
		.maintenance-title {
			
			width: 690rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.maintenance-title-l {
				display: flex;
				flex-direction: column;
				.title-l-top {
					text {
						height: 66rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 48rpx;
						color: #1f1f1f;
					}
				}
				.title-l-bottom {
					// border: 2rpx solid red;
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					image {
						height: 64rpx;
						width: 64rpx;
					}
					.person-info {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.person-info1 {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1F1F1F;
							opacity: 0.4;
						}
						.person-info2 {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1F1F1F;
						}
					}
				}
			}
			.maintenance-title-r {
				image {
					height: 200rpx;
					width: 200rpx;
				}
			}
		}

		.maintenance-card1 {
			// width: 670rpx;
			width: 690rpx;
			// height: 328rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); 
			display: flex;
			flex-direction: column;
			padding: 10rpx 24rpx;
			// align-items: center;
			.maintenance-card1-info1 {
				display: flex;
				flex-direction: column;
				.info-title {
					text {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
				}
				.info-content1 {
					margin-top: 16rpx;
					display: flex;
					align-items: center;
					.info-content1-image{
						// border: 1rpx solid black;
						width: 150rpx;
						image {
							margin-left: 16rpx;
							height: 20rpx;
							width: 20rpx;
						}
					}
					.info-bottom {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						opacity: 0.5;
						margin-top: 5rpx;
					}
					
				}
				.info-content2 {
					text {
						height: 76rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #1F1F1F;
					}
					image {
						height: 20rpx;
						width: 20rpx;
					}
				}
			}
			.info-divile {
				width: 100%;
				height: 4rpx;
				background: #f3f2f6;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-top: 14rpx;
				margin-bottom: 14rpx;
			}
			.maintenance-card1-info2 {
				display: flex;
				flex-direction: column;
				.info-title {
					width: 120rpx;
					// height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #1f1f1f;
				}
				.info-content2 {
					margin-top: 16rpx;
					// height: 76rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					opacity: 0.7;
				}
			}
		}

		.appearance-card {
			// width: 670rpx;
			width: 690rpx;
			// height: 274rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); 
			margin-top: 20rpx;
			padding: 24rpx 24rpx;
			.top {
				text {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #1f1f1f;
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.bottom-l {
					// border: 2rpx solid red;
					width: 100%;
					.bottom-l-1 {
						margin-top: 15rpx;
						margin-bottom: 20rpx;
						.text-1 {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1f1f1f;
						}
						.text-2 {
							width: 96rpx;
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #ed784b;
							margin-left: 20rpx;
						}
					}
					.bottom-l-2 {
						margin-bottom: 20rpx;
						.text-1 {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1f1f1f;
						}
						.text-2 {
							width: 96rpx;
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #ed784b;
							margin-left: 20rpx;
						}
					}
					.bottom-l-3 {
						.text-1 {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1f1f1f;
						}
						.text-2 {
							width: 96rpx;
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #ed784b;
							margin-left: 20rpx;
						}
					}
				}

				.bottom-r {
					width: 50%;
					display: flex;
					justify-content: flex-end;
					.bottom-r-images {
						border: 2rpx solid red;
						width: 106rpx;
						height: 106rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						// .top {
						// 	display: flex;
						// 	margin-bottom: 10rpx;
						// 	.images1 {
						// 		height: 48rpx;
						// 		height: 48rpx;
						// 		margin-right: 10rpx;
						// 	}
						// 	.images2 {
						// 		height: 48rpx;
						// 		height: 48rpx;
						// 	}
						// }
						// .bottom {
						// 	display: flex;
						// 	.images1 {
						// 		height: 48rpx;
						// 		height: 48rpx;
						// 		margin-right: 10rpx;
						// 	}
						// 	.images2 {
						// 		height: 48rpx;
						// 		height: 48rpx;
						// 	}
						// }
					}
				}
			}
		}

		.basic-info {
			margin-top: 20rpx;
			// width: 670rpx;
			width: 690rpx;
			height: 100rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-top: 28rpx;
			padding-bottom: 24rpx;
			// display: flex;
			// align-items: center;
			.title-tap {
				width: 610rpx;
				display: flex;
				justify-content: space-between;
				.title-tap1 {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #1f1f1f;
					margin-left: 24rpx;
				}
				.title-tap2 {
					height: 34rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #36ab66;
					margin-right: 10rpx;
				}
			}
			.divile {
				width: 670rpx;
				height: 2rpx;
				background: #eeeeee;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin-top: 10rpx;
			}
			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.content-list {
					padding: 10rpx 24rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 12rpx;
					margin-top: 12rpx;
					.text-1 {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1f1f1f;
					}
					.text-2 {
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #41af6f;
					}
					.info {
						display: flex;
						justify-content: center;
						align-items: center;
						image {
							height: 24rpx;
							width: 24rpx;
							margin-right: 2rpx;
						}
						text {
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #ed784b;
						}
					}
				}
			}
		}
	}

}
.box-r {
	padding-top: 32rpx;
	padding-bottom: 14rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	width: 710rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.top{
		width: 100%;
		.title {
			width: 100%;
			display: inline-block;
			.tap {
				float: left;
				margin-right: 10rpx;
			}
			text {
				vertical-align: top;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #1F1F1F;
				// text-align: justify;
				// word-break: break-all;
				// text-justify: auto;
			}
		}
		// .mind {
		//   margin-top: 5rpx;
		//   margin-bottom: 5rpx;
		//   white-space: nowrap;
		//   overflow: hidden;
		//   text-overflow: ellipsis;
		// }

		// .mind {
		// 	margin-top: 5rpx;
		// 	margin-bottom: 5rpx;
		// }
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.text-info{
			.text-1 {
				height: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #1f1f1f;
			}
			.text-2 {
				height: 38rpx;
				font-family: DIN, DIN;
				font-weight: bold;
				font-size: 32rpx;
				color: #e6432e;
			}
			.text-3 {
				height: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #1f1f1f;
			}
		}
		.other-tap{
			height: 36rpx;
			width: 78rpx;	
			display: flex;
			justify-content: center;
			align-items: center;
			// width: 78rpx;
			height: 36rpx;
			background: linear-gradient( 180deg, #ED784B 0%, #EB4636 100%);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			text{
				width: 66rpx;
				height: 32rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #FFFFFF;
			}
		}
	}
}
.image-tap {
	margin-top: 6rpx;
	margin-left: 6rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8rpx;
	background: linear-gradient(180deg, #ed784b 0%, #eb4636 100%);
	width: 96rpx;
	height: 36rpx;
	text {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 20rpx;
		color: #ffffff;
	}
}
</style>
