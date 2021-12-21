import Mock from 'mockjs'
import test from '../mock/test'

// home
Mock.mock('/api/road_name_list', 'get', test.road_name_list)
Mock.mock('/api/area_name_list', 'get', test.area_name_list)
Mock.mock('/api/unit_name_list', 'get', test.unit_name_list)

// status
Mock.mock('/api/get_user_info', 'get', test.get_user_info)
Mock.mock('/api/get_system_version', 'get', test.get_system_version)

// login
Mock.mock('/api/login', 'post', test.login)
export default Mock