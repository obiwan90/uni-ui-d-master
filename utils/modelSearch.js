import createJieba  from 'js-jieba';
import crypto from 'crypto-js'
// 搜索相关常量
const searchLogDbName = 'opendb-search-log'; // 搜索记录数据库
const mallGoodsDbName = 'by-search-model'; // 商品数据库by-search-model
const associativeSearchField = 'xhname'; // 联想时，搜索框值检索数据库字段名
const associativeField = 'spname,id'; // 联想列表每一项携带的字段
const localSearchListKey = '__local_search_history'; // 本地历史存储字段名
const keywordDbName = 'keyword'; // 关键词
// 初始化数据库
const db = uniCloud.database();
const searchLogDb = db.collection(searchLogDbName);
const mallGoodsDb = db.collection(mallGoodsDbName);
const keywordDb = db.collection(keywordDbName);
const searchText = ref('');
const associativeList = ref([]);
const keywordObj = uniCloud.importObject('search-model')
// 数组去重
const arrUnique = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const curIndex = arr.indexOf(arr[i]);
    const lastIndex = arr.lastIndexOf(arr[i]);
    curIndex !== lastIndex && arr.splice(lastIndex, 1);
  }
  return arr;
};

// 防抖函数
function debounce(fn, interval, isFirstAutoRun) {
  let timer = null;
  let first = true;
  return function() {
    const args = arguments;
    const _me = this;
    if (first && isFirstAutoRun) {
      first = false;
      fn.apply(_me, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(_me, args);
    }, interval || 200);
  };
}

// 本地搜索列表管理
const localSearchListManage = word => {
  let list = uni.getStorageSync(localSearchListKey);
  if (list.length) {
    list.unshift(word);
    list = arrUnique(list);
    if (list.length > 10) {
      list.pop();
    }
  } else {
    list = [word];
  }
  uni.setStorageSync(localSearchListKey, list);
};

// 获取设备ID
const getDeviceId = () => {
  return new Promise((resolve, reject) => {
    const uniId = uni.getStorageSync('uni_id');
    if (!uniId) {
      // #ifdef APP-PLUS
      plus.device.getInfo({
        success: deviceInfo => {
          resolve(deviceInfo.uuid);
        },
        fail: () => {
          resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2));
        }
      });
      // #endif
      // #ifndef APP-PLUS
      resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2));
      // #endif
    } else {
      resolve(uniId);
    }
  });
};

// 添加搜索日志
const searchLogDbAdd = value => {
  getDeviceId().then(device_id => {
    searchLogDb.add({
      device_id,
      content: value,
      create_date: Date.now()
    });
  });
};

const jieba = createJieba();
const search = async (value) => {
  if (!value||value.length===0) {
    associativeList.value.length = 0;
    return;
  }
  console.log("input simHash:",getFeatureVector(value))
  const res11 = await keywordObj.getKeyWordList()
  const keyWords =res11.data
  console.log('keyWords:', keyWords);
  // if (keyWords.length !== 0) {
	 // keyWords.forEach(item => jieba.insertUserWord(item.name));
  // }
  // jieba.insertUserWord('8')
  // jieba.insertUserWord('nova')
  jieba.insertUserWord('11')
  const flog = true
  const cutResult = jieba.cutAll(value,flog);
  // const tags = jieba.tag(value)
  // const extracts = jieba.extract(value, 5);
  // const lookupTag = jieba.lookupTag(value)
  console.log('cut:', cutResult);
  // console.log('tags:', tags);
  // console.log('extracts',extracts)
  // console.log('lookupTag',lookupTag)
  searchText.value = value;
  // 确保 cutResult 是一个数组
  if (!Array.isArray(cutResult)) {
    cutResult = [value];
  }
  // 构建正则表达式
  const regexString = cutResult.map(keyword => `(?=.*${keyword})`).join('');
  const regex = new RegExp(regexString, 'gi');
  console.log('构建的正则表达式:', regex);
  await handleSearch(regex);
  return associativeList.value;
}

async function handleSearch(regex) {
	// 设置分页参数
	 // const pageSize = 10; 
 try {
   // 使用正则表达式进行前缀匹配
   const res = await mallGoodsDb.where({
     // spname: new RegExp(`^${value}`, 'i')
 	        xhname: regex
   // }).field(associativeField).limit(pageSize).get();
   }).get();
   // 更新结果列表
   associativeList.value = res.result.data;
 
 } catch (error) {
   console.error('搜索失败:', error);
   associativeList.value.length = 0;
 }
}


export { search };
