"use strict";
const uni_modules_uvUiTools_libs_function_colorGradient = require("../../../uv-ui-tools/libs/function/colorGradient.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvCalendars_components_uvCalendars_i18n_index = require("./i18n/index.js");
const { t } = common_vendor.initVueI18n(uni_modules_uvCalendars_components_uvCalendars_i18n_index.i18nMessages);
const _sfc_main = {
  emits: ["change"],
  props: {
    weeks: {
      type: Object,
      default() {
        return {};
      }
    },
    calendar: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#3c9cff"
    },
    range: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    todayText() {
      return t("uv-calender.today");
    },
    itemBoxStyle() {
      const style = {};
      if (this.multiple) {
        if (this.weeks.multiple) {
          style.backgroundColor = this.color;
          style.color = "#fff";
        } else if (this.weeks.isDay) {
          style.color = this.color;
        }
      } else if (this.range) {
        if (this.weeks.beforeRange || this.weeks.afterRange) {
          style.backgroundColor = this.color;
        } else if (this.weeks.range) {
          style.backgroundColor = uni_modules_uvUiTools_libs_function_colorGradient.colorGradient(this.color, "#ffffff", 100)[90];
          style.color = this.color;
          style.opacity = 0.8;
          style.borderRadius = 0;
        }
      } else {
        if (this.weeks.isDay) {
          style.color = this.color;
        }
        if (this.calendar.fullDate === this.weeks.fullDate) {
          style.backgroundColor = this.color;
          style.color = "#fff";
        }
      }
      return style;
    },
    infoStyle(val) {
      return (val2) => {
        const style = {};
        if (!this.weeks.multiple) {
          if (val2 == "top") {
            style.color = this.weeks.extraInfo.topinfoColor ? this.weeks.extraInfo.topinfoColor : "#606266";
          } else if (val2 == "bottom") {
            style.color = this.weeks.extraInfo.infoColor ? this.weeks.extraInfo.infoColor : "#f56c6c";
          }
          if (this.weeks.range) {
            style.color = this.color;
          }
          if (this.calendar.fullDate === this.weeks.fullDate || this.weeks.beforeRange || this.weeks.afterRange) {
            style.color = this.multiple ? style.color : "#fff";
          }
        } else {
          style.color = "#fff";
        }
        return style;
      };
    }
  },
  methods: {
    choiceDate(weeks) {
      if (this.weeks.extraInfo && this.weeks.extraInfo.disable)
        return;
      this.$emit("change", weeks);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.selected && $props.weeks.extraInfo && $props.weeks.extraInfo.badge
  }, $props.selected && $props.weeks.extraInfo && $props.weeks.extraInfo.badge ? {} : {}, {
    b: $props.weeks.extraInfo && $props.weeks.extraInfo.topinfo
  }, $props.weeks.extraInfo && $props.weeks.extraInfo.topinfo ? {
    c: common_vendor.t($props.weeks.extraInfo && $props.weeks.extraInfo.topinfo),
    d: common_vendor.s($options.infoStyle("top"))
  } : {}, {
    e: common_vendor.t($props.weeks.date),
    f: $props.weeks.isDay ? 1 : "",
    g: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple ? 1 : "",
    h: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple ? 1 : "",
    i: $props.weeks.beforeRange ? 1 : "",
    j: $props.weeks.range ? 1 : "",
    k: $props.weeks.afterRange ? 1 : "",
    l: $props.weeks.multiple ? 1 : "",
    m: $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable ? 1 : "",
    n: common_vendor.s($options.itemBoxStyle),
    o: !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay
  }, !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay ? {
    p: common_vendor.t($options.todayText),
    q: $props.weeks.isDay ? 1 : "",
    r: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple ? 1 : "",
    s: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple ? 1 : "",
    t: $props.weeks.beforeRange ? 1 : "",
    v: $props.weeks.range ? 1 : "",
    w: $props.weeks.afterRange ? 1 : "",
    x: $props.weeks.multiple ? 1 : "",
    y: common_vendor.s($options.itemBoxStyle)
  } : {}, {
    z: $props.lunar && !$props.weeks.extraInfo
  }, $props.lunar && !$props.weeks.extraInfo ? {
    A: common_vendor.t($props.weeks.isDay ? $options.todayText : $props.weeks.lunar.IDayCn === "初一" ? $props.weeks.lunar.IMonthCn : $props.weeks.lunar.IDayCn),
    B: $props.weeks.isDay ? 1 : "",
    C: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple ? 1 : "",
    D: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple ? 1 : "",
    E: $props.weeks.beforeRange ? 1 : "",
    F: $props.weeks.range ? 1 : "",
    G: $props.weeks.afterRange ? 1 : "",
    H: $props.weeks.multiple ? 1 : "",
    I: $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable ? 1 : "",
    J: common_vendor.s($options.itemBoxStyle)
  } : {}, {
    K: $props.weeks.extraInfo && $props.weeks.extraInfo.info
  }, $props.weeks.extraInfo && $props.weeks.extraInfo.info ? {
    L: common_vendor.t($props.weeks.extraInfo.info),
    M: $props.weeks.dateEqual ? 1 : "",
    N: common_vendor.s($options.infoStyle("bottom"))
  } : {}, {
    O: $props.weeks.disable || $props.weeks.extraInfo && $props.weeks.extraInfo.disable ? 1 : "",
    P: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay && !$props.multiple ? 1 : "",
    Q: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay && !$props.multiple ? 1 : "",
    R: $props.weeks.beforeRange ? 1 : "",
    S: $props.weeks.range ? 1 : "",
    T: $props.weeks.afterRange ? 1 : "",
    U: $props.weeks.multiple ? 1 : "",
    V: common_vendor.s($options.itemBoxStyle),
    W: common_vendor.o(($event) => $options.choiceDate($props.weeks))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-68116d39"]]);
wx.createComponent(Component);
