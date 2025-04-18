"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_empty + _easycom_uv_upload2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_upload + common_vendor.unref(takePhotoConfirmPannel) + _easycom_uni_popup + common_vendor.unref(cusfloatButtom))();
}
const cusfloatButtom = () => "./components/cusfloatButtom.js";
const takePhotoConfirmPannel = () => "./components/takePhotoConfirmPannel.js";
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "takePhoto",
  setup(__props) {
    const opid = common_vendor.index.getStorageSync("sessionInfo").opid;
    const instance = common_vendor.getCurrentInstance();
    const searchInputRef = common_vendor.ref(null);
    const scan = async () => {
      showLoading();
      try {
        const result = await utils_common.scanCode();
        console.log("result", result);
        if (result) {
          handleInput(result).then(() => {
            if (orgArray.value.length > 0) {
              searchInputRef.value.inputText = orgArray.value[0].ch;
            }
          });
        }
      } catch (error) {
        console.error("扫码失败：", error);
      } finally {
        hideLoading();
      }
    };
    const showLoading = () => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
    };
    const hideLoading = () => {
      common_vendor.index.hideLoading();
    };
    const isShow = common_vendor.ref(false);
    const takePhotoConfirmPannelRef = common_vendor.ref(null);
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const handleInput = (inputText) => {
      if (inputText.length > 0) {
        apiQualityCheckSerialSearchData(inputText);
      }
    };
    const beforeleave = (e) => {
      console.log("e:", e);
      isShow.value = false;
      common_vendor.index.showModal({
        content: "退出质检流程再次质检请根据串号搜索",
        showCancel: true,
        success: (res) => {
          if (!res.cancel) {
            console.log("用户点击了确认");
            utils_common.navigateToPage("pagesCustomMine/customMine/customMine");
          } else {
            isShow.value = true;
          }
        }
      });
    };
    const showPannel = common_vendor.ref(false);
    const pannelPopup = common_vendor.ref(null);
    const image = common_vendor.ref();
    const remark = common_vendor.ref("");
    const handleClose = () => {
      console.log("Popup is closed");
      pannelPopup.value.close();
    };
    const pannelChange = (e) => {
      if (!e.show) {
        showPannel.value = e.show;
      }
    };
    const openPannle = () => {
      image.value = data.value[0].items[0].fileList[0].url;
      showPannel.value = true;
      takePhotoConfirmPannelRef.value.getData(receivedData.value.imei);
      pannelPopup.value.open();
    };
    const data = common_vendor.ref([
      {
        title: "上传图片",
        tips: "* 机身背面为封面图",
        items: [
          { text: "机身背面", image: "https://www.xzxskj.com/xcximg/img_add_img@3x.png", fileList: [] },
          { text: "屏幕息屏", image: "https://www.xzxskj.com/xcximg/img_add_closewindow@3x.png", fileList: [] },
          { text: "关于本机", image: "https://www.xzxskj.com/xcximg/img_add_about@3x.png", fileList: [] }
        ]
      },
      {
        title: "中框四面",
        items: [
          { text: "中框上方", image: "https://www.xzxskj.com/xcximg/img_add_upward@3x.png", fileList: [] },
          { text: "中框右侧", image: "https://www.xzxskj.com/xcximg/img_add_right@3x.png", fileList: [] },
          { text: "中框下方", image: "https://www.xzxskj.com/xcximg/img_add_downward@3x.png", fileList: [] },
          { text: "中框左侧", image: "https://www.xzxskj.com/xcximg/img_add_left@3x.png", fileList: [] }
        ]
      },
      {
        title: "机身四角",
        items: [
          { text: "左上角", image: "https://www.xzxskj.com/xcximg/img_add_lefttop@3x.png", fileList: [] },
          { text: "右上角", image: "https://www.xzxskj.com/xcximg/img_add_righttop@3x.png", fileList: [] },
          { text: "右下角", image: "https://www.xzxskj.com/xcximg/img_add_rightdown@3x.png", fileList: [] },
          { text: "左下角", image: "https://www.xzxskj.com/xcximg/img_add_leftdown@3x.png", fileList: [] }
        ]
      }
    ]);
    const deleteImage = (item, index, index1, index2) => {
      if (item.fileList) {
        item.fileList.splice(index2, 1);
        console.log("删除后的fileList:", item.fileList);
      }
      data.value = [...data.value];
      console.log("data.value:", data.value);
    };
    const previewImage = (url) => {
      const urls = data.value.flatMap((group) => group.items.flatMap((subItem) => subItem.fileList.map((file) => file.url)));
      console.log("data:", data.value);
      console.log("url:", url);
      const current = urls.indexOf(url);
      console.log("current:", current);
      common_vendor.index.previewImage({
        showmenu: true,
        current,
        urls,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data2) {
            console.log("选中了第" + (data2.tapIndex + 1) + "个按钮,第" + (data2.index + 1) + "张图片");
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    };
    const titleRemarl = common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      receivedData.value = null;
      data.value.forEach((group) => {
        group.items.forEach((item) => {
          item.fileList = [];
        });
      });
      console.log("selectChange:", e);
      if (e) {
        console.log("selectChange e:", e);
        const { name, ch, machinetime, jkuidname, id, functionaltime, gnjcuidname, servicetime, serviceuidname, cgyname, productimage, pzbz, jkbz, gnjcbz, wxjcbz, csbz } = e;
        receivedData.value = {
          spname: name,
          imei: ch,
          inputTime: utils_common.formatTimestamp(machinetime),
          inputPerson: jkuidname,
          funcInputTime: utils_common.formatTimestamp(functionaltime),
          funcInputPerson: gnjcuidname,
          maintenanceInputTime: utils_common.formatTimestamp(servicetime),
          maintenanceInputPerson: serviceuidname,
          cgyname,
          zjid: id
        };
        titleRemarl.value = jkbz + " " + gnjcbz + " " + wxjcbz + " " + csbz;
        remark.value = pzbz;
        if (productimage) {
          const productImages = productimage.split(",");
          let imageIndex = 0;
          data.value.forEach((group) => {
            group.items.forEach((item) => {
              if (imageIndex < productImages.length) {
                item.fileList.push({
                  url: productImages[imageIndex],
                  name: item.text
                });
                imageIndex++;
              }
            });
          });
        }
      }
    };
    const apiQualityCheckUploadPhotoData = async () => {
      const param = {
        opid,
        id: receivedData.value.zjid,
        tplist: extractUrls(data.value).join(","),
        bz: remark.value
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckUploadPhoto(param);
      if (res.zt === 1) {
        receivedData.value.pzbz = remark.value;
        if (from.value !== "QC") {
          openPannle();
        } else {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "none",
            duration: 2e3
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "上传失败，请重试",
          icon: "none",
          duration: 500
        });
      }
    };
    const extractUrls = (data2) => {
      return data2.flatMap((group) => group.items.flatMap((item) => item.fileList.map((file) => file.url))).filter((url) => url !== void 0);
    };
    const confirm = () => {
      console.log("data:", data.value);
      if (!checkAllImagesUploaded()) {
        return;
      }
      apiQualityCheckUploadPhotoData();
    };
    const checkAllImagesUploaded = () => {
      for (let group of data.value) {
        for (let item of group.items) {
          if (item.fileList.length === 0) {
            common_vendor.index.showToast({
              title: `${item.text} 还未上传图片`,
              icon: "none",
              duration: 2e3
            });
            return false;
          }
        }
      }
      return true;
    };
    const resetData = () => {
      data.value.forEach((group) => {
        group.items.forEach((item) => {
          item.fileList = [];
        });
      });
      remark.value = "";
      data.value = [...data.value];
      console.log("重置完成");
    };
    const apiQualityCheckSerialSearchData = async (ch) => {
      const param = {
        opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        res.lists = res.lists.filter((item) => item.finenessname !== "");
        return orgArray.value = res.lists ? res.lists : [];
      }
    };
    const takePhoto = async (event, item) => {
      console.log("上传前 data：", data.value);
      console.log("item:", item);
      console.log("event", event);
      item.fileList = [];
      await utils_common.takePhotoUploadFiles(event, item);
    };
    const handleOversize = () => {
      common_vendor.index.showToast({
        title: "文件大小超出限制",
        icon: "none",
        duration: 2e3
      });
    };
    const fabClick = () => {
      resetData();
      common_vendor.index.navigateTo({
        url: "/pagesOneClickUpload/oneClickUpload/oneClickUpload"
      });
    };
    const receivedData = common_vendor.ref(null);
    const from = common_vendor.ref("");
    common_vendor.onShow(() => {
      const photoData = common_vendor.index.getStorageSync("photoData");
      if (photoData) {
        data.value = photoData;
      }
    });
    common_vendor.onLoad((options) => {
      if (options.data) {
        try {
          isShow.value = true;
          receivedData.value = JSON.parse(decodeURIComponent(options.data));
          titleRemarl.value = receivedData.value.jkbz + " " + receivedData.value.gnjcbz + " " + receivedData.value.wxjcbz + " " + receivedData.value.csbz;
          console.log("Received data:", receivedData.value);
        } catch (e) {
          console.error("Failed to parse received data:", e);
        }
      }
      if (options.ch) {
        apiQualityCheckSerialSearchData(options.ch).then((res) => {
          selectChange(res[0]);
        });
      }
      if (options.from) {
        from.value = options.from;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow) && common_vendor.unref(receivedData)
      }, common_vendor.unref(isShow) && common_vendor.unref(receivedData) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.p({
          backgroundColor: "#F3F2F6"
        }),
        e: common_vendor.sr(searchInputRef, "a816be90-1", {
          "k": "searchInputRef"
        }),
        f: common_vendor.o(handleInput),
        g: common_vendor.o(selectChange),
        h: common_vendor.p({
          keyId: 7,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        i: common_vendor.o(scan),
        j: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        k: common_vendor.t(common_vendor.unref(receivedData).spname),
        l: common_vendor.t(common_vendor.unref(receivedData).imei),
        m: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(common_vendor.unref(receivedData).imei)),
        n: common_vendor.t(common_vendor.unref(receivedData).cgyname),
        o: common_vendor.t(common_vendor.unref(receivedData).inputPerson),
        p: common_vendor.t(common_vendor.unref(receivedData).funcInputPerson),
        q: common_vendor.t(common_vendor.unref(receivedData).maintenanceInputPerson),
        r: common_vendor.t(common_vendor.unref(titleRemarl))
      } : {}, {
        s: !common_vendor.unref(receivedData)
      }, !common_vendor.unref(receivedData) ? {
        t: common_vendor.p({
          description: "请搜索相关商品进行拍照"
        })
      } : {}, {
        v: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        w: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: index === 0
          }, index === 0 ? {
            c: common_vendor.t(item.tips)
          } : {}, {
            d: common_vendor.f(item.items, (item1, index1, i1) => {
              return {
                a: item1.image,
                b: common_vendor.o((event) => takePhoto(event, item1), index1),
                c: common_vendor.o(handleOversize, index1),
                d: "a816be90-3-" + i0 + "-" + i1,
                e: common_vendor.p({
                  fileList: item1.fileList,
                  name: "1",
                  multiple: true,
                  accept: "image",
                  maxCount: 1,
                  maxSize: "5242880",
                  width: "0",
                  height: "0",
                  sizeType: ["compressed"],
                  previewFullImage: false,
                  previewFullVideo: false
                }),
                f: common_vendor.f(item1.fileList, (item2, index2, i2) => {
                  return {
                    a: item2.url,
                    b: common_vendor.t(item2.name),
                    c: common_vendor.o(($event) => deleteImage(item1, index, index1, index2), index2),
                    d: index2,
                    e: common_vendor.o(($event) => previewImage(item2.url), index2)
                  };
                }),
                g: index1
              };
            }),
            e: index
          });
        })
      } : {}, {
        x: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        y: common_vendor.unref(remark),
        z: common_vendor.o(($event) => common_vendor.isRef(remark) ? remark.value = $event.detail.value : null)
      } : {}, {
        A: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {} : {}, {
        B: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        C: common_vendor.o(resetData),
        D: common_vendor.o(confirm)
      } : {}, {
        E: common_vendor.sr(takePhotoConfirmPannelRef, "a816be90-5,a816be90-4", {
          "k": "takePhotoConfirmPannelRef"
        }),
        F: common_vendor.o(handleClose),
        G: common_vendor.p({
          receivedData: common_vendor.unref(receivedData),
          image: common_vendor.unref(image)
        }),
        H: common_vendor.sr(pannelPopup, "a816be90-4", {
          "k": "pannelPopup"
        }),
        I: common_vendor.o(handleClose),
        J: common_vendor.o(pannelChange),
        K: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "center"
        }),
        L: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        M: common_vendor.o(fabClick)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a816be90"]]);
wx.createPage(MiniProgramPage);
