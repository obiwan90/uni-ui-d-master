"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvCalendars_components_uvCalendars_util = require("./util.js");
const uni_modules_uvCalendars_components_uvCalendars_i18n_index = require("./i18n/index.js");
const calendarBody = () => "./calendar-body.js";
const { t } = common_vendor.initVueI18n(uni_modules_uvCalendars_components_uvCalendars_i18n_index.i18nMessages);
const _sfc_main = {
  components: {
    calendarBody
  },
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  emits: ["close", "confirm", "change", "monthSwitch"],
  props: {
    // 取消按钮颜色
    cancelColor: {
      type: String,
      default: ""
    },
    // 确认按钮颜色，range模式下未选全显示灰色
    confirmColor: {
      type: String,
      default: "#3c9cff"
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 主题色
    color: {
      type: String,
      default: "#3c9cff"
    },
    // 默认显示日期
    date: {
      type: [String, Array],
      default: ""
    },
    // 打点等设置
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示农历
    lunar: {
      type: Boolean,
      default: false
    },
    // 可选择的起始日期
    startDate: {
      type: String,
      default: ""
    },
    // 可选择的结束日期
    endDate: {
      type: String,
      default: ""
    },
    // multiple - 选择多日期  range - 选择日期范围
    mode: {
      type: String,
      default: ""
    },
    // 是否插入模式
    insert: {
      type: Boolean,
      default: false
    },
    // 是否显示月份为背景
    showMonth: {
      type: Boolean,
      default: true
    },
    // 弹窗模式是否清空上次选择内容
    clearDate: {
      type: Boolean,
      default: true
    },
    // 弹窗圆角
    round: {
      type: [Number, String],
      default: 8
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // range为true时，第一个日期底部的提示文字
    startText: {
      type: String,
      default: "开始"
    },
    // range为true时，最后一个日期底部的提示文字
    endText: {
      type: String,
      default: "结束"
    },
    // 是否允许日期范围的起止时间为同一天，mode = range时有效
    allowSameDay: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    readonly: {
      type: Boolean,
      default: false
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.calendars
  },
  data() {
    return {
      weeks: [],
      calendar: {},
      nowDate: "",
      allowConfirm: false,
      multiple: false,
      range: false
    };
  },
  computed: {
    /**
     * for i18n
     */
    confirmText() {
      return t("uv-calender.ok");
    },
    cancelText() {
      return t("uv-calender.cancel");
    },
    getConfirmColor() {
      if (this.range || this.multiple || this.readonly) {
        return this.allowConfirm ? this.confirmColor : "#999";
      } else {
        return this.confirmColor;
      }
    }
  },
  watch: {
    date(newVal) {
      this.init(newVal);
    },
    startDate(val) {
      this.cale.resetSatrtDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    endDate(val) {
      this.cale.resetEndDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    selected(newVal) {
      this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
      this.weeks = this.cale.weeks;
    }
  },
  created() {
    this.setMode();
    this.cale = new uni_modules_uvCalendars_components_uvCalendars_util.Calendar({
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range,
      multiple: this.multiple,
      allowSameDay: this.allowSameDay
    });
    this.init(this.date);
  },
  methods: {
    setMode() {
      switch (this.mode) {
        case "range":
          this.range = true;
          break;
        case "multiple":
          this.multiple = true;
      }
    },
    async open() {
      if (this.clearDate && !this.insert) {
        this.cale.cleanRangeStatus();
        this.init(this.date);
      }
      if (!this.insert) {
        this.$refs.popup.open();
      }
    },
    close() {
      this.$refs.popup.close();
      this.$emit("close");
    },
    confirm() {
      if (this.readonly) {
        return;
      } else if (this.range && !this.cale.rangeStatus.after) {
        return;
      } else if (this.multiple && this.cale.multipleStatus.data.length == 0) {
        return;
      }
      this.setEmit("confirm");
      this.close();
    },
    maskClick() {
      if (this.closeOnClickOverlay) {
        this.$emit("close");
      }
    },
    bindDateChange(e) {
      const value = e.detail.value + "-1";
      this.setDate(value);
      const { year, month } = this.cale.getDate(value);
      this.$emit("monthSwitch", {
        year,
        month
      });
    },
    /**
     * 初始化日期显示
     * @param {Object} date
     */
    init(date) {
      if (this.range) {
        this.cale.cleanRangeStatus();
      } else if (this.multiple) {
        this.cale.cleanMultipleStatus();
      }
      this.cale.setDate(date, "init");
      this.weeks = this.cale.weeks;
      this.nowDate = this.calendar = this.cale.getInfo(date);
      this.changeConfirmStatus();
    },
    /**
     * 变化触发
     */
    change() {
      this.changeConfirmStatus();
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    changeConfirmStatus() {
      if (this.readonly) {
        this.allowConfirm = false;
      } else if (this.range) {
        this.allowConfirm = this.cale.rangeStatus.after ? true : false;
      } else if (this.multiple) {
        this.allowConfirm = this.cale.multipleStatus.data.length > 0 ? true : false;
      }
    },
    /**
     * 选择月份触发
     */
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month)
      });
    },
    /**
     * 派发事件
     * @param {Object} name
     */
    setEmit(name) {
      let {
        year,
        month,
        date,
        fullDate,
        lunar,
        extraInfo
      } = this.calendar;
      this.$emit(name, {
        range: this.cale.rangeStatus,
        multiple: this.cale.multipleStatus,
        year,
        month,
        date,
        fulldate: fullDate,
        lunar,
        extraInfo: extraInfo || {}
      });
    },
    /**
     * 选择天触发
     * @param {Object} weeks
     */
    choiceDate(weeks) {
      if (weeks.disable || this.readonly)
        return;
      this.calendar = weeks;
      this.cale.setRange(this.calendar.fullDate);
      this.cale.setMultiple(this.calendar.fullDate);
      this.weeks = this.cale.weeks;
      this.change();
    },
    /**
     * 回到今天
     */
    backToday() {
      const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`;
      const date = this.cale.getDate(/* @__PURE__ */ new Date());
      const todayYearMonth = `${date.year}-${date.month}`;
      this.init(date.fullDate);
      if (nowYearMonth !== todayYearMonth) {
        this.monthSwitch();
      }
      this.change();
    },
    /**
     * 上个月
     */
    pre() {
      const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
      this.setDate(preDate);
      this.monthSwitch();
    },
    /**
     * 下个月
     */
    next() {
      const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
      this.setDate(nextDate);
      this.monthSwitch();
    },
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.cale.setDate(date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(date);
    }
  }
};
if (!Array) {
  const _component_calendar_body = common_vendor.resolveComponent("calendar-body");
  const _easycom_uv_toolbar2 = common_vendor.resolveComponent("uv-toolbar");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_component_calendar_body + _easycom_uv_toolbar2 + _easycom_uv_popup2)();
}
const _easycom_uv_toolbar = () => "../../../uv-toolbar/components/uv-toolbar/uv-toolbar.js";
const _easycom_uv_popup = () => "../../../uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_toolbar + _easycom_uv_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.insert
  }, $props.insert ? {
    b: common_vendor.o($options.bindDateChange),
    c: common_vendor.o($options.pre),
    d: common_vendor.o($options.next),
    e: common_vendor.o($options.backToday),
    f: common_vendor.o($options.choiceDate),
    g: common_vendor.p({
      date: $props.date,
      nowDate: $data.nowDate,
      weeks: $data.weeks,
      calendar: $data.calendar,
      selected: $props.selected,
      lunar: $props.lunar,
      showMonth: $props.showMonth,
      color: $props.color,
      startText: $props.startText,
      endText: $props.endText,
      range: $data.range,
      multiple: $data.multiple,
      allowSameDay: $props.allowSameDay
    })
  } : {
    h: common_vendor.o($options.close),
    i: common_vendor.o($options.confirm),
    j: common_vendor.p({
      show: true,
      cancelColor: $props.cancelColor,
      confirmColor: $options.getConfirmColor,
      cancelText: $options.cancelText,
      confirmText: $options.confirmText,
      title: $props.title
    }),
    k: common_vendor.o($options.bindDateChange),
    l: common_vendor.o($options.pre),
    m: common_vendor.o($options.next),
    n: common_vendor.o($options.backToday),
    o: common_vendor.o($options.choiceDate),
    p: common_vendor.p({
      nowDate: $data.nowDate,
      weeks: $data.weeks,
      calendar: $data.calendar,
      selected: $props.selected,
      lunar: $props.lunar,
      showMonth: $props.showMonth,
      color: $props.color,
      startText: $props.startText,
      endText: $props.endText,
      range: $data.range,
      multiple: $data.multiple,
      allowSameDay: $props.allowSameDay
    }),
    q: common_vendor.sr("popup", "4990eb9c-1"),
    r: common_vendor.o($options.maskClick),
    s: common_vendor.p({
      mode: "bottom",
      round: $props.round,
      ["z-index"]: "998",
      ["close-on-click-overlay"]: $props.closeOnClickOverlay
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4990eb9c"]]);
wx.createComponent(Component);
