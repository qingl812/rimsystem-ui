export interface BranchRoad {
	name: string;
	id: string;
	num: string; // 分段编号
	length: string; // 分段长度
	begin_location: string; // 起点位置
	end_location: string; // 终止位置
	begin_end: string; // 起止坐标
	surface_type: string; // 路面类型
	sidewalk_tile_type: string; // 人行道面砖类型
	blind_road_tile_type: string; // 盲道面砖类型
	curb_type: string; // 侧石类型
	remark: string; // 备注

	road_pavement_type: string;
	road_pavement_thickness: string;
	sidewalk_tile_thickness: string;
	curb_type_2: string;
	leveling_layer_thickness: string;
}

export interface Road {
	branch_road: Array<BranchRoad>;
	name: string; // 道路名称
	id: string; // 道路id
	num: string; // 道路编号
	type: string; // 道路类型
	maintenance_level: string; // 道路养护等级
	total_length: string; // 道路分段数
	segment_number: string; // 道路分段数
	surface_type: string; // 道路路面类型
	sidewalk_tile_type: string; // 人行道面砖类型
	blind_road_tile_type: string; // sidewalk_tile_type
	curb_type: string; // 路缘石（侧石）类型
	unit: string;
	coordinate: string;
}
