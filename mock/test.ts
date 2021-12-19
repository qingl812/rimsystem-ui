import { AxiosRequestHeaders } from "axios";

export default {
    road_name_list: (params: AxiosRequestHeaders): unknown => {
        const info = JSON.parse(params.body);

        return {
            roads: [
                "roads list",
                "name " + info.name,
                "area " + info.area,
                "unit " + info.unit,
                "begin " + info.begin,
                "total " + info.total,
            ],
            roadCount: 100
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
}