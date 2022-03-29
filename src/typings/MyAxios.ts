/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import router from "@/router";
import { BranchRoad } from "./BranchRoad";
import { Road } from "./Road";
import { Fund } from "./Fund";
import { ElStep } from "element-ui/types/step";
import { RoadFile } from "./RoadFile";

export class MyAxios {
	// 初始化 axios
	public static init(): void {
		axios.defaults.baseURL = "http://localhost:8099/";
		// 添加请求拦截器，在请求头中加 token
		axios.interceptors.request.use(
			function (config: AxiosRequestConfig) {
				const authentication = localStorage.getItem("authentication");
				if (authentication && config && config.headers) {
					config.headers.authentication = authentication;
				}
				return config;
			},
			function (error) {
				// 处理响应错误
				localStorage.removeItem("authentication");
				return Promise.reject(error);
			}
		);
		// 添加一个响应拦截器，在 header 中有 new_token 时更新 token
		// axios.interceptors.response.use(
		// 	function (response: AxiosResponse) {
		// 		const authentication = localStorage.getItem("authentication");
		// 		const new_authentication = response.headers.authentication;
		// 		if (authentication != new_authentication) {
		// 			localStorage.setItem("authentication", new_authentication);
		// 		}
		// 		return response;
		// 	},
		// 	function (error) {
		// 		// 处理响应错误
		// 		return Promise.reject(error);
		// 	}
		// );
		// 添加一个响应拦截器，在服务器返回 401 时退回到登陆界面
		// axios.interceptors.response.use(
		// 	(response: AxiosResponse) => {
		// 		return response;
		// 	},
		// 	(error) => {
		// 		// 处理响应错误
		// 		if (error.response.status == 401) {
		// 			localStorage.setItem("authentication", "");
		// 			router.push({
		// 				path: "login",
		// 			});
		// 		}
		// 		return Promise.reject(error);
		// 	}
		// );
	}

	// 登录
	public static login(
		username: string,
		password: string,
		callback: (data: string) => void
	): void {
		axios({
			method: "post",
			url: "/api/login",
			params: {
				username: username,
				password: password,
			},
		})
			.then((response: AxiosResponse) => {
				if (response.data.success == true) {
					// token 存储到 localStorage
					localStorage.setItem(
						"authentication",
						response.data.data.authentication
					);
				}
				callback(response.data.message);
			})
			.catch(() => {
				callback("连接错误");
			});
	}

	// 获取底部 status 栏信息
	public static get_status_info(
		callback: (data: Array<string>) => void
	): void {
		axios({
			method: "post",
			url: "/userInfo",
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				callback([
					response.data.data.user.organizationName,
					response.data.data.user.username,
					response.data.data.user.roles[0].roleDescription,
					"v1.0",
				]);
			}
		});
	}

	// 单位名字
	public static get_unit_name_list(
		callback: (data: Array<string>) => void
	): void {
		axios({
			method: "get",
			url: "/allManagement",
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				callback(response.data.data.Organization);
			}
		});
	}

	// 道路养护类型名字
	public static get_road_maintenance_level_list(
		callback: (data: Array<string>) => void
	): void {
		// axios({
		// 	method: "get",
		// 	url: "/api",
		// }).then((response: AxiosResponse) => {
		// 	// eslint-disable-next-line prefer-const
		// 	let ret = Array<string>();
		// 	// response.data.forEach((element: string) => {
		// 	// 	ret.push(element);
		// 	// });
		// 	callback(ret);
		// });

		// eslint-disable-next-line prefer-const
		let ret = Array<string>();
		ret.push("a");
		ret.push("b");
		ret.push("c");
		ret.push("d");
		callback(ret);
	}

	// 道路类型名字
	public static get_road_type_name_list(
		callback: (data: Array<string>) => void
	): void {
		axios({
			method: "post",
			url: "/roadType/searchType",
		}).then((response: AxiosResponse) => {
			let ret = Array<string>();
			response.data.forEach((element: any) => {
				ret.push(element.name);
			});
			callback(ret);
		});
	}

	// 道路名字的列表
	public static get_road_name_search(
		page_size: number, // 每页有几个
		page: number, // 第几页
		name: string, // 搜索的名字
		unit: string, // 搜索的单位
		callback: (total: number, data: Array<Road>) => void
	): void {
		axios({
			method: "post",
			url: "/selectHomePageRoad",
			data: {
				pageSize: page_size,
				currentPage: page,
				roadName: name,
				unit: unit,
			},
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				let road = new Array<Road>();
				response.data.data.pageInfo.list.forEach((element: any) => {
					// eslint-disable-next-line prefer-const
					let t = new Road();
					t.id = element.id;
					t.name = element.roadName;
					road.push(t);
				});
				callback(response.data.data.pageInfo.size, road);
			}
		});
	}

	// 道路资料页面道路列表
	public static get_road_info_search(
		page_size: number, // 每页有几个
		page: number, // 第几页
		name: string, // 搜索的名字
		type: string, // 搜索的道路类型
		mlevel: string, // 搜索的道路养护等级
		callback: (total: number, data: Array<Road>) => void
	): void {
		axios({
			method: "post",
			url: "/api/road_info_list",
			data: {
				pageSize: page_size,
				currentPage: page,
				roadName: name,
				roadType: type,
				roadMaintenance: mlevel,
			},
		}).then((response: AxiosResponse) => {
			if (response.status == 200) {
				let road = new Array<Road>();
				response.data.pageData.forEach((element: any) => {
					// eslint-disable-next-line prefer-const
					let t = new Road();
					t.id = element.id;
					t.maintenance_level = element.roadMaintenanceGrade;
					t.name = element.roadName;
					t.type = element.roadType;
					t.unit = element.user.organizationName;
					road.push(t);
				});
				callback(response.data.totalCount, road);
			}
		});
	}

	// 月度资金申请
	public static get_monthly_funding_request(
		page_size: number, // 每页有几个
		page: number, // 第几页
		callback: (total: number, data: Array<Fund>) => void
	): void {
		axios({
			method: "post",
			url: "/allPlan",
			data: {
				pageSize: page_size,
				currentPage: page,
			},
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				// eslint-disable-next-line prefer-const
				let ret = Array<Fund>();
				response.data.data.pageBean.pageData.forEach((element: any) => {
					let t = new Fund();
					t.id = element.id;
					let date = new Date(element.planTime); //获取一个时间对象
					t.date = date.getFullYear() + "年" + date.getMonth() + "月";
					t.total_price = element.totalPrice + "元";
					t.is_act = element.isAct;
					t.is_finish = element.isFinish;
					ret.push(t);
				});
				callback(response.data.data.pageBean.totalCount, ret);
			}
		});
	}

	// 项目实施呈现表
	public static get_project_implementation_presentation_table(
		date: Date, // 日期
		page_size: number, // 每页有几个
		page: number, // 第几页
		callback: (total: number, data: Array<Fund>) => void
	): void {
		// 日期格式转换
		let dateStr = date.getFullYear() + "/";
		let t = (date.getMonth() + 1).toString();
		if (t.length == 1) t = "0" + t;
		dateStr += t;

		axios({
			method: "post",
			url: "/searchMonthFundOfYear",
			data: {
				createTableTime: dateStr,
				pageSize: page_size,
				currentPage: page,
			},
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				// eslint-disable-next-line prefer-const
				let ret = Array<Fund>();
				response.data.data.pageInfo.list.forEach((element: any) => {
					let t = new Fund();
					t.id = element.id;
					t.name = element.fundName;
					t.type = "null";
					let date = new Date(element.fundTime); //获取一个时间对象
					t.date =
						date.getFullYear() +
						"/" +
						(date.getMonth() + 1) +
						"/" +
						date.getDay() +
						" " +
						date.getHours() +
						":" +
						date.getMinutes() +
						":" +
						date.getSeconds();
					t.is_act = "null";
					t.is_finish = "null";
					ret.push(t);
				});
				callback(response.data.data.pageInfo.total, ret);
			}
		});
	}

	// 文档类型名字
	public static get_file_type_name_list(
		callback: (data: Array<string>) => void
	): void {
		// 	axios({
		// 		method: "post",
		// 		url: "/",
		// 	}).then((response: AxiosResponse) => {
		// 		let ret = Array<string>();
		// 		response.data.forEach((element: any) => {
		// 			ret.push(element.name);
		// 		});
		// 		callback(ret);
		// 	});
		let ret = Array<string>();
		ret.push("a");
		ret.push("b");
		ret.push("c");
		ret.push("d");
		callback(ret);
	}

	// 根据 road_id 获取道路信息
	public static get_road_info(
		road_id: string,
		callback: (data: Road) => void
	): void {
		axios({
			method: "post",
			url: "/selectRoadDetail",
			data: {
				roadId: road_id,
			},
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				let t = new Road();
				const road = response.data.data.road;
				t.id = road.id;
				t.name = road.roadName;
				t.type = road.roadType;
				t.segment_number = road.roadNum;
				t.maintenance_level = road.roadMaintenanceGrade;
				t.total_length = road.roadLength;
				t.coordinate = road.roadCoordinate;
				callback(t);
			}
		});
	}

	// 文档信息列表
	public static file_info_list(
		page_size: number, // 每页有几个
		page: number, // 第几页
		road_id: string, // road id
		file_type: string, // 文档类型
		callback: (total: number, data: Array<RoadFile>) => void
	): void {
		// axios({
		// 	method: "post",
		// 	url: "/",
		// 	data: {
		// 		page_size: page_size,
		// 		page: page,
		// 		road_id: road_id,
		// 		file_type: file_type,
		// 	},
		// }).then((response: AxiosResponse) => {
		// 	if (response.data.code == 200) {
		// 		callback(response.data.data.pageInfo.total, ret);
		// 	}
		// });

		let ret = new Array<RoadFile>();
		let t = new RoadFile();
		t.id = "123";
		ret.push(t);
		callback(10, ret);
	}
}
