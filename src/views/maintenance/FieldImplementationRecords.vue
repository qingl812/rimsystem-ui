<template>
	<!-- 现场实施记录 -->
	<div id="FieldImplementationRecords">
		<div class="title centered-vertical">
			<ion-icon name="list-outline"></ion-icon>
			<span>现场实施记录</span>
		</div>

		<el-table
			class="m-table"
			:data="m_table"
			stripe
			border
			highlight-current-row
			v-loading="m_table_loading"
		>
			<el-table-column
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
			</el-table-column>
		</el-table>

		<el-pagination
			:page-size="m_table_page_size"
			:total="m_table_total"
			background
			:current-page.sync="m_current_page"
			@current-change="updateTable()"
			layout="total, prev, pager, next, jumper"
		>
		</el-pagination>

		<div class="option">
			<div class="centered">
				<el-button type="primary" plain size="medium"> 查看 </el-button>
				<el-button type="primary" plain size="medium"> 删除 </el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import { Fund } from "@/typings/Fund";

@Component
export default class FieldImplementationRecords extends Vue {
	// table
	private m_table = new Array<Fund>();
	private m_table_loading = true;
	// 分页
	private m_table_page_size = 0;
	private m_table_total = 0;
	private m_current_page = 1;

	constructor() {
		super();

		window.addEventListener("resize", () => {
			this.updatePageSize();
		});
	}

	mounted(): void {
		this.updatePageSize();
	}

	public updatePageSize(): void {
		let table_div = document.getElementsByClassName(
			"m-table"
		)[0] as HTMLElement;
		this.m_table_page_size = Math.floor(table_div.offsetHeight / 48) - 1;
		this.updateTable();
	}

	public updateTable(): void {
		this.m_table_loading = true;

		MyAxios.get_monthly_funding_request(
			this.m_table_page_size,
			this.m_current_page,
			(total, data) => {
				this.m_table_total = total;
				this.m_table = data;
			}
		);

		// setTimeout to debug
		setTimeout(() => (this.m_table_loading = false), 300);
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";

#FieldImplementationRecords {
	height: 100%;
}

.title {
	height: 40px;

	span {
		margin-left: 5px;
	}
}

.search {
	.el-input,
	.el-select {
		width: 100%;
	}
}

.m-table {
	margin-top: 10px;
	height: calc(100% - 172px);
}

.pagination {
	width: 100%;
	background-color: lemonchiffon;
}

.el-pagination {
	display: flex;
	align-items: center;
	justify-content: right;
	height: 40px;
}
</style>
