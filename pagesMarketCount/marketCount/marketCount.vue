<template>
		<view v-if="isShow">
			<page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
		</view>
		<view class="marketCount-layout">
			<z-paging ref="paging" v-model="dataList" @query="queryList" :loading-more-custom-style="{'background':'#f3f2f6'}" :default-page-size = "10">
			<template #top>
				<!-- header -->
				<custom-header backgroundColor="#FFFFFF">
					<template #name>我的发布</template>
					<template #fill>自由市场</template>
				</custom-header>
			</template>
			<!-- tabs -->
			<!-- <view class="tabs">
				<uv-tabs
					class="cus-tab"
					:list="tabsData"
					lineWidth="30" 
					lineColor="linear-gradient( 86deg, #ED784B 0%, #EB4636 100%)" 
					lineHeight="3"
					:scrollable='false'
					:fontSize="32"
					:inactiveStyle="{
						color: '#1F1F1F',
						opacity: 0.6,
						fontWeight: 'bold'
					}"
					:activeStyle="{ color: '#1F1F1F',opacity: 1,fontWeight: 'bold'}"
					@change="uvTabs1Change"
					:current="activeTab1Index"
				></uv-tabs>
			</view> -->
			<!-- <scroll-view :scroll-y='scroll' style="height: 1390rpx;"> -->
				
			<!-- content -->
				<view v-show="activeTab1Index===0||activeTab1Index===1" class="list-content" v-for="(item,index) in dataList" :key="index">
					<view class="box1" @click="goPage(item.type,item)">
						<view class="box-left">
							<view class="tab">
								<text>{{item.fineness}}</text>
							</view>
							<text class="text-1">{{item.type==='1'?'卖货价:':'求货价:'}}</text>
							<text class="text-2">￥{{item.price}}</text>
							<text class="text-1">/台</text>
						</view>
						<view class="box-right">
							<!-- <text>距结束</text> -->
							<uv-count-down
								v-if="item.countdown > 0"
								:time="item.countdown"
								format="DD:HH:mm:ss" 
								autoStart 
								millisecond 
								@change="onChange">
								<!-- <view class="time">
									<text class="time__item">距结束</text>
									<text class="time__item" v-if="timeData.days>0">{{ timeData.days }}&nbsp;天</text>
									<text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
									<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
									<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
								</view> -->
							</uv-count-down>
							<text v-else class="text-1">已下架</text>
						</view>
					</view>
					<view class="content">
						<text  @click="goPage(item.type,item)">{{item.fullname}}</text>
						<view class="divile"/>
						<view class="bottom">
							<view class="btn" v-for="(item1,index) in btnData" :key="index" @click="item1.title==='修改'?edit(activeTab1Index+'',item):delet(item)">
								<image :src="item1.image" mode="aspectFill"></image>
								<text>{{item1.title}}</text>
							</view>
						</view>
					</view>
				</view>
			
				<view v-show="activeTab1Index===2" class="list-content" v-for="(item,index) in filteredData" :key="index">
					<view class="box2">
						<view class="top">
							<text>{{item.title}}</text>
						</view>
						<view class="mid">
						</view>
						<view class="bottom">
							<view class="btn" v-for="(item1,index) in btnData" :key="index" @click="item1.title==='修改'?edit(activeTab1Index+'',item1):delet(item1)">
								<image :src="item1.image" mode="aspectFill"></image>
								<text>{{item1.title}}</text>
							</view>
						</view>
					</view>
				</view>
				</z-paging>
			<!-- </scroll-view> -->
		</view>
</template>

<script setup>
import { apiDelMine } from '../api/api.js'
import { apigetMarketListAll } from '../api/api.js';
import { navigateToPage } from '@/utils/common.js'
import { onMounted } from 'vue';
const CountdownMilliseconds = ref(0)
const isShow = ref(false)
const beforeleave = (e) => {
	isShow.value = false;
	const res = navigateToPage('pages/home/home');
};
const timeData = ref({})
const onChange = (e)=>{
	timeData.value = e
}
const paging = ref(null)
const dataList = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  await	getMarketListAll(pageNo-1)
  paging.value.complete(list.value);
};
const goPage = (type, item) => {
    const itemString = JSON.stringify(item);
    if (type === '1') {
        uni.navigateTo({
            url: `/pagesSell/sell/sell?item=${encodeURIComponent(itemString)}`
        });
    }
    if (type === '2') {
        uni.navigateTo({
            url: `/pagesSeeking/seeking/seeking?item=${encodeURIComponent(itemString)}`
        });
    }
}
const scroll = ref(true)
const activeTab1Index = ref(0);
const classlist = ref([
	{name:'卖货(56)'},
	{name:'求货(56)'},
	{name:'交流(56)'},
]);
const tabsData = computed(() => {
	return classlist.value.map((item) => ({
		name: item.name
	}));
});
const uvTabs1Change = (e) => {
	console.log('标签切换触发:', e.index);
	activeTab1Index.value = e.index;
};
const btnData = ref([
	{title:'修改',image:'/pagesMarketCount/static/icon_xiugai@3x.png'},
	{title:'删除',image:'/pagesMarketCount/static/icon_delete@3x.png'},
])
const cardData = ref([
	{id:1,type:'0',fineness:'99新',price:'14120',time:15* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:2,type:'0',fineness:'97新',price:'500',time:10* 60 * 60 * 1000,title:'iphone14 pro max'},
	{id:3,type:'0',fineness:'99新',price:'10000',time:1* 60 * 60 * 1000,title:'vivo x3 12GB+512GB'},
	{id:4,type:'0',fineness:'95新',price:'2000',time:2* 60 * 60 * 1000,title:'步步高 x3 12GB+512GB'},
	{id:5,type:'0',fineness:'95新',price:'3213',time:4* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:6,type:'0',fineness:'99新',price:'500',time:5* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:7,type:'0',fineness:'89新',price:'100',time:6* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'14120',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'97新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'10000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'95新',price:'2000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'95新',price:'3213',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'89新',price:'100',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'14120',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'97新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'10000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'95新',price:'2000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'95新',price:'3213',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'99新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'0',fineness:'89新',price:'100',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	
	{id:8,type:'1',fineness:'99新',price:'14120',time:10* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'97新',price:'500',time:9* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'10000',time:4* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'2000',time:30* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'3213',time:5* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'89新',price:'100',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'97新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'10000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'2000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'3213',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'89新',price:'100',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'14120',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'97新',price:'500',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'99新',price:'10000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'2000',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'95新',price:'3213',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'1',fineness:'89新',price:'100',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	
	{id:8,type:'2',fineness:'',price:'',time:10* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:9* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:4* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:30* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:5* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
	{id:8,type:'2',fineness:'',price:'',time:14* 60 * 60 * 1000,title:'华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑'},
])
const filteredData = computed(() => {
    return cardData.value.filter(item => item.type === activeTab1Index.value+'');
});

function getCountdownMilliseconds(add_time, duration) {
    const startTime = add_time * 1000; 
    const durationMilliseconds = duration * 60 * 60 * 1000;
    const endTime = startTime + durationMilliseconds; // 计算结束时间
    const now = Date.now(); // 当前时间（毫秒）
    const countdownMilliseconds = endTime - now; // 计算倒计时时间
    console.log('countdownMilliseconds：', countdownMilliseconds);
    return countdownMilliseconds > 0 ? countdownMilliseconds : 0; 
}
const edit = (type,item)=>{
	let data = encodeURIComponent(JSON.stringify(item));
	if(type==='0'){
		uni.navigateTo({
			url:'/pagesNewSell/newSell/newSell?data='+data
		})
	}else if(type==='1'){
		uni.navigateTo({
			url:'/pagesNewSeeking/newSeeking/newSeeking?id='+id
		})
	}else{
		uni.navigateTo({
			url:'/pagesNewPosting/newPosting/newPosting?id='+id
		})
	}
}
const delet = (item)=>{
	apiDelMineAc(item.id)
}
const list = ref([])
const getMarketListAll = async (start) => {
    const data = {
        opid: uni.getStorageSync('sessionInfo').opid,
        lx: activeTab1Index.value,
        start: start
    };
    
    const res = await apigetMarketListAll(data);
    if (res.code === '200') {
        list.value = res.lists.map(item => ({
            ...item,
            countdown: getCountdownMilliseconds(item.add_time, item.duration)
        }));
    }
    console.log('market res:', res);
};

const apiDelMineAc =async (id) =>{
	const data = {
		id:id
	}
	const res = await apiDelMine(data)
	console.log('res',res)
	if(res.code === '200'){
		uni.showToast({
		  title: '操作成功',
		  icon: 'success',
		  duration: 500
		});
		setTimeout(()=>{
			paging.value.reload(true)
		},500)
	}
}
onLoad((options) => {
    console.log('传递过来的参数:', options.type);
    if (options.type) {
        activeTab1Index.value = parseInt(options.type);
    }
	if(options.from){
		isShow.value = true
	}
})
onShow(()=>{
	if(paging&&paging.value)paging.value.reload(true)
})
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.marketCount-layout{
	display: flex;
	flex-direction: column;
	background: #F3F2F6;
	min-height: 100vh;
	.tabs{
		background: #FFFFFF;
	}
	.list-content{
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		.box1::before{
			margin-top: 44rpx;
			content: '';
			position: absolute;
			height: 20rpx;
			width: 20rpx;
			background: #FFFFFF;
			top: 0;
			left: 472rpx;
		}
		.box1::after{
			margin-top: 11rpx;
			content: '';
			position: absolute;
			height: 15rpx;
			width: 20rpx;
			background: #D94C24;
			top: 0;
			right: 228rpx;
		}	
		.box1{
			margin-top: 20rpx;
			width: 710rpx;
			height: 64rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			align-items: center;
			.box-left{
				height: 64rpx;
				width: 472rpx;
				background: #FFFFFF;
				border-radius: 20rpx 20rpx 0 0;
				position: relative;
				z-index: 1;
				
				display: flex;
				align-items: center;
				
				.tab{
					// width: 64rpx;
					padding-left: 4rpx;
					padding-right: 4rpx;
					height: 32rpx;
					background: linear-gradient( 132deg, #D94C24 0%, #FF5221 100%);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 20rpx;
					margin-right: 20rpx;
					text{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 22rpx;
						color: #FFFFFF;
						text-align: center;
						font-style: normal;
					}
				}
				.text-1{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #1F1F1F;
					text-align: left;
				}
				.text-2{
					font-family: DIN, DIN;
					font-weight: bold;
					font-size: 40rpx;
					color: #E6432E;
				}
			}
			.box-right{
				margin-right: 11rpx;
				margin-top: 10rpx;
				width: 228rpx;
				height: 54rpx;
				border-radius: 0 20rpx 0 20rpx;
				background: linear-gradient( 93deg, #EB4636 0%, #FF6D0C 100%);
				position: relative; 
				z-index: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				::v-deep .uv-count-down{
					display: flex;
					align-content: center;
					justify-content: center;
					padding-bottom: 4rpx;
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						margin-right: 20rpx;
						color: #FFFFFF;
						text-align: right;
					}
				}
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #FFFFFF;
					text-align: right;
				}
			}
			.box-right::after{
				margin-top: 15rpx;
				content: '';
				top: 0;
				right: 0;
				height: 54rpx;
				width: 10rpx;
				position: absolute;
				background: #FF6D0C;
			}
		}
		.content{
			box-sizing: border-box;
			width: 710rpx;
			height: 200rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 0rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-left: 20rpx;
			padding-right: 20rpx;
			position: relative;
			z-index: 2;
			text{
				width: 100%;
				margin-top: 30rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
			.divile{
				margin-top: 20rpx;
				width: 670rpx;
				height: 5rpx;
				background: #EEEEEE;
				border-radius: 0rpx 20rpx 20rpx 20rpx;
			}
			.bottom{
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.btn{
					margin-left:20rpx;
					box-sizing: border-box;
					width: 146rpx;
					height: 60rpx;
					background: #FFFFFF;
					border-radius: 30rpx;
					border: 2rpx solid #EEEEEE;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						height: 28rpx;
						width: 28rpx;
						// border: 1rpx solid red;
						margin-right: 10rpx;
					}
					text{
						width: 48rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						line-height: 0rpx;
						text-align: center;
						font-style: normal;
						text-transform: none;
						opacity: 0.6;
					}
				}
			}
		}
		
		.box2{
			margin-top: 20rpx;
			width: 710rpx;
			height: 258rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 30rpx;
			.top{
				text{
					height: 96rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1F1F1F;
				}
			}
			.mid{
				margin-top: 30rpx;
				width: 670rpx;
				height: 2rpx;
				background: #EEEEEE;
				border-radius: 0rpx 20rpx 20rpx 20rpx;
			}
			.bottom{
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.btn{
					margin-left:20rpx;
					box-sizing: border-box;
					width: 146rpx;
					height: 60rpx;
					background: #FFFFFF;
					border-radius: 30rpx;
					border: 2rpx solid #EEEEEE;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						height: 28rpx;
						width: 28rpx;
						margin-right: 10rpx;
					}
					text{
						width: 48rpx;
						height: 34rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1F1F1F;
						opacity: 0.6;
					}
				}
			}
		}
	}
}
</style>