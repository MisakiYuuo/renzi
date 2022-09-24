import request from '@/utils/request'

/**
 * 获取员工简单列表
 * */
export const reqEmployees = () => request({
  method: 'GET',
  url: '/sys/user/simple'
})
/**
 * 获取员工列表
 * */
export const reqAllEmployees = params => request({
  method: 'GET',
  url: '/sys/user',
  params
})
/**
 * 新增员工
 * @param username  string  非必须    姓名
 * @param mobile  string  非必须    手机号
 * @param formOfEmployment  number  非必须    聘用形式
 * @param workNumber  string  非必须    工号
 * @param departmentName  string  非必须    组织名称
 * @param timeOfEntry  string  非必须    入职时间
 * @param correctionTime  string  非必须    转正时间
 * */
export const reqAddEmployees = data => request({
  method: 'post',
  url: '/sys/user',
  data
})
/**
 * 删除员工
 * */
export const reqDeleteEmployees = id => request({
  method: 'delete',
  url: `/sys/user/${id}`
})
/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
