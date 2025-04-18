import { defineStore } from 'pinia';
import { apiGetToken, apiLogin } from "@/api/login/loginApi.js";

export const useTokenStore = defineStore('token', {
  state: () => ({
    timeStamp: 0,
    randomStr: '',
    signature: '',
    opid: '',
    session_key: '',
    phone: ''
  }),
actions: {
    updateToken(tokenInfo) {
      Object.assign(this, tokenInfo);
      uni.setStorageSync('tokenInfo', tokenInfo);
    },
    async getToken() {
      try {
        const res = await apiGetToken();
        console.log('token res:', res);
        this.updateToken(res);
        return res;
      } catch (error) {
        console.error('获取 token 失败:', error);
        throw new Error('Token acquisition failed');
      }
    },
    isTokenSet() {
      return this.timeStamp && this.randomStr && this.signature;
    },
    async getSession() {
      // if (this.opid && this.session_key) {
      //   return { opid: this.opid, session_key: this.session_key };
      // }

      // const localSession = uni.getStorageSync('sessionInfo');
      // if (localSession) {
      //   this.setLoginSession(localSession);
      //   return localSession;
      // }
      try {
        const loginRes = await new Promise((resolve, reject) => {
          uni.login({
            provider: 'weixin',
            success: resolve,
            fail: reject
          });
        });

        const token = await this.getToken(); // 确保token已获取
        const res = await apiLogin({
          code: loginRes.code,
          // ...token
        });
        this.setLoginSession(res);
        return res;
      } catch (error) {
        console.error('获取 session 失败:', error);
        throw new Error('Session acquisition failed');
      }
    },
    setLoginSession(sessionInfo) {
      Object.assign(this, sessionInfo);
      uni.setStorageSync('sessionInfo', sessionInfo);
    },
    getPhone() {
      this.phone = this.phone || uni.getStorageSync('phone');
      return this.phone;
    },
    setPhone(phone) {
      this.phone = phone;
      uni.setStorageSync('phone', phone);
    },
  },
});
