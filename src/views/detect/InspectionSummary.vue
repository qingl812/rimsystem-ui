<template>
	<!-- 巡查汇总 -->
	<PublicTable
		id="InspectionSummary"
		:table_data="m_table"
		:title="m_table_title"
		:update_table="update_table"
		:has_search="true"
		:no_pagination="true"
		ref="ptable"
	>
		<template slot="table">
			<el-table-column prop="id" label="序号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="name" label="道路名称" align="center">
			</el-table-column>
			<el-table-column
				prop="segment_name"
				label="道路段名称"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="date" label="巡查日期" align="center">
			</el-table-column>
			<el-table-column
				prop="location_description"
				label="具体位置描述"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="damaged_pavement_area"
				label="破损路面面积（m2）"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="damaged_sidewalk_area"
				label="破损人行道面积（m2）"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="damaged_blind_area"
				label="破损盲道面积（m2）"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="damaged_curb_length"
				label="破损路缘石（m）"
				align="center"
			>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<!-- slot-scope="scope" -->
				<template>
					<el-button type="primary" plain size="mini">
						查看
					</el-button>
				</template>
			</el-table-column>
		</template>

		<template slot="search">
			<el-col :span="4" class="centered-vertical">
				<el-date-picker
					v-model="m_date"
					type="month"
					placeholder="选择月"
				>
				</el-date-picker>
			</el-col>
		</template>

		<template slot="button">
			<el-button type="primary" plain size="medium"> 病害汇总 </el-button>
			<el-button type="primary" plain size="medium"> 导出 </el-button>
			<el-button type="primary" plain size="medium"> 返回 </el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import PublicTable from "@/components/PublicTable.vue";
import { Inspection } from "@/typings/Inspection";

@Component({
	components: {
		PublicTable,
	},
})
export default class InspectionSummary extends Vue {
	// table
	private m_table_title = "巡查汇总表";
	private m_table = new Array<Inspection>();
	// search
	private m_date = new Date();

	mounted(): void {
		// date 默认为当前日期
		this.m_date = new Date();
		this.updateTable();
	}

	private update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		let year = this.m_date.getFullYear().toString();
		let month = (this.m_date.getMonth() + 1).toString();

		MyAxios.get_inspection_summary(year, month, (data) => {
			callback(0);
			this.m_table = data;
		});
	}

	private updateTable(): void {
		(this.$refs["ptable"] as PublicTable)?.updateTable();
	}
}
</script>
