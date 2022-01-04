<template>
	<el-container class="doc-manage">
		<el-aside>
			<div class="title centered">
				<ion-icon name="document-text-outline"></ion-icon>
				<span>请选择文档分类</span>
			</div>
			<div class="list">
				<div class="link">
					<ion-icon name="folder-open-outline"></ion-icon>
					<el-link
						type="primary"
						@click="
							m_current_type = null;
							updateTable();
						"
						>{{ m_file_types.road_name }}</el-link
					>
				</div>

				<div
					class="item"
					v-for="item in m_file_types.types"
					:key="item"
				>
					<div class="link">
						<ion-icon name="document-outline"></ion-icon>
						<el-link
							type="primary"
							@click="
								m_current_type = item;
								updateTable();
							"
							>{{ item }}</el-link
						>
					</div>
				</div>
			</div>
		</el-aside>
		<el-main>
			<div class="title centered-vertical">
				<ion-icon name="list-outline"></ion-icon>
				<span
					>{{ this.$route.query.road_name }} -
					{{
						m_current_type == null ? "全部资料" : m_current_type
					}}</span
				>
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
					label="序号"
					align="center"
					width="100"
				>
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center">
				</el-table-column>
				<el-table-column
					prop="format"
					label="格式"
					align="center"
					width="100"
				>
				</el-table-column>
				<el-table-column
					prop="time"
					label="时间"
					align="center"
					width="200"
				>
				</el-table-column>
				<el-table-column label="查看" align="center" width="60">
					<ion-icon name="open-outline"></ion-icon>
				</el-table-column>
				<el-table-column label="下载" align="center" width="60">
					<template slot-scope="scope">
						<ion-icon
							@click="download(scope.$index, scope.row)"
							name="cloud-download-outline"
						></ion-icon>
					</template>
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
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('doc-new')"
					>
						新增
					</el-button>
					<el-button type="primary" plain size="medium">
						删除
					</el-button>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class RoadInformation extends Vue {
	// 侧边栏 文档类型选择
	private m_file_types = {
		road_name: "",
		types: [],
	};
	private m_current_type: string | null = null;
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
		axios({
			method: "get",
			url: "/api/file_types_list",
			data: {
				road_name: this.$route.query.road_name,
			},
		}).then((response: AxiosResponse) => {
			this.m_file_types = response.data;
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

		this.m_table = new Array<string>(this.m_table_page_size);
		axios({
			method: "get",
			url: "/api/file_info_list",
			data: {
				page_size: this.m_table_page_size,
				page: this.m_current_page,
				name: this.$route.query.road_name,
				type: this.m_current_type,
			},
		}).then((response: AxiosResponse) => {
			this.m_table_total = response.data.total;
			for (let i = 0; i < response.data.files.length; i++) {
				Vue.set(this.m_table, i, response.data.files[i]);
			}
		});

		// setTimeout to debug
		setTimeout(() => (this.m_table_loading = false), 300);
	}

	// eslint-disable-next-line
	download(index: number, scope: any): void {
		axios({
			method: "get",
			url: "/api/file_download",
			data: {
				file_id: scope.id,
			},
		}).then((response: AxiosResponse) => {
			window.open(response.data.url, "_blank")?.location;
		});
	}

	jump(target: string): void {
		this.$router.push({
			path: target,
			query: { road_name: this.$route.query.road_name },
		});
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.doc-manage > .el-aside {
	height: $gmain-height;
	max-width: $gaside-width;
	background-color: $aside-background-color;

	.title {
		height: 40px;
		color: black;
		border-bottom: $border-divider;

		span {
			margin-left: 4px;
		}
	}

	.list {
		margin-top: 4px;
		margin-left: 20px;
		.item {
			margin-left: 20px;
		}

		.link {
			height: 22px;
			display: flex;
			align-items: center;
		}
	}
}

.doc-manage > .el-main {
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
