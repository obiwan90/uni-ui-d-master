"use strict";
const common_vendor = require("../../common/vendor.js");
const api_search_search = require("../../api/search/search.js");
const utils_common = require("../../utils/common.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
const pagesRecovery_api_api = require("../api/api.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_custom_header2 + _easycom_uv_tabs2 + _easycom_z_paging2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_custom_header + qiaoSelect + _easycom_uv_tabs + _easycom_z_paging)();
}
const qiaoSelect = () => "../../uni_modules/qiao-select/components/qiao-select/qiaoSelect.js";
const _sfc_main = {
  __name: "recovery",
  setup(__props) {
    const orgArray = common_vendor.ref([]);
    const searchModelKey = common_vendor.ref("xhname");
    const showModelField = common_vendor.ref("xhname");
    const selectChange = (e) => {
      console.log(e);
      if (e) {
        common_vendor.index.navigateTo({
          url: "/pagesRecoveryDetail/recoveryDetail/recoveryDetail?id=" + e.xhid + "&ppid=" + e.ppid + "&name=" + e.xhname + "&flid=" + e.flid
        });
      }
    };
    const handleInput = async (inputText) => {
      if (inputText.length > 0) {
        console.log("inputText", inputText);
        common_vendor.index.showLoading({
          title: "加载中",
          mask: true
        });
        const res = await apiSearchModelData(inputText);
        console.log("云端搜索 res:", res);
        if (res) {
          console.log("==================================");
          orgArray.value = [];
          orgArray.value = [...res];
          console.log("orgArray", orgArray.value);
          console.log("==================================");
        }
        common_vendor.index.hideLoading();
      }
    };
    const apiSearchModelData = async (word) => {
      const data = {
        word
      };
      const res = await api_search_search.apiSearchModel(data);
      if (res.code === "200") {
        orgArray.value = res.lists;
      } else {
        orgArray.value = [];
      }
      console.log("apiSearchModelData res:", res);
    };
    const key = common_vendor.ref("xlname");
    const paging = common_vendor.ref(null);
    const dataList = common_vendor.ref([]);
    const activeCard = common_vendor.ref(0);
    const activeTab1Index = common_vendor.ref(0);
    const activeTab2Index = common_vendor.ref(-1);
    utils_common.useShare({
      title: "自定义分享标题",
      path: getCurrentPages().pop().route,
      desc: "自定义分享描述"
    });
    const transformedData = common_vendor.ref([]);
    const queryList = async (pageNo, pageSize) => {
      console.log("pageNo:", pageNo);
      console.log("pageSize:", pageSize);
      param.value.start = pageNo - 1;
      const data = await getPagingData(param);
      console.log("data:", data);
      let allData = [];
      if (data) {
        if (pageNo === 1) {
          allData = data;
        } else {
          const existingData = transformedData.value.reduce((acc, item) => {
            return [...acc, ...item.products];
          }, []);
          allData = [...existingData, ...data];
        }
      } else {
        allData = [];
      }
      paging.value.complete(data);
      const groupedData = {};
      allData.forEach((item) => {
        const key2 = item.xlname.trim();
        if (!groupedData[key2]) {
          groupedData[key2] = [];
        }
        groupedData[key2].push(item);
      });
      transformedData.value = Object.entries(groupedData).map(([key2, value]) => ({ name: key2, products: value }));
      console.log(transformedData.value);
    };
    const uvTabs1Change = (e) => {
      console.log("分类标签切换触发:", e.index);
      if (e.index !== void 0) {
        activeTab1Index.value = e.index;
        param.value.classid = classlist.value[activeTab1Index.value].id;
        param.value.brandid = "";
        param.value.seriesid = "";
        activeCard.value = 0;
        activeTab2Index.value = -1;
        reload();
      } else {
        console.error("标签索引错误或标签数据不存在");
      }
    };
    const changeCardColor = (index) => {
      activeCard.value = index;
      param.value.brandid = brandlist.value[index].id;
      param.value.seriesid = "";
      activeTab2Index.value = -1;
      reload();
    };
    const uvTabsChange2 = (e) => {
      console.log("系列切换了标签:", e.index);
      if (e.index !== void 0) {
        activeTab2Index.value = e.index;
        param.value.seriesid = serieslist.value[activeTab2Index.value].id;
        param.value.brandid = brandlist.value[activeCard.value].id;
        reload();
      } else {
        console.error("标签索引错误");
      }
    };
    const classlist = common_vendor.ref([]);
    const brandlist = common_vendor.ref([]);
    const serieslist = common_vendor.ref([]);
    common_vendor.ref([]);
    const param = common_vendor.ref({
      classid: "1",
      // 默认
      brandid: "1",
      // 默认
      seriesid: "",
      // 默认
      start: "0"
    });
    const getPagingData = async (param2) => {
      const data = {
        classid: param2.value.classid,
        brandid: param2.value.brandid,
        seriesid: param2.value.seriesid,
        start: param2.value.start
      };
      const res = await pagesRecovery_api_api.apiRecycleClassify(data);
      if (res.code === "200") {
        classlist.value = res.classlist;
        brandlist.value = res.brandlist;
        serieslist.value = res.serieslist;
        const sortedMarquelist = res.marquelist.sort((a, b) => {
          return parseInt(a.xlid) - parseInt(b.xlid);
        });
        return sortedMarquelist;
      } else {
        return false;
      }
    };
    const goDetail = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const reload = () => {
      common_vendor.nextTick$1(() => {
        paging.value && paging.value.reload(true);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(selectChange),
        b: common_vendor.o(handleInput),
        c: common_vendor.p({
          keyId: 1,
          dataList: common_vendor.unref(orgArray),
          searchKey: common_vendor.unref(searchModelKey),
          showField: common_vendor.unref(showModelField),
          phText: "请输入品牌型号",
          showBorder: false,
          disabled: false
        }),
        d: common_vendor.o(uvTabs1Change),
        e: common_vendor.p({
          list: common_vendor.unref(classlist),
          lineColor: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAXCAYAAACmnHcKAAAAAXNSR0IArs4c6QAABHFJREFUWEfdV19oW2UU/51zb5Kma9euTVL0SZn/KCLDJulwLVTaZPoyEKwUZDKn+DBEmD4Mp4LIFNmLg8FQ2PRFHFLUaVUw6VwRNmnS+ocOdQiiIErbxNm1a5t7c78jX7bUNDa5Sdk68L6EfN853/n9zvl959xL+B89VOQiABEg2YHu7YpVDwR+Ap0PJFMf3Wi+pdjyLL0s0qCIpjoSqVOl2Ipk9K9Mx6NvMvAEAANXyFkCZM1Gq3PLqe/+vkGkKmMTyRiiOttGJ+c0tpXKzMYj7zYaxqOLjlqFmYmglPo2kEyHCVi9uUHsXLBNBJPpyAqZzM5wVITPAGishE8gz4cS6dc3CP9KmOlYeAcTjwJoWCs2AXkRPBZMpk4WKpOJR54R0JHSSpU7imCpyaY7GsfGf98oQtLV5cm0GSeYsLuSJLRyIDjUnhh/qUBmOh7Zx8BRgLgSUC8TckqdDWbV/TQ5aW8EoWy8+2GDMWwrqRiONRfBq4FE6sUrlXkgEhFFWmabqoH0MWtCny5YjYO3jo0tX09CmVj0IYF8QERUmUoBQU4Eu0PJ1PC/DSAW+dhg3uVIdddCa4G8F8iqPderQjPx8F6AjhHI55owwW/BZOqWVd3sTB/Mu73RDBO1KBdCm00D83nnbcehgx2nx6ddA9Zo8EdfV8Bj0uM+0zxsKQWXisBvMBYtZyh0Ov3+KjL6z0z/vb0e0/OVbg9uz1XJ/Qil9gVHJ8bc7N32M7HIHkW038d0j1XljhTP8RDBEnUhlEjfVVxbkZlekMFBY2bu12Mm6Kl6BooIThiX6Nn28fFLbqDL92f7w0Ni0CGTeKubxMt8HQNqW1ti4vyaZPTixb5trXmv9xMvU28tGdI+uko6K0uOOg5SHxqGMdXWND9Dwz9YxUC6zWZbvCExnJvA6BAlvQA92WQa7UtKwU3a/xkVSvaGRtPvlK6vqkxxY3bXjmbk7M8biHuWVe018jDB1ukl+YXAWSGxoJDTDV9EmgFqAxD0MrVoIeeVuN6LMhLS6jFpzsq/EEimXisnuCYZbfTXQFeLQ8Y5InS636B6xbU+ey8RbCUHAsnU4bVOqEim0BBi3bcTyYiP+c5cHRVaH9TKXnqSO5AciXo6mJw8XsmyKhntNN3f3WGwHN1k8uBC2UvotQa91nn6zcNyxCZWPYEvJlLVYrqSWblHscgrRHQAgHcjZFcYzgJbgCQtzg0Fz16Yd0tezWQKshuIPMKM5zzM0byg7g7kBkbv6yaiQVlKvgTkSDCRHqnFT9vURabYGATmgEPqLb9htNfT7aqB8jJDS2rBdj4jyBvtreY5Gv56qVYi6yJTenhmZ/igKN4PKnwH+elqctxkWJJBLaNlQBYgcjKwOP8y1SCndTcAt8zoYXgxYGxXCvcBEhWirSSyRYhaGdjcbBqFWaLHz2VH5QH8KZCfCPheKZnyML4pneJu8a5JA6glyM8P3uYLLDX5l/3kMRWbLGzaINPHLPp7wWORbfuWLTH58s0jk4u1nFmPzT/Acc8nAVrxrAAAAABJRU5ErkJggg==') 100% 100%`,
          lineWidth: "25",
          lineHeight: "8",
          fontSize: 32,
          activeStyle: {
            color: "#303133",
            fontWeight: "bold"
          },
          current: common_vendor.unref(activeTab1Index)
        }),
        f: common_vendor.f(common_vendor.unref(brandlist), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: index === common_vendor.unref(activeCard) ? 1 : "",
            d: common_vendor.o(($event) => changeCardColor(index), index)
          };
        }),
        g: "1170rpx",
        h: common_vendor.o(uvTabsChange2),
        i: common_vendor.p({
          list: common_vendor.unref(serieslist),
          lineWidth: "0",
          lineHeight: "0",
          fontSize: 24,
          keyName: common_vendor.unref(key),
          activeStyle: {
            padding: "0 10rpx",
            fontSize: "28rpx",
            backgroundColor: "#FFEEEC",
            color: "#ED5446",
            fontWeight: "bold",
            backGround: "#FFEEEC",
            borderRadius: "4rpx 4rpx 4rpx 4rpx"
          },
          inactiveStyle: {
            padding: "0 10rpx",
            fontSize: "24rpx",
            backgroundColor: "#F2F3F6",
            borderRadius: "4rpx 4rpx 4rpx 4rpx",
            opacity: 0.6
          },
          current: common_vendor.unref(activeTab2Index)
        }),
        j: common_vendor.f(common_vendor.unref(transformedData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.products, (item1, index1, i1) => {
              return {
                a: common_vendor.t(item1.xhname),
                b: index1,
                c: common_vendor.o(($event) => goDetail("/pagesRecoveryDetail/recoveryDetail/recoveryDetail?id=" + item1.xhid + "&ppid=" + common_vendor.unref(param).brandid + "&name=" + item1.xhname + "&flid=" + common_vendor.unref(classlist)[common_vendor.unref(activeTab1Index)].id), index1)
              };
            }),
            c: index
          };
        }),
        k: common_vendor.sr(paging, "4e8f31bd-4", {
          "k": "paging"
        }),
        l: common_vendor.o(queryList),
        m: common_vendor.o(($event) => common_vendor.isRef(dataList) ? dataList.value = $event : null),
        n: common_vendor.p({
          ["show-refresher-update-time"]: true,
          ["default-page-size"]: 20,
          fixed: false,
          modelValue: common_vendor.unref(dataList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4e8f31bd"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
