<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading">
        <el-tabs>
          <el-tab-pane label="角色管理" style="padding:40px 20px">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible=true">新增角色</el-button>
            <el-table
              :data="rows"
              stripe
              style="width: 100%;margin-top:20px"
              border
            >
              <el-table-column
                label="序号"
                type="index"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="角色名"
                width="180"
                align="center"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                align="center"
                prop="description"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="280"
              >
                <template v-slot="{ row }">
                  <el-button
                    size="mini"
                    type="success"
                  >权限分配</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="total, prev, pager, next"
              :total="total"
              align="end"
              :page-size="2"
              :current-page="page"
              @current-change="getRoles"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="公司信息" style="padding:20px 200px">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
              show-icon
            >
            </el-alert>
            <el-form label-width="80px" style="margin-top:20px">
              <el-form-item label="企业名称" style="width:600px">
                <el-input v-model="company.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司地址" style="width:600px">
                <el-input v-model="company.companyAddress" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司电话" style="width:600px">
                <el-input v-model="company.companyPhone" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" style="width:600px">
                <el-input v-model="company.mailbox" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注" style="width:600px">
                <el-input v-model="company.remarks" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-dialog :title="formData.id?'修改角色':'新增角色'" :visible.sync="dialogFormVisible" @close="close">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入角色名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="formData.description" placeholder="请输入角色描述" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqAddRoleAPI, reqCompanyByIdAPI, reqDeleteRoleAPI, reqRoleAPI, reqUpdateRoleAPI } from '@/api'
import { cloneDeep } from 'lodash'
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      rows: [],
      total: 0,
      dialogFormVisible: false,
      formData: {
        name: undefined,
        description: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入角色描述',
          trigger: 'blur'
        }]
      },
      page: 1,
      company: {},
      loading: false
    }
  },
  created() {
    this.getRoles()
    this.getCompanyById()
  },
  mounted() {},
  methods: {
    async getRoles(page = 1) {
      this.page = page
      this.loading = true
      const { rows, total } = await reqRoleAPI({ page: this.page, pagesize: 2 })
      this.loading = false
      this.rows = rows
      this.total = total
    },
    async getCompanyById() {
      this.company = await reqCompanyByIdAPI(this.$store.state.user.userInfo.companyId)
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formData = cloneDeep(row)
    },
    handleDelete(row) {
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await reqDeleteRoleAPI(row.id)
          this.getRoles()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.page = 1
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    close() {
      this.dialogFormVisible = false
      this.formData = {
        name: undefined,
        region: undefined
      }
    },
    /**
     * 新增角色
     * @param name  string  必须    角色名称
     * @param description  string  必须    角色描述
     * */
    handelConfirm() {
      this.$refs['elForm'].validate(async(valid) => {
        if (!valid) return
        try {
          if (this.formData.id) {
            await reqUpdateRoleAPI(this.formData)
            this.$message.success('编辑成功')
          } else {
            await reqAddRoleAPI(this.formData)
            this.$message.success('添加成功')
          }
          this.page = 1
        } catch (error) {
          this.$message.error('添加失败')
        }
        this.close()
        this.getRoles()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
