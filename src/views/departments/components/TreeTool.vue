<template>
  <el-row type="flex" justify="end" class="row-bg" style="width:100%">
    <el-col :span="12"><div class="grid-content"><span style="font-weight:bold">{{ node.label }}</span></div></el-col>
    <el-col :span="12" class="right"><div class="grid-content">
      <span style="margin-right:4px">{{ data.manager }}</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <slot></slot>
        </el-dropdown-menu>
      </el-dropdown>
    </div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTool',
  components: {},
  props: {
    node: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {}

}
</script>

<style lang="scss" scoped>
</style>
