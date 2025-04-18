<template>
  <view class="classify">
    <!-- header -->
    <custom-header>
      <template #name>分类</template>
      <template #fill>分类</template>
    </custom-header>
    <!-- serach -->
    <view class="search">
		<image class="search-image" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
		<qiaoSelect
			class="search-select"
			:keyId="1" 
			:dataList="orgArray" 
			:searchKey="searchModelKey"
			:showField="showModelField"
			phText="请输入品牌型号" 
			:showBorder="false" 
			:disabled="false" 
			@change="selectChange" 
			@input="handleInput"
		></qiaoSelect>
		
      <!-- <image src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFill"></image>
      <input v-model="searchInput" placeholder="请输入品牌型号" class="search-input" /> -->
    </view>
    <!-- 1级分类tabs -->
    <view class="tabs">
      <uv-tabs
        :list="classlist"
        :lineColor="`url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAAXNSR0IArs4c6QAABHFJREFUWEfdV19oW2UU/51zb5Kma9euTVL0SZn/KCLDJulwLVTaZPoyEKwUZDKn+DBEmD4Mp4LIFNmLg8FQ2PRFHFLUaVUw6VwRNmnS+ocOdQiiIErbxNm1a5t7c78jX7bUNDa5Sdk68L6EfN853/n9zvl959xL+B89VOQiABEg2YHu7YpVDwR+Ap0PJFMf3Wi+pdjyLL0s0qCIpjoSqVOl2Ipk9K9Mx6NvMvAEAANXyFkCZM1Gq3PLqe/+vkGkKmMTyRiiOttGJ+c0tpXKzMYj7zYaxqOLjlqFmYmglPo2kEyHCVi9uUHsXLBNBJPpyAqZzM5wVITPAGishE8gz4cS6dc3CP9KmOlYeAcTjwJoWCs2AXkRPBZMpk4WKpOJR54R0JHSSpU7imCpyaY7GsfGf98oQtLV5cm0GSeYsLuSJLRyIDjUnhh/qUBmOh7Zx8BRgLgSUC8TckqdDWbV/TQ5aW8EoWy8+2GDMWwrqRiONRfBq4FE6sUrlXkgEhFFWmabqoH0MWtCny5YjYO3jo0tX09CmVj0IYF8QERUmUoBQU4Eu0PJ1PC/DSAW+dhg3uVIdddCa4G8F8iqPderQjPx8F6AjhHI55owwW/BZOqWVd3sTB/Mu73RDBO1KBdCm00D83nnbcehgx2nx6ddA9Zo8EdfV8Bj0uM+0zxsKQWXisBvMBYtZyh0Ov3+KjL6z0z/vb0e0/OVbg9uz1XJ/Qil9gVHJ8bc7N32M7HIHkW038d0j1XljhTP8RDBEnUhlEjfVVxbkZlekMFBY2bu12Mm6Kl6BooIThiX6Nn28fFLbqDL92f7w0Ni0CGTeKubxMt8HQNqW1ti4vyaZPTixb5trXmv9xMvU28tGdI+uko6K0uOOg5SHxqGMdXWND9Dwz9YxUC6zWZbvCExnJvA6BAlvQA92WQa7UtKwU3a/xkVSvaGRtPvlK6vqkxxY3bXjmbk7M8biHuWVe018jDB1ukl+YXAWSGxoJDTDV9EmgFqAxD0MrVoIeeVuN6LMhLS6jFpzsq/EEimXisnuCYZbfTXQFeLQ8Y5InS636B6xbU+ey8RbCUHAsnU4bVOqEim0BBi3bcTyYiP+c5cHRVaH9TKXnqSO5AciXo6mJw8XsmyKhntNN3f3WGwHN1k8uBC2UvotQa91nn6zcNyxCZWPYEvJlLVYrqSWblHscgrRHQAgHcjZFcYzgJbgCQtzg0Fz16Yd0tezWQKshuIPMKM5zzM0byg7g7kBkbv6yaiQVlKvgTkSDCRHqnFT9vURabYGATmgEPqLb9htNfT7aqB8jJDS2rBdj4jyBvtreY5Gv56qVYi6yJTenhmZ/igKN4PKnwH+elqctxkWJJBLaNlQBYgcjKwOP8y1SCndTcAt8zoYXgxYGxXCvcBEhWirSSyRYhaGdjcbBqFWaLHz2VH5QH8KZCfCPheKZnyML4pneJu8a5JA6glyM8P3uYLLDX5l/3kMRWbLGzaINPHLPp7wWORbfuWLTH58s0jk4u1nFmPzT/Acc8nAVrxrAAAAABJRU5ErkJggg==') 100% 100%`"
        lineWidth="25"
        lineHeight="8"
        :fontSize="32"
        :inactiveStyle="{
          color: '#1F1F1F',
          opacity: 0.6
        }"
        :activeStyle="{ color: '#303133', fontWeight: 'bold' }"
        @change="uvTabs1Change"
        :current="activeTab1Index"
      ></uv-tabs>
    </view>

    <!-- main -->
	<view class="main">
    <!-- <view class="main" v-if="classlist.length > 0"> -->
      <view class="main-l">
		   <!-- <scroll-view class="scroll-l" scroll-y :style="{ height: 1085 + 'rpx' }"> -->
        <scroll-view class="scroll-l" scroll-y :style="{ height: 1065 + 'rpx' }">
			<!-- :style="{ background: index === activeCard ? 'linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%)' : '#ffffff' }" -->
          <view
            v-for="(item, index) in brandlist"
            :key="item.id"
            class="main-l-card"
			:class="{ 'model-selected': index===activeCard }"
            @click="changeCardColor(index)"
          >
            <text>{{ item.name }}</text>
          </view>
        </scroll-view>
      </view>
      <view class="main-r">
        <view class="box" style="height: 1070rpx;width: 100%;">
          <z-paging
            ref="paging"
            show-refresher-update-time
			:default-page-size = "20"
            :fixed="false"
            v-model="dataList"
            @query="queryList"
          >
            <template #top>
              <view>
                <uv-tabs
                  :list="serieslist"
                  lineWidth="0"
                  lineHeight="0"
                  :fontSize="24"
				  :keyName="key"
                  :activeStyle="{
                    padding: '0 10rpx',
                    fontSize: '28rpx',
                    backgroundColor: '#FFEEEC',
                    color: '#ED5446',
                    fontWeight: 'bold',
                    backGround: '#FFEEEC',
                    borderRadius: '4rpx 4rpx 4rpx 4rpx'
                  }"
                  :inactiveStyle="{
                    padding: '0 10rpx',
                    fontSize: '24rpx',
                    backgroundColor: '#F2F3F6',
                    borderRadius: '4rpx 4rpx 4rpx 4rpx',
                    opacity: 0.6
                  }"
                  @change="uvTabsChange2"
                  :current="activeTab2Index"
                ></uv-tabs>
              </view>
            </template>
            <view class="main-card">
				 <!-- @click="goPage('/pagesProduct/product/product?id=' + item.xhid)" -->
              <view
                class="main-card-box button-animation"
                v-for="item in dataList"
                :key="item.id"
                :id="'box-' + item.xlid + '-' + item.id"
				@click="goPage('/pagesProduct/product/product?id=' + item.xhid + '&title=' + item.xhname)"
              >
			  
				<van-image width="125rpx" height="140rpx" fit="fill" class="image-1" :src="'https://www.xzxskj.com'+item.imgs">
				  <template v-slot:error>加载失败</template>
				</van-image>
                <text class="text-1">{{ item.xhname }}</text>
                <text class="text-2">实时库存：{{ item.num }}</text>
                <view class="card-bottom">
                  <text class="text-5">￥</text>
                  <text class="text-3">{{ item.price }}</text>
                  <text class="text-4">起</text>
                </view>
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
    <custom-shop-tabbar></custom-shop-tabbar>
  </view>
</template>

<script setup>
import { apiSearchModel } from '@/api/search/search.js';
// import { debounce } from '@/utils/debounce.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
import { useShare  } from '../../utils/common.js';
import { apiGetClasstify } from '@/api/classitify/classtify.js';
import { computed, onMounted } from 'vue';
import { useTabStore } from '@/stores/tabStore';

const orgArray = ref([])
const searchModelKey = ref('xhname');
const showModelField = ref('xhname');
const selectChange = (e)=>{
	console.log(e);
	if(e){
		uni.navigateTo({
			url:'/pagesProduct/product/product?title='+e.xhname+'&id='+e.xhid
		})
	}
}
// const debounceHandleInput = debounce(handleInput, 300,true);

const handleInput =async (inputText) => {
	if (inputText.length>0) {
		console.log('inputText',inputText)
		uni.showLoading({
			title: '加载中',
			mask:true
		});
		const res =await apiSearchModelData(inputText);
		console.log('云端搜索 res:',res)
		if (res) {
		    console.log("==================================");
			orgArray.value = []
			orgArray.value = [...res]
		    console.log('orgArray', orgArray.value);
		    console.log("==================================");
		}
		uni.hideLoading();
	}
};
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


const key = ref('xlname')
const searchInput = ref('');
const activeTab2Index = ref(-1);
const cardColors = ref([]);
const activeCard = ref(0);
const activeTab1Index = ref(0);
const classlist = ref([]);
const brandlist = ref([]);
const serieslist = ref([]);
const marquelist = ref([]);
const paging = ref(null);
const dataList = ref([]);

// 参数
const param = ref({
  classid: '1', // 默认
  brandid: '1', // 默认
  seriesid: '', // 默认
  pageNo: '',
  pageSize: '',
  start:'',
});

const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  // param.value.pageNo = pageNo;
  // param.value.pageSize = pageSize;
  param.value.start = pageNo-1
  const data = await getPagingData(param);
  console.log('data:', data);
  paging.value.complete(data);
};

const swiperAnimationfinish = (e) => {
  activeTab2Index.value = e.detail.current;
};

// 二级分类 品牌
const changeCardColor = (index) => {
  // 更新被点击的卡片索引
  activeCard.value = index;
  param.value.brandid = brandlist.value[index].id;
  param.value.seriesid = '';
  activeTab2Index.value = -1;
  reload();
};

const getPagingData = async (param) => {
  const data = {
    classid: param.value.classid,
    brandid: param.value.brandid,
    seriesid: param.value.seriesid,
	start:param.value.start
	// hasNum:'1'
  };
  const res = await apiGetClasstify(data);
  if (res.code === '200') {
    classlist.value = res.classlist;
    brandlist.value = res.brandlist;
    serieslist.value = res.serieslist;
	
    // return res.marquelist.filter((item) => parseInt(item.num) > 0);
	// const sortedMarquelist = res.marquelist.sort((a, b) => {
	// 	return parseInt(a.xlid) - parseInt(b.xlid);
	// });
	// const sortedMarquelist = res.marquelist.sort((a, b) => {
	// 	return parseInt(a.xlid) - parseInt(b.xlid);
	// });
	// const sortedMarquelist = res.marquelist.filter((item) => parseInt(item.num) > 0).sort((a, b) => {
	// 	return parseInt(a.xlid) - parseInt(b.xlid);
	// });
	// console.log('res.marquelist',res.marquelist)
	// console.log('res.marquelist',sortedMarquelist)
	return res.marquelist;
  } else {
    return false;
  }
};

//1级分类
const uvTabs1Change = (e) => {
	console.log('分类标签切换触发:', e.index);
	if (e.index !== undefined) {
		activeTab1Index.value = e.index;
		//重新获取数据
		param.value.classid = classlist.value[activeTab1Index.value].id;
		param.value.brandid = ''
		param.value.seriesid = ''
		activeCard.value = 0
		activeTab1Index.value = 0
		activeTab2Index.value = -1
		reload()
	} else {
		console.error('标签索引错误或标签数据不存在');
	}
};

//点击系列
const uvTabsChange2 =async (e) => {
	console.log('系列切换了标签:', e.index);
	if (e.index !== undefined) {
		activeTab2Index.value = e.index;
		param.value.seriesid = serieslist.value[activeTab2Index.value].id;
		param.value.brandid = brandlist.value[activeCard.value].id;
		reload()
	} else {
		console.error('标签索引错误');
	}
};


const goPage = (path) => {
	uni.navigateTo({
		url: path
	});
};
const { sharePath, onShareAppMessage, onShareTimeline } = useShare({
    title: '自定义分享标题',
    path: getCurrentPages().pop().route,
    desc: '自定义分享描述'
});
const reload = () => {
	nextTick(() => {
		paging.value && paging.value.reload(true);
	});
};

onLoad((query)=>{
	// if (query.res) {
	// 	//预数据
	//   const res = JSON.parse(decodeURIComponent(query.res));
	//   classlist.value = res.classlist;
	//   brandlist.value = res.brandlist;
	//   serieslist.value = res.serieslist;
	// }
})
onShow(()=>{
	useTabStore().setCurrentTabIndex(0);
})
</script>

<style lang="scss" scoped>
.search-select {
	width: 100%;
	margin-right: 30rpx;
}
.classify {
	background: #f3f2f6;
	.search {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin: 15rpx 20rpx;
		width: 710rpx;
		height: 72rpx;
		background: #ffffff;
		box-shadow: 4rpx 4rpx 20rpx 2rpx rgba(59, 43, 15, 0.2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		border: 2rpx solid #242424;
		image {
			height: 30rpx;
			width: 30rpx;
			margin-left: 30rpx;
			margin-right: 15rpx;
		}
		text {
			width: 182rpx;
			height: 36rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			color: #1f1f1f;
			opacity: 0.6;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
	}
	.tabs {
		height: 70rpx;
		margin: 10rpx 0rpx;
	}

	.main {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		.main-l {
			width: 144rpx;
			// border: 2rpx solid red;
			background: #ffffff;
			border-radius: 0rpx 20rpx 20rpx 0rpx;
			display: flex;
			flex-direction: column;
			justify-items: center;
			align-items: center;
			
			.main-l-card {
				width: 144rpx;
				height: 96rpx;
				display: flex;
				align-items: center;
				border-radius: 0rpx 20rpx 20rpx 0rpx;
				justify-content: center;
				// background:#FFFFFF;
				// animation: fadeIn 1.5s ease;
				transition: all 0.3s; // 添加过渡效果
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1f1f1f;
					text-align: center;
				}
			}
		}
		.main-r {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0rpx 20rpx;
			width: 590rpx;
			// flex: 1;
			.scroll-x {
				white-space: nowrap;
			}
			.main-card {
				// display: grid;
				// grid-template-columns: 50% 50%;
				// padding-left: 15rpx;
				// padding-right: 15rpx;
				
				 display: grid;
				 grid-template-columns: repeat(2, 1fr); /* 两列等宽 */
				 grid-gap: 15rpx; /* 网格项之间的间距 */
				 padding: 15rpx;
				 // border: 1rpx solid black;
				
				// .scroll-box{
				// 	width: 100%;
					
				// }
				// .main-box {
				// 	border: 1rpx solid red;
				// 	padding: 15rpx 15rpx;
				// 	display: flex;
				// 	justify-content: space-between;
				// 	flex-wrap: wrap;
					.main-card-box {
						// border: 1rpx solid red;
						// width: 48%;
						// width: 258rpx;
						height: 302rpx;
						background: linear-gradient(180deg, #f3f2f6 0%, #fdfdfe 100%);
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						image {
							height: 140rpx;
							width: 140rpx;
						}
						.card-bottom {
							.text-3 {
								height: 38rpx;
								font-family: DIN, DIN;
								font-weight: bold;
								font-size: 32rpx;
								color: #e6432e;
							}
							.text-4 {
								margin-left: 4rpx;
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #1f1f1f;
							}
							.text-5 {
								margin-right: 4rpx;
								height: 32rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 22rpx;
								color: #e6432e;
							}
						}
						.text-1 {
							margin-top: 14rpx;
							height: 34rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1f1f1f;
						}

						.text-2 {
							height: 32rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 22rpx;
							color: #1f1f1f;
							opacity: 0.6;
						}
					}
				// }
			}
		}
	}
}
.model-selected {
  background: linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%);
   // transform: scale(1.2); // 添加缩放效果
 //   transform: translateX(10rpx);
	// transition: all 0.3s;
}

.model-selected {
  background: linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%);
  transform: scale(1.1) rotate(10deg) translateX(10px);
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

@keyframes scaleIn {
  from {
	transform: scale(0);
  }
  to {
	transform: scale(1);
  }
}
@keyframes fadeIn {
  from {
	opacity: 0;
  }
  to {
	opacity: 1;
  }
}


</style>
