// shopTabStore.js
import { defineStore } from 'pinia';

export const useTabStore = defineStore('shopTab', {
  state: () => ({
    currentTabIndex: 0,
  }),
  actions: {
    setCurrentTabIndex(index) {
      this.currentTabIndex = index;
    },
  },
});
