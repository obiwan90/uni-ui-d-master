"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_userInfoStore = require("../../../stores/userInfoStore.js");
if (!Array) {
  const _easycom_l_painter_text2 = common_vendor.resolveComponent("l-painter-text");
  const _easycom_l_painter_view2 = common_vendor.resolveComponent("l-painter-view");
  const _easycom_l_painter2 = common_vendor.resolveComponent("l-painter");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_l_painter_text2 + _easycom_l_painter_view2 + _easycom_l_painter2 + _easycom_uni_popup2)();
}
const _easycom_l_painter_text = () => "../../../uni_modules/lime-painter/components/l-painter-text/l-painter-text.js";
const _easycom_l_painter_view = () => "../../../uni_modules/lime-painter/components/l-painter-view/l-painter-view.js";
const _easycom_l_painter = () => "../../../uni_modules/lime-painter/components/l-painter/l-painter.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_l_painter_text + _easycom_l_painter_view + _easycom_l_painter + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "posterPannel",
  props: {
    infos: {
      type: Object,
      default: () => ({})
    },
    titleRemarl: {
      type: String,
      default: () => ""
    },
    qualityinspection: {
      type: Array,
      default: () => []
    },
    modelData: {
      type: Array,
      default: () => []
    }
  },
  setup(__props, { expose: __expose }) {
    const isShow = common_vendor.ref(false);
    const showPannel = common_vendor.ref(false);
    stores_userInfoStore.useUserStore();
    const props = __props;
    const filteredItems = common_vendor.computed(() => {
      if (!props.qualityinspection || props.qualityinspection.length === 0)
        return [];
      return props.qualityinspection.map((item) => {
        const normalItems = item.er.filter((item1) => item1 && item1.xznrcor === "#41AF6F");
        const filteredEr = item.er.filter((item1) => item1 && item1.xznrcor !== "#41AF6F");
        return {
          ...item,
          er: filteredEr,
          normalCount: normalItems.length
        };
      });
    });
    const poster1 = common_vendor.ref(null);
    const qualityPopup = common_vendor.ref(null);
    const sharePathUrl = common_vendor.ref("");
    const handleClose = () => {
      console.log("quality Popup is closed");
      qualityPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showPannel.value = e.show;
        isShow.value = e.show;
        console.log("quality Popup is closed");
      }
    };
    const posterShow = async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      isShow.value = true;
      showPannel.value = true;
      await common_vendor.nextTick$1();
      let totalDelay = 0;
      const maxDelay = 5e3;
      const interval = 1e3;
      const checkPosterAndShowPopup = async () => {
        if (poster1.value) {
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
          poster1.value.canvasToTempFilePathSync({
            fileType: "jpg",
            pathType: "url",
            quality: 0.6,
            success: (res) => {
              console.log(res.tempFilePath);
              sharePathUrl.value = res.tempFilePath;
              qualityPopup.value.open();
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
        });
      });
    };
    const onSaveAlbum = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        const res = await common_vendor.index.getImageInfo({ src: sharePathUrl.value });
        await common_vendor.index.saveImageToPhotosAlbum({ filePath: res.path });
        popup.value.close();
        setTimeout(() => {
          common_vendor.index.showToast({
            title: "保存成功，请到相册查看",
            icon: "none"
          });
        }, 500);
      } catch (err) {
        console.error(err);
        common_vendor.index.showToast({
          title: "保存失败，请重新点击下载",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    __expose({
      posterShow
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 48rpx;color: #FFFFFF;",
          text: "质检报告"
        }),
        c: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;vertical-align: bottom;",
          text: "物品编码 "
        }),
        d: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;opacity:0.4;vertical-align: bottom;",
          text: __props.infos.wpbm
        }),
        e: common_vendor.p({
          css: "margin-left:20rpx;display:flex;flex-direction: column;width:60%"
        }),
        f: common_vendor.p({
          css: "font-family: EU-H7X, EU-H7X;font-weight: bold;font-size: 56rpx;color: #FF6600;vertical-align: bottom;",
          text: __props.infos.finenessname
        }),
        g: common_vendor.p({
          css: "margin-right:20rpx"
        }),
        h: common_vendor.p({
          css: "display:flex;justify-content: space-between;align-items: center;width:100%"
        }),
        i: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #FFFFFF;",
          text: "质检备注 "
        }),
        j: common_vendor.p({
          css: "margin-right:20rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #FFFFFF;opacity:0.4;",
          text: __props.titleRemarl
        }),
        k: common_vendor.p({
          css: "margin-top:20rpx;margin-left:20rpx;margin-right:20rpx"
        }),
        l: common_vendor.p({
          css: "width: 710rpx;display:flex;flex-direction: column;margin-top:20rpx;box-sizing: border-box;"
        }),
        m: common_vendor.p({
          css: "margin-left:20rpx;margin-top:14rpx;margin-right:20rpx;font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 28rpx;color: #1F1F1F",
          text: __props.infos.name
        }),
        n: common_vendor.p({
          css: "margin-left:20rpx;margin-top:14rpx;margin-bottom:14rpx;width: 650rpx;height: 2rpx;background: #EEEEEE;border-radius: 0rpx 0rpx 0rpx 0rpx;"
        }),
        o: common_vendor.f(__props.modelData.slice(0, 4), (item, index, i0) => {
          return {
            a: "87431499-18-" + i0 + "," + ("87431499-17-" + i0),
            b: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;opacity:0.4",
              text: item.title
            }),
            c: "87431499-19-" + i0 + "," + ("87431499-17-" + i0),
            d: common_vendor.p({
              css: "margin-top:6rpx;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
              text: item.value
            }),
            e: index,
            f: "87431499-17-" + i0 + ",87431499-16"
          };
        }),
        p: common_vendor.p({
          css: "margin-bottom:14rpx;height:80rpx;width:25%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;border-right: 2rpx solid #EEEEEE;"
        }),
        q: common_vendor.p({
          css: "display: flex;align-items: center;justify-content: center;width:100%"
        }),
        r: common_vendor.p({
          css: ";margin-top:30rpx;margin-left:10rpx;width: 690rpx;box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0,0,0,0.05);border-radius: 10rpx 10rpx 10rpx 10rpx;background: #FFFFFF;display: flex;flex-direction: column;"
        }),
        s: common_vendor.p({
          css: "font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;margin-top:12rpx;margin-left:24rpx",
          text: "外观成色"
        }),
        t: common_vendor.f(__props.infos.combinationid, (item, index, i0) => {
          return {
            a: "87431499-24-" + i0 + "," + ("87431499-23-" + i0),
            b: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
              text: item
            }),
            c: "87431499-25-" + i0 + "," + ("87431499-23-" + i0),
            d: common_vendor.p({
              css: {
                fontFamily: "PingFang SC, PingFang SC",
                fontWeight: "400",
                fontSize: "24rpx",
                color: __props.infos.combinationyslist[index]
              },
              text: __props.infos.combinationname[index]
            }),
            e: index,
            f: "87431499-23-" + i0 + ",87431499-21"
          };
        }),
        v: common_vendor.p({
          css: "display: flex;justify-content: space-between;align-items: center;width: 650rpx;margin-top:12rpx;margin-left:24rpx;margin-bottom:12rpx;"
        }),
        w: common_vendor.p({
          css: "margin-left:10rpx;width: 690rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;flex-direction: column;"
        }),
        x: common_vendor.p({
          css: "margin-top:10rpx"
        }),
        y: common_vendor.f(filteredItems.value, (item, index, i0) => {
          return common_vendor.e({
            a: "87431499-28-" + i0 + "," + ("87431499-27-" + i0),
            b: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC;font-weight: bold;font-size: 24rpx;color: #1F1F1F;",
              text: item.name
            }),
            c: item.ycnum !== "0"
          }, item.ycnum !== "0" ? {
            d: "87431499-31-" + i0 + "," + ("87431499-30-" + i0),
            e: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC; font-weight: 400; font-size: 24rpx; color: #ED784B;",
              text: `${item.ycnum}项异常`
            })
          } : {}, {
            f: "87431499-30-" + i0 + "," + ("87431499-29-" + i0),
            g: "87431499-33-" + i0 + "," + ("87431499-32-" + i0),
            h: common_vendor.p({
              css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #41AF6F;",
              text: `${item.normalCount}项正常`
            }),
            i: "87431499-32-" + i0 + "," + ("87431499-29-" + i0),
            j: "87431499-29-" + i0 + "," + ("87431499-27-" + i0),
            k: "87431499-27-" + i0 + "," + ("87431499-26-" + i0),
            l: common_vendor.f(item.er.slice(0, 3), (item1, index2, i1) => {
              return {
                a: "87431499-35-" + i0 + "-" + i1 + "," + ("87431499-34-" + i0 + "-" + i1),
                b: common_vendor.p({
                  css: "font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #1F1F1F;",
                  text: item1.name
                }),
                c: "87431499-36-" + i0 + "-" + i1 + "," + ("87431499-34-" + i0 + "-" + i1),
                d: common_vendor.p({
                  css: {
                    fontFamily: "PingFang SC, PingFang SC",
                    fontWeight: "400",
                    fontSize: "24rpx",
                    color: item1.xznrcor
                  },
                  text: item1.xznr
                }),
                e: index2,
                f: "87431499-34-" + i0 + "-" + i1 + "," + ("87431499-26-" + i0)
              };
            }),
            m: index,
            n: "87431499-26-" + i0 + ",87431499-0"
          });
        }),
        z: common_vendor.p({
          css: "width: 124rpx;height: 46rpx;background: #FFF8EF;border-radius: 24rpx 24rpx 24rpx 24rpx;display:flex;justify-content: center;align-items: center;"
        }),
        A: common_vendor.p({
          css: "margin-left:10rpx;width: 124rpx;height: 46rpx;background: #EFFFF3;border-radius: 24rpx 24rpx 24rpx 24rpx;display:flex;justify-content: center;align-items: center;"
        }),
        B: common_vendor.p({
          css: "display:flex;justify-content: center;align-items: center;margin-right:24rpx"
        }),
        C: common_vendor.p({
          css: "width:100%;display:flex;justify-content: space-between;align-items: center;margin-top:12rpx;margin-left:24rpx;margin-right:24rpx"
        }),
        D: common_vendor.p({
          css: "display: flex;justify-content: space-between;align-items: center;width: 650rpx;margin-top:12rpx;margin-left:24rpx;margin-bottom:12rpx;"
        }),
        E: common_vendor.p({
          css: "margin-top:10rpx;margin-left:10rpx;width: 690rpx;background: #FFFFFF;border-radius: 10rpx 10rpx 10rpx 10rpx;display: flex;flex-direction: column;"
        }),
        F: common_vendor.sr(poster1, "87431499-0", {
          "k": "poster1"
        }),
        G: common_vendor.p({
          hidden: true,
          ["file-type"]: "jpg",
          css: "padding-bottom:20rpx;width: 710rpx; border-radius: 20rpx;background-image: url(https://www.xzxskj.com/Public/upload/66da6753f276c9231.png);",
          ["custom-style"]: "position: fixed;top: 0;left: 0;"
        })
      } : {}, {
        H: common_vendor.unref(showPannel)
      }, common_vendor.unref(showPannel) ? {
        I: common_vendor.o(handleClose),
        J: common_vendor.unref(sharePathUrl),
        K: common_vendor.o((...args) => _ctx.transmit && _ctx.transmit(...args)),
        L: common_vendor.o(onSaveAlbum)
      } : {}, {
        M: common_vendor.sr(qualityPopup, "87431499-37", {
          "k": "qualityPopup"
        }),
        N: common_vendor.o(handleClose),
        O: common_vendor.o(pannelChange),
        P: common_vendor.p({
          type: "center",
          ["background-color"]: "rgba(0,0,0,0)",
          ["safe-area"]: false,
          ["is-mask-click"]: true
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87431499"]]);
wx.createComponent(Component);
