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
    <!-- 警告框 -->
    <el-row>
      <el-col :span="24">
        <el-alert title="注意:只允许为第三方分类设置相关参数" type="warning" class="mt" show-icon></el-alert>
      </el-col>
    </el-row>
    <!-- 选择商品分类框 -->
    <el-row>
      <el-col>
        <span>请选择商品分类:&nbsp;&nbsp;</span>
        <el-cascader
          expand-trigger="hover"
          :options="paramsList"
          v-model="selectedOptions2"
          @change="handleChange"
          :props = 'props'
          class="mt"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- 动态参数 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="dynamic">
        <el-button type="primary">添加动态参数</el-button>
        <el-table :data="userList" border style="width: 100%">
          <el-table-column  width="80"></el-table-column>
          <el-table-column type="index" label="#" width="80"></el-table-column>
          <el-table-column type="index" label="商品参数" width="180"></el-table-column>
          <el-table-column type="index" label="操作" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态管理" name="static">
        <el-button type="primary">添加静态参数</el-button>
        <el-table :data="userList" border style="width: 100%">
        
          <el-table-column type="index" label="#" width="80"></el-table-column>
          <el-table-column type="index" label="属性名称" width="80"></el-table-column>
          <el-table-column type="index" label="属性值" width="180"></el-table-column>
            <el-table-column type="index" label = "操作" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leavl2: "商品管理",
      leavl3: "分类参数",
      //动态参数切换栏的数据
      activeName: "dynamic",
      //级联选择器里面的参数
      paramsList:[],
      //别名
      props:{
        value:'cat_id',
        label:'cat_name'

      }
    };
  },
  //在实例创建之后调用接口
  async created() {
 
    let res = await this.$axios.get("categories?type=3");
    console.log(res);
    this.paramsList = res.data.data;
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
.el-tag {
  margin: 5px;
}
</style>