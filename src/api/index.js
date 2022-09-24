import { getUserBaseInfo, getUserInfo, login } from '@/api/user'
import { reqAddDepartment, reqDeleteDepartment, reqDepartment, reqUpdateDepartment } from '@/api/department'
import {
  getJobDetail,
  getPersonalDetail,
  importEmployee,
  reqAddEmployees,
  reqAllEmployees,
  reqDeleteEmployees,
  reqEmployees,
  saveUserDetailById, updateJob, updatePersonal
} from '@/api/employees'
import { reqAddRole, reqDeleteRole, reqRole, reqUpdateRole } from '@/api/setting'
import { reqCompanyById } from '@/api/company'

export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const getUserBaseInfoAPI = getUserBaseInfo
export const reqDepartmentAPI = reqDepartment
export const reqEmployeesAPI = reqEmployees
export const reqAddDepartmentAPI = reqAddDepartment
export const reqUpdateDepartmentAPI = reqUpdateDepartment
export const reqDeleteDepartmentAPI = reqDeleteDepartment
export const reqRoleAPI = reqRole
export const reqAddRoleAPI = reqAddRole
export const reqDeleteRoleAPI = reqDeleteRole
export const reqUpdateRoleAPI = reqUpdateRole
export const reqCompanyByIdAPI = reqCompanyById
export const reqAllEmployeesAPI = reqAllEmployees
export const reqAddEmployeesAPI = reqAddEmployees
export const reqDeleteEmployeesAPI = reqDeleteEmployees
export const importEmployeeAPI = importEmployee
export const saveUserDetailByIdAPI = saveUserDetailById
export const getPersonalDetailAPI = getPersonalDetail
export const updatePersonalAPI = updatePersonal
export const getJobDetailAPI = getJobDetail
export const updateJobAPI = updateJob
