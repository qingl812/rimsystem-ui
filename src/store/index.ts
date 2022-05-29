import tools from "@/typings/Tools";
import axios, { AxiosResponse } from "axios";
import { createStore } from "vuex";
import { Road, BranchRoad } from "@/typings/interfaces";

class BranchRoadInfo implements BranchRoad {
	public name = "";
	public id = "";
	public num = "";
	public length = "";
	public begin_location = "";
	public end_location = "";
	public begin_end = "";
	public surface_type = "";
	public sidewalk_tile_type = "";
	public blind_road_tile_type = "";
	public curb_type = "";
	public remark = "";
	public road_pavement_type = "";
	public road_pavement_thickness = "";
	public sidewalk_tile_thickness = "";
	public curb_type_2 = "";
	public leveling_layer_thickness = "";
}

class RoadInfo implements Road {
	public branch_road = new Array<BranchRoadInfo>();
	public name = "";
	public id = "";
	public num = "";
	public type = "";
	public maintenance_level = "";
	public total_length = "";
	public segment_number = "";
	public surface_type = "";
	public sidewalk_tile_type = "";
	public blind_road_tile_type = "";
	public curb_type = "";
	public unit = "";
	public coordinate = "";
}

export default createStore({
	state: {
		token: "",
		page_status: "",
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		datas: {} as any,
		data_pagination: {
			total_size: 0,
			page_size: 1,
			current_page: 1,
		},
		road_info: new RoadInfo(),
		branch_road_info: new BranchRoadInfo(),
	},
	getters: {},
	mutations: {
		set_token(state, token) {
			if (token == null) {
				localStorage.removeItem("authentication");
				state.token = "";
			} else {
				state.token = token;
				localStorage.setItem("token", token);
			}
		},
		set_page_status(
			state,
			status:
				| "init"
				| "logged"
				| "unlogged"
				| "not_found"
				| "not_permission"
		) {
			if (status == state.page_status) return;

			switch (status) {
				case "init": {
					const token = localStorage.getItem("token");
					state.token = token == null ? "" : token;

					if (token == null) {
						state.page_status = "unlogged";
					} else {
						state.page_status = "logged";
					}
					break;
				}

				case "logged": {
					state.page_status = "logged";
					break;
				}

				case "unlogged": {
					state.page_status = "unlogged";
					this.set_token(state, null);
					break;
				}

				case "not_found": {
					state.page_status = "not_found";
					break;
				}

				case "not_permission": {
					state.page_status = "not_permission";
					break;
				}
			}
		},
	},
	actions: {
		get_datas(store, name) {
			if (name == "units" && store.state.datas.units == undefined) {
				store.state.datas.units = new Array<string>();
				axios({
					method: "get",
					url: "/allManagement",
				}).then((response: AxiosResponse) => {
					if (response.data.code == 200) {
						store.state.datas.units =
							response.data.data.Organization;
					}
				});
			} else if (
				(name = "road_type" && store.state.datas.road_type == undefined)
			) {
				store.state.datas.road_type = new Array<string>();
				store.state.datas.surface = new Array<string>();
				store.state.datas.blind_road_tile = new Array<string>();
				store.state.datas.sidewalk_tile = new Array<string>();
				store.state.datas.curb = new Array<string>();
				axios({
					method: "post",
					url: "/roadType/searchType",
				}).then((response: AxiosResponse) => {
					if (response.status == 200) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						response.data.forEach((item: any) => {
							if (item.id == 1) {
								store.state.datas.road_type.push(item.name);
							} else if (item.id == 2) {
								store.state.datas.surface.push(item.name);
							} else if (item.id == 3) {
								store.state.datas.blind_road_tile.push(
									item.name
								);
							} else if (item.id == 4) {
								store.state.datas.sidewalk_tile.push(item.name);
							} else if (item.id == 5) {
								store.state.datas.curb.push(item.name);
							}
						});
					}
				});

				store.state.datas.mlevels = new Array<string>();
				axios({
					method: "post",
					url: "/roadType/searchType",
				}).then((response: AxiosResponse) => {
					if (response.status == 200) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						response.data.forEach((element: any) => {
							store.state.datas.mlevels.push(element.name);
						});
					}
				});
			}
		},
		get_data_page(store) {
			const para = tools.get_router_query("page");
			store.state.data_pagination.current_page = 1;
			store.state.data_pagination.total_size = 0;
			store.state.data_pagination.page_size = 1;
			if (para != "")
				store.state.data_pagination.current_page = parseInt(para);
		},
		get_road_info(store, road_id: string) {
			if (road_id == store.state.road_info.id) return;
			else if (road_id == "") {
				store.state.road_info = new RoadInfo();
				return;
			}

			axios({
				method: "post",
				url: "/selectRoadDetail",
				data: {
					roadId: road_id,
				},
			}).then((response: AxiosResponse) => {
				if (response.data.code == 200) {
					const road = response.data.data.road;
					const new_road = new RoadInfo();
					new_road.id = road.road_id;
					new_road.name = road.roadName;
					new_road.type = road.roadType;
					new_road.num = road.roadNum;
					new_road.segment_number = road.roadNum;
					new_road.maintenance_level = road.roadMaintenanceGrade;
					new_road.total_length = road.roadLength;
					new_road.coordinate = road.roadCoordinate;
					// BranchRoad
					road.branchRoads.forEach((element: any) => {
						const b = new BranchRoadInfo();
						b.id = element.id;
						b.name = element.branchName;
						b.begin_location = element.branchBlindBrickType;
						b.curb_type = element.branchCurbType;
						b.length = element.branchLength;
						b.num = element.branchNum;
						b.road_pavement_type = element.branchPavementType;
						b.sidewalk_tile_type = element.branchSidewalkBrickType;

						new_road.branch_road.push(b);
					});
					store.state.road_info = new_road;
				}
			});
		},
		get_branch_road_info(store, road_id: string) {
			store.state.road_info.branch_road.forEach((element: BranchRoad) => {
				if (element.id == road_id)
					store.state.branch_road_info = element;
			});
		},
	},
	modules: {},
});
