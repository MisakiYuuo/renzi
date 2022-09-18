import request from '@/utils/request'

/**
 * 查询企业的部门列表
 * */
export const reqDepartment = () => request({
  method: 'GET',
  url: '/company/department'
})
/**
 * 新增部门
 * @param code  string  非必须    部门编码，同级部门不可重复
 * @param introduce  string  非必须    介绍
 * @param manager  string  非必须    负责人名称
 * @param name  string  非必须    部门名称
 * @param pid  string  非必须    父级部门ID
 * */
export const reqAddDepartment = (data) => request({
  method: 'POST',
  url: '/company/department',
  data
})
