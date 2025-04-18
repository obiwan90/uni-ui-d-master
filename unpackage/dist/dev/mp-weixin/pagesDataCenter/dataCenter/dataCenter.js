"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const utils_system = require("../../utils/system.js");
const pagesDataCenter_api_api = require("../api/api.js");
const api_station_station = require("../../api/station/station.js");
const stores_menuPermissionStore = require("../../stores/menuPermissionStore.js");
if (!Array) {
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _component_van_progress = common_vendor.resolveComponent("van-progress");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _component_van_image = common_vendor.resolveComponent("van-image");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  (_component_van_dropdown_item + _component_van_dropdown_menu + _easycom_z_paging2 + _component_van_progress + _component_van_loading + _component_van_image + _component_van_tag)();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  _easycom_z_paging();
}
const _sfc_main = {
  __name: "dataCenter",
  setup(__props) {
    const permissionStore = stores_menuPermissionStore.usePermissionStore();
    const cardTitle = common_vendor.computed(() => {
      return ymdj.value === "1" ? "库存分析" : ymdj.value === "2" ? "品牌数据" : ymdj.value === "3" ? "型号数据" : ymdj.value === "4" ? "内存数据" : ymdj.value === "5" ? "全称数据" : "商品列表";
    });
    const paging = common_vendor.ref(null);
    const paging1 = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const dataList1 = common_vendor.ref([]);
    common_vendor.ref(true);
    const calculatePercentage = (item2) => {
      const total = isActive.value ? totalData.value.totalNum : totalData.value.totalPrice;
      const value = isActive.value ? item2.num : item2.price ? item2.price : 0;
      return total > 0 ? (value / total * 100).toFixed(0) : 0;
    };
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      await getDataAnalysis(selectedIndex.value);
      console.log("dataCenterFilter", dataCenterFilter.value);
      paging.value.complete(dataCenterFilter.value);
    };
    const dataCenterFilter = common_vendor.computed(() => {
      return data_center.value.filter((item2) => !item2.menuAuthority || permissionStore.hasMenuAuthority(item2.menuAuthority));
    });
    const start = common_vendor.ref();
    const queryList1 = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      start.value = pageNo - 1;
      const lists = await getStockAnalysis();
      paging1.value.complete(lists);
    };
    const selectedTitileIndex = common_vendor.ref(0);
    const titleChange = common_vendor.ref(["数据分析", "库存分析"]);
    const selectTitle = (index) => {
      selectedTitileIndex.value = index;
      if (index === 0) {
        common_vendor.nextTick$1(() => {
        });
      } else {
        common_vendor.nextTick$1(() => {
        });
      }
    };
    const option1 = common_vendor.ref([
      // { text: '全部仓库', value: 0 },
      // { text: '仓库1', value: 1 },
      // { text: '仓库2', value: 2 }
    ]);
    const option2 = common_vendor.ref([
      { text: "全部采购", value: -1 }
    ]);
    const value1 = common_vendor.ref(-1);
    const value2 = common_vendor.ref(-1);
    const selectParamChange1 = (value) => {
      value1.value = value.detail;
      paging1.value.reload(true);
    };
    const selectParamChange2 = (value) => {
      value2.value = value.detail;
      paging1.value.reload(true);
    };
    const isActive = common_vendor.ref(false);
    const toggleSwitch = () => {
      isActive.value = !isActive.value;
    };
    const selectedIndex = common_vendor.ref(0);
    const timeCardData = common_vendor.ref(["今日", "昨日", "本月", "上月", "时间区间"]);
    const filteredTimeCardData = common_vendor.computed(() => timeCardData.value.filter((item2, index) => index !== 4));
    const timeRange = common_vendor.ref("时间区间");
    const selectCard = (index) => {
      selectedIndex.value = index;
      showDropdown.value = false;
      showTimeRange.value = false;
      if (selectedIndex.value !== 5) {
        paging.value.reload(true);
      }
    };
    const pickerStartValue = common_vendor.ref("开始时间");
    const pickerLastValue = common_vendor.ref("截止时间");
    const pickerStartTimestamp = common_vendor.ref();
    const pickerLastTimestamp = common_vendor.ref();
    const onTimeChange1 = (e) => {
      console.log(e);
      pickerStartValue.value = e.detail.value;
      pickerStartTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
    };
    const onTimeChange2 = (e) => {
      console.log(e);
      pickerLastValue.value = e.detail.value;
      pickerLastTimestamp.value = utils_common.toBeijingTimestamp(e.detail.value);
    };
    const showTimeRange = common_vendor.ref(false);
    const showDropdown = common_vendor.ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      showTimeRange.value = true;
      selectedIndex.value = 4;
    };
    const tiemComfirm = () => {
      showDropdown.value = false;
      showTimeRange.value = false;
      paging.value.reload(true);
    };
    const resetTime = () => {
      pickerStartValue.value = "开始时间";
      pickerLastValue.value = "截止时间";
      pickerStartTimestamp.value = "";
      pickerLastTimestamp.value = "";
    };
    const data_center = common_vendor.ref([]);
    const goPath = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const getDataAnalysis = async (selectTime) => {
      const data = {
        lx: selectTime + 1,
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        startTime: selectedIndex.value + 1 === 5 ? pickerStartTimestamp.value : "",
        endTime: selectedIndex.value + 1 === 5 ? pickerLastTimestamp.value : ""
      };
      const res = await pagesDataCenter_api_api.apiDataAnalysis(data);
      console.log("res:", res);
      data_center.value = [
        {
          text: "销售数据",
          menuAuthority: "saleData",
          values: [
            { text: "销售台数(台)", count: res.xsnum },
            { text: "销售金额(元)", count: res.xsprice },
            { text: "售后退货(台)", count: res.shnum },
            { text: "售后退货(元)", count: res.shprice },
            { text: "线下销售(台)", count: res.xxnum },
            { text: "线下销售(元)", count: res.xxprice },
            { text: "平台销售(台)", count: res.ptnum },
            { text: "平台销售(元)", count: res.ptprice }
          ],
          path: "/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=销售数据"
        },
        {
          text: "商品数据",
          menuAuthority: "productData",
          values: [
            { text: "商品录入", count: res.splrcount },
            { text: "功能检测", count: res.gnjccount },
            { text: "维修检测", count: res.wxjccount },
            { text: "拍照", count: res.pzcount },
            { text: "成色判断", count: res.cscount },
            { text: "定价上架", count: res.djcount },
            { text: "临时下架", count: res.lsxjcount },
            { text: "退出库存", count: res.tcckcount }
          ],
          path: "/pagesDataCenterProductData/dataCenterProductData/dataCenterProductData"
        },
        {
          text: "先货后款",
          menuAuthority: "fpbkData",
          values: [
            { text: "先货后款(台)", count: res.xhhknum },
            { text: "先货后款(元)", count: res.xhhkprice },
            { text: "欠款已收(台)", count: res.xhhkysnum },
            { text: "欠款已收(元)", count: res.xhhkysprice },
            { text: "欠款已退(台)", count: res.xhhkytnum },
            { text: "退货上架(台)", count: res.xhhkythsjnum },
            { text: "退货下架(台)", count: res.xhhkythxjnum },
            { text: "退出库存(台)", count: res.xhhkytcknum }
          ],
          path: "/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=先货后款"
        },
        {
          text: "议价数据",
          menuAuthority: "yjData",
          values: [
            { text: "议价商品(台)", count: res.yjzts },
            { text: "成功议价(台)", count: res.yjcgnum },
            { text: "驳回议价(台)", count: res.yjsbnum },
            { text: "议价成功(元)", count: res.yjcgprice }
          ],
          path: "/pagesDataCenterDetail/dataCenterDetail/dataCenterDetail?title=议价数据"
        }
      ];
    };
    const totalData = common_vendor.ref({
      totalNum: 0,
      totalPrice: 0
    });
    const ymdj = common_vendor.ref("1");
    const flid = common_vendor.ref("");
    const ppid = common_vendor.ref("");
    const xhid = common_vendor.ref("");
    const ncid = common_vendor.ref("");
    const qcid = common_vendor.ref("");
    const getStockAnalysis = async () => {
      const data = {
        ckid: value1.value === -1 ? "" : String(value1.value),
        cgid: value2.value === -1 ? "" : String(value2.value),
        start: start.value,
        ymdj: ymdj.value,
        //1分类 2品牌3型号4内存5 全称6商品列表
        flid: flid.value,
        ppid: ppid.value,
        xhid: xhid.value,
        ncid: ncid.value,
        qcid: qcid.value
      };
      const res = await pagesDataCenter_api_api.apiStockAnalysis(data);
      console.log("res:", res);
      if (res.zt === 1) {
        totalData.value.totalNum = res.num;
        totalData.value.totalPrice = res.price;
        if (res.yglist && res.yglist.length > 0) {
          res.yglist.forEach((item2) => {
            const hasItem = option2.value.find((item1) => item1.value === parseInt(item2.id));
            if (!hasItem) {
              option2.value.push({ text: item2.username, value: parseInt(item2.id) });
            }
            option2.value = [...option2.value];
          });
        }
      }
      return res.zt === 1 ? res.lists : [];
    };
    const apiAdminGetStoreData = async () => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await api_station_station.apiAdminGetStore(param);
      if (res.code === 200) {
        console.log("仓库 res:", res);
        option1.value.push({ text: "全部仓库", value: -1 });
        res.lists.forEach((item2) => {
          const { name, id } = item2;
          option1.value.push({ text: name, value: parseInt(id) });
        });
      }
    };
    const reloadPage = (item2) => {
      console.log("item:", item2);
      start.value = 0;
      ymdj.value = String(parseInt(ymdj.value) + 1);
      flid.value = String(item2.id);
      titleChange.value = ymdj.value === "1" ? ["数据分析", "库存分析"] : ymdj.value === "2" ? [item2.name] : ymdj.value === "3" ? [item2.name] : ymdj.value === "4" ? ["内存数据"] : ymdj.value === "5" ? ["全称数据"] : ["商品列表"];
      if (ymdj.value === "2") {
        flid.value = String(item2.id);
      } else if (ymdj.value === "3") {
        ppid.value = String(item2.id);
      } else if (ymdj.value === "4") {
        xhid.value = String(item2.id);
      } else if (ymdj.value === "5") {
        ncid.value = String(item2.id);
      } else {
        qcid.value = String(item2.id);
      }
      const selectedDataCenterData = common_vendor.index.getStorageSync("selectedDataCenterData");
      if (selectedDataCenterData) {
        selectedDataCenterData.push({
          flid: flid.value,
          ppid: ppid.value,
          xhid: xhid.value,
          ncid: ncid.value,
          qcid: qcid.value
        });
        common_vendor.index.setStorageSync("selectedDataCenterData", selectedDataCenterData);
      } else {
        console.log("set");
        common_vendor.index.setStorageSync("selectedDataCenterData", [{
          flid: flid.value,
          ppid: ppid.value,
          xhid: xhid.value,
          ncid: ncid.value,
          qcid: qcid.value
        }]);
      }
      paging1.value.reload(true);
    };
    const customLeftFn = () => {
      console.log("customLeftFn");
      if (ymdj.value !== "1") {
        start.value = "1";
        ymdj.value = String(parseInt(ymdj.value) - 1);
        const selectedDataCenterData = common_vendor.index.getStorageSync("selectedDataCenterData");
        const {
          flid: flid1,
          ppid: ppid1,
          xhid: xhid1,
          ncid: ncid1,
          qcid: qcid1
        } = selectedDataCenterData.pop();
        flid.value = flid1;
        ppid.value = ppid1;
        xhid.value = xhid1;
        ncid.value = ncid1;
        qcid.value = qcid1;
        common_vendor.index.setStorageSync("selectedDataCenterData", selectedDataCenterData);
        titleChange.value = ymdj.value === "1" ? ["数据分析", "库存分析"] : ymdj.value === "2" ? [item.name] : ymdj.value === "3" ? [item.name] : ymdj.value === "4" ? ["内存数据"] : ymdj.value === "5" ? ["全称数据"] : ["商品列表"];
        if (ymdj.value === "1") {
          flid.value = "";
        } else if (ymdj.value === "2") {
          ppid.value = "";
        } else if (ymdj.value === "3") {
          xhid.value = "";
        } else if (ymdj.value === "4") {
          ncid.value = "";
        } else if (ymdj.value === "5") {
          qcid.value = "";
        }
        paging1.value.reload(true);
      } else {
        common_vendor.index.removeStorageSync("selectedDataCenterData");
        common_vendor.index.navigateBack();
      }
    };
    common_vendor.onLoad(() => {
      apiAdminGetStoreData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        b: common_vendor.o(customLeftFn),
        c: common_vendor.f(common_vendor.unref(titleChange), (item2, index, i0) => {
          return {
            a: common_vendor.t(item2),
            b: common_vendor.o(($event) => selectTitle(index), index),
            c: common_vendor.unref(selectedTitileIndex) === index ? 1 : "",
            d: index
          };
        }),
        d: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        e: common_vendor.unref(utils_system.getLeftIconLeft)() + "px",
        f: common_vendor.unref(selectedTitileIndex) === 0
      }, common_vendor.unref(selectedTitileIndex) === 0 ? {
        g: common_vendor.f(filteredTimeCardData.value, (item2, index, i0) => {
          return {
            a: common_vendor.t(item2),
            b: common_vendor.o(($event) => selectCard(index), index),
            c: common_vendor.unref(selectedIndex) === index ? 1 : "",
            d: index
          };
        }),
        h: common_vendor.t(common_vendor.unref(timeRange)),
        i: common_vendor.o(toggleDropdown),
        j: common_vendor.unref(selectedIndex) === 4 ? 1 : "",
        k: common_vendor.t(common_vendor.unref(pickerStartValue)),
        l: common_vendor.o(onTimeChange1),
        m: common_vendor.unref(pickerStartValue),
        n: common_vendor.t(common_vendor.unref(pickerLastValue)),
        o: common_vendor.o(onTimeChange2),
        p: common_vendor.unref(pickerLastValue),
        q: common_vendor.o(resetTime),
        r: common_vendor.o(tiemComfirm),
        s: common_vendor.unref(showDropdown),
        t: common_vendor.unref(showDropdown) ? 1 : ""
      } : {}, {
        v: common_vendor.unref(selectedTitileIndex) === 1
      }, common_vendor.unref(selectedTitileIndex) === 1 ? {
        w: common_vendor.o(selectParamChange1),
        x: common_vendor.p({
          value: common_vendor.unref(value1),
          options: common_vendor.unref(option1),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        y: common_vendor.o(selectParamChange2),
        z: common_vendor.p({
          value: common_vendor.unref(value2),
          options: common_vendor.unref(option2),
          popupStyle: "border-radius: 0 0 20rpx 20rpx;"
        }),
        A: common_vendor.p({
          zIndex: "20",
          activeColor: "#EB4636"
        })
      } : {}, {
        B: common_vendor.unref(utils_system.getStatusBarHeight)() + common_vendor.unref(utils_system.getTitleBarHeight)() + 60 + "px",
        C: common_vendor.unref(selectedTitileIndex) === 0
      }, common_vendor.unref(selectedTitileIndex) === 0 ? {
        D: common_vendor.f(common_vendor.unref(dataList), (item2, index, i0) => {
          return {
            a: common_vendor.t(item2.text),
            b: common_vendor.o(($event) => goPath(item2.path), index),
            c: common_vendor.f(item2.values, (item1, index2, i1) => {
              return {
                a: common_vendor.t(item1.count),
                b: common_vendor.t(item1.text),
                c: index2
              };
            }),
            d: index
          };
        }),
        E: common_vendor.sr(paging, "e1fa3855-3", {
          "k": "paging"
        }),
        F: common_vendor.o(queryList),
        G: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        H: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      } : common_vendor.e({
        I: common_vendor.t(cardTitle.value),
        J: common_vendor.unref(ymdj) !== "6"
      }, common_vendor.unref(ymdj) !== "6" ? {
        K: common_vendor.unref(isActive) ? 1 : "",
        L: common_vendor.o(toggleSwitch)
      } : {}, {
        M: common_vendor.t(common_vendor.unref(totalData).totalNum),
        N: common_vendor.t(common_vendor.unref(totalData).totalPrice),
        O: common_vendor.unref(ymdj) !== "6"
      }, common_vendor.unref(ymdj) !== "6" ? {
        P: common_vendor.f(common_vendor.unref(dataList1), (item2, index, i0) => {
          return {
            a: common_vendor.t(item2.name),
            b: common_vendor.t(calculatePercentage(item2)),
            c: "e1fa3855-5-" + i0 + ",e1fa3855-4",
            d: common_vendor.p({
              trackColor: "#F8F8F8",
              color: "linear-gradient( 90deg, #7EBFFF 0%, #4079FF 100%)",
              showPivot: false,
              percentage: calculatePercentage(item2),
              strokeWidth: "12"
            }),
            e: common_vendor.t(!common_vendor.unref(isActive) ? item2.price : item2.num),
            f: common_vendor.o(($event) => reloadPage(item2), index),
            g: index
          };
        }),
        Q: common_vendor.t(!common_vendor.unref(isActive) ? "元" : "台")
      } : {
        R: common_vendor.f(common_vendor.unref(dataList), (item2, index, i0) => {
          return {
            a: "e1fa3855-7-" + i0 + "," + ("e1fa3855-6-" + i0),
            b: "e1fa3855-6-" + i0 + ",e1fa3855-4",
            c: common_vendor.p({
              width: "95",
              height: "95",
              fit: "widthFix",
              radius: "18rpx",
              src: item2.cover,
              mode: "aspectFit"
            }),
            d: common_vendor.t(item2.finenessname),
            e: "e1fa3855-8-" + i0 + ",e1fa3855-4",
            f: common_vendor.t(item2.name),
            g: common_vendor.t(item2.ch),
            h: common_vendor.t(item2.cgyname),
            i: common_vendor.t(item2.ckame),
            j: common_vendor.t(item2.price),
            k: index
          };
        }),
        S: common_vendor.p({
          type: "spinner",
          size: "20",
          vertical: true
        }),
        T: common_vendor.p({
          size: "mini",
          color: "linear-gradient( 132deg, #D94C24 0%, #FF5221 100%)"
        })
      }, {
        U: common_vendor.sr(paging1, "e1fa3855-4", {
          "k": "paging1"
        }),
        V: common_vendor.o(queryList1),
        W: common_vendor.o(($event) => common_vendor.isRef(dataList1) ? dataList1.value = $event : null),
        X: common_vendor.p({
          ["show-refresher-update-time"]: true,
          fixed: false,
          modelValue: common_vendor.unref(dataList1)
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1fa3855"]]);
wx.createPage(MiniProgramPage);
