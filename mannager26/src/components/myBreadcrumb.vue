<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{leavl2}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{leavl3}}</el-breadcrumb-item>
  
  </el-breadcrumb>
</template>
<script>
export default {
     props: ['leavl2','leavl3'],
};
</script>
<style >
</style>