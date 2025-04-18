<template>
	<view class="menber-layout">
		<!-- header -->
		<custom-header>
			<template #name>商户信息</template>
			<template #fill>个人信息</template>
		</custom-header>
		<!-- avter -->
		<view class="avter">
			<text>头像</text>
			<image :src="avatorUrl?('https://www.xzxskj.com'+avatorUrl):'https://www.xzxskj.com/xcximg/132.jpg'" mode="aspectFill"></image>
			<button class="avterBtn" open-type="chooseAvatar" @chooseavatar="chooseAvatar" plain>头像</button>
		</view>

		<view class="content">
			<view class="card" v-for="(item,index) in data" :key="index">
				<text class="text-1">{{item.name}}</text>
				<view class="right">
					<input v-if="item.name!=='绑定微信'&&item.name!=='商家名称'" class="text-2" type="text" v-model="item.value" placeholder="请输入"/>
					<input v-if="item.name ==='绑定微信'" disabled class="text-2" type="text" v-model="item.value" placeholder="请输入"/>
					<input v-if="item.name ==='商家名称'" class="text-2" name='nickname' :disabled="inputDisable" v-model='item.value' placeholder="保存后无法修改，请认真仔细填写">
					<image src="https://www.xzxskj.com/xcximg/icon_next@3x.png" mode="aspectFill" v-if="item.name==='门店地址'" @click="openLocationPicker"></image>
				</view>
			</view>
		</view>
		<!--bar -->
		<view class="pannel-btn">
			<view class="btn" @click="updateMember()">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { useUserStore } from '@/stores/userInfoStore.js';
import { uploadFiles } from '@/utils/common.js';
import { useLocationStore } from "@/stores/locationStore.js"
import { apiUpdateUserInfo } from '@/api/member/member.js';
const locationStore = useLocationStore()
const photos = ref([]);
const choosePhoto = () => {
	uni.chooseImage({
		count: 1, 
		sizeType: ['original', 'compressed'], 
		sourceType: ['camera', 'album'], 
		success: function (res) {
			console.log(JSON.stringify(res.tempFilePaths));
			res.tempFilePaths.forEach(path => {
				photos.value.push(path);
			});
		}
	});
};
const avatorFileList = ref([]);
const fileListRef = {
  avatorFileList
};
const avatorUrl = ref()
const chooseAvatar = async(e)=>{
	console.log('chooseAvatar:',e)
	const uploadResult = await uni.uploadFile({
	  url: 'https://www.xzxskj.com/Home/Upload/add', 
	  filePath: e.detail.avatarUrl, 
	  name: 'imgs',
	  header: {
	    'Content-Type': 'multipart/form-data'
	  }
	});
	const data = JSON.parse(uploadResult.data);
	if(data.code === 200){
		const imageUrls = data.urls.split(',');
		avatorUrl.value = imageUrls[0];
	}
}
const data = ref([
	{name:'商家名称',value:''},
	{name:'联系方式',value:''},
	{name:'绑定微信',value:JSON.parse(uni.getStorageSync('userInfo')).phone},
	{name:'门店名称',value:''},
	{name:'门店地址',value:''},
])
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
const longitude = ref(0)
const latitude = ref(0)
const key = 'KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO' //使用在腾讯位置服务申请的key
const referer = 'demo2' //调用插件的app的名称
const category = '生活服务,娱乐休闲'
const chooseLocation = requirePlugin('chooseLocation')
const openLocationPicker = () => {
  console.log('打开地图')

  const location = JSON.stringify({
    latitude: form.value.latitude,
    longitude: form.value.longitude,
  })
  uni.navigateTo({
    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`,
  })
}

// const updateMember = async () => {
//   const param = {
//     opid: uni.getStorageSync('sessionInfo').opid,
// 	lxfs: data.value[1].value,
//     name: data.value[0].value,
//     shopname: data.value[3].value,
//     shopadd: data.value[4].value,
//     img: avatorUrl.value
//   };
//   try {
//     const res = await apiUpdateUserInfo(param);
//     if (res.code === 200) {
//       const info = await useUserStore().getInfo();
//       console.log("用户刷新检查:", info);
//       // 更新成功提示
//       uni.showToast({
//         title: '更新成功',
//         icon: 'success',
//         duration: 2000
//       });
//       uni.navigateBack();
//     } else {
//       // 更新失败提示
//       uni.showToast({
//         title: '更新失败',
//         icon: 'error',
//         duration: 2000
//       });
//     }
//     console.log(res);
//   } catch (error) {
//     // 捕获异常并提示
//     console.error('更新失败:', error);
//     uni.showToast({
//       title: '更新失败',
//       icon: 'error',
//       duration: 2000
//     });
//   }
// };

const updateMember = async () => {
  // 检查参数是否为空
  if (!data.value[0].value) {
    uni.showToast({
      title: '请输入商家名称',
      icon: 'error',
      duration: 2000
    });
    return;
  }
  if (!data.value[1].value) {
    uni.showToast({
      title: '请输入联系方式',
      icon: 'error',
      duration: 2000
    });
    return;
  }
  if (!data.value[3].value) {
    uni.showToast({
      title: '请输入门店名称',
      icon: 'error',
      duration: 2000
    });
    return;
  }
  if (!data.value[4].value) {
    uni.showToast({
      title: '请输入门店地址',
      icon: 'error',
      duration: 2000
    });
    return;
  }

  // 构建参数对象
  const param = {
    opid: uni.getStorageSync('sessionInfo').opid,
    lxfs: data.value[1].value,
    name: data.value[0].value,
    shopname: data.value[3].value,
    shopadd: data.value[4].value,
    img: avatorUrl.value
  };

  try {
    const res = await apiUpdateUserInfo(param);
    if (res.code === 200) {
      const info = await useUserStore().getInfo();
      console.log("用户刷新检查:", info);
      // 更新成功提示
      uni.showToast({
        title: '更新成功',
        icon: 'success',
        duration: 2000
      });
      uni.navigateBack();
    }else if(res.code === 201) {
		uni.showToast({
		  title: '已经存在商户名称',
		  icon: 'error',
		  duration: 2000
		});
	} else {
      // 更新失败提示
      uni.showToast({
        title: '更新失败',
        icon: 'error',
        duration: 2000
      });
    }
    console.log(res);
  } catch (error) {
    // 捕获异常并提示
    console.error('更新失败:', error);
    uni.showToast({
      title: '更新失败',
      icon: 'error',
      duration: 2000
    });
  }
};


const inputDisable = ref(false)
onMounted(async()=>{
	form.value = await useLocationStore().getForm()
	const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
	console.log('userInfo:',userInfo)
	data.value[0].value = userInfo.nik_name
	if(userInfo.nik_name){
		inputDisable.value = true
	}
	data.value[1].value = userInfo.lxfs
	data.value[3].value = userInfo.shopname
	data.value[4].value = userInfo.shopadd
	avatorUrl.value = userInfo.img
})
onShow(() => {
  const lo = chooseLocation.getLocation()
  console.log(lo)
  if (lo) {
    form.value.address = lo.address
    form.value.province = lo.province
    form.value.city = lo.city
    form.value.region = lo.district
    form.value.latitude = lo.latitude.toString()
    form.value.longitude = lo.longitude.toString()
    const fullLo = []
    fullLo.push(lo.province)
    fullLo.push(lo.city)
    fullLo.push(lo.district)
    form.value.fullLocation = fullLo.join(' ')
    form.value.name = lo.name
	// data.value[3].value = form.value.name
	data.value[4].value = form.value.address
  }
})
</script>

<style lang="scss" scoped>
.menber-layout{
	width: 750rpx;
	height: 100vh;
	background: #F3F2F6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.avter{
		margin-top: 52rpx;
		width: 710rpx;
		height: 128rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 24rpx;
		padding-right: 24rpx;
		box-sizing: border-box;
		text{
			text-align: left;
			height: 44rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 32rpx;
		}
		image{
			height: 80rpx;
			width: 80rpx;
			border-radius: 50%;
		}
		.avterBtn{
			position: absolute;
			width: 100%;
			opacity: 0;
		}
	}

	.content{
		width: 710rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		.card{
			margin-top: 20rpx;
			width: 710rpx;
			height: 100rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			.right{
				width: 500rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				// position: relative;
				.text-2{
					width: 450rpx;
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
					// opacity: 0.4;
				}
				image{
					height: 25rpx;
					width: 25rpx;
					margin-left: 10rpx;
				}
			}
			.text-1{
				height: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #1F1F1F;
				text-align: left;
			}
		}
	}

	.pannel-btn{
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 750rpx;
			height: 182rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 24rpx 30rpx 62rpx 30rpx;
			.btn {
				width: 690rpx;
				height: 96rpx;
				background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text {
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}
	
}
</style>