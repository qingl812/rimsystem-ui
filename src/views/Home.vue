<template>
	<el-container class="home">
		<el-aside direction="vertical">
			<div class="title">
				<span class="centered">筛选条件</span>
				<el-divider></el-divider>
			</div>
			<el-select
				v-model="m_valueArea"
				clearable
				placeholder="所属区属"
				@change="updateRoadList()"
			>
				<el-option
					v-for="item in m_areas"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
			<el-select
				v-model="m_valueUnit"
				clearable
				placeholder="管理单位"
				@change="updateRoadList()"
			>
				<el-option
					v-for="item in m_units"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
			<!-- 搜索框 -->
			<div class="search">
				<el-input
					placeholder="道路名称"
					v-model="m_valueSearch"
					clearable
					@change="updateRoadList()"
				>
				</el-input>
				<el-button icon="el-icon-search" circle></el-button>
				<el-divider></el-divider>
			</div>
			<!-- 显示的道路列表 -->
			<el-card class="road-list-card" v-loading="m_loading">
				<div>
					<div
						:v-model="m_roadList"
						v-for="o in m_roadList"
						:key="o"
						class="road_item"
					>
						<el-link type="primary">{{ o }}</el-link>
					</div>
				</div>
				<el-pagination
					layout="prev,jumper, next"
					:page-size="m_page_size"
					:total="m_roadCount"
					background
					small
					:current-page.sync="m_current_page"
					@current-change="updateRoadList()"
				>
				</el-pagination>
			</el-card>
		</el-aside>
		<el-main> </el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class Home extends Vue {
	// 筛选道路
	private m_valueArea = "";
	private m_valueUnit = "";
	private m_valueSearch = "";
	// 筛选道路的选项
	private m_areas = new Array<string>();
	private m_units = new Array<string>();
	// 道路
	private m_roadCount = 0;
	private m_page_size = 0; // 每页显示的道路数量
	private m_roadList = new Array<string>();
	private m_current_page = 1;
	private m_loading = true; //正在从服务器获取 road 列表

	constructor() {
		super();

		window.addEventListener("resize", () => {
			this.updatePageSize();
		});
	}

	mounted(): void {
		axios({
			method: "get",
			url: "/api/area_name_list",
		}).then((response: AxiosResponse) => {
			response.data.areas.forEach((element: string) => {
				this.m_areas.push(element);
			});
		});

		axios({
			method: "get",
			url: "/api/unit_name_list",
		}).then((response: AxiosResponse) => {
			response.data.units.forEach((element: string) => {
				this.m_units.push(element);
			});
		});

		this.updatePageSize();
	}

	public updatePageSize(): void {
		let table_div = document.getElementsByClassName(
			"road-list-card"
		)[0] as HTMLElement;
		this.m_page_size = Math.floor((table_div.offsetHeight - 40) / 22) - 1;
		this.updateRoadList();
	}

	public updateRoadList(): void {
		this.m_loading = true;

		this.m_roadList = new Array<string>(this.m_page_size);
		axios({
			method: "get",
			url: "/api/road_name_list",
			data: {
				page_size: this.m_page_size,
				page: this.m_current_page,
				name: this.m_valueSearch,
				area: this.m_valueArea,
				unit: this.m_valueUnit,
			},
		}).then((response: AxiosResponse) => {
			this.m_roadCount = response.data.total;
			for (let i = 0; i < response.data.roads.length; i++) {
				Vue.set(this.m_roadList, i, response.data.roads[i]);
			}
		});

		// setTimeout to debug
		setTimeout(() => (this.m_loading = false), 300);
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.el-divider {
	margin: 0;
	border-bottom: $border-divider;
}

.el-aside {
	max-width: $gaside-width;
	height: $gmain-height;
	background-color: $aside-background-color;

	.title {
		width: 80%;
		margin: 0 auto 2px;

		span {
			height: 40px;
		}
	}

	.el-select,
	.search {
		width: 90%;
		/* 上边 | 右边 | 下边 | 左边 */
		margin: 2px 5% 2px 5%;
	}

	.search .el-input {
		width: 80%;
		margin-right: 5px;
	}

	.search .el-divider {
		margin-top: 4px;
	}

	.el-card {
		margin: 28px 10% 0 10%;
		height: calc(100% - 260px);
		position: relative;

		.el-pagination {
			position: absolute;
			bottom: 10px;
			margin-left: -10px;
		}
	}
}

.home > .el-main {
	background-color: $gmain-background-color;
}
</style>
