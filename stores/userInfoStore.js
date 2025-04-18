import { defineStore } from 'pinia';
import { apiGetUserInfo } from '@/api/member/member.js';
import { apigetShopCard } from '@/api/shopCard/shopCard.js';
import { useTokenStore } from '@/stores/tokenStore';

// 提取权限URL的函数
function extractUrls(data) {
  const result = { route: [], menu: [], api: [] };

  function traverse(nodes) {
    for (const node of nodes) {
      const urls = node.url.split(',');
      urls.forEach((url) => {
        if (url.startsWith('route:')) result.route.push(url.slice(6));
        else if (url.startsWith('menu:')) result.menu.push(url.slice(5));
        else if (url.startsWith('api:')) result.api.push(url.slice(4));
      });
      if (node.lists && node.lists.length > 0) traverse(node.lists);
    }
  }

  traverse(data);
  return result;
}

export const useUserStore = defineStore({
  id: 'userInfo',
  state: () => ({
    info: null,
    fetchingUserInfo: false,
    shopCount: null
  }),

  actions: {
    // 每次都请求最新的用户信息
    async getInfo() {
      try {
        this.fetchingUserInfo = true;

        // 获取会话信息
        const session = uni.getStorageSync('sessionInfo');
        if (!session || !session.opid) throw new Error('Session info missing');

        const param = { openid: session.opid };

        // 请求用户信息
        const res = await apiGetUserInfo(param);

        if (res.info) {
          // 缓存用户信息
          this.setInfo(res.info);
          // 保存权限数据
          this.savePermissions(res.qxlists);
          // 保存完整信息
          uni.setStorageSync('infos', res);
		  
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        this.fetchingUserInfo = false;
      }

      return this.info;
    },

    // 设置用户信息并缓存
    setInfo(info) {
      this.info = info;
      uni.setStorageSync('userInfo', JSON.stringify(info));
      uni.setStorageSync('isLogin', true);
    },

    // 保存权限信息
    savePermissions(qxlists) {
      if (qxlists) {
        const userAuthorityUrls = extractUrls(qxlists);
        uni.setStorageSync('userAuthorityUrls', userAuthorityUrls);
        uni.setStorageSync('qxlists', qxlists);
      }
    },

    // 清空用户信息
    clearInfo() {
      this.info = null;
      uni.removeStorageSync('userInfo');
      uni.removeStorageSync('isLogin');
      uni.removeStorageSync('qxlists');
      uni.removeStorageSync('userAuthorityUrls');
    },

    // 刷新购物车商品数量
    async refreshShopCarCount() {
      try {
        const session = uni.getStorageSync('sessionInfo');
        if (!session || !session.opid) throw new Error('Session info missing');

        const res = await apigetShopCard({ opid: session.opid });
        if (res.code === '200') {
          this.shopCount = res.count;
        }
        return this.shopCount;
      } catch (error) {
        console.error('刷新购物车数量失败:', error);
        return null;
      }
    }
  }
});
