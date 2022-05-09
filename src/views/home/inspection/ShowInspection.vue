<template>
	<PublicTable
		id="ShowInspection"
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
				label="检查ID"
				align="center"
				width="100"
			>
			</el-table-column>
			<el-table-column prop="road_name" label="道路名称" align="center">
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
			<router-link to="add">
				<el-button type="primary" plain size="medium">新增</el-button>
			</router-link>
			<el-button type="primary" plain size="medium">查看</el-button>
			<el-button type="primary" plain size="medium">删除</el-button>
			<el-button
				@click="$router.back(-1)"
				type="primary"
				plain
				size="medium"
				>返回</el-button
			>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import PublicTable from "@/components/PublicTable.vue";
import { Inspection } from "@/typings/Inspection";
import { GlobalVar } from "@/typings/GlobalVar";

@Component({
	components: {
		PublicTable,
	},
})
export default class ShowInspection extends Vue {
	// table
	private m_table_title = "日常巡查列表";
	private m_table = new Array<Inspection>();
	// search
	private m_date: Array<Date> | null = null;

	private update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.get_inspection(
			page_size,
			page,
			GlobalVar.cur_id.toString(),
			this.m_date == null ? null : this.m_date[0],
			this.m_date == null ? null : this.m_date[1],
			(total, data) => {
				this.m_table = data;
				callback(total);
			}
		);
	}
}
</script>

<style scoped lang="scss">
.el-date-editor {
	width: 400px;
}
</style>
