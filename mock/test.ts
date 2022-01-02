import { AxiosRequestHeaders } from "axios";

export default {
	// home
	road_name_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			roads: [
				"roads list",
				"page_size " + info.page_size,
				"page " + info.page,
				"name " + info.name,
				"area " + info.area,
				"unit " + info.unit,
			],
			total: 100,
		};
	},
	unit_name_list: (): unknown => {
		return {
			units: ["单位A", "单位B", "单位C", "单位D"],
		};
	},
	area_name_list: (): unknown => {
		return {
			areas: ["地区A", "地区B", "地区C", "地区D"],
		};
	},
	// status
	get_user_info: (): unknown => {
		return {
			name: "admin",
			type: "系统管理员",
			unit: "惠州市公共事业管理局",
		};
	},
	get_system_version: (): unknown => {
		return {
			version: "v1.0",
		};
	},
	// login
	login: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			authentication: info.username + "_" + info.password + "_" + "12:08",
		};
	},
	road_info_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			roads: [
				{
					id: 123,
					name: "page_size " + info.page_size,
					type: "type",
					mlevel: "mlevel",
					unit: "unit",
				},
				{
					id: 123,
					name: "page " + info.page,
					type: "type",
					mlevel: "mlevel",
					unit: "unit",
				},
				{
					id: 123,
					name: "name " + info.name,
					type: "type",
					mlevel: "mlevel",
					unit: "unit",
				},
				{
					id: 123,
					name: "type " + info.type,
					type: "type",
					mlevel: "mlevel",
					unit: "unit",
				},
				{
					id: 123,
					name: "mlevel " + info.mlevel,
					type: "type",
					mlevel: "mlevel",
					unit: "unit",
				},
			],
			total: 100,
		};
	},
	types_name_list: (): unknown => {
		return {
			types: ["类型A", "类型B", "类型C", "类型D"],
		};
	},
	mlevels_name_list: (): unknown => {
		return {
			mlevels: ["养护等级A", "养护等级B", "养护等级C", "养护等级D"],
		};
	},
	file_types_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			road_name: info.road_name,
			types: [
				"合同文件",
				"项目档案",
				"实施记录",
				"资金申请表",
				"资金支付记录",
				"维护养护资料",
			],
		};
	},
	file_info_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			files: [
				{
					id: 123,
					name: "page_size " + info.page_size,
					format: "format",
					time: "2021-01-02",
				},
				{
					id: 123,
					name: "page " + info.page,
					format: "format",
					time: "2021-01-02",
				},
				{
					id: 123,
					name: "name " + info.name,
					format: "format",
					time: "2021-01-02",
				},
				{
					id: 123,
					name: "type " + info.type,
					format: "format",
					time: "2021-01-02",
				},
			],
			total: 100,
		};
	},
	file_download: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			url: "url_" + info.file_id,
		};
	},
};
