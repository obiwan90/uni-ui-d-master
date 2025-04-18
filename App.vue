<script>
import routingIntercept from '@/utils/interceptor.js';
import { useTokenStore } from '@/stores/tokenStore';
import { apiLogin } from '@/api/login/loginApi.js';
import { apiGetUserInfo } from '@/api/member/member.js';
import { useLocationStore } from '@/stores/locationStore.js';
import { useUserStore } from '@/stores/userInfoStore.js';
import { apiGetAuthority } from '@/api/station/station.js';
import { useInitFinishedStore } from '@/stores/initFinished.js';
import { addUserSetting,getUserSetting } from '@/utils/common.js'
export default {
	onLaunch: async function () {
		
		useInitFinishedStore().setInitFinished(false);
		uni.showLoading({
			title: '加载中...'
		})
		routingIntercept();
		const session = await useTokenStore().getSession();
		console.log('session 检查:', session);
		await this.initializeApp();
		useInitFinishedStore().setInitFinished(true);
		uni.hideLoading();
	},

	onShow: async function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
	methods: {
		async initializeApp() {
			console.log('App onLaunch');
	
			const [locationRes, tokenRes, shopCarCountRes, authorityRes] = await Promise.all([
				useLocationStore().getForm(),
				useTokenStore().getToken(),
				useUserStore().refreshShopCarCount(),
				apiGetAuthority()
			]);
			console.log('定位 检查:', locationRes);
			console.log('token 检查:', tokenRes);
			console.log('刷新购物车:', JSON.parse(shopCarCountRes));
			console.log('authorityList res:', authorityRes);
			
		
			if (authorityRes.code === 200) {
				authorityRes.lists.forEach((item) => {
					if (item.url === 'xcx') {
						let authorityList = extractUrls(item.lists);
						uni.setStorageSync('authorityList', authorityList);
						console.log('权限获取:', authorityList);
						return;
					}
				});
			}
			let qxlists = uni.getStorageSync('qxlists');
			if (qxlists) {
				const userAuthorityUrls = extractUrls(qxlists);
				console.log('userAuthorityUrls:', userAuthorityUrls);
				uni.setStorageSync('userAuthorityUrls', userAuthorityUrls);
				console.log('用户权限获取:', userAuthorityUrls);
			}

			// 检测是否更新
			const updateManager = uni.getUpdateManager();
			console.log('updateManager：', updateManager);
			updateManager.onCheckForUpdate((res) => {
				console.log('cheack res:', res);
				if (res && res.hasUpdate) {
					// 有新版本，优先
					uni.showLoading({
						title: '小程序更新中'
					});
				}
			});
			// 更新提示
			updateManager.onUpdateReady(function (res) {
				console.log('uptateRedy res:', res);
				uni.hideLoading();
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			// 更新失败
			updateManager.onUpdateFailed((res) => {
				console.log('update failed res:', res);
				// 新的版本下载失败
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: '更新应用失败',
					showCancel: false,
					success: (res2) => {
						if (res2.confirm) {
							//更新失败，继续
							this.checkPcLogin(query);
						}
					}
				});
			});
			function extractUrls(data) {
				const result = {
					route: [],
					menu: [],
					api: []
				};

				function traverse(nodes) {
					for (const node of nodes) {
						const urls = node.url.split(',');
						for (const url of urls) {
							if (url.startsWith('route:')) {
								result.route.push(url.slice(6));
							} else if (url.startsWith('menu:')) {
								result.menu.push(url.slice(5));
							} else if (url.startsWith('api:')) {
								result.api.push(url.slice(4));
							}
						}
						if (node.lists && node.lists.length > 0) {
							traverse(node.lists);
						}
					}
				}

				traverse(data);
				return result;
			}
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'common/style/common-style.scss';
/*vant css */
@import '/wxcomponents/dist/common/index.wxss'; //路径要确保正确！！！！
</style>
