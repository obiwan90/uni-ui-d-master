<template>
	<view class="layout">
		<!-- header -->
		<custom-header>
			<template #name>回收报价</template>
			<template #fill>回收报价</template>
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
		<!-- tabs -->
		<view class="tabs">
			<uv-tabs
				:list="classlist"
				:lineColor="`url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAAXNSR0IArs4c6QAABHFJREFUWEfdV19oW2UU/51zb5Kma9euTVL0SZn/KCLDJulwLVTaZPoyEKwUZDKn+DBEmD4Mp4LIFNmLg8FQ2PRFHFLUaVUw6VwRNmnS+ocOdQiiIErbxNm1a5t7c78jX7bUNDa5Sdk68L6EfN853/n9zvl959xL+B89VOQiABEg2YHu7YpVDwR+Ap0PJFMf3Wi+pdjyLL0s0qCIpjoSqVOl2Ipk9K9Mx6NvMvAEAANXyFkCZM1Gq3PLqe/+vkGkKmMTyRiiOttGJ+c0tpXKzMYj7zYaxqOLjlqFmYmglPo2kEyHCVi9uUHsXLBNBJPpyAqZzM5wVITPAGishE8gz4cS6dc3CP9KmOlYeAcTjwJoWCs2AXkRPBZMpk4WKpOJR54R0JHSSpU7imCpyaY7GsfGf98oQtLV5cm0GSeYsLuSJLRyIDjUnhh/qUBmOh7Zx8BRgLgSUC8TckqdDWbV/TQ5aW8EoWy8+2GDMWwrqRiONRfBq4FE6sUrlXkgEhFFWmabqoH0MWtCny5YjYO3jo0tX09CmVj0IYF8QERUmUoBQU4Eu0PJ1PC/DSAW+dhg3uVIdddCa4G8F8iqPderQjPx8F6AjhHI55owwW/BZOqWVd3sTB/Mu73RDBO1KBdCm00D83nnbcehgx2nx6ddA9Zo8EdfV8Bj0uM+0zxsKQWXisBvMBYtZyh0Ov3+KjL6z0z/vb0e0/OVbg9uz1XJ/Qil9gVHJ8bc7N32M7HIHkW038d0j1XljhTP8RDBEnUhlEjfVVxbkZlekMFBY2bu12Mm6Kl6BooIThiX6Nn28fFLbqDL92f7w0Ni0CGTeKubxMt8HQNqW1ti4vyaZPTixb5trXmv9xMvU28tGdI+uko6K0uOOg5SHxqGMdXWND9Dwz9YxUC6zWZbvCExnJvA6BAlvQA92WQa7UtKwU3a/xkVSvaGRtPvlK6vqkxxY3bXjmbk7M8biHuWVe018jDB1ukl+YXAWSGxoJDTDV9EmgFqAxD0MrVoIeeVuN6LMhLS6jFpzsq/EEimXisnuCYZbfTXQFeLQ8Y5InS636B6xbU+ey8RbCUHAsnU4bVOqEim0BBi3bcTyYiP+c5cHRVaH9TKXnqSO5AciXo6mJw8XsmyKhntNN3f3WGwHN1k8uBC2UvotQa91nn6zcNyxCZWPYEvJlLVYrqSWblHscgrRHQAgHcjZFcYzgJbgCQtzg0Fz16Yd0tezWQKshuIPMKM5zzM0byg7g7kBkbv6yaiQVlKvgTkSDCRHqnFT9vURabYGATmgEPqLb9htNfT7aqB8jJDS2rBdj4jyBvtreY5Gv56qVYi6yJTenhmZ/igKN4PKnwH+elqctxkWJJBLaNlQBYgcjKwOP8y1SCndTcAt8zoYXgxYGxXCvcBEhWirSSyRYhaGdjcbBqFWaLHz2VH5QH8KZCfCPheKZnyML4pneJu8a5JA6glyM8P3uYLLDX5l/3kMRWbLGzaINPHLPp7wWORbfuWLTH58s0jk4u1nFmPzT/Acc8nAVrxrAAAAABJRU5ErkJggg==') 100% 100%`"
				lineWidth="25"
				lineHeight="8"
				:fontSize="32"
				:activeStyle="{ color: '#303133', fontWeight: 'bold' }"
				@change="uvTabs1Change"
				:current="activeTab1Index"
				class="myTabs"
			></uv-tabs>
		</view>
		<!-- main -->
		<!-- main -->
		<view class="main">
			<view class="main-l">
				<scroll-view class="scroll-l" scroll-y :style="{ height: 1170 + 'rpx' }">
					<view
					    v-for="(item, index) in brandlist"
					    :key="index"
					    class="main-l-card"
					    :class="{ selected: index === activeCard }"
					    @click="changeCardColor(index)"
					>
					    <text>{{ item.name }}</text>
					</view>
		
				</scroll-view>
			</view>
			<view class="main-r">
				<view class="main-r-tabs">
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
		
				<view class="scroll-content">
					<z-paging 
						style="height: 1070rpx;width: 592rpx;"
						ref="paging"
						show-refresher-update-time
						:default-page-size="20"
						:fixed="false"
						v-model="dataList"
						@query="queryList"
					>
						<view class="main-box" v-for="(item, index) in transformedData" :key="index" >
							<view class="box-header">
								<text>{{ item.name }}</text>
							</view>
							<view class="box-content">
								<view class="box-card" 
									v-for="(item1, index1) in item.products" 
									:key="index1"
									@click="goDetail('/pagesRecoveryDetail/recoveryDetail/recoveryDetail?id='+item1.xhid+'&ppid='+param.brandid+'&name='+item1.xhname+'&flid='+classlist[activeTab1Index].id)"
								>
									<text style="text-align: center;">{{item1.xhname}}</text>
									
								</view>
							</view>
						</view>
					</z-paging>
				</view>
			</view>
		</view>
	</view>
	<!-- <custom-shop-tabbar></custom-shop-tabbar> -->
</template>

<script setup>
import { apiSearchModel } from '@/api/search/search.js';
// import { debounce } from '@/utils/debounce.js'
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
import { useShare  } from '../../utils/common.js';
import { apiGetClasstify } from '@/api/classitify/classtify.js';
import { apiRecycleClassify } from '../api/api.js'

const orgArray = ref([])
const searchModelKey = ref('xhname');
const showModelField = ref('xhname');
const selectChange = (e)=>{
	console.log(e);
	// @click="goDetail('/pagesRecoveryDetail/recoveryDetail/recoveryDetail?id='+item1.xhid+'&ppid='+param.brandid+'&name='+item1.xhname+'&flid='+classlist[activeTab1Index].id)"
	if(e){
		uni.navigateTo({
			url:'/pagesRecoveryDetail/recoveryDetail/recoveryDetail?id='+e.xhid+'&ppid='+e.ppid+'&name='+e.xhname+'&flid='+e.flid
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
const paging = ref(null);
const dataList = ref([]);
const activeCard = ref(0); // 初始化为0，表示默认选中第一个
const activeTab1Index = ref(0);
const activeTab2Index = ref(-1);
const { sharePath, onShareAppMessage, onShareTimeline } = useShare({
    title: '自定义分享标题',
    path: getCurrentPages().pop().route,
    desc: '自定义分享描述'
});
const transformedData = ref([]);
const queryList = async (pageNo, pageSize) => {
  console.log('pageNo:', pageNo);
  console.log('pageSize:', pageSize);
  param.value.start = pageNo - 1;
  const data = await getPagingData(param);
  console.log('data:', data);
  
  // 初始化一个临时变量来存储合并后的数据
  let allData = [];
  if (data) {
    // 如果是第一页，直接使用新获取的数据
    if (pageNo === 1) {
      allData = data;
    } else {
      // 否则，将新数据追加到当前的 transformedData 中
      const existingData = transformedData.value.reduce((acc, item) => {
        return [...acc, ...item.products];
      }, []);
      allData = [...existingData, ...data];
    }
  } else {
    allData = [];
  }
  
  // 完成分页请求
  paging.value.complete(data);
  
  const groupedData = {};
  // 遍历合并后的数据列表并分组
  allData.forEach(item => {
    const key = item.xlname.trim(); // 去除前后空格
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });
  
  // 转化为所需结构
  transformedData.value = Object.entries(groupedData).map(([key, value]) => ({ name: key, products: value }));
  console.log(transformedData.value);
};


const uvTabs1Change = (e) => {
	console.log('分类标签切换触发:', e.index);
	if (e.index !== undefined) {
		activeTab1Index.value = e.index;
		//重新获取数据
		param.value.classid = classlist.value[activeTab1Index.value].id;
		param.value.brandid = '';
		param.value.seriesid = '';
		activeCard.value = 0;
		activeTab2Index.value = -1;
		reload();
	} else {
		console.error('标签索引错误或标签数据不存在');
	}
};

const changeCardColor = (index) => {
    // 更新被点击的卡片索引
    activeCard.value = index;
    param.value.brandid = brandlist.value[index].id;
    param.value.seriesid = '';
    activeTab2Index.value = -1;
    reload();
};

const uvTabsChange2 = (e) => {
	console.log('系列切换了标签:', e.index);
	if (e.index !== undefined) {
		activeTab2Index.value = e.index;
		param.value.seriesid = serieslist.value[activeTab2Index.value].id;
		param.value.brandid = brandlist.value[activeCard.value].id;
		reload();
	} else {
		console.error('标签索引错误');
	}
};
const classlist = ref([]);
const brandlist = ref([]);
const serieslist = ref([]);
const marquelist = ref([]);
// 参数
const param = ref({
  classid: '1', // 默认
  brandid: '1', // 默认
  seriesid: '', // 默认
  start: '0',
});

const getPagingData = async (param) => {
  const data = {
    classid: param.value.classid,
    brandid: param.value.brandid,
    seriesid: param.value.seriesid,
	start: param.value.start
  };
  const res = await apiRecycleClassify(data);
  if (res.code === '200') {
    classlist.value = res.classlist;
    brandlist.value = res.brandlist;
    serieslist.value = res.serieslist;
   
	const sortedMarquelist = res.marquelist.sort((a, b) => {
		return parseInt(a.xlid) - parseInt(b.xlid);
	});
	return sortedMarquelist;
  } else {
    return false;
  }
};

const goDetail = (path)=>{
	uni.navigateTo({
		url: path
	});
};

const reload = () => {
	nextTick(() => {
		paging.value && paging.value.reload(true);
	});
};
</script>

<style lang="scss" scoped>
.search-select {
	width: 100%;
	margin-right: 30rpx;
}
.layout {
	background: #F3F2F6;
	min-height: 100vh;
	// height: 100vh;
	// box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.1);
	.search {
		display: flex;
		align-items: center;
		margin: 15rpx 20rpx;
		// margin-left: 30rpx;
		// margin-right: 30rpx;
		width: 710rpx;
		height: 72rpx;
		background: #F3F2F6;
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
			// color: #7b7b7b;
			color: #1f1f1f;
			opacity: 0.6;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
	}
	.tabs {
		margin-bottom: 20rpx;
	}
	.main {
		display: flex;
		justify-content: space-between;
		.main-l {
		    height: 1170rpx;
		    width: 144rpx;
		    background: #ffffff;
		    border-radius: 0rpx 20rpx 20rpx 0rpx;
		    display: flex;
		    flex-direction: column;
		    justify-items: center;
		    align-items: center;
		
		    .main-l-card {
		        width: 135rpx;
		        height: 96rpx;
		        display: flex;
		        align-items: center;
		        justify-content: center;
		        background: #ffffff;
		        // transition: all 0.3s ease; /* 改为过渡所有属性 */
		        border-radius: 0 20rpx 20rpx 0;
		        text {
		            font-family: PingFang SC, PingFang SC;
		            font-weight: 400;
		            font-size: 28rpx;
		            color: #1f1f1f;
		            text-align: center;
		            transition: color 0.3s ease; /* 为文本颜色添加过渡效果 */
		        }
		    }
		
		    .main-l-card.selected {
				transition: all 0.3s ease;
		        background: linear-gradient(270deg, #FFD0BE 0%, #FFFFFF 100%);
		        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 改变阴影 */
		        border-left: 5px solid #FF7F50; /* 添加左侧边框 */
		        transform: scale(1.05); /* 轻微放大 */
		        text {
		            color: #ED5446; /* 改变文本颜色 */
		            font-weight: bold; /* 加粗文本 */
		        }
		    }
		
		    // .main-l-card:not(.selected):hover {
		    //     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 鼠标悬停时的阴影效果 */
		    //     transform: scale(1.02); /* 鼠标悬停时的轻微放大 */
		    // }
		}
	
	
	
		.main-r {
			box-sizing: border-box;
			width: 592rpx;
			height: 1170rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: column;
			.main-r-tabs {
			}
			.scroll-content {
				height: 100%;
				display: flex;
				flex-direction: column;
				.main-box {
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					margin-right: 30rpx;
					margin-top: 20rpx;
					margin-bottom: 38rpx;
					.box-header {
						margin-bottom: 16rpx;
						text {
							height: 36rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 550;
							font-size: 26rpx;
							color: #1f1f1f;
						}
					}
					.box-content {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 16rpx;
						
						.box-card {
							// margin-top: 16rpx;
							width: 100%;
							height: 64rpx;
							background: #f9f9f9;
							border-radius: 10rpx 10rpx 10rpx 10rpx;
							display: flex;
							align-items: center;
							cursor: pointer;
							&.selected {
								background: #FFD0BE;
							}
							text {
								height: 34rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #1f1f1f;
							}
						}
					}
				}
			}
		}
	}
	
}
</style>
