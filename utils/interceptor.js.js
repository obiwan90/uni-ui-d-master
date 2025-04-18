import { useUserStore } from '@/stores/userInfoStore.js';
let urlRoot = 'https://www.xzxskj.com';
let config = {
    // 页面白名单
    whitePathList: [
        '/pagesLogin/login/login',
        '/pages/home/home'
    ],
	whiteApiList: [
		'/Home/Goods/shoppingcart',
		'/Home/index/index',
		'/Home/Homes/index',
		'/Home/Users/get_session_keys',
		'/Home/Users/infos',
		'/Home/Gly/qxlist',
		'/Home/Users/add',
		'/Home/Upload/add'
	]
}

export default function routingIntercept() {
    const userStore = useUserStore();
    const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
 
    list.forEach(item => {
        // 登录拦截-页面级别
        uni.addInterceptor(item, {
            invoke(e) {
			    const path = e.url.split('?')[0];
				// 判断是否需要登录（新用户）
				if (!checkLogin(path)) {
				    return false;
				}
				//刷新用户信息
				const info = useUserStore().getInfo();
				const needAuthorityData = uni.getStorageSync('authorityList') || { route: [], menu: [], api: [] };
				const userAuthorityData = uni.getStorageSync('userAuthorityUrls') || { route: [], menu: [], api: [] };
                console.log("path拦截 path:", path);
                console.log("path拦截 info:", info);
                
                // 判断是否拥有页面权限
                if (!checkPathPermission(path, needAuthorityData, userAuthorityData)) {
                    return false;
                }
            },
            fail(err) {
                console.log('拦截失败:', err);
            }
        });
    });

    // API 权限拦截
    uni.addInterceptor('request', {
        invoke(e) {
			const needAuthorityData = uni.getStorageSync('authorityList') || { route: [], menu: [], api: [] };
			const userAuthorityData = uni.getStorageSync('userAuthorityUrls') || { route: [], menu: [], api: [] };
			const api = e.url;
			console.log("拦截器API检查:", api);
			console.log("请求参数:", e.data);
            // 判断是否拥有 API 权限
            if (!checkApiPermission(api, needAuthorityData, userAuthorityData)) {
                uni.showToast({
                    title: '您没有操作权限!',
                    icon: 'none',
                });
                return false; // 拦截请求
            }
            return e;
        },
        fail(err) {
            console.log('API拦截失败:', err);
        }
    });
}

const checkPathPermission = (path, needAuthorityData, userAuthorityData) => {
    // 排除 urlRoot
    if (path.startsWith(urlRoot)) {
        path = path.replace(urlRoot, '');
    }
    // 判断当前 path 是否在需要权限的路径中，并且用户权限中是否包含这个 path
    if (needAuthorityData && userAuthorityData && needAuthorityData.route.includes(path) && !userAuthorityData.route.includes(path)) {
        uni.showToast({
            title: '您没有权限!',
            icon: 'none',
        });
        return false;
    }
    return true;
};

const checkApiPermission = (api, needAuthorityData, userAuthorityData) => {
	if (api.startsWith(urlRoot)) {
	    api = api.replace(urlRoot, '');
	}
	if (config.whiteApiList.includes(api)) {
	    return true;
	}
	console.log('api:',api)
    // 判断当前 API 是否在需要权限的 API 中，并且用户权限中是否包含这个 API
    if (needAuthorityData && userAuthorityData && needAuthorityData.api.includes(api) && !userAuthorityData.api.includes(api)) {
        return false;
    }
    return true;
};

// 检查是否登录
const checkLogin = (path, info) => {
    if (config.whitePathList.includes(path)) {
        return true;
    } else {
		let info = uni.getStorageSync('userInfo')
		// let isLogin = uni.getStorageSync('isLogin');
        if (!info) {
            uni.navigateTo({
                url: '/pagesLogin/login/login'
            });
            return false;
        }
        return true;
    }
};
