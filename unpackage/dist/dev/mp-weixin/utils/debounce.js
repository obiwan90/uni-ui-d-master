"use strict";
function debounce(func, wait = 500, immediate = false) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
exports.debounce = debounce;
