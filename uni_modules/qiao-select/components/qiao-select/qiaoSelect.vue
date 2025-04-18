<template>
  <view class="qiaoSelect" style="" :class="{'ban': disabled}">
    <input 
	id="qSearchInput"
      type="text" 
      class="input" 
	  :class="{'input-border': showBorder, 'input-rightAlign': setRight}"
      @input="watchInput" 
      @focus="focus"
      @blur="blur" 
      :placeholder="phText" 
      :placeholder-style="'color:' + phColor" 
      @tap="open" 
      :disabled="disabled"
      v-model="inputText" 
    />
    <view class="icon" style="display: flex;justify-content: center;align-items: center;">
      <!-- 这里可以添加图标 -->
	  <image v-show="inputText" @click="clickClear" style="height: 40rpx;width: 40rpx;border-radius: 18rpx" src="../../../../static/images/icon/cancel.png" mode="aspectFill"></image>
      <!-- <button @click="clickClear" v-show="inputText" class="clear-btn">清除</button> -->
    </view>
    <view class="select"  v-if="showPopup&&filteredData.length > 0" v-show="popupShow">
      <view class="box">
        <!-- <view style="color: #515151; font-size: 30rpx;" v-if="show&&dataList.length == 0 && filteredData.length == 0">暂无数据</view> -->
		<!-- <view style="color: #515151; font-size: 30rpx;" v-if="dataList.length == 0">暂无数据</view> -->
        <view  @touchstart="touchst" v-for="(item, index) in filteredData" :key="index">
          <view @click.stop="Check(item)" style="text-align: left;" class="li" :class="item.qiaoSelectKey == inputText ? 'blue' : ''">
            {{ item[showField] }}
          </view>
        </view>
      </view>
    </view>
    <view class="popup"  v-if="showPopup" v-show="popupShow" @click="close">
      <view></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    keyId: [Number, String],
    phText: String,
    phColor: {
      type: String,
      default: '#999999',
    },
    searchKey: {
      type: String,
      default: 'name'
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
	setRight:{
		type: Boolean,
		default: false,
	},
    showObj: {
      type: Object,
      default: null,
    },
    showField: {
      type: String,
      default: 'name'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
	show: {
	  type: Boolean,
	  default: true,
	},
	showPopup: {
	  type: Boolean,
	  default: true,
	}
  },
  data() {
    return {
      timer: '', // 定时器
      popupShow: false,
      inputText: '',
      isInput: true, // 是否输入，如果输入开始模糊查询
      filteredData: [], // 过滤后的数据
    };
  },
  watch: {
    dataList: {
      immediate: true,
      handler(val) {
        if (val.length > 0) {
          val.forEach(item => {
            if (item[this.searchKey]) {
              item.qiaoSelectKey = item[this.searchKey].toString();
            } else if (item[this.showField]) {
              item.qiaoSelectKey = item[this.showField].toString();
            }
          });
          this.filteredData = val; // 更新 filteredData
        }else{
          this.filteredData = [];
        }
      }
    },
    showObj: {
      handler(val) {
        if (val) {
          this.inputText = val[this.showField];
          this.$emit('input', [val]);
          this.$emit('change', val);
        } else {
          this.inputText = '';
          this.$emit('input', []);
          this.$emit('change', null);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
	getfocus(){
	uni.createSelectorQuery()
	  .select('#qSearchInput')  // 选择具有ID 'searchInput' 的元素
	  .fields({
		id: true,
		node: true,
		size: true
	  }, (res) => {
		if (res && res.node) {
		  res.node.focus();  // 聚焦input
		}
	  })
	  .exec();
	},
	clearData(){ this.inputText = '';},
    clickClear() {
      // this.inputText = '';
      // this.filteredData = this.dataList;
      // this.$emit('input', []);
      // this.$emit('change', null);
	   this.inputText = '';
		this.filteredData = this.dataList;
		this.$emit('input', []);
		this.$emit('change', null);
		this.close(); // 关闭面板
		// this.$refs.input.blur(); // 手动触发输入框的失去焦点事件
    },
    touchst() {
      if (this.disabled) return;
      this.popupShow = true;
    },
    focus() {
	  // this.inputText = this.inputText.replace(/\s+/g, '');
      this.isInput = false;
    },
    watchInput(e) { // 键盘输入
      this.isInput = true;
      if (this.inputText) {
		// this.inputText = this.inputText.replace(/\s+/g, '');
        this.$emit('input', this.inputText);
      }
      if (this.inputText === '') {
        this.$emit('input', []);
        this.$emit('change', null);
      }
    },
    Check(i) { // 选择选项
      this.inputText = i[this.showField];
      this.isInput = false;
      this.close();
      this.$emit('change', i);
    },
    open() {
      if (this.disabled) return;
      uni.setStorageSync('keyId', this.keyId);
      this.popupShow = true;
    },
    close() { // 关闭
      this.popupShow = false;
    },
    blur() {
		 // this.popupShow = false; 
	  // this.inputText = this.inputText.replace(/\s+/g, '');
      // this.timer = setInterval(() => {
      //   if (this.popupShow && uni.getStorageSync('keyId') != this.keyId) {
      //     this.popupShow = false;
      //   }
      //   setTimeout(() => {
      //     clearInterval(this.timer);
      //   }, 100);
      // }, 200);
    },
  }
};
</script>

<style lang="scss" scoped>
$height: 60rpx;

.ban {
  background: #F7F7F6;
}

.qiaoSelect {
  margin: 0;
  padding: 0;
  position: relative;
  height: $height;
  display: flex;
  align-items: center;
  .img-close {
    margin: 0 10rpx;
  }

  .icon {
    z-index: 99;
    .clear-btn {
      background: transparent;
      border: none;
      font-size: 26rpx;
      color: #999999;
    }
  }

  .input {
    flex: 1;
    border-radius: 10rpx;
    height: $height;
    padding: 0;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    height: 36rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #1F1F1F;
    opacity: 0.6;
  }

  .input-border {
    border: 1rpx solid #ECECEC;
    padding-left: 20rpx;
  }
  .input-rightAlign{
	  text-align: right;
  }
  .select {
    padding: 20rpx;
    color: #515151;
    position: absolute;
    top: 90rpx;
    left: 0;
    right: 0;
    z-index: 100;
    background: #FFFFFF;
    border: 2px #f3f3f3 solid;
    font-size: 30rpx;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
    .box {
      max-height: 300rpx;
      overflow: scroll;
    }

    .li {
      padding: 10rpx 0;
      border-bottom: 2rpx solid #EEEEEE;
    }

    .blue {
      color: #55aaff;
    }
  }

  .select::after {
    width: 0px;
    height: 0px;
    position: absolute;
    bottom: 100%;
    left: 10%;
    padding: 0;
    border: 16rpx solid transparent;
    border-color: transparent transparent #fff transparent;
    content: '';
  }

  .select::before {
    width: 0px;
    height: 0px;
    position: absolute;
    bottom: 100%;
    left: 10%;
    padding: 0;
    border: 20rpx solid transparent;
    border-color: transparent transparent #f3f3f3 transparent;
    transform: translate(-4rpx, 0);
    content: '';
  }

  .popup {
    position: absolute;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    view {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
