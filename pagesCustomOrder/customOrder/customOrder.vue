<template>
	<view class="customOrder-layout">
		<!-- header -->
		<custom-header>
			<template #name>{{title}}</template>
			<template #fill>订单</template>
		</custom-header>
		
		<view class="search-fill" style="height: 90rpx; background: #f3f2f6; width: 100%">
			<!-- <view class="search" :style="{width:title==='先货后款':'750rpx':'618rpx'}"> -->
			<view class="search" :style="{width: title !== '先货后款' ? '750rpx' : '640rpx'}">
				<view class="searchBar">
					<view class="search-content">
						<image style="height: 30rpx; width: 30rpx" class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
						<view class="selectDownUp">
							<qiaoSelect
								:keyId="1"
								:dataList="orgArray"
								phText="请输入串号"
								searchKey="name"
								:showBorder="false"
								:disabled="false"
								:searchKey="searchModelKey"
								:showField="showModelField"
								@input="handleInput"
								@change="selectChange"
								ref="myInputRef"
							></qiaoSelect>
						</view>
					</view>
					<view  class="right" >
						<view class="inline" />
						<image style="width: 30rpx; height: 30rpx" src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFit" @click="scan"></image>
					</view>
				</view>
			</view>
			
			<view v-if="title==='先货后款'" class="image-right" @click="openSaiXuan">
				<image src="https://www.xzxskj.com/Public/upload/66cbadd5e6c0e6908.png" mode="aspectFill"></image>
			</view>
			
		</view>
		
		<!-- <uv-sticky :zIndex="2" :offset-top="getStatusBarHeight() + getTitleBarHeight()"> -->
		<!-- tabs -->
			<view class="tabs">
				<uv-tabs
					:list="tabsData"
					lineWidth="30" 
					lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)" 
					lineHeight="3"
					:fontSize="28"
					:inactiveStyle="{
						color: '#1F1F1F'
					}"
					:activeStyle="{ color: '#E6432E', fontWeight: 'bold',fontSize:32 }"
					@change="uvTabs1Change"
					:current="activeTab1Index"
				></uv-tabs>
			</view>
		<!-- </uv-sticky> -->
		
		<!-- style="background-color: #f3f3f3;height: 1100rpx;width: 100%;" -->
		<view :style="{ backgroundColor: '#f3f3f3', height: computedHeight, width: '100%' }">
			<z-paging
			  ref="paging"
			  show-refresher-update-time
			  :fixed="false"
			  :default-page-size = "20"
			  v-model="dataList"
			  @query="queryList"
			>
			<view class="card" v-if="orderList.length>0&&orderType==='custom'&&tabsData[activeTab1Index].name!=='待发货'" v-for="(item,index) in orderList" :key="index">
				<view class="top" @click.stop="goDetail(item,'custom')">
					<view class="left">
						<text class="text-1">订单号:  </text>
						<text class="text-2">{{item.ordernumber}}</text>
						<image class="right-image" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<view class="right">
						<text>{{tabsData[activeTab1Index].name}}</text>
						<view class="count" v-if="tabsData[activeTab1Index].name==='议价待确认'">
							<uv-count-down :time="30*1000*1000" format="HH:mm:ss"/>
						</view>
					</view>
				</view>
				<view class="content" v-for="(item1,index) in item.goodsinfos" :key="index" >
					<view class="left" @click.stop="goDetail(item,'custom')">
						<van-image width="95" height="95" fit="fill" radius="18rpx" :src="item1.goodsinfos.cover">
						  <template v-slot:error>加载失败</template>
						  <van-loading slot="loading" type="spinner" size="20" vertical />
						</van-image>
					</view>
					<view class="right" style="height: 190rpx">
						<view class="top">
							<view class="top-tap" v-if="item1.goodsinfos.finenessname">
								<text class="top-tap-text">{{item1.goodsinfos.finenessname}}</text>
							</view>
							<view style="{clear:both}"/>
							<text class="top-text">{{item1.goodsinfos.name}}</text>
						</view>
						<view class="imei">
							<text>IMEI：{{item1.goodsinfos.ch}}</text>
							<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						<view class="bottom" style="display: flex;justify-content: space-between; align-items: center">
							<view style="display: flex; align-items: center;">
								<text class="text-1">{{(orderType==='yj'||item.ddlx==='2')?'议价:':'批发价:'}}</text>
								<text class="text-2">￥</text>
								<text class="text-3">{{item1.goodsinfos.price}}</text>
								<van-tag style="margin-left: 10rpx;"  size="mini" plain text-color="#EB4636">{{expressText.find(express=>express.id === item.expressid).text}}</van-tag>
							</view>
							<uni-icons v-if="tabsData[activeTab1Index].name==='待付款'&&!selectedItems.includes(item1)" color="#D2CFCA" type="circle" size="32" @click="toggleSelectItem(item1)"></uni-icons>
							<uni-icons v-if="tabsData[activeTab1Index].name==='待付款'&&selectedItems.includes(item1)"  color="#E6432E" type="checkbox-filled" size="32" @click="toggleSelectItem(item1)"></uni-icons>
						</view>
					</view>
				</view>
				<view class="btns" v-if="getBtns('custom',tabsData[activeTab1Index].lx).length>0">
					<view style="display: flex;align-items: center;">
						<text  v-if="item.khxx" style="color: blue;">客户:{{item.khxx.name +" "+ item.khxx.phone}}</text>
					</view>
					 <view class="btn" v-for="(btn, btnIndex) in getBtns('custom',tabsData[activeTab1Index].lx)" :key="btnIndex" @click="handleBtnClick(btn,item)" :class="btnClass(btn)">
						 <text>{{ btn }}</text>
					 </view>
				</view>
			</view>
			
			<view class="card" v-if="orderList.length>0&&orderType==='custom'&&tabsData[activeTab1Index].name==='待发货'" v-for="(item,index) in orderList" :key="index">
				<view v-for="(item3,index3) in item.orders" :key="index3">
					<view class="top" @click.stop="goDetail(item3,'custom')">
						<view class="left">
							<text class="text-1">订单号:  </text>
							<text class="text-2">{{item3.ordernumber}}</text>
							<image class="right-image" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						<view class="right">
							<text>{{tabsData[activeTab1Index].name}}</text>
							<!-- <view class="count" v-if="tabsData[activeTab1Index].name==='议价待确认'">
								<uv-count-down :time="30*1000*1000" format="HH:mm:ss"/>
							</view> -->
						</view>
					</view>
					<view class="content" v-for="(item1,index) in item3.goodsinfos" :key="index" >
						<view class="left" @click.stop="goDetail(item3,'custom')">
							<van-image width="95" height="95" fit="fill" radius="18rpx" :src="item1.goodsinfos.cover">
							  <template v-slot:error>加载失败</template>
							  <van-loading slot="loading" type="spinner" size="20" vertical />
							</van-image>
						</view>
						<view class="right" style="height: 190rpx">
							<view class="top">
								<view class="top-tap" v-if="item1.goodsinfos.finenessname">
									<text class="top-tap-text">{{item1.goodsinfos.finenessname}}</text>
								</view>
								<view style="{clear:both}"/>
								<text class="top-text">{{item1.goodsinfos.name}}</text>
							</view>
							<view class="imei">
								<text>IMEI：{{item1.goodsinfos.ch}}</text>
								<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
							</view>
							<!-- <view class="bottom">
								<text class="text-1">{{orderType==='yj'?'议价:':'批发价:'}}</text>
								<text class="text-2">￥</text>
								<text class="text-3">{{item.price}}</text>
								<view class="original-price" v-if="orderType==='yj'">
									<text>原价:</text>
									<text>￥{{item.goodsinfos.price}}</text>
									<view class="divil">
									</view>
								</view>
							</view> -->
							
							<view class="bottom" style="display: flex;justify-content: space-between; align-items: center">
								<view style="display: flex; align-items: center;">
									<text class="text-1">{{orderType==='yj'?'议价:':'批发价:'}}</text>
									<text class="text-2">￥</text>
									<text class="text-3">{{item1.goodsinfos.price}}</text>
									<!-- {{item1.ddlx}} -->
									<view class="original-price" v-if="item3.ddlx==='2'">
										<text>议价:</text>
										<text>￥{{item3.price}}</text>
										<view class="divil">
										</view>
									</view>
									<van-tag style="margin-left: 10rpx;"  size="mini" plain text-color="#EB4636">{{expressText.find(express=>express.id === item3.expressid).text}}</van-tag>
									
									
									<!-- <text class="text-1">{{(orderType==='yj'||item.ddlx==='2')?'议价:':'批发价:'}}</text> -->
									<!-- <text class="text-1">{{'批发价:'}}</text>
									<text class="text-2">￥</text>
									<text class="text-3">{{item1.goodsinfos.price}}</text>
									<text style="">{{item.price}}</text>
									<van-tag style="margin-left: 10rpx;"  size="mini" plain text-color="#EB4636">{{expressText.find(express=>express.id === item3.expressid).text}}</van-tag> -->
								</view>
								<uni-icons v-if="tabsData[activeTab1Index].name==='待付款'&&!selectedItems.includes(item1)" color="#D2CFCA" type="circle" size="32" @click="toggleSelectItem(item1)"></uni-icons>
								<uni-icons v-if="tabsData[activeTab1Index].name==='待付款'&&selectedItems.includes(item1)"  color="#E6432E" type="checkbox-filled" size="32" @click="toggleSelectItem(item1)"></uni-icons>
							</view>
						</view>
					</view>
					
				</view>
				<view class="btns" v-if="getBtns('custom',tabsData[activeTab1Index].lx).length>0">
					<view style="display: flex;align-items: center;">
						<text  v-if="item.khxx" style="color: blue;">客户:{{item.khxx.name +" "+ item.khxx.phone}}</text>
					</view>
					 <view class="btn" v-for="(btn, btnIndex) in getBtns('custom',tabsData[activeTab1Index].lx)" :key="btnIndex" @click="handleBtnClick(btn,item)" :class="btnClass(btn)">
						 <text>{{ btn }}</text>
					 </view>
				</view>
			</view>
			
			<!-- 议价订单 -->
			<view class="card" v-if="orderList.length>0&&orderType==='yj'" v-for="(item,index) in orderList" :key="index" >
				<view class="top" @click.stop="goDetail(item,'yj')">
					<view class="left">
						<text class="text-1">订单号:  </text>
						<text class="text-2">{{item.ordernumber}}</text>
						<image class="right-image" src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
					</view>
					<!-- <view class="right" style="display: flex;align-items: center;">
						<text>{{tabsData[activeTab1Index].name}}</text>
						<view class="count" v-if="tabsData[activeTab1Index].name==='议价待确认'">
							<uv-count-down v-if="item.lx==='1'" :time="getRemainingTime(item.pay_time,item.bargainingtimename)" format="HH:mm:ss"/>
						</view>
					</view> -->
					<view class="right" style="display: flex; align-items: center;">
					  <text>{{ tabsData[activeTab1Index].name }}</text>
					  <view class="count" v-if="tabsData[activeTab1Index].name === '议价待确认'">
					    <template v-if="getRemainingTime(item.pay_time, item.bargainingtimename) === '已结束'">
					      <text>已结束</text>
					    </template>
					    <uv-count-down v-else-if="item.lx === '1'" 
						   :time="getRemainingTime(item.pay_time, item.bargainingtimename)" 
						   format="HH:mm:ss"/>
					  </view>
					</view>

				</view>
				<view class="content" @click.stop="goDetail(item,'yj')">
					<view class="left">
						<van-image width="190rpx" height="190rpx" radius="18rpx" fit="fill" :src="item.goodsinfos.cover">
						  <template v-slot:error>加载失败</template>
						</van-image>
					</view>
					<view class="right">
						<view class="top">
							<view class="top-tap" v-if="item.goodsinfos.finenessname">
								<text class="top-tap-text">{{item.goodsinfos.finenessname}}</text>
							</view>
							<view style="{clear:both}"/>
							<text class="top-text">{{item.goodsinfos.name}}</text>
						</view>
						<view class="imei">
							<text>IMEI：{{item.goodsinfos.ch}}</text>
							<image src="https://www.xzxskj.com/xcximg/icon_copy@3x.png" mode="aspectFill"></image>
						</view>
						
						<view class="bottom">
							<text class="text-1">{{orderType==='yj'?'议价:':'批发价:'}}</text>
							<text class="text-2">￥</text>
							<text class="text-3">{{item.price}}</text>
							<view class="original-price" v-if="orderType==='yj'">
								<text>原价:</text>
								<text>￥{{item.goodsinfos.price}}</text>
								<view class="divil">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btns" v-if="item.zt==='2'">
					
					 <view class="btn" v-for="(btn, btnIndex) in getBtns('yj',tabsData[activeTab1Index].lx)" :key="btnIndex" @click="handleBtnClick(btn,item)" :class="btnClass(btn)">
						 <text>{{ btn }}</text>
					 </view>
				</view>
			</view>
			<!-- 普通订单 -->
			<!-- <view style="margin-left: 20rpx;" v-if="orderList.length>0&&orderType==='custom'" >
				<fpakCard ref="fpakCardRef" @goDetail="goDetail" :orderList="dataList" @update:selectedItems="updateSelectedItems"></fpakCard>
			</view> -->
			
			<!-- 先货后款 -->
			<view style="margin-left: 20rpx;" v-if="orderType==='fpak'" >
				<fpakCard ref="fpakCardRef" @goDetail="goDetail" :orderList="dataList" @update:selectedItems="updateSelectedItems"></fpakCard>
			</view>
			
			<!-- 售后订单  @goDetail="goDetail(orderList,'sh')" -->  
			<view style="margin-left: 20rpx;" v-if="orderList.length>0&&orderType==='sh'" >
				<serviceCard @goDetail="goDetail" :orderList="dataList"></serviceCard>
			</view>
			</z-paging>
		</view>
		
		
		<view style="height: 258rpx;" v-if="tabsData[activeTab1Index].name==='待付款'||tabsData[activeTab1Index].name==='等待确认议价'||tabsData[activeTab1Index].name==='未收款'"/>
		<!-- btn -->
		<view class="bottom-btn" v-if="tabsData[activeTab1Index].name==='待付款'||tabsData[activeTab1Index].name==='等待确认议价'">
			<view class="top">
				<view class="left">
					<view class="text-1">
						<text class="text-class-1">数量:</text>
						<text class="text-class-2">{{selectedItemCount}}</text>
						<text class="text-class-1">台</text>
					</view>
					
					<view class="text-1">
						<text class="text-class-1">合计:</text>
						<text class="text-class-2">￥{{totalSelectedPrice}}</text>
					</view>
				</view>
				<view class="right" @click="toggleSelectAll">
					<view >
						<view v-if="!isAllSelected" class="circular" style="width: 32rpx;
						height: 32rpx;
						border-radius: 18rpx;
						border: 2rpx solid #D2CFCA;"/>
						<image v-else style="height: 32rpx; width: 32rpx;border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
					</view>
					<text>全选</text>
				</view>
			</view>
			<view class="content" v-if="tabsData[activeTab1Index].name==='待付款'">
				<view class="center-btn" @click="patchGoFpak">
					<text style="color: #FFFFFF;">批量先货后款</text>
				</view>
				
			</view>
			
			<!-- <view class="content" v-if="tabsData[activeTab1Index].name==='待发货'">
				<view class="center-btn">
					<text style="color: #FFFFFF;">批量发货</text>
				</view>
			</view> -->
			
			<view class="content" v-if="tabsData[activeTab1Index].name==='等待确认议价'">
				<view class="left-btn">
					<text>驳回议价</text>
				</view>
				<view class="right-btn">
					<text>确认议价</text>
				</view>
			</view>
			
		</view>
		
		<!-- 先货后款btn（未收款） -->
		<view class="bottom-btn" v-if="orderType==='fpak'&&tabsData[activeTab1Index].name==='未收款'">
			<view class="top" v-if="tabsData[activeTab1Index].name==='未收款'">
				<view class="left">
					<view class="text-1">
						<text class="text-class-1">数量:</text>
						<text class="text-class-2">{{totalNum}}</text>
						<text class="text-class-1">台</text>
					</view>
					
					<view class="text-1">
						<text class="text-class-1">合计:</text>
						<text class="text-class-2">￥{{totalPrice}}</text>
					</view>
				</view>
				<view class="right" @click="allSelected">
					<view>
						<image v-if="isFpakAllSelected" style="height: 32rpx; width: 32rpx;border-radius: 50%;" src="https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" mode="aspectFill"></image>
						<view v-else class="circular" style="width: 32rpx;
						height: 32rpx;
						border-radius: 18rpx;
						border: 2rpx solid #D2CFCA;"/>
					</view>
					<text>全选</text>
				</view>
			</view>
			
			<view class="content" v-if="tabsData[activeTab1Index].name==='未收款'">
				<view class="left-btn">
					<uni-data-select
						class="select"
					    v-model="returnProductSelectValue"
					    :localdata="returnProductRange"
						placement="top"
					    @change="returnProductChange"
						:clear="false"
					>
					</uni-data-select>
				</view>
				<view class="right-btn" @click="openOfflinePayment()">
					<text class="text-13">线下收款</text>
				</view>
			</view>
			
		</view>
		<!-- 先货后款btn（已收款）||（已退货）  -->
		<view style="height: 176rpx;" class="bottom-btn"  v-if="orderType==='fpak'&&tabsData[activeTab1Index].name==='已收款'||tabsData[activeTab1Index].name==='已退货'">
			<view class="content" style="margin-top: 0rpx;">
				<view style="width: 340rpx;
					height: 96rpx;
					background: #F2F3F6;
					border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;" class="left-btn">
					<text class="text-11">数量:</text>
					<text class="text-12">{{totalNum}}</text>
					<text class="text-11">台</text>
				</view>
				<view style="width: 340rpx;
					height: 96rpx;
					background: #F2F3F6;
					border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;align-items: center;justify-content: center;" class="right-btn">
					<text class="text-11">合计:</text>
					<text class="text-12">¥{{totalPrice}}</text>
				</view>
			</view>
		</view>
	</view>
	
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="offlinePaymentPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
		<offlinePaymentPannel v-if="showOfflinePaymentPannel" :ddxx="ddxx" :totalPrice='totalPrice'  @close="handleClose" @reload="reloadList"></offlinePaymentPannel>
	</uni-popup>
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="customOrderCardSaixuanPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
		<customOrderCardSaixuanPannel v-if="showCustomOrderCardSaixuan" :yglist="yglist" :khlist="khlist" @reload='reloadFpbk' @close="handleClose"></customOrderCardSaixuanPannel>
	</uni-popup>
	
	
	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="false" ref="userServicePannelPopup" :safe-area='false' type="bottom" @close="handleClose" @change="pannelChange">
		<userServicePannel v-if="showUserServicePannel" :order="orderItem" @subExpress="subExpress"  @close="handleClose"></userServicePannel>
	</uni-popup>
</template>

<script setup>
import { offlinePaymentPannel } from './components/offline-payment-pannel.vue';
import { customOrderCardSaixuanPannel } from './components/custom-order-card-saixuan-pannel.vue';
import { fpakCard } from './components/fpakCard.vue';
import { serviceCard } from './components/serviceCard.vue';
import { userServicePannel } from './components/userServicePannel.vue'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft, getHeaderBarHeight } from '@/utils/system.js';
import { apiGetOrderlist,apiGetOrderInfos,apiGetShIndex,apiGetYjIndex,apiCustomOrderList,apiCustomFpOrderList,apiCustomYjOrderAction,apiOrderJdLogistics,apiOrderReturn,apiOrderSfLogistics,apiSearchOrder,apiCheckPay } from '../api/api.js';
import { computed, nextTick, onMounted } from 'vue';
import { scanCode } from '@/utils/common.js'
import { fpbkSearch } from '../api/api.js'
import { debounce } from '@/utils/debounce.js';
const myInputRef = ref(null)
const isAllSelected = ref(false)
const selectedItems = ref([])

const toggleSelectAll = ()=>{
	isAllSelected.value = !isAllSelected.value
	console.log('进来了')
	if (!isAllSelected.value) {
		selectedItems.value = []; 
	} else {
		selectedItems.value = orderList.value.flatMap(order => order.goodsinfos);
		console.log('selectedItems',selectedItems.value)
	}
}
const toggleSelectItem = (item)=>{
	const index = selectedItems.value.indexOf(item);
	if (index > -1) {
		selectedItems.value.splice(index, 1);
	} else {
		selectedItems.value.push(item);
	}
}
// 计算选中的商品数量
const selectedItemCount = computed(() => {
    return selectedItems.value.length;
});
// 计算选中商品的总价格
const totalSelectedPrice = computed(() => {
    return selectedItems.value.reduce((total, item) => {
        const price = parseFloat(item.goodsinfos.price) || 0; 
        return total + price;
    }, 0);
});
// const patchGoFpak = () => {
//     const flag = validateSelectedItems();
//     if (flag) {
//         let chs = ''; 
// 		let ddid = ''
// 		console.log('selectedItems',selectedItems.value)
//         selectedItems.value.forEach(item => {
// 			if(apiCheckPayAc(item.ddid)){
// 				return
// 			}
// 			chs += item.goodsinfos.ch + ','; 
// 			ddid += item.ddid
//         });
//         if (chs.endsWith(',')) {
//             chs = chs.slice(0, -1);
//         }
//         console.log('拼接后的 chs:', chs);
// 		ddid = Array.from(new Set(ddid.trim().split(',').filter(Boolean))).join(',');
// 		uni.navigateTo({
// 			url:'/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs='+chs+'&khid='+khidArray.value+'&khNames='+khNameArray.value+'&ddid='+ddid
// 		})
//     }
// };
const patchGoFpak = async () => {
    const flag =  validateSelectedItems();
	console.log('flag',flag)
    if (flag) {
        let chs = ''; 
        let ddid = '';
        let skipProcessing = false;
        console.log('selectedItems', selectedItems.value);
        
        for (const item of selectedItems.value) {
            const flag = await apiCheckPayAc(item.ddid);
            if (flag) {
                skipProcessing = true;
                break; 
            }
            chs += item.goodsinfos.ch + ','; 
            ddid += item.ddid + ',';
        }

        if (skipProcessing) {
            console.log('跳过后续处理');
            return;
        }
        if (chs.endsWith(',')) {
            chs = chs.slice(0, -1);
        }
        console.log('拼接后的 chs:', chs);
        ddid = Array.from(new Set(ddid.trim().split(',').filter(Boolean))).join(',');
        uni.navigateTo({
            url: '/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs=' + chs + '&khid=' + khidArray.value + '&khNames=' + khNameArray.value + '&ddid=' + ddid
        });
    }
};



const khidArray = ref('')
const khNameArray = ref('')
const validateSelectedItems = () => {
    console.log('selectedItems', selectedItems.value);
    console.log('orderList', orderList.value);
    if (selectedItems.value.length > 0) {
        let hasNullKhxx = false;
        const khidSet = new Set(); 
		const khidNameSet = new Set()
        let khids = ''; // 初始化 khids 变量
		let khidnames = ''
        for (const selectedItem of selectedItems.value) {
            const orderItem = orderList.value.find(order => 
                order.goodsinfos.some(goods => goods.id === selectedItem.id)
            );


			if (orderItem) {
				if (!orderItem.khxx) {
					hasNullKhxx = true;
				} else {
					khidNameSet.add(orderItem.khxx.name);
				}
			}
			
            // if (orderItem) {
            //     // 检查 khxx 是否存在
            //     if (!orderItem.khxx) {
            //         hasNullKhxx = true;
            //     }
            // }

            khidSet.add(orderItem.khid);
			// khidNameSet.add(orderItem.khxx.name)
        }

        // 拼接 khids
        khids = Array.from(khidSet).join(',');
		khidnames =  Array.from(khidNameSet).join(',')
        if (hasNullKhxx) {
            uni.showToast({
                title: '有未知商户订单',
                icon: 'error',
                duration: 1000
            });
            return false; 
        }

        if (khidSet.size >1) {
            uni.showToast({
                title: '只能唯一客户',
                icon: 'error',
                duration: 1000
            });
            return false; 
        }

        console.log('拼接后的 khids:', khids); 
		khidArray.value = khids
		khNameArray.value = khidnames
    }
    
    return true; 
};

// const validateSelectedItems = () => {
//     console.log('selectedItems', selectedItems.value);
//     console.log('orderList', orderList.value);
//     if (selectedItems.value.length > 0) {
//         let hasNullKhxx = false;
//         const khidSet = new Set(); 
//         const khidNameSet = new Set();
//         let khids = ''; // 初始化 khids 变量
//         let khidnames = '';
        
//         for (const selectedItem of selectedItems.value) {
//             const orderItem = orderList.value.find(order => 
//                 order.goodsinfos.some(goods => goods.goodsid === selectedItem.goodsid)
//             );

//             if (orderItem) {
//                 // 检查 khxx 是否存在
//                 if (!orderItem.khxx) {
//                     hasNullKhxx = true;
//                 } else {
//                     // 只有在 khxx 存在时才添加到集合中
//                     khidNameSet.add(orderItem.khxx.name);
//                 }
//             }

//             // 处理 khid
//             if (orderItem && orderItem.khid) {
//                 khidSet.add(orderItem.khid);
//             }
//         }

//         // 拼接 khids
//         khids = Array.from(khidSet).join(',');
//         khidnames = Array.from(khidNameSet).join(',');
        
//         if (hasNullKhxx) {
//             uni.showToast({
//                 title: '有未知商户订单',
//                 icon: 'error',
//                 duration: 1000
//             });
//             return false; 
//         }

//         if (khidSet.size > 1) {
//             uni.showToast({
//                 title: '只能唯一客户',
//                 icon: 'error',
//                 duration: 1000
//             });
//             return false; 
//         }

//         console.log('拼接后的 khids:', khids); 
//         khidArray.value = khids;
//         khNameArray.value = khidnames;
//     }
    
//     return true; 
// };





const expressText = ref([
	{text:'京东',id:'1'},
	{text:'顺丰',id:'2'},
	{text:'自提',id:'3'},
	{text:'送货上门',id:'4'},
])
// const searchModelKey = ref('ch')
// const showModelField = ref('ch')
const searchModelKey = computed(() => {
  return title.value === '销售订单' ? 'ddh' : 'ch';
});
const showModelField = computed(() => {
  return title.value === '销售订单' ? 'ddh' : 'ch';
});

const reloadFpbk = (data) => {
  console.log('data...........', data);
  
  fpbkYgid.value = data[0]?.length
    ? data[0].map(item => item.id).join(',')
    : '';  

  fpbkKhid.value = data[1]?.length
    ? data[1].map(item => item.id).join(',')
    : '';  

  fpbkDdlx.value = data[2]?.length
    ? data[2].map(item => item.ddlx)[0]
    : '';  

  paging.value.reload(true);
};

const scan = async () => {
	showLoading();
	try {
		const result = await scanCode();
		console.log('result', result);
		if (result) {
			handleInput(result).then(()=>{
				if(orgArray.value.length>0){
					myInputRef.value.inputText = orgArray.value[0].ch
				}
			});
		}
	} catch (error) {
		console.error('扫码失败：', error);
	} finally {
		hideLoading();
	}
};

const showLoading = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true 
	});
};

const hideLoading = () => {
	uni.hideLoading();
};
const orgArray = ref([])
const handleInput = (inputText) => {
	console.log('输入框内容:', inputText);
	if (inputText.length > 0) {
		if(title.value === '先货后款'){
			fpbkSearchAc(inputText);
		}
		if(title.value === '销售订单'){
			apiSearchOrderAc(inputText)
		}
		
	}
};
const searchCh = ref('') 
const ddh = ref('')
const selectChange = async(e) => {
	console.log('模糊搜索 e', e);
	if(title.value === '先货后款'){
		console.log('jinlai le ')
		searchCh.value = e.ch
		activeTab1Index.value = tabsData.value.findIndex(item=>item.lx==e.zt)
		// await getOrderList(e.zt,'fpak')
		paging.value.reload(true)
	}
	if(title.value === '销售订单'){
		ddh.value = e.ddh
		paging.value.reload(true)
	}
	
	if(myInputRef&&myInputRef.value){
		myInputRef.value.clearData()
	}
	orgArray.value = []
};
const fpbkSearchAc = async(search)=>{
	const param = {
		lx:'',//1未收款2已收款3退货
		lxs:'1',//1 串号 
		search:search
	}
	const res = await fpbkSearch(param)
	if(res.code == 200){
		orgArray.value = res.lists;
	}else{
		orgArray.value == []
	}
	console.log('orgArray',orgArray.value)
}

const apiSearchOrderAc = async(search)=>{
	const param = {
		ddh:search
	}
	const res = await apiSearchOrder(param)
	if(res.code === 200){
		orgArray.value = res.lists
	}else{
		orgArray.value == []
	}
	console.log('orgArray',orgArray.value)
}
const userServicePannelPopup = ref(null)
const fpakCardRef = ref(null);
const offlinePaymentPopup = ref(null)
const customOrderCardSaixuanPopup = ref(null)
const showOfflinePaymentPannel = ref(false)
const showCustomOrderCardSaixuan = ref(false)
const showUserServicePannel = ref(false)
const handleClose = () => {
	console.log('Popup is closed');
	offlinePaymentPopup.value.close();
	customOrderCardSaixuanPopup.value.close();
	userServicePannelPopup.value.close()
};
const pannelChange = (e) => {
	console.log('点击了遮罩e:', e);
	if(!e){
		showOfflinePaymentPannel.value = e.show
		showCustomOrderCardSaixuan.value = e.show
		showUserServicePannel.value = e.show
	}
};
const openSaiXuan = ()=>{
	showCustomOrderCardSaixuan.value = true
	customOrderCardSaixuanPopup.value.open()
}
const openOfflinePayment = ()=>{
	showOfflinePaymentPannel.value = true
	offlinePaymentPopup.value.open()
}
const orderItem = ref()
const openUseServicePannel = (item)=>{
	orderItem.value = item
	showUserServicePannel.value = true
	userServicePannelPopup.value.open()
}

const paging = ref(null);
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  // const currentType = tabsData.value[activeTab1Index.value].type;
  // const currentLx = tabsData.value[activeTab1Index.value].lx;
  currentType.value = tabsData.value[activeTab1Index.value].type;
  currentLx.value = tabsData.value[activeTab1Index.value].lx;
  await getOrderList(currentLx.value,currentType.value,pageNo-1);
  paging.value.complete(orderList.value);
  if(currentType.value==='fpak'&&(currentLx.value==='1')){
	  fpakCardRef.value.cancelAllSelectedProduct()
	  if(isFpakAllSelected.value){
		  isFpakAllSelected.value = false
	  }
	  
  }
};
const orderType = ref()
const btnData = ref ([
	{type:'yj',lx:'2',btns:[
		'驳回议价','同意议价'
	]},
	{type:'custom',lx:'3',btns:[
		// '去先货后款','线下收款'
		'先货后款'
	]},
	{type:'custom',lx:'4',btns:[
		'确认发货'
	]},
])
const getBtns = (type,lx) => {
  const btnItem = btnData.value.find(item => item.type===type&&item.lx===lx);
  console.log();
  return btnItem ? btnItem.btns : [];
};
const handleBtnClick =async (btn,item) => {
  console.log('Button clicked:', btn);
  console.log('item:', item);
  if(btn==='驳回议价'){
	apiCustomYjOrderActionData('1',item.id)
  }
  if(btn==='同意议价'){
	apiCustomYjOrderActionData('2',item.id)
  }
  if(btn==='确认发货'){
	openUseServicePannel(item)
	  
  }
  if(btn==='先货后款'){
	const flag = await apiCheckPayAc(item.id)
	if(flag){
		console.log("jinlai le ")
		return
	}
	if(item.khxx){
		console.log('进来了？')
		uni.navigateTo({
			url:'/pagesFirstWholesale/firstWholeSale/firstWholeSale?chs='+item.ch+'&khid='+item.khxx.id+'&khNames='+item.khxx.name+'&ddid='+item.ddid
		})
	}else{
		uni.showToast({
		    title: '有未知商户订单',
		    icon: 'error',
		    duration: 1000
		});
	}
  }
};
const btnClass = (btn) => {
    if (btn === '同意议价' || btn === '线下收款' || btn === '确认发货' || btn=== '先货后款') {
        return 'special-btn';
    } else {
        return 'normal-btn';
    }
};
const apiCheckPayAc = async(id)=>{
	const param = {
		id:id
	}
	const res = await apiCheckPay(param)
	if(res.code === '200'){
		return false
	}
	if(res.code === '201'){
		uni.showToast({
			title: '订单已售',
			icon: 'success',
			duration: 1000
		})
		return true
	}
}
// const getRemainingTime=(addTime, bargainingTimeName)=>{
//   console.log('addTime:',addTime);
//   console.log('bargainingTimeName:',bargainingTimeName);
//   const currentTime = new Date().getTime();
//   const bargainingEndTime = new Date(parseInt(addTime) * 1000 + parseInt(bargainingTimeName) * 3600 * 1000);
//   const remainingTime = bargainingEndTime.getTime() - currentTime;
//   return remainingTime;
// }

const getRemainingTime = (addTime, bargainingTimeName) => {
  const currentTime = new Date().getTime();
  const bargainingEndTime = new Date(parseInt(addTime) * 1000 + parseInt(bargainingTimeName) * 3600 * 1000);
  const remainingTime = bargainingEndTime.getTime() - currentTime;
  if (remainingTime <= 0) {
    return '已结束';
  }
  return remainingTime;
}

const totalNum = ref(0)
const totalPrice = ref(0)

// 计算每个订单的总 num 和总 price
const countNumAndPrice = () => {
  totalNum.value = 0
  totalPrice.value = 0
  if(orderType.value === 'custom'){
	  orderList.value.forEach((order) => {
	    totalNum.value += parseInt(order.num)
	    totalPrice.value += parseFloat(order.price)
	  })
  }
  if(orderType.value === 'yj'){
	  orderList.value.forEach((order) => {
	    totalPrice.value += parseFloat(order.price)
	  })
	  totalNum.value += parseInt(orderList.value.length)
  }

  console.log(`总 num 为 ${totalNum.value}, 总 price 为 ${totalPrice.value}`)
}

const searchSelectValue =  ref(0)
const range = ref([
	{ value: 0, text: "串号搜索" },
	{ value: 1, text: "型号搜索" },
])
const searchChange = (e) => {
  console.log('searchSelectValue:',e);
}

const returnProductSelectValue =  ref(0)
const returnProductRange = ref([
	{ value: 0, text: "退货上架" },
	{ value: 1, text: "临时下架" },
	{ value: 2, text: "退出仓库" },
])
const returnProductChange = (e) => {
  const selectedItem = returnProductRange.value[e];
  uni.showModal({
    title: '确认操作',
    content: `确定要进行${selectedItem.text}操作吗？`,
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定');
        apiOrderReturnData(e + 1);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
};


const title = ref()
const activeTab1Index = ref();
const orderList = ref([])
const classlist = ref([
  // { name: '全部', lx: '1', type: 'custom' },
  { name: '待付款', lx: '3',  type: 'custom'},
  { name: '待发货', lx: '4',  type: 'custom',
  badge: {value: 99},},
  { name: '待收货', lx: '5',  type: 'custom' },
  { name: '已收货', lx: '6',  type: 'custom' },
  { name: '交易成功', lx: '7',  type: 'custom' },

  // { name: '全部', lx: '1', type: 'yj' },
  { name: '议价待确认', lx: '2', type: 'yj' ,
  badge: {value: 99},
  },
  { name: '议价成功', lx: '3', type: 'yj' ,
  badge: {value: 99},
  },
  { name: '议价失败', lx: '4', type: 'yj' ,
  badge: {value: 99},
  },

  // { name: '全部', lx: '1', type: 'sh' },
  { name: '售后中', lx: '2',  type: 'sh' },
  { name: '售后成功', lx: '3',  type: 'sh' },
  { name: '售后失败', lx: '4',  type: 'sh' },
  
  { name: '未收款', lx: '1',  type: 'fpak',
	badge: {value: 99},
  },
  { name: '已收款', lx: '2',  type: 'fpak' ,
	badge: {value: 99},
  },
  { name: '已退货', lx: '3',  type: 'fpak' ,
	badge: {value: 99},
  },
]);
const tabsData = computed(() => {
  return classlist.value.map((item) => ({
    name: item.name,
    type: item.type, // 添加 type 属性
	lx: item.lx
  }));
});
const currentLx = ref()
const currentType = ref()
const uvTabs1Change =async (e) => {
  activeTab1Index.value = e.index;
  console.log('tabsData:',tabsData.value);
  currentType.value = tabsData.value[e.index].type;
  currentLx.value = tabsData.value[e.index].lx;
  await paging.value.reload(true);
  console.log('currentType:',currentType.value);
  console.log('currentLx:',currentLx.value);
  console.log('currentLx type:', typeof currentLx.value);
   if(currentType.value==='fpak'){
  // if(currentType.value==='fpak'&&(currentLx.value==='2'||currentLx.value==='3')){
	  console.log("进来了？") 
	  let totalNum1 = 0
	  let totalPrice1= 0
	  // nextTick(()=>{
		  // fpakCardRef.value.selectAllProducts();
		  dataList.value.forEach(item=>{
			  totalNum1+=item.goodsinfos.length
			  item.goodsinfos.forEach(item1=>{
				  totalPrice1+=parseFloat(item1.price)
			  })
		  })
	  // })
	  totalNum.value = totalNum1
	  totalPrice.value = totalPrice1
	  console.log('dataList',dataList.value)
	  
	  
	  // fpakCardRef.value.cancelAllSelectedProduct()
  }
};
const yglist = ref([])
const khlist = ref([])
const fpbkDdlx = ref('')
const fpbkYgid = ref('')
const fpbkKhid = ref('')
//销售订单 售后订单 议价订单 先货后款
const getOrderList = async (lx, type,start) => {
  let res;
  switch (type) {
    case 'custom':
      res = await apiCustomOrderList({
        opid: uni.getStorageSync('sessionInfo').opid,
		// opid: 'oT4uj69MFuuVV4q_e6rq8RKCTCvo',
        lx: ddh.value?'':lx,
		gysid: uni.getStorageSync('adminId'),
		ddh: ddh.value,
		start:start
      });
      break;
    case 'yj':
      res = await apiGetYjIndex({
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: lx,
		gysid: uni.getStorageSync('adminId'),
		start:start
      });
      break;
    case 'sh':
      res = await apiGetShIndex({
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: lx,
		gysid: uni.getStorageSync('adminId'),
		start:start
      });
      break;
	case 'fpak':
	  res = await apiCustomFpOrderList({
	    opid: uni.getStorageSync('sessionInfo').opid,
	    lx: lx,
		orderid: '',
		times:'',//开始时间戳结束时间戳  逗号分隔
		ddlx:fpbkDdlx.value,//1最新订单 2 最早订单
		ygid:fpbkYgid.value,//员工ID 返回得yglist 里面得ID 多个 逗号分隔
		khid:fpbkKhid.value,
		search:searchCh.value,
		start:start
	  });
	  break;
    default:
      res = { code: 200, lists: [] };
  }

	if (res.code === 200) {
		if(type==='custom'){
			console.log('res.lists:',res.lists);
			if(ddh.value){
				activeTab1Index.value = parseInt(res.lists[0].zt)-1
				ddh.value = ''
			}
			
			orderList.value = res.lists.filter((item) => item.goodsinfos.length > 0);
			console.log('orderList.value:',orderList.value);  
			countNumAndPrice()
			if(currentLx.value==='4'&&orderList.value.length>0){
				orderList.value = groupByKhid(orderList.value)
				console.log('groupByKhid',orderList.value)
			}
		}
		if(type==='yj'){
		  console.log('res.lists:', res.lists);
		  orderList.value = Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
		  countNumAndPrice()
		}
		if(type==='sh'){
			// console.log('res.lists:', res.lists);
			// orderList.value = Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
			if(res.lists.length >0){
			  res.lists.forEach(item=>{
				  if(!Array.isArray(item.goodsinfos)){
					  const goodsinfos = item.goodsinfos;
					  item.goodsinfos = [];
					  if(goodsinfos){
						  item.goodsinfos.push(goodsinfos);
					  }
				  }
			  })
			  res.lists = res.lists.filter((item) => item.goodsinfos.length > 0);
			 orderList.value = res.lists;
			}else{
				orderList.value = []
			}
			 
			 console.log('orderList.value:', orderList.value);
			 
		}
		if(type==='fpak'){
			console.log('res.lists:', res.lists);
			// orderList.value = Array.isArray(res.lists) && res.lists.length > 0 ? res.lists : [];
			orderList.value = res.lists
			console.log('orderList.value:', orderList.value);
			yglist.value = res.yglist
			khlist.value = res.khlist
			// nextTick(() => {
			// 	console.log('全选');
			// 	fpakCardRef.value.selectAllProducts();
			// });
		}
	}

 
  console.log(res);
};
function groupByKhid(data) {
    return Object.values(data.reduce((acc, item) => {
        const khid = item.khid; // 获取 khid
	
        if (!acc[khid]) {
            acc[khid] = { khid: khid, khxx:item.khxx, orders: [] }; // 初始化分组对象
        }
        acc[khid].orders.push(item); // 将当前项添加到对应的分组
        return acc;
    }, {}));
}
const goDetail = (item,type) => {
    const itemString = JSON.stringify(item);
	console.log('item',item)
    uni.setStorageSync('orderDetailItem', itemString); // 存储数据
	if(type==='custom'){
		uni.navigateTo({
		    url: '/pagesCustomSellOrderDetail/customSellOrderDetail/customSellOrderDetail?orderId='+item.id
		});
	}
	if(type==='yj'){
		uni.navigateTo({
		    url: '/pagesCustomYjOrderDetail/customYjOrderDetail/customYjOrderDetail'
		});
	}
   if(type==='sh'){
   	uni.navigateTo({
   	    url: '/pagesCustomServiceOrderDetail/customServiceOrderDetail/customServiceOrderDetail'
   	});
   }
   if(type==='fpak'){
	   uni.navigateTo({
	       url: '/pagesCustomFristProductAfterSales/customFristProductAfterSalse/customFristProductAfterSalse?orderId='+item.id
	   });
   }
};

// 先货后款 全选
const isFpakAllSelected = ref(false)
const allSelected = () => {
	if (isFpakAllSelected.value) {
		console.log('取消全选');
		nextTick(() => {
			console.log('取消全选');
			fpakCardRef.value.cancelAllSelectedProduct();
		});
	} else {
		nextTick(() => {
			console.log('全选');
			fpakCardRef.value.selectAllProducts();
		});
	}
	isFpakAllSelected.value = !isFpakAllSelected.value;
};
const ddxx = ref()
const updateSelectedItems = (selectedItems) => {
	console.log('Selected Items:', selectedItems);
	// 计算总 num 和总 price
	computedFpakTotal1(selectedItems)
	ddxx.value = formatSelectedItems(selectedItems)
	console.log('ddxx:',ddxx.value);
};

function formatSelectedItems(selectedItems) {
  console.log('selectedItems',selectedItems)
  const result = [];
 //  if(selectedItems.length>0){
	//   selectedItems.forEach(item=>{
	// 	  result.push({
	// 	  	orderid: item.id,
	// 	  	goodsid: item.goodsid
	// 	  });
	//   })
	// return result
 //  }
  const selectedGsids = selectedItems.map(item => item.id);
  for (const order of orderList.value) {
    const { id, goodsinfos } = order;
    const goodsids = goodsinfos.filter(info => selectedGsids.includes(info.id)).map(info => info.id);
    if (goodsids.length > 0) {
      result.push({
        orderid: id,
        goodsid: goodsids.join(',')
      });
    }
  }
  return result;
}

const computedHeight = computed(() => {
    if (orderList.value.length > 0) {
        if (orderType.value === 'sh') {
            return '1300rpx';
        } else if (orderType.value === 'custom') {
            return activeTab1Index.value === 0 ? '1100rpx' : '1300rpx';
        }
    }
    return '1100rpx';
});


// const computedHeight = computed(()=>{
// 	return orderList.value.length>0&&orderType.value === 'sh'?'1300rpx':'1100rpx'
// })

const reloadList = ()=>{
	offlinePaymentPopup.value.close()
	paging.value.reload(true)
}

const computedFpakTotal1 = (selectedItems) => {
	totalNum.value = 0
	totalPrice.value = 0
	// selectedItems.forEach(item=>{
	// 	totalNum.value += item.num
	// 	totalPrice.value += item.price
	// })
	totalNum.value = selectedItems.length;
	totalPrice.value = selectedItems.reduce((total, item) => total + parseInt(item.price), 0);
	console.log('totalNum',totalNum.value);
	console.log('totalPrice',totalPrice.value);
}
const fpakTotalQuantity = ref()
const fpakTotalAmount = ref()
const computedFpakTotal2 = ()=>{
	nextTick(() => {
		const {totalQuantity,totalAmount} = fpakCardRef.value.calculateTotal();
		fpakTotalQuantity.value = totalQuantity;
		fpakTotalAmount.value = totalAmount;
		console.log('totalQuantity:',totalQuantity);
		console.log('fpakTotalAmount:',totalAmount);
	});
}

const apiCustomYjOrderActionData = async (zt, id) => {
  const res = await apiCustomYjOrderAction({
    opid: uni.getStorageSync('sessionInfo').opid,
    zt: zt,//1拒绝  2同意
    id: id,//议价id
  });
  console.log(res);
  if (res.code === 200) {
	  uni.showToast({
	    title: '操作成功',
	    icon: 'success',
	    duration: 1000
	  });
	  setTimeout(() => {
	    paging.value.reload(true);
	  }, 500);
  }
};

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
		paging.value.reload(true);
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
		paging.value.reload(true);
	  }, 500);
	}
};

//退货操作
const apiOrderReturnData = async (lx) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		ddxx:JSON.stringify(ddxx.value),
		lx:lx//1 退货上架2 退货下架3退出仓库
	}
	const res = await apiOrderReturn(data);
	if (res.code === 200) {
	  uni.showToast({
		title: '操作成功',
		icon: 'success',
		duration: 1000
	  });
	  setTimeout(() => {
		paging.value.reload(true);
	  }, 500);
	}else{
		uni.showToast({
			title: '操作失败',
			icon: 'none',
			duration: 1000
		});
	}
};
const subExpress = (data)=>{
	console.log('data',data)
	console.log('data.orders[0].expressid',data.orders[0].expressid)
	if(data.orders[0].expressid==='1'){
		apiOrderJdLogisticsData(getUniqueIdString(data))
	}
	if(data.orders[0].expressid==='2'){
		apiOrderSfLogisticsData(getUniqueIdString(data))
	}
}
function getUniqueIdString(data) {
    const uniqueIds = new Set(data.orders.map(order => order.id));
    return Array.from(uniqueIds).join(',');
}
onLoad((options) => {
  // 页面参数
  const order = options.order;
  const yjOrder = options.yj;
  const shOrder = options.sh;
  const fpakOrder = options.fpak;
  const ch = options.ch
  // 根据传递过来的参数设置 activeTab1Index 的值和展示对应的标签页
  if (order) {
	orderType.value = 'custom'
    // 展示'custom'和'all'类型的标签页
    classlist.value = classlist.value.filter((item) => item.type === 'custom' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === order);
    title.value = '销售订单';
	
	currentType.value = tabsData.value[activeTab1Index.value].type;
	currentLx.value = tabsData.value[activeTab1Index.value].lx;
    // getOrderList(order, 'custom');
  } else if (yjOrder) {
     orderType.value = 'yj'
	// 展示'yj'和'all'类型的标签页
	classlist.value = classlist.value.filter((item) => item.type === 'yj' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === yjOrder);
    title.value = '议价订单';
    // getOrderList(yjOrder, 'yj');
  } else if (shOrder) {
	orderType.value = 'sh'
	// 展示'sh'和'all'类型的标签页
	classlist.value = classlist.value.filter((item) => item.type === 'sh' || item.type === 'all');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === shOrder);
    title.value = '售后订单';
    // getOrderList(shOrder, 'sh');
  } else if (fpakOrder) {
	orderType.value = 'fpak'
	// 展示'sh'和'all'类型的标签页
	classlist.value = classlist.value.filter((item) => item.type === 'fpak' || item.type === 'fpak');
    activeTab1Index.value = classlist.value.findIndex((item) => item.lx === fpakOrder);
    title.value = '先货后款';
    // getOrderList(shOrder, 'fpak');
	if(ch){
		handleInput(ch)
	}
	
  } else {
    activeTab1Index.value = 0;
    // 展示所有类型的标签页
    classlist.value = classlist.value;
  }
});
// onShow(()=>{
// 	// paging.value.reload(true)
// })
// const refreshPage = ()=>{
// 	if(paging&&paging.value){
// 		paging.value.reload(true)
// 	}
// }
</script>

<style lang="scss" scoped>
.customOrder-layout{
	box-sizing: border-box;
	background: #f3f2f6;
	min-height: 100vh;
	// .search {
	// 	margin-top: 30rpx;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	box-sizing: border-box;
	// 	padding-left: 20rpx;
	// 	padding-right: 20rpx;
	// 	margin-bottom: 20rpx;
	// 	width: 100%;
	// 	height: 72rpx;
	// 	.search-content{
	// 		width: 618rpx;
	// 		height: 72rpx;
	// 		background: #FFFFFF;
	// 		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59,43,15,0.2);
	// 		border-radius: 20rpx 20rpx 20rpx 20rpx;
	// 		border: 2rpx solid #242424;
	// 		display: flex;
	// 		align-items: center;
	// 		.left{
	// 			display: flex;
	// 			align-items: center;
	// 			::v-deep .uni-select__selector{
	// 				z-index: 20;
	// 			}
	// 			.select{
	// 				width: 180rpx;
	// 				font-family: PingFang SC, PingFang SC;
	// 				font-weight: 400;
	// 				font-size: 32rpx;
	// 				color: #1F1F1F;
	// 				::v-deep .uni-select {
	// 					border: none;
	// 				}
	// 			}
	// 			text{
	// 				font-family: PingFang SC, PingFang SC;
	// 				font-weight: 400;
	// 				font-size: 32rpx;
	// 				color: #1F1F1F;
	// 				text-align: left;
	// 			}
	// 			image{
	// 				height: 20rpx;
	// 				width: 20rpx;
	// 			}
	// 		}
	// 		.divile{
	// 			width: 2rpx;
	// 			height: 28rpx;
	// 			background: #EEEEEE;
	// 			border-radius: 10rpx 10rpx 10rpx 10rpx;
	// 			margin-right: 20rpx;
	// 		}
	// 		.right{
	// 			display: flex;
	// 			align-items: center;
	// 			image{
	// 				height: 30rpx;
	// 				width: 30rpx;
	// 				margin-right: 16rpx;
	// 			}
	// 			text{
	// 				font-family: PingFang SC, PingFang SC;
	// 				font-weight: 400;
	// 				font-size: 26rpx;
	// 				color: #1F1F1F;
	// 				text-align: left;
	// 				opacity: 0.6;
	// 			}
	// 		}
	// 	}
	// 	.image-right{
	// 		margin-left: 20rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		width: 72rpx;
	// 		height: 72rpx;
	// 		background: #FFFFFF;
	// 		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255,255,255,0.16);
	// 		border-radius: 10rpx 10rpx 10rpx 10rpx;
	// 		image{
	// 			width: 36rpx;
	// 			height: 36rpx;
	// 		}
	// 	}
		
	// }
	.search-fill {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.image-right{
		margin-left: 20rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72rpx;
		height: 72rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255,255,255,0.16);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.search {
		background: #f3f2f6;
		// margin-bottom: 32rpx;
		// margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 72rpx;
		// width: 750rpx;
		width: 618rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		// margin-bottom: 20rpx;
		.searchBar {
			padding-left: 10rpx;
			width: 710rpx;
			height: 72rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(59, 43, 15, 0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			border: 2rpx solid #242424;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.position {
				padding: 0 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.position-text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
				}
				.position-image {
					margin-left: 10rpx;
					width: 20rpx;
					height: 20rpx;
				}
			}
	
			.right {
				display: flex;
				align-items: center;
				.inline {
					margin-right: 30rpx;
					width: 2rpx;
					height: 28rpx;
					background: #eeeeee;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
				}
				image {
					margin-right: 30rpx;
					// border: 1rpx solid black;
					height: 30rpx;
					width: 30rpx;
				}
			}
			.search-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 20rpx;
				flex: 1;
				.search-image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 15rpx;
				}
				.selectDownUp {
					width: 100%;
					// border: 1rpx solid red;
				}
				.search-content-text {
					width: 400rpx;
					height: 36rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #1f1f1f;
					text-align: left;
					opacity: 0.6;
				}
			}
		}
		.select-btn {
			width: 72rpx;
			height: 72rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05), inset 0rpx 0rpx 12rpx 2rpx rgba(255, 255, 255, 0.16);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				height: 36rpx;
				width: 32rpx;
			}
		}
	
		
	}
	
	.tabs{
		background: #f3f2f6;
		margin-bottom: 18rpx;
	}
	.card{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-top: 14rpx;
		.top{
			margin-bottom: 10rpx;
			display: flex;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				.left-image{
					height: 24rpx;
					width: 24rpx;
					margin-right: 10rpx;
				}
				.text-1{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: center;
				}
				.text-2{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: center;
					margin-left: 20rpx;
				}
				.dividle{
					width: 2rpx;
					height: 20rpx;
					background: #EEEEEE;
					margin-left: 10rpx;
					margin-right: 10rpx;
				}
				.right-image{
					height: 20rpx;
					width: 20rpx;
					margin-left: 10rpx;
				}
			}
			.right{
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #E6432E;
					text-align: right;
				}
				.count{
					width: 110rpx;
					::v-deep .uv-count-down{
						display: flex;
						align-content: center;
						justify-content: center;
						text{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #E6432E;
							text-align: center;
						}
					}
				}
			}
		}
		.content{
			border-bottom: 2rpx solid #EEEEEE;
			border-top: 2rpx solid #EEEEEE;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			box-sizing: border-box;
			width: 670rpx;
			display: flex;
			align-items: center;
			.left{
				image{
					height: 170rpx;
					width: 170rpx;
				}
			}
			.right{
				margin-left: 20rpx;
				box-sizing: border-box;
				height: 170rpx;
				display: flex;
				flex-direction: column;
				// border: 1rpx solid red;
				width: 100%;
				.top {
					// border: 1rpx solid red;
					display: inline-block;
					.top-tap {
						float: left;
						height: 40rpx;
						background: linear-gradient(132deg, #d94c24 0%, #ff5221 100%);
						border-radius: 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						padding-left: 8rpx;
						padding-right: 8rpx;
						.top-tap-text {
							color: #ffffff;
							font-size: 22rpx;
						}
						margin-right: 10rpx;
					}
					.top-text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1f1f1f;
						vertical-align: top;
						text-align: center;
					}
				}
				.imei{
					margin-top: 10rpx;
					display: flex;
					align-items: center;
					
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #828282;
					}
					image{
						margin-left: 10rpx;
						height: 20rpx;
						width: 20rpx;
					}
				}
			}
			.service-menber{
				width: 670rpx;
				height: 66rpx;
				background: #F8F8F8;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: center;
					}
				}
				.dividle{
					width: 2rpx;
					height: 20rpx;
					background: #EEEEEE;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}
				.right{
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: center;
					}
				}
			}
			
			.bottom{
				display: flex;
				align-items: flex-end;
				flex-grow: 1;
				.text-1{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #1F1F1F;
				}
				.text-2{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 22rpx;
					color: #E6432E;
				}
				.text-3{
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 32rpx;
					color: #E6432E;
				}
				.original-price{
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
		}
		.btns{
			width: 100%;
			margin-right: 24rpx;
			margin-top: 30rpx;
			padding-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btn {
			    width: 156rpx;
			    height: 60rpx;
			    border-radius: 10rpx 10rpx 10rpx 10rpx;
			    border: 2rpx solid #1F1F1F;
			    margin-left: 20rpx;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			  
			}
			
			.special-btn {
				background: linear-gradient( 89deg, #ED784B 0%, #EB4636 100%);
				border: none;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #FFFFFF;
					text-align: center;
					text-transform: none;
				}
			}
			
			.normal-btn {
				opacity: 0.5;
				text {
				    height: 40rpx;
				    font-family: PingFang SC, PingFang SC;
				    font-weight: 400;
				    font-size: 28rpx;
				    color: #1F1F1F;
				    text-align: center;
				    opacity: 0.7;
				}
			}
		}
			
	}

	.bottom-btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 238rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 20rpx;
		z-index: 10;
		.top{
			display: flex;
			align-items: center;
			.left{
				display: flex;
				align-items: center;
				.text-1{
					margin-right: 40rpx;
					display: flex;
					align-items: center;
					.text-class-1{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						text-align: left;
					}
					.text-class-2{
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 32rpx;
						color: #EB4636;
						text-align: left;
					}
				}
			}
		
			.right{
				flex: 1;
				display: flex;
				justify-content: flex-end;
				text{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					text-align: left;
					margin-left: 10rpx;
				}
			}
		}
	
		.content{
			margin-top: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			::v-deep .uni-select__selector {
				z-index: 20;
			}
			.center-btn{
				width: 710rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
			.left-btn{
				width: 202rpx;
				height: 96rpx;
				background: #F2F3F6;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 16rpx;
			
			}
			.right-btn{
				width: 492rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #FF6D0C 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
	}

}
// .left-btn{
// 	::v-deep .uni-select__selector{
// 		z-index: 20;
// 	}
// }

::v-deep .uni-select {
	border: none;
}
.text-11{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #1F1F1F;
	text-align: left;
	font-style: normal;
	text-transform: none;
}

.text-12{
	font-family: PingFang SC, PingFang SC;
	font-weight: bold;
	font-size: 32rpx;
	color: #EB4636;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.text-13{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 32rpx;
	color: #FFFFFF;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>