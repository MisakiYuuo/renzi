<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <PageTools>
          <template #info>
            <el-alert
              :title="`共有${total}条数据`"
              type="info"
              show-icon
              :closable="false"
            >
            </el-alert>
          </template>
          <template #btn>
            <el-button type="primary" icon="el-icon-upload2" @click="$router.push('/import')">导入</el-button>
            <el-button type="warning" icon="el-icon-download" @click="onExport">导出</el-button>
            <el-button type="success" icon="el-icon-plus" @click="visible = true">新增员工</el-button>
          </template>
        </PageTools>
      </el-card>
      <el-card style="margin-top:10px">
        <el-table
          :data="rows"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            sortable
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="头像"
            sortable
            width="150"
          >
            <template v-slot="{row}">
              <el-image :src="row.staffPhoto" @click="showQRCode(row.staffPhoto)">
                <div slot="error" class="image-slot">
                  <img :src="require('@/assets/common/head.jpg')" alt="" @click="showQRCode(require('../../assets/common/head.jpg'))">
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            sortable
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            sortable
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            sortable
            width="180"
          >
            <template v-slot="{ row }">
              {{ row.formOfEmployment | formOfEmploymentFormatter }}
            </template>
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            sortable
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="timeOfEntry"
            label="入职时间"
            sortable
            width="150"
          >
            <template v-slot="{ row }">
              {{ row.timeOfEntry | timeFormatter }}
            </template>
          </el-table-column>
          <el-table-column
            prop="enableState"
            label="状态"
            sortable
            width="140"
          >
            <template v-slot="{ row }">
              <el-switch
                v-model="row.enableState"
                disabled
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button type="text" @click="showDetail(row)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text" @click="onDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          align="right"
          :page-size="10"
          :current-page.sync="currentPage"
          @current-change="onPageChange"
        >
        </el-pagination>
      </el-card>
      <el-dialog
        title="扫码查看"
        :visible.sync="dialogVisible"
        width="30%"
        align="center"
      >
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
      </el-dialog>
      <el-dialog v-bind="$attrs" :visible.sync="visible" title="Dialog Titile" v-on="$listeners" @close="onClose">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="formData.timeOfEntry"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{width: '100%'}"
              placeholder="请选择入职时间"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <el-select v-model="formData.formOfEmployment" placeholder="请选择聘用形式" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in formOfEmploymentOptions"
                :key="index"
                :label="item.value"
                :value="item.id"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" prop="workNumber">
            <el-input v-model="formData.workNumber" placeholder="请输入工号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="部门" prop="departmentName">
            <el-input v-model="formData.departmentName" placeholder="请输入部门" clearable :style="{width: '100%'}" @focus="getDepartment">
            </el-input>
            <el-tree
              v-if="showTree"
              v-loading="loading"
              default-expand-all
              :data="list"
              :props="defaultProps"
              @node-click="handleClick"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="转正时间" prop="correctionTime">
            <el-date-picker
              v-model="formData.correctionTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{width: '100%'}"
              placeholder="请选择转正时间"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqAddEmployeesAPI, reqAllEmployeesAPI, reqDeleteEmployeesAPI, reqDepartmentAPI } from '@/api'
import QrcodeVue from 'qrcode.vue'
import { listToTree } from '@/utils/listToTree.js'
import employee from '@/api/constant/employees.js'
import { pick } from 'lodash'
import { formOfEmploymentFormatter, timeFormatter } from '@/filter'
export default {
  name: 'Employees',
  components: { QrcodeVue },
  props: {},
  data() {
    return {
      rows: [],
      total: 0,
      size: 300,
      value: '',
      dialogVisible: false,
      visible: false,
      currentPage: 1,
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formData: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机',
          trigger: 'blur'
        }],
        timeOfEntry: [{
          required: true,
          message: '请选择入职时间',
          trigger: 'change'
        }],
        formOfEmployment: [{
          required: true,
          message: '请选择聘用形式',
          trigger: 'change'
        }],
        workNumber: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        departmentName: [{
          required: true,
          message: '请输入部门',
          trigger: 'change'
        }],
        correctionTime: []
      },
      formOfEmploymentOptions: employee.hireType,
      showTree: false,
      loading: false
    }
  },
  created() {
    this.getAllEmployees()
  },
  mounted() {},
  methods: {
    // 员工查看页面
    showDetail(row) {
      this.$router.push(`employees/detail/${row.id}`)
    },
    // 导出Excel
    async onExport() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const value = Object.values(headers)
      const { rows } = await reqAllEmployeesAPI({ page: 1, size: this.total })
      const res = rows.map(l => {
        l.timeOfEntry = timeFormatter(l.timeOfEntry)
        l.correctionTime = timeFormatter(l.correctionTime)
        l.formOfEmployment = formOfEmploymentFormatter(l.formOfEmployment)
        return Object.values(pick(l, value))
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: res, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    // 删除用户
    onDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await reqDeleteEmployeesAPI(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        if (this.rows.length === 1) {
          this.currentPage -= 1
        }
        this.getAllEmployees(this.currentPage)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick(row) {
      this.formData.departmentName = row.name
      this.showTree = false
    },
    async getDepartment() {
      this.showTree = true
      this.loading = true
      const res = await reqDepartmentAPI()
      this.loading = false
      const { depts } = res
      this.list = listToTree(depts, '')
    },
    async getAllEmployees(page = 1) {
      const { rows, total } = await reqAllEmployeesAPI({ page, size: 10 })
      this.rows = rows
      this.total = total
    },
    showQRCode(url) {
      this.value = url
      this.dialogVisible = true
    },
    handelConfirm() {
      this.$refs['elForm'].validate(async(valid) => {
        if (!valid) return
        try {
          await reqAddEmployeesAPI(this.formData)
          this.$message.success('添加成功')
          this.getAllEmployees()
          this.currentPage = 1
          this.visible = false
        } catch (error) {
          this.$message.error('添加失败')
          console.log(error)
        }
      })
    },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    onPageChange(page) {
      this.getAllEmployees(page)
    }
  }
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .btn-upload , .drop{
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop{
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
