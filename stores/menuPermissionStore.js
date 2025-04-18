import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menuAuthorityData: ref([])
  }),
  actions: {
    loadMenuAuthority() {
      const userAuthorityData = uni.getStorageSync('userAuthorityUrls') || { route: [], menu: [], api: [] };
      this.menuAuthorityData.value = userAuthorityData.menu || [];
    },
    hasMenuAuthority(menuAuthority) {
      return menuAuthority && this.menuAuthorityData.value.includes(menuAuthority);
    }
  }
});
