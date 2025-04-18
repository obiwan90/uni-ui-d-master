"use strict";
const common_vendor = require("../common/vendor.js");
const usePermissionStore = common_vendor.defineStore("permission", {
  state: () => ({
    menuAuthorityData: common_vendor.ref([])
  }),
  actions: {
    loadMenuAuthority() {
      const userAuthorityData = common_vendor.index.getStorageSync("userAuthorityUrls") || { route: [], menu: [], api: [] };
      this.menuAuthorityData.value = userAuthorityData.menu || [];
    },
    hasMenuAuthority(menuAuthority) {
      return menuAuthority && this.menuAuthorityData.value.includes(menuAuthority);
    }
  }
});
exports.usePermissionStore = usePermissionStore;
