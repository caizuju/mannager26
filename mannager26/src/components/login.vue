<template>
  <div class="logingContainer">
    <div class="formContainer">

      <el-form
        label-position="top"
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="formData"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>

      </el-form>
      <el-button
        class="login-btn"
        type="success"
        @click="submitForm('formData')"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // labelPosition: 'right',
      formData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //这里是点击登录按钮验证成功之后执行的逻辑
          // alert('submit!');
          this.$axios.post("login", this.formData).then(res => {
           
            //如果status等于400的话,说明用户名或者密码错误

            if (res.data.meta.status === 400) {
              // this.$message.error(res.data.meta.msg);
            } else if (res.data.meta.status === 200) {
              // this.$message.success(res.data.meta.msg)
              //如果登录成功的话就跳转到主页并把token保存到本地
               this.$router.push('/')
                window.sessionStorage.setItem('token',res.data.data.token);
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style  lang='scss' >
.logingContainer {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .formContainer {
    background-color: #fff;
    width: 580px;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
