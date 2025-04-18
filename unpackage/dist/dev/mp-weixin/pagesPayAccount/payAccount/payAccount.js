"use strict";
const common_vendor = require("../../common/vendor.js");
const pagesPayAccount_api_payAccountApi = require("../api/payAccountApi.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uv_cell2 = common_vendor.resolveComponent("uv-cell");
  const _easycom_uv_cell_group2 = common_vendor.resolveComponent("uv-cell-group");
  (_easycom_custom_header2 + _easycom_uv_cell2 + _easycom_uv_cell_group2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_cell = () => "../../uni_modules/uv-cell/components/uv-cell/uv-cell.js";
const _easycom_uv_cell_group = () => "../../uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_cell + _easycom_uv_cell_group)();
}
const _sfc_main = {
  __name: "payAccount",
  setup(__props) {
    common_vendor.ref("whlnam");
    common_vendor.ref("whlnam");
    const id = common_vendor.ref("");
    const showAdd = common_vendor.ref(false);
    const data = common_vendor.ref([]);
    const edit = () => {
      showAdd.value = true;
    };
    const addAccount = () => {
      showAdd.value = true;
      data.value = [
        { title: "收款姓名", placeholder: "请输入银行卡实名姓名", values: [], value: "" },
        { title: "银行卡号", placeholder: "请输入", values: [], value: "" },
        { title: "所属银行", placeholder: "请选择", values: [], value: "" },
        // {title:'开户银行',placeholder:'请选择',values:[],value:''},
        { title: "银行预留电话", placeholder: "请输入", values: [], value: "" }
      ];
    };
    const confirm = async () => {
      for (const item of data.value) {
        if (!item.value) {
          common_vendor.index.showToast({
            title: `${item.title} 不能为空`,
            icon: "none"
          });
          return;
        }
      }
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(data.value[3].value)) {
        common_vendor.index.showToast({
          title: "银行预留电话格式不正确",
          icon: "none"
        });
        return;
      }
      await apiAccountAddAc();
    };
    const apiAccountAddAc = async () => {
      const dataToSend = {
        id: id.value,
        name: data.value[0].value,
        // 收款姓名
        yhkh: data.value[1].value,
        // 银行卡号
        khyh: data.value[2].value,
        // 所属银行
        khyhfh: "",
        // 开户银行
        ylsjhm: data.value[3].value,
        // 银行预留电话
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesPayAccount_api_payAccountApi.apiAccountAdd(dataToSend);
      console.log("res:", res);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success",
          duration: 500
        });
        showAdd.value = false;
      }
    };
    const apiAccountListAc = async () => {
      const data2 = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid
      };
      const res = await pagesPayAccount_api_payAccountApi.apiAccountList(data2);
      if (res.code === 200) {
        return res.lists;
      } else {
        return [];
      }
    };
    const getData = (list) => {
      var _a, _b, _c, _d, _e;
      console.log("获取到的账户列表:", list);
      if (list.length === 0) {
        console.log("没有获取到账户数据");
        return;
      }
      id.value = ((_a = list[0]) == null ? void 0 : _a.id) || "";
      data.value = [
        {
          title: "收款姓名",
          placeholder: "请输入银行卡实名姓名",
          values: [],
          value: ((_b = list[0]) == null ? void 0 : _b.name) || ""
        },
        {
          title: "银行卡号",
          placeholder: "请输入",
          values: [],
          value: ((_c = list[0]) == null ? void 0 : _c.code) || ""
        },
        {
          title: "所属银行",
          placeholder: "请选择",
          values: [],
          value: ((_d = list[0]) == null ? void 0 : _d.yhmc) || ""
        },
        {
          title: "银行预留电话",
          placeholder: "请输入",
          values: [],
          value: ((_e = list[0]) == null ? void 0 : _e.ylsjhm) || ""
        }
      ];
      console.log("处理后的数据:", data.value);
    };
    const bankList = common_vendor.ref([]);
    const apiSearchBankAc = async () => {
      const res = await pagesPayAccount_api_payAccountApi.apiSearchBank();
      console.log("res：", res);
      if (res.code === 200) {
        console.log("data", data.value);
        bankList.value = res.lists;
      }
    };
    const onSelectChange1 = (e, item) => {
      console.log(e);
      item.value = bankList.value[parseInt(e.detail.value)].name;
    };
    common_vendor.onMounted(async () => {
      const list = await apiAccountListAc();
      getData(list);
      await apiSearchBankAc();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(data).length === 0
      }, common_vendor.unref(data).length === 0 ? {
        b: common_vendor.o(addAccount)
      } : {}, {
        c: common_vendor.unref(showAdd)
      }, common_vendor.unref(showAdd) ? {
        d: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: index === 0 || index === 1 || index === 3
          }, index === 0 || index === 1 || index === 3 ? {
            c: item.placeholder,
            d: item.value,
            e: common_vendor.o(($event) => item.value = $event.detail.value, index)
          } : {}, {
            f: index === 2
          }, index === 2 ? {
            g: item.placeholder,
            h: item.value,
            i: common_vendor.o(($event) => item.value = $event.detail.value, index),
            j: common_vendor.unref(bankList),
            k: common_vendor.o((event) => onSelectChange1(event, item), index),
            l: item.value
          } : {}, {
            m: "df41021a-2-" + i0 + ",df41021a-1",
            n: index
          });
        }),
        e: common_vendor.p({
          border: false
        }),
        f: common_vendor.p({
          border: false
        })
      } : {}, {
        g: common_vendor.unref(data).length !== 0 && !common_vendor.unref(showAdd)
      }, common_vendor.unref(data).length !== 0 && !common_vendor.unref(showAdd) ? {
        h: common_vendor.t(common_vendor.unref(data)[0].value),
        i: common_vendor.t(common_vendor.unref(data)[2].value),
        j: common_vendor.t(common_vendor.unref(data)[1].value),
        k: common_vendor.o(edit)
      } : {}, {
        l: common_vendor.unref(showAdd)
      }, common_vendor.unref(showAdd) ? {
        m: common_vendor.o(confirm)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df41021a"]]);
wx.createPage(MiniProgramPage);
