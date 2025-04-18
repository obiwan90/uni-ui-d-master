"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvCalendars_components_uvCalendars_i18n_index = require("./i18n/index.js");
const CalendarItem = () => "./calendar-item.js";
const { t } = common_vendor.initVueI18n(uni_modules_uvCalendars_components_uvCalendars_i18n_index.i18nMessages);
const _sfc_main = {
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  components: {
    CalendarItem
  },
  props: {
    date: {
      type: [String, Array],
      default: ""
    },
    nowDate: {
      type: [String, Object],
      default: ""
    },
    weeks: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    calendar: {
      type: Object,
      default() {
        return {};
      }
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    },
    showMonth: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#3c9cff"
    },
    startText: {
      type: String,
      default: "开始"
    },
    endText: {
      type: String,
      default: "结束"
    },
    range: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否允许日期范围的起止时间为同一天，mode = range时有效
    allowSameDay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getDate() {
      return Array.isArray(this.date) ? this.date[0] : this.date;
    },
    /**
     * for i18n
     */
    todayText() {
      return t("uv-calender.today");
    },
    monText() {
      return t("uv-calender.MON");
    },
    TUEText() {
      return t("uv-calender.TUE");
    },
    WEDText() {
      return t("uv-calender.WED");
    },
    THUText() {
      return t("uv-calender.THU");
    },
    FRIText() {
      return t("uv-calender.FRI");
    },
    SATText() {
      return t("uv-calender.SAT");
    },
    SUNText() {
      return t("uv-calender.SUN");
    },
    rangeInfoText(weeks) {
      return (weeks2) => {
        var _a, _b;
        if (this.allowSameDay && weeks2.beforeRange && weeks2.afterRange && weeks2.dateEqual) {
          return this.setInfo(weeks2, `${this.startText}/${this.endText}`);
        }
        if (weeks2.beforeRange) {
          return this.setInfo(weeks2, this.startText);
        }
        if (weeks2.afterRange) {
          return this.setInfo(weeks2, this.endText);
        }
        if (((_a = weeks2.extraInfo) == null ? void 0 : _a.info_old) == " ") {
          weeks2.extraInfo.info = null;
        } else if ((_b = weeks2.extraInfo) == null ? void 0 : _b.info_old) {
          weeks2.extraInfo.info = weeks2.extraInfo.info_old;
        }
      };
    }
  },
  methods: {
    setInfo(weeks, text) {
      this.setInfoOld(weeks);
      if (weeks.extraInfo) {
        weeks.extraInfo.info = text;
      } else {
        weeks.extraInfo = {
          info: text
        };
      }
    },
    setInfoOld(weeks) {
      if (weeks.extraInfo) {
        weeks.extraInfo.info_old = weeks.extraInfo.info ? weeks.extraInfo.info_old || weeks.extraInfo.info : " ";
      }
    },
    bindDateChange(e) {
      this.$emit("bindDateChange", e);
    },
    backToday() {
      this.$emit("backToday");
    },
    pre() {
      this.$emit("pre");
    },
    next() {
      this.$emit("next");
    },
    choiceDate(e) {
      this.$emit("choiceDate", e);
    }
  }
};
if (!Array) {
  const _component_calendar_item = common_vendor.resolveComponent("calendar-item");
  _component_calendar_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    b: common_vendor.t(($props.nowDate.year || "") + " / " + ($props.nowDate.month || "")),
    c: $options.getDate,
    d: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    e: common_vendor.o((...args) => $options.next && $options.next(...args)),
    f: common_vendor.t($options.todayText),
    g: common_vendor.o((...args) => $options.backToday && $options.backToday(...args)),
    h: $props.showMonth
  }, $props.showMonth ? {
    i: common_vendor.t($props.nowDate.month)
  } : {}, {
    j: common_vendor.t($options.SUNText),
    k: common_vendor.t($options.monText),
    l: common_vendor.t($options.TUEText),
    m: common_vendor.t($options.WEDText),
    n: common_vendor.t($options.THUText),
    o: common_vendor.t($options.FRIText),
    p: common_vendor.t($options.SATText),
    q: common_vendor.f($props.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "d658b772-0-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              rangeInfoText: $options.rangeInfoText(weeks),
              multiple: $props.multiple,
              range: $props.range,
              calendar: $props.calendar,
              selected: $props.selected,
              lunar: $props.lunar,
              color: $props.color
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d658b772"]]);
wx.createComponent(Component);
