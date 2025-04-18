"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userInfoStore = require("../../../stores/userInfoStore.js");
if (!Array) {
  const _easycom_l_painter_image2 = common_vendor.resolveComponent("l-painter-image");
  const _easycom_l_painter_text2 = common_vendor.resolveComponent("l-painter-text");
  const _easycom_l_painter_view2 = common_vendor.resolveComponent("l-painter-view");
  const _easycom_l_painter_qrcode2 = common_vendor.resolveComponent("l-painter-qrcode");
  const _easycom_l_painter2 = common_vendor.resolveComponent("l-painter");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_l_painter_image2 + _easycom_l_painter_text2 + _easycom_l_painter_view2 + _easycom_l_painter_qrcode2 + _easycom_l_painter2 + _easycom_uni_popup2)();
}
const _easycom_l_painter_image = () => "../../../uni_modules/lime-painter/components/l-painter-image/l-painter-image.js";
const _easycom_l_painter_text = () => "../../../uni_modules/lime-painter/components/l-painter-text/l-painter-text.js";
const _easycom_l_painter_view = () => "../../../uni_modules/lime-painter/components/l-painter-view/l-painter-view.js";
const _easycom_l_painter_qrcode = () => "../../../uni_modules/lime-painter/components/l-painter-qrcode/l-painter-qrcode.js";
const _easycom_l_painter = () => "../../../uni_modules/lime-painter/components/l-painter/l-painter.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_l_painter_image + _easycom_l_painter_text + _easycom_l_painter_view + _easycom_l_painter_qrcode + _easycom_l_painter + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "share",
  props: {
    infos: {
      type: Object,
      default: () => {
      }
    },
    qualityinspection: {
      type: Array,
      default: () => []
    },
    modelData: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["closeSharePannel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const isShow = common_vendor.ref(false);
    const showPannel = common_vendor.ref(false);
    const user = common_vendor.ref();
    const props = __props;
    const handleClose = () => {
      console.log("share Popup is closed");
      popup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showPannel.value = e.show;
        isShow.value = e.show;
        console.log("share Popup is closed");
      }
    };
    const filteredModelData = common_vendor.computed(() => {
      console.log("props.modelData", props.modelData);
      return props.modelData.filter((item) => item.value !== "无" && item.type !== "delivery");
    });
    const qualityText1 = common_vendor.computed(() => {
      const item = props.qualityinspection[0];
      return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
    });
    const qualityText2 = common_vendor.computed(() => {
      const item = props.qualityinspection[1];
      return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
    });
    const qualityText3 = common_vendor.computed(() => {
      const item = props.qualityinspection[2];
      return item.ycnum === 0 ? `${item.name}全部通过` : `${item.name}${item.ycnum}项异常`;
    });
    common_vendor.computed(() => {
      return props.infos.shopname + "专员";
    });
    const poster = common_vendor.ref(null);
    const popup = common_vendor.ref(null);
    const sharePathUrl = common_vendor.ref("");
    const handleShow = async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      user.value = await stores_userInfoStore.useUserStore().getInfo();
      isShow.value = true;
      showPannel.value = true;
      await common_vendor.nextTick$1();
      let totalDelay = 0;
      const maxDelay = 5e3;
      const interval = 1e3;
      const checkPosterAndShowPopup = async () => {
        if (poster.value) {
          try {
            await showPopup();
            common_vendor.index.hideLoading();
          } catch (error) {
            console.error(error);
            common_vendor.index.hideLoading();
          }
        } else {
          console.error("poster is null");
          totalDelay += interval;
          if (totalDelay < maxDelay) {
            setTimeout(checkPosterAndShowPopup, interval);
          } else {
            console.error("最大延迟已达到，停止检查");
            common_vendor.index.hideLoading();
          }
        }
      };
      setTimeout(checkPosterAndShowPopup, interval);
    };
    const showPopup = () => {
      return new Promise((resolve, reject) => {
        common_vendor.nextTick$1(() => {
          if (poster.value) {
            poster.value.canvasToTempFilePathSync({
              fileType: "jpg",
              pathType: "url",
              quality: 0.6,
              success: (res) => {
                console.log(res.tempFilePath);
                sharePathUrl.value = res.tempFilePath;
                popup.value.open();
                resolve();
              },
              fail: (err) => {
                console.log(err);
                common_vendor.index.showToast({
                  title: "生成分享图片失败",
                  icon: "none"
                });
                reject(err);
              }
            });
          } else {
            console.error("poster is null in showPopup");
            reject(new Error("poster is null"));
          }
        });
      });
    };
    const onSaveAlbum = () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        common_vendor.index.getImageInfo({
          src: sharePathUrl.value,
          success: (res) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.path,
              success: (res2) => {
                popup.value.close();
                setTimeout(() => {
                  common_vendor.index.showToast({
                    title: "保存成功，请到相册查看",
                    icon: "none"
                  });
                }, 500);
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "授权提示",
                  content: "需要授权保存相册",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          console.log(
                            setting
                          );
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取权限失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        console.log(err);
        common_vendor.index.hideLoading();
      }
    };
    __expose({
      handleShow
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? common_vendor.e({
        b: common_vendor.p({
          ["object-fit"]: "fill",
          css: "position: absolute;top:32rpx;left:30rpx;height: 72rpx;width: 72rpx;border-radius: 50%;",
          src: common_vendor.unref(user).img ? "https://www.xzxskj.com" + common_vendor.unref(user).img : "https://www.xzxskj.com/Public/upload/66697e97b8c363900.png"
        }),
        c: common_vendor.unref(user).nik_name !== ""
      }, common_vendor.unref(user).nik_name !== "" ? {
        d: common_vendor.p({
          css: "position: absolute;top:32rpx;left:112rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #FFFFFF;text-shadow: 0px 0px 20px rgba(0,0,0,0.25);",
          text: common_vendor.unref(user).nik_name
        })
      } : {}, {
        e: common_vendor.p({
          css: "position: absolute;top:70rpx;left:112rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #FFFFFF;text-shadow: 0px 0px 20px rgba(0,0,0,0.25);",
          text: __props.data.phone
        }),
        f: common_vendor.p({
          css: "position: absolute;top:134rpx;left:20rpx;height: 764rpx;width: 650rpx;border: 2rpx solid #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;background: #FFFFFF;"
        }),
        g: common_vendor.p({
          css: "object-fit:contain;position: absolute;top:154rpx;left:40rpx;height: 490rpx;width: 610rpx;border: 2rpx solid #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;background: #FFFFFF;",
          src: __props.infos.cover
        }),
        h: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 32rpx;color: #1F1F1F;",
          text: __props.infos.name
        }),
        i: common_vendor.f(common_vendor.unref(filteredModelData), (item, index, i0) => {
          return {
            a: index,
            b: "73654661-9-" + i0 + ",73654661-8",
            c: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 28rpx;color: #8A8A8C;background: #F2F3F6;padding-left:4rpx;padding-right:4rpx;margin-right:10rpx",
              text: item.value
            })
          };
        }),
        j: common_vendor.p({
          css: "position: absolute;bottom:0;left:0;"
        }),
        k: common_vendor.p({
          css: "width:610rpx;position: absolute;top:674rpx;left:40rpx;height:100rpx;"
        }),
        l: common_vendor.p({
          css: "position: absolute;top:798rpx;left:40rpx; font-family: DIN, DIN;font-weight: bold;font-size: 48rpx;color: #EB4636;",
          text: `￥${__props.data.price}`
        }),
        m: common_vendor.p({
          css: "background-image: url(https://www.xzxskj.com/Public/upload/66697cbf259ac1810.png);position: absolute;top:876rpx;left:100rpx;height: 64rpx;width: 12rpx;"
        }),
        n: common_vendor.p({
          css: "background-image: url(https://www.xzxskj.com/Public/upload/66697cbf259ac1810.png);position: absolute;top:876rpx;right:100rpx;height: 64rpx;width: 12rpx;"
        }),
        o: common_vendor.p({
          css: "position: absolute;top:918rpx;left:20rpx;width: 650rpx;height: 300rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;border: 2rpx solid #FFFFFF;"
        }),
        p: common_vendor.p({
          css: "position: absolute;top:960rpx;left:45rpx; font-family: PingFang SC, PingFang SC;font-weight: 800;font-size: 48rpx;color: #1F1F1F;",
          text: __props.infos.finenessname
        }),
        q: common_vendor.p({
          css: "background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;top:1052rpx;left:50rpx;height: 24rpx;width: 24rpx;"
        }),
        r: common_vendor.p({
          css: "background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;z-index:99;top:1106rpx;left:50rpx;height: 24rpx;width: 24rpx;"
        }),
        s: common_vendor.p({
          css: "background-image: url(https://www.xzxskj.com/Public/upload/6645a51f189276871.png);position: absolute;z-index:99;top:1160rpx;left:50rpx;height: 24rpx;width: 24rpx;"
        }),
        t: common_vendor.p({
          css: "position: absolute;top:1046rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
          text: common_vendor.unref(qualityText1)
        }),
        v: common_vendor.p({
          css: "position: absolute;top:1100rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
          text: common_vendor.unref(qualityText2)
        }),
        w: common_vendor.p({
          css: "position: absolute;top:1154rpx;left:86rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
          text: common_vendor.unref(qualityText3)
        }),
        x: common_vendor.p({
          text: "https://www.xzxskj.com/Home/Hbindex/index?id=" + __props.data.id,
          css: "position: absolute;top:960rpx;right:50rpx;width: 176rpx; height: 176rpx"
        }),
        y: common_vendor.p({
          css: "opacity:0.6;position: absolute;top:1162rpx;right:50rpx; font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 22rpx;color: #1F1F1F;",
          text: "扫码查看商品详情"
        }),
        z: common_vendor.sr(poster, "73654661-0", {
          "k": "poster"
        }),
        A: common_vendor.p({
          hidden: true,
          ["file-type"]: "jpg",
          css: "width: 690rpx;height: 1240rpx;background-color: pink;background-image: url(https://www.xzxskj.com/Public/upload/664560d28b2697631.png);",
          ["custom-style"]: "position: fixed;top: 0;left: 0;"
        })
      }) : {}, {
        B: common_vendor.unref(showPannel)
      }, common_vendor.unref(showPannel) ? {
        C: common_vendor.o(handleClose),
        D: common_vendor.unref(sharePathUrl),
        E: common_vendor.o(onSaveAlbum)
      } : {}, {
        F: common_vendor.sr(popup, "73654661-23", {
          "k": "popup"
        }),
        G: common_vendor.o(handleClose),
        H: common_vendor.o(pannelChange),
        I: common_vendor.p({
          type: "center",
          ["background-color"]: "rgba(0,0,0,0)",
          ["safe-area"]: false,
          ["is-mask-click"]: true
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73654661"]]);
wx.createComponent(Component);
