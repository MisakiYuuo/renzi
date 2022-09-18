<template>
  <el-dialog
    :title="isEdit ? '编辑部门':'添加部门'"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入部门名称" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入部门编码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择部门负责人" clearable :style="{width: '40%'}">
          <el-option
            v-for="(item, index) in managerOptions"
            :key="index"
            :label="item.username"
            :value="item.username"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { reqAddDepartmentAPI, reqEmployeesAPI } from '@/api'

export default {
  name: 'AddDept',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    allDepartment: {
      type: Array,
      default: () => []
    },
    currentDepartment: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码验证规则
    const checkCode = (rule, value, callback) => {
      const res = this.allDepartment.some(d => d.code === value)
      if (!res) {
        callback()
      } else {
        callback('部门编码已存在')
      }
    }
    // 部门名称验证规则
    const checkName = (rule, value, callback) => {
      if (!this.currentDepartment.children) {
        callback()
      } else {
        if (this.currentDepartment.children.some(d => d.name === value.trim())) {
          callback('部门已存在')
        } else {
          callback()
        }
      }
    }
    return {
      formData: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 16, trigger: 'blur', message: '部门名称的字数在2-16之间 ' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 2, max: 16, trigger: 'blur', message: '部门编码的字数在2-16之间 ' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 1, max: 200, trigger: 'blur', message: '部门介绍的字数在1-200之间 ' }]
      },
      // 下拉框选项
      managerOptions: []
    }
  },
  created() {
    this.getEmployees()
  },
  mounted() {
  },
  methods: {
    // 关闭对话框
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    // 获取员工接口
    async getEmployees() {
      this.managerOptions = await reqEmployeesAPI()
    },
    /**
     * 新增部门
     * @param code  string  非必须    部门编码，同级部门不可重复
     * @param introduce  string  非必须    介绍
     * @param manager  string  非必须    负责人名称
     * @param name  string  非必须    部门名称
     * @param pid  string  非必须    父级部门ID
     * */
    async onSubmit() {
      const newDepartment = {
        ...{ pid: this.currentDepartment.id }, ...this.formData
      }
      try {
        await reqAddDepartmentAPI(newDepartment)
        this.$message.success('添加部门成功')
        this.$emit('success')
      } catch (error) {
        console.log(error)
        this.$message.error('添加部门失败')
      }
      this.$emit('update:dialogVisible', false)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
