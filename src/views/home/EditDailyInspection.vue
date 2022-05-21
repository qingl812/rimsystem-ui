<template>
	<!-- 日常巡查信息编辑或新增 -->
	<el-container id="EditDailyInspection">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main>
			<el-form
				ref="branch_form"
				:model="m_branch_road"
				label-width="80px"
				v-if="m_is_branch == false"
			>
				<el-form-item label="日期">
					<el-date-picker
						type="date"
						v-model="m_form.date"
					></el-date-picker>
				</el-form-item>

				<el-form-item label="天气">
					<el-input v-model="m_form.weather"></el-input>
				</el-form-item>

				<el-form-item label="巡查人">
					<el-input v-model="m_form.people"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit()"
						>保存</el-button
					>
					<el-button @click="$router.back(-1)">返回</el-button>
				</el-form-item>
			</el-form>

			<el-form
				ref="branch_form"
				:model="m_branch_road"
				label-width="200px"
				v-else
			>
				<el-form-item label="道路名称">
					<el-input disabled v-model="m_form.road_name"></el-input>
				</el-form-item>

				<el-form-item label="道路编号">
					<el-input disabled v-model="m_form.road_id"></el-input>
				</el-form-item>

				<el-form-item label="具体位置描述">
					<el-input v-model="m_form.location_description"></el-input>
				</el-form-item>

				<el-form-item label="破损路面面积（平方米）">
					<el-input v-model="m_form.damaged_pavement_area"></el-input>
				</el-form-item>

				<el-form-item label="破损人行道面积（平方米）">
					<el-input v-model="m_form.damaged_sidewalk_area"></el-input>
				</el-form-item>

				<el-form-item label="破损盲道面积（平方米）">
					<el-input v-model="m_form.damaged_blind_area"></el-input>
				</el-form-item>

				<el-form-item label="破损路缘石（平方米）">
					<el-input v-model="m_form.damaged_curb_length"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit()"
						>保存</el-button
					>
					<el-button @click="$router.back(-1)">返回</el-button>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/Road";
import { Tools } from "@/typings/Tools";
import { BranchRoad } from "@/typings/BranchRoad";
import { Inspection } from "@/typings/Inspection";

@Component({
	components: {
		SideTree,
	},
})
export default class DailyInspection extends Vue {
	// side
	private m_side_title = "请选择下面的树";
	private m_tree: Array<TreeNode> = [];
	private m_branch_road = new BranchRoad();
	private m_road = new Road();
	private m_is_branch = false;

	// main
	private m_form: Inspection = new Inspection();
	private m_type = "add";

	@Watch("$route")
	getVisible() {
		this.m_type = Tools.getRouterParam("type") == "" ? "add" : "edit";

		this.m_is_branch =
			Tools.getRouterParam("branch_id") == "" ? false : true;
	}

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

			if (this.m_type == "edit") {
				if (this.m_is_branch == false) {
					console.log("hello");
				} else {
					console.log("hello");
				}
			}
		});

		if (Tools.getRouterParam("type") == "edit") {
			if (this.m_is_branch == false) {
				// 主路巡查记录
				this.m_form;
			} else {
				// 支路巡查记录
				this.m_form;
			}
		}
	}

	onSubmit(): void {
		if (
			this.m_form.date == "" ||
			this.m_form.weather == "" ||
			this.m_form.people == ""
		) {
			this.$notify.error({
				title: "错误",
				message: "请填写完整信息",
			});
		} else {
			MyAxios.create_main_road_inspection(
				new Date(this.m_form.date),
				this.m_form.weather,
				this.m_road.id,
				this.m_road.name,
				this.m_form.people,
				(success) => {
					if (success)
						this.$notify({
							title: "成功",
							message: "保存成功",
						});
					else {
						this.$notify.error({
							title: "错误",
							message: "保存失败",
						});
					}
				}
			);
		}
	}
}
</script>

<style scoped lang="scss">
.el-form {
	margin-top: 20px;
}
</style>
