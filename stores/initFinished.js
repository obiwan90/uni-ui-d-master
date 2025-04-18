import { defineStore } from 'pinia'

export const useInitFinishedStore = defineStore('initFinished', {
  state: () => ({
    initFinished: uni.getStorageSync('initFinished') || false
  }),
  actions: {
    setInitFinished(val) {
      this.initFinished = val
      uni.setStorageSync('initFinished', val)
    }
  }
})
