import { getUserBaseInfo, getUserInfo, login } from '@/api/user'
import { reqAddDepartment, reqDepartment } from '@/api/department'
import { reqEmployees } from '@/api/employees'

export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const getUserBaseInfoAPI = getUserBaseInfo
export const reqDepartmentAPI = reqDepartment
export const reqEmployeesAPI = reqEmployees
export const reqAddDepartmentAPI = reqAddDepartment
