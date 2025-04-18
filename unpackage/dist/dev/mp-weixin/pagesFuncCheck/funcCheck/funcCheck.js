"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _component_van_empty + _easycom_uv_upload2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_upload + _easycom_uni_collapse_item + _easycom_uni_collapse + funcConfirm + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const funcConfirm = () => "./components/funcConfirm.js";
const _sfc_main = {
  __name: "funcCheck",
  setup(__props) {
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
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const funcConfirmRef = common_vendor.ref(null);
    const collapseRef = common_vendor.ref(null);
    const isShow = common_vendor.ref(false);
    const searchModelKey = common_vendor.ref("ch");
    const showModelField = common_vendor.ref("ch");
    const handleInput = async (inputText) => {
      if (inputText.length > 0) {
        await apiQualityCheckSerialSearchData(inputText);
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
    const photoSize = common_vendor.ref("1");
    const fileListRef = common_vendor.reactive({});
    const dynamicList = common_vendor.ref([]);
    const apiQualityCheckListData = async (ch) => {
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckList({ lx: "2", ch });
      if (res.code === 200) {
        return dynamicList.value = res.lists;
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none"
        });
      }
    };
    const collapsedStatus = common_vendor.ref([]);
    const collapseChange = (isOpen, index) => {
      console.log("面板：", isOpen.length > 0);
      collapsedStatus.value[index] = isOpen.length > 0;
    };
    const clickedItems = common_vendor.ref([]);
    const selectedText = common_vendor.ref([]);
    const handleCardClick = (collapseIndex, item1) => {
      clickedItems.value[collapseIndex] = item1;
      selectedText.value[collapseIndex] = item1.name;
      if (showUpdate(collapseIndex)) {
        common_vendor.nextTick$1(() => {
          collapsedStatus.value[collapseIndex] = true;
        });
      } else {
        collapsedStatus.value[collapseIndex] = false;
      }
    };
    const showUpdate = (index) => {
      dynamicList.value[index];
      const selected = clickedItems.value[index];
      return selected && selected.tpbs === "1";
    };
    const isSelected = (index, item1) => {
      return clickedItems.value[index] === item1;
    };
    const handleUpload = (event, index, itemId) => {
      utils_common.uploadFilesByIndex1(event, index, fileListRef, itemId);
    };
    const handleDelete = (event, index) => {
      utils_common.uploadDeleteByIndex(event, index, fileListRef);
    };
    const formData = common_vendor.reactive({
      remark: "",
      // 备注信息
      imei: ""
      // IMEI/SN
    });
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      receivedData.value = null;
      Object.keys(fileListRef).forEach((key) => {
        fileListRef[key] = [];
      });
      console.log("selectChange:", e);
      if (e) {
        console.log("selectChange e:", e);
        const { name, ch, machinetime, jkuidname, id, functional, gnjcycbg, gnjcbz } = e;
        receivedData.value = {
          spname: name,
          imei: ch,
          inputTime: utils_common.formatTimestamp(machinetime),
          inputPerson: jkuidname,
          zjid: id,
          id
        };
        formData.remark = gnjcbz;
        console.log("receivedData:", receivedData.value);
        apiQualityCheckListData(ch).then(() => {
          clickedItems.value = new Array(dynamicList.value.length).fill(null);
          console.log("clickedItems.value：", clickedItems.value);
          if (functional) {
            const functionalArray = functional.split(",").map(Number);
            functionalArray.forEach((item) => {
              dynamicList.value.forEach((dynamicItem, index) => {
                const erItem = dynamicItem.er.find((er) => er.id == item);
                if (erItem) {
                  clickedItems.value[index] = erItem;
                  selectedText.value[index] = erItem.name;
                  collapsedStatus.value[index] = true;
                }
              });
            });
          }
          if (gnjcycbg) {
            const gnjcycbgArray = JSON.parse(gnjcycbg);
            gnjcycbgArray.forEach((item) => {
              const index = dynamicList.value.findIndex((dynamicItem) => dynamicItem.id == item.id);
              if (index !== -1) {
                if (!fileListRef[index]) {
                  fileListRef[index] = [];
                }
                fileListRef[index].push({ url: item.url, itemId: item.id });
              }
            });
            console.log("fileListRef:", fileListRef);
          }
        });
      }
    };
    const inputPopup = common_vendor.ref(null);
    const show = common_vendor.ref(true);
    const handleClose = () => {
      console.log("Popup is closed");
      inputPopup.value.close();
      show.value = true;
    };
    const change = (e) => {
      console.log("点击了遮罩e:", e);
      show.value = !e.show;
    };
    const comfrm = () => {
      if (clickedItems.value.some((item) => !item)) {
        common_vendor.index.showToast({
          title: "请完成所有检测项",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      for (let index = 0; index < dynamicList.value.length; index++) {
        const item = dynamicList.value[index];
        clickedItems.value[index];
        if (showUpdate(index) && (!fileListRef[index] || fileListRef[index].length === 0)) {
          common_vendor.index.showToast({
            title: `请上传 ${item.name} 的图片`,
            icon: "none",
            duration: 2e3
          });
          return;
        }
      }
      apiQualityCheckAddData();
    };
    const selectAllStatus = common_vendor.ref(false);
    const selectAll = () => {
      permissionStore.loadMenuAuthority();
      if (!permissionStore.hasMenuAuthority("oneClickMachineVerification")) {
        common_vendor.index.showToast({
          title: "您没有操作权限",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      selectAllStatus.value = !selectAllStatus.value;
      if (selectAllStatus.value) {
        dynamicList.value.forEach((item, index) => {
          if (item.er && item.er.length > 0) {
            clickedItems.value[index] = item.er[0];
            selectedText.value[index] = item.er[0].name;
            collapsedStatus.value[index] = true;
          }
        });
      } else {
        resetFormData();
      }
    };
    const resetFormData = () => {
      clickedItems.value = [];
      selectedText.value = [];
      collapsedStatus.value = dynamicList.value.map(() => false);
    };
    const apiQualityCheckAddData = async () => {
      var _a;
      const allFileUrls = [];
      for (let index in fileListRef) {
        if (fileListRef[index]) {
          fileListRef[index].forEach((file) => {
            allFileUrls.push({ id: file.itemId, url: file.url });
          });
        }
      }
      const fcyjid = ((_a = clickedItems.value.find((item) => item.fid === "49")) == null ? void 0 : _a.id) || "";
      const data = {
        id: receivedData.value.id,
        // opid: uni.getStorageSync('sessionInfo').opid,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        ch: receivedData.value.imei,
        ycbgtplist: JSON.stringify(allFileUrls),
        jbztid: clickedItems.value.map((item) => item.id).join(","),
        jbztcolor: clickedItems.value.map((item) => item.color).join(","),
        jkbz: formData.remark,
        lx: "2",
        //1商品录入2功能绿录入3维修录入
        zjid: receivedData.value.zjid,
        fcyjid
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckAdd2(data);
      console.log("apiQualityCheckAddData:", res);
      if (res.zt === 1) {
        formData.successId = res.ids;
        funcConfirmRef.value.getData(receivedData.value.imei);
        if (from.value !== "QC") {
          inputPopup.value.open();
        } else {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "none",
            duration: 2e3
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "录入失败，请重试",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const apiQualityCheckSerialSearchData = async (ch) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        return orgArray.value = res.lists ? res.lists : [];
      }
    };
    const from = common_vendor.ref("");
    const receivedData = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      if (options.data) {
        console.log("Received data:", options.data);
        isShow.value = true;
        try {
          receivedData.value = JSON.parse(decodeURIComponent(options.data));
          console.log("Received data:", receivedData.value);
          apiQualityCheckListData(receivedData.value.imei).then(() => {
            clickedItems.value = new Array(dynamicList.value.length).fill(null);
          });
        } catch (e) {
          console.error("Failed to parse received data:", e);
        }
      }
      if (options.from) {
        from.value = options.from;
      }
      if (options.ch) {
        apiQualityCheckSerialSearchData(options.ch).then((res) => {
          console.log("apiQualityCheckSerialSearchData:", res);
          selectChange(res[0]);
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow) && common_vendor.unref(receivedData)
      }, common_vendor.unref(isShow) && common_vendor.unref(receivedData) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.sr(searchInputRef, "b4b51a86-1", {
          "k": "searchInputRef"
        }),
        e: common_vendor.o(selectChange),
        f: common_vendor.o(handleInput),
        g: common_vendor.p({
          keyId: 13,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        h: common_vendor.o(scan),
        i: !common_vendor.unref(receivedData)
      }, !common_vendor.unref(receivedData) ? {
        j: common_vendor.p({
          image: "search",
          description: "请搜索串号"
        })
      } : {}, {
        k: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        l: common_vendor.t(common_vendor.unref(receivedData).spname),
        m: common_vendor.t(common_vendor.unref(receivedData).imei),
        n: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(common_vendor.unref(receivedData).imei)),
        o: common_vendor.t(common_vendor.unref(receivedData).inputPerson),
        p: common_vendor.t(common_vendor.unref(receivedData).inputTime)
      } : {}, {
        q: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        r: common_vendor.f(common_vendor.unref(dynamicList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(common_vendor.unref(selectedText)[index]),
            c: common_vendor.unref(collapsedStatus)[index] ? 1 : "",
            d: common_vendor.f(item.er.slice(0, 3), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex)
              };
            }),
            e: item.er.length > 3
          }, item.er.length > 3 ? {
            f: common_vendor.f(item.er.slice(3), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex + 3,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex + 3)
              };
            })
          } : {}, {
            g: showUpdate(index)
          }, showUpdate(index) ? {
            h: common_assets._imports_0$3,
            i: common_vendor.o((event) => handleUpload(event, index, item.id), index),
            j: common_vendor.o((event) => common_vendor.unref(utils_common.uploadCheack)(event, index), index),
            k: common_vendor.o((event) => handleDelete(event, index), index),
            l: "b4b51a86-5-" + i0 + "," + ("b4b51a86-4-" + i0),
            m: common_vendor.p({
              fileList: common_vendor.unref(fileListRef)[index] || [],
              accept: "image",
              maxCount: common_vendor.unref(photoSize),
              maxSize: "5242880",
              width: "152rpx",
              height: "152rpx",
              sizeType: ["compressed"],
              previewFullImage: true,
              previewFullVideo: false
            })
          } : {}, {
            n: "b4b51a86-4-" + i0 + "," + ("b4b51a86-3-" + i0),
            o: common_vendor.p({
              ["show-arrow"]: false,
              open: common_vendor.unref(collapsedStatus)[index],
              titleBorder: "none",
              border: false
            }),
            p: common_vendor.sr(collapseRef, "b4b51a86-3-" + i0, {
              "k": "collapseRef",
              "f": 1
            }),
            q: common_vendor.o((isOpen) => collapseChange(isOpen, index), index),
            r: "b4b51a86-3-" + i0,
            s: index
          });
        })
      } : {}, {
        s: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        t: common_vendor.unref(formData).remark,
        v: common_vendor.o(($event) => common_vendor.unref(formData).remark = $event.detail.value)
      } : {}, {
        w: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {} : {}, {
        x: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        y: common_vendor.t(common_vendor.unref(selectAllStatus) ? "取消全选" : "一键验机"),
        z: common_vendor.o(selectAll),
        A: common_vendor.o(comfrm)
      } : {}, {
        B: common_vendor.unref(show),
        C: common_vendor.sr(funcConfirmRef, "b4b51a86-7,b4b51a86-6", {
          "k": "funcConfirmRef"
        }),
        D: common_vendor.o(handleClose),
        E: common_vendor.p({
          receivedData: common_vendor.unref(receivedData)
        }),
        F: common_vendor.sr(inputPopup, "b4b51a86-6", {
          "k": "inputPopup"
        }),
        G: common_vendor.o(handleClose),
        H: common_vendor.o(change),
        I: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4b51a86"]]);
wx.createPage(MiniProgramPage);
