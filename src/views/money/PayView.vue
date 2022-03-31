<template>
	<!-- 月度资金申请表 -->
	<PublicTable
		id="PayView"
		:table_data="m_table"
		:title="m_table_title"
		:update_table="update_table"
	>
		<template slot="table">
			<el-table-column prop="id" label="序号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="name" label="项目名称" align="center">
			</el-table-column>
			<el-table-column
				prop="total_price"
				label="预算金额（元）"
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="is_act"
				label="支付金额（元）"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="is_finish" label="收款单位" align="center">
			</el-table-column>
			<el-table-column prop="is_finish" label="拨付日期" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<!-- slot-scope="scope" -->
				<template>
					<el-button type="primary" plain size="mini">
						实现呈批表
					</el-button>
				</template>
			</el-table-column>
		</template>

		<template slot="button">
			<el-button type="primary" plain size="medium"> 导出 </el-button>
			<el-button type="primary" plain size="medium"> 返回 </el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fund } from "@/typings/Fund";
import PublicTable from "@/components/PublicTable.vue";

@Component({
	components: {
		PublicTable,
	},
})
export default class PayView extends Vue {
	// table
	private m_table_title = "资金支付管理";
	private m_table = new Array<Fund>();

	// public update_table(
	// 	page_size: number,
	// 	page: number,
	// 	callback: (total: number) => void
	// ) {
	// 	// MyAxios.get_pay_view("13", (data) => {
	// 	// 	callback(1);
	// 	// 	this.m_table = new Array<Fund>(1);
	// 	// 	this.m_table[0] = data;
	// 	// });
	// }
}
</script>
