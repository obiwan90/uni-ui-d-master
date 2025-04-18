"use strict";
const common_vendor = require("../common/vendor.js");
const useInitFinishedStore = common_vendor.defineStore("initFinished", {
  state: () => ({
    initFinished: common_vendor.index.getStorageSync("initFinished") || false
  }),
  actions: {
    setInitFinished(val) {
      this.initFinished = val;
      common_vendor.index.setStorageSync("initFinished", val);
    }
  }
});
exports.useInitFinishedStore = useInitFinishedStore;
