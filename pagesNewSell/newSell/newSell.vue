<template>
	<view class="newSell">
		<!-- header -->
		<custom-header>
			<template #name>{{ title }}</template>
			<template #fill>卖货发布</template>
		</custom-header>
		<!-- search -->
		<view class="search">
			<image class="search-img" src="https://www.xzxskj.com/Public/upload/66cbadbbc34f49610.png" mode="aspectFit"></image>
			<qiaoSelect
				class="search-select"
				:keyId="22"
				:dataList="orgArray"
				phText="请搜索并确认型号全称"
				:searchKey="searchModelKey"
				:showBorder="false"
				:disabled="false"
				:showField="showModelField"
				@input="handleInput"
				@change="selectSearchChange"
				ref="qselect"
			></qiaoSelect>
		</view>
		<!-- content-1 -->
		<view class="content-1">
			<view class="top" v-for="(item, index) in filteredContent1.slice(0, 3)" :key="index">
				<view class="left">
					<text style="text-align: justify-all; text-align-last: justify">{{ item.key }}</text>
				</view>
				<view class="right">
					<view class="selectDownUp">
						<input
							type="text"
							style="margin-top: 3rpx; font-size: 32rpx; font-weight: 400; font-family: PingFang SC, PingFang SC"
							disabled
							v-model="item.value"
							:placeholder="item.placeholder"
						/>
						<view v-if="index === 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee" @click="selectJX()">
							<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
						</view>
						<view v-if="index === 1 && nclist !== null && nclist.length > 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee">
							<picker :range="nclist" range-key="name" @change="(event) => onSelectChange1(event)" mode="selector" :value="content1[1].value">
								<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
							</picker>
						</view>
						<view v-if="index === 2 && yslist !== null && yslist.length > 0" style="padding-left: 20rpx; border-left: 2rpx solid #eeeeee">
							<picker :range="yslist" range-key="name" @change="(event) => onSelectChange2(event)" mode="selector" :value="content1[2].value">
								<text style="color: #669cfd; font-size: 28rpx; font-weight: 400">选择</text>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- select-card -->
		<view class="select" v-for="(item, index) in select" :key="index">
			<view class="left">
				<text>{{ item.key }}</text>
			</view>
			<view class="right" v-if="item.key !== '销售时长'">
				<view>
					<text v-if="item.key === '销售时长'" class="text-1" @click="selectOption(item.key)">{{ item.placeholder }}</text>

					<picker
						v-if="item.key === '外观成色'"
						:range="finenesslist"
						range-key="name"
						@change="(event) => onSelectChange(event, item)"
						mode="selector"
						:value="item.value"
					>
						<text class="text-1" :style="{ color: item.value !== '' ? 'black' : '#808080' }">
							{{ item.value !== '' ? item.value : item.placeholder }}
						</text>
					</picker>
					<input
						v-else
						class="text-2"
						:type="item.key === '同行价格' || item.key === '销售数量' ? 'number' : 'text'"
						:placeholder="item.placeholder"
						v-model="item.value"
						@click="selectOption(item.key)"
						:disabled="(item.key === '维修检测' && checkboxWxValue.length > 0) || (item.key === '功能检测' && checkboxFnValue.length > 0)"
					/>
				</view>
				<view class="lable" v-if="item.key === '维修检测' || item.key === '功能检测'">
					<uv-checkbox-group v-if="item.key === '维修检测'" v-model="checkboxWxValue" shape="circle" @change="selected2">
						<uv-checkbox activeColor="red" name="1" :label="item.key === '维修检测' ? '全原' : '全好'" labelColor="grey"></uv-checkbox>
					</uv-checkbox-group>
					<uv-checkbox-group v-if="item.key === '功能检测'" v-model="checkboxFnValue" shape="circle" @change="selected1">
						<uv-checkbox activeColor="red" name="1" :label="item.key === '维修检测' ? '全原' : '全好'" labelColor="grey"></uv-checkbox>
					</uv-checkbox-group>
				</view>
			</view>

			<view class="right" v-else>
				<uv-radio-group v-model="checkboxTimeValue">
					<uv-radio :customStyle="{ margin: '8px' }" v-for="(item, index) in timeList" :key="index" :label="item.name" :name="item.name"></uv-radio>
				</uv-radio-group>
			</view>
		</view>
		<!-- 文本域 -->
		<view class="message">
			<textarea v-model="describes" class="texta" placeholder="请输入描述信息~" />
		</view>
		<!-- photo -->
		<view class="photos">
			<view class="upPhoto">
				<uv-upload
					:fileList="fileList1"
					multiple
					:maxCount="10"
					width="162rpx"
					height="162rpx"
					accept="image"
					maxSize="5242880"
					name="2"
					previewFullVideo
					@afterRead="afterRead"
					@delete="deleteFlie"
					@oversize="check"
				>
					<image src="https://www.xzxskj.com/xcximg/img_add_img44@3x.png" mode="widthFix" style="width: 162rpx; height: 162rpx"></image>
				</uv-upload>
			</view>
		</view>
		<!-- tip -->
		<view class="tip">
			<text>* 为保证买家真实体验，平台将 48小时后推送延长提醒，请及时关注并更新</text>
		</view>

		<uv-calendars ref="calendars" mode="range" color="#ff0000" :date="[getCurrentDate(), '']" @confirm="confirm" />

		<!-- fill -->
		<view style="height: 202rpx" />
		<!--bar -->
		<view class="bar" @click="comfirm">
			<view class="btn">
				<text>确认发布</text>
			</view>
		</view>
	</view>

	<uni-popup background-color="rgba(0,0,0,0)" :is-mask-click="true" ref="jixingPopup" :safe-area="false" type="bottom" @close="handleClose" @change="change">
		<jixingPannel ref="jixingPannelRef" v-if="showJiXing" @reload4Jx="reload4Jx" @close="handleClose"></jixingPannel>
	</uni-popup>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue';
import { apiQualityCheckItem } from '@/api/qualityCheck/qualityCheck.js';
import { apiSearchGoods } from '@/api/search/search.js';
import { apiAddMarket } from '../api/api.js';
import { apiPublish, apiGetQuality, apiRecoveryList, apiGetProductId } from '../api/api.js';
import { jixingPannel } from './components/jixingPannel.vue';
import { useUserStore } from '@/stores/userInfoStore.js';
import { compressImage } from '@/utils/common.js';
const qselect = ref(null);
const nclist = ref([]);
const yslist = ref([]);
const showJiXing = ref(false);
const jixingPannelRef = ref(null);
const jixingPopup = ref(null);
const handleClose = () => {
	console.log('Popup is closed');
	jixingPopup.value.close();
};
const change = (e) => {
	if (!e) {
		showJiXing.value = e.show;
	}
};
const selectJX = () => {
	showJiXing.value = true;
	jixingPopup.value.open();
};
const reload4Jx = async (selected, selectedTabs) => {
	console.log('select data:', selected);
	console.log('selectedTabs:', selectedTabs);
	if (selected.length > 0) {
		qselect.value.clearData();
		orgArray.value = [];

		param.value.xhid = selected[0].xhid;
		param.value.ppid = selected[0].ppid;
		content1.value[0].value = selected[0].qcname;
		// productId.value = selected[0].id;
		productId.value = '';
		await apiRecoveryListData();
	}
};

const id = ref('');
const productId = ref();
const orgArray = ref([]);
const searchModelKey = ref('spname');
const showModelField = ref('spname');
const checkboxWxValue = ref(['1']);
const checkboxFnValue = ref(['1']);
const checkboxTimeValue = ref('72h');
const timeList = ref([
	{ name: '12h', checked: false },
	{ name: '24h', checked: false },
	{ name: '48h', checked: false },
	{ name: '72h', checked: true }
]);
const content1 = ref([
	{ key: '型号', placeholder: '请搜索相关型号', value: '' },
	{ key: '内存', placeholder: '请搜索相关型号', value: '', id: '' },
	{ key: '颜色', placeholder: '请搜索相关型号', value: '', id: '' },
	{ key: '型号全称', placeholder: '', value: '' }
]);
const handleInput = (inputText) => {
	if (inputText.length > 0) {
		uni.showLoading({
			title: '加载中....',
			mask: true
		});
		console.log('inputText', inputText);
		apiModelSearchData(inputText);
		uni.hideLoading();
	}
};
const apiModelSearchData = async (inputText) => {
	const data = {
		word: inputText
	};
	const res = await apiSearchGoods(data);
	console.log('search res:', res);
	if (res.code === '200') {
		orgArray.value = res.lists ? res.lists : [];
	}
};
const selectSearchChange = async (e) => {
	if (e) {
		console.log('selectSearchChange e:', e);
		const { id, xhname, ncname, ysname, spname } = e;
		nclist.value = [];
		yslist.value = [];
		qselect.value.clearData();
		orgArray.value = [];

		productId.value = id;
		await apiQualityCheckItemData(id);
	}
};
const apiQualityCheckItemData = async (id) => {
	const data = {
		opid: uni.getStorageSync('sessionInfo').opid,
		id: id
	};
	const res = await apiQualityCheckItem(data);
	if (res.code === 200) {
		content1.value[0].value = res.infos.xhname;
		content1.value[1].value = res.infos.ncname;
		content1.value[2].value = res.infos.ysname;
		content1.value[3].value = res.infos.spname;

		if (!res.infos.ysname) {
			yslist.value = null;
		}
		if (!res.infos.ncname) {
			nclist.value = null;
		}
	}
};

const title = ref('自由发布');
const type = ref();
const describes = ref();
const calendars = ref(null);
const select = ref([
	{ key: '外观成色', placeholder: '请选择', value: '' },
	{ key: '功能检测', placeholder: '请输入', value: '全好' },
	{ key: '维修检测', placeholder: '请输入', value: '全原' },
	{ key: '同行价格', placeholder: '请输入', value: '' },
	{ key: '销售数量', placeholder: '请输入', value: '1' },
	{ key: '销售时长', placeholder: '请选择', value: '' }
]);
const confirm = (e) => {
	console.log('日历回调：', e);
	select.value[5].placeholder = e.range.before + '~' + e.range.after;
};
const selectOption = (key) => {
	if (key === '外观成色') {
		console.log('选择成色');
	}
	if (key === '销售时长') {
		console.log('打开日历');
		calendars.value.open();
	}
};
const getCurrentDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
	return formattedDate;
};
const fileList1 = ref([]);
// 删除图片
const deleteFlie = (event) => {
	fileList1.value.splice(event.index, 1);
};
const check = (e) => {
	console.log(e);
	uni.showToast({
		title: '超出上传限制',
		icon: 'error',
		duration: 2000
	});
};

const afterRead = async (event) => {
	let lists = [].concat(event.file);
	let fileListLen = fileList1.value.length;
	for (const item of lists) {
		try {
			const compressedResult = await compressImage(item); // 调用公共压缩函数
			if (!compressedResult) {
				// 如果压缩失败，则跳过上传
				continue;
			}
			console.log('compressedResult', compressedResult);
			// 上传压缩后的图片
			const uploadResult = await uni.uploadFile({
				url: 'https://www.xzxskj.com/Home/Upload/add',
				filePath: compressedResult.tempFilePath, // 使用压缩后的图片路径
				name: 'imgs',
				header: {
					'Content-Type': 'multipart/form-data'
				}
			});

			// 解析返回的数据
			const data = JSON.parse(uploadResult.data);
			if (data.code !== 200) {
				console.error('上传失败:', data);
				uni.showToast({
					title: '上传失败,稍后再试',
					icon: 'error',
					duration: 2000
				});
				return;
			} else {
				console.log('上传成功:', data.urls);
				const imageUrls = data.urls.split(',');
				imageUrls.forEach((imageUrl) => {
					if (imageUrl.trim()) {
						fileList1.value.push({
							url: 'https://www.xzxskj.com' + imageUrl.trim(),
							status: 'success',
							message: ''
						});
						fileListLen++;
					}
				});
			}
		} catch (error) {
			console.error('上传失败:', error);
			uni.showToast({
				title: '上传失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
};

const filteredContent1 = computed(() => {
	return content1.value.filter((item, index) => {
		// 过滤掉型号全称
		if (item.key === '型号全称') {
			return false; // 不显示型号全称项
		}
		// 过滤掉内存项如果 nclist 为 null
		if (index === 1 && nclist.value === null) {
			return false; // 不显示内存项
		}
		// 过滤掉颜色项如果 yslist 为 null
		if (index === 2 && yslist.value === null) {
			return false; // 不显示颜色项
		}
		return true; // 显示其他项
	});
});

const addMarket = async () => {
	// uni.showLoading({
	//     title: '提交中....',
	//     mask: true
	// });
	try {
		const data = {
			id: id.value,
			opid: uni.getStorageSync('sessionInfo').opid,
			type: '1',
			describes: describes.value,
			img: fileList1.value.map((file) => file.url).join(','),
			fullnameid: productId.value,
			fineness: select.value[0].value,
			price: select.value[3].value,
			num: select.value[4].value,
			duration: checkboxTimeValue.value.replace('h', ''),
			functions: select.value[1].value,
			service: select.value[2].value,
			fbd: uni.getStorageSync('locationForm').city
		};
		const res = await apiAddMarket(data);
		if (res.code === '200') {
			uni.showToast({
				title: '添加成功',
				icon: 'success',
				duration: 500
			});
			setTimeout(() => {
				if (id.value !== '') {
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: '/pagesMarketCount/marketCount/marketCount?from=newSell'
					});
				}
			}, 500);
		} else {
			uni.showToast({
				title: res.msg ? res.msg : '请重试',
				icon: 'error',
				duration: 3000
			});
		}
		console.log('addmarket res', res);
	} catch (error) {
		console.error('Error adding market:', error);
		uni.showToast({
			title: '发生错误，请重试',
			icon: 'error',
			duration: 2000
		});
	} finally {
		// uni.hideLoading();
	}
};

const selected1 = (e) => {
	console.log(e);
	if (e.length > 0 && e[0] === '1') {
		select.value[1].value = '全好';
	} else {
		select.value[1].value = '';
	}
};
const selected2 = (e) => {
	console.log(e);
	if (e.length > 0 && e[0] === '1') {
		select.value[2].value = '全原';
	} else {
		select.value[2].value = '';
	}
};
const param = ref({
	xhid: '',
	ppid: '',
	nc: '',
	bb: '',
	wl: '',
	ys: '',
	bx: '',
	start: '',
	delivery: uni.getStorageSync('locationForm').fullLocation.split(' ').join(',')
});

// const apiRecoveryListData = async () => {
// 	nclist.value =[]
// 	yslist.value =[]
// 	content1.value[1].value = ''
// 	content1.value[2].value = ''
// 	const res = await apiRecoveryList(param.value);
// 	if(res.code===200){
// 		nclist.value = res.nclist
// 		yslist.value = res.yslist
// 	}
// 	console.log('Recovery list:', res);
// };

const apiRecoveryListData = async () => {
	nclist.value = [];
	yslist.value = [];
	content1.value[1].value = '';
	content1.value[2].value = '';

	const res = await apiRecoveryList(param.value);
	if (res.code === 200) {
		// 过滤 nclist 和 yslist
		nclist.value = res.nclist ? res.nclist.filter((item) => item.name) : [];
		yslist.value = res.yslist ? res.yslist.filter((item) => item.name) : [];

		// 如果是空数组，则赋值为 null
		if (nclist.value.length === 0) {
			nclist.value = null;
		}
		if (yslist.value.length === 0) {
			yslist.value = null;
		}
		
		apiGetProductIdAc()
	}

	console.log('Recovery list:', res);
};
const apiGetProductIdAc = async () => {
	const apiParam = {
		xhid: param.value.xhid, //
		ncid: content1.value.find((item) => item.key === '内存').id,
		ysid: content1.value.find((item) => item.key === '颜色').id
	};
	const res = await apiGetProductId(apiParam);
	if (res.code === '200' && res.infos) {
		productId.value = res.infos.id;
	} else {
		productId.value = '';
	}
	console.log(' 请求  productId.value:', productId.value);
};
// const comfirm = async () => {
//     // 校验参数
//     if (!productId.value) {
//         uni.showToast({
//             title: '当前型号暂不支持上传',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!describes.value) {
//         uni.showToast({
//             title: '请填写描述信息',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!fileList1.value.length) {
//         uni.showToast({
//             title: '请上传至少一张图片',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!select.value[0].value) {
//         uni.showToast({
//             title: '请选择外观成色',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!select.value[3].value) {
//         uni.showToast({
//             title: '请填写同行价格',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!select.value[4].value) {
//         uni.showToast({
//             title: '请填写销售数量',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }

//     if (!checkboxTimeValue.value) {
//         uni.showToast({
//             title: '请选择销售时长',
//             icon: 'error',
//             duration: 2000
//         });
//         return;
//     }
//     await addMarket();
// };
const comfirm = async () => {
	console.log('  提交  comfirm productId.value', productId.value);
	// 校验内存和颜色
	const memoryItem = content1.value.find((item) => item.key === '内存');
	const colorItem = content1.value.find((item) => item.key === '颜色');

	if (nclist.value !== null && !memoryItem.value) {
		uni.showToast({
			title: '请选择内存',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (yslist.value !== null && !colorItem.value) {
		uni.showToast({
			title: '请选择颜色',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	// 校验参数
	if (!productId.value) {
		uni.showToast({
			title: '当前型号暂不支持上传',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!describes.value) {
		uni.showToast({
			title: '请填写描述信息',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!fileList1.value.length) {
		uni.showToast({
			title: '请上传至少一张图片',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!select.value[0].value) {
		uni.showToast({
			title: '请选择外观成色',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!select.value[3].value) {
		uni.showToast({
			title: '请填写同行价格',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!select.value[4].value) {
		uni.showToast({
			title: '请填写销售数量',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	if (!checkboxTimeValue.value) {
		uni.showToast({
			title: '请选择销售时长',
			icon: 'error',
			duration: 2000
		});
		return;
	}

	await addMarket();
};

const finenesslist = ref([]);
const apiGetQualityAc = async () => {
	const res = await apiGetQuality();
	if (res.code === '200') {
		finenesslist.value = res.lists;
	}
};
const onSelectChange = (e, item) => {
	console.log('选择 e:', e);
	item.value = finenesslist.value[e.detail.value].name;
};
const onSelectChange1 = async (e) => {
	console.log('选择 e:', e);

	const memoryItem = content1.value.find((item) => item.key === '内存');

	if (memoryItem) {
		console.log('memoryItem', memoryItem);
		console.log('nclist.value', nclist.value);

		// 将 e.detail.value 转换为数字
		const selectedIndex = Number(e.detail.value);

		// 确保索引有效
		if (selectedIndex >= 0 && selectedIndex < nclist.value.length) {
			memoryItem.id = nclist.value[selectedIndex].id;
			memoryItem.value = nclist.value[selectedIndex].name;
			await apiGetProductIdAc();
		} else {
			console.error('无效的索引:', selectedIndex);
		}
	} else {
		console.error('未找到内存项');
	}
};

const onSelectChange2 = async (e) => {
	console.log('选择 e:', e);

	const memoryItem = content1.value.find((item) => item.key === '颜色');

	if (memoryItem) {
		// 确保 e.detail.value 是有效的索引
		const selectedIndex = Number(e.detail.value);

		if (selectedIndex >= 0 && selectedIndex < yslist.value.length) {
			memoryItem.id = yslist.value[selectedIndex].id;
			memoryItem.value = yslist.value[selectedIndex].name;
			await apiGetProductIdAc();
		} else {
			console.error('无效的索引:', selectedIndex);
		}
	} else {
		console.error('未找到颜色项');
	}
};

onLoad(async (options) => {
	let infos = uni.getStorageSync('infos');
	if (!infos || infos.info.shopname === '') {
		uni.showModal({
			title: '提示',
			content: '您还未注册商家',
			confirmText: '去注册',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pagesMenber/menber/menber'
					});
				} else {
					uni.navigateBack();
				}
			}
		});
	}

	console.log('传递过来的参数:', options.data);
	if (options.data) {
		const data = JSON.parse(decodeURIComponent(options.data));
		title.value = '卖货修改';
		type.value = data.id;
		id.value = data.id;
		console.log('data', data);
		await apiQualityCheckItemData(data.fullnameid);

		select.value = [
			{ key: '外观成色', placeholder: '请选择', value: data.fineness },
			{ key: '功能检测', placeholder: '请输入', value: data.functions },
			{ key: '维修检测', placeholder: '请输入', value: data.service },
			{ key: '同行价格', placeholder: '请输入', value: data.price },
			{ key: '销售数量', placeholder: '请输入', value: data.num },
			{ key: '销售时长', placeholder: '请选择', value: data.duration + 'h' }
		];
		productId.value = data.fullnameid;
		checkboxTimeValue.value = data.duration + 'h';
		describes.value = data.describes;
		data.img.split(',').forEach((item) => {
			fileList1.value.push({
				url: item
			});
		});
	}
	apiGetQualityAc();
});
onShow(async () => {
	const userInfoRes = await useUserStore().getInfo();
	let infos = uni.getStorageSync('infos');
	if (!infos || infos.info.shopname === '') {
		uni.showModal({
			title: '提示',
			content: '您还未注册商家',
			confirmText: '去注册',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pagesMenber/menber/menber'
					});
				} else {
					uni.navigateBack();
				}
			}
		});
	}
});
</script>

<style lang="scss" scoped>
.newSell {
	height: 100%;
	width: 750rpx;
	// height: 1726rpx;
	// background: linear-gradient( 180deg, #F3F2F6 0%, #FFFFFF 100%);
	background: #f3f2f6;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.search {
		box-sizing: border-box;
		// margin-left: 20rpx;
		margin-top: 36rpx;
		width: 710rpx;
		height: 96rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.search-img {
		height: 32rpx;
		width: 32rpx;
		margin-right: 20rpx;
	}
	.search-select {
		width: 100%;
	}
	.content-1 {
		// margin-left: 20rpx;
		box-sizing: border-box;
		margin-top: 8rpx;
		// height: 300rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-right: 20rpx;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.05);
		.top {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				width: 166rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				text {
					width: 118rpx;
					height: 44rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 32rpx;
					color: #1f1f1f;
					font-style: normal;
					text-transform: none;
				}
			}
			.right {
				width: 77%;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #eeeeee;
				height: 100%;
				align-items: center;
				.selectDownUp {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				text {
					height: 42rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 32rpx;
					color: #1f1f1f;
					opacity: 0.4;
				}
				.selelct {
					width: 96rpx;
					border-left: 2rpx solid #eeeeee;
					text {
						height: 40rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #669cfd;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
	.select-card {
		margin-top: 16rpx;
		width: 710rpx;
		height: 100rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}
	.select {
		margin-top: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			width: 166rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				height: 40rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1f1f1f;
			}
		}
		.right {
			height: 100%;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.text-1 {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
			}
			.text-2 {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #1f1f1f;
				// opacity: 0.4;
			}
			.lable {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				.lable-image {
					height: 28rpx;
					width: 28rpx;
					margin-right: 10rpx;
					border-radius: 50%;
					// border: 1rpx solid red;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						height: 100%;
						width: 100%;
					}
				}
				text {
					height: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #eb4636;
				}
			}
		}
	}
	.message {
		// border: 1rpx solid red;
		box-sizing: border-box;
		margin-top: 16rpx;
		width: 710rpx;
		height: 160rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 28rpx 20rpx;
		.texta {
			// border: 1rpx solid black;
			height: 100%;
			width: 100%;
		}
	}

	.photos {
		width: 710rpx;
		margin-top: 16rpx;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		.upPhoto {
		}
		.upVideo {
			margin-top: 20rpx;
		}
	}
	.tip {
		margin-top: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			height: 28rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 20rpx;
			opacity: 0.4;
		}
	}
	.bar {
		z-index: 99;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 182rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 24rpx 30rpx 62rpx 30rpx;
		.btn {
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #ed784b 0%, #eb4636 100%);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text {
				height: 42rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
