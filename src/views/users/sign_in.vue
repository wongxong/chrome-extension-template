<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="web-app-login-page">
    <el-form-item label="用户名" prop="user_name">
      <el-input 
        type="text" 
        placeholder="Enter username"
        v-model="form.user_name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input 
        type="password" 
        placeholder="Enter password"
        v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
	    <el-button type="primary" @click="submitForm('form')">登录</el-button>
	    <el-button @click="resetForm('form')">重置</el-button>
	  </el-form-item>
  </el-form>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import notifyMe from '@/utils/notifyMe';

  export default {
    name: 'WxLogin',
    data() {
      return {
        form: {
          user_name: 'wangxiong@china-revival.com',
          password: 'wangxiong'
        },
        rules: {
        	user_name: [
            { 
            	required: true, 
            	message: 'Please enter username', 
            	trigger: 'blur' 
            }
          ],
          password: [
            {
              required: true,
              message: 'Please enter password',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      ...mapMutations([ 
        'updateLoading'
      ]),
      ...mapActions([
        'login'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            this.updateLoading(true);
            this.login(this.form)
              .then(() => {
                this.updateLoading(false);
              })
              .catch(() => {
                this.updateLoading(false);
              });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>