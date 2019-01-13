<template>
    <div>
          <el-button @click="logoOut" type="danger">退出</el-button>
        main
    </div>
</template>
<script>
export default {
    //在vue实例创建之前查看是有token
    beforeCreate() {
        //如果有token的话就说明已登录,
       if( window.sessionStorage.getItem('token')){
        //    alert('1')
       }else{
           //没有的话就提示用户并打回到登录页
           this.$message.error('请登录');
           this.$router.push('login')
       }
    },
    methods:{
        logoOut(){
            window.sessionStorage.removeItem('token');
            this.$router.push('login')
        }
    }
}
</script>
<style lang="">
    
</style>