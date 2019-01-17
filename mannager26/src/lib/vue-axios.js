//引入axios
import axios from 'axios';
//引入elementUI的message部分插件
import { Message } from 'element-ui'
//设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
//使用axios的拦截器
//再请求发出去之前,设置一个token,这样子就可以使每次请求自动携带token,
//携带token的要求:除了登录页其他的都要携带
//在请求响应回来之后,根据状态码来判断然后提示信息
axios.interceptors.request.use((config)=> {
    // Do something before request is sent
    // console.log(config);
    if (config.url.indexOf('/login')!=-1) {
        //如果不等于-1说明就是login,就不用携带token
    }else{
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  //请求响应回来
  axios.interceptors.response.use( (response)=> {
    // Do something with response data
    // console.log(response);
    //根据请求回来的状态码提示用户信息
    if (response.data.meta.status===200) {
        Message.success(response.data.meta.msg)
    }else if(response.data.meta.status===400){
        Message.error(response.data.meta.msg)
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
//暴露出去
export default{
    install(Vue){
        Vue.prototype.$axios = axios;
    }
}