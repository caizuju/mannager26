//引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引入登录页的路由组件
import login from '../components/login.vue';
import main from '../components/main.vue';
//引入主页右边主体部分的路由组件
import users from '../components/users.vue';
//引入角色列表的路由组件
import roles from '../components/roles.vue';
//引入权限列表的路由组件
import rights from '../components/rights.vue';
//引入商品列表的路由组件
import goods from '../components/goods.vue'
//引入数据图表页面的路由组件
import reports from '../components/reports.vue';
//引入分类参数的路由组件
import params from '../components/params.vue'
//引入商品分类的路由组件
import categories from '../components/categories.vue';
//引入订单列表的路由组件
import orders from '../components/orders.vue'

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
            //用户列表
            path: 'users',
            component: users        },
            //角色列表
            {
                path: 'roles',
                component: roles  
            },
            //权限列表
            {
                path :'rights',
                component:rights
            },
            //商品列表
            {
                path :'goods',
                component:goods
            },
            {
                path :'params',
                component:params
            },
            //数据图表
            {
                path:'reports',
                component:reports
            },
            //商品分类
            {
                path:'categories',
                component:categories
            },
                //订单列表
            {
                path:'orders',
                component:orders
            },
        
        ]
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