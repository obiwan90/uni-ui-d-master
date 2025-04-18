"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "inventoryManagerSaixuan",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const selectedIndices = common_vendor.ref({});
    common_vendor.ref(null);
    common_vendor.ref(["分类", "品牌"]);
    common_vendor.ref(false);
    const colorFilter = common_vendor.ref("");
    const emit = __emit;
    const cancel = () => {
      emit("close");
    };
    const comfrm = () => {
      emit("close");
    };
    const data = common_vendor.ref([
      {
        name: "其他",
        id: "1",
        item: [
          "只看特价",
          "只看折叠"
        ]
      },
      {
        name: "分类",
        id: "2",
        item: [
          "手机",
          "平板",
          "手表",
          "耳机",
          "笔记本",
          "台式电脑"
        ]
      },
      {
        name: "品牌",
        id: "3",
        item: [
          "苹果",
          "华为",
          "小米",
          "OPPO",
          "VIVO",
          "荣耀"
        ]
      },
      {
        name: "系统",
        id: "4",
        item: [
          "苹果",
          "安卓"
        ]
      },
      {
        name: "型号",
        id: "5",
        item: [
          "选择型号"
        ]
      },
      {
        name: "网络版本",
        id: "6",
        item: [
          "WIFI版",
          "5G",
          "4G"
        ]
      },
      {
        name: "成色",
        id: "7",
        item: [
          "全新",
          "99新",
          "95新",
          "9成新",
          "8成新",
          "7成新"
        ]
      },
      {
        name: "内存",
        id: "8",
        item: [
          "16G",
          "32G",
          "64G",
          "128G",
          "256G",
          "512G"
        ]
      },
      {
        name: "颜色",
        id: "9",
        item: [
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色",
          "紫色",
          "蓝色",
          "黄色",
          "粉色",
          "金色"
        ]
      },
      {
        name: "价格",
        id: "10",
        item: [
          "0-1000",
          "1001-2000",
          "2001-3000",
          "4001-4000",
          "4001-5000",
          "5000以上"
        ]
      },
      {
        name: "上架时间",
        id: "11",
        item: [
          "开始时间",
          "结束时间"
        ]
      },
      // {
      // 	name:'资检员工',
      // 	id:'12',
      // 	item:[
      // 		'员工','员工','员工']
      // },
      {
        name: "售出时间",
        id: "13",
        item: [
          "开始时间",
          "结束时间"
        ]
      }
    ]);
    const filteredColors = common_vendor.computed(() => {
      console.log("我在赛选");
      if (!colorFilter.value) {
        return data.value.find((item) => item.name === "颜色").item;
      }
      const filter = colorFilter.value.toLowerCase();
      const dataFilter = data.value.find((item) => item.name === "颜色").item.filter((color) => color.toLowerCase().includes(filter));
      console.log(dataFilter);
      return dataFilter;
    });
    const collapseRef = common_vendor.ref(null);
    const listingStartValue = common_vendor.ref("开始时间");
    const listingLastValue = common_vendor.ref("结束时间");
    const sellStartValue = common_vendor.ref("开始时间");
    const sellLastValue = common_vendor.ref("结束时间");
    const onTimeChange1 = (e, text) => {
      console.log(e);
      if (text === "上架时间") {
        listingStartValue.value = e.detail.value;
      } else {
        sellStartValue.value = e.detail.value;
      }
    };
    const onTimeChange2 = (e, text) => {
      console.log(e);
      if (text === "上架时间") {
        listingLastValue.value = e.detail.value;
      } else {
        sellLastValue.value = e.detail.value;
      }
    };
    const selectCard = (parentIndex, childIndex) => {
      selectedIndices.value[parentIndex] = childIndex;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: "228e7d42-3-" + i0 + "," + ("228e7d42-2-" + i0),
            c: "228e7d42-2-" + i0 + "," + ("228e7d42-1-" + i0),
            d: item.name === "价格"
          }, item.name === "价格" ? {} : {}, {
            e: item.name === "上架时间" || item.name === "售出时间"
          }, item.name === "上架时间" || item.name === "售出时间" ? {
            f: common_vendor.t(item.name === "售出时间" ? common_vendor.unref(sellStartValue) : common_vendor.unref(listingStartValue)),
            g: common_vendor.o((e) => onTimeChange1(e, item.name), index),
            h: item.name === "售出时间" ? common_vendor.unref(sellStartValue) : common_vendor.unref(listingStartValue),
            i: common_vendor.t(item.name === "售出时间" ? common_vendor.unref(sellLastValue) : common_vendor.unref(listingLastValue)),
            j: common_vendor.o((e) => onTimeChange2(e, item.name), index),
            k: item.name === "售出时间" ? common_vendor.unref(sellLastValue) : common_vendor.unref(listingLastValue)
          } : {}, {
            l: item.name === "颜色"
          }, item.name === "颜色" ? {
            m: common_vendor.unref(colorFilter),
            n: common_vendor.o(($event) => common_vendor.isRef(colorFilter) ? colorFilter.value = $event.detail.value : null, index)
          } : {}, {
            o: item.name === "颜色"
          }, item.name === "颜色" ? {
            p: common_vendor.f(common_vendor.unref(filteredColors), (color, index1, i1) => {
              return {
                a: common_vendor.t(color),
                b: index1,
                c: common_vendor.o(($event) => selectCard(index, index1), index1),
                d: common_vendor.unref(selectedIndices)[index] === index1 ? 1 : ""
              };
            })
          } : {}, {
            q: item.name === "型号"
          }, item.name === "型号" ? {} : {}, {
            r: item.name !== "颜色" && item.name !== "售出时间" && item.name !== "上架时间" && item.name !== "型号"
          }, item.name !== "颜色" && item.name !== "售出时间" && item.name !== "上架时间" && item.name !== "型号" ? {
            s: common_vendor.f(item.item, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1),
                b: index1,
                c: common_vendor.o(($event) => selectCard(index, index1), index1),
                d: common_vendor.unref(selectedIndices)[index] === index1 ? 1 : ""
              };
            })
          } : {}, {
            t: "228e7d42-1-" + i0 + "," + ("228e7d42-0-" + i0),
            v: common_vendor.p({
              open: item.name === "内存" || item.name === "颜色" ? false : true,
              titleBorder: "none",
              border: false
            }),
            w: common_vendor.sr(collapseRef, "228e7d42-0-" + i0, {
              "k": "collapseRef",
              "f": 1
            }),
            x: "228e7d42-0-" + i0,
            y: index
          });
        }),
        c: common_vendor.p({
          border: false
        }),
        d: common_vendor.o(cancel),
        e: common_vendor.o(comfrm)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-228e7d42"]]);
wx.createComponent(Component);
