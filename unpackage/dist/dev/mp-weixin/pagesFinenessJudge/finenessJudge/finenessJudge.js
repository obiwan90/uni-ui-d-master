"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesFinenessJudge_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
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
  (_easycom_custom_header + qiaoSelect + _easycom_uv_upload + _easycom_uni_collapse_item + _easycom_uni_collapse + common_vendor.unref(finenessJudgePannel) + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const finenessJudgePannel = () => "./components/finenessJudgePannel.js";
const _sfc_main = {
  __name: "finenessJudge",
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
    const finenessJudgePannelRef = common_vendor.ref(null);
    const collapseRef = common_vendor.ref(null);
    const isShow = common_vendor.ref(false);
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
    const photoSize = common_vendor.ref(3);
    const fileListRef = common_vendor.reactive({});
    const collapsedStatus = common_vendor.ref([]);
    const collapseChange = (isOpen, index) => {
      console.log("isOpen:", isOpen);
      collapsedStatus.value[index] = isOpen.length > 0;
      console.log("collapsedStatus:", collapsedStatus.value);
    };
    const clickedItems = common_vendor.ref([]);
    const selectedText = common_vendor.ref([]);
    const handleCardClick = (collapseIndex, item1) => {
      clickedItems.value[collapseIndex] = item1;
      selectedText.value[collapseIndex] = item1.name;
      console.log("clickedItems:", clickedItems.value);
      console.log("selectedText:", selectedText.value);
      updateSelectedIds(collapseIndex, item1.id);
      if (item1.tpbs === "1") {
        showUpdateMap.value[collapseIndex] = true;
      } else {
        showUpdateMap.value[collapseIndex] = false;
      }
      console.log("showUpdateMap", showUpdateMap.value);
    };
    const showUpdateMap = common_vendor.ref([false, false, false]);
    const isSelected = (index, item1) => {
      return clickedItems.value[index] === item1;
    };
    const handleUpload = (event, index) => {
      utils_common.uploadFilesByIndex(event, index, fileListRef);
    };
    const handleDelete = (event, index) => {
      utils_common.uploadDeleteByIndex(event, index, fileListRef);
    };
    const showPannel = common_vendor.ref(false);
    const pannelPopup = common_vendor.ref(null);
    const csinfos = common_vendor.ref(null);
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
      showPannel.value = true;
      finenessJudgePannelRef.value.getData(receivedData.value.imei);
      pannelPopup.value.open();
    };
    const formData = common_vendor.reactive({
      remark: ""
    });
    const titleRemarl = common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const selectChange = async (e) => {
      console.log("selectChange:", e);
      Object.keys(fileListRef).forEach((key) => {
        fileListRef[key] = [];
      });
      if (e) {
        console.log("selectChange e:", e);
        const { name, ch, machinetime, jkuidname, id, functionaltime, gnjcuidname, servicetime, serviceuidname, cgyname, finenessname, csbz, jswg, pmwg, yjid, jkbz, gnjcbz, wxjcbz, yjxsimg, pmwgimg, jswgimg } = e;
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
          cgyname,
          zjid: id,
          finenessname
        };
        selectedIds.jswg = jswg;
        selectedIds.pmwg = pmwg;
        selectedIds.yjig = yjid;
        titleRemarl.value = jkbz + " " + gnjcbz + " " + wxjcbz;
        formData.remark = csbz;
        fileListRef[0] = jswgimg ? jswgimg.split(",").map((item) => ({ url: item })) : [];
        fileListRef[1] = pmwgimg ? pmwgimg.split(",").map((item) => ({ url: item })) : [];
        fileListRef[2] = yjxsimg ? yjxsimg.split(",").map((item) => ({ url: item })) : [];
        await apiFinanceItemListData(id);
        updateSelection(csList.value, selectedIds.jswg, 0);
        updateSelection(csList.value, selectedIds.pmwg, 1);
        updateYjSelection(yjlist.value, selectedIds.yjig);
        await apiFinanceDataData();
      }
    };
    const updateSelection = (list, selectedId, baseIndex) => {
      console.log("updateSelection:", list, selectedId, baseIndex);
      list.forEach((item) => {
        item.erlist.forEach((item1, index) => {
          if (item1.id === selectedId) {
            clickedItems.value[baseIndex] = item1;
            selectedText.value[baseIndex] = item1.name;
            if (index >= 2) {
              collapsedStatus.value[baseIndex] = true;
            }
            if (item1.tpbs === "1") {
              showUpdateMap.value[baseIndex] = true;
            } else {
              showUpdateMap.value[baseIndex] = false;
            }
          }
        });
      });
    };
    const updateYjSelection = (list, selectedId) => {
      console.log("updateYjSelection:", list, selectedId);
      list.forEach((item, index) => {
        if (item.id === selectedId) {
          const baseIndex = csList.value.length;
          clickedItems.value[baseIndex] = item;
          selectedText.value[baseIndex] = item.name;
          selectedIds.yjig = item.id;
          if (index >= 2) {
            collapsedStatus.value[baseIndex] = true;
          }
          if (item.tpbs === "1") {
            showUpdateMap.value[baseIndex] = true;
          } else {
            showUpdateMap.value[baseIndex] = false;
          }
          console.log("selectedText:", selectedText.value);
        }
      });
    };
    const csList = common_vendor.ref([]);
    const yjlist = common_vendor.ref([]);
    const selectedIds = common_vendor.reactive({
      jswg: "",
      pmwg: "",
      yjig: ""
    });
    const updateSelectedIds = (index, id) => {
      if (index === 0) {
        selectedIds.jswg = id;
      } else if (index === 1) {
        selectedIds.pmwg = id;
      } else {
        selectedIds.yjig = id;
      }
      if (selectedIds.jswg && selectedIds.pmwg && selectedIds.yjig) {
        apiFinanceDataData();
      }
    };
    const concel = () => {
      resetFormData();
    };
    const apiFinanceItemListData = async (id) => {
      const res = await pagesFinenessJudge_api_api.apiFinanceItemList({ id });
      if (res.zt === 1) {
        csList.value = res.lists;
        yjlist.value = res.yjlist;
        collapsedStatus.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => false);
        selectedText.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => "");
        clickedItems.value = Array.from({ length: csList.value.length + yjlist.value.length }, () => null);
        console.log("csList:", csList.value);
        console.log("clickedItems:", clickedItems.value);
        console.log("collapsedStatus:", collapsedStatus.value);
        console.log("yjlist:", yjlist.value);
        updateYjSelection(yjlist.value, res.fcyjid);
      }
    };
    const apiFinanceDataData = async () => {
      const param = {
        id: receivedData.value.zjid,
        jswg: selectedIds.jswg,
        pmwg: selectedIds.pmwg,
        yjid: selectedIds.yjig
      };
      const res = await pagesFinenessJudge_api_api.apiFinanceData(param);
      if (res.zt === 1 && res.csinfos) {
        csinfos.value = res.csinfos;
      } else {
        common_vendor.index.showToast({
          title: "请联系客服",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const apiFinanceSaveData = async () => {
      console.log("fileListRef:", fileListRef);
      console.log("fileListRef[0]:", fileListRef[0]);
      const jswgimgs = fileListRef[0] && fileListRef[0].map((item) => item.url).join(",") || "";
      const pmwgimgs = fileListRef[1] && fileListRef[1].map((item) => item.url).join(",") || "";
      const yjimgs = fileListRef[2] && fileListRef[2].map((item) => item.url).join(",") || "";
      const param = {
        // opid: uni.getStorageSync('sessionInfo').opid,
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        id: receivedData.value.zjid,
        csname: csinfos.value.name,
        csid: csinfos.value.id,
        bz: formData.remark,
        jswg: selectedIds.jswg,
        pmwg: selectedIds.pmwg,
        yjid: selectedIds.yjig,
        jswgimg: jswgimgs,
        pmwgimg: pmwgimgs,
        yjxsimg: yjimgs
        // jswgimg: fileListRef[0][0].url,
        // pmwgimg: fileListRef[1][0].url,
        // yjimg: fileListRef[2][0].url
      };
      const res = await pagesFinenessJudge_api_api.apiFinanceSave(param);
      if (res.zt === 1) {
        receivedData.value.finenessName = csinfos.value.name;
        receivedData.value.csbz = formData.remark;
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
    const confirm = () => {
      console.log("clickedItems:", clickedItems.value);
      console.log("fileListRef:", fileListRef);
      if (!csinfos.value || !csinfos.value.name) {
        common_vendor.index.showToast({
          title: "请先判断成色",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      let hasError = false;
      clickedItems.value.some((item, index) => {
        if (item && item.tpbs === "1") {
          if (!fileListRef || !Array.isArray(fileListRef[index]) || fileListRef[index].length === 0) {
            common_vendor.index.showToast({
              title: `请为"${item.name}"上传图片`,
              icon: "none",
              duration: 2e3
            });
            hasError = true;
            return true;
          }
        }
        return false;
      });
      if (!hasError) {
        apiFinanceSaveData();
      }
    };
    const apiQualityCheckSerialSearchData = async (ch) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        res.lists = res.lists.filter((item) => item.service !== "");
        return orgArray.value = res.lists ? res.lists : [];
      }
    };
    const from = common_vendor.ref("");
    const receivedData = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      if (options.data) {
        try {
          isShow.value = true;
          receivedData.value = JSON.parse(decodeURIComponent(options.data));
          titleRemarl.value = receivedData.value.jkbz + " " + receivedData.value.gnjcbz + " " + receivedData.value.wxjcbz;
          console.log("Received data:", receivedData.value);
          apiFinanceItemListData(receivedData.value.zjid);
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
        a: isShow.value && receivedData.value
      }, isShow.value && receivedData.value ? {
        b: isShow.value,
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.p({
          backgroundColor: "#F3F2F6"
        }),
        e: common_vendor.sr(searchInputRef, "dc72479f-1", {
          "k": "searchInputRef"
        }),
        f: common_vendor.o(handleInput),
        g: common_vendor.o(selectChange),
        h: common_vendor.p({
          keyId: 10,
          phText: "请输入串号",
          dataList: orgArray.value,
          searchKey: searchModelKey.value,
          showBorder: false,
          disabled: false,
          showField: showModelField.value
        }),
        i: common_vendor.o(scan),
        j: !receivedData.value
      }, !receivedData.value ? {
        k: common_vendor.p({
          description: "请搜索相关商品进行拍照"
        })
      } : {}, {
        l: receivedData.value
      }, receivedData.value ? {
        m: common_vendor.t(receivedData.value.spname),
        n: common_vendor.t(receivedData.value.imei),
        o: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(receivedData.value.imei)),
        p: common_vendor.t(receivedData.value.cgyname),
        q: common_vendor.t(receivedData.value.inputPerson),
        r: common_vendor.t(receivedData.value.funcInputPerson),
        s: common_vendor.t(receivedData.value.maintenanceInputPerson),
        t: common_vendor.t(titleRemarl.value)
      } : {}, {
        v: receivedData.value
      }, receivedData.value ? {
        w: common_vendor.t(csinfos.value ? csinfos.value.name : receivedData.value.finenessname ? receivedData.value.finenessname : "请判断成色")
      } : {}, {
        x: receivedData.value && csList.value.length > 0
      }, receivedData.value && csList.value.length > 0 ? {
        y: common_vendor.f(csList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(selectedText.value[index]),
            c: item.erlist.length > 2
          }, item.erlist.length > 2 ? {
            d: collapsedStatus.value[index] ? 1 : ""
          } : {}, {
            e: common_vendor.f(item.erlist.slice(0, 2), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex)
              };
            }),
            f: item.erlist.length > 2
          }, item.erlist.length > 2 ? {
            g: common_vendor.f(item.erlist.slice(2), (item1, cardIndex, i1) => {
              return {
                a: common_vendor.t(item1.name),
                b: isSelected(index, item1) ? 1 : "",
                c: isSelected(index, item1) ? 1 : "",
                d: cardIndex + 2,
                e: common_vendor.o(($event) => handleCardClick(index, item1), cardIndex + 2)
              };
            })
          } : {}, {
            h: showUpdateMap.value[index]
          }, showUpdateMap.value[index] ? {
            i: common_vendor.o((event) => common_vendor.unref(utils_common.uploadCheack)(event, index), index),
            j: common_vendor.o((event) => handleDelete(event, index), index),
            k: "dc72479f-5-" + i0 + "," + ("dc72479f-4-" + i0),
            l: common_vendor.p({
              fileList: fileListRef[index] || [],
              accept: "image",
              maxCount: photoSize.value,
              maxSize: "5242880",
              width: "152rpx",
              height: "152rpx",
              sizeType: ["compressed"],
              previewFullImage: true,
              previewFullVideo: false,
              ["after-read"]: (event) => handleUpload(event, index)
            })
          } : {}, {
            m: "dc72479f-4-" + i0 + "," + ("dc72479f-3-" + i0),
            n: common_vendor.p({
              ["show-arrow"]: false,
              open: collapsedStatus.value[index],
              titleBorder: "none",
              border: false
            }),
            o: common_vendor.sr(collapseRef, "dc72479f-3-" + i0, {
              "k": "collapseRef",
              "f": 1
            }),
            p: common_vendor.o((isOpen) => collapseChange(isOpen, index), index),
            q: "dc72479f-3-" + i0,
            r: index
          });
        })
      } : {}, {
        z: receivedData.value && yjlist.value.length > 0
      }, receivedData.value && yjlist.value.length > 0 ? common_vendor.e({
        A: common_vendor.t(selectedText.value[2]),
        B: yjlist.value.length > 2
      }, yjlist.value.length > 2 ? {
        C: collapsedStatus.value[2] ? 1 : ""
      } : {}, {
        D: common_vendor.f(yjlist.value.slice(0, 2), (item1, cardIndex, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: isSelected(2, item1) ? 1 : "",
            c: isSelected(2, item1) ? 1 : "",
            d: cardIndex,
            e: common_vendor.o(($event) => handleCardClick(2, item1), cardIndex)
          };
        }),
        E: yjlist.value.length > 2
      }, yjlist.value.length > 2 ? {
        F: common_vendor.f(yjlist.value.slice(2), (item1, cardIndex, i0) => {
          return {
            a: common_vendor.t(item1.name),
            b: isSelected(2, item1) ? 1 : "",
            c: isSelected(2, item1) ? 1 : "",
            d: cardIndex + 2,
            e: common_vendor.o(($event) => handleCardClick(2, item1), cardIndex + 2)
          };
        })
      } : {}, {
        G: showUpdateMap.value[2]
      }, showUpdateMap.value[2] ? {
        H: common_vendor.o((event) => common_vendor.unref(utils_common.uploadCheack)(event, 2)),
        I: common_vendor.o((event) => handleDelete(event, 2)),
        J: common_vendor.p({
          ["file-list"]: fileListRef[2] || [],
          accept: "image",
          maxCount: photoSize.value,
          maxSize: "5242880",
          width: "152rpx",
          height: "152rpx",
          sizeType: ["compressed"],
          previewFullImage: true,
          previewFullVideo: false,
          ["after-read"]: (event) => handleUpload(event, 2)
        })
      } : {}, {
        K: common_vendor.p({
          ["show-arrow"]: false,
          open: collapsedStatus.value[2],
          titleBorder: "none",
          border: false
        }),
        L: common_vendor.sr(collapseRef, "dc72479f-6", {
          "k": "collapseRef"
        }),
        M: common_vendor.o((isOpen) => collapseChange(isOpen, 2))
      }) : {}, {
        N: receivedData.value
      }, receivedData.value ? {
        O: formData.remark,
        P: common_vendor.o(($event) => formData.remark = $event.detail.value)
      } : {}, {
        Q: receivedData.value
      }, receivedData.value ? {} : {}, {
        R: receivedData.value
      }, receivedData.value ? {
        S: common_vendor.o(concel),
        T: common_vendor.o(confirm)
      } : {}, {
        U: common_vendor.sr(finenessJudgePannelRef, "dc72479f-10,dc72479f-9", {
          "k": "finenessJudgePannelRef"
        }),
        V: common_vendor.o(handleClose),
        W: common_vendor.p({
          receivedData: receivedData.value,
          csinfos: csinfos.value
        }),
        X: common_vendor.sr(pannelPopup, "dc72479f-9", {
          "k": "pannelPopup"
        }),
        Y: common_vendor.o(handleClose),
        Z: common_vendor.o(pannelChange),
        aa: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc72479f"]]);
wx.createPage(MiniProgramPage);
