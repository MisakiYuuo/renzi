<template>
  <div>
    <UploadExcel :on-success="handleSuccess"></UploadExcel>
  </div>
</template>
<script>
import { importEmployeeAPI } from '@/api'

export default {
  name: 'Import',
  data() {
    return {

    }
  },
  methods: {
    async handleSuccess({ results, header }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const res = results.map(f => {
        for (const key in f) {
          const newKey = userRelations[key]
          f[newKey] = f[key]
          delete f[key]
        }
        return f
      })
      try {
        await importEmployeeAPI(res)
        this.$message.success('上传成功')
      } catch (error) {
        this.$message.error('上传失败')
        console.log(error)
      }
    }
  }
}
</script>
