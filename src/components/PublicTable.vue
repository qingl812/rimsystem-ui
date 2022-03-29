<template>
	<div class="PublicTable">
		<div class="title centered-vertical">
			<ion-icon name="list-outline"></ion-icon>
			<span>{{ title }}</span>
		</div>

		<div v-if="typeof has_search != 'undefined' && has_search">
			<el-row :gutter="20">
				<slot name="search"></slot>
				<el-col :span="1.6" class="centered-vertical">
					<el-button
						type="primary"
						icon="el-icon-search"
						@click="updateTable()"
					>
						查询
					</el-button>
				</el-col>
			</el-row>
		</div>

		<el-table
			class="m-table"
			:data="table_data"
			stripe
			border
			highlight-current-row
			v-loading="m_table_loading"
		>
			<slot name="table"></slot>
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
				<slot name="button"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PublicTable extends Vue {
	@Prop({ required: true }) readonly title?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Prop({ required: true }) readonly table_data?: any;
	@Prop({ required: true }) readonly update_table?: (
		page_size: number, // 每页table的大小
		page: number, // 要显示第几页
		callback: (total: number) => void // 回调函数用于获取table数据总量
	) => void;
	@Prop({ required: false }) readonly has_search?: boolean;

	private m_table_loading = false; // table 正在加载中
	private m_table_page_size = 0; // table 每页可显示的数量
	private m_table_total = 0; // 数据总数
	private m_current_page = 1; // table 当前处于页数

	constructor() {
		super();

		window.addEventListener("resize", () => {
			this.updatePageSize();
		});
	}

	mounted(): void {
		if (typeof this.has_search == "undefined") {
			let div = document.getElementsByClassName(
				"m-table"
			)[0] as HTMLElement;
			div.style.height = "calc(100% - " + "140px)";
		}

		this.updatePageSize();
	}

	private updatePageSize(): void {
		let table_div = document.getElementsByClassName(
			"m-table"
		)[0] as HTMLElement;
		this.m_table_page_size = Math.floor(table_div.offsetHeight / 48) - 1;
		this.updateTable();
	}

	private updateTable(): void {
		this.m_table_loading = true;

		if (this.update_table != undefined) {
			this.update_table(
				this.m_table_page_size,
				this.m_current_page,
				(total) => {
					this.m_table_total = total;

					// setTimeout to debug
					setTimeout(() => (this.m_table_loading = false), 300);
				}
			);
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";

.PublicTable {
	height: 100%;
	width: 100%;
	padding-top: 0;
	padding-bottom: 0;

	.title {
		height: 40px;

		span {
			margin-left: 5px;
		}
	}

	.m-table {
		margin-top: 10px;
		height: calc(100% - 200px);
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
}
</style>
