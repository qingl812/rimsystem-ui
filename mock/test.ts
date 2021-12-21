import { AxiosRequestHeaders } from "axios";

export default {
    // home
    road_name_list: (params: AxiosRequestHeaders): unknown => {
        const info = JSON.parse(params.body);
        return {
            roads: [
                "roads list",
                "count" + info.count,
                "page " + info.page,
                "name " + info.name,
                "area " + info.area,
                "unit " + info.unit,
            ],
            total: 100
        }
    },
    unit_name_list: (): unknown => {
        return {
            units: [
                "单位A",
                "单位B",
                "单位C",
                "单位D",
            ],
        }
    },
    area_name_list: (): unknown => {
        return {
            areas: [
                "地区A",
                "地区B",
                "地区C",
                "地区D",
            ],
        }
    },
    // status
    get_user_info: (): unknown => {
        return {
            name: "admin",
            type: "系统管理员",
            unit: "惠州市公共事业管理局",
        }
    },
    get_system_version: (): unknown => {
        return {
            version: "v1.0"
        }
    },
    // login
    login: (params: AxiosRequestHeaders): unknown => {
        const info = JSON.parse(params.body);
        return {
            token: info.username + "_" + info.password + '_' + '12:08',
        }
    },
}