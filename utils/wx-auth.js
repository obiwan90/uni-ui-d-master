//获取code
export function getLoginCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			success: (res) => {
				if (res.code) {
					resolve(res.code)
				} else {
					reject(res)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

//获取Openid
export function getOpenId(appid, secret, code) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' +
				secret + '&js_code=' + code + '&grant_type=authorization_code',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}