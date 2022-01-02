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
						<el-link
							type="primary"
							class="road-item-link"
							@click="to_road(o)"
							>{{ o }}</el-link
						>
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
		<el-main>
			<baidu-map
				id="bm-view"
				@ready="map_handler"
				:center="m_map_center"
				:zoom="m_map_zoom"
				:scroll-wheel-zoom="true"
			>
			</baidu-map>
			<div class="map-status">
				<el-button type="primary">文档管理</el-button>
				<el-button type="primary">数据信息</el-button>
				<el-button type="primary">数据删除</el-button>
				<el-button type="primary">日常巡查</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import GlobalScss from "../../themes/normal.scss";

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
	// map
	private m_map_center = { lng: 0, lat: 0 };
	private m_map_zoom = 3;
	// 选中的道路
	private m_current_road_name: string | null = null;

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

		let name = this.$route.query.road_name;
		if (typeof name === "string") {
			this.m_current_road_name = name;
		} else {
			this.m_current_road_name = null;
		}
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

		this.to_road(null);
	}

	map_handler({ BMap, map }: never): void {
		BMap;
		map;
		this.m_map_center.lng = 116.404;
		this.m_map_center.lat = 39.915;
		this.m_map_zoom = 15;
	}

	to_road(road_name: string | null): void {
		this.m_current_road_name = road_name;

		if (typeof this.m_current_road_name === "string") {
			// 去掉首尾的空格
			let trim = this.m_current_road_name.trim();
			this.m_current_road_name = trim.length == 0 ? null : trim;
		}

		if (typeof this.m_current_road_name === "string") {
			// 如果已经存在参数
			if (typeof this.$route.query.road_name === "string") {
				this.$route.query.road_name = this.m_current_road_name;
			} else {
				this.$router.replace({
					query: {
						...this.$route.query,
						road_name: this.m_current_road_name,
					},
				});
			}
		} else {
			if (typeof this.$route.query.road_name === "string") {
				this.$router.replace({ query: {} });
			}
		}

		// 控制 status 的显示
		let div_map = document.getElementById("bm-view") as HTMLElement;
		if (typeof this.m_current_road_name === "string") {
			div_map.style.height = "calc(100% - 40px)";
		} else {
			div_map.style.height = "100%";
		}

		let divs = document.getElementsByClassName("road-item-link");
		for (let i = 0; i < divs.length; i++) {
			let div = divs[i] as HTMLElement;
			if (this.m_current_road_name === div.innerText) {
				div.style.color = GlobalScss.active_link_color;
			} else {
				div.style.color = GlobalScss.link_color;
			}
		}
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
	padding: 0;
	border: $border-divider;
	overflow-y: hidden;

	#bm-view {
		height: calc(100% - 40px);
		width: 100%;
	}
}

.active-road {
	background-color: blueviolet;
}
</style>
