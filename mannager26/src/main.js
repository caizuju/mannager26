
import Vue from 'vue';
import App from './App.vue';
//引入饿了么UI
import ElementUI from 'element-ui';
//引入饿了么UI的css
import 'element-ui/lib/theme-chalk/index.css';
//引入公共的样式
import './assets/bese.css';
//导入自己封装的axios的插件
import VueAxios from './lib/vue-axios';
//引入自己抽取的路由组件
import router from './lib/vue-router';
//使用插件
Vue.use(VueAxios);
//使用饿了么UI
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
