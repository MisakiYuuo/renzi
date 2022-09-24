<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading">
        <el-tabs>
          <el-tab-pane label="用户管理"></el-tab-pane>
        </el-tabs>
        <div style="border-bottom: 1px solid #cfcfcf;padding-bottom: 5px;margin-bottom:5px">
          <tree-tool :node="company" :data="company">
            <el-dropdown-item>添加子部门</el-dropdown-item>
          </tree-tool>
        </div>
        <el-tree
          default-expand-all
          :data="list"
          :props="defaultProps"
        >
          <template v-slot="{ node, data }">
            <tree-tool :node="node" :data="data">
              <el-dropdown-item @click.native="addDep(data)">添加子部门</el-dropdown-item>
              <el-dropdown-item @click.native="editDep(data)">编辑部门</el-dropdown-item>
              <el-dropdown-item @click.native="delDep(data.id)">删除部门</el-dropdown-item>
            </tree-tool>
          </template>
        </el-tree>
      </el-card>
      <div v-if="dialogVisible">
        <add-dept
          ref="edit-dep"
          :dialog-visible.sync="dialogVisible"
          :all-department="allDepartment"
          :current-department="currentDepartment"
          @success="getDepartment"
        ></add-dept>
      </div>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/TreeTool.vue'
import AddDept from './components/AddDept.vue'
import { reqDeleteDepartmentAPI, reqDepartmentAPI } from '@/api/index.js'
import { listToTree } from '@/utils/listToTree.js'
import { cloneDeep } from 'lodash'
export default {
  name: 'Departments',
  components: { TreeTool, AddDept },
  props: {},
  data() {
    return {
      dialogVisible: false,
      company: {
        label: '黑马程序员',
        manager: '负责人'
      },
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      allDepartment: [],
      currentDepartment: {},
      loading: false
    }
  },
  created() {
    this.getDepartment()
  },
  mounted() {},
  methods: {
    async getDepartment() {
      this.loading = true
      const res = await reqDepartmentAPI()
      this.allDepartment = res.depts
      const { companyName, depts } = res
      this.company.label = companyName
      this.list = listToTree(depts, '')
      this.loading = false
    },
    addDep(data) {
      this.dialogVisible = true
      this.currentDepartment = data
    },
    editDep(data) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['edit-dep'].formData = cloneDeep(data)
      })
    },
    delDep(id) {
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await reqDeleteDepartmentAPI(id)
          this.getDepartment()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } catch (error) {
        console.log(error)
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body{
  padding:50px 80px;
  .row-bg{
    //margin:50px 80px 0;
    //border-bottom:1px solid #cfcfcf;
    span{
      font-size:14px;
    }
    .right{
      .grid-content{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .el-tree{
    //margin:15px 80px;
    .custom-tree-node{
      display: flex;
      justify-content: space-between;
      width:100%
    }
    .el-tree-node__content{
      height:36px;
    }
  }
}
span{
  font-size:14px !important;
  color:#000
}

</style>
