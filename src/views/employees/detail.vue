<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" style="width:400px;margin-left:160px;margin-top:40px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">修改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info></job-info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserBaseInfoAPI, saveUserDetailByIdAPI } from '@/api'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'

export default {
  name: 'Detail',
  components: { UserInfo, JobInfo },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.form = await getUserBaseInfoAPI(this.id)
    this.form.password = ''
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async isOk => {
        if (!isOk) return
        await saveUserDetailByIdAPI(this.form)
        this.$message.success('修改成功')
      })
    }
  }

}
</script>

<style lang="less" scoped>
</style>
