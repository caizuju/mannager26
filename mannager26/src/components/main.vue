<template>
  <div class="main-container">
    <el-container>
      <!-- <myBreadcrumb leavl2='牛逼' leavl3='真牛逼'></myBreadcrumb> -->
      <el-header>
   
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img
                src="../../static/logo.png"
                class="logo"
                alt=""
              >
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              电商后台管理系统
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button
                @click="logoOut"
                type="danger"
                class="logoOut"
              >退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左边的侧边栏 -->
        <el-aside width="201px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu v-for="(item, index) in menusList" :key="item.id" :index="item.order+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>          
                <el-menu-item v-for="(it, i) in item.children" :key="it.id" :index="'/'+it.path">
                  <i class="el-icon-menu"></i>
                  {{it.authName}}</el-menu-item>             
            </el-submenu>     
          </el-menu>
        </el-aside>
        <!-- 左边的侧边栏结束 -->
        <!-- 右边的主体部分 -->
        <el-main>
          <!-- 渲染嵌套路由匹配的组件 -->
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
export default {
  data (){
    return {
      //左边权限的数组
      menusList :[]
    }
  },
  //在vue实例创建之前查看是有token
  beforeCreate() {
    //如果有token的话就说明已登录,
    if (window.sessionStorage.getItem("token")) {
      //    alert('1')
    } else {
      //没有的话就提示用户并打回到登录页
      this.$message.error("请登录");
      this.$router.push("login");
    }
  },
  methods: {
    logoOut() {
      //点击之后弹出确认框
     
        this.$confirm('是否要退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           window.sessionStorage.removeItem("token");
           this.$router.push("login");
          this.$message({
            type: 'success',
            message: '退出成功'
            
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      
     
      
    },
   
  
  },
  //在vue实例创建之后请求侧边栏的列表数据然后再页面上循环渲染出来
  created() {
    this.$axios.get('menus').then(res=>{
      console.log(res);
      this.menusList = res.data.data;
    })
  },
};
</script>
<style lang="scss"  scoped>
.main-container {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: relative;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  //   line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
   padding-top: 0;
  // text-align: center;
  // line-height: 160px;
}
//折叠菜单的样式
.el-menu{
  text-align: left;
}
</style>