import request from '@/utils/request'

/**
 * 登录接口
 * @param mobile      手机号
 * @param password    密码
 * */
export const login = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})
/**
 * 获取用户基本资料
 * */
export function getUserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}
/**
 * 获取员工基本信息
 * @param id    员工id
 * */
export function getUserBaseInfo(id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}
