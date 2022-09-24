import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param page  是  1  页码
 * @param pagesize  是  10  每页条数
 * */
export const reqRole = params => request({
  method: 'GET',
  url: '/sys/role',
  params
})
/**
 * 新增角色
 * @param name  string  必须    角色名称
 * @param description  string  必须    角色描述
 * */
export const reqAddRole = data => request({
  method: 'post',
  url: '/sys/role',
  data
})
/**
 * 删除角色
 * @param id  string  必须    角色id
 * */
export const reqDeleteRole = id => request({
  method: 'delete',
  url: `/sys/role/${id}`
})
/**
 * 编辑角色
 * @param name  string  必须    角色名称
 * @param description  string  必须    角色描述
 * */
export const reqUpdateRole = data => request({
  method: 'put',
  url: `/sys/role/${data.id}`,
  data
})
