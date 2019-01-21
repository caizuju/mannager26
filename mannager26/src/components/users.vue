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
            <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-button type="success" @click="addVisible=true" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" width="30%">
      <!-- 添加用户对话框的表单 -->
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="userForm"
        :model="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加用户对话框的表单 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('userForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editVisible" width="30%">
      <!-- 编辑对话框的表单 -->
      <el-form label-position="right" label-width="80px" :model="editForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑对话框的表单 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="添加用户" :visible.sync="AssignVisible" width="30%" :model="assignFrom">
      <!-- 分配角色对话框的表单 -->
      <el-form label-position="right" label-width="80px">
        <el-form-item label="当前用户" prop="username">{{assignFrom.username}}</el-form-item>
      </el-form>
      <!-- 分配角色对话框的下拉框 -->
      <el-select v-model="assignFrom.role_name" placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 分配角色对话框的下拉框结束 -->
      <!-- 分配角色对话框的表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAssign">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格的样式 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="state(scope)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editUser(scope.row)"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="deleteOne(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            size="mini"
            @click="assign(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "users",
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
      userList: [],
      //编辑对话框的显示隐藏参数
      editVisible: false,
      //编辑的对话框的内容
      editForm: {
        //添加一个id方便请求时的参数
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      //添加用户编辑框的显示隐藏参数
      addVisible: false,
      //添加用户的表单验证项
      addForm: {
        password: "",
        username: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      //分配角色编辑框的显示隐藏参数
      AssignVisible: false,
      //分配角色的表单信息
      assignFrom: {
        
      },
      //下拉框角色表单
      roles: [],
      
    };
  },
  //在实例创建之后调用接口
  created() {
    this.getUsers();
  },
  methods: {
    //获取用户信息的方法
    getUsers() {
      this.$axios
        .get("users", {
          params: this.pageData
        })
        .then(res => {
          // console.log(res);
          this.userList = res.data.data.users;
          this.total = res.data.data.total;
        });
    },
    //在点击删除按钮之后弹出消息确认框
    deleteOne(data) {
      let id = data.id;
      this.$confirm("此操作将永久删除改用户!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //进入到这里说明点击了确定按钮
          let res = await this.$axios.delete(`users/${id}`);
          //  console.log(res);
          //删除成功之后调用方法重新渲染页面
          this.getUsers();
        })
        .catch(() => {});
    },
    //编辑用户,弹出对话框
    async editUser(data) {
      // console.log(1);
      //点击按钮之后弹出对话框
      this.editVisible = true;
      //声明一个id用作查询当前用户的编辑信息
      let id = data.id;
      let res = await this.$axios.get(`users/${id}`);
      // console.log(res);
      for (const key in this.editForm) {
        this.editForm[key] = res.data.data[key];
      }
    },
    //点击确定按钮修改用户数据并关闭对话框
    async submitEdit() {
      //点击按钮之后调用接口提交数据
      let id = this.editForm.id;
      let res = await this.$axios.put(`users/${id}`, this.editForm);
      // console.log(res);
      //刷新页面
      this.getUsers();
      //提交之后关闭对话框
      this.editVisible = false;
    },
    //点击搜索按钮搜索用户
    search() {
      //点击搜索按钮之后调用接口
      this.getUsers();
    },
    //改变用户状态
    async state(data) {
      // console.log(1);
      // console.log(data.row.mg_state);
      //调用改变用户状态的接口
      let res = await this.$axios.put(
        `users/${data.row.id}/state/${data.row.mg_state}`
      );
      console.log(res);
    },
    //点击确认按钮进行表单验证,然后在验证成功的回调函数里面提交数据然后重新渲染页面
    submitAdd(formName) {
      // console.log(1);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          //如果到了这里就说明验证通过了,验证通过了就调用接口
          let res = await this.$axios.post("users", this.addForm);
          console.log(res);
          if (res.data.meta.status === 201) {
            //调用接口重新渲染页面并且关闭对话框
            this.getUsers();
            this.addVisible = false;
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //点击勾勾弹出分配角色的对话框
   async assign(data) {
      // console.log(1);
      // console.log(data);
      this.assignFrom = data;
      // console.log(this.assignFrom);
      this.AssignVisible = true;
      let res =  await this.$axios.get('roles')
      this.roles = res.data.data;
      //默认选中的下拉框
      this.roleValue = data.role_name;
      
    },
    //点击确认分配的按钮
  async  submitAssign() {
      //调用接口改变角色
      let id = this.assignFrom.id;
      let res = await this.$axios.put(`users/${id}/role`,{rid:this.assignFrom.role_name});
      // console.log(res);
      //关闭弹出框
      this.AssignVisible = false;
    }

    //
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