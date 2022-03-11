<template>
	<el-container class="daily-inspection">
		<el-aside>
		</el-aside>

		<el-main>
			<div class="title centered-vertical">
				<ion-icon name="list-outline"></ion-icon>
				<span>日常巡查列表</span>
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
				<el-table-column
					prop="id"
					label="巡查ID"
					align="center"
					width="100"
				>
				</el-table-column>
				<el-table-column prop="road_name" label="道路名称" align="center">
				</el-table-column>
				<el-table-column
					prop="date"
					label="巡查日期"
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
					prop="poeple"
					label="检查人"
					align="center"
					width="200"
				>
				</el-table-column>
			</el-table>

			<el-pagination
				:page-size="m_table_page_size"
				:total="m_table.length"
				background
				:current-page.sync="m_current_page"
				@current-change="updateTable()"
				layout="total, prev, pager, next, jumper"
			>
			</el-pagination>

			<div class="option">
				<div class="centered">
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('daily-inspection-add')"
					>
						新增
					</el-button>
					<el-button type="primary" plain size="medium">
						查看
					</el-button>
					<el-button type="primary" plain size="medium">
						删除
					</el-button>
					<el-button type="primary" plain size="medium">
						返回
					</el-button>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../typings/MyAxios";
import { Inspection } from "../typings/Inspection";

@Component
export default class RoadInformation extends Vue {
	private m_my_axios = new MyAxios();

	// table
	private m_table = new Array<Inspection>();
	private m_table_loading = true;
	// 分页
	private m_table_page_size = 0;
	// 按日期查询
	private m_begin_date = "";
	private m_end_date = "";
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

		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_table = new Array<Inspection>(this.m_table_page_size);
		this.m_my_axios.daily_inspection_info_list(
			this.m_table_page_size,
			this.m_current_page,
			road_id,
			this.m_begin_date,
            this.m_end_date,
			(data) => {
				for (let i = 0; i < data.length; i++) {
					Vue.set(this.m_table, i, data[i]);
				}
			}
		);

		// setTimeout to debug
		setTimeout(() => (this.m_table_loading = false), 300);
	}

	jump(target: string): void {
		this.$router.push({
			path: target,
			query: { road_id: this.$route.query.road_id },
		});
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.daily-inspection > .el-aside {
	height: $gmain-height;
	max-width: 0px;
}

.daily-inspection > .el-main {
	padding-top: 0;
	padding-bottom: 0;
	background-color: $gmain-background-color;

	.title {
		height: 40px;

		span {
			margin-left: 5px;
		}
	}

	.m-table {
		margin-top: 10px;
		height: calc(100% - 140px);
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
