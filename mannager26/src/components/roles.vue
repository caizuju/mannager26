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
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-button type="success" plain>添加角色</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格的样式 -->
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column width="80" type="expand">
        <template slot-scope="props">
          <el-row v-for="(item, index) in props.row.children" :key="item.id">
            <el-col :span="4">
              <el-tag closable>{{item.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(leval2, index) in item.children" :key="leval2.id">
                <el-col :span="4">
                  <el-tag type="success" closable>{{leval2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="(leval3, index) in leval2.children"
                    type="warning"
                    :key="leval3.id"
                  >{{leval3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色姓名" width="400"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="warning" icon="el-icon-check" size="mini" plain></el-button>
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
      leavl3: "角色列表",

      //角色信息的列表
      rolesList: []
    };
  },
  //在实例创建之后调用接口
  async created() {
    // this.$axios
    //   .get("users", {
    //     params: this.pageData
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.userList = res.data.data.users;
    //     this.total = res.data.data.total;
    //   });
    let res = await this.$axios.get("roles");
    console.log(res);
    this.rolesList = res.data.data;
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
.el-tag{
    margin: 5px;
}
</style>