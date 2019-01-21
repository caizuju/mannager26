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
          <el-button type="success" @click="addRole" plain>添加角色</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="roleVisible" width="30%">
      <!-- 添加角色对话框的表单 -->
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="roleFrom"
        :model="roleFrom"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加用户对话框的表单 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('roleFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色的对话框结束 -->
    <!-- 编辑角色的对话框开始 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible" width="30%">
      <!-- 添加角色对话框的表单 -->
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="roleFrom"
        :model="editFrom"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑角色对话框的表单 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色的对话框结束 -->
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
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editOne(scope.row)"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delOne(scope.row)"
            size="mini"
            plain
          ></el-button>
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
      rolesList: [],
      //添加角色的表单
      roleFrom: {
      
      },
      //弹出角色对话框的参数
      roleVisible: false,
      //表单验证
      rules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 24 个字符", trigger: "blur" }
        ]
      },
      //编辑对话框的弹出参数
      editVisible:false,
      //编辑表单的数据
      editFrom:{
        roleName:"",
        roleDesc:""
      }
    };
  },
  //在实例创建之后调用接口
  async created() {
    this.getRoles();
  },
  methods: {
    //获取角色列表的数据并渲染
    async getRoles() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.rolesList = res.data.data;
    },
    //点击添加用户按钮弹出添加用户的编辑框
    addRole() {
      this.roleVisible = true;
      this.roleFrom = {}
    },
    //点击确定按钮后进行表单验证
    submitAdd(roleFrom) {
      //进行表单验证
      this.$refs[roleFrom].validate(async valid => {
        if (valid) {
          //如果进入到了这里就说明表单验证通过,通过之后就调用接口提交数据然后渲染页面
          let res = await this.$axios.post("roles", this.roleFrom);
          // console.log(res);
          this.getRoles();
          //关闭弹出框
          this.roleVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //----------------------------------------------------------------
    //删除功能:点击删除按钮删除对应的哪一行的数据,在点击的时候把整一行的数据都带过来便于操作
    delOne(data) {
      // console.log(data);
      //点击之后弹出消息确认框
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //点击删除按钮之后调用接口删除某一条数据然后重新渲染页面
          let res = await this.$axios.delete(`roles/${data.id}`);
          // console.log();
          this.getRoles();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //---------------------------------------------------------------------------
    //编辑功能:点击编辑按钮弹出编辑的对话框,在点击的时候把数据传过来
    editOne(data) {
      console.log(data);
         this.editVisible = true;
      this.editFrom = data;
      console.log(this.editFrom);
    },
    //点击确认按钮进行表单验证
    submitEdit(roleFrom){
      
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
.el-tag {
  margin: 5px;
}
</style>