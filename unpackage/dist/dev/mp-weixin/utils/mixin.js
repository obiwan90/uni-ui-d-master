"use strict";
const common_vendor = require("../common/vendor.js");
const shareMixin = {
  data() {
    return {
      shareOptions: {}
      // 用于存储分享的数据
    };
  },
  onShareAppMessage() {
    let defaultPath = "/pages/home/home";
    const { title, imageUrl, sharePath } = this.shareOptions;
    let path = sharePath ? sharePath : defaultPath;
    console.log("title", title);
    console.log("imageUrl", imageUrl);
    console.log("sharePath", sharePath);
    console.log("path", path);
    return {
      title: title || "闲置新生-二手批发",
      path,
      imageUrl: imageUrl || "",
      success(res) {
        common_vendor.index.showToast({
          title: "分享成功"
        });
      },
      fail(res) {
        common_vendor.index.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    };
  },
  onShareTimeline() {
    return {
      title: "自定义分享标题",
      query: ""
      // 可以根据需要设置
    };
  },
  methods: {
    // 设置分享数据
    setShareOptions(options) {
      this.shareOptions = options;
    },
    copyText(text) {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success",
            duration: 1500
          });
        },
        fail: (error) => {
          console.error("复制失败", error);
          common_vendor.index.showToast({
            title: "复制失败，请重试",
            icon: "none",
            duration: 1500
          });
        }
      });
    }
  }
};
exports.shareMixin = shareMixin;
