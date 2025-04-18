const localStorage = {
  // 设置存储项
  set(key, value) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: key,
        data: value,
        success: () => {
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          });
          resolve();
        },
        fail: () => {
          uni.showToast({
            title: '保存失败',
            icon: 'none'
          });
          reject(new Error('Failed to save data'));
        }
      });
    });
  },

  // 获取存储项
  get(key) {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: key,
        success: (result) => {
          resolve(result.data);
        },
        fail: () => {
          uni.showToast({
            title: '读取失败',
            icon: 'none'
          });
          reject(new Error('Failed to read data'));
        }
      });
    });
  },

  // 删除存储项
  remove(key) {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key: key,
        success: () => {
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          });
          resolve();
        },
        fail: () => {
          uni.showToast({
            title: '删除失败',
            icon: 'none'
          });
          reject(new Error('Failed to remove data'));
        }
      });
    });
  },

  // 清除所有存储项
  clear() {
    return new Promise((resolve, reject) => {
      uni.clearStorage({
        success: () => {
          uni.showToast({
            title: '清除成功',
            icon: 'success'
          });
          resolve();
        },
        fail: () => {
          uni.showToast({
            title: '清除失败',
            icon: 'none'
          });
          reject(new Error('Failed to clear storage'));
        }
      });
    });
  }
};

export default localStorage;
