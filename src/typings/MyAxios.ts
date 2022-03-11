import axios, { AxiosResponse } from "axios";
import { BranchRoad } from "./BranchRoad";
import { Road } from "./Road";
import { File } from "./File";
import { Inspection } from "./Inspection";

export class MyAxios {
	private get_string_array(
		url: string,
		callback: (data: Array<string>) => void
	): void {
		// eslint-disable-next-line prefer-const
		let ret = Array<string>();
		axios({
			method: "get",
			url: url,
		}).then((response: AxiosResponse) => {
			response.data.forEach((element: string) => {
				ret.push(element);
			});
			callback(ret);
		});
	}

	// 道路类型
	public types_name_list(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/types_name_list", callback);
	}

	// 道路养护等级
	public maintenance_levels_name_list(
		callback: (data: Array<string>) => void
	): void {
		return this.get_string_array(
			"/api/maintenance_levels_name_list",
			callback
		);
	}

	// 道路路面类型
	public surface_types_name_list(
		callback: (data: Array<string>) => void
	): void {
		return this.get_string_array("/api/surface_types_name_list", callback);
	}

	// 人行道面砖类型
	public sidewalk_tile_types_name_list(
		callback: (data: Array<string>) => void
	): void {
		return this.get_string_array(
			"/api/sidewalk_tile_types_name_list",
			callback
		);
	}

	// 盲道面砖类型
	public blind_road_tile_types_name_list(
		callback: (data: Array<string>) => void
	): void {
		return this.get_string_array(
			"/api/blind_road_tile_types_name_list",
			callback
		);
	}

	// 路缘石（侧石）类型
	public curb_types_name_list(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/curb_types_name_list", callback);
	}

	// 路面铺装层类型
	public road_pavement_type(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/road_pavement_type", callback);
	}

	// 获取道路信息
	public road_info(id: string, callback: (data: Road) => void): void {
		// eslint-disable-next-line prefer-const
		let road = new Road();
		axios({
			method: "get",
			url: "/api/road_info",
			data: {
				id: id,
			},
		}).then((response: AxiosResponse) => {
			response.data.branch_road.forEach((element: BranchRoad) => {
				// eslint-disable-next-line prefer-const
				let t = new BranchRoad();
				t.id = element.id;
				t.name = element.id;
				road.branch_road.push(t);
			});

			road.id = response.data.id;
			road.name = response.data.name;
			road.type = response.data.type;
			road.maintenance_level = response.data.maintenance_level;
			road.total_length = response.data.total_length;
			road.segment_number = response.data.segment_number;
			road.surface_type = response.data.surface_type;
			road.sidewalk_tile_type = response.data.sidewalk_tile_type;
			road.blind_road_tile_type = response.data.blind_road_tile_type;
			road.curb_type = response.data.curb_type;
			callback(road);
		});
	}

	// 地区名字
	public area_name_list(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/area_name_list", callback);
	}

	// 单位名字
	public unit_name_list(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/unit_name_list", callback);
	}

	// 道路名字的列表
	public road_name_list(
		page_size: number, // 每页有几个
		page: number, // 第几页
		name: string, // 搜索的名字
		area: string, // 搜索的地区
		unit: string, // 搜索的单位
		callback: (data: Array<Road>) => void
	): void {
		// eslint-disable-next-line prefer-const
		let road = new Array<Road>();
		axios({
			method: "get",
			url: "/api/road_name_list",
			data: {
				page_size: page_size,
				page: page,
				name: name,
				area: area,
				unit: unit,
			},
		}).then((response: AxiosResponse) => {
			response.data.forEach((element: Road) => {
				// eslint-disable-next-line prefer-const
				let t = new Road();
				t.id = element.id;
				t.name = element.name;
				road.push(t);
			});
			callback(road);
		});
	}

	// 文档类型
	public file_types_list(callback: (data: Array<string>) => void): void {
		return this.get_string_array("/api/file_types_list", callback);
	}

	// 文档列表
	public file_info_list(
		page_size: number, // 每一页的大小
		page: number, // 第几页
		name: string, // 文件所属
		type: string, // 文件类型
		callback: (data: Array<File>) => void
	): void {
		// eslint-disable-next-line prefer-const
		let files = new Array<File>();
		axios({
			method: "get",
			url: "/api/file_info_list",
			data: {
				page_size: page_size,
				page: page,
				name: name,
				type: type,
			},
		}).then((response: AxiosResponse) => {
			response.data.forEach((element: File) => {
				// eslint-disable-next-line prefer-const
				let t = new File();
				t.id = element.id;
				t.name = element.name;
				t.format = element.format;
				t.time = element.time;
				files.push(t);
			});

			callback(files);
		});
	}

	// 日常巡查信息列表
	public daily_inspection_info_list(
		page_size: number, // 每一页的大小
		page: number, // 第几页
		road_id: string, // 所属道路id
		begin_date: string, // 按开始时间过滤
		end_date: string, // 按结束时间过滤
		callback: (data: Array<Inspection>) => void
	): void {
		// eslint-disable-next-line prefer-const
		let files = new Array<Inspection>();
		axios({
			method: "get",
			url: "/api/daily_inspection_info_list",
			data: {
				page_size: page_size,
				page: page,
				road_id: road_id,
				begin_date: begin_date,
				end_date: end_date,
			},
		}).then((response: AxiosResponse) => {
			response.data.forEach((element: Inspection) => {
				// eslint-disable-next-line prefer-const
				let t = new Inspection();
				t.id = element.id;
				t.road_id = element.road_id;
				t.road_name = element.road_name;
				t.people = element.people;
				t.weather = element.weather;
				t.date = element.date;
				files.push(t);
			});

			callback(files);
		});
	}

	// 获取支路道路信息
	public branch_road_info(
		id: string,
		callback: (data: BranchRoad) => void
	): void {
		// eslint-disable-next-line prefer-const
		let road = new BranchRoad();
		axios({
			method: "get",
			url: "/api/branch_road_info",
			data: {
				id: id,
			},
		}).then((response: AxiosResponse) => {
			road.id = response.data.id;
			road.name = response.data.name;
			road.length = response.data.length;
			road.begin_location = response.data.begin_location;
			road.end_location = response.data.end_location;
			road.begin_end = response.data.begin_end;
			road.surface_type = response.data.surface_type;
			road.sidewalk_tile_type = response.data.sidewalk_tile_type;
			road.blind_road_tile_type = response.data.blind_road_tile_type;
			road.curb_type = response.data.curb_type;
			road.remark = response.data.remark;

			road.road_pavement_type = response.data.road_pavement_type;
			road.road_pavement_thickness =
				response.data.road_pavement_thickness;
			road.sidewalk_tile_thickness =
				response.data.sidewalk_tile_thickness;
			road.curb_type_2 = response.data.curb_type_2;
			road.leveling_layer_thickness =
				response.data.leveling_layer_thickness;
			callback(road);
		});
	}
}
