import moment from 'moment'
import employees from '@/api/constant/employees.js'
// 时间格式化
export const timeFormatter = val => {
  if (val) {
    return moment(val).format('YYYY-MM-DD')
  }
}
// 聘用形式格式化
export const formOfEmploymentFormatter = val => {
  const f = employees.hireType.find(f => {
    return f.id === val
  })
  return f && f.value
}
