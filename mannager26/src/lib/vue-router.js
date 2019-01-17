//引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引入登录页的路由组件
import login from '../components/login.vue';
import main from '../components/main.vue';
//引入主页右边主体部分的路由组件
import users from '../components/users.vue';

//配置路由规则
let routes = [{
    //登录页
        path: '/login',
        component: login
    },
    {
        //主页
        path: '/',
        component: main,
        children: [{
            path: 'users',
            component: users        }]
    },

]

let router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
//注册导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    next()
    //如果去的是登录页的话就不需要带上token
    if(to.path==='/login'){

    }else{
         let token = window.sessionStorage.getItem('token');
         if(token){
             //如果有值的话就说明有token,就允许登录,如果没值的话就打回登录页
             next()
         }else{
           
            Vue.prototype.$message.error('请先登录');
            next('/login')
         }
    }
   
  })
//暴露出去
export default router;