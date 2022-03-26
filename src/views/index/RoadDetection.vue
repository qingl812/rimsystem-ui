<template>
	<!-- 道路检测 -->
	<el-container class="road-detection">
		<el-aside>
			<div class="title centered">检测数据</div>
			<div class="main">
				<div>
					<div class="text centered">
						<ion-icon name="caret-down-circle-outline"></ion-icon>
						<span>日常巡查</span>
					</div>
					<div class="text centered">
						<ion-icon name="caret-down-circle-outline"></ion-icon>
						<span>巡查汇总</span>
					</div>
				</div>
			</div>
		</el-aside>
		<el-main>
			<div class="title centered-vertical">
				<ion-icon name="list-outline"></ion-icon>
				<span>道路列表</span>
			</div>

			<el-row :gutter="20" class="search">
				<el-col :span="4" class="centered-vertical">
					<el-input
						placeholder="道路名称"
						v-model="m_search_name"
						clearable
						@change="updateTable()"
					>
					</el-input>
				</el-col>
				<el-col :span="4" class="centered-vertical">
					<el-select
						v-model="m_search_type"
						clearable
						placeholder="道路类型"
						@change="updateTable()"
					>
						<el-option
							v-for="item in m_road_types"
							:key="item"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4" class="centered-vertical">
					<el-select
						v-model="m_search_mlevel"
						clearable
						placeholder="道路养护等级"
						@change="updateTable()"
					>
						<el-option
							v-for="item in m_road_mlevels"
							:key="item"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-col>
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
					label="道路编号"
					align="center"
					width="100"
				>
				</el-table-column>
				<el-table-column prop="name" label="道路名称" align="center">
				</el-table-column>
				<el-table-column prop="type" label="道路类型" align="center">
				</el-table-column>
				<el-table-column
					prop="mlevel"
					label="道路养护等级"
					align="center"
				>
				</el-table-column>
				<el-table-column prop="unit" label="管理单位" align="center">
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
					<el-button type="primary" plain size="medium">
						查看巡查记录
					</el-button>
					<el-button type="primary" plain size="medium">
						巡查汇总
					</el-button>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";

@Component
export default class RoadDetection extends Vue {
	// search
	private m_search_name = "";
	private m_search_type = "";
	private m_search_mlevel = "";
	private m_road_types = new Array<string>();
	private m_road_mlevels = new Array<string>();
	// table
	private m_table = new Array<unknown>();
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
		MyAxios.get_road_type_name_list((data) => {
			this.m_road_types = data;
		});

		MyAxios.get_road_maintenance_level_list((data) => {
			this.m_road_mlevels = data;
		});

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

		MyAxios.get_road_info_search(
			this.m_table_page_size,
			this.m_current_page,
			this.m_search_name,
			this.m_search_type,
			this.m_search_mlevel,
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
.road-detection > .el-aside {
	height: $gmain-height;
	max-width: $gaside-width;
	background-color: $aside-background-color;

	.title {
		height: 40px;
		color: black;
		border-bottom: $border-divider;
	}

	.main {
		height: calc(100% - 40px);

		.text {
			width: 80%;
			margin: auto;
			color: #4c788d;
			height: 40px;

			border-bottom: $border-divider;

			span {
				margin-left: 5px;
			}
		}
	}
}

.road-detection > .el-main {
	padding-top: 0;
	padding-bottom: 0;
	background-color: $gmain-background-color;

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
}
</style>
