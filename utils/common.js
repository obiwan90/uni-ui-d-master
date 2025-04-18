// 文本复制
export function copyText(text) {
	uni.setClipboardData({
		data: text,
		success: function() {
			uni.showToast({
				title: '复制成功',
				icon: 'success',
				duration: 1500
			});
		},
		fail: function(error) {
			console.error('复制失败', error);
			uni.showToast({
				title: '复制失败，请重试',
				icon: 'none',
				duration: 1500
			});
		}
	});
}

// uploadUtils.js
// export const uploadFiles = async (event, fileListName, fileListRef) => {
// 	let lists = [].concat(event);
// 	console.log('lists:', lists);
// 	for (let item of lists) {
// 		console.log('item:', item);
// 		try {
// 			const uploadResult = await uni.uploadFile({
// 				url: 'https://www.xzxskj.com/Home/Upload/add',
// 				filePath: item.url,
// 				name: 'imgs',
// 				header: {
// 					'Content-Type': 'multipart/form-data'
// 				}
// 			});

// 			// 解析返回的数据
// 			const data = JSON.parse(uploadResult.data);

// 			if (data.code !== 200) {
// 				console.error('上传失败:', data);
// 				uni.showToast({
// 					title: '上传失败,稍后再试',
// 					icon: 'error',
// 					duration: 2000
// 				});
// 				return;
// 			} else {
// 				console.log('上传成功:', data.urls);
// 				const imageUrls = data.urls.split(',');
// 				imageUrls.forEach((imageUrl) => {
// 					if (imageUrl.trim()) {
// 						fileListRef[fileListName].value.push({
// 							url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 							name: item.type === 'image' ? '图片' : '视频',
// 							type: item.type,
// 							isImage: item.type.startsWith('image'),
// 							isVideo: item.type.startsWith('video')
// 						});
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			console.error('上传失败:', error);
// 			uni.showToast({
// 				title: '上传失败',
// 				icon: 'error',
// 				duration: 2000
// 			});
// 		}
// 	}
// 	fileListRef[fileListName].value = [...fileListRef[fileListName].value];
// };


export const uploadFiles = async (event, fileListName, fileListRef) => {
	let lists = [].concat(event);
	console.log('lists:', lists);
	for (let item of lists) {
		console.log('item:', item);
		try {
			// 压缩图片
			const compressedImage = await compressImage(item);
			if (!compressedImage) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedImage.tempFilePath,
				name: 'imgs',
				header: {
					'Content-Type': 'multipart/form-data'
				}
			});

			// 解析返回的数据
			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				console.error('上传失败:', data);
				uni.showToast({
					title: '上传失败,稍后再试',
					icon: 'error',
					duration: 2000
				});
				return;
			} else {
				console.log('上传成功:', data.urls);
				const imageUrls = data.urls.split(',');
				imageUrls.forEach((imageUrl) => {
					if (imageUrl.trim()) {
						fileListRef[fileListName].value.push({
							url: 'https://www.xzxskj.com' + imageUrl.trim(),
							name: item.type === 'image' ? '图片' : '视频',
							type: item.type,
							isImage: item.type.startsWith('image'),
							isVideo: item.type.startsWith('video')
						});
					}
				});
			}
		} catch (error) {
			console.error('上传失败:', error);
			uni.showToast({
				title: '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
	fileListRef[fileListName].value = [...fileListRef[fileListName].value];
};



//unloadCheack
export const uploadCheack = (e, fileListName) => {
	console.log('好像超出限制了');
	console.log(e);
	uni.showToast({
		title: '超出上传限制',
		icon: 'error',
		duration: 2000
	});
};

export const uploadDelete = (event, fileListName, fileListRef) => {
	console.log('我在删除');
	console.log(event);
	const index = event.index;
	fileListRef[fileListName].value.splice(index, 1);
	fileListRef[fileListName].value = [...fileListRef[fileListName].value];
};

//时间戳转换
export const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000); // 将时间戳转换为 Date 对象
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1,并补齐两位数
	const day = String(date.getDate()).padStart(2, '0'); // 日期补齐两位数
	const hours = String(date.getHours()).padStart(2, '0'); // 小时补齐两位数
	const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补齐两位数
	const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒数补齐两位数
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertDateStringToTimestamp=(dateString)=>{
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
}

//当前时间字符串
export const getCurrentDateString = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// export const uploadFilesByIndex = async (event, index, fileListRef,itemId) => {
// 	// 初始化 fileListRef[index] 如果尚未存在
// 	if (!fileListRef[index]) {
// 		fileListRef[index] = ref([]);
// 	}

// 	let lists = [].concat(event);
// 	console.log('lists:', lists);
// 	for (let item of lists) {
// 		console.log('item:', item);
// 		try {
// 			const uploadResult = await uni.uploadFile({
// 				url: 'https://www.xzxskj.com/Home/Upload/add',
// 				filePath: item.url,
// 				name: 'imgs',
// 				header: {
// 					'Content-Type': 'multipart/form-data'
// 				}
// 			});

// 			// 解析返回的数据
// 			const data = JSON.parse(uploadResult.data);

// 			if (data.code !== 200) {
// 				console.error('上传失败:', data);
// 				uni.showToast({
// 					title: '上传失败,稍后再试',
// 					icon: 'error',
// 					duration: 2000
// 				});
// 				return;
// 			} else {
// 				console.log('上传成功:', data.urls);
// 				const imageUrls = data.urls.split(',');
// 				imageUrls.forEach((imageUrl) => {
// 					if (imageUrl.trim()) {
// 						fileListRef[index].push({
// 							url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 							name: item.type === 'image' ? '图片' : '视频',
// 							type: item.type,
// 							isImage: item.type.startsWith('image'),
// 							isVideo: item.type.startsWith('video'),
// 							itemId:itemId?itemId:''
// 						});
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			console.error('上传失败:', error);
// 			uni.showToast({
// 				title: '上传失败',
// 				icon: 'error',
// 				duration: 2000
// 			});
// 		}
// 	}
// 	// 触发响应式更新
// 	fileListRef[index] = [...fileListRef[index]];
// 	console.log('fileListRef:', fileListRef);
// };


export const uploadFilesByIndex = async (event, index, fileListRef, itemId) => {
	if (!fileListRef[index]) {
		fileListRef[index] = ref([]);
	}

	let lists = [].concat(event);
	console.log('lists:', lists);
	for (let item of lists) {
		console.log('item:', item);
		try {
			// 压缩图片
			const compressedImage = await compressImage(item);
			if (!compressedImage) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedImage.tempFilePath,
				name: 'imgs',
				header: {
					'Content-Type': 'multipart/form-data'
				}
			});

			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				console.error('上传失败:', data);
				uni.showToast({
					title: '上传失败,稍后再试',
					icon: 'error',
					duration: 2000
				});
				return;
			} else {
				console.log('上传成功:', data.urls);
				const imageUrls = data.urls.split(',');
				imageUrls.forEach((imageUrl) => {
					if (imageUrl.trim()) {
						fileListRef[index].push({
							url: 'https://www.xzxskj.com' + imageUrl.trim(),
							name: item.type === 'image' ? '图片' : '视频',
							type: item.type,
							isImage: item.type.startsWith('image'),
							isVideo: item.type.startsWith('video'),
							itemId: itemId ? itemId : ''
						});
					}
				});
			}
		} catch (error) {
			console.error('上传失败:', error);
			uni.showToast({
				title: '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
	fileListRef[index] = [...fileListRef[index]];
	console.log('fileListRef:', fileListRef);
};


// export const uploadFilesByIndex1 = async (event, index, fileListRef,itemId) => {
// 	// 初始化 fileListRef[index] 如果尚未存在
// 	if (!fileListRef[index]) {
// 		fileListRef[index] = ref([]);
// 	}

// 	let lists = [].concat(event);
// 	console.log('lists:', lists);
// 	for (let item of lists) {
// 		console.log('item:', item);
// 		try {
// 			const uploadResult = await uni.uploadFile({
// 				url: 'https://www.xzxskj.com/Home/Upload/add',
// 				filePath: item.file.url,
// 				name: 'imgs',
// 				header: {
// 					'Content-Type': 'multipart/form-data'
// 				}
// 			});

// 			// 解析返回的数据
// 			const data = JSON.parse(uploadResult.data);

// 			if (data.code !== 200) {
// 				console.error('上传失败:', data);
// 				uni.showToast({
// 					title: '上传失败,稍后再试',
// 					icon: 'error',
// 					duration: 2000
// 				});
// 				return;
// 			} else {
// 				console.log('上传成功:', data.urls);
// 				const imageUrls = data.urls.split(',');
// 				imageUrls.forEach((imageUrl) => {
// 					if (imageUrl.trim()) {
// 						fileListRef[index].push({
// 							url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 							name: item.file.type === 'image' ? '图片' : '视频',
// 							type: item.file.type,
// 							isImage: item.file.type.startsWith('image'),
// 							isVideo: item.file.type.startsWith('video'),
// 							itemId:itemId?itemId:''
// 						});
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			console.error('上传失败:', error);
// 			uni.showToast({
// 				title: '上传失败',
// 				icon: 'error',
// 				duration: 2000
// 			});
// 		}
// 	}
// 	// 触发响应式更新
// 	fileListRef[index] = [...fileListRef[index]];
// 	console.log('fileListRef:', fileListRef);
// };

export const uploadFilesByIndex1 = async (event, index, fileListRef, itemId) => {
	if (!fileListRef[index]) {
		fileListRef[index] = ref([]);
	}

	let lists = [].concat(event);
	console.log('lists:', lists);
	for (let item of lists) {
		console.log('item:', item);
		try {
			// 压缩图片
			const compressedImage = await compressImage(item.file);
			if (!compressedImage) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedImage.tempFilePath,
				name: 'imgs',
				header: {
					'Content-Type': 'multipart/form-data'
				}
			});

			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				console.error('上传失败:', data);
				uni.showToast({
					title: '上传失败,稍后再试',
					icon: 'error',
					duration: 2000
				});
				return;
			} else {
				console.log('上传成功:', data.urls);
				const imageUrls = data.urls.split(',');
				imageUrls.forEach((imageUrl) => {
					if (imageUrl.trim()) {
						fileListRef[index].push({
							url: 'https://www.xzxskj.com' + imageUrl.trim(),
							name: item.file.type === 'image' ? '图片' : '视频',
							type: item.file.type,
							isImage: item.file.type.startsWith('image'),
							isVideo: item.file.type.startsWith('video'),
							itemId: itemId ? itemId : ''
						});
					}
				});
			}
		} catch (error) {
			console.error('上传失败:', error);
			uni.showToast({
				title: '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
	fileListRef[index] = [...fileListRef[index]];
	console.log('fileListRef:', fileListRef);
};



export const uploadDeleteByIndex = (event, index, fileListRef) => {
	console.log('我在删除');
	console.log(event);
	const fileIndex = event.index;

	if (!fileListRef[index]) {
		console.error('fileListRef[index] 不存在:', index);
		return;
	}

	// 删除指定的文件
	fileListRef[index].splice(fileIndex, 1);

	// 触发响应式更新
	fileListRef[index] = [...fileListRef[index]];
};

// export const takePhotoUploadFiles = async (event, item1) => {
// 	console.log('上传文件:', event);
// 	// let lists = [].concat(event);
// 	// console.log('lists:', lists);
// 	for (let file of event.file) {
// 		console.log('file', file);
// 		try {
// 			const uploadResult = await uni.uploadFile({
// 				url: 'https://www.xzxskj.com/Home/Upload/add',
// 				filePath: file.url,
// 				name: 'imgs',
// 				header: {
// 					'Content-Type': 'multipart/form-data'
// 				}
// 			});

// 			// 解析返回的数据
// 			const data = JSON.parse(uploadResult.data);

// 			if (data.code !== 200) {
// 				console.error('上传失败:', data);
// 				uni.showToast({
// 					title: '上传失败,稍后再试',
// 					icon: 'error',
// 					duration: 2000
// 				});
// 				return;
// 			} else {
// 				console.log('上传成功:', data.urls);
// 				const imageUrls = data.urls.split(',');
// 				imageUrls.forEach((imageUrl) => {
// 					if (imageUrl.trim()) {
// 						item1.fileList.push({
// 							// url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 							url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 							name: item1.text,
// 							type: file.type,
// 							isImage: file.type.startsWith('image'),
// 							isVideo: file.type.startsWith('video')
// 						});
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			console.error('上传失败:', error);
// 			uni.showToast({
// 				title: '上传失败',
// 				icon: 'error',
// 				duration: 2000
// 			});
// 		}
// 	}
// 	item1.fileList = [...item1.fileList];
// 	console.log('item1.fileList:',item1.fileList);
// };

export const takePhotoUploadFiles = async (event, item1) => {
	console.log('上传文件:', event);
	for (let file of event.file) {
		console.log('file', file);
		try {
			
			// const thumbnail =await compressImage4(file)
			// console.log('thumbnail',thumbnail)
			// 压缩图片
			const compressedImage = await compressImage(file);
			if (!compressedImage) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedImage.tempFilePath,
				name: 'imgs',
				header: {
					'Content-Type': 'multipart/form-data'
				}
			});

			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				console.error('上传失败:', data);
				uni.showToast({
					title: '上传失败,稍后再试',
					icon: 'error',
					duration: 2000
				});
				return;
			} else {
				console.log('上传成功:', data.urls);
				const imageUrls = data.urls.split(',');
				imageUrls.forEach((imageUrl) => {
					if (imageUrl.trim()) {
						item1.fileList.push({
							url: 'https://www.xzxskj.com' + imageUrl.trim(),
							name: item1.text,
							type: file.type,
							isImage: file.type.startsWith('image'),
							isVideo: file.type.startsWith('video')
						});
					}
				});
			}
		} catch (error) {
			console.error('上传失败:', error);
			uni.showToast({
				title: '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
	item1.fileList = [...item1.fileList];
	console.log('item1.fileList:', item1.fileList);
};

// const compressImage4 = (file, quality = 80, targetSizeKB = 30, width = 200, height = 200) => {
//   return new Promise((resolve, reject) => {
//     const src = file.url || file.path; // 确保使用正确的路径
//     // 调用 UniApp 压缩图片 API
//     uni.compressImage({
//       src: src, // 压缩源图片路径
//       quality: quality, // 压缩质量
//       width: width, // 压缩后图片的宽度
//       height: height, // 压缩后图片的高度
//       success: (res) => {
//         // 获取压缩后的文件信息
//         uni.getFileInfo({
//           filePath: res.tempFilePath, // 压缩后的临时文件路径
//           success: (fileInfo) => {
//             const fileSizeKB = fileInfo.size / 1024; // 文件大小转换为KB

//             if (fileSizeKB <= targetSizeKB) {
//               console.log('压缩成功:', res);
//               resolve(res.tempFilePath); // 成功，返回压缩后的文件路径
//             } else if (quality > 10) {
//               // 如果文件大小超过目标值，并且质量还可以进一步降低
//               console.log(`文件大小超出目标大小，当前大小: ${fileSizeKB}KB，继续压缩，当前质量: ${quality}`);
//               compressImage4(file, quality - 10, targetSizeKB, width, height) // 递归调用，减少质量
//                 .then(resolve)
//                 .catch(reject); // 继续递归压缩
//             } else {
//               console.log('无法将文件压缩到目标大小，质量已经过低');
//               reject(new Error('无法将文件压缩到目标大小，质量已经过低')); // 达到最小质量仍然过大，压缩失败
//             }
//           },
//           fail: (err) => {
//             console.error('获取文件信息失败:', err);
//             reject(err); // 获取文件信息失败
//           }
//         });
//       },
//       fail: (err) => {
//         console.error('压缩图片失败:', err);
//         reject(err); // 压缩图片失败
//       }
//     });
//   });
// };





// export const customTakePhotoUploadFiles = async (filePath, item) => {
// 	console.log('上传文件:', filePath);
// 	try {
// 		const uploadResult = await uni.uploadFile({
// 			url: 'https://www.xzxskj.com/Home/Upload/add',
// 			filePath: filePath,
// 			name: 'imgs',
// 			header: {
// 				'Content-Type': 'multipart/form-data'
// 			}
// 		});

// 		// 解析返回的数据
// 		const data = JSON.parse(uploadResult.data);

// 		if (data.code !== 200) {
// 			console.error('上传失败:', data);
// 			uni.showToast({
// 				title: '上传失败,稍后再试',
// 				icon: 'error',
// 				duration: 2000
// 			});
// 			return;
// 		} else {
// 			console.log('上传成功:', data.urls);
// 			const imageUrls = data.urls.split(',');
// 			imageUrls.forEach((imageUrl) => {
// 				if (imageUrl.trim()) {
// 					item.fileList.push({
// 						url: 'https://www.xzxskj.com' + imageUrl.trim(),
// 						name: item.text
// 					});
// 				}
// 			});
// 		}
// 	} catch (error) {
// 		console.error('上传失败:', error);
// 		uni.showToast({
// 			title: '上传失败',
// 			icon: 'error',
// 			duration: 2000
// 		});
// 	}
// 	item.fileList = [...item.fileList];
// 	console.log('item.fileList:', item.fileList);
// };
export const customTakePhotoUploadFiles = async (filePath, item) => {
	console.log('上传文件:', filePath);
	try {
		// 压缩图片
		const compressedImage = await compressImage({ url: filePath });
		if (!compressedImage) {
			// 如果压缩失败，则跳过上传
			return;
		}
		const uploadResult = await uni.uploadFile({
			url: 'https://www.xzxskj.com/Home/Upload/add',
			filePath: compressedImage.tempFilePath,
			name: 'imgs',
			header: {
				'Content-Type': 'multipart/form-data'
			}
		});

		const data = JSON.parse(uploadResult.data);
		if (data.code !== 200) {
			console.error('上传失败:', data);
			uni.showToast({
				title: '上传失败,稍后再试',
				icon: 'error',
				duration: 2000
			});
			return;
		} else {
			console.log('上传成功:', data.urls);
			const imageUrls = data.urls.split(',');
			imageUrls.forEach((imageUrl) => {
				if (imageUrl.trim()) {
					item.fileList.push({
						url: 'https://www.xzxskj.com' + imageUrl.trim(),
						name: item.text
					});
				}
			});
		}
	} catch (error) {
		console.error('上传失败:', error);
		uni.showToast({
			title: '上传失败',
			icon: 'error',
			duration: 2000
		});
	}
	item.fileList = [...item.fileList];
	console.log('item.fileList:', item.fileList);
};


export const previewImages = (urls, currentUrl = '') => {
	const currentIndex = urls.indexOf(currentUrl);
	console.log('url:', currentUrl);
	console.log('urls:', urls);
	console.log('current:', currentIndex);
	uni.previewImage({
		showmenu: true,
		current: currentIndex,
		urls: urls,
		longPressActions: {
			itemList: ['发送给朋友', '保存图片', '收藏'],
			success: function (data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			},
			fail: function (err) {
				console.log(err.errMsg);
			}
		}
	});
};


/**
 * 将图片列表保存到相册
 * @param {Array} urls 图片链接数组
 */
export const saveImagesToAlbum = (urls) => {
  let hasAuthorized = false; // 是否已经授权
  let saveQueue = []; // 保存图片的队列
  let showLoading = false; // 是否显示 loading 遮罩

  // 定义保存图片的函数
  const saveImage = (url) => {
    uni.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              console.log(`图片 ${url} 已成功保存到相册`);
            },
            fail: (err) => {
              console.error(`保存图片 ${url} 失败:`, err);
            }
          });
        } else {
          console.error(`下载图片 ${url} 失败, 状态码: ${res.statusCode}`);
        }
      },
      fail: (err) => {
        console.error(`下载图片 ${url} 失败:`, err);
      }
    });
  };

  // 遍历图片链接数组
  urls.forEach((url) => {
    // 如果已经授权,直接保存图片
    if (hasAuthorized) {
      saveImage(url);
    } else {
      // 否则将图片保存操作加入队列
      saveQueue.push(url);

      // 如果队列中还有未保存的图片,显示 loading 遮罩
      if (!showLoading && saveQueue.length > 0) {
        showLoading = true;
        uni.showLoading({
          title: '正在保存图片...',
          mask: true
        });
      }

      // 请求授权
      uni.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                hasAuthorized = true;
                // 执行队列中的保存操作
                saveQueue.forEach(saveImage);
                saveQueue = [];
                // 隐藏 loading 遮罩
                uni.hideLoading();
                showLoading = false;
              },
              fail: (err) => {
                console.error('授权失败:', err);
                // 隐藏 loading 遮罩
                uni.hideLoading();
                showLoading = false;
              }
            });
          } else {
            hasAuthorized = true;
            // 执行队列中的保存操作
            saveQueue.forEach(saveImage);
            saveQueue = [];
            // 隐藏 loading 遮罩
            uni.hideLoading();
            showLoading = false;
          }
        },
        fail: (err) => {
          console.error('获取授权设置失败:', err);
          // 隐藏 loading 遮罩
          uni.hideLoading();
          showLoading = false;
        }
      });
    }
  });
};


export const useShare = (shareData) => {
  const sharePath = reactive({
    title: shareData.title || '数码购机',
    path: shareData.path || '/pages/home/home',
    imageUrl: shareData.imageUrl || 'https://www.xzxskj.com/Public/upload/667e2e7a1860b8225.jpeg',
    desc: shareData.desc || '专注技术分享',
    content: shareData.content || ''
  });

  const onShareAppMessage = (res) => {
    return {
      title: sharePath.title,
      path: sharePath.path,
      imageUrl: sharePath.imageUrl,
      desc: sharePath.desc,
      content: sharePath.content,
      success(res) {
        uni.showToast({
          title: '分享成功'
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    };
  };

  const onShareTimeline = () => {};

  return {
    sharePath,
    onShareAppMessage,
    onShareTimeline
  };
};

export const addUserSetting =async (data) => {
	const db = uniCloud.database();
	await db.collection('user-setting').where({user_id:data.user_id}).remove()
	return await db.collection('user-setting').add(data)
}

export const getUserSetting =async (user_id) => {
	const db = uniCloud.database();
	return await db.collection('user-setting').where({user_id:user_id}).get()
}

export const navigateToPage = (path)=>{
	console.log('path:',path);
	// 获取当前页面栈
	let pages = getCurrentPages();
	  
	// 遍历页面栈,查找是否存在指定path的页面
	  for (let i = 0; i < pages.length; i++) {
		if (pages[i].route === path) {
		  // 找到目标页面,返回到该页面
		  uni.navigateBack({
			delta: pages.length - i - 1
		  });
		  return;
		}
	  }
	  
	return false;
}
export const convert6to10Timestamp=(sixDigitTimestamp)=>{
  // 假设时间戳是从2024年1月1日 00:00:00开始计算的
  const startDate = new Date('2024-01-01T00:00:00Z');
  const targetTime = new Date(startDate.getTime() + (sixDigitTimestamp * 1000));
  return Math.floor(targetTime.getTime() / 1000);
}

export const toBeijingTimestamp=(dateStr)=>{
   // 创建一个 Date 对象，基于传入的日期字符串
   let date = new Date(dateStr + 'T00:00:00+08:00'); // 使用北京时间
   // 获取北京时间的时间戳（毫秒数）
   let beijingTimestamp = date.getTime();
   // 将毫秒时间戳转换为秒时间戳
   return Math.floor(beijingTimestamp / 1000);
}

export const scanCode = () => {
	return new Promise((resolve, reject) => {
		uni.scanCode({
			scanType:['barCode'],
			success: function (res) {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				let scanTypeDescription = ''; // 定义变量来存储扫码类型的描述
				// 根据扫码类型设置scanTypeDescription的值
				switch (res.scanType) {
					case 'QR_CODE':
						scanTypeDescription = '二维码';
						break;
					case 'EAN_13':
						scanTypeDescription = '条形码';
						break;
					case 'barCode':
						scanTypeDescription = '一维码';
						break;
					case 'datamatrix':
						scanTypeDescription = 'Data Matrix 码';
						break;
					case 'pdf417':
						scanTypeDescription = '条形码';
						break;
					// 添加其他扫码类型的case
					default:
						scanTypeDescription = res.scanType; // 对于未知类型，直接使用scanType的值
				}
				// 回填字段
				// searchInput.value = res.result;
				resolve(res.result); // 通过Promise返回结果
			},
			fail: function (error) {
				reject(error); // 处理失败情况
			}
		});
	});
};



const convertToJpg = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl.url; // 假设 imageUrl.url 是图片的路径

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // 将 canvas 转换为 JPG 格式
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve({ url: URL.createObjectURL(blob), size: blob.size });
                } else {
                    reject('转换失败');
                }
            }, 'image/jpeg', 0.8); // 质量设置为 80%
        };

        img.onerror = () => {
            reject('图片加载失败');
        };
    });
};

export const compressImage1 = async (imageUrl) => {
    const originalSize = imageUrl.size; 
    let compressedResult;

    console.log(`原始图片大小: ${(originalSize / 1024).toFixed(2)} KB`);

    uni.showLoading({
        title: 'loading...',
        mask: true
    });

    // 如果图片大小已经小于 500KB，直接返回原图
    if (originalSize <= 500 * 1024) {
        uni.hideLoading();
        return { tempFilePath: imageUrl.url, url: imageUrl.url };
    }

    let quality = 80;
    let compressionSuccess = false;
    let lastQuality = quality, lastSize = originalSize;

    // 检查图片格式，如果不是 JPG，则转换
    if (!imageUrl.url.endsWith('.jpg')) {
        const convertedImage = await convertToJpg(imageUrl);
        imageUrl = convertedImage; // 更新为转换后的图片
    }

    // 逐步降低质量直到图片大小符合要求
    do {
        compressedResult = await uni.compressImage({
            src: imageUrl.url,
            quality: quality,
        });
        const fileInfo = await uni.getFileInfo({
            filePath: compressedResult.tempFilePath,
        });
        lastQuality = quality; 
        lastSize = fileInfo.size; 

        console.log(`压缩质量: ${lastQuality}, 压缩后图片大小: ${(lastSize / 1024).toFixed(2)} KB`);

        if (fileInfo.size <= 500 * 1024) {
            compressionSuccess = true;
            break;
        }
        quality -= 10;
    } while (quality >= 20);

    uni.hideLoading();

    if (!compressionSuccess) {
        console.log(`最后一次压缩质量: ${lastQuality}, 大小: ${(lastSize / 1024 / 1024).toFixed(2)} MB`);
        uni.showToast({
            title: '无法压缩到500KB以内，请尝试其他图片。',
            icon: 'none',
        });
        return null;
    }

    return { tempFilePath: compressedResult.tempFilePath, url: compressedResult.tempFilePath };
};



const calculateAspectRatio = (imageUrl, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        // 获取图片信息
        uni.getImageInfo({
            src: imageUrl,
            success: (result) => {
                const width = result.width; // 图片宽度
                const height = result.height; // 图片高度
                let ratio = 1; // 比例

                if (height > maxHeight || width > maxWidth) {
                    ratio = width > height ? maxWidth / width : maxHeight / height;
                }
                resolve({ ratio, width, height });
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

export const compressImage = async (imageUrl) => {
    const originalSize = imageUrl.size; 
    let compressedResult;

    console.log(`原始图片大小: ${(originalSize / 1024).toFixed(2)} KB`);

    uni.showLoading({
        title: 'loading...',
        mask: true
    });

    // 如果图片大小已经小于 500KB，直接返回原图
    if (originalSize <= 500 * 1024) {
        uni.hideLoading();
        console.log('图片大小已小于500KB，返回原图。');
        return { tempFilePath: imageUrl.url, url: imageUrl.url };
    }

    // 获取图片信息
    let width, height;
    try {
        const info = await getImageInfo(imageUrl.url);
        width = info.width;
        height = info.height;
    } catch (error) {
        uni.hideLoading();
        console.error('获取图片信息失败:', error);
        uni.showToast({
            title: '获取图片信息失败，请检查图片URL。',
            icon: 'none',
        });
        return null;
    }

    let ratio = 1; // 初始比例

    // 计算压缩比例，确保压缩后的大小小于500KB
    while (true) {
        const newWidth = Math.floor(width * ratio);
        const newHeight = Math.floor(height * ratio);
        
        try {
            compressedResult = await uni.compressImage({
                src: imageUrl.url,
                compressedWidth: newWidth,
                compressedHeight: newHeight,
            });
        } catch (error) {
            uni.hideLoading();
            console.error('压缩图片失败:', error);
            uni.showToast({
                title: '压缩图片失败，请重试。',
                icon: 'none',
            });
            return null;
        }

        let fileInfo;
        try {
            fileInfo = await uni.getFileInfo({
                filePath: compressedResult.tempFilePath,
            });
        } catch (error) {
            uni.hideLoading();
            console.error('获取压缩后图片信息失败:', error);
            uni.showToast({
                title: '获取压缩后图片信息失败，请重试。',
                icon: 'none',
            });
            return null;
        }

        console.log(`压缩后图片大小: ${(fileInfo.size / 1024).toFixed(2)} KB`);

        if (fileInfo.size <= 500 * 1024 || ratio <= 0.2) {
            break; // 如果满足条件或比例过小，则停止
        }

        ratio -= 0.1; // 每次减少10%的比例
		console.log('质量:',ratio)
    }

    uni.hideLoading();

    if (compressedResult) {
        return { tempFilePath: compressedResult.tempFilePath, url: compressedResult.tempFilePath };
    } else {
        uni.showToast({
            title: '无法压缩到500KB以内，请尝试其他图片。',
            icon: 'none',
        });
        return null;
    }
};

// 获取图片信息的辅助函数
const getImageInfo = async (url) => {
    return new Promise((resolve, reject) => {
        uni.getImageInfo({
            src: url,
            success: (result) => {
                resolve({ width: result.width, height: result.height });
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

