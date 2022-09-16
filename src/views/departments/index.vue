<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        </el-tabs>
        <el-row type="flex" justify="end" class="row-bg">
          <el-col :span="12"><div class="grid-content"><span style="font-weight:bold">江苏传智播客教育科技股份有限公司</span></div></el-col>
          <el-col :span="12" class="right"><div class="grid-content">
            <span style="margin-right:4px">负责人</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div></el-col>
        </el-row>
        <el-tree
          default-expand-all
          :data="list"
          :props="defaultProps"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <span style="font-size:14px">
                {{ data.manager }}
              </span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>查看部门</el-dropdown-item>
                  <el-dropdown-item>删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first',
      list: [
        { name: '总裁办', manager: '曹操',
          children: [
            { name: '董事会', manager: '曹丕' }
          ] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body{
  padding:50px 80px;
  .row-bg{
    margin:50px 80px 0;
    border-bottom:1px solid #cfcfcf;
    padding-bottom:10px;
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
    margin:15px 80px;
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
.el-dropdown{
  margin-left: 30px;
}
.el-dropdown-menu__item{
  color:#409eff;
}
span{
  font-size:14px !important;
  color:#000
}

</style>
