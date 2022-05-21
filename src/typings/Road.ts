import { BranchRoad } from "./BranchRoad";

export class Road {
	public branch_road = new Array<BranchRoad>();
	public name = ""; // 道路名称
	public id = ""; // 道路编号
	public type = ""; // 道路类型
	public maintenance_level = ""; // 道路养护等级
	public total_length = 0; // 道路分段数
	public segment_number = 0; // 道路分段数
	public surface_type = ""; // 道路路面类型
	public sidewalk_tile_type = ""; // 人行道面砖类型
	public blind_road_tile_type = ""; // sidewalk_tile_type
	public curb_type = ""; // 路缘石（侧石）类型
	public unit = "";
	public coordinate = "";
}
