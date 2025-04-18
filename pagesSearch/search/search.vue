<template>
	<view class="searchLayout">
		<!-- 状态栏 -->
		<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
		<view class="search-content" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
			<view class="bar-icon">
				<image class="img" @click="goBack" src="https://www.xzxskj.com/xcximg/icon_back@3x.png" mode="aspectFill" ></image>
			</view>
			<view class="search" >
				<uv-search 
				:showAction="true" 
				actionText="搜索" 
				:animation="true"
				bgColor="transparent"
				@search = "onSearch"
				:clearabled="true"
				height: 72rpx
				v-model="queryParams.keyword"
				@focus="onFocus"
				></uv-search>
			</view>
		</view>
		
		<uni-transition mode-class="fade" :duration="duration1"  :show="showSearchList">
			<!-- 模糊列表 -->
			<view class="search-list">
				<view class="list-item" v-for="(item,index) in fuzzySearch" :key="index" @click="select(item.value)">
					<image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
					<text>{{item.value}}</text>
				</view>
			</view>
		</uni-transition>
	
		<!--  mode-class="slide-bottom" -->
		<uni-transition mode-class="slide-bottom" :duration="duration2"  :show="!showSearchList"  >
			<view v-if="!classList.length || noSearch">
					<view class="history"  v-if="historySearch.length">
						<view class="topTitle">
							<view class="text">最近搜索</view>
							<view class="icon" @click="removeHistory">
								<uni-icons type="trash" size="25"></uni-icons>
							</view>
						</view>
						<view class="tabs">
							<view class="tab" v-for="tab in historySearch" :key="tab" 
							@click="clickTab(tab)">{{tab}}</view>		
						</view>
					</view>
					
					<view class="recommend">
						<view class="topTitle">
							<view class="text">热门搜索</view>				
						</view>
						<view class="tabs">				
							<view class="tab" v-for="tab in recommendList" :key="tab" 
							@click="clickTab(tab)">{{tab}}</view>
						</view>
					</view>
				</view>
				<view class="noSearch" v-if="noSearch">
					<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
				</view>
				<view v-else>
					<view class="list">
						<navigator :url="`/pages/preview/preview?id=${item._id}`"  class="item" 
						v-for="item in classList" :key="item._id">				
							<image :src="item.smallPicurl" mode="aspectFill"></image>				
						</navigator>
					</view>		
					<view class="loadingLayout" v-if="noData || classList.length">
						<uni-load-more :status="noData?'noMore':'loading'"/>
					</view>
				</view>
			
		</uni-transition>
		</view>
</template>

<script setup>
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight,getLeftIconLeft,getHeaderBarHeight} from "@/utils/system.js"
const duration1 = ref(1500)
const duration2 =ref (1500)
const showSearchList = ref(false)
const queryParams = ref({
	pageNum:1,
	pageSize:12,
	keyword:""
})
const fuzzySearch = ref([
	{key:1,value:"iphone1"},
	{key:2,value:"mate40"},
	{key:3,value:"iphone13"},
	{key:4,value:"uphone14"},
	{key:5,value:"vivo"},
	{key:6,value:"苹果"},
	{key:7,value:"华为"},
	{key:8,value:"小米"},
	{key:9,value:"荣耀"},
])
const executeFadeAnimation = () => {
    showSearchList.value = true;
};

const executeSlideBottomAnimation = () => {
    const slideBottomAnimation = uni.createAnimation({
        duration: duration2.value,
        timingFunction: 'ease',
    }).translateY(100).step();

    uni.createAnimation().step(slideBottomAnimation.export()).export();
};

const executefade1Animation = () => {
    const fadeAnimation = uni.createAnimation({
        duration: duration1.value,
        timingFunction: 'ease',
    }).opacity(0).step();

    uni.createAnimation().step(fadeAnimation.export()).export();
};

const executeSlideAnimation = () => {

    showSearchList.value = false;

};

const onFocus = () => {
    executeFadeAnimation(executeSlideBottomAnimation); // 执行第一个动画，并在完成后执行第二个动画
};

const select = (value)=>{
	executeSlideAnimation()
    queryParams.value.keyword = value; // 更新关键字
}

const goBack = () => {
  uni.navigateBack();
};
//搜索历史词
const historySearch = ref(uni.getStorageSync("historySearch") || []);

//热门搜索词
const recommendList = ref(["iphone13","iphone14","iphone15","华为"]);

//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);

//搜索结果列表
const classList = ref([]);


//点击搜索
const onSearch = ()=>{	
	
	executeSlideAnimation()
	uni.showLoading();
	
	// 检查关键字是否为空字符串，如果为空，则不执行搜索操作
	if (!queryParams.value.keyword.trim()) {
		uni.hideLoading(); // 隐藏加载动画
		return; // 终止函数
	}
	historySearch.value = [...new Set([queryParams.value.keyword,...historySearch.value])].slice(0,10);
	console.log('historySearch.value：',historySearch.value);
	if(historySearch.value){
		uni.setStorageSync("historySearch",historySearch.value);
	}
	initParams(queryParams.value.keyword);
	searchData();
	console.log(queryParams.value.keyword);
}


//点击清除按钮
const onClear = ()=>{
	executeSlideAnimation()
	initParams();
}



//点击标签进行搜索
const clickTab = (value)=>{
	initParams(value);
	
	onSearch();
}

//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				uni.removeStorageSync("historySearch");
				historySearch.value = []
			}
		}
	})
}

const searchData = async ()=>{
	try{
		// let res =  await apiSearchData(queryParams.value);
		// classList.value  =  [...classList.value,...res.data] ;
		if(classList.value.length>0){
			uni.setStorageSync("storgClassList",classList.value);
		}
		// if(queryParams.value.pageSize > res.data.length) noData.value = true;
		// if(res.data.length == 0 && classList.value.length==0) noSearch.value = true;
		// console.log(res);
	}finally{
		uni.hideLoading()
	}
	
}

const initParams = (value='')=>{
	classList.value = [];
	noData.value = false;
	noSearch.value = false;
	queryParams.value = {
		pageNum:1,
		pageSize:12,
		keyword:value || ""
	}
}


//触底加载更多
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.value.pageNum++
	searchData();
})

//关闭有页面
onUnload(()=>{
	uni.removeStorageSync("storgClassList",classList.value);	
})

</script>

<style lang="scss" scoped>
.searchLayout{
	background: #F3F2F6;
	height: 100vh;
	.search-content{
		display: flex;
		align-items: center;
		padding:0 20rpx;
		.bar-icon{
			margin-right: 20rpx;
			.img{
				height: 32rpx;
				width: 32rpx;
			}
		}
	}
	.search{
		box-sizing: border-box;
		background: #FFFFFF;
		// height: 72rpx;
		width: 500rpx;
		// margin: 15rpx 20rpx;
		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59,43,15,0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 2rpx solid #242424;
		display: flex;
		align-items: center;
		
	}
	.search-list{
		display: flex;
		flex-direction: column;
		padding-left: 50rpx;
		height: 100%;
		// border: 1rpx solid black;
		.list-item{
			height: 72rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #FFFFFF;
			image{
				margin-right: 20rpx;
				height: 22rpx;
				width: 22rpx;
			}
			text{
				// background: #e5e5e5;
				font-size: 28rpx;
				color:#333;
				// padding:10rpx 28rpx;
				// margin-right: 20rpx;
				// margin-top: 20rpx;
			}
		}
		
	}
	.topTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color:#999;
	}
	.history{
		padding:30rpx;
		
	}
	.recommend{
		padding:30rpx;
	}
	.tabs{
		display: flex;		
		align-items: center;
		flex-wrap: wrap;
		padding-top:20rpx;
		.tab{
			background: #e5e5e5;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}	
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding:20rpx 5rpx;		
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}			
		}		
	}
}
</style>
