"use strict";
const common_vendor = require("../../common/vendor.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
const utils_common = require("../../utils/common.js");
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
  (_easycom_custom_header + qiaoSelect + _easycom_uv_upload + _easycom_uni_collapse_item + _easycom_uni_collapse + maintenanceInputConfirm + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const maintenanceInputConfirm = () => "./components/maintenanceInputConfirm.js";
const _sfc_main = {
  __name: "maintenanceInput",
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
    const isShow = common_vendor.ref(false);
    const maintenanceInputConfirmRef = common_vendor.ref(null);
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
    const photoSize = common_vendor.ref("1");
    const fileListRef = common_vendor.reactive({});
    const dynamicList = common_vendor.ref([]);
    const apiQualityCheckListData = async (ch) => {
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckList({ lx: "3", ch });
      console.log("质检项：", res);
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
      console.log("selectedText:", selectedText.value);
      console.log("clickedItems:", clickedItems.value);
      if (showUpdate(collapseIndex)) {
        collapsedStatus.value[collapseIndex] = true;
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
      remark: ""
      // 备注信息
    });
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      console.log("selectChange:", e);
      receivedData.value = null;
      Object.keys(fileListRef).forEach((key) => {
        fileListRef[key] = [];
      });
      if (e) {
        console.log("selectChange e:", e);
        const { name, ch, machinetime, jkuidname, id, functionaltime, gnjcuidname, service, wxjcycbg, wxjcbz } = e;
        receivedData.value = {
          spname: name,
          imei: ch,
          inputTime: utils_common.formatTimestamp(machinetime),
          inputPerson: jkuidname,
          funcInputTime: utils_common.formatTimestamp(functionaltime),
          funcInputPerson: gnjcuidname,
          zjid: id
        };
        formData.remark = wxjcbz;
        apiQualityCheckListData(ch).then(() => {
          clickedItems.value = new Array(dynamicList.value.length).fill(null);
          console.log("clickedItems.value：", clickedItems.value);
          if (service) {
            const serviceArray = service.split(",").map(Number);
            serviceArray.forEach((item) => {
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
          if (wxjcycbg) {
            const wxjcycbgArray = JSON.parse(wxjcycbg);
            wxjcycbgArray.forEach((item) => {
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
      console.log("校验所有检测项是否已选择:", clickedItems.value);
      console.log("校验所有检测项是否已选择:", clickedItems.value.some((item) => !item));
      if (clickedItems.value.some((item) => !item)) {
        common_vendor.index.showToast({
          title: "请完成所有检测项",
          icon: "none",
          duration: 500
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
            duration: 500
          });
          return;
        }
      }
      apiQualityCheckAddData();
    };
    const apiQualityCheckAddData = async () => {
      const allFileUrls = [];
      for (let index in fileListRef) {
        if (fileListRef[index]) {
          fileListRef[index].forEach((file) => {
            allFileUrls.push({ id: file.itemId, url: file.url });
          });
        }
      }
      const data = {
        id: receivedData.value.id,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        ch: receivedData.value.imei,
        ycbgtplist: JSON.stringify(allFileUrls),
        jbztid: clickedItems.value.map((item) => item.id).join(","),
        jbztcolor: clickedItems.value.map((item) => item.color).join(","),
        jkbz: formData.remark,
        lx: "3",
        //1商品录入2功能绿录入3维修录入
        zjid: receivedData.value.zjid
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckAdd3(data);
      if (res.zt === 1) {
        formData.successId = res.ids;
        maintenanceInputConfirmRef.value.getData(receivedData.value.imei);
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
      common_vendor.index.showLoading({
        title: "加载中...."
      });
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        res.lists = res.lists.filter((item) => item.functional !== "");
        console.log("apiQualityCheckSerialSearchData:", res);
        common_vendor.index.hideLoading();
        return orgArray.value = res.lists ? res.lists : [];
      }
      common_vendor.index.hideLoading();
    };
    const from = common_vendor.ref("");
    const receivedData = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      if (options.data) {
        try {
          isShow.value = true;
          receivedData.value = JSON.parse(decodeURIComponent(options.data));
          console.log("Received data:", receivedData.value);
          apiQualityCheckListData(receivedData.value.imei).then(() => {
            clickedItems.value = new Array(dynamicList.value.length).fill(null);
          });
        } catch (e) {
          console.error("Failed to parse received data:", e);
        }
      }
      if (options.ch) {
        console.log("进来了options:", options);
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
        d: common_vendor.sr(searchInputRef, "fbe07bdf-1", {
          "k": "searchInputRef"
        }),
        e: common_vendor.o(handleInput),
        f: common_vendor.o(selectChange),
        g: common_vendor.p({
          keyId: 4,
          dataList: common_vendor.unref(orgArray),
          phText: "请输入串号",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        h: common_vendor.o(scan),
        i: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        j: common_vendor.t(common_vendor.unref(receivedData).spname),
        k: common_vendor.t(common_vendor.unref(receivedData).imei),
        l: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(common_vendor.unref(receivedData).imei)),
        m: common_vendor.t(common_vendor.unref(receivedData).inputPerson),
        n: common_vendor.t(common_vendor.unref(receivedData).inputTime),
        o: common_vendor.t(common_vendor.unref(receivedData).funcInputPerson),
        p: common_vendor.t(common_vendor.unref(receivedData).funcInputTime)
      } : {}, {
        q: !common_vendor.unref(receivedData)
      }, !common_vendor.unref(receivedData) ? {
        r: common_vendor.p({
          image: "search",
          description: "请搜索串号"
        })
      } : {}, {
        s: common_vendor.unref(dynamicList).length > 0
      }, common_vendor.unref(dynamicList).length > 0 ? {
        t: common_vendor.f(common_vendor.unref(dynamicList), (item, index, i0) => {
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
            h: common_vendor.o((event) => handleUpload(event, index, item.id), index),
            i: common_vendor.o((event) => common_vendor.unref(utils_common.uploadCheack)(event, index), index),
            j: common_vendor.o((event) => handleDelete(event, index), index),
            k: "fbe07bdf-5-" + i0 + "," + ("fbe07bdf-4-" + i0),
            l: common_vendor.p({
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
            m: "fbe07bdf-4-" + i0 + "," + ("fbe07bdf-3-" + i0),
            n: common_vendor.p({
              ["show-arrow"]: false,
              open: common_vendor.unref(collapsedStatus)[index],
              titleBorder: "none",
              border: false
            }),
            o: common_vendor.sr("collapseRef", "fbe07bdf-3-" + i0, {
              "f": 1
            }),
            p: common_vendor.o((isOpen) => collapseChange(isOpen, index), index),
            q: "fbe07bdf-3-" + i0,
            r: index
          });
        })
      } : {}, {
        v: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        w: common_vendor.unref(formData).remark,
        x: common_vendor.o(($event) => common_vendor.unref(formData).remark = $event.detail.value)
      } : {}, {
        y: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {} : {}, {
        z: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        A: common_vendor.o(comfrm)
      } : {}, {
        B: common_vendor.unref(show),
        C: common_vendor.sr(maintenanceInputConfirmRef, "fbe07bdf-7,fbe07bdf-6", {
          "k": "maintenanceInputConfirmRef"
        }),
        D: common_vendor.o(handleClose),
        E: common_vendor.p({
          receivedData: common_vendor.unref(receivedData)
        }),
        F: common_vendor.sr(inputPopup, "fbe07bdf-6", {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fbe07bdf"]]);
wx.createPage(MiniProgramPage);
