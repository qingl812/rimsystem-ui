<template>
	<!-- 日常巡查 -->
	<el-container id="DailyInspection">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main>
			<PublicTable
				:table_data="m_table"
				:title="m_table_title"
				:update_table="update_table"
				:has_search="true"
			>
				<template slot="table">
					<el-table-column label="选择" width="55">
						<template slot-scope="scope">
							<el-radio v-model="m_tableRadio" :label="scope.row"
								><i></i
							></el-radio>
						</template>
					</el-table-column>
					<el-table-column
						prop="id"
						label="检查ID"
						align="center"
						width="100"
					>
					</el-table-column>
					<el-table-column
						prop="road_name"
						label="道路名称"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="date"
						label="检查日期"
						align="center"
						width="100"
					>
					</el-table-column>
					<el-table-column
						prop="weather"
						label="天气状况"
						align="center"
						width="200"
					>
					</el-table-column>
					<el-table-column
						prop="people"
						label="检查人"
						align="center"
						width="200"
					>
					</el-table-column>
				</template>

				<template slot="search">
					<el-col>
						<el-date-picker
							v-model="m_date"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						>
						</el-date-picker>
					</el-col>
				</template>

				<template slot="button">
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('add')"
						>新增</el-button
					>
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('edit')"
						>查看</el-button
					>
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('del')"
						>删除</el-button
					>
					<el-button
						@click="$router.back(-1)"
						type="primary"
						plain
						size="medium"
						>返回</el-button
					>
				</template>
			</PublicTable>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/Road";
import { Tools } from "@/typings/Tools";
import { BranchRoad } from "@/typings/BranchRoad";
import PublicTable from "@/components/PublicTable.vue";
import { Inspection } from "@/typings/Inspection";

@Component({
	components: {
		SideTree,
		PublicTable,
	},
})
export default class DailyInspection extends Vue {
	// side
	private m_side_title = "请选择下面的树";
	private m_tree: Array<TreeNode> = [];
	private m_branch_road = new BranchRoad();
	private m_road = new Road();
	private m_is_branch = false;

	// table
	private m_table_title = "日常巡查列表";
	private m_table = new Array<Inspection>();
	// search
	private m_date: Array<Date> | null = null;
	private m_tableRadio = new Inspection();

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

			data.branch_road.forEach((element) => {
				this.m_tree[0].children?.push({
					id: Number(element.id),
					label: element.name,
				});
			});
		});

		this.m_is_branch =
			Tools.getRouterParam("branch_id") == "" ? false : true;
	}

	private update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		const branch_id = Tools.getRouterParam("branch_id");
		const road_id = Tools.getRouterParam("road_id");
		MyAxios.get_inspection(
			page_size,
			page,
			this.m_is_branch ? branch_id : road_id,
			this.m_date == null ? null : this.m_date[0],
			this.m_date == null ? null : this.m_date[1],
			(total, data) => {
				this.m_table = data;
				callback(total);
			}
		);
	}

	private jump(type: string) {
		if (type == "add") {
			Tools.goTo("/home/edit-daily-inspection", {
				road_id: this.m_road.id,
				type: "add",
			});
		} else if (type == "edit") {
			if (this.m_tableRadio.id == "") {
				this.$notify.error({
					title: "错误",
					message: "请选择一条巡查信息进行查看",
				});
				return;
			}

			Tools.goTo("/home/edit-daily-inspection", {
				road_id: this.m_tableRadio.road_id,
				type: "edit",
				daily_id: this.m_tableRadio.id,
			});
		} else if (type == "del") {
			if (this.m_tableRadio.id == "") {
				this.$notify.error({
					title: "错误",
					message: "请选择一条巡查信息进行删除",
				});
				return;
			}

			console.log(this.m_tableRadio.id);
		}
	}
}
</script>

<style scoped lang="scss">
.el-date-editor {
	width: 400px;
}
</style>
