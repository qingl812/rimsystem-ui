<template>
	<!-- 数据信息 -->
	<el-container id="DataInformation">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main id="main-road" v-if="m_is_branch == false">
			<el-tabs type="card">
				<el-tab-pane label="基本信息" name="first">
					<el-form ref="form" :model="m_road" label-width="150px">
						<el-form-item label="道路名称">
							<el-input v-model="m_road.name"></el-input>
						</el-form-item>

						<el-form-item label="道路编号">
							<el-input v-model="m_road.id" disabled></el-input>
						</el-form-item>

						<el-form-item label="道路类型">
							<el-select v-model="m_road.type">
								<el-option
									v-for="item in m_road_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="道路养护等级">
							<el-select v-model="m_road.maintenance_level">
								<el-option
									v-for="item in m_road_mlevels"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="道路长度">
							<el-input v-model="m_road.total_length"></el-input>
						</el-form-item>

						<el-form-item label="道路分段数">
							<el-input
								v-model="m_road.segment_number"
							></el-input>
						</el-form-item>

						<el-form-item label="道路路面类型">
							<el-select v-model="m_road.surface_type">
								<el-option
									v-for="item in m_road_surface_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="人行道面砖类型">
							<el-select v-model="m_road.sidewalk_tile_type">
								<el-option
									v-for="item in m_road_sidewalk_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="盲道面砖类型">
							<el-select v-model="m_road.blind_road_tile_type">
								<el-option
									v-for="item in m_road_blind_road_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="路缘石（侧石）类型">
							<el-select v-model="m_road.curb_type">
								<el-option
									v-for="item in m_road_curb_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="onSubmit">
								保存
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="图片信息" name="second"
					>图片信息</el-tab-pane
				>

				<el-tab-pane label="录音录像" name="third"
					>录音录像</el-tab-pane
				>
			</el-tabs>
		</el-main>

		<el-main id="branch-road" v-else>
			<el-tabs type="card">
				<el-tab-pane label="基本信息" name="first">
					<el-form
						ref="branch_form"
						:model="m_branch_road"
						label-width="150px"
					>
						<el-form-item label="分段名称">
							<el-input v-model="m_branch_road.name"></el-input>
						</el-form-item>

						<el-form-item label="分段编号">
							<el-input
								v-model="m_branch_road.id"
								disabled
							></el-input>
						</el-form-item>

						<el-form-item label="分段长度">
							<el-input v-model="m_branch_road.length"></el-input>
						</el-form-item>

						<el-form-item label="起点位置">
							<el-input
								v-model="m_branch_road.begin_location"
							></el-input>
						</el-form-item>

						<el-form-item label="终止位置">
							<el-input
								v-model="m_branch_road.end_location"
							></el-input>
						</el-form-item>

						<el-form-item label="起止坐标">
							<el-input
								v-model="m_branch_road.begin_end"
							></el-input>
						</el-form-item>

						<el-form-item label="路面类型">
							<el-select v-model="m_branch_road.surface_type">
								<el-option
									v-for="item in m_road_surface_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="人行道面砖类型">
							<el-select
								v-model="m_branch_road.sidewalk_tile_type"
							>
								<el-option
									v-for="item in m_road_sidewalk_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="盲道面砖类型">
							<el-select
								v-model="m_branch_road.blind_road_tile_type"
							>
								<el-option
									v-for="item in m_road_blind_road_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="侧石类型">
							<el-select v-model="m_branch_road.curb_type">
								<el-option
									v-for="item in m_road_curb_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="备注">
							<el-input v-model="m_branch_road.remark"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="onSubmit">
								保存
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="图片信息" name="second"></el-tab-pane>
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

@Component({
	components: {
		SideTree,
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
