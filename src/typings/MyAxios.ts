/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import router from "@/router";
import { BranchRoad } from "./BranchRoad";
import { Road } from "./Road";
import { Fund } from "./Fund";
import { RoadFile } from "./RoadFile";
import { Inspection } from "./Inspection";

export class MyAxios {
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
			method: "post",
			url: "/roadType/searchType",
		}).then((response: AxiosResponse) => {
			let ret = Array<string>();
			if (response.status == 200) {
				response.data.forEach((element: any) => {
					ret.push(element.name);
				});
			}
			callback(ret);
		});
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
		axios({
			method: "post",
			url: "/",
		}).then((response: AxiosResponse) => {
			let ret = Array<string>();
			response.data.forEach((element: any) => {
				ret.push(element.name);
			});
			callback(ret);
		});
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
				let ret = new Road();
				const road = response.data.data.road;
				ret.id = road.id;
				ret.name = road.roadName;
				ret.type = road.roadType;
				ret.segment_number = road.roadNum;
				ret.maintenance_level = road.roadMaintenanceGrade;
				ret.total_length = road.roadLength;
				ret.coordinate = road.roadCoordinate;
				// BranchRoad
				road.branchRoads.forEach((element: any) => {
					let b = new BranchRoad();
					b.id = element.id;
					b.name = element.branchName;
					b.begin_location = element.branchBlindBrickType;
					b.curb_type = element.branchCurbType;
					b.length = element.branchLength;
					b.num = element.branchNum;
					b.road_pavement_type = element.branchPavementType;
					b.sidewalk_tile_type = element.branchSidewalkBrickType;

					ret.branch_road.push(b);
				});

				callback(ret);
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

	// 巡查汇总
	public static get_inspection_summary(
		year: string,
		month: string,
		callback: (data: Array<Inspection>) => void
	): void {
		axios({
			method: "post",
			url: "/searchPatrolByMonth",
			params: {
				year: Number(year),
				month: Number(month),
			},
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				let ret = new Array<Inspection>();
				let data = response.data.data.patrolLogs;

				data.forEach((main: any) => {
					main.branchPatrol.forEach((element: any) => {
						let info = element.branchRoad;
						let t = new Inspection();
						t.id = element.id;
						t.road_name = main.roadName;
						t.segment_name = info.branchName;
						t.date = main.checkTime;
						t.location_description = element.locationDescribe;
						t.damaged_pavement_area = info.pavementBreak;
						t.damaged_sidewalk_area = info.sidewalkBrickBreak;
						t.damaged_blind_area = info.blindBrickBreak;
						t.damaged_curb_length = info.curbBreak;
						ret.push(t);
					});
				});

				callback(ret);
			}
		});
	}

	// 某条道路的日常巡查，两个年月日之间或全部
	public static get_inspection(
		page_size: number, // 每页有几个
		page: number, // 第几页
		road_id: string, // road id
		begin_date: Date | null, // 开始时间，可以为空
		end_date: Date | null, // 结束时间，可以为空
		callback: (total: number, data: Array<Inspection>) => void
	): void {
		let begin = begin_date == null ? new Date(0) : begin_date;
		let end = end_date == null ? new Date() : end_date;

		axios({
			method: "post",
			url: "/searchPatrolByTime",
			params: {
				pageSize: page_size,
				roadId: Number(road_id),
				currentPage: page,
				startTime: this.date_to_string(begin),
				endTime: this.date_to_string(end),
			},
		})
			.then((response: AxiosResponse) => {
				if (response.data.code == 200) {
					let ret = new Array<Inspection>();

					response.data.data.pageBean.pageData.forEach(
						(element: any) => {
							let t = new Inspection();
							t.id = element.id;
							t.date = element.checkTime;
							t.people = element.patrolPerson;
							t.road_id = element.roadId;
							t.road_name = element.roadName;
							t.weather = element.weather;
							ret.push(t);
						}
					);

					callback(response.data.data.pageBean.totalCount, ret);
				}
			})
			.catch((error: AxiosError) => {
				callback(-1, new Array<Inspection>());
			});
	}

	private static date_to_string(date: Date): string {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return year + "/" + month + "/" + day;
	}

	// 创建主路的巡查记录
	public static create_main_road_inspection(
		date: Date, // 日期
		weather: string, // 天气
		road_id: string, // road id
		road_name: string, // road name
		people: string, // 巡查人
		callback: (success: boolean) => void
	): void {
		let format_date = this.date_to_string(date);
		console.log(format_date);

		axios({
			method: "post",
			url: "/insertOnePatrol",
			data: {
				checkTime: date,
				weather: weather,
				roadId: road_id,
				patrolPerson: people,
				roadName: road_name,
			},
		})
			.then((response: AxiosResponse) => {
				callback(response.data.code == 200);
			})
			.catch(() => {
				callback(false);
			});
	}

	// 获取主路的巡查记录
	// 获取支路的巡查记录
	// 更新支路的巡查记录
}
