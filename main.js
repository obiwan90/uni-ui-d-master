import App from './App';
import uvUI from '@/uni_modules/uv-ui-tools';
import { shareMixin } from './utils/mixin'; // 引入 mixin

// #ifndef VUE3
import Vue from 'vue';
import './uni.promisify.adaptor';
Vue.use(uvUI);
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  mixins: [shareMixin], // 使用 mixin
  ...App
});

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';


export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.use(uvUI);
  app.mixin(shareMixin); // 使用 mixin

  return {
    app,
    Pinia
  };
}

// #endif

// #ifdef H5
RouterMount(app, '#app'); // H5平台使用RouterMount
// #endif

// #ifdef H5
app.$mount(); // 挂载 H5 应用
// #endif
