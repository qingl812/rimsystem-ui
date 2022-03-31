<template>
	<!-- 道路检测 -->
	<el-container class="road-detection">
		<el-aside>
			<SideBar :title="m_side_title" :options="m_options"></SideBar>
		</el-aside>
		<el-main>
			<router-view></router-view>
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
export default class RoadDetection extends Vue {
	// side bar
	private m_side_title = "检测数据";
	private m_options = [
		{ name: "日常巡查", url: "daily" },
		{ name: "巡查汇总", url: "summary" },
	];
	private m_sup_url = "road-detection";
	// table
	private m_table_title = "道路列表";
	private m_table = new Array<Road>();

	// search
	private m_search_name = "";
	private m_search_type = "";
	private m_search_mlevel = "";
	private m_road_types = new Array<string>();
	private m_road_mlevels = new Array<string>();

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
