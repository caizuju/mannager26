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
          <el-button type="success" plain>添加商品</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格的样式 -->
    <el-row>
      <el-col>
        <el-table :data="categoriesList" border style="width: 100%">
          <!-- 树形table -->
          <el-tree-grid
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            parentKey="cat_pid"
            levelKey="cat_level"
            childKey="children"
            :indentSize="30"
          ></el-tree-grid>
          <!-- 树形table -->
          <el-table-column prop="cat_level" label="级别" width="180">
            <template scope="prop">
              <span v-if="prop.row.cat_level===0">一级</span>
              <span v-if="prop.row.cat_level===1">二级</span>
              <span v-if="prop.row.cat_level===2">三级</span>
            </template>
          </el-table-column>
          <el-table-column prop label="是否有效" width="300">
            <template scope="prop">
              <span>{{prop.row.cat_deleted?'有效':'无效'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.pagenum"
      :page-sizes="[6, 12, 18, 24]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
//引入树形结构插件
import ElTreeGrid from "element-tree-grid";
export default {
  name: "categories",
  components: {
    ElTreeGrid
  },
  data() {
    return {
      leavl2: "商品管理",
      leavl3: "商品分类",
      //表格分页信息
      pageData: {
        type: 3,
        pagenum: 1,
        pagesize: 6
      },
      //总条数
      total: 0,
      //用户信息的列表
      categoriesList: []
    };
  },
  //在实例创建之后调用接口
  async created() {
    this.getcategories();
  },
  methods: {
    async getcategories() {
      let res = await this.$axios.get("categories", {
        params: this.pageData
      });
      console.log(res);
      this.categoriesList = res.data.data.result;
      this.total = res.data.data.total;
    },
    handleSizeChange(pagesize) {
      this.pageData.pagesize = pagesize;
      this.pageData.pagenum = 1;
      this.getcategories();
    },
    handleCurrentChange(pagenum) {
      this.pageData.pagenum = pagenum;
      this.getcategories();
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