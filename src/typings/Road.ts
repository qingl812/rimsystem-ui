import { BranchRoad } from "./BranchRoad";

export class Road {
    public branch_road = new Array<BranchRoad>();
	public name = "";
	public id = "";
	public type = "";
	public maintenance_level = "";
	public total_length = 0;
	public segment_number = 0;
	public surface_type = "";
	public sidewalk_tile_type = "";
	public blind_road_tile_type = "";
	public curb_type = "";
}
