"use strict";
const common_vendor = require("../common/vendor.js");
function copyText(text) {
  common_vendor.index.setClipboardData({
    data: text,
    success: function() {
      common_vendor.index.showToast({
        title: "复制成功",
        icon: "success",
        duration: 1500
      });
    },
    fail: function(error) {
      console.error("复制失败", error);
      common_vendor.index.showToast({
        title: "复制失败，请重试",
        icon: "none",
        duration: 1500
      });
    }
  });
}
const uploadFiles = async (event, fileListName, fileListRef) => {
  let lists = [].concat(event);
  console.log("lists:", lists);
  for (let item of lists) {
    console.log("item:", item);
    try {
      const compressedImage = await compressImage(item);
      if (!compressedImage) {
        continue;
      }
      const uploadResult = await common_vendor.index.uploadFile({
        url: "https://www.xzxskj.com/Home/Upload/add",
        filePath: compressedImage.tempFilePath,
        name: "imgs",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data = JSON.parse(uploadResult.data);
      if (data.code !== 200) {
        console.error("上传失败:", data);
        common_vendor.index.showToast({
          title: "上传失败,稍后再试",
          icon: "error",
          duration: 2e3
        });
        return;
      } else {
        console.log("上传成功:", data.urls);
        const imageUrls = data.urls.split(",");
        imageUrls.forEach((imageUrl) => {
          if (imageUrl.trim()) {
            fileListRef[fileListName].value.push({
              url: "https://www.xzxskj.com" + imageUrl.trim(),
              name: item.type === "image" ? "图片" : "视频",
              type: item.type,
              isImage: item.type.startsWith("image"),
              isVideo: item.type.startsWith("video")
            });
          }
        });
      }
    } catch (error) {
      console.error("上传失败:", error);
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "error",
        duration: 2e3
      });
    }
  }
  fileListRef[fileListName].value = [...fileListRef[fileListName].value];
};
const uploadCheack = (e, fileListName) => {
  console.log("好像超出限制了");
  console.log(e);
  common_vendor.index.showToast({
    title: "超出上传限制",
    icon: "error",
    duration: 2e3
  });
};
const uploadDelete = (event, fileListName, fileListRef) => {
  console.log("我在删除");
  console.log(event);
  const index = event.index;
  fileListRef[fileListName].value.splice(index, 1);
  fileListRef[fileListName].value = [...fileListRef[fileListName].value];
};
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1e3);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const convertDateStringToTimestamp = (dateString) => {
  const date = new Date(dateString);
  const unixTimestamp = Math.floor(date.getTime() / 1e3);
  return unixTimestamp;
};
const getCurrentDateString = () => {
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const uploadFilesByIndex = async (event, index, fileListRef, itemId) => {
  if (!fileListRef[index]) {
    fileListRef[index] = common_vendor.ref([]);
  }
  let lists = [].concat(event);
  console.log("lists:", lists);
  for (let item of lists) {
    console.log("item:", item);
    try {
      const compressedImage = await compressImage(item);
      if (!compressedImage) {
        continue;
      }
      const uploadResult = await common_vendor.index.uploadFile({
        url: "https://www.xzxskj.com/Home/Upload/add",
        filePath: compressedImage.tempFilePath,
        name: "imgs",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data = JSON.parse(uploadResult.data);
      if (data.code !== 200) {
        console.error("上传失败:", data);
        common_vendor.index.showToast({
          title: "上传失败,稍后再试",
          icon: "error",
          duration: 2e3
        });
        return;
      } else {
        console.log("上传成功:", data.urls);
        const imageUrls = data.urls.split(",");
        imageUrls.forEach((imageUrl) => {
          if (imageUrl.trim()) {
            fileListRef[index].push({
              url: "https://www.xzxskj.com" + imageUrl.trim(),
              name: item.type === "image" ? "图片" : "视频",
              type: item.type,
              isImage: item.type.startsWith("image"),
              isVideo: item.type.startsWith("video"),
              itemId: itemId ? itemId : ""
            });
          }
        });
      }
    } catch (error) {
      console.error("上传失败:", error);
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "error",
        duration: 2e3
      });
    }
  }
  fileListRef[index] = [...fileListRef[index]];
  console.log("fileListRef:", fileListRef);
};
const uploadFilesByIndex1 = async (event, index, fileListRef, itemId) => {
  if (!fileListRef[index]) {
    fileListRef[index] = common_vendor.ref([]);
  }
  let lists = [].concat(event);
  console.log("lists:", lists);
  for (let item of lists) {
    console.log("item:", item);
    try {
      const compressedImage = await compressImage(item.file);
      if (!compressedImage) {
        continue;
      }
      const uploadResult = await common_vendor.index.uploadFile({
        url: "https://www.xzxskj.com/Home/Upload/add",
        filePath: compressedImage.tempFilePath,
        name: "imgs",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data = JSON.parse(uploadResult.data);
      if (data.code !== 200) {
        console.error("上传失败:", data);
        common_vendor.index.showToast({
          title: "上传失败,稍后再试",
          icon: "error",
          duration: 2e3
        });
        return;
      } else {
        console.log("上传成功:", data.urls);
        const imageUrls = data.urls.split(",");
        imageUrls.forEach((imageUrl) => {
          if (imageUrl.trim()) {
            fileListRef[index].push({
              url: "https://www.xzxskj.com" + imageUrl.trim(),
              name: item.file.type === "image" ? "图片" : "视频",
              type: item.file.type,
              isImage: item.file.type.startsWith("image"),
              isVideo: item.file.type.startsWith("video"),
              itemId: itemId ? itemId : ""
            });
          }
        });
      }
    } catch (error) {
      console.error("上传失败:", error);
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "error",
        duration: 2e3
      });
    }
  }
  fileListRef[index] = [...fileListRef[index]];
  console.log("fileListRef:", fileListRef);
};
const uploadDeleteByIndex = (event, index, fileListRef) => {
  console.log("我在删除");
  console.log(event);
  const fileIndex = event.index;
  if (!fileListRef[index]) {
    console.error("fileListRef[index] 不存在:", index);
    return;
  }
  fileListRef[index].splice(fileIndex, 1);
  fileListRef[index] = [...fileListRef[index]];
};
const takePhotoUploadFiles = async (event, item1) => {
  console.log("上传文件:", event);
  for (let file of event.file) {
    console.log("file", file);
    try {
      const compressedImage = await compressImage(file);
      if (!compressedImage) {
        continue;
      }
      const uploadResult = await common_vendor.index.uploadFile({
        url: "https://www.xzxskj.com/Home/Upload/add",
        filePath: compressedImage.tempFilePath,
        name: "imgs",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data = JSON.parse(uploadResult.data);
      if (data.code !== 200) {
        console.error("上传失败:", data);
        common_vendor.index.showToast({
          title: "上传失败,稍后再试",
          icon: "error",
          duration: 2e3
        });
        return;
      } else {
        console.log("上传成功:", data.urls);
        const imageUrls = data.urls.split(",");
        imageUrls.forEach((imageUrl) => {
          if (imageUrl.trim()) {
            item1.fileList.push({
              url: "https://www.xzxskj.com" + imageUrl.trim(),
              name: item1.text,
              type: file.type,
              isImage: file.type.startsWith("image"),
              isVideo: file.type.startsWith("video")
            });
          }
        });
      }
    } catch (error) {
      console.error("上传失败:", error);
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "error",
        duration: 2e3
      });
    }
  }
  item1.fileList = [...item1.fileList];
  console.log("item1.fileList:", item1.fileList);
};
const customTakePhotoUploadFiles = async (filePath, item) => {
  console.log("上传文件:", filePath);
  try {
    const compressedImage = await compressImage({ url: filePath });
    if (!compressedImage) {
      return;
    }
    const uploadResult = await common_vendor.index.uploadFile({
      url: "https://www.xzxskj.com/Home/Upload/add",
      filePath: compressedImage.tempFilePath,
      name: "imgs",
      header: {
        "Content-Type": "multipart/form-data"
      }
    });
    const data = JSON.parse(uploadResult.data);
    if (data.code !== 200) {
      console.error("上传失败:", data);
      common_vendor.index.showToast({
        title: "上传失败,稍后再试",
        icon: "error",
        duration: 2e3
      });
      return;
    } else {
      console.log("上传成功:", data.urls);
      const imageUrls = data.urls.split(",");
      imageUrls.forEach((imageUrl) => {
        if (imageUrl.trim()) {
          item.fileList.push({
            url: "https://www.xzxskj.com" + imageUrl.trim(),
            name: item.text
          });
        }
      });
    }
  } catch (error) {
    console.error("上传失败:", error);
    common_vendor.index.showToast({
      title: "上传失败",
      icon: "error",
      duration: 2e3
    });
  }
  item.fileList = [...item.fileList];
  console.log("item.fileList:", item.fileList);
};
const previewImages = (urls, currentUrl = "") => {
  const currentIndex = urls.indexOf(currentUrl);
  console.log("url:", currentUrl);
  console.log("urls:", urls);
  console.log("current:", currentIndex);
  common_vendor.index.previewImage({
    showmenu: true,
    current: currentIndex,
    urls,
    longPressActions: {
      itemList: ["发送给朋友", "保存图片", "收藏"],
      success: function(data) {
        console.log("选中了第" + (data.tapIndex + 1) + "个按钮,第" + (data.index + 1) + "张图片");
      },
      fail: function(err) {
        console.log(err.errMsg);
      }
    }
  });
};
const saveImagesToAlbum = (urls) => {
  let hasAuthorized = false;
  let saveQueue = [];
  let showLoading = false;
  const saveImage = (url) => {
    common_vendor.index.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          common_vendor.index.saveImageToPhotosAlbum({
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
  urls.forEach((url) => {
    if (hasAuthorized) {
      saveImage(url);
    } else {
      saveQueue.push(url);
      if (!showLoading && saveQueue.length > 0) {
        showLoading = true;
        common_vendor.index.showLoading({
          title: "正在保存图片...",
          mask: true
        });
      }
      common_vendor.index.getSetting({
        success: (res) => {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                hasAuthorized = true;
                saveQueue.forEach(saveImage);
                saveQueue = [];
                common_vendor.index.hideLoading();
                showLoading = false;
              },
              fail: (err) => {
                console.error("授权失败:", err);
                common_vendor.index.hideLoading();
                showLoading = false;
              }
            });
          } else {
            hasAuthorized = true;
            saveQueue.forEach(saveImage);
            saveQueue = [];
            common_vendor.index.hideLoading();
            showLoading = false;
          }
        },
        fail: (err) => {
          console.error("获取授权设置失败:", err);
          common_vendor.index.hideLoading();
          showLoading = false;
        }
      });
    }
  });
};
const useShare = (shareData) => {
  const sharePath = common_vendor.reactive({
    title: shareData.title || "数码购机",
    path: shareData.path || "/pages/home/home",
    imageUrl: shareData.imageUrl || "https://www.xzxskj.com/Public/upload/667e2e7a1860b8225.jpeg",
    desc: shareData.desc || "专注技术分享",
    content: shareData.content || ""
  });
  const onShareAppMessage = (res) => {
    return {
      title: sharePath.title,
      path: sharePath.path,
      imageUrl: sharePath.imageUrl,
      desc: sharePath.desc,
      content: sharePath.content,
      success(res2) {
        common_vendor.index.showToast({
          title: "分享成功"
        });
      },
      fail(res2) {
        common_vendor.index.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    };
  };
  const onShareTimeline = () => {
  };
  return {
    sharePath,
    onShareAppMessage,
    onShareTimeline
  };
};
const navigateToPage = (path) => {
  console.log("path:", path);
  let pages = getCurrentPages();
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].route === path) {
      common_vendor.index.navigateBack({
        delta: pages.length - i - 1
      });
      return;
    }
  }
  return false;
};
const toBeijingTimestamp = (dateStr) => {
  let date = /* @__PURE__ */ new Date(dateStr + "T00:00:00+08:00");
  let beijingTimestamp = date.getTime();
  return Math.floor(beijingTimestamp / 1e3);
};
const scanCode = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.scanCode({
      scanType: ["barCode"],
      success: function(res) {
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
        switch (res.scanType) {
          case "QR_CODE":
            break;
          case "EAN_13":
            break;
          case "barCode":
            break;
          case "datamatrix":
            break;
          case "pdf417":
            break;
          default:
            res.scanType;
        }
        resolve(res.result);
      },
      fail: function(error) {
        reject(error);
      }
    });
  });
};
const compressImage = async (imageUrl) => {
  const originalSize = imageUrl.size;
  let compressedResult;
  console.log(`原始图片大小: ${(originalSize / 1024).toFixed(2)} KB`);
  common_vendor.index.showLoading({
    title: "loading...",
    mask: true
  });
  if (originalSize <= 500 * 1024) {
    common_vendor.index.hideLoading();
    console.log("图片大小已小于500KB，返回原图。");
    return { tempFilePath: imageUrl.url, url: imageUrl.url };
  }
  let width, height;
  try {
    const info = await getImageInfo(imageUrl.url);
    width = info.width;
    height = info.height;
  } catch (error) {
    common_vendor.index.hideLoading();
    console.error("获取图片信息失败:", error);
    common_vendor.index.showToast({
      title: "获取图片信息失败，请检查图片URL。",
      icon: "none"
    });
    return null;
  }
  let ratio = 1;
  while (true) {
    const newWidth = Math.floor(width * ratio);
    const newHeight = Math.floor(height * ratio);
    try {
      compressedResult = await common_vendor.index.compressImage({
        src: imageUrl.url,
        compressedWidth: newWidth,
        compressedHeight: newHeight
      });
    } catch (error) {
      common_vendor.index.hideLoading();
      console.error("压缩图片失败:", error);
      common_vendor.index.showToast({
        title: "压缩图片失败，请重试。",
        icon: "none"
      });
      return null;
    }
    let fileInfo;
    try {
      fileInfo = await common_vendor.index.getFileInfo({
        filePath: compressedResult.tempFilePath
      });
    } catch (error) {
      common_vendor.index.hideLoading();
      console.error("获取压缩后图片信息失败:", error);
      common_vendor.index.showToast({
        title: "获取压缩后图片信息失败，请重试。",
        icon: "none"
      });
      return null;
    }
    console.log(`压缩后图片大小: ${(fileInfo.size / 1024).toFixed(2)} KB`);
    if (fileInfo.size <= 500 * 1024 || ratio <= 0.2) {
      break;
    }
    ratio -= 0.1;
    console.log("质量:", ratio);
  }
  common_vendor.index.hideLoading();
  if (compressedResult) {
    return { tempFilePath: compressedResult.tempFilePath, url: compressedResult.tempFilePath };
  } else {
    common_vendor.index.showToast({
      title: "无法压缩到500KB以内，请尝试其他图片。",
      icon: "none"
    });
    return null;
  }
};
const getImageInfo = async (url) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getImageInfo({
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
exports.compressImage = compressImage;
exports.convertDateStringToTimestamp = convertDateStringToTimestamp;
exports.copyText = copyText;
exports.customTakePhotoUploadFiles = customTakePhotoUploadFiles;
exports.formatTimestamp = formatTimestamp;
exports.getCurrentDateString = getCurrentDateString;
exports.navigateToPage = navigateToPage;
exports.previewImages = previewImages;
exports.saveImagesToAlbum = saveImagesToAlbum;
exports.scanCode = scanCode;
exports.takePhotoUploadFiles = takePhotoUploadFiles;
exports.toBeijingTimestamp = toBeijingTimestamp;
exports.uploadCheack = uploadCheack;
exports.uploadDelete = uploadDelete;
exports.uploadDeleteByIndex = uploadDeleteByIndex;
exports.uploadFiles = uploadFiles;
exports.uploadFilesByIndex = uploadFilesByIndex;
exports.uploadFilesByIndex1 = uploadFilesByIndex1;
exports.useShare = useShare;
