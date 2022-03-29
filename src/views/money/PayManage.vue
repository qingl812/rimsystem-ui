<template>
	<!-- 资金支付管理 -->
	<PublicTable
		id="PayManage"
		:table_data="m_table"
		:title="m_table_title"
		:update_table="update_table"
	>
		<template slot="table">
			<el-table-column prop="id" label="序号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="date" label="年份" align="center">
			</el-table-column>
			<el-table-column
				prop="total_price"
				label="总预算（元）"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="is_act" label="已拨付金额" align="center">
			</el-table-column>
			<el-table-column
				prop="is_finish"
				label="呈批待拨付金额"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="is_finish" label="预算金额" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<!-- slot-scope="scope" -->
				<template>
					<el-button type="primary" plain size="mini">
						支付查看
					</el-button>
					<el-button type="primary" plain size="mini">
						支付管理
					</el-button>
				</template>
			</el-table-column>
		</template>

		<template slot="button">
			<el-button type="primary" plain size="medium">
				资金预算管理
			</el-button>
			<el-button type="primary" plain size="medium"> 导出 </el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fund } from "@/typings/Fund";
import { MyAxios } from "@/typings/MyAxios";
import PublicTable from "@/components/PublicTable.vue";

@Component({
	components: {
		PublicTable,
	},
})
export default class PayManage extends Vue {
	// table
	private m_table_title = "资金支付管理";
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
