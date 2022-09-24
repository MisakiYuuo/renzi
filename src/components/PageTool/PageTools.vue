<template>
  <el-row type="flex" justify="space-between">
    <el-row>
      <slot name="info"></slot>
    </el-row>
    <el-row>
      <slot name="btn"></slot>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'PageTools',
  components: {},
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
