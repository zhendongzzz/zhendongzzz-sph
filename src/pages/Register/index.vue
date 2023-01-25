<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <router-link to="/login" target="_blank">登陆</router-link> </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" name="phone" v-model="phone" />
        <span class="error-msg">{{ phoneMessage }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" name="code" v-model="code" />
        <button :disabled="flag" style="width: 100px; height: 38px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ codeMessage }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" name="password" v-model="password" />
        <span class="error-msg">{{ passwordMessage }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" name="password1" v-model="password1" />
      </div>
      <div class="controls">
        <input type="checkbox" name="agree" v-model="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ agreeMessage }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址:北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
export default {
  name: 'MyRegister',
  data() {
    return {
      password1: ''
    }
  },
  computed: {
    flag() {
      return this.phoneMessage !== ''
    }
  },
  methods: {
    async getCode() {
      this.code = await this.$store.dispatch('getCode', this.phone)
    },
    async userRegister() {
      const { phone, password, code } = this
      if (password !== this.password1) {
        return alert('两次输入密码不一致！')
      } else if (!this.agree) {
        return alert('请勾选协议！')
      } else if (this.phoneMessage || this.passwordMessage || this.agreeMessage) return alert('请正确填写信息')
      else {
        try {
          await this.$store.dispatch('userRegister', { phone, password, code })
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  },
  setup() {
    // 判断手机号是否正确
    const regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    // 密码验证：以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    const regPassword = /^[a-zA-Z]\w{5,17}$/

    const isRequired = (value) => (regPhone.test(value) ? '' : '请输入正确手机号')
    const { value: phone, errorMessage: phoneMessage } = useField('phone', isRequired)

    const isRequired2 = (value) => (value.length === 6 ? '' : '请输入6位验证码')
    const { value: code, errorMessage: codeMessage } = useField('code', isRequired2)

    const isRequired3 = (value) => (regPassword.test(value) ? '' : '以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
    const { value: password, errorMessage: passwordMessage } = useField('password', isRequired3)

    const isRequired4 = (value) => (value ? '' : '请阅读并勾选协议')
    const { value: agree, errorMessage: agreeMessage } = useField('agree', isRequired4)

    return {
      phone,
      phoneMessage,
      code,
      codeMessage,
      password,
      passwordMessage,
      agree,
      agreeMessage
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
