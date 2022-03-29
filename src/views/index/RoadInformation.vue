<template>
	<!-- 道路资料 -->
	<el-container class="roadInformation">
		<el-aside>
			<SideBar :title="m_side_title" :options="m_options"></SideBar>
		</el-aside>
		<el-main>
			<PublicTable
				:table_data="m_table"
				:title="m_table_title"
				:update_table="update_table"
				:has_search="true"
			>
				<template slot="table">
					<el-table-column
						prop="check"
						type="selection"
						align="center"
						width="60"
					>
					</el-table-column>
					<el-table-column
						prop="id"
						label="道路编号"
						align="center"
						width="100"
					>
					</el-table-column>
					<el-table-column
						prop="name"
						label="道路名称"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="type"
						label="道路类型"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="maintenance_level"
						label="道路养护等级"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="unit"
						label="管理单位"
						align="center"
					>
					</el-table-column>
				</template>

				<template slot="search">
					<el-col :span="4" class="centered-vertical">
						<el-input
							placeholder="道路名称"
							v-model="m_search_name"
							clearable
						>
						</el-input>
					</el-col>
					<el-col :span="4" class="centered-vertical">
						<el-select
							v-model="m_search_type"
							clearable
							placeholder="道路类型"
						>
							<el-option
								v-for="item in m_road_types"
								:key="item"
								:label="item"
								:value="item"
							>
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="4" class="centered-vertical">
						<el-select
							v-model="m_search_mlevel"
							clearable
							placeholder="道路养护等级"
							@change="updateTable()"
						>
							<el-option
								v-for="item in m_road_mlevels"
								:key="item"
								:label="item"
								:value="item"
							>
							</el-option>
						</el-select>
					</el-col>
				</template>

				<template slot="button">
					<el-button type="primary" plain size="medium">
						新增
					</el-button>
					<el-button type="primary" plain size="medium">
						查看
					</el-button>
					<el-button type="primary" plain size="medium">
						删除
					</el-button>
				</template>
			</PublicTable>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import { Road } from "@/typings/Road";
import PublicTable from "@/components/PublicTable.vue";
import SideBar from "@/components/SideBar.vue";

@Component({
	components: {
		SideBar,
		PublicTable,
	},
})
export default class RoadInformation extends Vue {
	// side bar
	private m_side_title = "道路资料";
	private m_options = [
		{ name: "道路信息", url: "" },
		{ name: "文档资料", url: "" },
	];
	private m_sup_url = "";
	// search
	private m_search_name = "";
	private m_search_type = "";
	private m_search_mlevel = "";
	private m_road_types = new Array<string>();
	private m_road_mlevels = new Array<string>();
	// table
	private m_table_title = "道路信息列表";
	private m_table = new Array<Road>();

	mounted(): void {
		MyAxios.get_road_type_name_list((data) => {
			this.m_road_types = data;
		});
		MyAxios.get_road_maintenance_level_list((data) => {
			this.m_road_mlevels = data;
		});
	}

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.get_road_info_search(
			page_size,
			page,
			this.m_search_name,
			this.m_search_type,
			this.m_search_mlevel,
			(total, data) => {
				callback(total);
				this.m_table = data;
			}
		);
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";
</style>
