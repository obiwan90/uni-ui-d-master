<template>
	<view class="layout">
		<custom-header>
			<template #name>收款账户</template>
			<template #fill>收款账户</template>
		</custom-header>
		<view v-if="data.length === 0" style="margin-top: 78rpx;width: 690rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;align-items: center;padding-top: 60rpx;padding-bottom: 128rpx;">
			<image src="https://www.xzxskj.com/xcximg/icon_shoukuan@3x.png" mode="aspectFill" style="height: 184rpx;width: 184rpx;"></image>
			<text style="font-family: PingFang SC, PingFang SC;color: #1F1F1F;font-size: 28rpx;font-weight: 400;margin-top: 16rpx;width: 336rpx;text-align: center;">暂未设置您的专属收款信息请立即添加收款账户</text>
			<view @click="addAccount" style="margin-top: 62rpx;width: 466rpx;height: 96rpx;background: linear-gradient( 135deg, #ED784B 0%, #EB4636 100%);border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;justify-content: center;align-items: center;">
				<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 32rpx;color: #FFFFFF;">添加收款账户</text>
			</view>
		</view>
		<view v-if="showAdd" style="margin-top: 40rpx;">
			<uv-cell-group :border="false">
				<view v-for="(item,index) in data" :key="index" style="width: 690rpx;height: 104rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;margin-bottom:20rpx;">
					<uv-cell :border="false">
						<template v-slot:title>
							<text class="cell-title-text">{{item.title}}</text>
						</template>
						<template v-slot:value>
							<input v-if="index === 0||index===1||index===3" style="text-align: right;" type="text" :placeholder="item.placeholder" v-model="item.value"/>
							<view v-if="index === 2">
								<picker :range="bankList" range-key="name"  @change="(event) => onSelectChange1(event, item)" mode="selector" :value="item.value">
									<input type="text" :placeholder="item.placeholder" style="text-align: right;" disabled v-model="item.value" />
								</picker>
							</view>
						</template>
					</uv-cell>
				</view>
			</uv-cell-group>
		</view>
		<view v-if="data.length !== 0&&!showAdd">
			<view style="margin-top: 78rpx;width: 690rpx;background: #FFFFFF;border-radius: 20rpx 20rpx 20rpx 20rpx;display: flex;flex-direction: column;align-items: center;padding:40rpx 0;">
				<view style="width: 500rpx;height: 500rpx;border-radius: 20rpx 20rpx 20rpx 20rpx;border: 2rpx solid #EEEEEE;padding: 20rpx;">
					<image src="" mode="aspectFill" style="height: 100%;width: 100%;border: 1rpx solid rebeccapurple;border-radius: 20rpx;"></image>
				</view>
				<text style="margin-top: 20rpx;opacity: 0.5;font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 26rpx;color: #1F1F1F;">—— 专属收款码 ——</text>
			</view>
			
			<view style="margin-top: 20rpx;width: 690rpx;height: 96rpx;background: #FFFFFF;border-radius: 20rpx;display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
				<view style="display: flex;align-items: center;gap:8rpx">
					<view style="width: 88rpx;height: 46rpx;background: #FFF8EF;border-radius: 24rpx 24rpx 24rpx 24rpx;display: flex;align-items: center;justify-content: center;">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #ED784B;">收款人</text>
					</view>
					<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 26rpx;color: #1F1F1F;">{{data[0].value}}</text>
				</view>
				<view style="display: flex;align-items: center;gap:8rpx">
					<view style="width: 112rpx;height: 46rpx;background: #EFFFF3;border-radius: 24rpx 24rpx 24rpx 24rpx;display: flex;align-items: center;justify-content: center;">
						<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #41AF6F;">收款账户</text>
					</view>
					<text style="font-family: PingFang SC, PingFang SC;font-weight: 400;font-size: 26rpx;color: #1F1F1F;">{{data[2].value}}{{data[1].value}}</text>
				</view>
				<view @click="edit" style="border-left: 2rpx solid #EEEEEE;display: flex;justify-content: center;align-items: center;padding-left: 16rpx;">
					<image src="https://www.xzxskj.com/xcximg/edit.png" mode="aspectFill" style="height: 40rpx;width: 40rpx;"></image>
				</view>
			</view>
		</view>
		
		<view v-if="showAdd" class="select-btn">
			<view class="confim-btn button-animation" @click="confirm">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'
import { apiSearchCard,apiAccountAdd,apiAccountList,apiSearchBank } from '../api/payAccountApi.js'
import { onMounted } from 'vue';
const searchModelKey = ref('whlnam');
const showModelField = ref('whlnam');
const id = ref('')
const showAdd = ref(false)
const data = ref([])
const edit = () =>{
	showAdd.value = true
}
const addAccount = ()=>{
	showAdd.value = true
	data.value = [
		{title:'收款姓名',placeholder:'请输入银行卡实名姓名',values:[],value:''},
		{title:'银行卡号',placeholder:'请输入',values:[],value:''},
		{title:'所属银行',placeholder:'请选择',values:[],value:''},
		// {title:'开户银行',placeholder:'请选择',values:[],value:''},
		{title:'银行预留电话',placeholder:'请输入',values:[],value:''},
	]
}
const confirm = async () => {
    for (const item of data.value) {
        if (!item.value) {
            uni.showToast({
                title: `${item.title} 不能为空`,
                icon: 'none'
            });
            return;
        }
    }

    const phoneRegex = /^1[3-9]\d{9}$/; 
    if (!phoneRegex.test(data.value[3].value)) { 
        uni.showToast({
            title: '银行预留电话格式不正确',
            icon: 'none'
        });
        return;
    }

    await apiAccountAddAc();
};


const apiSearchCardAc =async (name)=>{
	const data = {
		search:name//绵阳 工商
	}
	const res = await apiSearchCard(data)
	console.log('res:',res)
	if(res.code === 200){
		data.value[3].values = res.lists
	}
}

const apiAccountAddAc = async () => {
    const dataToSend = {
        id: id.value,
        name: data.value[0].value, // 收款姓名
        yhkh: data.value[1].value, // 银行卡号
        khyh: data.value[2].value,  // 所属银行
        khyhfh: '', // 开户银行
        ylsjhm: data.value[3].value, // 银行预留电话
        opid: uni.getStorageSync('sessionInfo').opid,
    };

    const res = await apiAccountAdd(dataToSend);
    console.log('res:', res);
    if (res.code === 200) {
        uni.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 500
        });
		showAdd.value = false
    }
};

const apiAccountListAc =async () =>{
	const data = {
		opid:uni.getStorageSync('sessionInfo').opid
	}
	const res = await apiAccountList(data)
	if(res.code === 200){
		return res.lists;
	}else{
		return []
	}
}
const getData = (list) => {
    console.log('获取到的账户列表:', list); 
    if (list.length === 0) {
        console.log('没有获取到账户数据');
        return;
    }
    id.value = list[0]?.id || ''; 
    data.value = [
        {
            title: '收款姓名',
            placeholder: '请输入银行卡实名姓名',
            values: [],
            value: list[0]?.name || ''
        },
        {
            title: '银行卡号',
            placeholder: '请输入',
            values: [],
            value: list[0]?.code || ''
        },
        {
            title: '所属银行',
            placeholder: '请选择',
            values: [],
            value: list[0]?.yhmc || ''
        },
        {
            title: '银行预留电话',
            placeholder: '请输入',
            values: [],
            value: list[0]?.ylsjhm || ''
        }
    ];
    console.log('处理后的数据:', data.value);
};
const bankList = ref([])
const apiSearchBankAc = async() =>{
	const res = await apiSearchBank()
	console.log("res：",res)
	if(res.code === 200){
		console.log('data',data.value)
		bankList.value = res.lists
	
	}
}
const onSelectChange1 = (e,item) =>{
	console.log(e)
	item.value = bankList.value[parseInt(e.detail.value)].name 
}
const selectChange = (e,item)=>{
	console.log(e);
	if(e){
		item.value = e.whlnam
	}
}
const handleInput = async (inputText,item) => {
    if (inputText.length > 0) {
        console.log('inputText', inputText);
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        try {
            const res = await apiSearchCardAc(inputText);
			console.log('res：',res)
			if(res.zt === 200){
				item.values = res.lists
				item.values = [ ...item.values]
			}
        } catch (error) {
            console.error('请求失败:', error);
            uni.showToast({
                title: '请求失败，请重试',
                icon: 'none'
            });
        } finally {
            uni.hideLoading();
        }
    }
};

onMounted(async () => {
	const list = await apiAccountListAc();
	getData(list)
    await apiSearchBankAc()
});

</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.layout{
	min-height: 100vh;
	background: #F3F2F6;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.cell-title-text{
	font-family: PingFang SC, PingFang SC;
	font-weight: 400;
	font-size: 28rpx;
	color: #1F1F1F;
}
.select-btn {
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
	padding-top: 24rpx;
	.confim-btn {
		width: 710rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #ff6d0c 0%, #eb4636 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 62rpx;
		text {
			height: 42rpx;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}

</style>