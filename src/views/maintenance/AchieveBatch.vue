<template>
	<!-- 实现呈批 -->
	<PublicTable
		id="AchieveBatch"
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
			<el-table-column prop="id" label="编号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="name" label="项目名称" align="center">
			</el-table-column>
			<el-table-column prop="type" label="项目类型" align="center">
			</el-table-column>
			<el-table-column prop="date" label="录入日期" align="center">
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

		<template slot="search">
			<el-col :span="4" class="centered-vertical">
				<el-date-picker
					v-model="m_date"
					type="date"
					placeholder="选择日期"
				>
				</el-date-picker>
			</el-col>
		</template>

		<template slot="button">
			<el-button type="primary" plain size="medium"> 查看 </el-button>
			<el-button type="primary" plain size="medium"> 删除 </el-button>
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
export default class AchieveBatch extends Vue {
	// table
	private m_table_title = "项目实施呈现表";
	private m_table = new Array<Fund>();
	// search
	private m_date = new Date();

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.get_project_implementation_presentation_table(
			this.m_date,
			page_size,
			page,
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
