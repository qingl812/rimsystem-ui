/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestHeaders } from "axios";

export default {
	// home
	road_name_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return [
			{ id: "1", name: "A" },
			{ id: "2", name: "B" },
			{ id: "3", name: "C" },
		];
	},
	unit_name_list: (): unknown => {
		return ["单位A", "单位B", "单位C", "单位D"];
	},
	area_name_list: (): unknown => {
		return ["地区A", "地区B", "地区C", "地区D"];
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
		return ["类型A", "类型B", "类型C", "类型D"];
	},
	mlevels_name_list: (): unknown => {
		return ["养护等级A", "养护等级B", "养护等级C", "养护等级D"];
	},
	file_types_list: (params: AxiosRequestHeaders): unknown => {
		return [
			"合同文件",
			"项目档案",
			"实施记录",
			"资金申请表",
			"资金支付记录",
			"维护养护资料",
		];
	},
	file_info_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return [
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
		];
	},
	file_download: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			url: "url_" + info.file_id,
		};
	},
	file_upload: (params: AxiosRequestHeaders): unknown => {
		// mockjax只支持ajax请求，不支持form表单，所以失败。
		params;
		return;
	},
	maintenance_levels_name_list: (): unknown => {
		return [
			"道路养护等级 1",
			"道路养护等级 2",
			"道路养护等级 3",
			"道路养护等级 4",
		];
	},
	surface_types_name_list: (): unknown => {
		return ["路面类型A", "路面类型B", "路面类型C", "路面类型D"];
	},
	sidewalk_tile_types_name_list: (): unknown => {
		return [
			"人行路面类型A",
			"人行路面类型B",
			"人行路面类型C",
			"人行路面类型D",
		];
	},
	blind_road_tile_types_name_list: (): unknown => {
		return [
			"盲道面砖类型A",
			"盲道面砖类型B",
			"盲道面砖类型C",
			"盲道面砖类型D",
		];
	},
	curb_types_name_list: (): unknown => {
		return ["路缘石类型A", "路缘石类型B", "路缘石类型C", "路缘石类型D"];
	},
	road_info: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return {
			branch_road: [
				{ name: "A", id: "1" },
				{ name: "B", id: "2" },
				{ name: "C", id: "3" },
				{ name: "D", id: "4" },
			],
			name: "name " + info.id,
			id: info.id,
			type: "类型A",
			maintenance_level: "道路养护等级 1",
			total_length: "123",
			segment_number: "1",
			surface_type: "路面类型 A",
			sidewalk_tile_type: "人行路面类型A",
			blind_road_tile_type: "路缘石类型A",
			curb_type: "路缘石类型A",
		};
	},
	daily_inspection_info_list: (params: AxiosRequestHeaders): unknown => {
		const info = JSON.parse(params.body);
		return [
			{
				id: "1",
				road_id: "2",
				road_name: "3",
				date: "4",
				weather: "5",
				poeple: "6",
			},
		];
	},
};
