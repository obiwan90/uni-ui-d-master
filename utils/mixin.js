export const shareMixin = {
  data() {
    return {
      shareOptions: {} // 用于存储分享的数据
    };
  },
  onShareAppMessage() {
	let defaultPath = '/pages/home/home';
    const { title, imageUrl, sharePath } = this.shareOptions;
	let path = sharePath ? sharePath : defaultPath; 
	console.log('title',title)
	console.log('imageUrl',imageUrl)
	console.log('sharePath',sharePath)
	console.log('path',path)
    return {
      title: title || '闲置新生-二手批发',
      path: path, 
      imageUrl: imageUrl || '',
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
  },

  onShareTimeline() {
    return {
      title: '自定义分享标题',
      query: '', // 可以根据需要设置
    };
  },

  methods: {
    // 设置分享数据
    setShareOptions(options) {
      this.shareOptions = options; // 存储传入的分享数据
    },

    copyText(text) {
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({
            title: '复制成功',
            icon: 'success',
            duration: 1500
          });
        },
        fail: (error) => {
          console.error('复制失败', error);
          uni.showToast({
            title: '复制失败，请重试',
            icon: 'none',
            duration: 1500
          });
        }
      });
    }
  }
};
