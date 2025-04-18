<template>
  <view class="productEditPrice-layout">
    <!-- title -->
    <view class="title">
      <text>修改信息</text>
      <image src="https://www.xzxskj.com/xcximg/icon_close@3x.png" mode="aspectFill" @click="$emit('close')"></image>
    </view>
    <!-- 产品信息 product-card-->
    <view class="product-card-list">
      <view v-if="props.selectedGood" class="product-card">
        <view class="product-card-l">
			<van-image lazy-load width="190rpx" height="190rpx" radius='18rpx' fit="fill" :src="props.selectedGood.cover">
			  <template v-slot:error>加载失败</template>
			</van-image>
          <!-- <image src="/pagesProduct/static/images/demo/product@3x.png" mode="aspectFit"></image> -->
        </view>
        <view class="product-card-r">
		 <view>
			<view class="top">
			  <view class="top-tap" v-if="csinfos?.name || props.selectedGood.finenessname">
				  <text class="top-tap-text">{{csinfos?.name || props.selectedGood.finenessname}}</text>
			  </view>
			  <view style="{clear:both}"></view>
			  <text class="top-text">{{props.selectedGood.name}}</text>
			</view>
			<view class="mid">
			  <view class="version-tap">
				<text>{{formatGoodData(props.selectedGood)}}</text>
			  </view>
			</view>
		 </view>
          
          <view class="bottom">
            <view class="bottom-l">
              <text class="bottom1">批发价:</text>
              <text class="bottom2">￥{{props.selectedGood.price}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- edit card -->
    <view class="edit-price">
      <view class="title">
        <text>修改售价</text>
      </view>
      <view class="content">
        <image src="https://www.xzxskj.com/xcximg/qian@3x.png" mode="aspectFill"></image>
        <input type="number" v-model="editePrice" placeholder="请输入修改金额" />
      </view>
      <view class="divile"></view>
    </view>
    <!-- card -->
    <view class="chengSeCard">
      <view class="left">
        <text>商品成色</text>
      </view>
      <view class="right">
        <text>{{csinfos?csinfos.name:props.selectedGood.finenessname}}</text>
      </view>
    </view>
    <scroll-view scroll-y style="height: 400rpx; background-color: #FFFFFF;border-radius:20rpx">
      <view class="collapseCard">
        <uni-collapse ref="collapseRef" class='collapse'>
          <uni-collapse-item :open="false" class="collapse" v-for="(item, collapseIndex) in list" :key="collapseIndex" titleBorder="none" :border="false">
            <template v-slot:title>
              <uni-list :border="false">
                <uni-list-item>
                  <template v-slot:header>
                    <text class="co-header">{{item.name}}</text>
                  </template>
                  <template v-slot:footer>
                    <text class="co-foot">{{ selectedText[collapseIndex]?.name }}</text> <!-- 绑定点击的文本 -->
                  </template>
                </uni-list-item>
              </uni-list>
            </template>
            <view class="divile" />
            <view class="content">
              <view :class="{ 'clicked': clickedIndexArray[collapseIndex][cardIndex] }" class="card" v-for="(item1, cardIndex) in item.items" :key="cardIndex" @click="handleCardClick(collapseIndex, cardIndex, item1)">
                <text :class="{ 'clicked-text': clickedIndexArray[collapseIndex][cardIndex] }" class="card-text">{{ item1.name }}</text>
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </scroll-view>
  </view>
  <view class="fill"></view>
  <!--bar -->
  <view class="pannel-btn">
    <view class="btn1 button-animation" @click="onCancel">
      <text>商品管理</text>
    </view>
    <view class="btn2 button-animation" @click="onConfirm">
      <text>确认修改</text>
    </view>
  </view>
</template>


<script setup>
import { ref, watch } from 'vue';
import { apiFinenessList, apiSelectedFineness,apiEditProductInfo } from '@/api/product/product.js';
const emit = defineEmits(['close','reLoad']);
const props = defineProps({
    selectedGood: {
        type: Object,
    },
	combinationname: {
		type: Array,
		default: []
	}
});

const editePrice = ref()
const list = ref([]);
const clickedIndexArray = ref([]);
const selectedText = ref([]); 

const handleCardClick = (collapseIndex, cardIndex, item) => {
    clickedIndexArray.value[collapseIndex].fill(false);
    clickedIndexArray.value[collapseIndex][cardIndex] = !clickedIndexArray.value[collapseIndex][cardIndex];
    selectedText.value[collapseIndex] = item; 
};

const apiFinenessListData = async () => {
    const data = {
        opid: uni.getStorageSync('sessionInfo').opid,
        id: props.selectedGood.id,
    };
    try {
        const res = await apiFinenessList(data);
        if (res.code === 200) {
            const { cslists, yjlist } = res;
            if (Array.isArray(cslists) && yjlist && Array.isArray(yjlist.yjlists)) {
                list.value = [
                    ...cslists.map(item => ({
                        name: item.name,
                        items: item.er.map(erItem => ({ name: erItem.name, id: erItem.id }))
                    })),
                    { name: yjlist.name, items: yjlist.yjlists.map(item => ({ name: item.name, id: item.id })) }
                ];
                clickedIndexArray.value = list.value.map(item => Array(item.items.length).fill(false));
                selectedText.value = list.value.map(() => null);
            } else {
                console.error('Invalid data structure', res);
            }
        } else {
            console.error('API returned an error', res);
        }
    } catch (error) {
        console.error('API call failed', error);
    }
};

watch(selectedText, (newVal) => {
    if (newVal.every(item => item !== null)) {
        apiSelectedFinenessData();
    }
}, { deep: true });

const csinfos = ref();
const apiSelectedFinenessData = async () => {
    const csidArray = selectedText.value.map(item => item.id);
    const data = {
        opid: uni.getStorageSync('sessionInfo').opid,
        id: props.selectedGood.id,
        csid: csidArray.join(',')
    };
    try {
        const res = await apiSelectedFineness(data);
        if (res.code === 200) {
			csinfos.value = res.csinfos;
        } else {
		
			uni.showToast({
			    title: '未找到匹配成色，请联系客服',
			    icon: 'error',
				duration: 2000,
			});
            console.error('API returned an error', res);
        }
    } catch (error) {
        console.error('API call failed', error);
    }
};

function formatGoodData(selectedGood) {
    const {
        gjbbname,    // 国行
        wlbbname,    // 全网通
        bxzt,        // 有保
        efficiency,  // 电池99%
        delivery     // 深圳发货
    } = selectedGood;
    const parts = [];
    if (gjbbname) parts.push(gjbbname);
    if (wlbbname) parts.push(wlbbname);
    if (bxzt) parts.push(bxzt);
    if (efficiency) parts.push(`电池${efficiency}%`);
    if (delivery) parts.push(`${delivery}发货`);
    const formattedString = parts.join('丨');
    return formattedString;
}


const apiEditProductInfoData = async (csidArray) => {
	// const csidArray = selectedText.value.map(item => item.id);
    const data = {
        opid: uni.getStorageSync('sessionInfo').opid,
        id: props.selectedGood.id,
        price: editePrice.value?editePrice.value:'',
        zhid: csinfos.value?csinfos.value.id:'',
		csid: csidArray.join(',')
    };
    try {
        const res = await apiEditProductInfo(data);
        if (res.code === 200) {
            console.log('Edit product info success', res);
			uni.showToast({
                title: '修改成功',
                icon: 'success',
				duration: 2000,
            });
			setTimeout(() => {
				emit('close');
				emit('reLoad');
			}, 2000);
			
        } else {
            console.error('API returned an error', res);
        }
    } catch (error) {
        console.error('API call failed', error);
    }
};

// const onConfirm = () => {
// 	console.log('editePrice.value:',editePrice.value);
// 	console.log('csinfos.value:',csinfos.value);
//     if (editePrice.value || csinfos.value) {
//       apiEditProductInfoData();
//     }else{
// 		uni.showToast({
// 		    title: '请输入修改金额或者选择成色信息',
// 		    icon: 'none',
// 			duration:2000
// 		});
// 	}
// };
const onConfirm = () => {
  console.log('props.selectedGood', props.selectedGood);
  console.log('editePrice.value:', editePrice.value);
  console.log('csinfos.value:', csinfos.value);
  
  // 检查价格和成色的存在情况
  const hasPrice = !!editePrice.value; // 有价格
  const hasFineness = !!csinfos.value; // 有成色
  
  // 如果有成色，校验 selectedText.value 中是否没有 null
  const isSelectedTextValid = selectedText.value.every(item => item !== null);

  // 三种情况的处理逻辑
  if (hasPrice && hasFineness) {
    // 有价格且有成色，需要校验成色信息的有效性
    if (!isSelectedTextValid) {
      uni.showToast({
        title: '请选择完整的成色信息',
        icon: 'none',
        duration: 500
      });
      return;
    }
	const csidArray = selectedText.value.map(item => item.id);
    apiEditProductInfoData(csidArray); // 成色信息有效，调用接口
  } else if (hasPrice) {
	  const csidArray = []
    // 只有价格
    apiEditProductInfoData(csidArray);
  } else if (hasFineness) {
    // 只有成色，需要校验成色信息的有效性
    if (!isSelectedTextValid) {
      uni.showToast({
        title: '请选择完整的成色信息',
        icon: 'none',
        duration: 500
      });
      return;
    }
	const csidArray = selectedText.value.map(item => item.id);
    apiEditProductInfoData(csidArray); // 成色信息有效，调用接口
  } else {
    // 没有价格也没有成色
    uni.showToast({
      title: '请输入修改金额或者选择成色信息',
      icon: 'none',
      duration: 500
    });
  }
};


onMounted(async() => {
    await apiFinenessListData();
	props.combinationname.forEach((name, index) => {
		list.value.forEach((listItem, collapseIndex) => {
			listItem.items.forEach((item, cardIndex) => {
				if (item.name === name) {
					handleCardClick(collapseIndex, cardIndex, item);
				}
			});
		});
	});
});

</script>

<style lang="scss" scoped>
	.productEditPrice-layout{
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
					
				}
				.product-card-r {
					// border: 2rpx solid red;
					height: 190rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.top {
						display: inline-block;
						.top-tap {
							margin-right: 10rpx;
							float: left;
							height: 40rpx;
							padding-left: 4rpx;
							padding-right: 4rpx;
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
							height: 40rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: #1f1f1f;
							vertical-align: top;
							text-align: justify;
							word-break: break-all;
							text-justify: auto;
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
	
</style>
