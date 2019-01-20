
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
//导入自己的全局面包屑导航
import myBreadcrumb from './components/myBreadcrumb.vue';
//导入moment 插件
import moment from 'moment';
//导入echart插件
import echarts from 'echarts'

//定义一个全局的过滤器
Vue.filter('newTime', function (value) {
    return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
})
Vue.component('myBreadcrumb', myBreadcrumb)
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
