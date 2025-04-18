// tabStore.js
import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
  state: () => ({
    currentTabIndex: 0,
  }),
  actions: {
    setCurrentTabIndex(index) {
      this.currentTabIndex = index;
    },
  },
});
