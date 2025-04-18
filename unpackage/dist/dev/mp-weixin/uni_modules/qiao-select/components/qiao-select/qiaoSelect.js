"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    keyId: [Number, String],
    phText: String,
    phColor: {
      type: String,
      default: "#999999"
    },
    searchKey: {
      type: String,
      default: "name"
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    setRight: {
      type: Boolean,
      default: false
    },
    showObj: {
      type: Object,
      default: null
    },
    showField: {
      type: String,
      default: "name"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    showPopup: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timer: "",
      // 定时器
      popupShow: false,
      inputText: "",
      isInput: true,
      // 是否输入，如果输入开始模糊查询
      filteredData: []
      // 过滤后的数据
    };
  },
  watch: {
    dataList: {
      immediate: true,
      handler(val) {
        if (val.length > 0) {
          val.forEach((item) => {
            if (item[this.searchKey]) {
              item.qiaoSelectKey = item[this.searchKey].toString();
            } else if (item[this.showField]) {
              item.qiaoSelectKey = item[this.showField].toString();
            }
          });
          this.filteredData = val;
        } else {
          this.filteredData = [];
        }
      }
    },
    showObj: {
      handler(val) {
        if (val) {
          this.inputText = val[this.showField];
          this.$emit("input", [val]);
          this.$emit("change", val);
        } else {
          this.inputText = "";
          this.$emit("input", []);
          this.$emit("change", null);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getfocus() {
      common_vendor.index.createSelectorQuery().select("#qSearchInput").fields({
        id: true,
        node: true,
        size: true
      }, (res) => {
        if (res && res.node) {
          res.node.focus();
        }
      }).exec();
    },
    clearData() {
      this.inputText = "";
    },
    clickClear() {
      this.inputText = "";
      this.filteredData = this.dataList;
      this.$emit("input", []);
      this.$emit("change", null);
      this.close();
    },
    touchst() {
      if (this.disabled)
        return;
      this.popupShow = true;
    },
    focus() {
      this.isInput = false;
    },
    watchInput(e) {
      this.isInput = true;
      if (this.inputText) {
        this.$emit("input", this.inputText);
      }
      if (this.inputText === "") {
        this.$emit("input", []);
        this.$emit("change", null);
      }
    },
    Check(i) {
      this.inputText = i[this.showField];
      this.isInput = false;
      this.close();
      this.$emit("change", i);
    },
    open() {
      if (this.disabled)
        return;
      common_vendor.index.setStorageSync("keyId", this.keyId);
      this.popupShow = true;
    },
    close() {
      this.popupShow = false;
    },
    blur() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showBorder ? 1 : "",
    b: $props.setRight ? 1 : "",
    c: common_vendor.o([($event) => $data.inputText = $event.detail.value, (...args) => $options.watchInput && $options.watchInput(...args)]),
    d: common_vendor.o((...args) => $options.focus && $options.focus(...args)),
    e: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    f: $props.phText,
    g: "color:" + $props.phColor,
    h: common_vendor.o((...args) => $options.open && $options.open(...args)),
    i: $props.disabled,
    j: $data.inputText,
    k: $data.inputText,
    l: common_vendor.o((...args) => $options.clickClear && $options.clickClear(...args)),
    m: common_assets._imports_0$5,
    n: $props.showPopup && $data.filteredData.length > 0
  }, $props.showPopup && $data.filteredData.length > 0 ? {
    o: common_vendor.f($data.filteredData, (item, index, i0) => {
      return {
        a: common_vendor.t(item[$props.showField]),
        b: common_vendor.o(($event) => $options.Check(item), index),
        c: common_vendor.n(item.qiaoSelectKey == $data.inputText ? "blue" : ""),
        d: common_vendor.o((...args) => $options.touchst && $options.touchst(...args), index),
        e: index
      };
    }),
    p: $data.popupShow
  } : {}, {
    q: $props.showPopup
  }, $props.showPopup ? {
    r: $data.popupShow,
    s: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    t: $props.disabled ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a225baa"]]);
wx.createComponent(Component);
