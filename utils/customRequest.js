import {
	useTokenStore
} from '@/stores/tokenStore';
import {
	apiGetUserInfo
} from '@/api/member/member.js'
import {
	useUserStore
} from '@/stores/userInfoStore.js'
let BaseUrl = 'https://www.xzxskj.com';

const whiteList = ['/Home/index/index'];
export function customRequest(url, data = {}, method = 'POST') {
	return new Promise(async (resolve, reject) => {
		const isExternalUrl = /^https?:\/\//.test(url);
		if (!whiteList.includes(url)) {	
			console.log("request url:",url);
			const tokenInfo  = uni.getStorageSync('tokenInfo')
			data.timeStamp = tokenInfo.timeStamp;
			data.randomStr = tokenInfo.randomStr;
			data.signature = tokenInfo.signature;
			data.adminLx = uni.getStorageSync('adminLx')?uni.getStorageSync('adminLx'):'';
			data.adminId = uni.getStorageSync('adminId')?uni.getStorageSync('adminId'):'';
		
		}
		uni.request({
			url: isExternalUrl ? url : BaseUrl + url,
			data: data,
			method: method,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
			},
		});
	});
}

// 判断是否为登录页
function isLoginPage() {
	const pages = getCurrentPages(); // 获取当前页面栈
	const currentPage = pages[pages.length - 1]; // 获取当前页面对象
	return currentPage.route === 'pagesLogin/login/login'; // 检查当前页面路径是否为登录页
}