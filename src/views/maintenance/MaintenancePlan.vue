<template>
	<!-- 维修计划 -->
	<PublicTable
		id="MaintenancePlan"
		:table_data="m_table"
		:title="m_table_title"
		:update_table="update_table"
	>
		<template slot="table"
			><el-table-column
				prop="check"
				type="selection"
				align="center"
				width="60"
			>
			</el-table-column>
			<el-table-column prop="id" label="编号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="date" label="维修年月" align="center">
			</el-table-column>
			<el-table-column prop="total_price" label="维修总价" align="center">
			</el-table-column>
			<el-table-column
				prop="is_act"
				label="现场实施是否执行"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="is_finish"
				label="现场实施是否完成"
				align="center"
			>
			</el-table-column
		></template>

		<template slot="button">
			<el-button type="primary" plain size="medium"> 查看 </el-button>
			<el-button type="primary" plain size="medium"> 呈批表 </el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import { Fund } from "@/typings/Fund";
import PublicTable from "@/components/PublicTable.vue";

@Component({
	components: {
		PublicTable,
	},
})
export default class MaintenancePlan extends Vue {
	// table
	private m_table_title = "道路维修计划表";
	private m_table = new Array<Fund>();

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.get_monthly_funding_request(page_size, page, (total, data) => {
			callback(total);
			this.m_table = data;
		});
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";
</style>
