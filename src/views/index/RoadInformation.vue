<template>
	<!-- 道路资料 -->
	<el-container class="roadInformation">
		<el-aside>
			<SideBar :title="m_side_title" :options="m_options"></SideBar>
		</el-aside>
		<el-main>
			<RoadInfoTable
				:road_mlevels="m_road_mlevels"
				:road_types="m_road_types"
			></RoadInfoTable>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/SideBar.vue";
import RoadInfoTable from "@/components/road/RoadInfoTable.vue";
import { MyAxios } from "@/typings/MyAxios";

@Component({
	components: {
		SideBar,
		RoadInfoTable,
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
	// table
	private m_road_types = new Array<string>();
	private m_road_mlevels = new Array<string>();

	constructor() {
		super();

		MyAxios.get_road_type_name_list((data) => {
			this.m_road_types = data;
		});
		MyAxios.get_road_maintenance_level_list((data) => {
			this.m_road_mlevels = data;
		});
	}
}
</script>
