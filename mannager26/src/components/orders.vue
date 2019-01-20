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

    <!-- 表格的样式 -->
    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="200"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
      <el-table-column prop label="是否付款" width="100">
        <template scope="prop">
          <el-button v-if="prop.row.order_pay==='0'" type="danger">未付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop label="是否发货" width="100">
        <template scope="prop">
          {{prop.row.is_send=='否'?'否':'是'}}
        </template>
          
      </el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="300">
        <template slot-scope="scope">{{scope.row.create_time|newTime}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
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
      ordersList: []
    };
  },
  //在实例创建之后调用接口
  async created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.pageData
      });
      console.log(res);
      this.total = res.data.data.total;
      this.ordersList = res.data.data.goods;
    },
    handleSizeChange(pagesize){
      this.pageData.pagesize = pagesize;
      this.pageData.pagenum = 1;
      this.getOrders();
    },
    handleCurrentChange(pagenum){
      this.pageData.pagenum = pagenum;
      this.getOrders();
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