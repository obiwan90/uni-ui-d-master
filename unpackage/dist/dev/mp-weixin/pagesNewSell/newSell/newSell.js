"use strict";
const common_vendor = require("../../common/vendor.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
const api_search_search = require("../../api/search/search.js");
const pagesNewSell_api_api = require("../api/api.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uv_calendars2 = common_vendor.resolveComponent("uv-calendars");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_header2 + _easycom_uv_checkbox2 + _easycom_uv_checkbox_group2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_upload2 + _easycom_uv_calendars2 + _easycom_uni_popup2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_checkbox = () => "../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
const _easycom_uv_radio = () => "../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uv_calendars = () => "../../uni_modules/uv-calendars/components/uv-calendars/uv-calendars.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_checkbox + _easycom_uv_checkbox_group + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_upload + _easycom_uv_calendars + common_vendor.unref(jixingPannel) + _easycom_uni_popup)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const jixingPannel = () => "./components/jixingPannel.js";
const _sfc_main = {
  __name: "newSell",
  setup(__props) {
    const qselect = common_vendor.ref(null);
    const nclist = common_vendor.ref([]);
    const yslist = common_vendor.ref([]);
    const showJiXing = common_vendor.ref(false);
    const jixingPannelRef = common_vendor.ref(null);
    const jixingPopup = common_vendor.ref(null);
    const handleClose = () => {
      console.log("Popup is closed");
      jixingPopup.value.close();
    };
    const change = (e) => {
      if (!e) {
        showJiXing.value = e.show;
      }
    };
    const selectJX = () => {
      showJiXing.value = true;
      jixingPopup.value.open();
    };
    const reload4Jx = async (selected, selectedTabs) => {
      console.log("select data:", selected);
      console.log("selectedTabs:", selectedTabs);
      if (selected.length > 0) {
        qselect.value.clearData();
        orgArray.value = [];
        param.value.xhid = selected[0].xhid;
        param.value.ppid = selected[0].ppid;
        content1.value[0].value = selected[0].qcname;
        productId.value = "";
        await apiRecoveryListData();
      }
    };
    const id = common_vendor.ref("");
    const productId = common_vendor.ref();
    const orgArray = common_vendor.ref([]);
    const searchModelKey = common_vendor.ref("spname");
    const showModelField = common_vendor.ref("spname");
    const checkboxWxValue = common_vendor.ref(["1"]);
    const checkboxFnValue = common_vendor.ref(["1"]);
    const checkboxTimeValue = common_vendor.ref("72h");
    const timeList = common_vendor.ref([
      { name: "12h", checked: false },
      { name: "24h", checked: false },
      { name: "48h", checked: false },
      { name: "72h", checked: true }
    ]);
    const content1 = common_vendor.ref([
      { key: "型号", placeholder: "请搜索相关型号", value: "" },
      { key: "内存", placeholder: "请搜索相关型号", value: "", id: "" },
      { key: "颜色", placeholder: "请搜索相关型号", value: "", id: "" },
      { key: "型号全称", placeholder: "", value: "" }
    ]);
    const handleInput = (inputText) => {
      if (inputText.length > 0) {
        common_vendor.index.showLoading({
          title: "加载中....",
          mask: true
        });
        console.log("inputText", inputText);
        apiModelSearchData(inputText);
        common_vendor.index.hideLoading();
      }
    };
    const apiModelSearchData = async (inputText) => {
      const data = {
        word: inputText
      };
      const res = await api_search_search.apiSearchGoods(data);
      console.log("search res:", res);
      if (res.code === "200") {
        orgArray.value = res.lists ? res.lists : [];
      }
    };
    const selectSearchChange = async (e) => {
      if (e) {
        console.log("selectSearchChange e:", e);
        const { id: id2, xhname, ncname, ysname, spname } = e;
        nclist.value = [];
        yslist.value = [];
        qselect.value.clearData();
        orgArray.value = [];
        productId.value = id2;
        await apiQualityCheckItemData(id2);
      }
    };
    const apiQualityCheckItemData = async (id2) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        id: id2
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckItem(data);
      if (res.code === 200) {
        content1.value[0].value = res.infos.xhname;
        content1.value[1].value = res.infos.ncname;
        content1.value[2].value = res.infos.ysname;
        content1.value[3].value = res.infos.spname;
        if (!res.infos.ysname) {
          yslist.value = null;
        }
        if (!res.infos.ncname) {
          nclist.value = null;
        }
      }
    };
    const title = common_vendor.ref("自由发布");
    const type = common_vendor.ref();
    const describes = common_vendor.ref();
    const calendars = common_vendor.ref(null);
    const select = common_vendor.ref([
      { key: "外观成色", placeholder: "请选择", value: "" },
      { key: "功能检测", placeholder: "请输入", value: "全好" },
      { key: "维修检测", placeholder: "请输入", value: "全原" },
      { key: "同行价格", placeholder: "请输入", value: "" },
      { key: "销售数量", placeholder: "请输入", value: "1" },
      { key: "销售时长", placeholder: "请选择", value: "" }
    ]);
    const confirm = (e) => {
      console.log("日历回调：", e);
      select.value[5].placeholder = e.range.before + "~" + e.range.after;
    };
    const selectOption = (key) => {
      if (key === "外观成色") {
        console.log("选择成色");
      }
      if (key === "销售时长") {
        console.log("打开日历");
        calendars.value.open();
      }
    };
    const getCurrentDate = () => {
      const today = /* @__PURE__ */ new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
      return formattedDate;
    };
    const fileList1 = common_vendor.ref([]);
    const deleteFlie = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const check = (e) => {
      console.log(e);
      common_vendor.index.showToast({
        title: "超出上传限制",
        icon: "error",
        duration: 2e3
      });
    };
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      let fileListLen = fileList1.value.length;
      for (const item of lists) {
        try {
          const compressedResult = await utils_common.compressImage(item);
          if (!compressedResult) {
            continue;
          }
          console.log("compressedResult", compressedResult);
          const uploadResult = await common_vendor.index.uploadFile({
            url: "https://www.xzxskj.com/Home/Upload/add",
            filePath: compressedResult.tempFilePath,
            // 使用压缩后的图片路径
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
                fileList1.value.push({
                  url: "https://www.xzxskj.com" + imageUrl.trim(),
                  status: "success",
                  message: ""
                });
                fileListLen++;
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
    };
    const filteredContent1 = common_vendor.computed(() => {
      return content1.value.filter((item, index) => {
        if (item.key === "型号全称") {
          return false;
        }
        if (index === 1 && nclist.value === null) {
          return false;
        }
        if (index === 2 && yslist.value === null) {
          return false;
        }
        return true;
      });
    });
    const addMarket = async () => {
      try {
        const data = {
          id: id.value,
          opid: common_vendor.index.getStorageSync("sessionInfo").opid,
          type: "1",
          describes: describes.value,
          img: fileList1.value.map((file) => file.url).join(","),
          fullnameid: productId.value,
          fineness: select.value[0].value,
          price: select.value[3].value,
          num: select.value[4].value,
          duration: checkboxTimeValue.value.replace("h", ""),
          functions: select.value[1].value,
          service: select.value[2].value,
          fbd: common_vendor.index.getStorageSync("locationForm").city
        };
        const res = await pagesNewSell_api_api.apiAddMarket(data);
        if (res.code === "200") {
          common_vendor.index.showToast({
            title: "添加成功",
            icon: "success",
            duration: 500
          });
          setTimeout(() => {
            if (id.value !== "") {
              common_vendor.index.navigateBack();
            } else {
              common_vendor.index.navigateTo({
                url: "/pagesMarketCount/marketCount/marketCount?from=newSell"
              });
            }
          }, 500);
        } else {
          common_vendor.index.showToast({
            title: res.msg ? res.msg : "请重试",
            icon: "error",
            duration: 3e3
          });
        }
        console.log("addmarket res", res);
      } catch (error) {
        console.error("Error adding market:", error);
        common_vendor.index.showToast({
          title: "发生错误，请重试",
          icon: "error",
          duration: 2e3
        });
      } finally {
      }
    };
    const selected1 = (e) => {
      console.log(e);
      if (e.length > 0 && e[0] === "1") {
        select.value[1].value = "全好";
      } else {
        select.value[1].value = "";
      }
    };
    const selected2 = (e) => {
      console.log(e);
      if (e.length > 0 && e[0] === "1") {
        select.value[2].value = "全原";
      } else {
        select.value[2].value = "";
      }
    };
    const param = common_vendor.ref({
      xhid: "",
      ppid: "",
      nc: "",
      bb: "",
      wl: "",
      ys: "",
      bx: "",
      start: "",
      delivery: common_vendor.index.getStorageSync("locationForm").fullLocation.split(" ").join(",")
    });
    const apiRecoveryListData = async () => {
      nclist.value = [];
      yslist.value = [];
      content1.value[1].value = "";
      content1.value[2].value = "";
      const res = await pagesNewSell_api_api.apiRecoveryList(param.value);
      if (res.code === 200) {
        nclist.value = res.nclist ? res.nclist.filter((item) => item.name) : [];
        yslist.value = res.yslist ? res.yslist.filter((item) => item.name) : [];
        if (nclist.value.length === 0) {
          nclist.value = null;
        }
        if (yslist.value.length === 0) {
          yslist.value = null;
        }
        apiGetProductIdAc();
      }
      console.log("Recovery list:", res);
    };
    const apiGetProductIdAc = async () => {
      const apiParam = {
        xhid: param.value.xhid,
        //
        ncid: content1.value.find((item) => item.key === "内存").id,
        ysid: content1.value.find((item) => item.key === "颜色").id
      };
      const res = await pagesNewSell_api_api.apiGetProductId(apiParam);
      if (res.code === "200" && res.infos) {
        productId.value = res.infos.id;
      } else {
        productId.value = "";
      }
      console.log(" 请求  productId.value:", productId.value);
    };
    const comfirm = async () => {
      console.log("  提交  comfirm productId.value", productId.value);
      const memoryItem = content1.value.find((item) => item.key === "内存");
      const colorItem = content1.value.find((item) => item.key === "颜色");
      if (nclist.value !== null && !memoryItem.value) {
        common_vendor.index.showToast({
          title: "请选择内存",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (yslist.value !== null && !colorItem.value) {
        common_vendor.index.showToast({
          title: "请选择颜色",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!productId.value) {
        common_vendor.index.showToast({
          title: "当前型号暂不支持上传",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!describes.value) {
        common_vendor.index.showToast({
          title: "请填写描述信息",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!fileList1.value.length) {
        common_vendor.index.showToast({
          title: "请上传至少一张图片",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!select.value[0].value) {
        common_vendor.index.showToast({
          title: "请选择外观成色",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!select.value[3].value) {
        common_vendor.index.showToast({
          title: "请填写同行价格",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!select.value[4].value) {
        common_vendor.index.showToast({
          title: "请填写销售数量",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      if (!checkboxTimeValue.value) {
        common_vendor.index.showToast({
          title: "请选择销售时长",
          icon: "error",
          duration: 2e3
        });
        return;
      }
      await addMarket();
    };
    const finenesslist = common_vendor.ref([]);
    const apiGetQualityAc = async () => {
      const res = await pagesNewSell_api_api.apiGetQuality();
      if (res.code === "200") {
        finenesslist.value = res.lists;
      }
    };
    const onSelectChange = (e, item) => {
      console.log("选择 e:", e);
      item.value = finenesslist.value[e.detail.value].name;
    };
    const onSelectChange1 = async (e) => {
      console.log("选择 e:", e);
      const memoryItem = content1.value.find((item) => item.key === "内存");
      if (memoryItem) {
        console.log("memoryItem", memoryItem);
        console.log("nclist.value", nclist.value);
        const selectedIndex = Number(e.detail.value);
        if (selectedIndex >= 0 && selectedIndex < nclist.value.length) {
          memoryItem.id = nclist.value[selectedIndex].id;
          memoryItem.value = nclist.value[selectedIndex].name;
          await apiGetProductIdAc();
        } else {
          console.error("无效的索引:", selectedIndex);
        }
      } else {
        console.error("未找到内存项");
      }
    };
    const onSelectChange2 = async (e) => {
      console.log("选择 e:", e);
      const memoryItem = content1.value.find((item) => item.key === "颜色");
      if (memoryItem) {
        const selectedIndex = Number(e.detail.value);
        if (selectedIndex >= 0 && selectedIndex < yslist.value.length) {
          memoryItem.id = yslist.value[selectedIndex].id;
          memoryItem.value = yslist.value[selectedIndex].name;
          await apiGetProductIdAc();
        } else {
          console.error("无效的索引:", selectedIndex);
        }
      } else {
        console.error("未找到颜色项");
      }
    };
    common_vendor.onLoad(async (options) => {
      let infos = common_vendor.index.getStorageSync("infos");
      if (!infos || infos.info.shopname === "") {
        common_vendor.index.showModal({
          title: "提示",
          content: "您还未注册商家",
          confirmText: "去注册",
          success(res) {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pagesMenber/menber/menber"
              });
            } else {
              common_vendor.index.navigateBack();
            }
          }
        });
      }
      console.log("传递过来的参数:", options.data);
      if (options.data) {
        const data = JSON.parse(decodeURIComponent(options.data));
        title.value = "卖货修改";
        type.value = data.id;
        id.value = data.id;
        console.log("data", data);
        await apiQualityCheckItemData(data.fullnameid);
        select.value = [
          { key: "外观成色", placeholder: "请选择", value: data.fineness },
          { key: "功能检测", placeholder: "请输入", value: data.functions },
          { key: "维修检测", placeholder: "请输入", value: data.service },
          { key: "同行价格", placeholder: "请输入", value: data.price },
          { key: "销售数量", placeholder: "请输入", value: data.num },
          { key: "销售时长", placeholder: "请选择", value: data.duration + "h" }
        ];
        productId.value = data.fullnameid;
        checkboxTimeValue.value = data.duration + "h";
        describes.value = data.describes;
        data.img.split(",").forEach((item) => {
          fileList1.value.push({
            url: item
          });
        });
      }
      apiGetQualityAc();
    });
    common_vendor.onShow(async () => {
      await stores_userInfoStore.useUserStore().getInfo();
      let infos = common_vendor.index.getStorageSync("infos");
      if (!infos || infos.info.shopname === "") {
        common_vendor.index.showModal({
          title: "提示",
          content: "您还未注册商家",
          confirmText: "去注册",
          success(res) {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pagesMenber/menber/menber"
              });
            } else {
              common_vendor.index.navigateBack();
            }
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.sr(qselect, "b55e12ad-1", {
          "k": "qselect"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.o(selectSearchChange),
        e: common_vendor.p({
          keyId: 22,
          dataList: common_vendor.unref(orgArray),
          phText: "请搜索并确认型号全称",
          searchKey: common_vendor.unref(searchModelKey),
          showBorder: false,
          disabled: false,
          showField: common_vendor.unref(showModelField)
        }),
        f: common_vendor.f(common_vendor.unref(filteredContent1).slice(0, 3), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: item.placeholder,
            c: item.value,
            d: common_vendor.o(($event) => item.value = $event.detail.value, index),
            e: index === 0
          }, index === 0 ? {
            f: common_vendor.o(($event) => selectJX(), index)
          } : {}, {
            g: index === 1 && common_vendor.unref(nclist) !== null && common_vendor.unref(nclist).length > 0
          }, index === 1 && common_vendor.unref(nclist) !== null && common_vendor.unref(nclist).length > 0 ? {
            h: common_vendor.unref(nclist),
            i: common_vendor.o((event) => onSelectChange1(event), index),
            j: common_vendor.unref(content1)[1].value
          } : {}, {
            k: index === 2 && common_vendor.unref(yslist) !== null && common_vendor.unref(yslist).length > 0
          }, index === 2 && common_vendor.unref(yslist) !== null && common_vendor.unref(yslist).length > 0 ? {
            l: common_vendor.unref(yslist),
            m: common_vendor.o((event) => onSelectChange2(event), index),
            n: common_vendor.unref(content1)[2].value
          } : {}, {
            o: index
          });
        }),
        g: common_vendor.f(common_vendor.unref(select), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.key),
            b: item.key !== "销售时长"
          }, item.key !== "销售时长" ? common_vendor.e({
            c: item.key === "销售时长"
          }, item.key === "销售时长" ? {
            d: common_vendor.t(item.placeholder),
            e: common_vendor.o(($event) => selectOption(item.key), index)
          } : {}, {
            f: item.key === "外观成色"
          }, item.key === "外观成色" ? {
            g: common_vendor.t(item.value !== "" ? item.value : item.placeholder),
            h: item.value !== "" ? "black" : "#808080",
            i: common_vendor.unref(finenesslist),
            j: common_vendor.o((event) => onSelectChange(event, item), index),
            k: item.value
          } : {
            l: item.key === "同行价格" || item.key === "销售数量" ? "number" : "text",
            m: item.placeholder,
            n: common_vendor.o(($event) => selectOption(item.key), index),
            o: item.key === "维修检测" && common_vendor.unref(checkboxWxValue).length > 0 || item.key === "功能检测" && common_vendor.unref(checkboxFnValue).length > 0,
            p: item.value,
            q: common_vendor.o(($event) => item.value = $event.detail.value, index)
          }, {
            r: item.key === "维修检测" || item.key === "功能检测"
          }, item.key === "维修检测" || item.key === "功能检测" ? common_vendor.e({
            s: item.key === "维修检测"
          }, item.key === "维修检测" ? {
            t: "b55e12ad-3-" + i0 + "," + ("b55e12ad-2-" + i0),
            v: common_vendor.p({
              activeColor: "red",
              name: "1",
              label: item.key === "维修检测" ? "全原" : "全好",
              labelColor: "grey"
            }),
            w: common_vendor.o(selected2, index),
            x: "b55e12ad-2-" + i0,
            y: common_vendor.o(($event) => common_vendor.isRef(checkboxWxValue) ? checkboxWxValue.value = $event : null, index),
            z: common_vendor.p({
              shape: "circle",
              modelValue: common_vendor.unref(checkboxWxValue)
            })
          } : {}, {
            A: item.key === "功能检测"
          }, item.key === "功能检测" ? {
            B: "b55e12ad-5-" + i0 + "," + ("b55e12ad-4-" + i0),
            C: common_vendor.p({
              activeColor: "red",
              name: "1",
              label: item.key === "维修检测" ? "全原" : "全好",
              labelColor: "grey"
            }),
            D: common_vendor.o(selected1, index),
            E: "b55e12ad-4-" + i0,
            F: common_vendor.o(($event) => common_vendor.isRef(checkboxFnValue) ? checkboxFnValue.value = $event : null, index),
            G: common_vendor.p({
              shape: "circle",
              modelValue: common_vendor.unref(checkboxFnValue)
            })
          } : {}) : {}) : {
            H: common_vendor.f(common_vendor.unref(timeList), (item2, index2, i1) => {
              return {
                a: index2,
                b: "b55e12ad-7-" + i0 + "-" + i1 + "," + ("b55e12ad-6-" + i0),
                c: common_vendor.p({
                  customStyle: {
                    margin: "8px"
                  },
                  label: item2.name,
                  name: item2.name
                })
              };
            }),
            I: "b55e12ad-6-" + i0,
            J: common_vendor.o(($event) => common_vendor.isRef(checkboxTimeValue) ? checkboxTimeValue.value = $event : null, index),
            K: common_vendor.p({
              modelValue: common_vendor.unref(checkboxTimeValue)
            })
          }, {
            L: index
          });
        }),
        h: common_vendor.unref(describes),
        i: common_vendor.o(($event) => common_vendor.isRef(describes) ? describes.value = $event.detail.value : null),
        j: common_vendor.o(afterRead),
        k: common_vendor.o(deleteFlie),
        l: common_vendor.o(check),
        m: common_vendor.p({
          fileList: common_vendor.unref(fileList1),
          multiple: true,
          maxCount: 10,
          width: "162rpx",
          height: "162rpx",
          accept: "image",
          maxSize: "5242880",
          name: "2",
          previewFullVideo: true
        }),
        n: common_vendor.sr(calendars, "b55e12ad-9", {
          "k": "calendars"
        }),
        o: common_vendor.o(confirm),
        p: common_vendor.p({
          mode: "range",
          color: "#ff0000",
          date: [getCurrentDate(), ""]
        }),
        q: common_vendor.o(comfirm),
        r: common_vendor.unref(showJiXing)
      }, common_vendor.unref(showJiXing) ? {
        s: common_vendor.sr(jixingPannelRef, "b55e12ad-11,b55e12ad-10", {
          "k": "jixingPannelRef"
        }),
        t: common_vendor.o(reload4Jx),
        v: common_vendor.o(handleClose)
      } : {}, {
        w: common_vendor.sr(jixingPopup, "b55e12ad-10", {
          "k": "jixingPopup"
        }),
        x: common_vendor.o(handleClose),
        y: common_vendor.o(change),
        z: common_vendor.p({
          ["background-color"]: "rgba(0,0,0,0)",
          ["is-mask-click"]: true,
          ["safe-area"]: false,
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b55e12ad"]]);
wx.createPage(MiniProgramPage);
