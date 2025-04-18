<template>
	<view class="newPosting">
		<!-- header -->
		<custom-header>
			<template #name>{{title}}</template>
			<template #fill>交流发布</template>
		</custom-header>
		<!-- 文本域 -->
		<view class="posting-message">
			<textarea class="texta" placeholder="在这输入想说的话~"/>
		</view>
		<!-- photo -->
		<view class="photos">
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
						src="/pagesNewPosting/static/img_add_img@3x.png" 
						mode="widthFix" 
						style="width: 162rpx;height: 162rpx;"
					></image>
				</uv-upload>
			</view>
		</view>
		<!--bar -->
		<view class="bar" @click="comfim">
			<view class="btn">
				<text>确认发布</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const title = ref('交流发布')
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
onLoad((options)=>{
	 console.log('传递过来的参数:', options.id);
	 if(options.id){
		 title.value = '交流修改'
	 }
})
</script>

<style lang="scss" scoped>
.newPosting{
	height: 100%;
	width: 750rpx;
	height: 1626rpx;
	background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.posting-message{
		box-sizing: border-box;
		margin-top: 40rpx;
		width: 710rpx;
		height: 464rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 28rpx 20rpx;
		texta{
			height: 100%;
			width: 100%;
		}
	}
	.bar {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
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
	
	
}	
</style>