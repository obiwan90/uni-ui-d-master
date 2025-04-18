"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesMarketCount_api_api = require("../api/api.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_count_down2 = common_vendor.resolveComponent("uv-count-down");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _easycom_uv_count_down2 + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_count_down = () => "../../uni_modules/uv-count-down/components/uv-count-down/uv-count-down.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_count_down + _easycom_z_paging)();
}
const _sfc_main = {
  __name: "marketCount",
  setup(__props) {
    common_vendor.ref(0);
    const isShow = common_vendor.ref(false);
    const beforeleave = (e) => {
      isShow.value = false;
      utils_common.navigateToPage("pages/home/home");
    };
    const timeData = common_vendor.ref({});
    const onChange = (e) => {
      timeData.value = e;
    };
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      await getMarketListAll(pageNo - 1);
      paging.value.complete(list.value);
    };
    const goPage = (type, item) => {
      const itemString = JSON.stringify(item);
      if (type === "1") {
        common_vendor.index.navigateTo({
          url: `/pagesSell/sell/sell?item=${encodeURIComponent(itemString)}`
        });
      }
      if (type === "2") {
        common_vendor.index.navigateTo({
          url: `/pagesSeeking/seeking/seeking?item=${encodeURIComponent(itemString)}`
        });
      }
    };
    common_vendor.ref(true);
    const activeTab1Index = common_vendor.ref(0);
    const classlist = common_vendor.ref([
      { name: "卖货(56)" },
      { name: "求货(56)" },
      { name: "交流(56)" }
    ]);
    common_vendor.computed(() => {
      return classlist.value.map((item) => ({
        name: item.name
      }));
    });
    const btnData = common_vendor.ref([
      { title: "修改", image: "/pagesMarketCount/static/icon_xiugai@3x.png" },
      { title: "删除", image: "/pagesMarketCount/static/icon_delete@3x.png" }
    ]);
    const cardData = common_vendor.ref([
      { id: 1, type: "0", fineness: "99新", price: "14120", time: 15 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 2, type: "0", fineness: "97新", price: "500", time: 10 * 60 * 60 * 1e3, title: "iphone14 pro max" },
      { id: 3, type: "0", fineness: "99新", price: "10000", time: 1 * 60 * 60 * 1e3, title: "vivo x3 12GB+512GB" },
      { id: 4, type: "0", fineness: "95新", price: "2000", time: 2 * 60 * 60 * 1e3, title: "步步高 x3 12GB+512GB" },
      { id: 5, type: "0", fineness: "95新", price: "3213", time: 4 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 6, type: "0", fineness: "99新", price: "500", time: 5 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 7, type: "0", fineness: "89新", price: "100", time: 6 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "14120", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "97新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "10000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "95新", price: "2000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "95新", price: "3213", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "89新", price: "100", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "14120", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "97新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "10000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "95新", price: "2000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "95新", price: "3213", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "99新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "0", fineness: "89新", price: "100", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "14120", time: 10 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "97新", price: "500", time: 9 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "10000", time: 4 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "2000", time: 30 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "3213", time: 5 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "89新", price: "100", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "97新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "10000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "2000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "3213", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "89新", price: "100", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "14120", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "97新", price: "500", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "99新", price: "10000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "2000", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "95新", price: "3213", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "1", fineness: "89新", price: "100", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 10 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 9 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 4 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 30 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 5 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" },
      { id: 8, type: "2", fineness: "", price: "", time: 14 * 60 * 60 * 1e3, title: "华为Mate 60 Pro 12GB+512GB 雅丹黑华为Mate 60 Pro 12GB+512GB 雅丹黑" }
    ]);
    const filteredData = common_vendor.computed(() => {
      return cardData.value.filter((item) => item.type === activeTab1Index.value + "");
    });
    function getCountdownMilliseconds(add_time, duration) {
      const startTime = add_time * 1e3;
      const durationMilliseconds = duration * 60 * 60 * 1e3;
      const endTime = startTime + durationMilliseconds;
      const now = Date.now();
      const countdownMilliseconds = endTime - now;
      console.log("countdownMilliseconds：", countdownMilliseconds);
      return countdownMilliseconds > 0 ? countdownMilliseconds : 0;
    }
    const edit = (type, item) => {
      let data = encodeURIComponent(JSON.stringify(item));
      if (type === "0") {
        common_vendor.index.navigateTo({
          url: "/pagesNewSell/newSell/newSell?data=" + data
        });
      } else if (type === "1") {
        common_vendor.index.navigateTo({
          url: "/pagesNewSeeking/newSeeking/newSeeking?id=" + id
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pagesNewPosting/newPosting/newPosting?id=" + id
        });
      }
    };
    const delet = (item) => {
      apiDelMineAc(item.id);
    };
    const list = common_vendor.ref([]);
    const getMarketListAll = async (start) => {
      const data = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        lx: activeTab1Index.value,
        start
      };
      const res = await pagesMarketCount_api_api.apigetMarketListAll(data);
      if (res.code === "200") {
        list.value = res.lists.map((item) => ({
          ...item,
          countdown: getCountdownMilliseconds(item.add_time, item.duration)
        }));
      }
      console.log("market res:", res);
    };
    const apiDelMineAc = async (id2) => {
      const data = {
        id: id2
      };
      const res = await pagesMarketCount_api_api.apiDelMine(data);
      console.log("res", res);
      if (res.code === "200") {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 500
        });
        setTimeout(() => {
          paging.value.reload(true);
        }, 500);
      }
    };
    common_vendor.onLoad((options) => {
      console.log("传递过来的参数:", options.type);
      if (options.type) {
        activeTab1Index.value = parseInt(options.type);
      }
      if (options.from) {
        isShow.value = true;
      }
    });
    common_vendor.onShow(() => {
      if (paging && paging.value)
        paging.value.reload(true);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.unref(isShow),
        c: common_vendor.o(beforeleave)
      } : {}, {
        d: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        e: common_vendor.f(common_vendor.unref(dataList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.fineness),
            b: common_vendor.t(item.type === "1" ? "卖货价:" : "求货价:"),
            c: common_vendor.t(item.price),
            d: item.countdown > 0
          }, item.countdown > 0 ? {
            e: common_vendor.o(onChange, index),
            f: "e2eede06-2-" + i0 + ",e2eede06-0",
            g: common_vendor.p({
              time: item.countdown,
              format: "DD:HH:mm:ss",
              autoStart: true,
              millisecond: true
            })
          } : {}, {
            h: common_vendor.o(($event) => goPage(item.type, item), index),
            i: common_vendor.t(item.fullname),
            j: common_vendor.o(($event) => goPage(item.type, item), index),
            k: common_vendor.f(common_vendor.unref(btnData), (item1, index2, i1) => {
              return {
                a: item1.image,
                b: common_vendor.t(item1.title),
                c: index2,
                d: common_vendor.o(($event) => item1.title === "修改" ? edit(common_vendor.unref(activeTab1Index) + "", item) : delet(item), index2)
              };
            }),
            l: index
          });
        }),
        f: common_vendor.unref(activeTab1Index) === 0 || common_vendor.unref(activeTab1Index) === 1,
        g: common_vendor.f(common_vendor.unref(filteredData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(common_vendor.unref(btnData), (item1, index2, i1) => {
              return {
                a: item1.image,
                b: common_vendor.t(item1.title),
                c: index2,
                d: common_vendor.o(($event) => item1.title === "修改" ? edit(common_vendor.unref(activeTab1Index) + "", item1) : delet(item1), index2)
              };
            }),
            c: index
          };
        }),
        h: common_vendor.unref(activeTab1Index) === 2,
        i: common_vendor.sr(paging, "e2eede06-0", {
          "k": "paging"
        }),
        j: common_vendor.o(queryList),
        k: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        l: common_vendor.p({
          ["loading-more-custom-style"]: {
            "background": "#f3f2f6"
          },
          ["default-page-size"]: 10,
          modelValue: common_vendor.unref(dataList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2eede06"]]);
wx.createPage(MiniProgramPage);
