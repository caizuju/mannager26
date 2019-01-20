<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <myBreadcrumb :leavl2="leavl2" :leavl3="leavl3"></myBreadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框的样式 -->
    <!-- 表格的样式 -->
    <el-table :data="rightsList" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限管理" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="300"></el-table-column>
      <el-table-column prop="mobile" label="层级" width="180">
         <template slot-scope="scope">
          <span v-if="scope.row.level=== '0'" active-color="#13ce66" inactive-color="#ff4949">一级</span>
          <span v-if="scope.row.level=== '1'" active-color="#13ce66" inactive-color="#ff4949">二级</span>
          <span v-if="scope.row.level=== '2'" active-color="#13ce66" inactive-color="#ff4949">三级</span>
        </template>
      </el-table-column>
   
      
    </el-table>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      leavl2: "权限管理",
      leavl3: "权限列表",
     
  
      //用户信息的列表
      rightsList: []
    };
  },
  //在实例创建之后调用接口
 async created() {
   let res = await this.$axios.get('rights/list');
  //  console.log(res);
   this.rightsList = res.data.data;

  }
};
</script>
<style scope>
.bg-purple-dark {
  background: #99a9bf;
}
/* 顶部面包屑的样式 */
.el-breadcrumb {
  height: 45px;
  line-height: 45px;
}
/*  */
</style>