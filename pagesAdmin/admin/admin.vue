<template>
  <view v-if="isShow">
    <page-container :show="isShow" :overlay="false" @beforeleave="beforeleave"></page-container>
  </view>
  <view class="customMine-layout">
    <!-- header -->
    <view class="header">
      <!-- 状态栏 -->
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
      <!-- 标题栏 -->
      <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
        <text style="animation: bounceInRight 1s ease-in-out">{{ gsname }}</text>
        <view class="images">
          <image v-if="userInfo" src="https://www.xzxskj.com/Public/upload/66c9af1f07aba1458.png" mode="aspectFill"></image>
        </view>
      </view>
    </view>
    <!-- title -->
    <view v-if="userInfo" class="title" style="height: 120rpx;animation: fadeIn 1s ease-in-out;">
      <view class="left">
        <image :src="userInfo.img === '' ? 'https://www.xzxskj.com/xcximg/132.jpg' : 'https://www.xzxskj.com' + userInfo.img" mode="aspectFill"></image>
        <view class="tab">
          <!-- <text class="text-1">{{ userInfo.nik_name === '' ? '微信用户' : userInfo.nik_name }}</text> -->
		  <text class="text-1">{{ username }}</text>
          <view class="admin">
            <text class="text-2">{{ gwname }}</text>
          </view>
        </view>
      </view>
      <view v-if="showSwitch" class="right" @click="openIdentity">
        <image src="https://www.xzxskj.com/xcximg/qiehuan.png" mode="aspectFill"></image>
        <text>切换身份</text>
      </view>
    </view>
    <view v-else class="title" style="height: 120rpx;"></view>

    <scroll-view scroll-y style="height: 1125rpx">
      <!-- price-control -->
      <view v-if="filteredOtherData" class="price-control">
        <view class="left">
          <text>账户余额：¥12500</text>
        </view>
        <view class="right">
          <view class="tab">
            <text>资金管理</text>
          </view>
        </view>
      </view>
      <!-- data-center -->
      <view class="data-center" v-if="filteredOtherData">
        <view class="top">
          <view class="left">
            <text>数据中心</text>
          </view>
          <view class="right" @click="goPage('/pagesDataCenter/dataCenter/dataCenter')">
            <text>全部数据</text>
          </view>
        </view>
        <view class="bottom">
          <view class="data-center-card" v-for="(item, index) in data_center" :key="index">
            <text class="text-1">{{ item.value }}</text>
            <text class="text-2">{{ item.text }}</text>
          </view>
        </view>
      </view>

      <!-- mine-order -->
      <!-- <view v-if="filteredOtherData" class="mine-orders">
        <view class="top">
          <view class="box" v-for="(item, index) in mine_card_datas" :key="index" @click="toggleSelected(index)">
            <uni-badge class="badge" size="small" text="100" absolute="rightTop" type="error">
              <text :class="{ 'selected-text': item.selected }">{{ item.title }}</text>
            </uni-badge>
          </view>
        </view>
        <view class="content" :style="contentPadding">
          <view class="menu-card" v-for="(item1, index) in currentValues" :key="index" @click="goPage(item1.path)">
            <image :src="item1.image" mode="aspectFill"></image>
            <text>{{ item1.text }}</text>
          </view>
        </view>
      </view> -->

      <!-- other-card -->
      <!-- <view v-if="filteredOtherData" class="other-card" v-for="(item, index) in filteredOtherData" :key="index">
        <view class="top">
          <text>{{ item.title }}</text>
        </view>
        <view class="bottom">
          <view class="setting-menu-card" v-for="(item1, index) in item.value" :key="index" @click="goPage(item1.path)">
            <image :src="item1.image" mode="aspectFit"></image>
            <text>{{ item1.text }}</text>
          </view>
        </view>
      </view> -->
      <view style="height: 30rpx"></view>
    </scroll-view>
    <uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="identityPopup" safe-area:false type="center" @close="handleClose" @change="change">
      <view>
        <identity-pannel v-if="showIdentity" @close="handleClose"></identity-pannel>
      </view>
    </uni-popup>
	<custom-tabbar></custom-tabbar>
  </view>
</template>

<script setup>
import { useTabStore } from '@/stores/tabStore';
import { useUserStore } from '@/stores/userInfoStore.js';
import { usePermissionStore } from '@/stores/menuPermissionStore.js';
import { getStatusBarHeight, getTitleBarHeight, getLeftIconLeft } from '@/utils/system.js';

const permissionStore = usePermissionStore();
const menuAuthorityData = ref([]);
const isShow = ref(false);

const beforeleave = (e) => {
  console.log('e:', e);
  isShow.value = false;
  uni.showModal({
    content: '角色已保存',
    showCancel: false,
    success: (res) => {
      if (!res.cancel) {
        // 用户点击了确认
        console.log('用户点击了确认');
        uni.navigateBack({
          delta: getCurrentPages().length - 1
        });
      }
    }
  });
};

const userInfo = ref(null);
const showSwitch = ref(false);
const showIdentity = ref(false);
const identityPopup = ref(null);

const handleClose = () => {
  console.log('Popup is closed');
  identityPopup.value.close();
};

const change = (e) => {
  showIdentity.value = e.show;
};

const openIdentity = () => {
  console.log('Popup is open');
  showIdentity.value = true;
  identityPopup.value.open();
};

const data_center = ref([
  { text: '实时库存', value: '2585' },
  { text: '实时销量', value: '545' },
  { text: '实时售额', value: '120654' },
  { text: '今日上架', value: '255' }
]);

const other_data = ref([
  {
    title: '商品管理',
    menuAuthority: 'productManager',
    value: [
      { text: '商品录入', image: 'https://www.xzxskj.com/xcximg/icon_luru@3x.png', path: '/pagesProductInput/productInput/productInput', menuAuthority: 'productInput' },
      { text: '功能检测', image: 'https://www.xzxskj.com/xcximg/icon_luru@3x.png', path: '/pagesFuncCheck/funcCheck/funcCheck', menuAuthority: 'funcCheck' },
      { text: '维修检测', image: 'https://www.xzxskj.com/xcximg/icon_luru@3x.png', path: '/pagesMaintenanceInput/maintenanceInput/maintenanceInput', menuAuthority: 'maintenanceInput' },
      { text: '拍照', image: 'https://www.xzxskj.com/xcximg/icon_paizhao@3x.png', path: '/pagesTakePhoto/takePhoto/takePhoto', menuAuthority: 'takePhoto' },
      { text: '成色判断', image: 'https://www.xzxskj.com/xcximg/icon_chengse@3x.png', path: '/pagesFinenessJudge/finenessJudge/finenessJudge', menuAuthority: 'finenessJudge' },
      { text: '定价上架', image: 'https://www.xzxskj.com/xcximg/icon_shangjia@3x.png', path: '/pagesListingProduct/listingProduct/listingProduct', menuAuthority: 'listingProduct' },
      { text: '库存管理', image: 'https://www.xzxskj.com/xcximg/icon_kucun@3x.png', path: '/pagesInventoryManager/inventoryManager/inventoryManager', menuAuthority: 'inventoryManager' },
      { text: '快速批发', image: 'https://www.xzxskj.com/xcximg/icon_pifa@3x.png', path: '/pagesFirstWholesale/firstWholeSale/firstWholeSale', menuAuthority: 'firstWholeSale' },
      { text: '串号追踪', image: 'https://www.xzxskj.com/xcximg/icon_chuanhao@3x.png', path: '/pagesImeiTrack/ImeiTrack/imeiTrack', menuAuthority: 'imeiTrack' },
      { text: '质检管理', image: 'https://www.xzxskj.com/xcximg/icon_zhijian@3x.png', path: '/pagesQualityControl/qualityControl/qualityControl', menuAuthority: 'qualityControl' }
    ]
  },
  {
    title: '后台管理',
    menuAuthority: 'back',
    value: [
      { text: '员工岗位', image: 'https://www.xzxskj.com/xcximg/icon_yuangong@3x.png', path: '/pagesStaffManager/staffManager/staffManager', menuAuthority: 'staffManager' },
      { text: '收款账户', image: 'https://www.xzxskj.com/xcximg/icon_shoukuan@3x.png', path: '', menuAuthority: '' },
      { text: '发货地址', image: 'https://www.xzxskj.com/xcximg/icon_dizhi@3x.png', path: '', menuAuthority: '' },
      { text: '客服消息', image: 'https://www.xzxskj.com/xcximg/icon_xiaoxi@3x.png', path: '', menuAuthority: '' },
      { text: '财务对账', image: 'https://www.xzxskj.com/xcximg/icon_kehuguanli@3x.png', path: '/pagesFinance/finance/finance', menuAuthority: 'finance' },
      { text: '客户管理', image: 'https://www.xzxskj.com/xcximg/icon_kehuguanli@3x.png', path: '/pagesCustomManager/customManager/customManager', menuAuthority: 'customManager' }
    ]
  },
  {
    title: '其他',
    menuAuthority: '',
    value: [
      { text: '平台客服', image: 'https://www.xzxskj.com/xcximg/icon_kefu@3x.png', menuAuthority: '' },
      { text: '意见反馈', image: 'https://www.xzxskj.com/xcximg/icon_fankui@3x.png', menuAuthority: '' }
    ]
  }
]);

const mine_card_datas = ref([
  {
    title: '销售订单',
    menuAuthority: '',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_daifukuan@3x.png', text: '待付款', lx: '3', path: '/pagesCustomOrder/customOrder/customOrder?order=' + 3 },
      { image: 'https://www.xzxskj.com/xcximg/icon_daifahuo@3x.png', text: '待发货', lx: '4', path: '/pagesCustomOrder/customOrder/customOrder?order=' + 4 },
      { image: 'https://www.xzxskj.com/xcximg/icon_daishouhuo@3x.png', text: '待收货', lx: '5', path: '/pagesCustomOrder/customOrder/customOrder?order=' + 5 },
      { image: 'https://www.xzxskj.com/xcximg/icon_yishouhou1@3x.png', text: '已收货', lx: '6', path: '/pagesCustomOrder/customOrder/customOrder?order=' + 6 },
      { image: 'https://www.xzxskj.com/xcximg/icon_jianyiwancheng@3x.png', text: '交易完成', lx: '7', path: '/pagesCustomOrder/customOrder/customOrder?order=' + 7 }
    ],
    selected: false
  },
  {
    title: '议价订单',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiazh@3x.png', text: '议价待确认', lx: '2', path: '/pagesCustomOrder/customOrder/customOrder?yj=' + 2 },
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiacg@3x.png', text: '议价成功', lx: '3', path: '/pagesCustomOrder/customOrder/customOrder?yj=' + 3 },
      { image: 'https://www.xzxskj.com/xcximg/icon_yijiasb@3x.png', text: '驳回议价', lx: '4', path: '/pagesCustomOrder/customOrder/customOrder?yj=' + 4 }
    ],
    selected: true
  },
  {
    title: '售后订单',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '售后中', lx: '2', path: '/pagesCustomOrder/customOrder/customOrder?sh=' + 2 },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png', text: '售后成功', lx: '3', path: '/pagesCustomOrder/customOrder/customOrder?sh=' + 3 },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '售后失败', lx: '4', path: '/pagesCustomOrder/customOrder/customOrder?sh=' + 4 }
    ],
    selected: false
  },
  {
    title: '先货后款',
    values: [
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '未收款', lx: '2', path: '/pagesCustomOrder/customOrder/customOrder?fpak=' + 1 },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouchenggong@3x.png', text: '以收款', lx: '3', path: '/pagesCustomOrder/customOrder/customOrder?fpak=' + 2 },
      { image: 'https://www.xzxskj.com/xcximg/icon_shouhouzhong@3x.png', text: '以退货', lx: '4', path: '/pagesCustomOrder/customOrder/customOrder?fpak=' + 3 }
    ],
    selected: false
  }
]);

const toggleSelected = (index) => {
  mine_card_datas.value.forEach((item, i) => {
    item.selected = i === index;
  });
};

const currentValues = computed(() => {
  const selectedItem = mine_card_datas.value.find((item) => item.selected);
  return selectedItem ? selectedItem.values : [];
});

const contentPadding = computed(() => {
  const selectedIndex = mine_card_datas.value.findIndex((item) => item.selected);
  if (selectedIndex === 1 || selectedIndex === 2 || selectedIndex === 3) {
    return {
      paddingLeft: '76rpx',
      paddingRight: '62rpx'
    };
  } else {
    return {};
  }
});

const goPage = (path) => {
  uni.navigateTo({
    url: path
  });
};

const gwname = ref();
const gsname = ref();
const username = ref()
onLoad(async (option) => {
  const from = option.from
  if(from&&from==='identity'){
  	isShow.value = true
  }
  console.log('customMine onLoad');
  userInfo.value = await useUserStore().getInfo();
  // userInfo.value = JSON.parse(uni.getStorageSync('userInfo'))
  console.log('userInfo:', userInfo.value);
  let selectedMine = uni.getStorageSync('selectedMine');
  let data = uni.getStorageSync('identityData');
  userInfo.value.joininfos && userInfo.value.joininfos.length > 0 ? showSwitch.value = true : showSwitch.value = false;
  if (selectedMine) {
    gwname.value = data[selectedMine].company;
    gsname.value = data[selectedMine].text;
	username.value = data[selectedMine].username
  }
  useTabStore().setCurrentTabIndex(4);
  // 加载菜单权限
  permissionStore.loadMenuAuthority();
  console.log('menuAuthorityData:', permissionStore.menuAuthorityData);
});


const filteredOtherData = computed(() => {
  console.log('menuAuthorityData.value:', permissionStore.menuAuthorityData);
  return other_data.value
    .filter(item => !item.menuAuthority || permissionStore.hasMenuAuthority(item.menuAuthority)) // 先过滤主菜单项
    .map(item => ({
      ...item,
      value: item.value.filter(subItem => !subItem.menuAuthority || permissionStore.hasMenuAuthority(subItem.menuAuthority)) // 过滤子菜单项
    }));
});

uni.$on('pagesAdminUpdate',async(e)=>{
	console.log('admin onLoad');
	userInfo.value = await useUserStore().getInfo();
	// userInfo.value = JSON.parse(uni.getStorageSync('userInfo'))
	console.log('userInfo:', userInfo.value);
	let selectedMine = uni.getStorageSync('selectedMine');
	let data = uni.getStorageSync('identityData');
	userInfo.value.joininfos && userInfo.value.joininfos.length > 0 ? showSwitch.value = true : showSwitch.value = false;
	if (selectedMine) {
	  gwname.value = data[selectedMine].company;
	  gsname.value = data[selectedMine].text;
	}
	useTabStore().setCurrentTabIndex(4);
	// 加载菜单权限
	permissionStore.loadMenuAuthority();
	console.log('menuAuthorityData:', permissionStore.menuAuthorityData);
})

</script>

<style lang="scss" scoped>
.customMine-layout {
  height: 100%;
  box-sizing: border-box;
  width: 750rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  background-image: url('https://www.xzxskj.com/Public/upload/66123b42506da7295.png');
  background-position: center;
  background-size: cover;
  .header {
    .titleBar {
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .images {
        margin-right: 160rpx;
        display: flex;
        image {
          height: 64rpx;
          width: 64rpx;
        }
      }
      .title-tip {
        display: flex;
        align-items: center;
        justify-content: center;
        .tip-btn {
          position: absolute;
          opacity: 0;
        }
      }
      .tip-image {
        height: 24rpx;
        width: 24rpx;
      }
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
        text-align: left;
      }
    }
  }
  .title {
    margin-top: 42rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      image {
        height: 108rpx;
        width: 108rpx;
        border-radius: 50%;
        margin-right: 30rpx;
      }
      .tab {
        height: 108rpx;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .text-1 {
          height: 56rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: bold;
          font-size: 40rpx;
          color: #1f1f1f;
        }
        .admin {
          padding: 2rpx 10rpx;
          height: 38rpx;
          background: linear-gradient(272deg, #efc99e 0%, #ca9667 50%, #c99566 54%, #efc99e 100%);
          border-radius: 60rpx 60rpx 60rpx 60rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text-2 {
          height: 34rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #ffffff;
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        height: 34rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #1f1f1f;
        opacity: 0.4;
      }
      image {
        height: 24rpx;
        width: 24rpx;
        margin-right: 10rpx;
      }
    }
  }
  .price-control {
    width: 710rpx;
    margin-left: 20rpx;
    margin-top: 15rpx;
    height: 128rpx;
    background: #c8ac8f;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: -46rpx;
    .left {
      height: 82rpx;
      display: flex;
      align-items: center;
      margin-left: 24rpx;
      text {
        height: 44rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #ffffff;
        text-align: left;
      }
    }
    .right {
      margin-right: 24rpx;
      height: 82rpx;
      display: flex;
      align-items: center;
      .tab {
        width: 112rpx;
        height: 38rpx;
        background: #ffffff;
        box-shadow: 0rpx 4rpx 20rpx 2rpx rgba(61, 38, 12, 0.08);
        border-radius: 60rpx 60rpx 60rpx 60rpx;
        opacity: 0.79;
        display: flex;
        align-items: center;
        justify-content: center;
        text {
          height: 34rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #c4a183;
          text-align: center;
        }
      }
    }
  }
  .data-center {
    width: 710rpx;
    height: 236rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-left: 24rpx;
    padding-right: 24rpx;
    padding-top: 30rpx;
    padding-bottom: 28rpx;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .left {
        text {
          height: 44rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: bold;
          font-size: 32rpx;
          color: #1f1f1f;
          text-align: left;
        }
      }
      .right {
        height: 34rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #1f1f1f;
        text-align: right;
        opacity: 0.5;
      }
    }
    .bottom {
      box-sizing: border-box;
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      margin-top: 30rpx;
      width: 100%;
      display: grid;
      grid-template-columns: auto auto auto auto;
      justify-content: space-between;
      .data-center-card {
        width: 158rpx;
        height: 104rpx;
        background: #f8f8f8;
        border-radius: 20rpx 20rpx 20rpx 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text-1 {
          height: 44rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: bold;
          font-size: 32rpx;
          color: #1f1f1f;
          margin-bottom: 8rpx;
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
    }
  }
  .other-card {
    width: 710rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 20rpx;
    margin-left: 20rpx;
    padding-left: 24rpx;
    padding-right: 24rpx;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40rpx;
      text {
        height: 44rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #1f1f1f;
      }
      .right {
        text {
          height: 34rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #1f1f1f;
          text-align: right;
          opacity: 0.5;
        }
      }
    }
    .bottom {
      display: grid;
      width: 100%;
      grid-template-columns: 25% 25% 25% 25%;
      justify-content: space-between;
      grid-row-gap: 44rpx;
      .setting-menu-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        image {
          height: 44rpx;
          width: 44rpx;
          margin-bottom: 16rpx;
        }
        text {
          height: 34rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #1f1f1f;
          opacity: 0.7;
        }
        .shadowImage {
          box-shadow: 6rpx 6rpx 20rpx 2rpx rgba(0, 0, 0, 0.2);
          border: 1rpx solid red;
        }
      }
    }
  }
}
.mine-orders {
  margin-top: 20rpx;
  margin-left: 20rpx;
  box-sizing: border-box;
  width: 710rpx;
  height: 244rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30rpx 24rpx;
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    .box {
      margin-right: 40rpx;
      transition: all 0.3s;
      .selected-text {
        transition: all 0.3s;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #1f1f1f;
        opacity: 1;
      }
      text {
        transition: all 0.3s;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 28rpx;
        color: #1f1f1f;
        text-align: left;
        opacity: 0.6;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fadeIn 1.5s ease-in-out;
    .menu-card {
      animation: fadeIn 1.5s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
        height: 48rpx;
        width: 48rpx;
      }
      text {
        margin-top: 14rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #1f1f1f;
        text-align: center;
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
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  }
}
</style>
