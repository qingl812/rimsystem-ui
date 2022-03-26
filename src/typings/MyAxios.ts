/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { BranchRoad } from "./BranchRoad";
import { Road } from "./Road";
import { Fund } from "./Fund";

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
				} else console.log("error");
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
				// token 存储到 localStorage
				localStorage.setItem(
					"authentication",
					response.data.data.authentication
				);
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
		axios({
			method: "get",
			url: "/api",
		}).then((response: AxiosResponse) => {
			// eslint-disable-next-line prefer-const
			let ret = Array<string>();
			// response.data.forEach((element: string) => {
			// 	ret.push(element);
			// });
			callback(ret);
		});

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
			method: "get",
			url: "/api",
		}).then((response: AxiosResponse) => {
			// eslint-disable-next-line prefer-const
			let ret = Array<string>();
			// response.data.forEach((element: string) => {
			// 	ret.push(element);
			// });
			callback(ret);
		});

		// eslint-disable-next-line prefer-const
		let ret = Array<string>();
		ret.push("a");
		ret.push("b");
		ret.push("c");
		ret.push("d");
		callback(ret);
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
		callback: (data: Array<Road>) => void
	): void {
		axios({
			method: "get",
			url: "/api",
			data: {
				page_size: page_size,
				page: page,
				name: name,
				type: type,
				mlevel: mlevel,
			},
		}).then((response: AxiosResponse) => {
			// response.data.forEach((element: Road) => {
			// 	// eslint-disable-next-line prefer-const
			// 	let t = new Road();
			// 	t.id = element.id;
			// 	t.name = element.name;
			// 	road.push(t);
			// });
			// eslint-disable-next-line prefer-const
			let road = new Array<Road>();
			callback(road);
		});

		let ret = Array<Road>();
		let r = new Road();
		r.id = "1";
		r.name = "road";
		ret.push(r);
		callback(ret);
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
					t.plan_time = date.getFullYear() + "年" + date.getMonth() + "月";
					t.total_price = element.totalPrice+"元";
					t.is_act = element.isAct;
					t.is_finish = element.isFinish;
					ret.push(t);
				});
				callback(response.data.data.pageBean.totalCount, ret);
			}
		});

		// eslint-disable-next-line prefer-const
		// let ret = Array<Fund>();
		// ret.push(new Fund());
		// ret[0].id = "123";
		// callback(10, ret);
	}
}
