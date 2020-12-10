<template>
  <div class="page-init login-container">
    <div class="vhc b-rds-5 login shadow" :class="{'login-click': isRotate}">
      <div class="p-a b-rds-5 bg-f front com">
        <p class="title t-c">xing sys</p>
        <el-form ref="form" :model="form" :rules="rules" autocomplete="on" label-position="left">
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-user-solid" placeholder="账号" name="username" type="text" autocomplete="on" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-lock" :type="isOpen ? '' : 'password'" placeholder="密码" name="password" autocomplete="on">
              <i slot="suffix" :class="isOpen ? 'iconfont icon-yanjing-kai' : 'iconfont icon-yanjing-guan'" @click="isOpen=!isOpen"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" class="f-l" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button type="primary" class="f-r" @click="isRotate = true">游客</el-button>
        </div>
      </div>
      <div class="p-a b-rds-5 bg-f back com">
        <p class="title t-c">xing sys</p>
        <el-row>
          <el-col :span="8"><i class="iconfont icon-weixin icon-fs-32 wx"></i></el-col>
          <el-col :span="8"><i class="iconfont icon-xinlang icon-fs-32 xl"></i></el-col>
          <el-col :span="8"><i class="iconfont icon-qq1 icon-fs-32 qq"></i></el-col>
        </el-row>
        <div class="t-c">
          <el-button type="primary" @click="isRotate = false">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const verifyUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
        return
      }
      callback()
    }
    const verifyPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
        return
      }
      callback()
    }
    return {
      isRotate: false,
      isOpen: false,
      form: {
        username: 'xxing',
        password: '111111'
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: verifyUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: verifyPassword
          }
        ]
      },
      redirect: undefined,
      otherQuery: { name: 'xxing' }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      }
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('user/login', this.form)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch(() => {})
        } else {
          console.log('校验不通过 !!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
.login-container {

  min-height: 100%;
  width: 100%;
  background: url('~/asserts/images/bg.png') no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;

  .login{
    width: 480px;
    height: 420px;
    transition: 1s;
    transform-style: preserve-3d;
  }
  .login-click { transform: rotateY(180deg) }

  .com{
    /* cursor: pointer解决定位时无效问题 */
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 50px 40px;
  }
  .front {
    backface-visibility: hidden;
  }
  .back {
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }

}
</style>

<style lang="scss" scoped>
.el-form {
  margin-top: 50px;
  /* 按钮行内块元素，有空隙 */
  font-size: 0;
}

.el-form-item {
  margin-bottom: 40px;
}

/deep/.el-input--medium .el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
}

/deep/.el-input__icon{
  font-size: 20px;
}
/deep/.iconfont{
  line-height: 50px;
  font-size: 20px;
  cursor: pointer;
}

.el-row {
  margin: 70px 0;
}
.el-col {
  text-align: center;
}
</style>
