const db = uniCloud.database();
module.exports = {
	_before: function () { // 通用预处理器
		
	},
	addBatch: async function () {
		const httpInfo = this.getHttpInfo()
		const data = httpInfo.body;
		// console.log("data:", data);
		let JsonArray = JSON.parse(data);
		await db.collection('by-search-model').add(JsonArray);
		for(let item of JsonArray){
			let keywords = item.xhname.split(' ');
			const paramArray = keywords.map(item => ({ name: item }));
			for (let item1 of paramArray) {
				await db.collection('keyword').where({ name: item1.name }).remove();
			}
			await db.collection('keyword').add(paramArray);
		}
	},
	addSearchModel: async function (data) {
	    let keywords = data.xhname.split(' ');
	    const paramArray = keywords.map(item => ({ name: item }));
	    for (let item of paramArray) {
	        await db.collection('keyword').where({ name: item.name }).remove();
	    }
	    await db.collection('keyword').add(paramArray);
	    await db.collection('by-search-model').where({ id: data.id }).remove();
	    return await db.collection('by-search-model').add(data);
	},
	getSearchModelById: async function (data) {
		return await db.collection('by-search-model')
		.where({id: data.id})
		.get()
	},
	deleteSearchModel: async function (data) {
		return await db.collection('by-search-model').where({id:data.id}).remove()
	},
	updateSearchModel: async function (data) {
		return await db.collection('by-search-model').where({id:data.id}).update(data)
	},
	getKeyWordList: async function () {
		return await db.collection('keyword').get()
	}
}
