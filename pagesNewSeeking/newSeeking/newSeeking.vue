<template>
	<view class="newSeeking">
		<!-- header -->
		<custom-header>
			<template #name>{{title}}</template>
			<template #fill>求货发布</template>
		</custom-header>
		<!-- content-1 -->
		<view class="content-1">
			<view class="top" v-for="(item,index) in content1" :key="index">
				<view class="left">
					<text>{{item.key}}</text>
				</view>
				<view class="right">
					<!-- <text>{{item.placeholder}}</text> -->
					<view class="selectDownUp">
						<qiaoSelect
							:keyId="1" 
							:dataList="orgArray" 
							:phText="item.placeholder" 
							searchKey="name"
							:showBorder="false" 
							:disabled="false" 
							@change="selectChange" 
						></qiaoSelect>
					</view>
					<view v-if="item.key==='型号'" class="selelct">
						<text>选择</text>
					</view>
				</view>
			</view>
		</view>
		<!-- select-card -->
		<view class="select" v-for="(item,index) in select" :key="index">
			<view class="left">
				<text>{{item.key}}</text>
			</view>
			<view class="right">
				<text v-if="item.key==='成色选择'||item.key==='求购时长'"  @click="selectOption(item.key)" class="text-1">{{item.placeholder}}</text>
				<text v-else  @click="selectOption(item.key)" class="text-2">{{item.placeholder}}</text>
			</view>
		</view>
		<!-- rmark -->
		<view class="remark">
			<textarea class="texta" placeholder="请输入备注信息~"/>
		</view>
		<!-- photo -->
		<view class="photos">
		<!-- 	<image v-for="(photo, index) in photos" :src="photo" mode="aspectFill" :key="index" />
			<image src="/pagesNewSeeking/static/img_add_img@3x.png" mode="aspectFill" @click="choosePhoto" /> -->
			<view class="upPhoto">
				<uv-upload
					:fileList="fileList1"
					multiple 
					:maxCount="10"
					width="162rpx" 
					height="162rpx"
					accept="media"
					maxSize="5242880"
					name='2'
					previewFullVideo
					@afterRead="afterRead" 
					@delete="deleteFlie" 
					@oversize="check">
					<image 
						src="/pagesNewSeeking/static/img_add_img@3x.png" 
						mode="widthFix" 
						style="width: 162rpx;height: 162rpx;"
					></image>
				</uv-upload>
			</view>
			
		</view>
		<!-- tip -->
		<view class="tip">
			<text>* 为保证买家真实体验，平台将 48小时后推送延长提醒，请及时关注并更新</text>
		</view>
		
		<uv-calendars
		ref="calendars" 
		mode="range" 
		color="#ff0000" 
		:date="[getCurrentDate(),'']" 
		@confirm="confirm" />
		<!-- fill -->
		<view style="height:182rpx ;" />
		<!--bar -->
		<view class="bar" @click="comfim">
			<view class="btn">
				<text>确认发布</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
const title = ref('求货发布')
const calendars = ref(null)
const confirm = (e)=>{
	console.log('日历回调：',e);
	select.value[3].placeholder =e.range.before+'~'+e.range.after
}
const orgArray = ref([
	{name:'iphone13'},
	{name:'iphone14'},
	{name:'华为mate40'},
	{name:'vivo'},
	{name:'iphone15'},
	{name:'iphone14'},
	{name:'华为mate40'},
	{name:'vivo'},
	{name:'iphone13'},
	{name:'iphone14'},
	{name:'华为mate40'},
	{name:'vivo'},
	{name:'iphone13'},
	{name:'iphone14'},
	{name:'华为mate40'},
	{name:'vivo'},
])
const content1 = ref([
	{key:'型号',placeholder: '请搜索相关型号',value:'华为mate40pro'},
	{key:'内存',placeholder: '请选择型号',value:'4G'},
	{key:'颜色',placeholder: '请选择型号',value:'红色'}
])
const select = ref([
	{key:'成色选择',placeholder:'请选择',value:''},
	{key:'求购单价',placeholder:'请选择',value:''},
	{key:'求购数量',placeholder:'请选择',value:''},
	{key:'求购时长',placeholder:'请选择',value:''},
])
const selectOption = (key)=>{
	if(key==='求购时长'){
		console.log('打开日历');
		calendars.value.open()
	}
}
//相机选择
const photos = ref([]);
// 相机选择
const choosePhoto = () => {
	uni.chooseImage({
		count: 6, 
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
const getCurrentDate=()=>{
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  return formattedDate;
}

const fileList1 = ref([]);
// 删除图片
const deleteFlie = (event) => {
  fileList1.value.splice(event.index, 1);
};
const check = (e)=>{
	console.log(e);
	uni.showToast({
		title:'超出上传限制',
		icon:'error',
		duration: 2000
	})
}
// 新增图片
const afterRead = async (event) => {
  let lists = [].concat(event.file);
  let fileListLen = fileList1.value.length;
  lists.forEach(async (item) => {
	// console.log('item:',item);
    fileList1.value.push({
      ...item,
      status: 'uploading',
      message: '上传中'
    });
  
    let fileItem = fileList1.value[fileListLen];
    fileList1.value.splice(fileListLen, 1, {
      ...fileItem,
      status: 'success',
      message: '',
      url: item.url
    });
    fileListLen++;
  });
};

const uploadFilePromise = (url) => {
  return new Promise((resolve, reject) => {
   //  uni.uploadFile({
   //    url: 'http://localhost:8080/system/oss/upload',
	  //  // header: {
	  //  //    'Authorization': 'Bearer ' + token.value, // 添加Authorization头
	  //  //  },
   //    filePath: url,
   //    name: 'file',
   //    formData: {
   //      user: 'test'
   //    },
   //    success: (res) => {
   //      setTimeout(() => {
			// console.log(res);
   //        resolve(res.data);
   //      }, 1000);
   //    }
   //  });
  });
};
const selectChange = (e)=>{
	console.log(e);
}
onLoad((options)=>{
	 console.log('传递过来的参数:', options.id);
	 if(options.id){
		 title.value = '求货修改'
	 }
})
</script>

<style lang="scss" scoped>
.newSeeking{
	height: 100%;
	// background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	background: #F3F2F6;
	display: flex;
	flex-direction: column;
	align-items: center;
	.bar {
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
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}
	}
	.content-1{
		box-sizing: border-box;
		margin-top: 35rpx;
		height: 300rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		// padding-left: 24rpx;
		padding-right: 20rpx;
		
		.top{
			height: 100rpx;
			// border: 1rpx solid black;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				width: 166rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;;
				text{
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1F1F1F;
				}
			}
			.right{
				width: 77%;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				height: 100%;;
				display: flex;
				align-items: center;
				.selectDownUp{
					width: 100%;
					// border: 1rpx solid red;
				}
				text{
					// border: 1rpx solid black;
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #1F1F1F;
					opacity: 0.4;
				}
				.selelct{
					width: 96rpx;
					border-left: 2rpx solid #EEEEEE;
					text{
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #669CFD;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
	.select{
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			width: 166rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1F1F1F;
			}
		}
		.right{
			height: 100%;
			flex: 1;
			display: flex;
			align-items: center;
			.text-1{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
			}
			.text-2{
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1F1F1F;
				opacity: 0.4;
			}
		}
	}
	.remark{
		// border: 1rpx solid red;
		box-sizing: border-box;
		margin-top: 20rpx;
		width: 710rpx;
		height: 160rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 28rpx 20rpx;
		.texta{
			height: 100%;
			width: 100%;
		}
	}
	// .photos {
	  // width: 710rpx;
	  // margin-top: 16rpx;
	  // box-sizing: border-box;
	  // display: grid;
	  // grid-template-columns: repeat(auto-fill, minmax(162rpx, 1fr)); 
	  // grid-gap: 16rpx; 
	  // grid-auto-flow: dense; 
	 
	// }
	// .photos image {
	//   height: 162rpx;
	//   width: 100%; 
	// }
	.photos {
	  width: 710rpx;
	  margin-top: 16rpx;
	  box-sizing: border-box;
	  // display: grid;
	  // grid-template-columns: repeat(auto-fill, minmax(162rpx, 1fr)); 
	  // grid-gap: 16rpx; 
	  // grid-auto-flow: dense; 
	  display: flex;
	  flex-direction: column;
	  .upPhoto{
		  // border: 1rpx solid red;
	  }
	  .upVideo{
		  // border: 1rpx solid black;
		  margin-top: 20rpx;
	  }
	}
	.tip{
		margin-top: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			height: 28rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 20rpx;
			opacity: 0.4;
		}
	}
}
</style>