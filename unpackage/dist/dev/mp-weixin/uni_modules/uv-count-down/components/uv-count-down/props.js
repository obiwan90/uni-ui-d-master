"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 倒计时时长，单位ms
    time: {
      type: [String, Number],
      default: 0
    },
    // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
    format: {
      type: String,
      default: "HH:mm:ss"
    },
    // 是否自动开始倒计时
    autoStart: {
      type: Boolean,
      default: true
    },
    // 是否展示毫秒倒计时
    millisecond: {
      type: Boolean,
      default: false
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.countDown
  }
};
exports.props = props;
