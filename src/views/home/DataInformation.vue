<template>
	<!-- 数据信息 -->
	<el-container id="DataInformation">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main id="main-road" v-if="m_is_branch == false">
			<el-tabs type="card">
				<el-tab-pane label="基本信息" name="first">
					<RoadInfoEdit
						:road="m_road"
						:road_blind_road_tile_types="
							m_road_blind_road_tile_types
						"
						:road_sidewalk_tile_types="m_road_sidewalk_tile_types"
						:road_surface_types="m_road_surface_types"
						:road_curb_types="m_road_curb_types"
						:road_types="m_road_types"
						:road_mlevels="m_road_mlevels"
					></RoadInfoEdit>
				</el-tab-pane>

				<el-tab-pane label="图片信息" name="second">
					<PictureInfo is_branch="false" :road_id="m_road.id">
					</PictureInfo>
				</el-tab-pane>

				<el-tab-pane label="录音录像" name="third"
					>录音录像</el-tab-pane
				>
			</el-tabs>
		</el-main>

		<el-main id="branch-road" v-else>
			<el-tabs type="card">
				<el-tab-pane label="基本信息" name="first">
					<BranchInfoEdit
						:branch_road="m_branch_road"
						:road_blind_road_tile_types="
							m_road_blind_road_tile_types
						"
						:road_curb_types="m_road_curb_types"
						:road_sidewalk_tile_types="m_road_sidewalk_tile_types"
						:road_surface_types="m_road_surface_types"
					></BranchInfoEdit>
				</el-tab-pane>
				<el-tab-pane label="图片信息" name="second">
					<PictureInfo
						is_branch="true"
						:road_id="m_branch_road.id"
					></PictureInfo>
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { BranchRoad } from "@/typings/BranchRoad";
import { Road } from "@/typings/Road";
import { Tools } from "@/typings/Tools";
import RoadInfoEdit from "@/components/road/RoadInfoEdit.vue";
import BranchInfoEdit from "@/components/road/BranchInfoEdit.vue";
import PictureInfo from "@/components/road/PictureInfo.vue";

@Component({
	components: {
		SideTree,
		RoadInfoEdit,
		BranchInfoEdit,
		PictureInfo,
	},
})
export default class DataInformation extends Vue {
	// side
	private m_side_title = "请选择下面的树";
	private m_tree: Array<TreeNode> = [];
	private m_branch_road = new BranchRoad();
	private m_road = new Road();
	private m_is_branch = false;
	// 基本信息
	private m_road_types = new Array<string>();
	private m_road_mlevels = new Array<string>();
	private m_road_surface_types = new Array<string>();
	private m_road_sidewalk_tile_types = new Array<string>();
	private m_road_blind_road_tile_types = new Array<string>();
	private m_road_curb_types = new Array<string>();

	mounted(): void {
		// 如果没有参数 road_id 返回主页
		this.m_road.id = Tools.getRouterParam("road_id");
		if (this.m_road.id == "") this.$router.replace("/home");

		MyAxios.get_road_info(this.m_road.id, (data) => {
			this.m_road = data;

			this.m_tree.push({
				id: Number(data.id),
				label: data.name,
				isFolder: true,
				children: [],
			});
			this.m_tree[0].callback = (node) => {
				Tools.routerParam({
					road_id: node.id.toString(),
				});
				this.m_is_branch = false;
			};

			data.branch_road.forEach((element) => {
				this.m_tree[0].children?.push({
					id: Number(element.id),
					label: element.name,
					callback: (node) => {
						Tools.addRouterParam("branch_id", node.id.toString());
						this.m_is_branch = true;
					},
				});
			});
		});

		this.m_is_branch =
			Tools.getRouterParam("branch_id") == "" ? false : true;
		if (this.m_is_branch) {
			// MyAxios.get_road_info(Tools.getRouterParam("branch_id"), (data) => {
			// 	this.m_branch_road = data;
			// });
		}

		MyAxios.get_road_maintenance_level_list((data) => {
			this.m_road_mlevels = data;
		});
		MyAxios.get_road_type_name_list((data) => {
			this.m_road_types = data;
		});
	}

	private onSubmit(): void {
		alert("保存成功");
	}
}
</script>
