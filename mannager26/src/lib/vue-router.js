//引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引入登录页的路由组件
import login from '../components/login.vue';
import main from '../components/main.vue';

//配置路由规则
let routes = [{
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: main
    },

]
let router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
//暴露出去
export default router;
    
