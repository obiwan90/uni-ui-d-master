const db = uniCloud.database();
module.exports = {
	_before: function () { // 通用预处理器
	},
	addSetting:async function (data) {
		await db.collection('user-setting').where({user_id:data.user_id}).remove()
		return await db.collection('user-setting').add(data)
	},
	getUserSetting:async function (user_id) {
		return await db.collection('user-setting').where({user_id:user_id}).get()
	}
}
