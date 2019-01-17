<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <myBreadcrumb
            :leavl2="leavl2"
            :leavl3="leavl3"
          ></myBreadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索框的样式 -->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="pageData.query"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-button
            type="success"
            plain
          >搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格的样式 -->
    <el-table
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="180"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            size="mini"
            plain
          ></el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leavl2: "用户管理",
      leavl3: "用户列表",
      //表格分页信息
      pageData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //总条数
      total: 0,
      //用户信息的列表
      userList: []
    };
  },
  //在实例创建之后调用接口
  created() {
    this.$axios
      .get("users", {
        params: this.pageData
      })
      .then(res => {
        console.log(res);
        this.userList = res.data.data.users;
        this.total = res.data.data.total;
      });
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