"use strict";
const common_vendor = require("../common/vendor.js");
const useTabStore = common_vendor.defineStore("tab", {
  state: () => ({
    currentTabIndex: 0
  }),
  actions: {
    setCurrentTabIndex(index) {
      this.currentTabIndex = index;
    }
  }
});
exports.useTabStore = useTabStore;
