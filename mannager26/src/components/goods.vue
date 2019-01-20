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
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model="pageData.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-button type="success" plain>搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格的样式 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="700"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
      <el-table-column prop="goods_number" label="商品重量" width="70"></el-table-column>
      <el-table-column prop="upd_time" label="创建时间" width="300">
        <template slot-scope="scope">{{scope.row.upd_time|newTime}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
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
      goodsList: []
    };
  },
  //在实例创建之后调用接口
  async created() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      let res = await this.$axios.get("goods", {
        params: this.pageData
      });
      console.log(res);
      this.total = res.data.data.total;
      this.goodsList = res.data.data.goods;
    },
    handleSizeChange(pagesize){
      this.pageData.pagesize = pagesize;
      this.pageData.pagenum = 1;
      this.getGoods();
    },
    handleCurrentChange(pagenum){
      this.pageData.pagenum = pagenum;
      this.getGoods();
    }
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