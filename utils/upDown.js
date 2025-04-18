export upload(url, filePath, name, formData = {}) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url, // 服务器上传接口地址
      filePath: filePath, // 要上传文件资源的路径
      name: name, // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      formData: formData, // HTTP 请求中其他额外的 form data
      success: (uploadFileRes) => {
        if (uploadFileRes.statusCode === 200) {
          uni.showToast({
            title: '上传成功',
            icon: 'success'
          });
          resolve(JSON.parse(uploadFileRes.data)); // 假设服务器返回的是JSON字符串，需要解析成对象
        } else {
          uni.showToast({
            title: '上传失败',
            icon: 'none'
          });
          reject(new Error('Upload failed'));
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '上传失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
}

export download(url) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url, // 文件 URL
      success: (res) => {
        if (res.statusCode === 200) {
          uni.showToast({
            title: '下载成功',
            icon: 'success'
          });
          resolve(res.tempFilePath); // 返回文件的临时路径
        } else {
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          });
          reject(new Error('Download failed'));
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
}

// 调用上传功能
upload('https://example.com/upload', '/path/to/file.png', 'file', { userId: '12345' })
  .then(data => console.log('上传成功:', data))
  .catch(error => console.error('上传失败:', error));


// 调用下载功能
download('https://example.com/path/to/file.png')
  .then(filePath => {
    console.log('下载成功, 文件路径:', filePath);
    // 可以使用uni.saveImageToPhotosAlbum将下载的文件保存到相册
  })
  .catch(error => console.error('下载失败:', error));
