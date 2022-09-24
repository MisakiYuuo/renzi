import request from '@/utils/request'

/**
 * 根据id查询企业
 * @param id  是  id
 * */
export const reqCompanyById = id => request({
  method: 'GET',
  url: `/company/${id}`
})
