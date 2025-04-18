<template>
	<view class="layout">
		<view class="navbar">
			<!-- 状态栏 -->
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}">
				
			</view>
			<!-- 标题栏 -->
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
				<text class="statusTitle">闲置新生</text>
				<!-- @click="instance.proxy.copyText('asdasdad')" -->
				<button class="phoneBtn"   plain>获取手机号</button>
			</view>
			<!-- 搜索栏 -->
			<view class="searchBar">
				<picker 
				@change="onRegionChange" 
				class="position" 
				mode="region" 
				custom-item="不限" 
				:value="pickerValue">
					<text v-if="pickerValue" class="position-text">{{ pickerValue }}</text>
					<text v-else class="position-text">定位中</text>
					<image class="position-image" src="https://www.xzxskj.com/Public/upload/66cbb2482f94e6811.png" mode="aspectFill"></image>
				</picker>
				
				
				<view class="inline">
					
				</view>
				<view class="search-content">
					<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
					<!-- <text class="search-content-text">搜索关键字</text> -->
					<!-- <input type="text" class="search-content-text" placeholder="搜索关键字"/> -->
					<view class="selectDownUp">
					<qiaoSelect 
						:keyId="1" 
						:dataList="orgArray" 
						:searchKey="searchModelKey"
						:showField="showModelField"
						phText="搜索关键字" 
						:showBorder="false" 
						@change="selectChange" 
						@input="debounceHandleInput"
						ref="searchInput"
						></qiaoSelect>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 填充 -->
		<view class="fill" :style="{height:getNavBarHeight()+'px'}">
			
		</view>
	</view>
</template>

<script setup>
import { apiSearchModel } from '@/api/search/search.js';
import { debounce } from '@/utils/debounce.js'
import { search } from '@/utils/modelSearch.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
import { getAddress } from "@/utils/wxMapAPI.js"
import { useTokenStore } from '@/stores/tokenStore';
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight,getLeftIconLeft} from "@/utils/system.js"
import { nextTick, onMounted } from "vue";
import { apiGetPhone } from '@/api/login/loginApi.js'
import { apiAddWxUser,apiGetUserInfo } from '@/api/member/member.js'
import { useLocationStore } from "@/stores/locationStore.js"
const disabled = ref(false)
const searchInput = ref(null)
const instance = getCurrentInstance();
const searchModelKey = ref('xhname');
const showModelField = ref('xhname');
const locationStore = useLocationStore()
const value = ref(0)
const range = ref([{value:0,text:"绵阳市"},{value:1,text:"四川省"},{value:2,text:"全国"}])
const form = ref({
  fullLocation: '', // 省市区(前端展示)
  province: '', // 省份编码(后端参数)
  city: '', // 城市编码(后端参数)
  region: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  postCode: '', // 邮编
  longitude: '', // 经度
  latitude: '', // 纬度
  name: '', // 地址名称
})

//点击城市选择器
const onRegionChange = (ev) => {
	// console.log(ev);
    console.log(ev.detail.value);
    const [province, city, region] = ev.detail.value;
    const postCode = ev.detail.code;
    form.value = { ...form.value, province, city, region, postCode, fullLocation: `${province} ${city} ${region}` };
	console.log("form:"+JSON.stringify(form.value))
	//保存定位信息
	uni.setStorageSync('locationForm',form.value)
};	
const pickerValue = computed(() => {
    return form.value.region!=="不限" ? form.value.region : form.value.city!=="不限" ? form.value.city : form.value.province!=="不限"?form.value.province:"全国";
});

const handleInput = async (inputText) => {
  if (!inputText.length) {
    orgArray.value = [];
    return;
  }
  console.log('输入内容:', inputText);
  // 显示加载中提示
  uni.showLoading({
    title: '加载中',
    mask: true,
  });
  try {
    const res = await apiSearchModelData(inputText);
  } catch (error) {
    console.error('搜索请求失败:', error);
    uni.showToast({
      title: '搜索失败，请重试',
      icon: 'none',
    });
  } finally {
    uni.hideLoading();
  }
};

const debounceHandleInput = debounce(handleInput, 300,true);

const apiSearchModelData = async (word) => {
	
	const data = {
		word: word
	};
	const res = await apiSearchModel(data);
	if (res.code === '200') {
		orgArray.value = res.lists;
	}else{
		orgArray.value = []
	}
	console.log('apiSearchModelData res:', res);
};
const goPage=(path)=>{
	console.log('进来了');
	uni.navigateTo({
		url:path
	})
}

onShow(async()=>{
	form.value = await useLocationStore().getForm()
})
onMounted(async()=>{
	form.value = await useLocationStore().getForm()
})
const orgArray = ref([
])

const selectChange = (e)=>{
	// orgArray.value = []
	console.log(e);
	if(e){
		uni.navigateTo({
			url:'/pagesProduct/product/product?title='+e.xhname+'&id='+e.xhid
		})
	}
	// setTimeout(()=>{searchInput.value.clearData()},500)
	
}

</script>

<style lang="scss" scoped>
	.layout{
		.navbar{
			position: fixed;
			top:0;
			left:0;
			width: 100%;
			z-index: 10;
			background: #F3F3F6;
			.statusBar{
			}
			
			.titleBar{
				display: flex;
				align-items: center;
				padding:0 20rpx;
				.phoneBtn{
					border: 1rpx solid black;
					position: absolute;
					opacity: 0;
				}
				.statusTitle{
					width: 160rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 40rpx;
					color: #1F1F1F;
					line-height: 0rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
					// animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
					// animation: tracking-in-contract-bck 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
					// animation: slide-in-right 1.5s ease-in-out;
					animation: bounceInRight 1s ease-in-out;
				}
			}
			
			.searchBar{
				display: flex;
				align-items: center;
				height: 72rpx;
				width: 710rpx;
				margin: 15rpx 20rpx;
				background: #FFFFFF;
				box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59,43,15,0.2);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				border: 2rpx solid #242424;
				
				.position{
					padding: 0 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.position-text{
						width: 96rpx;
						height: 44rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 32rpx;
						color: #1F1F1F;
						// line-height: 0rpx;
						text-align: left;
						font-style: normal;
						text-transform: none;
					}
					.position-image{
						margin-left: 10rpx;
						width: 20rpx;
						height: 20rpx;
					}
				}
				.inline{
					width: 2rpx;
					height: 28rpx;
					background: #EEEEEE;
					border-radius: 10rpx 10rpx 10rpx 10rpx;
				}
				.search-content{
					flex: 1;
					// border: 1rpx solid black;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 0 20rpx;
				
					.selectDownUp{
						// border: 1rpx solid red;
						width: 100%;
					}
					.search-image{
						width: 30rpx;
						height: 30rpx;
						margin-right: 15rpx;
					}
					.search-select{
						width: 100%;
						border: 1rpx solid red;
						position: absolute;
						// opacity: 0;
					}
					.search-content-text{
						height: 36rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #1F1F1F;
						opacity: 0.6;
						text-align: left;
					
					
					}
				}
			}
			
		}
		.fill{
		}
	}
</style>