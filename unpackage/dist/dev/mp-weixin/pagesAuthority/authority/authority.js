"use strict";
const common_vendor = require("../../common/vendor.js");
const api_station_station = require("../../api/station/station.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_mosowe_tree2 = common_vendor.resolveComponent("mosowe-tree");
  (_easycom_custom_header2 + _easycom_mosowe_tree2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_mosowe_tree = () => "../../uni_modules/mosowe-tree/components/mosowe-tree/mosowe-tree.js";
if (!Math) {
  (_easycom_custom_header + _easycom_mosowe_tree)();
}
const _sfc_main = {
  __name: "authority",
  setup(__props) {
    const inputValue = common_vendor.ref();
    const title = common_vendor.ref("新建岗位");
    const mosoweTreeRef = common_vendor.ref(null);
    const treeList = common_vendor.ref([]);
    const checkValues = common_vendor.ref([]);
    const selectedValuesString = common_vendor.ref("");
    const processTreeData = (data) => {
      return data.map((item) => {
        let children = item.lists ? processTreeData(item.lists) : [];
        return {
          id: item.id,
          name: item.name,
          url: item.url,
          permission: item.permission,
          children,
          hide: item.hide === "1"
          // 处理 hide 属性为 true 或 false
        };
      }).filter((item) => !item.hide);
    };
    const nodeClick = (item) => {
      console.log("节点点击:", item);
      console.log("数据", treeList.value);
    };
    common_vendor.ref("");
    const authorityList = common_vendor.ref([]);
    const apiGetAuthorityData = async () => {
      const res = await api_station_station.apiGetAuthority();
      if (res.code === 200) {
        authorityList.value = res.lists;
        treeList.value = processTreeData(res.lists);
      }
    };
    const apiStationAddData = async () => {
      const data = {
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        name: inputValue.value,
        qxid: selectedValuesString.value
      };
      const res = await api_station_station.apiStationAdd(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none"
        });
        common_vendor.index.navigateBack();
      }
    };
    const apiStationDetailData = async (gwid) => {
      const res = await api_station_station.apiStationDetail({ gwid });
      if (res.code === 200) {
        inputValue.value = res.infos.name;
        res.lists.forEach((item) => {
          if (item.checked) {
            checkValues.value.push(item.id);
          }
        });
      }
    };
    const apiStationEditData = async () => {
      const data = {
        opid: JSON.parse(common_vendor.index.getStorageSync("userInfo")).opid,
        name: inputValue.value,
        qxid: selectedValuesString.value,
        gwid: gwid4Edit.value
      };
      const res = await api_station_station.apiStationEdit(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none"
        });
        common_vendor.index.navigateBack();
      }
    };
    const edit = () => {
      apiStationEditData();
    };
    const save = () => {
      apiStationAddData();
    };
    const gwid4Edit = common_vendor.ref();
    common_vendor.onMounted(() => {
      apiGetAuthorityData();
      if (gwid4Edit.value) {
        apiStationDetailData(gwid4Edit.value);
      }
      common_vendor.watch(
        () => checkValues.value,
        (newValues) => {
          let finalCheckedValues = [...newValues];
          if (mosoweTreeRef.value) {
            let halfCheckedNodes = mosoweTreeRef.value.getHalfCheck();
            console.log("halfCheckedNodes:", halfCheckedNodes);
            if (halfCheckedNodes && halfCheckedNodes.halfNodeKeys.length !== 0) {
              halfCheckedNodes.halfNodeKeys.forEach((item) => {
                if (!finalCheckedValues.includes(item)) {
                  finalCheckedValues.push(item);
                }
              });
            }
          }
          console.log("finalCheckedValues:", finalCheckedValues);
          selectedValuesString.value = finalCheckedValues.join(",");
          console.log("选中的值:", selectedValuesString.value);
        },
        {
          deep: true
        }
      );
    });
    common_vendor.onLoad((options) => {
      if (options.forEdit) {
        gwid4Edit.value = options.forEdit;
        title.value = "修改岗位";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(title.value),
        b: common_vendor.p({
          backgroundColor: "#FFFFFF"
        }),
        c: inputValue.value,
        d: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        e: common_vendor.sr(mosoweTreeRef, "85038165-1", {
          "k": "mosoweTreeRef"
        }),
        f: common_vendor.o(nodeClick),
        g: common_vendor.o(($event) => checkValues.value = $event),
        h: common_vendor.p({
          height: "10000rpx",
          accordion: true,
          data: treeList.value,
          label: "name",
          value: "id",
          ["show-checkbox"]: true,
          modelValue: checkValues.value
        }),
        i: title.value === "新建岗位"
      }, title.value === "新建岗位" ? {
        j: common_vendor.o(save)
      } : {
        k: common_vendor.o(edit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85038165"]]);
wx.createPage(MiniProgramPage);
